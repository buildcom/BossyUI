angular.module('demoApp', [
    'demoApp.controllers',
    'bossy'
])

    .config(function($stateProvider, $urlRouterProvider, $locationProvider) {

        $locationProvider.html5Mode(true);

        $stateProvider

            .state('home', {
                url: '',
                templateUrl: 'demo/templates/home.html',
                controller: 'HomeCtrl'
            })
    })

    .run([function() { }])

;