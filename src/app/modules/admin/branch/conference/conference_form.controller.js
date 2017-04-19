/**
 * Controller de carga da aplicação e interface de área de suporte.
 * @namespace app.admin
 */

(function () {
     'use strict';

     angular
     .module('app.admin.conference')
     .controller('AppAdminConferenceFormController', AppAdminConferenceFormController);

    AppAdminConferenceFormController.$inject = ['$translate', '$state', 'cacheService', 'conferenceClientService', 'lodash', 'toastr'];
     
     
     /** @ngInject */
     function AppAdminConferenceFormController($translate, $state, cacheService, conferenceClientService, lodash, toastr) {
          
          /* jshint validthis: true */
          var vm = this;
          vm.user = null;
          vm.client = null;
          vm.model = {


          };
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
         function getConference() {
             conferenceClientService.getListClientConferencesByClientId(vm.client._id)
                 .then(function (result) {
                     result = lodash.orderBy(result, ['number'], ['asc'])
                     vm.branchList = result;
                     vm.branchList_copy = angular.copy(result);
                 });
         }




         function save() {
             if(!vm.model.edit){
                 conferenceClientService.addNewClientConference(vm.client._id, vm.model)
                     .then(function (result) {
                         toastr.success(null, "Conferência foi salvo com sucesso", {"timeOut": "8000"});
                         $state.go($state.params.state_back)
                     })
             }else{
                 branchNumberClientService.updateClientConference(vm.client._id, vm.model)
                     .then(function (result) {
                         toastr.success(null, "Conferência foi editado com sucesso", {"timeOut": "8000"});
                         $state.go($state.params.state_back)
                     })
             }
         }
          
     }
})();
