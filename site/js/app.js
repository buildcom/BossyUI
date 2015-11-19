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
;
