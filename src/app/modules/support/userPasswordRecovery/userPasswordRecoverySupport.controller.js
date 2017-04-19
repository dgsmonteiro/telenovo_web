/**
 * Controller para recuperação de senha do usuário.
 * @namespace app.admin
 */

(function () {
     'use strict';
     
     angular
     .module('app.support.userPasswordRecovery')
     .controller('AppSupportUserPasswordRecoveryController', AppSupportUserPasswordRecoveryController);

    AppSupportUserPasswordRecoveryController.$inject = ['$state', 'cacheService', 'userSupportService'];
     
     /** @ngInject */
     function AppSupportUserPasswordRecoveryController($state, cacheService, userSupportService) {
          
          /* jshint validthis: true */
          var vm = this;
          vm.email = null;
          vm.user = null;
          vm.alerts = [];
          vm.recoveryPassword = recoveryPassword;
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
          function recoveryPassword() {
               if (vm.email !== null) {
                    userSupportService.recoveryPassword(vm.email)
                    .then(function (result) {
                         if (!result.error) {
                              $state.go('support_user_login');
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
