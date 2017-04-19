/**
 * Módulo de carga de interface de admin
 * @namespace app.admin
 */
(function () {
     'use strict';
     
     angular.module('app.admin', [
          'app.admin.desktop',
          'app.admin.home',
          'app.admin.branch',
          'app.admin.branchGroup',
          'app.admin.conference',
          'app.admin.dialPlan',
          'app.admin.outboundRoutes',
          'app.admin.inboundRoutes',
          'app.admin.commands',
          'app.admin.followMe',
          'app.admin.timeCondition',
          'app.admin.ura',
          'app.admin.announcement',
          'app.admin.music',


     ])
     .config(routeConfig);
     
     /** @ngInject */
     function routeConfig($stateProvider) {
          
     }
})();

