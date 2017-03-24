'use strict';

/**
 * @ngdoc directive
 * @name izzyposWebApp.directive:adminPosHeader
 * @description
 * # adminPosHeader
 */
angular.module('telenovo_admin_web')
	.directive('header',function(){
		return {
        templateUrl:'app/directives/header/header.html',
        restrict: 'E',
        replace: true,
    	}
	});


