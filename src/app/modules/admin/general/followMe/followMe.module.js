/**
 * Módulo de carga de interface e layout.
 * @namespace app.admin
 */
(function () {
    'use strict';

    angular.module('app.admin.followMe', [
        'ui.router'
    ])
        .config(routeConfig)
    routeConfig.$inject = ['$stateProvider'];

    /** @ngInject */
    function routeConfig($stateProvider) {
        $stateProvider
            .state('admin_followMe', {
                resolve: {
                    check: function ($location, cacheService) {
                        var user = cacheService.get('user');
                        if (user == undefined || user == null) {
                            $location.path('/login')
                        }
                    }
                },
                url: '/general/followMe',
                parent: 'admin_desktop',
                templateUrl: 'app/modules/admin/general/followMe/followMe.html',
                controller: 'AppAdminFollowMeController',
                controllerAs: 'vm',

            })
            .state('admin_followMe_form', {
                resolve: {
                    check: function ($location, cacheService) {
                        var user = cacheService.get('user');
                        if (user == undefined || user == null) {
                            $location.path('/login')
                        }
                    }
                },
                url: '/general/followMe/form',
                parent: 'admin_desktop',
                templateUrl: 'app/modules/admin/general/followMe/followMe_form.html',
                controller: 'AppAdminFollowMeFormController',
                controllerAs: 'vm',
                params: {state_back: null, branch: null},
            });
    }
})();

