/**
 * Módulo de carga de interface e layout.
 * @namespace app.admin
 */
(function () {
    'use strict';

    angular.module('app.admin.branchGroup', [
        'ui.router'
    ])
        .config(routeConfig)
    routeConfig.$inject = ['$stateProvider'];

    /** @ngInject */
    function routeConfig($stateProvider) {
        $stateProvider
            .state('admin_branchGroup', {
                resolve: {
                    check: function ($location, cacheService) {
                        var user = cacheService.get('user');
                        if (user == undefined || user == null) {
                            $location.path('/login')
                        }
                    }
                },
                url: '/branchGroup',
                parent: 'admin_desktop',
                templateUrl: 'app/modules/admin/branchGroup/branchGroup.html',
                controller: 'AppAdminBranchGroupController',
                controllerAs: 'vm',

            })
            .state('admin_branchGroup_form', {
                resolve: {
                    check: function ($location, cacheService) {
                        var user = cacheService.get('user');
                        if (user == undefined || user == null) {
                            $location.path('/login')
                        }
                    }
                },
                url: '/branchGroup/form',
                parent: 'admin_desktop',
                templateUrl: 'app/modules/admin/branchGroup/branchGroup_form.html',
                controller: 'AppAdminBranchGroupFormController',
                controllerAs: 'vm',
                params: {state_back: null, branch: null},
            });
    }
})();

