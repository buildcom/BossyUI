angular.module('app.directive.bossy.input', [])
    .run(function($templateCache){
        $templateCache.put('bossy-input.html', 
        	'<div ng-controller="bossyInputController" class="form-group bossy-input"><label for="">{{title}}</label><input ng-model="value" ng-change="onChange(value)" type="{{type}}" class="form-control" placeholder="" value="{{value}}"/><span></span></div>');
    })
    .controller('bossyInputController',['$scope', function($scope){
    	$scope.onChange = function(elemValue){
    		//console.log("changed value",elemValue);
    		// Add additional event handling and error handling.
    	};
    }])
    .directive('bossyInput', function ($compile, $http, $schema, $data, $templateCache) {
    	return {
			restrict: "E",
			require: 'ngModel',
			scope: {
				title: "=",
				value: "=",
				type: "="
			},
			template: $templateCache.get('bossy-input.html')
		};
    });