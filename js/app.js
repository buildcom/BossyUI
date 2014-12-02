var myApp = angular.module( 'bossyui', [
	'ngRoute',
	'ui.router',
	'bossyui.controllers'
	])


// configuring our routes 
// =============================================================================
.config(function($stateProvider, $urlRouterProvider) {
	
	$stateProvider
	
		// route to show our basic form (/form)
	.state('home', {
		url: '/',
		templateUrl: '/pages/home.html',
		controller: 'homeCtrl'
	})

	.state('getting_started', {
		url: '/getting_started',
		templateUrl: '/pages/getting_started.html',
		controller: 'homeCtrl'
	})

	// .state('components', {
	// 	url: '/components',
	// 	templateUrl: '/pages/components.html',
	// 	controller: 'homeCtrl'
	// })

	// .state('components', {
	// 	url: '/components',
	// 	templateUrl: '/pages/components.html',
	// 	controller: 'homeCtrl'
	// })

	.state('components',{
		url: '/components/:component',
		controller: 'homeCtrl',
		templateUrl: function ($stateParams){
			if($stateParams.component) {
				return '/pages/components/' + $stateParams.component + '.html';
			} else {
				return '/pages/components.html'
			}
  	}
	})

	.state('about', {
		url: '/about',
		templateUrl: '/pages/about.html',
		controller: 'homeCtrl'
	})
	$urlRouterProvider.otherwise('/');
});