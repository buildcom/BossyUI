/**
 * @class Chart
 * @description Creates simple line, plot, or pie charts.
 * @example
 <div ng-app="sandboxApp" ng-controller="sandboxCtrl">
	<bossy-chart type="bar" data="data" config="config"></bossy-chart>
 </div>
 <script>
	angular.module("sandboxApp", ["bossy"])

	.controller("sandboxCtrl", ["$scope", function($scope) {
		$scope.data =  [10, 20, 35, 55, 25, 50];
		$scope.config = {};
	}]);
 </script>
 */

function Chart() {

    var templates = {
        'base':
            '<div class="chart" style="width:{{width}}px; height:{{height}}px;">' +
            '   <div class="y" style="width:{{height}}px;">{{yLabel}}</div>' +
            '   <div class="x">{{xLabel}}</div>' +
            '</div>',
        'line':
            '<svg style="width:{{config.width}}px; height:{{config.height}}px;">' +
            '   <line ' +
            '       ng-repeat="line in data" ' +
            '       ng-attr-x1="{{line.x1}}"' +
            '       ng-attr-y1="{{line.y1}}"' +
            '       ng-attr-x2="{{line.x2}}"' +
            '       ng-attr-y2="{{line.y2}}">' +
            '   </line>' +
            '</svg>',
        'dot':
            '<div' +
            '   ng-repeat="dot in data"' +
            '   class="dot"' +
            '   style="bottom:{{dot.value / max * height}}px; left:{{($index + 0.5) / data.length * width}}px;">' +
            '</div>',
        'bar':
            '<svg style="width:{{config.width}}px; height:{{config.height}}px;">' +
            '   <rect ' +
            '       ng-repeat="bar in data"' +
            '       x="{{$index * (config.width / data.length)}}"' +
            '       y="{{config.height - bar}}"' +
            '       data-index="{{$index}}"' +
            '       width="{{config.width / data.length}}"' +
            '       height="{{bar}}"' +
            '       style="fill:rgb(0,0,255);stroke-width:3;stroke:rgb(0,0,0)">' +
            '</svg>'
    };

    function _controller($scope, $filter) {
        var config = {
                max: 0,
                height: 200,
                width: 200,
                xLabel: undefined,
                yLabel: undefined
            };

        $scope.config = angular.extend({}, config, $scope.config);
        $scope.type = $scope.type || 'bar';
        $scope.template = templates[$scope.type];

        if ($scope.type === 'line') {
            config.max = $filter('orderBy')($scope.data, '-value')[0].value;

            angular.forEach($scope.data, function(line, index) {
                line.x1 = parseInt(index / $scope.data.length * config.width);
                line.y1 = parseInt(($scope.data[index - 1] ? $scope.data[index - 1].value : 0) / config.max * config.height);
                line.x2 = parseInt((index + 1)/ $scope.data.length * config.width);
                line.y2 = parseInt(line.value / config.max * config.height);
            });
        }
    }

    _controller.$inject = ['$scope', '$filter'];

    return {
        restrict: 'E',
        replace: true,
        scope: {
            type: '@',
            config: '=',
            data: '='
        },
        template: templates['base'],
        compile: function (element, attrs) {
            var type = attrs.type || 'bar';

            element.html(templates[type]);
        },
        controller: _controller
    };
}

Chart.$inject = [];

angular.module('bossy.chart', [])
    .directive('bossyChart', Chart);
