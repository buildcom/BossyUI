function TooltipController($scope){


}

function Tooltip()
{
  return {
    restrict: 'A',
    scope: {
      data: '=',
      options: '=',
    },
    link: function(scope, element, attrs){

      var tooltipElement = angular.element('<span id="tooltip" class="btn btn-danger">' + scope.data.text+ '</span>');

      element.bind('mouseenter', function(){
        element.after(tooltipElement);

        if (scope.options.color === 'Blue'){
        tooltipElement.removeClass('btn btn-danger').addClass('btn btn-primary');
        }
      });

      element.bind('mouseleave', function(){
        tooltipElement.remove();
      });
    },
    controller: TooltipController,
  };
}

Tooltip.$inject = [];

TooltipController.$inject = ['$scope'];

angular.module('bossy.tooltip', [])
  .controller('bossyTooltipController', TooltipController)
    .directive('bossyTooltip', Tooltip);
