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
			initDate = new Date(),
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
					// fix for DST oddness
					if (_thisDate.getHours() === 23) {
						_thisDate = (new Date(_thisDate.getTime() + universal.HOUR));
					} else if (_thisDate.getHours() === 1) {
						_thisDate = (new Date(_thisDate.getTime() - universal.HOUR));
					}
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImJvc3N5LmpzIiwiYm9zc3kuY2FsZW5kYXIuanMiLCJib3NzeS5kYXRhLmpzIiwiYm9zc3kuZHJvcGRvd24uanMiLCJib3NzeS5mb3JtLmpzIiwiYm9zc3kuaW5wdXQuanMiLCJib3NzeS5wYmRyb3Bkb3duLmpzIiwiYm9zc3kuc2NoZW1hLmpzIiwiYm9zc3kuc2xpZGVyLmpzIiwiYm9zc3kudG9vbHRpcC5qcyIsImluZGV4LmpzIiwia2FybWEuY29uZi5qcyIsImRpcmVjdGl2ZXMvYm9zc3kuaW5wdXQuc3BlYy5qcyIsImRpcmVjdGl2ZXMvYm9zc3kuc2NoZW1hLnNwZWMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNyQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDcEhBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQzNEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQzdDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDbElBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ2pCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3pEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQzFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUN4REE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUM3Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ0pBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ2hGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDdEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJib3NzeS5hbGwuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiFcbiAqIGJvc3N5LmpzXG4gKi9cblxuLyohXG4gKiBodHRwOi8vQm9zc3lVSS5jb20vXG4gKlxuICogQm9zc3lVSSAtIENyZWF0ZWQgd2l0aCBMT1ZFIGJ5IEJ1aWxkLmNvbSBPcGVuIFNvdXJjZSBDb25zb3J0aXVtXG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlLiBQbGVhc2Ugc2VlIExJQ0VOU0UgZm9yIG1vcmUgaW5mb3JtYXRpb24uXG4gKlxuICovXG5cbi8vVE9ETzogbmVlZCBsYXlvdXQsIGxhYmVsc1xudmFyIGJvc3N5ID0gYW5ndWxhci5tb2R1bGUoJ2Jvc3N5JywgW1xuICAgICAgICAnYm9zc3kuZGF0YScsXG4gICAgICAgICdib3NzeS5zY2hlbWEnLFxuICAgICAgICAnYm9zc3kuZm9ybScsXG4gICAgICAgICdib3NzeS5pbnB1dCdcbiAgICBdXG4pO1xuIiwiYW5ndWxhci5tb2R1bGUoJ2Jvc3N5LmNhbGVuZGFyJywgW10pXG5cdC5jb250cm9sbGVyKCdDYWxlbmRhckNvbnRyb2xsZXInLCBbJyRzY29wZScsICckZmlsdGVyJywgZnVuY3Rpb24gKCRzY29wZSwgJGZpbHRlcikge1xuXG5cdFx0dmFyIF9tb250aE1hcHMgPSB7fSxcblx0XHRcdGluaXREYXRlID0gbmV3IERhdGUoKSxcblx0XHRcdHVuaXZlcnNhbCA9IHtcblx0XHRcdFx0REFZOiAyNCAqIDYwICogNjAgKiAxMDAwLFxuXHRcdFx0XHRIT1VSOiA2MCAqIDYwICogMTAwMFxuXHRcdFx0fTtcblxuXHRcdCRzY29wZS5kYXlzID0gW1xuXHRcdFx0J1N1bmRheScsXG5cdFx0XHQnTW9uZGF5Jyxcblx0XHRcdCdUdWVzZGF5Jyxcblx0XHRcdCdXZWRuZXNkYXknLFxuXHRcdFx0J1RodXJzZGF5Jyxcblx0XHRcdCdGcmlkYXknLFxuXHRcdFx0J1NhdHVyZGF5J1xuXHRcdF07XG5cdFx0JHNjb3BlLm1vbnRocyA9IFtcblx0XHRcdCdKYW51YXJ5Jyxcblx0XHRcdCdGZWJydWFyeScsXG5cdFx0XHQnTWFyY2gnLFxuXHRcdFx0J0FwcmlsJyxcblx0XHRcdCdNYXknLFxuXHRcdFx0J0p1bmUnLFxuXHRcdFx0J0p1bHknLFxuXHRcdFx0J0F1Z3VzdCcsXG5cdFx0XHQnU2VwdGVtYmVyJyxcblx0XHRcdCdPY3RvYmVyJyxcblx0XHRcdCdOb3ZlbWJlcicsXG5cdFx0XHQnRGVjZW1iZXInXG5cdFx0XTtcblxuXHRcdGZ1bmN0aW9uIF9nZXRUaW1lT2JqZWN0KGRhdGUpIHtcblx0XHRcdHJldHVybiB7XG5cdFx0XHRcdGZ1bGw6IGRhdGUsXG5cdFx0XHRcdHllYXI6IGRhdGUuZ2V0RnVsbFllYXIoKSxcblx0XHRcdFx0bW9udGhOYW1lOiBfZ2V0TW9udGhOYW1lKGRhdGUuZ2V0TW9udGgoKSksXG5cdFx0XHRcdG1vbnRoOiBkYXRlLmdldE1vbnRoKCksXG5cdFx0XHRcdGRheTogX2dldERheShkYXRlKSxcblx0XHRcdFx0ZGF0ZTogZGF0ZS5nZXREYXRlKCksXG5cdFx0XHRcdHRpbWU6IGRhdGUuZ2V0VGltZSgpXG5cdFx0XHR9O1xuXHRcdH1cblxuXHRcdGZ1bmN0aW9uIF9zZXRTZWxlY3RlZERhdGUoZGF0ZSkge1xuXHRcdFx0JHNjb3BlLnNlbGVjdGVkID0gX2dldFRpbWVPYmplY3QoZGF0ZSk7XG5cdFx0fVxuXG5cdFx0ZnVuY3Rpb24gX3NldEN1cnJlbnRNb250aEFuZFllYXIobW9udGgsIHllYXIpIHtcblx0XHRcdHZhciBkYXRlID0gbmV3IERhdGUoeWVhciAhPT0gdW5kZWZpbmVkID8geWVhciA6ICRzY29wZS5zZWxlY3RlZC55ZWFyLCBtb250aCAhPT0gdW5kZWZpbmVkID8gbW9udGggOiAkc2NvcGUuc2VsZWN0ZWQubW9udGgsIDEpO1xuXHRcdFx0JHNjb3BlLmN1cnJlbnQgPSBfZ2V0VGltZU9iamVjdChkYXRlKTtcblx0XHR9XG5cblx0XHRmdW5jdGlvbiBfZ2V0TW9udGhOYW1lKG1vbnRoKSB7XG5cdFx0XHRyZXR1cm4gJHNjb3BlLm1vbnRoc1ttb250aF07XG5cdFx0fVxuXG5cdFx0ZnVuY3Rpb24gX2dldERheShkYXRlKSB7XG5cdFx0XHRyZXR1cm4gJHNjb3BlLmRheXNbZGF0ZS5nZXREYXkoKV07XG5cdFx0fVxuXG5cdFx0JHNjb3BlLnByZXZpb3VzTW9udGggPSBmdW5jdGlvbigpIHtcblx0XHRcdHZhciBkYXRlID0gbmV3IERhdGUoJHNjb3BlLmN1cnJlbnQueWVhciwgKCRzY29wZS5jdXJyZW50Lm1vbnRoIC0gMSksIDEpO1xuXHRcdFx0X3NldEN1cnJlbnRNb250aEFuZFllYXIoZGF0ZS5nZXRNb250aCgpLCBkYXRlLmdldEZ1bGxZZWFyKCkpO1xuXHRcdFx0JHNjb3BlLnVwZGF0ZURhdGVNYXAoKTtcblx0XHR9O1xuXG5cdFx0JHNjb3BlLm5leHRNb250aCA9IGZ1bmN0aW9uKCkge1xuXHRcdFx0dmFyIGRhdGUgPSBuZXcgRGF0ZSgkc2NvcGUuY3VycmVudC55ZWFyLCAoJHNjb3BlLmN1cnJlbnQubW9udGggKyAxKSwgMSk7XG5cdFx0XHRfc2V0Q3VycmVudE1vbnRoQW5kWWVhcihkYXRlLmdldE1vbnRoKCksIGRhdGUuZ2V0RnVsbFllYXIoKSk7XG5cdFx0XHQkc2NvcGUudXBkYXRlRGF0ZU1hcCgpO1xuXHRcdH07XG5cblx0XHQkc2NvcGUuc2VsZWN0RGF0ZSA9IGZ1bmN0aW9uKGRhdGUpIHt9O1xuXG5cdFx0JHNjb3BlLnVwZGF0ZURhdGVNYXAgPSBmdW5jdGlvbigpIHtcblx0XHRcdHZhciBmaXJzdFdlZWtEYXkgPSBuZXcgRGF0ZSgkc2NvcGUuY3VycmVudC50aW1lIC0gKCRzY29wZS5jdXJyZW50LmZ1bGwuZ2V0RGF5KCkgKiB1bml2ZXJzYWwuREFZKSksXG5cdFx0XHRcdGlzTW9udGhDb21wbGV0ZSA9IGZhbHNlO1xuXHRcdFx0XHQkc2NvcGUuZGF0ZU1hcCA9IFtdO1xuXG5cdFx0XHR3aGlsZSAoIWlzTW9udGhDb21wbGV0ZSkge1xuXHRcdFx0XHR2YXIgd2VlayA9IFtdO1xuXHRcdFx0XHRpZiAoJHNjb3BlLmRhdGVNYXAubGVuZ3RoID09PSA1KSB7XG5cdFx0XHRcdFx0aXNNb250aENvbXBsZXRlID0gdHJ1ZTtcblx0XHRcdFx0fVxuXHRcdFx0XHRmb3IgKHZhciB3ZWVrRGF5ID0gMDsgd2Vla0RheSA8IDc7IHdlZWtEYXkrKykge1xuXHRcdFx0XHRcdHZhciBfdGhpc0RhdGUgPSAobmV3IERhdGUoZmlyc3RXZWVrRGF5LmdldFRpbWUoKSArICh3ZWVrRGF5ICogdW5pdmVyc2FsLkRBWSkpKTtcblx0XHRcdFx0XHQvLyBmaXggZm9yIERTVCBvZGRuZXNzXG5cdFx0XHRcdFx0aWYgKF90aGlzRGF0ZS5nZXRIb3VycygpID09PSAyMykge1xuXHRcdFx0XHRcdFx0X3RoaXNEYXRlID0gKG5ldyBEYXRlKF90aGlzRGF0ZS5nZXRUaW1lKCkgKyB1bml2ZXJzYWwuSE9VUikpO1xuXHRcdFx0XHRcdH0gZWxzZSBpZiAoX3RoaXNEYXRlLmdldEhvdXJzKCkgPT09IDEpIHtcblx0XHRcdFx0XHRcdF90aGlzRGF0ZSA9IChuZXcgRGF0ZShfdGhpc0RhdGUuZ2V0VGltZSgpIC0gdW5pdmVyc2FsLkhPVVIpKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0d2Vlay5wdXNoKHtcblx0XHRcdFx0XHRcdGRhdGU6IF90aGlzRGF0ZS5nZXREYXRlKCksXG5cdFx0XHRcdFx0XHRib2xkOiBfdGhpc0RhdGUuZ2V0TW9udGgoKSA9PT0gJHNjb3BlLmN1cnJlbnQuZnVsbC5nZXRNb250aCgpXG5cdFx0XHRcdFx0fSk7XG5cdFx0XHRcdH1cblx0XHRcdFx0Zmlyc3RXZWVrRGF5ID0gbmV3IERhdGUoZmlyc3RXZWVrRGF5LmdldFRpbWUoKSArICg3ICogdW5pdmVyc2FsLkRBWSkpO1xuXHRcdFx0XHQkc2NvcGUuZGF0ZU1hcC5wdXNoKHdlZWspO1xuXHRcdFx0fVxuXHRcdH07XG5cblx0XHQvLyBpbml0IHRvIGN1cnJlbnQgZGF0ZVxuXHRcdF9zZXRTZWxlY3RlZERhdGUoaW5pdERhdGUpO1xuXHRcdF9zZXRDdXJyZW50TW9udGhBbmRZZWFyKCk7XG5cdFx0JHNjb3BlLnVwZGF0ZURhdGVNYXAoKTtcblxuXHR9XSkuZGlyZWN0aXZlKCdib3NzeUNhbGVuZGFyJywgW2Z1bmN0aW9uICgpIHtcblx0XHRyZXR1cm4ge1xuXHRcdFx0cmVzdHJpY3Q6ICdBRScsXG5cdFx0XHR0ZW1wbGF0ZTogJzx0YWJsZT48dHI+PHRkIG5nLWNsaWNrPVwicHJldmlvdXNNb250aCgpXCI+Jmx0OzwvdGQ+PHRkIGNvbHNwYW49XCI1XCI+e3tjdXJyZW50Lm1vbnRoTmFtZX19IHt7Y3VycmVudC55ZWFyfX08L3RkPjx0ZCBuZy1jbGljaz1cIm5leHRNb250aCgpXCI+Jmd0OzwvdGQ+PC90cj48dGQgbmctcmVwZWF0PVwiZGF5IGluIGRheXNcIiB0aXRsZT1cInt7ZGF5fX1cIj57e2RheSB8IGxpbWl0VG8gOiAyfX08L3RkPjx0ciBuZy1yZXBlYXQ9XCJ3ZWVrIGluIGRhdGVNYXBcIj48dGQgbmctcmVwZWF0PVwiY3VycmVudCBpbiB3ZWVrXCIgbmctY2xpY2s9XCJzZWxlY3REYXRlKGN1cnJlbnQuZGF0ZSlcIj48YiBuZy1pZj1cImN1cnJlbnQuYm9sZFwiPnt7Y3VycmVudC5kYXRlfX08L2I+PHNwYW4gbmctaWY9XCIhY3VycmVudC5ib2xkXCI+e3tjdXJyZW50LmRhdGV9fTwvc3Bhbj48L3RkPjwvdHI+PHRyPjx0ZCBjb2xzcGFuPVwiN1wiPnt7c2VsZWN0ZWQuZGF5fX0sIHt7c2VsZWN0ZWQubW9udGhOYW1lfX0ge3tzZWxlY3RlZC5kYXRlfX0sIHt7c2VsZWN0ZWQueWVhcn19PC90ZD48L3RyPjwvdGFibGU+Jyxcblx0XHRcdGNvbnRyb2xsZXI6ICdDYWxlbmRhckNvbnRyb2xsZXInXG5cdFx0fTtcblx0fV0pOyIsImFuZ3VsYXIubW9kdWxlKCdib3NzeS5kYXRhJywgW10pXG4vKipcbkBuZ2RvYyBzZXJ2aWNlXG5AbmFtZSAkZGF0YVxuQHJlcXVpcmVzICRxXG5AcmVxdWlyZXMgJGh0dHBcblxuKi9cbiAgICAuZmFjdG9yeSgnJGRhdGEnLCBbJyRxJywnJGh0dHAnLGZ1bmN0aW9uICgkcSwkaHR0cCkge1xuXG4gICAgICAgIGZ1bmN0aW9uIF9nZXREYXRhIChkYXRhKSB7XG4gICAgICAgICAgICBpZiAoYW5ndWxhci5pc1N0cmluZyhkYXRhKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBfZ2V0UmVtb3RlRGF0YShkYXRhKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKGFuZ3VsYXIuaXNPYmplY3QoZGF0YSkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZGF0YTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKGFuZ3VsYXIuaXNGdW5jdGlvbihkYXRhKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBfZ2V0RGF0YSggZGF0YS5jYWxsKCRzY29wZSkgKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIC8vVE9ETzogcmVwbGFjZSBlcnJvciBtZXNzYWdlIHdpdGggb25saW5lIGRvYyBsaW5rIGxpa2UgbmcgZXJyb3JzXG4gICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcignZGlyZWN0aXZlLmJvc3N5Rm9ybTogbm8gZGF0YSB1cmwgb3Igb2JqZWN0IGdpdmVuJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBmdW5jdGlvbiBfZ2V0UmVtb3RlRGF0YShkYXRhKSB7XG4gICAgICAgICAgICB2YXIgZGVmZXJyZWQgPSAkcS5kZWZlcigpO1xuXG4gICAgICAgICAgICAkaHR0cC5nZXQoIGRhdGEsIHsgcmVzcG9uc2VUeXBlOiAnanNvbicgfSApXG4gICAgICAgICAgICAgICAgLnN1Y2Nlc3MoIGZ1bmN0aW9uKCBkYXRhICkge1xuICAgICAgICAgICAgICAgICAgICBpZiggYW5ndWxhci5pc09iamVjdCggZGF0YSApICkge1xuICAgICAgICAgICAgICAgICAgICAgICAgZGVmZXJyZWQucmVzb2x2ZShkYXRhKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vVE9ETzogcmVwbGFjZSBlcnJvciBtZXNzYWdlIHdpdGggb25saW5lIGRvYyBsaW5rIGxpa2UgbmcgZXJyb3JzXG4gICAgICAgICAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZWplY3QoJ2RpcmVjdGl2ZS5ib3NzeUZvcm06IEdFVCByZXF1ZXN0IHRvIHVybCBkaWQgbm90IHByb2R1Y2UgZGF0YSBvYmplY3QnKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgLmVycm9yKCBmdW5jdGlvbihyZXNwb25zZV9kYXRhLCBzdGF0dXMpIHtcbiAgICAgICAgICAgICAgICAgICAgLy9UT0RPOiByZXBsYWNlIGVycm9yIG1lc3NhZ2Ugd2l0aCBvbmxpbmUgZG9jIGxpbmsgbGlrZSBuZyBlcnJvcnNcbiAgICAgICAgICAgICAgICAgICAgZGVmZXJyZWQucmVqZWN0KCdkaXJlY3RpdmUuYm9zc3lGb3JtOiBHRVQgcmVxdWVzdCB0byB1cmwgXCInICsgZGF0YSArICdcIiBmYWlsZWQgd2l0aCBzdGF0dXMgXCInICsgc3RhdHVzICsgJ1wiJyk7XG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIHJldHVybiBkZWZlcnJlZC5wcm9taXNlO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgQG5nZG9jIG1ldGhvZFxuICAgICAgICAgICAgQG5hbWUgZ2V0RGF0YVxuICAgICAgICAgICAgQG1ldGhvZE9mICRkYXRhXG4gICAgICAgICAgICBAcGFyYW0ge3N0cmluZyxvYmplY3QsZnVuY3Rpb259IGRhdGEgSWYgZGF0YSBpcyBhIHN0cmluZywgaXQgd2lsbCBiZSB0cmVhdGVkIGFzIGEgdXJsIHRvIHJldHJpZXZlIGRhdGEgZnJvbS4gSWYgZGF0YSBpcyBhbiBvYmplY3QgaXQgd2lsbCBiZSBpbW1lZGlhdGVseSByZXR1cm5lZC4gSWYgZGF0YSBpcyBhIGZ1bmN0aW9uLCB0aGUgZnVuY3Rpb24gd2lsbCBiZSBjYWxsZWQgYW5kIHByb2Nlc3NlZCB1bnRpbCBhbiBvYmplY3QgaXMgcHJvZHVjZWRcbiAgICAgICAgICAgIEByZXR1cm5zIHtPYmplY3R9IEVpdGhlciBhICRxIHByb21pc2UsIGEgZGF0YSBvYmplY3Qgb3IgYSBzdHJpbmcuXG4gICAgICAgICAgICAqL1xuICAgICAgICAgICAgZ2V0RGF0YTogX2dldERhdGFcbiAgICAgICAgfTtcbiAgICB9XSlcbjtcbiIsImFuZ3VsYXIubW9kdWxlKCdib3NzeS5kcm9wZG93bicsIFtdKVxuXHQucnVuKGZ1bmN0aW9uKCR0ZW1wbGF0ZUNhY2hlKSB7XG5cdFx0JHRlbXBsYXRlQ2FjaGUucHV0KCdqYXNtaW5lVGVzdC5odG1sJywgJ2phc21pbmVUZXN0Lmh0bWwnKTtcblx0fSlcblx0XG5cdC5mYWN0b3J5KCdib3NzeURyb3Bkb3duRmFjdG9yeScsIGZ1bmN0aW9uKCRodHRwIC8qJGRhdGEqLykge1xuXHRcdHZhciBwcm9taXNlID0gJGh0dHAuZ2V0KCdodHRwczovL2dpc3QuZ2l0aHVidXNlcmNvbnRlbnQuY29tL21zaGFmcmlyLzI2NDY3NjMvcmF3L2JmYjM1ZjE3YmM1ZDVmODZlYzBmMTBiODBmN2I4MGU4MjNlOTE5N2Yvc3RhdGVzX3RpdGxlY2FzZS5qc29uJyk7XG5cdFx0cmV0dXJuIHByb21pc2U7XG5cdH0pXG5cdFxuXHQuZGlyZWN0aXZlKCdib3NzeURyb3Bkb3duJywgZnVuY3Rpb24oJGNvbXBpbGUsICRodHRwIC8qJGRhdGEsKi8gLyokc2NoZW1hKi8pIHtcblx0XHRyZXR1cm4ge1xuXHRcdFx0cmVzdHJpY3Q6ICdFQScsXG5cdFx0XHRyZXBsYWNlOiB0cnVlLFxuXHRcdFx0dGVtcGxhdGVVcmw6ICdib3NzeS5kcm9wZG93bi5odG1sJyxcblx0XHRcdGNvbnRyb2xsZXI6IGZ1bmN0aW9uKCRzY29wZSwgYm9zc3lEcm9wZG93bkZhY3RvcnkpIHtcblx0XHRcdFx0JHNjb3BlLmNvbnRlbnRzID0gW107XG5cblx0XHRcdFx0Ym9zc3lEcm9wZG93bkZhY3Rvcnlcblx0XHRcdFx0XHQuc3VjY2VzcyhmdW5jdGlvbihkYXRhKXtcblx0XHRcdFx0XHRcdCRzY29wZS5jb250ZW50cyA9IGRhdGE7XG5cdFx0XHRcdFx0fSlcblx0XHRcdFx0XHQuZXJyb3IoZnVuY3Rpb24oZGF0YSkge1xuXHRcdFx0XHRcdFx0Y29uc29sZS5sb2coXCJodHRwLmdldCBGQUlMRURcIik7XG5cdFx0XHRcdFx0XHQkc2NvcGUuY29udGVudHMgPSBkYXRhIHx8IFwiUmVxdWVzdCBmYWlsZWRcIjtcblx0XHRcdFx0XHR9KTtcblx0XHRcdH0sXG5cdFx0XHRjb250cm9sbGVyQXM6IFwiZHJvcHNcIlx0XHRcblx0XHR9O1xuXHR9KVxuXHRcblx0LmNvbnRyb2xsZXIoJ2Jvc3N5RHJvcGRvd25DdHJsJywgZnVuY3Rpb24oJGh0dHAsIGJvc3N5RHJvcGRvd25GYWN0b3J5LCAkc2NvcGUgLyokZGF0YSwqLyAvKiRzY2hlbWEqLykge1xuXHRcdCRzY29wZS5pdGVtcyA9IFtdO1xuXHRcdFxuXHRcdGJvc3N5RHJvcGRvd25GYWN0b3J5XG5cdFx0XHQuc3VjY2VzcyhmdW5jdGlvbihkYXRhKXtcblx0XHRcdFx0JHNjb3BlLml0ZW1zID0gZGF0YTtcblx0XHRcdH0pXG5cdFx0XHQuZXJyb3IoZnVuY3Rpb24oZGF0YSkge1xuXHRcdFx0XHRjb25zb2xlLmxvZyhcImh0dHAuZ2V0IEZBSUxFRFwiKTtcblx0XHRcdFx0JHNjb3BlLml0ZW1zID0gZGF0YSB8fCBcIlJlcXVlc3QgZmFpbGVkXCI7XG5cdFx0XHR9KVxuXHR9KVxuXHRcblx0XG4iLCJhbmd1bGFyLm1vZHVsZSgnYm9zc3kuZm9ybScsIFtdKVxuICAgIC5ydW4oZnVuY3Rpb24oJHRlbXBsYXRlQ2FjaGUpe1xuICAgICAgICAkdGVtcGxhdGVDYWNoZS5wdXQoJ2Jvc3N5LWlucHV0Lmh0bWwnLCAndGVtcGxhdGVzL2Jvc3N5LWlucHV0Lmh0bWwnKTtcbiAgICB9KVxuICAgIC5kaXJlY3RpdmUoJ2Jvc3N5Rm9ybScsWyckY29tcGlsZScsJyRodHRwJywnJHNjaGVtYScsJyRkYXRhJywgZnVuY3Rpb24gKCRjb21waWxlLCAkaHR0cCwgJHNjaGVtYSwgJGRhdGEpIHtcbiAgICAgICAgdmFyIF9zY2hlbWEsXG4gICAgICAgICAgICBfZGF0YSxcbiAgICAgICAgICAgIF9vcHRpb25zID0ge1xuICAgICAgICAgICAgICAgIHNob3dMYWJlbHM6IHRydWUsXG4gICAgICAgICAgICAgICAgaGVhZGVyOiAnVGhpcyBpcyBoZWFkZXInLFxuICAgICAgICAgICAgICAgIGZvb3RlcjogJ1RoaXMgaXMgZm9vdGVyJyxcbiAgICAgICAgICAgICAgICB0aGVtZTogJ2dyZWVuJyxcbiAgICAgICAgICAgICAgICBidXR0b246ICdTYXZlJ1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIF9pdGVtVGVtcGxhdGUgPSB7XG4gICAgICAgICAgICAgICAgbnVtYmVyOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAnPGlucHV0IHR5cGU9XCJudW1iZXJcIi8+JztcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHRleHQ6IGZ1bmN0aW9uIChvYmosIGtleSwgaXNfcmVxdWlyZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuICc8Ym9zc3ktaW5wdXQgdGl0bGU9XCJcXCcnK29iai50aXRsZSsnXFwnXCIgdHlwZT1cIlxcJycrIG9iai5pbnB1dF90eXBlICsnXFwnXCIgdmFsdWU9XCJcXCcnK19kYXRhLmFkZHJlc3Nba2V5XSsnXFwnXCInICsgKCBpc19yZXF1aXJlZCA/ICcgcmVxdWlyZWQnIDogJycgKSArICc+PC9ib3NzeS1pbnB1dD4nO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgdGV4dEFyZWE6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuICc8dGV4dGFyZWE+PC90ZXh0YXJlYT4nO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgY2hlY2tib3g6IGZ1bmN0aW9uKG9iail7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAnPGRpdiBjbGFzcz1cImNoZWNrYm94XCI+PGxhYmVsPjxpbnB1dCB0eXBlPVwiY2hlY2tib3hcIj4nK29iai50aXRsZSsnPC9sYWJlbD48L2Rpdj4nO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgZnVuY3Rpb24gc2V0RGF0YShkYXRhKSB7XG4gICAgICAgICAgICB2YXIgcmVzdWx0ID0gJGRhdGEuZ2V0RGF0YShkYXRhKTtcbiAgICAgICAgICAgIGlmKCBhbmd1bGFyLmlzRnVuY3Rpb24oIHJlc3VsdC50aGVuICkgJiYgYW5ndWxhci5pc0Z1bmN0aW9uKCByZXN1bHQuY2F0Y2ggKSAmJiBhbmd1bGFyLmlzRnVuY3Rpb24oIHJlc3VsdC5maW5hbGx5ICkgKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgX2RhdGEgPSByZXN1bHQ7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfVxuXG4gICAgICAgIGZ1bmN0aW9uIHNldFNjaGVtYShzY2hlbWEpIHtcbiAgICAgICAgICAgIF9zY2hlbWEgPSAkc2NoZW1hLmdldFNjaGVtYShzY2hlbWEpO1xuICAgICAgICB9XG5cbiAgICAgICAgZnVuY3Rpb24gYnVpbGRUZW1wbGF0ZShzY2hlbWFQYXJ0LCBwYXJlbnRLZXksIHJlcXVpcmVkKSB7XG4gICAgICAgICAgICB2YXIgdGVtcGxhdGUgPSAnJyxcbiAgICAgICAgICAgICAgICBmdWxsS2V5ID0gJyc7XG4gICAgICAgICAgICBhbmd1bGFyLmZvckVhY2goc2NoZW1hUGFydCwgZnVuY3Rpb24odmFsdWUsIGtleSkge1xuICAgICAgICAgICAgICAgIGlmICh2YWx1ZS50eXBlKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGZ1bGxLZXkgKyAnIGlzICcrIHZhbHVlLnR5cGUpO1xuICAgICAgICAgICAgICAgICAgICBzd2l0Y2ggKHZhbHVlLnR5cGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ29iamVjdCc6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHJlcXVpcmVkX2xpc3QgPSB0eXBlb2YoIHZhbHVlLnJlcXVpcmVkICkgIT09ICd1bmRlZmluZWQnID8gdmFsdWUucmVxdWlyZWQgOiBudWxsO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlICs9IGJ1aWxkVGVtcGxhdGUodmFsdWUucHJvcGVydGllcywgZnVsbEtleSwgcmVxdWlyZWRfbGlzdCApO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAnYXJyYXknOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlICs9IGJ1aWxkVGVtcGxhdGUodmFsdWUuaXRlbXMucHJvcGVydGllcywgZnVsbEtleSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlICdudW1iZXInIHx8ICdpbnRlZ2VyJzpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0ZW1wbGF0ZSArPSBfaXRlbVRlbXBsYXRlLm51bWJlcih2YWx1ZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlICdzdHJpbmcnOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBpc19yZXF1aXJlZCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKCByZXF1aXJlZCAmJiByZXF1aXJlZC5pbmRleE9mKGtleSkgIT09IC0xICkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpc19yZXF1aXJlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlICs9IF9pdGVtVGVtcGxhdGUudGV4dCh2YWx1ZSwga2V5LCBpc19yZXF1aXJlZCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlICdib29sZWFuJzpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0ZW1wbGF0ZSArPSBfaXRlbVRlbXBsYXRlLmNoZWNrYm94KHZhbHVlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sIHRoaXMpO1xuICAgICAgICAgICAgcmV0dXJuIHRlbXBsYXRlO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHJlc3RyaWN0OiAnRScsXG4gICAgICAgICAgICByZXBsYWNlOiB0cnVlLFxuICAgICAgICAgICAgdGVtcGxhdGU6ICcnLFxuICAgICAgICAgICAgc2NvcGU6IHtcbiAgICAgICAgICAgICAgICBjb25maWc6Jz0nLCAvL0NyZWF0ZSBzY29wZSBpc29sYXRpb24gd2l0aCBiaS1kaXJlY3Rpb25hbCBiaW5kaW5nLFxuICAgICAgICAgICAgICAgIHRpdGxlOiAnPSdcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBsaW5rOiBmdW5jdGlvbiAoc2NvcGUsIGVsZW1lbnQsIGF0dHJpYnV0ZXMpIHtcbiAgICAgICAgICAgICAgICBzY29wZS5jb25maWcub3B0aW9ucyA9IGFuZ3VsYXIuZXh0ZW5kKF9vcHRpb25zLCBzY29wZS5jb25maWcub3B0aW9ucyk7XG5cbiAgICAgICAgICAgICAgICB2YXIgcHJvbWlzZSA9IHNldERhdGEoc2NvcGUuY29uZmlnLmRhdGEpO1xuICAgICAgICAgICAgICAgIHNldFNjaGVtYShzY29wZS5jb25maWcuc2NoZW1hKTtcbiAgICAgICAgICAgICAgICBpZiggcHJvbWlzZSApIHtcbiAgICAgICAgICAgICAgICAgICAgLy90b2RvOiBzZXQgZGlyZWN0aXZlIHRvIGxvYWRpbmcgc3RhdGVcbiAgICAgICAgICAgICAgICAgICAgcHJvbWlzZS50aGVuKFxuICAgICAgICAgICAgICAgICAgICAgICAgZnVuY3Rpb24ocmVzdWx0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy90b2RvOiBzZXQgZGlyZWN0aXZlIHRvIGxvYWRlZCBzdGF0ZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9kYXRhID0gcmVzdWx0O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsZW1lbnQuaHRtbChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJzxmb3JtIG5vdmFsaWRhdGUgY2xhc3M9XCJ7e2NvbmZpZy5vcHRpb25zLnRoZW1lfX1cIj4nK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnPGRpdiBjbGFzcz1cImJhbm5lciBwYWdlLWhlYWRlclwiPjxoMz57e2NvbmZpZy5vcHRpb25zLmhlYWRlcn19PC9oMz48L2Rpdj4nK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnVpbGRUZW1wbGF0ZShfc2NoZW1hKSArXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnPGJ1dHRvbiBuZy1pZj1cImNvbmZpZy5vcHRpb25zLmJ1dHRvblwiPnt7Y29uZmlnLm9wdGlvbnMuYnV0dG9ufX08L2J1dHRvbj4nICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJzxkaXYgY2xhc3M9XCJwYWdlLWZvb3RlclwiPjxoMz57e2NvbmZpZy5vcHRpb25zLmZvb3Rlcn19PC9oMz48L2Rpdj4nK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnPC9mb3JtPidcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICRjb21waWxlKGVsZW1lbnQuY29udGVudHMoKSkoc2NvcGUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGZ1bmN0aW9uKHJlYXNvbikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vdG9kbzogc2V0IGRpcmVjdGl2ZSB0byBlcnJvciBzdGF0ZVxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIGVsZW1lbnQuaHRtbChcbiAgICAgICAgICAgICAgICAgICAgICAgICc8Zm9ybSBub3ZhbGlkYXRlIGNsYXNzPVwie3tjb25maWcub3B0aW9ucy50aGVtZX19XCI+TE9BRElORy4uLjwvZm9ybT4nXG4gICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgICAgICRjb21waWxlKGVsZW1lbnQuY29udGVudHMoKSkoc2NvcGUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgZWxlbWVudC5odG1sKFxuICAgICAgICAgICAgICAgICAgICAgICAgJzxmb3JtIG5vdmFsaWRhdGUgY2xhc3M9XCJ7e2NvbmZpZy5vcHRpb25zLnRoZW1lfX1cIj4nK1xuICAgICAgICAgICAgICAgICAgICAgICAgJzxkaXYgY2xhc3M9XCJiYW5uZXIgcGFnZS1oZWFkZXJcIj48aDM+e3tjb25maWcub3B0aW9ucy5oZWFkZXJ9fTwvaDM+PC9kaXY+JytcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBidWlsZFRlbXBsYXRlKF9zY2hlbWEpICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAnPGJ1dHRvbiBuZy1pZj1cImNvbmZpZy5vcHRpb25zLmJ1dHRvblwiPnt7Y29uZmlnLm9wdGlvbnMuYnV0dG9ufX08L2J1dHRvbj4nICtcbiAgICAgICAgICAgICAgICAgICAgICAgICc8ZGl2IGNsYXNzPVwicGFnZS1mb290ZXJcIj48aDM+e3tjb25maWcub3B0aW9ucy5mb290ZXJ9fTwvaDM+PC9kaXY+JytcbiAgICAgICAgICAgICAgICAgICAgICAgICc8L2Zvcm0+J1xuICAgICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgICAgICAkY29tcGlsZShlbGVtZW50LmNvbnRlbnRzKCkpKHNjb3BlKTtcbiAgICAgICAgICAgICAgICB9XG5cblxuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuXG4gICAgfV0pXG47IiwiYW5ndWxhci5tb2R1bGUoJ2Jvc3N5LmlucHV0JywgW10pXG4gICAgLnJ1bihmdW5jdGlvbigkdGVtcGxhdGVDYWNoZSl7XG4gICAgICAgICR0ZW1wbGF0ZUNhY2hlLnB1dCgnYm9zc3ktaW5wdXQuaHRtbCcsICc8ZGl2IGNsYXNzPVwiZm9ybS1ncm91cCBib3NzeS1pbnB1dFwiPjxsYWJlbCBmb3I9XCJcIj57e3RpdGxlfX08L2xhYmVsPjxpbnB1dCB0eXBlPVwie3t0eXBlfX1cIiBjbGFzcz1cImZvcm0tY29udHJvbFwiIHBsYWNlaG9sZGVyPVwiXCIgdmFsdWU9XCJ7e3ZhbHVlfX1cIi8+PHNwYW4+PC9zcGFuPjwvZGl2PicpO1xuICAgIH0pXG4gICAgLmRpcmVjdGl2ZSgnYm9zc3lJbnB1dCcsWyckY29tcGlsZScsJyRodHRwJywnJHNjaGVtYScsJyRkYXRhJywnJHRlbXBsYXRlQ2FjaGUnLCBmdW5jdGlvbiAoJGNvbXBpbGUsICRodHRwLCAkc2NoZW1hLCAkZGF0YSwgJHRlbXBsYXRlQ2FjaGUpIHtcbiAgICBcdHJldHVybiB7XG5cdFx0XHRyZXN0cmljdDogJ0UnLFxuXHRcdFx0cmVwbGFjZTogdHJ1ZSxcblx0XHRcdHNjb3BlOiB7XG5cdFx0XHRcdHRpdGxlOiAnPScsXG5cdFx0XHRcdHZhbHVlOiAnPScsXG5cdFx0XHRcdHR5cGU6ICc9Jyxcblx0XHRcdFx0cmVxdWlyZWQ6ICc9J1xuXHRcdFx0fSxcblx0XHRcdHRlbXBsYXRlOiAkdGVtcGxhdGVDYWNoZS5nZXQoJ2Jvc3N5LWlucHV0Lmh0bWwnKVxuXHRcdH07XG4gICAgfV0pO1xuIiwiYW5ndWxhci5tb2R1bGUoJ2Jvc3N5LmRyb3Bkb3duJywgW10pXG4gICAgLnJ1bihmdW5jdGlvbigkdGVtcGxhdGVDYWNoZSkge1xuICAgICAgICAkdGVtcGxhdGVDYWNoZS5wdXQoJ2phc21pbmVUZXN0Lmh0bWwnLCAnamFzbWluZVRlc3QuaHRtbCcpO1xuICAgIH0pXG4gICAgXG4gICAgLyouZmFjdG9yeSgnYm9zc3lEcm9wZG93bkZhY3RvcnknLCBbJyRodHRwJywgZnVuY3Rpb24oJGh0dHApIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIF9vcHRpb25zOiB7XG4gICAgICAgICAgICAgICAgdGl0bGU6ICdkcm9wIHRpdGxlJyxcbiAgICAgICAgICAgICAgICBjb250ZW50OiAncG9wJ1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIC8vICRodHRwLmdldCgnaHR0cHM6Ly9naXN0LmdpdGh1YnVzZXJjb250ZW50LmNvbS9tc2hhZnJpci8yNjQ2NzYzL3Jhdy9iZmIzNWYxN2JjNWQ1Zjg2ZWMwZjEwYjgwZjdiODBlODIzZTkxOTdmL3N0YXRlc190aXRsZWNhc2UuanNvbicpLnN1Y2Nlc3MoZnVuY3Rpb24oZGF0YSl7XG4gICAgICAgICAgICAvLyBfb3B0aW9ucy5jb250ZW50ID0gZGF0YTtcbiAgICAgICAgLy8gfSlcbiAgICB9XSkqL1xuICAgIFxuICAgIC5kaXJlY3RpdmUoJ2Jvc3N5RHJvcGRvd24nLCBmdW5jdGlvbigkY29tcGlsZSwgJGRhdGEvKiwgJHNjaGVtYSovKSB7XG4gICAgICAgIHZhciBfZGF0YTtcbiAgICAgICAgZnVuY3Rpb24gc2V0RGF0YShkYXRhKSB7XG4gICAgICAgICAgICB2YXIgcmVzdWx0ID0gJGRhdGEuZ2V0RGF0YShkYXRhKTtcbiAgICAgICAgICAgIGlmKCBhbmd1bGFyLmlzRnVuY3Rpb24oIHJlc3VsdC50aGVuICkgJiYgYW5ndWxhci5pc0Z1bmN0aW9uKCByZXN1bHQuY2F0Y2ggKSAmJiBhbmd1bGFyLmlzRnVuY3Rpb24oIHJlc3VsdC5maW5hbGx5ICkgKSAvL3tcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlc3VsdCk7Ly9yZXR1cm4gcmVzdWx0O1xuICAgICAgICAgICAgLyp9IGVsc2Uge1xuICAgICAgICAgICAgICAgIF9kYXRhID0gcmVzdWx0O1xuICAgICAgICAgICAgfSovXG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICByZXN0cmljdDogJ0VBJyxcbiAgICAgICAgICAgIHJlcGxhY2U6IHRydWUsXG4gICAgICAgICAgICBzY29wZToge1xuICAgICAgICAgICAgICAgIHNyYzogJ0AnLFxuICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyOiAnPSdcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB0ZW1wbGF0ZTogJycsXG4gICAgICAgICAgICAvL3RlbXBsYXRlVXJsOiAnYm9zc3kuZHJvcGRvd24uaHRtbCcsXG4gICAgICAgICAgICBsaW5rOiBmdW5jdGlvbihzY29wZSwgZWxlbWVudCwgYXR0cnMpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlbGVtZW50KTtcbiAgICAgICAgICAgICAgICB2YXIganNvbiA9IHNldERhdGEoc2NvcGUuc3JjKTtcbiAgICAgICAgICAgICAgICBlbGVtZW50Lmh0bWwoXG4gICAgICAgICAgICAgICAgICAgICc8c2VsZWN0PidcbiAgICAgICAgICAgICAgICAgICAgICAgICsgJzxvcHRpb24gbmctcmVwZWF0PVwiaiBpbiBqc29uXCIgdmFsdWU9XCJ7e2ouY29kZX19XCI+e3tqLm5hbWV9fTwvb3B0aW9uPidcbiAgICAgICAgICAgICAgICAgICAgKyAnPC9zZWxlY3Q+J1xuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgJGNvbXBpbGUoZWxlbWVudC5jb250ZW50cygpKShzY29wZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvKmNvbnRyb2xsZXI6Wyckc2NvcGUnLCAnYm9zc3lEcm9wZG93bkZhY3RvcnknLCBmdW5jdGlvbigkc2NvcGUsIGJvc3N5RHJvcGRvd25GYWN0b3J5KSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX29wdGlvbnMgPSB7XG4gICAgICAgICAgICAgICAgICAgIHRpdGxlOiBib3NzeURyb3Bkb3duRmFjdG9yeS5fb3B0aW9ucy50aXRsZSxcbiAgICAgICAgICAgICAgICAgICAgY29udGVudDogYm9zc3lEcm9wZG93bkZhY3RvcnkuX29wdGlvbnMuY29udGVudFxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9XSxcbiAgICAgICAgICAgIGNvbnRyb2xsZXJBczogXCJkcm9wc1wiKi9cbiAgICAgICAgfTtcbiAgICB9KTsiLCJhbmd1bGFyLm1vZHVsZSgnYm9zc3kuc2NoZW1hJywgW10pXG4gICAgLmZhY3RvcnkoJyRzY2hlbWEnLCBbJyRxJywgJyRodHRwJywgZnVuY3Rpb24gKCRxLCAkaHR0cCkge1xuXG4gICAgICAgIGZ1bmN0aW9uIF9nZXRTY2hlbWEgKHNjaGVtYSkge1xuICAgICAgICAgICAgaWYgKGFuZ3VsYXIuaXNTdHJpbmcoc2NoZW1hKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBfZ2V0UmVtb3RlU2NoZW1hKHNjaGVtYSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChhbmd1bGFyLmlzT2JqZWN0KHNjaGVtYSkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gc2NoZW1hO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgLy9UT0RPOiByZXBsYWNlIGVycm9yIG1lc3NhZ2Ugd2l0aCBvbmxpbmUgZG9jIGxpbmsgbGlrZSBuZyBlcnJvcnNcbiAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKCdkaXJlY3RpdmUuYm9zc3lGb3JtOiBubyBzY2hlbWEgdXJsIG9yIG9iamVjdCBnaXZlbicpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgZnVuY3Rpb24gX2dldFJlbW90ZVNjaGVtYShzY2hlbWEpIHtcbiAgICAgICAgICAgIHZhciBkZWZlcnJlZCA9ICRxLmRlZmVyKCk7XG5cbiAgICAgICAgICAgICRodHRwLmdldCggc2NoZW1hIClcbiAgICAgICAgICAgICAgICAuc3VjY2VzcyggZnVuY3Rpb24oIGRhdGEgKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmKCBhbmd1bGFyLmlzT2JqZWN0KCBkYXRhICkgKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZXNvbHZlKGRhdGEpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy9UT0RPOiByZXBsYWNlIGVycm9yIG1lc3NhZ2Ugd2l0aCBvbmxpbmUgZG9jIGxpbmsgbGlrZSBuZyBlcnJvcnNcbiAgICAgICAgICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlamVjdCgnZGlyZWN0aXZlLmJvc3N5Rm9ybTogR0VUIHJlcXVlc3QgdG8gdXJsIGRpZCBub3QgcHJvZHVjZSBzY2hlbWEgb2JqZWN0Jyk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIC5lcnJvciggZnVuY3Rpb24oZGF0YSwgc3RhdHVzKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vVE9ETzogcmVwbGFjZSBlcnJvciBtZXNzYWdlIHdpdGggb25saW5lIGRvYyBsaW5rIGxpa2UgbmcgZXJyb3JzXG4gICAgICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlamVjdCgnZGlyZWN0aXZlLmJvc3N5Rm9ybTogR0VUIHJlcXVlc3QgdG8gdXJsIFwiJyArIHNjaGVtYSArICdcIiBmYWlsZWQgd2l0aCBzdGF0dXMgXCInICsgc3RhdHVzICsgJ1wiJyk7XG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIHJldHVybiBkZWZlcnJlZC5wcm9taXNlO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGdldFNjaGVtYTogX2dldFNjaGVtYVxuICAgICAgICB9O1xuICAgIH1dKVxuO1xuIiwiYW5ndWxhci5tb2R1bGUoJ2FwcC5kaXJlY3RpdmUuYm9zc3kuc2xpZGVyJywgW10pXG4gICAgLmNvbnRyb2xsZXIoJ1NsaWRlckNvbnRyb2xsZXInLCBbJyRzY29wZScsIGZ1bmN0aW9uICgkc2NvcGUpIHtcbiAgICAgICAgJHNjb3BlLnZhbHVlID0gNTtcbiAgICAgICAgJHNjb3BlLm1heCA9IDk7XG4gICAgICAgICRzY29wZS5taW4gPSAxO1xuICAgICAgICAkc2NvcGUuc3RyaW5nID0gXCItLS0tby0tLS1cIjtcbiAgICAgICAgJHNjb3BlLnNsaWRlciA9IFsnLScsICctJywgJy0nLCAnLScsICdvJywgJy0nLCAnLScsICctJywgJy0nXTtcblxuICAgICAgICAvL2NoZWNrcyBib3VuZHMgd2hlbiBhdHRlbXB0aW5nIHRvIGluY3JlYXNlIHRoZSB2YWx1ZVxuICAgICAgICAkc2NvcGUuaW5jcmVhc2UgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBpZiAoJHNjb3BlLnZhbHVlIDwgJHNjb3BlLm1heCkge1xuICAgICAgICAgICAgICAgICRzY29wZS5zbGlkZXJbJHNjb3BlLnZhbHVlIC0gMV0gPSAnLSc7XG4gICAgICAgICAgICAgICAgJHNjb3BlLnZhbHVlID0gJHNjb3BlLnZhbHVlICsgMTtcbiAgICAgICAgICAgICAgICAkc2NvcGUuc2xpZGVyWyRzY29wZS52YWx1ZSAtIDFdID0gJ28nO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgJHNjb3BlLmdldHN0cmluZygpO1xuICAgICAgICB9O1xuXG4gICAgICAgIC8vVGhpcyBmdW5jdGlvbiBpcyB0byBiaW5kIHRoZSBkZWNyZWFzZSBhbmQgaW5jcmVhc2UgZnVuY3Rpb24gd2l0aCB0aGUgYXJyb3cga2V5c1xuICAgICAgICAkc2NvcGUua2V5QmluZCA9IGZ1bmN0aW9uIChldikge1xuICAgICAgICAgICAgJHNjb3BlLnByZXNzZWQgPSBldi53aGljaDtcbiAgICAgICAgICAgIC8vSWYgYXJyb3cga2V5KExlZnQgb3IgRG93bikgaXMgcHJlc3NlZCB0aGVuIGNhbGwgdGhlIGRlY3JlYXNlKCkgZnVuY3Rpb24gdG8gZGVjcmVhc2UgdGhlIHZhbHVlLlxuICAgICAgICAgICAgaWYgKCRzY29wZS5wcmVzc2VkID09PSAzNyB8fCAkc2NvcGUucHJlc3NlZCA9PT0gNDApIHtcbiAgICAgICAgICAgICAgICAkc2NvcGUuZGVjcmVhc2UoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vc2FtZSBhcyBhYm92ZSBidXQgZm9yIFVwIG9yIFJpZ2h0IHRvIGluY3JlYXNlIHRoZSB2YWx1ZS5cbiAgICAgICAgICAgIGlmICgkc2NvcGUucHJlc3NlZCA9PT0gMzggfHwgJHNjb3BlLnByZXNzZWQgPT09IDM5KSB7XG4gICAgICAgICAgICAgICAgJHNjb3BlLmluY3JlYXNlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIC8vY2hlY2tzIGJvdW5kcyB3aGVuIGF0dGVtcHRpbmcgdG8gZGVjcmVhc2UgdGhlIHZhbHVlXG4gICAgICAgICRzY29wZS5kZWNyZWFzZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGlmICgkc2NvcGUudmFsdWUgPiAkc2NvcGUubWluKSB7XG4gICAgICAgICAgICAgICAgJHNjb3BlLnNsaWRlclskc2NvcGUudmFsdWUgLSAxXSA9ICctJztcbiAgICAgICAgICAgICAgICAkc2NvcGUudmFsdWUgPSAkc2NvcGUudmFsdWUgLSAxO1xuICAgICAgICAgICAgICAgICRzY29wZS5zbGlkZXJbJHNjb3BlLnZhbHVlIC0gMV0gPSAnbyc7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAkc2NvcGUuZ2V0c3RyaW5nKCk7XG4gICAgICAgIH07XG4gICAgICAgICRzY29wZS5nZXRzdHJpbmcgPSBmdW5jdGlvbiAoKSB7ICAvL2Z1bmN0aW9uIHRha2VzIHRoZSBzbGlkZXIgYXJyYXkgYW5kIGNyZWF0ZXMgYSBzdHJpbmcgb2YgdGhlIGNvbnRlbnRzLiBcbiAgICAgICAgICAgICRzY29wZS5zdHJpbmcgPSBcIlwiO1xuICAgICAgICAgICAgLy9jaGFuZ2VkIHRvIHRoZSBhbmd1bGFyIGZvckVhY2ggbG9vcCBmb3IgcmVhZGFiaWxpdHlcbiAgICAgICAgICAgIGFuZ3VsYXIuZm9yRWFjaCgkc2NvcGUuc2xpZGVyLCBmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgICAgICAgICAgICRzY29wZS5zdHJpbmcgKz0gaXRlbTtcbiAgICAgICAgICAgIH0pXG5cbiAgICAgICAgfTtcblxuICAgIH1dKS5kaXJlY3RpdmUoJ2Jvc3N5U2xpZGVyJywgZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgcmVzdHJpY3Q6ICdBRScsXG4gICAgICAgICAgICBjb250cm9sbGVyOiAnU2xpZGVyQ29udHJvbGxlcicsXG4gICAgICAgICAgICB0ZW1wbGF0ZTogJzxidXR0b24gbmctY2xpY2s9XCJkZWNyZWFzZSgpXCIgbmcta2V5ZG93bj1cImtleUJpbmQoJGV2ZW50KVwiPi08L2J1dHRvbj48c3Bhbj57e3N0cmluZ319PC9zcGFuPjxidXR0b24gbmctY2xpY2s9XCJpbmNyZWFzZSgpXCIgbmcta2V5ZG93bj1cImtleUJpbmQoJGV2ZW50KVwiPis8L2J1dHRvbj48cD5UaGUgdmFsdWUgaXMge3t2YWx1ZX19ITwvcD4nLFxuICAgICAgICAgICAgc2NvcGU6IHtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0pOyIsIiBhbmd1bGFyLm1vZHVsZSgnYm9zc3kudG9vbHRpcCcsIFtdKVxuXHQucnVuKGZ1bmN0aW9uKCR0ZW1wbGF0ZUNhY2hlKSB7XG5cdFx0JHRlbXBsYXRlQ2FjaGUucHV0KCdqYXNtaW5lVGVzdC5odG1sJywgJ2phc21pbmVUZXN0Lmh0bWwnKTtcblx0fSlcblx0XG5cdC5mYWN0b3J5KCdib3NzeVRvb2x0aXBGYWN0b3J5JywgZnVuY3Rpb24oKSB7XG5cdFx0cmV0dXJuIHtcblx0XHRcdF9vcHRpb25zOiB7XG5cdFx0XHRcdHRpdGxlOiAnZmFjdG9yeSB0aXRsZScsXG5cdFx0XHRcdGNvbnRlbnQ6ICdmYWN0b3J5IGNvbnRlbnQnXG5cdFx0XHR9XG5cdFx0fVxuXHR9KVxuXHRcblx0LmRpcmVjdGl2ZSgnYm9zc3lUb29sdGlwJywgZnVuY3Rpb24oJGNvbXBpbGUsICRodHRwIC8qJGRhdGEsKi8gLyokc2NoZW1hKi8pIHtcblx0XHRyZXR1cm4ge1xuXHRcdFx0cmVzdHJpY3Q6ICdFQScsXG5cdFx0XHRyZXBsYWNlOiB0cnVlLFxuXHRcdFx0dGVtcGxhdGVVcmw6ICdib3NzeS50b29sdGlwLmh0bWwnLFxuXHRcdFx0Y29udHJvbGxlcjpbJyRzY29wZScsICdib3NzeVRvb2x0aXBGYWN0b3J5JywgZnVuY3Rpb24oJHNjb3BlLCBib3NzeVRvb2x0aXBGYWN0b3J5KSB7XG5cdFx0XHRcdFx0dGhpcy5fb3B0aW9ucyA9IHtcblx0XHRcdFx0XHR0aXRsZTogYm9zc3lUb29sdGlwRmFjdG9yeS5fb3B0aW9ucy50aXRsZSxcblx0XHRcdFx0XHRjb250ZW50OiBib3NzeVRvb2x0aXBGYWN0b3J5Ll9vcHRpb25zLmNvbnRlbnRcblx0XHRcdFx0fTtcblx0XHRcdH1dLFxuXHRcdFx0Y29udHJvbGxlckFzOiBcInRpcHNcIlx0XHRcblx0XHR9O1xuXHR9KVxuXHRcblx0Ly8gRGlyZWN0aXZlcyBvbkVudGVyICYmIG9uRXhpdCB1c2UgalF1ZXJ5TGl0ZSBkZXBlbmRlbmN5XG5cdC5kaXJlY3RpdmUoJ29uRW50ZXInLCBmdW5jdGlvbigpIHtcblx0XHRyZXR1cm4gZnVuY3Rpb24oc2NvcGUsIGVsZW1lbnQpIHtcblx0XHRcdGVsZW1lbnQuYmluZCgnbW91c2VlbnRlcicsIGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRjb25zb2xlLmxvZyhcIkknbSBpbiB5b3VcIik7XG5cdFx0XHR9KVxuXHRcdH1cblx0fSlcblx0XG5cdC5kaXJlY3RpdmUoJ29uRXhpdCcsIGZ1bmN0aW9uKCkge1xuXHRcdHJldHVybiBmdW5jdGlvbihzY29wZSwgZWxlbWVudCkge1xuXHRcdFx0ZWxlbWVudC5iaW5kKCdtb3VzZWxlYXZlJywgZnVuY3Rpb24oKSB7XG5cdFx0XHRcdGNvbnNvbGUubG9nKFwiSSdtIG91dHRhIGhlcmVcIik7XG5cdFx0XHR9KVxuXHRcdH1cblx0fSlcblx0IiwiLyogZ2xvYmFsIGV4cGVjdDp0cnVlICovXG5cbnZhciBjaGFpID0gcmVxdWlyZSgnY2hhaScpLFxuXHRleHBlY3QgPSBjaGFpLmV4cGVjdDtcbiIsIi8vIEthcm1hIGNvbmZpZ3VyYXRpb25cbi8vIEdlbmVyYXRlZCBvbiBTdW4gU2VwIDE0IDIwMTQgMTA6MTU6NDkgR01ULTA3MDAgKFBEVClcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihjb25maWcpIHtcbiAgY29uZmlnLnNldCh7XG5cbiAgICAvLyBiYXNlIHBhdGggdGhhdCB3aWxsIGJlIHVzZWQgdG8gcmVzb2x2ZSBhbGwgcGF0dGVybnMgKGVnLiBmaWxlcywgZXhjbHVkZSlcbiAgICBiYXNlUGF0aDogJycsXG5cblxuICAgIC8vIGZyYW1ld29ya3MgdG8gdXNlXG4gICAgLy8gYXZhaWxhYmxlIGZyYW1ld29ya3M6IGh0dHBzOi8vbnBtanMub3JnL2Jyb3dzZS9rZXl3b3JkL2thcm1hLWFkYXB0ZXJcbiAgICBmcmFtZXdvcmtzOiBbJ2phc21pbmUnXSxcblxuXG4gICAgLy8gbGlzdCBvZiBmaWxlcyAvIHBhdHRlcm5zIHRvIGxvYWQgaW4gdGhlIGJyb3dzZXJcbiAgICBmaWxlczogW1xuXG4gICAgICAnaHR0cHM6Ly9jb2RlLmFuZ3VsYXJqcy5vcmcvMS4yLjI1L2FuZ3VsYXIuanMnLFxuICAgICAgJ2h0dHBzOi8vYWpheC5nb29nbGVhcGlzLmNvbS9hamF4L2xpYnMvYW5ndWxhcmpzLzEuMi4yNS9hbmd1bGFyLm1pbi5qcycsXG4gICAgICAnaHR0cHM6Ly9jb2RlLmFuZ3VsYXJqcy5vcmcvMS4yLjI1L2FuZ3VsYXItbW9ja3MuanMnLFxuICAgICAgJy4vLi4vZGVtby9wdWJsaWMvamF2YXNjcmlwdHMvKi5qcycsXG4gICAgICAnLi8uLi9zcmMvKi5qcycsXG4gICAgICAnLi8uLi9zcmMvZGlyZWN0aXZlcy90ZW1wbGF0ZXMvKi5odG1sJyxcbiAgICAgICcuLy4uL3NyYy9kaXJlY3RpdmVzLyouanMnLFxuICAgICAgJy4vZGlyZWN0aXZlcy8qLmpzJ1xuXG4gICAgXSxcblxuXG4gICAgLy8gbGlzdCBvZiBmaWxlcyB0byBleGNsdWRlXG4gICAgZXhjbHVkZTogW1xuICAgIF0sXG5cblxuICAgIC8vIHByZXByb2Nlc3MgbWF0Y2hpbmcgZmlsZXMgYmVmb3JlIHNlcnZpbmcgdGhlbSB0byB0aGUgYnJvd3NlclxuICAgIC8vIGF2YWlsYWJsZSBwcmVwcm9jZXNzb3JzOiBodHRwczovL25wbWpzLm9yZy9icm93c2Uva2V5d29yZC9rYXJtYS1wcmVwcm9jZXNzb3JcbiAgICBwcmVwcm9jZXNzb3JzOiB7XG4gICAgICAgICcuLy4uL3NyYy9kaXJlY3RpdmVzL3RlbXBsYXRlcy8qLmh0bWwnOlsnbmctaHRtbDJqcyddXG4gICAgfSxcblxuICAgIG5nSHRtbDJKc1ByZXByb2Nlc3Nvcjoge1xuICAgICAgICAvL3N0cmlwUHJlZml4OicuLy4uLydcbiAgICAgbW9kdWxlTmFtZTogJ1RlbXBsYXRlcycsXG4gICBcbiAgICB9LFxuXG4gICAgLy8gdGVzdCByZXN1bHRzIHJlcG9ydGVyIHRvIHVzZVxuICAgIC8vIHBvc3NpYmxlIHZhbHVlczogJ2RvdHMnLCAncHJvZ3Jlc3MnXG4gICAgLy8gYXZhaWxhYmxlIHJlcG9ydGVyczogaHR0cHM6Ly9ucG1qcy5vcmcvYnJvd3NlL2tleXdvcmQva2FybWEtcmVwb3J0ZXJcbiAgICByZXBvcnRlcnM6IFsncHJvZ3Jlc3MnXSxcblxuXG4gICAgLy8gd2ViIHNlcnZlciBwb3J0XG4gICAgcG9ydDogOTg3NixcblxuXG4gICAgLy8gZW5hYmxlIC8gZGlzYWJsZSBjb2xvcnMgaW4gdGhlIG91dHB1dCAocmVwb3J0ZXJzIGFuZCBsb2dzKVxuICAgIGNvbG9yczogdHJ1ZSxcblxuXG4gICAgLy8gbGV2ZWwgb2YgbG9nZ2luZ1xuICAgIC8vIHBvc3NpYmxlIHZhbHVlczogY29uZmlnLkxPR19ESVNBQkxFIHx8IGNvbmZpZy5MT0dfRVJST1IgfHwgY29uZmlnLkxPR19XQVJOIHx8IGNvbmZpZy5MT0dfSU5GTyB8fCBjb25maWcuTE9HX0RFQlVHXG4gICAgbG9nTGV2ZWw6IGNvbmZpZy5MT0dfSU5GTyxcblxuXG4gICAgLy8gZW5hYmxlIC8gZGlzYWJsZSB3YXRjaGluZyBmaWxlIGFuZCBleGVjdXRpbmcgdGVzdHMgd2hlbmV2ZXIgYW55IGZpbGUgY2hhbmdlc1xuICAgIGF1dG9XYXRjaDogdHJ1ZSxcblxuXG4gICAgLy8gc3RhcnQgdGhlc2UgYnJvd3NlcnNcbiAgICAvLyBhdmFpbGFibGUgYnJvd3NlciBsYXVuY2hlcnM6IGh0dHBzOi8vbnBtanMub3JnL2Jyb3dzZS9rZXl3b3JkL2thcm1hLWxhdW5jaGVyXG4gICAgYnJvd3NlcnM6IFsnQ2hyb21lJ10sXG5cblxuICAgIC8vIENvbnRpbnVvdXMgSW50ZWdyYXRpb24gbW9kZVxuICAgIC8vIGlmIHRydWUsIEthcm1hIGNhcHR1cmVzIGJyb3dzZXJzLCBydW5zIHRoZSB0ZXN0cyBhbmQgZXhpdHNcbiAgICBzaW5nbGVSdW46IGZhbHNlXG4gIH0pO1xufTtcbiIsImRlc2NyaWJlKCdib3NzeUlucHV0JywgZnVuY3Rpb24oKSB7XG5cdHZhciBlbGVtZW50LFxuXHRcdHNjb3BlLFxuXHRcdGNvbXBpbGUsXG5cdFx0dmFsO1xuXG5cblx0YmVmb3JlRWFjaChtb2R1bGUoJ1RlbXBsYXRlcycpKTtcblx0YmVmb3JlRWFjaChpbmplY3QoZnVuY3Rpb24oJGNvbXBpbGUsJHJvb3RTY29wZSl7XG5cdFx0c2NvcGUgPSAkcm9vdFNjb3BlO1xuXHRcdGNvbXBpbGUgPSAkY29tcGlsZTtcblx0XHR2YWwgPSB0cnVlO1xuXHRcdGVsZW1lbnQgPSBhbmd1bGFyLmVsZW1lbnQoJzxib3NzeS1pbnB1dCB0aXRsZSA9IFwiU2FtcGxlIEJvc3N5IElucHV0XCI+Qm9zc3kgSW5wdXQ8L2Jvc3N5LWlucHV0PicpO1xuXHRcdCRjb21waWxlKGVsZW1lbnQpKHNjb3BlKTtcblx0XHQkcm9vdFNjb3BlLiRkaWdlc3QoKTtcblx0fSkpO1xuXG5cdGl0KCdzaG91bGQgYWRkIGJvc3N5IGlucHV0JyxmdW5jdGlvbigpe1xuXHRcdGV4cGVjdChlbGVtZW50LnRleHQoKSkudG9NYXRjaCgnQm9zc3kgSW5wdXQnKTtcblx0XHRleHBlY3QoZWxlbWVudC5hdHRyKCd0aXRsZScpKS50b01hdGNoKCdTYW1wbGUgQm9zc3kgSW5wdXQnKTtcblx0fSk7XG5cbn0pOyIsImRlc2NyaWJlKCdib3NzeVNjaGVtYSB0ZXN0JywgZnVuY3Rpb24oKXtcblxuXHR2YXIgc2NoZW1hU2VydmljZSxcblx0XHRyb290U2NvcGUsXG5cdFx0ZGVmZXJyZWQ7XG5cdGJlZm9yZUVhY2gobW9kdWxlKCdUZW1wbGF0ZXMnKSk7XG5cdGJlZm9yZUVhY2gobW9kdWxlKCdib3NzeS5zY2hlbWEnKSk7XG5cdGJlZm9yZUVhY2goaW5qZWN0KGZ1bmN0aW9uKF8kc2NoZW1hXywgXyRyb290U2NvcGVfLCBfJHFfKSB7XG5cdFx0c2NoZW1hU2VydmljZSA9IF8kc2NoZW1hXztcblx0XHRyb290U2NvcGUgPSBfJHJvb3RTY29wZV87XG5cblx0XHRkZWZlcnJlZCA9IF8kcV8uZGVmZXIoKTtcblx0XHRkZWZlcnJlZC5yZXNvbHZlKCdkYXRhJyk7XG5cdFx0c3B5T24oc2NoZW1hU2VydmljZSwnZ2V0U2NoZW1hJykuYW5kUmV0dXJuKGRlZmVycmVkLnByb21pc2UpO1xuXHR9KSk7XG5cblx0aXQoJ3Nob3VsZCBjYWxsIGdldFNjaGVtYSBmdW5jdGlvbicsZnVuY3Rpb24oKXtcblx0XHRzY2hlbWFTZXJ2aWNlLmdldFNjaGVtYSgpO1xuXHRcdGV4cGVjdChzY2hlbWFTZXJ2aWNlLmdldFNjaGVtYSkudG9IYXZlQmVlbkNhbGxlZFdpdGgoKTtcblx0fSk7XG5cblx0aXQoJ2dldFNjaGVtYSBzaG91bGQgYmUgY2FsbGVkIHdpdGggYXJndW1lbnRzJyxmdW5jdGlvbigpe1xuXHRcdHZhciB4ID1zY2hlbWFTZXJ2aWNlLmdldFNjaGVtYSgnYWJjJyk7XG5cdFx0ZXhwZWN0KHNjaGVtYVNlcnZpY2UuZ2V0U2NoZW1hKS50b0hhdmVCZWVuQ2FsbGVkV2l0aCgnYWJjJyk7XG5cdH0pO1xuXHR2YXIgaW5wdXQgPSB7XG5cdFx0dGl0bGU6ICdMb2dpbiBGb3JtJyxcblx0XHR0eXBlOiAnb2JqZWN0Jyxcblx0XHRwcm9wZXJ0aWVzOiB7XG5cdFx0XHR0aXRsZToge1xuXHRcdFx0XHR0eXBlOiAnc3RyaW5nJyxcblx0XHRcdFx0dGFnOiAnYm9zc3ktbGFiZWwnLFxuXHRcdFx0XHR0aXRsZTogJ0xvZ2luIHRvIGVudGVyJyxcblx0XHRcdH0sXG5cdFx0XHR0ZXJtczoge1xuXHRcdFx0XHR0eXBlOiAnYm9vbGVhbicsXG5cdFx0XHRcdHRhZzogJ2Jvc3N5LXJhZGlvJyxcblx0XHRcdFx0dGl0bGU6ICdBY2NlcHQgdGVybXMgYW5kIGNvbmRpdGlvbnMnXG5cdFx0XHR9LFxuXHRcdFx0dXNlcm5hbWU6IHtcblx0XHRcdFx0dHlwZTogJ3N0cmluZycsXG5cdFx0XHRcdHRhZzogJ2Jvc3N5LWlucHV0LXRleHQnLFxuXHRcdFx0XHR0aXRsZTogJ1VzZXJuYW1lJ1xuXHRcdFx0fSxcblx0XHRcdGdlbmRlcjoge1xuXHRcdFx0XHR0aXRsZTogJ0dlbmRlcicsXG5cdFx0XHRcdHR5cGU6ICdzdHJpbmcnLFxuXHRcdFx0XHRlbnVtOiBbJ2ZlbWFsZScsICdtYWxlJ11cblx0XHRcdH1cblx0XHR9LFxuXHRcdHJlcXVpcmVkOiBbJ3Rlcm1zJywgJ2dlbmRlcicsICd1c2VybmFtZSddXG5cdH07XG5cblx0aXQoJ2dldFNjaGVtYSBzaG91bGQgcmV0dXJuIHZhbGlkIGRhdGEnLGZ1bmN0aW9uKCl7XG5cdFx0dmFyIHggPSBzY2hlbWFTZXJ2aWNlLmdldFNjaGVtYShpbnB1dCk7XG5cdFx0cm9vdFNjb3BlLiRhcHBseSgpO1xuXHRcdGV4cGVjdChzY2hlbWFTZXJ2aWNlLmdldFNjaGVtYSkudG9IYXZlQmVlbkNhbGxlZFdpdGgoaW5wdXQpO1xuXHRcdGV4cGVjdCh4KS50b01hdGNoKGlucHV0KTtcblx0fSk7XG59KTsiXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=