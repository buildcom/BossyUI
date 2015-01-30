angular.module('SandboxApp', [
    'ui.router',
    'bossy'
])

    .config(['$stateProvider', function($stateProvider) {
        var module =  angular.module('bossy');

        angular.forEach(module.requires, function(directive) {
            var name = directive.split('.')[1];

            $stateProvider
                .state(name, {
                    url: '/' + name,
                    templateUrl: function () {
                        return '/docs/bossy.' +name + '.html';
                    }
                });
        });
    }])

    .controller('DemoCtrl', ['$scope', '$document', '$window', '$compile', function($scope, $document, $window, $compile) {
        var module =  angular.module('bossy');

        $scope.directives = [];
        $scope.directiveConfig = {};

        angular.forEach(module.requires, function(directive) {
            $scope.directives.push(directive.split('.')[1]);
            //$scope.states.push(directive.split('.')[1]);
        });

        //$scope.developLocally = function(directive) {
        //    var demo,
        //        html;
        //
        //    demo = angular.element(document.getElementById('results'));
        //    html = '<' + directive.replace('.', '-') + ' config="directiveConfig">';
        //
        //    $compile(demo.html(html))($scope);
        //};
    }])
;