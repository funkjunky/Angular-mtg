'use strict'; //WHAT IS THIS???!?

/* Services */

angular.module('magicviewerServices', ['ngResource'])
	.factory('Cards', function($http, $resource) {
		return $resource('magicsets/:set.json', {}, {
			query: {method: 'GET', params:{set: 'M14'}, isArray:true}
		});
	})
