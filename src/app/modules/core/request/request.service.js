/**
 * @author Isaias Nascimento de Carvalho
 * @namespace app.core
 * @description Serviço com métodos HTTP para requisições http / json
 */
(function () {
     'use strict';

     angular
     .module('app.request')
     .service('requestJsonService', requestJsonService);


     requestJsonService.$inject = ['$http', '$uibModal', '$translate'];


     /** @ngInject */
     function requestJsonService($http, $uibModal, $translate) {

          return {
               get:           get,
               getUntreated:  getUntreated,
               post:          post,
               postUntreated: postUntreated,
               put:           put,
               putUntreated:  putUntreated,
               delete:        del,
          };

          var loadingModalInstace = null;

          /**
           * Modal de loading
           * @param $uibModal
           */
          function loadingModal($uibModal) {
               loadingModalInstace = $uibModal.open({
                    animation:   true,
                    templateUrl: 'app/modules/core/request/request.loading.modal.html',
                    keyboard:    false,
                    backdrop:    'static',
                    windowClass: 'appcustom-modal-med',
                    controller:  function DialogController($scope, $uibModalInstance) {
                         $scope.closeDialog = function () {
                              $uibModalInstance.close(true);
                         };
                    }
               });
          }


          /**
           * Executa request tipo GET
           * @param url
           * @param method
           * @param parameters
           * @param headers
           * @param callback
           * @return {TransactionModel}
           */
          function get(url, method, parameters, headers, callback, loading_modal) {

               if (loading_modal !== undefined && loading_modal) {
                    loadingModal($uibModal);
               }

               $http({
                    method:       "GET",
                    url:          url + "/" + method + convertParameters(parameters),
                    responseType: "json",
                    headers:      convertHeaders(headers)
               }).then(function successCallback(response) {
                    if (loading_modal != undefined && loading_modal) {
                         loadingModalInstace.close();
                    }
                    callback(response.data);
               }, function errorCallback(response) {
                    if (loading_modal != undefined && loading_modal) {
                         loadingModalInstace.close();
                    }
                    modal(response, $uibModal, $translate)
               });
          }

          /**
           * Executa request tipo GET sem tratamento do retorno
           * @param url
           * @param method
           * @param parameters
           * @param headers
           * @param callback
           * @return {TransactionModel}
           */
          function getUntreated(url, method, parameters, headers, callback, loading_modal) {


               if (loading_modal !== undefined && loading_modal) {
                    loadingModal($uibModal);
               }

               $http({
                    method:       "GET",
                    url:          url + "/" + method + convertParameters(parameters),
                    responseType: "json",
                    headers:      convertHeaders(headers)
               }).then(function successCallback(response) {
                    if (loading_modal != undefined && loading_modal) {
                         loadingModalInstace.close();
                    }
                    if (loading_modal != undefined && loading_modal) {
                         loadingModalInstace.close();
                    }
                    callback(response);
               }, function errorCallback(response) {
                    if (loading_modal != undefined && loading_modal) {
                         loadingModalInstace.close();
                    }
                    if (loading_modal != undefined && loading_modal) {
                         loadingModalInstace.close();
                    }
                    callback(response);
               });
          }

          /**
           * Executa request tipo POST
           * @param url
           * @param method
           * @param data
           * @param headers
           * @param callback
           * @return {TransactionModel}
           */
          function post(url, method, data, headers, callback, loading_modal) {

               if (loading_modal !== undefined && loading_modal) {
                    loadingModal($uibModal);
               }

               $http({
                    method:       "POST",
                    url:          url + "/" + method,
                    data:         JSON.stringify(data),
                    responseType: "json",
                    headers:      convertHeaders(headers)
               }).then(function successCallback(response) {
                    if (loading_modal != undefined && loading_modal) {
                         loadingModalInstace.close();
                    }
                    callback(response.data);
               }, function errorCallback(response) {
                    if (loading_modal != undefined && loading_modal) {
                         loadingModalInstace.close();
                    }
                    modal(response, $uibModal, $translate)
               });
          }

          /**
           * Executa request tipo POST sem tratamento do retorno
           * @param url
           * @param method
           * @param data
           * @param headers
           * @param callback
           * @return {TransactionModel}
           */
          function postUntreated(url, method, data, headers, callback, loading_modal) {

               if (loading_modal !== undefined && loading_modal) {
                    loadingModal($uibModal);
               }

               $http({
                    method:       "POST",
                    url:          url + "/" + method,
                    data:         JSON.stringify(data),
                    responseType: "json",
                    headers:      convertHeaders(headers)
               }).then(function successCallback(response) {
                    if (loading_modal != undefined && loading_modal) {
                         loadingModalInstace.close();
                    }
                    callback(response);
               }, function errorCallback(response) {
                    if (loading_modal != undefined && loading_modal) {
                         loadingModalInstace.close();
                    }
                    callback(response);
               });
          }

          /**
           * Executa request tipo PUT
           * @param url
           * @param method
           * @param data
           * @param headers
           * @param callback
           * @return {TransactionModel}
           */
          function put(url, method, data, headers, callback,loading_modal) {

               if (loading_modal !== undefined && loading_modal, loading_modal) {
                    loadingModal($uibModal);
               }

               $http({
                    method:       "PUT",
                    url:          url + "/" + method,
                    data:         JSON.stringify(data),
                    responseType: "json",
                    headers:      convertHeaders(headers)
               }).then(function successCallback(response) {
                    if (loading_modal != undefined && loading_modal) {
                         loadingModalInstace.close();
                    }
                    callback(response.data);
               }, function errorCallback(response) {
                    if (loading_modal != undefined && loading_modal) {
                         loadingModalInstace.close();
                    }
                    modal(response, $uibModal, $translate)
               });
          }


          /**
           * Executa request tipo POST sem tratamento do retorno
           * @param url
           * @param method
           * @param data
           * @param headers
           * @param callback
           * @return {TransactionModel}
           */
          function putUntreated(url, method, data, headers, callback, loading_modal) {

               if (loading_modal !== undefined && loading_modal) {
                    loadingModal($uibModal);
               }

               $http({
                    method:       "PUT",
                    url:          url + "/" + method,
                    data:         JSON.stringify(data),
                    responseType: "json",
                    headers:      convertHeaders(headers)
               }).then(function successCallback(response) {
                    if (loading_modal != undefined && loading_modal) {
                         loadingModalInstace.close();
                    }
                    callback(response);
               }, function errorCallback(response) {
                    if (loading_modal != undefined && loading_modal) {
                         loadingModalInstace.close();
                    }
                    callback(response);
               });
          }


          /**
           * Executa request tipo DELETE
           * @param url
           * @param method
           * @param parameters
           * @param headers
           * @param callback
           * @return {TransactionModel}
           */
          function del(url, method, parameters, headers, callback, loading_modal) {

               if (loading_modal !== undefined && loading_modal) {
                    loadingModal($uibModal);
               }

               $http({
                    method:       "DELETE",
                    url:          url + "/" + method + convertParameters(parameters),
                    responseType: "json",
                    headers:      convertHeaders(headers)
               }).then(function successCallback(response) {
                    if (loading_modal != undefined && loading_modal) {
                         loadingModalInstace.close();
                    }
                    callback(response.data);
               }, function errorCallback(response) {
                    if (loading_modal != undefined && loading_modal) {
                         loadingModalInstace.close();
                    }
                    modal(response, $uibModal, $translate)
               });
          }
     }


     /**
      * Converte array de parametros.
      * @param parameters
      * @returns {string}
      */
     function convertParameters(parameters) {
          var stringParameter = "";
          angular.forEach(parameters, function (item) {
               stringParameter += "/" + item;
          });

          return stringParameter;
     }

     /**
      * Converte array de headers
      * @param headers
      */
     function convertHeaders(headers) {
          var newHeaders = [];
          newHeaders['Content-Type'] = "application/json;charset=UTF-8";
          angular.forEach(headers, function (item) {
               newHeaders[item.key] = item.value;
          });

          return newHeaders;
     }


     /**
      * Modal de erro
      * @param response
      * @param $uibModal
      * @param $location
      * @param $translate
      */
     function modal(response, $uibModal, $translate) {
          var message = "";
          var transaction_id = "";

          if (response.data === null) {
               message = $translate.instant("request.message_error_server");
          } else {
               message = response.data.error;
               transaction_id = response.data.transaction_id;
          }

          var modal = $uibModal.open({
               animation:   true,
               templateUrl: 'app/modules/core/request/request.modal.html',
               keyboard:    false,
               backdrop:    'static',
               controller:  function DialogController($scope, $uibModalInstance, data, cacheService, requestJsonService) {
                    $scope.user = cacheService.get('user');
                    $scope.application = cacheService.get('application');
                    $scope.client = cacheService.get('client');
                    $scope.message = data.message;
                    $scope.transaction_id = data.transaction_id;
                    $scope.code = data.code;
                    $scope.status = data.status;
                    $scope.url = data.url;
                    $scope.expiredToken = false;
                    $scope.errorNotSent = false;
                    $scope.ticket_support = {};

                    if (response.status === 417) {
                         $scope.expiredToken = true;
                    }

                    $scope.closeDialog = function () {
                         $uibModalInstance.close(true);
                    };
                    $scope.sendSupportError = function () {
                         var cache = cacheService.get('app_settings');
                         //envia erro para suporte da BCR
                         var url = cache.api.base;
                         var method = cache.api.app_pbx.support_error.post_support_error_zendesk;
                         var parameters = {
                              "client_name":    null,
                              "client_id":      null,
                              "user_id":        null,
                              "user_name":      null,
                              "user_email":     null,
                              "code":           $scope.code,
                              "message":        $scope.message,
                              "transaction_id": $scope.transaction_id,
                              "history":        null,
                              "domain":         window.location.host
                         };
                         if ($scope.client !== undefined) {
                              parameters.client_name = $scope.client.name;
                              parameters.client_id = $scope.client._id;
                         }
                         if ($scope.user !== undefined) {
                              parameters.user_id = $scope.user.id;
                              parameters.user_name = $scope.user.name;
                              parameters.user_email = $scope.user.email;
                         }
                         requestJsonService.post(url, method, parameters, null, function (result) {
                              $scope.ticket_support = {
                                   id:         result.ticket.id,
                                   created_at: result.ticket.created_at
                              };
                              $scope.errorNotSent = true;
                         });

                    }
               },
               resolve:     {
                    data: function () {
                         return {
                              code:           response.status,
                              message:        message,
                              transaction_id: transaction_id,
                              url:            response.config.url,
                              status:         response.statusText
                         }
                    }
               }
          });
     }


})();

