/**
 * Módulo de carga de interface de admin
 * @namespace app.support
 */
(function () {
     'use strict';
     
     angular.module('app.support', [
          'app.support.userPassword',
          'app.support.userPasswordRecovery',
          'app.support.userProfile',
          'app.support.userLogin',



     ])
     .config(routeConfig);
     
     /** @ngInject */
     function routeConfig($stateProvider) {
          
     }
})();

