/**
 * Módulo para para gestão de senha do usuário.
 * @namespace app.admin
 */
(function () {
     'use strict';
     
     angular.module('app.support.userPassword', [
          'ui.router'
     ])
     .config(routeConfig);
     
     /** @ngInject */
     function routeConfig($stateProvider, constant_app_path) {
          $stateProvider
          .state('support_user_password', {
               templateUrl:  constant_app_path.modules_support + '/userPassword/userPasswordSupport.html',
               controller:   'AppSupportUserPasswordController',
               controllerAs: 'vm',
          });
     }
})();

