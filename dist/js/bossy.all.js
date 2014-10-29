/*!
 * bossy.js
 */

/*!
 * http://BossyUI.com/
 *
 * BossyUI - Created with LOVE by Build.com Open Source Consortium
 *
 * Licensed under the MIT license. Please see LICENSE for more information.
 *
 */

//TODO: need layout, labels
var bossy = angular.module('bossy', [
        'bossy.data',
        'bossy.schema',
        'bossy.form',
        'bossy.input'
    ]
);

angular.module('bossy.calendar', [])
	.controller('CalendarController', ['$scope', '$filter', function ($scope, $filter) {

		var _monthMaps = {},
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
			$scope.ngModel = $filter('date')($scope.selected.full, 'EEEE, MMMM d, yyyy');
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

		$scope.selectDate = function(time) {
			var date = _getTimeObject(new Date(time));
			if (date.month !== $scope.current.month) {
				_setCurrentMonthAndYear(date.month, date.year);
				$scope.updateDateMap();
			}
			_setSelectedDate(new Date(time));
		};

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
					// fix for DST oddness
					if (_thisDate.getHours() === 23) {
						_thisDate = (new Date(_thisDate.getTime() + universal.HOUR));
					} else if (_thisDate.getHours() === 1) {
						_thisDate = (new Date(_thisDate.getTime() - universal.HOUR));
					}
					var _date = _getTimeObject(_thisDate);
					_date.bold = _thisDate.getMonth() === $scope.current.full.getMonth();
					week.push(_date);
				}
				firstWeekDay = new Date(firstWeekDay.getTime() + (7 * universal.DAY));
				$scope.dateMap.push(week);
			}
		};

		// init to current date
		_setSelectedDate($scope.ngModel || new Date());
		_setCurrentMonthAndYear();
		$scope.updateDateMap();

	}]).directive('bossyCalendar', [function () {
		return {
			restrict: 'AE',
			scope: {
				ngModel: '='
			},
			template: '<table><tr><td ng-click="previousMonth()">&lt;</td><td colspan="5">{{current.monthName}} {{current.year}}</td><td ng-click="nextMonth()">&gt;</td></tr><td ng-repeat="day in days" title="{{day}}">{{day | limitTo : 2}}</td><tr ng-repeat="week in dateMap"><td ng-repeat="current in week" ng-click="selectDate(current.time)"><b ng-if="current.bold">{{current.date}}</b><span ng-if="!current.bold">{{current.date}}</span></td></tr><tr><td colspan="7">{{selected.day}}, {{selected.monthName}} {{selected.date}}, {{selected.year}}</td></tr></table>',
			controller: 'CalendarController'
		};
	}]);
angular.module('bossy.data', [])
/**
@ngdoc service
@name $data
@requires $q
@requires $http

*/
    .factory('$data', ['$q','$http',function ($q,$http) {

        function _getData (data) {
            if (angular.isString(data)) {
                return _getRemoteData(data);
            }
            else if (angular.isObject(data)) {
                return data;
            }
            else if (angular.isFunction(data)) {
                return _getData( data.call($scope) );
            }
            else {
                //TODO: replace error message with online doc link like ng errors
                console.error('directive.bossyForm: no data url or object given');
            }
        }

        function _getRemoteData(data) {
            var deferred = $q.defer();

            $http.get( data, { responseType: 'json' } )
                .success( function( data ) {
                    if( angular.isObject( data ) ) {
                        deferred.resolve(data);
                    }
                    else {
                        //TODO: replace error message with online doc link like ng errors
                        deferred.reject('directive.bossyForm: GET request to url did not produce data object');
                    }
                })
                .error( function(response_data, status) {
                    //TODO: replace error message with online doc link like ng errors
                    deferred.reject('directive.bossyForm: GET request to url "' + data + '" failed with status "' + status + '"');
                });

            return deferred.promise;
        }

        return {
            /**
            @ngdoc method
            @name getData
            @methodOf $data
            @param {string,object,function} data If data is a string, it will be treated as a url to retrieve data from. If data is an object it will be immediately returned. If data is a function, the function will be called and processed until an object is produced
            @returns {Object} Either a $q promise, a data object or a string.
            */
            getData: _getData
        };
    }])
;

angular.module('bossy.dropdown', [])
	.run(function($templateCache) {
		$templateCache.put('jasmineTest.html', 'jasmineTest.html');
	})
	
	.factory('bossyDropdownFactory', function($http /*$data*/) {
		var promise = $http.get('https://gist.githubusercontent.com/mshafrir/2646763/raw/bfb35f17bc5d5f86ec0f10b80f7b80e823e9197f/states_titlecase.json');
		return promise;
	})
	
	.directive('bossyDropdown', function($compile, $http /*$data,*/ /*$schema*/) {
		return {
			restrict: 'EA',
			replace: true,
			templateUrl: 'bossy.dropdown.html',
			controller: function($scope, bossyDropdownFactory) {
				$scope.contents = [];

				bossyDropdownFactory
					.success(function(data){
						$scope.contents = data;
					})
					.error(function(data) {
						console.log("http.get FAILED");
						$scope.contents = data || "Request failed";
					});
			},
			controllerAs: "drops"		
		};
	})
	
	.controller('bossyDropdownCtrl', function($http, bossyDropdownFactory, $scope /*$data,*/ /*$schema*/) {
		$scope.items = [];
		
		bossyDropdownFactory
			.success(function(data){
				$scope.items = data;
			})
			.error(function(data) {
				console.log("http.get FAILED");
				$scope.items = data || "Request failed";
			})
	})
	
	

angular.module('bossy.form', [])
    .run(function($templateCache){
        $templateCache.put('bossy-input.html', 'templates/bossy-input.html');
    })
    .directive('bossyForm',['$compile','$http','$schema','$data', function ($compile, $http, $schema, $data) {
        var _schema,
            _data,
            _options = {
                showLabels: true,
                header: 'This is header',
                footer: 'This is footer',
                theme: 'green',
                button: 'Save'
            },
            _itemTemplate = {
                number: function () {
                    return '<input type="number"/>';
                },
                text: function (obj, key, is_required) {
                    return '<bossy-input title="\''+obj.title+'\'" type="\''+ obj.input_type +'\'" value="\''+_data.address[key]+'\'"' + ( is_required ? ' required' : '' ) + '></bossy-input>';
                },
                textArea: function () {
                    return '<textarea></textarea>';
                },
                checkbox: function(obj){
                    return '<div class="checkbox"><label><input type="checkbox">'+obj.title+'</label></div>';
                }
            };

        function setData(data) {
            var result = $data.getData(data);
            if( angular.isFunction( result.then ) && angular.isFunction( result.catch ) && angular.isFunction( result.finally ) ) {
                return result;
            } else {
                _data = result;
            }

        }

        function setSchema(schema) {
            _schema = $schema.getSchema(schema);
        }

        function buildTemplate(schemaPart, parentKey, required) {
            var template = '',
                fullKey = '';
            angular.forEach(schemaPart, function(value, key) {
                if (value.type) {
                    console.log(fullKey + ' is '+ value.type);
                    switch (value.type) {
                        case 'object':
                            var required_list = typeof( value.required ) !== 'undefined' ? value.required : null;
                            template += buildTemplate(value.properties, fullKey, required_list );
                            break;
                        case 'array':
                            template += buildTemplate(value.items.properties, fullKey);
                            break;
                        case 'number' || 'integer':
                            template += _itemTemplate.number(value);
                            break;
                        case 'string':
                            var is_required = false;
                            if( required && required.indexOf(key) !== -1 ) {
                                is_required = true;
                            }
                            template += _itemTemplate.text(value, key, is_required);
                            break;
                        case 'boolean':
                            template += _itemTemplate.checkbox(value);
                            break;
                    }
                }
            }, this);
            return template;
        }

        return {
            restrict: 'E',
            replace: true,
            template: '',
            scope: {
                config:'=', //Create scope isolation with bi-directional binding,
                title: '='
            },
            link: function (scope, element, attributes) {
                scope.config.options = angular.extend(_options, scope.config.options);

                var promise = setData(scope.config.data);
                setSchema(scope.config.schema);
                if( promise ) {
                    //todo: set directive to loading state
                    promise.then(
                        function(result) {
                            //todo: set directive to loaded state
                            _data = result;
                            element.html(
                                '<form novalidate class="{{config.options.theme}}">'+
                                '<div class="banner page-header"><h3>{{config.options.header}}</h3></div>'+
                                    buildTemplate(_schema) +
                                    '<button ng-if="config.options.button">{{config.options.button}}</button>' +
                                '<div class="page-footer"><h3>{{config.options.footer}}</h3></div>'+
                                '</form>'
                            );
                            $compile(element.contents())(scope);
                        },
                        function(reason) {
                            //todo: set directive to error state
                        });
                    element.html(
                        '<form novalidate class="{{config.options.theme}}">LOADING...</form>'
                    );
                    $compile(element.contents())(scope);
                }
                else {
                    element.html(
                        '<form novalidate class="{{config.options.theme}}">'+
                        '<div class="banner page-header"><h3>{{config.options.header}}</h3></div>'+
                            buildTemplate(_schema) +
                            '<button ng-if="config.options.button">{{config.options.button}}</button>' +
                        '<div class="page-footer"><h3>{{config.options.footer}}</h3></div>'+
                        '</form>'
                    );
                    $compile(element.contents())(scope);
                }


            }
        };

    }])
;
angular.module('bossy.input', [])
    .run(function($templateCache){
        $templateCache.put('bossy-input.html', '<div class="form-group bossy-input"><label for="">{{title}}</label><input type="{{type}}" class="form-control" placeholder="" value="{{value}}"/><span></span></div>');
    })
    .directive('bossyInput',['$compile','$http','$schema','$data','$templateCache', function ($compile, $http, $schema, $data, $templateCache) {
    	return {
			restrict: 'E',
			replace: true,
			scope: {
				title: '=',
				value: '=',
				type: '=',
				required: '='
			},
			template: $templateCache.get('bossy-input.html')
		};
    }]);

angular.module('bossy.dropdown', [])
    .run(function($templateCache) {
        $templateCache.put('jasmineTest.html', 'jasmineTest.html');
    })
    
    /*.factory('bossyDropdownFactory', ['$http', function($http) {
        return {
            _options: {
                title: 'drop title',
                content: 'pop'
            }
        }
        // $http.get('https://gist.githubusercontent.com/mshafrir/2646763/raw/bfb35f17bc5d5f86ec0f10b80f7b80e823e9197f/states_titlecase.json').success(function(data){
            // _options.content = data;
        // })
    }])*/
    
    .directive('bossyDropdown', function($compile, $data/*, $schema*/) {
        var _data;
        function setData(data) {
            var result = $data.getData(data);
            if( angular.isFunction( result.then ) && angular.isFunction( result.catch ) && angular.isFunction( result.finally ) ) //{
                return result;
            else
                console.log(result);//return result;
            /*} else {
                _data = result;
            }*/
        }
        
        return {
            restrict: 'EA',
            replace: true,
            scope: {
                src: '@',
                placeholder: '='
            },
            template: '',
            //templateUrl: 'bossy.dropdown.html',
            link: function(scope, element, attrs) {
                console.log(element);
                var json = setData(scope.src);
                element.html(
                    '<select>'
                        + '<option ng-repeat="j in json" value="{{j.code}}">{{j.name}}</option>'
                    + '</select>'
                );
                $compile(element.contents())(scope);
            }
            /*controller:['$scope', 'bossyDropdownFactory', function($scope, bossyDropdownFactory) {
                    this._options = {
                    title: bossyDropdownFactory._options.title,
                    content: bossyDropdownFactory._options.content
                };
            }],
            controllerAs: "drops"*/
        };
    });
