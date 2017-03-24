/**
 * Módulo de carga de menu para interface de suporte do 55pbx.
 * @namespace app.menu
 */
(function () {
  'use strict';

  angular.module('app.menu.support', [
    'ui.router'
  ])
    .config(routeConfig);

  /** @ngInject */
  function routeConfig(baSidebarServiceProvider) {

    baSidebarServiceProvider.addStaticItem({
      title: '55PBX',
      icon: 'fa fa-phone-square',
      permission: 0,
      subMenu: [{
        title: 'Clientes',
        disabled: false,
        permission: 0,
        stateRef: '55pbx_client',
      }]
    });

    /*
     baSidebarServiceProvider.addStaticItem({
     title: 'Sistema',
     icon: 'fa fa-cogs',
     permission: 0,
     subMenu: [{
     title: 'Aplicações',
     permission: 0,
     stateRef: 'application_support',
     }]
     });


     baSidebarServiceProvider.addStaticItem({
     title: 'VTEX',
     icon: 'ion-ios-settings-strong',
     permission: 0,
     subMenu: [{
     title: 'Clientes',
     disabled: false,
     permission: 0,
     stateRef: 'vtex_support_client',
     }]
     });

     baSidebarServiceProvider.addStaticItem({
     title: 'Appliacation',
     icon: 'ion-ios-settings-strong',
     stateRef: 'application',
     permission: 0,
     });

     baSidebarServiceProvider.addStaticItem({
     title: 'GoodCash',
     icon: 'fa-money',
     permission: 0,
     subMenu: [{
     title: 'Histórico de Pedidos',
     disabled: false,
     permission: 0,
     stateRef: 'good_cash_support_client',
     }]
     });
     baSidebarServiceProvider.addStaticItem({
     title: 'Good Cash',
     icon: 'ion-ios-settings-strong',
     stateRef: 'good_cash_support_client',
     });
     baSidebarServiceProvider.addStaticItem({
     title: 'Cron',
     icon: 'fa fa-cube',
     permission: 0,
     subMenu: [{
     title: 'Lista de tarefas',
     icon: 'fa fa-cogs',
     permission: 0,
     stateRef: 'cron',
     }, {
     title: 'Log',
     disabled: false,
     permission: 0,
     stateRef: 'cron_log',
     }]
     });
     */

  }
})();


