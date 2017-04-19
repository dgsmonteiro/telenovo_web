/**
 * Módulo para login de usuário.
 * @namespace app.admin
 */
(function () {
  'use strict';

  angular.module('app.support.userLogin', [
    'ui.router'
  ])
    .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider, constant_app_path) {
    $stateProvider
      .state('support_user_login', {
        url:'/login',
        templateUrl: constant_app_path.modules_support + '/userLogin/login.html',
        controller: 'AppSupportUserLoginController',
        controllerAs: 'vm',

      });
  }
})();