angular.module('bossy.schema', [])
    .factory('$schema', ['$q', '$http', function ($q, $http) {

        function _getSchema (schema) {
            if (angular.isString(schema)) {
                return _getRemoteSchema(schema);
            }
            else if (angular.isObject(schema)) {
                return schema;
            }
            else {
                //TODO: replace error message with online doc link like ng errors
                console.error('directive.bossyForm: no schema url or object given');
            }
        }

        function _getRemoteSchema(schema) {
            var deferred = $q.defer();

            $http.get( schema )
                .success( function( data ) {
                    if( angular.isObject( data ) ) {
                        deferred.resolve(data);
                    }
                    else {
                        //TODO: replace error message with online doc link like ng errors
                        deferred.reject('directive.bossyForm: GET request to url did not produce schema object');
                    }
                })
                .error( function(data, status) {
                    //TODO: replace error message with online doc link like ng errors
                    deferred.reject('directive.bossyForm: GET request to url "' + schema + '" failed with status "' + status + '"');
                });

            return deferred.promise;
        }

        return {
            getSchema: _getSchema
        };
    }])
;

angular.module('app.directive.bossy.slider', [])
    .controller('SliderController', ['$scope', function ($scope) {
        $scope.value = 5;
        $scope.max = 9;
        $scope.min = 1;
        $scope.string = "----o----";
        $scope.slider = ['-', '-', '-', '-', 'o', '-', '-', '-', '-'];

        //checks bounds when attempting to increase the value
        $scope.increase = function () {
            if ($scope.value < $scope.max) {
                $scope.slider[$scope.value - 1] = '-';
                $scope.value = $scope.value + 1;
                $scope.slider[$scope.value - 1] = 'o';
            }
            $scope.getstring();
        };

        //This function is to bind the decrease and increase function with the arrow keys
        $scope.keyBind = function (ev) {
            $scope.pressed = ev.which;
            //If arrow key(Left or Down) is pressed then call the decrease() function to decrease the value.
            if ($scope.pressed === 37 || $scope.pressed === 40) {
                $scope.decrease();
            }
            //same as above but for Up or Right to increase the value.
            if ($scope.pressed === 38 || $scope.pressed === 39) {
                $scope.increase();
            }
        };
        //checks bounds when attempting to decrease the value
        $scope.decrease = function () {
            if ($scope.value > $scope.min) {
                $scope.slider[$scope.value - 1] = '-';
                $scope.value = $scope.value - 1;
                $scope.slider[$scope.value - 1] = 'o';
            }
            $scope.getstring();
        };
        $scope.getstring = function () {  //function takes the slider array and creates a string of the contents. 
            $scope.string = "";
            //changed to the angular forEach loop for readability
            angular.forEach($scope.slider, function (item) {
                $scope.string += item;
            })

        };

    }]).directive('bossySlider', function () {
        return {
            restrict: 'AE',
            controller: 'SliderController',
            template: '<button ng-click="decrease()" ng-keydown="keyBind($event)">-</button><span>{{string}}</span><button ng-click="increase()" ng-keydown="keyBind($event)">+</button><p>The value is {{value}}!</p>',
            scope: {
            }
        }
    });
 angular.module('bossy.tooltip', [])
	.run(function($templateCache) {
		$templateCache.put('jasmineTest.html', 'jasmineTest.html');
	})
	
	.factory('bossyTooltipFactory', function() {
		return {
			_options: {
				title: 'factory title',
				content: 'factory content'
			}
		}
	})
	
	.directive('bossyTooltip', function($compile, $http /*$data,*/ /*$schema*/) {
		return {
			restrict: 'EA',
			replace: true,
			templateUrl: 'bossy.tooltip.html',
			controller:['$scope', 'bossyTooltipFactory', function($scope, bossyTooltipFactory) {
					this._options = {
					title: bossyTooltipFactory._options.title,
					content: bossyTooltipFactory._options.content
				};
			}],
			controllerAs: "tips"		
		};
	})
	
	// Directives onEnter && onExit use jQueryLite dependency
	.directive('onEnter', function() {
		return function(scope, element) {
			element.bind('mouseenter', function() {
				console.log("I'm in you");
			})
		}
	})
	
	.directive('onExit', function() {
		return function(scope, element) {
			element.bind('mouseleave', function() {
				console.log("I'm outta here");
			})
		}
	})
	
/* global expect:true */

var chai = require('chai'),
	expect = chai.expect;

// Karma configuration
// Generated on Sun Sep 14 2014 10:15:49 GMT-0700 (PDT)

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine'],


    // list of files / patterns to load in the browser
    files: [

      'https://code.angularjs.org/1.2.25/angular.js',
      'https://ajax.googleapis.com/ajax/libs/angularjs/1.2.25/angular.min.js',
      'https://code.angularjs.org/1.2.25/angular-mocks.js',
      './../demo/public/javascripts/*.js',
      './../src/*.js',
      './../src/directives/templates/*.html',
      './../src/directives/*.js',
      './directives/*.js'

    ],


    // list of files to exclude
    exclude: [
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
        './../src/directives/templates/*.html':['ng-html2js']
    },

    ngHtml2JsPreprocessor: {
        //stripPrefix:'./../'
     moduleName: 'Templates',
   
    },

    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress'],


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['Chrome'],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false
  });
};

