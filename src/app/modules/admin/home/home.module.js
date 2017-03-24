/**
 * Módulo de carga de interface inicial de aplicação.
 * @namespace app.support
 */
(function () {
    'use strict';

    angular.module('app.admin.home', [
        'ui.router'
    ])
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider) {
        $stateProvider
            .state('admin_home', {
                resolve:{
                    check: function ($location,cacheService) {
                        var user = cacheService.get('user');
                        if(user == undefined || user == null){
                            $location.path('/login')
                        }
                    }
                },
                url: '/home',
                parent: 'admin_desktop',
                templateUrl: 'app/modules/admin/home/home.html',
                controller: 'AppAdminHomeController',
                controllerAs: 'vm',

            });
    }
})();

