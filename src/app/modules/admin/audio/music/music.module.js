/**
 * Módulo de carga de interface e layout.
 * @namespace app.admin
 */
(function () {
    'use strict';

    angular.module('app.admin.music', [
        'ui.router'
    ])
        .config(routeConfig)
    routeConfig.$inject = ['$stateProvider'];

    /** @ngInject */
    function routeConfig($stateProvider) {
        $stateProvider
            .state('admin_music', {
                resolve: {
                    check: function ($location, cacheService) {
                        var user = cacheService.get('user');
                        if (user == undefined || user == null) {
                            $location.path('/login')
                        }
                    }
                },
                url: '/branch/music',
                parent: 'admin_desktop',
                templateUrl: 'app/modules/admin/audio/music/music.html',
                controller: 'AppAdminMusicController',
                controllerAs: 'vm',

            })
            .state('admin_music_form', {
                resolve: {
                    check: function ($location, cacheService) {
                        var user = cacheService.get('user');
                        if (user == undefined || user == null) {
                            $location.path('/login')
                        }
                    }
                },
                url: '/branch/music/form',
                parent: 'admin_desktop',
                templateUrl: 'app/modules/admin/audio/music/music_form.html',
                controller: 'AppAdminMusicFormController',
                controllerAs: 'vm',
                params: {state_back: null, branch: null},
            });
    }
})();

