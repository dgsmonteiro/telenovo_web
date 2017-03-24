/**
 * Serviço de gestão de planos de vendas do 55pbx.
 * @namespace app.support
 */
(function () {
     'use strict';
     
     angular
     .module('app.admin')
     .service('numberDdrPbxService', numberDdrPbxService);
     
     numberDdrPbxService.$inject = ['requestJsonService', '$q', 'cacheService'];
     
     /** @ngInject */
     /**
      * @namespace UserClientPbxService
      * @desc Application Angular Cache
      * @memberOf Tools
      */
     function numberDdrPbxService(requestJsonService, $q, cacheService) {
          return {
               getListAll: getListAll,
               editInUseNumberStatusInUse: editInUseNumberStatusInUse,
               editInUseNumberStatusReserved: editInUseNumberStatusReserved,
               deleteNumberSelected: deleteNumberSelected,
               editNumberSelected: editNumberSelected,
               addNewNumber: addNewNumber
               
          };
          
          /**
           * @desc Obtem uma lista de todos números cadastrados
           * @return {object}
           */
          function getListAll() {
               var promise_deferred = $q.defer();
               var cache_setting = cacheService.get('app_settings');
               var cache_app = cacheService.get('application');
               var cache_user = cacheService.get('user');
               var url = cache_setting.api.base;
               var method = cache_setting.api.support.pbx.number.get_number_list;
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
           * @desc Executa alteração de status in_use do numero
           * @param _number_id
           * @param _in_use
           * @return {object}
           */
          function editInUseNumberStatusInUse(_number_id, _in_use) {
               var promise_deferred = $q.defer();
               var cache_setting = cacheService.get('app_settings');
               var cache_app = cacheService.get('application');
               var cache_user = cacheService.get('user');
               var url = cache_setting.api.base;
               var method = cache_setting.api.support.pbx.number.put_number_in_use;
               var headers = [
                    {key: 'app_identifier', 'value': cache_app.identifier},
                    {key: 'user_logged', 'value': cache_user._id},
                    {key: 'token', 'value': cache_user.token}
               ];
               var obj = {
                    number_id: _number_id,
                    in_use: _in_use
               };
               requestJsonService.put(url, method, obj, headers, function (result) {
                    promise_deferred.resolve(result);
               });
               return promise_deferred.promise;
          }
     
     
     
          /**
           * @desc Executa alteração de status reservado do numero
           * @param _number_id
           * @param _reserved
           * @return {object}
           */
          function editInUseNumberStatusReserved(_number_id, _reserved) {
               var promise_deferred = $q.defer();
               var cache_setting = cacheService.get('app_settings');
               var cache_app = cacheService.get('application');
               var cache_user = cacheService.get('user');
               var url = cache_setting.api.base;
               var method = cache_setting.api.support.pbx.number.put_number_reserved;
               var headers = [
                    {key: 'app_identifier', 'value': cache_app.identifier},
                    {key: 'user_logged', 'value': cache_user._id},
                    {key: 'token', 'value': cache_user.token}
               ];
               var obj = {
                    number_id: _number_id,
                    reserved: _reserved
               };
               requestJsonService.put(url, method, obj, headers, function (result) {
                    promise_deferred.resolve(result);
               });
               return promise_deferred.promise;
          }
     
     
     
     
     
          /**
           * @desc remove numero selecionado
           * @param _number_id
           * @return {object}
           */
          function deleteNumberSelected(_number_id) {
               var promise_deferred = $q.defer();
               var cache_setting = cacheService.get('app_settings');
               var cache_app = cacheService.get('application');
               var cache_user = cacheService.get('user');
               var url = cache_setting.api.base;
               var method = cache_setting.api.support.pbx.number.delete_number;
               var headers = [
                    {key: 'app_identifier', 'value': cache_app.identifier},
                    {key: 'user_logged', 'value': cache_user._id},
                    {key: 'token', 'value': cache_user.token}
               ];
               var params = [
                    _number_id
               ];
               requestJsonService.delete(url, method, params, headers, function (result) {
                    promise_deferred.resolve(result);
               });
               return promise_deferred.promise;
          }
     
     
     
     
          /**
           * @desc Executa alteração dos dados do número
           * @param _number
           * @return {object}
           */
          function editNumberSelected(_number) {
               var promise_deferred = $q.defer();
               var cache_setting = cacheService.get('app_settings');
               var cache_app = cacheService.get('application');
               var cache_user = cacheService.get('user');
               var url = cache_setting.api.base;
               var method = cache_setting.api.support.pbx.number.put_number_edit;
               var headers = [
                    {key: 'app_identifier', 'value': cache_app.identifier},
                    {key: 'user_logged', 'value': cache_user._id},
                    {key: 'token', 'value': cache_user.token}
               ];
               var obj = {
                    number: _number
               };
               requestJsonService.put(url, method, obj, headers, function (result) {
                    promise_deferred.resolve(result);
               });
               return promise_deferred.promise;
          }
     
     
     
     
          /**
           * @desc Executa registro de novo numero
           * @param _number
           * @return {object}
           */
          function addNewNumber(_number) {
               var promise_deferred = $q.defer();
               var cache_setting = cacheService.get('app_settings');
               var cache_app = cacheService.get('application');
               var cache_user = cacheService.get('user');
               var url = cache_setting.api.base;
               var method = cache_setting.api.support.pbx.number.post_new_number;
               var headers = [
                    {key: 'app_identifier', 'value': cache_app.identifier},
                    {key: 'user_logged', 'value': cache_user._id},
                    {key: 'token', 'value': cache_user.token}
               ];
               var parameters = {
                    number:    _number
               };
               requestJsonService.postUntreated(url, method, parameters, headers, function (result) {
                    var user_result = {
                         user:    null,
                         error:   false,
                         message: null
                    };
                    if (result.status !== 200) {
                         user_result.error = true;
                         user_result.message = result.data.error;
                    } else {
                         user_result.user = result.data;
                    }
                    promise_deferred.resolve(user_result);
               });
               return promise_deferred.promise;
          
          }
     
     
     }
})();


