/**
 * Serviço de dados de Usuário do Suporte.
 * @namespace app.support
 */
(function () {
     'use strict';
     
     angular
     .module('app.admin')
     .service('proposalSupportService', proposalSupportService);
     
     proposalSupportService.$inject = ['requestJsonService', '$q', 'cacheService', 'Upload'];
     
     /** @ngInject */
     /**
      * @namespace ProposalSupportService
      * @desc Application Angular Cache
      * @memberOf Tools
      */
     function proposalSupportService(requestJsonService, $q, cacheService, Upload) {
          return {
               getListForPeriodAndIdSeller:       getListForPeriodAndIdSeller,
               postAddNewProposal:                postAddNewProposal,
               putEditProposal:                   putEditProposal,
               putEditProposalCanceled:           putEditProposalCanceled,
          };
     
          /**
           *@desc busca lista de proposta por periodo e id do vendedor
           *
           */
          function getListForPeriodAndIdSeller(_dataStart, _dateEnd) {
               var promise_deferred = $q.defer();
               var cache_setting = cacheService.get('app_settings');
               var cache_app = cacheService.get('application');
               var cache_user = cacheService.get('user');
               var url = cache_setting.api.base;
               var method = cache_setting.api.support.pbx.proposal.get_list_proposal_for_period_idSeller;
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
           * @desc Salva uma nova proposta
           * @param _proposal
           * @return {object}
           */
          function postAddNewProposal(_proposal) {
               var promise_deferred = $q.defer();
               var cache_setting = cacheService.get('app_settings');
               var cache_app = cacheService.get('application');
               var cache_user = cacheService.get('user');
               var url = cache_setting.api.base;
               var method = cache_setting.api.support.pbx.proposal.post_add_proposal;
               var headers = [
                    {key: 'app_identifier', 'value': cache_app.identifier},
                    {key: 'user_logged', 'value': cache_user._id},
                    {key: 'token', 'value': cache_user.token},
               ];
               var obj = {
                    proposal: _proposal
               };
               requestJsonService.post(url, method, obj, headers, function (result) {
                    promise_deferred.resolve(result);
               });
               return promise_deferred.promise;
          }
     
          /**
           * @desc Edita uma proposta
           * @param _proposal
           * @return {object}
           */
          function putEditProposal(_proposal) {
               var promise_deferred = $q.defer();
               var cache_setting = cacheService.get('app_settings');
               var cache_app = cacheService.get('application');
               var cache_user = cacheService.get('user');
               var url = cache_setting.api.base;
               var method = cache_setting.api.support.pbx.proposal.put_edit_proposal;
               var headers = [
                    {key: 'app_identifier', 'value': cache_app.identifier},
                    {key: 'user_logged', 'value': cache_user._id},
                    {key: 'token', 'value': cache_user.token},
               ];
               var obj = {
                    proposal: _proposal
               };
               requestJsonService.put(url, method, obj, headers, function (result) {
                    promise_deferred.resolve(result);
               });
               return promise_deferred.promise;
          }
     
          /**
           * @desc Edita uma proposta mudando o status para cancelado
           * @param _proposal
           * @return {object}
           */
          function putEditProposalCanceled(_proposal) {
               var promise_deferred = $q.defer();
               var cache_setting = cacheService.get('app_settings');
               var cache_app = cacheService.get('application');
               var cache_user = cacheService.get('user');
               var url = cache_setting.api.base;
               var method = cache_setting.api.support.pbx.proposal.put_edit_proposal_canceled;
               var headers = [
                    {key: 'app_identifier', 'value': cache_app.identifier},
                    {key: 'user_logged', 'value': cache_user._id},
                    {key: 'token', 'value': cache_user.token},
               ];
               var obj = {
                    proposal: _proposal
               };
               requestJsonService.put(url, method, obj, headers, function (result) {
                    promise_deferred.resolve(result);
               });
               return promise_deferred.promise;
          }
          
     }
})();


