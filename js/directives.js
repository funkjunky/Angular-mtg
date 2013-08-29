'use strict'; //????

/* Directives */

angular.module('magicviewerDirectives', [])
	.directive('textboardz', function() {
		return {
			restrict: 'A',
			require: 'ngModel',
			link: function($scope, element, attr, ngModel) {

				var fromText = function(text) {
					//wrapper, because really, I shouldn't be using global variables so much =P
					var nameToIndex = function(name) {
						return _nameToIndex[name];
					};	

					//takes an object and duplicates it x times and return the resulting array.
					//the objects aren't cloned, they are simply references of each other.
					var arrayOfDups = function(obj, x) {
						var arr = [];
						for(var i=0; i!=x; ++i)
							arr.push(obj);

						return arr;
					};

					var newboard = [];

					//parse the text
					var tokens = text.split("\n");
					var cardregex = /(\d+)x (.+)/;
					var result,card;
					for(var i = 0, result; i != tokens.length; ++i)
						if((result = cardregex.exec(tokens[i]))) {
							if(card = $scope.pool[nameToIndex(result[2])])
								newboard = newboard.concat(arrayOfDups(card, result[1]));
							else
								console.log("Card not recognized: " + result[2]);
						}
				
					return newboard;
				};

				var toText = function(board) {
					var cardtally = {};

					for(var i = 0; i != board.length; ++i)
						if(cardtally[board[i].name])
							++cardtally[board[i].name];
						else
							cardtally[board[i].name] = 1;

					var str = "";
					for(var key in cardtally)
							str += cardtally[key] + "x " + key + "\n";

					return str;
				};

				ngModel.$parsers.push(fromText);
				ngModel.$formatters.push(toText);
			}
		};
	});
