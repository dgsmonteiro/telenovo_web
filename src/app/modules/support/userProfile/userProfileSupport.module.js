/**
 * Módulo para alteração de dados de usuário.
 * @namespace app.admin
 */
(function () {
     'use strict';
     
     angular.module('app.support.userProfile', [
          'ui.router'
     ])
     .config(routeConfig);
     
     /** @ngInject */
     function routeConfig($stateProvider, constant_app_path) {
          $stateProvider
          .state('support_user_profile', {
               parent:       'support_desktop_55pbx',
               templateUrl:  constant_app_path.modules_support + '/userProfile/userProfileSupport.html',
               controller:   'AppSupportUserProfileController',
               controllerAs: 'vm',
          })
          .state('support_user_profile_change_password', {
               parent:       'support_desktop_55pbx',
               templateUrl:  constant_app_path.modules_support + '/userProfile/changePasswordSupport.html',
               controller:   'AppSupportUserProfileController',
               controllerAs: 'vm'
          })
          
     }
})();

