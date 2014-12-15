angular.module('bossy.datagrid', [])
	.controller('DataGridController', ['$scope', function($scope){
		$scope.data = {
			columns: [
				{
					type: 'number',
					title: 'Number Column'
				},
				{
					type: 'string',
					title: 'Alphabetic Column'
				},
				{
					type: 'money',
					title: 'Money Column'
				}
			],
			rows: [
				[1, 'b', '$2.00'],
				[2, 'c', '$1.00'],
				[3, 'a', '$1.50'],
				[4, 'C', '$10.50'],
				[5, 'B', '$12.00'],
				[6, 'A', '$11.00']
			]
		};

		var numberCompare = function(a, b) {
			var result = 0;
			if (a < b) {
				result = -1;
			} else if (a > b) {
				result = 1;
			}
			return result;
		};

		var stringCompare = function(a, b) {
			// toLowerCase needed to support all browsers
			return a.toLowerCase().localeCompare(b.toLowerCase());
		};

		var formattedNumberCompare = function(a, b) {
			// strip non-numeric characters, and convert to number with unary plus
			a = +a.replace(/[^\d.-]/gi, '');
			b = +b.replace(/[^\d.-]/gi, '');
			return numberCompare(a, b);
		};

		var columnCompare = function(a, b, columnIndex){
			var columnType = $scope.data.columns[columnIndex].type,
				result = 0;
			if (columnType === 'number') {
				result = numberCompare(a[columnIndex], b[columnIndex]);
			} else if (columnType === 'string') {
				result = stringCompare(a[columnIndex], b[columnIndex]);
			} else if (columnType === 'money') {
				result = formattedNumberCompare(a[columnIndex], b[columnIndex]);
			}
			return result;
		};

		var calculateSortdirection = function(columnIndex){
			// 1 = asc or  -1 = desc
			if ($scope.data.columns[columnIndex].sortDirection) {
				$scope.data.columns[columnIndex].sortDirection = -$scope.data.columns[columnIndex].sortDirection;
			} else {
				$scope.data.columns[columnIndex].sortDirection = 1;
			}

			return $scope.data.columns[columnIndex].sortDirection;
		};

		$scope.sortColumn = function(columnIndex) {
			var sortDirection = calculateSortdirection(columnIndex);

			$scope.data.rows = $scope.data.rows.sort(function(a, b){
				return sortDirection * columnCompare(a, b, columnIndex);
			});
		};
	}])
	.directive('bossyDatagrid', [function()
	{
		return {
			restrict: 'EA',
			templateUrl: 'bossy.datagrid.html',
			controller: 'DataGridController'
		};
	}]);
