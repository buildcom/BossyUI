function TooltipController($scope){


}

function Tooltip()
{
  return {
    restrict: 'A',
    scope: {
      data: '=',
    },
    link: function(scope, element, attrs){
      element.bind('mouseenter', function(){
        element.after('<span id="tooltip" class="btn btn-danger">' + scope.data.text+ '</span>');

      });

      element.bind('mouseleave', function(){
        angular.element(document.querySelector('#tooltip')).remove();
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
