/**
 * Serviço de gestão de planos de vendas do 55pbx.
 * @namespace app.support
 */
(function () {
     'use strict';
     
     angular
     .module('app.admin')
     .service('planSupportService', planSupportService);
     
     planSupportService.$inject = ['requestJsonService', '$q', 'cacheService'];
     
     /** @ngInject */
     /**
      * @namespace UserClientPbxService
      * @desc Application Angular Cache
      * @memberOf Tools
      */
     function planSupportService(requestJsonService, $q, cacheService) {
          return {
               getListAll:        getListAll,
               getPlanDefault:    getPlanDefault,
               updatePlan:        updatePlan,
               addNewPlan:        addNewPlan,
               changeStatusPlan:  changeStatusPlan,
               changeDefaultPlan: changeDefaultPlan,
          };
          
          /**
           * @desc Obtem uma lista de todos planos cadastrados
           * @return {object}
           */
          function getListAll() {
               var promise_deferred = $q.defer();
               var cache_setting = cacheService.get('app_settings');
               var cache_app = cacheService.get('application');
               var cache_user = cacheService.get('user');
               var url = cache_setting.api.base;
               var method = cache_setting.api.support.pbx.plan.get_plan_list;
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
           * @desc Obtem o plano default
           * @return {object}
           */
          function getPlanDefault() {
               var promise_deferred = $q.defer();
               var cache_setting = cacheService.get('app_settings');
               var cache_app = cacheService.get('application');
               var cache_user = cacheService.get('user');
               var url = cache_setting.api.base;
               var method = cache_setting.api.support.pbx.plan.get_plan_default;
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
           * @desc Grava no plano de vendas
           * @return {object}
           */
          function addNewPlan(_plan) {
               var promise_deferred = $q.defer();
               var cache_setting = cacheService.get('app_settings');
               var cache_app = cacheService.get('application');
               var cache_user = cacheService.get('user');
               var url = cache_setting.api.base;
               var method = cache_setting.api.support.pbx.plan.post_plan_add;
               var headers = [
                    {key: 'app_identifier', 'value': cache_app.identifier},
                    {key: 'user_logged', 'value': cache_user._id},
                    {key: 'token', 'value': cache_user.token},
               ];
               requestJsonService.post(url, method, _plan, headers, function (result) {
                    promise_deferred.resolve(result);
               });
               return promise_deferred.promise;
          }
          
          /**
           * @desc Atualiza plano de vendas
           * @return {object}
           */
          function updatePlan(_plan) {
               var promise_deferred = $q.defer();
               var cache_setting = cacheService.get('app_settings');
               var cache_app = cacheService.get('application');
               var cache_user = cacheService.get('user');
               var url = cache_setting.api.base;
               var method = cache_setting.api.support.pbx.plan.put_plan_edit;
               var headers = [
                    {key: 'app_identifier', 'value': cache_app.identifier},
                    {key: 'user_logged', 'value': cache_user._id},
                    {key: 'token', 'value': cache_user.token},
               ];
               requestJsonService.put(url, method, _plan, headers, function (result) {
                    promise_deferred.resolve(result);
               });
               return promise_deferred.promise;
          }
          
          
          /**
           * Atualiza status de um plano
           * @param _plan_id
           * @param _status
           * @returns {promise.promise|jQuery.promise|*|d.promise|promise|n.promise}
           */
          function changeStatusPlan(_plan_id, _status) {
               var promise_deferred = $q.defer();
               var cache_setting = cacheService.get('app_settings');
               var cache_app = cacheService.get('application');
               var cache_user = cacheService.get('user');
               var url = cache_setting.api.base;
               var method = cache_setting.api.support.pbx.plan.put_plan_change_status;
               var headers = [
                    {key: 'app_identifier', 'value': cache_app.identifier},
                    {key: 'user_logged', 'value': cache_user._id},
                    {key: 'token', 'value': cache_user.token},
               ];
               var parameter = {
                    plan_id:    _plan_id,
                    new_status: _status
               };
               requestJsonService.put(url, method, parameter, headers, function (result) {
                    promise_deferred.resolve(result);
               })
               return promise_deferred.promise;
          }
          
          
          /**
           * Altera plano padrão
           * @param _plan_id
           * @returns {promise.promise|jQuery.promise|*|d.promise|promise|n.promise}
           */
          function changeDefaultPlan(_plan_id) {
               var promise_deferred = $q.defer();
               var cache_setting = cacheService.get('app_settings');
               var cache_app = cacheService.get('application');
               var cache_user = cacheService.get('user');
               var url = cache_setting.api.base;
               var method = cache_setting.api.support.pbx.plan.put_plan_change_default;
               var headers = [
                    {key: 'app_identifier', 'value': cache_app.identifier},
                    {key: 'user_logged', 'value': cache_user._id},
                    {key: 'token', 'value': cache_user.token},
               ];
               var parameter = {
                    plan_id: _plan_id,
               };
               
               requestJsonService.put(url, method, parameter, headers, function (result) {
                    promise_deferred.resolve(result);
               });
               return promise_deferred.promise;
          }
          
     }
     
     
})();


