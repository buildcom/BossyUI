function ComboboxController($scope) {
	$scope.list = $scope.config.list;
	$scope.title = $scope.config.title;
	$scope.inputText = $scope.config.inputText;
	$scope.sort = $scope.config.sort;
	$scope.multi = $scope.config.multi;
	$scope.selectedItems = [];

	// Remove item from the list of selected items and place it back in the dropbox
	$scope.deleteSelection = function(item) {
		var index = $scope.selectedItems.indexOf(item);
		$scope.selectedItems.splice(index, 1);
	};

	// Add selected item to selection list and remove it from the dropdown box
	$scope.addSelection = function(item) {
		if($scope.multi == false) {
			$scope.selectedItems = [];
		}
		if ($scope.selectedItems.indexOf(item) == -1) {
			$scope.selectedItems.push(item);
		}
	};

	//sorts ComboBox elements
	$scope.sortFunction = function(sortByName) {
		if($scope.sort == true) {
			return sortByName;
		}
	};

	/*$scope.initialize = function() {
		if(!$scope.multi) {
			$scope.multi = true;
		}
	};*/

	$scope.changed = function(event) {
		console.log('keypress',event.keyCode);
	};

	$scope.$watch('inputField', function(newValue, oldValue){
		console.log('watch',newValue);
	});

	//$scope.initialize();
}

/**
 * @param {param} config
 * @param {string} [config.list=["apples", "oranges", "bananas"]] - Array of list items to choose from.
 * @param {string} config.title - Title.
 */
function Combobox(){
	var template = '' +
		'<div class="combo-box" ng-class="{\'open\': inFocus}" ng-blur="inFocus = false">' +
			'<label for="combo-input" class="input-label">{{title}}</label>' +
			'<input id="combo-input" type="text" ng-keypress="changed($event)" placeholder="{{inputText}}" ng-focus="inFocus = true" ng-model="inputField">' +
			'<div class="inputs">' +
				'<label class="pill" ng-repeat="item in selectedItems | orderBy: sortFunction" ng-click="deleteSelection(item)" ng-show={{multi}}>{{item}}<span class="close">&times;</span></label>' +
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
			config: '=',
			options: '='
		},
		template: template,
		controller: ComboboxController
	};
}

angular.module('bossy.combobox',[])
	.directive('bossyCombobox', Combobox);

