'use strict';

/**
 * @ngdoc directive
 * @name izzyposWebApp.directive:adminPosHeader
 * @description
 * # adminPosHeader
 */
angular.module('telenovo_admin_web')
	.directive('headerNotification',function(){
		return {
        templateUrl:'app/directives/header/header-notification/header-notification.html',
        restrict: 'E',
        replace: true,
    	}
	});


