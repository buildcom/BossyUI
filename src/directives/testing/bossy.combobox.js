function testContoller($scope){
    	$scope.elements = $scope.data.elements;
}

function create(){
	var template = 	'{{elements}}'+
					'<br>'+
					'<div><input type="text" data-ng-model="name"/></div>'+
					'<select>'+
						'<option data-ng-repeat="element in elements| filter:name">{{element}}</option>'+
					'</select>'+
					'<div data-ng-repeat="x in elements| filter:name">{{x}}</div>';

  return {

    restrict: 'E',
    
    scope: {
    	data: '='
    },
    template: template,
    controller: testContoller,
    
  };
}

create.$inject = [];

testContoller.$inject = ['$scope'];

angular.module('test',[])
		.controller('init', testContoller)
		.directive('director', create);
		

