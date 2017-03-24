/**
 * Serviço de dados de Usuário do Suporte.
 * @namespace app.support
 */
(function () {
     'use strict';
     
     angular
     .module('app.admin')
     .service('userSupportService', userSupportService);
     
     userSupportService.$inject = ['requestJsonService', '$q', 'cacheService', 'Upload'];
     
     /** @ngInject */
     /**
      * @namespace UserClientPbxService
      * @desc Application Angular Cache
      * @memberOf Tools
      */
     function userSupportService(requestJsonService, $q, cacheService, Upload) {
          return {
               authenticate:     authenticate,
               changePassword:   changePassword,
               recoveryPassword: recoveryPassword,
               uploadImageFile:  uploadImageFile,
               editAgentProfile: editAgentProfile
          };

         /**
          * @desc Executa autenticação do usuário na aplicação
          * @param _email
          * @param _password
          * @return {object}
          */
         function authenticate(_email, _password) {
             var promise_deferred = $q.defer();
             var cache_setting = cacheService.get('app_settings');
             var cache_app = cacheService.get('application');
             var url = cache_setting.api.base;
             var method = cache_setting.api.app_pbx.user.get_authenticate;
             var headers = [
                 {key: 'app_identifier', 'value': cache_app.identifier},
             ];
             var password = CryptoJS.SHA512(_password);
             var parameters = {
                 email: _email,
                 password: password.toString(CryptoJS.enc.Base64)
             };
             requestJsonService.postUntreated(url, method, parameters, headers, function (result) {
                 var user_result = {
                     user: null,
                     error: false,
                     message: null
                 };
                 if (result.status !== 200) {
                     user_result.error = true;
                     user_result.message = result.data.error;
                 } else {
                     user_result.user = result.data;
                 }
                 promise_deferred.resolve(user_result);
             });
             return promise_deferred.promise;

         }
          
          /**
           * @desc Executa autenticação do usuário na aplicação
           * @param _email
           * @param _password
           * @return {object}
           */
          // function authenticate(_email, _password) {
          //      var promise_deferred = $q.defer();
          //      var cache_setting = cacheService.get('app_settings');
          //      var cache_app = cacheService.get('application');
          //      var url = cache_setting.api.base;
          //      var method = cache_setting.api.support.user.get_authenticate;
          //      var headers = [
          //           {key: 'app_identifier', 'value': cache_app.identifier},
          //      ];
          //      var password = CryptoJS.SHA512(_password);
          //      var parameters = {
          //           email:    _email,
          //           password: password.toString(CryptoJS.enc.Base64)
          //      };
          //      requestJsonService.postUntreated(url, method, parameters, headers, function (result) {
          //           var user_result = {
          //                user:    null,
          //                error:   false,
          //                message: null
          //           };
          //           if (result.status !== 200) {
          //                user_result.error = true;
          //                user_result.message = result.data.error;
          //           } else {
          //                user_result.user = result.data;
          //           }
          //           promise_deferred.resolve(user_result);
          //      });
          //      return promise_deferred.promise;
          //
          // }
          
          
          /**
           * @desc Executa alteração de senha do usuário
           * @param _user_id
           * @param _password
           * @param _new_passowrd
           * @return {object}
           */
          function changePassword(_user_id, _password, _new_passowrd) {
               var promise_deferred = $q.defer();
               var cache_setting = cacheService.get('app_settings');
               var cache_app = cacheService.get('application');
               var url = cache_setting.api.base;
               var method = cache_setting.api.support.user.put_password_change;
               var headers = [
                    {key: 'app_identifier', 'value': cache_app.identifier},
               ];
               var password = CryptoJS.SHA512(_password);
               var new_password = CryptoJS.SHA512(_new_passowrd);
               var parameters = {
                    user_id:      _user_id,
                    password:     password.toString(CryptoJS.enc.Base64),
                    new_password: new_password.toString(CryptoJS.enc.Base64),
               };
               requestJsonService.putUntreated(url, method, parameters, headers, function (result) {
                    var user_result = {
                         error:   false,
                         message: null
                    };
                    if (result.status !== 200) {
                         user_result.error = true;
                         user_result.message = result.data.error;
                    }
                    promise_deferred.resolve(user_result);
               });
               return promise_deferred.promise;
          }
          
          
          /**
           * @desc Executa recuperação da senha do usuário
           * @param _email
           * @return {object}
           */
          function recoveryPassword(_email) {
               var promise_deferred = $q.defer();
               var cache_setting = cacheService.get('app_settings');
               var cache_app = cacheService.get('application');
               var url = cache_setting.api.base;
               var method = cache_setting.api.support.user.put_password_recovery;
               var headers = [
                    {key: 'app_identifier', 'value': cache_app.identifier},
               ];
               var parameters = {
                    email: _email,
               };
               requestJsonService.putUntreated(url, method, parameters, headers, function (result) {
                    var user_result = {
                         error:   false,
                         message: null
                    };
                    if (result.status !== 200) {
                         user_result.error = true;
                         user_result.message = result.data.error;
                    }
                    promise_deferred.resolve(user_result);
               });
               return promise_deferred.promise;
               
          }
          
          /**
           * @desc Executa alteração da imagem de perfil do usuário
           * @param _folder
           * @param _file
           * @return {object}
           */
          function uploadImageFile(_folder, _file) {
               var promise_deferred = $q.defer();
               var cache_setting = cacheService.get('app_settings');
               var cache_app = cacheService.get('application');
               var cache_user = cacheService.get('user');
               var url = cache_setting.api.base;
               var method = cache_setting.api.support.user.post_edit_profile_image;
               
               _file.upload = Upload.upload({
                    url:     url + "/" + method,
                    headers: {
                         'app_identifier': cache_app.identifier,
                         'user_logged':    cache_user._id
                    },
                    data:    {file: _file, folder: _folder},
               });
               
               _file.upload.then(function (response) {
                    promise_deferred.resolve(response.data);
               }, function (evt) {
                    _file.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
               });
               
               return promise_deferred.promise;
          }
          
          /**
           * @desc Executa alteração dos dados do usuário (perfil)
           * @param _client_id
           * @param _dataUser
           * @return {object}
           */
          function editAgentProfile(_user) {
               var promise_deferred = $q.defer();
               var cache_setting = cacheService.get('app_settings');
               var cache_app = cacheService.get('application');
               var cache_user = cacheService.get('user');
               var url = cache_setting.api.base;
               var method = cache_setting.api.support.user.put_edit_profile;
               var headers = [
                    {key: 'app_identifier', 'value': cache_app.identifier},
                    {key: 'user_logged', 'value': cache_user._id}
               ];
               var obj = {
                    user: _user
               };
               requestJsonService.put(url, method, obj, headers, function (result) {
                    promise_deferred.resolve(result);
               });
               return promise_deferred.promise;
          }
     }
})();


