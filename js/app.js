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
		templateUrl: '/BossyUI/pages/home.html',
		controller: 'homeCtrl'
	})

	.state('getting_started', {
		url: '/getting_started',
		templateUrl: '/BossyUI/pages/getting_started.html',
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
				return '/BossyUI/pages/components/' + $stateParams.component + '.html';
			} else {
				return '/BossyUI/pages/components.html'
			}
  	}
	})

	.state('about', {
		url: '/about',
		templateUrl: '/BossyUI/pages/about.html',
		controller: 'homeCtrl'
	})
	$urlRouterProvider.otherwise('/');
});