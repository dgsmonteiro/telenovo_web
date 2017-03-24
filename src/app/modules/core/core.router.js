/**
 * @author Isaias Nascimento de Carvalho.
 * @description Rota padrão da aplicação
 * @namespace app.core
 */
(function () {
  'use strict';

  angular
    .module('app.core')
    .config(routerConfig);

  routerConfig.$inject = ['$routeProvider', '$locationProvider'];

  /** @ngInject */
  function routerConfig($routeProvider, $locationProvider) {
    $routeProvider.otherwise({redirectTo: '/'});
    $locationProvider.html5Mode(false);
  }

})();


