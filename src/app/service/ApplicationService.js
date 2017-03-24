/**
 * Serviço de dados da aplicação
 * @namespace app.core
 */
(function () {
    'use strict';

    angular
        .module('app.core')
        .service('applicationService', applicationService);

    applicationService.$inject = ['requestJsonService', '$q', 'cacheService'];

    /** @ngInject */
    /**
     * @namespace UserClientPbxService
     * @desc Application Angular Cache
     * @memberOf Tools
     */
    function applicationService(requestJsonService, $q, cacheService) {
        return {
            getInformationByDomain: getInformationByDomain,
            getAllAplication: getAllAplication,
            addNewApplication: addNewApplication,
            editApplication: editApplication,
            putChangeActiveAplication: putChangeActiveAplication,
            getListReportForIdentifier: getListReportForIdentifier
        };

        /**
         * @desc Obtem dados básicos de uma aplicação por dominio informado
         * @param _domain
         * @return {ApplicationModel}
         */
        function getInformationByDomain(_domain) {
            var promise_deferred = $q.defer();
            var cache_setting = cacheService.get('app_settings');
            var url = cache_setting.api.base;
            var method = cache_setting.api.general.application.get_information_domain;
            var parameters = [_domain];
            requestJsonService.get(url, method, parameters, null, function (result) {
                promise_deferred.resolve(result);
            });
            return promise_deferred.promise;
        }

        /**
         *
         */
        function getAllAplication() {
            var promise_deferred = $q.defer();
            var cache_setting = cacheService.get('app_settings');
            var url = cache_setting.api.base;
            var method = cache_setting.api.app.list_app;
            requestJsonService.get(url, method, null, null, function (result) {
                promise_deferred.resolve(result);
            });
            return promise_deferred.promise;
        }

        function addNewApplication(_data) {
            var promise_deferred = $q.defer();
            var cache_setting = cacheService.get('app_settings');
            var url = cache_setting.api.base;
            var method = cache_setting.api.app.new_app;
            requestJsonService.post(url, method, _data, null, function (result) {
                promise_deferred.resolve(result);
            });
            return promise_deferred.promise;
        }

        function editApplication(_data) {
            var promise_deferred = $q.defer();
            var cache_setting = cacheService.get('app_settings');
            var url = cache_setting.api.base;
            var method = cache_setting.api.app.edit_app;
            requestJsonService.put(url, method, _data, null, function (result) {
                promise_deferred.resolve(result);
            });
            return promise_deferred.promise;
        }

        function putChangeActiveAplication(_data) {
            var promise_deferred = $q.defer();
            var cache_setting = cacheService.get('app_settings');
            var url = cache_setting.api.base;
            var method = cache_setting.api.app.active_app;
            requestJsonService.put(url, method, _data, null, function (result) {
                promise_deferred.resolve(result);
            });
            return promise_deferred.promise;
        }

        /**
         * obtem lista de reports da aplicação
         */
        function getListReportForIdentifier() {
            var promise_deferred = $q.defer();
            var cache_setting = cacheService.get('app_settings');
            var cache_app = cacheService.get('application');
            var cache_user = cacheService.get('user');
            var cache_client = cacheService.get('client');
            var url = cache_setting.api.base;
            var method = cache_setting.api.app.list_reports;
            var headers = [
                {key: 'app_identifier', 'value': cache_app.identifier},
                {key: 'client_logged', 'value': cache_client._id,},
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


