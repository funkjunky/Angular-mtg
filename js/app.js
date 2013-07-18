'use strict';	//what does this do??? try removing it later.

/* App Module */

angular.module('magicviewer', ['magicviewerServices'])
	.config(['$routeProvider', function($routeProvider) {
		$routeProvider
			.when('/builder', {templateUrl: "partials/builder.html", controller: builderCtrl})
			.when('/:set', {templateUrl: "partials/cardlist.html", controller: CardListCtrl})
			.when('/:set/:cardnum', {templateUrl: "partials/card.html", controller: CardDetailCtrl})
			.otherwise({redirectTo: '/m14'});
	}]);

function builderCtrl($scope, $http, Cards)
{
	$scope.cards = Cards.query();
	$http.get('magicsets/M14Names.json').success(function(data) {
		$scope.cardpool = data;
	});
}

function CardListCtrl($scope, Cards)
{
	$scope.cards = Cards.query();
}

//I don't know how right now, nor do I care too much. Neeeexxxxtttt
function CardDetailCtrl($scope, Cards)
{
}
