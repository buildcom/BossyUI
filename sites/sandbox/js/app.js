angular.module('SandboxApp', [
    'bossy'
])

    .controller('DemoCtrl', ['$scope', '$document', '$window', '$compile', function($scope, $document, $window, $compile) {
        var module =  angular.module('bossy');

        $scope.directives = [];
        $scope.directiveConfig = {};

        for (var i in module.requires) {
            $scope.directives.push(module.requires[i]);
        }

        $scope.developLocally = function(directive) {
            var demo;
            var html;

            demo = angular.element(document.getElementById('demo'));
            html = '<' + directive.replace('.', '-') + ' config="directiveConfig">';

            $compile(demo.html(html))($scope);

        };

    }])
;