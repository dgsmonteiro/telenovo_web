/**
 * Serviço de dados de Usuário do Suporte.
 * @namespace app.support
 */
(function () {
     'use strict';
     
     angular
     .module('app.admin')
     .service('cashBookSupportService', cashBookSupportService);
     
     cashBookSupportService.$inject = ['requestJsonService', '$q', 'cacheService'];
     
     /** @ngInject */
     /**
      * @namespace cashBookSupportService
      * @desc Application Angular Cache
      * @memberOf Tools
      */
     function cashBookSupportService(requestJsonService, $q, cacheService) {
          return {
               getListForPeriod:       getListForPeriod,
              
          };
     
          /**
           *@desc busca lista de cashbook por periodo e id do vendedor
           *
           */
          function getListForPeriod(_dataStart, _dateEnd) {
               var promise_deferred = $q.defer();
               var cache_setting = cacheService.get('app_settings');
               var cache_app = cacheService.get('application');
               var cache_user = cacheService.get('user');
               var url = cache_setting.api.base;
               var method = cache_setting.api.support.pbx.cashBook.get_list_cashBook_for_period;
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
          
     }
})();


