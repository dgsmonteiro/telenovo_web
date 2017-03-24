/**
 * Módulo para login de usuário.
 * @namespace app.admin
 */
(function () {
  'use strict';

  angular.module('app.admin.userLogin', [
    'ui.router'
  ])
    .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider, constant_app_path) {
    $stateProvider
      .state('admin_user_login', {
        url:'/login',
        templateUrl: constant_app_path.modules_admin + '/userLogin/login.html',
        controller: 'AppAdminUserLoginController',
        controllerAs: 'vm',

      });
  }
})();

