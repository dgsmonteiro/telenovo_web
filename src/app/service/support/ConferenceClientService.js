/**
 * Serviço de dados de ramais.
 * @namespace app.admin
 */
(function () {
    'use strict';

    angular
        .module('app.admin')
        .service('conferenceClientService', conferenceClientService);

    conferenceClientService.$inject = ['requestJsonService', 'cacheService', '$q'];

    /** @ngInject */
    /**
     * @namespace branchGroupService
     * @desc Application Angular branchGroup
     * @memberOf admin
     */
    function conferenceClientService(requestJsonService, cacheService, $q) {
        return {
            getListConferenceGroupByClientId: getListConferenceGroupByClientId,
            addNewConferenceGroup: addNewConferenceGroup,
            updateConferenceGroup: updateConferenceGroup,
            removeConferenceGroup: removeConferenceGroup,

        };

        /**
         * Obter lista de Grupos de uma conta de cliente.
         */
        function getListConferenceGroupByClientId(_client_id) {
            var promise_deferred = $q.defer();
            var cache_setting = cacheService.get('app_settings');
            var cache_app = cacheService.get('application');
            var cache_user = cacheService.get('user');
            var cache_client = cacheService.get('client');
            var url = cache_setting.api.base;
            var method = cache_setting.api.admin.client.conference.get_conference_list;
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
        function addNewConferenceGroup(_client_id, _model) {
            var promise_deferred = $q.defer();
            var cache_setting = cacheService.get('app_settings');
            var cache_app = cacheService.get('application');
            var cache_user = cacheService.get('user');
            var cache_client = cacheService.get('client');
            var url = cache_setting.api.base;
            var method = cache_setting.api.admin.client.conference.post_add_conference;
            var headers = [
                {key: 'app_identifier', 'value': cache_app.identifier},
                {key: 'client_logged', 'value': cache_client._id,},
                {key: 'user_logged', 'value': cache_user._id},
                {key: 'token', 'value': cache_user.token},
            ];
            var params = {
                client_id: _client_id,
                branch_group: _model,
            };
            requestJsonService.post(url, method, params, headers, function (result) {
                promise_deferred.resolve(result);
            });
            return promise_deferred.promise;
        }


        /**
         * @desc service de atualização de dados de grupo
         */
        function updateConferenceGroup(_client_id, _conference) {
            var promise_deferred = $q.defer();
            var cache_setting = cacheService.get('app_settings');
            var cache_app = cacheService.get('application');
            var cache_user = cacheService.get('user');
            var cache_client = cacheService.get('client');
            var url = cache_setting.api.base;
            var method = cache_setting.api.admin.client.conference.put_update_conference;
            var headers = [
                {key: 'app_identifier', 'value': cache_app.identifier},
                {key: 'client_logged', 'value': cache_client._id,},
                {key: 'user_logged', 'value': cache_user._id},
                {key: 'token', 'value': cache_user.token},
            ];
            var params = {
                client_id: _client_id,
                conference: _conference,
            };

            requestJsonService.put(url, method, params, headers, function (result) {
                promise_deferred.resolve(result);
            });
            return promise_deferred.promise;
        }


        /**
         * @desc service de remoção de grupo
         */
        function removeConferenceGroup(_client_id, _conference) {
            var promise_deferred = $q.defer();
            var cache_setting = cacheService.get('app_settings');
            var cache_app = cacheService.get('application');
            var cache_user = cacheService.get('user');
            var cache_client = cacheService.get('client');
            var url = cache_setting.api.base;
            var method = cache_setting.api.admin.client.conference.delete_remove_conference;
            var headers = [
                {key: 'app_identifier', 'value': cache_app.identifier},
                {key: 'client_logged', 'value': cache_client._id,},
                {key: 'user_logged', 'value': cache_user._id},
                {key: 'token', 'value': cache_user.token},
            ];
            var params = [
                _conference,
                _branch_group,
            ]

            requestJsonService.delete(url, method, params, headers, function (result) {
                promise_deferred.resolve(result);
            });
            return promise_deferred.promise;
        }

    }
})();


