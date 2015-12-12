/**
 * @param {param} config
 * @param {string} [config.list=["apples", "oranges", "bananas"]] - Array of list items to choose from.
 * @param {string} [config.title="title"] - Title.
 * @param {string} [config.placeholder="filter list"] - Filter text.
 */
function Combobox() {
	var template = '' +
		//	'<h1>{{inFocus}}</h1>' +
		'<div class="combo-box" ng-class="{\'open\': inFocus}" ng-blur="inFocus = false">' +
		'<label for="combo-input" class="input-label">{{title}}</label>' +
		'<input id="combo-input" type="text" ng-keypress="changed($event)" placeholder="{{placeholder}}" ng-focus="inFocus = true" ng-model="inputField">' +
		'<div class="inputs">' +
		'<label class="pill" ng-repeat="item in selectedItems | orderBy: sortFunction" ng-click="deleteSelection(item)">{{item}}<span class="close">&times;</span></label>' +
		'</div>' +
		'<div class="list" ng-show="inFocus">' +
		'<ul>' +
		'<li ng-repeat="item in list | orderBy: sortFunction"><a href="#!" title="{{item}}" ng-click="addSelection(item)">{{item}}</a></li>' +
		'</ul>' +
		'</div>' +
		'</div>';

	//ng-class="{\'is-active\': inFocus}">' +

	function ComboboxController($scope) {
		$scope.list = $scope.config.list;
		$scope.title = $scope.config.title;
		$scope.placeholder = $scope.config.placeholder;
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
	}

	return {
		restrict: 'AE',
		scope: {
			config: '='
		},
		template: template,
		controller: ComboboxController
	};
}

Combobox.$inject = [];

angular.module('bossy.combobox',[])
	.directive('bossyCombobox', Combobox);

