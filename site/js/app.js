angular.module('BossyUIApp', [
	'ui.router',
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

	.controller('SandboxCtrl',
		['$scope',
		function ($scope) {
			$scope.selectDirective = function (directive) {
				angular.forEach($scope.directives, function(value, key) {
					$scope.directives[key].active = false;
				});

				$scope.directives[directive].active = !$scope.directives[directive].active;
			};

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
;
