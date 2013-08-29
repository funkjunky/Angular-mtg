'use strict';	//what does this do??? try removing it later.

/* App Module */

var _nameToIndex = {};

angular.module('magicviewer', ['magicviewerServices', 'magicviewerDirectives'])
	.config(['$routeProvider', function($routeProvider) {
		$routeProvider
			.when('/builder', {templateUrl: "partials/builder.html", controller: builderCtrl})
			.when('/:set', {templateUrl: "partials/cardlist.html", controller: CardListCtrl})
			.when('/:set/:cardnum', {templateUrl: "partials/card.html", controller: CardDetailCtrl})
			.otherwise({redirectTo: '/builder'});
	}]);

function sealedCtrl($scope, Pack)
{
}

function builderCtrl($scope, $http, Cards)
{
	$scope.pool = Cards.query({}, function() {
		//This is a map, so we can get the pool's array index from a card name.
		//Necessary when turning getting cards using the text board from the pool.
		for(var i=0; i!=$scope.pool.length; ++i)
			_nameToIndex[$scope.pool[i].name] = i;
	});
	$scope.mainboard = [];
	$scope.sideboard = [];

	$scope.addToMain = function(card) {
		//$scope.mainboard.push(card), but with a clone attached.
		//The problem is $watch compares the variables, and the array reference
		//doesn't change, even if the array changes. A better soln would be to
		//somehow tell it to check the length property, but that wouldn't handle
		//all cases either... I unno...
		$scope.mainboard = $scope.mainboard.concat([card]);
	};
	$scope.addToSide = function(card) {
		$scope.sideboard = $scope.sideboard.concat([card]);
	};
	$scope.moveToSide = function(card) {
		$scope.removeFromMain(card);
		$scope.sideboard = $scope.sideboard.concat([card]);
	};
	$scope.moveToMain = function(card) {
		$scope.removeFromSide(card);
		$scope.mainboard = $scope.mainboard.concat([card]);
	};
	$scope.removeFromSide = function(card) {
		for(var i=0; i < $scope.sideboard.length; ++i)
			if($scope.sideboard[i] == card)
			{
				$scope.sideboard.splice(i, 1);
				return $scope.sideboard = $scope.sideboard.concat([]);
			}
	};
	$scope.removeFromMain = function(card) {
		for(var i=0; i < $scope.mainboard.length; ++i)
			if($scope.mainboard[i] == card)
			{
				$scope.mainboard.splice(i, 1);
				return $scope.mainboard = $scope.mainboard.concat([]);
			}
	};

	var unstack = function() {
		$(".cardchoice").show();
		$(".instanceCount").text("");
	};

	$scope.applyStacking = function() {
		if(!$scope.isStacked)
			return unstack();
		
		for(var i=0; i!=$scope.mainboard.length; ++i)
		{
			var instances = $("#visualMainboard").find("."+$scope.mainboard[i].id);
			console.log(instances);
			instances.each(function(i, el) {
				if(i > 0)
					return $(this).hide();

				$(this).show()
					.find(".instanceCount").text(instances.length + " Total");
			});
		}
		for(var i=0; i!=$scope.sideboard.length; ++i)
		{
			var instances = $("#visualSideboard").find("."+$scope.sideboard[i].id);
			console.log(instances);
			instances.each(function(i, el) {
				if(i > 0)
					return $(this).hide();

				$(this).show()
					.find(".instanceCount").text(instances.length + " Total");
			});
		}
	};
	$scope.$watch("mainboard", $scope.applyStacking, true);
	$scope.$watch("sideboard", $scope.applyStacking, true);
}

function CardListCtrl($scope, Cards)
{
	$scope.cards = Cards.query();
}

//I don't know how right now, nor do I care too much. Neeeexxxxtttt
function CardDetailCtrl($scope, Cards)
{
}
