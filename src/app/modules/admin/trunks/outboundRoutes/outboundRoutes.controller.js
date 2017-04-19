/**
 * Controller de carga da aplicação e interface de área de suporte.
 * @namespace app.admin
 */

(function () {
    'use strict';

    angular
        .module('app.admin.outboundRoutes')
        .controller('AppAdminOutboundRoutesController', AppAdminOutboundRoutesController);

    AppAdminOutboundRoutesController.$inject = ['$translate', '$state', 'cacheService', 'toastr', 'trunksClientService', 'lodash', '$uibModal'];


    /** @ngInject */
    function AppAdminOutboundRoutesController($translate, $state, cacheService, toastr, trunksClientService, lodash, $uibModal) {

        /* jshint validthis: true */
        var vm = this;
        vm.client = null;
        vm.user = null;
        vm.filter_type = '';
        vm.filter_value = undefined;
        vm.executeFilter = executeFilter;
        vm.clearFilter = clearFilter;
        vm.getRoutes = getRoutes;
        vm.openForm = openForm;

        init();

        //carrega dashboard do desktop
        function init() {
            vm.client = cacheService.get('client');
            vm.user = cacheService.get('user');
            if (vm.user == undefined || vm.user == null) {
                $state.go('admin_user_login');
            }
            vm.getRoutes();
        }

        //obtem lista de ramais
        function getRoutes() {
            trunksClientService.getListClientTrunksByClientId(vm.client._id)
                .then(function (result) {
                    result = lodash.orderBy(result, ['number'], ['asc'])
                    vm.routesList = result;
                    vm.routesList_copy = angular.copy(result);
                });
        }

        //abri o formulario de cadastro/edição
        function openForm(_item) {
            $state.go('admin_outboundRoutes_form', {route: _item, state_back: 'admin_outboundRoutes'});
        }

        //modal de excluir ramal
        function deleteRoute(_item) {
            var modalInstance = $uibModal.open({
                animation:    true,
                templateUrl:  'app/layout/modal_danger_confirm.html',
                keyboard:     false,
                backdrop:     'static',
                controllerAs: 'vm',
                controller:   function DialogController($scope, $uibModalInstance, data) {
                    $scope.message = data.message;
                    $scope.title = data.title;
                    $scope.cancel = function () {
                        $uibModalInstance.dismiss('cancel');
                    }
                    $scope.confirm = function () {
                        $uibModalInstance.close(true);
                    }
                },
                resolve:      {
                    data: function () {
                        return {
                            message: "Deseja realmente excluir essa Rota?",
                            title:   "Excluir Rota"
                        }
                    }
                }
            });

            modalInstance.result
                .then(function (result) {
                    if (result) {
                        trunksClientService.removeClientTrunks(vm.client._id, _item.branch)
                            .then(function (result) {
                                if(result.length >= 1){
                                    vm.routesList = result;
                                    vm.routesList_copy = angular.copy(result);
                                    toastr.success(null, "Rota excluida com sucesso", {"timeOut": "8000"});
                                }

                            });
                    }
                });
        }

        //executa filtro na tabela
        function executeFilter() {
            if (vm.filter_type !== null && vm.filter_type.length > 0) {
                if ( vm.filter_value !== undefined && vm.filter_value !== null ) {
                    var data_filtered = [];
                    vm.routesList = angular.copy(vm.routesList_copy);

                    switch (vm.filter_type) {
                        case 'group_caller':
                        case 'branch':
                        case 'group_capture': {
                            data_filtered = lodash.filter(vm.routesList, function (reg) {
                                return reg[vm.filter_type] == vm.filter_value;
                            });
                            break;
                        }
                        case 'context':
                        case 'name':{
                            if (vm.filter_value.length >0){
                                data_filtered = lodash.filter(vm.routesList, function (reg) {
                                    return reg[vm.filter_type].toUpperCase().indexOf(vm.filter_value.toUpperCase()) !== -1;
                                });
                            } else
                                toastr.warning(null, $translate.instant('telenovo.settings.branch_number.filter_undefined'), {"timeOut": "8000"});


                            break;
                        }

                        case 'voicemail': {
                            data_filtered = _.filter(vm.routesList, function (reg) {
                                var value = vm.filter_value == 'true' ? true : false;
                                return reg[vm.filter_type] == value;
                            });
                            break;
                        }
                    }
                    vm.routesList = data_filtered;

                } else {
                    toastr.warning(null, $translate.instant('telenovo.settings.branch_number.filter_undefined'), {"timeOut": "8000"});
                }
            } else {
                toastr.warning(null, $translate.instant('telenovo.settings.branch_number.filter_undefined'), {"timeOut": "8000"});
            }
        }

        //limpa filtro
        function clearFilter() {
            vm.routesList = angular.copy(vm.routesList_copy);
            vm.filter_value = undefined;
        }

    }
})();
