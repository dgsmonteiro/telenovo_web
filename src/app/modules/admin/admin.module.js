/**
 * Módulo de carga de interface de admin
 * @namespace app.admin
 */
(function () {
     'use strict';
     
     angular.module('app.admin', [
          'app.admin.desktop',
          'app.admin.home',
          'app.admin.userLogin',
          'app.admin.branch',
          'app.admin.branchGroup',
          'app.admin.conference',
          'app.admin.dialPlan',

     ])
     .config(routeConfig);
     
     /** @ngInject */
     function routeConfig($stateProvider) {
          
     }
})();

