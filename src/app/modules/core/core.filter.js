/**
 * Módulo de carga de aplicações - Filtros Personalizados
 * @namespace app.core
 * @author Isaias Nascimento de Carvalho.
 * @description Filtros personalizados de aplicação
 */


(function () {
     'use strict';
     
     angular
     .module('app.core')
     .filter('hideCreditcard', function () {
          return function (number) {
               if (!number) {
                    return '';
               }
               
               var value = number.toString().trim().replace(/^\+/, '');
               
               if (value.match(/[^0-9]/)) {
                    return number;
               }
               var cc = value.slice(12);
               return ("xxxx-xxxx-xxxx-" + cc).trim();
          };
     });
     
     angular
     .module('app.core')
     .filter('creditcard', function () {
          return function (number) {
               if (!number) {
                    return '';
               }
               
               var value = number.toString().trim().replace(/^\+/, '');
               
               if (value.match(/[^0-9]/)) {
                    return number;
               }
               
               var r1 = value.slice(0, 4);
               var r2 = value.slice(4, 8);
               var r3 = value.slice(8, 12);
               var r4 = value.slice(12);
               
               return (r1 + "-" + r2 + "-" + r3 + "-" + r4).trim();
          };
     });
     
     angular
     .module('app.core')
     .filter('telefone', function () {
          return function (tel) {
               if (!tel) {
                    return '';
               }
               
               var value = tel.toString().trim().replace(/^\+/, '');
               
               if (value.match(/[^0-9]/)) {
                    return tel;
               }
               
               var country, city, number;
               
               switch (value.length) {
                    case 8: // SEM DDD
                         number = value.slice(0, 4);
                         return number = number + '-' + value.slice(4);
                    
                    
                    case 9: // SEM DDD
                         return number = value.slice(0, 1) + "-" + value.slice(1, 5) + '-' + value.slice(5);
                    
                    
                    case 10: // Com DDD
                         return number = "(" + value.slice(0, 2) + ")" + value.slice(2, 6) + '-' + value.slice(6);
                    
                    
                    case 11: // 1PPP####### -> C (PPP) ###-####
                         return number = "(" + value.slice(0, 2) + ")" + value.slice(2, 3) + "-" + value.slice(3, 7) + '-' + value.slice(7);
                    
                    case 12: // CCCPP####### -> CC (PP) ####-####
                         country = value.slice(0, 2);
                         city = value.slice(2, 4);
                         number = value.slice(4);
                         number = number.slice(0, 4) + '-' + number.slice(4);
                         break;
                    
                    case 13: // CCPP######### -> CC (PP) #####-####
                         country = value.slice(0, 2);
                         city = value.slice(2, 4);
                         number = value.slice(4);
                         number = number.slice(0, 5) + '-' + number.slice(5);
                         break;
                    
                    case 14: // CCCPP######### -> CC (PP) #####-####
                         country = value.slice(0, 3);
                         city = value.slice(3, 5);
                         number = value.slice(5);
                         number = number.slice(0, 6) + '-' + number.slice(7);
                         break;
                    
                    default:
                         return tel;
               }
               
               return (country + " (" + city + ") " + number).trim();
          };
     });
     
     
     angular
     .module('app.core')
     .filter('cpf_cnpj', function () {
          return function (document) {
               if (!document) {
                    return '';
               }
               
               
               if (document.length == 11) {
                    // ###.###.###-##
                    var g1 = document.slice(0, 3);
                    var g2 = document.slice(3, 6);
                    var g3 = document.slice(6, 9);
                    var g4 = document.slice(9);
                    return g1 + '.' + g2 + '.' + g3 + '-' + g4;
               }
               
               else if (document.length == 14) {
                    // ##.###.###/####-##
                    var g1 = document.slice(0, 2);
                    var g2 = document.slice(2, 5);
                    var g3 = document.slice(5, 8);
                    var g4 = document.slice(8, 12);
                    var g5 = document.slice(12);
                    return g1 + '.' + g2 + '.' + g3 + '/' + g4 + '-' + g5;
               }
               else {
                    return document;
               }
          }
          
     });
     
     
     angular
     .module('app.core')
     .filter('time', function () {
          return function (input) {
               if (!input) {
                    return '';
               }
               if (input.length == 4) {
                    
                    var g1 = input.slice(0, 2);
                    var g2 = input.slice(2, 4);
                    return g1 + ':' + g2;
               }
               else if (input.length == 6) {
                    
                    var g1 = input.slice(0, 2);
                    var g2 = input.slice(2, 4);
                    var g3 = input.slice(4, 6);
                    
                    return g1 + ':' + g2 + ':' + g3;
               }
               else {
                    return input;
               }
          }
          
     });
     
     angular
     .module('app.core')
     .filter('trustedhtml', function ($sce) {
          return function (html) {
               return $sce.trustAsHtml(html)
          }
     });
     
     angular
     .module('app.core')
     .filter('propsFilter', function () {
          return function (items, props) {
               var out = [];
               
               if (angular.isArray(items)) {
                    items.forEach(function (item) {
                         var itemMatches = false;
                         
                         var keys = Object.keys(props);
                         for (var i = 0; i < keys.length; i++) {
                              var prop = keys[i];
                              var text = props[prop].toLowerCase();
                              if (item[prop].toString().toLowerCase().indexOf(text) !== -1) {
                                   itemMatches = true;
                                   break;
                              }
                         }
                         
                         if (itemMatches) {
                              out.push(item);
                         }
                    });
               } else {
                    // Let the output be the input untouched
                    out = items;
               }
               
               return out;
          }
     });
     
     
     angular
     .module('app.core')
     .filter('trusted', ['$sce', function ($sce) {
          return function (url) {
               return $sce.trustAsResourceUrl(url);
          };
     }]);
     
     
     angular
     .module('app.core')
     .filter('teste_filter', function () {
          return function (data) {
               if (!data) {
                    return '';
               }
               if (data.length == 11 && data.substring(0, 4) === '0800') {
                    var fullNumber = document.getElementById('inputDiscator').value;
                    var group1 = fullNumber.substring(0, 4);
                    var group2 = fullNumber.substring(4, 7);
                    var group3 = fullNumber.substring(7, 11);
                    return group1 + "-" + group2 + "-" + group3;
               }
               if (data.length == 11 && data.substring(0, 4) != '0800') {
                    var fullNumber = document.getElementById('inputDiscator').value;
                    var group1 = fullNumber.substring(0, 1);
                    var group2 = fullNumber.substring(1, 3);
                    var group3 = fullNumber.substring(3, 7);
                    var group4 = fullNumber.substring(7, 11);
                    return group1 + "(" + group2 + ")" + group3 + "-" + group4;
               }
               if (data.length == 8) {
                    var fullNumber = document.getElementById('inputDiscator').value;
                    var group1 = fullNumber.substring(0, 4);
                    var group2 = fullNumber.substring(4, 8);
                    return group1 + "-" + group2;
               }
               if (data.length == 9) {
                    var fullNumber = document.getElementById('inputDiscator').value;
                    var group1 = fullNumber.substring(0, 1);
                    var group2 = fullNumber.substring(1, 5);
                    var group3 = fullNumber.substring(5, 9);
                    return group1 + "-" + group2 + "-" + group3;
               }
               if (data.length == 12) {
                    var fullNumber = document.getElementById('inputDiscator').value;
                    var group1 = fullNumber.substring(0, 1);
                    var group2 = fullNumber.substring(1, 3);
                    var group3 = fullNumber.substring(3, 4);
                    var group4 = fullNumber.substring(4, 8);
                    var group5 = fullNumber.substring(8, 12);
                    return group1 + "(" + group2 + ")" + group3 + "-" + group4 + "-" + group5;
               }
          }
          
     });

//filtro para os status do pagamento
     angular
     .module('app.core')
     .filter('status', function () {
          return function (tipoStatus) {
               tipoStatus.trim();
               if (tipoStatus == 'awaiting_processing') {
                    return 'Em processamento';
               }
               
               if (tipoStatus == 'payment_processing') {
                    return 'Pagamento em processo';
               }
               
               if (tipoStatus == 'authorized_payment') {
                    return 'Pagamento autorizado';
               }
               
               if (tipoStatus == 'rejected_payment') {
                    return 'Pagamento rejeitado';
               }
               
               if (tipoStatus == 'pending') {
                    return 'Pagamento pendente';
               }
               
               if (tipoStatus == 'canceled') {
                    return 'Pagamento Cancelado';
               }
               
               if (tipoStatus == 'finished') {
                    return 'Pagamento Finalizado';
               }
               
               
          };
     });


//filtro para os traduzir o tipo de pagamento
     angular
     .module('app.core')
     .filter('typePagament', function () {
          return function (tipoPagamento) {
               tipoPagamento.trim();
               if (tipoPagamento == 'invoice') {
                    return 'Boleto';
               }
               
               if (tipoPagamento == 'registered_card') {
                    return 'Cartão de credito';
               }
          };
     });
     
     
     //filtro para ativo
     angular
     .module('app.core')
     .filter('ativo_registrado', function () {
          return function (active) {
               if (active == true) {
                    return '<i class="ion ion-checkmark" style="color: #209e91"></i>';
               }
               if (active == false) {
                    return '<i class="ion ion-close-round" style="color: #e85656"></i>';
               }
          };
     });
     
     //filtro para sim ou não converte true=sim e false=não
     angular
     .module('app.core')
     .filter('sim_nao', function () {
          return function (text) {
               if (text == true) {
                    return 'Sim';
               }
               
               if (text == false) {
                    return 'Não';
               }
          };
     });
     
     
     //filtro para sim ou não converte ativo/suspenso
     angular
     .module('app.core')
     .filter('active', function () {
          return function (text) {
               if (text == true) {
                    return 'Ativo';
               }
               
               if (text == false) {
                    return 'Suspenso';
               }
          };
     });
     
     
     //filtro para Pessoa fisica e pessoa juridica
     angular
     .module('app.core')
     .filter('people_corporate', function () {
          return function (type) {
               if (type == 'people') {
                    return 'PF';
               }
               
               if (type == 'corporate') {
                    return 'PJ';
               }
          };
     });
     
     
     angular
     .module('app.core')
     .filter('cep', function () {
          return function (cep) {
               if (!cep) {
                    return '';
               }
               var g1 = cep.slice(0, 2);
               var g2 = cep.slice(2, 5);
               var g3 = cep.slice(5);
               return g1 + '.' + g2 + '-' + g3
          }
     });
     
     
     angular
     .module('app.core')
     .filter('permission', function () {
          return function (level) {
               
               if (level == 0) {
                    return 'Usuário';
               }
               
               if (level == 5) {
                    return 'Supervisor';
               }
               
               if (level == 10) {
                    return 'Administrador';
               }
               
               
          };
     });
     
})();




