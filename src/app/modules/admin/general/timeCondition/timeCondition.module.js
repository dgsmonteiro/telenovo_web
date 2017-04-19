/**
 * Módulo de carga de interface e layout.
 * @namespace app.admin
 */
(function () {
    'use strict';

    angular.module('app.admin.timeCondition', [
        'ui.router'
    ])
        .config(routeConfig)
    routeConfig.$inject = ['$stateProvider'];

    /** @ngInject */
    function routeConfig($stateProvider) {
        $stateProvider
            .state('admin_timeCondition', {
                resolve: {
                    check: function ($location, cacheService) {
                        var user = cacheService.get('user');
                        if (user == undefined || user == null) {
                            $location.path('/login')
                        }
                    }
                },
                url: '/general/timeCondition',
                parent: 'admin_desktop',
                templateUrl: 'app/modules/admin/general/timeCondition/timeCondition.html',
                controller: 'AppAdminTimeConditionController',
                controllerAs: 'vm',

            })
            .state('admin_timeCondition_form', {
                resolve: {
                    check: function ($location, cacheService) {
                        var user = cacheService.get('user');
                        if (user == undefined || user == null) {
                            $location.path('/login')
                        }
                    }
                },
                url: '/general/timeCondition/form',
                parent: 'admin_desktop',
                templateUrl: 'app/modules/admin/general/timeCondition/timeCondition_form.html',
                controller: 'AppAdminTimeConditionFormController',
                controllerAs: 'vm',
                params: {state_back: null, timeCondition: null},
            });
    }
})();

