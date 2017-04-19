/**
 * Módulo de carga de interface e layout.
 * @namespace app.admin
 */
(function () {
    'use strict';

    angular.module('app.admin.branch', [
        'ui.router'
    ])
        .config(routeConfig)
    routeConfig.$inject = ['$stateProvider'];

    /** @ngInject */
    function routeConfig($stateProvider) {
        $stateProvider
            .state('admin_branch', {
                resolve: {
                    check: function ($location, cacheService) {
                        var user = cacheService.get('user');
                        if (user == undefined || user == null) {
                            $location.path('/login')
                        }
                    }
                },
                url: '/branch/branchManager',
                parent: 'admin_desktop',
                templateUrl: 'app/modules/admin/branch/branchManager/branch.html',
                controller: 'AppAdminBranchController',
                controllerAs: 'vm',

            })
            .state('admin_branch_form', {
                resolve: {
                    check: function ($location, cacheService) {
                        var user = cacheService.get('user');
                        if (user == undefined || user == null) {
                            $location.path('/login')
                        }
                    }
                },
                url: '/branch/branchManager/form',
                parent: 'admin_desktop',
                templateUrl: 'app/modules/admin/branch/branchManager/branch_form.html',
                controller: 'AppAdminBranchFormController',
                controllerAs: 'vm',
                params: {state_back: null, branch: null},
            });
    }
})();

