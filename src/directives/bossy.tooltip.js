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
      element.bind('mouseenter', function(){
        element.after('<span id="tooltip" class="btn btn-danger">' + scope.data.text+ '</span>');

        if (scope.options.color === 'Blue'){
        angular.element(document.querySelector('#tooltip')).removeClass('btn btn-danger').addClass('btn btn-primary');
        angular.element(document.querySelector('#tooltip')).css('position', 'relative');
        angular.element(document.querySelector('#tooltip')).css('bottom', '50px');
        }

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
