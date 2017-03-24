/**
 * Serviço de dados de Usuário do Suporte.
 * @namespace app.support
 */
(function () {
     'use strict';
     
     angular
     .module('app.admin')
     .service('sellerSupportService', sellerSupportService);
     
     sellerSupportService.$inject = ['requestJsonService', '$q', 'cacheService', 'Upload'];
     
     /** @ngInject */
     /**
      * @namespace UserClientPbxService
      * @desc Application Angular Cache
      * @memberOf Tools
      */
     function sellerSupportService(requestJsonService, $q, cacheService, Upload) {
          return {
               getListAllByFather:     getListAllByFather,
               getListAllActiveByFather:     getListAllActiveByFather,
               postAddNewSeller: postAddNewSeller,
               putEditSeller: putEditSeller,
               putSuspendedSeller: putSuspendedSeller,
               putDismissalSeller: putDismissalSeller,
               putValuesSeller: putValuesSeller,
               getSellerLogged: getSellerLogged
          };
     
          /**
           *@desc busca lista de vendedores filhos
           *
           */
          function getListAllByFather() {
               var promise_deferred = $q.defer();
               var cache_setting = cacheService.get('app_settings');
               var cache_app = cacheService.get('application');
               var cache_user = cacheService.get('user');
               var url = cache_setting.api.base;
               var method = cache_setting.api.support.pbx.seller.get_list_saller_by_father;
               var headers = [
                    {key: 'app_identifier', 'value': cache_app.identifier},
                    {key: 'user_logged', 'value': cache_user._id},
                    {key: 'token', 'value': cache_user.token},
               ];
               requestJsonService.getUntreated(url,method, null, headers, function (result) {
                    promise_deferred.resolve(result);
               });
               return promise_deferred.promise;
          }
     
          /**
           *@desc busca lista de vendedores filhos
           *
           */
          function getListAllActiveByFather() {
               var promise_deferred = $q.defer();
               var cache_setting = cacheService.get('app_settings');
               var cache_app = cacheService.get('application');
               var cache_user = cacheService.get('user');
               var url = cache_setting.api.base;
               var method = cache_setting.api.support.pbx.seller.get_list_saller_active_by_father;
               var headers = [
                    {key: 'app_identifier', 'value': cache_app.identifier},
                    {key: 'user_logged', 'value': cache_user._id},
                    {key: 'token', 'value': cache_user.token},
               ];
               requestJsonService.getUntreated(url,method, null, headers, function (result) {
                    promise_deferred.resolve(result);
               });
               return promise_deferred.promise;
          }
     
     
          /**
           * @desc Salva um novo vendedor
           * @param _seller
           * @return {object}
           */
          function postAddNewSeller(_seller) {
               var promise_deferred = $q.defer();
               var cache_setting = cacheService.get('app_settings');
               var cache_app = cacheService.get('application');
               var cache_user = cacheService.get('user');
               var url = cache_setting.api.base;
               var method = cache_setting.api.support.pbx.seller.post_add_saller_by_father;
               var headers = [
                    {key: 'app_identifier', 'value': cache_app.identifier},
                    {key: 'user_logged', 'value': cache_user._id},
                    {key: 'token', 'value': cache_user.token},
               ];
               var obj = {
                    seller: _seller
               };
               requestJsonService.post(url, method, obj, headers, function (result) {
                    promise_deferred.resolve(result);
               });
               return promise_deferred.promise;
          }
     
          /**
           * @desc Edita um vendedor
           * @param _seller
           * @return {object}
           */
          function putEditSeller(_seller) {
               var promise_deferred = $q.defer();
               var cache_setting = cacheService.get('app_settings');
               var cache_app = cacheService.get('application');
               var cache_user = cacheService.get('user');
               var url = cache_setting.api.base;
               var method = cache_setting.api.support.pbx.seller.put_edit_saller_by_father;
               var headers = [
                    {key: 'app_identifier', 'value': cache_app.identifier},
                    {key: 'user_logged', 'value': cache_user._id},
                    {key: 'token', 'value': cache_user.token},
               ];
               var obj = {
                    seller: _seller
               };
               requestJsonService.post(url, method, obj, headers, function (result) {
                    promise_deferred.resolve(result);
               });
               return promise_deferred.promise;
          }
     
          /**
           * @desc Suspender um vendedor
           * @param _seller
           * @return {object}
           */
          function putSuspendedSeller(_seller_id, _suspended) {
               var promise_deferred = $q.defer();
               var cache_setting = cacheService.get('app_settings');
               var cache_app = cacheService.get('application');
               var cache_user = cacheService.get('user');
               var url = cache_setting.api.base;
               var method = cache_setting.api.support.pbx.seller.put_suspended_saller_by_father;
               var headers = [
                    {key: 'app_identifier', 'value': cache_app.identifier},
                    {key: 'user_logged', 'value': cache_user._id},
                    {key: 'token', 'value': cache_user.token},
               ];
               var obj = {
                    seller_id: _seller_id,
                    suspended: _suspended
               };
               requestJsonService.post(url, method, obj, headers, function (result) {
                    promise_deferred.resolve(result);
               });
               return promise_deferred.promise;
          }
     
          /**
           * @desc Demitir um vendedor
           * @param _seller
           * @return {object}
           */
          function putDismissalSeller(_seller) {
               var promise_deferred = $q.defer();
               var cache_setting = cacheService.get('app_settings');
               var cache_app = cacheService.get('application');
               var cache_user = cacheService.get('user');
               var url = cache_setting.api.base;
               var method = cache_setting.api.support.pbx.seller.put_dismissal_saller_by_father;
               var headers = [
                    {key: 'app_identifier', 'value': cache_app.identifier},
                    {key: 'user_logged', 'value': cache_user._id},
                    {key: 'token', 'value': cache_user.token},
               ];
               var obj = {
                    seller: _seller
               };
               requestJsonService.post(url, method, obj, headers, function (result) {
                    promise_deferred.resolve(result);
               });
               return promise_deferred.promise;
          }
     
          /**
           * @desc mudar values de varios vendedor
           * @param _sellerList
           * @return {object}
           */
          function putValuesSeller(_sellerList) {
               var promise_deferred = $q.defer();
               var cache_setting = cacheService.get('app_settings');
               var cache_app = cacheService.get('application');
               var cache_user = cacheService.get('user');
               var url = cache_setting.api.base;
               var method = cache_setting.api.support.pbx.seller.put_value_sallerList_by_father;
               var headers = [
                    {key: 'app_identifier', 'value': cache_app.identifier},
                    {key: 'user_logged', 'value': cache_user._id},
                    {key: 'token', 'value': cache_user.token},
               ];
               var obj = {
                    sellerList: _sellerList
               };
               requestJsonService.put(url, method, obj, headers, function (result) {
                    promise_deferred.resolve(result);
               });
               return promise_deferred.promise;
          }
     
          /**
           *@desc busca vendedor logado
           *
           */
          function getSellerLogged() {
               var promise_deferred = $q.defer();
               var cache_setting = cacheService.get('app_settings');
               var cache_app = cacheService.get('application');
               var cache_user = cacheService.get('user');
               var url = cache_setting.api.base;
               var method = cache_setting.api.support.pbx.seller.get_saller_logged;
               var headers = [
                    {key: 'app_identifier', 'value': cache_app.identifier},
                    {key: 'user_logged', 'value': cache_user._id},
                    {key: 'token', 'value': cache_user.token},
               ];
               requestJsonService.getUntreated(url,method, null, headers, function (result) {
                    promise_deferred.resolve(result);
               });
               return promise_deferred.promise;
          }
     }
})();


