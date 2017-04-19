/**
 * Módulo de carga de interface e layout.
 * @namespace app.admin
 */
(function () {
    'use strict';

    angular.module('app.admin.outboundRoutes', [
        'ui.router'
    ])
        .config(routeConfig)
    routeConfig.$inject = ['$stateProvider'];

    /** @ngInject */
    function routeConfig($stateProvider) {
        $stateProvider
            .state('admin_outboundRoutes', {
                resolve: {
                    check: function ($location, cacheService) {
                        var user = cacheService.get('user');
                        if (user == undefined || user == null) {
                            $location.path('/login')
                        }
                    }
                },
                url: '/trunks/branchManager',
                parent: 'admin_desktop',
                templateUrl: 'app/modules/admin/trunks/outboundRoutes/outboundRoutes.html',
                controller: 'AppAdminOutboundRoutesController',
                controllerAs: 'vm',

            })
            .state('admin_outboundRoutes_form', {
                resolve: {
                    check: function ($location, cacheService) {
                        var user = cacheService.get('user');
                        if (user == undefined || user == null) {
                            $location.path('/login')
                        }
                    }
                },
                url: '/trunks/outboundRoutes/form',
                parent: 'admin_desktop',
                templateUrl: 'app/modules/admin/trunks/outboundRoutes/outboundRoutes_form.html',
                controller: 'AppAdminOutboundRoutesFormController',
                controllerAs: 'vm',
                params: {state_back: null, branch: null},
            });
    }
})();

