/**
 * Controller para login de usuário
 * @namespace app.admin
 */

(function () {
    'use strict';

    angular
        .module('app.support.userLogin')
        .controller('AppSupportUserLoginController', AppSupportUserLoginController);

    AppSupportUserLoginController.$inject = ['$state', 'userSupportService', 'cacheService', '$rootScope', 'socketService'];

    /** @ngInject */
    function AppSupportUserLoginController($state, userSupportService, cacheService, $rootScope, socketService) {
        /* jshint validthis: true */
        var vm = this;
        vm.settings_cache = null;
        vm.application = null;
        vm.makeLogin = makeLogin;
        vm.closeAlert = closeAlert;
        vm.vai = vai;

        init();

        //carga da controller
        function init() {
            vm.email = "douglas.monteiro@telenovo.com.br";
            vm.password = "123456789";
        }


        //fecha alert
        function closeAlert(index) {
            vm.alerts.splice(index, 1);
        }

        //função para execução do login
        function makeLogin() {
            if (vm.email != undefined && vm.password != undefined) {
                userSupportService.authenticate(vm.email, vm.password)
                    .then(function (result) {
                        vm.settings_cache = cacheService.get('app_settings');
                        vm.application = cacheService.get('application');
                        if (!result.error) {
                            if (result.user.img_url == undefined || result.user.img_url.length == 0) {
                                result.user.img_url = vm.settings_cache.user_default_img_url;
                            }
                            cacheService.put('user', result.user);
                            cacheService.put('client', result.user.clients[0]);
                            $rootScope.user_permission = result.user.clients[0].user_permission;
                            socketService.connect(vm.settings_cache.api.socket, vm.application.identifier, result.user.clients[0]._id, result.user._id, null);
                            $state.go('admin_desktop');
                        }
                        else {
                            vm.alerts = [
                                {type: 'danger', msg: result.message, time: 10000},
                            ];
                        }
                    });
            }
        }

        function vai() {
            $state.go('admin_desktop')
        }
        function passwordRecovery() {
            $state.go('support_user_password_recovery')
        }


    }
})();
