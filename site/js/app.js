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

	.controller('SandboxCtrl', ['$scope',
		function ($scope) {



			function init() {
				var module = angular.module('bossy');

				$scope.directives = [];

				angular.forEach(module.requires, function (directive) {
					$scope.directives.push(directive.split('.')[1]);
				});
			}

			init();
		}
	])
;
