function comboboxController($scope){
     $scope.elements = $scope.data.elements;

     $scope.list = $scope.elements.slice();

	 $scope.myVar = true;
	 $scope.toggleItem = function(){
	 };
	 $scope.toggleView = function(){
	 	$scope.myVar = !$scope.myVar;
	 };
	 $scope.getRegistered = function(){
	 };
	 $scope.submitItem = function(){
	 };
}
function combobox(){
	var template = '<br>' +
	 '<head>Combobox Template</head>' +
	  '<hr/>' +
		'<div>' + '<br>' +  '<input type="text" ng-model="name"/>' +
		 '<label ng-repeat="item in list | filter:{registered:false}">{{item.value}}  <input type="checkbox" ng-click="item.registered=true"/>' + 
		 '</label>' + '<button ng-click="toggleView()" >This is an arrow</button>' +
	   		'<p ng-hide="myVar">' +  
	   			'<select>' +  
	   				'<option value="">-- Select --</option>' +
	    			'<option ng-repeat="item in list | filter:{registered:true} | filter:name" ng-click="item.registered=false">{{item.value}}</option>' + 
	   			'</select>' + 
	   		'</p>' +
		'</div>';

	return {
		restrict: 'E',
		scope: {
			data: '='
		},
		template: template,
		controller: comboboxController
	};
}

angular.module('bossy.Combobox',[])
.directive('bossyCombobox', combobox);