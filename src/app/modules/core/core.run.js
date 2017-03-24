/**
 * Módulo de carga de aplicações.
 * @namespace app.core
 * @author Isaias Nascimento de Carvalho.
 * @description Parametrização de inicializaçao da aplicação.
 */

(function () {
     'use strict';

     angular
     .module('app.core')
     .run(runConfig);

     runConfig.$inject = ['$rootScope', '$state', '$http', 'exceptionService', 'cacheService', 'bootstrap3ElementModifier', 'defaultErrorMessageResolver', 'applicationService', '$ocLazyLoad', 'tmhDynamicLocale', 'socketService', 'validator', 'amMoment', '$datepicker'];

     /** @ngInject */
     function runConfig($rootScope, $state, $http, exceptionService, cacheService, bootstrap3ElementModifier, defaultErrorMessageResolver, applicationService, $ocLazyLoad, tmhDynamicLocale, socketService, validator, amMoment, $datepicker) {
          //moment
          amMoment.changeLocale('pt-br');

          angular.extend($datepicker.defaults, {
               dateFormat:  'dd-MM-yyyy',
               startWeek:   1,
               hasToday:    true,
               dayFormat:   'dd',
               monthFormat: 'MM',
               yearFormat:  'yyyy',
               autoclose:   true,
          });

          //validação de forms
          bootstrap3ElementModifier.enableValidationStateIcons(false);
          defaultErrorMessageResolver.setI18nFileRootPath('../bower_components/angular-auto-validate/dist/lang');
          defaultErrorMessageResolver.setCulture('pt-BR');
          defaultErrorMessageResolver.getErrorMessages().then(function (errorMessages) {
               errorMessages['cpf'] = 'CPF informado não é válido';
               errorMessages['cnpj'] = 'CNPJ informado não é válido';
               errorMessages['mask'] = 'Incompleto ou formato incorreto';
               errorMessages['compareTo'] = 'Confirmação da nova senha não confere!';
               errorMessages['time'] = 'Horário inválido!';
               errorMessages['brPhoneNumber'] = 'Telefone Inválido!';
          });

          //carregar as configurações
          $http.get('api_settings.json')
          .then(function successCallback(response_api) {
               var api_settings = response_api.data;
               $http.get('function_settings.json')
               .then(function successCallback(response_function) {
                    var function_settings = response_function.data;
                    $http.get('timezone.json')
                    .then(function (response_timezone) {
                         var timezone_list = response_timezone.data.list;

                         $http.get('app_settings.json')
                         .then(function successCallback(response) {
                              var settings = response.data;
                              settings.timezone_list = timezone_list;

                              //salvando cache
                              cacheService.removeAll();
                              cacheService.put('app_settings', settings);


                              //definindo rotas da aplicação
                              var subdomain = location.hostname.split('.')[0];

                              $rootScope.login = false;
                              $rootScope.app_title = settings.initial_name;
                              $rootScope.user_permission = 0;

                              //locale da aplicaçao
                              tmhDynamicLocale.set(settings.locale);

                              //dados de api
                              settings.api = api_settings;
                              if (settings.mode == 'dev') {
                                   settings.api.base = settings.api_url.dev.base;
                                   settings.api.socket = settings.api_url.dev.socket;
                              } else if (settings.mode == 'homologa') {
                                   settings.api.base = settings.api_url.homologa.base;
                                   settings.api.socket = settings.api_url.homologa.socket;
                              } else if (settings.mode == 'production') {
                                   settings.api.base = settings.api_url.production.base;
                                   settings.api.socket = settings.api_url.production.socket;
                              }

                              //controle de acesso das controllers
                              settings.controller_permission = function_settings.controller_permission;

                              //carrega estrutura basica de dev
                              if (settings.mode == 'dev' && settings.dev && location.hostname.indexOf("localhost") > 0) {
                                   $http.get('dev_settings.json')
                                   .then(function successCallback(dev_response) {
                                        var dev_settings = dev_response.data;
                                        var application = null;
                                        var user = null;
                                        var client = null;
                                        var state = null;
                                        if (subdomain == 'support' || subdomain == 'suporte') {
                                             application = dev_settings.support.application;
                                             user = dev_settings.support.user;
                                             state = 'support_desktop_55pbx';
                                        } else {
                                             application = dev_settings.pbx.application;
                                             user = dev_settings.pbx.user;
                                             client = dev_settings.pbx.user.clients[0];
                                             $rootScope.user_permission = client.user_permission;
                                             $rootScope.menu_home_state = '55pbx_home';
                                             socketService.connect(settings.api.socket, application.identifier, client._id, user._id, null);
                                             state = 'admin_desktop';
                                        }
                                        cacheService.put('user', user);
                                        cacheService.put('application', application);
                                        cacheService.put('client', client);
                                        $rootScope.app_title = application.name;
                                        $state.go(state, {module: location.pathname.replace("/", "")});
                                   })
                              }
                              else {
                                   applicationService.getInformationByDomain(location.hostname)
                                   .then(function (result) {
                                        cacheService.put('application', result);
                                        $rootScope.app_title = result.name;

                                        //carrega menu da aplicação
                                        if (subdomain == 'bkapp' || subdomain == 'bkadmin' || subdomain == 'admin') {
                                             var url_params = location.search.split("&");
                                             if (url_params.length > 0) {
                                                  //$ocLazyLoad.load('app.menu.55pbx');
                                                  $state.go('admin_user_login');

                                             } else {
                                                  //$ocLazyLoad.load('app.menu.55pbx');
                                                  $rootScope.menu_home_state = '55pbx_desktop';
                                                  $state.go('admin_user_login');
                                             }

                                        }
                                        else if (subdomain == 'support' || subdomain == 'suporte') {
                                             $ocLazyLoad.load('app.menu.support');
                                             $rootScope.menu_home_state = 'support_desktop';
                                             $state.go('support_user_login');

                                        }
                                   });
                              }
                         }, function errorCallback(response) {
                              exceptionService.process('Application settings undefined!', response.data);
                         });

                    });

               }, function errorCallback(response) {
                    exceptionService.process('Application settings undefined!', response.data);
               });
          }, function errorCallback(response) {
               exceptionService.process('Application settings undefined!', response.data);
          });
     }

})();


