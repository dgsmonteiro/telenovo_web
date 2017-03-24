'use strict';

/**
 * @ngdoc directive
 * @name izzyposWebApp.directive:adminPosHeader
 * @description
 * # adminPosHeader
 */
angular.module('telenovo_admin_web')
	.directive('notifications',function(){
		return {
        templateUrl:'app/directives/notifications/notifications.html',
        restrict: 'E',
        replace: true,
    	}
	});


