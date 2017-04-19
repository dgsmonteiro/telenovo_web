/**
 * Controller de carga da aplicação e interface de área de suporte.
 * @namespace app.admin
 */

(function () {
     'use strict';

     angular
     .module('app.admin.ura')
     .controller('AppAdminUraFormController', AppAdminUraFormController);

    AppAdminUraFormController.$inject = ['$translate', '$state', 'cacheService', 'generalClientService', 'lodash', 'toastr'];
     
     
     /** @ngInject */
     function AppAdminUraFormController($translate, $state, cacheService, generalClientService, lodash, toastr) {
          
          /* jshint validthis: true */
          var vm = this;
          vm.user = null;
          vm.client = null;
          vm.model = {
                  // groupStrategy = 'ringall',
                  // callRecording  = 'ever',

          };
          vm.getBranch = getBranch;
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
         //obtem lista de URAs
         function getUra() {
             generalClientService.getListClientUraByClientId(vm.client._id)
                 .then(function (result) {
                     result = lodash.orderBy(result, ['number'], ['asc'])
                     vm.branchList = result;
                     vm.branchList_copy = angular.copy(result);
                 });
         }


         function save() {
             if(!vm.model.edit){
                 generalClientService.addNewClientBranchGroup(vm.client._id, vm.model)
                     .then(function (result) {
                         toastr.success(null, "Grupo foi salvo com sucesso", {"timeOut": "8000"});
                         $state.go($state.params.state_back)
                     })
             }else{
                 generalClientService.updateClientBranchGroup(vm.client._id, vm.model)
                     .then(function (result) {
                         toastr.success(null, "Grupo foi editado com sucesso", {"timeOut": "8000"});
                         $state.go($state.params.state_back)
                     })
             }
         }
          
     }
})();
