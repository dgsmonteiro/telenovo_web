/**
 * Controller de carga da aplicação e interface de área de suporte.
 * @namespace app.admin
 */

(function () {
     'use strict';
     
     angular
     .module('app.admin.branch')
     .controller('AppAdminBranchFormController', AppAdminBranchFormController);

    AppAdminBranchFormController.$inject = ['$translate', '$state', 'cacheService', 'branchNumberClientService', 'toastr'];
     
     
     /** @ngInject */
     function AppAdminBranchFormController($translate, $state, cacheService, branchNumberClientService, toastr) {
          
          /* jshint validthis: true */
          var vm = this;
          vm.user = null;
          vm.client = null;
          vm.model = {};
          vm.getBranchSequence = getBranchSequence;
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
               vm.getBranchSequence();
          }

         function getBranchSequence() {
               if(!vm.model.edit){
                   branchNumberClientService.getSequenceBranchGeneratePassword(vm.client._id)
                       .then(function (result) {
                           vm.model.branch = parseInt(result.branch);
                           vm.model.password = result.password;
                       })
               }
         }

         function save() {
             if(!vm.model.edit){
                 branchNumberClientService.addNewClientBranchNumber(vm.client._id, vm.model)
                     .then(function (result) {
                         toastr.success(null, "Ramal foi salvo com sucesso", {"timeOut": "8000"});
                         $state.go($state.params.state_back)
                     })
             }else{
                 branchNumberClientService.updateClientBranchNumber(vm.client._id, vm.model)
                     .then(function (result) {
                         toastr.success(null, "Ramal foi editado com sucesso", {"timeOut": "8000"});
                         $state.go($state.params.state_back)
                     })
             }
         }
          
     }
})();
