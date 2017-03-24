/**
 * Controller para gestão de senha do usuário.
 * @namespace app.admin
 */

(function () {
     'use strict';
     
     angular
     .module('app.support.userPassword')
     .controller('AppSupportUserPasswordController', AppSupportUserPasswordController);
     
     AppSupportUserPasswordController.$inject = ['$state', 'cacheService', 'userSupportService'];
     
     /** @ngInject */
     function AppSupportUserPasswordController($state, cacheService, userSupportService) {
          /* jshint validthis: true */
          var vm = this;
          vm.user = null;
          vm.password = null;
          vm.new_passowd = null;
          vm.alerts = [];
          vm.changePassword = changePassword;
          vm.closeAlert = closeAlert;
          
          init();
          
          function init() {
               vm.user = cacheService.get('user');
          }
          
          
          //fecha alert
          function closeAlert(index) {
               vm.alerts.splice(index, 1);
          }
          
          //função para execução do login
          function changePassword() {
               if (vm.password !== null && vm.new_password !== null) {
                    userSupportService.changePassword(vm.user._id, vm.password, vm.new_password)
                    .then(function (result) {
                         if (!result.error) {
                              $state.go('support_desktop_55pbx');
                              
                         } else {
                              vm.alerts = [
                                   {type: 'danger', msg: result.message, time: 10000},
                              ];
                         }
                    });
               }
          }
     }
})();
