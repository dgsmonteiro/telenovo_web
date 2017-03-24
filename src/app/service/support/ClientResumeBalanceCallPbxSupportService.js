/**
 * Serviço de gestão de planos de vendas do 55pbx.
 * @namespace app.support
 */
(function () {
     'use strict';
     
     angular
     .module('app.admin')
     .service('clientResumeBalanceCallPbxSupportService', clientResumeBalanceCallPbxSupportService);
     
     clientResumeBalanceCallPbxSupportService.$inject = ['requestJsonService', '$q', 'cacheService'];
     
     /** @ngInject */
     /**
      * @namespace UserClientPbxService
      * @desc Application Angular Cache
      * @memberOf Tools
      */
     function clientResumeBalanceCallPbxSupportService(requestJsonService, $q, cacheService) {
          return {
               getListAllClientBalances:           getListAllClientBalances
          };
          
          
          function getListAllClientBalances() {
               var promise_deferred = $q.defer();
               var cache_setting = cacheService.get('app_settings');
               var cache_app = cacheService.get('application');
               var cache_user = cacheService.get('user');
               var url = cache_setting.api.base;
               var method = cache_setting.api.support.pbx.seller.get_resume_balance_call_client;
               var headers = [
                    {key: 'app_identifier', 'value': cache_app.identifier},
                    {key: 'user_logged', 'value': cache_user._id},
                    {key: 'token', 'value': cache_user.token}
               ];
               requestJsonService.get(url,method, null, headers, function (result) {
                    promise_deferred.resolve(result);
               });
               return promise_deferred.promise;
          }
     }
})();


