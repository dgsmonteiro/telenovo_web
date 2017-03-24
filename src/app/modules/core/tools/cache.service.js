/**
 * Application Cache Tools
 * @namespace Tools
 */
(function () {
  'use strict';

  angular
    .module('app.tools')
    .service('cacheService', cacheService);

  cacheService.$inject = ['$cacheFactory'];

  /** @ngInject */
  /**
   * @namespace CacheService
   * @desc Application Angular Cache
   * @memberOf Tools
   */
  function cacheService($cacheFactory) {
    return $cacheFactory('applicationCache');
  }
})();


