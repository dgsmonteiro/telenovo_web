/**
 * Módulo de carga de menu para interface do GoodCash
 * @namespace app.menu
 */
(function () {
     'use strict';
     
     angular.module('app.menu.goodcash', [
          'ui.router'
     ])
     .config(routeConfig);
     
     /** @ngInject */
     function routeConfig(baSidebarServiceProvider) {
          baSidebarServiceProvider.addStaticItem({
               title:      'Pedidos',
               icon:       'fa fa-money',
               permission: 0,
               account:    0,
               subMenu:    [{
                    title:      'Fila de Pedidos',
                    disabled:   false,
                    permission: 0,
                    account:    0,
                    stateRef:   'goodcash_order_queue',
               }, {
                    title:      'Histórico de Pedidos',
                    disabled:   false,
                    permission: 0,
                    account:    0,
                    stateRef:   'goodcash_order_history',
               }]
          });
          baSidebarServiceProvider.addStaticItem({
               title:      'Associados',
               icon:       'fa fa-folder-o',
               permission: 10,
               account:    0,
               stateRef:   'goodcash_associate',
          });
          baSidebarServiceProvider.addStaticItem({
               title:      'Fila',
               icon:       'fa fa-server',
               permission: 10,
               account:    0,
               stateRef:   'goodcash_queue',
          });
          
          baSidebarServiceProvider.addStaticItem({
               title:      'Usuarios',
               icon:       'fa fa-user',
               permission: 10,
               account:    0,
               stateRef:   'goodcash_user',
          });
          
          baSidebarServiceProvider.addStaticItem({
               title:      'Clientes',
               icon:       'fa fa-user',
               permission: 10,
               account:    0,
               stateRef:   'goodcash_client',
          });
          
          
     }
})();

