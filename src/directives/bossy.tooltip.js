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

       // What do we do if no text is given?
       if (!scope.data){
         scope.data = {text:"Sample Tool Tip"};
       }

       // Fail safe in case options are not given
       if (!scope.options){
         scope.options = {};
       }

       // Determine class options
       var tooltipClass = "tooltip-active";

       // Alignment
       if (scope.options.align === "Left"){
         tooltipClass += " tooltip-left";
       }
       else if (scope.options.align === "Right"){
         tooltipClass += " tooltip-right";
       }

       // Color
       if (scope.options.color === "Green"){
         tooltipClass += " green";
       }
       else if (scope.options.color === "Blue"){
         tooltipClass += " blue";
       }
       else if (scope.options.color === "Orange"){
         tooltipClass += " orange";
       }
       else if (scope.options.color === "Red"){
         tooltipClass += " red";
       }

       // Content type
       if (scope.options.type === "Html"){
         tooltipClass += " content-html wide extra-padding";
       }
 	     else if (scope.options.type === "Download"){
         tooltipClass += " download";
 	     }
 	     else if (scope.options.type === "Alert")	   {
         tooltipClass += " alert"; 
 	     }

       // Wrap element html
       var replacementHTML = '<span class="tooltip default-style" style="opacity:1;"><span class="link">' + element.html() +
       '<span class="' + tooltipClass + '">' + scope.data.text + '</span></span></span>';

       // Replace element's html with wrapped content
       element.html(replacementHTML);

     },
    controller: TooltipController,
  };
}

Tooltip.$inject = [];

TooltipController.$inject = ['$scope'];

angular.module('bossy.tooltip', [])
  .controller('bossyTooltipController', TooltipController)
    .directive('bossyTooltip', Tooltip);
