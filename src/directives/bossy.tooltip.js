function TooltipController($scope){


}

function Tooltip()
{
  return {
    restrict: 'E',
    scope: {
      data: '=',
      options: '=',
    },
    link: function(scope, element, attrs){

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

    },
  };
}

Tooltip.$inject = [];

TooltipController.$inject = ['$scope'];

angular.module('bossy.tooltip', [])
.controller('bossyTooltipController', TooltipController)
.directive('bossyTooltip', Tooltip);
