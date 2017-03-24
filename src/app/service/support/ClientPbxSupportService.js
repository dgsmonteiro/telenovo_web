/**
 * Serviço de gestão de planos de vendas do 55pbx.
 * @namespace app.support
 */
(function () {
     'use strict';
     
     angular
     .module('app.admin')
     .service('clientPbxSupportService', clientPbxSupportService);
     
     clientPbxSupportService.$inject = ['requestJsonService', '$q', 'cacheService'];
     
     /** @ngInject */
     /**
      * @namespace UserClientPbxService
      * @desc Application Angular Cache
      * @memberOf Tools
      */
     function clientPbxSupportService(requestJsonService, $q, cacheService) {
          return {
               getListAllClients:           getListAllClients,
               getListAllClientsLicense:    getListAllClientsLicense,
               getClientAccountInformation: getClientAccountInformation,
               getClientBranchNumberLastfiveCalls: getClientBranchNumberLastfiveCalls,
               sendAccountResumePdfToEmail: sendAccountResumePdfToEmail,
               getSupportClientListCallTotal: getSupportClientListCallTotal
          };
          
          /**
           * @desc Obtem uma lista de todos os clientes cadastrados
           * @return {object}
           */
          function getListAllClients() {
               var promise_deferred = $q.defer();
               var cache_setting = cacheService.get('app_settings');
               var cache_app = cacheService.get('application');
               var cache_user = cacheService.get('user');
               var url = cache_setting.api.base;
               var method = cache_setting.api.support.pbx.client.get_client_list;
               var headers = [
                    {key: 'app_identifier', 'value': cache_app.identifier},
                    {key: 'user_logged', 'value': cache_user._id},
                    {key: 'token', 'value': cache_user.token},
               ];
               requestJsonService.get(url, method, null, headers, function (result) {
                    promise_deferred.resolve(result);
               });
               return promise_deferred.promise;
          }
          /*get_client_list_license*/
     
          function getListAllClientsLicense() {
               var promise_deferred = $q.defer();
               var cache_setting = cacheService.get('app_settings');
               var cache_app = cacheService.get('application');
               var cache_user = cacheService.get('user');
               var url = cache_setting.api.base;
               var method = cache_setting.api.support.pbx.client.get_client_list_license;
               var headers = [
                    {key: 'app_identifier', 'value': cache_app.identifier},
                    {key: 'user_logged', 'value': cache_user._id},
                    {key: 'token', 'value': cache_user.token},
               ];
               requestJsonService.get(url, method, null, headers, function (result) {
                    promise_deferred.resolve(result);
               });
               return promise_deferred.promise;
          }
          
          
          /**
           * @desc Obtem as informacoes da conta do cliente selecionado
           * @return {object}
           */
          function getClientAccountInformation(_client_id) {
               var promise_deferred = $q.defer();
               var cache_setting = cacheService.get('app_settings');
               var cache_app = cacheService.get('application');
               var cache_user = cacheService.get('user');
               var url = cache_setting.api.base;
               var method = cache_setting.api.support.pbx.client.get_client_account;
               var headers = [
                    {key: 'app_identifier', 'value': cache_app.identifier},
                    {key: 'user_logged', 'value': cache_user._id},
                    {key: 'token', 'value': cache_user.token},
               ];
               var params = [
                    _client_id
               ];
               requestJsonService.get(url, method, params, headers, function (result) {
                    promise_deferred.resolve(result);
               });
               return promise_deferred.promise;
          }
          
          
          /**
           * @desc Obtem as informacoes da conta do cliente selecionado
           * @return {object}
           */
          function getClientBranchNumberLastfiveCalls(_client_id) {
               var promise_deferred = $q.defer();
               var cache_setting = cacheService.get('app_settings');
               var cache_app = cacheService.get('application');
               var cache_user = cacheService.get('user');
               var url = cache_setting.api.base;
               var method = cache_setting.api.support.pbx.client.get_client_branch_last_calls;
               var headers = [
                    {key: 'app_identifier', 'value': cache_app.identifier},
                    {key: 'user_logged', 'value': cache_user._id},
                    {key: 'token', 'value': cache_user.token},
               ];
               var params = [
                    _client_id
               ];
               requestJsonService.get(url, method, params, headers, function (result) {
                    promise_deferred.resolve(result);
               });
               return promise_deferred.promise;
          }
     
     
     
     
          /**
           * @desc Executa alteração dos dados do número
           * @param _number
           * @return {object}
           */
          function sendAccountResumePdfToEmail(_client_id, _email, _attach) {
               var promise_deferred = $q.defer();
               var cache_setting = cacheService.get('app_settings');
               var cache_app = cacheService.get('application');
               var cache_user = cacheService.get('user');
               var url = cache_setting.api.base;
               var method = cache_setting.api.support.pbx.client.put_send_email;
               var headers = [
                    {key: 'app_identifier', 'value': cache_app.identifier},
                    {key: 'user_logged', 'value': cache_user._id},
                    {key: 'token', 'value': cache_user.token}
               ];
               var obj = {
                    client_id: _client_id,
                    email: _email,
                    attachment: _attach
               };
               requestJsonService.put(url, method, obj, headers, function (result) {
                    promise_deferred.resolve(result);
               });
               return promise_deferred.promise;
          }
     
     
     
          /**
           * Obtem a contagem das ligações do cliente
           * @returns [Client]
           */
          function getSupportClientListCallTotal(_client_id) {
               var promise_deferred = $q.defer();
               var cache_setting = cacheService.get('app_settings');
               var cache_app = cacheService.get('application');
               var cache_user = cacheService.get('user');
               var url = cache_setting.api.base;
               var method = cache_setting.api.support.pbx.client.get_list_call_total;
               var headers = [
                    {key: 'app_identifier', 'value': cache_app.identifier},
                    {key: 'user_logged', 'value': cache_user._id},
                    {key: 'token', 'value': cache_user.token}
               ];
          
               var params = [
                    _client_id
               ];
          
               requestJsonService.get(url, method, params, headers, function (result) {
                    promise_deferred.resolve(result);
               });
               return promise_deferred.promise;
          }
          
     }
})();


