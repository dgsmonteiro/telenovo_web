/**
 * Controller para modal de gravação de audios
 * @namespace app.audio_record
 */

(function () {
     'use strict';
     
     angular
     .module('app.admin')
     .controller('AppUploadAccountResumePdfModalController', AppUploadAccountResumePdfModalController);
     
     AppUploadAccountResumePdfModalController.$inject = ['$uibModalInstance', '$translate', '$q', 'cacheService', 'Upload', 'confirm', 'clientPbxSupportService'];
     
     /** @ngInject */
     function AppUploadAccountResumePdfModalController($uibModalInstance, $translate, $q, cacheService, Upload, confirm, clientPbxSupportService) {
          
          /* jshint validthis: true */
          var vm = this;
          vm.email_recipients = null;
          vm.option = null;
          vm.file = null;
          vm.file_result = null;
          vm.file_name = null;
          vm.file_error = null;
          vm.uploagind = null;
          vm.result_url = null;
          vm.client_id = null;
          vm.uploadFiles = uploadFiles;
          vm.cancel = cancel;
          vm.save = save;
          
          
          init();
          
          //inicialização
          function init() {
               vm.client_id = confirm;
          }
          
          
          //cancelar modal
          function cancel() {
               $uibModalInstance.dismiss('cancel');
          }
          
          
          //Salvar dados
          function save() {
               clientPbxSupportService.sendAccountResumePdfToEmail(vm.client_id, vm.email_recipients, vm.file_name).then(
                    function (result) {
                         $uibModalInstance.close(vm.file_result);
                    }
               );
          }
          
          
          /**
           * carrega arquivo de audio
           * @param _file
           * @param _errFiles
           * @returns {Promise}
           */
          function uploadFiles(_file, _errFiles) {
               vm.file_result = null;
               vm.file_error = null;
               vm.file = _file;
               
               if (_file) {
                    vm.uploagind = true;
                    var promise_deferred = $q.defer();
                    var cache_setting = cacheService.get('app_settings');
                    var cache_app = cacheService.get('application');
                    var cache_user = cacheService.get('user');
                    var url = cache_setting.api.base;
                    var method = cache_setting.api.support.pbx.client.post_upload_pdf;
                    
                    _file.upload = Upload.upload({
                         url:     url + "/" + method,
                         headers: {
                              'app_identifier': cache_app.identifier,
                              'user_logged':    cache_user._id,
                              'token':          cache_user.token
                         },
                         data:    {file: _file, client_id: vm.client_id}
                    });
                    
                    _file.upload.then(function (response) {
                         vm.file_result = response.data.file_url;
                         vm.uploagind = false;
                         vm.result_url = response.data.file_url;
                         vm.file_name = response.data.file_name;
                         promise_deferred.resolve(response.data);
                         
                    }, function (evt) {
                         _file.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
                    });
                    
                    return promise_deferred.promise;
               }
               else {
                    if (_errFiles.length > 0) {
                         if (_errFiles[0].$error == 'pattern') {
                              vm.file_error = $translate.instant('audio_record.upload_error_formart');
                         }
                         else if (_errFiles[0].$error == 'maxSize') {
                              vm.file_error = $translate.instant('audio_record.upload_error_size');
                         } else {
                              vm.file_error = _errFiles[0].$error;
                         }
                    }
               }
          }
          
          
     }
})();
