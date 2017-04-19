/**
 * Módulo de carga de interface e layout.
 * @namespace app.admin
 */
(function () {
    'use strict';

    angular.module('app.admin.inboundRoutes', [
        'ui.router'
    ])
        .config(routeConfig)
    routeConfig.$inject = ['$stateProvider'];

    /** @ngInject */
    function routeConfig($stateProvider) {
        $stateProvider
            .state('admin_inboundRoutes', {
                resolve: {
                    check: function ($location, cacheService) {
                        var user = cacheService.get('user');
                        if (user == undefined || user == null) {
                            $location.path('/login')
                        }
                    }
                },
                url: '/trunks/inboundRoutes',
                parent: 'admin_desktop',
                templateUrl: 'app/modules/admin/trunks/inboundRoutes/inboundRoutes.html',
                controller: 'AppAdminInboundRoutesController',
                controllerAs: 'vm',

            })
            .state('admin_inboundRoutes_form', {
                resolve: {
                    check: function ($location, cacheService) {
                        var user = cacheService.get('user');
                        if (user == undefined || user == null) {
                            $location.path('/login')
                        }
                    }
                },
                url: '/trunks/inboundRoutes/form',
                parent: 'admin_desktop',
                templateUrl: 'app/modules/admin/trunks/inboundRoutes/inboundRoutes_form.html',
                controller: 'AppAdminInboundRoutesFormController',
                controllerAs: 'vm',
                params: {state_back: null, branch: null},
            });
    }
})();

