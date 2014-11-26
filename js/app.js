var myApp = angular.module( 'bossyui', [
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
	$urlRouterProvider.otherwise('/');
});