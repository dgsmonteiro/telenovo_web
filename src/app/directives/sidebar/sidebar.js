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
                $scope.inboundRoutes = function () {
                    $state.go('admin_inboundRoutes');
                };
                $scope.outboundRoutes = function () {
                    $state.go('admin_outboundRoutes');
                };
                $scope.commands = function () {
                    $state.go('admin_commands');
                };
                $scope.followMe = function () {
                    $state.go('admin_followMe');
                };
                $scope.timeCondition = function () {
                    $state.go('admin_timeCondition');
                };
                $scope.ura = function () {
                    $state.go('admin_ura');
                };
                $scope.announcement = function () {
                    $state.go('admin_announcement');
                };
                $scope.music = function () {
                    $state.go('admin_music');
                };
            }
        }
    }]);
