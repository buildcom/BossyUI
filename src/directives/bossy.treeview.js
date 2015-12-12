/**
 * @param {param} config
 * @param {string} [config.data={ "nodes": [{"node": { "value": "folder", "nodes": [{"node": { "value": "folder2", "nodes": [ { "item": { "value": "file3"}}]}} , { "item": { "value": "file4"}}]}}]}] - Sample tree data.
 */
function Treeview ($compile) {

	var template = '' +
		'<ul ng-if="contents.nodes">' +
		'<li ng-repeat="node in contents.nodes" >' +
		'<span ng-if="node.node">' +
		'<div class="nodeIcon collapsed" ng-click="nodeClicked($event, $index)" ' +
		'ng-class="showChildren($index) ? \'expanded\' : \'collapsed\'"> ' +
		'{{node.node.value}}' +
		'</div>' +
		'<bossy-treeview ng-show="showChildren($index)" data="node.node"></bossy-treeview>' +
		'</span>' +
		'<span ng-if="node.item">' +
		'<div class="fileIcon"ng-click="itemClicked($event, $index)">' +
		'{{node.item.value}}' + '<div class="content-type- {{node.item.type}}">' +
		'<span ng-if="node.item.type">' + '{{node.item.type}}' +
		'</span>' + '</div>' +
		'</div>' +
		'</span>' +
		'</li>' +
		'</ul>';

	return {
		restrict: 'AE',
		scope: {
			config: '=',
			data: '='
		},
		controller: TreeviewController,
		link: function (scope, elem, attr) {
			elem.append(($compile(template))(scope));
		}
	};
}

Treeview.$inject = ['$compile'];

function TreeviewController ($scope, $rootScope) {

	if ($scope.config && $scope.config.data) {
		$scope.data = $scope.config.data;
	}

	$scope.contents = {
		showingChildren: [],
		nodes: $scope.data.nodes
	};

	$scope.nodeClicked = function ($event, $index) {

		var indexInArr = $scope.contents.showingChildren.indexOf($index);
		(indexInArr > -1) ?
			$scope.contents.showingChildren.splice(indexInArr, 1) :
			$scope.contents.showingChildren.push($index);
		$scope.changeSelection($event);
	};

	$scope.itemClicked = function ($event, $index) {
		$scope.changeSelection($event);
	};

	$scope.showChildren = function ($index) {
		if ($scope.contents.showingChildren.indexOf($index) > -1) {
			return true;
		}
		return false;
	};

	$scope.changeSelection = function ($event) {
		if (!angular.isUndefined($rootScope.curSelectedTV)) {
			$rootScope.curSelectedTV.toggleClass('selected');
		}
		$rootScope.curSelectedTV = angular.element($event.target);
		$rootScope.curSelectedTV.toggleClass('selected');
	};
}

TreeviewController.$inject = ['$scope', '$rootScope'];

angular.module('bossy.treeview', ['bossy.filters'])
	.controller('bossyTreeviewController', TreeviewController)
	.directive('bossyTreeview', Treeview);
