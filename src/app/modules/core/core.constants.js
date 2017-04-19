/**
 * Módulo de carga de aplicações.
 * @namespace app.core
 * @author Isaias Nascimento de Carvalho
 * @description Parametrização de inicializaçao da aplicação.
 */

(function () {
     'use strict';
     
     angular
     .module('app.core')
     .constant('constant_app_path', {
          modules:             'app/modules/55pbx',
          modules_55pbx:       'app/modules/55pbx',
          modules_vtex:        'app/modules/vtex',
          modules_application: 'app/modules/application',
          modules_good_cash:   'app/modules/goodcash',
          modules_cron:        'app/modules/cron',
          modules_admin:     'app/modules/admin',
          modules_support:     'app/modules/support',
          modules_report:      'app/modules/report',
          bower:               '../bower_components/',
          
     })
     
     
})();


