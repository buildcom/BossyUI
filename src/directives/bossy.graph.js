/**
 * @param {param} config
 * @param {string} [config.type="bar"] - Type of graph; Line, dot, or bar.
 * @param {array} [config.data=[10,20,30,40,50]] - Graph data.
 * @param {number} [config.height=200] - Graph height in pixels.
 * @param {number} [config.width=200] - Graph width in pixels.
 * @param {string} [config.xLabel="xLabel"] - Label for x-axis.
 * @param {string} [config.yLabel="yLabel"] - Label for y-axis.
 */
function Chart ($compile) {

    var templates = {
        base:
            '<div class="chart" style="width:{{config.width}}px; height:{{config.height}}px;">' +
            '   <div class="y" style="width:{{config.height}}px;">{{config.yLabel}}</div>' +
            '   <div class="x">{{config.xLabel}}</div>' +
            '</div>',
        line:
            '<svg style="width:{{config.width}}px; height:{{config.height}}px;">' +
            '   <line ' +
            '       ng-repeat="line in data" ' +
            '       ng-attr-x1="{{line.x1}}"' +
            '       ng-attr-y1="{{line.y1}}"' +
            '       ng-attr-x2="{{line.x2}}"' +
            '       ng-attr-y2="{{line.y2}}">' +
            '   </line>' +
            '</svg>',
        dot:
            '<div' +
            '   ng-repeat="dot in data"' +
            '   class="dot"' +
            '   style="bottom:{{dot.value / max * height}}px; left:{{($index + 0.5) / data.length * width}}px;">' +
            '</div>',
        bar:
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

	function _buildBarSvg (width, height, data) {
		var svg = '<svg style="width:' + width + 'px; height:' + height + 'px;">';

		angular.forEach(data, function(bar, index) {
			var x = index * (width / data.length);
			var y = height - bar;
			var w = width / data.length;

			svg += '<rect x="' + x + '" y="' + y + '" width="' + w + '" height="' + bar + '" style="fill:rgb(0,0,255);stroke-width:1;stroke:rgb(0,0,0)"></rect>';
		});

		svg += '</svg>';

		return svg;
	}

    function _controller ($scope, $filter) {
        var config = {
                max: 0,
                height: 200,
                width: 200,
                xLabel: undefined,
                yLabel: undefined
            };

	    $scope.data = $scope.config.data || [];
        $scope.config = angular.extend({}, config, $scope.config);

        $scope.type = $scope.config.type || 'bar';
        $scope.template = templates[$scope.type];
    }

    _controller.$inject = ['$scope', '$filter'];

	function _compile (element, attrs) {

		return {
			post: function(scope, element, attrs){
				var svgTag = angular.element(_buildBarSvg(scope.config.width, scope.config.height, scope.data));
				element.append(svgTag);
			}
		}
	}

    return {
        restrict: 'E',
        replace: true,
        scope: {
            config: '='
        },
        template: templates.base,
        compile: _compile,
        controller: _controller
    };
}

Chart.$inject = ['$compile'];

angular.module('bossy.graph', [])
    .directive('bossyGraph', Chart);

