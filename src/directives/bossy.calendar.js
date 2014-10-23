angular.module('bossy.calendar', [])
	.controller('CalendarController', ['$scope', function ($scope) {

		var _monthMaps = {},
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

		function _getMonth() {
			return $scope.months[$scope.currentDate.getMonth()];
		}

		function _getDay() {
			return $scope.days[$scope.currentDate.getDay()];
		}

		$scope.getDateMap = function() {
			if (_monthMaps[$scope.month]) {
				return _monthMaps[$scope.month];
			}
			var daysBack = $scope.date + ($scope.date % 7),
				firstWeekDay = new Date($scope.currentDate.getTime() - (daysBack * universal.DAY)),
				dateMap = [],
				isMonthComplete = false;

			while (!isMonthComplete) {
				var week = [];
				if (dateMap.length === 5) {
					isMonthComplete = true;
				}
				for (var weekDay = 0; weekDay < 7; weekDay++) {
					var _thisDate = (new Date(firstWeekDay.getTime() + (weekDay * universal.DAY)));
					week.push({
						date: _thisDate.getDate(),
						bold: _thisDate.getMonth() === $scope.currentDate.getMonth()
					});
				}
				firstWeekDay = new Date(firstWeekDay.getTime() + (7 * universal.DAY));
				dateMap.push(week);
			}
			_monthMaps[$scope.month] = dateMap;
			return dateMap;
		};

		$scope.currentDate = new Date();

		$scope.year = $scope.currentDate.getFullYear();
		$scope.month = _getMonth();
		$scope.day = _getDay();
		$scope.date = $scope.currentDate.getDate();

	}]).directive('bossyCalendar', ['$compile', function ($compile) {
		return {
			restrict: 'AE',
			link: function(scope, element, attributes) {
				var template = '<table><tr><td colspan="7">{{month}} {{year}}</td></tr><td ng-repeat="day in days" title="{{day}}">{{day | limitTo : 2}}</td><tr ng-repeat="week in getDateMap()"><td ng-repeat="current in week"><b ng-if="current.bold">{{current.date}}</b><span ng-if="!current.bold">{{current.date}}</span></td></tr><tr><td colspan="7">{{day}}, {{month}} {{date}}, {{year}}</td></tr></table>';

				element.html(template);
				$compile(element.contents())(scope);
			},
			controller: 'CalendarController'
		};
	}]);