describe('bossyInput', function() {
	var element,
		scope,
		compile,
		val;


	beforeEach(module('Templates'));
	beforeEach(inject(function($compile,$rootScope){
		scope = $rootScope;
		compile = $compile;
		val = true;
		element = angular.element('<bossy-input title = "Sample Bossy Input">Bossy Input</bossy-input>');
		$compile(element)(scope);
		$rootScope.$digest();
	}));

	it('should add bossy input',function(){
		expect(element.text()).toMatch('Bossy Input');
		expect(element.attr('title')).toMatch('Sample Bossy Input');
	});

});
describe('bossySchema test', function(){

	var schemaService,
		rootScope,
		deferred;
	beforeEach(module('Templates'));
	beforeEach(module('bossy.schema'));
	beforeEach(inject(function(_$schema_, _$rootScope_, _$q_) {
		schemaService = _$schema_;
		rootScope = _$rootScope_;

		deferred = _$q_.defer();
		deferred.resolve('data');
		spyOn(schemaService,'getSchema').andReturn(deferred.promise);
	}));

	it('should call getSchema function',function(){
		schemaService.getSchema();
		expect(schemaService.getSchema).toHaveBeenCalledWith();
	});

	it('getSchema should be called with arguments',function(){
		var x =schemaService.getSchema('abc');
		expect(schemaService.getSchema).toHaveBeenCalledWith('abc');
	});
	var input = {
		title: 'Login Form',
		type: 'object',
		properties: {
			title: {
				type: 'string',
				tag: 'bossy-label',
				title: 'Login to enter',
			},
			terms: {
				type: 'boolean',
				tag: 'bossy-radio',
				title: 'Accept terms and conditions'
			},
			username: {
				type: 'string',
				tag: 'bossy-input-text',
				title: 'Username'
			},
			gender: {
				title: 'Gender',
				type: 'string',
				enum: ['female', 'male']
			}
		},
		required: ['terms', 'gender', 'username']
	};

	it('getSchema should return valid data',function(){
		var x = schemaService.getSchema(input);
		rootScope.$apply();
		expect(schemaService.getSchema).toHaveBeenCalledWith(input);
		expect(x).toMatch(input);
	});
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImJvc3N5LmpzIiwiYm9zc3kuY2FsZW5kYXIuanMiLCJib3NzeS5kYXRhLmpzIiwiYm9zc3kuZHJvcGRvd24uanMiLCJib3NzeS5mb3JtLmpzIiwiYm9zc3kuaW5wdXQuanMiLCJib3NzeS5wYmRyb3Bkb3duLmpzIiwiYm9zc3kuc2NoZW1hLmpzIiwiYm9zc3kuc2xpZGVyLmpzIiwiYm9zc3kudG9vbHRpcC5qcyIsImluZGV4LmpzIiwia2FybWEuY29uZi5qcyIsImRpcmVjdGl2ZXMvYm9zc3kuaW5wdXQuc3BlYy5qcyIsImRpcmVjdGl2ZXMvYm9zc3kuc2NoZW1hLnNwZWMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNyQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDN0hBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQzNEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQzdDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDbElBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ2pCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3pEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQzFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUN4REE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUM3Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ0pBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ2hGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDdEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJib3NzeS5hbGwuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiFcbiAqIGJvc3N5LmpzXG4gKi9cblxuLyohXG4gKiBodHRwOi8vQm9zc3lVSS5jb20vXG4gKlxuICogQm9zc3lVSSAtIENyZWF0ZWQgd2l0aCBMT1ZFIGJ5IEJ1aWxkLmNvbSBPcGVuIFNvdXJjZSBDb25zb3J0aXVtXG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlLiBQbGVhc2Ugc2VlIExJQ0VOU0UgZm9yIG1vcmUgaW5mb3JtYXRpb24uXG4gKlxuICovXG5cbi8vVE9ETzogbmVlZCBsYXlvdXQsIGxhYmVsc1xudmFyIGJvc3N5ID0gYW5ndWxhci5tb2R1bGUoJ2Jvc3N5JywgW1xuICAgICAgICAnYm9zc3kuZGF0YScsXG4gICAgICAgICdib3NzeS5zY2hlbWEnLFxuICAgICAgICAnYm9zc3kuZm9ybScsXG4gICAgICAgICdib3NzeS5pbnB1dCdcbiAgICBdXG4pO1xuIiwiYW5ndWxhci5tb2R1bGUoJ2Jvc3N5LmNhbGVuZGFyJywgW10pXG5cdC5jb250cm9sbGVyKCdDYWxlbmRhckNvbnRyb2xsZXInLCBbJyRzY29wZScsICckZmlsdGVyJywgZnVuY3Rpb24gKCRzY29wZSwgJGZpbHRlcikge1xuXG5cdFx0dmFyIF9tb250aE1hcHMgPSB7fSxcblx0XHRcdHVuaXZlcnNhbCA9IHtcblx0XHRcdFx0REFZOiAyNCAqIDYwICogNjAgKiAxMDAwLFxuXHRcdFx0XHRIT1VSOiA2MCAqIDYwICogMTAwMFxuXHRcdFx0fTtcblxuXHRcdCRzY29wZS5kYXlzID0gW1xuXHRcdFx0J1N1bmRheScsXG5cdFx0XHQnTW9uZGF5Jyxcblx0XHRcdCdUdWVzZGF5Jyxcblx0XHRcdCdXZWRuZXNkYXknLFxuXHRcdFx0J1RodXJzZGF5Jyxcblx0XHRcdCdGcmlkYXknLFxuXHRcdFx0J1NhdHVyZGF5J1xuXHRcdF07XG5cdFx0JHNjb3BlLm1vbnRocyA9IFtcblx0XHRcdCdKYW51YXJ5Jyxcblx0XHRcdCdGZWJydWFyeScsXG5cdFx0XHQnTWFyY2gnLFxuXHRcdFx0J0FwcmlsJyxcblx0XHRcdCdNYXknLFxuXHRcdFx0J0p1bmUnLFxuXHRcdFx0J0p1bHknLFxuXHRcdFx0J0F1Z3VzdCcsXG5cdFx0XHQnU2VwdGVtYmVyJyxcblx0XHRcdCdPY3RvYmVyJyxcblx0XHRcdCdOb3ZlbWJlcicsXG5cdFx0XHQnRGVjZW1iZXInXG5cdFx0XTtcblxuXHRcdGZ1bmN0aW9uIF9nZXRUaW1lT2JqZWN0KGRhdGUpIHtcblx0XHRcdHJldHVybiB7XG5cdFx0XHRcdGZ1bGw6IGRhdGUsXG5cdFx0XHRcdHllYXI6IGRhdGUuZ2V0RnVsbFllYXIoKSxcblx0XHRcdFx0bW9udGhOYW1lOiBfZ2V0TW9udGhOYW1lKGRhdGUuZ2V0TW9udGgoKSksXG5cdFx0XHRcdG1vbnRoOiBkYXRlLmdldE1vbnRoKCksXG5cdFx0XHRcdGRheTogX2dldERheShkYXRlKSxcblx0XHRcdFx0ZGF0ZTogZGF0ZS5nZXREYXRlKCksXG5cdFx0XHRcdHRpbWU6IGRhdGUuZ2V0VGltZSgpXG5cdFx0XHR9O1xuXHRcdH1cblxuXHRcdGZ1bmN0aW9uIF9zZXRTZWxlY3RlZERhdGUoZGF0ZSkge1xuXHRcdFx0JHNjb3BlLnNlbGVjdGVkID0gX2dldFRpbWVPYmplY3QoZGF0ZSk7XG5cdFx0XHQkc2NvcGUubmdNb2RlbCA9ICRmaWx0ZXIoJ2RhdGUnKSgkc2NvcGUuc2VsZWN0ZWQuZnVsbCwgJ0VFRUUsIE1NTU0gZCwgeXl5eScpO1xuXHRcdH1cblxuXHRcdGZ1bmN0aW9uIF9zZXRDdXJyZW50TW9udGhBbmRZZWFyKG1vbnRoLCB5ZWFyKSB7XG5cdFx0XHR2YXIgZGF0ZSA9IG5ldyBEYXRlKHllYXIgIT09IHVuZGVmaW5lZCA/IHllYXIgOiAkc2NvcGUuc2VsZWN0ZWQueWVhciwgbW9udGggIT09IHVuZGVmaW5lZCA/IG1vbnRoIDogJHNjb3BlLnNlbGVjdGVkLm1vbnRoLCAxKTtcblx0XHRcdCRzY29wZS5jdXJyZW50ID0gX2dldFRpbWVPYmplY3QoZGF0ZSk7XG5cdFx0fVxuXG5cdFx0ZnVuY3Rpb24gX2dldE1vbnRoTmFtZShtb250aCkge1xuXHRcdFx0cmV0dXJuICRzY29wZS5tb250aHNbbW9udGhdO1xuXHRcdH1cblxuXHRcdGZ1bmN0aW9uIF9nZXREYXkoZGF0ZSkge1xuXHRcdFx0cmV0dXJuICRzY29wZS5kYXlzW2RhdGUuZ2V0RGF5KCldO1xuXHRcdH1cblxuXHRcdCRzY29wZS5wcmV2aW91c01vbnRoID0gZnVuY3Rpb24oKSB7XG5cdFx0XHR2YXIgZGF0ZSA9IG5ldyBEYXRlKCRzY29wZS5jdXJyZW50LnllYXIsICgkc2NvcGUuY3VycmVudC5tb250aCAtIDEpLCAxKTtcblx0XHRcdF9zZXRDdXJyZW50TW9udGhBbmRZZWFyKGRhdGUuZ2V0TW9udGgoKSwgZGF0ZS5nZXRGdWxsWWVhcigpKTtcblx0XHRcdCRzY29wZS51cGRhdGVEYXRlTWFwKCk7XG5cdFx0fTtcblxuXHRcdCRzY29wZS5uZXh0TW9udGggPSBmdW5jdGlvbigpIHtcblx0XHRcdHZhciBkYXRlID0gbmV3IERhdGUoJHNjb3BlLmN1cnJlbnQueWVhciwgKCRzY29wZS5jdXJyZW50Lm1vbnRoICsgMSksIDEpO1xuXHRcdFx0X3NldEN1cnJlbnRNb250aEFuZFllYXIoZGF0ZS5nZXRNb250aCgpLCBkYXRlLmdldEZ1bGxZZWFyKCkpO1xuXHRcdFx0JHNjb3BlLnVwZGF0ZURhdGVNYXAoKTtcblx0XHR9O1xuXG5cdFx0JHNjb3BlLnNlbGVjdERhdGUgPSBmdW5jdGlvbih0aW1lKSB7XG5cdFx0XHR2YXIgZGF0ZSA9IF9nZXRUaW1lT2JqZWN0KG5ldyBEYXRlKHRpbWUpKTtcblx0XHRcdGlmIChkYXRlLm1vbnRoICE9PSAkc2NvcGUuY3VycmVudC5tb250aCkge1xuXHRcdFx0XHRfc2V0Q3VycmVudE1vbnRoQW5kWWVhcihkYXRlLm1vbnRoLCBkYXRlLnllYXIpO1xuXHRcdFx0XHQkc2NvcGUudXBkYXRlRGF0ZU1hcCgpO1xuXHRcdFx0fVxuXHRcdFx0X3NldFNlbGVjdGVkRGF0ZShuZXcgRGF0ZSh0aW1lKSk7XG5cdFx0fTtcblxuXHRcdCRzY29wZS51cGRhdGVEYXRlTWFwID0gZnVuY3Rpb24oKSB7XG5cdFx0XHR2YXIgZmlyc3RXZWVrRGF5ID0gbmV3IERhdGUoJHNjb3BlLmN1cnJlbnQudGltZSAtICgkc2NvcGUuY3VycmVudC5mdWxsLmdldERheSgpICogdW5pdmVyc2FsLkRBWSkpLFxuXHRcdFx0XHRpc01vbnRoQ29tcGxldGUgPSBmYWxzZTtcblx0XHRcdFx0JHNjb3BlLmRhdGVNYXAgPSBbXTtcblxuXHRcdFx0d2hpbGUgKCFpc01vbnRoQ29tcGxldGUpIHtcblx0XHRcdFx0dmFyIHdlZWsgPSBbXTtcblx0XHRcdFx0aWYgKCRzY29wZS5kYXRlTWFwLmxlbmd0aCA9PT0gNSkge1xuXHRcdFx0XHRcdGlzTW9udGhDb21wbGV0ZSA9IHRydWU7XG5cdFx0XHRcdH1cblx0XHRcdFx0Zm9yICh2YXIgd2Vla0RheSA9IDA7IHdlZWtEYXkgPCA3OyB3ZWVrRGF5KyspIHtcblx0XHRcdFx0XHR2YXIgX3RoaXNEYXRlID0gKG5ldyBEYXRlKGZpcnN0V2Vla0RheS5nZXRUaW1lKCkgKyAod2Vla0RheSAqIHVuaXZlcnNhbC5EQVkpKSk7XG5cdFx0XHRcdFx0Ly8gZml4IGZvciBEU1Qgb2RkbmVzc1xuXHRcdFx0XHRcdGlmIChfdGhpc0RhdGUuZ2V0SG91cnMoKSA9PT0gMjMpIHtcblx0XHRcdFx0XHRcdF90aGlzRGF0ZSA9IChuZXcgRGF0ZShfdGhpc0RhdGUuZ2V0VGltZSgpICsgdW5pdmVyc2FsLkhPVVIpKTtcblx0XHRcdFx0XHR9IGVsc2UgaWYgKF90aGlzRGF0ZS5nZXRIb3VycygpID09PSAxKSB7XG5cdFx0XHRcdFx0XHRfdGhpc0RhdGUgPSAobmV3IERhdGUoX3RoaXNEYXRlLmdldFRpbWUoKSAtIHVuaXZlcnNhbC5IT1VSKSk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdHZhciBfZGF0ZSA9IF9nZXRUaW1lT2JqZWN0KF90aGlzRGF0ZSk7XG5cdFx0XHRcdFx0X2RhdGUuYm9sZCA9IF90aGlzRGF0ZS5nZXRNb250aCgpID09PSAkc2NvcGUuY3VycmVudC5mdWxsLmdldE1vbnRoKCk7XG5cdFx0XHRcdFx0d2Vlay5wdXNoKF9kYXRlKTtcblx0XHRcdFx0fVxuXHRcdFx0XHRmaXJzdFdlZWtEYXkgPSBuZXcgRGF0ZShmaXJzdFdlZWtEYXkuZ2V0VGltZSgpICsgKDcgKiB1bml2ZXJzYWwuREFZKSk7XG5cdFx0XHRcdCRzY29wZS5kYXRlTWFwLnB1c2god2Vlayk7XG5cdFx0XHR9XG5cdFx0fTtcblxuXHRcdC8vIGluaXQgdG8gY3VycmVudCBkYXRlXG5cdFx0X3NldFNlbGVjdGVkRGF0ZSgkc2NvcGUubmdNb2RlbCB8fCBuZXcgRGF0ZSgpKTtcblx0XHRfc2V0Q3VycmVudE1vbnRoQW5kWWVhcigpO1xuXHRcdCRzY29wZS51cGRhdGVEYXRlTWFwKCk7XG5cblx0fV0pLmRpcmVjdGl2ZSgnYm9zc3lDYWxlbmRhcicsIFtmdW5jdGlvbiAoKSB7XG5cdFx0cmV0dXJuIHtcblx0XHRcdHJlc3RyaWN0OiAnQUUnLFxuXHRcdFx0c2NvcGU6IHtcblx0XHRcdFx0bmdNb2RlbDogJz0nXG5cdFx0XHR9LFxuXHRcdFx0dGVtcGxhdGU6ICc8dGFibGU+PHRyPjx0ZCBuZy1jbGljaz1cInByZXZpb3VzTW9udGgoKVwiPiZsdDs8L3RkPjx0ZCBjb2xzcGFuPVwiNVwiPnt7Y3VycmVudC5tb250aE5hbWV9fSB7e2N1cnJlbnQueWVhcn19PC90ZD48dGQgbmctY2xpY2s9XCJuZXh0TW9udGgoKVwiPiZndDs8L3RkPjwvdHI+PHRkIG5nLXJlcGVhdD1cImRheSBpbiBkYXlzXCIgdGl0bGU9XCJ7e2RheX19XCI+e3tkYXkgfCBsaW1pdFRvIDogMn19PC90ZD48dHIgbmctcmVwZWF0PVwid2VlayBpbiBkYXRlTWFwXCI+PHRkIG5nLXJlcGVhdD1cImN1cnJlbnQgaW4gd2Vla1wiIG5nLWNsaWNrPVwic2VsZWN0RGF0ZShjdXJyZW50LnRpbWUpXCI+PGIgbmctaWY9XCJjdXJyZW50LmJvbGRcIj57e2N1cnJlbnQuZGF0ZX19PC9iPjxzcGFuIG5nLWlmPVwiIWN1cnJlbnQuYm9sZFwiPnt7Y3VycmVudC5kYXRlfX08L3NwYW4+PC90ZD48L3RyPjx0cj48dGQgY29sc3Bhbj1cIjdcIj57e3NlbGVjdGVkLmRheX19LCB7e3NlbGVjdGVkLm1vbnRoTmFtZX19IHt7c2VsZWN0ZWQuZGF0ZX19LCB7e3NlbGVjdGVkLnllYXJ9fTwvdGQ+PC90cj48L3RhYmxlPicsXG5cdFx0XHRjb250cm9sbGVyOiAnQ2FsZW5kYXJDb250cm9sbGVyJ1xuXHRcdH07XG5cdH1dKTsiLCJhbmd1bGFyLm1vZHVsZSgnYm9zc3kuZGF0YScsIFtdKVxuLyoqXG5Abmdkb2Mgc2VydmljZVxuQG5hbWUgJGRhdGFcbkByZXF1aXJlcyAkcVxuQHJlcXVpcmVzICRodHRwXG5cbiovXG4gICAgLmZhY3RvcnkoJyRkYXRhJywgWyckcScsJyRodHRwJyxmdW5jdGlvbiAoJHEsJGh0dHApIHtcblxuICAgICAgICBmdW5jdGlvbiBfZ2V0RGF0YSAoZGF0YSkge1xuICAgICAgICAgICAgaWYgKGFuZ3VsYXIuaXNTdHJpbmcoZGF0YSkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gX2dldFJlbW90ZURhdGEoZGF0YSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChhbmd1bGFyLmlzT2JqZWN0KGRhdGEpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGRhdGE7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChhbmd1bGFyLmlzRnVuY3Rpb24oZGF0YSkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gX2dldERhdGEoIGRhdGEuY2FsbCgkc2NvcGUpICk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAvL1RPRE86IHJlcGxhY2UgZXJyb3IgbWVzc2FnZSB3aXRoIG9ubGluZSBkb2MgbGluayBsaWtlIG5nIGVycm9yc1xuICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ2RpcmVjdGl2ZS5ib3NzeUZvcm06IG5vIGRhdGEgdXJsIG9yIG9iamVjdCBnaXZlbicpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgZnVuY3Rpb24gX2dldFJlbW90ZURhdGEoZGF0YSkge1xuICAgICAgICAgICAgdmFyIGRlZmVycmVkID0gJHEuZGVmZXIoKTtcblxuICAgICAgICAgICAgJGh0dHAuZ2V0KCBkYXRhLCB7IHJlc3BvbnNlVHlwZTogJ2pzb24nIH0gKVxuICAgICAgICAgICAgICAgIC5zdWNjZXNzKCBmdW5jdGlvbiggZGF0YSApIHtcbiAgICAgICAgICAgICAgICAgICAgaWYoIGFuZ3VsYXIuaXNPYmplY3QoIGRhdGEgKSApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlc29sdmUoZGF0YSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvL1RPRE86IHJlcGxhY2UgZXJyb3IgbWVzc2FnZSB3aXRoIG9ubGluZSBkb2MgbGluayBsaWtlIG5nIGVycm9yc1xuICAgICAgICAgICAgICAgICAgICAgICAgZGVmZXJyZWQucmVqZWN0KCdkaXJlY3RpdmUuYm9zc3lGb3JtOiBHRVQgcmVxdWVzdCB0byB1cmwgZGlkIG5vdCBwcm9kdWNlIGRhdGEgb2JqZWN0Jyk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIC5lcnJvciggZnVuY3Rpb24ocmVzcG9uc2VfZGF0YSwgc3RhdHVzKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vVE9ETzogcmVwbGFjZSBlcnJvciBtZXNzYWdlIHdpdGggb25saW5lIGRvYyBsaW5rIGxpa2UgbmcgZXJyb3JzXG4gICAgICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlamVjdCgnZGlyZWN0aXZlLmJvc3N5Rm9ybTogR0VUIHJlcXVlc3QgdG8gdXJsIFwiJyArIGRhdGEgKyAnXCIgZmFpbGVkIHdpdGggc3RhdHVzIFwiJyArIHN0YXR1cyArICdcIicpO1xuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICByZXR1cm4gZGVmZXJyZWQucHJvbWlzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAvKipcbiAgICAgICAgICAgIEBuZ2RvYyBtZXRob2RcbiAgICAgICAgICAgIEBuYW1lIGdldERhdGFcbiAgICAgICAgICAgIEBtZXRob2RPZiAkZGF0YVxuICAgICAgICAgICAgQHBhcmFtIHtzdHJpbmcsb2JqZWN0LGZ1bmN0aW9ufSBkYXRhIElmIGRhdGEgaXMgYSBzdHJpbmcsIGl0IHdpbGwgYmUgdHJlYXRlZCBhcyBhIHVybCB0byByZXRyaWV2ZSBkYXRhIGZyb20uIElmIGRhdGEgaXMgYW4gb2JqZWN0IGl0IHdpbGwgYmUgaW1tZWRpYXRlbHkgcmV0dXJuZWQuIElmIGRhdGEgaXMgYSBmdW5jdGlvbiwgdGhlIGZ1bmN0aW9uIHdpbGwgYmUgY2FsbGVkIGFuZCBwcm9jZXNzZWQgdW50aWwgYW4gb2JqZWN0IGlzIHByb2R1Y2VkXG4gICAgICAgICAgICBAcmV0dXJucyB7T2JqZWN0fSBFaXRoZXIgYSAkcSBwcm9taXNlLCBhIGRhdGEgb2JqZWN0IG9yIGEgc3RyaW5nLlxuICAgICAgICAgICAgKi9cbiAgICAgICAgICAgIGdldERhdGE6IF9nZXREYXRhXG4gICAgICAgIH07XG4gICAgfV0pXG47XG4iLCJhbmd1bGFyLm1vZHVsZSgnYm9zc3kuZHJvcGRvd24nLCBbXSlcblx0LnJ1bihmdW5jdGlvbigkdGVtcGxhdGVDYWNoZSkge1xuXHRcdCR0ZW1wbGF0ZUNhY2hlLnB1dCgnamFzbWluZVRlc3QuaHRtbCcsICdqYXNtaW5lVGVzdC5odG1sJyk7XG5cdH0pXG5cdFxuXHQuZmFjdG9yeSgnYm9zc3lEcm9wZG93bkZhY3RvcnknLCBmdW5jdGlvbigkaHR0cCAvKiRkYXRhKi8pIHtcblx0XHR2YXIgcHJvbWlzZSA9ICRodHRwLmdldCgnaHR0cHM6Ly9naXN0LmdpdGh1YnVzZXJjb250ZW50LmNvbS9tc2hhZnJpci8yNjQ2NzYzL3Jhdy9iZmIzNWYxN2JjNWQ1Zjg2ZWMwZjEwYjgwZjdiODBlODIzZTkxOTdmL3N0YXRlc190aXRsZWNhc2UuanNvbicpO1xuXHRcdHJldHVybiBwcm9taXNlO1xuXHR9KVxuXHRcblx0LmRpcmVjdGl2ZSgnYm9zc3lEcm9wZG93bicsIGZ1bmN0aW9uKCRjb21waWxlLCAkaHR0cCAvKiRkYXRhLCovIC8qJHNjaGVtYSovKSB7XG5cdFx0cmV0dXJuIHtcblx0XHRcdHJlc3RyaWN0OiAnRUEnLFxuXHRcdFx0cmVwbGFjZTogdHJ1ZSxcblx0XHRcdHRlbXBsYXRlVXJsOiAnYm9zc3kuZHJvcGRvd24uaHRtbCcsXG5cdFx0XHRjb250cm9sbGVyOiBmdW5jdGlvbigkc2NvcGUsIGJvc3N5RHJvcGRvd25GYWN0b3J5KSB7XG5cdFx0XHRcdCRzY29wZS5jb250ZW50cyA9IFtdO1xuXG5cdFx0XHRcdGJvc3N5RHJvcGRvd25GYWN0b3J5XG5cdFx0XHRcdFx0LnN1Y2Nlc3MoZnVuY3Rpb24oZGF0YSl7XG5cdFx0XHRcdFx0XHQkc2NvcGUuY29udGVudHMgPSBkYXRhO1xuXHRcdFx0XHRcdH0pXG5cdFx0XHRcdFx0LmVycm9yKGZ1bmN0aW9uKGRhdGEpIHtcblx0XHRcdFx0XHRcdGNvbnNvbGUubG9nKFwiaHR0cC5nZXQgRkFJTEVEXCIpO1xuXHRcdFx0XHRcdFx0JHNjb3BlLmNvbnRlbnRzID0gZGF0YSB8fCBcIlJlcXVlc3QgZmFpbGVkXCI7XG5cdFx0XHRcdFx0fSk7XG5cdFx0XHR9LFxuXHRcdFx0Y29udHJvbGxlckFzOiBcImRyb3BzXCJcdFx0XG5cdFx0fTtcblx0fSlcblx0XG5cdC5jb250cm9sbGVyKCdib3NzeURyb3Bkb3duQ3RybCcsIGZ1bmN0aW9uKCRodHRwLCBib3NzeURyb3Bkb3duRmFjdG9yeSwgJHNjb3BlIC8qJGRhdGEsKi8gLyokc2NoZW1hKi8pIHtcblx0XHQkc2NvcGUuaXRlbXMgPSBbXTtcblx0XHRcblx0XHRib3NzeURyb3Bkb3duRmFjdG9yeVxuXHRcdFx0LnN1Y2Nlc3MoZnVuY3Rpb24oZGF0YSl7XG5cdFx0XHRcdCRzY29wZS5pdGVtcyA9IGRhdGE7XG5cdFx0XHR9KVxuXHRcdFx0LmVycm9yKGZ1bmN0aW9uKGRhdGEpIHtcblx0XHRcdFx0Y29uc29sZS5sb2coXCJodHRwLmdldCBGQUlMRURcIik7XG5cdFx0XHRcdCRzY29wZS5pdGVtcyA9IGRhdGEgfHwgXCJSZXF1ZXN0IGZhaWxlZFwiO1xuXHRcdFx0fSlcblx0fSlcblx0XG5cdFxuIiwiYW5ndWxhci5tb2R1bGUoJ2Jvc3N5LmZvcm0nLCBbXSlcbiAgICAucnVuKGZ1bmN0aW9uKCR0ZW1wbGF0ZUNhY2hlKXtcbiAgICAgICAgJHRlbXBsYXRlQ2FjaGUucHV0KCdib3NzeS1pbnB1dC5odG1sJywgJ3RlbXBsYXRlcy9ib3NzeS1pbnB1dC5odG1sJyk7XG4gICAgfSlcbiAgICAuZGlyZWN0aXZlKCdib3NzeUZvcm0nLFsnJGNvbXBpbGUnLCckaHR0cCcsJyRzY2hlbWEnLCckZGF0YScsIGZ1bmN0aW9uICgkY29tcGlsZSwgJGh0dHAsICRzY2hlbWEsICRkYXRhKSB7XG4gICAgICAgIHZhciBfc2NoZW1hLFxuICAgICAgICAgICAgX2RhdGEsXG4gICAgICAgICAgICBfb3B0aW9ucyA9IHtcbiAgICAgICAgICAgICAgICBzaG93TGFiZWxzOiB0cnVlLFxuICAgICAgICAgICAgICAgIGhlYWRlcjogJ1RoaXMgaXMgaGVhZGVyJyxcbiAgICAgICAgICAgICAgICBmb290ZXI6ICdUaGlzIGlzIGZvb3RlcicsXG4gICAgICAgICAgICAgICAgdGhlbWU6ICdncmVlbicsXG4gICAgICAgICAgICAgICAgYnV0dG9uOiAnU2F2ZSdcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBfaXRlbVRlbXBsYXRlID0ge1xuICAgICAgICAgICAgICAgIG51bWJlcjogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gJzxpbnB1dCB0eXBlPVwibnVtYmVyXCIvPic7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB0ZXh0OiBmdW5jdGlvbiAob2JqLCBrZXksIGlzX3JlcXVpcmVkKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAnPGJvc3N5LWlucHV0IHRpdGxlPVwiXFwnJytvYmoudGl0bGUrJ1xcJ1wiIHR5cGU9XCJcXCcnKyBvYmouaW5wdXRfdHlwZSArJ1xcJ1wiIHZhbHVlPVwiXFwnJytfZGF0YS5hZGRyZXNzW2tleV0rJ1xcJ1wiJyArICggaXNfcmVxdWlyZWQgPyAnIHJlcXVpcmVkJyA6ICcnICkgKyAnPjwvYm9zc3ktaW5wdXQ+JztcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHRleHRBcmVhOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAnPHRleHRhcmVhPjwvdGV4dGFyZWE+JztcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGNoZWNrYm94OiBmdW5jdGlvbihvYmope1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gJzxkaXYgY2xhc3M9XCJjaGVja2JveFwiPjxsYWJlbD48aW5wdXQgdHlwZT1cImNoZWNrYm94XCI+JytvYmoudGl0bGUrJzwvbGFiZWw+PC9kaXY+JztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgIGZ1bmN0aW9uIHNldERhdGEoZGF0YSkge1xuICAgICAgICAgICAgdmFyIHJlc3VsdCA9ICRkYXRhLmdldERhdGEoZGF0YSk7XG4gICAgICAgICAgICBpZiggYW5ndWxhci5pc0Z1bmN0aW9uKCByZXN1bHQudGhlbiApICYmIGFuZ3VsYXIuaXNGdW5jdGlvbiggcmVzdWx0LmNhdGNoICkgJiYgYW5ndWxhci5pc0Z1bmN0aW9uKCByZXN1bHQuZmluYWxseSApICkge1xuICAgICAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIF9kYXRhID0gcmVzdWx0O1xuICAgICAgICAgICAgfVxuXG4gICAgICAgIH1cblxuICAgICAgICBmdW5jdGlvbiBzZXRTY2hlbWEoc2NoZW1hKSB7XG4gICAgICAgICAgICBfc2NoZW1hID0gJHNjaGVtYS5nZXRTY2hlbWEoc2NoZW1hKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGZ1bmN0aW9uIGJ1aWxkVGVtcGxhdGUoc2NoZW1hUGFydCwgcGFyZW50S2V5LCByZXF1aXJlZCkge1xuICAgICAgICAgICAgdmFyIHRlbXBsYXRlID0gJycsXG4gICAgICAgICAgICAgICAgZnVsbEtleSA9ICcnO1xuICAgICAgICAgICAgYW5ndWxhci5mb3JFYWNoKHNjaGVtYVBhcnQsIGZ1bmN0aW9uKHZhbHVlLCBrZXkpIHtcbiAgICAgICAgICAgICAgICBpZiAodmFsdWUudHlwZSkge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhmdWxsS2V5ICsgJyBpcyAnKyB2YWx1ZS50eXBlKTtcbiAgICAgICAgICAgICAgICAgICAgc3dpdGNoICh2YWx1ZS50eXBlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlICdvYmplY3QnOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciByZXF1aXJlZF9saXN0ID0gdHlwZW9mKCB2YWx1ZS5yZXF1aXJlZCApICE9PSAndW5kZWZpbmVkJyA/IHZhbHVlLnJlcXVpcmVkIDogbnVsbDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0ZW1wbGF0ZSArPSBidWlsZFRlbXBsYXRlKHZhbHVlLnByb3BlcnRpZXMsIGZ1bGxLZXksIHJlcXVpcmVkX2xpc3QgKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ2FycmF5JzpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0ZW1wbGF0ZSArPSBidWlsZFRlbXBsYXRlKHZhbHVlLml0ZW1zLnByb3BlcnRpZXMsIGZ1bGxLZXkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAnbnVtYmVyJyB8fCAnaW50ZWdlcic6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGUgKz0gX2l0ZW1UZW1wbGF0ZS5udW1iZXIodmFsdWUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAnc3RyaW5nJzpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgaXNfcmVxdWlyZWQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiggcmVxdWlyZWQgJiYgcmVxdWlyZWQuaW5kZXhPZihrZXkpICE9PSAtMSApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaXNfcmVxdWlyZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0ZW1wbGF0ZSArPSBfaXRlbVRlbXBsYXRlLnRleHQodmFsdWUsIGtleSwgaXNfcmVxdWlyZWQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAnYm9vbGVhbic6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGUgKz0gX2l0ZW1UZW1wbGF0ZS5jaGVja2JveCh2YWx1ZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LCB0aGlzKTtcbiAgICAgICAgICAgIHJldHVybiB0ZW1wbGF0ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICByZXN0cmljdDogJ0UnLFxuICAgICAgICAgICAgcmVwbGFjZTogdHJ1ZSxcbiAgICAgICAgICAgIHRlbXBsYXRlOiAnJyxcbiAgICAgICAgICAgIHNjb3BlOiB7XG4gICAgICAgICAgICAgICAgY29uZmlnOic9JywgLy9DcmVhdGUgc2NvcGUgaXNvbGF0aW9uIHdpdGggYmktZGlyZWN0aW9uYWwgYmluZGluZyxcbiAgICAgICAgICAgICAgICB0aXRsZTogJz0nXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgbGluazogZnVuY3Rpb24gKHNjb3BlLCBlbGVtZW50LCBhdHRyaWJ1dGVzKSB7XG4gICAgICAgICAgICAgICAgc2NvcGUuY29uZmlnLm9wdGlvbnMgPSBhbmd1bGFyLmV4dGVuZChfb3B0aW9ucywgc2NvcGUuY29uZmlnLm9wdGlvbnMpO1xuXG4gICAgICAgICAgICAgICAgdmFyIHByb21pc2UgPSBzZXREYXRhKHNjb3BlLmNvbmZpZy5kYXRhKTtcbiAgICAgICAgICAgICAgICBzZXRTY2hlbWEoc2NvcGUuY29uZmlnLnNjaGVtYSk7XG4gICAgICAgICAgICAgICAgaWYoIHByb21pc2UgKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vdG9kbzogc2V0IGRpcmVjdGl2ZSB0byBsb2FkaW5nIHN0YXRlXG4gICAgICAgICAgICAgICAgICAgIHByb21pc2UudGhlbihcbiAgICAgICAgICAgICAgICAgICAgICAgIGZ1bmN0aW9uKHJlc3VsdCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vdG9kbzogc2V0IGRpcmVjdGl2ZSB0byBsb2FkZWQgc3RhdGVcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBfZGF0YSA9IHJlc3VsdDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbGVtZW50Lmh0bWwoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICc8Zm9ybSBub3ZhbGlkYXRlIGNsYXNzPVwie3tjb25maWcub3B0aW9ucy50aGVtZX19XCI+JytcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJzxkaXYgY2xhc3M9XCJiYW5uZXIgcGFnZS1oZWFkZXJcIj48aDM+e3tjb25maWcub3B0aW9ucy5oZWFkZXJ9fTwvaDM+PC9kaXY+JytcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJ1aWxkVGVtcGxhdGUoX3NjaGVtYSkgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJzxidXR0b24gbmctaWY9XCJjb25maWcub3B0aW9ucy5idXR0b25cIj57e2NvbmZpZy5vcHRpb25zLmJ1dHRvbn19PC9idXR0b24+JyArXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICc8ZGl2IGNsYXNzPVwicGFnZS1mb290ZXJcIj48aDM+e3tjb25maWcub3B0aW9ucy5mb290ZXJ9fTwvaDM+PC9kaXY+JytcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJzwvZm9ybT4nXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkY29tcGlsZShlbGVtZW50LmNvbnRlbnRzKCkpKHNjb3BlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICBmdW5jdGlvbihyZWFzb24pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL3RvZG86IHNldCBkaXJlY3RpdmUgdG8gZXJyb3Igc3RhdGVcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICBlbGVtZW50Lmh0bWwoXG4gICAgICAgICAgICAgICAgICAgICAgICAnPGZvcm0gbm92YWxpZGF0ZSBjbGFzcz1cInt7Y29uZmlnLm9wdGlvbnMudGhlbWV9fVwiPkxPQURJTkcuLi48L2Zvcm0+J1xuICAgICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgICAgICAkY29tcGlsZShlbGVtZW50LmNvbnRlbnRzKCkpKHNjb3BlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGVsZW1lbnQuaHRtbChcbiAgICAgICAgICAgICAgICAgICAgICAgICc8Zm9ybSBub3ZhbGlkYXRlIGNsYXNzPVwie3tjb25maWcub3B0aW9ucy50aGVtZX19XCI+JytcbiAgICAgICAgICAgICAgICAgICAgICAgICc8ZGl2IGNsYXNzPVwiYmFubmVyIHBhZ2UtaGVhZGVyXCI+PGgzPnt7Y29uZmlnLm9wdGlvbnMuaGVhZGVyfX08L2gzPjwvZGl2PicrXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnVpbGRUZW1wbGF0ZShfc2NoZW1hKSArXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJzxidXR0b24gbmctaWY9XCJjb25maWcub3B0aW9ucy5idXR0b25cIj57e2NvbmZpZy5vcHRpb25zLmJ1dHRvbn19PC9idXR0b24+JyArXG4gICAgICAgICAgICAgICAgICAgICAgICAnPGRpdiBjbGFzcz1cInBhZ2UtZm9vdGVyXCI+PGgzPnt7Y29uZmlnLm9wdGlvbnMuZm9vdGVyfX08L2gzPjwvZGl2PicrXG4gICAgICAgICAgICAgICAgICAgICAgICAnPC9mb3JtPidcbiAgICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICAgICAgJGNvbXBpbGUoZWxlbWVudC5jb250ZW50cygpKShzY29wZSk7XG4gICAgICAgICAgICAgICAgfVxuXG5cbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcblxuICAgIH1dKVxuOyIsImFuZ3VsYXIubW9kdWxlKCdib3NzeS5pbnB1dCcsIFtdKVxuICAgIC5ydW4oZnVuY3Rpb24oJHRlbXBsYXRlQ2FjaGUpe1xuICAgICAgICAkdGVtcGxhdGVDYWNoZS5wdXQoJ2Jvc3N5LWlucHV0Lmh0bWwnLCAnPGRpdiBjbGFzcz1cImZvcm0tZ3JvdXAgYm9zc3ktaW5wdXRcIj48bGFiZWwgZm9yPVwiXCI+e3t0aXRsZX19PC9sYWJlbD48aW5wdXQgdHlwZT1cInt7dHlwZX19XCIgY2xhc3M9XCJmb3JtLWNvbnRyb2xcIiBwbGFjZWhvbGRlcj1cIlwiIHZhbHVlPVwie3t2YWx1ZX19XCIvPjxzcGFuPjwvc3Bhbj48L2Rpdj4nKTtcbiAgICB9KVxuICAgIC5kaXJlY3RpdmUoJ2Jvc3N5SW5wdXQnLFsnJGNvbXBpbGUnLCckaHR0cCcsJyRzY2hlbWEnLCckZGF0YScsJyR0ZW1wbGF0ZUNhY2hlJywgZnVuY3Rpb24gKCRjb21waWxlLCAkaHR0cCwgJHNjaGVtYSwgJGRhdGEsICR0ZW1wbGF0ZUNhY2hlKSB7XG4gICAgXHRyZXR1cm4ge1xuXHRcdFx0cmVzdHJpY3Q6ICdFJyxcblx0XHRcdHJlcGxhY2U6IHRydWUsXG5cdFx0XHRzY29wZToge1xuXHRcdFx0XHR0aXRsZTogJz0nLFxuXHRcdFx0XHR2YWx1ZTogJz0nLFxuXHRcdFx0XHR0eXBlOiAnPScsXG5cdFx0XHRcdHJlcXVpcmVkOiAnPSdcblx0XHRcdH0sXG5cdFx0XHR0ZW1wbGF0ZTogJHRlbXBsYXRlQ2FjaGUuZ2V0KCdib3NzeS1pbnB1dC5odG1sJylcblx0XHR9O1xuICAgIH1dKTtcbiIsImFuZ3VsYXIubW9kdWxlKCdib3NzeS5kcm9wZG93bicsIFtdKVxuICAgIC5ydW4oZnVuY3Rpb24oJHRlbXBsYXRlQ2FjaGUpIHtcbiAgICAgICAgJHRlbXBsYXRlQ2FjaGUucHV0KCdqYXNtaW5lVGVzdC5odG1sJywgJ2phc21pbmVUZXN0Lmh0bWwnKTtcbiAgICB9KVxuICAgIFxuICAgIC8qLmZhY3RvcnkoJ2Jvc3N5RHJvcGRvd25GYWN0b3J5JywgWyckaHR0cCcsIGZ1bmN0aW9uKCRodHRwKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBfb3B0aW9uczoge1xuICAgICAgICAgICAgICAgIHRpdGxlOiAnZHJvcCB0aXRsZScsXG4gICAgICAgICAgICAgICAgY29udGVudDogJ3BvcCdcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICAvLyAkaHR0cC5nZXQoJ2h0dHBzOi8vZ2lzdC5naXRodWJ1c2VyY29udGVudC5jb20vbXNoYWZyaXIvMjY0Njc2My9yYXcvYmZiMzVmMTdiYzVkNWY4NmVjMGYxMGI4MGY3YjgwZTgyM2U5MTk3Zi9zdGF0ZXNfdGl0bGVjYXNlLmpzb24nKS5zdWNjZXNzKGZ1bmN0aW9uKGRhdGEpe1xuICAgICAgICAgICAgLy8gX29wdGlvbnMuY29udGVudCA9IGRhdGE7XG4gICAgICAgIC8vIH0pXG4gICAgfV0pKi9cbiAgICBcbiAgICAuZGlyZWN0aXZlKCdib3NzeURyb3Bkb3duJywgZnVuY3Rpb24oJGNvbXBpbGUsICRkYXRhLyosICRzY2hlbWEqLykge1xuICAgICAgICB2YXIgX2RhdGE7XG4gICAgICAgIGZ1bmN0aW9uIHNldERhdGEoZGF0YSkge1xuICAgICAgICAgICAgdmFyIHJlc3VsdCA9ICRkYXRhLmdldERhdGEoZGF0YSk7XG4gICAgICAgICAgICBpZiggYW5ndWxhci5pc0Z1bmN0aW9uKCByZXN1bHQudGhlbiApICYmIGFuZ3VsYXIuaXNGdW5jdGlvbiggcmVzdWx0LmNhdGNoICkgJiYgYW5ndWxhci5pc0Z1bmN0aW9uKCByZXN1bHQuZmluYWxseSApICkgLy97XG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhyZXN1bHQpOy8vcmV0dXJuIHJlc3VsdDtcbiAgICAgICAgICAgIC8qfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBfZGF0YSA9IHJlc3VsdDtcbiAgICAgICAgICAgIH0qL1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgcmVzdHJpY3Q6ICdFQScsXG4gICAgICAgICAgICByZXBsYWNlOiB0cnVlLFxuICAgICAgICAgICAgc2NvcGU6IHtcbiAgICAgICAgICAgICAgICBzcmM6ICdAJyxcbiAgICAgICAgICAgICAgICBwbGFjZWhvbGRlcjogJz0nXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgdGVtcGxhdGU6ICcnLFxuICAgICAgICAgICAgLy90ZW1wbGF0ZVVybDogJ2Jvc3N5LmRyb3Bkb3duLmh0bWwnLFxuICAgICAgICAgICAgbGluazogZnVuY3Rpb24oc2NvcGUsIGVsZW1lbnQsIGF0dHJzKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coZWxlbWVudCk7XG4gICAgICAgICAgICAgICAgdmFyIGpzb24gPSBzZXREYXRhKHNjb3BlLnNyYyk7XG4gICAgICAgICAgICAgICAgZWxlbWVudC5odG1sKFxuICAgICAgICAgICAgICAgICAgICAnPHNlbGVjdD4nXG4gICAgICAgICAgICAgICAgICAgICAgICArICc8b3B0aW9uIG5nLXJlcGVhdD1cImogaW4ganNvblwiIHZhbHVlPVwie3tqLmNvZGV9fVwiPnt7ai5uYW1lfX08L29wdGlvbj4nXG4gICAgICAgICAgICAgICAgICAgICsgJzwvc2VsZWN0PidcbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgICRjb21waWxlKGVsZW1lbnQuY29udGVudHMoKSkoc2NvcGUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLypjb250cm9sbGVyOlsnJHNjb3BlJywgJ2Jvc3N5RHJvcGRvd25GYWN0b3J5JywgZnVuY3Rpb24oJHNjb3BlLCBib3NzeURyb3Bkb3duRmFjdG9yeSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9vcHRpb25zID0ge1xuICAgICAgICAgICAgICAgICAgICB0aXRsZTogYm9zc3lEcm9wZG93bkZhY3RvcnkuX29wdGlvbnMudGl0bGUsXG4gICAgICAgICAgICAgICAgICAgIGNvbnRlbnQ6IGJvc3N5RHJvcGRvd25GYWN0b3J5Ll9vcHRpb25zLmNvbnRlbnRcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfV0sXG4gICAgICAgICAgICBjb250cm9sbGVyQXM6IFwiZHJvcHNcIiovXG4gICAgICAgIH07XG4gICAgfSk7IiwiYW5ndWxhci5tb2R1bGUoJ2Jvc3N5LnNjaGVtYScsIFtdKVxuICAgIC5mYWN0b3J5KCckc2NoZW1hJywgWyckcScsICckaHR0cCcsIGZ1bmN0aW9uICgkcSwgJGh0dHApIHtcblxuICAgICAgICBmdW5jdGlvbiBfZ2V0U2NoZW1hIChzY2hlbWEpIHtcbiAgICAgICAgICAgIGlmIChhbmd1bGFyLmlzU3RyaW5nKHNjaGVtYSkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gX2dldFJlbW90ZVNjaGVtYShzY2hlbWEpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAoYW5ndWxhci5pc09iamVjdChzY2hlbWEpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHNjaGVtYTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIC8vVE9ETzogcmVwbGFjZSBlcnJvciBtZXNzYWdlIHdpdGggb25saW5lIGRvYyBsaW5rIGxpa2UgbmcgZXJyb3JzXG4gICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcignZGlyZWN0aXZlLmJvc3N5Rm9ybTogbm8gc2NoZW1hIHVybCBvciBvYmplY3QgZ2l2ZW4nKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGZ1bmN0aW9uIF9nZXRSZW1vdGVTY2hlbWEoc2NoZW1hKSB7XG4gICAgICAgICAgICB2YXIgZGVmZXJyZWQgPSAkcS5kZWZlcigpO1xuXG4gICAgICAgICAgICAkaHR0cC5nZXQoIHNjaGVtYSApXG4gICAgICAgICAgICAgICAgLnN1Y2Nlc3MoIGZ1bmN0aW9uKCBkYXRhICkge1xuICAgICAgICAgICAgICAgICAgICBpZiggYW5ndWxhci5pc09iamVjdCggZGF0YSApICkge1xuICAgICAgICAgICAgICAgICAgICAgICAgZGVmZXJyZWQucmVzb2x2ZShkYXRhKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vVE9ETzogcmVwbGFjZSBlcnJvciBtZXNzYWdlIHdpdGggb25saW5lIGRvYyBsaW5rIGxpa2UgbmcgZXJyb3JzXG4gICAgICAgICAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZWplY3QoJ2RpcmVjdGl2ZS5ib3NzeUZvcm06IEdFVCByZXF1ZXN0IHRvIHVybCBkaWQgbm90IHByb2R1Y2Ugc2NoZW1hIG9iamVjdCcpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAuZXJyb3IoIGZ1bmN0aW9uKGRhdGEsIHN0YXR1cykge1xuICAgICAgICAgICAgICAgICAgICAvL1RPRE86IHJlcGxhY2UgZXJyb3IgbWVzc2FnZSB3aXRoIG9ubGluZSBkb2MgbGluayBsaWtlIG5nIGVycm9yc1xuICAgICAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZWplY3QoJ2RpcmVjdGl2ZS5ib3NzeUZvcm06IEdFVCByZXF1ZXN0IHRvIHVybCBcIicgKyBzY2hlbWEgKyAnXCIgZmFpbGVkIHdpdGggc3RhdHVzIFwiJyArIHN0YXR1cyArICdcIicpO1xuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICByZXR1cm4gZGVmZXJyZWQucHJvbWlzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBnZXRTY2hlbWE6IF9nZXRTY2hlbWFcbiAgICAgICAgfTtcbiAgICB9XSlcbjtcbiIsImFuZ3VsYXIubW9kdWxlKCdhcHAuZGlyZWN0aXZlLmJvc3N5LnNsaWRlcicsIFtdKVxuICAgIC5jb250cm9sbGVyKCdTbGlkZXJDb250cm9sbGVyJywgWyckc2NvcGUnLCBmdW5jdGlvbiAoJHNjb3BlKSB7XG4gICAgICAgICRzY29wZS52YWx1ZSA9IDU7XG4gICAgICAgICRzY29wZS5tYXggPSA5O1xuICAgICAgICAkc2NvcGUubWluID0gMTtcbiAgICAgICAgJHNjb3BlLnN0cmluZyA9IFwiLS0tLW8tLS0tXCI7XG4gICAgICAgICRzY29wZS5zbGlkZXIgPSBbJy0nLCAnLScsICctJywgJy0nLCAnbycsICctJywgJy0nLCAnLScsICctJ107XG5cbiAgICAgICAgLy9jaGVja3MgYm91bmRzIHdoZW4gYXR0ZW1wdGluZyB0byBpbmNyZWFzZSB0aGUgdmFsdWVcbiAgICAgICAgJHNjb3BlLmluY3JlYXNlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgaWYgKCRzY29wZS52YWx1ZSA8ICRzY29wZS5tYXgpIHtcbiAgICAgICAgICAgICAgICAkc2NvcGUuc2xpZGVyWyRzY29wZS52YWx1ZSAtIDFdID0gJy0nO1xuICAgICAgICAgICAgICAgICRzY29wZS52YWx1ZSA9ICRzY29wZS52YWx1ZSArIDE7XG4gICAgICAgICAgICAgICAgJHNjb3BlLnNsaWRlclskc2NvcGUudmFsdWUgLSAxXSA9ICdvJztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgICRzY29wZS5nZXRzdHJpbmcoKTtcbiAgICAgICAgfTtcblxuICAgICAgICAvL1RoaXMgZnVuY3Rpb24gaXMgdG8gYmluZCB0aGUgZGVjcmVhc2UgYW5kIGluY3JlYXNlIGZ1bmN0aW9uIHdpdGggdGhlIGFycm93IGtleXNcbiAgICAgICAgJHNjb3BlLmtleUJpbmQgPSBmdW5jdGlvbiAoZXYpIHtcbiAgICAgICAgICAgICRzY29wZS5wcmVzc2VkID0gZXYud2hpY2g7XG4gICAgICAgICAgICAvL0lmIGFycm93IGtleShMZWZ0IG9yIERvd24pIGlzIHByZXNzZWQgdGhlbiBjYWxsIHRoZSBkZWNyZWFzZSgpIGZ1bmN0aW9uIHRvIGRlY3JlYXNlIHRoZSB2YWx1ZS5cbiAgICAgICAgICAgIGlmICgkc2NvcGUucHJlc3NlZCA9PT0gMzcgfHwgJHNjb3BlLnByZXNzZWQgPT09IDQwKSB7XG4gICAgICAgICAgICAgICAgJHNjb3BlLmRlY3JlYXNlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvL3NhbWUgYXMgYWJvdmUgYnV0IGZvciBVcCBvciBSaWdodCB0byBpbmNyZWFzZSB0aGUgdmFsdWUuXG4gICAgICAgICAgICBpZiAoJHNjb3BlLnByZXNzZWQgPT09IDM4IHx8ICRzY29wZS5wcmVzc2VkID09PSAzOSkge1xuICAgICAgICAgICAgICAgICRzY29wZS5pbmNyZWFzZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICAvL2NoZWNrcyBib3VuZHMgd2hlbiBhdHRlbXB0aW5nIHRvIGRlY3JlYXNlIHRoZSB2YWx1ZVxuICAgICAgICAkc2NvcGUuZGVjcmVhc2UgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBpZiAoJHNjb3BlLnZhbHVlID4gJHNjb3BlLm1pbikge1xuICAgICAgICAgICAgICAgICRzY29wZS5zbGlkZXJbJHNjb3BlLnZhbHVlIC0gMV0gPSAnLSc7XG4gICAgICAgICAgICAgICAgJHNjb3BlLnZhbHVlID0gJHNjb3BlLnZhbHVlIC0gMTtcbiAgICAgICAgICAgICAgICAkc2NvcGUuc2xpZGVyWyRzY29wZS52YWx1ZSAtIDFdID0gJ28nO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgJHNjb3BlLmdldHN0cmluZygpO1xuICAgICAgICB9O1xuICAgICAgICAkc2NvcGUuZ2V0c3RyaW5nID0gZnVuY3Rpb24gKCkgeyAgLy9mdW5jdGlvbiB0YWtlcyB0aGUgc2xpZGVyIGFycmF5IGFuZCBjcmVhdGVzIGEgc3RyaW5nIG9mIHRoZSBjb250ZW50cy4gXG4gICAgICAgICAgICAkc2NvcGUuc3RyaW5nID0gXCJcIjtcbiAgICAgICAgICAgIC8vY2hhbmdlZCB0byB0aGUgYW5ndWxhciBmb3JFYWNoIGxvb3AgZm9yIHJlYWRhYmlsaXR5XG4gICAgICAgICAgICBhbmd1bGFyLmZvckVhY2goJHNjb3BlLnNsaWRlciwgZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICAgICAgICAgICAgICAkc2NvcGUuc3RyaW5nICs9IGl0ZW07XG4gICAgICAgICAgICB9KVxuXG4gICAgICAgIH07XG5cbiAgICB9XSkuZGlyZWN0aXZlKCdib3NzeVNsaWRlcicsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHJlc3RyaWN0OiAnQUUnLFxuICAgICAgICAgICAgY29udHJvbGxlcjogJ1NsaWRlckNvbnRyb2xsZXInLFxuICAgICAgICAgICAgdGVtcGxhdGU6ICc8YnV0dG9uIG5nLWNsaWNrPVwiZGVjcmVhc2UoKVwiIG5nLWtleWRvd249XCJrZXlCaW5kKCRldmVudClcIj4tPC9idXR0b24+PHNwYW4+e3tzdHJpbmd9fTwvc3Bhbj48YnV0dG9uIG5nLWNsaWNrPVwiaW5jcmVhc2UoKVwiIG5nLWtleWRvd249XCJrZXlCaW5kKCRldmVudClcIj4rPC9idXR0b24+PHA+VGhlIHZhbHVlIGlzIHt7dmFsdWV9fSE8L3A+JyxcbiAgICAgICAgICAgIHNjb3BlOiB7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9KTsiLCIgYW5ndWxhci5tb2R1bGUoJ2Jvc3N5LnRvb2x0aXAnLCBbXSlcblx0LnJ1bihmdW5jdGlvbigkdGVtcGxhdGVDYWNoZSkge1xuXHRcdCR0ZW1wbGF0ZUNhY2hlLnB1dCgnamFzbWluZVRlc3QuaHRtbCcsICdqYXNtaW5lVGVzdC5odG1sJyk7XG5cdH0pXG5cdFxuXHQuZmFjdG9yeSgnYm9zc3lUb29sdGlwRmFjdG9yeScsIGZ1bmN0aW9uKCkge1xuXHRcdHJldHVybiB7XG5cdFx0XHRfb3B0aW9uczoge1xuXHRcdFx0XHR0aXRsZTogJ2ZhY3RvcnkgdGl0bGUnLFxuXHRcdFx0XHRjb250ZW50OiAnZmFjdG9yeSBjb250ZW50J1xuXHRcdFx0fVxuXHRcdH1cblx0fSlcblx0XG5cdC5kaXJlY3RpdmUoJ2Jvc3N5VG9vbHRpcCcsIGZ1bmN0aW9uKCRjb21waWxlLCAkaHR0cCAvKiRkYXRhLCovIC8qJHNjaGVtYSovKSB7XG5cdFx0cmV0dXJuIHtcblx0XHRcdHJlc3RyaWN0OiAnRUEnLFxuXHRcdFx0cmVwbGFjZTogdHJ1ZSxcblx0XHRcdHRlbXBsYXRlVXJsOiAnYm9zc3kudG9vbHRpcC5odG1sJyxcblx0XHRcdGNvbnRyb2xsZXI6Wyckc2NvcGUnLCAnYm9zc3lUb29sdGlwRmFjdG9yeScsIGZ1bmN0aW9uKCRzY29wZSwgYm9zc3lUb29sdGlwRmFjdG9yeSkge1xuXHRcdFx0XHRcdHRoaXMuX29wdGlvbnMgPSB7XG5cdFx0XHRcdFx0dGl0bGU6IGJvc3N5VG9vbHRpcEZhY3RvcnkuX29wdGlvbnMudGl0bGUsXG5cdFx0XHRcdFx0Y29udGVudDogYm9zc3lUb29sdGlwRmFjdG9yeS5fb3B0aW9ucy5jb250ZW50XG5cdFx0XHRcdH07XG5cdFx0XHR9XSxcblx0XHRcdGNvbnRyb2xsZXJBczogXCJ0aXBzXCJcdFx0XG5cdFx0fTtcblx0fSlcblx0XG5cdC8vIERpcmVjdGl2ZXMgb25FbnRlciAmJiBvbkV4aXQgdXNlIGpRdWVyeUxpdGUgZGVwZW5kZW5jeVxuXHQuZGlyZWN0aXZlKCdvbkVudGVyJywgZnVuY3Rpb24oKSB7XG5cdFx0cmV0dXJuIGZ1bmN0aW9uKHNjb3BlLCBlbGVtZW50KSB7XG5cdFx0XHRlbGVtZW50LmJpbmQoJ21vdXNlZW50ZXInLCBmdW5jdGlvbigpIHtcblx0XHRcdFx0Y29uc29sZS5sb2coXCJJJ20gaW4geW91XCIpO1xuXHRcdFx0fSlcblx0XHR9XG5cdH0pXG5cdFxuXHQuZGlyZWN0aXZlKCdvbkV4aXQnLCBmdW5jdGlvbigpIHtcblx0XHRyZXR1cm4gZnVuY3Rpb24oc2NvcGUsIGVsZW1lbnQpIHtcblx0XHRcdGVsZW1lbnQuYmluZCgnbW91c2VsZWF2ZScsIGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRjb25zb2xlLmxvZyhcIkknbSBvdXR0YSBoZXJlXCIpO1xuXHRcdFx0fSlcblx0XHR9XG5cdH0pXG5cdCIsIi8qIGdsb2JhbCBleHBlY3Q6dHJ1ZSAqL1xuXG52YXIgY2hhaSA9IHJlcXVpcmUoJ2NoYWknKSxcblx0ZXhwZWN0ID0gY2hhaS5leHBlY3Q7XG4iLCIvLyBLYXJtYSBjb25maWd1cmF0aW9uXG4vLyBHZW5lcmF0ZWQgb24gU3VuIFNlcCAxNCAyMDE0IDEwOjE1OjQ5IEdNVC0wNzAwIChQRFQpXG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oY29uZmlnKSB7XG4gIGNvbmZpZy5zZXQoe1xuXG4gICAgLy8gYmFzZSBwYXRoIHRoYXQgd2lsbCBiZSB1c2VkIHRvIHJlc29sdmUgYWxsIHBhdHRlcm5zIChlZy4gZmlsZXMsIGV4Y2x1ZGUpXG4gICAgYmFzZVBhdGg6ICcnLFxuXG5cbiAgICAvLyBmcmFtZXdvcmtzIHRvIHVzZVxuICAgIC8vIGF2YWlsYWJsZSBmcmFtZXdvcmtzOiBodHRwczovL25wbWpzLm9yZy9icm93c2Uva2V5d29yZC9rYXJtYS1hZGFwdGVyXG4gICAgZnJhbWV3b3JrczogWydqYXNtaW5lJ10sXG5cblxuICAgIC8vIGxpc3Qgb2YgZmlsZXMgLyBwYXR0ZXJucyB0byBsb2FkIGluIHRoZSBicm93c2VyXG4gICAgZmlsZXM6IFtcblxuICAgICAgJ2h0dHBzOi8vY29kZS5hbmd1bGFyanMub3JnLzEuMi4yNS9hbmd1bGFyLmpzJyxcbiAgICAgICdodHRwczovL2FqYXguZ29vZ2xlYXBpcy5jb20vYWpheC9saWJzL2FuZ3VsYXJqcy8xLjIuMjUvYW5ndWxhci5taW4uanMnLFxuICAgICAgJ2h0dHBzOi8vY29kZS5hbmd1bGFyanMub3JnLzEuMi4yNS9hbmd1bGFyLW1vY2tzLmpzJyxcbiAgICAgICcuLy4uL2RlbW8vcHVibGljL2phdmFzY3JpcHRzLyouanMnLFxuICAgICAgJy4vLi4vc3JjLyouanMnLFxuICAgICAgJy4vLi4vc3JjL2RpcmVjdGl2ZXMvdGVtcGxhdGVzLyouaHRtbCcsXG4gICAgICAnLi8uLi9zcmMvZGlyZWN0aXZlcy8qLmpzJyxcbiAgICAgICcuL2RpcmVjdGl2ZXMvKi5qcydcblxuICAgIF0sXG5cblxuICAgIC8vIGxpc3Qgb2YgZmlsZXMgdG8gZXhjbHVkZVxuICAgIGV4Y2x1ZGU6IFtcbiAgICBdLFxuXG5cbiAgICAvLyBwcmVwcm9jZXNzIG1hdGNoaW5nIGZpbGVzIGJlZm9yZSBzZXJ2aW5nIHRoZW0gdG8gdGhlIGJyb3dzZXJcbiAgICAvLyBhdmFpbGFibGUgcHJlcHJvY2Vzc29yczogaHR0cHM6Ly9ucG1qcy5vcmcvYnJvd3NlL2tleXdvcmQva2FybWEtcHJlcHJvY2Vzc29yXG4gICAgcHJlcHJvY2Vzc29yczoge1xuICAgICAgICAnLi8uLi9zcmMvZGlyZWN0aXZlcy90ZW1wbGF0ZXMvKi5odG1sJzpbJ25nLWh0bWwyanMnXVxuICAgIH0sXG5cbiAgICBuZ0h0bWwySnNQcmVwcm9jZXNzb3I6IHtcbiAgICAgICAgLy9zdHJpcFByZWZpeDonLi8uLi8nXG4gICAgIG1vZHVsZU5hbWU6ICdUZW1wbGF0ZXMnLFxuICAgXG4gICAgfSxcblxuICAgIC8vIHRlc3QgcmVzdWx0cyByZXBvcnRlciB0byB1c2VcbiAgICAvLyBwb3NzaWJsZSB2YWx1ZXM6ICdkb3RzJywgJ3Byb2dyZXNzJ1xuICAgIC8vIGF2YWlsYWJsZSByZXBvcnRlcnM6IGh0dHBzOi8vbnBtanMub3JnL2Jyb3dzZS9rZXl3b3JkL2thcm1hLXJlcG9ydGVyXG4gICAgcmVwb3J0ZXJzOiBbJ3Byb2dyZXNzJ10sXG5cblxuICAgIC8vIHdlYiBzZXJ2ZXIgcG9ydFxuICAgIHBvcnQ6IDk4NzYsXG5cblxuICAgIC8vIGVuYWJsZSAvIGRpc2FibGUgY29sb3JzIGluIHRoZSBvdXRwdXQgKHJlcG9ydGVycyBhbmQgbG9ncylcbiAgICBjb2xvcnM6IHRydWUsXG5cblxuICAgIC8vIGxldmVsIG9mIGxvZ2dpbmdcbiAgICAvLyBwb3NzaWJsZSB2YWx1ZXM6IGNvbmZpZy5MT0dfRElTQUJMRSB8fCBjb25maWcuTE9HX0VSUk9SIHx8IGNvbmZpZy5MT0dfV0FSTiB8fCBjb25maWcuTE9HX0lORk8gfHwgY29uZmlnLkxPR19ERUJVR1xuICAgIGxvZ0xldmVsOiBjb25maWcuTE9HX0lORk8sXG5cblxuICAgIC8vIGVuYWJsZSAvIGRpc2FibGUgd2F0Y2hpbmcgZmlsZSBhbmQgZXhlY3V0aW5nIHRlc3RzIHdoZW5ldmVyIGFueSBmaWxlIGNoYW5nZXNcbiAgICBhdXRvV2F0Y2g6IHRydWUsXG5cblxuICAgIC8vIHN0YXJ0IHRoZXNlIGJyb3dzZXJzXG4gICAgLy8gYXZhaWxhYmxlIGJyb3dzZXIgbGF1bmNoZXJzOiBodHRwczovL25wbWpzLm9yZy9icm93c2Uva2V5d29yZC9rYXJtYS1sYXVuY2hlclxuICAgIGJyb3dzZXJzOiBbJ0Nocm9tZSddLFxuXG5cbiAgICAvLyBDb250aW51b3VzIEludGVncmF0aW9uIG1vZGVcbiAgICAvLyBpZiB0cnVlLCBLYXJtYSBjYXB0dXJlcyBicm93c2VycywgcnVucyB0aGUgdGVzdHMgYW5kIGV4aXRzXG4gICAgc2luZ2xlUnVuOiBmYWxzZVxuICB9KTtcbn07XG4iLCJkZXNjcmliZSgnYm9zc3lJbnB1dCcsIGZ1bmN0aW9uKCkge1xuXHR2YXIgZWxlbWVudCxcblx0XHRzY29wZSxcblx0XHRjb21waWxlLFxuXHRcdHZhbDtcblxuXG5cdGJlZm9yZUVhY2gobW9kdWxlKCdUZW1wbGF0ZXMnKSk7XG5cdGJlZm9yZUVhY2goaW5qZWN0KGZ1bmN0aW9uKCRjb21waWxlLCRyb290U2NvcGUpe1xuXHRcdHNjb3BlID0gJHJvb3RTY29wZTtcblx0XHRjb21waWxlID0gJGNvbXBpbGU7XG5cdFx0dmFsID0gdHJ1ZTtcblx0XHRlbGVtZW50ID0gYW5ndWxhci5lbGVtZW50KCc8Ym9zc3ktaW5wdXQgdGl0bGUgPSBcIlNhbXBsZSBCb3NzeSBJbnB1dFwiPkJvc3N5IElucHV0PC9ib3NzeS1pbnB1dD4nKTtcblx0XHQkY29tcGlsZShlbGVtZW50KShzY29wZSk7XG5cdFx0JHJvb3RTY29wZS4kZGlnZXN0KCk7XG5cdH0pKTtcblxuXHRpdCgnc2hvdWxkIGFkZCBib3NzeSBpbnB1dCcsZnVuY3Rpb24oKXtcblx0XHRleHBlY3QoZWxlbWVudC50ZXh0KCkpLnRvTWF0Y2goJ0Jvc3N5IElucHV0Jyk7XG5cdFx0ZXhwZWN0KGVsZW1lbnQuYXR0cigndGl0bGUnKSkudG9NYXRjaCgnU2FtcGxlIEJvc3N5IElucHV0Jyk7XG5cdH0pO1xuXG59KTsiLCJkZXNjcmliZSgnYm9zc3lTY2hlbWEgdGVzdCcsIGZ1bmN0aW9uKCl7XG5cblx0dmFyIHNjaGVtYVNlcnZpY2UsXG5cdFx0cm9vdFNjb3BlLFxuXHRcdGRlZmVycmVkO1xuXHRiZWZvcmVFYWNoKG1vZHVsZSgnVGVtcGxhdGVzJykpO1xuXHRiZWZvcmVFYWNoKG1vZHVsZSgnYm9zc3kuc2NoZW1hJykpO1xuXHRiZWZvcmVFYWNoKGluamVjdChmdW5jdGlvbihfJHNjaGVtYV8sIF8kcm9vdFNjb3BlXywgXyRxXykge1xuXHRcdHNjaGVtYVNlcnZpY2UgPSBfJHNjaGVtYV87XG5cdFx0cm9vdFNjb3BlID0gXyRyb290U2NvcGVfO1xuXG5cdFx0ZGVmZXJyZWQgPSBfJHFfLmRlZmVyKCk7XG5cdFx0ZGVmZXJyZWQucmVzb2x2ZSgnZGF0YScpO1xuXHRcdHNweU9uKHNjaGVtYVNlcnZpY2UsJ2dldFNjaGVtYScpLmFuZFJldHVybihkZWZlcnJlZC5wcm9taXNlKTtcblx0fSkpO1xuXG5cdGl0KCdzaG91bGQgY2FsbCBnZXRTY2hlbWEgZnVuY3Rpb24nLGZ1bmN0aW9uKCl7XG5cdFx0c2NoZW1hU2VydmljZS5nZXRTY2hlbWEoKTtcblx0XHRleHBlY3Qoc2NoZW1hU2VydmljZS5nZXRTY2hlbWEpLnRvSGF2ZUJlZW5DYWxsZWRXaXRoKCk7XG5cdH0pO1xuXG5cdGl0KCdnZXRTY2hlbWEgc2hvdWxkIGJlIGNhbGxlZCB3aXRoIGFyZ3VtZW50cycsZnVuY3Rpb24oKXtcblx0XHR2YXIgeCA9c2NoZW1hU2VydmljZS5nZXRTY2hlbWEoJ2FiYycpO1xuXHRcdGV4cGVjdChzY2hlbWFTZXJ2aWNlLmdldFNjaGVtYSkudG9IYXZlQmVlbkNhbGxlZFdpdGgoJ2FiYycpO1xuXHR9KTtcblx0dmFyIGlucHV0ID0ge1xuXHRcdHRpdGxlOiAnTG9naW4gRm9ybScsXG5cdFx0dHlwZTogJ29iamVjdCcsXG5cdFx0cHJvcGVydGllczoge1xuXHRcdFx0dGl0bGU6IHtcblx0XHRcdFx0dHlwZTogJ3N0cmluZycsXG5cdFx0XHRcdHRhZzogJ2Jvc3N5LWxhYmVsJyxcblx0XHRcdFx0dGl0bGU6ICdMb2dpbiB0byBlbnRlcicsXG5cdFx0XHR9LFxuXHRcdFx0dGVybXM6IHtcblx0XHRcdFx0dHlwZTogJ2Jvb2xlYW4nLFxuXHRcdFx0XHR0YWc6ICdib3NzeS1yYWRpbycsXG5cdFx0XHRcdHRpdGxlOiAnQWNjZXB0IHRlcm1zIGFuZCBjb25kaXRpb25zJ1xuXHRcdFx0fSxcblx0XHRcdHVzZXJuYW1lOiB7XG5cdFx0XHRcdHR5cGU6ICdzdHJpbmcnLFxuXHRcdFx0XHR0YWc6ICdib3NzeS1pbnB1dC10ZXh0Jyxcblx0XHRcdFx0dGl0bGU6ICdVc2VybmFtZSdcblx0XHRcdH0sXG5cdFx0XHRnZW5kZXI6IHtcblx0XHRcdFx0dGl0bGU6ICdHZW5kZXInLFxuXHRcdFx0XHR0eXBlOiAnc3RyaW5nJyxcblx0XHRcdFx0ZW51bTogWydmZW1hbGUnLCAnbWFsZSddXG5cdFx0XHR9XG5cdFx0fSxcblx0XHRyZXF1aXJlZDogWyd0ZXJtcycsICdnZW5kZXInLCAndXNlcm5hbWUnXVxuXHR9O1xuXG5cdGl0KCdnZXRTY2hlbWEgc2hvdWxkIHJldHVybiB2YWxpZCBkYXRhJyxmdW5jdGlvbigpe1xuXHRcdHZhciB4ID0gc2NoZW1hU2VydmljZS5nZXRTY2hlbWEoaW5wdXQpO1xuXHRcdHJvb3RTY29wZS4kYXBwbHkoKTtcblx0XHRleHBlY3Qoc2NoZW1hU2VydmljZS5nZXRTY2hlbWEpLnRvSGF2ZUJlZW5DYWxsZWRXaXRoKGlucHV0KTtcblx0XHRleHBlY3QoeCkudG9NYXRjaChpbnB1dCk7XG5cdH0pO1xufSk7Il0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9