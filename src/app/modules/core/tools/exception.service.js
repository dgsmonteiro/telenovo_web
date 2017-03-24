/**
 * Application Exeception Tools
 * @namespace Tools
 */
(function () {
  'use strict';

  angular
    .module('app.tools')
    .service('exceptionService', exceptionService);

  exceptionService.$inject = ['loggerService'];

  function exceptionService(loggerService) {
    var service = {
      process: process
    };
    return service;

    function process(message, error) {
      return loggerService.error(message, error);
    }
  }
})();


