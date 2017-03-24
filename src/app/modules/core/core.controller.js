/**
 * @author Isaias Nascimento de Carvalho
 * @namespace app.core
 * @description Controller de inicialização da aplicação.
 */
(function () {
  'use strict';

  angular
    .module('app.core')
    .controller('CoreController', CoreController);


  CoreController.$inject = ['tmhDynamicLocale'];


  /** @ngInject */
  function CoreController(tmhDynamicLocale) {
    //variáveis da aplicação
    /* jshint validthis: true */
    var vm = this;

  }
})();

