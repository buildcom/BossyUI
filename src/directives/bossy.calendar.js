angular.module('bossy.calendar', [])
	.controller('CalendarController', ['$scope', function ($scope) {

		function _getDay() {
			var days = [
				'Sunday',
				'Monday',
				'Tuesday',
				'Wednesday',
				'Thursday',
				'Friday',
				'Saturday'
			];
			return days[$scope.currentDate.getDay()];
		}

		function _getMonth() {
			var months = [
				'January',
				'February',
				'March',
				'April',
				'May',
				'June',
				'July',
				'August',
				'September',
				'October',
				'November',
				'December'
			];
			return months[$scope.currentDate.getMonth()];
		}

		$scope.currentDate = new Date();

		$scope.year = $scope.currentDate.getFullYear();
		$scope.month = _getMonth();
		$scope.day = _getDay();
		$scope.date = $scope.currentDate.getDate();

	}]).directive('bossyCalendar', function () {
		return {
			restrict: 'AE',
			template: '<table><tr><td colspan="7">{{month}} {{year}}</td></tr><tr><td colspan="7">{{day}}, {{month}} {{date}}, {{year}}</td></tr></table>',
			controller: 'CalendarController'
		};
	});