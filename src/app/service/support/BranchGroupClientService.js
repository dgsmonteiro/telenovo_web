/**
 * Serviço de dados de ramais.
 * @namespace app.admin
 */
(function () {
    'use strict';

    angular
        .module('app.admin')
        .service('branchGroupClientService', branchGroupClientService);

    branchGroupClientService.$inject = ['requestJsonService', 'cacheService', '$q'];

    /** @ngInject */
    /**
     * @namespace branchGroupService
     * @desc Application Angular branchGroup
     * @memberOf admin
     */
    function branchGroupClientService(requestJsonService, cacheService, $q) {
        return {
            getListClientBanchGroupByClientId: getListClientBanchGroupByClientId,
            addNewClientBranchGroup: addNewClientBranchGroup,
            updateClientBranchGroup: updateClientBranchGroup,
            removeClientBranchGroup: removeClientBranchGroup,

        };

        /**
         * Obter lista de Grupos de uma conta de cliente.
         */
        function getListClientBanchGroupByClientId(_client_id) {
            var promise_deferred = $q.defer();
            var cache_setting = cacheService.get('app_settings');
            var cache_app = cacheService.get('application');
            var cache_user = cacheService.get('user');
            var cache_client = cacheService.get('client');
            var url = cache_setting.api.base;
            var method = cache_setting.api.app_pbx.client.branch_number.get_branch_number_list;
            var headers = [
                {key: 'app_identifier', 'value': cache_app.identifier},
                {key: 'client_logged', 'value': cache_client._id,},
                {key: 'user_logged', 'value': cache_user._id},
                {key: 'token', 'value': cache_user.token},
            ];
            var params = [
                _client_id
            ];
            requestJsonService.get(url, method, params, headers, function (result) {
                promise_deferred.resolve(result);
            });
            return promise_deferred.promise;
        }

        /**
         * Cadastra novo grupo na conta de um cliente.
         * @param _client_id
         * @param _model
         * @returns {Promise}
         */
        function addNewClientBranchGroup(_client_id, _model) {
            var promise_deferred = $q.defer();
            var cache_setting = cacheService.get('app_settings');
            var cache_app = cacheService.get('application');
            var cache_user = cacheService.get('user');
            var cache_client = cacheService.get('client');
            var url = cache_setting.api.base;
            var method = cache_setting.api.app_pbx.client.branch_number.post_add_branch_number;
            var headers = [
                {key: 'app_identifier', 'value': cache_app.identifier},
                {key: 'client_logged', 'value': cache_client._id,},
                {key: 'user_logged', 'value': cache_user._id},
                {key: 'token', 'value': cache_user.token},
            ];
            var params = {
                client_id: _client_id,
                branch_number: _model,
            };
            requestJsonService.post(url, method, params, headers, function (result) {
                promise_deferred.resolve(result);
            });
            return promise_deferred.promise;
        }


        /**
         * @desc service de atualização de dados de grupo
         */
        function updateClientBranchGroup(_client_id, _branch_number) {
            var promise_deferred = $q.defer();
            var cache_setting = cacheService.get('app_settings');
            var cache_app = cacheService.get('application');
            var cache_user = cacheService.get('user');
            var cache_client = cacheService.get('client');
            var url = cache_setting.api.base;
            var method = cache_setting.api.app_pbx.client.branch_number.put_update_branch_number;
            var headers = [
                {key: 'app_identifier', 'value': cache_app.identifier},
                {key: 'client_logged', 'value': cache_client._id,},
                {key: 'user_logged', 'value': cache_user._id},
                {key: 'token', 'value': cache_user.token},
            ];
            var params = {
                client_id: _client_id,
                branch_number: _branch_number,
            };

            requestJsonService.put(url, method, params, headers, function (result) {
                promise_deferred.resolve(result);
            });
            return promise_deferred.promise;
        }


        /**
         * @desc service de remoção de grupo
         */
        function removeClientBranchGroup(_client_id, _branch_number) {
            var promise_deferred = $q.defer();
            var cache_setting = cacheService.get('app_settings');
            var cache_app = cacheService.get('application');
            var cache_user = cacheService.get('user');
            var cache_client = cacheService.get('client');
            var url = cache_setting.api.base;
            var method = cache_setting.api.app_pbx.client.branch_number.delete_remove_branch_number;
            var headers = [
                {key: 'app_identifier', 'value': cache_app.identifier},
                {key: 'client_logged', 'value': cache_client._id,},
                {key: 'user_logged', 'value': cache_user._id},
                {key: 'token', 'value': cache_user.token},
            ];
            var params = [
                _client_id,
                _branch_number,
            ]

            requestJsonService.delete(url, method, params, headers, function (result) {
                promise_deferred.resolve(result);
            });
            return promise_deferred.promise;
        }

    }
})();


