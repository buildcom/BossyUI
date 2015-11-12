function TooltipController($scope){

  $scope.setAlignment = function(alignment){
    // Anchor Alignment
    var alignmentClass = '';

    if (alignment){
      if (alignment.toLowerCase() === 'left'){
        alignmentClass = 'tooltip-left';
      }
      else if (alignment.toLowerCase() === 'right'){
        alignmentClass ='tooltip-right';
      }
    }

    return alignmentClass;
  };

  $scope.setActive = function(persist){
    // Force tooltip to persist without hovering

    var activeClass = '';

    if (persist){
      activeClass = 'active';
    }

    return activeClass;
  };

  $scope.setPositioning = function(position){
    // tooltipPosition handles the position of the whole tooltip,
    // above, below, right, or left of the element requiring a tooltip
    var positionClass = '';

    if(position){
      if(position.toLowerCase() === 'left'){
        positionClass = 'tooltip-pos-left';
      }
      else if(position.toLowerCase() === 'right'){
        positionClass = 'tooltip-pos-right';
      }
      else if(position.toLowerCase() === 'bottom'){
        positionClass = 'tooltip-pos-bottom';
      }
    }

    return positionClass;
  };

  $scope.setContentType = function(type){
    // Content type
    var contentType = '';
    if ($scope.options.type){
      if ($scope.options.type.toLowerCase() === 'html'){
        contentType = 'content-html';
      }
      else if ($scope.options.type.toLowerCase() === 'download'){
        contentType = 'download';
      }
    }

    return contentType;
  };

function initialize(){

  // Throw an error if text is not given
  if (!$scope.data.text && $scope.options.transclude !== true){
    console.error('You must include content for tool tip.');
  }

  // Fail safe in case options are not given
  if (!$scope.options){
    $scope.options = {
      align: 'center',
      color: 'black',
      type: 'default',
      transclude: false,
      persist: false,
      progress: '0',
      icon: '',
    };
  }

}

  initialize();

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
    transclude: true,
    link: function(scope, elem, attr){

      // If the user decides to pass html content through the markup
      if (scope.options.transclude === true){
        var tooltipHtml = elem.find('div');
        var index = 0;

        while (tooltipHtml.length && !tooltipHtml.hasClass('tooltip-content')){
          tooltipHtml = tooltipHtml.find('div');
          index++;
        }

        if (tooltipHtml.length){
          scope.data.text = tooltipHtml.html();
          tooltipHtml[index].remove();
        }

        // Throw error if tool tip content is empty
        if (!scope.data.text){
          console.error('You must include content for tool tip.');
        }
      }

    },
    template: '<span class="tooltip default-style" style="opacity:1;">' +
                '<span class="link">' +
                  '<span style="white-space: nowrap;">' +
                    '<ng-transclude></ng-transclude>' +
                  '</span>' +
                  '<div class="tooltip-active {{options.color.toLowerCase()}} {{setActive(options.persist)}} ' +
                    '{{setAlignment(options.align)}} {{setContentType(options.type)}} {{setPositioning(options.position)}}">' +
                    '<span ng-bind-html="data.text | bossyUnsafe"></span>' +
                    '<i ng-show="options.icon" class="icon ionicon {{options.icon.toLowerCase()}}"></i>' +
                    '<div ng-show="options.type.toLowerCase() === \'download\'" class="progress-bar" style="width: {{options.progress}}%"></div>' +
                  '</div>' +
                '</span>' +
              '</span>',
  };
}

Tooltip.$inject = [];

TooltipController.$inject = ['$scope'];

angular.module('bossy.tooltip', [])
.controller('bossyTooltipController', TooltipController)
.directive('bossyTooltip', Tooltip)
.filter('bossyUnsafe', function($sce) {
  return function(val) {
    return $sce.trustAsHtml(val);
  };});
