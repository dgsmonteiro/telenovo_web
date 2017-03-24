/**
 * Controller  de carga de interface inicial de aplicação.
 * @namespace app.admin
 */

(function () {
     'use strict';
     
     angular
     .module('app.admin.home')
     .controller('AppAdminHomeController', AppAdminHomeController);

     AppAdminHomeController.$inject = ['$translate', '$state', 'cacheService'];
     
     /** @ngInject */
     function AppAdminHomeController($translate, $state, cacheService) {
          //variáveis da aplicação
          /* jshint validthis: true */
          var vm = this;

          
          
          init();
          
          function init() {
              vm.user = cacheService.get('user');
              if(vm.user == undefined || vm.user == null){
                  $state.go('admin_user_login');
              }
          }
          
     }
})();
