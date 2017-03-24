/**
 * @author Flavio Franco Jr.
 * @namespace app.audio_record
 * @description Serviço para obtenção de audio via upload ou gravação
 */
(function () {
     'use strict';
     
     angular
     .module('app.admin')
     .service('uploadPdfService', uploadPdfService);
     
     
     uploadPdfService.$inject = ['$uibModal', '$q'];
     
     
     /** @ngInject */
     function uploadPdfService($uibModal, $q) {
          
          return {
               getPdfDocument: getPdfDocument,
          };
          
          
          /**
           * Executa request tipo GET
           * @param url
           * @param method
           * @param parameters
           * @param headers
           * @param callback
           * @return {TransactionModel}
           */
          function getPdfDocument(client_id) {
               var promise_deferred = $q.defer();
               
               var modalInstance = $uibModal.open({
                    animation:    true,
                    templateUrl:  'app/service/support/uploadPdf/uploadAccountResumePdf.modal.html',
                    controller:   'AppUploadAccountResumePdfModalController',
                    controllerAs: 'vm',
                    backdrop:     'static',
                    keyboard:     false,
                    size:         'lg',
                    resolve:      {
                         confirm: function () {
                              return client_id;
                         }
                    }
               });
               
               modalInstance.result
               .then(function (url_doc) {
                    promise_deferred.resolve(url_doc);
               });
               
               return promise_deferred.promise;
          }
          
          
     }
})();

