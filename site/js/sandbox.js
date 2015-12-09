angular.module('BossyUIApp', [
	'ui.router',
	'ui.ace',
	'bossy'
])

    .config(['$stateProvider', '$urlRouterProvider',
        function ($stateProvider, $urlRouterProvider) {

            //$stateProvider
            //    .state('directive', {
            //        url: '/:name',
            //        views: {
            //            'name': {
            //                template: function ($stateParams) {
            //                    return ': ' + $stateParams.name;
            //                }
            //            },
            //            'directive': {
            //                controller: 'DirectiveCtrl'
            //            }
            //        },
            //
            //        resolve: {
            //            name: function ($stateParams) {
            //                return $stateParams.name;
            //            }
            //        }
            //    });
            //
            //$urlRouterProvider.otherwise('/calendar');
        }
    ])

    .run([function () {

    }])

	.controller('SandboxCtrl', [
		'$scope',
		'$http',
		'$compile',
		function ($scope, $http, $compile) {
			var	selected = false;
			var	markupKey = '';
			var	optionsKey = '';

			$scope.smallEditors = false;
			$scope.editorsSize = 'glyphicon-resize-small';
			$scope.editorsCol = 'col-md-6';
			$scope.outputCol = 'col-md-6';

			$scope.optionsEditorOptions = {
				useWrapMode : true,
				theme:'twilight',
				mode: 'javascript',
				onLoad: function (optionsEditor) {
					$scope.optionsEditor = optionsEditor;
				},
				onChange: function () {
					localStorage[optionsKey] = $scope.optionsEditor.getValue();

					if (selected) {
						buildDirective();
					}
				}
			};

			$scope.markupEditorOptions = {
				useWrapMode : true,
				theme:'twilight',
				mode: 'html',
				onLoad: function (markupEditor) {
					$scope.markupEditor = markupEditor;
				},
				onChange: function () {
					localStorage[markupKey] = $scope.markupEditor.getValue();

					if (selected) {
						buildDirective();
					}
				}
			};

			$scope.selectDirective = function (directive) {
				markupKey = 'markup-' + directive;
				optionsKey = 'options-' + directive;

				angular.forEach($scope.directives, function(value, key) {
					$scope.directives[key].active = false;
				});

				$scope.directives[directive].active = !$scope.directives[directive].active;

				if (!localStorage[optionsKey] || !localStorage[markupKey]) {
					$http.get('/api/directives/' + directive + '/doc').then(function(results) {

						if (!localStorage[optionsKey]) {
							$scope.optionsEditor.setValue(results.data.params.join('\n'));
						} else {
							$scope.optionsEditor.setValue(localStorage[optionsKey]);
						}

						if (!localStorage[markupKey]) {
							$scope.markupEditor.setValue(results.data.markup);
						} else {
							$scope.markupEditor.setValue(localStorage[markupKey]);
						}

						buildDirective();
						selected = true;
					});
				} else {
					$scope.optionsEditor.setValue(localStorage[optionsKey]);
					$scope.markupEditor.setValue(localStorage[markupKey]);

					buildDirective();
					selected = true;
				}
			};

			$scope.toggleEditorSize = function () {
				$scope.smallEditors = !$scope.smallEditors;
				$scope.editorsSize = $scope.smallEditors ? 'glyphicon-resize-full' : 'glyphicon-resize-small';
				$scope.editorsCol = $scope.smallEditors ? 'col-md-1' : 'col-md-6';
				$scope.outputCol = $scope.smallEditors ? 'col-md-11' : 'col-md-6';
			};

			function buildDirective () {
				var options = $scope.optionsEditor.getValue();
				var markup = $scope.markupEditor.getValue();

				try {
					eval(options);
				} catch (ex) {
					console.log('options syntax is incorrect');
					return;
				}

				var src = $compile(markup)($scope);
				var	dst = angular.element(document.getElementById('sandbox-output'));

				dst.empty();
				dst.append(src);
			}

			function init() {
				var module = angular.module('bossy');

				$scope.directives = {};

				angular.forEach(module.requires, function (directive) {
					$scope.directives[directive.split('.')[1]] = {
						active: false
					};
				});
			}

			init();
		}
	])

	//.controller('DirectiveCtrl', ['$scope', '$compile', 'name',
	//	function ($scope, $compile, name) {
	//		var markupLoaded = false,
	//			optionsLoaded = false,
	//			markupKey = 'markup-' + name,
	//			markupStorage = localStorage[markupKey],
	//			optionsKey = 'options-' + name,
	//			optionsStorage = localStorage[optionsKey];
	//
	//		$scope.markupEditorOptions = {
	//			useWrapMode : true,
	//			theme:'twilight',
	//			mode: 'html',
	//			onLoad: markupEditorLoaded,
	//			onChange: markupEditorChanged
	//		};
	//
	//		$scope.optionsEditorOptions = {
	//			useWrapMode : true,
	//			theme:'twilight',
	//			mode: 'javascript',
	//			onLoad: optionsEditorLoaded,
	//			onChange: optionsEditorChanged
	//		};
	//
	//		function markupEditorLoaded (markupEditor) {
	//			$scope.markupEditor = markupEditor;
	//			$scope.markupEditor.setValue(markupStorage);
	//		}
	//
	//		function markupEditorChanged () {
	//			if (markupLoaded) {
	//				markupStorage = $scope.markupEditor.getValue();
	//				localStorage[markupKey] = markupStorage;
	//				buildDirective(optionsStorage, markupStorage);
	//			} else {
	//				markupLoaded = true;
	//			}
	//		}
	//
	//		function optionsEditorLoaded (optionsEditor) {
	//			$scope.optionsEditor = optionsEditor;
	//			$scope.optionsEditor.setValue(optionsStorage);
	//		}
	//
	//		function optionsEditorChanged () {
	//			if (optionsLoaded) {
	//				optionsStorage = $scope.optionsEditor.getValue();
	//				localStorage[optionsKey] = optionsStorage;
	//				buildDirective(optionsStorage, markupStorage);
	//			} else {
	//				optionsLoaded = true;
	//			}
	//		}
	//
	//		function buildDirective (options, markup) {
	//			try {
	//				eval(options);
	//			} catch (ex) {
	//				console.log('options syntax is incorrect');
	//				return;
	//			}
	//
	//			var src = $compile(markup)($scope),
	//				dst = angular.element(document.getElementById('preview'));
	//
	//			dst.empty();
	//			dst.append(src);
	//		}
	//
	//		function init () {
	//			if (!optionsStorage) {
	//				optionsStorage = '$scope.directiveData = {\n};\n\n$scope.directiveOptions = {\n};';
	//			}
	//			if (!markupStorage) {
	//				markupStorage = '<bossy-' + name + ' data="directiveData" options="directiveOptions"></bossy-' + name + '>';
	//			}
	//
	//			buildDirective(optionsStorage, markupStorage);
	//		}
	//
	//		init();
	//	}
	//])
;
