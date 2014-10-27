angular.module('bossy.calendar', [])
	.controller('CalendarController', ['$scope', '$filter', function ($scope, $filter) {

		var _monthMaps = {},
			initDate = new Date(),
			universal = {
				DAY: 24 * 60 * 60 * 1000
			};

		$scope.days = [
			'Sunday',
			'Monday',
			'Tuesday',
			'Wednesday',
			'Thursday',
			'Friday',
			'Saturday'
		];
		$scope.months = [
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

		function _getTimeObject(date) {
			return {
				full: date,
				year: date.getFullYear(),
				monthName: _getMonthName(date.getMonth()),
				month: date.getMonth(),
				day: _getDay(date),
				date: date.getDate(),
				time: date.getTime()
			};
		}

		function _setSelectedDate(date) {
			$scope.selected = _getTimeObject(date);
		}

		function _setCurrentMonthAndYear(month, year) {
			var date = new Date(year !== undefined ? year : $scope.selected.year, month !== undefined ? month : $scope.selected.month, 1);
			$scope.current = _getTimeObject(date);
		}

		function _getMonthName(month) {
			return $scope.months[month];
		}

		function _getDay(date) {
			return $scope.days[date.getDay()];
		}

		$scope.previousMonth = function() {
			var date = new Date($scope.current.year, ($scope.current.month - 1), 1);
			_setCurrentMonthAndYear(date.getMonth(), date.getFullYear());
			$scope.updateDateMap();
		};

		$scope.nextMonth = function() {
			var date = new Date($scope.current.year, ($scope.current.month + 1), 1);
			_setCurrentMonthAndYear(date.getMonth(), date.getFullYear());
			$scope.updateDateMap();
		};

		$scope.selectDate = function(date) {};

		$scope.updateDateMap = function() {
			var firstWeekDay = new Date($scope.current.time - ($scope.current.full.getDay() * universal.DAY)),
				isMonthComplete = false;
				$scope.dateMap = [];

			while (!isMonthComplete) {
				var week = [];
				if ($scope.dateMap.length === 5) {
					isMonthComplete = true;
				}
				for (var weekDay = 0; weekDay < 7; weekDay++) {
					var _thisDate = (new Date(firstWeekDay.getTime() + (weekDay * universal.DAY)));
					week.push({
						date: _thisDate.getDate(),
						bold: _thisDate.getMonth() === $scope.current.full.getMonth()
					});
				}
				firstWeekDay = new Date(firstWeekDay.getTime() + (7 * universal.DAY));
				$scope.dateMap.push(week);
			}
		};

		// init to current date
		_setSelectedDate(initDate);
		_setCurrentMonthAndYear();
		$scope.updateDateMap();

	}]).directive('bossyCalendar', [function () {
		return {
			restrict: 'AE',
			template: '<table><tr><td ng-click="previousMonth()">&lt;</td><td colspan="5">{{current.monthName}} {{current.year}}</td><td ng-click="nextMonth()">&gt;</td></tr><td ng-repeat="day in days" title="{{day}}">{{day | limitTo : 2}}</td><tr ng-repeat="week in dateMap"><td ng-repeat="current in week" ng-click="selectDate(current.date)"><b ng-if="current.bold">{{current.date}}</b><span ng-if="!current.bold">{{current.date}}</span></td></tr><tr><td colspan="7">{{selected.day}}, {{selected.monthName}} {{selected.date}}, {{selected.year}}</td></tr></table>',
			controller: 'CalendarController'
		};
	}]);