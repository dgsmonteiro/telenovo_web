/**
 * Módulo de carga de interface e layout.
 * @namespace app.admin
 */
(function () {
    'use strict';

    angular.module('app.admin.announcement', [
        'ui.router'
    ])
        .config(routeConfig)
    routeConfig.$inject = ['$stateProvider'];

    /** @ngInject */
    function routeConfig($stateProvider) {
        $stateProvider
            .state('admin_announcement', {
                resolve: {
                    check: function ($location, cacheService) {
                        var user = cacheService.get('user');
                        if (user == undefined || user == null) {
                            $location.path('/login')
                        }
                    }
                },
                url: '/audio/announcement',
                parent: 'admin_desktop',
                templateUrl: 'app/modules/admin/audio/announcement/announcement.html',
                controller: 'AppAdminAnnouncementController',
                controllerAs: 'vm',

            })
            .state('admin_announcement_form', {
                resolve: {
                    check: function ($location, cacheService) {
                        var user = cacheService.get('user');
                        if (user == undefined || user == null) {
                            $location.path('/login')
                        }
                    }
                },
                url: '/audio/announcement/form',
                parent: 'admin_desktop',
                templateUrl: 'app/modules/admin/audio/announcement/announcement_form.html',
                controller: 'AppAdminAnnouncementFormController',
                controllerAs: 'vm',
                params: {state_back: null, branch: null},
            });
    }
})();

