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
        'bossy.calendar',
        'bossy.data',
        'bossy.dropdown',
        'bossy.form',
        'bossy.input',
        'bossy.multiselect',
        'bossy.numerictextbox',
        'bossy.schema',
        'bossy.tooltip'
    ]
);

angular.module('bossy.calendar', [])
	.controller('CalendarController', ['$scope', function ($scope) {

		var _monthMaps = {},
			options = {},
			defaults = {
			},
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

		function getStandardTime(date) {
			return {
				raw: date,
				year: date.getFullYear(),
				monthName: _getMonthName(date.getMonth()),
				month: date.getMonth(),
				day: _getDayName(date),
				date: date.getDate(),
				time: date.getTime()
			};
		}

		function _getTimeObjectIfDate(date) {
			if (angular.isDate(new Date(date))) {
				return getStandardTime(new Date(date));
			}
			return false;
		}

		function setConfigOptions() {
			$scope.config.start = _getTimeObjectIfDate($scope.config.start);
			$scope.config.end = _getTimeObjectIfDate($scope.config.end);
			options = angular.extend({}, defaults, $scope.config);
		}

		function _dayIsOutOfRange(_date) {
			if (options.start && options.end && (_date.time < options.start.time || _date.time > options.end.time)) {
				return true;
			} else if (options.start && _date.time < options.start.time) {
				return true;
			} else if (options.end && _date.time > options.end.time) {
				return true;
			}
		}

		function _setSelectedDate(date) {
			$scope.selected = getStandardTime(date);
			$scope.ngModel = $scope.selected.raw;
		}

		function _setCurrentMonthAndYear(month, year) {
			var date = new Date(year !== undefined ? year : $scope.selected.year, month !== undefined ? month : $scope.selected.month, 1);
			$scope.current = getStandardTime(date);
		}

		function _getMonthName(month) {
			return $scope.months[month];
		}

		function _getDayName(date) {
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
			var date = getStandardTime(new Date(time));
			if (_dayIsOutOfRange(date)) {
				return;
			}
			if (date.month !== $scope.current.month) {
				_setCurrentMonthAndYear(date.month, date.year);
				$scope.updateDateMap();
			}
			_setSelectedDate(new Date(time));
		};

		$scope.updateDateMap = function() {
			var firstWeekDay = new Date($scope.current.time - ($scope.current.raw.getDay() * universal.DAY)),
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
					var _date = getStandardTime(_thisDate);
					_date.dayInMonth = _thisDate.getMonth() === $scope.current.raw.getMonth() ? 'day-in-month' : '';
					_date.disabledDay = _dayIsOutOfRange(_date) ? 'disabled-day' : '';
					week.push(_date);
				}
				firstWeekDay = new Date(firstWeekDay.getTime() + (7 * universal.DAY));
				$scope.dateMap.push(week);
			}
		};

		setConfigOptions();
		_setSelectedDate($scope.ngModel || new Date());
		_setCurrentMonthAndYear();
		$scope.updateDateMap();

	}]).directive('bossyCalendar', [function () {
		return {
			restrict: 'AE',
			scope: {
				ngModel: '=',
				config: '='
			},
			template: '<style>bossy-calendar .day-in-month{font-weight:700}bossy-calendar .disabled-day{color:#ccc}</style><table><tr><td ng-click="previousMonth()" title="Previous month">&lt;</td><td colspan="5">{{current.monthName}} {{current.year}}</td><td ng-click="nextMonth()" title="Next month">&gt;</td></tr><td ng-repeat="day in days" title="{{day}}">{{day | limitTo : 2}}</td><tr ng-repeat="week in dateMap"><td ng-repeat="current in week" ng-click="selectDate(current.time)" class="{{current.dayInMonth}} {{current.disabledDay}}">{{current.date}}</td></tr><tr><td colspan="7">{{selected.day}}, {{selected.monthName}} {{selected.date}}, {{selected.year}}</td></tr></table>',
			controller: 'CalendarController'
		};
	}]);
var app = angular.module("bossy.combobox.cascadingDropdown", []);

app.controller('AppCtrl', function($scope) {

    // add choices for the 3 dropdowns
    // dependencies in arrays (A - A1 - A1a)
    $scope.choices = {
        'Option A': {
            'Option A1': ['Option A1a', 'Option A1b', 'Option A1c'],
            'Option A2': ['Option A2a', 'Option A2b', 'Option A2c'],
            'Option A3': ['Option A3a', 'Option A3b', 'Option A3c']
        },
        'Option B': {
            'Option B1': ['Option B1a', 'Option B1b', 'Option B1c'],
            'Option B2': ['Option B2a', 'Option B2b', 'Option B2c'],
            'Option B3': ['Option B3a', 'Option B3b', 'Option B3c']
        },
        'Option C': {
            'Option C1': ['Option C1a', 'Option C1b', 'Option C1c'],
            'Option C2': ['Option C2a', 'Option C2b', 'Option C3b'],
            'Option C3': ['Option C3a', 'Option C3b', 'Option C3c']
        }
    };

})
var app = angular.module("bossy.combobox.checkboxMultiselect", []);

app.controller('AppCtrl', function($scope) {

    // set choices
    $scope.choices = ['Option A', 'Option B', 'Option C'];

    // array
    $scope.name = {choices: []};

    // function selectAll to select all checkboxes
    $scope.selectAll = function() {
        $scope.name.choices = angular.copy($scope.choices);
    };

    // function deselectAll to deselect all checkboxes
    $scope.deselectAll = function() {
        $scope.name.choices = [];
    };

});

app.directive('bossyCheckboxMultiselect', ['$parse', '$compile', function($parse, $compile) {

    return {
        restrict: 'AE',
        scope: true,
        compile: function(tElement, tAttrs) {
            // local variable storing checkbox model
            tElement.attr('ng-model', 'checked');
            // prevent recursion
            tElement.removeAttr('bossy-checkbox-multiselect');
            return watch;
        }
    };

        // add the selected choice to choices
        function addChoice (arr, item) {
            arr = angular.isArray(arr) ? arr : [];
            for (var i = 0; i < arr.length; i++) {
                if (angular.equals(arr[i], item)) {
                    return arr;
                }
            }
            // add choice to array
            arr.push(item);
            // return new array
            return arr;
        }

        // remove the selected choice from choices when clicked
        function removeChoice(arr, item) {
            if (angular.isArray(arr)) {
                for (var i = 0; i < arr.length; i++) {
                    if (angular.equals(arr[i], item)) {
                        // remove from array
                        arr.splice(i, 1);
                        break;
                    }
                }
            }
            // return new array
            return arr;
        }

        // contains - check which items the array contains
        function containCheckbox (arr, item) {
            if (angular.isArray(arr)) {
                for (var i = 0; i < arr.length; i++) {
                    if (angular.equals(arr[i], item)) {
                        return true;
                    }
                }
            }
            return false;
        }

        // watch behaviour of directive and model
        function watch(scope, elem, attrs) {

            // compile - ng-model pointing to checked
            $compile(elem)(scope);

            // getter and setter for original model
            var getter = $parse(attrs.bossyCheckboxMultiselect);
            var setter = getter.assign;

            // value added to list
            var value = $parse(attrs.bossyListValue)(scope.$parent);

            // watch the change of checked values
            scope.$watch('checked', function(newValue, oldValue) {
                if (newValue === oldValue) {
                    return;
                }
                var actual = getter(scope.$parent);
                if (newValue === true) {
                    setter(scope.$parent, addChoice (actual, value));
                } else {
                    setter(scope.$parent, removeChoice(actual, value));
                }
            });

            // watch change of original model
            scope.$parent.$watch(attrs.bossyCheckboxMultiselect, function(newArr) {
                scope.checked = containCheckbox (newArr, value);
            }, true);
        }
}]);
var app = angular.module('bossy.combobox.multiselect', []);

app.controller('AppCtrl', function($scope) {

    // add choices for multiselect in array
    $scope.choices = [{id:1, name: 'Option A'},
                      {id:2, name: 'Option B'},
                      {id:3, name: 'Option C'}
                     ];

    // selected choice
    $scope.selectedChoice = [];

})

// inject functions
app.factory('optionParser', ['$parse', function ($parse) {

    var TYPEAHEAD_REGEXP = /^\s*(.*?)(?:\s+as\s+(.*?))?\s+for\s+(?:([\$\w][\$\w\d]*))\s+in\s+(.*)$/;

    return {
        parse: function (input) {

            // check inputs
            var match = input.match(TYPEAHEAD_REGEXP), modelMapper, viewMapper, source;
            if (!match) {
                throw new Error(
                        "Expected typeahead specification in form of '_modelValue_ (as _label_)? for _item_ in _collection_'" +
                        " but got '" + input + "'.");
            }

            return {
                itemName: match[3],
                source: $parse(match[4]),
                viewMapper: $parse(match[2] || match[1]),
                modelMapper: $parse(match[1])
            };
        }
    };
}])

app.directive('bossyMultiselect',

        function ($document, $compile, optionParser) {
            return {
                restrict: 'E',
                require: 'ngModel',
                link: function (originalScope, element, attrs, modelCtrl) {

                    // declare variables
                    var exp = attrs.options,
                        parsedResult = optionParser.parse(exp),
                        isMultiple = attrs.multiple ? true : false,
                        scope = originalScope.$new(),
                        changeHandler = attrs.change || anguler.noop;

                    scope.items = [];
                    scope.multiple = isMultiple;

                    // include second directive (template)
                    var popUpEl = angular.element('<bossy-multiselect-popup></bossy-multiselect-popup>');

                    // analyse model
                    function parseModel() {
                        var model = parsedResult.source(originalScope);
                        for (var i = 0; i < model.length; i++) {
                            var local = {};
                            local[parsedResult.itemName] = model[i];
                            scope.items.push({
                                label: parsedResult.viewMapper(local),
                                model: model[i],
                                checked: false
                            });
                        }
                    }

                    parseModel();

                    // add template directive
                    element.append($compile(popUpEl)(scope));

                    // selection function
                    function selectMultiple(item) {
                        item.checked = !item.checked;
                        setModelValue(true);
                    }

                    // array for multiple selection
                    function setModelValue(isMultiple) {
                        if (isMultiple) {
                            value = [];
                            angular.forEach(scope.items, function (item) {
                                if (item.checked) value.push(item.model);
                            })
                        } else {
                            angular.forEach(scope.items, function (item) {
                                if (item.checked) {
                                    value = item.model;
                                    return false;
                                }
                            })
                        }
                        modelCtrl.$setViewValue(value);
                    }

                    // function for selection of all
                    scope.checkAll = function () {
                        if (!isMultiple) return;
                        angular.forEach(scope.items, function (item) {
                            item.checked = true;
                        });
                        setModelValue(true);
                    };

                    // function for selection of none
                    scope.uncheckAll = function () {
                        angular.forEach(scope.items, function (item) {
                            item.checked = false;
                        });
                        setModelValue(true);
                    };

                    scope.select = function (item) {
                        if (isMultiple === false) {
                            selectSingle(item);
                        } else {
                            selectMultiple(item);
                        }
                    }
                }
            };
        })

