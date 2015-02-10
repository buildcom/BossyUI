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
        });
    }])
    
;