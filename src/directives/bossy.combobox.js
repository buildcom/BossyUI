function testContoller($scope){
    	$scope.elements = $scope.data.elements;

    	$scope.list = $scope.elements.slice();

    	//$scope.list = [{city: 'Chico', state: 'CA'}, {city: 'LA', state: 'CA'}, {city: 'Atlanta', state: 'GA'}];
    	
    	$scope.selectedElements = [];
    	
        // Remove item from the list of selected items and place it back in the dropbox
    	$scope.removeSelection = function(element) 
    	{
    		$scope.list.push(element);

    		var index = $scope.selectedElements.indexOf(element);
    		$scope.selectedElements.splice(index, 1);
    	}

        // Reset the selections and dropdown options back to default
    	$scope.resetSelections = function()
    	{
    		$scope.selectedElements = [];
    		$scope.list = $scope.elements.slice();
    	}

        // Add selected item to selection list and remove it from the dropdown box
    	$scope.newSelection = function()
    	{
    		if($scope.selectedElements.indexOf($scope.selectedItem) == -1)
    		{
    			$scope.selectedElements.push($scope.selectedItem);

    			var index = $scope.list.indexOf($scope.selectedItem);
    			$scope.list.splice(index, 1);
    		}
    	}
}

function create(){
	var template = 	'<br>'+
					'<div><input type="text" data-ng-model="name"/></div>'+
					'<select ng-model="selectedItem" ng-options="item.city group by item.state for item in list | filter:name | orderBy:state" ng-change="newSelection()">'+
					'</select>'+
					'<ul>'+
						'<li data-ng-repeat="element in selectedElements">{{element.city}} <button ng-click="removeSelection(element)">x</button> </li>'+
					'</ul>'
					'<button ng-click="resetSelections()">reset</button>';
					//'<div data-ng-repeat="x in elements| filter:name">{{x}}</div>';

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
		