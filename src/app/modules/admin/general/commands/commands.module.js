/**
 * Módulo de carga de interface e layout.
 * @namespace app.admin
 */
(function () {
    'use strict';

    angular.module('app.admin.commands', [
        'ui.router'
    ])
        .config(routeConfig)
    routeConfig.$inject = ['$stateProvider'];

    /** @ngInject */
    function routeConfig($stateProvider) {
        $stateProvider
            .state('admin_commands', {
                resolve: {
                    check: function ($location, cacheService) {
                        var user = cacheService.get('user');
                        if (user == undefined || user == null) {
                            $location.path('/login')
                        }
                    }
                },
                url: '/general/commands',
                parent: 'admin_desktop',
                templateUrl: 'app/modules/admin/general/commands/commands.html',
                controller: 'AppAdminCommandsController',
                controllerAs: 'vm',

            })
            .state('admin_commands_form', {
                resolve: {
                    check: function ($location, cacheService) {
                        var user = cacheService.get('user');
                        if (user == undefined || user == null) {
                            $location.path('/login')
                        }
                    }
                },
                url: '/general/commands/form',
                parent: 'admin_desktop',
                templateUrl: 'app/modules/admin/general/commands/commands_form.html',
                controller: 'AppAdminCommandsFormController',
                controllerAs: 'vm',
                params: {state_back: null, branch: null},
            });
    }
})();

