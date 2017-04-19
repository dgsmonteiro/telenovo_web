/**
 * Módulo de carga de interface e layout.
 * @namespace app.admin
 */
(function () {
    'use strict';

    angular.module('app.admin.conference', [
        'ui.router'
    ])
        .config(routeConfig)
    routeConfig.$inject = ['$stateProvider'];

    /** @ngInject */
    function routeConfig($stateProvider) {
        $stateProvider
            .state('admin_conference', {
                resolve: {
                    check: function ($location, cacheService) {
                        var user = cacheService.get('user');
                        if (user == undefined || user == null) {
                            $location.path('/login')
                        }
                    }
                },
                url: '/branch/conference',
                parent: 'admin_desktop',
                templateUrl: 'app/modules/admin/branch/conference/conference.html',
                controller: 'AppAdminConferenceController',
                controllerAs: 'vm',

            })
            .state('admin_conference_form', {
                resolve: {
                    check: function ($location, cacheService) {
                        var user = cacheService.get('user');
                        if (user == undefined || user == null) {
                            $location.path('/login')
                        }
                    }
                },
                url: '/branch/conference/form',
                parent: 'admin_desktop',
                templateUrl: 'app/modules/admin/branch/conference/conference_form.html',
                controller: 'AppAdminConferenceFormController',
                controllerAs: 'vm',
                params: {state_back: null, branch: null},
            });
    }
})();

