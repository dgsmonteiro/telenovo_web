/**
 * @author Isaias Nascimento de Carvalho
 * @namespace app.audio_record
 * @description Serviço para obtenção de audio via upload ou gravação
 */
(function () {
  'use strict';

  angular
    .module('app.audio_record')
    .service('audioRecordService', audioRecordService);


  audioRecordService.$inject = ['$uibModal', '$q'];


  /** @ngInject */
  function audioRecordService($uibModal, $q) {

    return {
      getAudio: getAudio,
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
    function getAudio() {
      var promise_deferred = $q.defer();

      var modalInstance = $uibModal.open({
        animation:    true,
        templateUrl:  'app/modules/core/audioRecord/audioRecord.modal.html',
        controller:   'AppAudioRecordModalController',
        controllerAs: 'vm',
        backdrop:     'static',
        keyboard:     false,
        size:         'lg',
      });

      modalInstance.result
        .then(function (url_audio) {
          promise_deferred.resolve(url_audio);
        });

      return promise_deferred.promise;
    }


  }
})();

