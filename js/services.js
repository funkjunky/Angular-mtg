'use strict'; //WHAT IS THIS???!?

/* Services */

angular.module('magicviewerServices', ['ngResource'])
	.factory('Cards', function($resource) {
		return $resource('magicsets/:set.json', {}, {
			query: {method: 'GET', params:{set: 'M14'}, isArray:true}
		});
	})
	.factory('Pack', function($http, $resource, Cards) {
		$resource('magicsets/:set.json', {}, {}).get("magicsets/M14.json", function(data) {
			console.log(data);	
		});
	});
