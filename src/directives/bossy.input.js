angular.module('app.directive.bossy.input', [])
    .run(function($templateCache){
        $templateCache.put('bossy-input.html', '<div class="form-group bossy-input"><label for="">{{title}}</label><input type="text" class="form-control" placeholder="" value="{{value}}"/><span></span></div>');
    })
    .directive('bossyInput', function ($compile, $http, $schema, $data, $templateCache) {
    	return {
			restrict: "E",
			replace: true,
			scope: {
				title: "=",
				value: "="
			},
			template: $templateCache.get('bossy-input.html')

		};
    });