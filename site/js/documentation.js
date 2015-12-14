angular.module('BossyUIApp', [
	'bossy',
	'autocomplete',
	'navigation',
	'tooltip'
])
	.run([function(){}])

	.controller('DocumentationCtrl', [
		'$scope',
		'$templateCache',
		function ($scope, $templateCache) {

			$scope.selectDirective = function (directive) {
				angular.forEach($scope.directives, function(value, key) {
					$scope.directives[key].active = false;
				});

				$scope.directives[directive].active = !$scope.directives[directive].active;
				$scope.selectedTemplate = $templateCache.get(directive + '.html');
			};

			function init() {
				var module = angular.module('bossy');

				$scope.directives = {};

				angular.forEach(module.requires, function (directive) {
					var name = directive.split('.')[1];

					$scope.directives[name] = {
						active: false
					};

					$templateCache.put(name + '.html', 'templates/' + name + '.html');
				});
			}

			init();
		}
	])
;
