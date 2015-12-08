function ComboboxController($scope){
	$scope.list = $scope.config.list;
	$scope.selectedItems = [];

	$scope.title = $scope.config.title;
	$scope.inputText = $scope.config.inputText;
	$scope.sort = $scope.config.sort;
	$scope.multi = $scope.config.multi;

	// Remove item from the list of selected items and place it back in the dropbox
	$scope.deleteSelection = function(item) {
			var index = $scope.selectedItems.indexOf(item);
			$scope.selectedItems.splice(index, 1);
	};

	// Add selected item to selection list and remove it from the dropdown box
	$scope.addSelection = function(item) {
		if($scope.multi == false)
		{
			$scope.selectedItems = [];
		}
		if ($scope.selectedItems.indexOf(item) == -1) {
			$scope.selectedItems.push(item);
		}
	};

	//OPTIONS
	//sorts ComboBox elements
	$scope.sortFunction = function(x) {
		if($scope.sort == true)
		{
			return x;
		}
	};

	function initialize() {
		if($scope.multi!=true)
		{
			$scope.multi = false;
		}
	}

	initialize();
}

function Combobox(){
	var template = '' +'<link rel="stylesheet" href="combobox.css">'+
		'<div class="combo-box" ng-class="{\'open\': inFocus}" ng-blur="inFocus = false">' +
			'<label for="combo-input" class="input-label">{{title}}</label>' +
			'<input id="combo-input" type="text" placeholder="{{inputText}}" ng-focus="inFocus = true" ng-model="inputField">' +
			'<div class="inputs">' +
				'<label class="pill" ng-repeat="item in selectedItems" ng-show={{multi}}>{{item}}<span class="close" ng-click="deleteSelection(item)">&times;</span></label>' +
			'</div>' +
			'<div class="lists" ng-class="{\'is-active\': inFocus}">' +
				'<ul>' +
					'<li ng-repeat="item in list | filter:inputField | orderBy: sortFunction"><a href="#!" title="{{item}}" ng-click="addSelection(item)">{{item}}</a></li>' +
				'</ul>' +
			'</div>' +
		'</div>';

	return {
		restrict: 'AE',
		scope: {
			config: '='
		},
		template: template,
		controller: ComboboxController
	};
}

angular.module('bossy.combobox',[])
	.directive('bossyCombobox', Combobox);

