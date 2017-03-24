/**
 * Serviço de gestão de operadoras de telefonia do 55pbx.
 * @namespace app.support
 */
(function () {
     'use strict';
     
     angular
     .module('app.admin')
     .service('operatorPbxService', operatorPbxService);
     
     operatorPbxService.$inject = ['requestJsonService', '$q', 'cacheService'];
     
     /** @ngInject */
     /**
      * @namespace UserClientPbxService
      * @desc Application Angular Cache
      * @memberOf Tools
      */
     function operatorPbxService(requestJsonService, $q, cacheService) {
          return {
               getListActive: getListActive,
               
          };
          
          /**
           * @desc Obtem uma lista de todas operadoras ativas.
           * @return {object}
           */
          function getListActive() {
               var promise_deferred = $q.defer();
               var cache_setting = cacheService.get('app_settings');
               var cache_app = cacheService.get('application');
               var cache_user = cacheService.get('user');
               var url = cache_setting.api.base;
               var method = cache_setting.api.support.pbx.operator.get_operator_list_active;
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
          
     }
})();


