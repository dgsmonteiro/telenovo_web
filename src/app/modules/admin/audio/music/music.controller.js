/**
 * Controller de carga da aplicação e interface de área de suporte.
 * @namespace app.admin
 */

(function () {
    'use strict';

    angular
        .module('app.admin.music')
        .controller('AppAdminMusicController', AppAdminMusicController);

    AppAdminMusicController.$inject = ['$translate', '$state', 'cacheService', 'toastr', 'musicClientService', 'lodash', '$uibModal'];


    /** @ngInject */
    function AppAdminMusicController($translate, $state, cacheService, toastr, musicClientService, lodash, $uibModal) {

        /* jshint validthis: true */
        var vm = this;
        vm.client = null;
        vm.user = null;
        vm.filter_type = '';
        vm.filter_value = undefined;
        vm.executeFilter = executeFilter;
        vm.clearFilter = clearFilter;
        vm.getBranchGroup = getBranchGroup;
        vm.openForm = openForm;
        vm.deleteBranch = deleteBranch;

        init();

        //carrega dashboard do desktop
        function init() {
            vm.client = cacheService.get('client');
            vm.user = cacheService.get('user');
            if (vm.user == undefined || vm.user == null) {
                $state.go('admin_user_login');
            }

        }

        //obtem lista de grupos
        function getBranchGroup() {
            musicClientService.getListClientBanchGroupByClientId(vm.client._id)
                .then(function (result) {
                    result = lodash.orderBy(result, ['number'], ['asc'])
                    vm.branchList = result;
                    vm.branchList_copy = angular.copy(result);
                });
        }


        //abri o formulario de cadastro/edição
        function openForm(_item) {
            $state.go('admin_music_form', {branch: _item, state_back: 'admin_branchGroup'});
        }

        //modal de excluir ramal
        function deleteBranch(_item) {
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
                            message: "Deseja realmente excluir esse Grupo?",
                            title:   "Excluir Grupo"
                        }
                    }
                }
            });

            modalInstance.result
                .then(function (result) {
                    if (result) {
                        musicClientService.removeClientBranchGroup(vm.client._id, _item.branch)
                            .then(function (result) {
                                if(result.length >= 1){
                                    vm.branchList = result;
                                    vm.branchList_copy = angular.copy(result);
                                    toastr.success(null, "Grupo excluido com sucesso", {"timeOut": "8000"});
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
                    vm.branchList = angular.copy(vm.branchList_copy);

                    switch (vm.filter_type) {

                        case 'queueNumber': {
                            data_filtered = lodash.filter(vm.branchList, function (reg) {
                                return reg[vm.filter_type] == vm.filter_value;
                            });
                            break;
                        }

                        case 'queueName':{
                            if (vm.filter_value.length >0){
                                data_filtered = lodash.filter(vm.branchList, function (reg) {
                                    return reg[vm.filter_type].toUpperCase().indexOf(vm.filter_value.toUpperCase()) !== -1;
                                });
                            } else
                                toastr.warning(null, $translate.instant('admin.settings.branch_number.filter_undefined'), {"timeOut": "8000"});


                            break;
                        }


                    }
                    vm.branchList = data_filtered;

                } else {
                    toastr.warning(null, $translate.instant('admin.settings.branch_number.filter_undefined'), {"timeOut": "8000"});
                }
            } else {
                toastr.warning(null, $translate.instant('admin.settings.branch_number.filter_undefined'), {"timeOut": "8000"});
            }
        }

        //limpa filtro
        function clearFilter() {
            vm.branchList = angular.copy(vm.branchList_copy);
            vm.filter_value = undefined;
        }

    }
})();