// directive storing template
app.directive('bossyMultiselectPopup', ['$document', function ($document) {
        return {
            restrict: 'E',
            scope: false,
            replace: true,
            templateUrl: '../templates/bossy.combobox.multiselect.html',
            link: function (scope, element, attr) {

            }
        }
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
		function setData(data){
			return data;
		}
		return {
			restrict: 'EA',
			replace: true,
			scope: {
				main: '=',
				affiliated: '='
            },
			link: function(scope,element,attrs){
				// scope.main = attrs.main;
				// scope.affiliated = attrs.affiliated;
			},
			// template: '<div> {{main.name}} poop {{affiliated}} </div>',
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
		$scope.main = {id: 0, name:'AlenMania'};
		$scope.affiliated = "chicken";
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

var app = angular.module('bossy.numerictextbox',[]);


app.controller('bossynumericCtrl',function($scope){
    var symbols=['$','%','lbs'];
    var initialValue=0;


    var key = {
        price:0,
        weight:0,
        discount:0,
        stock:0
    };


    $scope.p = symbols[0] + initialValue;
    $scope.w = initialValue + symbols[2];
    $scope.d = initialValue + symbols[1];
    $scope.s = initialValue;

    $scope.increment = function(a){
        switch(a){
            case 'price':
                key.price++;
                $scope.p = symbols[0] + key.price;
                break;
            case 'weight':
                key.weight++;
                $scope.w=key.weight + symbols[2];
                break;
            case 'discount':
                key.discount++;
                $scope.d = key.discount + symbols[1];
                break;
            case 'stock':
                key.stock++;
                $scope.s=key.stock;
            default:
                break;
        }
    }
    $scope.decrement = function(a){

        switch(a){
            case 'price':
                if(key.price>0)
                {
                    key.price--;
                    $scope.p = symbols[0] + key.price;
                }
                break;
            case 'weight':
                if(key.weight>0){
                    key.weight--;
                    $scope.w=key.weight + symbols[2];
                }
                break;
            case 'discount':
                if(key.discount>0)
                {
                    key.discount--;
                    $scope.d = key.discount+ symbols[1];
                }
                break;
            case 'stock':
                if(key.stock>0){
                    key.stock--;
                    $scope.s=key.stock;
                }
                break;
            default:
                break;
        }

    }

});


app.directive('bossynumerictextbox',function(){
    return{
        controller:'bossynumericCtrl',
        restrict:'E',
        transclude:true,
        templateUrl:'bossy.numerictextbox.html'

    }
});	
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

/*This is a slider widget created in angular as part of the BossyUI widgets.
 * The easiest way to use the slider is to include it in your HTML and then
 * create a tag <bossy-slider></bossy-slider>. This widget take in several
 * ways to customize. Currently it takes max, min, and orientation. It is
 * expected to take color and button color. ex.
 * <bossy-slider max="20" min="-5" orientation="vertical"></bossy-slider>*/
///////////////////////////////////////////////////////////////////////////////////////////////////////////////

angular.module('app.directive.bossy.slider', [])
    .controller('SliderController', ['$scope', function ($scope) {


        //these are our default values and are the variables that can be changed by user of our widgets
        $scope.max = 10;
        $scope.min = 1;
        $scope.fillWidth = 0;
        $scope.emptWidth = 0;

        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////

        /*makeBar()
         * This creates the initial graphic of the slider and ensures it is in the correct order*/
        $scope.makeBar = function () {
            //button should show up in the middle now or close to if uneven
            $scope.value = parseInt(($scope.max + $scope.min) / 2);
            for (var current = $scope.min; current <= $scope.max; current++) {
                if (current < ($scope.value)) {
                    $scope.fillWidth++;
                }
                if (current > ($scope.value)) {
                    $scope.emptWidth++;
                }
                if (current == ($scope.value)) {
                }
            }
            $scope.ngModel = $scope.value;
            return;
        };
        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////

        /*increase()
         * This checks bounds when attempting to increase the value and moves the position
         * of the slider button and updates the value.*/
        $scope.increase = function () {
            if ($scope.value < $scope.max) {
                $scope.value = $scope.value + 1;
                $scope.fillWidth++;
                $scope.emptWidth--;
                $scope.ngModel = $scope.value;
            }
            return;
        };
        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////

        /*decrease()
         * This checks bounds when attempting to decrease the value and moves the position
         * of the slider button and updates the value.*/
        $scope.decrease = function () {
            if ($scope.value > $scope.min) {
                $scope.value = $scope.value - 1;
                $scope.fillWidth--;
                $scope.emptWidth++;
                $scope.ngModel = $scope.value;
            }
            return;
        };
        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////

        /*keyBind($event)
         * This function is to bind the decrease and increase function with the arrow keys*/
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
            return;
        };
        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////

        /*drag()
         * This function is to allow the slider button to slide and update the value when released*/
        $scope.drag = function () {
            alert("drag");
            return;
        };
        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////

        /*barClick()
         * This function is to allow the value to be changed when clicking on the bar*/
        $scope.barClick = function () {
            alert("bar click");
            return;
        };
        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////


    }]).directive('bossySlider', function ($compile) {
        var myTemplate;
        return {
            //allows the slider to be created as and attribute or element <bossy-slider><bossy-slider>
            restrict: 'AE',
            controller: 'SliderController',
            scope: {
                ngModel: '='
            },
            /*link: function:
            * This allows us to pull in the settings the programmer wants for the slider and set things correctly
            * it also initializes the slider and adds the correct orientation template to the DOM*/
            link: function (scope, iElem, iAttr) {

                //checks to see if there is a max attribute
                if (iAttr.max) {
                    scope.max = parseInt(iAttr.max);
                    if (scope.max === NaN) {
                        scope.max = 10;
                    }
                }
                //checks to see if there is a min attribute
                if (iAttr.min) {
                    scope.min = parseInt(iAttr.min);
                    if (scope.min === NaN) {
                        scope.min = 1;
                    }
                }
                //checks for bar color customization
                scope.barfillcolor = "#0000FF";
                if (iAttr.barfillcolor) {
                    var pattern = /^#[0-9a-fA-F]{6}$/; //currently accepts lower case a-f
                    if (pattern.test(iAttr.barfillcolor)) {
                        scope.barfillcolor = iAttr.barfillcolor;
                    }
                }
                //checks for empty bar color customization
                scope.baremptycolor = "#D3D3D3";
                if (iAttr.baremptycolor) {
                    var pattern = /^#[0-9a-fA-F]{6}$/; //currently accepts lower case a-f
                    if (pattern.test(iAttr.baremptycolor)) {
                        scope.baremptycolor = iAttr.baremptycolor;
                    }
                }

                scope.buttoncolor = "#FF0000";
                if (iAttr.buttoncolor) {
                    var pattern = /^#[0-9a-fA-F]{6}$/; //currently accepts lower case a-f
                    if (pattern.test(iAttr.buttoncolor)) {
                        scope.buttoncolor = iAttr.buttoncolor;
                    }
                }
                //checks to see if there is a orientation attribute if there is set our template to the vertical template
                if (iAttr.orientation) {
                    if ('vertical' === iAttr.orientation) {
                        myTemplate = '<button ng-click="increase()" ng-keydown="keyBind($event)">+</button>' +
                        '<div ng-click="barClick()" style="margin-left:9px;width:3px;height:{{10 * emptWidth}}px;background-color:' + scope.baremptycolor + ';margin-bottom:4px"></div>' +
                        '<div ng-mousedown="drag()" style="margin-top:-4px;margin-left:5px;width:10px;height:10px;background-color:' + scope.buttoncolor + ';border-radius:50%;"></div>' +
                        '<div ng-click="barClick()" style="margin-left:9px;width:3px;height:{{10 * fillWidth}}px;background-color:' + scope.barfillcolor + ';margin-bottom:4px"></div>' +
                        '<button ng-click="decrease()" ng-keydown="keyBind($event)">-</button>';
                    }
                }
                else {
                    //this builds our horizontal template
                    myTemplate = '<button ng-click="decrease()" ng-keydown="keyBind($event)">-</button>' +
                    '<div ng-click="barClick()" style="display:inline-block;width:{{10 * fillWidth}}px;height:3px;background-color:' + scope.barfillcolor + ';margin-bottom:4px"></div>' +
                    '<div ng-mousedown="drag()" style="display:inline-block;width:10px;height:10px;background-color:' + scope.buttoncolor + ';border-radius:50%;"></div>' +
                    '<div ng-click="barClick()" style="display:inline-block;width:{{10 * emptWidth}}px;height:3px;background-color:' + scope.baremptycolor + ';margin-bottom:4px"></div>' +
                    '<button ng-click="increase()" ng-keydown="keyBind($event)">+</button>';
                }
                //We show our template and then compile it so the DOM knows about our ng functions
                iElem.html(myTemplate);
                $compile(iElem.contents())(scope);
                //create the initial bar
                scope.makeBar();
                return;
            }
        }
    });
angular.module('bossy.tooltip', [])
    .directive('bossyTooltip', function() {
    
        // Private member array containing all known positions
        pos = ['n','ne','e','se','s','sw','w','nw'];
        
        function _moveTip($parent, $tip, curPos)
        {
            if(curPos == 'n')
            {
                $tip.style.left = $parent.offsetLeft + ($parent.offsetWidth / 2) - ($tip.offsetWidth / 2) + 'px';
                $tip.style.top = $parent.offsetTop - $tip.offsetHeight + 'px';
            }
            else if(curPos == 'ne')
            {
                $tip.style.left = $parent.offsetLeft + $parent.offsetWidth + 'px';
                $tip.style.top = $parent.offsetTop - $tip.offsetHeight + 'px';
            }
            else if(curPos == 'e')
            {
                $tip.style.left = $parent.offsetLeft + $parent.offsetWidth + 'px';
                $tip.style.top = $parent.offsetTop + ($parent.offsetHeight / 2) - ($tip.offsetHeight / 2) + 'px';
            }
            else if(curPos == 'se')
            {
                $tip.style.left = $parent.offsetLeft + $parent.offsetWidth + 'px';
                $tip.style.top = $parent.offsetTop + $parent.offsetHeight + 'px';
            }
            else if(curPos == 's')
            {
                $tip.style.left = $parent.offsetLeft + ($parent.offsetWidth / 2) - ($tip.offsetWidth / 2) + 'px';
                $tip.style.top = $parent.offsetTop + $parent.offsetHeight + 'px';
            }
            else if(curPos == 'sw')
            {
                $tip.style.left = $parent.offsetLeft - $tip.offsetWidth + 'px';
                $tip.style.top = $parent.offsetTop + $parent.offsetHeight + 'px';
            }
            else if(curPos == 'w')
            {
                $tip.style.left = $parent.offsetLeft - $tip.offsetWidth + 'px';
                $tip.style.top = $parent.offsetTop + ($parent.offsetHeight / 2) - ($tip.offsetHeight / 2) + 'px';
            }
            else
            {
                $tip.style.left = $parent.offsetLeft - $tip.offsetWidth + 'px';
                $tip.style.top = $parent.offsetTop - $tip.offsetHeight + 'px';
            }
        }
        
        function _checkPos($tip)
        {
            var rect = $tip.getBoundingClientRect();
            
            return (
                rect.top >= 0 &&
                rect.left >= 0 &&
                rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
                rect.right <= (window.innerWidth || document.documentElement.clientWidth)
            );
        }
        
        return {
            restrict: 'A',
            scope: {},
			replace: true,
            link: function(scope, element, attrs) {
                if(typeof attrs.title !== "string" && typeof attrs.body !== "string")
                    console.error("Error: No title or body information provided.");
                if(!attrs.position || typeof attrs.position !== 'string' || pos.indexOf(attrs.position) < 0)
                    attrs.position = 'n';
                
                // Create tip element
                var $tip = document.createElement('div');
                
                // Append to DOM
                document.body.appendChild($tip);
                $tip.style.position = 'absolute';
                $tip.innerHTML = '<span>'+ attrs.title +'</span><div>'+ attrs.body +'</div>';
                $tip.className = 'bossyTooltip';
                
                // Find best location starting with attrs.position
                var i = 0;
                do
                {
                    locked = true;
                    _moveTip(element[0], $tip, attrs.position);
                    
                    // Wrap around array if the end is hit
                    if(attrs.position == 'nw')
                        attrs.position = 'n';
                    else
                        attrs.position = pos[pos.indexOf(attrs.position) + 1];
                    
                    // Continue to loop if $tip is clipped
                    if(!_checkPos($tip))
                    {
                        locked = false;
                    }
                    
                    if(i == 8)
                        break;
                    
                    ++i;
                } while(locked == false);
                
                // Hide it until mouse event
                $tip.style.display = 'none';
                
                // Mouse events
                element.on('mouseenter', function() {
                    $tip.style.display = 'block';
                })
                .on('mouseleave', function() {
                    $tip.style.display = 'none';
                });
                
            }
        };
    });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImJvc3N5LmpzIiwiYm9zc3kuY2FsZW5kYXIuanMiLCJib3NzeS5jb21ib2JveC5jYXNjYWRpbmdEcm9wZG93bi5qcyIsImJvc3N5LmNvbWJvYm94LmNoZWNrYm94TXVsdGlzZWxlY3QuanMiLCJib3NzeS5jb21ib2JveC5tdWx0aXNlbGVjdC5qcyIsImJvc3N5LmRhdGEuanMiLCJib3NzeS5kcm9wZG93bi5qcyIsImJvc3N5LmZvcm0uanMiLCJib3NzeS5pbnB1dC5qcyIsImJvc3N5Lm51bWVyaWN0ZXh0Ym94LmpzIiwiYm9zc3kucGJkcm9wZG93bi5qcyIsImJvc3N5LnNjaGVtYS5qcyIsImJvc3N5LnNsaWRlci5qcyIsImJvc3N5LnRvb2x0aXAuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDMUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDNUpBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDeEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDNUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNqSkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDM0RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDekRBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNsSUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDakJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUN4RkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUN6REE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUMxQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDbkxBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJib3NzeS5hbGwuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiFcclxuICogYm9zc3kuanNcclxuICovXHJcblxyXG4vKiFcclxuICogaHR0cDovL0Jvc3N5VUkuY29tL1xyXG4gKlxyXG4gKiBCb3NzeVVJIC0gQ3JlYXRlZCB3aXRoIExPVkUgYnkgQnVpbGQuY29tIE9wZW4gU291cmNlIENvbnNvcnRpdW1cclxuICpcclxuICogTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlLiBQbGVhc2Ugc2VlIExJQ0VOU0UgZm9yIG1vcmUgaW5mb3JtYXRpb24uXHJcbiAqXHJcbiovXHJcblxyXG4vL1RPRE86IG5lZWQgbGF5b3V0LCBsYWJlbHNcclxudmFyIGJvc3N5ID0gYW5ndWxhci5tb2R1bGUoJ2Jvc3N5JywgW1xyXG4gICAgICAgICdib3NzeS5jYWxlbmRhcicsXHJcbiAgICAgICAgJ2Jvc3N5LmRhdGEnLFxyXG4gICAgICAgICdib3NzeS5kcm9wZG93bicsXHJcbiAgICAgICAgJ2Jvc3N5LmZvcm0nLFxyXG4gICAgICAgICdib3NzeS5pbnB1dCcsXHJcbiAgICAgICAgJ2Jvc3N5Lm11bHRpc2VsZWN0JyxcclxuICAgICAgICAnYm9zc3kubnVtZXJpY3RleHRib3gnLFxyXG4gICAgICAgICdib3NzeS5zY2hlbWEnLFxyXG4gICAgICAgICdib3NzeS50b29sdGlwJ1xyXG4gICAgXVxyXG4pO1xyXG4iLCJhbmd1bGFyLm1vZHVsZSgnYm9zc3kuY2FsZW5kYXInLCBbXSlcclxuXHQuY29udHJvbGxlcignQ2FsZW5kYXJDb250cm9sbGVyJywgWyckc2NvcGUnLCBmdW5jdGlvbiAoJHNjb3BlKSB7XHJcblxyXG5cdFx0dmFyIF9tb250aE1hcHMgPSB7fSxcclxuXHRcdFx0b3B0aW9ucyA9IHt9LFxyXG5cdFx0XHRkZWZhdWx0cyA9IHtcclxuXHRcdFx0fSxcclxuXHRcdFx0dW5pdmVyc2FsID0ge1xyXG5cdFx0XHRcdERBWTogMjQgKiA2MCAqIDYwICogMTAwMCxcclxuXHRcdFx0XHRIT1VSOiA2MCAqIDYwICogMTAwMFxyXG5cdFx0XHR9O1xyXG5cclxuXHRcdCRzY29wZS5kYXlzID0gW1xyXG5cdFx0XHQnU3VuZGF5JyxcclxuXHRcdFx0J01vbmRheScsXHJcblx0XHRcdCdUdWVzZGF5JyxcclxuXHRcdFx0J1dlZG5lc2RheScsXHJcblx0XHRcdCdUaHVyc2RheScsXHJcblx0XHRcdCdGcmlkYXknLFxyXG5cdFx0XHQnU2F0dXJkYXknXHJcblx0XHRdO1xyXG5cdFx0JHNjb3BlLm1vbnRocyA9IFtcclxuXHRcdFx0J0phbnVhcnknLFxyXG5cdFx0XHQnRmVicnVhcnknLFxyXG5cdFx0XHQnTWFyY2gnLFxyXG5cdFx0XHQnQXByaWwnLFxyXG5cdFx0XHQnTWF5JyxcclxuXHRcdFx0J0p1bmUnLFxyXG5cdFx0XHQnSnVseScsXHJcblx0XHRcdCdBdWd1c3QnLFxyXG5cdFx0XHQnU2VwdGVtYmVyJyxcclxuXHRcdFx0J09jdG9iZXInLFxyXG5cdFx0XHQnTm92ZW1iZXInLFxyXG5cdFx0XHQnRGVjZW1iZXInXHJcblx0XHRdO1xyXG5cclxuXHRcdGZ1bmN0aW9uIGdldFN0YW5kYXJkVGltZShkYXRlKSB7XHJcblx0XHRcdHJldHVybiB7XHJcblx0XHRcdFx0cmF3OiBkYXRlLFxyXG5cdFx0XHRcdHllYXI6IGRhdGUuZ2V0RnVsbFllYXIoKSxcclxuXHRcdFx0XHRtb250aE5hbWU6IF9nZXRNb250aE5hbWUoZGF0ZS5nZXRNb250aCgpKSxcclxuXHRcdFx0XHRtb250aDogZGF0ZS5nZXRNb250aCgpLFxyXG5cdFx0XHRcdGRheTogX2dldERheU5hbWUoZGF0ZSksXHJcblx0XHRcdFx0ZGF0ZTogZGF0ZS5nZXREYXRlKCksXHJcblx0XHRcdFx0dGltZTogZGF0ZS5nZXRUaW1lKClcclxuXHRcdFx0fTtcclxuXHRcdH1cclxuXHJcblx0XHRmdW5jdGlvbiBfZ2V0VGltZU9iamVjdElmRGF0ZShkYXRlKSB7XHJcblx0XHRcdGlmIChhbmd1bGFyLmlzRGF0ZShuZXcgRGF0ZShkYXRlKSkpIHtcclxuXHRcdFx0XHRyZXR1cm4gZ2V0U3RhbmRhcmRUaW1lKG5ldyBEYXRlKGRhdGUpKTtcclxuXHRcdFx0fVxyXG5cdFx0XHRyZXR1cm4gZmFsc2U7XHJcblx0XHR9XHJcblxyXG5cdFx0ZnVuY3Rpb24gc2V0Q29uZmlnT3B0aW9ucygpIHtcclxuXHRcdFx0JHNjb3BlLmNvbmZpZy5zdGFydCA9IF9nZXRUaW1lT2JqZWN0SWZEYXRlKCRzY29wZS5jb25maWcuc3RhcnQpO1xyXG5cdFx0XHQkc2NvcGUuY29uZmlnLmVuZCA9IF9nZXRUaW1lT2JqZWN0SWZEYXRlKCRzY29wZS5jb25maWcuZW5kKTtcclxuXHRcdFx0b3B0aW9ucyA9IGFuZ3VsYXIuZXh0ZW5kKHt9LCBkZWZhdWx0cywgJHNjb3BlLmNvbmZpZyk7XHJcblx0XHR9XHJcblxyXG5cdFx0ZnVuY3Rpb24gX2RheUlzT3V0T2ZSYW5nZShfZGF0ZSkge1xyXG5cdFx0XHRpZiAob3B0aW9ucy5zdGFydCAmJiBvcHRpb25zLmVuZCAmJiAoX2RhdGUudGltZSA8IG9wdGlvbnMuc3RhcnQudGltZSB8fCBfZGF0ZS50aW1lID4gb3B0aW9ucy5lbmQudGltZSkpIHtcclxuXHRcdFx0XHRyZXR1cm4gdHJ1ZTtcclxuXHRcdFx0fSBlbHNlIGlmIChvcHRpb25zLnN0YXJ0ICYmIF9kYXRlLnRpbWUgPCBvcHRpb25zLnN0YXJ0LnRpbWUpIHtcclxuXHRcdFx0XHRyZXR1cm4gdHJ1ZTtcclxuXHRcdFx0fSBlbHNlIGlmIChvcHRpb25zLmVuZCAmJiBfZGF0ZS50aW1lID4gb3B0aW9ucy5lbmQudGltZSkge1xyXG5cdFx0XHRcdHJldHVybiB0cnVlO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblxyXG5cdFx0ZnVuY3Rpb24gX3NldFNlbGVjdGVkRGF0ZShkYXRlKSB7XHJcblx0XHRcdCRzY29wZS5zZWxlY3RlZCA9IGdldFN0YW5kYXJkVGltZShkYXRlKTtcclxuXHRcdFx0JHNjb3BlLm5nTW9kZWwgPSAkc2NvcGUuc2VsZWN0ZWQucmF3O1xyXG5cdFx0fVxyXG5cclxuXHRcdGZ1bmN0aW9uIF9zZXRDdXJyZW50TW9udGhBbmRZZWFyKG1vbnRoLCB5ZWFyKSB7XHJcblx0XHRcdHZhciBkYXRlID0gbmV3IERhdGUoeWVhciAhPT0gdW5kZWZpbmVkID8geWVhciA6ICRzY29wZS5zZWxlY3RlZC55ZWFyLCBtb250aCAhPT0gdW5kZWZpbmVkID8gbW9udGggOiAkc2NvcGUuc2VsZWN0ZWQubW9udGgsIDEpO1xyXG5cdFx0XHQkc2NvcGUuY3VycmVudCA9IGdldFN0YW5kYXJkVGltZShkYXRlKTtcclxuXHRcdH1cclxuXHJcblx0XHRmdW5jdGlvbiBfZ2V0TW9udGhOYW1lKG1vbnRoKSB7XHJcblx0XHRcdHJldHVybiAkc2NvcGUubW9udGhzW21vbnRoXTtcclxuXHRcdH1cclxuXHJcblx0XHRmdW5jdGlvbiBfZ2V0RGF5TmFtZShkYXRlKSB7XHJcblx0XHRcdHJldHVybiAkc2NvcGUuZGF5c1tkYXRlLmdldERheSgpXTtcclxuXHRcdH1cclxuXHJcblx0XHQkc2NvcGUucHJldmlvdXNNb250aCA9IGZ1bmN0aW9uKCkge1xyXG5cdFx0XHR2YXIgZGF0ZSA9IG5ldyBEYXRlKCRzY29wZS5jdXJyZW50LnllYXIsICgkc2NvcGUuY3VycmVudC5tb250aCAtIDEpLCAxKTtcclxuXHRcdFx0X3NldEN1cnJlbnRNb250aEFuZFllYXIoZGF0ZS5nZXRNb250aCgpLCBkYXRlLmdldEZ1bGxZZWFyKCkpO1xyXG5cdFx0XHQkc2NvcGUudXBkYXRlRGF0ZU1hcCgpO1xyXG5cdFx0fTtcclxuXHJcblx0XHQkc2NvcGUubmV4dE1vbnRoID0gZnVuY3Rpb24oKSB7XHJcblx0XHRcdHZhciBkYXRlID0gbmV3IERhdGUoJHNjb3BlLmN1cnJlbnQueWVhciwgKCRzY29wZS5jdXJyZW50Lm1vbnRoICsgMSksIDEpO1xyXG5cdFx0XHRfc2V0Q3VycmVudE1vbnRoQW5kWWVhcihkYXRlLmdldE1vbnRoKCksIGRhdGUuZ2V0RnVsbFllYXIoKSk7XHJcblx0XHRcdCRzY29wZS51cGRhdGVEYXRlTWFwKCk7XHJcblx0XHR9O1xyXG5cclxuXHRcdCRzY29wZS5zZWxlY3REYXRlID0gZnVuY3Rpb24odGltZSkge1xyXG5cdFx0XHR2YXIgZGF0ZSA9IGdldFN0YW5kYXJkVGltZShuZXcgRGF0ZSh0aW1lKSk7XHJcblx0XHRcdGlmIChfZGF5SXNPdXRPZlJhbmdlKGRhdGUpKSB7XHJcblx0XHRcdFx0cmV0dXJuO1xyXG5cdFx0XHR9XHJcblx0XHRcdGlmIChkYXRlLm1vbnRoICE9PSAkc2NvcGUuY3VycmVudC5tb250aCkge1xyXG5cdFx0XHRcdF9zZXRDdXJyZW50TW9udGhBbmRZZWFyKGRhdGUubW9udGgsIGRhdGUueWVhcik7XHJcblx0XHRcdFx0JHNjb3BlLnVwZGF0ZURhdGVNYXAoKTtcclxuXHRcdFx0fVxyXG5cdFx0XHRfc2V0U2VsZWN0ZWREYXRlKG5ldyBEYXRlKHRpbWUpKTtcclxuXHRcdH07XHJcblxyXG5cdFx0JHNjb3BlLnVwZGF0ZURhdGVNYXAgPSBmdW5jdGlvbigpIHtcclxuXHRcdFx0dmFyIGZpcnN0V2Vla0RheSA9IG5ldyBEYXRlKCRzY29wZS5jdXJyZW50LnRpbWUgLSAoJHNjb3BlLmN1cnJlbnQucmF3LmdldERheSgpICogdW5pdmVyc2FsLkRBWSkpLFxyXG5cdFx0XHRcdGlzTW9udGhDb21wbGV0ZSA9IGZhbHNlO1xyXG5cdFx0XHRcdCRzY29wZS5kYXRlTWFwID0gW107XHJcblxyXG5cdFx0XHR3aGlsZSAoIWlzTW9udGhDb21wbGV0ZSkge1xyXG5cdFx0XHRcdHZhciB3ZWVrID0gW107XHJcblx0XHRcdFx0aWYgKCRzY29wZS5kYXRlTWFwLmxlbmd0aCA9PT0gNSkge1xyXG5cdFx0XHRcdFx0aXNNb250aENvbXBsZXRlID0gdHJ1ZTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0Zm9yICh2YXIgd2Vla0RheSA9IDA7IHdlZWtEYXkgPCA3OyB3ZWVrRGF5KyspIHtcclxuXHRcdFx0XHRcdHZhciBfdGhpc0RhdGUgPSAobmV3IERhdGUoZmlyc3RXZWVrRGF5LmdldFRpbWUoKSArICh3ZWVrRGF5ICogdW5pdmVyc2FsLkRBWSkpKTtcclxuXHRcdFx0XHRcdC8vIGZpeCBmb3IgRFNUIG9kZG5lc3NcclxuXHRcdFx0XHRcdGlmIChfdGhpc0RhdGUuZ2V0SG91cnMoKSA9PT0gMjMpIHtcclxuXHRcdFx0XHRcdFx0X3RoaXNEYXRlID0gKG5ldyBEYXRlKF90aGlzRGF0ZS5nZXRUaW1lKCkgKyB1bml2ZXJzYWwuSE9VUikpO1xyXG5cdFx0XHRcdFx0fSBlbHNlIGlmIChfdGhpc0RhdGUuZ2V0SG91cnMoKSA9PT0gMSkge1xyXG5cdFx0XHRcdFx0XHRfdGhpc0RhdGUgPSAobmV3IERhdGUoX3RoaXNEYXRlLmdldFRpbWUoKSAtIHVuaXZlcnNhbC5IT1VSKSk7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHR2YXIgX2RhdGUgPSBnZXRTdGFuZGFyZFRpbWUoX3RoaXNEYXRlKTtcclxuXHRcdFx0XHRcdF9kYXRlLmRheUluTW9udGggPSBfdGhpc0RhdGUuZ2V0TW9udGgoKSA9PT0gJHNjb3BlLmN1cnJlbnQucmF3LmdldE1vbnRoKCkgPyAnZGF5LWluLW1vbnRoJyA6ICcnO1xyXG5cdFx0XHRcdFx0X2RhdGUuZGlzYWJsZWREYXkgPSBfZGF5SXNPdXRPZlJhbmdlKF9kYXRlKSA/ICdkaXNhYmxlZC1kYXknIDogJyc7XHJcblx0XHRcdFx0XHR3ZWVrLnB1c2goX2RhdGUpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHRmaXJzdFdlZWtEYXkgPSBuZXcgRGF0ZShmaXJzdFdlZWtEYXkuZ2V0VGltZSgpICsgKDcgKiB1bml2ZXJzYWwuREFZKSk7XHJcblx0XHRcdFx0JHNjb3BlLmRhdGVNYXAucHVzaCh3ZWVrKTtcclxuXHRcdFx0fVxyXG5cdFx0fTtcclxuXHJcblx0XHRzZXRDb25maWdPcHRpb25zKCk7XHJcblx0XHRfc2V0U2VsZWN0ZWREYXRlKCRzY29wZS5uZ01vZGVsIHx8IG5ldyBEYXRlKCkpO1xyXG5cdFx0X3NldEN1cnJlbnRNb250aEFuZFllYXIoKTtcclxuXHRcdCRzY29wZS51cGRhdGVEYXRlTWFwKCk7XHJcblxyXG5cdH1dKS5kaXJlY3RpdmUoJ2Jvc3N5Q2FsZW5kYXInLCBbZnVuY3Rpb24gKCkge1xyXG5cdFx0cmV0dXJuIHtcclxuXHRcdFx0cmVzdHJpY3Q6ICdBRScsXHJcblx0XHRcdHNjb3BlOiB7XHJcblx0XHRcdFx0bmdNb2RlbDogJz0nLFxyXG5cdFx0XHRcdGNvbmZpZzogJz0nXHJcblx0XHRcdH0sXHJcblx0XHRcdHRlbXBsYXRlOiAnPHN0eWxlPmJvc3N5LWNhbGVuZGFyIC5kYXktaW4tbW9udGh7Zm9udC13ZWlnaHQ6NzAwfWJvc3N5LWNhbGVuZGFyIC5kaXNhYmxlZC1kYXl7Y29sb3I6I2NjY308L3N0eWxlPjx0YWJsZT48dHI+PHRkIG5nLWNsaWNrPVwicHJldmlvdXNNb250aCgpXCIgdGl0bGU9XCJQcmV2aW91cyBtb250aFwiPiZsdDs8L3RkPjx0ZCBjb2xzcGFuPVwiNVwiPnt7Y3VycmVudC5tb250aE5hbWV9fSB7e2N1cnJlbnQueWVhcn19PC90ZD48dGQgbmctY2xpY2s9XCJuZXh0TW9udGgoKVwiIHRpdGxlPVwiTmV4dCBtb250aFwiPiZndDs8L3RkPjwvdHI+PHRkIG5nLXJlcGVhdD1cImRheSBpbiBkYXlzXCIgdGl0bGU9XCJ7e2RheX19XCI+e3tkYXkgfCBsaW1pdFRvIDogMn19PC90ZD48dHIgbmctcmVwZWF0PVwid2VlayBpbiBkYXRlTWFwXCI+PHRkIG5nLXJlcGVhdD1cImN1cnJlbnQgaW4gd2Vla1wiIG5nLWNsaWNrPVwic2VsZWN0RGF0ZShjdXJyZW50LnRpbWUpXCIgY2xhc3M9XCJ7e2N1cnJlbnQuZGF5SW5Nb250aH19IHt7Y3VycmVudC5kaXNhYmxlZERheX19XCI+e3tjdXJyZW50LmRhdGV9fTwvdGQ+PC90cj48dHI+PHRkIGNvbHNwYW49XCI3XCI+e3tzZWxlY3RlZC5kYXl9fSwge3tzZWxlY3RlZC5tb250aE5hbWV9fSB7e3NlbGVjdGVkLmRhdGV9fSwge3tzZWxlY3RlZC55ZWFyfX08L3RkPjwvdHI+PC90YWJsZT4nLFxyXG5cdFx0XHRjb250cm9sbGVyOiAnQ2FsZW5kYXJDb250cm9sbGVyJ1xyXG5cdFx0fTtcclxuXHR9XSk7IiwidmFyIGFwcCA9IGFuZ3VsYXIubW9kdWxlKFwiYm9zc3kuY29tYm9ib3guY2FzY2FkaW5nRHJvcGRvd25cIiwgW10pO1xyXG5cclxuYXBwLmNvbnRyb2xsZXIoJ0FwcEN0cmwnLCBmdW5jdGlvbigkc2NvcGUpIHtcclxuXHJcbiAgICAvLyBhZGQgY2hvaWNlcyBmb3IgdGhlIDMgZHJvcGRvd25zXHJcbiAgICAvLyBkZXBlbmRlbmNpZXMgaW4gYXJyYXlzIChBIC0gQTEgLSBBMWEpXHJcbiAgICAkc2NvcGUuY2hvaWNlcyA9IHtcclxuICAgICAgICAnT3B0aW9uIEEnOiB7XHJcbiAgICAgICAgICAgICdPcHRpb24gQTEnOiBbJ09wdGlvbiBBMWEnLCAnT3B0aW9uIEExYicsICdPcHRpb24gQTFjJ10sXHJcbiAgICAgICAgICAgICdPcHRpb24gQTInOiBbJ09wdGlvbiBBMmEnLCAnT3B0aW9uIEEyYicsICdPcHRpb24gQTJjJ10sXHJcbiAgICAgICAgICAgICdPcHRpb24gQTMnOiBbJ09wdGlvbiBBM2EnLCAnT3B0aW9uIEEzYicsICdPcHRpb24gQTNjJ11cclxuICAgICAgICB9LFxyXG4gICAgICAgICdPcHRpb24gQic6IHtcclxuICAgICAgICAgICAgJ09wdGlvbiBCMSc6IFsnT3B0aW9uIEIxYScsICdPcHRpb24gQjFiJywgJ09wdGlvbiBCMWMnXSxcclxuICAgICAgICAgICAgJ09wdGlvbiBCMic6IFsnT3B0aW9uIEIyYScsICdPcHRpb24gQjJiJywgJ09wdGlvbiBCMmMnXSxcclxuICAgICAgICAgICAgJ09wdGlvbiBCMyc6IFsnT3B0aW9uIEIzYScsICdPcHRpb24gQjNiJywgJ09wdGlvbiBCM2MnXVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgJ09wdGlvbiBDJzoge1xyXG4gICAgICAgICAgICAnT3B0aW9uIEMxJzogWydPcHRpb24gQzFhJywgJ09wdGlvbiBDMWInLCAnT3B0aW9uIEMxYyddLFxyXG4gICAgICAgICAgICAnT3B0aW9uIEMyJzogWydPcHRpb24gQzJhJywgJ09wdGlvbiBDMmInLCAnT3B0aW9uIEMzYiddLFxyXG4gICAgICAgICAgICAnT3B0aW9uIEMzJzogWydPcHRpb24gQzNhJywgJ09wdGlvbiBDM2InLCAnT3B0aW9uIEMzYyddXHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuXHJcbn0pIiwidmFyIGFwcCA9IGFuZ3VsYXIubW9kdWxlKFwiYm9zc3kuY29tYm9ib3guY2hlY2tib3hNdWx0aXNlbGVjdFwiLCBbXSk7XHJcblxyXG5hcHAuY29udHJvbGxlcignQXBwQ3RybCcsIGZ1bmN0aW9uKCRzY29wZSkge1xyXG5cclxuICAgIC8vIHNldCBjaG9pY2VzXHJcbiAgICAkc2NvcGUuY2hvaWNlcyA9IFsnT3B0aW9uIEEnLCAnT3B0aW9uIEInLCAnT3B0aW9uIEMnXTtcclxuXHJcbiAgICAvLyBhcnJheVxyXG4gICAgJHNjb3BlLm5hbWUgPSB7Y2hvaWNlczogW119O1xyXG5cclxuICAgIC8vIGZ1bmN0aW9uIHNlbGVjdEFsbCB0byBzZWxlY3QgYWxsIGNoZWNrYm94ZXNcclxuICAgICRzY29wZS5zZWxlY3RBbGwgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICAkc2NvcGUubmFtZS5jaG9pY2VzID0gYW5ndWxhci5jb3B5KCRzY29wZS5jaG9pY2VzKTtcclxuICAgIH07XHJcblxyXG4gICAgLy8gZnVuY3Rpb24gZGVzZWxlY3RBbGwgdG8gZGVzZWxlY3QgYWxsIGNoZWNrYm94ZXNcclxuICAgICRzY29wZS5kZXNlbGVjdEFsbCA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICRzY29wZS5uYW1lLmNob2ljZXMgPSBbXTtcclxuICAgIH07XHJcblxyXG59KTtcclxuXHJcbmFwcC5kaXJlY3RpdmUoJ2Jvc3N5Q2hlY2tib3hNdWx0aXNlbGVjdCcsIFsnJHBhcnNlJywgJyRjb21waWxlJywgZnVuY3Rpb24oJHBhcnNlLCAkY29tcGlsZSkge1xyXG5cclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgcmVzdHJpY3Q6ICdBRScsXHJcbiAgICAgICAgc2NvcGU6IHRydWUsXHJcbiAgICAgICAgY29tcGlsZTogZnVuY3Rpb24odEVsZW1lbnQsIHRBdHRycykge1xyXG4gICAgICAgICAgICAvLyBsb2NhbCB2YXJpYWJsZSBzdG9yaW5nIGNoZWNrYm94IG1vZGVsXHJcbiAgICAgICAgICAgIHRFbGVtZW50LmF0dHIoJ25nLW1vZGVsJywgJ2NoZWNrZWQnKTtcclxuICAgICAgICAgICAgLy8gcHJldmVudCByZWN1cnNpb25cclxuICAgICAgICAgICAgdEVsZW1lbnQucmVtb3ZlQXR0cignYm9zc3ktY2hlY2tib3gtbXVsdGlzZWxlY3QnKTtcclxuICAgICAgICAgICAgcmV0dXJuIHdhdGNoO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgICAgIC8vIGFkZCB0aGUgc2VsZWN0ZWQgY2hvaWNlIHRvIGNob2ljZXNcclxuICAgICAgICBmdW5jdGlvbiBhZGRDaG9pY2UgKGFyciwgaXRlbSkge1xyXG4gICAgICAgICAgICBhcnIgPSBhbmd1bGFyLmlzQXJyYXkoYXJyKSA/IGFyciA6IFtdO1xyXG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGFyci5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgaWYgKGFuZ3VsYXIuZXF1YWxzKGFycltpXSwgaXRlbSkpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gYXJyO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vIGFkZCBjaG9pY2UgdG8gYXJyYXlcclxuICAgICAgICAgICAgYXJyLnB1c2goaXRlbSk7XHJcbiAgICAgICAgICAgIC8vIHJldHVybiBuZXcgYXJyYXlcclxuICAgICAgICAgICAgcmV0dXJuIGFycjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIHJlbW92ZSB0aGUgc2VsZWN0ZWQgY2hvaWNlIGZyb20gY2hvaWNlcyB3aGVuIGNsaWNrZWRcclxuICAgICAgICBmdW5jdGlvbiByZW1vdmVDaG9pY2UoYXJyLCBpdGVtKSB7XHJcbiAgICAgICAgICAgIGlmIChhbmd1bGFyLmlzQXJyYXkoYXJyKSkge1xyXG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBhcnIubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoYW5ndWxhci5lcXVhbHMoYXJyW2ldLCBpdGVtKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyByZW1vdmUgZnJvbSBhcnJheVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBhcnIuc3BsaWNlKGksIDEpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy8gcmV0dXJuIG5ldyBhcnJheVxyXG4gICAgICAgICAgICByZXR1cm4gYXJyO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gY29udGFpbnMgLSBjaGVjayB3aGljaCBpdGVtcyB0aGUgYXJyYXkgY29udGFpbnNcclxuICAgICAgICBmdW5jdGlvbiBjb250YWluQ2hlY2tib3ggKGFyciwgaXRlbSkge1xyXG4gICAgICAgICAgICBpZiAoYW5ndWxhci5pc0FycmF5KGFycikpIHtcclxuICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYXJyLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGFuZ3VsYXIuZXF1YWxzKGFycltpXSwgaXRlbSkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIHdhdGNoIGJlaGF2aW91ciBvZiBkaXJlY3RpdmUgYW5kIG1vZGVsXHJcbiAgICAgICAgZnVuY3Rpb24gd2F0Y2goc2NvcGUsIGVsZW0sIGF0dHJzKSB7XHJcblxyXG4gICAgICAgICAgICAvLyBjb21waWxlIC0gbmctbW9kZWwgcG9pbnRpbmcgdG8gY2hlY2tlZFxyXG4gICAgICAgICAgICAkY29tcGlsZShlbGVtKShzY29wZSk7XHJcblxyXG4gICAgICAgICAgICAvLyBnZXR0ZXIgYW5kIHNldHRlciBmb3Igb3JpZ2luYWwgbW9kZWxcclxuICAgICAgICAgICAgdmFyIGdldHRlciA9ICRwYXJzZShhdHRycy5ib3NzeUNoZWNrYm94TXVsdGlzZWxlY3QpO1xyXG4gICAgICAgICAgICB2YXIgc2V0dGVyID0gZ2V0dGVyLmFzc2lnbjtcclxuXHJcbiAgICAgICAgICAgIC8vIHZhbHVlIGFkZGVkIHRvIGxpc3RcclxuICAgICAgICAgICAgdmFyIHZhbHVlID0gJHBhcnNlKGF0dHJzLmJvc3N5TGlzdFZhbHVlKShzY29wZS4kcGFyZW50KTtcclxuXHJcbiAgICAgICAgICAgIC8vIHdhdGNoIHRoZSBjaGFuZ2Ugb2YgY2hlY2tlZCB2YWx1ZXNcclxuICAgICAgICAgICAgc2NvcGUuJHdhdGNoKCdjaGVja2VkJywgZnVuY3Rpb24obmV3VmFsdWUsIG9sZFZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAobmV3VmFsdWUgPT09IG9sZFZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgdmFyIGFjdHVhbCA9IGdldHRlcihzY29wZS4kcGFyZW50KTtcclxuICAgICAgICAgICAgICAgIGlmIChuZXdWYWx1ZSA9PT0gdHJ1ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHNldHRlcihzY29wZS4kcGFyZW50LCBhZGRDaG9pY2UgKGFjdHVhbCwgdmFsdWUpKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2V0dGVyKHNjb3BlLiRwYXJlbnQsIHJlbW92ZUNob2ljZShhY3R1YWwsIHZhbHVlKSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgLy8gd2F0Y2ggY2hhbmdlIG9mIG9yaWdpbmFsIG1vZGVsXHJcbiAgICAgICAgICAgIHNjb3BlLiRwYXJlbnQuJHdhdGNoKGF0dHJzLmJvc3N5Q2hlY2tib3hNdWx0aXNlbGVjdCwgZnVuY3Rpb24obmV3QXJyKSB7XHJcbiAgICAgICAgICAgICAgICBzY29wZS5jaGVja2VkID0gY29udGFpbkNoZWNrYm94IChuZXdBcnIsIHZhbHVlKTtcclxuICAgICAgICAgICAgfSwgdHJ1ZSk7XHJcbiAgICAgICAgfVxyXG59XSk7IiwidmFyIGFwcCA9IGFuZ3VsYXIubW9kdWxlKCdib3NzeS5jb21ib2JveC5tdWx0aXNlbGVjdCcsIFtdKTtcclxuXHJcbmFwcC5jb250cm9sbGVyKCdBcHBDdHJsJywgZnVuY3Rpb24oJHNjb3BlKSB7XHJcblxyXG4gICAgLy8gYWRkIGNob2ljZXMgZm9yIG11bHRpc2VsZWN0IGluIGFycmF5XHJcbiAgICAkc2NvcGUuY2hvaWNlcyA9IFt7aWQ6MSwgbmFtZTogJ09wdGlvbiBBJ30sXHJcbiAgICAgICAgICAgICAgICAgICAgICB7aWQ6MiwgbmFtZTogJ09wdGlvbiBCJ30sXHJcbiAgICAgICAgICAgICAgICAgICAgICB7aWQ6MywgbmFtZTogJ09wdGlvbiBDJ31cclxuICAgICAgICAgICAgICAgICAgICAgXTtcclxuXHJcbiAgICAvLyBzZWxlY3RlZCBjaG9pY2VcclxuICAgICRzY29wZS5zZWxlY3RlZENob2ljZSA9IFtdO1xyXG5cclxufSlcclxuXHJcbi8vIGluamVjdCBmdW5jdGlvbnNcclxuYXBwLmZhY3RvcnkoJ29wdGlvblBhcnNlcicsIFsnJHBhcnNlJywgZnVuY3Rpb24gKCRwYXJzZSkge1xyXG5cclxuICAgIHZhciBUWVBFQUhFQURfUkVHRVhQID0gL15cXHMqKC4qPykoPzpcXHMrYXNcXHMrKC4qPykpP1xccytmb3JcXHMrKD86KFtcXCRcXHddW1xcJFxcd1xcZF0qKSlcXHMraW5cXHMrKC4qKSQvO1xyXG5cclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgcGFyc2U6IGZ1bmN0aW9uIChpbnB1dCkge1xyXG5cclxuICAgICAgICAgICAgLy8gY2hlY2sgaW5wdXRzXHJcbiAgICAgICAgICAgIHZhciBtYXRjaCA9IGlucHV0Lm1hdGNoKFRZUEVBSEVBRF9SRUdFWFApLCBtb2RlbE1hcHBlciwgdmlld01hcHBlciwgc291cmNlO1xyXG4gICAgICAgICAgICBpZiAoIW1hdGNoKSB7XHJcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiRXhwZWN0ZWQgdHlwZWFoZWFkIHNwZWNpZmljYXRpb24gaW4gZm9ybSBvZiAnX21vZGVsVmFsdWVfIChhcyBfbGFiZWxfKT8gZm9yIF9pdGVtXyBpbiBfY29sbGVjdGlvbl8nXCIgK1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBcIiBidXQgZ290ICdcIiArIGlucHV0ICsgXCInLlwiKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgIGl0ZW1OYW1lOiBtYXRjaFszXSxcclxuICAgICAgICAgICAgICAgIHNvdXJjZTogJHBhcnNlKG1hdGNoWzRdKSxcclxuICAgICAgICAgICAgICAgIHZpZXdNYXBwZXI6ICRwYXJzZShtYXRjaFsyXSB8fCBtYXRjaFsxXSksXHJcbiAgICAgICAgICAgICAgICBtb2RlbE1hcHBlcjogJHBhcnNlKG1hdGNoWzFdKVxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcbn1dKVxyXG5cclxuYXBwLmRpcmVjdGl2ZSgnYm9zc3lNdWx0aXNlbGVjdCcsXHJcblxyXG4gICAgICAgIGZ1bmN0aW9uICgkZG9jdW1lbnQsICRjb21waWxlLCBvcHRpb25QYXJzZXIpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgIHJlc3RyaWN0OiAnRScsXHJcbiAgICAgICAgICAgICAgICByZXF1aXJlOiAnbmdNb2RlbCcsXHJcbiAgICAgICAgICAgICAgICBsaW5rOiBmdW5jdGlvbiAob3JpZ2luYWxTY29wZSwgZWxlbWVudCwgYXR0cnMsIG1vZGVsQ3RybCkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAvLyBkZWNsYXJlIHZhcmlhYmxlc1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBleHAgPSBhdHRycy5vcHRpb25zLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBwYXJzZWRSZXN1bHQgPSBvcHRpb25QYXJzZXIucGFyc2UoZXhwKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgaXNNdWx0aXBsZSA9IGF0dHJzLm11bHRpcGxlID8gdHJ1ZSA6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzY29wZSA9IG9yaWdpbmFsU2NvcGUuJG5ldygpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjaGFuZ2VIYW5kbGVyID0gYXR0cnMuY2hhbmdlIHx8IGFuZ3VsZXIubm9vcDtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgc2NvcGUuaXRlbXMgPSBbXTtcclxuICAgICAgICAgICAgICAgICAgICBzY29wZS5tdWx0aXBsZSA9IGlzTXVsdGlwbGU7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC8vIGluY2x1ZGUgc2Vjb25kIGRpcmVjdGl2ZSAodGVtcGxhdGUpXHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHBvcFVwRWwgPSBhbmd1bGFyLmVsZW1lbnQoJzxib3NzeS1tdWx0aXNlbGVjdC1wb3B1cD48L2Jvc3N5LW11bHRpc2VsZWN0LXBvcHVwPicpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAvLyBhbmFseXNlIG1vZGVsXHJcbiAgICAgICAgICAgICAgICAgICAgZnVuY3Rpb24gcGFyc2VNb2RlbCgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIG1vZGVsID0gcGFyc2VkUmVzdWx0LnNvdXJjZShvcmlnaW5hbFNjb3BlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBtb2RlbC5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGxvY2FsID0ge307XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsb2NhbFtwYXJzZWRSZXN1bHQuaXRlbU5hbWVdID0gbW9kZWxbaV07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzY29wZS5pdGVtcy5wdXNoKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsYWJlbDogcGFyc2VkUmVzdWx0LnZpZXdNYXBwZXIobG9jYWwpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1vZGVsOiBtb2RlbFtpXSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaGVja2VkOiBmYWxzZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHBhcnNlTW9kZWwoKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gYWRkIHRlbXBsYXRlIGRpcmVjdGl2ZVxyXG4gICAgICAgICAgICAgICAgICAgIGVsZW1lbnQuYXBwZW5kKCRjb21waWxlKHBvcFVwRWwpKHNjb3BlKSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC8vIHNlbGVjdGlvbiBmdW5jdGlvblxyXG4gICAgICAgICAgICAgICAgICAgIGZ1bmN0aW9uIHNlbGVjdE11bHRpcGxlKGl0ZW0pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaXRlbS5jaGVja2VkID0gIWl0ZW0uY2hlY2tlZDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2V0TW9kZWxWYWx1ZSh0cnVlKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC8vIGFycmF5IGZvciBtdWx0aXBsZSBzZWxlY3Rpb25cclxuICAgICAgICAgICAgICAgICAgICBmdW5jdGlvbiBzZXRNb2RlbFZhbHVlKGlzTXVsdGlwbGUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGlzTXVsdGlwbGUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlID0gW107XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhbmd1bGFyLmZvckVhY2goc2NvcGUuaXRlbXMsIGZ1bmN0aW9uIChpdGVtKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGl0ZW0uY2hlY2tlZCkgdmFsdWUucHVzaChpdGVtLm1vZGVsKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhbmd1bGFyLmZvckVhY2goc2NvcGUuaXRlbXMsIGZ1bmN0aW9uIChpdGVtKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGl0ZW0uY2hlY2tlZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZSA9IGl0ZW0ubW9kZWw7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1vZGVsQ3RybC4kc2V0Vmlld1ZhbHVlKHZhbHVlKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC8vIGZ1bmN0aW9uIGZvciBzZWxlY3Rpb24gb2YgYWxsXHJcbiAgICAgICAgICAgICAgICAgICAgc2NvcGUuY2hlY2tBbGwgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghaXNNdWx0aXBsZSkgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBhbmd1bGFyLmZvckVhY2goc2NvcGUuaXRlbXMsIGZ1bmN0aW9uIChpdGVtKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpdGVtLmNoZWNrZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2V0TW9kZWxWYWx1ZSh0cnVlKTtcclxuICAgICAgICAgICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAvLyBmdW5jdGlvbiBmb3Igc2VsZWN0aW9uIG9mIG5vbmVcclxuICAgICAgICAgICAgICAgICAgICBzY29wZS51bmNoZWNrQWxsID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBhbmd1bGFyLmZvckVhY2goc2NvcGUuaXRlbXMsIGZ1bmN0aW9uIChpdGVtKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpdGVtLmNoZWNrZWQgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNldE1vZGVsVmFsdWUodHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgc2NvcGUuc2VsZWN0ID0gZnVuY3Rpb24gKGl0ZW0pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGlzTXVsdGlwbGUgPT09IGZhbHNlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxlY3RTaW5nbGUoaXRlbSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxlY3RNdWx0aXBsZShpdGVtKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfTtcclxuICAgICAgICB9KVxyXG5cclxuLy8gZGlyZWN0aXZlIHN0b3JpbmcgdGVtcGxhdGVcclxuYXBwLmRpcmVjdGl2ZSgnYm9zc3lNdWx0aXNlbGVjdFBvcHVwJywgWyckZG9jdW1lbnQnLCBmdW5jdGlvbiAoJGRvY3VtZW50KSB7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgcmVzdHJpY3Q6ICdFJyxcclxuICAgICAgICAgICAgc2NvcGU6IGZhbHNlLFxyXG4gICAgICAgICAgICByZXBsYWNlOiB0cnVlLFxyXG4gICAgICAgICAgICB0ZW1wbGF0ZVVybDogJy4uL3RlbXBsYXRlcy9ib3NzeS5jb21ib2JveC5tdWx0aXNlbGVjdC5odG1sJyxcclxuICAgICAgICAgICAgbGluazogZnVuY3Rpb24gKHNjb3BlLCBlbGVtZW50LCBhdHRyKSB7XHJcblxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfV0pO1xyXG4iLCJhbmd1bGFyLm1vZHVsZSgnYm9zc3kuZGF0YScsIFtdKVxyXG4vKipcclxuQG5nZG9jIHNlcnZpY2VcclxuQG5hbWUgJGRhdGFcclxuQHJlcXVpcmVzICRxXHJcbkByZXF1aXJlcyAkaHR0cFxyXG5cclxuKi9cclxuICAgIC5mYWN0b3J5KCckZGF0YScsIFsnJHEnLCckaHR0cCcsZnVuY3Rpb24gKCRxLCRodHRwKSB7XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIF9nZXREYXRhIChkYXRhKSB7XHJcbiAgICAgICAgICAgIGlmIChhbmd1bGFyLmlzU3RyaW5nKGRhdGEpKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gX2dldFJlbW90ZURhdGEoZGF0YSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSBpZiAoYW5ndWxhci5pc09iamVjdChkYXRhKSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGRhdGE7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSBpZiAoYW5ndWxhci5pc0Z1bmN0aW9uKGRhdGEpKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gX2dldERhdGEoIGRhdGEuY2FsbCgkc2NvcGUpICk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAvL1RPRE86IHJlcGxhY2UgZXJyb3IgbWVzc2FnZSB3aXRoIG9ubGluZSBkb2MgbGluayBsaWtlIG5nIGVycm9yc1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcignZGlyZWN0aXZlLmJvc3N5Rm9ybTogbm8gZGF0YSB1cmwgb3Igb2JqZWN0IGdpdmVuJyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIF9nZXRSZW1vdGVEYXRhKGRhdGEpIHtcclxuICAgICAgICAgICAgdmFyIGRlZmVycmVkID0gJHEuZGVmZXIoKTtcclxuXHJcbiAgICAgICAgICAgICRodHRwLmdldCggZGF0YSwgeyByZXNwb25zZVR5cGU6ICdqc29uJyB9IClcclxuICAgICAgICAgICAgICAgIC5zdWNjZXNzKCBmdW5jdGlvbiggZGF0YSApIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiggYW5ndWxhci5pc09iamVjdCggZGF0YSApICkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZXNvbHZlKGRhdGEpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy9UT0RPOiByZXBsYWNlIGVycm9yIG1lc3NhZ2Ugd2l0aCBvbmxpbmUgZG9jIGxpbmsgbGlrZSBuZyBlcnJvcnNcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGVmZXJyZWQucmVqZWN0KCdkaXJlY3RpdmUuYm9zc3lGb3JtOiBHRVQgcmVxdWVzdCB0byB1cmwgZGlkIG5vdCBwcm9kdWNlIGRhdGEgb2JqZWN0Jyk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5lcnJvciggZnVuY3Rpb24ocmVzcG9uc2VfZGF0YSwgc3RhdHVzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy9UT0RPOiByZXBsYWNlIGVycm9yIG1lc3NhZ2Ugd2l0aCBvbmxpbmUgZG9jIGxpbmsgbGlrZSBuZyBlcnJvcnNcclxuICAgICAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZWplY3QoJ2RpcmVjdGl2ZS5ib3NzeUZvcm06IEdFVCByZXF1ZXN0IHRvIHVybCBcIicgKyBkYXRhICsgJ1wiIGZhaWxlZCB3aXRoIHN0YXR1cyBcIicgKyBzdGF0dXMgKyAnXCInKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuIGRlZmVycmVkLnByb21pc2U7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAvKipcclxuICAgICAgICAgICAgQG5nZG9jIG1ldGhvZFxyXG4gICAgICAgICAgICBAbmFtZSBnZXREYXRhXHJcbiAgICAgICAgICAgIEBtZXRob2RPZiAkZGF0YVxyXG4gICAgICAgICAgICBAcGFyYW0ge3N0cmluZyxvYmplY3QsZnVuY3Rpb259IGRhdGEgSWYgZGF0YSBpcyBhIHN0cmluZywgaXQgd2lsbCBiZSB0cmVhdGVkIGFzIGEgdXJsIHRvIHJldHJpZXZlIGRhdGEgZnJvbS4gSWYgZGF0YSBpcyBhbiBvYmplY3QgaXQgd2lsbCBiZSBpbW1lZGlhdGVseSByZXR1cm5lZC4gSWYgZGF0YSBpcyBhIGZ1bmN0aW9uLCB0aGUgZnVuY3Rpb24gd2lsbCBiZSBjYWxsZWQgYW5kIHByb2Nlc3NlZCB1bnRpbCBhbiBvYmplY3QgaXMgcHJvZHVjZWRcclxuICAgICAgICAgICAgQHJldHVybnMge09iamVjdH0gRWl0aGVyIGEgJHEgcHJvbWlzZSwgYSBkYXRhIG9iamVjdCBvciBhIHN0cmluZy5cclxuICAgICAgICAgICAgKi9cclxuICAgICAgICAgICAgZ2V0RGF0YTogX2dldERhdGFcclxuICAgICAgICB9O1xyXG4gICAgfV0pXHJcbjtcclxuIiwiYW5ndWxhci5tb2R1bGUoJ2Jvc3N5LmRyb3Bkb3duJywgW10pXHJcblx0LnJ1bihmdW5jdGlvbigkdGVtcGxhdGVDYWNoZSkge1xyXG5cdFx0JHRlbXBsYXRlQ2FjaGUucHV0KCdqYXNtaW5lVGVzdC5odG1sJywgJ2phc21pbmVUZXN0Lmh0bWwnKTtcclxuXHR9KVxyXG5cdFxyXG5cdC5mYWN0b3J5KCdib3NzeURyb3Bkb3duRmFjdG9yeScsIGZ1bmN0aW9uKCRodHRwIC8qJGRhdGEqLykge1xyXG5cdFx0dmFyIHByb21pc2UgPSAkaHR0cC5nZXQoJ2h0dHBzOi8vZ2lzdC5naXRodWJ1c2VyY29udGVudC5jb20vbXNoYWZyaXIvMjY0Njc2My9yYXcvYmZiMzVmMTdiYzVkNWY4NmVjMGYxMGI4MGY3YjgwZTgyM2U5MTk3Zi9zdGF0ZXNfdGl0bGVjYXNlLmpzb24nKTtcclxuXHRcdHJldHVybiBwcm9taXNlO1xyXG5cdH0pXHJcblx0XHJcblx0LmRpcmVjdGl2ZSgnYm9zc3lEcm9wZG93bicsIGZ1bmN0aW9uKCRjb21waWxlLCAkaHR0cCAvKiRkYXRhLCovIC8qJHNjaGVtYSovKSB7XHJcblx0XHRmdW5jdGlvbiBzZXREYXRhKGRhdGEpe1xyXG5cdFx0XHRyZXR1cm4gZGF0YTtcclxuXHRcdH1cclxuXHRcdHJldHVybiB7XHJcblx0XHRcdHJlc3RyaWN0OiAnRUEnLFxyXG5cdFx0XHRyZXBsYWNlOiB0cnVlLFxyXG5cdFx0XHRzY29wZToge1xyXG5cdFx0XHRcdG1haW46ICc9JyxcclxuXHRcdFx0XHRhZmZpbGlhdGVkOiAnPSdcclxuICAgICAgICAgICAgfSxcclxuXHRcdFx0bGluazogZnVuY3Rpb24oc2NvcGUsZWxlbWVudCxhdHRycyl7XHJcblx0XHRcdFx0Ly8gc2NvcGUubWFpbiA9IGF0dHJzLm1haW47XHJcblx0XHRcdFx0Ly8gc2NvcGUuYWZmaWxpYXRlZCA9IGF0dHJzLmFmZmlsaWF0ZWQ7XHJcblx0XHRcdH0sXHJcblx0XHRcdC8vIHRlbXBsYXRlOiAnPGRpdj4ge3ttYWluLm5hbWV9fSBwb29wIHt7YWZmaWxpYXRlZH19IDwvZGl2PicsXHJcblx0XHRcdHRlbXBsYXRlVXJsOiAnYm9zc3kuZHJvcGRvd24uaHRtbCcsXHJcblx0XHRcdGNvbnRyb2xsZXI6IGZ1bmN0aW9uKCRzY29wZSwgYm9zc3lEcm9wZG93bkZhY3RvcnkpIHtcclxuXHRcdFx0XHQkc2NvcGUuY29udGVudHMgPSBbXTtcclxuXHRcdFx0XHRcclxuXHRcdFx0XHRib3NzeURyb3Bkb3duRmFjdG9yeVxyXG5cdFx0XHRcdFx0LnN1Y2Nlc3MoZnVuY3Rpb24oZGF0YSl7XHJcblx0XHRcdFx0XHRcdCRzY29wZS5jb250ZW50cyA9IGRhdGE7XHJcblx0XHRcdFx0XHR9KVxyXG5cdFx0XHRcdFx0LmVycm9yKGZ1bmN0aW9uKGRhdGEpIHtcclxuXHRcdFx0XHRcdFx0Y29uc29sZS5sb2coXCJodHRwLmdldCBGQUlMRURcIik7XHJcblx0XHRcdFx0XHRcdCRzY29wZS5jb250ZW50cyA9IGRhdGEgfHwgXCJSZXF1ZXN0IGZhaWxlZFwiO1xyXG5cdFx0XHRcdFx0fSk7XHJcblx0XHRcdH0sXHJcblx0XHRcdGNvbnRyb2xsZXJBczogXCJkcm9wc1wiXHRcdFxyXG5cdFx0fTtcclxuXHR9KVxyXG5cdFxyXG5cdC5jb250cm9sbGVyKCdib3NzeURyb3Bkb3duQ3RybCcsIGZ1bmN0aW9uKCRodHRwLCBib3NzeURyb3Bkb3duRmFjdG9yeSwgJHNjb3BlIC8qJGRhdGEsKi8gLyokc2NoZW1hKi8pIHtcclxuXHRcdCRzY29wZS5pdGVtcyA9IFtdO1xyXG5cdFx0JHNjb3BlLm1haW4gPSB7aWQ6IDAsIG5hbWU6J0FsZW5NYW5pYSd9O1xyXG5cdFx0JHNjb3BlLmFmZmlsaWF0ZWQgPSBcImNoaWNrZW5cIjtcclxuXHRcdGJvc3N5RHJvcGRvd25GYWN0b3J5XHJcblx0XHRcdC5zdWNjZXNzKGZ1bmN0aW9uKGRhdGEpe1xyXG5cdFx0XHRcdCRzY29wZS5pdGVtcyA9IGRhdGE7XHJcblx0XHRcdH0pXHJcblx0XHRcdC5lcnJvcihmdW5jdGlvbihkYXRhKSB7XHJcblx0XHRcdFx0Y29uc29sZS5sb2coXCJodHRwLmdldCBGQUlMRURcIik7XHJcblx0XHRcdFx0JHNjb3BlLml0ZW1zID0gZGF0YSB8fCBcIlJlcXVlc3QgZmFpbGVkXCI7XHJcblx0XHRcdH0pXHJcblx0fSlcclxuXHJcbiIsImFuZ3VsYXIubW9kdWxlKCdib3NzeS5mb3JtJywgW10pXHJcbiAgICAucnVuKGZ1bmN0aW9uKCR0ZW1wbGF0ZUNhY2hlKXtcclxuICAgICAgICAkdGVtcGxhdGVDYWNoZS5wdXQoJ2Jvc3N5LWlucHV0Lmh0bWwnLCAndGVtcGxhdGVzL2Jvc3N5LWlucHV0Lmh0bWwnKTtcclxuICAgIH0pXHJcbiAgICAuZGlyZWN0aXZlKCdib3NzeUZvcm0nLFsnJGNvbXBpbGUnLCckaHR0cCcsJyRzY2hlbWEnLCckZGF0YScsIGZ1bmN0aW9uICgkY29tcGlsZSwgJGh0dHAsICRzY2hlbWEsICRkYXRhKSB7XHJcbiAgICAgICAgdmFyIF9zY2hlbWEsXHJcbiAgICAgICAgICAgIF9kYXRhLFxyXG4gICAgICAgICAgICBfb3B0aW9ucyA9IHtcclxuICAgICAgICAgICAgICAgIHNob3dMYWJlbHM6IHRydWUsXHJcbiAgICAgICAgICAgICAgICBoZWFkZXI6ICdUaGlzIGlzIGhlYWRlcicsXHJcbiAgICAgICAgICAgICAgICBmb290ZXI6ICdUaGlzIGlzIGZvb3RlcicsXHJcbiAgICAgICAgICAgICAgICB0aGVtZTogJ2dyZWVuJyxcclxuICAgICAgICAgICAgICAgIGJ1dHRvbjogJ1NhdmUnXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIF9pdGVtVGVtcGxhdGUgPSB7XHJcbiAgICAgICAgICAgICAgICBudW1iZXI6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gJzxpbnB1dCB0eXBlPVwibnVtYmVyXCIvPic7XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgdGV4dDogZnVuY3Rpb24gKG9iaiwga2V5LCBpc19yZXF1aXJlZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAnPGJvc3N5LWlucHV0IHRpdGxlPVwiXFwnJytvYmoudGl0bGUrJ1xcJ1wiIHR5cGU9XCJcXCcnKyBvYmouaW5wdXRfdHlwZSArJ1xcJ1wiIHZhbHVlPVwiXFwnJytfZGF0YS5hZGRyZXNzW2tleV0rJ1xcJ1wiJyArICggaXNfcmVxdWlyZWQgPyAnIHJlcXVpcmVkJyA6ICcnICkgKyAnPjwvYm9zc3ktaW5wdXQ+JztcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICB0ZXh0QXJlYTogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAnPHRleHRhcmVhPjwvdGV4dGFyZWE+JztcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBjaGVja2JveDogZnVuY3Rpb24ob2JqKXtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gJzxkaXYgY2xhc3M9XCJjaGVja2JveFwiPjxsYWJlbD48aW5wdXQgdHlwZT1cImNoZWNrYm94XCI+JytvYmoudGl0bGUrJzwvbGFiZWw+PC9kaXY+JztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgZnVuY3Rpb24gc2V0RGF0YShkYXRhKSB7XHJcbiAgICAgICAgICAgIHZhciByZXN1bHQgPSAkZGF0YS5nZXREYXRhKGRhdGEpO1xyXG4gICAgICAgICAgICBpZiggYW5ndWxhci5pc0Z1bmN0aW9uKCByZXN1bHQudGhlbiApICYmIGFuZ3VsYXIuaXNGdW5jdGlvbiggcmVzdWx0LmNhdGNoICkgJiYgYW5ndWxhci5pc0Z1bmN0aW9uKCByZXN1bHQuZmluYWxseSApICkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIF9kYXRhID0gcmVzdWx0O1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZnVuY3Rpb24gc2V0U2NoZW1hKHNjaGVtYSkge1xyXG4gICAgICAgICAgICBfc2NoZW1hID0gJHNjaGVtYS5nZXRTY2hlbWEoc2NoZW1hKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIGJ1aWxkVGVtcGxhdGUoc2NoZW1hUGFydCwgcGFyZW50S2V5LCByZXF1aXJlZCkge1xyXG4gICAgICAgICAgICB2YXIgdGVtcGxhdGUgPSAnJyxcclxuICAgICAgICAgICAgICAgIGZ1bGxLZXkgPSAnJztcclxuICAgICAgICAgICAgYW5ndWxhci5mb3JFYWNoKHNjaGVtYVBhcnQsIGZ1bmN0aW9uKHZhbHVlLCBrZXkpIHtcclxuICAgICAgICAgICAgICAgIGlmICh2YWx1ZS50eXBlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coZnVsbEtleSArICcgaXMgJysgdmFsdWUudHlwZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgc3dpdGNoICh2YWx1ZS50eXBlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ29iamVjdCc6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgcmVxdWlyZWRfbGlzdCA9IHR5cGVvZiggdmFsdWUucmVxdWlyZWQgKSAhPT0gJ3VuZGVmaW5lZCcgPyB2YWx1ZS5yZXF1aXJlZCA6IG51bGw7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0ZW1wbGF0ZSArPSBidWlsZFRlbXBsYXRlKHZhbHVlLnByb3BlcnRpZXMsIGZ1bGxLZXksIHJlcXVpcmVkX2xpc3QgKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlICdhcnJheSc6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0ZW1wbGF0ZSArPSBidWlsZFRlbXBsYXRlKHZhbHVlLml0ZW1zLnByb3BlcnRpZXMsIGZ1bGxLZXkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ251bWJlcicgfHwgJ2ludGVnZXInOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGUgKz0gX2l0ZW1UZW1wbGF0ZS5udW1iZXIodmFsdWUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ3N0cmluZyc6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgaXNfcmVxdWlyZWQgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKCByZXF1aXJlZCAmJiByZXF1aXJlZC5pbmRleE9mKGtleSkgIT09IC0xICkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlzX3JlcXVpcmVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlICs9IF9pdGVtVGVtcGxhdGUudGV4dCh2YWx1ZSwga2V5LCBpc19yZXF1aXJlZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAnYm9vbGVhbic6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0ZW1wbGF0ZSArPSBfaXRlbVRlbXBsYXRlLmNoZWNrYm94KHZhbHVlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSwgdGhpcyk7XHJcbiAgICAgICAgICAgIHJldHVybiB0ZW1wbGF0ZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIHJlc3RyaWN0OiAnRScsXHJcbiAgICAgICAgICAgIHJlcGxhY2U6IHRydWUsXHJcbiAgICAgICAgICAgIHRlbXBsYXRlOiAnJyxcclxuICAgICAgICAgICAgc2NvcGU6IHtcclxuICAgICAgICAgICAgICAgIGNvbmZpZzonPScsIC8vQ3JlYXRlIHNjb3BlIGlzb2xhdGlvbiB3aXRoIGJpLWRpcmVjdGlvbmFsIGJpbmRpbmcsXHJcbiAgICAgICAgICAgICAgICB0aXRsZTogJz0nXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGxpbms6IGZ1bmN0aW9uIChzY29wZSwgZWxlbWVudCwgYXR0cmlidXRlcykge1xyXG4gICAgICAgICAgICAgICAgc2NvcGUuY29uZmlnLm9wdGlvbnMgPSBhbmd1bGFyLmV4dGVuZChfb3B0aW9ucywgc2NvcGUuY29uZmlnLm9wdGlvbnMpO1xyXG5cclxuICAgICAgICAgICAgICAgIHZhciBwcm9taXNlID0gc2V0RGF0YShzY29wZS5jb25maWcuZGF0YSk7XHJcbiAgICAgICAgICAgICAgICBzZXRTY2hlbWEoc2NvcGUuY29uZmlnLnNjaGVtYSk7XHJcbiAgICAgICAgICAgICAgICBpZiggcHJvbWlzZSApIHtcclxuICAgICAgICAgICAgICAgICAgICAvL3RvZG86IHNldCBkaXJlY3RpdmUgdG8gbG9hZGluZyBzdGF0ZVxyXG4gICAgICAgICAgICAgICAgICAgIHByb21pc2UudGhlbihcclxuICAgICAgICAgICAgICAgICAgICAgICAgZnVuY3Rpb24ocmVzdWx0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL3RvZG86IHNldCBkaXJlY3RpdmUgdG8gbG9hZGVkIHN0YXRlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBfZGF0YSA9IHJlc3VsdDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsZW1lbnQuaHRtbChcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnPGZvcm0gbm92YWxpZGF0ZSBjbGFzcz1cInt7Y29uZmlnLm9wdGlvbnMudGhlbWV9fVwiPicrXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJzxkaXYgY2xhc3M9XCJiYW5uZXIgcGFnZS1oZWFkZXJcIj48aDM+e3tjb25maWcub3B0aW9ucy5oZWFkZXJ9fTwvaDM+PC9kaXY+JytcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnVpbGRUZW1wbGF0ZShfc2NoZW1hKSArXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICc8YnV0dG9uIG5nLWlmPVwiY29uZmlnLm9wdGlvbnMuYnV0dG9uXCI+e3tjb25maWcub3B0aW9ucy5idXR0b259fTwvYnV0dG9uPicgK1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICc8ZGl2IGNsYXNzPVwicGFnZS1mb290ZXJcIj48aDM+e3tjb25maWcub3B0aW9ucy5mb290ZXJ9fTwvaDM+PC9kaXY+JytcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnPC9mb3JtPidcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkY29tcGlsZShlbGVtZW50LmNvbnRlbnRzKCkpKHNjb3BlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgZnVuY3Rpb24ocmVhc29uKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL3RvZG86IHNldCBkaXJlY3RpdmUgdG8gZXJyb3Igc3RhdGVcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgZWxlbWVudC5odG1sKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAnPGZvcm0gbm92YWxpZGF0ZSBjbGFzcz1cInt7Y29uZmlnLm9wdGlvbnMudGhlbWV9fVwiPkxPQURJTkcuLi48L2Zvcm0+J1xyXG4gICAgICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgICAgICAgICAgJGNvbXBpbGUoZWxlbWVudC5jb250ZW50cygpKShzY29wZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBlbGVtZW50Lmh0bWwoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICc8Zm9ybSBub3ZhbGlkYXRlIGNsYXNzPVwie3tjb25maWcub3B0aW9ucy50aGVtZX19XCI+JytcclxuICAgICAgICAgICAgICAgICAgICAgICAgJzxkaXYgY2xhc3M9XCJiYW5uZXIgcGFnZS1oZWFkZXJcIj48aDM+e3tjb25maWcub3B0aW9ucy5oZWFkZXJ9fTwvaDM+PC9kaXY+JytcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJ1aWxkVGVtcGxhdGUoX3NjaGVtYSkgK1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJzxidXR0b24gbmctaWY9XCJjb25maWcub3B0aW9ucy5idXR0b25cIj57e2NvbmZpZy5vcHRpb25zLmJ1dHRvbn19PC9idXR0b24+JyArXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICc8ZGl2IGNsYXNzPVwicGFnZS1mb290ZXJcIj48aDM+e3tjb25maWcub3B0aW9ucy5mb290ZXJ9fTwvaDM+PC9kaXY+JytcclxuICAgICAgICAgICAgICAgICAgICAgICAgJzwvZm9ybT4nXHJcbiAgICAgICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgICAgICAgICAkY29tcGlsZShlbGVtZW50LmNvbnRlbnRzKCkpKHNjb3BlKTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICB9XSlcclxuOyIsImFuZ3VsYXIubW9kdWxlKCdib3NzeS5pbnB1dCcsIFtdKVxyXG4gICAgLnJ1bihmdW5jdGlvbigkdGVtcGxhdGVDYWNoZSl7XHJcbiAgICAgICAgJHRlbXBsYXRlQ2FjaGUucHV0KCdib3NzeS1pbnB1dC5odG1sJywgJzxkaXYgY2xhc3M9XCJmb3JtLWdyb3VwIGJvc3N5LWlucHV0XCI+PGxhYmVsIGZvcj1cIlwiPnt7dGl0bGV9fTwvbGFiZWw+PGlucHV0IHR5cGU9XCJ7e3R5cGV9fVwiIGNsYXNzPVwiZm9ybS1jb250cm9sXCIgcGxhY2Vob2xkZXI9XCJcIiB2YWx1ZT1cInt7dmFsdWV9fVwiLz48c3Bhbj48L3NwYW4+PC9kaXY+Jyk7XHJcbiAgICB9KVxyXG4gICAgLmRpcmVjdGl2ZSgnYm9zc3lJbnB1dCcsWyckY29tcGlsZScsJyRodHRwJywnJHNjaGVtYScsJyRkYXRhJywnJHRlbXBsYXRlQ2FjaGUnLCBmdW5jdGlvbiAoJGNvbXBpbGUsICRodHRwLCAkc2NoZW1hLCAkZGF0YSwgJHRlbXBsYXRlQ2FjaGUpIHtcclxuICAgIFx0cmV0dXJuIHtcclxuXHRcdFx0cmVzdHJpY3Q6ICdFJyxcclxuXHRcdFx0cmVwbGFjZTogdHJ1ZSxcclxuXHRcdFx0c2NvcGU6IHtcclxuXHRcdFx0XHR0aXRsZTogJz0nLFxyXG5cdFx0XHRcdHZhbHVlOiAnPScsXHJcblx0XHRcdFx0dHlwZTogJz0nLFxyXG5cdFx0XHRcdHJlcXVpcmVkOiAnPSdcclxuXHRcdFx0fSxcclxuXHRcdFx0dGVtcGxhdGU6ICR0ZW1wbGF0ZUNhY2hlLmdldCgnYm9zc3ktaW5wdXQuaHRtbCcpXHJcblx0XHR9O1xyXG4gICAgfV0pO1xyXG4iLCJ2YXIgYXBwID0gYW5ndWxhci5tb2R1bGUoJ2Jvc3N5Lm51bWVyaWN0ZXh0Ym94JyxbXSk7XHJcblxyXG5cclxuYXBwLmNvbnRyb2xsZXIoJ2Jvc3N5bnVtZXJpY0N0cmwnLGZ1bmN0aW9uKCRzY29wZSl7XHJcbiAgICB2YXIgc3ltYm9scz1bJyQnLCclJywnbGJzJ107XHJcbiAgICB2YXIgaW5pdGlhbFZhbHVlPTA7XHJcblxyXG5cclxuICAgIHZhciBrZXkgPSB7XHJcbiAgICAgICAgcHJpY2U6MCxcclxuICAgICAgICB3ZWlnaHQ6MCxcclxuICAgICAgICBkaXNjb3VudDowLFxyXG4gICAgICAgIHN0b2NrOjBcclxuICAgIH07XHJcblxyXG5cclxuICAgICRzY29wZS5wID0gc3ltYm9sc1swXSArIGluaXRpYWxWYWx1ZTtcclxuICAgICRzY29wZS53ID0gaW5pdGlhbFZhbHVlICsgc3ltYm9sc1syXTtcclxuICAgICRzY29wZS5kID0gaW5pdGlhbFZhbHVlICsgc3ltYm9sc1sxXTtcclxuICAgICRzY29wZS5zID0gaW5pdGlhbFZhbHVlO1xyXG5cclxuICAgICRzY29wZS5pbmNyZW1lbnQgPSBmdW5jdGlvbihhKXtcclxuICAgICAgICBzd2l0Y2goYSl7XHJcbiAgICAgICAgICAgIGNhc2UgJ3ByaWNlJzpcclxuICAgICAgICAgICAgICAgIGtleS5wcmljZSsrO1xyXG4gICAgICAgICAgICAgICAgJHNjb3BlLnAgPSBzeW1ib2xzWzBdICsga2V5LnByaWNlO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgJ3dlaWdodCc6XHJcbiAgICAgICAgICAgICAgICBrZXkud2VpZ2h0Kys7XHJcbiAgICAgICAgICAgICAgICAkc2NvcGUudz1rZXkud2VpZ2h0ICsgc3ltYm9sc1syXTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlICdkaXNjb3VudCc6XHJcbiAgICAgICAgICAgICAgICBrZXkuZGlzY291bnQrKztcclxuICAgICAgICAgICAgICAgICRzY29wZS5kID0ga2V5LmRpc2NvdW50ICsgc3ltYm9sc1sxXTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlICdzdG9jayc6XHJcbiAgICAgICAgICAgICAgICBrZXkuc3RvY2srKztcclxuICAgICAgICAgICAgICAgICRzY29wZS5zPWtleS5zdG9jaztcclxuICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgICRzY29wZS5kZWNyZW1lbnQgPSBmdW5jdGlvbihhKXtcclxuXHJcbiAgICAgICAgc3dpdGNoKGEpe1xyXG4gICAgICAgICAgICBjYXNlICdwcmljZSc6XHJcbiAgICAgICAgICAgICAgICBpZihrZXkucHJpY2U+MClcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBrZXkucHJpY2UtLTtcclxuICAgICAgICAgICAgICAgICAgICAkc2NvcGUucCA9IHN5bWJvbHNbMF0gKyBrZXkucHJpY2U7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAnd2VpZ2h0JzpcclxuICAgICAgICAgICAgICAgIGlmKGtleS53ZWlnaHQ+MCl7XHJcbiAgICAgICAgICAgICAgICAgICAga2V5LndlaWdodC0tO1xyXG4gICAgICAgICAgICAgICAgICAgICRzY29wZS53PWtleS53ZWlnaHQgKyBzeW1ib2xzWzJdO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgJ2Rpc2NvdW50JzpcclxuICAgICAgICAgICAgICAgIGlmKGtleS5kaXNjb3VudD4wKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGtleS5kaXNjb3VudC0tO1xyXG4gICAgICAgICAgICAgICAgICAgICRzY29wZS5kID0ga2V5LmRpc2NvdW50KyBzeW1ib2xzWzFdO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgJ3N0b2NrJzpcclxuICAgICAgICAgICAgICAgIGlmKGtleS5zdG9jaz4wKXtcclxuICAgICAgICAgICAgICAgICAgICBrZXkuc3RvY2stLTtcclxuICAgICAgICAgICAgICAgICAgICAkc2NvcGUucz1rZXkuc3RvY2s7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcblxyXG59KTtcclxuXHJcblxyXG5hcHAuZGlyZWN0aXZlKCdib3NzeW51bWVyaWN0ZXh0Ym94JyxmdW5jdGlvbigpe1xyXG4gICAgcmV0dXJue1xyXG4gICAgICAgIGNvbnRyb2xsZXI6J2Jvc3N5bnVtZXJpY0N0cmwnLFxyXG4gICAgICAgIHJlc3RyaWN0OidFJyxcclxuICAgICAgICB0cmFuc2NsdWRlOnRydWUsXHJcbiAgICAgICAgdGVtcGxhdGVVcmw6J2Jvc3N5Lm51bWVyaWN0ZXh0Ym94Lmh0bWwnXHJcblxyXG4gICAgfVxyXG59KTtcdCIsImFuZ3VsYXIubW9kdWxlKCdib3NzeS5kcm9wZG93bicsIFtdKVxyXG4gICAgLnJ1bihmdW5jdGlvbigkdGVtcGxhdGVDYWNoZSkge1xyXG4gICAgICAgICR0ZW1wbGF0ZUNhY2hlLnB1dCgnamFzbWluZVRlc3QuaHRtbCcsICdqYXNtaW5lVGVzdC5odG1sJyk7XHJcbiAgICB9KVxyXG4gICAgXHJcbiAgICAvKi5mYWN0b3J5KCdib3NzeURyb3Bkb3duRmFjdG9yeScsIFsnJGh0dHAnLCBmdW5jdGlvbigkaHR0cCkge1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIF9vcHRpb25zOiB7XHJcbiAgICAgICAgICAgICAgICB0aXRsZTogJ2Ryb3AgdGl0bGUnLFxyXG4gICAgICAgICAgICAgICAgY29udGVudDogJ3BvcCdcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICAvLyAkaHR0cC5nZXQoJ2h0dHBzOi8vZ2lzdC5naXRodWJ1c2VyY29udGVudC5jb20vbXNoYWZyaXIvMjY0Njc2My9yYXcvYmZiMzVmMTdiYzVkNWY4NmVjMGYxMGI4MGY3YjgwZTgyM2U5MTk3Zi9zdGF0ZXNfdGl0bGVjYXNlLmpzb24nKS5zdWNjZXNzKGZ1bmN0aW9uKGRhdGEpe1xyXG4gICAgICAgICAgICAvLyBfb3B0aW9ucy5jb250ZW50ID0gZGF0YTtcclxuICAgICAgICAvLyB9KVxyXG4gICAgfV0pKi9cclxuICAgIFxyXG4gICAgLmRpcmVjdGl2ZSgnYm9zc3lEcm9wZG93bicsIGZ1bmN0aW9uKCRjb21waWxlLCAkZGF0YS8qLCAkc2NoZW1hKi8pIHtcclxuICAgICAgICB2YXIgX2RhdGE7XHJcbiAgICAgICAgZnVuY3Rpb24gc2V0RGF0YShkYXRhKSB7XHJcbiAgICAgICAgICAgIHZhciByZXN1bHQgPSAkZGF0YS5nZXREYXRhKGRhdGEpO1xyXG4gICAgICAgICAgICBpZiggYW5ndWxhci5pc0Z1bmN0aW9uKCByZXN1bHQudGhlbiApICYmIGFuZ3VsYXIuaXNGdW5jdGlvbiggcmVzdWx0LmNhdGNoICkgJiYgYW5ndWxhci5pc0Z1bmN0aW9uKCByZXN1bHQuZmluYWxseSApICkgLy97XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xyXG4gICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhyZXN1bHQpOy8vcmV0dXJuIHJlc3VsdDtcclxuICAgICAgICAgICAgLyp9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgX2RhdGEgPSByZXN1bHQ7XHJcbiAgICAgICAgICAgIH0qL1xyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICByZXN0cmljdDogJ0VBJyxcclxuICAgICAgICAgICAgcmVwbGFjZTogdHJ1ZSxcclxuICAgICAgICAgICAgc2NvcGU6IHtcclxuICAgICAgICAgICAgICAgIHNyYzogJ0AnLFxyXG4gICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI6ICc9J1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB0ZW1wbGF0ZTogJycsXHJcbiAgICAgICAgICAgIC8vdGVtcGxhdGVVcmw6ICdib3NzeS5kcm9wZG93bi5odG1sJyxcclxuICAgICAgICAgICAgbGluazogZnVuY3Rpb24oc2NvcGUsIGVsZW1lbnQsIGF0dHJzKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlbGVtZW50KTtcclxuICAgICAgICAgICAgICAgIHZhciBqc29uID0gc2V0RGF0YShzY29wZS5zcmMpO1xyXG4gICAgICAgICAgICAgICAgZWxlbWVudC5odG1sKFxyXG4gICAgICAgICAgICAgICAgICAgICc8c2VsZWN0PidcclxuICAgICAgICAgICAgICAgICAgICAgICAgKyAnPG9wdGlvbiBuZy1yZXBlYXQ9XCJqIGluIGpzb25cIiB2YWx1ZT1cInt7ai5jb2RlfX1cIj57e2oubmFtZX19PC9vcHRpb24+J1xyXG4gICAgICAgICAgICAgICAgICAgICsgJzwvc2VsZWN0PidcclxuICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgICAgICAkY29tcGlsZShlbGVtZW50LmNvbnRlbnRzKCkpKHNjb3BlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvKmNvbnRyb2xsZXI6Wyckc2NvcGUnLCAnYm9zc3lEcm9wZG93bkZhY3RvcnknLCBmdW5jdGlvbigkc2NvcGUsIGJvc3N5RHJvcGRvd25GYWN0b3J5KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fb3B0aW9ucyA9IHtcclxuICAgICAgICAgICAgICAgICAgICB0aXRsZTogYm9zc3lEcm9wZG93bkZhY3RvcnkuX29wdGlvbnMudGl0bGUsXHJcbiAgICAgICAgICAgICAgICAgICAgY29udGVudDogYm9zc3lEcm9wZG93bkZhY3RvcnkuX29wdGlvbnMuY29udGVudFxyXG4gICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgfV0sXHJcbiAgICAgICAgICAgIGNvbnRyb2xsZXJBczogXCJkcm9wc1wiKi9cclxuICAgICAgICB9O1xyXG4gICAgfSk7IiwiYW5ndWxhci5tb2R1bGUoJ2Jvc3N5LnNjaGVtYScsIFtdKVxyXG4gICAgLmZhY3RvcnkoJyRzY2hlbWEnLCBbJyRxJywgJyRodHRwJywgZnVuY3Rpb24gKCRxLCAkaHR0cCkge1xyXG5cclxuICAgICAgICBmdW5jdGlvbiBfZ2V0U2NoZW1hIChzY2hlbWEpIHtcclxuICAgICAgICAgICAgaWYgKGFuZ3VsYXIuaXNTdHJpbmcoc2NoZW1hKSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIF9nZXRSZW1vdGVTY2hlbWEoc2NoZW1hKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIGlmIChhbmd1bGFyLmlzT2JqZWN0KHNjaGVtYSkpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBzY2hlbWE7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAvL1RPRE86IHJlcGxhY2UgZXJyb3IgbWVzc2FnZSB3aXRoIG9ubGluZSBkb2MgbGluayBsaWtlIG5nIGVycm9yc1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcignZGlyZWN0aXZlLmJvc3N5Rm9ybTogbm8gc2NoZW1hIHVybCBvciBvYmplY3QgZ2l2ZW4nKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZnVuY3Rpb24gX2dldFJlbW90ZVNjaGVtYShzY2hlbWEpIHtcclxuICAgICAgICAgICAgdmFyIGRlZmVycmVkID0gJHEuZGVmZXIoKTtcclxuXHJcbiAgICAgICAgICAgICRodHRwLmdldCggc2NoZW1hIClcclxuICAgICAgICAgICAgICAgIC5zdWNjZXNzKCBmdW5jdGlvbiggZGF0YSApIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiggYW5ndWxhci5pc09iamVjdCggZGF0YSApICkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZXNvbHZlKGRhdGEpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy9UT0RPOiByZXBsYWNlIGVycm9yIG1lc3NhZ2Ugd2l0aCBvbmxpbmUgZG9jIGxpbmsgbGlrZSBuZyBlcnJvcnNcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGVmZXJyZWQucmVqZWN0KCdkaXJlY3RpdmUuYm9zc3lGb3JtOiBHRVQgcmVxdWVzdCB0byB1cmwgZGlkIG5vdCBwcm9kdWNlIHNjaGVtYSBvYmplY3QnKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmVycm9yKCBmdW5jdGlvbihkYXRhLCBzdGF0dXMpIHtcclxuICAgICAgICAgICAgICAgICAgICAvL1RPRE86IHJlcGxhY2UgZXJyb3IgbWVzc2FnZSB3aXRoIG9ubGluZSBkb2MgbGluayBsaWtlIG5nIGVycm9yc1xyXG4gICAgICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlamVjdCgnZGlyZWN0aXZlLmJvc3N5Rm9ybTogR0VUIHJlcXVlc3QgdG8gdXJsIFwiJyArIHNjaGVtYSArICdcIiBmYWlsZWQgd2l0aCBzdGF0dXMgXCInICsgc3RhdHVzICsgJ1wiJyk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiBkZWZlcnJlZC5wcm9taXNlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgZ2V0U2NoZW1hOiBfZ2V0U2NoZW1hXHJcbiAgICAgICAgfTtcclxuICAgIH1dKVxyXG47XHJcbiIsIi8qVGhpcyBpcyBhIHNsaWRlciB3aWRnZXQgY3JlYXRlZCBpbiBhbmd1bGFyIGFzIHBhcnQgb2YgdGhlIEJvc3N5VUkgd2lkZ2V0cy5cclxuICogVGhlIGVhc2llc3Qgd2F5IHRvIHVzZSB0aGUgc2xpZGVyIGlzIHRvIGluY2x1ZGUgaXQgaW4geW91ciBIVE1MIGFuZCB0aGVuXHJcbiAqIGNyZWF0ZSBhIHRhZyA8Ym9zc3ktc2xpZGVyPjwvYm9zc3ktc2xpZGVyPi4gVGhpcyB3aWRnZXQgdGFrZSBpbiBzZXZlcmFsXHJcbiAqIHdheXMgdG8gY3VzdG9taXplLiBDdXJyZW50bHkgaXQgdGFrZXMgbWF4LCBtaW4sIGFuZCBvcmllbnRhdGlvbi4gSXQgaXNcclxuICogZXhwZWN0ZWQgdG8gdGFrZSBjb2xvciBhbmQgYnV0dG9uIGNvbG9yLiBleC5cclxuICogPGJvc3N5LXNsaWRlciBtYXg9XCIyMFwiIG1pbj1cIi01XCIgb3JpZW50YXRpb249XCJ2ZXJ0aWNhbFwiPjwvYm9zc3ktc2xpZGVyPiovXHJcbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xyXG5cclxuYW5ndWxhci5tb2R1bGUoJ2FwcC5kaXJlY3RpdmUuYm9zc3kuc2xpZGVyJywgW10pXHJcbiAgICAuY29udHJvbGxlcignU2xpZGVyQ29udHJvbGxlcicsIFsnJHNjb3BlJywgZnVuY3Rpb24gKCRzY29wZSkge1xyXG5cclxuXHJcbiAgICAgICAgLy90aGVzZSBhcmUgb3VyIGRlZmF1bHQgdmFsdWVzIGFuZCBhcmUgdGhlIHZhcmlhYmxlcyB0aGF0IGNhbiBiZSBjaGFuZ2VkIGJ5IHVzZXIgb2Ygb3VyIHdpZGdldHNcclxuICAgICAgICAkc2NvcGUubWF4ID0gMTA7XHJcbiAgICAgICAgJHNjb3BlLm1pbiA9IDE7XHJcbiAgICAgICAgJHNjb3BlLmZpbGxXaWR0aCA9IDA7XHJcbiAgICAgICAgJHNjb3BlLmVtcHRXaWR0aCA9IDA7XHJcblxyXG4gICAgICAgIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xyXG5cclxuICAgICAgICAvKm1ha2VCYXIoKVxyXG4gICAgICAgICAqIFRoaXMgY3JlYXRlcyB0aGUgaW5pdGlhbCBncmFwaGljIG9mIHRoZSBzbGlkZXIgYW5kIGVuc3VyZXMgaXQgaXMgaW4gdGhlIGNvcnJlY3Qgb3JkZXIqL1xyXG4gICAgICAgICRzY29wZS5tYWtlQmFyID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAvL2J1dHRvbiBzaG91bGQgc2hvdyB1cCBpbiB0aGUgbWlkZGxlIG5vdyBvciBjbG9zZSB0byBpZiB1bmV2ZW5cclxuICAgICAgICAgICAgJHNjb3BlLnZhbHVlID0gcGFyc2VJbnQoKCRzY29wZS5tYXggKyAkc2NvcGUubWluKSAvIDIpO1xyXG4gICAgICAgICAgICBmb3IgKHZhciBjdXJyZW50ID0gJHNjb3BlLm1pbjsgY3VycmVudCA8PSAkc2NvcGUubWF4OyBjdXJyZW50KyspIHtcclxuICAgICAgICAgICAgICAgIGlmIChjdXJyZW50IDwgKCRzY29wZS52YWx1ZSkpIHtcclxuICAgICAgICAgICAgICAgICAgICAkc2NvcGUuZmlsbFdpZHRoKys7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAoY3VycmVudCA+ICgkc2NvcGUudmFsdWUpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgJHNjb3BlLmVtcHRXaWR0aCsrO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKGN1cnJlbnQgPT0gKCRzY29wZS52YWx1ZSkpIHtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAkc2NvcGUubmdNb2RlbCA9ICRzY29wZS52YWx1ZTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXHJcblxyXG4gICAgICAgIC8qaW5jcmVhc2UoKVxyXG4gICAgICAgICAqIFRoaXMgY2hlY2tzIGJvdW5kcyB3aGVuIGF0dGVtcHRpbmcgdG8gaW5jcmVhc2UgdGhlIHZhbHVlIGFuZCBtb3ZlcyB0aGUgcG9zaXRpb25cclxuICAgICAgICAgKiBvZiB0aGUgc2xpZGVyIGJ1dHRvbiBhbmQgdXBkYXRlcyB0aGUgdmFsdWUuKi9cclxuICAgICAgICAkc2NvcGUuaW5jcmVhc2UgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGlmICgkc2NvcGUudmFsdWUgPCAkc2NvcGUubWF4KSB7XHJcbiAgICAgICAgICAgICAgICAkc2NvcGUudmFsdWUgPSAkc2NvcGUudmFsdWUgKyAxO1xyXG4gICAgICAgICAgICAgICAgJHNjb3BlLmZpbGxXaWR0aCsrO1xyXG4gICAgICAgICAgICAgICAgJHNjb3BlLmVtcHRXaWR0aC0tO1xyXG4gICAgICAgICAgICAgICAgJHNjb3BlLm5nTW9kZWwgPSAkc2NvcGUudmFsdWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXHJcblxyXG4gICAgICAgIC8qZGVjcmVhc2UoKVxyXG4gICAgICAgICAqIFRoaXMgY2hlY2tzIGJvdW5kcyB3aGVuIGF0dGVtcHRpbmcgdG8gZGVjcmVhc2UgdGhlIHZhbHVlIGFuZCBtb3ZlcyB0aGUgcG9zaXRpb25cclxuICAgICAgICAgKiBvZiB0aGUgc2xpZGVyIGJ1dHRvbiBhbmQgdXBkYXRlcyB0aGUgdmFsdWUuKi9cclxuICAgICAgICAkc2NvcGUuZGVjcmVhc2UgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGlmICgkc2NvcGUudmFsdWUgPiAkc2NvcGUubWluKSB7XHJcbiAgICAgICAgICAgICAgICAkc2NvcGUudmFsdWUgPSAkc2NvcGUudmFsdWUgLSAxO1xyXG4gICAgICAgICAgICAgICAgJHNjb3BlLmZpbGxXaWR0aC0tO1xyXG4gICAgICAgICAgICAgICAgJHNjb3BlLmVtcHRXaWR0aCsrO1xyXG4gICAgICAgICAgICAgICAgJHNjb3BlLm5nTW9kZWwgPSAkc2NvcGUudmFsdWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXHJcblxyXG4gICAgICAgIC8qa2V5QmluZCgkZXZlbnQpXHJcbiAgICAgICAgICogVGhpcyBmdW5jdGlvbiBpcyB0byBiaW5kIHRoZSBkZWNyZWFzZSBhbmQgaW5jcmVhc2UgZnVuY3Rpb24gd2l0aCB0aGUgYXJyb3cga2V5cyovXHJcbiAgICAgICAgJHNjb3BlLmtleUJpbmQgPSBmdW5jdGlvbiAoZXYpIHtcclxuICAgICAgICAgICAgJHNjb3BlLnByZXNzZWQgPSBldi53aGljaDtcclxuICAgICAgICAgICAgLy9JZiBhcnJvdyBrZXkoTGVmdCBvciBEb3duKSBpcyBwcmVzc2VkIHRoZW4gY2FsbCB0aGUgZGVjcmVhc2UoKSBmdW5jdGlvbiB0byBkZWNyZWFzZSB0aGUgdmFsdWUuXHJcbiAgICAgICAgICAgIGlmICgkc2NvcGUucHJlc3NlZCA9PT0gMzcgfHwgJHNjb3BlLnByZXNzZWQgPT09IDQwKSB7XHJcbiAgICAgICAgICAgICAgICAkc2NvcGUuZGVjcmVhc2UoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvL3NhbWUgYXMgYWJvdmUgYnV0IGZvciBVcCBvciBSaWdodCB0byBpbmNyZWFzZSB0aGUgdmFsdWUuXHJcbiAgICAgICAgICAgIGlmICgkc2NvcGUucHJlc3NlZCA9PT0gMzggfHwgJHNjb3BlLnByZXNzZWQgPT09IDM5KSB7XHJcbiAgICAgICAgICAgICAgICAkc2NvcGUuaW5jcmVhc2UoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfTtcclxuICAgICAgICAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cclxuXHJcbiAgICAgICAgLypkcmFnKClcclxuICAgICAgICAgKiBUaGlzIGZ1bmN0aW9uIGlzIHRvIGFsbG93IHRoZSBzbGlkZXIgYnV0dG9uIHRvIHNsaWRlIGFuZCB1cGRhdGUgdGhlIHZhbHVlIHdoZW4gcmVsZWFzZWQqL1xyXG4gICAgICAgICRzY29wZS5kcmFnID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBhbGVydChcImRyYWdcIik7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9O1xyXG4gICAgICAgIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xyXG5cclxuICAgICAgICAvKmJhckNsaWNrKClcclxuICAgICAgICAgKiBUaGlzIGZ1bmN0aW9uIGlzIHRvIGFsbG93IHRoZSB2YWx1ZSB0byBiZSBjaGFuZ2VkIHdoZW4gY2xpY2tpbmcgb24gdGhlIGJhciovXHJcbiAgICAgICAgJHNjb3BlLmJhckNsaWNrID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBhbGVydChcImJhciBjbGlja1wiKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXHJcblxyXG5cclxuICAgIH1dKS5kaXJlY3RpdmUoJ2Jvc3N5U2xpZGVyJywgZnVuY3Rpb24gKCRjb21waWxlKSB7XHJcbiAgICAgICAgdmFyIG15VGVtcGxhdGU7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgLy9hbGxvd3MgdGhlIHNsaWRlciB0byBiZSBjcmVhdGVkIGFzIGFuZCBhdHRyaWJ1dGUgb3IgZWxlbWVudCA8Ym9zc3ktc2xpZGVyPjxib3NzeS1zbGlkZXI+XHJcbiAgICAgICAgICAgIHJlc3RyaWN0OiAnQUUnLFxyXG4gICAgICAgICAgICBjb250cm9sbGVyOiAnU2xpZGVyQ29udHJvbGxlcicsXHJcbiAgICAgICAgICAgIHNjb3BlOiB7XHJcbiAgICAgICAgICAgICAgICBuZ01vZGVsOiAnPSdcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgLypsaW5rOiBmdW5jdGlvbjpcclxuICAgICAgICAgICAgKiBUaGlzIGFsbG93cyB1cyB0byBwdWxsIGluIHRoZSBzZXR0aW5ncyB0aGUgcHJvZ3JhbW1lciB3YW50cyBmb3IgdGhlIHNsaWRlciBhbmQgc2V0IHRoaW5ncyBjb3JyZWN0bHlcclxuICAgICAgICAgICAgKiBpdCBhbHNvIGluaXRpYWxpemVzIHRoZSBzbGlkZXIgYW5kIGFkZHMgdGhlIGNvcnJlY3Qgb3JpZW50YXRpb24gdGVtcGxhdGUgdG8gdGhlIERPTSovXHJcbiAgICAgICAgICAgIGxpbms6IGZ1bmN0aW9uIChzY29wZSwgaUVsZW0sIGlBdHRyKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgLy9jaGVja3MgdG8gc2VlIGlmIHRoZXJlIGlzIGEgbWF4IGF0dHJpYnV0ZVxyXG4gICAgICAgICAgICAgICAgaWYgKGlBdHRyLm1heCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHNjb3BlLm1heCA9IHBhcnNlSW50KGlBdHRyLm1heCk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHNjb3BlLm1heCA9PT0gTmFOKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNjb3BlLm1heCA9IDEwO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIC8vY2hlY2tzIHRvIHNlZSBpZiB0aGVyZSBpcyBhIG1pbiBhdHRyaWJ1dGVcclxuICAgICAgICAgICAgICAgIGlmIChpQXR0ci5taW4pIHtcclxuICAgICAgICAgICAgICAgICAgICBzY29wZS5taW4gPSBwYXJzZUludChpQXR0ci5taW4pO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChzY29wZS5taW4gPT09IE5hTikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzY29wZS5taW4gPSAxO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIC8vY2hlY2tzIGZvciBiYXIgY29sb3IgY3VzdG9taXphdGlvblxyXG4gICAgICAgICAgICAgICAgc2NvcGUuYmFyZmlsbGNvbG9yID0gXCIjMDAwMEZGXCI7XHJcbiAgICAgICAgICAgICAgICBpZiAoaUF0dHIuYmFyZmlsbGNvbG9yKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHBhdHRlcm4gPSAvXiNbMC05YS1mQS1GXXs2fSQvOyAvL2N1cnJlbnRseSBhY2NlcHRzIGxvd2VyIGNhc2UgYS1mXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHBhdHRlcm4udGVzdChpQXR0ci5iYXJmaWxsY29sb3IpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNjb3BlLmJhcmZpbGxjb2xvciA9IGlBdHRyLmJhcmZpbGxjb2xvcjtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAvL2NoZWNrcyBmb3IgZW1wdHkgYmFyIGNvbG9yIGN1c3RvbWl6YXRpb25cclxuICAgICAgICAgICAgICAgIHNjb3BlLmJhcmVtcHR5Y29sb3IgPSBcIiNEM0QzRDNcIjtcclxuICAgICAgICAgICAgICAgIGlmIChpQXR0ci5iYXJlbXB0eWNvbG9yKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHBhdHRlcm4gPSAvXiNbMC05YS1mQS1GXXs2fSQvOyAvL2N1cnJlbnRseSBhY2NlcHRzIGxvd2VyIGNhc2UgYS1mXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHBhdHRlcm4udGVzdChpQXR0ci5iYXJlbXB0eWNvbG9yKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzY29wZS5iYXJlbXB0eWNvbG9yID0gaUF0dHIuYmFyZW1wdHljb2xvcjtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgc2NvcGUuYnV0dG9uY29sb3IgPSBcIiNGRjAwMDBcIjtcclxuICAgICAgICAgICAgICAgIGlmIChpQXR0ci5idXR0b25jb2xvcikge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBwYXR0ZXJuID0gL14jWzAtOWEtZkEtRl17Nn0kLzsgLy9jdXJyZW50bHkgYWNjZXB0cyBsb3dlciBjYXNlIGEtZlxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChwYXR0ZXJuLnRlc3QoaUF0dHIuYnV0dG9uY29sb3IpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNjb3BlLmJ1dHRvbmNvbG9yID0gaUF0dHIuYnV0dG9uY29sb3I7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgLy9jaGVja3MgdG8gc2VlIGlmIHRoZXJlIGlzIGEgb3JpZW50YXRpb24gYXR0cmlidXRlIGlmIHRoZXJlIGlzIHNldCBvdXIgdGVtcGxhdGUgdG8gdGhlIHZlcnRpY2FsIHRlbXBsYXRlXHJcbiAgICAgICAgICAgICAgICBpZiAoaUF0dHIub3JpZW50YXRpb24pIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoJ3ZlcnRpY2FsJyA9PT0gaUF0dHIub3JpZW50YXRpb24pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbXlUZW1wbGF0ZSA9ICc8YnV0dG9uIG5nLWNsaWNrPVwiaW5jcmVhc2UoKVwiIG5nLWtleWRvd249XCJrZXlCaW5kKCRldmVudClcIj4rPC9idXR0b24+JyArXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICc8ZGl2IG5nLWNsaWNrPVwiYmFyQ2xpY2soKVwiIHN0eWxlPVwibWFyZ2luLWxlZnQ6OXB4O3dpZHRoOjNweDtoZWlnaHQ6e3sxMCAqIGVtcHRXaWR0aH19cHg7YmFja2dyb3VuZC1jb2xvcjonICsgc2NvcGUuYmFyZW1wdHljb2xvciArICc7bWFyZ2luLWJvdHRvbTo0cHhcIj48L2Rpdj4nICtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJzxkaXYgbmctbW91c2Vkb3duPVwiZHJhZygpXCIgc3R5bGU9XCJtYXJnaW4tdG9wOi00cHg7bWFyZ2luLWxlZnQ6NXB4O3dpZHRoOjEwcHg7aGVpZ2h0OjEwcHg7YmFja2dyb3VuZC1jb2xvcjonICsgc2NvcGUuYnV0dG9uY29sb3IgKyAnO2JvcmRlci1yYWRpdXM6NTAlO1wiPjwvZGl2PicgK1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAnPGRpdiBuZy1jbGljaz1cImJhckNsaWNrKClcIiBzdHlsZT1cIm1hcmdpbi1sZWZ0OjlweDt3aWR0aDozcHg7aGVpZ2h0Ont7MTAgKiBmaWxsV2lkdGh9fXB4O2JhY2tncm91bmQtY29sb3I6JyArIHNjb3BlLmJhcmZpbGxjb2xvciArICc7bWFyZ2luLWJvdHRvbTo0cHhcIj48L2Rpdj4nICtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJzxidXR0b24gbmctY2xpY2s9XCJkZWNyZWFzZSgpXCIgbmcta2V5ZG93bj1cImtleUJpbmQoJGV2ZW50KVwiPi08L2J1dHRvbj4nO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vdGhpcyBidWlsZHMgb3VyIGhvcml6b250YWwgdGVtcGxhdGVcclxuICAgICAgICAgICAgICAgICAgICBteVRlbXBsYXRlID0gJzxidXR0b24gbmctY2xpY2s9XCJkZWNyZWFzZSgpXCIgbmcta2V5ZG93bj1cImtleUJpbmQoJGV2ZW50KVwiPi08L2J1dHRvbj4nICtcclxuICAgICAgICAgICAgICAgICAgICAnPGRpdiBuZy1jbGljaz1cImJhckNsaWNrKClcIiBzdHlsZT1cImRpc3BsYXk6aW5saW5lLWJsb2NrO3dpZHRoOnt7MTAgKiBmaWxsV2lkdGh9fXB4O2hlaWdodDozcHg7YmFja2dyb3VuZC1jb2xvcjonICsgc2NvcGUuYmFyZmlsbGNvbG9yICsgJzttYXJnaW4tYm90dG9tOjRweFwiPjwvZGl2PicgK1xyXG4gICAgICAgICAgICAgICAgICAgICc8ZGl2IG5nLW1vdXNlZG93bj1cImRyYWcoKVwiIHN0eWxlPVwiZGlzcGxheTppbmxpbmUtYmxvY2s7d2lkdGg6MTBweDtoZWlnaHQ6MTBweDtiYWNrZ3JvdW5kLWNvbG9yOicgKyBzY29wZS5idXR0b25jb2xvciArICc7Ym9yZGVyLXJhZGl1czo1MCU7XCI+PC9kaXY+JyArXHJcbiAgICAgICAgICAgICAgICAgICAgJzxkaXYgbmctY2xpY2s9XCJiYXJDbGljaygpXCIgc3R5bGU9XCJkaXNwbGF5OmlubGluZS1ibG9jazt3aWR0aDp7ezEwICogZW1wdFdpZHRofX1weDtoZWlnaHQ6M3B4O2JhY2tncm91bmQtY29sb3I6JyArIHNjb3BlLmJhcmVtcHR5Y29sb3IgKyAnO21hcmdpbi1ib3R0b206NHB4XCI+PC9kaXY+JyArXHJcbiAgICAgICAgICAgICAgICAgICAgJzxidXR0b24gbmctY2xpY2s9XCJpbmNyZWFzZSgpXCIgbmcta2V5ZG93bj1cImtleUJpbmQoJGV2ZW50KVwiPis8L2J1dHRvbj4nO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgLy9XZSBzaG93IG91ciB0ZW1wbGF0ZSBhbmQgdGhlbiBjb21waWxlIGl0IHNvIHRoZSBET00ga25vd3MgYWJvdXQgb3VyIG5nIGZ1bmN0aW9uc1xyXG4gICAgICAgICAgICAgICAgaUVsZW0uaHRtbChteVRlbXBsYXRlKTtcclxuICAgICAgICAgICAgICAgICRjb21waWxlKGlFbGVtLmNvbnRlbnRzKCkpKHNjb3BlKTtcclxuICAgICAgICAgICAgICAgIC8vY3JlYXRlIHRoZSBpbml0aWFsIGJhclxyXG4gICAgICAgICAgICAgICAgc2NvcGUubWFrZUJhcigpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSk7IiwiYW5ndWxhci5tb2R1bGUoJ2Jvc3N5LnRvb2x0aXAnLCBbXSlcclxuICAgIC5kaXJlY3RpdmUoJ2Jvc3N5VG9vbHRpcCcsIGZ1bmN0aW9uKCkge1xyXG4gICAgXHJcbiAgICAgICAgLy8gUHJpdmF0ZSBtZW1iZXIgYXJyYXkgY29udGFpbmluZyBhbGwga25vd24gcG9zaXRpb25zXHJcbiAgICAgICAgcG9zID0gWyduJywnbmUnLCdlJywnc2UnLCdzJywnc3cnLCd3JywnbncnXTtcclxuICAgICAgICBcclxuICAgICAgICBmdW5jdGlvbiBfbW92ZVRpcCgkcGFyZW50LCAkdGlwLCBjdXJQb3MpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZihjdXJQb3MgPT0gJ24nKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAkdGlwLnN0eWxlLmxlZnQgPSAkcGFyZW50Lm9mZnNldExlZnQgKyAoJHBhcmVudC5vZmZzZXRXaWR0aCAvIDIpIC0gKCR0aXAub2Zmc2V0V2lkdGggLyAyKSArICdweCc7XHJcbiAgICAgICAgICAgICAgICAkdGlwLnN0eWxlLnRvcCA9ICRwYXJlbnQub2Zmc2V0VG9wIC0gJHRpcC5vZmZzZXRIZWlnaHQgKyAncHgnO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgaWYoY3VyUG9zID09ICduZScpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICR0aXAuc3R5bGUubGVmdCA9ICRwYXJlbnQub2Zmc2V0TGVmdCArICRwYXJlbnQub2Zmc2V0V2lkdGggKyAncHgnO1xyXG4gICAgICAgICAgICAgICAgJHRpcC5zdHlsZS50b3AgPSAkcGFyZW50Lm9mZnNldFRvcCAtICR0aXAub2Zmc2V0SGVpZ2h0ICsgJ3B4JztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIGlmKGN1clBvcyA9PSAnZScpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICR0aXAuc3R5bGUubGVmdCA9ICRwYXJlbnQub2Zmc2V0TGVmdCArICRwYXJlbnQub2Zmc2V0V2lkdGggKyAncHgnO1xyXG4gICAgICAgICAgICAgICAgJHRpcC5zdHlsZS50b3AgPSAkcGFyZW50Lm9mZnNldFRvcCArICgkcGFyZW50Lm9mZnNldEhlaWdodCAvIDIpIC0gKCR0aXAub2Zmc2V0SGVpZ2h0IC8gMikgKyAncHgnO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgaWYoY3VyUG9zID09ICdzZScpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICR0aXAuc3R5bGUubGVmdCA9ICRwYXJlbnQub2Zmc2V0TGVmdCArICRwYXJlbnQub2Zmc2V0V2lkdGggKyAncHgnO1xyXG4gICAgICAgICAgICAgICAgJHRpcC5zdHlsZS50b3AgPSAkcGFyZW50Lm9mZnNldFRvcCArICRwYXJlbnQub2Zmc2V0SGVpZ2h0ICsgJ3B4JztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIGlmKGN1clBvcyA9PSAncycpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICR0aXAuc3R5bGUubGVmdCA9ICRwYXJlbnQub2Zmc2V0TGVmdCArICgkcGFyZW50Lm9mZnNldFdpZHRoIC8gMikgLSAoJHRpcC5vZmZzZXRXaWR0aCAvIDIpICsgJ3B4JztcclxuICAgICAgICAgICAgICAgICR0aXAuc3R5bGUudG9wID0gJHBhcmVudC5vZmZzZXRUb3AgKyAkcGFyZW50Lm9mZnNldEhlaWdodCArICdweCc7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSBpZihjdXJQb3MgPT0gJ3N3JylcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgJHRpcC5zdHlsZS5sZWZ0ID0gJHBhcmVudC5vZmZzZXRMZWZ0IC0gJHRpcC5vZmZzZXRXaWR0aCArICdweCc7XHJcbiAgICAgICAgICAgICAgICAkdGlwLnN0eWxlLnRvcCA9ICRwYXJlbnQub2Zmc2V0VG9wICsgJHBhcmVudC5vZmZzZXRIZWlnaHQgKyAncHgnO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgaWYoY3VyUG9zID09ICd3JylcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgJHRpcC5zdHlsZS5sZWZ0ID0gJHBhcmVudC5vZmZzZXRMZWZ0IC0gJHRpcC5vZmZzZXRXaWR0aCArICdweCc7XHJcbiAgICAgICAgICAgICAgICAkdGlwLnN0eWxlLnRvcCA9ICRwYXJlbnQub2Zmc2V0VG9wICsgKCRwYXJlbnQub2Zmc2V0SGVpZ2h0IC8gMikgLSAoJHRpcC5vZmZzZXRIZWlnaHQgLyAyKSArICdweCc7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAkdGlwLnN0eWxlLmxlZnQgPSAkcGFyZW50Lm9mZnNldExlZnQgLSAkdGlwLm9mZnNldFdpZHRoICsgJ3B4JztcclxuICAgICAgICAgICAgICAgICR0aXAuc3R5bGUudG9wID0gJHBhcmVudC5vZmZzZXRUb3AgLSAkdGlwLm9mZnNldEhlaWdodCArICdweCc7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgZnVuY3Rpb24gX2NoZWNrUG9zKCR0aXApXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2YXIgcmVjdCA9ICR0aXAuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICAgICAgcmVjdC50b3AgPj0gMCAmJlxyXG4gICAgICAgICAgICAgICAgcmVjdC5sZWZ0ID49IDAgJiZcclxuICAgICAgICAgICAgICAgIHJlY3QuYm90dG9tIDw9ICh3aW5kb3cuaW5uZXJIZWlnaHQgfHwgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsaWVudEhlaWdodCkgJiZcclxuICAgICAgICAgICAgICAgIHJlY3QucmlnaHQgPD0gKHdpbmRvdy5pbm5lcldpZHRoIHx8IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGllbnRXaWR0aClcclxuICAgICAgICAgICAgKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgcmVzdHJpY3Q6ICdBJyxcclxuICAgICAgICAgICAgc2NvcGU6IHt9LFxyXG5cdFx0XHRyZXBsYWNlOiB0cnVlLFxyXG4gICAgICAgICAgICBsaW5rOiBmdW5jdGlvbihzY29wZSwgZWxlbWVudCwgYXR0cnMpIHtcclxuICAgICAgICAgICAgICAgIGlmKHR5cGVvZiBhdHRycy50aXRsZSAhPT0gXCJzdHJpbmdcIiAmJiB0eXBlb2YgYXR0cnMuYm9keSAhPT0gXCJzdHJpbmdcIilcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKFwiRXJyb3I6IE5vIHRpdGxlIG9yIGJvZHkgaW5mb3JtYXRpb24gcHJvdmlkZWQuXCIpO1xyXG4gICAgICAgICAgICAgICAgaWYoIWF0dHJzLnBvc2l0aW9uIHx8IHR5cGVvZiBhdHRycy5wb3NpdGlvbiAhPT0gJ3N0cmluZycgfHwgcG9zLmluZGV4T2YoYXR0cnMucG9zaXRpb24pIDwgMClcclxuICAgICAgICAgICAgICAgICAgICBhdHRycy5wb3NpdGlvbiA9ICduJztcclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgLy8gQ3JlYXRlIHRpcCBlbGVtZW50XHJcbiAgICAgICAgICAgICAgICB2YXIgJHRpcCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAvLyBBcHBlbmQgdG8gRE9NXHJcbiAgICAgICAgICAgICAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKCR0aXApO1xyXG4gICAgICAgICAgICAgICAgJHRpcC5zdHlsZS5wb3NpdGlvbiA9ICdhYnNvbHV0ZSc7XHJcbiAgICAgICAgICAgICAgICAkdGlwLmlubmVySFRNTCA9ICc8c3Bhbj4nKyBhdHRycy50aXRsZSArJzwvc3Bhbj48ZGl2PicrIGF0dHJzLmJvZHkgKyc8L2Rpdj4nO1xyXG4gICAgICAgICAgICAgICAgJHRpcC5jbGFzc05hbWUgPSAnYm9zc3lUb29sdGlwJztcclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgLy8gRmluZCBiZXN0IGxvY2F0aW9uIHN0YXJ0aW5nIHdpdGggYXR0cnMucG9zaXRpb25cclxuICAgICAgICAgICAgICAgIHZhciBpID0gMDtcclxuICAgICAgICAgICAgICAgIGRvXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgbG9ja2VkID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICBfbW92ZVRpcChlbGVtZW50WzBdLCAkdGlwLCBhdHRycy5wb3NpdGlvbik7XHJcbiAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gV3JhcCBhcm91bmQgYXJyYXkgaWYgdGhlIGVuZCBpcyBoaXRcclxuICAgICAgICAgICAgICAgICAgICBpZihhdHRycy5wb3NpdGlvbiA9PSAnbncnKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBhdHRycy5wb3NpdGlvbiA9ICduJztcclxuICAgICAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGF0dHJzLnBvc2l0aW9uID0gcG9zW3Bvcy5pbmRleE9mKGF0dHJzLnBvc2l0aW9uKSArIDFdO1xyXG4gICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIC8vIENvbnRpbnVlIHRvIGxvb3AgaWYgJHRpcCBpcyBjbGlwcGVkXHJcbiAgICAgICAgICAgICAgICAgICAgaWYoIV9jaGVja1BvcygkdGlwKSlcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxvY2tlZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICBpZihpID09IDgpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICsraTtcclxuICAgICAgICAgICAgICAgIH0gd2hpbGUobG9ja2VkID09IGZhbHNlKTtcclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgLy8gSGlkZSBpdCB1bnRpbCBtb3VzZSBldmVudFxyXG4gICAgICAgICAgICAgICAgJHRpcC5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAvLyBNb3VzZSBldmVudHNcclxuICAgICAgICAgICAgICAgIGVsZW1lbnQub24oJ21vdXNlZW50ZXInLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgICAgICAkdGlwLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5vbignbW91c2VsZWF2ZScsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICR0aXAuc3R5bGUuZGlzcGxheSA9ICdub25lJztcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG4gICAgfSk7Il0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9