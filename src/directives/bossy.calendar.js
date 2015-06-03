function CalendarController($scope) {

	var _monthMaps = {},
		options = {},
		defaults = {},
		universal = {
			DAY: 24 * 60 * 60 * 1000,
			HOUR: 60 * 60 * 1000
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

	$scope.previousMonth = function() {
		var date = new Date($scope.current.year, ($scope.current.month - 1), 1);
		setCurrentMonthAndYear(date.getMonth(), date.getFullYear());
		$scope.updateDateMap();
	};

	$scope.nextMonth = function() {
		var date = new Date($scope.current.year, ($scope.current.month + 1), 1);
		setCurrentMonthAndYear(date.getMonth(), date.getFullYear());
		$scope.updateDateMap();
	};

	$scope.selectDate = function(time) {
		var date = getStandardTime(new Date(time));
		if (dayIsOutOfRange(date)) {
			return;
		}
		if (date.month !== $scope.current.month) {
			setCurrentMonthAndYear(date.month, date.year);
			$scope.updateDateMap();
		}
		setSelectedDate(new Date(time));
	};

	$scope.updateDateMap = function() {
		var rawCurrentDay = ($scope.current.raw.getDay() * universal.DAY),
			firstWeekDay = new Date($scope.current.time - rawCurrentDay),
			isMonthComplete = false;

		$scope.dateMap = [];

		while (!isMonthComplete) {
			var week = [];
			if ($scope.dateMap.length === 5) {
				isMonthComplete = true;
			}
			for (var weekDay = 0; weekDay < 7; weekDay++) {
				var rawThisDate = firstWeekDay.getTime() + (weekDay * universal.DAY),
					thisDate = (new Date(rawThisDate));
				// fix for DST oddness
				if (thisDate.getHours() === 23) {
					thisDate = (new Date(thisDate.getTime() + universal.HOUR));
				} else if (thisDate.getHours() === 1) {
					thisDate = (new Date(thisDate.getTime() - universal.HOUR));
				}
				var date = getStandardTime(thisDate);
				date.dayInMonth = thisDate.getMonth() === $scope.current.raw.getMonth() ? 'day-in-month' : '';
				date.disabledDay = dayIsOutOfRange(date) ? 'disabled-day' : '';
				week.push(date);
			}
			firstWeekDay = new Date(firstWeekDay.getTime() + (7 * universal.DAY));
			$scope.dateMap.push(week);
		}
	};

	function getStandardTime(date) {
		return {
			raw: date,
			year: date.getFullYear(),
			monthName: getMonthName(date.getMonth()),
			month: date.getMonth(),
			day: getDayName(date),
			date: date.getDate(),
			time: date.getTime()
		};
	}

	function getTimeObjectIfDate(date) {
		if (angular.isDate(new Date(date))) {
			return getStandardTime(new Date(date));
		}
		return false;
	}

	function setConfigOptions() {
		$scope.config = $scope.config || {};
		$scope.config.start = getTimeObjectIfDate($scope.config.start);
		$scope.config.end = getTimeObjectIfDate($scope.config.end);
		options = angular.extend({}, defaults, $scope.config);
	}

	function dayIsOutOfRange(_date) {
		var hasRange = options.start && options.end;
		if (hasRange && (_date.time < options.start.time || _date.time > options.end.time)) {
			return true;
		} else if (options.start && _date.time < options.start.time) {
			return true;
		} else if (options.end && _date.time > options.end.time) {
			return true;
		}
	}

	function setSelectedDate(date) {
		$scope.selected = getStandardTime(date);
		$scope.ngModel = $scope.selected.raw;
	}

	function setCurrentMonthAndYear(month, year) {
		var date = new Date(year !== undefined ? year : $scope.selected.year, month !== undefined ? month : $scope.selected.month, 1);
		$scope.current = getStandardTime(date);
	}

	function getMonthName(month) {
		return $scope.months[month];
	}

	function getDayName(date) {
		return $scope.days[date.getDay()];
	}

	function initialize() {
		setConfigOptions();
		setSelectedDate($scope.ngModel || new Date());
		setCurrentMonthAndYear();
		$scope.updateDateMap();
	}

	initialize();
}

function Calendar() {

	var template =
		'<table>' +
			'<tr>' +
				'<td ng-click="previousMonth()" title="Previous month" class="p">&lt;</td>' +
				'<td colspan="5">{{current.monthName}} {{current.year}}</td>' +
				'<td ng-click="nextMonth()" title="Next month" class="p">&gt;</td>' +
			'</tr>' +
			'<tr>' +
				'<td ng-repeat="day in days" title="{{day}}">{{day | limitTo : 2}}</td>' +
			'</tr>' +
			'<tr ng-repeat="week in dateMap">' +
				'<td ng-repeat="current in week" ng-click="selectDate(current.time)" class="{{current.dayInMonth}} {{current.disabledDay}} p">' +
					'{{current.date}}' +
				'</td>' +
			'</tr>' +
			'<tr>' +
				'<td colspan="7">{{selected.day}}, {{selected.monthName}} {{selected.date}}, {{selected.year}}</td>' +
			'</tr>' +
		'</table>';



	return {
		restrict: 'AE',
		scope: {
			config: '='
		},
		template: template,
		controller: CalendarController
	};
}

Calendar.$inject = [];


CalendarController.$inject = ['$scope'];

angular.module('bossy.calendar', [])
	.controller('bossyCalendarController', CalendarController)
    .directive('bossyCalendar', Calendar);