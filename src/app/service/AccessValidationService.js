/**
 * Serviço de validação de acesso de usuário x permissão de acesso
 * @namespace app.core
 */
(function () {
     'use strict';
     
     angular
     .module('app.core')
     .service('accessValidationService', accessValidationService);
     
     accessValidationService.$inject = ['$uibModal', '$translate'];
     
     /** @ngInject */
     function accessValidationService($uibModal, $translate) {
          return {
               validateUser:        validateUser,
               validateClient:      validateClient,
               validateActive:      validateActive,
               validateUserSupport: validateUserSupport
          };
          
          /**
           * @desc Valida se usuário tem acesso a rotina
           * @param _user_permission
           * @param _controller_permission
           * @return {Boolean}
           */
          function validateUser(_user_permission, _controller_permission) {
               if (_user_permission < _controller_permission) {
                    var modal = $uibModal.open({
                         animation:   true,
                         templateUrl: 'app/layout/modal_danger.html',
                         keyboard:    false,
                         backdrop:    'static',
                         controller:  function DialogController($scope, $uibModalInstance, data) {
                              $scope.message = data.message;
                              $scope.title = data.title;
                              $scope.closeDialog = function () {
                                   $uibModalInstance.close(true);
                              }
                         },
                         resolve:     {
                              data: function () {
                                   return {
                                        message: $translate.instant('app.permission_denied'),
                                        title:   $translate.instant('app.modal_permssion_title')
                                   }
                              }
                         }
                    });
                    return false;
               } else {
                    return true
               }
          }
          
          
          /**
           * @desc Valida se cliente tem acesso a funcionalidade
           * @param _client_level
           * @param _controller_level
           * @param _plan
           * @return {Boolean}
           */
          function validateClient(_client_level, _controller_level, _plan) {
               if (_client_level < _controller_level) {
                    var modal = $uibModal.open({
                         animation:   true,
                         templateUrl: 'app/layout/modal_warning.html',
                         keyboard:    false,
                         backdrop:    'static',
                         controller:  function DialogController($scope, $uibModalInstance, data) {
                              $scope.message = data.message;
                              $scope.title = data.title;
                              $scope.closeDialog = function () {
                                   $uibModalInstance.close(true);
                              }
                         },
                         resolve:     {
                              data: function () {
                                   return {
                                        message: $translate.instant('app.level_denied') + _plan + "!",
                                        title:   $translate.instant('app.modal_permssion_title')
                                   }
                              }
                         }
                    });
                    return false;
               } else {
                    return true
               }
               
          }
          
          
          /**
           * @desc Valida se usuário está com a conta suspensa
           * @param _user_state
           * @param _controller_permission
           * @return {Boolean}
           */
          function validateActive(_user_state) {
               if (!_user_state) {
                    var modal = $uibModal.open({
                         animation:   true,
                         templateUrl: 'app/layout/modal_danger.html',
                         keyboard:    false,
                         backdrop:    'static',
                         controller:  function DialogController($scope, $uibModalInstance, data) {
                              $scope.message = data.message;
                              $scope.title = data.title;
                              $scope.closeDialog = function () {
                                   $uibModalInstance.close(true);
                              }
                         },
                         resolve:     {
                              data: function () {
                                   return {
                                        message: $translate.instant('app.permission_suspended'),
                                        title:   $translate.instant('app.modal_suspended_title')
                                   }
                              }
                         }
                    });
                    return false;
               } else {
                    return true
               }
          }
          
          
          /**
           * @desc Valida se usuário tem acesso a rotina de suporte
           * @param _user_level
           * @param _controller_level
           * @return {Boolean}
           */
          function validateUserSupport(_user_level, _controller_level) {
               
               var teste = _controller_level.indexOf(_user_level);
               if (_controller_level.indexOf(_user_level) == -1) {
                    $uibModal.open({
                         animation:   true,
                         templateUrl: 'app/layout/modal_danger.html',
                         keyboard:    false,
                         backdrop:    'static',
                         controller:  function DialogController($scope, $uibModalInstance, data) {
                              $scope.message = data.message;
                              $scope.title = data.title;
                              $scope.closeDialog = function () {
                                   $uibModalInstance.close(true);
                              }
                         },
                         resolve:     {
                              data: function () {
                                   return {
                                        message: $translate.instant('app.permission_denied'),
                                        title:   $translate.instant('app.modal_permssion_title')
                                   }
                              }
                         }
                    });
                    return false;
               } else {
                    return true
               }
          }
          
     }
})();


