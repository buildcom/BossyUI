function TooltipController($scope){

}

function Tooltip()
{
  return {
    restrict: 'A',
    scope: {
      data: '='
    },
    controller: TooltipController
  };
}

Tooltip.$inject = [];

TooltipController.$inject = ['$scope'];

angular.module('bossy.tooltip', [])
  .controller('bossyTooltipController', TooltipController)
    .directive('bossTooltip', Tooltip);
