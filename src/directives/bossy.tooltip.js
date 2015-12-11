/**
 * @param {param} config
 * @param {string} [config.text="Tooltip"] - Tooltip text.
 * @param {string} [config.align="center"] - Text alignment.
 * @param {string} [config.position="top"] - Tooltip position in relation to element; Top, right, bottom, left.
 * @param {string} [config.color="black"] - Text color.
 * @param {string} [config.type="default"] - Tooltip base types; Default, download.
 * @param {number} [config.progress=0] - Progress indicator.
 * @param {icon} config.icon - Ionicons icon class name.
 * @param {iconFloat} config.iconFloat - Icon position to text; Left, right.
 * @param {boolean} config.transclude
 * @param {boolean} config.persist
 */
function Tooltip () {
	return {
		restrict: 'E',
		scope: {
			config: '='
		},
		controller: TooltipController,
		transclude: true,
		link: function (scope, elem, attr) {
			
			// If the user decides to pass html content through the markup
			if (scope.config.transclude === true) {
				var tooltipHtml = elem.find('div');
				var index = 0;
				
				while (tooltipHtml.length && !tooltipHtml.hasClass('tooltip-content')) {
					tooltipHtml = tooltipHtml.find('div');
					index++;
				}
				
				if (tooltipHtml.length) {
					scope.config.text = tooltipHtml.html();
					tooltipHtml[index].remove();
				}
				
				// Throw error if tool tip content is empty
				if (!scope.config.text) {
					console.error('You must include content for tool tip.');
				}
			}
			
		},
		template: '<span class="bossy-tooltip">' +
		'<span class="link">' +
		'<ng-transclude></ng-transclude>' +
		'<div class="bossy-tooltip-container {{config.color.toLowerCase()}} {{setActive(config.persist)}} ' +
		'{{setAlignment(config.align)}} {{setContentType(config.type)}} {{setPositioning(config.position)}}">' +
		'<span ng-bind-html="config.text | bossyUnsafeHtml"></span>' +
		'<i ng-show="config.icon" class="icon ionicon {{config.icon.toLowerCase()}} {{setIconFloat(config.iconFloat)}}"></i>' +
		'<div ng-show="config.type.toLowerCase() === \'download\'" class="progress-bar" style="width: {{config.progress}}%"></div>' +
		'</div>' +
		'</span>' +
		'</span>'
	};
}

Tooltip.$inject = [];

function TooltipController ($scope) {
	
	$scope.setAlignment = function (alignment) {
		// Anchor Alignment
		var alignmentClass = '';
		
		if (alignment) {
			if (alignment.toLowerCase() === 'left') {
				alignmentClass = 'bossy-tooltip-align-left';
			}
			else if (alignment.toLowerCase() === 'right') {
				alignmentClass = 'bossy-tooltip-align-right';
			}
		}
		
		return alignmentClass;
	};
	
	$scope.setActive = function (persist) {
		// Force tooltip to persist without hovering
		var activeClass = '';
		
		if (persist) {
			activeClass = 'active';
		}
		
		return activeClass;
	};
	
	$scope.setPositioning = function (position) {
		// tooltipPosition handles the position of the whole tooltip,
		// above, below, right, or left of the element requiring a tooltip
		var positionClass = '';
		
		if (position) {
			if (position.toLowerCase() === 'left') {
				positionClass = 'bossy-tooltip-pos-left';
			}
			else if (position.toLowerCase() === 'right') {
				positionClass = 'bossy-tooltip-pos-right';
			}
			else if (position.toLowerCase() === 'bottom') {
				positionClass = 'bossy-tooltip-pos-bottom';
			}
		}
		
		return positionClass;
	};
	
	$scope.setContentType = function (type) {
		// Content type
		var contentType = '';
		
		if (type) {
			if (type.toLowerCase() === 'download') {
				contentType = 'download';
			}
		}
		
		return contentType;
	};
	
	$scope.setIconFloat = function (direction) {
		// Float icon to left or right
		var iconDirection = '';
		
		if (direction) {
			if (direction.toLowerCase() === 'left') {
				iconDirection = 'icon-left';
			}
			else if (direction.toLowerCase() === 'right') {
				iconDirection = 'icon-right';
			}
		}
		
		return iconDirection;
	};
	
	function initialize () {
		
		// Throw an error if text is not given
		if (!$scope.config.text && $scope.config.transclude !== true) {
			console.error('You must include content for tool tip.');
		}
		
		// Fail safe in case config are not given
		if (!$scope.config) {
			$scope.config = {
				align: 'center',
				position: 'top',
				color: 'black',
				type: 'default',
				transclude: false,
				persist: false,
				progress: '0',
				icon: '',
				iconFloat: 'left'
			};
		}
		
	}
	
	initialize();
}

TooltipController.$inject = ['$scope'];

angular.module('bossy.tooltip', ['bossy.filters'])
	.controller('bossyTooltipController', TooltipController)
	.directive('bossyTooltip', Tooltip);
