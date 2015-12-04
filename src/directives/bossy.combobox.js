
function ComboboxController($scope){
	$scope.list = $scope.config.list;
	$scope.selectedItems = [];

	// Remove item from the list of selected items and place it back in the dropbox
	$scope.deleteSelection = function(item) {
		var index = $scope.selectedItems.indexOf(item);
		$scope.selectedItems.splice(index, 1);
	};

	// Add selected item to selection list and remove it from the dropdown box
	$scope.addSelection = function(item) {
		if ($scope.selectedItems.indexOf(item) == -1) {
			$scope.selectedItems.push(item);
		}
	};
}

function Combobox(){
	var template = '' +
		'<div class="combo-box" ng-class="{\'open\': inFocus}" ng-blur="inFocus = false">' +
			'<label for="combo-input" class="input-label">Profession</label>' +
			'<input id="combo-input" type="text" placeholder="- Select -" ng-focus="inFocus = true">' +
			'<div class="inputs">' +
				'<label class="pill" ng-repeat="item in selectedItems">{{item}}<span class="close" ng-click="deleteSelection(item)">&times;</span></label>' +
			'</div>' +

			'<div class="lists" ng-class="{\'is-active\': inFocus}">' +
				'<ul>' +
					'<li class="title">Awesome Jobs</li>' +
					'<li ng-repeat="item in list"><a href="#!" title="{{item}}" ng-click="addSelection(item)">{{item}}</a></li>' +
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

