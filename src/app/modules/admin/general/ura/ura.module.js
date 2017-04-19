/**
 * Módulo de carga de interface e layout.
 * @namespace app.admin
 */
(function () {
    'use strict';

    angular.module('app.admin.ura', [
        'ui.router'
    ])
        .config(routeConfig)
    routeConfig.$inject = ['$stateProvider'];

    /** @ngInject */
    function routeConfig($stateProvider) {
        $stateProvider
            .state('admin_ura', {
                resolve: {
                    check: function ($location, cacheService) {
                        var user = cacheService.get('user');
                        if (user == undefined || user == null) {
                            $location.path('/login')
                        }
                    }
                },
                url: '/branch/ura',
                parent: 'admin_desktop',
                templateUrl: 'app/modules/admin/general/ura/ura.html',
                controller: 'AppAdminUraController',
                controllerAs: 'vm',

            })
            .state('admin_ura_form', {
                resolve: {
                    check: function ($location, cacheService) {
                        var user = cacheService.get('user');
                        if (user == undefined || user == null) {
                            $location.path('/login')
                        }
                    }
                },
                url: '/branch/ura/form',
                parent: 'admin_desktop',
                templateUrl: 'app/modules/admin/general/ura/ura_form.html',
                controller: 'AppAdminUraFormController',
                controllerAs: 'vm',
                params: {state_back: null, ura: null},
            });
    }
})();

