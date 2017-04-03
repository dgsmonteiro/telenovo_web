'use strict';

/**
 * @ngdoc directive
 * @name izzyposWebApp.directive:adminPosHeader
 * @description
 * # adminPosHeader
 */

angular.module('telenovo_admin_web')
    .directive('sidebar', ['$location', function () {
        return {
            templateUrl: 'app/directives/sidebar/sidebar.html',
            restrict: 'E',
            replace: true,
            scope: {},
            controller: function ($scope, $state) {
                $scope.selectedMenu = 'dashboard';
                $scope.collapseVar = 0;
                $scope.multiCollapseVar = 0;

                $scope.check = function (x) {

                    if (x == $scope.collapseVar)
                        $scope.collapseVar = 0;
                    else
                        $scope.collapseVar = x;
                };

                $scope.multiCheck = function (y) {

                    if (y == $scope.multiCollapseVar)
                        $scope.multiCollapseVar = 0;
                    else
                        $scope.multiCollapseVar = y;
                };

                $scope.home = function () {
                    $state.go('admin_home');
                };

                $scope.branch = function () {
                    $state.go('admin_branch');
                };
                $scope.branchGroup = function () {
                    $state.go('admin_branchGroup');
                };
                $scope.conference = function () {
                    $state.go('admin_conference');
                };
                $scope.dialPlan = function () {
                    $state.go('admin_dialPlan');
                };
            }
        }
    }]);
