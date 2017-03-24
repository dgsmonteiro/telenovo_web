/**
 * Logger Service Tools
 * @namespace Tools
 */
(function () {
  'use strict';

  angular
    .module('app.tools')
    .service('loggerService', loggerService);



  /** @ngInject */
  /**
   * @namespace Logger
   * @desc Application wide logger
   * @memberOf Tools
   */
  function loggerService($log) {

    var service = {
      error: error
    };
    return service;


    /**
     * @name error
     * @desc Logs errors
     * @param {String} msg Message to log
     * @returns {String}
     * @memberOf Tools.Logger
     */
    function error(msg,objectError) {
      var loggedMsg = 'Runtime Error: ' + msg;
      $log.error(loggedMsg,objectError);
      return loggedMsg;
    }
  }
})();


