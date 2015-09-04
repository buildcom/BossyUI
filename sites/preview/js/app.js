angular.module('PreviewApp', [
    'ui.router',
    'bossy'
])

    .config(['$stateProvider',
        function ($stateProvider) {
            var module = angular.module('bossy');

            //angular.forEach(module.requires, function (directive) {
            //    var name = directive.split('.')[1];
            //    $stateProvider
            //        .state(name, {
            //            url: '/' + name,
            //            templateUrl: 'templates/directive.html',
            //            controller: 'DirectiveCtrl',
            //            resolve: function () {
            //                return name;
            //            }
            //        });
            //});

            $stateProvider
                .state('directive', {
                    url: '/:name',
                    //templateUrl: 'templates/directive.html',
                    views: {
                        'directive': {
                            template: function ($stateParams) {
                                return '<bossy-' + $stateParams.name + ' config="config"></bossy-' + $stateParams.name + '>';
                            },
                            controller: 'DirectiveCtrl'
                        }
                    },

                    resolve: {
                        name: function ($stateParams) {
                            return $stateParams.name;
                        }
                    }
                });
        }
    ])

    .controller('NavCtrl', ['$scope', '$document', '$window', '$compile',
        function ($scope, $document, $window, $compile) {
            var module = angular.module('bossy');

            $scope.view = {
                directives: false
            };

            $scope.directives = [];

            $scope.toggleDirectives = function () {
                $scope.view.directives = !$scope.view.directives;
            };

            angular.forEach(module.requires, function (directive) {
                $scope.directives.push(directive.split('.')[1]);
            });
        }
    ])

    .controller('TabsCtrl', ['$scope', '$rootScope',
        function ($scope, $rootScope) {

            //$rootScope.name = '';

            $scope.tabs = {
                directive: true,
                options: false
            };

            $scope.toggleTabs = function () {
                $scope.tabs.directive = !$scope.tabs.directive;
                $scope.tabs.options = !$scope.tabs.options;
            };
        }
    ])

    .controller('DirectiveCtrl', ['$scope', '$rootScope', 'name',
        function ($scope, $rootScope, name) {

            $rootScope.view = {
                name: true
            };
            $rootScope.name = name;

            $scope.config = {};
        }
    ]);
