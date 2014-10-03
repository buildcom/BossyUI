angular.module('demoApp', [
    'ui.router',
    'demoApp.controllers',
    'bossy'
])

    .config(function($stateProvider, $urlRouterProvider, $locationProvider) {

        $locationProvider.html5Mode(true);

        $stateProvider
            .state('home', {
                url: '/',
                templateUrl: '../../templates/home.html',
                controller: 'HomeCtrl'
            })
            .state('demos', {
                abstract: true,
                url: '/demos',
                template: '<ui-view></ui-view>'
            })
            .state('demos.matrix', {
                url: '/matrix',
                templateUrl: '../../templates/demos.matrix.html',
                controller: 'MatrixCtrl'
            });

        $urlRouterProvider.otherwise('/');
    })

    .run(['$location', function($location) { 
        
        console.log($location);
        
    }])

;
