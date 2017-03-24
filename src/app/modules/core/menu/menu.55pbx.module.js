/**
 * Módulo de carga de menu para interface ADMIN do 55pbx.
 * @namespace app.menu
 */
(function () {
     'use strict';

     angular.module('app.menu.55pbx', [
          'ui.router'
     ])
     .config(routeConfig);

     /* permission:
      0 = usuario
      5 = supervisor
      10 = admin

      account:
      0 = ativo
      1 = voip
      2 = pabx

      */

     /** @ngInject */
     function routeConfig(baSidebarServiceProvider) {

          ///compras
          baSidebarServiceProvider.addStaticItem({
               title:      'Comprar',
               icon:       'fa fa-money',
               permission: 10,
               account:    0,
               subMenu:    [{
                    title:      'Recarga de Créditos',
                    disabled:   false,
                    permission: 10,
                    account:    0,
                    stateRef:   '55pbx_purchase_credit',
               }, /*{
                title:      'Compra de Licença',
                disabled:   false,
                permission: 10,
                account:    0,
                stateRef:   '55pbx_purchase_license',
                }*/]
          });

          //Perfil do usuário no Adminsitrator

          /*
           baSidebarServiceProvider.addStaticItem({
           title:      'Perfil',
           icon:       'fa fa-user',
           permission: 0,
           account:    0,
           subMenu:    [{
           title:      'Editar Perfil',
           disabled:   false,
           permission: 0,
           account:    0,
           stateRef:   '55pbx_userProfile',
           }, {
           title:      'Alterar Senha',
           disabled:   false,
           permission: 0,
           account:    0,
           stateRef:   '55pbx_userProfile_change_password',
           }]
           });
           */

          ///Conta
          baSidebarServiceProvider.addStaticItem({
               title:      'Conta',
               icon:       'fa fa-briefcase',
               permission: 10,
               account:    0,
               subMenu:    [
                    {
                         title:      'Dados Cadastrais',
                         disabled:   false,
                         permission: 10,
                         account:    0,
                         stateRef:   '55pbx_client_account'
                    },
                    {
                         title:      'Extrato de Ligações',
                         disabled:   false,
                         permission: 10,
                         account:    0,
                         stateRef:   '55pbx_call_history_financial',
                    },
                    {
                         title:      'Pedidos de Compra',
                         disabled:   false,
                         permission: 10,
                         account:    0,
                         stateRef:   '55pbx_purchase_history'
                    },
                    {
                         title:      'Minhas Tarifas',
                         disabled:   false,
                         permission: 10,
                         account:    0,
                         stateRef:   '55pbx_client_call_cost'
                    }
               ]
          });

          //Telefonia
          baSidebarServiceProvider.addStaticItem({
               title:      'Telefonia',
               icon:       'fa fa-phone-square',
               permission: 0,
               account:    0,
               subMenu:    [
                    {
                         title:      'Lista de Ramais',
                         disabled:   false,
                         permission: 0,
                         account:    0,
                         stateRef:   '55pbx_client_branch_number_list',
                    },
                    {
                         title:      'Minhas Ligações',
                         disabled:   false,
                         permission: 0,
                         account:    0,
                         stateRef:   '55pbx_call_history_user',
                    }, {
                         title:      'Softphones',
                         disabled:   false,
                         permission: 0,
                         account:    0,
                         stateRef:   '55pbx_softphones',
                    }]
          });

          //configurações
          baSidebarServiceProvider.addStaticItem({
               title:      'Configurações',
               icon:       'fa fa-cogs',
               permission: 10,
               account:    0,
               subMenu:    [{
                    title:      'Ramais',
                    disabled:   false,
                    permission: 10,
                    account:    0,
                    stateRef:   '55pbx_settings_branch_number',
               }, {
                    title:      'Filas',
                    disabled:   false,
                    permission: 10,
                    account:    2,
                    stateRef:   '55pbx_settings_queue',
               }, {
                    title:      'Menu de Voz (URA)',
                    disabled:   false,
                    permission: 10,
                    account:    2,
                    stateRef:   '55pbx_settings_electronic_menu',
               }, {
                    title:      'Números Virtuais',
                    disabled:   false,
                    permission: 10,
                    account:    1,
                    stateRef:   '55pbx_settings_number_pbx',
               }, {
                    title:      'Webcall',
                    disabled:   false,
                    permission: 10,
                    account:    2,
                    stateRef:   '55pbx_webcall_settings',
               }, {
                    title:      'Configurações Gerais',
                    disabled:   false,
                    permission: 10,
                    account:    2,
                    stateRef:   '55pbx_general_settings_pbx',
               }]
          });

          //Integrações
          baSidebarServiceProvider.addStaticItem({
               title:      'Integrações',
               icon:       'fa fa-cubes',
               permission: 10,
               account:    2,
               subMenu:    [
                    {
                         title:      'Zendesk',
                         disabled:   false,
                         permission: 10,
                         account:    2,
                         stateRef:   '55pbx_integration_zendesk',
                    },
                    {
                         title:      'Tempo real por URL',
                         disabled:   false,
                         permission: 10,
                         account:    0,
                         stateRef:   '55pbx_integration_endpoint',
                    }, {
                         title:      'Webservice (API)',
                         disabled:   false,
                         permission: 10,
                         account:    2,
                         stateRef:   '55pbx_integration_webservice',
                    }]
          });

          ///Auditoria
          baSidebarServiceProvider.addStaticItem({
               title:      'Relatórios',
               icon:       'fa fa-eye',
               permission: 5,
               account:    2,
               subMenu:    [{
                    title:      'Ligações',
                    disabled:   false,
                    permission: 5,
                    account:    2,
                    stateRef:   '55pbx_call_history_all',
               }, {
                    title:      'Tempo real',
                    icon:       'fa fa-area-chart',
                    fixedHref:  ' https://report.55pbx.com:8600/',
                    blank:      true,
                    permission: 5,
                    account:    2,
                    stateRef:   '',
               }, {
                    title:      'Métricas',
                    icon:       'fa fa-area-chart',
                    fixedHref:  'https://relatorio.55pbx.com:5000/',
                    blank:      true,
                    permission: 5,
                    account:    2,
                    stateRef:   '',
               }]
          });

          //discadora
          /* baSidebarServiceProvider.addStaticItem({
           title:      'Discadora',
           icon:       'fa fa-address-book-o',
           permission: 10,
           account:    0,
           subMenu:    [
           {
           title:      'Listas de Discagem',
           disabled:   false,
           permission: 0,
           account:    0,
           stateRef:   '55pbx_dialer_list',
           }]
           });*/

          //central de ajuda
          baSidebarServiceProvider.addStaticItem({
               title:      'Contate o suporte',
               icon:       'fa fa-life-ring',
               fixedHref:  'http://suporte.55pbx.com',
               blank:      true,
               permission: 0,
               account:    0,
               stateRef:   '',
          });
     }
})();

