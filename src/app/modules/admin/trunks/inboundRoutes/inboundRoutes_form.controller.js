/**
 * Controller de carga da aplicação e interface de área de suporte.
 * @namespace app.admin
 */

(function () {
     'use strict';

     angular
     .module('app.admin.outboundRoutes')
     .controller('AppAdminOutboundRoutesFormController', AppAdminOutboundRoutesFormController);

    AppAdminOutboundRoutesFormController.$inject = ['$translate', '$state', 'cacheService', 'inboundRoutesClientService', 'lodash', 'toastr'];
     
     
     /** @ngInject */
     function AppAdminOutboundRoutesFormController($translate, $state, cacheService, inboundRoutesClientService, lodash, toastr) {
          
          /* jshint validthis: true */
          var vm = this;
          vm.user = null;
          vm.client = null;
          vm.model = {
                  // groupStrategy = 'ringall',
                  // callRecording  = 'ever',

          };
          vm.getRoutes = getRoutes;
          vm.save = save;

          
          init();
          
          //carrega dashboard do desktop
          function init() {
               vm.user = cacheService.get('user');
               vm.client = cacheService.get('client');
               if(vm.user == undefined || vm.user == null){
                    $state.go('admin_user_login');
               }
               if($state.params.branch != null){
                    vm.model = $state.params.branch;
                    vm.model.edit = true;
               }else{
                   vm.model.edit = false;
               }

          }
         //obtem lista de Grupos
         function getRoutes() {
             inboundRoutesClientService.getListClientInboundRoutesByClientId(vm.client._id)
                 .then(function (result) {
                     result = lodash.orderBy(result, ['number'], ['asc'])
                     vm.routesList = result;
                     vm.routesList_copy = angular.copy(result);
                 });
         }

         function save() {
             if(!vm.model.edit){
                 inboundRoutesClientService.addNewClientInboundRoute(vm.client._id, vm.model)
                     .then(function (result) {
                         toastr.success(null, "Rota foi salva com sucesso", {"timeOut": "8000"});
                         $state.go($state.params.state_back)
                     })
             }else{
                 inboundRoutesClientService.updateClientInboundRoute(vm.client._id, vm.model)
                     .then(function (result) {
                         toastr.success(null, "Rota foi editada com sucesso", {"timeOut": "8000"});
                         $state.go($state.params.state_back)
                     })
             }
         }
          
     }
})();
