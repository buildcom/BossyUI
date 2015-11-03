function TooltipController($scope){

  // Toggle the visibility of the tooltip dynamically
  function togglePersist(){

		var tooltipDiv = $scope.element.find('div');

		if (tooltipDiv.hasClass('tooltip-active')){
			tooltipDiv.toggleClass('active');
		}

	}

  // Change the color of the tooltip dynamically
	function changeColor(newValue, oldValue){

		var tooltipDiv = $scope.element.find('div');

		if (tooltipDiv.hasClass('tooltip-active')){
			tooltipDiv.removeClass(oldValue);
			tooltipDiv.addClass(newValue);
		}

	}

  // Change the progress of the download bar dynamically
  function changeProgress(newValue){

    var progressDiv = $scope.element.find('div').find('div');

    if (progressDiv.hasClass('progress-bar')){
      progressDiv.css('width', newValue + '%');
    }

  }

	$scope.togglePersist = togglePersist;
	$scope.changeColor = changeColor;
  $scope.changeProgress = changeProgress;

}

function Tooltip()
{
  return {
    restrict: 'E',
    scope: {
      data: '=',
      options: '=',
    },
    controller: TooltipController,
    link: function(scope, element, attrs){

      // Reference to element for use in controller
      scope.element = element;

      // Fail safe in case text is not given
      if (!scope.data){
        scope.data = {text:''};
      }

      // Fail safe in case options are not given
      if (!scope.options){
        scope.options = {};
      }

      // If the user decides to pass html content through the markup
      if (scope.options.transclude === true){
        var tooltipHtml = element.find('div');
        scope.data.text = tooltipHtml.html();
        tooltipHtml.remove();
      }

      // Determine class options
      var tooltipClass = 'tooltip-active';

      // Anchor Alignment
      if (scope.options.align){

        if (scope.options.align.toLowerCase() === 'left'){
          tooltipClass += ' tooltip-left';
        }
        else if (scope.options.align.toLowerCase() === 'right'){
          tooltipClass += ' tooltip-right';
        }

      }

      // Color
      if (scope.options.color) {
        tooltipClass += ' ' + scope.options.color.toLowerCase();
      }

      // Content type
      if (scope.options.type){

        if (scope.options.type.toLowerCase() === 'html'){
          tooltipClass += ' content-html';
        }
        else if (scope.options.type.toLowerCase() === 'download'){
          tooltipClass += ' download';
          scope.data.text += '<div class="progress-bar"></div>';
        }
        else if (scope.options.type.toLowerCase() === 'alert'){
          tooltipClass += ' alert';
        }

      }

      // tooltipPosition handles the position of the whole tooltip,
      // above, below, right, or left of the element requiring a tooltip
      if(scope.options.position){
        if(scope.options.position.toLowerCase() === 'left'){
          tooltipClass += ' tooltip-pos-left';
        }
        else if(scope.options.position.toLowerCase() === 'right'){
          tooltipClass += ' tooltip-pos-right';
        }
        else if(scope.options.position.toLowerCase() === 'bottom'){
          tooltipClass += ' tooltip-pos-bottom';
        }
      }

      // Force tooltip to persist without hovering
      if (scope.options.persist === true){
        tooltipClass += ' active';
      }

      // Wrap element html
      var replacementHTML = '<span class="tooltip default-style" style="opacity:1;"><span class="link">' + element.html() +
        '<div class="' + tooltipClass + '" >' + scope.data.text + '</div></span></span>';

      // Replace element's html with wrapped content
      element.html(replacementHTML);

      // Watch the 'persist' option for changes
      scope.$watch('options.persist', function(newValue, oldValue){
        if (newValue !== oldValue){
          scope.togglePersist();
        }
      }, true);

      // Watch the 'color' option for changes
      scope.$watch('options.color', function(newValue, oldValue){
        if (newValue !== oldValue){
          scope.changeColor(newValue, oldValue);
        }
      }, true);

      // Watch the 'progress' option for changes
      scope.$watch('options.progress', function(newValue, oldValue){
        if (newValue !== oldValue){
          scope.changeProgress(newValue);
        }
      }, true);

    },
  };
}

Tooltip.$inject = [];

TooltipController.$inject = ['$scope'];

angular.module('bossy.tooltip', [])
.controller('bossyTooltipController', TooltipController)
.directive('bossyTooltip', Tooltip);
