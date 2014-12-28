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
	.run(function($templateCache){
        $templateCache.put('bossy-dropdown.html', '<div><select ng-options="item[dropdown.title] for item in dropdown.items | orderBy: dropdown.title" ng-model="selectedItem" ng-change="dropdown.updateSelectedItem(selectedItem)"><option value="" ng-hide="selectedItem">Please select one...</option></select></div>');	
    })
	.directive('bossyDropdown', function($http, $compile) {
		return {
			restrict: 'EA',
			scope: {
				config: "=",
				select: "=",
				items: "="
			},
			templateUrl: '',
			link: function(scope, element, attrs) {
				var customTemplate;

				//Checks if user is defining a url or inner html
				//If it is a url, the template must be located in a local directory or added to the DOM via ng-include
				if(scope.dropdown.template[0] !== '<')
					customTemplate = $compile('<ng-include src="dropdown.template"></ng-include>')(scope);
				else
					customTemplate = $compile(scope.dropdown.template)(scope);
				
				//Injects template
				element.replaceWith(customTemplate);
			},
			controller: function($scope) {
				var thisDropdown = this;
				thisDropdown.title = $scope.config.title;
				thisDropdown.items = [];

				//Retrieve json containing objects to populate the dropdown.
				if($scope.config.src) {
					//Checks that config.src is a JSON file.
					if($scope.config.src.substr($scope.config.src.length-5, $scope.config.src.length) == '.json') {
						$http.get($scope.config.src)
							.success(function(data) {
								thisDropdown.items = data;
								//Checks validity of the title field as it applies to the JSON.
								if(!thisDropdown.items[0].hasOwnProperty(thisDropdown.title))
									console.error("ERROR: $scope.config.title: \'" + $scope.config.title + "\'' is not a member of the loaded JSON data. Please specify a valid \'title\' to list.");
								//Attaches retrieved items to $scope.items for additional functionality.
								if($scope.items)
									$scope.items = thisDropdown.items;
							})
							.error(function(data) {
								console.error("ERROR: Fail to load JSON data from the path: \'" + $scope.config.src + "\'");
							});
					}
					//Logs an error to identify that a json file was not loaded.
					else {
						console.error( "ERROR: \'$scope.config.src\': \'" + $scope.config.src + "\' is not a valid JSON file.");
					}
					//Function called to update select in the template.
					thisDropdown.updateSelectedItem = function(selectedItem) {
						//Single select object tied to the config object.
						if($scope.config.select)
							$scope.config.select = selectedItem;
						//User can collect and utilize multiple select objects with the same config object if passing in a distinct select param.
						if($scope.select)
							$scope.select = selectedItem;
					};
					//Determine if custom template Url has been defined.
					if($scope.config.template)
						thisDropdown.template = $scope.config.template;
					else {
						thisDropdown.template = 'bossy-dropdown.html';
					}
				}
				//Logs an error if 'src' has not been defined.
				else {
					console.error( "ERROR: \'$scope.config.src\' has not been specified within the \'config\' object. Please pass in a valid path to a JSON file.");
				};
			},
			controllerAs: 'dropdown'
		};
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
 * ways to customize. List of customizations available.
 * max              defaults to 100
 * min              defaults to 1
 * width            defaults to 250px
 * barfillcolor     defaults to darkblue: must be passed as hexadecimal color format #000000
 * baremptycolor    defaults to lightgrey
 * buttoncolor      defaults to red
 * step             defaults to red
 * orientation      defaults to horizontal
 * ex.
 * <bossy-slider max="20" min="-5" orientation="vertical"></bossy-slider>*/
///////////////////////////////////////////////////////////////////////////////////////////////////////////////

var app = angular.module('bossy.slider', []);
app.controller('SliderController', ['$scope', function ($scope) {
    //these are our default values and are the variables that can be changed by user of our widgets
    $scope.max = 10;
    $scope.value = 0;
    $scope.min = 1;
    $scope.fillWidth = 0;
    $scope.emptWidth = 0;
    $scope.barWidth = 250;
    $scope.barPiece = 0;
    $scope.step = 1;
    $scope.isMouseDown = 0;
    $scope.yCord = 0;
    $scope.xCord = 0;
    $scope.newXCord = 0;
    $scope.newYCord = 0;
    $scope.orientation = false;
    $scope.butSize = 15;
    $scope.barfillcolor = "#0000FF";
    $scope.baremptycolor = "#D3D3D3";
    $scope.buttoncolor = "#FF0000";


    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////

    /*makeBar()
     * This creates the initial graphic of the slider and ensures it is in the correct order
     * CC = 4 */
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
     * of the slider button and updates the value.
     * CC = 2*/
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

    /*butIncrease()
     * This function allows the slider to increase in increments.
     * CC = 1*/
    $scope.butIncrease = function () {
        var i = 0;
        for (i = 0; i < $scope.step; i++) {
            $scope.increase();
        }
        return;
    }
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////

    /*decrease()
     * This checks bounds when attempting to decrease the value and moves the position
     * of the slider button and updates the value.
     * CC = 2*/
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

    /*butDecrease()
     * This function allows the slider to decrease in increments
     * CC = 1*/
    $scope.butDecrease = function () {
        var i = 0;
        for (i = 0; i < $scope.step; i++) {
            $scope.decrease();
        }
        return;
    }
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////

    /*keyBind($event)
     * This function is to bind the decrease and increase function with the arrow keys
     * CC = 5*/
    $scope.keyBind = function (ev) {
        $scope.pressed = ev.which;
        //If arrow key(Left or Down) is pressed then call the decrease() function to decrease the value.
        if ($scope.pressed === 37 || $scope.pressed === 40) {
            $scope.butDecrease();

        }
        //same as above but for Up or Right to increase the value.
        if ($scope.pressed === 38 || $scope.pressed === 39) {
            $scope.butIncrease();

        }
        return;
    };
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////

    /*greyClick()
     * This function is to allow the value to be changed when clicking on the bar
     * CC = 1*/
    $scope.greyClick = function (event) {
        //When click on the empty bar the bar will increase
        $scope.butIncrease();

        return;
    };
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////

    /*barClick()
     * This function is to allow the value to be changed when clicking on the bar
     * CC = 1*/
    $scope.barClick = function (event) {
        //When click on the Filled up color side the bar will decrease
        $scope.butDecrease();

        return;
    };
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////

    /*drag($event)
     * This function allows the button to drag by finding its location then checks it against its original location
     * and if it is distance is greater than the size of a barpiece update the graphic and value
     * CC = 9*/
    $scope.drag = function (event) {

        //grab the mouse location
        var x = event.clientX;
        var y = event.clientY;
        //check if the mouse is being held down
        if ($scope.isMouseDown) {
            //check the orientation
            if ($scope.orientation) {
                //if this is the first time you clicked down get ready to move it
                if ($scope.yCord === 0) {
                    $scope.yCord = y;
                }
                else {
                    //change the location of the slider after enough movement
                    $scope.newYCord = y;
                    while (($scope.newYCord - $scope.yCord) > $scope.barPiece / 2) {
                        $scope.yCord += $scope.barPiece;
                        $scope.decrease();
                    }
                    while (($scope.newYCord - $scope.yCord) < -($scope.barPiece / 2)) {
                        $scope.yCord -= $scope.barPiece;
                        $scope.increase();
                    }
                }
            }
            else {
                //if this is the first time you clicked down get ready to move it
                if ($scope.xCord === 0) {
                    $scope.xCord = x;
                }
                else {
                    //change the location of the slider after enough movement
                    $scope.newXCord = x;
                    while (($scope.newXCord - $scope.xCord) > $scope.barPiece / 2) {
                        $scope.xCord += $scope.barPiece;
                        $scope.increase();
                    }
                    while (($scope.newXCord - $scope.xCord) < -($scope.barPiece / 2)) {
                        $scope.xCord -= $scope.barPiece;
                        $scope.decrease();
                    }
                }
            }
        }
        return;
    };
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////

    /*down()
     * This function logs when the mouse is down
     * CC = 1*/
    $scope.down = function () {
        $scope.newXCord = 0;
        $scope.xCord = 0;
        $scope.newYCord = 0;
        $scope.yCord = 0;
        $scope.isMouseDown = 1;
        return;
    };
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////

    /*down()
     * This function logs when the mouse is up
     * CC = 1*/
    $scope.up = function () {
        $scope.newXCord = 0;
        $scope.xCord = 0;
        $scope.newYCord = 0;
        $scope.yCord = 0;
        $scope.isMouseDown = 0;
        return;
    };
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////
}])
app.directive('bossySlider', function ($compile) {
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
        link: {
            pre: function (scope, iElem, iAttr) {

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
                if (iAttr.barfillcolor) {
                    var pattern = /^#[0-9a-fA-F]{6}$/; //currently accepts lower case a-f
                    if (pattern.test(iAttr.barfillcolor)) {
                        scope.barfillcolor = iAttr.barfillcolor;
                    }
                }
                //checks for empty bar color customization

                if (iAttr.baremptycolor) {
                    var pattern = /^#[0-9a-fA-F]{6}$/; //currently accepts lower case a-f
                    if (pattern.test(iAttr.baremptycolor)) {
                        scope.baremptycolor = iAttr.baremptycolor;
                    }
                }


                if (iAttr.buttoncolor) {
                    var pattern = /^#[0-9a-fA-F]{6}$/; //currently accepts lower case a-f
                    if (pattern.test(iAttr.buttoncolor)) {
                        scope.buttoncolor = iAttr.buttoncolor;
                    }
                }
                //find the step size for button clicks
                if (iAttr.step) {
                    scope.step = iAttr.step;
                }
                //find the preferred total width to use for the slider
                if (iAttr.width) {
                    scope.barWidth = iAttr.width;
                    scope.barPiece = (scope.barWidth / (scope.max - scope.min));
                }
                else {
                    scope.barPiece = (scope.barWidth / (scope.max - scope.min));
                }
                //checks to see if there is a orientation attribute if there is set our template to the vertical template
                if (iAttr.orientation) {
                    if ('vertical' === iAttr.orientation) {
                        scope.orientation = true;
                        myTemplate = '<div onselectstart="return false;" ondragstart="return false;"ng-mouseleave="up()" ng-mousemove="drag($event)">' +
                        '<div ng-mousemove="drag($event)" ng-mouseup="up()" ng-click="greyClick()"style="cursor:pointer;margin-left:9px;width:5px;height:{{barPiece * emptWidth}}px;background-color:' + scope.baremptycolor + ';margin-bottom:4px"></div>' +
                        '<div ng-mousemove="drag($event)" ng-mousedown="down()" ng-mouseup="up()" orientation="vertical" style="cursor:ns-resize;margin-top:-4px;margin-left:5px;width:15px;height:15px;background-color:' + scope.buttoncolor + ';border-radius:50%;"></div>' +
                        '<div ng-mousemove="drag($event)" ng-mouseup="up()" ng-click="barClick()"style="cursor:pointer;margin-left:9px;width:5px;height:{{barPiece * fillWidth}}px;background-color:' + scope.barfillcolor + ';margin-bottom:4px"></div>' +
                        '</div>';
                    }
                    else {
                        myTemplate = '<div onselectstart="return false;" ondragstart="return false;" ng-mouseleave="up()"ng-mousemove="drag($event)">' +
                        '<div ng-mousemove="drag($event)" ng-mouseup="up()" ng-click="barClick()"style="cursor:pointer;display:inline-block;width:{{barPiece * fillWidth}}px;height:5px;background-color:' + scope.barfillcolor + ';margin-bottom:4px"></div>' +
                        '<div ng-mousemove="drag($event)" ng-mousedown="down()" ng-mouseup="up()" orientation="horizontal" style="cursor:ew-resize;display:inline-block;width:{{butSize}}px;height:{{butSize}}px;background-color:' + scope.buttoncolor + ';border-radius:50%;"></div>' +
                        '<div ng-mousemove="drag($event)" ng-mouseup="up()" ng-click="greyClick()"style="cursor:pointer;display:inline-block;width:{{barPiece * emptWidth}}px;height:5px;background-color:' + scope.baremptycolor + ';margin-bottom:4px"></div>' +
                        '</div>';
                    }
                }
                else {
                    //this builds our horizontal template
                    myTemplate = '<div onselectstart="return false;" ondragstart="return false;" ng-mouseleave="up()"ng-mousemove="drag($event)">' +
                    '<div ng-mousemove="drag($event)" ng-mouseup="up()" ng-click="barClick()"style="cursor:pointer;display:inline-block;width:{{barPiece * fillWidth}}px;height:5px;background-color:' + scope.barfillcolor + ';margin-bottom:4px"></div>' +
                    '<div ng-mousemove="drag($event)" ng-mousedown="down()" ng-mouseup="up()" orientation="horizontal" style="cursor:ew-resize;display:inline-block;width:{{butSize}}px;height:{{butSize}}px;background-color:' + scope.buttoncolor + ';border-radius:50%;"></div>' +
                    '<div ng-mousemove="drag($event)" ng-mouseup="up()" ng-click="greyClick()"style="cursor:pointer;display:inline-block;width:{{barPiece * emptWidth}}px;height:5px;background-color:' + scope.baremptycolor + ';margin-bottom:4px"></div>' +
                    '</div>';
                }
                //We show our template and then compile it so the DOM knows about our ng functions
                iElem.html(myTemplate);
                $compile(iElem.contents())(scope);
                //create the initial bar
                scope.makeBar();
                return;
            }
        }
    }
});


angular.module('bossy.tooltip', [])
    .directive('bossyTooltip', function() {
    
        // Private member array containing all known positions
        _pos = ['n','ne','e','se','s','sw','w','nw'];
        
        // Move the tip to a certain position
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
        
        // Check to see if the tip is within the window
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
            restrict: 'E',
            scope: {
                config: "="
            },
            replace: true,
            link: function(scope, element, attrs) {
            
                // If the user doesn't provide essential information, error out
                if(!scope.config.title || !scope.config.body)
                {
                    console.error("Error: No title or body information provided.");
                    return 1;
                }
                
                // If the user doesn't provide a position, default 'north'
                if(!scope.config.position || typeof scope.config.position !== 'string' || _pos.indexOf(scope.config.position) < 0)
                {
                    scope.config.position = 'n';
                }
                
                // Create tip element
                var $tip = document.createElement('div');
                
                // Append to DOM
                document.body.appendChild($tip);
                $tip.style.position = 'absolute';
                $tip.innerHTML = '<span>'+ scope.config.title +'</span><div>'+ scope.config.body +'</div>';
                $tip.className = 'bossyTooltip';
                
                // Disable browser's tooltip
                element[0].title = '';
                console.log(element);
                
                var i = 0;
                do
                {
                    locked = true;
                    _moveTip(element[0], $tip, scope.config.position);
                    
                    // Continue to loop if $tip is clipped
                    if(!_checkPos($tip))
                    {
                        locked = false;
                        
                        // Wrap around array if the end is hit
                        if(scope.config.position == 'nw')
                            scope.config.position = 'n';
                        else
                            scope.config.position = _pos[_pos.indexOf(scope.config.position) + 1];
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImJvc3N5LmpzIiwiYm9zc3kuY2FsZW5kYXIuanMiLCJib3NzeS5jb21ib2JveC5jYXNjYWRpbmdEcm9wZG93bi5qcyIsImJvc3N5LmNvbWJvYm94LmNoZWNrYm94TXVsdGlzZWxlY3QuanMiLCJib3NzeS5jb21ib2JveC5tdWx0aXNlbGVjdC5qcyIsImJvc3N5LmRhdGEuanMiLCJib3NzeS5kcm9wZG93bi5qcyIsImJvc3N5LmZvcm0uanMiLCJib3NzeS5pbnB1dC5qcyIsImJvc3N5Lm51bWVyaWN0ZXh0Ym94LmpzIiwiYm9zc3kuc2NoZW1hLmpzIiwiYm9zc3kuc2xpZGVyLmpzIiwiYm9zc3kudG9vbHRpcC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUMxQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUM1SkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUN4QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUM1R0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ2pKQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUMzREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDN0VBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNsSUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDakJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUN4RkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUMxQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ2pWQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJib3NzeS5hbGwuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiFcbiAqIGJvc3N5LmpzXG4gKi9cblxuLyohXG4gKiBodHRwOi8vQm9zc3lVSS5jb20vXG4gKlxuICogQm9zc3lVSSAtIENyZWF0ZWQgd2l0aCBMT1ZFIGJ5IEJ1aWxkLmNvbSBPcGVuIFNvdXJjZSBDb25zb3J0aXVtXG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlLiBQbGVhc2Ugc2VlIExJQ0VOU0UgZm9yIG1vcmUgaW5mb3JtYXRpb24uXG4gKlxuKi9cblxuLy9UT0RPOiBuZWVkIGxheW91dCwgbGFiZWxzXG52YXIgYm9zc3kgPSBhbmd1bGFyLm1vZHVsZSgnYm9zc3knLCBbXG4gICAgICAgICdib3NzeS5jYWxlbmRhcicsXG4gICAgICAgICdib3NzeS5kYXRhJyxcbiAgICAgICAgJ2Jvc3N5LmRyb3Bkb3duJyxcbiAgICAgICAgJ2Jvc3N5LmZvcm0nLFxuICAgICAgICAnYm9zc3kuaW5wdXQnLFxuICAgICAgICAnYm9zc3kubXVsdGlzZWxlY3QnLFxuICAgICAgICAnYm9zc3kubnVtZXJpY3RleHRib3gnLFxuICAgICAgICAnYm9zc3kuc2NoZW1hJyxcbiAgICAgICAgJ2Jvc3N5LnRvb2x0aXAnXG4gICAgXVxuKTtcbiIsImFuZ3VsYXIubW9kdWxlKCdib3NzeS5jYWxlbmRhcicsIFtdKVxuXHQuY29udHJvbGxlcignQ2FsZW5kYXJDb250cm9sbGVyJywgWyckc2NvcGUnLCBmdW5jdGlvbiAoJHNjb3BlKSB7XG5cblx0XHR2YXIgX21vbnRoTWFwcyA9IHt9LFxuXHRcdFx0b3B0aW9ucyA9IHt9LFxuXHRcdFx0ZGVmYXVsdHMgPSB7XG5cdFx0XHR9LFxuXHRcdFx0dW5pdmVyc2FsID0ge1xuXHRcdFx0XHREQVk6IDI0ICogNjAgKiA2MCAqIDEwMDAsXG5cdFx0XHRcdEhPVVI6IDYwICogNjAgKiAxMDAwXG5cdFx0XHR9O1xuXG5cdFx0JHNjb3BlLmRheXMgPSBbXG5cdFx0XHQnU3VuZGF5Jyxcblx0XHRcdCdNb25kYXknLFxuXHRcdFx0J1R1ZXNkYXknLFxuXHRcdFx0J1dlZG5lc2RheScsXG5cdFx0XHQnVGh1cnNkYXknLFxuXHRcdFx0J0ZyaWRheScsXG5cdFx0XHQnU2F0dXJkYXknXG5cdFx0XTtcblx0XHQkc2NvcGUubW9udGhzID0gW1xuXHRcdFx0J0phbnVhcnknLFxuXHRcdFx0J0ZlYnJ1YXJ5Jyxcblx0XHRcdCdNYXJjaCcsXG5cdFx0XHQnQXByaWwnLFxuXHRcdFx0J01heScsXG5cdFx0XHQnSnVuZScsXG5cdFx0XHQnSnVseScsXG5cdFx0XHQnQXVndXN0Jyxcblx0XHRcdCdTZXB0ZW1iZXInLFxuXHRcdFx0J09jdG9iZXInLFxuXHRcdFx0J05vdmVtYmVyJyxcblx0XHRcdCdEZWNlbWJlcidcblx0XHRdO1xuXG5cdFx0ZnVuY3Rpb24gZ2V0U3RhbmRhcmRUaW1lKGRhdGUpIHtcblx0XHRcdHJldHVybiB7XG5cdFx0XHRcdHJhdzogZGF0ZSxcblx0XHRcdFx0eWVhcjogZGF0ZS5nZXRGdWxsWWVhcigpLFxuXHRcdFx0XHRtb250aE5hbWU6IF9nZXRNb250aE5hbWUoZGF0ZS5nZXRNb250aCgpKSxcblx0XHRcdFx0bW9udGg6IGRhdGUuZ2V0TW9udGgoKSxcblx0XHRcdFx0ZGF5OiBfZ2V0RGF5TmFtZShkYXRlKSxcblx0XHRcdFx0ZGF0ZTogZGF0ZS5nZXREYXRlKCksXG5cdFx0XHRcdHRpbWU6IGRhdGUuZ2V0VGltZSgpXG5cdFx0XHR9O1xuXHRcdH1cblxuXHRcdGZ1bmN0aW9uIF9nZXRUaW1lT2JqZWN0SWZEYXRlKGRhdGUpIHtcblx0XHRcdGlmIChhbmd1bGFyLmlzRGF0ZShuZXcgRGF0ZShkYXRlKSkpIHtcblx0XHRcdFx0cmV0dXJuIGdldFN0YW5kYXJkVGltZShuZXcgRGF0ZShkYXRlKSk7XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0fVxuXG5cdFx0ZnVuY3Rpb24gc2V0Q29uZmlnT3B0aW9ucygpIHtcblx0XHRcdCRzY29wZS5jb25maWcuc3RhcnQgPSBfZ2V0VGltZU9iamVjdElmRGF0ZSgkc2NvcGUuY29uZmlnLnN0YXJ0KTtcblx0XHRcdCRzY29wZS5jb25maWcuZW5kID0gX2dldFRpbWVPYmplY3RJZkRhdGUoJHNjb3BlLmNvbmZpZy5lbmQpO1xuXHRcdFx0b3B0aW9ucyA9IGFuZ3VsYXIuZXh0ZW5kKHt9LCBkZWZhdWx0cywgJHNjb3BlLmNvbmZpZyk7XG5cdFx0fVxuXG5cdFx0ZnVuY3Rpb24gX2RheUlzT3V0T2ZSYW5nZShfZGF0ZSkge1xuXHRcdFx0aWYgKG9wdGlvbnMuc3RhcnQgJiYgb3B0aW9ucy5lbmQgJiYgKF9kYXRlLnRpbWUgPCBvcHRpb25zLnN0YXJ0LnRpbWUgfHwgX2RhdGUudGltZSA+IG9wdGlvbnMuZW5kLnRpbWUpKSB7XG5cdFx0XHRcdHJldHVybiB0cnVlO1xuXHRcdFx0fSBlbHNlIGlmIChvcHRpb25zLnN0YXJ0ICYmIF9kYXRlLnRpbWUgPCBvcHRpb25zLnN0YXJ0LnRpbWUpIHtcblx0XHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0XHR9IGVsc2UgaWYgKG9wdGlvbnMuZW5kICYmIF9kYXRlLnRpbWUgPiBvcHRpb25zLmVuZC50aW1lKSB7XG5cdFx0XHRcdHJldHVybiB0cnVlO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdGZ1bmN0aW9uIF9zZXRTZWxlY3RlZERhdGUoZGF0ZSkge1xuXHRcdFx0JHNjb3BlLnNlbGVjdGVkID0gZ2V0U3RhbmRhcmRUaW1lKGRhdGUpO1xuXHRcdFx0JHNjb3BlLm5nTW9kZWwgPSAkc2NvcGUuc2VsZWN0ZWQucmF3O1xuXHRcdH1cblxuXHRcdGZ1bmN0aW9uIF9zZXRDdXJyZW50TW9udGhBbmRZZWFyKG1vbnRoLCB5ZWFyKSB7XG5cdFx0XHR2YXIgZGF0ZSA9IG5ldyBEYXRlKHllYXIgIT09IHVuZGVmaW5lZCA/IHllYXIgOiAkc2NvcGUuc2VsZWN0ZWQueWVhciwgbW9udGggIT09IHVuZGVmaW5lZCA/IG1vbnRoIDogJHNjb3BlLnNlbGVjdGVkLm1vbnRoLCAxKTtcblx0XHRcdCRzY29wZS5jdXJyZW50ID0gZ2V0U3RhbmRhcmRUaW1lKGRhdGUpO1xuXHRcdH1cblxuXHRcdGZ1bmN0aW9uIF9nZXRNb250aE5hbWUobW9udGgpIHtcblx0XHRcdHJldHVybiAkc2NvcGUubW9udGhzW21vbnRoXTtcblx0XHR9XG5cblx0XHRmdW5jdGlvbiBfZ2V0RGF5TmFtZShkYXRlKSB7XG5cdFx0XHRyZXR1cm4gJHNjb3BlLmRheXNbZGF0ZS5nZXREYXkoKV07XG5cdFx0fVxuXG5cdFx0JHNjb3BlLnByZXZpb3VzTW9udGggPSBmdW5jdGlvbigpIHtcblx0XHRcdHZhciBkYXRlID0gbmV3IERhdGUoJHNjb3BlLmN1cnJlbnQueWVhciwgKCRzY29wZS5jdXJyZW50Lm1vbnRoIC0gMSksIDEpO1xuXHRcdFx0X3NldEN1cnJlbnRNb250aEFuZFllYXIoZGF0ZS5nZXRNb250aCgpLCBkYXRlLmdldEZ1bGxZZWFyKCkpO1xuXHRcdFx0JHNjb3BlLnVwZGF0ZURhdGVNYXAoKTtcblx0XHR9O1xuXG5cdFx0JHNjb3BlLm5leHRNb250aCA9IGZ1bmN0aW9uKCkge1xuXHRcdFx0dmFyIGRhdGUgPSBuZXcgRGF0ZSgkc2NvcGUuY3VycmVudC55ZWFyLCAoJHNjb3BlLmN1cnJlbnQubW9udGggKyAxKSwgMSk7XG5cdFx0XHRfc2V0Q3VycmVudE1vbnRoQW5kWWVhcihkYXRlLmdldE1vbnRoKCksIGRhdGUuZ2V0RnVsbFllYXIoKSk7XG5cdFx0XHQkc2NvcGUudXBkYXRlRGF0ZU1hcCgpO1xuXHRcdH07XG5cblx0XHQkc2NvcGUuc2VsZWN0RGF0ZSA9IGZ1bmN0aW9uKHRpbWUpIHtcblx0XHRcdHZhciBkYXRlID0gZ2V0U3RhbmRhcmRUaW1lKG5ldyBEYXRlKHRpbWUpKTtcblx0XHRcdGlmIChfZGF5SXNPdXRPZlJhbmdlKGRhdGUpKSB7XG5cdFx0XHRcdHJldHVybjtcblx0XHRcdH1cblx0XHRcdGlmIChkYXRlLm1vbnRoICE9PSAkc2NvcGUuY3VycmVudC5tb250aCkge1xuXHRcdFx0XHRfc2V0Q3VycmVudE1vbnRoQW5kWWVhcihkYXRlLm1vbnRoLCBkYXRlLnllYXIpO1xuXHRcdFx0XHQkc2NvcGUudXBkYXRlRGF0ZU1hcCgpO1xuXHRcdFx0fVxuXHRcdFx0X3NldFNlbGVjdGVkRGF0ZShuZXcgRGF0ZSh0aW1lKSk7XG5cdFx0fTtcblxuXHRcdCRzY29wZS51cGRhdGVEYXRlTWFwID0gZnVuY3Rpb24oKSB7XG5cdFx0XHR2YXIgZmlyc3RXZWVrRGF5ID0gbmV3IERhdGUoJHNjb3BlLmN1cnJlbnQudGltZSAtICgkc2NvcGUuY3VycmVudC5yYXcuZ2V0RGF5KCkgKiB1bml2ZXJzYWwuREFZKSksXG5cdFx0XHRcdGlzTW9udGhDb21wbGV0ZSA9IGZhbHNlO1xuXHRcdFx0XHQkc2NvcGUuZGF0ZU1hcCA9IFtdO1xuXG5cdFx0XHR3aGlsZSAoIWlzTW9udGhDb21wbGV0ZSkge1xuXHRcdFx0XHR2YXIgd2VlayA9IFtdO1xuXHRcdFx0XHRpZiAoJHNjb3BlLmRhdGVNYXAubGVuZ3RoID09PSA1KSB7XG5cdFx0XHRcdFx0aXNNb250aENvbXBsZXRlID0gdHJ1ZTtcblx0XHRcdFx0fVxuXHRcdFx0XHRmb3IgKHZhciB3ZWVrRGF5ID0gMDsgd2Vla0RheSA8IDc7IHdlZWtEYXkrKykge1xuXHRcdFx0XHRcdHZhciBfdGhpc0RhdGUgPSAobmV3IERhdGUoZmlyc3RXZWVrRGF5LmdldFRpbWUoKSArICh3ZWVrRGF5ICogdW5pdmVyc2FsLkRBWSkpKTtcblx0XHRcdFx0XHQvLyBmaXggZm9yIERTVCBvZGRuZXNzXG5cdFx0XHRcdFx0aWYgKF90aGlzRGF0ZS5nZXRIb3VycygpID09PSAyMykge1xuXHRcdFx0XHRcdFx0X3RoaXNEYXRlID0gKG5ldyBEYXRlKF90aGlzRGF0ZS5nZXRUaW1lKCkgKyB1bml2ZXJzYWwuSE9VUikpO1xuXHRcdFx0XHRcdH0gZWxzZSBpZiAoX3RoaXNEYXRlLmdldEhvdXJzKCkgPT09IDEpIHtcblx0XHRcdFx0XHRcdF90aGlzRGF0ZSA9IChuZXcgRGF0ZShfdGhpc0RhdGUuZ2V0VGltZSgpIC0gdW5pdmVyc2FsLkhPVVIpKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0dmFyIF9kYXRlID0gZ2V0U3RhbmRhcmRUaW1lKF90aGlzRGF0ZSk7XG5cdFx0XHRcdFx0X2RhdGUuZGF5SW5Nb250aCA9IF90aGlzRGF0ZS5nZXRNb250aCgpID09PSAkc2NvcGUuY3VycmVudC5yYXcuZ2V0TW9udGgoKSA/ICdkYXktaW4tbW9udGgnIDogJyc7XG5cdFx0XHRcdFx0X2RhdGUuZGlzYWJsZWREYXkgPSBfZGF5SXNPdXRPZlJhbmdlKF9kYXRlKSA/ICdkaXNhYmxlZC1kYXknIDogJyc7XG5cdFx0XHRcdFx0d2Vlay5wdXNoKF9kYXRlKTtcblx0XHRcdFx0fVxuXHRcdFx0XHRmaXJzdFdlZWtEYXkgPSBuZXcgRGF0ZShmaXJzdFdlZWtEYXkuZ2V0VGltZSgpICsgKDcgKiB1bml2ZXJzYWwuREFZKSk7XG5cdFx0XHRcdCRzY29wZS5kYXRlTWFwLnB1c2god2Vlayk7XG5cdFx0XHR9XG5cdFx0fTtcblxuXHRcdHNldENvbmZpZ09wdGlvbnMoKTtcblx0XHRfc2V0U2VsZWN0ZWREYXRlKCRzY29wZS5uZ01vZGVsIHx8IG5ldyBEYXRlKCkpO1xuXHRcdF9zZXRDdXJyZW50TW9udGhBbmRZZWFyKCk7XG5cdFx0JHNjb3BlLnVwZGF0ZURhdGVNYXAoKTtcblxuXHR9XSkuZGlyZWN0aXZlKCdib3NzeUNhbGVuZGFyJywgW2Z1bmN0aW9uICgpIHtcblx0XHRyZXR1cm4ge1xuXHRcdFx0cmVzdHJpY3Q6ICdBRScsXG5cdFx0XHRzY29wZToge1xuXHRcdFx0XHRuZ01vZGVsOiAnPScsXG5cdFx0XHRcdGNvbmZpZzogJz0nXG5cdFx0XHR9LFxuXHRcdFx0dGVtcGxhdGU6ICc8c3R5bGU+Ym9zc3ktY2FsZW5kYXIgLmRheS1pbi1tb250aHtmb250LXdlaWdodDo3MDB9Ym9zc3ktY2FsZW5kYXIgLmRpc2FibGVkLWRheXtjb2xvcjojY2NjfTwvc3R5bGU+PHRhYmxlPjx0cj48dGQgbmctY2xpY2s9XCJwcmV2aW91c01vbnRoKClcIiB0aXRsZT1cIlByZXZpb3VzIG1vbnRoXCI+Jmx0OzwvdGQ+PHRkIGNvbHNwYW49XCI1XCI+e3tjdXJyZW50Lm1vbnRoTmFtZX19IHt7Y3VycmVudC55ZWFyfX08L3RkPjx0ZCBuZy1jbGljaz1cIm5leHRNb250aCgpXCIgdGl0bGU9XCJOZXh0IG1vbnRoXCI+Jmd0OzwvdGQ+PC90cj48dGQgbmctcmVwZWF0PVwiZGF5IGluIGRheXNcIiB0aXRsZT1cInt7ZGF5fX1cIj57e2RheSB8IGxpbWl0VG8gOiAyfX08L3RkPjx0ciBuZy1yZXBlYXQ9XCJ3ZWVrIGluIGRhdGVNYXBcIj48dGQgbmctcmVwZWF0PVwiY3VycmVudCBpbiB3ZWVrXCIgbmctY2xpY2s9XCJzZWxlY3REYXRlKGN1cnJlbnQudGltZSlcIiBjbGFzcz1cInt7Y3VycmVudC5kYXlJbk1vbnRofX0ge3tjdXJyZW50LmRpc2FibGVkRGF5fX1cIj57e2N1cnJlbnQuZGF0ZX19PC90ZD48L3RyPjx0cj48dGQgY29sc3Bhbj1cIjdcIj57e3NlbGVjdGVkLmRheX19LCB7e3NlbGVjdGVkLm1vbnRoTmFtZX19IHt7c2VsZWN0ZWQuZGF0ZX19LCB7e3NlbGVjdGVkLnllYXJ9fTwvdGQ+PC90cj48L3RhYmxlPicsXG5cdFx0XHRjb250cm9sbGVyOiAnQ2FsZW5kYXJDb250cm9sbGVyJ1xuXHRcdH07XG5cdH1dKTsiLCJ2YXIgYXBwID0gYW5ndWxhci5tb2R1bGUoXCJib3NzeS5jb21ib2JveC5jYXNjYWRpbmdEcm9wZG93blwiLCBbXSk7XG5cbmFwcC5jb250cm9sbGVyKCdBcHBDdHJsJywgZnVuY3Rpb24oJHNjb3BlKSB7XG5cbiAgICAvLyBhZGQgY2hvaWNlcyBmb3IgdGhlIDMgZHJvcGRvd25zXG4gICAgLy8gZGVwZW5kZW5jaWVzIGluIGFycmF5cyAoQSAtIEExIC0gQTFhKVxuICAgICRzY29wZS5jaG9pY2VzID0ge1xuICAgICAgICAnT3B0aW9uIEEnOiB7XG4gICAgICAgICAgICAnT3B0aW9uIEExJzogWydPcHRpb24gQTFhJywgJ09wdGlvbiBBMWInLCAnT3B0aW9uIEExYyddLFxuICAgICAgICAgICAgJ09wdGlvbiBBMic6IFsnT3B0aW9uIEEyYScsICdPcHRpb24gQTJiJywgJ09wdGlvbiBBMmMnXSxcbiAgICAgICAgICAgICdPcHRpb24gQTMnOiBbJ09wdGlvbiBBM2EnLCAnT3B0aW9uIEEzYicsICdPcHRpb24gQTNjJ11cbiAgICAgICAgfSxcbiAgICAgICAgJ09wdGlvbiBCJzoge1xuICAgICAgICAgICAgJ09wdGlvbiBCMSc6IFsnT3B0aW9uIEIxYScsICdPcHRpb24gQjFiJywgJ09wdGlvbiBCMWMnXSxcbiAgICAgICAgICAgICdPcHRpb24gQjInOiBbJ09wdGlvbiBCMmEnLCAnT3B0aW9uIEIyYicsICdPcHRpb24gQjJjJ10sXG4gICAgICAgICAgICAnT3B0aW9uIEIzJzogWydPcHRpb24gQjNhJywgJ09wdGlvbiBCM2InLCAnT3B0aW9uIEIzYyddXG4gICAgICAgIH0sXG4gICAgICAgICdPcHRpb24gQyc6IHtcbiAgICAgICAgICAgICdPcHRpb24gQzEnOiBbJ09wdGlvbiBDMWEnLCAnT3B0aW9uIEMxYicsICdPcHRpb24gQzFjJ10sXG4gICAgICAgICAgICAnT3B0aW9uIEMyJzogWydPcHRpb24gQzJhJywgJ09wdGlvbiBDMmInLCAnT3B0aW9uIEMzYiddLFxuICAgICAgICAgICAgJ09wdGlvbiBDMyc6IFsnT3B0aW9uIEMzYScsICdPcHRpb24gQzNiJywgJ09wdGlvbiBDM2MnXVxuICAgICAgICB9XG4gICAgfTtcblxufSkiLCJ2YXIgYXBwID0gYW5ndWxhci5tb2R1bGUoXCJib3NzeS5jb21ib2JveC5jaGVja2JveE11bHRpc2VsZWN0XCIsIFtdKTtcblxuYXBwLmNvbnRyb2xsZXIoJ0FwcEN0cmwnLCBmdW5jdGlvbigkc2NvcGUpIHtcblxuICAgIC8vIHNldCBjaG9pY2VzXG4gICAgJHNjb3BlLmNob2ljZXMgPSBbJ09wdGlvbiBBJywgJ09wdGlvbiBCJywgJ09wdGlvbiBDJ107XG5cbiAgICAvLyBhcnJheVxuICAgICRzY29wZS5uYW1lID0ge2Nob2ljZXM6IFtdfTtcblxuICAgIC8vIGZ1bmN0aW9uIHNlbGVjdEFsbCB0byBzZWxlY3QgYWxsIGNoZWNrYm94ZXNcbiAgICAkc2NvcGUuc2VsZWN0QWxsID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICRzY29wZS5uYW1lLmNob2ljZXMgPSBhbmd1bGFyLmNvcHkoJHNjb3BlLmNob2ljZXMpO1xuICAgIH07XG5cbiAgICAvLyBmdW5jdGlvbiBkZXNlbGVjdEFsbCB0byBkZXNlbGVjdCBhbGwgY2hlY2tib3hlc1xuICAgICRzY29wZS5kZXNlbGVjdEFsbCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAkc2NvcGUubmFtZS5jaG9pY2VzID0gW107XG4gICAgfTtcblxufSk7XG5cbmFwcC5kaXJlY3RpdmUoJ2Jvc3N5Q2hlY2tib3hNdWx0aXNlbGVjdCcsIFsnJHBhcnNlJywgJyRjb21waWxlJywgZnVuY3Rpb24oJHBhcnNlLCAkY29tcGlsZSkge1xuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgcmVzdHJpY3Q6ICdBRScsXG4gICAgICAgIHNjb3BlOiB0cnVlLFxuICAgICAgICBjb21waWxlOiBmdW5jdGlvbih0RWxlbWVudCwgdEF0dHJzKSB7XG4gICAgICAgICAgICAvLyBsb2NhbCB2YXJpYWJsZSBzdG9yaW5nIGNoZWNrYm94IG1vZGVsXG4gICAgICAgICAgICB0RWxlbWVudC5hdHRyKCduZy1tb2RlbCcsICdjaGVja2VkJyk7XG4gICAgICAgICAgICAvLyBwcmV2ZW50IHJlY3Vyc2lvblxuICAgICAgICAgICAgdEVsZW1lbnQucmVtb3ZlQXR0cignYm9zc3ktY2hlY2tib3gtbXVsdGlzZWxlY3QnKTtcbiAgICAgICAgICAgIHJldHVybiB3YXRjaDtcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICAgICAgLy8gYWRkIHRoZSBzZWxlY3RlZCBjaG9pY2UgdG8gY2hvaWNlc1xuICAgICAgICBmdW5jdGlvbiBhZGRDaG9pY2UgKGFyciwgaXRlbSkge1xuICAgICAgICAgICAgYXJyID0gYW5ndWxhci5pc0FycmF5KGFycikgPyBhcnIgOiBbXTtcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYXJyLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgaWYgKGFuZ3VsYXIuZXF1YWxzKGFycltpXSwgaXRlbSkpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGFycjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBhZGQgY2hvaWNlIHRvIGFycmF5XG4gICAgICAgICAgICBhcnIucHVzaChpdGVtKTtcbiAgICAgICAgICAgIC8vIHJldHVybiBuZXcgYXJyYXlcbiAgICAgICAgICAgIHJldHVybiBhcnI7XG4gICAgICAgIH1cblxuICAgICAgICAvLyByZW1vdmUgdGhlIHNlbGVjdGVkIGNob2ljZSBmcm9tIGNob2ljZXMgd2hlbiBjbGlja2VkXG4gICAgICAgIGZ1bmN0aW9uIHJlbW92ZUNob2ljZShhcnIsIGl0ZW0pIHtcbiAgICAgICAgICAgIGlmIChhbmd1bGFyLmlzQXJyYXkoYXJyKSkge1xuICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYXJyLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChhbmd1bGFyLmVxdWFscyhhcnJbaV0sIGl0ZW0pKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyByZW1vdmUgZnJvbSBhcnJheVxuICAgICAgICAgICAgICAgICAgICAgICAgYXJyLnNwbGljZShpLCAxKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gcmV0dXJuIG5ldyBhcnJheVxuICAgICAgICAgICAgcmV0dXJuIGFycjtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGNvbnRhaW5zIC0gY2hlY2sgd2hpY2ggaXRlbXMgdGhlIGFycmF5IGNvbnRhaW5zXG4gICAgICAgIGZ1bmN0aW9uIGNvbnRhaW5DaGVja2JveCAoYXJyLCBpdGVtKSB7XG4gICAgICAgICAgICBpZiAoYW5ndWxhci5pc0FycmF5KGFycikpIHtcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGFyci5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICBpZiAoYW5ndWxhci5lcXVhbHMoYXJyW2ldLCBpdGVtKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cblxuICAgICAgICAvLyB3YXRjaCBiZWhhdmlvdXIgb2YgZGlyZWN0aXZlIGFuZCBtb2RlbFxuICAgICAgICBmdW5jdGlvbiB3YXRjaChzY29wZSwgZWxlbSwgYXR0cnMpIHtcblxuICAgICAgICAgICAgLy8gY29tcGlsZSAtIG5nLW1vZGVsIHBvaW50aW5nIHRvIGNoZWNrZWRcbiAgICAgICAgICAgICRjb21waWxlKGVsZW0pKHNjb3BlKTtcblxuICAgICAgICAgICAgLy8gZ2V0dGVyIGFuZCBzZXR0ZXIgZm9yIG9yaWdpbmFsIG1vZGVsXG4gICAgICAgICAgICB2YXIgZ2V0dGVyID0gJHBhcnNlKGF0dHJzLmJvc3N5Q2hlY2tib3hNdWx0aXNlbGVjdCk7XG4gICAgICAgICAgICB2YXIgc2V0dGVyID0gZ2V0dGVyLmFzc2lnbjtcblxuICAgICAgICAgICAgLy8gdmFsdWUgYWRkZWQgdG8gbGlzdFxuICAgICAgICAgICAgdmFyIHZhbHVlID0gJHBhcnNlKGF0dHJzLmJvc3N5TGlzdFZhbHVlKShzY29wZS4kcGFyZW50KTtcblxuICAgICAgICAgICAgLy8gd2F0Y2ggdGhlIGNoYW5nZSBvZiBjaGVja2VkIHZhbHVlc1xuICAgICAgICAgICAgc2NvcGUuJHdhdGNoKCdjaGVja2VkJywgZnVuY3Rpb24obmV3VmFsdWUsIG9sZFZhbHVlKSB7XG4gICAgICAgICAgICAgICAgaWYgKG5ld1ZhbHVlID09PSBvbGRWYWx1ZSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHZhciBhY3R1YWwgPSBnZXR0ZXIoc2NvcGUuJHBhcmVudCk7XG4gICAgICAgICAgICAgICAgaWYgKG5ld1ZhbHVlID09PSB0cnVlKSB7XG4gICAgICAgICAgICAgICAgICAgIHNldHRlcihzY29wZS4kcGFyZW50LCBhZGRDaG9pY2UgKGFjdHVhbCwgdmFsdWUpKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBzZXR0ZXIoc2NvcGUuJHBhcmVudCwgcmVtb3ZlQ2hvaWNlKGFjdHVhbCwgdmFsdWUpKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgLy8gd2F0Y2ggY2hhbmdlIG9mIG9yaWdpbmFsIG1vZGVsXG4gICAgICAgICAgICBzY29wZS4kcGFyZW50LiR3YXRjaChhdHRycy5ib3NzeUNoZWNrYm94TXVsdGlzZWxlY3QsIGZ1bmN0aW9uKG5ld0Fycikge1xuICAgICAgICAgICAgICAgIHNjb3BlLmNoZWNrZWQgPSBjb250YWluQ2hlY2tib3ggKG5ld0FyciwgdmFsdWUpO1xuICAgICAgICAgICAgfSwgdHJ1ZSk7XG4gICAgICAgIH1cbn1dKTsiLCJ2YXIgYXBwID0gYW5ndWxhci5tb2R1bGUoJ2Jvc3N5LmNvbWJvYm94Lm11bHRpc2VsZWN0JywgW10pO1xuXG5hcHAuY29udHJvbGxlcignQXBwQ3RybCcsIGZ1bmN0aW9uKCRzY29wZSkge1xuXG4gICAgLy8gYWRkIGNob2ljZXMgZm9yIG11bHRpc2VsZWN0IGluIGFycmF5XG4gICAgJHNjb3BlLmNob2ljZXMgPSBbe2lkOjEsIG5hbWU6ICdPcHRpb24gQSd9LFxuICAgICAgICAgICAgICAgICAgICAgIHtpZDoyLCBuYW1lOiAnT3B0aW9uIEInfSxcbiAgICAgICAgICAgICAgICAgICAgICB7aWQ6MywgbmFtZTogJ09wdGlvbiBDJ31cbiAgICAgICAgICAgICAgICAgICAgIF07XG5cbiAgICAvLyBzZWxlY3RlZCBjaG9pY2VcbiAgICAkc2NvcGUuc2VsZWN0ZWRDaG9pY2UgPSBbXTtcblxufSlcblxuLy8gaW5qZWN0IGZ1bmN0aW9uc1xuYXBwLmZhY3RvcnkoJ29wdGlvblBhcnNlcicsIFsnJHBhcnNlJywgZnVuY3Rpb24gKCRwYXJzZSkge1xuXG4gICAgdmFyIFRZUEVBSEVBRF9SRUdFWFAgPSAvXlxccyooLio/KSg/Olxccythc1xccysoLio/KSk/XFxzK2ZvclxccysoPzooW1xcJFxcd11bXFwkXFx3XFxkXSopKVxccytpblxccysoLiopJC87XG5cbiAgICByZXR1cm4ge1xuICAgICAgICBwYXJzZTogZnVuY3Rpb24gKGlucHV0KSB7XG5cbiAgICAgICAgICAgIC8vIGNoZWNrIGlucHV0c1xuICAgICAgICAgICAgdmFyIG1hdGNoID0gaW5wdXQubWF0Y2goVFlQRUFIRUFEX1JFR0VYUCksIG1vZGVsTWFwcGVyLCB2aWV3TWFwcGVyLCBzb3VyY2U7XG4gICAgICAgICAgICBpZiAoIW1hdGNoKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgICAgICAgICAgICAgICAgICAgXCJFeHBlY3RlZCB0eXBlYWhlYWQgc3BlY2lmaWNhdGlvbiBpbiBmb3JtIG9mICdfbW9kZWxWYWx1ZV8gKGFzIF9sYWJlbF8pPyBmb3IgX2l0ZW1fIGluIF9jb2xsZWN0aW9uXydcIiArXG4gICAgICAgICAgICAgICAgICAgICAgICBcIiBidXQgZ290ICdcIiArIGlucHV0ICsgXCInLlwiKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICBpdGVtTmFtZTogbWF0Y2hbM10sXG4gICAgICAgICAgICAgICAgc291cmNlOiAkcGFyc2UobWF0Y2hbNF0pLFxuICAgICAgICAgICAgICAgIHZpZXdNYXBwZXI6ICRwYXJzZShtYXRjaFsyXSB8fCBtYXRjaFsxXSksXG4gICAgICAgICAgICAgICAgbW9kZWxNYXBwZXI6ICRwYXJzZShtYXRjaFsxXSlcbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICB9O1xufV0pXG5cbmFwcC5kaXJlY3RpdmUoJ2Jvc3N5TXVsdGlzZWxlY3QnLFxuXG4gICAgICAgIGZ1bmN0aW9uICgkZG9jdW1lbnQsICRjb21waWxlLCBvcHRpb25QYXJzZXIpIHtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgcmVzdHJpY3Q6ICdFJyxcbiAgICAgICAgICAgICAgICByZXF1aXJlOiAnbmdNb2RlbCcsXG4gICAgICAgICAgICAgICAgbGluazogZnVuY3Rpb24gKG9yaWdpbmFsU2NvcGUsIGVsZW1lbnQsIGF0dHJzLCBtb2RlbEN0cmwpIHtcblxuICAgICAgICAgICAgICAgICAgICAvLyBkZWNsYXJlIHZhcmlhYmxlc1xuICAgICAgICAgICAgICAgICAgICB2YXIgZXhwID0gYXR0cnMub3B0aW9ucyxcbiAgICAgICAgICAgICAgICAgICAgICAgIHBhcnNlZFJlc3VsdCA9IG9wdGlvblBhcnNlci5wYXJzZShleHApLFxuICAgICAgICAgICAgICAgICAgICAgICAgaXNNdWx0aXBsZSA9IGF0dHJzLm11bHRpcGxlID8gdHJ1ZSA6IGZhbHNlLFxuICAgICAgICAgICAgICAgICAgICAgICAgc2NvcGUgPSBvcmlnaW5hbFNjb3BlLiRuZXcoKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGNoYW5nZUhhbmRsZXIgPSBhdHRycy5jaGFuZ2UgfHwgYW5ndWxlci5ub29wO1xuXG4gICAgICAgICAgICAgICAgICAgIHNjb3BlLml0ZW1zID0gW107XG4gICAgICAgICAgICAgICAgICAgIHNjb3BlLm11bHRpcGxlID0gaXNNdWx0aXBsZTtcblxuICAgICAgICAgICAgICAgICAgICAvLyBpbmNsdWRlIHNlY29uZCBkaXJlY3RpdmUgKHRlbXBsYXRlKVxuICAgICAgICAgICAgICAgICAgICB2YXIgcG9wVXBFbCA9IGFuZ3VsYXIuZWxlbWVudCgnPGJvc3N5LW11bHRpc2VsZWN0LXBvcHVwPjwvYm9zc3ktbXVsdGlzZWxlY3QtcG9wdXA+Jyk7XG5cbiAgICAgICAgICAgICAgICAgICAgLy8gYW5hbHlzZSBtb2RlbFxuICAgICAgICAgICAgICAgICAgICBmdW5jdGlvbiBwYXJzZU1vZGVsKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIG1vZGVsID0gcGFyc2VkUmVzdWx0LnNvdXJjZShvcmlnaW5hbFNjb3BlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbW9kZWwubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgbG9jYWwgPSB7fTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsb2NhbFtwYXJzZWRSZXN1bHQuaXRlbU5hbWVdID0gbW9kZWxbaV07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2NvcGUuaXRlbXMucHVzaCh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxhYmVsOiBwYXJzZWRSZXN1bHQudmlld01hcHBlcihsb2NhbCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1vZGVsOiBtb2RlbFtpXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2hlY2tlZDogZmFsc2VcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIHBhcnNlTW9kZWwoKTtcblxuICAgICAgICAgICAgICAgICAgICAvLyBhZGQgdGVtcGxhdGUgZGlyZWN0aXZlXG4gICAgICAgICAgICAgICAgICAgIGVsZW1lbnQuYXBwZW5kKCRjb21waWxlKHBvcFVwRWwpKHNjb3BlKSk7XG5cbiAgICAgICAgICAgICAgICAgICAgLy8gc2VsZWN0aW9uIGZ1bmN0aW9uXG4gICAgICAgICAgICAgICAgICAgIGZ1bmN0aW9uIHNlbGVjdE11bHRpcGxlKGl0ZW0pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW0uY2hlY2tlZCA9ICFpdGVtLmNoZWNrZWQ7XG4gICAgICAgICAgICAgICAgICAgICAgICBzZXRNb2RlbFZhbHVlKHRydWUpO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgLy8gYXJyYXkgZm9yIG11bHRpcGxlIHNlbGVjdGlvblxuICAgICAgICAgICAgICAgICAgICBmdW5jdGlvbiBzZXRNb2RlbFZhbHVlKGlzTXVsdGlwbGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpc011bHRpcGxlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWUgPSBbXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhbmd1bGFyLmZvckVhY2goc2NvcGUuaXRlbXMsIGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpdGVtLmNoZWNrZWQpIHZhbHVlLnB1c2goaXRlbS5tb2RlbCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYW5ndWxhci5mb3JFYWNoKHNjb3BlLml0ZW1zLCBmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoaXRlbS5jaGVja2VkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZSA9IGl0ZW0ubW9kZWw7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgbW9kZWxDdHJsLiRzZXRWaWV3VmFsdWUodmFsdWUpO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgLy8gZnVuY3Rpb24gZm9yIHNlbGVjdGlvbiBvZiBhbGxcbiAgICAgICAgICAgICAgICAgICAgc2NvcGUuY2hlY2tBbGwgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIWlzTXVsdGlwbGUpIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgICAgIGFuZ3VsYXIuZm9yRWFjaChzY29wZS5pdGVtcywgZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpdGVtLmNoZWNrZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBzZXRNb2RlbFZhbHVlKHRydWUpO1xuICAgICAgICAgICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAgICAgICAgIC8vIGZ1bmN0aW9uIGZvciBzZWxlY3Rpb24gb2Ygbm9uZVxuICAgICAgICAgICAgICAgICAgICBzY29wZS51bmNoZWNrQWxsID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgYW5ndWxhci5mb3JFYWNoKHNjb3BlLml0ZW1zLCBmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW0uY2hlY2tlZCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBzZXRNb2RlbFZhbHVlKHRydWUpO1xuICAgICAgICAgICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAgICAgICAgIHNjb3BlLnNlbGVjdCA9IGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoaXNNdWx0aXBsZSA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxlY3RTaW5nbGUoaXRlbSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGVjdE11bHRpcGxlKGl0ZW0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfTtcbiAgICAgICAgfSlcblxuLy8gZGlyZWN0aXZlIHN0b3JpbmcgdGVtcGxhdGVcbmFwcC5kaXJlY3RpdmUoJ2Jvc3N5TXVsdGlzZWxlY3RQb3B1cCcsIFsnJGRvY3VtZW50JywgZnVuY3Rpb24gKCRkb2N1bWVudCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgcmVzdHJpY3Q6ICdFJyxcbiAgICAgICAgICAgIHNjb3BlOiBmYWxzZSxcbiAgICAgICAgICAgIHJlcGxhY2U6IHRydWUsXG4gICAgICAgICAgICB0ZW1wbGF0ZVVybDogJy4uL3RlbXBsYXRlcy9ib3NzeS5jb21ib2JveC5tdWx0aXNlbGVjdC5odG1sJyxcbiAgICAgICAgICAgIGxpbms6IGZ1bmN0aW9uIChzY29wZSwgZWxlbWVudCwgYXR0cikge1xuXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XSk7XG4iLCJhbmd1bGFyLm1vZHVsZSgnYm9zc3kuZGF0YScsIFtdKVxuLyoqXG5Abmdkb2Mgc2VydmljZVxuQG5hbWUgJGRhdGFcbkByZXF1aXJlcyAkcVxuQHJlcXVpcmVzICRodHRwXG5cbiovXG4gICAgLmZhY3RvcnkoJyRkYXRhJywgWyckcScsJyRodHRwJyxmdW5jdGlvbiAoJHEsJGh0dHApIHtcblxuICAgICAgICBmdW5jdGlvbiBfZ2V0RGF0YSAoZGF0YSkge1xuICAgICAgICAgICAgaWYgKGFuZ3VsYXIuaXNTdHJpbmcoZGF0YSkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gX2dldFJlbW90ZURhdGEoZGF0YSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChhbmd1bGFyLmlzT2JqZWN0KGRhdGEpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGRhdGE7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChhbmd1bGFyLmlzRnVuY3Rpb24oZGF0YSkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gX2dldERhdGEoIGRhdGEuY2FsbCgkc2NvcGUpICk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAvL1RPRE86IHJlcGxhY2UgZXJyb3IgbWVzc2FnZSB3aXRoIG9ubGluZSBkb2MgbGluayBsaWtlIG5nIGVycm9yc1xuICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ2RpcmVjdGl2ZS5ib3NzeUZvcm06IG5vIGRhdGEgdXJsIG9yIG9iamVjdCBnaXZlbicpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgZnVuY3Rpb24gX2dldFJlbW90ZURhdGEoZGF0YSkge1xuICAgICAgICAgICAgdmFyIGRlZmVycmVkID0gJHEuZGVmZXIoKTtcblxuICAgICAgICAgICAgJGh0dHAuZ2V0KCBkYXRhLCB7IHJlc3BvbnNlVHlwZTogJ2pzb24nIH0gKVxuICAgICAgICAgICAgICAgIC5zdWNjZXNzKCBmdW5jdGlvbiggZGF0YSApIHtcbiAgICAgICAgICAgICAgICAgICAgaWYoIGFuZ3VsYXIuaXNPYmplY3QoIGRhdGEgKSApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlc29sdmUoZGF0YSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvL1RPRE86IHJlcGxhY2UgZXJyb3IgbWVzc2FnZSB3aXRoIG9ubGluZSBkb2MgbGluayBsaWtlIG5nIGVycm9yc1xuICAgICAgICAgICAgICAgICAgICAgICAgZGVmZXJyZWQucmVqZWN0KCdkaXJlY3RpdmUuYm9zc3lGb3JtOiBHRVQgcmVxdWVzdCB0byB1cmwgZGlkIG5vdCBwcm9kdWNlIGRhdGEgb2JqZWN0Jyk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIC5lcnJvciggZnVuY3Rpb24ocmVzcG9uc2VfZGF0YSwgc3RhdHVzKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vVE9ETzogcmVwbGFjZSBlcnJvciBtZXNzYWdlIHdpdGggb25saW5lIGRvYyBsaW5rIGxpa2UgbmcgZXJyb3JzXG4gICAgICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlamVjdCgnZGlyZWN0aXZlLmJvc3N5Rm9ybTogR0VUIHJlcXVlc3QgdG8gdXJsIFwiJyArIGRhdGEgKyAnXCIgZmFpbGVkIHdpdGggc3RhdHVzIFwiJyArIHN0YXR1cyArICdcIicpO1xuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICByZXR1cm4gZGVmZXJyZWQucHJvbWlzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAvKipcbiAgICAgICAgICAgIEBuZ2RvYyBtZXRob2RcbiAgICAgICAgICAgIEBuYW1lIGdldERhdGFcbiAgICAgICAgICAgIEBtZXRob2RPZiAkZGF0YVxuICAgICAgICAgICAgQHBhcmFtIHtzdHJpbmcsb2JqZWN0LGZ1bmN0aW9ufSBkYXRhIElmIGRhdGEgaXMgYSBzdHJpbmcsIGl0IHdpbGwgYmUgdHJlYXRlZCBhcyBhIHVybCB0byByZXRyaWV2ZSBkYXRhIGZyb20uIElmIGRhdGEgaXMgYW4gb2JqZWN0IGl0IHdpbGwgYmUgaW1tZWRpYXRlbHkgcmV0dXJuZWQuIElmIGRhdGEgaXMgYSBmdW5jdGlvbiwgdGhlIGZ1bmN0aW9uIHdpbGwgYmUgY2FsbGVkIGFuZCBwcm9jZXNzZWQgdW50aWwgYW4gb2JqZWN0IGlzIHByb2R1Y2VkXG4gICAgICAgICAgICBAcmV0dXJucyB7T2JqZWN0fSBFaXRoZXIgYSAkcSBwcm9taXNlLCBhIGRhdGEgb2JqZWN0IG9yIGEgc3RyaW5nLlxuICAgICAgICAgICAgKi9cbiAgICAgICAgICAgIGdldERhdGE6IF9nZXREYXRhXG4gICAgICAgIH07XG4gICAgfV0pXG47XG4iLCJhbmd1bGFyLm1vZHVsZSgnYm9zc3kuZHJvcGRvd24nLCBbXSlcblx0LnJ1bihmdW5jdGlvbigkdGVtcGxhdGVDYWNoZSl7XG4gICAgICAgICR0ZW1wbGF0ZUNhY2hlLnB1dCgnYm9zc3ktZHJvcGRvd24uaHRtbCcsICc8ZGl2PjxzZWxlY3Qgbmctb3B0aW9ucz1cIml0ZW1bZHJvcGRvd24udGl0bGVdIGZvciBpdGVtIGluIGRyb3Bkb3duLml0ZW1zIHwgb3JkZXJCeTogZHJvcGRvd24udGl0bGVcIiBuZy1tb2RlbD1cInNlbGVjdGVkSXRlbVwiIG5nLWNoYW5nZT1cImRyb3Bkb3duLnVwZGF0ZVNlbGVjdGVkSXRlbShzZWxlY3RlZEl0ZW0pXCI+PG9wdGlvbiB2YWx1ZT1cIlwiIG5nLWhpZGU9XCJzZWxlY3RlZEl0ZW1cIj5QbGVhc2Ugc2VsZWN0IG9uZS4uLjwvb3B0aW9uPjwvc2VsZWN0PjwvZGl2PicpO1x0XG4gICAgfSlcblx0LmRpcmVjdGl2ZSgnYm9zc3lEcm9wZG93bicsIGZ1bmN0aW9uKCRodHRwLCAkY29tcGlsZSkge1xuXHRcdHJldHVybiB7XG5cdFx0XHRyZXN0cmljdDogJ0VBJyxcblx0XHRcdHNjb3BlOiB7XG5cdFx0XHRcdGNvbmZpZzogXCI9XCIsXG5cdFx0XHRcdHNlbGVjdDogXCI9XCIsXG5cdFx0XHRcdGl0ZW1zOiBcIj1cIlxuXHRcdFx0fSxcblx0XHRcdHRlbXBsYXRlVXJsOiAnJyxcblx0XHRcdGxpbms6IGZ1bmN0aW9uKHNjb3BlLCBlbGVtZW50LCBhdHRycykge1xuXHRcdFx0XHR2YXIgY3VzdG9tVGVtcGxhdGU7XG5cblx0XHRcdFx0Ly9DaGVja3MgaWYgdXNlciBpcyBkZWZpbmluZyBhIHVybCBvciBpbm5lciBodG1sXG5cdFx0XHRcdC8vSWYgaXQgaXMgYSB1cmwsIHRoZSB0ZW1wbGF0ZSBtdXN0IGJlIGxvY2F0ZWQgaW4gYSBsb2NhbCBkaXJlY3Rvcnkgb3IgYWRkZWQgdG8gdGhlIERPTSB2aWEgbmctaW5jbHVkZVxuXHRcdFx0XHRpZihzY29wZS5kcm9wZG93bi50ZW1wbGF0ZVswXSAhPT0gJzwnKVxuXHRcdFx0XHRcdGN1c3RvbVRlbXBsYXRlID0gJGNvbXBpbGUoJzxuZy1pbmNsdWRlIHNyYz1cImRyb3Bkb3duLnRlbXBsYXRlXCI+PC9uZy1pbmNsdWRlPicpKHNjb3BlKTtcblx0XHRcdFx0ZWxzZVxuXHRcdFx0XHRcdGN1c3RvbVRlbXBsYXRlID0gJGNvbXBpbGUoc2NvcGUuZHJvcGRvd24udGVtcGxhdGUpKHNjb3BlKTtcblx0XHRcdFx0XG5cdFx0XHRcdC8vSW5qZWN0cyB0ZW1wbGF0ZVxuXHRcdFx0XHRlbGVtZW50LnJlcGxhY2VXaXRoKGN1c3RvbVRlbXBsYXRlKTtcblx0XHRcdH0sXG5cdFx0XHRjb250cm9sbGVyOiBmdW5jdGlvbigkc2NvcGUpIHtcblx0XHRcdFx0dmFyIHRoaXNEcm9wZG93biA9IHRoaXM7XG5cdFx0XHRcdHRoaXNEcm9wZG93bi50aXRsZSA9ICRzY29wZS5jb25maWcudGl0bGU7XG5cdFx0XHRcdHRoaXNEcm9wZG93bi5pdGVtcyA9IFtdO1xuXG5cdFx0XHRcdC8vUmV0cmlldmUganNvbiBjb250YWluaW5nIG9iamVjdHMgdG8gcG9wdWxhdGUgdGhlIGRyb3Bkb3duLlxuXHRcdFx0XHRpZigkc2NvcGUuY29uZmlnLnNyYykge1xuXHRcdFx0XHRcdC8vQ2hlY2tzIHRoYXQgY29uZmlnLnNyYyBpcyBhIEpTT04gZmlsZS5cblx0XHRcdFx0XHRpZigkc2NvcGUuY29uZmlnLnNyYy5zdWJzdHIoJHNjb3BlLmNvbmZpZy5zcmMubGVuZ3RoLTUsICRzY29wZS5jb25maWcuc3JjLmxlbmd0aCkgPT0gJy5qc29uJykge1xuXHRcdFx0XHRcdFx0JGh0dHAuZ2V0KCRzY29wZS5jb25maWcuc3JjKVxuXHRcdFx0XHRcdFx0XHQuc3VjY2VzcyhmdW5jdGlvbihkYXRhKSB7XG5cdFx0XHRcdFx0XHRcdFx0dGhpc0Ryb3Bkb3duLml0ZW1zID0gZGF0YTtcblx0XHRcdFx0XHRcdFx0XHQvL0NoZWNrcyB2YWxpZGl0eSBvZiB0aGUgdGl0bGUgZmllbGQgYXMgaXQgYXBwbGllcyB0byB0aGUgSlNPTi5cblx0XHRcdFx0XHRcdFx0XHRpZighdGhpc0Ryb3Bkb3duLml0ZW1zWzBdLmhhc093blByb3BlcnR5KHRoaXNEcm9wZG93bi50aXRsZSkpXG5cdFx0XHRcdFx0XHRcdFx0XHRjb25zb2xlLmVycm9yKFwiRVJST1I6ICRzY29wZS5jb25maWcudGl0bGU6IFxcJ1wiICsgJHNjb3BlLmNvbmZpZy50aXRsZSArIFwiXFwnJyBpcyBub3QgYSBtZW1iZXIgb2YgdGhlIGxvYWRlZCBKU09OIGRhdGEuIFBsZWFzZSBzcGVjaWZ5IGEgdmFsaWQgXFwndGl0bGVcXCcgdG8gbGlzdC5cIik7XG5cdFx0XHRcdFx0XHRcdFx0Ly9BdHRhY2hlcyByZXRyaWV2ZWQgaXRlbXMgdG8gJHNjb3BlLml0ZW1zIGZvciBhZGRpdGlvbmFsIGZ1bmN0aW9uYWxpdHkuXG5cdFx0XHRcdFx0XHRcdFx0aWYoJHNjb3BlLml0ZW1zKVxuXHRcdFx0XHRcdFx0XHRcdFx0JHNjb3BlLml0ZW1zID0gdGhpc0Ryb3Bkb3duLml0ZW1zO1xuXHRcdFx0XHRcdFx0XHR9KVxuXHRcdFx0XHRcdFx0XHQuZXJyb3IoZnVuY3Rpb24oZGF0YSkge1xuXHRcdFx0XHRcdFx0XHRcdGNvbnNvbGUuZXJyb3IoXCJFUlJPUjogRmFpbCB0byBsb2FkIEpTT04gZGF0YSBmcm9tIHRoZSBwYXRoOiBcXCdcIiArICRzY29wZS5jb25maWcuc3JjICsgXCJcXCdcIik7XG5cdFx0XHRcdFx0XHRcdH0pO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHQvL0xvZ3MgYW4gZXJyb3IgdG8gaWRlbnRpZnkgdGhhdCBhIGpzb24gZmlsZSB3YXMgbm90IGxvYWRlZC5cblx0XHRcdFx0XHRlbHNlIHtcblx0XHRcdFx0XHRcdGNvbnNvbGUuZXJyb3IoIFwiRVJST1I6IFxcJyRzY29wZS5jb25maWcuc3JjXFwnOiBcXCdcIiArICRzY29wZS5jb25maWcuc3JjICsgXCJcXCcgaXMgbm90IGEgdmFsaWQgSlNPTiBmaWxlLlwiKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0Ly9GdW5jdGlvbiBjYWxsZWQgdG8gdXBkYXRlIHNlbGVjdCBpbiB0aGUgdGVtcGxhdGUuXG5cdFx0XHRcdFx0dGhpc0Ryb3Bkb3duLnVwZGF0ZVNlbGVjdGVkSXRlbSA9IGZ1bmN0aW9uKHNlbGVjdGVkSXRlbSkge1xuXHRcdFx0XHRcdFx0Ly9TaW5nbGUgc2VsZWN0IG9iamVjdCB0aWVkIHRvIHRoZSBjb25maWcgb2JqZWN0LlxuXHRcdFx0XHRcdFx0aWYoJHNjb3BlLmNvbmZpZy5zZWxlY3QpXG5cdFx0XHRcdFx0XHRcdCRzY29wZS5jb25maWcuc2VsZWN0ID0gc2VsZWN0ZWRJdGVtO1xuXHRcdFx0XHRcdFx0Ly9Vc2VyIGNhbiBjb2xsZWN0IGFuZCB1dGlsaXplIG11bHRpcGxlIHNlbGVjdCBvYmplY3RzIHdpdGggdGhlIHNhbWUgY29uZmlnIG9iamVjdCBpZiBwYXNzaW5nIGluIGEgZGlzdGluY3Qgc2VsZWN0IHBhcmFtLlxuXHRcdFx0XHRcdFx0aWYoJHNjb3BlLnNlbGVjdClcblx0XHRcdFx0XHRcdFx0JHNjb3BlLnNlbGVjdCA9IHNlbGVjdGVkSXRlbTtcblx0XHRcdFx0XHR9O1xuXHRcdFx0XHRcdC8vRGV0ZXJtaW5lIGlmIGN1c3RvbSB0ZW1wbGF0ZSBVcmwgaGFzIGJlZW4gZGVmaW5lZC5cblx0XHRcdFx0XHRpZigkc2NvcGUuY29uZmlnLnRlbXBsYXRlKVxuXHRcdFx0XHRcdFx0dGhpc0Ryb3Bkb3duLnRlbXBsYXRlID0gJHNjb3BlLmNvbmZpZy50ZW1wbGF0ZTtcblx0XHRcdFx0XHRlbHNlIHtcblx0XHRcdFx0XHRcdHRoaXNEcm9wZG93bi50ZW1wbGF0ZSA9ICdib3NzeS1kcm9wZG93bi5odG1sJztcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdFx0Ly9Mb2dzIGFuIGVycm9yIGlmICdzcmMnIGhhcyBub3QgYmVlbiBkZWZpbmVkLlxuXHRcdFx0XHRlbHNlIHtcblx0XHRcdFx0XHRjb25zb2xlLmVycm9yKCBcIkVSUk9SOiBcXCckc2NvcGUuY29uZmlnLnNyY1xcJyBoYXMgbm90IGJlZW4gc3BlY2lmaWVkIHdpdGhpbiB0aGUgXFwnY29uZmlnXFwnIG9iamVjdC4gUGxlYXNlIHBhc3MgaW4gYSB2YWxpZCBwYXRoIHRvIGEgSlNPTiBmaWxlLlwiKTtcblx0XHRcdFx0fTtcblx0XHRcdH0sXG5cdFx0XHRjb250cm9sbGVyQXM6ICdkcm9wZG93bidcblx0XHR9O1xuXHR9KVxuIiwiYW5ndWxhci5tb2R1bGUoJ2Jvc3N5LmZvcm0nLCBbXSlcbiAgICAucnVuKGZ1bmN0aW9uKCR0ZW1wbGF0ZUNhY2hlKXtcbiAgICAgICAgJHRlbXBsYXRlQ2FjaGUucHV0KCdib3NzeS1pbnB1dC5odG1sJywgJ3RlbXBsYXRlcy9ib3NzeS1pbnB1dC5odG1sJyk7XG4gICAgfSlcbiAgICAuZGlyZWN0aXZlKCdib3NzeUZvcm0nLFsnJGNvbXBpbGUnLCckaHR0cCcsJyRzY2hlbWEnLCckZGF0YScsIGZ1bmN0aW9uICgkY29tcGlsZSwgJGh0dHAsICRzY2hlbWEsICRkYXRhKSB7XG4gICAgICAgIHZhciBfc2NoZW1hLFxuICAgICAgICAgICAgX2RhdGEsXG4gICAgICAgICAgICBfb3B0aW9ucyA9IHtcbiAgICAgICAgICAgICAgICBzaG93TGFiZWxzOiB0cnVlLFxuICAgICAgICAgICAgICAgIGhlYWRlcjogJ1RoaXMgaXMgaGVhZGVyJyxcbiAgICAgICAgICAgICAgICBmb290ZXI6ICdUaGlzIGlzIGZvb3RlcicsXG4gICAgICAgICAgICAgICAgdGhlbWU6ICdncmVlbicsXG4gICAgICAgICAgICAgICAgYnV0dG9uOiAnU2F2ZSdcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBfaXRlbVRlbXBsYXRlID0ge1xuICAgICAgICAgICAgICAgIG51bWJlcjogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gJzxpbnB1dCB0eXBlPVwibnVtYmVyXCIvPic7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB0ZXh0OiBmdW5jdGlvbiAob2JqLCBrZXksIGlzX3JlcXVpcmVkKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAnPGJvc3N5LWlucHV0IHRpdGxlPVwiXFwnJytvYmoudGl0bGUrJ1xcJ1wiIHR5cGU9XCJcXCcnKyBvYmouaW5wdXRfdHlwZSArJ1xcJ1wiIHZhbHVlPVwiXFwnJytfZGF0YS5hZGRyZXNzW2tleV0rJ1xcJ1wiJyArICggaXNfcmVxdWlyZWQgPyAnIHJlcXVpcmVkJyA6ICcnICkgKyAnPjwvYm9zc3ktaW5wdXQ+JztcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHRleHRBcmVhOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAnPHRleHRhcmVhPjwvdGV4dGFyZWE+JztcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGNoZWNrYm94OiBmdW5jdGlvbihvYmope1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gJzxkaXYgY2xhc3M9XCJjaGVja2JveFwiPjxsYWJlbD48aW5wdXQgdHlwZT1cImNoZWNrYm94XCI+JytvYmoudGl0bGUrJzwvbGFiZWw+PC9kaXY+JztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgIGZ1bmN0aW9uIHNldERhdGEoZGF0YSkge1xuICAgICAgICAgICAgdmFyIHJlc3VsdCA9ICRkYXRhLmdldERhdGEoZGF0YSk7XG4gICAgICAgICAgICBpZiggYW5ndWxhci5pc0Z1bmN0aW9uKCByZXN1bHQudGhlbiApICYmIGFuZ3VsYXIuaXNGdW5jdGlvbiggcmVzdWx0LmNhdGNoICkgJiYgYW5ndWxhci5pc0Z1bmN0aW9uKCByZXN1bHQuZmluYWxseSApICkge1xuICAgICAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIF9kYXRhID0gcmVzdWx0O1xuICAgICAgICAgICAgfVxuXG4gICAgICAgIH1cblxuICAgICAgICBmdW5jdGlvbiBzZXRTY2hlbWEoc2NoZW1hKSB7XG4gICAgICAgICAgICBfc2NoZW1hID0gJHNjaGVtYS5nZXRTY2hlbWEoc2NoZW1hKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGZ1bmN0aW9uIGJ1aWxkVGVtcGxhdGUoc2NoZW1hUGFydCwgcGFyZW50S2V5LCByZXF1aXJlZCkge1xuICAgICAgICAgICAgdmFyIHRlbXBsYXRlID0gJycsXG4gICAgICAgICAgICAgICAgZnVsbEtleSA9ICcnO1xuICAgICAgICAgICAgYW5ndWxhci5mb3JFYWNoKHNjaGVtYVBhcnQsIGZ1bmN0aW9uKHZhbHVlLCBrZXkpIHtcbiAgICAgICAgICAgICAgICBpZiAodmFsdWUudHlwZSkge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhmdWxsS2V5ICsgJyBpcyAnKyB2YWx1ZS50eXBlKTtcbiAgICAgICAgICAgICAgICAgICAgc3dpdGNoICh2YWx1ZS50eXBlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlICdvYmplY3QnOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciByZXF1aXJlZF9saXN0ID0gdHlwZW9mKCB2YWx1ZS5yZXF1aXJlZCApICE9PSAndW5kZWZpbmVkJyA/IHZhbHVlLnJlcXVpcmVkIDogbnVsbDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0ZW1wbGF0ZSArPSBidWlsZFRlbXBsYXRlKHZhbHVlLnByb3BlcnRpZXMsIGZ1bGxLZXksIHJlcXVpcmVkX2xpc3QgKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ2FycmF5JzpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0ZW1wbGF0ZSArPSBidWlsZFRlbXBsYXRlKHZhbHVlLml0ZW1zLnByb3BlcnRpZXMsIGZ1bGxLZXkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAnbnVtYmVyJyB8fCAnaW50ZWdlcic6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGUgKz0gX2l0ZW1UZW1wbGF0ZS5udW1iZXIodmFsdWUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAnc3RyaW5nJzpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgaXNfcmVxdWlyZWQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiggcmVxdWlyZWQgJiYgcmVxdWlyZWQuaW5kZXhPZihrZXkpICE9PSAtMSApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaXNfcmVxdWlyZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0ZW1wbGF0ZSArPSBfaXRlbVRlbXBsYXRlLnRleHQodmFsdWUsIGtleSwgaXNfcmVxdWlyZWQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAnYm9vbGVhbic6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGUgKz0gX2l0ZW1UZW1wbGF0ZS5jaGVja2JveCh2YWx1ZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LCB0aGlzKTtcbiAgICAgICAgICAgIHJldHVybiB0ZW1wbGF0ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICByZXN0cmljdDogJ0UnLFxuICAgICAgICAgICAgcmVwbGFjZTogdHJ1ZSxcbiAgICAgICAgICAgIHRlbXBsYXRlOiAnJyxcbiAgICAgICAgICAgIHNjb3BlOiB7XG4gICAgICAgICAgICAgICAgY29uZmlnOic9JywgLy9DcmVhdGUgc2NvcGUgaXNvbGF0aW9uIHdpdGggYmktZGlyZWN0aW9uYWwgYmluZGluZyxcbiAgICAgICAgICAgICAgICB0aXRsZTogJz0nXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgbGluazogZnVuY3Rpb24gKHNjb3BlLCBlbGVtZW50LCBhdHRyaWJ1dGVzKSB7XG4gICAgICAgICAgICAgICAgc2NvcGUuY29uZmlnLm9wdGlvbnMgPSBhbmd1bGFyLmV4dGVuZChfb3B0aW9ucywgc2NvcGUuY29uZmlnLm9wdGlvbnMpO1xuXG4gICAgICAgICAgICAgICAgdmFyIHByb21pc2UgPSBzZXREYXRhKHNjb3BlLmNvbmZpZy5kYXRhKTtcbiAgICAgICAgICAgICAgICBzZXRTY2hlbWEoc2NvcGUuY29uZmlnLnNjaGVtYSk7XG4gICAgICAgICAgICAgICAgaWYoIHByb21pc2UgKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vdG9kbzogc2V0IGRpcmVjdGl2ZSB0byBsb2FkaW5nIHN0YXRlXG4gICAgICAgICAgICAgICAgICAgIHByb21pc2UudGhlbihcbiAgICAgICAgICAgICAgICAgICAgICAgIGZ1bmN0aW9uKHJlc3VsdCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vdG9kbzogc2V0IGRpcmVjdGl2ZSB0byBsb2FkZWQgc3RhdGVcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBfZGF0YSA9IHJlc3VsdDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbGVtZW50Lmh0bWwoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICc8Zm9ybSBub3ZhbGlkYXRlIGNsYXNzPVwie3tjb25maWcub3B0aW9ucy50aGVtZX19XCI+JytcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJzxkaXYgY2xhc3M9XCJiYW5uZXIgcGFnZS1oZWFkZXJcIj48aDM+e3tjb25maWcub3B0aW9ucy5oZWFkZXJ9fTwvaDM+PC9kaXY+JytcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJ1aWxkVGVtcGxhdGUoX3NjaGVtYSkgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJzxidXR0b24gbmctaWY9XCJjb25maWcub3B0aW9ucy5idXR0b25cIj57e2NvbmZpZy5vcHRpb25zLmJ1dHRvbn19PC9idXR0b24+JyArXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICc8ZGl2IGNsYXNzPVwicGFnZS1mb290ZXJcIj48aDM+e3tjb25maWcub3B0aW9ucy5mb290ZXJ9fTwvaDM+PC9kaXY+JytcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJzwvZm9ybT4nXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkY29tcGlsZShlbGVtZW50LmNvbnRlbnRzKCkpKHNjb3BlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICBmdW5jdGlvbihyZWFzb24pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL3RvZG86IHNldCBkaXJlY3RpdmUgdG8gZXJyb3Igc3RhdGVcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICBlbGVtZW50Lmh0bWwoXG4gICAgICAgICAgICAgICAgICAgICAgICAnPGZvcm0gbm92YWxpZGF0ZSBjbGFzcz1cInt7Y29uZmlnLm9wdGlvbnMudGhlbWV9fVwiPkxPQURJTkcuLi48L2Zvcm0+J1xuICAgICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgICAgICAkY29tcGlsZShlbGVtZW50LmNvbnRlbnRzKCkpKHNjb3BlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGVsZW1lbnQuaHRtbChcbiAgICAgICAgICAgICAgICAgICAgICAgICc8Zm9ybSBub3ZhbGlkYXRlIGNsYXNzPVwie3tjb25maWcub3B0aW9ucy50aGVtZX19XCI+JytcbiAgICAgICAgICAgICAgICAgICAgICAgICc8ZGl2IGNsYXNzPVwiYmFubmVyIHBhZ2UtaGVhZGVyXCI+PGgzPnt7Y29uZmlnLm9wdGlvbnMuaGVhZGVyfX08L2gzPjwvZGl2PicrXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnVpbGRUZW1wbGF0ZShfc2NoZW1hKSArXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJzxidXR0b24gbmctaWY9XCJjb25maWcub3B0aW9ucy5idXR0b25cIj57e2NvbmZpZy5vcHRpb25zLmJ1dHRvbn19PC9idXR0b24+JyArXG4gICAgICAgICAgICAgICAgICAgICAgICAnPGRpdiBjbGFzcz1cInBhZ2UtZm9vdGVyXCI+PGgzPnt7Y29uZmlnLm9wdGlvbnMuZm9vdGVyfX08L2gzPjwvZGl2PicrXG4gICAgICAgICAgICAgICAgICAgICAgICAnPC9mb3JtPidcbiAgICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICAgICAgJGNvbXBpbGUoZWxlbWVudC5jb250ZW50cygpKShzY29wZSk7XG4gICAgICAgICAgICAgICAgfVxuXG5cbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcblxuICAgIH1dKVxuOyIsImFuZ3VsYXIubW9kdWxlKCdib3NzeS5pbnB1dCcsIFtdKVxuICAgIC5ydW4oZnVuY3Rpb24oJHRlbXBsYXRlQ2FjaGUpe1xuICAgICAgICAkdGVtcGxhdGVDYWNoZS5wdXQoJ2Jvc3N5LWlucHV0Lmh0bWwnLCAnPGRpdiBjbGFzcz1cImZvcm0tZ3JvdXAgYm9zc3ktaW5wdXRcIj48bGFiZWwgZm9yPVwiXCI+e3t0aXRsZX19PC9sYWJlbD48aW5wdXQgdHlwZT1cInt7dHlwZX19XCIgY2xhc3M9XCJmb3JtLWNvbnRyb2xcIiBwbGFjZWhvbGRlcj1cIlwiIHZhbHVlPVwie3t2YWx1ZX19XCIvPjxzcGFuPjwvc3Bhbj48L2Rpdj4nKTtcbiAgICB9KVxuICAgIC5kaXJlY3RpdmUoJ2Jvc3N5SW5wdXQnLFsnJGNvbXBpbGUnLCckaHR0cCcsJyRzY2hlbWEnLCckZGF0YScsJyR0ZW1wbGF0ZUNhY2hlJywgZnVuY3Rpb24gKCRjb21waWxlLCAkaHR0cCwgJHNjaGVtYSwgJGRhdGEsICR0ZW1wbGF0ZUNhY2hlKSB7XG4gICAgXHRyZXR1cm4ge1xuXHRcdFx0cmVzdHJpY3Q6ICdFJyxcblx0XHRcdHJlcGxhY2U6IHRydWUsXG5cdFx0XHRzY29wZToge1xuXHRcdFx0XHR0aXRsZTogJz0nLFxuXHRcdFx0XHR2YWx1ZTogJz0nLFxuXHRcdFx0XHR0eXBlOiAnPScsXG5cdFx0XHRcdHJlcXVpcmVkOiAnPSdcblx0XHRcdH0sXG5cdFx0XHR0ZW1wbGF0ZTogJHRlbXBsYXRlQ2FjaGUuZ2V0KCdib3NzeS1pbnB1dC5odG1sJylcblx0XHR9O1xuICAgIH1dKTtcbiIsInZhciBhcHAgPSBhbmd1bGFyLm1vZHVsZSgnYm9zc3kubnVtZXJpY3RleHRib3gnLFtdKTtcblxuXG5hcHAuY29udHJvbGxlcignYm9zc3ludW1lcmljQ3RybCcsZnVuY3Rpb24oJHNjb3BlKXtcbiAgICB2YXIgc3ltYm9scz1bJyQnLCclJywnbGJzJ107XG4gICAgdmFyIGluaXRpYWxWYWx1ZT0wO1xuXG5cbiAgICB2YXIga2V5ID0ge1xuICAgICAgICBwcmljZTowLFxuICAgICAgICB3ZWlnaHQ6MCxcbiAgICAgICAgZGlzY291bnQ6MCxcbiAgICAgICAgc3RvY2s6MFxuICAgIH07XG5cblxuICAgICRzY29wZS5wID0gc3ltYm9sc1swXSArIGluaXRpYWxWYWx1ZTtcbiAgICAkc2NvcGUudyA9IGluaXRpYWxWYWx1ZSArIHN5bWJvbHNbMl07XG4gICAgJHNjb3BlLmQgPSBpbml0aWFsVmFsdWUgKyBzeW1ib2xzWzFdO1xuICAgICRzY29wZS5zID0gaW5pdGlhbFZhbHVlO1xuXG4gICAgJHNjb3BlLmluY3JlbWVudCA9IGZ1bmN0aW9uKGEpe1xuICAgICAgICBzd2l0Y2goYSl7XG4gICAgICAgICAgICBjYXNlICdwcmljZSc6XG4gICAgICAgICAgICAgICAga2V5LnByaWNlKys7XG4gICAgICAgICAgICAgICAgJHNjb3BlLnAgPSBzeW1ib2xzWzBdICsga2V5LnByaWNlO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAnd2VpZ2h0JzpcbiAgICAgICAgICAgICAgICBrZXkud2VpZ2h0Kys7XG4gICAgICAgICAgICAgICAgJHNjb3BlLnc9a2V5LndlaWdodCArIHN5bWJvbHNbMl07XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICdkaXNjb3VudCc6XG4gICAgICAgICAgICAgICAga2V5LmRpc2NvdW50Kys7XG4gICAgICAgICAgICAgICAgJHNjb3BlLmQgPSBrZXkuZGlzY291bnQgKyBzeW1ib2xzWzFdO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAnc3RvY2snOlxuICAgICAgICAgICAgICAgIGtleS5zdG9jaysrO1xuICAgICAgICAgICAgICAgICRzY29wZS5zPWtleS5zdG9jaztcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICB9XG4gICAgJHNjb3BlLmRlY3JlbWVudCA9IGZ1bmN0aW9uKGEpe1xuXG4gICAgICAgIHN3aXRjaChhKXtcbiAgICAgICAgICAgIGNhc2UgJ3ByaWNlJzpcbiAgICAgICAgICAgICAgICBpZihrZXkucHJpY2U+MClcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIGtleS5wcmljZS0tO1xuICAgICAgICAgICAgICAgICAgICAkc2NvcGUucCA9IHN5bWJvbHNbMF0gKyBrZXkucHJpY2U7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAnd2VpZ2h0JzpcbiAgICAgICAgICAgICAgICBpZihrZXkud2VpZ2h0PjApe1xuICAgICAgICAgICAgICAgICAgICBrZXkud2VpZ2h0LS07XG4gICAgICAgICAgICAgICAgICAgICRzY29wZS53PWtleS53ZWlnaHQgKyBzeW1ib2xzWzJdO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJ2Rpc2NvdW50JzpcbiAgICAgICAgICAgICAgICBpZihrZXkuZGlzY291bnQ+MClcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIGtleS5kaXNjb3VudC0tO1xuICAgICAgICAgICAgICAgICAgICAkc2NvcGUuZCA9IGtleS5kaXNjb3VudCsgc3ltYm9sc1sxXTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICdzdG9jayc6XG4gICAgICAgICAgICAgICAgaWYoa2V5LnN0b2NrPjApe1xuICAgICAgICAgICAgICAgICAgICBrZXkuc3RvY2stLTtcbiAgICAgICAgICAgICAgICAgICAgJHNjb3BlLnM9a2V5LnN0b2NrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cblxuICAgIH1cblxufSk7XG5cblxuYXBwLmRpcmVjdGl2ZSgnYm9zc3ludW1lcmljdGV4dGJveCcsZnVuY3Rpb24oKXtcbiAgICByZXR1cm57XG4gICAgICAgIGNvbnRyb2xsZXI6J2Jvc3N5bnVtZXJpY0N0cmwnLFxuICAgICAgICByZXN0cmljdDonRScsXG4gICAgICAgIHRyYW5zY2x1ZGU6dHJ1ZSxcbiAgICAgICAgdGVtcGxhdGVVcmw6J2Jvc3N5Lm51bWVyaWN0ZXh0Ym94Lmh0bWwnXG5cbiAgICB9XG59KTtcdCIsImFuZ3VsYXIubW9kdWxlKCdib3NzeS5zY2hlbWEnLCBbXSlcbiAgICAuZmFjdG9yeSgnJHNjaGVtYScsIFsnJHEnLCAnJGh0dHAnLCBmdW5jdGlvbiAoJHEsICRodHRwKSB7XG5cbiAgICAgICAgZnVuY3Rpb24gX2dldFNjaGVtYSAoc2NoZW1hKSB7XG4gICAgICAgICAgICBpZiAoYW5ndWxhci5pc1N0cmluZyhzY2hlbWEpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIF9nZXRSZW1vdGVTY2hlbWEoc2NoZW1hKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKGFuZ3VsYXIuaXNPYmplY3Qoc2NoZW1hKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBzY2hlbWE7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAvL1RPRE86IHJlcGxhY2UgZXJyb3IgbWVzc2FnZSB3aXRoIG9ubGluZSBkb2MgbGluayBsaWtlIG5nIGVycm9yc1xuICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ2RpcmVjdGl2ZS5ib3NzeUZvcm06IG5vIHNjaGVtYSB1cmwgb3Igb2JqZWN0IGdpdmVuJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBmdW5jdGlvbiBfZ2V0UmVtb3RlU2NoZW1hKHNjaGVtYSkge1xuICAgICAgICAgICAgdmFyIGRlZmVycmVkID0gJHEuZGVmZXIoKTtcblxuICAgICAgICAgICAgJGh0dHAuZ2V0KCBzY2hlbWEgKVxuICAgICAgICAgICAgICAgIC5zdWNjZXNzKCBmdW5jdGlvbiggZGF0YSApIHtcbiAgICAgICAgICAgICAgICAgICAgaWYoIGFuZ3VsYXIuaXNPYmplY3QoIGRhdGEgKSApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlc29sdmUoZGF0YSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvL1RPRE86IHJlcGxhY2UgZXJyb3IgbWVzc2FnZSB3aXRoIG9ubGluZSBkb2MgbGluayBsaWtlIG5nIGVycm9yc1xuICAgICAgICAgICAgICAgICAgICAgICAgZGVmZXJyZWQucmVqZWN0KCdkaXJlY3RpdmUuYm9zc3lGb3JtOiBHRVQgcmVxdWVzdCB0byB1cmwgZGlkIG5vdCBwcm9kdWNlIHNjaGVtYSBvYmplY3QnKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgLmVycm9yKCBmdW5jdGlvbihkYXRhLCBzdGF0dXMpIHtcbiAgICAgICAgICAgICAgICAgICAgLy9UT0RPOiByZXBsYWNlIGVycm9yIG1lc3NhZ2Ugd2l0aCBvbmxpbmUgZG9jIGxpbmsgbGlrZSBuZyBlcnJvcnNcbiAgICAgICAgICAgICAgICAgICAgZGVmZXJyZWQucmVqZWN0KCdkaXJlY3RpdmUuYm9zc3lGb3JtOiBHRVQgcmVxdWVzdCB0byB1cmwgXCInICsgc2NoZW1hICsgJ1wiIGZhaWxlZCB3aXRoIHN0YXR1cyBcIicgKyBzdGF0dXMgKyAnXCInKTtcbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgcmV0dXJuIGRlZmVycmVkLnByb21pc2U7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgZ2V0U2NoZW1hOiBfZ2V0U2NoZW1hXG4gICAgICAgIH07XG4gICAgfV0pXG47XG4iLCIvKlRoaXMgaXMgYSBzbGlkZXIgd2lkZ2V0IGNyZWF0ZWQgaW4gYW5ndWxhciBhcyBwYXJ0IG9mIHRoZSBCb3NzeVVJIHdpZGdldHMuXG4gKiBUaGUgZWFzaWVzdCB3YXkgdG8gdXNlIHRoZSBzbGlkZXIgaXMgdG8gaW5jbHVkZSBpdCBpbiB5b3VyIEhUTUwgYW5kIHRoZW5cbiAqIGNyZWF0ZSBhIHRhZyA8Ym9zc3ktc2xpZGVyPjwvYm9zc3ktc2xpZGVyPi4gVGhpcyB3aWRnZXQgdGFrZSBpbiBzZXZlcmFsXG4gKiB3YXlzIHRvIGN1c3RvbWl6ZS4gTGlzdCBvZiBjdXN0b21pemF0aW9ucyBhdmFpbGFibGUuXG4gKiBtYXggICAgICAgICAgICAgIGRlZmF1bHRzIHRvIDEwMFxuICogbWluICAgICAgICAgICAgICBkZWZhdWx0cyB0byAxXG4gKiB3aWR0aCAgICAgICAgICAgIGRlZmF1bHRzIHRvIDI1MHB4XG4gKiBiYXJmaWxsY29sb3IgICAgIGRlZmF1bHRzIHRvIGRhcmtibHVlOiBtdXN0IGJlIHBhc3NlZCBhcyBoZXhhZGVjaW1hbCBjb2xvciBmb3JtYXQgIzAwMDAwMFxuICogYmFyZW1wdHljb2xvciAgICBkZWZhdWx0cyB0byBsaWdodGdyZXlcbiAqIGJ1dHRvbmNvbG9yICAgICAgZGVmYXVsdHMgdG8gcmVkXG4gKiBzdGVwICAgICAgICAgICAgIGRlZmF1bHRzIHRvIHJlZFxuICogb3JpZW50YXRpb24gICAgICBkZWZhdWx0cyB0byBob3Jpem9udGFsXG4gKiBleC5cbiAqIDxib3NzeS1zbGlkZXIgbWF4PVwiMjBcIiBtaW49XCItNVwiIG9yaWVudGF0aW9uPVwidmVydGljYWxcIj48L2Jvc3N5LXNsaWRlcj4qL1xuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG5cbnZhciBhcHAgPSBhbmd1bGFyLm1vZHVsZSgnYm9zc3kuc2xpZGVyJywgW10pO1xuYXBwLmNvbnRyb2xsZXIoJ1NsaWRlckNvbnRyb2xsZXInLCBbJyRzY29wZScsIGZ1bmN0aW9uICgkc2NvcGUpIHtcbiAgICAvL3RoZXNlIGFyZSBvdXIgZGVmYXVsdCB2YWx1ZXMgYW5kIGFyZSB0aGUgdmFyaWFibGVzIHRoYXQgY2FuIGJlIGNoYW5nZWQgYnkgdXNlciBvZiBvdXIgd2lkZ2V0c1xuICAgICRzY29wZS5tYXggPSAxMDtcbiAgICAkc2NvcGUudmFsdWUgPSAwO1xuICAgICRzY29wZS5taW4gPSAxO1xuICAgICRzY29wZS5maWxsV2lkdGggPSAwO1xuICAgICRzY29wZS5lbXB0V2lkdGggPSAwO1xuICAgICRzY29wZS5iYXJXaWR0aCA9IDI1MDtcbiAgICAkc2NvcGUuYmFyUGllY2UgPSAwO1xuICAgICRzY29wZS5zdGVwID0gMTtcbiAgICAkc2NvcGUuaXNNb3VzZURvd24gPSAwO1xuICAgICRzY29wZS55Q29yZCA9IDA7XG4gICAgJHNjb3BlLnhDb3JkID0gMDtcbiAgICAkc2NvcGUubmV3WENvcmQgPSAwO1xuICAgICRzY29wZS5uZXdZQ29yZCA9IDA7XG4gICAgJHNjb3BlLm9yaWVudGF0aW9uID0gZmFsc2U7XG4gICAgJHNjb3BlLmJ1dFNpemUgPSAxNTtcbiAgICAkc2NvcGUuYmFyZmlsbGNvbG9yID0gXCIjMDAwMEZGXCI7XG4gICAgJHNjb3BlLmJhcmVtcHR5Y29sb3IgPSBcIiNEM0QzRDNcIjtcbiAgICAkc2NvcGUuYnV0dG9uY29sb3IgPSBcIiNGRjAwMDBcIjtcblxuXG4gICAgLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG5cbiAgICAvKm1ha2VCYXIoKVxuICAgICAqIFRoaXMgY3JlYXRlcyB0aGUgaW5pdGlhbCBncmFwaGljIG9mIHRoZSBzbGlkZXIgYW5kIGVuc3VyZXMgaXQgaXMgaW4gdGhlIGNvcnJlY3Qgb3JkZXJcbiAgICAgKiBDQyA9IDQgKi9cbiAgICAkc2NvcGUubWFrZUJhciA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgLy9idXR0b24gc2hvdWxkIHNob3cgdXAgaW4gdGhlIG1pZGRsZSBub3cgb3IgY2xvc2UgdG8gaWYgdW5ldmVuXG4gICAgICAgICRzY29wZS52YWx1ZSA9IHBhcnNlSW50KCgkc2NvcGUubWF4ICsgJHNjb3BlLm1pbikgLyAyKTtcbiAgICAgICAgZm9yICh2YXIgY3VycmVudCA9ICRzY29wZS5taW47IGN1cnJlbnQgPD0gJHNjb3BlLm1heDsgY3VycmVudCsrKSB7XG4gICAgICAgICAgICBpZiAoY3VycmVudCA8ICgkc2NvcGUudmFsdWUpKSB7XG4gICAgICAgICAgICAgICAgJHNjb3BlLmZpbGxXaWR0aCsrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGN1cnJlbnQgPiAoJHNjb3BlLnZhbHVlKSkge1xuICAgICAgICAgICAgICAgICRzY29wZS5lbXB0V2lkdGgrKztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChjdXJyZW50ID09ICgkc2NvcGUudmFsdWUpKSB7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgJHNjb3BlLm5nTW9kZWwgPSAkc2NvcGUudmFsdWU7XG4gICAgICAgIHJldHVybjtcbiAgICB9O1xuICAgIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuXG4gICAgLyppbmNyZWFzZSgpXG4gICAgICogVGhpcyBjaGVja3MgYm91bmRzIHdoZW4gYXR0ZW1wdGluZyB0byBpbmNyZWFzZSB0aGUgdmFsdWUgYW5kIG1vdmVzIHRoZSBwb3NpdGlvblxuICAgICAqIG9mIHRoZSBzbGlkZXIgYnV0dG9uIGFuZCB1cGRhdGVzIHRoZSB2YWx1ZS5cbiAgICAgKiBDQyA9IDIqL1xuICAgICRzY29wZS5pbmNyZWFzZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKCRzY29wZS52YWx1ZSA8ICRzY29wZS5tYXgpIHtcbiAgICAgICAgICAgICRzY29wZS52YWx1ZSA9ICRzY29wZS52YWx1ZSArIDE7XG4gICAgICAgICAgICAkc2NvcGUuZmlsbFdpZHRoKys7XG4gICAgICAgICAgICAkc2NvcGUuZW1wdFdpZHRoLS07XG4gICAgICAgICAgICAkc2NvcGUubmdNb2RlbCA9ICRzY29wZS52YWx1ZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm47XG4gICAgfTtcbiAgICAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cblxuICAgIC8qYnV0SW5jcmVhc2UoKVxuICAgICAqIFRoaXMgZnVuY3Rpb24gYWxsb3dzIHRoZSBzbGlkZXIgdG8gaW5jcmVhc2UgaW4gaW5jcmVtZW50cy5cbiAgICAgKiBDQyA9IDEqL1xuICAgICRzY29wZS5idXRJbmNyZWFzZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGkgPSAwO1xuICAgICAgICBmb3IgKGkgPSAwOyBpIDwgJHNjb3BlLnN0ZXA7IGkrKykge1xuICAgICAgICAgICAgJHNjb3BlLmluY3JlYXNlKCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cblxuICAgIC8qZGVjcmVhc2UoKVxuICAgICAqIFRoaXMgY2hlY2tzIGJvdW5kcyB3aGVuIGF0dGVtcHRpbmcgdG8gZGVjcmVhc2UgdGhlIHZhbHVlIGFuZCBtb3ZlcyB0aGUgcG9zaXRpb25cbiAgICAgKiBvZiB0aGUgc2xpZGVyIGJ1dHRvbiBhbmQgdXBkYXRlcyB0aGUgdmFsdWUuXG4gICAgICogQ0MgPSAyKi9cbiAgICAkc2NvcGUuZGVjcmVhc2UgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmICgkc2NvcGUudmFsdWUgPiAkc2NvcGUubWluKSB7XG4gICAgICAgICAgICAkc2NvcGUudmFsdWUgPSAkc2NvcGUudmFsdWUgLSAxO1xuICAgICAgICAgICAgJHNjb3BlLmZpbGxXaWR0aC0tO1xuICAgICAgICAgICAgJHNjb3BlLmVtcHRXaWR0aCsrO1xuICAgICAgICAgICAgJHNjb3BlLm5nTW9kZWwgPSAkc2NvcGUudmFsdWU7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuO1xuICAgIH07XG4gICAgLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG5cbiAgICAvKmJ1dERlY3JlYXNlKClcbiAgICAgKiBUaGlzIGZ1bmN0aW9uIGFsbG93cyB0aGUgc2xpZGVyIHRvIGRlY3JlYXNlIGluIGluY3JlbWVudHNcbiAgICAgKiBDQyA9IDEqL1xuICAgICRzY29wZS5idXREZWNyZWFzZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGkgPSAwO1xuICAgICAgICBmb3IgKGkgPSAwOyBpIDwgJHNjb3BlLnN0ZXA7IGkrKykge1xuICAgICAgICAgICAgJHNjb3BlLmRlY3JlYXNlKCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cblxuICAgIC8qa2V5QmluZCgkZXZlbnQpXG4gICAgICogVGhpcyBmdW5jdGlvbiBpcyB0byBiaW5kIHRoZSBkZWNyZWFzZSBhbmQgaW5jcmVhc2UgZnVuY3Rpb24gd2l0aCB0aGUgYXJyb3cga2V5c1xuICAgICAqIENDID0gNSovXG4gICAgJHNjb3BlLmtleUJpbmQgPSBmdW5jdGlvbiAoZXYpIHtcbiAgICAgICAgJHNjb3BlLnByZXNzZWQgPSBldi53aGljaDtcbiAgICAgICAgLy9JZiBhcnJvdyBrZXkoTGVmdCBvciBEb3duKSBpcyBwcmVzc2VkIHRoZW4gY2FsbCB0aGUgZGVjcmVhc2UoKSBmdW5jdGlvbiB0byBkZWNyZWFzZSB0aGUgdmFsdWUuXG4gICAgICAgIGlmICgkc2NvcGUucHJlc3NlZCA9PT0gMzcgfHwgJHNjb3BlLnByZXNzZWQgPT09IDQwKSB7XG4gICAgICAgICAgICAkc2NvcGUuYnV0RGVjcmVhc2UoKTtcblxuICAgICAgICB9XG4gICAgICAgIC8vc2FtZSBhcyBhYm92ZSBidXQgZm9yIFVwIG9yIFJpZ2h0IHRvIGluY3JlYXNlIHRoZSB2YWx1ZS5cbiAgICAgICAgaWYgKCRzY29wZS5wcmVzc2VkID09PSAzOCB8fCAkc2NvcGUucHJlc3NlZCA9PT0gMzkpIHtcbiAgICAgICAgICAgICRzY29wZS5idXRJbmNyZWFzZSgpO1xuXG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuO1xuICAgIH07XG4gICAgLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG5cbiAgICAvKmdyZXlDbGljaygpXG4gICAgICogVGhpcyBmdW5jdGlvbiBpcyB0byBhbGxvdyB0aGUgdmFsdWUgdG8gYmUgY2hhbmdlZCB3aGVuIGNsaWNraW5nIG9uIHRoZSBiYXJcbiAgICAgKiBDQyA9IDEqL1xuICAgICRzY29wZS5ncmV5Q2xpY2sgPSBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgICAgLy9XaGVuIGNsaWNrIG9uIHRoZSBlbXB0eSBiYXIgdGhlIGJhciB3aWxsIGluY3JlYXNlXG4gICAgICAgICRzY29wZS5idXRJbmNyZWFzZSgpO1xuXG4gICAgICAgIHJldHVybjtcbiAgICB9O1xuICAgIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuXG4gICAgLypiYXJDbGljaygpXG4gICAgICogVGhpcyBmdW5jdGlvbiBpcyB0byBhbGxvdyB0aGUgdmFsdWUgdG8gYmUgY2hhbmdlZCB3aGVuIGNsaWNraW5nIG9uIHRoZSBiYXJcbiAgICAgKiBDQyA9IDEqL1xuICAgICRzY29wZS5iYXJDbGljayA9IGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICAvL1doZW4gY2xpY2sgb24gdGhlIEZpbGxlZCB1cCBjb2xvciBzaWRlIHRoZSBiYXIgd2lsbCBkZWNyZWFzZVxuICAgICAgICAkc2NvcGUuYnV0RGVjcmVhc2UoKTtcblxuICAgICAgICByZXR1cm47XG4gICAgfTtcbiAgICAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cblxuICAgIC8qZHJhZygkZXZlbnQpXG4gICAgICogVGhpcyBmdW5jdGlvbiBhbGxvd3MgdGhlIGJ1dHRvbiB0byBkcmFnIGJ5IGZpbmRpbmcgaXRzIGxvY2F0aW9uIHRoZW4gY2hlY2tzIGl0IGFnYWluc3QgaXRzIG9yaWdpbmFsIGxvY2F0aW9uXG4gICAgICogYW5kIGlmIGl0IGlzIGRpc3RhbmNlIGlzIGdyZWF0ZXIgdGhhbiB0aGUgc2l6ZSBvZiBhIGJhcnBpZWNlIHVwZGF0ZSB0aGUgZ3JhcGhpYyBhbmQgdmFsdWVcbiAgICAgKiBDQyA9IDkqL1xuICAgICRzY29wZS5kcmFnID0gZnVuY3Rpb24gKGV2ZW50KSB7XG5cbiAgICAgICAgLy9ncmFiIHRoZSBtb3VzZSBsb2NhdGlvblxuICAgICAgICB2YXIgeCA9IGV2ZW50LmNsaWVudFg7XG4gICAgICAgIHZhciB5ID0gZXZlbnQuY2xpZW50WTtcbiAgICAgICAgLy9jaGVjayBpZiB0aGUgbW91c2UgaXMgYmVpbmcgaGVsZCBkb3duXG4gICAgICAgIGlmICgkc2NvcGUuaXNNb3VzZURvd24pIHtcbiAgICAgICAgICAgIC8vY2hlY2sgdGhlIG9yaWVudGF0aW9uXG4gICAgICAgICAgICBpZiAoJHNjb3BlLm9yaWVudGF0aW9uKSB7XG4gICAgICAgICAgICAgICAgLy9pZiB0aGlzIGlzIHRoZSBmaXJzdCB0aW1lIHlvdSBjbGlja2VkIGRvd24gZ2V0IHJlYWR5IHRvIG1vdmUgaXRcbiAgICAgICAgICAgICAgICBpZiAoJHNjb3BlLnlDb3JkID09PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgICRzY29wZS55Q29yZCA9IHk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAvL2NoYW5nZSB0aGUgbG9jYXRpb24gb2YgdGhlIHNsaWRlciBhZnRlciBlbm91Z2ggbW92ZW1lbnRcbiAgICAgICAgICAgICAgICAgICAgJHNjb3BlLm5ld1lDb3JkID0geTtcbiAgICAgICAgICAgICAgICAgICAgd2hpbGUgKCgkc2NvcGUubmV3WUNvcmQgLSAkc2NvcGUueUNvcmQpID4gJHNjb3BlLmJhclBpZWNlIC8gMikge1xuICAgICAgICAgICAgICAgICAgICAgICAgJHNjb3BlLnlDb3JkICs9ICRzY29wZS5iYXJQaWVjZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICRzY29wZS5kZWNyZWFzZSgpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHdoaWxlICgoJHNjb3BlLm5ld1lDb3JkIC0gJHNjb3BlLnlDb3JkKSA8IC0oJHNjb3BlLmJhclBpZWNlIC8gMikpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICRzY29wZS55Q29yZCAtPSAkc2NvcGUuYmFyUGllY2U7XG4gICAgICAgICAgICAgICAgICAgICAgICAkc2NvcGUuaW5jcmVhc2UoKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIC8vaWYgdGhpcyBpcyB0aGUgZmlyc3QgdGltZSB5b3UgY2xpY2tlZCBkb3duIGdldCByZWFkeSB0byBtb3ZlIGl0XG4gICAgICAgICAgICAgICAgaWYgKCRzY29wZS54Q29yZCA9PT0gMCkge1xuICAgICAgICAgICAgICAgICAgICAkc2NvcGUueENvcmQgPSB4O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgLy9jaGFuZ2UgdGhlIGxvY2F0aW9uIG9mIHRoZSBzbGlkZXIgYWZ0ZXIgZW5vdWdoIG1vdmVtZW50XG4gICAgICAgICAgICAgICAgICAgICRzY29wZS5uZXdYQ29yZCA9IHg7XG4gICAgICAgICAgICAgICAgICAgIHdoaWxlICgoJHNjb3BlLm5ld1hDb3JkIC0gJHNjb3BlLnhDb3JkKSA+ICRzY29wZS5iYXJQaWVjZSAvIDIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICRzY29wZS54Q29yZCArPSAkc2NvcGUuYmFyUGllY2U7XG4gICAgICAgICAgICAgICAgICAgICAgICAkc2NvcGUuaW5jcmVhc2UoKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB3aGlsZSAoKCRzY29wZS5uZXdYQ29yZCAtICRzY29wZS54Q29yZCkgPCAtKCRzY29wZS5iYXJQaWVjZSAvIDIpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAkc2NvcGUueENvcmQgLT0gJHNjb3BlLmJhclBpZWNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgJHNjb3BlLmRlY3JlYXNlKCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuO1xuICAgIH07XG4gICAgLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG5cbiAgICAvKmRvd24oKVxuICAgICAqIFRoaXMgZnVuY3Rpb24gbG9ncyB3aGVuIHRoZSBtb3VzZSBpcyBkb3duXG4gICAgICogQ0MgPSAxKi9cbiAgICAkc2NvcGUuZG93biA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgJHNjb3BlLm5ld1hDb3JkID0gMDtcbiAgICAgICAgJHNjb3BlLnhDb3JkID0gMDtcbiAgICAgICAgJHNjb3BlLm5ld1lDb3JkID0gMDtcbiAgICAgICAgJHNjb3BlLnlDb3JkID0gMDtcbiAgICAgICAgJHNjb3BlLmlzTW91c2VEb3duID0gMTtcbiAgICAgICAgcmV0dXJuO1xuICAgIH07XG4gICAgLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG5cbiAgICAvKmRvd24oKVxuICAgICAqIFRoaXMgZnVuY3Rpb24gbG9ncyB3aGVuIHRoZSBtb3VzZSBpcyB1cFxuICAgICAqIENDID0gMSovXG4gICAgJHNjb3BlLnVwID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAkc2NvcGUubmV3WENvcmQgPSAwO1xuICAgICAgICAkc2NvcGUueENvcmQgPSAwO1xuICAgICAgICAkc2NvcGUubmV3WUNvcmQgPSAwO1xuICAgICAgICAkc2NvcGUueUNvcmQgPSAwO1xuICAgICAgICAkc2NvcGUuaXNNb3VzZURvd24gPSAwO1xuICAgICAgICByZXR1cm47XG4gICAgfTtcbiAgICAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbn1dKVxuYXBwLmRpcmVjdGl2ZSgnYm9zc3lTbGlkZXInLCBmdW5jdGlvbiAoJGNvbXBpbGUpIHtcbiAgICB2YXIgbXlUZW1wbGF0ZTtcbiAgICByZXR1cm4ge1xuICAgICAgICAvL2FsbG93cyB0aGUgc2xpZGVyIHRvIGJlIGNyZWF0ZWQgYXMgYW5kIGF0dHJpYnV0ZSBvciBlbGVtZW50IDxib3NzeS1zbGlkZXI+PGJvc3N5LXNsaWRlcj5cbiAgICAgICAgcmVzdHJpY3Q6ICdBRScsXG4gICAgICAgIGNvbnRyb2xsZXI6ICdTbGlkZXJDb250cm9sbGVyJyxcbiAgICAgICAgc2NvcGU6IHtcbiAgICAgICAgICAgIG5nTW9kZWw6ICc9J1xuICAgICAgICB9LFxuICAgICAgICAvKmxpbms6IGZ1bmN0aW9uOlxuICAgICAgICAgKiBUaGlzIGFsbG93cyB1cyB0byBwdWxsIGluIHRoZSBzZXR0aW5ncyB0aGUgcHJvZ3JhbW1lciB3YW50cyBmb3IgdGhlIHNsaWRlciBhbmQgc2V0IHRoaW5ncyBjb3JyZWN0bHlcbiAgICAgICAgICogaXQgYWxzbyBpbml0aWFsaXplcyB0aGUgc2xpZGVyIGFuZCBhZGRzIHRoZSBjb3JyZWN0IG9yaWVudGF0aW9uIHRlbXBsYXRlIHRvIHRoZSBET00qL1xuICAgICAgICBsaW5rOiB7XG4gICAgICAgICAgICBwcmU6IGZ1bmN0aW9uIChzY29wZSwgaUVsZW0sIGlBdHRyKSB7XG5cbiAgICAgICAgICAgICAgICAvL2NoZWNrcyB0byBzZWUgaWYgdGhlcmUgaXMgYSBtYXggYXR0cmlidXRlXG4gICAgICAgICAgICAgICAgaWYgKGlBdHRyLm1heCkge1xuICAgICAgICAgICAgICAgICAgICBzY29wZS5tYXggPSBwYXJzZUludChpQXR0ci5tYXgpO1xuICAgICAgICAgICAgICAgICAgICBpZiAoc2NvcGUubWF4ID09PSBOYU4pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNjb3BlLm1heCA9IDEwO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIC8vY2hlY2tzIHRvIHNlZSBpZiB0aGVyZSBpcyBhIG1pbiBhdHRyaWJ1dGVcbiAgICAgICAgICAgICAgICBpZiAoaUF0dHIubWluKSB7XG4gICAgICAgICAgICAgICAgICAgIHNjb3BlLm1pbiA9IHBhcnNlSW50KGlBdHRyLm1pbik7XG4gICAgICAgICAgICAgICAgICAgIGlmIChzY29wZS5taW4gPT09IE5hTikge1xuICAgICAgICAgICAgICAgICAgICAgICAgc2NvcGUubWluID0gMTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAvL2NoZWNrcyBmb3IgYmFyIGNvbG9yIGN1c3RvbWl6YXRpb25cbiAgICAgICAgICAgICAgICBpZiAoaUF0dHIuYmFyZmlsbGNvbG9yKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBwYXR0ZXJuID0gL14jWzAtOWEtZkEtRl17Nn0kLzsgLy9jdXJyZW50bHkgYWNjZXB0cyBsb3dlciBjYXNlIGEtZlxuICAgICAgICAgICAgICAgICAgICBpZiAocGF0dGVybi50ZXN0KGlBdHRyLmJhcmZpbGxjb2xvcikpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNjb3BlLmJhcmZpbGxjb2xvciA9IGlBdHRyLmJhcmZpbGxjb2xvcjtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAvL2NoZWNrcyBmb3IgZW1wdHkgYmFyIGNvbG9yIGN1c3RvbWl6YXRpb25cblxuICAgICAgICAgICAgICAgIGlmIChpQXR0ci5iYXJlbXB0eWNvbG9yKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBwYXR0ZXJuID0gL14jWzAtOWEtZkEtRl17Nn0kLzsgLy9jdXJyZW50bHkgYWNjZXB0cyBsb3dlciBjYXNlIGEtZlxuICAgICAgICAgICAgICAgICAgICBpZiAocGF0dGVybi50ZXN0KGlBdHRyLmJhcmVtcHR5Y29sb3IpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzY29wZS5iYXJlbXB0eWNvbG9yID0gaUF0dHIuYmFyZW1wdHljb2xvcjtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cblxuXG4gICAgICAgICAgICAgICAgaWYgKGlBdHRyLmJ1dHRvbmNvbG9yKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBwYXR0ZXJuID0gL14jWzAtOWEtZkEtRl17Nn0kLzsgLy9jdXJyZW50bHkgYWNjZXB0cyBsb3dlciBjYXNlIGEtZlxuICAgICAgICAgICAgICAgICAgICBpZiAocGF0dGVybi50ZXN0KGlBdHRyLmJ1dHRvbmNvbG9yKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgc2NvcGUuYnV0dG9uY29sb3IgPSBpQXR0ci5idXR0b25jb2xvcjtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAvL2ZpbmQgdGhlIHN0ZXAgc2l6ZSBmb3IgYnV0dG9uIGNsaWNrc1xuICAgICAgICAgICAgICAgIGlmIChpQXR0ci5zdGVwKSB7XG4gICAgICAgICAgICAgICAgICAgIHNjb3BlLnN0ZXAgPSBpQXR0ci5zdGVwO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAvL2ZpbmQgdGhlIHByZWZlcnJlZCB0b3RhbCB3aWR0aCB0byB1c2UgZm9yIHRoZSBzbGlkZXJcbiAgICAgICAgICAgICAgICBpZiAoaUF0dHIud2lkdGgpIHtcbiAgICAgICAgICAgICAgICAgICAgc2NvcGUuYmFyV2lkdGggPSBpQXR0ci53aWR0aDtcbiAgICAgICAgICAgICAgICAgICAgc2NvcGUuYmFyUGllY2UgPSAoc2NvcGUuYmFyV2lkdGggLyAoc2NvcGUubWF4IC0gc2NvcGUubWluKSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBzY29wZS5iYXJQaWVjZSA9IChzY29wZS5iYXJXaWR0aCAvIChzY29wZS5tYXggLSBzY29wZS5taW4pKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgLy9jaGVja3MgdG8gc2VlIGlmIHRoZXJlIGlzIGEgb3JpZW50YXRpb24gYXR0cmlidXRlIGlmIHRoZXJlIGlzIHNldCBvdXIgdGVtcGxhdGUgdG8gdGhlIHZlcnRpY2FsIHRlbXBsYXRlXG4gICAgICAgICAgICAgICAgaWYgKGlBdHRyLm9yaWVudGF0aW9uKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICgndmVydGljYWwnID09PSBpQXR0ci5vcmllbnRhdGlvbikge1xuICAgICAgICAgICAgICAgICAgICAgICAgc2NvcGUub3JpZW50YXRpb24gPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgbXlUZW1wbGF0ZSA9ICc8ZGl2IG9uc2VsZWN0c3RhcnQ9XCJyZXR1cm4gZmFsc2U7XCIgb25kcmFnc3RhcnQ9XCJyZXR1cm4gZmFsc2U7XCJuZy1tb3VzZWxlYXZlPVwidXAoKVwiIG5nLW1vdXNlbW92ZT1cImRyYWcoJGV2ZW50KVwiPicgK1xuICAgICAgICAgICAgICAgICAgICAgICAgJzxkaXYgbmctbW91c2Vtb3ZlPVwiZHJhZygkZXZlbnQpXCIgbmctbW91c2V1cD1cInVwKClcIiBuZy1jbGljaz1cImdyZXlDbGljaygpXCJzdHlsZT1cImN1cnNvcjpwb2ludGVyO21hcmdpbi1sZWZ0OjlweDt3aWR0aDo1cHg7aGVpZ2h0Ont7YmFyUGllY2UgKiBlbXB0V2lkdGh9fXB4O2JhY2tncm91bmQtY29sb3I6JyArIHNjb3BlLmJhcmVtcHR5Y29sb3IgKyAnO21hcmdpbi1ib3R0b206NHB4XCI+PC9kaXY+JyArXG4gICAgICAgICAgICAgICAgICAgICAgICAnPGRpdiBuZy1tb3VzZW1vdmU9XCJkcmFnKCRldmVudClcIiBuZy1tb3VzZWRvd249XCJkb3duKClcIiBuZy1tb3VzZXVwPVwidXAoKVwiIG9yaWVudGF0aW9uPVwidmVydGljYWxcIiBzdHlsZT1cImN1cnNvcjpucy1yZXNpemU7bWFyZ2luLXRvcDotNHB4O21hcmdpbi1sZWZ0OjVweDt3aWR0aDoxNXB4O2hlaWdodDoxNXB4O2JhY2tncm91bmQtY29sb3I6JyArIHNjb3BlLmJ1dHRvbmNvbG9yICsgJztib3JkZXItcmFkaXVzOjUwJTtcIj48L2Rpdj4nICtcbiAgICAgICAgICAgICAgICAgICAgICAgICc8ZGl2IG5nLW1vdXNlbW92ZT1cImRyYWcoJGV2ZW50KVwiIG5nLW1vdXNldXA9XCJ1cCgpXCIgbmctY2xpY2s9XCJiYXJDbGljaygpXCJzdHlsZT1cImN1cnNvcjpwb2ludGVyO21hcmdpbi1sZWZ0OjlweDt3aWR0aDo1cHg7aGVpZ2h0Ont7YmFyUGllY2UgKiBmaWxsV2lkdGh9fXB4O2JhY2tncm91bmQtY29sb3I6JyArIHNjb3BlLmJhcmZpbGxjb2xvciArICc7bWFyZ2luLWJvdHRvbTo0cHhcIj48L2Rpdj4nICtcbiAgICAgICAgICAgICAgICAgICAgICAgICc8L2Rpdj4nO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgbXlUZW1wbGF0ZSA9ICc8ZGl2IG9uc2VsZWN0c3RhcnQ9XCJyZXR1cm4gZmFsc2U7XCIgb25kcmFnc3RhcnQ9XCJyZXR1cm4gZmFsc2U7XCIgbmctbW91c2VsZWF2ZT1cInVwKClcIm5nLW1vdXNlbW92ZT1cImRyYWcoJGV2ZW50KVwiPicgK1xuICAgICAgICAgICAgICAgICAgICAgICAgJzxkaXYgbmctbW91c2Vtb3ZlPVwiZHJhZygkZXZlbnQpXCIgbmctbW91c2V1cD1cInVwKClcIiBuZy1jbGljaz1cImJhckNsaWNrKClcInN0eWxlPVwiY3Vyc29yOnBvaW50ZXI7ZGlzcGxheTppbmxpbmUtYmxvY2s7d2lkdGg6e3tiYXJQaWVjZSAqIGZpbGxXaWR0aH19cHg7aGVpZ2h0OjVweDtiYWNrZ3JvdW5kLWNvbG9yOicgKyBzY29wZS5iYXJmaWxsY29sb3IgKyAnO21hcmdpbi1ib3R0b206NHB4XCI+PC9kaXY+JyArXG4gICAgICAgICAgICAgICAgICAgICAgICAnPGRpdiBuZy1tb3VzZW1vdmU9XCJkcmFnKCRldmVudClcIiBuZy1tb3VzZWRvd249XCJkb3duKClcIiBuZy1tb3VzZXVwPVwidXAoKVwiIG9yaWVudGF0aW9uPVwiaG9yaXpvbnRhbFwiIHN0eWxlPVwiY3Vyc29yOmV3LXJlc2l6ZTtkaXNwbGF5OmlubGluZS1ibG9jazt3aWR0aDp7e2J1dFNpemV9fXB4O2hlaWdodDp7e2J1dFNpemV9fXB4O2JhY2tncm91bmQtY29sb3I6JyArIHNjb3BlLmJ1dHRvbmNvbG9yICsgJztib3JkZXItcmFkaXVzOjUwJTtcIj48L2Rpdj4nICtcbiAgICAgICAgICAgICAgICAgICAgICAgICc8ZGl2IG5nLW1vdXNlbW92ZT1cImRyYWcoJGV2ZW50KVwiIG5nLW1vdXNldXA9XCJ1cCgpXCIgbmctY2xpY2s9XCJncmV5Q2xpY2soKVwic3R5bGU9XCJjdXJzb3I6cG9pbnRlcjtkaXNwbGF5OmlubGluZS1ibG9jazt3aWR0aDp7e2JhclBpZWNlICogZW1wdFdpZHRofX1weDtoZWlnaHQ6NXB4O2JhY2tncm91bmQtY29sb3I6JyArIHNjb3BlLmJhcmVtcHR5Y29sb3IgKyAnO21hcmdpbi1ib3R0b206NHB4XCI+PC9kaXY+JyArXG4gICAgICAgICAgICAgICAgICAgICAgICAnPC9kaXY+JztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgLy90aGlzIGJ1aWxkcyBvdXIgaG9yaXpvbnRhbCB0ZW1wbGF0ZVxuICAgICAgICAgICAgICAgICAgICBteVRlbXBsYXRlID0gJzxkaXYgb25zZWxlY3RzdGFydD1cInJldHVybiBmYWxzZTtcIiBvbmRyYWdzdGFydD1cInJldHVybiBmYWxzZTtcIiBuZy1tb3VzZWxlYXZlPVwidXAoKVwibmctbW91c2Vtb3ZlPVwiZHJhZygkZXZlbnQpXCI+JyArXG4gICAgICAgICAgICAgICAgICAgICc8ZGl2IG5nLW1vdXNlbW92ZT1cImRyYWcoJGV2ZW50KVwiIG5nLW1vdXNldXA9XCJ1cCgpXCIgbmctY2xpY2s9XCJiYXJDbGljaygpXCJzdHlsZT1cImN1cnNvcjpwb2ludGVyO2Rpc3BsYXk6aW5saW5lLWJsb2NrO3dpZHRoOnt7YmFyUGllY2UgKiBmaWxsV2lkdGh9fXB4O2hlaWdodDo1cHg7YmFja2dyb3VuZC1jb2xvcjonICsgc2NvcGUuYmFyZmlsbGNvbG9yICsgJzttYXJnaW4tYm90dG9tOjRweFwiPjwvZGl2PicgK1xuICAgICAgICAgICAgICAgICAgICAnPGRpdiBuZy1tb3VzZW1vdmU9XCJkcmFnKCRldmVudClcIiBuZy1tb3VzZWRvd249XCJkb3duKClcIiBuZy1tb3VzZXVwPVwidXAoKVwiIG9yaWVudGF0aW9uPVwiaG9yaXpvbnRhbFwiIHN0eWxlPVwiY3Vyc29yOmV3LXJlc2l6ZTtkaXNwbGF5OmlubGluZS1ibG9jazt3aWR0aDp7e2J1dFNpemV9fXB4O2hlaWdodDp7e2J1dFNpemV9fXB4O2JhY2tncm91bmQtY29sb3I6JyArIHNjb3BlLmJ1dHRvbmNvbG9yICsgJztib3JkZXItcmFkaXVzOjUwJTtcIj48L2Rpdj4nICtcbiAgICAgICAgICAgICAgICAgICAgJzxkaXYgbmctbW91c2Vtb3ZlPVwiZHJhZygkZXZlbnQpXCIgbmctbW91c2V1cD1cInVwKClcIiBuZy1jbGljaz1cImdyZXlDbGljaygpXCJzdHlsZT1cImN1cnNvcjpwb2ludGVyO2Rpc3BsYXk6aW5saW5lLWJsb2NrO3dpZHRoOnt7YmFyUGllY2UgKiBlbXB0V2lkdGh9fXB4O2hlaWdodDo1cHg7YmFja2dyb3VuZC1jb2xvcjonICsgc2NvcGUuYmFyZW1wdHljb2xvciArICc7bWFyZ2luLWJvdHRvbTo0cHhcIj48L2Rpdj4nICtcbiAgICAgICAgICAgICAgICAgICAgJzwvZGl2Pic7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIC8vV2Ugc2hvdyBvdXIgdGVtcGxhdGUgYW5kIHRoZW4gY29tcGlsZSBpdCBzbyB0aGUgRE9NIGtub3dzIGFib3V0IG91ciBuZyBmdW5jdGlvbnNcbiAgICAgICAgICAgICAgICBpRWxlbS5odG1sKG15VGVtcGxhdGUpO1xuICAgICAgICAgICAgICAgICRjb21waWxlKGlFbGVtLmNvbnRlbnRzKCkpKHNjb3BlKTtcbiAgICAgICAgICAgICAgICAvL2NyZWF0ZSB0aGUgaW5pdGlhbCBiYXJcbiAgICAgICAgICAgICAgICBzY29wZS5tYWtlQmFyKCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxufSk7XG5cbiIsImFuZ3VsYXIubW9kdWxlKCdib3NzeS50b29sdGlwJywgW10pXG4gICAgLmRpcmVjdGl2ZSgnYm9zc3lUb29sdGlwJywgZnVuY3Rpb24oKSB7XG4gICAgXG4gICAgICAgIC8vIFByaXZhdGUgbWVtYmVyIGFycmF5IGNvbnRhaW5pbmcgYWxsIGtub3duIHBvc2l0aW9uc1xuICAgICAgICBfcG9zID0gWyduJywnbmUnLCdlJywnc2UnLCdzJywnc3cnLCd3JywnbncnXTtcbiAgICAgICAgXG4gICAgICAgIC8vIE1vdmUgdGhlIHRpcCB0byBhIGNlcnRhaW4gcG9zaXRpb25cbiAgICAgICAgZnVuY3Rpb24gX21vdmVUaXAoJHBhcmVudCwgJHRpcCwgY3VyUG9zKVxuICAgICAgICB7XG4gICAgICAgICAgICBpZihjdXJQb3MgPT0gJ24nKVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICR0aXAuc3R5bGUubGVmdCA9ICRwYXJlbnQub2Zmc2V0TGVmdCArICgkcGFyZW50Lm9mZnNldFdpZHRoIC8gMikgLSAoJHRpcC5vZmZzZXRXaWR0aCAvIDIpICsgJ3B4JztcbiAgICAgICAgICAgICAgICAkdGlwLnN0eWxlLnRvcCA9ICRwYXJlbnQub2Zmc2V0VG9wIC0gJHRpcC5vZmZzZXRIZWlnaHQgKyAncHgnO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZihjdXJQb3MgPT0gJ25lJylcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAkdGlwLnN0eWxlLmxlZnQgPSAkcGFyZW50Lm9mZnNldExlZnQgKyAkcGFyZW50Lm9mZnNldFdpZHRoICsgJ3B4JztcbiAgICAgICAgICAgICAgICAkdGlwLnN0eWxlLnRvcCA9ICRwYXJlbnQub2Zmc2V0VG9wIC0gJHRpcC5vZmZzZXRIZWlnaHQgKyAncHgnO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZihjdXJQb3MgPT0gJ2UnKVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICR0aXAuc3R5bGUubGVmdCA9ICRwYXJlbnQub2Zmc2V0TGVmdCArICRwYXJlbnQub2Zmc2V0V2lkdGggKyAncHgnO1xuICAgICAgICAgICAgICAgICR0aXAuc3R5bGUudG9wID0gJHBhcmVudC5vZmZzZXRUb3AgKyAoJHBhcmVudC5vZmZzZXRIZWlnaHQgLyAyKSAtICgkdGlwLm9mZnNldEhlaWdodCAvIDIpICsgJ3B4JztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYoY3VyUG9zID09ICdzZScpXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgJHRpcC5zdHlsZS5sZWZ0ID0gJHBhcmVudC5vZmZzZXRMZWZ0ICsgJHBhcmVudC5vZmZzZXRXaWR0aCArICdweCc7XG4gICAgICAgICAgICAgICAgJHRpcC5zdHlsZS50b3AgPSAkcGFyZW50Lm9mZnNldFRvcCArICRwYXJlbnQub2Zmc2V0SGVpZ2h0ICsgJ3B4JztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYoY3VyUG9zID09ICdzJylcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAkdGlwLnN0eWxlLmxlZnQgPSAkcGFyZW50Lm9mZnNldExlZnQgKyAoJHBhcmVudC5vZmZzZXRXaWR0aCAvIDIpIC0gKCR0aXAub2Zmc2V0V2lkdGggLyAyKSArICdweCc7XG4gICAgICAgICAgICAgICAgJHRpcC5zdHlsZS50b3AgPSAkcGFyZW50Lm9mZnNldFRvcCArICRwYXJlbnQub2Zmc2V0SGVpZ2h0ICsgJ3B4JztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYoY3VyUG9zID09ICdzdycpXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgJHRpcC5zdHlsZS5sZWZ0ID0gJHBhcmVudC5vZmZzZXRMZWZ0IC0gJHRpcC5vZmZzZXRXaWR0aCArICdweCc7XG4gICAgICAgICAgICAgICAgJHRpcC5zdHlsZS50b3AgPSAkcGFyZW50Lm9mZnNldFRvcCArICRwYXJlbnQub2Zmc2V0SGVpZ2h0ICsgJ3B4JztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYoY3VyUG9zID09ICd3JylcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAkdGlwLnN0eWxlLmxlZnQgPSAkcGFyZW50Lm9mZnNldExlZnQgLSAkdGlwLm9mZnNldFdpZHRoICsgJ3B4JztcbiAgICAgICAgICAgICAgICAkdGlwLnN0eWxlLnRvcCA9ICRwYXJlbnQub2Zmc2V0VG9wICsgKCRwYXJlbnQub2Zmc2V0SGVpZ2h0IC8gMikgLSAoJHRpcC5vZmZzZXRIZWlnaHQgLyAyKSArICdweCc7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgJHRpcC5zdHlsZS5sZWZ0ID0gJHBhcmVudC5vZmZzZXRMZWZ0IC0gJHRpcC5vZmZzZXRXaWR0aCArICdweCc7XG4gICAgICAgICAgICAgICAgJHRpcC5zdHlsZS50b3AgPSAkcGFyZW50Lm9mZnNldFRvcCAtICR0aXAub2Zmc2V0SGVpZ2h0ICsgJ3B4JztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgLy8gQ2hlY2sgdG8gc2VlIGlmIHRoZSB0aXAgaXMgd2l0aGluIHRoZSB3aW5kb3dcbiAgICAgICAgZnVuY3Rpb24gX2NoZWNrUG9zKCR0aXApXG4gICAgICAgIHtcbiAgICAgICAgICAgIHZhciByZWN0ID0gJHRpcC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICByZWN0LnRvcCA+PSAwICYmXG4gICAgICAgICAgICAgICAgcmVjdC5sZWZ0ID49IDAgJiZcbiAgICAgICAgICAgICAgICByZWN0LmJvdHRvbSA8PSAod2luZG93LmlubmVySGVpZ2h0IHx8IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGllbnRIZWlnaHQpICYmXG4gICAgICAgICAgICAgICAgcmVjdC5yaWdodCA8PSAod2luZG93LmlubmVyV2lkdGggfHwgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsaWVudFdpZHRoKVxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICByZXN0cmljdDogJ0UnLFxuICAgICAgICAgICAgc2NvcGU6IHtcbiAgICAgICAgICAgICAgICBjb25maWc6IFwiPVwiXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgcmVwbGFjZTogdHJ1ZSxcbiAgICAgICAgICAgIGxpbms6IGZ1bmN0aW9uKHNjb3BlLCBlbGVtZW50LCBhdHRycykge1xuICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgLy8gSWYgdGhlIHVzZXIgZG9lc24ndCBwcm92aWRlIGVzc2VudGlhbCBpbmZvcm1hdGlvbiwgZXJyb3Igb3V0XG4gICAgICAgICAgICAgICAgaWYoIXNjb3BlLmNvbmZpZy50aXRsZSB8fCAhc2NvcGUuY29uZmlnLmJvZHkpXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKFwiRXJyb3I6IE5vIHRpdGxlIG9yIGJvZHkgaW5mb3JtYXRpb24gcHJvdmlkZWQuXCIpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gMTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgLy8gSWYgdGhlIHVzZXIgZG9lc24ndCBwcm92aWRlIGEgcG9zaXRpb24sIGRlZmF1bHQgJ25vcnRoJ1xuICAgICAgICAgICAgICAgIGlmKCFzY29wZS5jb25maWcucG9zaXRpb24gfHwgdHlwZW9mIHNjb3BlLmNvbmZpZy5wb3NpdGlvbiAhPT0gJ3N0cmluZycgfHwgX3Bvcy5pbmRleE9mKHNjb3BlLmNvbmZpZy5wb3NpdGlvbikgPCAwKVxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgc2NvcGUuY29uZmlnLnBvc2l0aW9uID0gJ24nO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAvLyBDcmVhdGUgdGlwIGVsZW1lbnRcbiAgICAgICAgICAgICAgICB2YXIgJHRpcCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIC8vIEFwcGVuZCB0byBET01cbiAgICAgICAgICAgICAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKCR0aXApO1xuICAgICAgICAgICAgICAgICR0aXAuc3R5bGUucG9zaXRpb24gPSAnYWJzb2x1dGUnO1xuICAgICAgICAgICAgICAgICR0aXAuaW5uZXJIVE1MID0gJzxzcGFuPicrIHNjb3BlLmNvbmZpZy50aXRsZSArJzwvc3Bhbj48ZGl2PicrIHNjb3BlLmNvbmZpZy5ib2R5ICsnPC9kaXY+JztcbiAgICAgICAgICAgICAgICAkdGlwLmNsYXNzTmFtZSA9ICdib3NzeVRvb2x0aXAnO1xuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIC8vIERpc2FibGUgYnJvd3NlcidzIHRvb2x0aXBcbiAgICAgICAgICAgICAgICBlbGVtZW50WzBdLnRpdGxlID0gJyc7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coZWxlbWVudCk7XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgdmFyIGkgPSAwO1xuICAgICAgICAgICAgICAgIGRvXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBsb2NrZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICBfbW92ZVRpcChlbGVtZW50WzBdLCAkdGlwLCBzY29wZS5jb25maWcucG9zaXRpb24pO1xuICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgLy8gQ29udGludWUgdG8gbG9vcCBpZiAkdGlwIGlzIGNsaXBwZWRcbiAgICAgICAgICAgICAgICAgICAgaWYoIV9jaGVja1BvcygkdGlwKSlcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgbG9ja2VkID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIFdyYXAgYXJvdW5kIGFycmF5IGlmIHRoZSBlbmQgaXMgaGl0XG4gICAgICAgICAgICAgICAgICAgICAgICBpZihzY29wZS5jb25maWcucG9zaXRpb24gPT0gJ253JylcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzY29wZS5jb25maWcucG9zaXRpb24gPSAnbic7XG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2NvcGUuY29uZmlnLnBvc2l0aW9uID0gX3Bvc1tfcG9zLmluZGV4T2Yoc2NvcGUuY29uZmlnLnBvc2l0aW9uKSArIDFdO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICBpZihpID09IDgpXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICsraTtcbiAgICAgICAgICAgICAgICB9IHdoaWxlKGxvY2tlZCA9PSBmYWxzZSk7XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgLy8gSGlkZSBpdCB1bnRpbCBtb3VzZSBldmVudFxuICAgICAgICAgICAgICAgICR0aXAuc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAvLyBNb3VzZSBldmVudHNcbiAgICAgICAgICAgICAgICBlbGVtZW50Lm9uKCdtb3VzZWVudGVyJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgICR0aXAuc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAub24oJ21vdXNlbGVhdmUnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgJHRpcC5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgfSk7Il0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9