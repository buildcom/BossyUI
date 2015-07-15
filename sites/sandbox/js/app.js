angular.module('SandboxApp', [
	'ui.router',
	'bossy',
	'btford.markdown'
])

.config(['$stateProvider',
	function($stateProvider) {
		var module = angular.module('bossy');

		angular.forEach(module.requires, function(directive) {
			var name = directive.split('.')[1];
			$stateProvider
				.state(name, {

					url: '/' + name,
					views: {
						'results': {
							templateUrl: function() {
								return '/docs/bossy.' + name + '.html';
							}
						},
						'docs': {
							template: function() {
								return '<div btf-markdown ng-include="\'/markdown/bossy.' + name + '.md\'"></div>';
							}
						}
					}
				});
		});
	}
])
.controller('DemoCtrl', ['$scope', '$document', '$window', '$compile',
	function($scope, $document, $window, $compile) {
		var module = angular.module('bossy');

		$scope.directives = [];
		$scope.directiveConfig = {};

		// Setup directive Configurations
		//
		$scope.inputconfig = $scope.basicInputConfig = {
			title: 'Postfix Input with text',
			placeholder: 'Text only',
			templateType: 'postfix',
			postfixText: '.bossyui.com'
		};

		$scope.basicPrefixInputConfig = {
			title: 'Prefix Input with text',
			placeholder: 'Text only',
			templateType: 'prefix',
			prefixText: '@'
		};

		$scope.numberInputConfig = {
			title: 'Input with number',
			type: 'number',
			placeholder: 'Numbers only'
		};
		angular.forEach(module.requires, function(directive) {
			$scope.directives.push(directive.split('.')[1]);
		});
	}
]);
