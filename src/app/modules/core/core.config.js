/**
 * @author Isaias Nascimento de Carvalho
 * @namespace app.core
 * @description Configuração da aplicação
 */
(function () {
     'use strict';
     
     angular
     .module('app.core')
     .config(coreConfig);
     
     coreConfig.$inject = ['$translateProvider', '$provide', '$ocLazyLoadProvider', 'tmhDynamicLocaleProvider', 'recorderServiceProvider', 'momentPickerProvider'];
     
     /** @ngInject */
     function coreConfig($translateProvider, $provide, $ocLazyLoadProvider, tmhDynamicLocaleProvider, recorderServiceProvider, momentPickerProvider) {
          
          //moment-picker
          momentPickerProvider.options({
               /* Picker properties */
               locale:    'pt-br',
               format:    'DD-MM-YYYY',
               minView:   'month',
               maxView:   'day',
               startView: 'month',
               autoclose: true,
               today:     true,
               keyboard:  false,
               
               /* Extra: Views properties */
               leftArrow:     '&larr;',
               rightArrow:    '&rarr;',
               yearsFormat:   'YYYY',
               monthsFormat:  'MM',
               daysFormat:    'DD',
               hoursFormat:   'HH:[00]',
               minutesFormat: moment.localeData().longDateFormat('LT').replace(/[aA]/, ''),
               secondsFormat: 'ss',
               minutesStep:   5,
               secondsStep:   1
          });
          
          //inicialização do audio recorder
          recorderServiceProvider
          .forceSwf(false)
          .withMp3Conversion(true)
          
          //Tratamento de exeception
          $provide.decorator('$exceptionHandler', extendExceptionHandler);
          
          //locale
          tmhDynamicLocaleProvider.localeLocationPattern('/bower_components/angular-i18n/angular-locale_pt-br.js');
          
          
          $translateProvider.useStaticFilesLoader({
               prefix: '../languages/',
               suffix: '.json'
          });
          
          $translateProvider.useSanitizeValueStrategy(null);
          $translateProvider.useLoaderCache(true);
          $translateProvider.registerAvailableLanguageKeys(['en', 'pt', 'es'], {
               'en-US': 'en',
               'en-UK': 'en',
               'es':    'es',
               'pt-BR': 'pt'
          }).use("pt");
          
          $translateProvider.useStaticFilesLoader({
               files: [{
                    prefix: 'languages/locale-',
                    suffix: '.json'
               }]
          });
          
          $translateProvider.preferredLanguage('pt');
          
          
          //configurações de módulos dinâmicos
          $ocLazyLoadProvider.config({
               modules: [
                    {
                         name:  'app.menu.55pbx',
                         files: ['app/modules/core/menu/menu.55pbx.module.js']
                    },
                    {
                         name:  'app.menu.support',
                         files: ['app/modules/core/menu/menu.support.module.js']
                    },
                    {
                         name:  'app.menu.goodcash',
                         files: ['app/modules/core/menu/menu.goodcash.module.js']
                    },
               ]
          });
     }
     
     
     /**
      * @name extendExceptionHandler
      * @desc Tratamento de Execeções
      * @param {String} msg Message to log
      * @returns {Object}
      * @memberOf Tools.Exception
      */
     function extendExceptionHandler($delegate) {
          return function (exception, cause) {
               $delegate(exception, cause);
               var errorData = {
                    exception: exception,
                    cause:     cause
               };
               console.log(errorData);
          };
     }
})();


