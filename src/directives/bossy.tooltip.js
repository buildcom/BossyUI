 angular.module('bossy.tooltip', [])
	.run(function($templateCache) {
		$templateCache.put('jasmineTest.html', 'jasmineTest.html');
	})
	
	.factory('bossyTooltipFactory', function() {
		return {
			_options: {
				title: 'factory title',
				content: 'factory content'
			}
		}
	})
	
	.directive('bossyTooltip', function($compile, $http /*$data,*/ /*$schema*/) {
		return {
			restrict: 'EA',
			replace: true,
			templateUrl: 'bossy.tooltip.html',
			controller:['$scope', 'bossyTooltipFactory', function($scope, bossyTooltipFactory) {
					this._options = {
					title: bossyTooltipFactory._options.title,
					content: bossyTooltipFactory._options.content
				};
			}],
			controllerAs: "tips"		
		};
	})
	
	// Directives onEnter && onExit use jQueryLite dependency
	.directive('onEnter', function() {
		return function(scope, element) {
			element.bind('mouseenter', function() {
				console.log("I'm in you");
			})
		}
	})
	
	.directive('onExit', function() {
		return function(scope, element) {
			element.bind('mouseleave', function() {
				console.log("I'm outta here");
			})
		}
	})
	