/**
 * Serviço de dados de Usuário do Suporte.
 * @namespace app.support
 */
(function () {
     'use strict';
     
     angular
     .module('app.admin')
     .service('preClientSupportService', preClientSupportService);
     
     preClientSupportService.$inject = ['requestJsonService', '$q', 'cacheService', 'Upload'];
     
     /** @ngInject */
     /**
      * @namespace ProposalSupportService
      * @desc Application Angular Cache
      * @memberOf Tools
      */
     function preClientSupportService(requestJsonService, $q, cacheService, Upload) {
          return {
               getListForPeriod:       getListForPeriod,
               getListForString:       getListForString
          };
     
          /**
           *@desc busca lista de pre clientes por periodo
           *
           */
          function getListForPeriod(_dataStart, _dateEnd) {
               var promise_deferred = $q.defer();
               var cache_setting = cacheService.get('app_settings');
               var cache_app = cacheService.get('application');
               var cache_user = cacheService.get('user');
               var url = cache_setting.api.base;
               var method = cache_setting.api.support.pbx.pre_client.get_preClient_list_period;
               var headers = [
                    {key: 'app_identifier', 'value': cache_app.identifier},
                    {key: 'user_logged', 'value': cache_user._id},
                    {key: 'token', 'value': cache_user.token},
               ];
               var params = [
                    _dataStart,
                    _dateEnd,
               ]
               requestJsonService.get(url,method, params, headers, function (result) {
                    promise_deferred.resolve(result);
               });
               return promise_deferred.promise;
          }
     
          /**
           *@desc busca lista de pre clientes por string
           *
           */
          function getListForString(_type,_string) {
               var promise_deferred = $q.defer();
               var cache_setting = cacheService.get('app_settings');
               var cache_app = cacheService.get('application');
               var cache_user = cacheService.get('user');
               var url = cache_setting.api.base;
               var method = cache_setting.api.support.pbx.pre_client.get_preClient_list_string;
               var headers = [
                    {key: 'app_identifier', 'value': cache_app.identifier},
                    {key: 'user_logged', 'value': cache_user._id},
                    {key: 'token', 'value': cache_user.token},
               ];
               var params = [
                    _type,
                    _string
                    
               ]
               requestJsonService.get(url,method, params, headers, function (result) {
                    promise_deferred.resolve(result);
               });
               return promise_deferred.promise;
          }
          
     }
})();


