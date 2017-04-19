/**
 * Controller de carga da aplicação e interface de área de suporte.
 * @namespace app.admin
 */

(function () {
     'use strict';
     
     angular
     .module('app.admin.outboundRoutes')
     .controller('AppAdminOutboundRoutesFormController', AppAdminOutboundRoutesFormController);

    AppAdminOutboundRoutesFormController.$inject = ['$translate', '$state', 'cacheService', 'outboundRoutesClientService', 'toastr'];
     
     
     /** @ngInject */
     function AppAdminOutboundRoutesFormController($translate, $state, cacheService, outboundRoutesClientService, toastr) {

          /* jshint validthis: true */
          var vm = this;
          vm.user = null;
          vm.client = null;
          vm.model = {};
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
                    vm.model = $state.params.outboundRoute;
                    vm.model.edit = true;
               }else{
                   vm.model.edit = false;
               }
          }


         function save() {
             if(!vm.model.edit){
                 outboundRoutesClientService.addNewClientOutboundRoute(vm.client._id, vm.model)
                     .then(function (result) {
                         toastr.success(null, "Ramal foi salvo com sucesso", {"timeOut": "8000"});
                         $state.go($state.params.state_back)
                     })
             }else{
                 outboundRoutesClientService.updateClientOutboundRoute(vm.client._id, vm.model)
                     .then(function (result) {
                         toastr.success(null, "Ramal foi editado com sucesso", {"timeOut": "8000"});
                         $state.go($state.params.state_back)
                     })
             }
         }
          
     }
})();
