angular.module('SandboxApp', [
    'ui.router',
    'bossy'
])

.config(['$stateProvider',
    function($stateProvider) {
        var module = angular.module('bossy');

        angular.forEach(module.requires, function(directive) {
            var name = directive.split('.')[1];
            $stateProvider
                .state(name, {
                    url: '/' + name,
                    templateUrl: function() {
                        return '/docs/bossy.' + name + '.html';
                    }
                });
        });
    }
])

.controller('DemoCtrl', ['$scope', '$document', '$window', '$compile',
    function($scope, $document, $window, $compile) {
        var module = angular.module('bossy');

        $scope.directives = [];
        $scope.directiveConfig = {};

        // Setup directive Configurations
        //
        $scope.inputconfig = $scope.basicInputConfig = {
            title: 'Postfix Input with text',
            placeholder: 'Text only',
            templateType: 'postfix',
            postfixContent: ".bossyui.com"
        };

        $scope.basicPrefixInputConfig = {
            title: 'Prefix Input with text',
            placeholder: 'Text only',
            templateType: 'prefix',
            prefixContent: "@"
        };

        $scope.numberInputConfig = {
            title: 'Input with number',
            type: 'number',
            placeholder: 'Numbers only'
        };

        $scope.counterInputConfig = {
            title: "Input with counter",
            placeholder: "Start typing",
            templateType: 'counter',
            max: 20
        };

        angular.forEach(module.requires, function(directive) {
            $scope.directives.push(directive.split('.')[1]);
        });
    }
]);