angular.module('demoApp', [
    'ui.router',
    'demoApp.controllers',
    'bossy'
])

    .config(function($stateProvider, $urlRouterProvider) {

        $stateProvider
            .state('home', {
                url: '/',
                templateUrl: 'demo/templates/home.html',
                controller: 'HomeCtrl'
            })
            .state('demos', {
                abstract: true,
                url: '/demos',
                template: '<ui-view></ui-view>'
            })
            .state('demos.matrix', {
                url: '/matrix',
                templateUrl: 'demo/templates/demos.matrix.html',
                controller: 'MatrixCtrl'
            });

        $urlRouterProvider.otherwise('/');
    })

    .run(['$location', function() { }])

;