/**
 * Serviço de dados de Usuário do Suporte.
 * @namespace app.support
 */
(function () {
     'use strict';
     
     angular
     .module('app.admin')
     .service('buylicenseSupportService', buylicenseSupportService);
     
     buylicenseSupportService.$inject = ['requestJsonService', '$q', 'cacheService'];
     
     /** @ngInject */
     /**
      * @namespace cashBookSupportService
      * @desc Application Angular Cache
      * @memberOf Tools
      */
     function buylicenseSupportService(requestJsonService, $q, cacheService) {
          return {
               postPurchase:       postPurchase,
          };
     
          /**
           *@desc efetua uma compra
           *
           */
          function postPurchase(_purchase) {
               var promise_deferred = $q.defer();
               var cache_setting = cacheService.get('app_settings');
               var cache_app = cacheService.get('application');
               var cache_user = cacheService.get('user');
               var url = cache_setting.api.base;
               var method = cache_setting.api.support.pbx.buyLicense.purchase;
               var headers = [
                    {key: 'app_identifier', 'value': cache_app.identifier},
                    {key: 'user_logged', 'value': cache_user._id},
                    {key: 'token', 'value': cache_user.token},
               ];
               
               requestJsonService.post(url,method, _purchase, headers, function (result) {
                    promise_deferred.resolve(result);
               });
               return promise_deferred.promise;
          }
          
     }
})();


