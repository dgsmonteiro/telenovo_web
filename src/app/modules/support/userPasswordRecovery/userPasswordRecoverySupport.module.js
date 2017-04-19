/**
 * Módulo para para recuperação de senha do usuário.
 * @namespace app.admin
 */
(function () {
     'use strict';
     
     angular.module('app.support.userPasswordRecovery', [
          'ui.router'
     ])
     .config(routeConfig);
     
     /** @ngInject */
     function routeConfig($stateProvider,constant_app_path) {
          $stateProvider
          .state('support_user_password_recovery', {
               templateUrl:  constant_app_path.modules_admin + '/userPasswordRecovery/userPasswordRecoverySupport.html',
               controller:   'AppSupportUserPasswordRecoveryController',
               controllerAs: 'vm',
          });
     }
})();

