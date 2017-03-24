/**
 * Controller de carga da aplicação e interface de área de suporte.
 * @namespace app.admin
 */

(function () {
     'use strict';
     
     angular
     .module('app.admin.desktop')
     .controller('AppAdminDesktopPbxController', AppAdminDesktopPbxController);

     AppAdminDesktopPbxController.$inject = ['$translate', '$state', 'cacheService'];
     
     
     /** @ngInject */
     function AppAdminDesktopPbxController($translate, $state, cacheService) {
          
          /* jshint validthis: true */
          var vm = this;
          vm.application = null;
          vm.navbarCollapsed = false;
          vm.app_title1 = null;
          vm.app_title2 = null;
          vm.settings = null;
          vm.menu_list = [];
          
          
          init();
          
          //carrega dashboard do desktop
          function init() {
               $state.current.title = "";
               vm.app_title1 = "Tele";
               vm.app_title2 = "Novo";
               vm.navbarCollapsed = true;
               vm.user = cacheService.get('user');
               vm.application = cacheService.get('application');
               vm.settings = cacheService.get('app_settings');

               if(vm.user == undefined || vm.user == null){
                    $state.go('admin_user_login');
               }

               if (vm.settings.mode == 'dev' && vm.settings.dev && $state.params.module !== null) {
                    vm.dev_mode = true;
                    $state.go($state.params.module);
               } else {

                    $state.go('admin_home');
               }
               
               
          }
          
     }
})();
