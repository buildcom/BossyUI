angular.module('PreviewApp', [
    'ui.router',
    'ui.ace',
    'bossy'
])

    .config(['$stateProvider', '$urlRouterProvider',
        function ($stateProvider, $urlRouterProvider) {

            $stateProvider
                .state('directive', {
                    url: '/:name',
                    views: {
                        'name': {
                            template: function ($stateParams) {
                                return ': ' + $stateParams.name;
                            }
                        },
                        'directive': {
                            controller: 'DirectiveCtrl'
                        }
                    },

                    resolve: {
                        name: function ($stateParams) {
                            return $stateParams.name;
                        }
                    }
                });

            $urlRouterProvider.otherwise('/calendar');
        }
    ])

    .run([function () {

    }])

    .controller('NavCtrl', ['$scope',
        function ($scope) {
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

    .controller('DirectiveCtrl', ['$scope', '$compile', 'name',
        function ($scope, $compile, name) {
            var markupLoaded = false,
                optionsLoaded = false,
                markupKey = 'markup-' + name,
                markupStorage = localStorage[markupKey],
                optionsKey = 'options-' + name,
                optionsStorage = localStorage[optionsKey];

            $scope.markupEditorOptions = {
                useWrapMode : true,
                theme:'twilight',
                mode: 'html',
                onLoad: markupEditorLoaded,
                onChange: markupEditorChanged
            };

            $scope.optionsEditorOptions = {
                useWrapMode : true,
                theme:'twilight',
                mode: 'javascript',
                onLoad: optionsEditorLoaded,
                onChange: optionsEditorChanged
            };

            function markupEditorLoaded (markupEditor) {
                $scope.markupEditor = markupEditor;
                $scope.markupEditor.setValue(markupStorage);
            }

            function markupEditorChanged () {
                if (markupLoaded) {
                    markupStorage = $scope.markupEditor.getValue();
                    localStorage[markupKey] = markupStorage;
                    buildDirective(optionsStorage, markupStorage);
                } else {
                    markupLoaded = true;
                }
            }

            function optionsEditorLoaded (optionsEditor) {
                $scope.optionsEditor = optionsEditor;
                $scope.optionsEditor.setValue(optionsStorage);
            }

            function optionsEditorChanged () {
                if (optionsLoaded) {
                    optionsStorage = $scope.optionsEditor.getValue();
                    localStorage[optionsKey] = optionsStorage;
                    buildDirective(optionsStorage, markupStorage);
                } else {
                    optionsLoaded = true;
                }
            }

            function buildDirective (options, markup) {
                try {
                    eval(options);
                } catch (ex) {
                    console.log('options syntax is incorrect');
                    return;
                }

                var src = $compile(markup)($scope),
                    dst = angular.element(document.getElementById('preview'));

                dst.empty();
                dst.append(src);
            }

            function init () {
                if (!optionsStorage) {
                    optionsStorage = '$scope.directiveData = {\n};\n\n$scope.directiveOptions = {\n};';
                }
                if (!markupStorage) {
                    markupStorage = '<bossy-' + name + ' data="directiveData" options="directiveOptions"></bossy-' + name + '>';
                }

                buildDirective(optionsStorage, markupStorage);
            }

            init();
        }
    ]);
