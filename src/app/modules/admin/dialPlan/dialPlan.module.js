/**
 * Módulo de carga de interface e layout.
 * @namespace app.admin
 */
(function () {
    'use strict';

    angular.module('app.admin.dialPlan', [
        'ui.router'
    ])
        .config(routeConfig)
    routeConfig.$inject = ['$stateProvider'];

    /** @ngInject */
    function routeConfig($stateProvider) {
        $stateProvider
            .state('admin_dialPlan', {
                resolve: {
                    check: function ($location, cacheService) {
                        var user = cacheService.get('user');
                        if (user == undefined || user == null) {
                            $location.path('/login')
                        }
                    }
                },
                url: '/dialPlan',
                parent: 'admin_desktop',
                templateUrl: 'app/modules/admin/dialPlan/dialPlan.html',
                controller: 'AppAdminDialPlanController',
                controllerAs: 'vm',

            })
            .state('admin_dialPlan_form', {
                resolve: {
                    check: function ($location, cacheService) {
                        var user = cacheService.get('user');
                        if (user == undefined || user == null) {
                            $location.path('/login')
                        }
                    }
                },
                url: '/dialPlan/form',
                parent: 'admin_desktop',
                templateUrl: 'app/modules/admin/dialPlan/dialPlan_form.html',
                controller: 'AppAdminDialPlanFormController',
                controllerAs: 'vm',
                params: {state_back: null, branch: null},
            });
    }
})();

