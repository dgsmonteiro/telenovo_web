/**
 * Controller para alteração de dados de usuário.
 * @namespace app.admin
 */

(function () {
     'use strict';
     
     angular
     .module('app.support.userProfile')
     .controller('AppSupportUserProfileController', AppSupportUserProfileController);
     
     AppSupportUserProfileController.$inject = ['$state', '$translate', 'userSupportService', 'cacheService', 'toastr'];
     
     /** @ngInject */
     function AppSupportUserProfileController($state, $translate, userSupportService, cacheService, toastr) {
          
          /* jshint validthis: true */
          var vm = this;
          vm.user == null;
          vm.dateFormat = null;
          vm.password = null;
          vm.new_passowd = null;
          vm.alerts = [];
          vm.closeAlert = closeAlert;
          vm.changeProfileData = changeProfileData;
          vm.changePasswordProfile = changePasswordProfile;
          vm.uploadFiles = uploadFiles;
          
          init()
          
          function init() {
               vm.user = cacheService.get('user');
               vm.dateFormat = new Date(vm.user.birth_date);
               $state.current.title = $translate.instant('support.userProfile.edit.title');
          }
          
          
          //fecha alert
          function closeAlert(index) {
               vm.alerts.splice(index, 1);
          }
          
          function changeProfileData() {
               vm.user.birth_date = vm.dateFormat;
               userSupportService.editAgentProfile(vm.user)
               .then(function (result) {
                    showSuccessMsg($translate.instant('support.userProfile.save_msg'));
                    cacheService.put('user', vm.user);
               });
          }
          
          
          //função para execução do login
          function changePasswordProfile() {
               if (vm.password !== null && vm.new_password !== null) {
                    userSupportService.changePassword(vm.user._id, vm.password, vm.new_password)
                    .then(function (result) {
                         if (!result.error) {
                              showSuccessMsg($translate.instant('support.userProfile.password_msg'));
                         } else {
                              showErrorMsg(result.message);
                         }
                    });
               }
          }
          
          //faz upload de arquivos de audio para sistema de uras.
          function uploadFiles(_file, _errFiles, _image) {
               vm.file_result = null;
               vm.file_error = null;
               vm.file = _file;
               if (_errFiles.length == 0) {
                    if (_file) {
                         userSupportService.uploadImageFile("support", _file)
                         .then(function (result) {
                              vm.user.img_url = result.file_url;
                         })
                    }
               } else {
                    if (_errFiles[0].$error == 'pattern') {
                         vm.file_error = $translate('support.userProfile.img_error.upload_erro_format');
                    }
                    else if (_errFiles[0].$error == '"maxSize"') {
                         vm.file_error = $translate('support.userProfile.img_error.upload_erro_size');
                    } else {
                         vm.file_error = _errFiles[0].$error;
                    }
               }
          }
          
          //notification modal
          function showSuccessMsg(_msg) {
               toastr.success(null, _msg, {"timeOut": "8000"});
          }
          
          function showErrorMsg(_msg) {
               toastr.error(null, _msg, {"timeOut": "8000"});
          }
     }
})();
