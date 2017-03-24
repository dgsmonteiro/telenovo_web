/**
 * Serviço de utilização de ferramentas gereais
 * @namespace app
 */
(function () {
     'use strict';
     
     angular
     .module('app.core')
     .service('toolsService', toolsService);
     
     toolsService.$inject = ['requestJsonService', 'cacheService', '$q'];
     
     /** @ngInject */
     function toolsService(requestJsonService, cacheService, $q) {
          return {
               getListAllBrazilStates:       getListAllBrazilStates,
               getAddressBrazilAddressByCep: getAddressBrazilAddressByCep,
               getListAllCountries: getListAllCountries
          };
          
          /**
           * Obtem lista de todos os estados brasileiros com cidades
           * @returns {promise.promise|jQuery.promise|*|promise|n.promise|d.promise}
           */
          function getListAllBrazilStates() {
               var promise_deferred = $q.defer();
               var cache_setting = cacheService.get('app_settings');
               var cache_app = cacheService.get('application');
               var cache_user = cacheService.get('user');
               var url = cache_setting.api.base;
               var method = cache_setting.api.tools.get_list_all_brazil_state;
               var headers = [
                    {key: 'app_identifier', 'value': cache_app.identifier},
                    /*{key: 'user_logged', 'value': cache_user._id},
                    {key: 'token', 'value': cache_user.token},*/
               ];
               requestJsonService.get(url, method, null, headers, function (result) {
                    promise_deferred.resolve(result);
               });
               return promise_deferred.promise;
          }
          
          
          function getAddressBrazilAddressByCep(_cep) {
               var promise_deferred = $q.defer();
               var cache_setting = cacheService.get('app_settings');
               var cache_app = cacheService.get('application');
               var cache_user = cacheService.get('user');
               var url = cache_setting.api.base;
               var method = cache_setting.api.tools.get_address_brazil_cep;
               var headers = [
                    {key: 'app_identifier', 'value': cache_app.identifier},
                    /*{key: 'user_logged', 'value': cache_user._id},
                    {key: 'token', 'value': cache_user.token},*/
               ];
               requestJsonService.get(url, method, [_cep], headers, function (result) {
                    promise_deferred.resolve(result);
               });
               return promise_deferred.promise;
          }
          
          
          /**
           * Obtem lista de todos paises
           * @returns {promise.promise|jQuery.promise|*|promise|n.promise|d.promise}
           */
          function getListAllCountries() {
               var promise_deferred = $q.defer();
               var cache_setting = cacheService.get('app_settings');
               var cache_app = cacheService.get('application');
               var cache_user = cacheService.get('user');
               var url = cache_setting.api.base;
               var method = cache_setting.api.tools.get_list_all_countries;
               var headers = [
                    {key: 'app_identifier', 'value': cache_app.identifier},
                    /*{key: 'user_logged', 'value': cache_user._id},
                    {key: 'token', 'value': cache_user.token},*/
               ];
               requestJsonService.get(url, method, null, headers, function (result) {
                    promise_deferred.resolve(result);
               });
               return promise_deferred.promise;
          }
     
     
     }
})();


