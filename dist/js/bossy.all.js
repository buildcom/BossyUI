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
		'bossy.numerictextbox',
		'bossy.schema',
		'bossy.tooltip',
		'bossy.datagrid'
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
					_date.disabledDay = dayIsOutOfRange(_date) ? 'disabled-day' : '';
					week.push(_date);
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
			if (options.start && options.end && (_date.time < options.start.time || _date.time > options.end.time)) {
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

	}]).directive('bossyCalendar', [function () {
		return {
			restrict: 'AE',
			scope: {
				ngModel: '=',
				config: '='
			},
			templateUrl: 'templates/bossy.calendar.html',//$templateCache.get('templates/bossy.calendar.html'),
			controller: 'CalendarController'
		};
	}]);
var app = angular.module('bossy.combobox.cascadingDropdown', []);

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

});
var app = angular.module('bossy.combobox.checkboxMultiselect', []);

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

});

// inject functions
app.factory('optionParser', ['$parse', function ($parse) {

    var TYPEAHEAD_REGEXP = /^\s*(.*?)(?:\s+as\s+(.*?))?\s+for\s+(?:([\$\w][\$\w\d]*))\s+in\s+(.*)$/;

    return {
        parse: function (input) {

            // check inputs
            var match = input.match(TYPEAHEAD_REGEXP), modelMapper, viewMapper, source;
            if (!match) {
                throw new Error(
                        'Expected typeahead specification in form of "_modelValue_ (as _label_)? for _item_ in _collection_"' +
                        ' but got "' + input + '".');
            }

            return {
                itemName: match[3],
                source: $parse(match[4]),
                viewMapper: $parse(match[2] || match[1]),
                modelMapper: $parse(match[1])
            };
        }
    };
}]);

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
                        changeHandler = attrs.change || angular.noop;

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
                        var value;
                        if (isMultiple) {
                            value = [];
                            angular.forEach(scope.items, function (item) {
                                if (item.checked) {
                                    value.push(item.model);
                                }
                            });
                        } else {
                            angular.forEach(scope.items, function (item) {
                                if (item.checked) {
                                    value = item.model;
                                    return false;
                                }
                            });
                        }
                        modelCtrl.$setViewValue(value);
                    }

                    // function for selection of all
                    scope.checkAll = function () {
                        if (!isMultiple) {
                            return;
                        }
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
                        // TODO: add selectSingle function ???
                        if (isMultiple !== false) {
                            selectMultiple(item);
                        }
                    };
                }
            };
        });

// directive storing template
app.directive('bossyMultiselectPopup', ['$document', function ($document) {
        return {
            restrict: 'E',
            scope: false,
            replace: true,
            templateUrl: '../templates/bossy.combobox.multiselect.html',
            link: function (scope, element, attr) {

            }
        };
    }]);

angular.module('bossy.data', [])
/**
@ngdoc service
@name $data
@requires $q
@requires $http

*/
    .factory('$data', ['$q','$http', '$scope', function ($q, $http, $scope) {

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

angular.module('bossy.datagrid', [])
	.controller('DataGridController', ['$scope', function($scope){

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
			var columnType = $scope.config.data.columns[columnIndex].type,
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
			if ($scope.config.data.columns[columnIndex].sortDirection) {
				$scope.config.data.columns[columnIndex].sortDirection = -$scope.config.data.columns[columnIndex].sortDirection;
			} else {
				$scope.config.data.columns[columnIndex].sortDirection = 1;
			}

			return $scope.config.data.columns[columnIndex].sortDirection;
		};

		$scope.sortColumn = function(columnIndex) {
			var sortDirection = calculateSortdirection(columnIndex);

			$scope.config.data.rows = $scope.config.data.rows.sort(function(a, b){
				return sortDirection * columnCompare(a, b, columnIndex);
			});
		};
	}])
	.directive('bossyDatagrid', [function()
	{
		return {
			restrict: 'EA',
			scope: {
				config: '='
			},
			templateUrl: 'bossy.datagrid.html',
			controller: 'DataGridController'
		};
	}]);

angular.module('bossy.dropdown', [])
	.run(function($templateCache){
        $templateCache.put('bossy-dropdown.html', '<div><select ng-options="item[dropdown.title] for item in dropdown.items | orderBy: dropdown.title" ng-model="selectedItem" ng-change="dropdown.updateSelectedItem(selectedItem)"><option value="" ng-hide="selectedItem">Please select one...</option></select></div>');
    })
	.directive('bossyDropdown', function($http, $compile) {
		return {
			restrict: 'EA',
			scope: {
				config: '=',
				select: '=',
				items: '='
			},
			templateUrl: '',
			link: function(scope, element, attrs) {
				var customTemplate;

				//Checks if user is defining a url or inner html
				//If it is a url, the template must be located in a local directory or added to the DOM via ng-include
				if(scope.dropdown.template[0] !== '<') {
					customTemplate = $compile('<ng-include src="dropdown.template"></ng-include>')(scope);
				} else {
					customTemplate = $compile(scope.dropdown.template)(scope);
				}

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
					if($scope.config.src.substr($scope.config.src.length-5, $scope.config.src.length) === '.json') {
						$http.get($scope.config.src)
							.success(function(data) {
								thisDropdown.items = data;
								//Checks validity of the title field as it applies to the JSON.
								if(!thisDropdown.items[0].hasOwnProperty(thisDropdown.title)) {
									console.error('ERROR: $scope.config.title: "' + $scope.config.title + '" is not a member of the loaded JSON data. Please specify a valid "title" to list.');
								}
								//Attaches retrieved items to $scope.items for additional functionality.
								if($scope.items) {
									$scope.items = thisDropdown.items;
								}
							})
							.error(function(data) {
								console.error('ERROR: Fail to load JSON data from the path: "' + $scope.config.src + '"');
							});
					}
					//Logs an error to identify that a json file was not loaded.
					else {
						console.error('ERROR: "$scope.config.src": "' + $scope.config.src + '" is not a valid JSON file.');
					}
					//Function called to update select in the template.
					thisDropdown.updateSelectedItem = function(selectedItem) {
						//Single select object tied to the config object.
						if ($scope.config.select) {
							$scope.config.select = selectedItem;
						}
						//User can collect and utilize multiple select objects with the same config object if passing in a distinct select param.
						if ($scope.select) {
							$scope.select = selectedItem;
						}
					};
					//Determine if custom template Url has been defined.
					if ($scope.config.template) {
						thisDropdown.template = $scope.config.template;
					} else {
						thisDropdown.template = 'bossy-dropdown.html';
					}
				}
				//Logs an error if 'src' has not been defined.
				else {
					console.error('ERROR: "$scope.config.src" has not been specified within the "config" object. Please pass in a valid path to a JSON file.');
				}
			},
			controllerAs: 'dropdown'
		};
	});

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
                break;
            default:
                break;
        }
    };
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

    };

});


app.directive('bossynumerictextbox',function(){
    return{
        controller:'bossynumericCtrl',
        restrict:'E',
        transclude:true,
        templateUrl:'bossy.numerictextbox.html'

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
    $scope.max = 100;
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
    $scope.barfillcolor = '#0000FF';
    $scope.baremptycolor = '#D3D3D3';
    $scope.buttoncolor = '#FF0000';


    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////

    /*makeBar()
     * This creates the initial graphic of the slider and ensures it is in the correct order
     * CC = 4 */
    $scope.makeBar = function () {
        //button should show up in the middle now or close to if uneven
        $scope.value = parseInt(($scope.max + $scope.min) / 2);
        for (var current = $scope.min; current <= $scope.max; current++) {
            if (current < $scope.value) {
                $scope.fillWidth++;
            }
            if (current > $scope.value) {
                $scope.emptWidth++;
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
    };
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
    };
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
}]);
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
                var pattern = /^#[0-9a-fA-F]{6}$/; //currently accepts lower case a-f

                //checks to see if there is a max attribute
                if (iAttr.max) {
                    scope.max = parseInt(iAttr.max);
                    if (isNaN(scope.max)) {
                        scope.max = 10;
                    }
                }
                //checks to see if there is a min attribute
                if (iAttr.min) {
                    scope.min = parseInt(iAttr.min);
                    if (isNaN(scope.min)) {
                        scope.min = 1;
                    }
                }
                //checks for bar color customization
                if (iAttr.barfillcolor) {
                    if (pattern.test(iAttr.barfillcolor)) {
                        scope.barfillcolor = iAttr.barfillcolor;
                    }
                }
                //checks for empty bar color customization

                if (iAttr.baremptycolor) {
                    if (pattern.test(iAttr.baremptycolor)) {
                        scope.baremptycolor = iAttr.baremptycolor;
                    }
                }


                if (iAttr.buttoncolor) {
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
    };
});


angular.module('bossy.tooltip', [])
    .directive('bossyTooltip', function() {

        // Private member array containing all known positions
        var _pos = ['n','ne','e','se','s','sw','w','nw'];

        // Move the tip to a certain position
        function _moveTip($parent, $tip, curPos)
        {
            if(curPos === 'n')
            {
                $tip.style.left = $parent.offsetLeft + ($parent.offsetWidth / 2) - ($tip.offsetWidth / 2) + 'px';
                $tip.style.top = $parent.offsetTop - $tip.offsetHeight + 'px';
            }
            else if(curPos === 'ne')
            {
                $tip.style.left = $parent.offsetLeft + $parent.offsetWidth + 'px';
                $tip.style.top = $parent.offsetTop - $tip.offsetHeight + 'px';
            }
            else if(curPos === 'e')
            {
                $tip.style.left = $parent.offsetLeft + $parent.offsetWidth + 'px';
                $tip.style.top = $parent.offsetTop + ($parent.offsetHeight / 2) - ($tip.offsetHeight / 2) + 'px';
            }
            else if(curPos === 'se')
            {
                $tip.style.left = $parent.offsetLeft + $parent.offsetWidth + 'px';
                $tip.style.top = $parent.offsetTop + $parent.offsetHeight + 'px';
            }
            else if(curPos === 's')
            {
                $tip.style.left = $parent.offsetLeft + ($parent.offsetWidth / 2) - ($tip.offsetWidth / 2) + 'px';
                $tip.style.top = $parent.offsetTop + $parent.offsetHeight + 'px';
            }
            else if(curPos === 'sw')
            {
                $tip.style.left = $parent.offsetLeft - $tip.offsetWidth + 'px';
                $tip.style.top = $parent.offsetTop + $parent.offsetHeight + 'px';
            }
            else if(curPos === 'w')
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
                config: '='
            },
            replace: true,
            link: function(scope, element, attrs) {

                // If the user doesn't provide essential information, error out
                if(!scope.config.title || !scope.config.body) {
                    console.error('Error: No title or body information provided.');
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

                var i = 0,
                    locked;

                do {
                    locked = true;
                    _moveTip(element[0], $tip, scope.config.position);

                    // Continue to loop if $tip is clipped
                    if(!_checkPos($tip))
                    {
                        locked = false;

                        // Wrap around array if the end is hit
                        if (scope.config.position === 'nw') {
                            scope.config.position = 'n';
                        } else {
                            scope.config.position = _pos[_pos.indexOf(scope.config.position) + 1];
                        }
                    }

                    if (i === 8) {
                        break;
                    }
                    ++i;
                } while (locked === false);

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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImJvc3N5LmpzIiwiYm9zc3kuY2FsZW5kYXIuanMiLCJib3NzeS5jb21ib2JveC5jYXNjYWRpbmdEcm9wZG93bi5qcyIsImJvc3N5LmNvbWJvYm94LmNoZWNrYm94TXVsdGlzZWxlY3QuanMiLCJib3NzeS5jb21ib2JveC5tdWx0aXNlbGVjdC5qcyIsImJvc3N5LmRhdGEuanMiLCJib3NzeS5kYXRhX2dyaWQuanMiLCJib3NzeS5kcm9wZG93bi5qcyIsImJvc3N5LmZvcm0uanMiLCJib3NzeS5pbnB1dC5qcyIsImJvc3N5Lm51bWVyaWN0ZXh0Ym94LmpzIiwiYm9zc3kuc2NoZW1hLmpzIiwiYm9zc3kuc2xpZGVyLmpzIiwiYm9zc3kudG9vbHRpcC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUMxQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNsS0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUN4QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQzdHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNySkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDM0RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3BFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDbEZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNsSUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ2hCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUN6RkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUMxQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUM3VUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJib3NzeS5hbGwuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiFcclxuICogYm9zc3kuanNcclxuICovXHJcblxyXG4vKiFcclxuICogaHR0cDovL0Jvc3N5VUkuY29tL1xyXG4gKlxyXG4gKiBCb3NzeVVJIC0gQ3JlYXRlZCB3aXRoIExPVkUgYnkgQnVpbGQuY29tIE9wZW4gU291cmNlIENvbnNvcnRpdW1cclxuICpcclxuICogTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlLiBQbGVhc2Ugc2VlIExJQ0VOU0UgZm9yIG1vcmUgaW5mb3JtYXRpb24uXHJcbiAqXHJcbiovXHJcblxyXG4vL1RPRE86IG5lZWQgbGF5b3V0LCBsYWJlbHNcclxudmFyIGJvc3N5ID0gYW5ndWxhci5tb2R1bGUoJ2Jvc3N5JywgW1xyXG5cdFx0J2Jvc3N5LmNhbGVuZGFyJyxcclxuXHRcdCdib3NzeS5kYXRhJyxcclxuXHRcdCdib3NzeS5kcm9wZG93bicsXHJcblx0XHQnYm9zc3kuZm9ybScsXHJcblx0XHQnYm9zc3kuaW5wdXQnLFxyXG5cdFx0J2Jvc3N5Lm51bWVyaWN0ZXh0Ym94JyxcclxuXHRcdCdib3NzeS5zY2hlbWEnLFxyXG5cdFx0J2Jvc3N5LnRvb2x0aXAnLFxyXG5cdFx0J2Jvc3N5LmRhdGFncmlkJ1xyXG5cdF1cclxuKTtcclxuIiwiYW5ndWxhci5tb2R1bGUoJ2Jvc3N5LmNhbGVuZGFyJywgW10pXHJcblx0LmNvbnRyb2xsZXIoJ0NhbGVuZGFyQ29udHJvbGxlcicsIFsnJHNjb3BlJywgZnVuY3Rpb24gKCRzY29wZSkge1xyXG5cclxuXHRcdHZhciBfbW9udGhNYXBzID0ge30sXHJcblx0XHRcdG9wdGlvbnMgPSB7fSxcclxuXHRcdFx0ZGVmYXVsdHMgPSB7XHJcblx0XHRcdH0sXHJcblx0XHRcdHVuaXZlcnNhbCA9IHtcclxuXHRcdFx0XHREQVk6IDI0ICogNjAgKiA2MCAqIDEwMDAsXHJcblx0XHRcdFx0SE9VUjogNjAgKiA2MCAqIDEwMDBcclxuXHRcdFx0fTtcclxuXHJcblx0XHQkc2NvcGUuZGF5cyA9IFtcclxuXHRcdFx0J1N1bmRheScsXHJcblx0XHRcdCdNb25kYXknLFxyXG5cdFx0XHQnVHVlc2RheScsXHJcblx0XHRcdCdXZWRuZXNkYXknLFxyXG5cdFx0XHQnVGh1cnNkYXknLFxyXG5cdFx0XHQnRnJpZGF5JyxcclxuXHRcdFx0J1NhdHVyZGF5J1xyXG5cdFx0XTtcclxuXHJcblx0XHQkc2NvcGUubW9udGhzID0gW1xyXG5cdFx0XHQnSmFudWFyeScsXHJcblx0XHRcdCdGZWJydWFyeScsXHJcblx0XHRcdCdNYXJjaCcsXHJcblx0XHRcdCdBcHJpbCcsXHJcblx0XHRcdCdNYXknLFxyXG5cdFx0XHQnSnVuZScsXHJcblx0XHRcdCdKdWx5JyxcclxuXHRcdFx0J0F1Z3VzdCcsXHJcblx0XHRcdCdTZXB0ZW1iZXInLFxyXG5cdFx0XHQnT2N0b2JlcicsXHJcblx0XHRcdCdOb3ZlbWJlcicsXHJcblx0XHRcdCdEZWNlbWJlcidcclxuXHRcdF07XHJcblxyXG5cdFx0JHNjb3BlLnByZXZpb3VzTW9udGggPSBmdW5jdGlvbigpIHtcclxuXHRcdFx0dmFyIGRhdGUgPSBuZXcgRGF0ZSgkc2NvcGUuY3VycmVudC55ZWFyLCAoJHNjb3BlLmN1cnJlbnQubW9udGggLSAxKSwgMSk7XHJcblx0XHRcdHNldEN1cnJlbnRNb250aEFuZFllYXIoZGF0ZS5nZXRNb250aCgpLCBkYXRlLmdldEZ1bGxZZWFyKCkpO1xyXG5cdFx0XHQkc2NvcGUudXBkYXRlRGF0ZU1hcCgpO1xyXG5cdFx0fTtcclxuXHJcblx0XHQkc2NvcGUubmV4dE1vbnRoID0gZnVuY3Rpb24oKSB7XHJcblx0XHRcdHZhciBkYXRlID0gbmV3IERhdGUoJHNjb3BlLmN1cnJlbnQueWVhciwgKCRzY29wZS5jdXJyZW50Lm1vbnRoICsgMSksIDEpO1xyXG5cdFx0XHRzZXRDdXJyZW50TW9udGhBbmRZZWFyKGRhdGUuZ2V0TW9udGgoKSwgZGF0ZS5nZXRGdWxsWWVhcigpKTtcclxuXHRcdFx0JHNjb3BlLnVwZGF0ZURhdGVNYXAoKTtcclxuXHRcdH07XHJcblxyXG5cdFx0JHNjb3BlLnNlbGVjdERhdGUgPSBmdW5jdGlvbih0aW1lKSB7XHJcblx0XHRcdHZhciBkYXRlID0gZ2V0U3RhbmRhcmRUaW1lKG5ldyBEYXRlKHRpbWUpKTtcclxuXHRcdFx0aWYgKGRheUlzT3V0T2ZSYW5nZShkYXRlKSkge1xyXG5cdFx0XHRcdHJldHVybjtcclxuXHRcdFx0fVxyXG5cdFx0XHRpZiAoZGF0ZS5tb250aCAhPT0gJHNjb3BlLmN1cnJlbnQubW9udGgpIHtcclxuXHRcdFx0XHRzZXRDdXJyZW50TW9udGhBbmRZZWFyKGRhdGUubW9udGgsIGRhdGUueWVhcik7XHJcblx0XHRcdFx0JHNjb3BlLnVwZGF0ZURhdGVNYXAoKTtcclxuXHRcdFx0fVxyXG5cdFx0XHRzZXRTZWxlY3RlZERhdGUobmV3IERhdGUodGltZSkpO1xyXG5cdFx0fTtcclxuXHJcblx0XHQkc2NvcGUudXBkYXRlRGF0ZU1hcCA9IGZ1bmN0aW9uKCkge1xyXG5cdFx0XHR2YXIgZmlyc3RXZWVrRGF5ID0gbmV3IERhdGUoJHNjb3BlLmN1cnJlbnQudGltZSAtICgkc2NvcGUuY3VycmVudC5yYXcuZ2V0RGF5KCkgKiB1bml2ZXJzYWwuREFZKSksXHJcblx0XHRcdFx0aXNNb250aENvbXBsZXRlID0gZmFsc2U7XHJcblx0XHRcdFx0JHNjb3BlLmRhdGVNYXAgPSBbXTtcclxuXHJcblx0XHRcdHdoaWxlICghaXNNb250aENvbXBsZXRlKSB7XHJcblx0XHRcdFx0dmFyIHdlZWsgPSBbXTtcclxuXHRcdFx0XHRpZiAoJHNjb3BlLmRhdGVNYXAubGVuZ3RoID09PSA1KSB7XHJcblx0XHRcdFx0XHRpc01vbnRoQ29tcGxldGUgPSB0cnVlO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHRmb3IgKHZhciB3ZWVrRGF5ID0gMDsgd2Vla0RheSA8IDc7IHdlZWtEYXkrKykge1xyXG5cdFx0XHRcdFx0dmFyIF90aGlzRGF0ZSA9IChuZXcgRGF0ZShmaXJzdFdlZWtEYXkuZ2V0VGltZSgpICsgKHdlZWtEYXkgKiB1bml2ZXJzYWwuREFZKSkpO1xyXG5cdFx0XHRcdFx0Ly8gZml4IGZvciBEU1Qgb2RkbmVzc1xyXG5cdFx0XHRcdFx0aWYgKF90aGlzRGF0ZS5nZXRIb3VycygpID09PSAyMykge1xyXG5cdFx0XHRcdFx0XHRfdGhpc0RhdGUgPSAobmV3IERhdGUoX3RoaXNEYXRlLmdldFRpbWUoKSArIHVuaXZlcnNhbC5IT1VSKSk7XHJcblx0XHRcdFx0XHR9IGVsc2UgaWYgKF90aGlzRGF0ZS5nZXRIb3VycygpID09PSAxKSB7XHJcblx0XHRcdFx0XHRcdF90aGlzRGF0ZSA9IChuZXcgRGF0ZShfdGhpc0RhdGUuZ2V0VGltZSgpIC0gdW5pdmVyc2FsLkhPVVIpKTtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdHZhciBfZGF0ZSA9IGdldFN0YW5kYXJkVGltZShfdGhpc0RhdGUpO1xyXG5cdFx0XHRcdFx0X2RhdGUuZGF5SW5Nb250aCA9IF90aGlzRGF0ZS5nZXRNb250aCgpID09PSAkc2NvcGUuY3VycmVudC5yYXcuZ2V0TW9udGgoKSA/ICdkYXktaW4tbW9udGgnIDogJyc7XHJcblx0XHRcdFx0XHRfZGF0ZS5kaXNhYmxlZERheSA9IGRheUlzT3V0T2ZSYW5nZShfZGF0ZSkgPyAnZGlzYWJsZWQtZGF5JyA6ICcnO1xyXG5cdFx0XHRcdFx0d2Vlay5wdXNoKF9kYXRlKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0Zmlyc3RXZWVrRGF5ID0gbmV3IERhdGUoZmlyc3RXZWVrRGF5LmdldFRpbWUoKSArICg3ICogdW5pdmVyc2FsLkRBWSkpO1xyXG5cdFx0XHRcdCRzY29wZS5kYXRlTWFwLnB1c2god2Vlayk7XHJcblx0XHRcdH1cclxuXHRcdH07XHJcblxyXG5cdFx0ZnVuY3Rpb24gZ2V0U3RhbmRhcmRUaW1lKGRhdGUpIHtcclxuXHRcdFx0cmV0dXJuIHtcclxuXHRcdFx0XHRyYXc6IGRhdGUsXHJcblx0XHRcdFx0eWVhcjogZGF0ZS5nZXRGdWxsWWVhcigpLFxyXG5cdFx0XHRcdG1vbnRoTmFtZTogZ2V0TW9udGhOYW1lKGRhdGUuZ2V0TW9udGgoKSksXHJcblx0XHRcdFx0bW9udGg6IGRhdGUuZ2V0TW9udGgoKSxcclxuXHRcdFx0XHRkYXk6IGdldERheU5hbWUoZGF0ZSksXHJcblx0XHRcdFx0ZGF0ZTogZGF0ZS5nZXREYXRlKCksXHJcblx0XHRcdFx0dGltZTogZGF0ZS5nZXRUaW1lKClcclxuXHRcdFx0fTtcclxuXHRcdH1cclxuXHJcblx0XHRmdW5jdGlvbiBnZXRUaW1lT2JqZWN0SWZEYXRlKGRhdGUpIHtcclxuXHRcdFx0aWYgKGFuZ3VsYXIuaXNEYXRlKG5ldyBEYXRlKGRhdGUpKSkge1xyXG5cdFx0XHRcdHJldHVybiBnZXRTdGFuZGFyZFRpbWUobmV3IERhdGUoZGF0ZSkpO1xyXG5cdFx0XHR9XHJcblx0XHRcdHJldHVybiBmYWxzZTtcclxuXHRcdH1cclxuXHJcblx0XHRmdW5jdGlvbiBzZXRDb25maWdPcHRpb25zKCkge1xyXG5cdFx0XHQkc2NvcGUuY29uZmlnID0gJHNjb3BlLmNvbmZpZyB8fCB7fTtcclxuXHRcdFx0JHNjb3BlLmNvbmZpZy5zdGFydCA9IGdldFRpbWVPYmplY3RJZkRhdGUoJHNjb3BlLmNvbmZpZy5zdGFydCk7XHJcblx0XHRcdCRzY29wZS5jb25maWcuZW5kID0gZ2V0VGltZU9iamVjdElmRGF0ZSgkc2NvcGUuY29uZmlnLmVuZCk7XHJcblx0XHRcdG9wdGlvbnMgPSBhbmd1bGFyLmV4dGVuZCh7fSwgZGVmYXVsdHMsICRzY29wZS5jb25maWcpO1xyXG5cdFx0fVxyXG5cclxuXHRcdGZ1bmN0aW9uIGRheUlzT3V0T2ZSYW5nZShfZGF0ZSkge1xyXG5cdFx0XHRpZiAob3B0aW9ucy5zdGFydCAmJiBvcHRpb25zLmVuZCAmJiAoX2RhdGUudGltZSA8IG9wdGlvbnMuc3RhcnQudGltZSB8fCBfZGF0ZS50aW1lID4gb3B0aW9ucy5lbmQudGltZSkpIHtcclxuXHRcdFx0XHRyZXR1cm4gdHJ1ZTtcclxuXHRcdFx0fSBlbHNlIGlmIChvcHRpb25zLnN0YXJ0ICYmIF9kYXRlLnRpbWUgPCBvcHRpb25zLnN0YXJ0LnRpbWUpIHtcclxuXHRcdFx0XHRyZXR1cm4gdHJ1ZTtcclxuXHRcdFx0fSBlbHNlIGlmIChvcHRpb25zLmVuZCAmJiBfZGF0ZS50aW1lID4gb3B0aW9ucy5lbmQudGltZSkge1xyXG5cdFx0XHRcdHJldHVybiB0cnVlO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblxyXG5cdFx0ZnVuY3Rpb24gc2V0U2VsZWN0ZWREYXRlKGRhdGUpIHtcclxuXHRcdFx0JHNjb3BlLnNlbGVjdGVkID0gZ2V0U3RhbmRhcmRUaW1lKGRhdGUpO1xyXG5cdFx0XHQkc2NvcGUubmdNb2RlbCA9ICRzY29wZS5zZWxlY3RlZC5yYXc7XHJcblx0XHR9XHJcblxyXG5cdFx0ZnVuY3Rpb24gc2V0Q3VycmVudE1vbnRoQW5kWWVhcihtb250aCwgeWVhcikge1xyXG5cdFx0XHR2YXIgZGF0ZSA9IG5ldyBEYXRlKHllYXIgIT09IHVuZGVmaW5lZCA/IHllYXIgOiAkc2NvcGUuc2VsZWN0ZWQueWVhciwgbW9udGggIT09IHVuZGVmaW5lZCA/IG1vbnRoIDogJHNjb3BlLnNlbGVjdGVkLm1vbnRoLCAxKTtcclxuXHRcdFx0JHNjb3BlLmN1cnJlbnQgPSBnZXRTdGFuZGFyZFRpbWUoZGF0ZSk7XHJcblx0XHR9XHJcblxyXG5cdFx0ZnVuY3Rpb24gZ2V0TW9udGhOYW1lKG1vbnRoKSB7XHJcblx0XHRcdHJldHVybiAkc2NvcGUubW9udGhzW21vbnRoXTtcclxuXHRcdH1cclxuXHJcblx0XHRmdW5jdGlvbiBnZXREYXlOYW1lKGRhdGUpIHtcclxuXHRcdFx0cmV0dXJuICRzY29wZS5kYXlzW2RhdGUuZ2V0RGF5KCldO1xyXG5cdFx0fVxyXG5cclxuXHRcdGZ1bmN0aW9uIGluaXRpYWxpemUoKSB7XHJcblx0XHRcdHNldENvbmZpZ09wdGlvbnMoKTtcclxuXHRcdFx0c2V0U2VsZWN0ZWREYXRlKCRzY29wZS5uZ01vZGVsIHx8IG5ldyBEYXRlKCkpO1xyXG5cdFx0XHRzZXRDdXJyZW50TW9udGhBbmRZZWFyKCk7XHJcblx0XHRcdCRzY29wZS51cGRhdGVEYXRlTWFwKCk7XHJcblx0XHR9XHJcblxyXG5cdFx0aW5pdGlhbGl6ZSgpO1xyXG5cclxuXHR9XSkuZGlyZWN0aXZlKCdib3NzeUNhbGVuZGFyJywgW2Z1bmN0aW9uICgpIHtcclxuXHRcdHJldHVybiB7XHJcblx0XHRcdHJlc3RyaWN0OiAnQUUnLFxyXG5cdFx0XHRzY29wZToge1xyXG5cdFx0XHRcdG5nTW9kZWw6ICc9JyxcclxuXHRcdFx0XHRjb25maWc6ICc9J1xyXG5cdFx0XHR9LFxyXG5cdFx0XHR0ZW1wbGF0ZVVybDogJ3RlbXBsYXRlcy9ib3NzeS5jYWxlbmRhci5odG1sJywvLyR0ZW1wbGF0ZUNhY2hlLmdldCgndGVtcGxhdGVzL2Jvc3N5LmNhbGVuZGFyLmh0bWwnKSxcclxuXHRcdFx0Y29udHJvbGxlcjogJ0NhbGVuZGFyQ29udHJvbGxlcidcclxuXHRcdH07XHJcblx0fV0pOyIsInZhciBhcHAgPSBhbmd1bGFyLm1vZHVsZSgnYm9zc3kuY29tYm9ib3guY2FzY2FkaW5nRHJvcGRvd24nLCBbXSk7XHJcblxyXG5hcHAuY29udHJvbGxlcignQXBwQ3RybCcsIGZ1bmN0aW9uKCRzY29wZSkge1xyXG5cclxuICAgIC8vIGFkZCBjaG9pY2VzIGZvciB0aGUgMyBkcm9wZG93bnNcclxuICAgIC8vIGRlcGVuZGVuY2llcyBpbiBhcnJheXMgKEEgLSBBMSAtIEExYSlcclxuICAgICRzY29wZS5jaG9pY2VzID0ge1xyXG4gICAgICAgICdPcHRpb24gQSc6IHtcclxuICAgICAgICAgICAgJ09wdGlvbiBBMSc6IFsnT3B0aW9uIEExYScsICdPcHRpb24gQTFiJywgJ09wdGlvbiBBMWMnXSxcclxuICAgICAgICAgICAgJ09wdGlvbiBBMic6IFsnT3B0aW9uIEEyYScsICdPcHRpb24gQTJiJywgJ09wdGlvbiBBMmMnXSxcclxuICAgICAgICAgICAgJ09wdGlvbiBBMyc6IFsnT3B0aW9uIEEzYScsICdPcHRpb24gQTNiJywgJ09wdGlvbiBBM2MnXVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgJ09wdGlvbiBCJzoge1xyXG4gICAgICAgICAgICAnT3B0aW9uIEIxJzogWydPcHRpb24gQjFhJywgJ09wdGlvbiBCMWInLCAnT3B0aW9uIEIxYyddLFxyXG4gICAgICAgICAgICAnT3B0aW9uIEIyJzogWydPcHRpb24gQjJhJywgJ09wdGlvbiBCMmInLCAnT3B0aW9uIEIyYyddLFxyXG4gICAgICAgICAgICAnT3B0aW9uIEIzJzogWydPcHRpb24gQjNhJywgJ09wdGlvbiBCM2InLCAnT3B0aW9uIEIzYyddXHJcbiAgICAgICAgfSxcclxuICAgICAgICAnT3B0aW9uIEMnOiB7XHJcbiAgICAgICAgICAgICdPcHRpb24gQzEnOiBbJ09wdGlvbiBDMWEnLCAnT3B0aW9uIEMxYicsICdPcHRpb24gQzFjJ10sXHJcbiAgICAgICAgICAgICdPcHRpb24gQzInOiBbJ09wdGlvbiBDMmEnLCAnT3B0aW9uIEMyYicsICdPcHRpb24gQzNiJ10sXHJcbiAgICAgICAgICAgICdPcHRpb24gQzMnOiBbJ09wdGlvbiBDM2EnLCAnT3B0aW9uIEMzYicsICdPcHRpb24gQzNjJ11cclxuICAgICAgICB9XHJcbiAgICB9O1xyXG5cclxufSk7IiwidmFyIGFwcCA9IGFuZ3VsYXIubW9kdWxlKCdib3NzeS5jb21ib2JveC5jaGVja2JveE11bHRpc2VsZWN0JywgW10pO1xyXG5cclxuYXBwLmNvbnRyb2xsZXIoJ0FwcEN0cmwnLCBmdW5jdGlvbigkc2NvcGUpIHtcclxuXHJcbiAgICAvLyBzZXQgY2hvaWNlc1xyXG4gICAgJHNjb3BlLmNob2ljZXMgPSBbJ09wdGlvbiBBJywgJ09wdGlvbiBCJywgJ09wdGlvbiBDJ107XHJcblxyXG4gICAgLy8gYXJyYXlcclxuICAgICRzY29wZS5uYW1lID0ge2Nob2ljZXM6IFtdfTtcclxuXHJcbiAgICAvLyBmdW5jdGlvbiBzZWxlY3RBbGwgdG8gc2VsZWN0IGFsbCBjaGVja2JveGVzXHJcbiAgICAkc2NvcGUuc2VsZWN0QWxsID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgJHNjb3BlLm5hbWUuY2hvaWNlcyA9IGFuZ3VsYXIuY29weSgkc2NvcGUuY2hvaWNlcyk7XHJcbiAgICB9O1xyXG5cclxuICAgIC8vIGZ1bmN0aW9uIGRlc2VsZWN0QWxsIHRvIGRlc2VsZWN0IGFsbCBjaGVja2JveGVzXHJcbiAgICAkc2NvcGUuZGVzZWxlY3RBbGwgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICAkc2NvcGUubmFtZS5jaG9pY2VzID0gW107XHJcbiAgICB9O1xyXG5cclxufSk7XHJcblxyXG5hcHAuZGlyZWN0aXZlKCdib3NzeUNoZWNrYm94TXVsdGlzZWxlY3QnLCBbJyRwYXJzZScsICckY29tcGlsZScsIGZ1bmN0aW9uKCRwYXJzZSwgJGNvbXBpbGUpIHtcclxuXHJcbiAgICAvLyBhZGQgdGhlIHNlbGVjdGVkIGNob2ljZSB0byBjaG9pY2VzXHJcbiAgICBmdW5jdGlvbiBhZGRDaG9pY2UgKGFyciwgaXRlbSkge1xyXG4gICAgICAgIGFyciA9IGFuZ3VsYXIuaXNBcnJheShhcnIpID8gYXJyIDogW107XHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBhcnIubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgaWYgKGFuZ3VsYXIuZXF1YWxzKGFycltpXSwgaXRlbSkpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBhcnI7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gYWRkIGNob2ljZSB0byBhcnJheVxyXG4gICAgICAgIGFyci5wdXNoKGl0ZW0pO1xyXG4gICAgICAgIC8vIHJldHVybiBuZXcgYXJyYXlcclxuICAgICAgICByZXR1cm4gYXJyO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIHJlbW92ZSB0aGUgc2VsZWN0ZWQgY2hvaWNlIGZyb20gY2hvaWNlcyB3aGVuIGNsaWNrZWRcclxuICAgIGZ1bmN0aW9uIHJlbW92ZUNob2ljZShhcnIsIGl0ZW0pIHtcclxuICAgICAgICBpZiAoYW5ndWxhci5pc0FycmF5KGFycikpIHtcclxuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBhcnIubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIGlmIChhbmd1bGFyLmVxdWFscyhhcnJbaV0sIGl0ZW0pKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gcmVtb3ZlIGZyb20gYXJyYXlcclxuICAgICAgICAgICAgICAgICAgICBhcnIuc3BsaWNlKGksIDEpO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIHJldHVybiBuZXcgYXJyYXlcclxuICAgICAgICByZXR1cm4gYXJyO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIGNvbnRhaW5zIC0gY2hlY2sgd2hpY2ggaXRlbXMgdGhlIGFycmF5IGNvbnRhaW5zXHJcbiAgICBmdW5jdGlvbiBjb250YWluQ2hlY2tib3ggKGFyciwgaXRlbSkge1xyXG4gICAgICAgIGlmIChhbmd1bGFyLmlzQXJyYXkoYXJyKSkge1xyXG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGFyci5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgaWYgKGFuZ3VsYXIuZXF1YWxzKGFycltpXSwgaXRlbSkpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gd2F0Y2ggYmVoYXZpb3VyIG9mIGRpcmVjdGl2ZSBhbmQgbW9kZWxcclxuICAgIGZ1bmN0aW9uIHdhdGNoKHNjb3BlLCBlbGVtLCBhdHRycykge1xyXG5cclxuICAgICAgICAvLyBjb21waWxlIC0gbmctbW9kZWwgcG9pbnRpbmcgdG8gY2hlY2tlZFxyXG4gICAgICAgICRjb21waWxlKGVsZW0pKHNjb3BlKTtcclxuXHJcbiAgICAgICAgLy8gZ2V0dGVyIGFuZCBzZXR0ZXIgZm9yIG9yaWdpbmFsIG1vZGVsXHJcbiAgICAgICAgdmFyIGdldHRlciA9ICRwYXJzZShhdHRycy5ib3NzeUNoZWNrYm94TXVsdGlzZWxlY3QpO1xyXG4gICAgICAgIHZhciBzZXR0ZXIgPSBnZXR0ZXIuYXNzaWduO1xyXG5cclxuICAgICAgICAvLyB2YWx1ZSBhZGRlZCB0byBsaXN0XHJcbiAgICAgICAgdmFyIHZhbHVlID0gJHBhcnNlKGF0dHJzLmJvc3N5TGlzdFZhbHVlKShzY29wZS4kcGFyZW50KTtcclxuXHJcbiAgICAgICAgLy8gd2F0Y2ggdGhlIGNoYW5nZSBvZiBjaGVja2VkIHZhbHVlc1xyXG4gICAgICAgIHNjb3BlLiR3YXRjaCgnY2hlY2tlZCcsIGZ1bmN0aW9uKG5ld1ZhbHVlLCBvbGRWYWx1ZSkge1xyXG4gICAgICAgICAgICBpZiAobmV3VmFsdWUgPT09IG9sZFZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdmFyIGFjdHVhbCA9IGdldHRlcihzY29wZS4kcGFyZW50KTtcclxuICAgICAgICAgICAgaWYgKG5ld1ZhbHVlID09PSB0cnVlKSB7XHJcbiAgICAgICAgICAgICAgICBzZXR0ZXIoc2NvcGUuJHBhcmVudCwgYWRkQ2hvaWNlIChhY3R1YWwsIHZhbHVlKSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBzZXR0ZXIoc2NvcGUuJHBhcmVudCwgcmVtb3ZlQ2hvaWNlKGFjdHVhbCwgdmFsdWUpKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICAvLyB3YXRjaCBjaGFuZ2Ugb2Ygb3JpZ2luYWwgbW9kZWxcclxuICAgICAgICBzY29wZS4kcGFyZW50LiR3YXRjaChhdHRycy5ib3NzeUNoZWNrYm94TXVsdGlzZWxlY3QsIGZ1bmN0aW9uKG5ld0Fycikge1xyXG4gICAgICAgICAgICBzY29wZS5jaGVja2VkID0gY29udGFpbkNoZWNrYm94IChuZXdBcnIsIHZhbHVlKTtcclxuICAgICAgICB9LCB0cnVlKTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIHJlc3RyaWN0OiAnQUUnLFxyXG4gICAgICAgIHNjb3BlOiB0cnVlLFxyXG4gICAgICAgIGNvbXBpbGU6IGZ1bmN0aW9uKHRFbGVtZW50LCB0QXR0cnMpIHtcclxuICAgICAgICAgICAgLy8gbG9jYWwgdmFyaWFibGUgc3RvcmluZyBjaGVja2JveCBtb2RlbFxyXG4gICAgICAgICAgICB0RWxlbWVudC5hdHRyKCduZy1tb2RlbCcsICdjaGVja2VkJyk7XHJcbiAgICAgICAgICAgIC8vIHByZXZlbnQgcmVjdXJzaW9uXHJcbiAgICAgICAgICAgIHRFbGVtZW50LnJlbW92ZUF0dHIoJ2Jvc3N5LWNoZWNrYm94LW11bHRpc2VsZWN0Jyk7XHJcbiAgICAgICAgICAgIHJldHVybiB3YXRjaDtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG5cclxufV0pOyIsInZhciBhcHAgPSBhbmd1bGFyLm1vZHVsZSgnYm9zc3kuY29tYm9ib3gubXVsdGlzZWxlY3QnLCBbXSk7XHJcblxyXG5hcHAuY29udHJvbGxlcignQXBwQ3RybCcsIGZ1bmN0aW9uKCRzY29wZSkge1xyXG5cclxuICAgIC8vIGFkZCBjaG9pY2VzIGZvciBtdWx0aXNlbGVjdCBpbiBhcnJheVxyXG4gICAgJHNjb3BlLmNob2ljZXMgPSBbe2lkOjEsIG5hbWU6ICdPcHRpb24gQSd9LFxyXG4gICAgICAgICAgICAgICAgICAgICAge2lkOjIsIG5hbWU6ICdPcHRpb24gQid9LFxyXG4gICAgICAgICAgICAgICAgICAgICAge2lkOjMsIG5hbWU6ICdPcHRpb24gQyd9XHJcbiAgICAgICAgICAgICAgICAgICAgIF07XHJcblxyXG4gICAgLy8gc2VsZWN0ZWQgY2hvaWNlXHJcbiAgICAkc2NvcGUuc2VsZWN0ZWRDaG9pY2UgPSBbXTtcclxuXHJcbn0pO1xyXG5cclxuLy8gaW5qZWN0IGZ1bmN0aW9uc1xyXG5hcHAuZmFjdG9yeSgnb3B0aW9uUGFyc2VyJywgWyckcGFyc2UnLCBmdW5jdGlvbiAoJHBhcnNlKSB7XHJcblxyXG4gICAgdmFyIFRZUEVBSEVBRF9SRUdFWFAgPSAvXlxccyooLio/KSg/Olxccythc1xccysoLio/KSk/XFxzK2ZvclxccysoPzooW1xcJFxcd11bXFwkXFx3XFxkXSopKVxccytpblxccysoLiopJC87XHJcblxyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICBwYXJzZTogZnVuY3Rpb24gKGlucHV0KSB7XHJcblxyXG4gICAgICAgICAgICAvLyBjaGVjayBpbnB1dHNcclxuICAgICAgICAgICAgdmFyIG1hdGNoID0gaW5wdXQubWF0Y2goVFlQRUFIRUFEX1JFR0VYUCksIG1vZGVsTWFwcGVyLCB2aWV3TWFwcGVyLCBzb3VyY2U7XHJcbiAgICAgICAgICAgIGlmICghbWF0Y2gpIHtcclxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcclxuICAgICAgICAgICAgICAgICAgICAgICAgJ0V4cGVjdGVkIHR5cGVhaGVhZCBzcGVjaWZpY2F0aW9uIGluIGZvcm0gb2YgXCJfbW9kZWxWYWx1ZV8gKGFzIF9sYWJlbF8pPyBmb3IgX2l0ZW1fIGluIF9jb2xsZWN0aW9uX1wiJyArXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICcgYnV0IGdvdCBcIicgKyBpbnB1dCArICdcIi4nKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgIGl0ZW1OYW1lOiBtYXRjaFszXSxcclxuICAgICAgICAgICAgICAgIHNvdXJjZTogJHBhcnNlKG1hdGNoWzRdKSxcclxuICAgICAgICAgICAgICAgIHZpZXdNYXBwZXI6ICRwYXJzZShtYXRjaFsyXSB8fCBtYXRjaFsxXSksXHJcbiAgICAgICAgICAgICAgICBtb2RlbE1hcHBlcjogJHBhcnNlKG1hdGNoWzFdKVxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcbn1dKTtcclxuXHJcbmFwcC5kaXJlY3RpdmUoJ2Jvc3N5TXVsdGlzZWxlY3QnLFxyXG5cclxuICAgICAgICBmdW5jdGlvbiAoJGRvY3VtZW50LCAkY29tcGlsZSwgb3B0aW9uUGFyc2VyKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICByZXN0cmljdDogJ0UnLFxyXG4gICAgICAgICAgICAgICAgcmVxdWlyZTogJ25nTW9kZWwnLFxyXG4gICAgICAgICAgICAgICAgbGluazogZnVuY3Rpb24gKG9yaWdpbmFsU2NvcGUsIGVsZW1lbnQsIGF0dHJzLCBtb2RlbEN0cmwpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gZGVjbGFyZSB2YXJpYWJsZXNcclxuICAgICAgICAgICAgICAgICAgICB2YXIgZXhwID0gYXR0cnMub3B0aW9ucyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgcGFyc2VkUmVzdWx0ID0gb3B0aW9uUGFyc2VyLnBhcnNlKGV4cCksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlzTXVsdGlwbGUgPSBhdHRycy5tdWx0aXBsZSA/IHRydWUgOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2NvcGUgPSBvcmlnaW5hbFNjb3BlLiRuZXcoKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2hhbmdlSGFuZGxlciA9IGF0dHJzLmNoYW5nZSB8fCBhbmd1bGFyLm5vb3A7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHNjb3BlLml0ZW1zID0gW107XHJcbiAgICAgICAgICAgICAgICAgICAgc2NvcGUubXVsdGlwbGUgPSBpc011bHRpcGxlO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAvLyBpbmNsdWRlIHNlY29uZCBkaXJlY3RpdmUgKHRlbXBsYXRlKVxyXG4gICAgICAgICAgICAgICAgICAgIHZhciBwb3BVcEVsID0gYW5ndWxhci5lbGVtZW50KCc8Ym9zc3ktbXVsdGlzZWxlY3QtcG9wdXA+PC9ib3NzeS1tdWx0aXNlbGVjdC1wb3B1cD4nKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gYW5hbHlzZSBtb2RlbFxyXG4gICAgICAgICAgICAgICAgICAgIGZ1bmN0aW9uIHBhcnNlTW9kZWwoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBtb2RlbCA9IHBhcnNlZFJlc3VsdC5zb3VyY2Uob3JpZ2luYWxTY29wZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbW9kZWwubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBsb2NhbCA9IHt9O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbG9jYWxbcGFyc2VkUmVzdWx0Lml0ZW1OYW1lXSA9IG1vZGVsW2ldO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2NvcGUuaXRlbXMucHVzaCh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGFiZWw6IHBhcnNlZFJlc3VsdC52aWV3TWFwcGVyKGxvY2FsKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtb2RlbDogbW9kZWxbaV0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2hlY2tlZDogZmFsc2VcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICBwYXJzZU1vZGVsKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC8vIGFkZCB0ZW1wbGF0ZSBkaXJlY3RpdmVcclxuICAgICAgICAgICAgICAgICAgICBlbGVtZW50LmFwcGVuZCgkY29tcGlsZShwb3BVcEVsKShzY29wZSkpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAvLyBzZWxlY3Rpb24gZnVuY3Rpb25cclxuICAgICAgICAgICAgICAgICAgICBmdW5jdGlvbiBzZWxlY3RNdWx0aXBsZShpdGVtKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW0uY2hlY2tlZCA9ICFpdGVtLmNoZWNrZWQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNldE1vZGVsVmFsdWUodHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAvLyBhcnJheSBmb3IgbXVsdGlwbGUgc2VsZWN0aW9uXHJcbiAgICAgICAgICAgICAgICAgICAgZnVuY3Rpb24gc2V0TW9kZWxWYWx1ZShpc011bHRpcGxlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciB2YWx1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGlzTXVsdGlwbGUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlID0gW107XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhbmd1bGFyLmZvckVhY2goc2NvcGUuaXRlbXMsIGZ1bmN0aW9uIChpdGVtKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGl0ZW0uY2hlY2tlZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZS5wdXNoKGl0ZW0ubW9kZWwpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYW5ndWxhci5mb3JFYWNoKHNjb3BlLml0ZW1zLCBmdW5jdGlvbiAoaXRlbSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpdGVtLmNoZWNrZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWUgPSBpdGVtLm1vZGVsO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgbW9kZWxDdHJsLiRzZXRWaWV3VmFsdWUodmFsdWUpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gZnVuY3Rpb24gZm9yIHNlbGVjdGlvbiBvZiBhbGxcclxuICAgICAgICAgICAgICAgICAgICBzY29wZS5jaGVja0FsbCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFpc011bHRpcGxlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgYW5ndWxhci5mb3JFYWNoKHNjb3BlLml0ZW1zLCBmdW5jdGlvbiAoaXRlbSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaXRlbS5jaGVja2VkID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNldE1vZGVsVmFsdWUodHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gZnVuY3Rpb24gZm9yIHNlbGVjdGlvbiBvZiBub25lXHJcbiAgICAgICAgICAgICAgICAgICAgc2NvcGUudW5jaGVja0FsbCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYW5ndWxhci5mb3JFYWNoKHNjb3BlLml0ZW1zLCBmdW5jdGlvbiAoaXRlbSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaXRlbS5jaGVja2VkID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZXRNb2RlbFZhbHVlKHRydWUpO1xyXG4gICAgICAgICAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHNjb3BlLnNlbGVjdCA9IGZ1bmN0aW9uIChpdGVtKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIFRPRE86IGFkZCBzZWxlY3RTaW5nbGUgZnVuY3Rpb24gPz8/XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpc011bHRpcGxlICE9PSBmYWxzZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZWN0TXVsdGlwbGUoaXRlbSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgIH0pO1xyXG5cclxuLy8gZGlyZWN0aXZlIHN0b3JpbmcgdGVtcGxhdGVcclxuYXBwLmRpcmVjdGl2ZSgnYm9zc3lNdWx0aXNlbGVjdFBvcHVwJywgWyckZG9jdW1lbnQnLCBmdW5jdGlvbiAoJGRvY3VtZW50KSB7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgcmVzdHJpY3Q6ICdFJyxcclxuICAgICAgICAgICAgc2NvcGU6IGZhbHNlLFxyXG4gICAgICAgICAgICByZXBsYWNlOiB0cnVlLFxyXG4gICAgICAgICAgICB0ZW1wbGF0ZVVybDogJy4uL3RlbXBsYXRlcy9ib3NzeS5jb21ib2JveC5tdWx0aXNlbGVjdC5odG1sJyxcclxuICAgICAgICAgICAgbGluazogZnVuY3Rpb24gKHNjb3BlLCBlbGVtZW50LCBhdHRyKSB7XHJcblxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuICAgIH1dKTtcclxuIiwiYW5ndWxhci5tb2R1bGUoJ2Jvc3N5LmRhdGEnLCBbXSlcclxuLyoqXHJcbkBuZ2RvYyBzZXJ2aWNlXHJcbkBuYW1lICRkYXRhXHJcbkByZXF1aXJlcyAkcVxyXG5AcmVxdWlyZXMgJGh0dHBcclxuXHJcbiovXHJcbiAgICAuZmFjdG9yeSgnJGRhdGEnLCBbJyRxJywnJGh0dHAnLCAnJHNjb3BlJywgZnVuY3Rpb24gKCRxLCAkaHR0cCwgJHNjb3BlKSB7XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIF9nZXREYXRhIChkYXRhKSB7XHJcbiAgICAgICAgICAgIGlmIChhbmd1bGFyLmlzU3RyaW5nKGRhdGEpKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gX2dldFJlbW90ZURhdGEoZGF0YSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSBpZiAoYW5ndWxhci5pc09iamVjdChkYXRhKSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGRhdGE7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSBpZiAoYW5ndWxhci5pc0Z1bmN0aW9uKGRhdGEpKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gX2dldERhdGEoIGRhdGEuY2FsbCgkc2NvcGUpICk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAvL1RPRE86IHJlcGxhY2UgZXJyb3IgbWVzc2FnZSB3aXRoIG9ubGluZSBkb2MgbGluayBsaWtlIG5nIGVycm9yc1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcignZGlyZWN0aXZlLmJvc3N5Rm9ybTogbm8gZGF0YSB1cmwgb3Igb2JqZWN0IGdpdmVuJyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIF9nZXRSZW1vdGVEYXRhKGRhdGEpIHtcclxuICAgICAgICAgICAgdmFyIGRlZmVycmVkID0gJHEuZGVmZXIoKTtcclxuXHJcbiAgICAgICAgICAgICRodHRwLmdldCggZGF0YSwgeyByZXNwb25zZVR5cGU6ICdqc29uJyB9IClcclxuICAgICAgICAgICAgICAgIC5zdWNjZXNzKCBmdW5jdGlvbiggZGF0YSApIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiggYW5ndWxhci5pc09iamVjdCggZGF0YSApICkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZXNvbHZlKGRhdGEpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy9UT0RPOiByZXBsYWNlIGVycm9yIG1lc3NhZ2Ugd2l0aCBvbmxpbmUgZG9jIGxpbmsgbGlrZSBuZyBlcnJvcnNcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGVmZXJyZWQucmVqZWN0KCdkaXJlY3RpdmUuYm9zc3lGb3JtOiBHRVQgcmVxdWVzdCB0byB1cmwgZGlkIG5vdCBwcm9kdWNlIGRhdGEgb2JqZWN0Jyk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5lcnJvciggZnVuY3Rpb24ocmVzcG9uc2VfZGF0YSwgc3RhdHVzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy9UT0RPOiByZXBsYWNlIGVycm9yIG1lc3NhZ2Ugd2l0aCBvbmxpbmUgZG9jIGxpbmsgbGlrZSBuZyBlcnJvcnNcclxuICAgICAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZWplY3QoJ2RpcmVjdGl2ZS5ib3NzeUZvcm06IEdFVCByZXF1ZXN0IHRvIHVybCBcIicgKyBkYXRhICsgJ1wiIGZhaWxlZCB3aXRoIHN0YXR1cyBcIicgKyBzdGF0dXMgKyAnXCInKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuIGRlZmVycmVkLnByb21pc2U7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAvKipcclxuICAgICAgICAgICAgQG5nZG9jIG1ldGhvZFxyXG4gICAgICAgICAgICBAbmFtZSBnZXREYXRhXHJcbiAgICAgICAgICAgIEBtZXRob2RPZiAkZGF0YVxyXG4gICAgICAgICAgICBAcGFyYW0ge3N0cmluZyxvYmplY3QsZnVuY3Rpb259IGRhdGEgSWYgZGF0YSBpcyBhIHN0cmluZywgaXQgd2lsbCBiZSB0cmVhdGVkIGFzIGEgdXJsIHRvIHJldHJpZXZlIGRhdGEgZnJvbS4gSWYgZGF0YSBpcyBhbiBvYmplY3QgaXQgd2lsbCBiZSBpbW1lZGlhdGVseSByZXR1cm5lZC4gSWYgZGF0YSBpcyBhIGZ1bmN0aW9uLCB0aGUgZnVuY3Rpb24gd2lsbCBiZSBjYWxsZWQgYW5kIHByb2Nlc3NlZCB1bnRpbCBhbiBvYmplY3QgaXMgcHJvZHVjZWRcclxuICAgICAgICAgICAgQHJldHVybnMge09iamVjdH0gRWl0aGVyIGEgJHEgcHJvbWlzZSwgYSBkYXRhIG9iamVjdCBvciBhIHN0cmluZy5cclxuICAgICAgICAgICAgKi9cclxuICAgICAgICAgICAgZ2V0RGF0YTogX2dldERhdGFcclxuICAgICAgICB9O1xyXG4gICAgfV0pXHJcbjtcclxuIiwiYW5ndWxhci5tb2R1bGUoJ2Jvc3N5LmRhdGFncmlkJywgW10pXHJcblx0LmNvbnRyb2xsZXIoJ0RhdGFHcmlkQ29udHJvbGxlcicsIFsnJHNjb3BlJywgZnVuY3Rpb24oJHNjb3BlKXtcclxuXHJcblx0XHR2YXIgbnVtYmVyQ29tcGFyZSA9IGZ1bmN0aW9uKGEsIGIpIHtcclxuXHRcdFx0dmFyIHJlc3VsdCA9IDA7XHJcblx0XHRcdGlmIChhIDwgYikge1xyXG5cdFx0XHRcdHJlc3VsdCA9IC0xO1xyXG5cdFx0XHR9IGVsc2UgaWYgKGEgPiBiKSB7XHJcblx0XHRcdFx0cmVzdWx0ID0gMTtcclxuXHRcdFx0fVxyXG5cdFx0XHRyZXR1cm4gcmVzdWx0O1xyXG5cdFx0fTtcclxuXHJcblx0XHR2YXIgc3RyaW5nQ29tcGFyZSA9IGZ1bmN0aW9uKGEsIGIpIHtcclxuXHRcdFx0Ly8gdG9Mb3dlckNhc2UgbmVlZGVkIHRvIHN1cHBvcnQgYWxsIGJyb3dzZXJzXHJcblx0XHRcdHJldHVybiBhLnRvTG93ZXJDYXNlKCkubG9jYWxlQ29tcGFyZShiLnRvTG93ZXJDYXNlKCkpO1xyXG5cdFx0fTtcclxuXHJcblx0XHR2YXIgZm9ybWF0dGVkTnVtYmVyQ29tcGFyZSA9IGZ1bmN0aW9uKGEsIGIpIHtcclxuXHRcdFx0Ly8gc3RyaXAgbm9uLW51bWVyaWMgY2hhcmFjdGVycywgYW5kIGNvbnZlcnQgdG8gbnVtYmVyIHdpdGggdW5hcnkgcGx1c1xyXG5cdFx0XHRhID0gK2EucmVwbGFjZSgvW15cXGQuLV0vZ2ksICcnKTtcclxuXHRcdFx0YiA9ICtiLnJlcGxhY2UoL1teXFxkLi1dL2dpLCAnJyk7XHJcblx0XHRcdHJldHVybiBudW1iZXJDb21wYXJlKGEsIGIpO1xyXG5cdFx0fTtcclxuXHJcblx0XHR2YXIgY29sdW1uQ29tcGFyZSA9IGZ1bmN0aW9uKGEsIGIsIGNvbHVtbkluZGV4KXtcclxuXHRcdFx0dmFyIGNvbHVtblR5cGUgPSAkc2NvcGUuY29uZmlnLmRhdGEuY29sdW1uc1tjb2x1bW5JbmRleF0udHlwZSxcclxuXHRcdFx0XHRyZXN1bHQgPSAwO1xyXG5cdFx0XHRpZiAoY29sdW1uVHlwZSA9PT0gJ251bWJlcicpIHtcclxuXHRcdFx0XHRyZXN1bHQgPSBudW1iZXJDb21wYXJlKGFbY29sdW1uSW5kZXhdLCBiW2NvbHVtbkluZGV4XSk7XHJcblx0XHRcdH0gZWxzZSBpZiAoY29sdW1uVHlwZSA9PT0gJ3N0cmluZycpIHtcclxuXHRcdFx0XHRyZXN1bHQgPSBzdHJpbmdDb21wYXJlKGFbY29sdW1uSW5kZXhdLCBiW2NvbHVtbkluZGV4XSk7XHJcblx0XHRcdH0gZWxzZSBpZiAoY29sdW1uVHlwZSA9PT0gJ21vbmV5Jykge1xyXG5cdFx0XHRcdHJlc3VsdCA9IGZvcm1hdHRlZE51bWJlckNvbXBhcmUoYVtjb2x1bW5JbmRleF0sIGJbY29sdW1uSW5kZXhdKTtcclxuXHRcdFx0fVxyXG5cdFx0XHRyZXR1cm4gcmVzdWx0O1xyXG5cdFx0fTtcclxuXHJcblx0XHR2YXIgY2FsY3VsYXRlU29ydGRpcmVjdGlvbiA9IGZ1bmN0aW9uKGNvbHVtbkluZGV4KXtcclxuXHRcdFx0Ly8gMSA9IGFzYyBvciAgLTEgPSBkZXNjXHJcblx0XHRcdGlmICgkc2NvcGUuY29uZmlnLmRhdGEuY29sdW1uc1tjb2x1bW5JbmRleF0uc29ydERpcmVjdGlvbikge1xyXG5cdFx0XHRcdCRzY29wZS5jb25maWcuZGF0YS5jb2x1bW5zW2NvbHVtbkluZGV4XS5zb3J0RGlyZWN0aW9uID0gLSRzY29wZS5jb25maWcuZGF0YS5jb2x1bW5zW2NvbHVtbkluZGV4XS5zb3J0RGlyZWN0aW9uO1xyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdCRzY29wZS5jb25maWcuZGF0YS5jb2x1bW5zW2NvbHVtbkluZGV4XS5zb3J0RGlyZWN0aW9uID0gMTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0cmV0dXJuICRzY29wZS5jb25maWcuZGF0YS5jb2x1bW5zW2NvbHVtbkluZGV4XS5zb3J0RGlyZWN0aW9uO1xyXG5cdFx0fTtcclxuXHJcblx0XHQkc2NvcGUuc29ydENvbHVtbiA9IGZ1bmN0aW9uKGNvbHVtbkluZGV4KSB7XHJcblx0XHRcdHZhciBzb3J0RGlyZWN0aW9uID0gY2FsY3VsYXRlU29ydGRpcmVjdGlvbihjb2x1bW5JbmRleCk7XHJcblxyXG5cdFx0XHQkc2NvcGUuY29uZmlnLmRhdGEucm93cyA9ICRzY29wZS5jb25maWcuZGF0YS5yb3dzLnNvcnQoZnVuY3Rpb24oYSwgYil7XHJcblx0XHRcdFx0cmV0dXJuIHNvcnREaXJlY3Rpb24gKiBjb2x1bW5Db21wYXJlKGEsIGIsIGNvbHVtbkluZGV4KTtcclxuXHRcdFx0fSk7XHJcblx0XHR9O1xyXG5cdH1dKVxyXG5cdC5kaXJlY3RpdmUoJ2Jvc3N5RGF0YWdyaWQnLCBbZnVuY3Rpb24oKVxyXG5cdHtcclxuXHRcdHJldHVybiB7XHJcblx0XHRcdHJlc3RyaWN0OiAnRUEnLFxyXG5cdFx0XHRzY29wZToge1xyXG5cdFx0XHRcdGNvbmZpZzogJz0nXHJcblx0XHRcdH0sXHJcblx0XHRcdHRlbXBsYXRlVXJsOiAnYm9zc3kuZGF0YWdyaWQuaHRtbCcsXHJcblx0XHRcdGNvbnRyb2xsZXI6ICdEYXRhR3JpZENvbnRyb2xsZXInXHJcblx0XHR9O1xyXG5cdH1dKTtcclxuIiwiYW5ndWxhci5tb2R1bGUoJ2Jvc3N5LmRyb3Bkb3duJywgW10pXHJcblx0LnJ1bihmdW5jdGlvbigkdGVtcGxhdGVDYWNoZSl7XHJcbiAgICAgICAgJHRlbXBsYXRlQ2FjaGUucHV0KCdib3NzeS1kcm9wZG93bi5odG1sJywgJzxkaXY+PHNlbGVjdCBuZy1vcHRpb25zPVwiaXRlbVtkcm9wZG93bi50aXRsZV0gZm9yIGl0ZW0gaW4gZHJvcGRvd24uaXRlbXMgfCBvcmRlckJ5OiBkcm9wZG93bi50aXRsZVwiIG5nLW1vZGVsPVwic2VsZWN0ZWRJdGVtXCIgbmctY2hhbmdlPVwiZHJvcGRvd24udXBkYXRlU2VsZWN0ZWRJdGVtKHNlbGVjdGVkSXRlbSlcIj48b3B0aW9uIHZhbHVlPVwiXCIgbmctaGlkZT1cInNlbGVjdGVkSXRlbVwiPlBsZWFzZSBzZWxlY3Qgb25lLi4uPC9vcHRpb24+PC9zZWxlY3Q+PC9kaXY+Jyk7XHJcbiAgICB9KVxyXG5cdC5kaXJlY3RpdmUoJ2Jvc3N5RHJvcGRvd24nLCBmdW5jdGlvbigkaHR0cCwgJGNvbXBpbGUpIHtcclxuXHRcdHJldHVybiB7XHJcblx0XHRcdHJlc3RyaWN0OiAnRUEnLFxyXG5cdFx0XHRzY29wZToge1xyXG5cdFx0XHRcdGNvbmZpZzogJz0nLFxyXG5cdFx0XHRcdHNlbGVjdDogJz0nLFxyXG5cdFx0XHRcdGl0ZW1zOiAnPSdcclxuXHRcdFx0fSxcclxuXHRcdFx0dGVtcGxhdGVVcmw6ICcnLFxyXG5cdFx0XHRsaW5rOiBmdW5jdGlvbihzY29wZSwgZWxlbWVudCwgYXR0cnMpIHtcclxuXHRcdFx0XHR2YXIgY3VzdG9tVGVtcGxhdGU7XHJcblxyXG5cdFx0XHRcdC8vQ2hlY2tzIGlmIHVzZXIgaXMgZGVmaW5pbmcgYSB1cmwgb3IgaW5uZXIgaHRtbFxyXG5cdFx0XHRcdC8vSWYgaXQgaXMgYSB1cmwsIHRoZSB0ZW1wbGF0ZSBtdXN0IGJlIGxvY2F0ZWQgaW4gYSBsb2NhbCBkaXJlY3Rvcnkgb3IgYWRkZWQgdG8gdGhlIERPTSB2aWEgbmctaW5jbHVkZVxyXG5cdFx0XHRcdGlmKHNjb3BlLmRyb3Bkb3duLnRlbXBsYXRlWzBdICE9PSAnPCcpIHtcclxuXHRcdFx0XHRcdGN1c3RvbVRlbXBsYXRlID0gJGNvbXBpbGUoJzxuZy1pbmNsdWRlIHNyYz1cImRyb3Bkb3duLnRlbXBsYXRlXCI+PC9uZy1pbmNsdWRlPicpKHNjb3BlKTtcclxuXHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0Y3VzdG9tVGVtcGxhdGUgPSAkY29tcGlsZShzY29wZS5kcm9wZG93bi50ZW1wbGF0ZSkoc2NvcGUpO1xyXG5cdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0Ly9JbmplY3RzIHRlbXBsYXRlXHJcblx0XHRcdFx0ZWxlbWVudC5yZXBsYWNlV2l0aChjdXN0b21UZW1wbGF0ZSk7XHJcblx0XHRcdH0sXHJcblx0XHRcdGNvbnRyb2xsZXI6IGZ1bmN0aW9uKCRzY29wZSkge1xyXG5cdFx0XHRcdHZhciB0aGlzRHJvcGRvd24gPSB0aGlzO1xyXG5cdFx0XHRcdHRoaXNEcm9wZG93bi50aXRsZSA9ICRzY29wZS5jb25maWcudGl0bGU7XHJcblx0XHRcdFx0dGhpc0Ryb3Bkb3duLml0ZW1zID0gW107XHJcblxyXG5cdFx0XHRcdC8vUmV0cmlldmUganNvbiBjb250YWluaW5nIG9iamVjdHMgdG8gcG9wdWxhdGUgdGhlIGRyb3Bkb3duLlxyXG5cdFx0XHRcdGlmKCRzY29wZS5jb25maWcuc3JjKSB7XHJcblx0XHRcdFx0XHQvL0NoZWNrcyB0aGF0IGNvbmZpZy5zcmMgaXMgYSBKU09OIGZpbGUuXHJcblx0XHRcdFx0XHRpZigkc2NvcGUuY29uZmlnLnNyYy5zdWJzdHIoJHNjb3BlLmNvbmZpZy5zcmMubGVuZ3RoLTUsICRzY29wZS5jb25maWcuc3JjLmxlbmd0aCkgPT09ICcuanNvbicpIHtcclxuXHRcdFx0XHRcdFx0JGh0dHAuZ2V0KCRzY29wZS5jb25maWcuc3JjKVxyXG5cdFx0XHRcdFx0XHRcdC5zdWNjZXNzKGZ1bmN0aW9uKGRhdGEpIHtcclxuXHRcdFx0XHRcdFx0XHRcdHRoaXNEcm9wZG93bi5pdGVtcyA9IGRhdGE7XHJcblx0XHRcdFx0XHRcdFx0XHQvL0NoZWNrcyB2YWxpZGl0eSBvZiB0aGUgdGl0bGUgZmllbGQgYXMgaXQgYXBwbGllcyB0byB0aGUgSlNPTi5cclxuXHRcdFx0XHRcdFx0XHRcdGlmKCF0aGlzRHJvcGRvd24uaXRlbXNbMF0uaGFzT3duUHJvcGVydHkodGhpc0Ryb3Bkb3duLnRpdGxlKSkge1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRjb25zb2xlLmVycm9yKCdFUlJPUjogJHNjb3BlLmNvbmZpZy50aXRsZTogXCInICsgJHNjb3BlLmNvbmZpZy50aXRsZSArICdcIiBpcyBub3QgYSBtZW1iZXIgb2YgdGhlIGxvYWRlZCBKU09OIGRhdGEuIFBsZWFzZSBzcGVjaWZ5IGEgdmFsaWQgXCJ0aXRsZVwiIHRvIGxpc3QuJyk7XHJcblx0XHRcdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRcdFx0XHQvL0F0dGFjaGVzIHJldHJpZXZlZCBpdGVtcyB0byAkc2NvcGUuaXRlbXMgZm9yIGFkZGl0aW9uYWwgZnVuY3Rpb25hbGl0eS5cclxuXHRcdFx0XHRcdFx0XHRcdGlmKCRzY29wZS5pdGVtcykge1xyXG5cdFx0XHRcdFx0XHRcdFx0XHQkc2NvcGUuaXRlbXMgPSB0aGlzRHJvcGRvd24uaXRlbXM7XHJcblx0XHRcdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRcdFx0fSlcclxuXHRcdFx0XHRcdFx0XHQuZXJyb3IoZnVuY3Rpb24oZGF0YSkge1xyXG5cdFx0XHRcdFx0XHRcdFx0Y29uc29sZS5lcnJvcignRVJST1I6IEZhaWwgdG8gbG9hZCBKU09OIGRhdGEgZnJvbSB0aGUgcGF0aDogXCInICsgJHNjb3BlLmNvbmZpZy5zcmMgKyAnXCInKTtcclxuXHRcdFx0XHRcdFx0XHR9KTtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdC8vTG9ncyBhbiBlcnJvciB0byBpZGVudGlmeSB0aGF0IGEganNvbiBmaWxlIHdhcyBub3QgbG9hZGVkLlxyXG5cdFx0XHRcdFx0ZWxzZSB7XHJcblx0XHRcdFx0XHRcdGNvbnNvbGUuZXJyb3IoJ0VSUk9SOiBcIiRzY29wZS5jb25maWcuc3JjXCI6IFwiJyArICRzY29wZS5jb25maWcuc3JjICsgJ1wiIGlzIG5vdCBhIHZhbGlkIEpTT04gZmlsZS4nKTtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdC8vRnVuY3Rpb24gY2FsbGVkIHRvIHVwZGF0ZSBzZWxlY3QgaW4gdGhlIHRlbXBsYXRlLlxyXG5cdFx0XHRcdFx0dGhpc0Ryb3Bkb3duLnVwZGF0ZVNlbGVjdGVkSXRlbSA9IGZ1bmN0aW9uKHNlbGVjdGVkSXRlbSkge1xyXG5cdFx0XHRcdFx0XHQvL1NpbmdsZSBzZWxlY3Qgb2JqZWN0IHRpZWQgdG8gdGhlIGNvbmZpZyBvYmplY3QuXHJcblx0XHRcdFx0XHRcdGlmICgkc2NvcGUuY29uZmlnLnNlbGVjdCkge1xyXG5cdFx0XHRcdFx0XHRcdCRzY29wZS5jb25maWcuc2VsZWN0ID0gc2VsZWN0ZWRJdGVtO1xyXG5cdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRcdC8vVXNlciBjYW4gY29sbGVjdCBhbmQgdXRpbGl6ZSBtdWx0aXBsZSBzZWxlY3Qgb2JqZWN0cyB3aXRoIHRoZSBzYW1lIGNvbmZpZyBvYmplY3QgaWYgcGFzc2luZyBpbiBhIGRpc3RpbmN0IHNlbGVjdCBwYXJhbS5cclxuXHRcdFx0XHRcdFx0aWYgKCRzY29wZS5zZWxlY3QpIHtcclxuXHRcdFx0XHRcdFx0XHQkc2NvcGUuc2VsZWN0ID0gc2VsZWN0ZWRJdGVtO1xyXG5cdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHR9O1xyXG5cdFx0XHRcdFx0Ly9EZXRlcm1pbmUgaWYgY3VzdG9tIHRlbXBsYXRlIFVybCBoYXMgYmVlbiBkZWZpbmVkLlxyXG5cdFx0XHRcdFx0aWYgKCRzY29wZS5jb25maWcudGVtcGxhdGUpIHtcclxuXHRcdFx0XHRcdFx0dGhpc0Ryb3Bkb3duLnRlbXBsYXRlID0gJHNjb3BlLmNvbmZpZy50ZW1wbGF0ZTtcclxuXHRcdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHRcdHRoaXNEcm9wZG93bi50ZW1wbGF0ZSA9ICdib3NzeS1kcm9wZG93bi5odG1sJztcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0Ly9Mb2dzIGFuIGVycm9yIGlmICdzcmMnIGhhcyBub3QgYmVlbiBkZWZpbmVkLlxyXG5cdFx0XHRcdGVsc2Uge1xyXG5cdFx0XHRcdFx0Y29uc29sZS5lcnJvcignRVJST1I6IFwiJHNjb3BlLmNvbmZpZy5zcmNcIiBoYXMgbm90IGJlZW4gc3BlY2lmaWVkIHdpdGhpbiB0aGUgXCJjb25maWdcIiBvYmplY3QuIFBsZWFzZSBwYXNzIGluIGEgdmFsaWQgcGF0aCB0byBhIEpTT04gZmlsZS4nKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH0sXHJcblx0XHRcdGNvbnRyb2xsZXJBczogJ2Ryb3Bkb3duJ1xyXG5cdFx0fTtcclxuXHR9KTtcclxuIiwiYW5ndWxhci5tb2R1bGUoJ2Jvc3N5LmZvcm0nLCBbXSlcclxuICAgIC5ydW4oZnVuY3Rpb24oJHRlbXBsYXRlQ2FjaGUpe1xyXG4gICAgICAgICR0ZW1wbGF0ZUNhY2hlLnB1dCgnYm9zc3ktaW5wdXQuaHRtbCcsICd0ZW1wbGF0ZXMvYm9zc3ktaW5wdXQuaHRtbCcpO1xyXG4gICAgfSlcclxuICAgIC5kaXJlY3RpdmUoJ2Jvc3N5Rm9ybScsWyckY29tcGlsZScsJyRodHRwJywnJHNjaGVtYScsJyRkYXRhJywgZnVuY3Rpb24gKCRjb21waWxlLCAkaHR0cCwgJHNjaGVtYSwgJGRhdGEpIHtcclxuICAgICAgICB2YXIgX3NjaGVtYSxcclxuICAgICAgICAgICAgX2RhdGEsXHJcbiAgICAgICAgICAgIF9vcHRpb25zID0ge1xyXG4gICAgICAgICAgICAgICAgc2hvd0xhYmVsczogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIGhlYWRlcjogJ1RoaXMgaXMgaGVhZGVyJyxcclxuICAgICAgICAgICAgICAgIGZvb3RlcjogJ1RoaXMgaXMgZm9vdGVyJyxcclxuICAgICAgICAgICAgICAgIHRoZW1lOiAnZ3JlZW4nLFxyXG4gICAgICAgICAgICAgICAgYnV0dG9uOiAnU2F2ZSdcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgX2l0ZW1UZW1wbGF0ZSA9IHtcclxuICAgICAgICAgICAgICAgIG51bWJlcjogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAnPGlucHV0IHR5cGU9XCJudW1iZXJcIi8+JztcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICB0ZXh0OiBmdW5jdGlvbiAob2JqLCBrZXksIGlzX3JlcXVpcmVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuICc8Ym9zc3ktaW5wdXQgdGl0bGU9XCJcXCcnK29iai50aXRsZSsnXFwnXCIgdHlwZT1cIlxcJycrIG9iai5pbnB1dF90eXBlICsnXFwnXCIgdmFsdWU9XCJcXCcnK19kYXRhLmFkZHJlc3Nba2V5XSsnXFwnXCInICsgKCBpc19yZXF1aXJlZCA/ICcgcmVxdWlyZWQnIDogJycgKSArICc+PC9ib3NzeS1pbnB1dD4nO1xyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIHRleHRBcmVhOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuICc8dGV4dGFyZWE+PC90ZXh0YXJlYT4nO1xyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIGNoZWNrYm94OiBmdW5jdGlvbihvYmope1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAnPGRpdiBjbGFzcz1cImNoZWNrYm94XCI+PGxhYmVsPjxpbnB1dCB0eXBlPVwiY2hlY2tib3hcIj4nK29iai50aXRsZSsnPC9sYWJlbD48L2Rpdj4nO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICBmdW5jdGlvbiBzZXREYXRhKGRhdGEpIHtcclxuICAgICAgICAgICAgdmFyIHJlc3VsdCA9ICRkYXRhLmdldERhdGEoZGF0YSk7XHJcbiAgICAgICAgICAgIGlmKCBhbmd1bGFyLmlzRnVuY3Rpb24oIHJlc3VsdC50aGVuICkgJiYgYW5ndWxhci5pc0Z1bmN0aW9uKCByZXN1bHQuY2F0Y2ggKSAmJiBhbmd1bGFyLmlzRnVuY3Rpb24oIHJlc3VsdC5maW5hbGx5ICkgKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgX2RhdGEgPSByZXN1bHQ7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmdW5jdGlvbiBzZXRTY2hlbWEoc2NoZW1hKSB7XHJcbiAgICAgICAgICAgIF9zY2hlbWEgPSAkc2NoZW1hLmdldFNjaGVtYShzY2hlbWEpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZnVuY3Rpb24gYnVpbGRUZW1wbGF0ZShzY2hlbWFQYXJ0LCBwYXJlbnRLZXksIHJlcXVpcmVkKSB7XHJcbiAgICAgICAgICAgIHZhciB0ZW1wbGF0ZSA9ICcnLFxyXG4gICAgICAgICAgICAgICAgZnVsbEtleSA9ICcnO1xyXG4gICAgICAgICAgICBhbmd1bGFyLmZvckVhY2goc2NoZW1hUGFydCwgZnVuY3Rpb24odmFsdWUsIGtleSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKHZhbHVlLnR5cGUpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhmdWxsS2V5ICsgJyBpcyAnKyB2YWx1ZS50eXBlKTtcclxuICAgICAgICAgICAgICAgICAgICBzd2l0Y2ggKHZhbHVlLnR5cGUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAnb2JqZWN0JzpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciByZXF1aXJlZF9saXN0ID0gdHlwZW9mKCB2YWx1ZS5yZXF1aXJlZCApICE9PSAndW5kZWZpbmVkJyA/IHZhbHVlLnJlcXVpcmVkIDogbnVsbDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlICs9IGJ1aWxkVGVtcGxhdGUodmFsdWUucHJvcGVydGllcywgZnVsbEtleSwgcmVxdWlyZWRfbGlzdCApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ2FycmF5JzpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlICs9IGJ1aWxkVGVtcGxhdGUodmFsdWUuaXRlbXMucHJvcGVydGllcywgZnVsbEtleSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAnbnVtYmVyJyB8fCAnaW50ZWdlcic6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0ZW1wbGF0ZSArPSBfaXRlbVRlbXBsYXRlLm51bWJlcih2YWx1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAnc3RyaW5nJzpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBpc19yZXF1aXJlZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYoIHJlcXVpcmVkICYmIHJlcXVpcmVkLmluZGV4T2Yoa2V5KSAhPT0gLTEgKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaXNfcmVxdWlyZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGUgKz0gX2l0ZW1UZW1wbGF0ZS50ZXh0KHZhbHVlLCBrZXksIGlzX3JlcXVpcmVkKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlICdib29sZWFuJzpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlICs9IF9pdGVtVGVtcGxhdGUuY2hlY2tib3godmFsdWUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9LCB0aGlzKTtcclxuICAgICAgICAgICAgcmV0dXJuIHRlbXBsYXRlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgcmVzdHJpY3Q6ICdFJyxcclxuICAgICAgICAgICAgcmVwbGFjZTogdHJ1ZSxcclxuICAgICAgICAgICAgdGVtcGxhdGU6ICcnLFxyXG4gICAgICAgICAgICBzY29wZToge1xyXG4gICAgICAgICAgICAgICAgY29uZmlnOic9JywgLy9DcmVhdGUgc2NvcGUgaXNvbGF0aW9uIHdpdGggYmktZGlyZWN0aW9uYWwgYmluZGluZyxcclxuICAgICAgICAgICAgICAgIHRpdGxlOiAnPSdcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgbGluazogZnVuY3Rpb24gKHNjb3BlLCBlbGVtZW50LCBhdHRyaWJ1dGVzKSB7XHJcbiAgICAgICAgICAgICAgICBzY29wZS5jb25maWcub3B0aW9ucyA9IGFuZ3VsYXIuZXh0ZW5kKF9vcHRpb25zLCBzY29wZS5jb25maWcub3B0aW9ucyk7XHJcblxyXG4gICAgICAgICAgICAgICAgdmFyIHByb21pc2UgPSBzZXREYXRhKHNjb3BlLmNvbmZpZy5kYXRhKTtcclxuICAgICAgICAgICAgICAgIHNldFNjaGVtYShzY29wZS5jb25maWcuc2NoZW1hKTtcclxuICAgICAgICAgICAgICAgIGlmKCBwcm9taXNlICkge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vdG9kbzogc2V0IGRpcmVjdGl2ZSB0byBsb2FkaW5nIHN0YXRlXHJcbiAgICAgICAgICAgICAgICAgICAgcHJvbWlzZS50aGVuKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBmdW5jdGlvbihyZXN1bHQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vdG9kbzogc2V0IGRpcmVjdGl2ZSB0byBsb2FkZWQgc3RhdGVcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9kYXRhID0gcmVzdWx0O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxlbWVudC5odG1sKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICc8Zm9ybSBub3ZhbGlkYXRlIGNsYXNzPVwie3tjb25maWcub3B0aW9ucy50aGVtZX19XCI+JytcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnPGRpdiBjbGFzcz1cImJhbm5lciBwYWdlLWhlYWRlclwiPjxoMz57e2NvbmZpZy5vcHRpb25zLmhlYWRlcn19PC9oMz48L2Rpdj4nK1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBidWlsZFRlbXBsYXRlKF9zY2hlbWEpICtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJzxidXR0b24gbmctaWY9XCJjb25maWcub3B0aW9ucy5idXR0b25cIj57e2NvbmZpZy5vcHRpb25zLmJ1dHRvbn19PC9idXR0b24+JyArXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJzxkaXYgY2xhc3M9XCJwYWdlLWZvb3RlclwiPjxoMz57e2NvbmZpZy5vcHRpb25zLmZvb3Rlcn19PC9oMz48L2Rpdj4nK1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICc8L2Zvcm0+J1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICRjb21waWxlKGVsZW1lbnQuY29udGVudHMoKSkoc2NvcGUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBmdW5jdGlvbihyZWFzb24pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vdG9kbzogc2V0IGRpcmVjdGl2ZSB0byBlcnJvciBzdGF0ZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICBlbGVtZW50Lmh0bWwoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICc8Zm9ybSBub3ZhbGlkYXRlIGNsYXNzPVwie3tjb25maWcub3B0aW9ucy50aGVtZX19XCI+TE9BRElORy4uLjwvZm9ybT4nXHJcbiAgICAgICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgICAgICAgICAkY29tcGlsZShlbGVtZW50LmNvbnRlbnRzKCkpKHNjb3BlKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGVsZW1lbnQuaHRtbChcclxuICAgICAgICAgICAgICAgICAgICAgICAgJzxmb3JtIG5vdmFsaWRhdGUgY2xhc3M9XCJ7e2NvbmZpZy5vcHRpb25zLnRoZW1lfX1cIj4nK1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAnPGRpdiBjbGFzcz1cImJhbm5lciBwYWdlLWhlYWRlclwiPjxoMz57e2NvbmZpZy5vcHRpb25zLmhlYWRlcn19PC9oMz48L2Rpdj4nK1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnVpbGRUZW1wbGF0ZShfc2NoZW1hKSArXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAnPGJ1dHRvbiBuZy1pZj1cImNvbmZpZy5vcHRpb25zLmJ1dHRvblwiPnt7Y29uZmlnLm9wdGlvbnMuYnV0dG9ufX08L2J1dHRvbj4nICtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJzxkaXYgY2xhc3M9XCJwYWdlLWZvb3RlclwiPjxoMz57e2NvbmZpZy5vcHRpb25zLmZvb3Rlcn19PC9oMz48L2Rpdj4nK1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAnPC9mb3JtPidcclxuICAgICAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICAgICAgICAgICRjb21waWxlKGVsZW1lbnQuY29udGVudHMoKSkoc2NvcGUpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG5cclxuICAgIH1dKVxyXG47IiwiYW5ndWxhci5tb2R1bGUoJ2Jvc3N5LmlucHV0JywgW10pXHJcbiAgICAucnVuKGZ1bmN0aW9uKCR0ZW1wbGF0ZUNhY2hlKXtcclxuICAgICAgICAkdGVtcGxhdGVDYWNoZS5wdXQoJ2Jvc3N5LWlucHV0Lmh0bWwnLCAnPGRpdiBjbGFzcz1cImZvcm0tZ3JvdXAgYm9zc3ktaW5wdXRcIj48bGFiZWwgZm9yPVwiXCI+e3t0aXRsZX19PC9sYWJlbD48aW5wdXQgdHlwZT1cInt7dHlwZX19XCIgY2xhc3M9XCJmb3JtLWNvbnRyb2xcIiBwbGFjZWhvbGRlcj1cIlwiIHZhbHVlPVwie3t2YWx1ZX19XCIvPjxzcGFuPjwvc3Bhbj48L2Rpdj4nKTtcclxuICAgIH0pXHJcbiAgICAuZGlyZWN0aXZlKCdib3NzeUlucHV0JyxbJyRjb21waWxlJywnJGh0dHAnLCckc2NoZW1hJywnJGRhdGEnLCckdGVtcGxhdGVDYWNoZScsIGZ1bmN0aW9uICgkY29tcGlsZSwgJGh0dHAsICRzY2hlbWEsICRkYXRhLCAkdGVtcGxhdGVDYWNoZSkge1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIHJlc3RyaWN0OiAnRScsXHJcbiAgICAgICAgICAgIHJlcGxhY2U6IHRydWUsXHJcbiAgICAgICAgICAgIHNjb3BlOiB7XHJcbiAgICAgICAgICAgICAgICB0aXRsZTogJz0nLFxyXG4gICAgICAgICAgICAgICAgdmFsdWU6ICc9JyxcclxuICAgICAgICAgICAgICAgIHR5cGU6ICc9JyxcclxuICAgICAgICAgICAgICAgIHJlcXVpcmVkOiAnPSdcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgdGVtcGxhdGU6ICR0ZW1wbGF0ZUNhY2hlLmdldCgnYm9zc3ktaW5wdXQuaHRtbCcpXHJcbiAgICAgICAgfTtcclxuICAgIH1dKTsiLCJ2YXIgYXBwID0gYW5ndWxhci5tb2R1bGUoJ2Jvc3N5Lm51bWVyaWN0ZXh0Ym94JyxbXSk7XHJcblxyXG5cclxuYXBwLmNvbnRyb2xsZXIoJ2Jvc3N5bnVtZXJpY0N0cmwnLGZ1bmN0aW9uKCRzY29wZSl7XHJcbiAgICB2YXIgc3ltYm9scz1bJyQnLCclJywnbGJzJ107XHJcbiAgICB2YXIgaW5pdGlhbFZhbHVlPTA7XHJcblxyXG5cclxuICAgIHZhciBrZXkgPSB7XHJcbiAgICAgICAgcHJpY2U6MCxcclxuICAgICAgICB3ZWlnaHQ6MCxcclxuICAgICAgICBkaXNjb3VudDowLFxyXG4gICAgICAgIHN0b2NrOjBcclxuICAgIH07XHJcblxyXG5cclxuICAgICRzY29wZS5wID0gc3ltYm9sc1swXSArIGluaXRpYWxWYWx1ZTtcclxuICAgICRzY29wZS53ID0gaW5pdGlhbFZhbHVlICsgc3ltYm9sc1syXTtcclxuICAgICRzY29wZS5kID0gaW5pdGlhbFZhbHVlICsgc3ltYm9sc1sxXTtcclxuICAgICRzY29wZS5zID0gaW5pdGlhbFZhbHVlO1xyXG5cclxuICAgICRzY29wZS5pbmNyZW1lbnQgPSBmdW5jdGlvbihhKXtcclxuICAgICAgICBzd2l0Y2goYSl7XHJcbiAgICAgICAgICAgIGNhc2UgJ3ByaWNlJzpcclxuICAgICAgICAgICAgICAgIGtleS5wcmljZSsrO1xyXG4gICAgICAgICAgICAgICAgJHNjb3BlLnAgPSBzeW1ib2xzWzBdICsga2V5LnByaWNlO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgJ3dlaWdodCc6XHJcbiAgICAgICAgICAgICAgICBrZXkud2VpZ2h0Kys7XHJcbiAgICAgICAgICAgICAgICAkc2NvcGUudz1rZXkud2VpZ2h0ICsgc3ltYm9sc1syXTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlICdkaXNjb3VudCc6XHJcbiAgICAgICAgICAgICAgICBrZXkuZGlzY291bnQrKztcclxuICAgICAgICAgICAgICAgICRzY29wZS5kID0ga2V5LmRpc2NvdW50ICsgc3ltYm9sc1sxXTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlICdzdG9jayc6XHJcbiAgICAgICAgICAgICAgICBrZXkuc3RvY2srKztcclxuICAgICAgICAgICAgICAgICRzY29wZS5zPWtleS5zdG9jaztcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuICAgICRzY29wZS5kZWNyZW1lbnQgPSBmdW5jdGlvbihhKXtcclxuXHJcbiAgICAgICAgc3dpdGNoKGEpe1xyXG4gICAgICAgICAgICBjYXNlICdwcmljZSc6XHJcbiAgICAgICAgICAgICAgICBpZihrZXkucHJpY2U+MClcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBrZXkucHJpY2UtLTtcclxuICAgICAgICAgICAgICAgICAgICAkc2NvcGUucCA9IHN5bWJvbHNbMF0gKyBrZXkucHJpY2U7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAnd2VpZ2h0JzpcclxuICAgICAgICAgICAgICAgIGlmKGtleS53ZWlnaHQ+MCl7XHJcbiAgICAgICAgICAgICAgICAgICAga2V5LndlaWdodC0tO1xyXG4gICAgICAgICAgICAgICAgICAgICRzY29wZS53PWtleS53ZWlnaHQgKyBzeW1ib2xzWzJdO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgJ2Rpc2NvdW50JzpcclxuICAgICAgICAgICAgICAgIGlmKGtleS5kaXNjb3VudD4wKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGtleS5kaXNjb3VudC0tO1xyXG4gICAgICAgICAgICAgICAgICAgICRzY29wZS5kID0ga2V5LmRpc2NvdW50KyBzeW1ib2xzWzFdO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgJ3N0b2NrJzpcclxuICAgICAgICAgICAgICAgIGlmKGtleS5zdG9jaz4wKXtcclxuICAgICAgICAgICAgICAgICAgICBrZXkuc3RvY2stLTtcclxuICAgICAgICAgICAgICAgICAgICAkc2NvcGUucz1rZXkuc3RvY2s7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9O1xyXG5cclxufSk7XHJcblxyXG5cclxuYXBwLmRpcmVjdGl2ZSgnYm9zc3ludW1lcmljdGV4dGJveCcsZnVuY3Rpb24oKXtcclxuICAgIHJldHVybntcclxuICAgICAgICBjb250cm9sbGVyOidib3NzeW51bWVyaWNDdHJsJyxcclxuICAgICAgICByZXN0cmljdDonRScsXHJcbiAgICAgICAgdHJhbnNjbHVkZTp0cnVlLFxyXG4gICAgICAgIHRlbXBsYXRlVXJsOidib3NzeS5udW1lcmljdGV4dGJveC5odG1sJ1xyXG5cclxuICAgIH07XHJcbn0pOyIsImFuZ3VsYXIubW9kdWxlKCdib3NzeS5zY2hlbWEnLCBbXSlcclxuICAgIC5mYWN0b3J5KCckc2NoZW1hJywgWyckcScsICckaHR0cCcsIGZ1bmN0aW9uICgkcSwgJGh0dHApIHtcclxuXHJcbiAgICAgICAgZnVuY3Rpb24gX2dldFNjaGVtYSAoc2NoZW1hKSB7XHJcbiAgICAgICAgICAgIGlmIChhbmd1bGFyLmlzU3RyaW5nKHNjaGVtYSkpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBfZ2V0UmVtb3RlU2NoZW1hKHNjaGVtYSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSBpZiAoYW5ndWxhci5pc09iamVjdChzY2hlbWEpKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gc2NoZW1hO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgLy9UT0RPOiByZXBsYWNlIGVycm9yIG1lc3NhZ2Ugd2l0aCBvbmxpbmUgZG9jIGxpbmsgbGlrZSBuZyBlcnJvcnNcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ2RpcmVjdGl2ZS5ib3NzeUZvcm06IG5vIHNjaGVtYSB1cmwgb3Igb2JqZWN0IGdpdmVuJyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIF9nZXRSZW1vdGVTY2hlbWEoc2NoZW1hKSB7XHJcbiAgICAgICAgICAgIHZhciBkZWZlcnJlZCA9ICRxLmRlZmVyKCk7XHJcblxyXG4gICAgICAgICAgICAkaHR0cC5nZXQoIHNjaGVtYSApXHJcbiAgICAgICAgICAgICAgICAuc3VjY2VzcyggZnVuY3Rpb24oIGRhdGEgKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYoIGFuZ3VsYXIuaXNPYmplY3QoIGRhdGEgKSApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGVmZXJyZWQucmVzb2x2ZShkYXRhKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vVE9ETzogcmVwbGFjZSBlcnJvciBtZXNzYWdlIHdpdGggb25saW5lIGRvYyBsaW5rIGxpa2UgbmcgZXJyb3JzXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlamVjdCgnZGlyZWN0aXZlLmJvc3N5Rm9ybTogR0VUIHJlcXVlc3QgdG8gdXJsIGRpZCBub3QgcHJvZHVjZSBzY2hlbWEgb2JqZWN0Jyk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5lcnJvciggZnVuY3Rpb24oZGF0YSwgc3RhdHVzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy9UT0RPOiByZXBsYWNlIGVycm9yIG1lc3NhZ2Ugd2l0aCBvbmxpbmUgZG9jIGxpbmsgbGlrZSBuZyBlcnJvcnNcclxuICAgICAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZWplY3QoJ2RpcmVjdGl2ZS5ib3NzeUZvcm06IEdFVCByZXF1ZXN0IHRvIHVybCBcIicgKyBzY2hlbWEgKyAnXCIgZmFpbGVkIHdpdGggc3RhdHVzIFwiJyArIHN0YXR1cyArICdcIicpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gZGVmZXJyZWQucHJvbWlzZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIGdldFNjaGVtYTogX2dldFNjaGVtYVxyXG4gICAgICAgIH07XHJcbiAgICB9XSlcclxuO1xyXG4iLCIvKlRoaXMgaXMgYSBzbGlkZXIgd2lkZ2V0IGNyZWF0ZWQgaW4gYW5ndWxhciBhcyBwYXJ0IG9mIHRoZSBCb3NzeVVJIHdpZGdldHMuXHJcbiAqIFRoZSBlYXNpZXN0IHdheSB0byB1c2UgdGhlIHNsaWRlciBpcyB0byBpbmNsdWRlIGl0IGluIHlvdXIgSFRNTCBhbmQgdGhlblxyXG4gKiBjcmVhdGUgYSB0YWcgPGJvc3N5LXNsaWRlcj48L2Jvc3N5LXNsaWRlcj4uIFRoaXMgd2lkZ2V0IHRha2UgaW4gc2V2ZXJhbFxyXG4gKiB3YXlzIHRvIGN1c3RvbWl6ZS4gTGlzdCBvZiBjdXN0b21pemF0aW9ucyBhdmFpbGFibGUuXHJcbiAqIG1heCAgICAgICAgICAgICAgZGVmYXVsdHMgdG8gMTAwXHJcbiAqIG1pbiAgICAgICAgICAgICAgZGVmYXVsdHMgdG8gMVxyXG4gKiB3aWR0aCAgICAgICAgICAgIGRlZmF1bHRzIHRvIDI1MHB4XHJcbiAqIGJhcmZpbGxjb2xvciAgICAgZGVmYXVsdHMgdG8gZGFya2JsdWU6IG11c3QgYmUgcGFzc2VkIGFzIGhleGFkZWNpbWFsIGNvbG9yIGZvcm1hdCAjMDAwMDAwXHJcbiAqIGJhcmVtcHR5Y29sb3IgICAgZGVmYXVsdHMgdG8gbGlnaHRncmV5XHJcbiAqIGJ1dHRvbmNvbG9yICAgICAgZGVmYXVsdHMgdG8gcmVkXHJcbiAqIHN0ZXAgICAgICAgICAgICAgZGVmYXVsdHMgdG8gcmVkXHJcbiAqIG9yaWVudGF0aW9uICAgICAgZGVmYXVsdHMgdG8gaG9yaXpvbnRhbFxyXG4gKiBleC5cclxuICogPGJvc3N5LXNsaWRlciBtYXg9XCIyMFwiIG1pbj1cIi01XCIgb3JpZW50YXRpb249XCJ2ZXJ0aWNhbFwiPjwvYm9zc3ktc2xpZGVyPiovXHJcbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xyXG5cclxudmFyIGFwcCA9IGFuZ3VsYXIubW9kdWxlKCdib3NzeS5zbGlkZXInLCBbXSk7XHJcbmFwcC5jb250cm9sbGVyKCdTbGlkZXJDb250cm9sbGVyJywgWyckc2NvcGUnLCBmdW5jdGlvbiAoJHNjb3BlKSB7XHJcbiAgICAvL3RoZXNlIGFyZSBvdXIgZGVmYXVsdCB2YWx1ZXMgYW5kIGFyZSB0aGUgdmFyaWFibGVzIHRoYXQgY2FuIGJlIGNoYW5nZWQgYnkgdXNlciBvZiBvdXIgd2lkZ2V0c1xyXG4gICAgJHNjb3BlLm1heCA9IDEwMDtcclxuICAgICRzY29wZS52YWx1ZSA9IDA7XHJcbiAgICAkc2NvcGUubWluID0gMTtcclxuICAgICRzY29wZS5maWxsV2lkdGggPSAwO1xyXG4gICAgJHNjb3BlLmVtcHRXaWR0aCA9IDA7XHJcbiAgICAkc2NvcGUuYmFyV2lkdGggPSAyNTA7XHJcbiAgICAkc2NvcGUuYmFyUGllY2UgPSAwO1xyXG4gICAgJHNjb3BlLnN0ZXAgPSAxO1xyXG4gICAgJHNjb3BlLmlzTW91c2VEb3duID0gMDtcclxuICAgICRzY29wZS55Q29yZCA9IDA7XHJcbiAgICAkc2NvcGUueENvcmQgPSAwO1xyXG4gICAgJHNjb3BlLm5ld1hDb3JkID0gMDtcclxuICAgICRzY29wZS5uZXdZQ29yZCA9IDA7XHJcbiAgICAkc2NvcGUub3JpZW50YXRpb24gPSBmYWxzZTtcclxuICAgICRzY29wZS5idXRTaXplID0gMTU7XHJcbiAgICAkc2NvcGUuYmFyZmlsbGNvbG9yID0gJyMwMDAwRkYnO1xyXG4gICAgJHNjb3BlLmJhcmVtcHR5Y29sb3IgPSAnI0QzRDNEMyc7XHJcbiAgICAkc2NvcGUuYnV0dG9uY29sb3IgPSAnI0ZGMDAwMCc7XHJcblxyXG5cclxuICAgIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xyXG5cclxuICAgIC8qbWFrZUJhcigpXHJcbiAgICAgKiBUaGlzIGNyZWF0ZXMgdGhlIGluaXRpYWwgZ3JhcGhpYyBvZiB0aGUgc2xpZGVyIGFuZCBlbnN1cmVzIGl0IGlzIGluIHRoZSBjb3JyZWN0IG9yZGVyXHJcbiAgICAgKiBDQyA9IDQgKi9cclxuICAgICRzY29wZS5tYWtlQmFyID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIC8vYnV0dG9uIHNob3VsZCBzaG93IHVwIGluIHRoZSBtaWRkbGUgbm93IG9yIGNsb3NlIHRvIGlmIHVuZXZlblxyXG4gICAgICAgICRzY29wZS52YWx1ZSA9IHBhcnNlSW50KCgkc2NvcGUubWF4ICsgJHNjb3BlLm1pbikgLyAyKTtcclxuICAgICAgICBmb3IgKHZhciBjdXJyZW50ID0gJHNjb3BlLm1pbjsgY3VycmVudCA8PSAkc2NvcGUubWF4OyBjdXJyZW50KyspIHtcclxuICAgICAgICAgICAgaWYgKGN1cnJlbnQgPCAkc2NvcGUudmFsdWUpIHtcclxuICAgICAgICAgICAgICAgICRzY29wZS5maWxsV2lkdGgrKztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoY3VycmVudCA+ICRzY29wZS52YWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgJHNjb3BlLmVtcHRXaWR0aCsrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgICRzY29wZS5uZ01vZGVsID0gJHNjb3BlLnZhbHVlO1xyXG4gICAgICAgIHJldHVybjtcclxuICAgIH07XHJcbiAgICAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cclxuXHJcbiAgICAvKmluY3JlYXNlKClcclxuICAgICAqIFRoaXMgY2hlY2tzIGJvdW5kcyB3aGVuIGF0dGVtcHRpbmcgdG8gaW5jcmVhc2UgdGhlIHZhbHVlIGFuZCBtb3ZlcyB0aGUgcG9zaXRpb25cclxuICAgICAqIG9mIHRoZSBzbGlkZXIgYnV0dG9uIGFuZCB1cGRhdGVzIHRoZSB2YWx1ZS5cclxuICAgICAqIENDID0gMiovXHJcbiAgICAkc2NvcGUuaW5jcmVhc2UgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgaWYgKCRzY29wZS52YWx1ZSA8ICRzY29wZS5tYXgpIHtcclxuICAgICAgICAgICAgJHNjb3BlLnZhbHVlID0gJHNjb3BlLnZhbHVlICsgMTtcclxuICAgICAgICAgICAgJHNjb3BlLmZpbGxXaWR0aCsrO1xyXG4gICAgICAgICAgICAkc2NvcGUuZW1wdFdpZHRoLS07XHJcbiAgICAgICAgICAgICRzY29wZS5uZ01vZGVsID0gJHNjb3BlLnZhbHVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm47XHJcbiAgICB9O1xyXG4gICAgLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXHJcblxyXG4gICAgLypidXRJbmNyZWFzZSgpXHJcbiAgICAgKiBUaGlzIGZ1bmN0aW9uIGFsbG93cyB0aGUgc2xpZGVyIHRvIGluY3JlYXNlIGluIGluY3JlbWVudHMuXHJcbiAgICAgKiBDQyA9IDEqL1xyXG4gICAgJHNjb3BlLmJ1dEluY3JlYXNlID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHZhciBpID0gMDtcclxuICAgICAgICBmb3IgKGkgPSAwOyBpIDwgJHNjb3BlLnN0ZXA7IGkrKykge1xyXG4gICAgICAgICAgICAkc2NvcGUuaW5jcmVhc2UoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgfTtcclxuICAgIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xyXG5cclxuICAgIC8qZGVjcmVhc2UoKVxyXG4gICAgICogVGhpcyBjaGVja3MgYm91bmRzIHdoZW4gYXR0ZW1wdGluZyB0byBkZWNyZWFzZSB0aGUgdmFsdWUgYW5kIG1vdmVzIHRoZSBwb3NpdGlvblxyXG4gICAgICogb2YgdGhlIHNsaWRlciBidXR0b24gYW5kIHVwZGF0ZXMgdGhlIHZhbHVlLlxyXG4gICAgICogQ0MgPSAyKi9cclxuICAgICRzY29wZS5kZWNyZWFzZSA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBpZiAoJHNjb3BlLnZhbHVlID4gJHNjb3BlLm1pbikge1xyXG4gICAgICAgICAgICAkc2NvcGUudmFsdWUgPSAkc2NvcGUudmFsdWUgLSAxO1xyXG4gICAgICAgICAgICAkc2NvcGUuZmlsbFdpZHRoLS07XHJcbiAgICAgICAgICAgICRzY29wZS5lbXB0V2lkdGgrKztcclxuICAgICAgICAgICAgJHNjb3BlLm5nTW9kZWwgPSAkc2NvcGUudmFsdWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybjtcclxuICAgIH07XHJcbiAgICAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cclxuXHJcbiAgICAvKmJ1dERlY3JlYXNlKClcclxuICAgICAqIFRoaXMgZnVuY3Rpb24gYWxsb3dzIHRoZSBzbGlkZXIgdG8gZGVjcmVhc2UgaW4gaW5jcmVtZW50c1xyXG4gICAgICogQ0MgPSAxKi9cclxuICAgICRzY29wZS5idXREZWNyZWFzZSA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB2YXIgaSA9IDA7XHJcbiAgICAgICAgZm9yIChpID0gMDsgaSA8ICRzY29wZS5zdGVwOyBpKyspIHtcclxuICAgICAgICAgICAgJHNjb3BlLmRlY3JlYXNlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybjtcclxuICAgIH07XHJcbiAgICAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cclxuXHJcbiAgICAvKmtleUJpbmQoJGV2ZW50KVxyXG4gICAgICogVGhpcyBmdW5jdGlvbiBpcyB0byBiaW5kIHRoZSBkZWNyZWFzZSBhbmQgaW5jcmVhc2UgZnVuY3Rpb24gd2l0aCB0aGUgYXJyb3cga2V5c1xyXG4gICAgICogQ0MgPSA1Ki9cclxuICAgICRzY29wZS5rZXlCaW5kID0gZnVuY3Rpb24gKGV2KSB7XHJcbiAgICAgICAgJHNjb3BlLnByZXNzZWQgPSBldi53aGljaDtcclxuICAgICAgICAvL0lmIGFycm93IGtleShMZWZ0IG9yIERvd24pIGlzIHByZXNzZWQgdGhlbiBjYWxsIHRoZSBkZWNyZWFzZSgpIGZ1bmN0aW9uIHRvIGRlY3JlYXNlIHRoZSB2YWx1ZS5cclxuICAgICAgICBpZiAoJHNjb3BlLnByZXNzZWQgPT09IDM3IHx8ICRzY29wZS5wcmVzc2VkID09PSA0MCkge1xyXG4gICAgICAgICAgICAkc2NvcGUuYnV0RGVjcmVhc2UoKTtcclxuXHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vc2FtZSBhcyBhYm92ZSBidXQgZm9yIFVwIG9yIFJpZ2h0IHRvIGluY3JlYXNlIHRoZSB2YWx1ZS5cclxuICAgICAgICBpZiAoJHNjb3BlLnByZXNzZWQgPT09IDM4IHx8ICRzY29wZS5wcmVzc2VkID09PSAzOSkge1xyXG4gICAgICAgICAgICAkc2NvcGUuYnV0SW5jcmVhc2UoKTtcclxuXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybjtcclxuICAgIH07XHJcbiAgICAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cclxuXHJcbiAgICAvKmdyZXlDbGljaygpXHJcbiAgICAgKiBUaGlzIGZ1bmN0aW9uIGlzIHRvIGFsbG93IHRoZSB2YWx1ZSB0byBiZSBjaGFuZ2VkIHdoZW4gY2xpY2tpbmcgb24gdGhlIGJhclxyXG4gICAgICogQ0MgPSAxKi9cclxuICAgICRzY29wZS5ncmV5Q2xpY2sgPSBmdW5jdGlvbiAoZXZlbnQpIHtcclxuICAgICAgICAvL1doZW4gY2xpY2sgb24gdGhlIGVtcHR5IGJhciB0aGUgYmFyIHdpbGwgaW5jcmVhc2VcclxuICAgICAgICAkc2NvcGUuYnV0SW5jcmVhc2UoKTtcclxuXHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgfTtcclxuICAgIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xyXG5cclxuICAgIC8qYmFyQ2xpY2soKVxyXG4gICAgICogVGhpcyBmdW5jdGlvbiBpcyB0byBhbGxvdyB0aGUgdmFsdWUgdG8gYmUgY2hhbmdlZCB3aGVuIGNsaWNraW5nIG9uIHRoZSBiYXJcclxuICAgICAqIENDID0gMSovXHJcbiAgICAkc2NvcGUuYmFyQ2xpY2sgPSBmdW5jdGlvbiAoZXZlbnQpIHtcclxuICAgICAgICAvL1doZW4gY2xpY2sgb24gdGhlIEZpbGxlZCB1cCBjb2xvciBzaWRlIHRoZSBiYXIgd2lsbCBkZWNyZWFzZVxyXG4gICAgICAgICRzY29wZS5idXREZWNyZWFzZSgpO1xyXG5cclxuICAgICAgICByZXR1cm47XHJcbiAgICB9O1xyXG4gICAgLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXHJcblxyXG4gICAgLypkcmFnKCRldmVudClcclxuICAgICAqIFRoaXMgZnVuY3Rpb24gYWxsb3dzIHRoZSBidXR0b24gdG8gZHJhZyBieSBmaW5kaW5nIGl0cyBsb2NhdGlvbiB0aGVuIGNoZWNrcyBpdCBhZ2FpbnN0IGl0cyBvcmlnaW5hbCBsb2NhdGlvblxyXG4gICAgICogYW5kIGlmIGl0IGlzIGRpc3RhbmNlIGlzIGdyZWF0ZXIgdGhhbiB0aGUgc2l6ZSBvZiBhIGJhcnBpZWNlIHVwZGF0ZSB0aGUgZ3JhcGhpYyBhbmQgdmFsdWVcclxuICAgICAqIENDID0gOSovXHJcbiAgICAkc2NvcGUuZHJhZyA9IGZ1bmN0aW9uIChldmVudCkge1xyXG5cclxuICAgICAgICAvL2dyYWIgdGhlIG1vdXNlIGxvY2F0aW9uXHJcbiAgICAgICAgdmFyIHggPSBldmVudC5jbGllbnRYO1xyXG4gICAgICAgIHZhciB5ID0gZXZlbnQuY2xpZW50WTtcclxuICAgICAgICAvL2NoZWNrIGlmIHRoZSBtb3VzZSBpcyBiZWluZyBoZWxkIGRvd25cclxuICAgICAgICBpZiAoJHNjb3BlLmlzTW91c2VEb3duKSB7XHJcbiAgICAgICAgICAgIC8vY2hlY2sgdGhlIG9yaWVudGF0aW9uXHJcbiAgICAgICAgICAgIGlmICgkc2NvcGUub3JpZW50YXRpb24pIHtcclxuICAgICAgICAgICAgICAgIC8vaWYgdGhpcyBpcyB0aGUgZmlyc3QgdGltZSB5b3UgY2xpY2tlZCBkb3duIGdldCByZWFkeSB0byBtb3ZlIGl0XHJcbiAgICAgICAgICAgICAgICBpZiAoJHNjb3BlLnlDb3JkID09PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgJHNjb3BlLnlDb3JkID0geTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vY2hhbmdlIHRoZSBsb2NhdGlvbiBvZiB0aGUgc2xpZGVyIGFmdGVyIGVub3VnaCBtb3ZlbWVudFxyXG4gICAgICAgICAgICAgICAgICAgICRzY29wZS5uZXdZQ29yZCA9IHk7XHJcbiAgICAgICAgICAgICAgICAgICAgd2hpbGUgKCgkc2NvcGUubmV3WUNvcmQgLSAkc2NvcGUueUNvcmQpID4gJHNjb3BlLmJhclBpZWNlIC8gMikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAkc2NvcGUueUNvcmQgKz0gJHNjb3BlLmJhclBpZWNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAkc2NvcGUuZGVjcmVhc2UoKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgd2hpbGUgKCgkc2NvcGUubmV3WUNvcmQgLSAkc2NvcGUueUNvcmQpIDwgLSgkc2NvcGUuYmFyUGllY2UgLyAyKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAkc2NvcGUueUNvcmQgLT0gJHNjb3BlLmJhclBpZWNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAkc2NvcGUuaW5jcmVhc2UoKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAvL2lmIHRoaXMgaXMgdGhlIGZpcnN0IHRpbWUgeW91IGNsaWNrZWQgZG93biBnZXQgcmVhZHkgdG8gbW92ZSBpdFxyXG4gICAgICAgICAgICAgICAgaWYgKCRzY29wZS54Q29yZCA9PT0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICRzY29wZS54Q29yZCA9IHg7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAvL2NoYW5nZSB0aGUgbG9jYXRpb24gb2YgdGhlIHNsaWRlciBhZnRlciBlbm91Z2ggbW92ZW1lbnRcclxuICAgICAgICAgICAgICAgICAgICAkc2NvcGUubmV3WENvcmQgPSB4O1xyXG4gICAgICAgICAgICAgICAgICAgIHdoaWxlICgoJHNjb3BlLm5ld1hDb3JkIC0gJHNjb3BlLnhDb3JkKSA+ICRzY29wZS5iYXJQaWVjZSAvIDIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJHNjb3BlLnhDb3JkICs9ICRzY29wZS5iYXJQaWVjZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJHNjb3BlLmluY3JlYXNlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIHdoaWxlICgoJHNjb3BlLm5ld1hDb3JkIC0gJHNjb3BlLnhDb3JkKSA8IC0oJHNjb3BlLmJhclBpZWNlIC8gMikpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJHNjb3BlLnhDb3JkIC09ICRzY29wZS5iYXJQaWVjZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJHNjb3BlLmRlY3JlYXNlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybjtcclxuICAgIH07XHJcbiAgICAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cclxuXHJcbiAgICAvKmRvd24oKVxyXG4gICAgICogVGhpcyBmdW5jdGlvbiBsb2dzIHdoZW4gdGhlIG1vdXNlIGlzIGRvd25cclxuICAgICAqIENDID0gMSovXHJcbiAgICAkc2NvcGUuZG93biA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAkc2NvcGUubmV3WENvcmQgPSAwO1xyXG4gICAgICAgICRzY29wZS54Q29yZCA9IDA7XHJcbiAgICAgICAgJHNjb3BlLm5ld1lDb3JkID0gMDtcclxuICAgICAgICAkc2NvcGUueUNvcmQgPSAwO1xyXG4gICAgICAgICRzY29wZS5pc01vdXNlRG93biA9IDE7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgfTtcclxuICAgIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xyXG5cclxuICAgIC8qZG93bigpXHJcbiAgICAgKiBUaGlzIGZ1bmN0aW9uIGxvZ3Mgd2hlbiB0aGUgbW91c2UgaXMgdXBcclxuICAgICAqIENDID0gMSovXHJcbiAgICAkc2NvcGUudXAgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgJHNjb3BlLm5ld1hDb3JkID0gMDtcclxuICAgICAgICAkc2NvcGUueENvcmQgPSAwO1xyXG4gICAgICAgICRzY29wZS5uZXdZQ29yZCA9IDA7XHJcbiAgICAgICAgJHNjb3BlLnlDb3JkID0gMDtcclxuICAgICAgICAkc2NvcGUuaXNNb3VzZURvd24gPSAwO1xyXG4gICAgICAgIHJldHVybjtcclxuICAgIH07XHJcbiAgICAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cclxufV0pO1xyXG5hcHAuZGlyZWN0aXZlKCdib3NzeVNsaWRlcicsIGZ1bmN0aW9uICgkY29tcGlsZSkge1xyXG4gICAgdmFyIG15VGVtcGxhdGU7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIC8vYWxsb3dzIHRoZSBzbGlkZXIgdG8gYmUgY3JlYXRlZCBhcyBhbmQgYXR0cmlidXRlIG9yIGVsZW1lbnQgPGJvc3N5LXNsaWRlcj48Ym9zc3ktc2xpZGVyPlxyXG4gICAgICAgIHJlc3RyaWN0OiAnQUUnLFxyXG4gICAgICAgIGNvbnRyb2xsZXI6ICdTbGlkZXJDb250cm9sbGVyJyxcclxuICAgICAgICBzY29wZToge1xyXG4gICAgICAgICAgICBuZ01vZGVsOiAnPSdcclxuICAgICAgICB9LFxyXG4gICAgICAgIC8qbGluazogZnVuY3Rpb246XHJcbiAgICAgICAgICogVGhpcyBhbGxvd3MgdXMgdG8gcHVsbCBpbiB0aGUgc2V0dGluZ3MgdGhlIHByb2dyYW1tZXIgd2FudHMgZm9yIHRoZSBzbGlkZXIgYW5kIHNldCB0aGluZ3MgY29ycmVjdGx5XHJcbiAgICAgICAgICogaXQgYWxzbyBpbml0aWFsaXplcyB0aGUgc2xpZGVyIGFuZCBhZGRzIHRoZSBjb3JyZWN0IG9yaWVudGF0aW9uIHRlbXBsYXRlIHRvIHRoZSBET00qL1xyXG4gICAgICAgIGxpbms6IHtcclxuICAgICAgICAgICAgcHJlOiBmdW5jdGlvbiAoc2NvcGUsIGlFbGVtLCBpQXR0cikge1xyXG4gICAgICAgICAgICAgICAgdmFyIHBhdHRlcm4gPSAvXiNbMC05YS1mQS1GXXs2fSQvOyAvL2N1cnJlbnRseSBhY2NlcHRzIGxvd2VyIGNhc2UgYS1mXHJcblxyXG4gICAgICAgICAgICAgICAgLy9jaGVja3MgdG8gc2VlIGlmIHRoZXJlIGlzIGEgbWF4IGF0dHJpYnV0ZVxyXG4gICAgICAgICAgICAgICAgaWYgKGlBdHRyLm1heCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHNjb3BlLm1heCA9IHBhcnNlSW50KGlBdHRyLm1heCk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGlzTmFOKHNjb3BlLm1heCkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2NvcGUubWF4ID0gMTA7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgLy9jaGVja3MgdG8gc2VlIGlmIHRoZXJlIGlzIGEgbWluIGF0dHJpYnV0ZVxyXG4gICAgICAgICAgICAgICAgaWYgKGlBdHRyLm1pbikge1xyXG4gICAgICAgICAgICAgICAgICAgIHNjb3BlLm1pbiA9IHBhcnNlSW50KGlBdHRyLm1pbik7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGlzTmFOKHNjb3BlLm1pbikpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2NvcGUubWluID0gMTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAvL2NoZWNrcyBmb3IgYmFyIGNvbG9yIGN1c3RvbWl6YXRpb25cclxuICAgICAgICAgICAgICAgIGlmIChpQXR0ci5iYXJmaWxsY29sb3IpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAocGF0dGVybi50ZXN0KGlBdHRyLmJhcmZpbGxjb2xvcikpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2NvcGUuYmFyZmlsbGNvbG9yID0gaUF0dHIuYmFyZmlsbGNvbG9yO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIC8vY2hlY2tzIGZvciBlbXB0eSBiYXIgY29sb3IgY3VzdG9taXphdGlvblxyXG5cclxuICAgICAgICAgICAgICAgIGlmIChpQXR0ci5iYXJlbXB0eWNvbG9yKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHBhdHRlcm4udGVzdChpQXR0ci5iYXJlbXB0eWNvbG9yKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzY29wZS5iYXJlbXB0eWNvbG9yID0gaUF0dHIuYmFyZW1wdHljb2xvcjtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICAgICAgICAgIGlmIChpQXR0ci5idXR0b25jb2xvcikge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChwYXR0ZXJuLnRlc3QoaUF0dHIuYnV0dG9uY29sb3IpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNjb3BlLmJ1dHRvbmNvbG9yID0gaUF0dHIuYnV0dG9uY29sb3I7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgLy9maW5kIHRoZSBzdGVwIHNpemUgZm9yIGJ1dHRvbiBjbGlja3NcclxuICAgICAgICAgICAgICAgIGlmIChpQXR0ci5zdGVwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2NvcGUuc3RlcCA9IGlBdHRyLnN0ZXA7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAvL2ZpbmQgdGhlIHByZWZlcnJlZCB0b3RhbCB3aWR0aCB0byB1c2UgZm9yIHRoZSBzbGlkZXJcclxuICAgICAgICAgICAgICAgIGlmIChpQXR0ci53aWR0aCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHNjb3BlLmJhcldpZHRoID0gaUF0dHIud2lkdGg7XHJcbiAgICAgICAgICAgICAgICAgICAgc2NvcGUuYmFyUGllY2UgPSAoc2NvcGUuYmFyV2lkdGggLyAoc2NvcGUubWF4IC0gc2NvcGUubWluKSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBzY29wZS5iYXJQaWVjZSA9IChzY29wZS5iYXJXaWR0aCAvIChzY29wZS5tYXggLSBzY29wZS5taW4pKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIC8vY2hlY2tzIHRvIHNlZSBpZiB0aGVyZSBpcyBhIG9yaWVudGF0aW9uIGF0dHJpYnV0ZSBpZiB0aGVyZSBpcyBzZXQgb3VyIHRlbXBsYXRlIHRvIHRoZSB2ZXJ0aWNhbCB0ZW1wbGF0ZVxyXG4gICAgICAgICAgICAgICAgaWYgKGlBdHRyLm9yaWVudGF0aW9uKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCd2ZXJ0aWNhbCcgPT09IGlBdHRyLm9yaWVudGF0aW9uKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNjb3BlLm9yaWVudGF0aW9uID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbXlUZW1wbGF0ZSA9ICc8ZGl2IG9uc2VsZWN0c3RhcnQ9XCJyZXR1cm4gZmFsc2U7XCIgb25kcmFnc3RhcnQ9XCJyZXR1cm4gZmFsc2U7XCJuZy1tb3VzZWxlYXZlPVwidXAoKVwiIG5nLW1vdXNlbW92ZT1cImRyYWcoJGV2ZW50KVwiPicgK1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAnPGRpdiBuZy1tb3VzZW1vdmU9XCJkcmFnKCRldmVudClcIiBuZy1tb3VzZXVwPVwidXAoKVwiIG5nLWNsaWNrPVwiZ3JleUNsaWNrKClcInN0eWxlPVwiY3Vyc29yOnBvaW50ZXI7bWFyZ2luLWxlZnQ6OXB4O3dpZHRoOjVweDtoZWlnaHQ6e3tiYXJQaWVjZSAqIGVtcHRXaWR0aH19cHg7YmFja2dyb3VuZC1jb2xvcjonICsgc2NvcGUuYmFyZW1wdHljb2xvciArICc7bWFyZ2luLWJvdHRvbTo0cHhcIj48L2Rpdj4nICtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJzxkaXYgbmctbW91c2Vtb3ZlPVwiZHJhZygkZXZlbnQpXCIgbmctbW91c2Vkb3duPVwiZG93bigpXCIgbmctbW91c2V1cD1cInVwKClcIiBvcmllbnRhdGlvbj1cInZlcnRpY2FsXCIgc3R5bGU9XCJjdXJzb3I6bnMtcmVzaXplO21hcmdpbi10b3A6LTRweDttYXJnaW4tbGVmdDo1cHg7d2lkdGg6MTVweDtoZWlnaHQ6MTVweDtiYWNrZ3JvdW5kLWNvbG9yOicgKyBzY29wZS5idXR0b25jb2xvciArICc7Ym9yZGVyLXJhZGl1czo1MCU7XCI+PC9kaXY+JyArXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICc8ZGl2IG5nLW1vdXNlbW92ZT1cImRyYWcoJGV2ZW50KVwiIG5nLW1vdXNldXA9XCJ1cCgpXCIgbmctY2xpY2s9XCJiYXJDbGljaygpXCJzdHlsZT1cImN1cnNvcjpwb2ludGVyO21hcmdpbi1sZWZ0OjlweDt3aWR0aDo1cHg7aGVpZ2h0Ont7YmFyUGllY2UgKiBmaWxsV2lkdGh9fXB4O2JhY2tncm91bmQtY29sb3I6JyArIHNjb3BlLmJhcmZpbGxjb2xvciArICc7bWFyZ2luLWJvdHRvbTo0cHhcIj48L2Rpdj4nICtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJzwvZGl2Pic7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBteVRlbXBsYXRlID0gJzxkaXYgb25zZWxlY3RzdGFydD1cInJldHVybiBmYWxzZTtcIiBvbmRyYWdzdGFydD1cInJldHVybiBmYWxzZTtcIiBuZy1tb3VzZWxlYXZlPVwidXAoKVwibmctbW91c2Vtb3ZlPVwiZHJhZygkZXZlbnQpXCI+JyArXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICc8ZGl2IG5nLW1vdXNlbW92ZT1cImRyYWcoJGV2ZW50KVwiIG5nLW1vdXNldXA9XCJ1cCgpXCIgbmctY2xpY2s9XCJiYXJDbGljaygpXCJzdHlsZT1cImN1cnNvcjpwb2ludGVyO2Rpc3BsYXk6aW5saW5lLWJsb2NrO3dpZHRoOnt7YmFyUGllY2UgKiBmaWxsV2lkdGh9fXB4O2hlaWdodDo1cHg7YmFja2dyb3VuZC1jb2xvcjonICsgc2NvcGUuYmFyZmlsbGNvbG9yICsgJzttYXJnaW4tYm90dG9tOjRweFwiPjwvZGl2PicgK1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAnPGRpdiBuZy1tb3VzZW1vdmU9XCJkcmFnKCRldmVudClcIiBuZy1tb3VzZWRvd249XCJkb3duKClcIiBuZy1tb3VzZXVwPVwidXAoKVwiIG9yaWVudGF0aW9uPVwiaG9yaXpvbnRhbFwiIHN0eWxlPVwiY3Vyc29yOmV3LXJlc2l6ZTtkaXNwbGF5OmlubGluZS1ibG9jazt3aWR0aDp7e2J1dFNpemV9fXB4O2hlaWdodDp7e2J1dFNpemV9fXB4O2JhY2tncm91bmQtY29sb3I6JyArIHNjb3BlLmJ1dHRvbmNvbG9yICsgJztib3JkZXItcmFkaXVzOjUwJTtcIj48L2Rpdj4nICtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJzxkaXYgbmctbW91c2Vtb3ZlPVwiZHJhZygkZXZlbnQpXCIgbmctbW91c2V1cD1cInVwKClcIiBuZy1jbGljaz1cImdyZXlDbGljaygpXCJzdHlsZT1cImN1cnNvcjpwb2ludGVyO2Rpc3BsYXk6aW5saW5lLWJsb2NrO3dpZHRoOnt7YmFyUGllY2UgKiBlbXB0V2lkdGh9fXB4O2hlaWdodDo1cHg7YmFja2dyb3VuZC1jb2xvcjonICsgc2NvcGUuYmFyZW1wdHljb2xvciArICc7bWFyZ2luLWJvdHRvbTo0cHhcIj48L2Rpdj4nICtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJzwvZGl2Pic7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy90aGlzIGJ1aWxkcyBvdXIgaG9yaXpvbnRhbCB0ZW1wbGF0ZVxyXG4gICAgICAgICAgICAgICAgICAgIG15VGVtcGxhdGUgPSAnPGRpdiBvbnNlbGVjdHN0YXJ0PVwicmV0dXJuIGZhbHNlO1wiIG9uZHJhZ3N0YXJ0PVwicmV0dXJuIGZhbHNlO1wiIG5nLW1vdXNlbGVhdmU9XCJ1cCgpXCJuZy1tb3VzZW1vdmU9XCJkcmFnKCRldmVudClcIj4nICtcclxuICAgICAgICAgICAgICAgICAgICAnPGRpdiBuZy1tb3VzZW1vdmU9XCJkcmFnKCRldmVudClcIiBuZy1tb3VzZXVwPVwidXAoKVwiIG5nLWNsaWNrPVwiYmFyQ2xpY2soKVwic3R5bGU9XCJjdXJzb3I6cG9pbnRlcjtkaXNwbGF5OmlubGluZS1ibG9jazt3aWR0aDp7e2JhclBpZWNlICogZmlsbFdpZHRofX1weDtoZWlnaHQ6NXB4O2JhY2tncm91bmQtY29sb3I6JyArIHNjb3BlLmJhcmZpbGxjb2xvciArICc7bWFyZ2luLWJvdHRvbTo0cHhcIj48L2Rpdj4nICtcclxuICAgICAgICAgICAgICAgICAgICAnPGRpdiBuZy1tb3VzZW1vdmU9XCJkcmFnKCRldmVudClcIiBuZy1tb3VzZWRvd249XCJkb3duKClcIiBuZy1tb3VzZXVwPVwidXAoKVwiIG9yaWVudGF0aW9uPVwiaG9yaXpvbnRhbFwiIHN0eWxlPVwiY3Vyc29yOmV3LXJlc2l6ZTtkaXNwbGF5OmlubGluZS1ibG9jazt3aWR0aDp7e2J1dFNpemV9fXB4O2hlaWdodDp7e2J1dFNpemV9fXB4O2JhY2tncm91bmQtY29sb3I6JyArIHNjb3BlLmJ1dHRvbmNvbG9yICsgJztib3JkZXItcmFkaXVzOjUwJTtcIj48L2Rpdj4nICtcclxuICAgICAgICAgICAgICAgICAgICAnPGRpdiBuZy1tb3VzZW1vdmU9XCJkcmFnKCRldmVudClcIiBuZy1tb3VzZXVwPVwidXAoKVwiIG5nLWNsaWNrPVwiZ3JleUNsaWNrKClcInN0eWxlPVwiY3Vyc29yOnBvaW50ZXI7ZGlzcGxheTppbmxpbmUtYmxvY2s7d2lkdGg6e3tiYXJQaWVjZSAqIGVtcHRXaWR0aH19cHg7aGVpZ2h0OjVweDtiYWNrZ3JvdW5kLWNvbG9yOicgKyBzY29wZS5iYXJlbXB0eWNvbG9yICsgJzttYXJnaW4tYm90dG9tOjRweFwiPjwvZGl2PicgK1xyXG4gICAgICAgICAgICAgICAgICAgICc8L2Rpdj4nO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgLy9XZSBzaG93IG91ciB0ZW1wbGF0ZSBhbmQgdGhlbiBjb21waWxlIGl0IHNvIHRoZSBET00ga25vd3MgYWJvdXQgb3VyIG5nIGZ1bmN0aW9uc1xyXG4gICAgICAgICAgICAgICAgaUVsZW0uaHRtbChteVRlbXBsYXRlKTtcclxuICAgICAgICAgICAgICAgICRjb21waWxlKGlFbGVtLmNvbnRlbnRzKCkpKHNjb3BlKTtcclxuICAgICAgICAgICAgICAgIC8vY3JlYXRlIHRoZSBpbml0aWFsIGJhclxyXG4gICAgICAgICAgICAgICAgc2NvcGUubWFrZUJhcigpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxufSk7XHJcblxyXG4iLCJhbmd1bGFyLm1vZHVsZSgnYm9zc3kudG9vbHRpcCcsIFtdKVxyXG4gICAgLmRpcmVjdGl2ZSgnYm9zc3lUb29sdGlwJywgZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgIC8vIFByaXZhdGUgbWVtYmVyIGFycmF5IGNvbnRhaW5pbmcgYWxsIGtub3duIHBvc2l0aW9uc1xyXG4gICAgICAgIHZhciBfcG9zID0gWyduJywnbmUnLCdlJywnc2UnLCdzJywnc3cnLCd3JywnbncnXTtcclxuXHJcbiAgICAgICAgLy8gTW92ZSB0aGUgdGlwIHRvIGEgY2VydGFpbiBwb3NpdGlvblxyXG4gICAgICAgIGZ1bmN0aW9uIF9tb3ZlVGlwKCRwYXJlbnQsICR0aXAsIGN1clBvcylcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlmKGN1clBvcyA9PT0gJ24nKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAkdGlwLnN0eWxlLmxlZnQgPSAkcGFyZW50Lm9mZnNldExlZnQgKyAoJHBhcmVudC5vZmZzZXRXaWR0aCAvIDIpIC0gKCR0aXAub2Zmc2V0V2lkdGggLyAyKSArICdweCc7XHJcbiAgICAgICAgICAgICAgICAkdGlwLnN0eWxlLnRvcCA9ICRwYXJlbnQub2Zmc2V0VG9wIC0gJHRpcC5vZmZzZXRIZWlnaHQgKyAncHgnO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgaWYoY3VyUG9zID09PSAnbmUnKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAkdGlwLnN0eWxlLmxlZnQgPSAkcGFyZW50Lm9mZnNldExlZnQgKyAkcGFyZW50Lm9mZnNldFdpZHRoICsgJ3B4JztcclxuICAgICAgICAgICAgICAgICR0aXAuc3R5bGUudG9wID0gJHBhcmVudC5vZmZzZXRUb3AgLSAkdGlwLm9mZnNldEhlaWdodCArICdweCc7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSBpZihjdXJQb3MgPT09ICdlJylcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgJHRpcC5zdHlsZS5sZWZ0ID0gJHBhcmVudC5vZmZzZXRMZWZ0ICsgJHBhcmVudC5vZmZzZXRXaWR0aCArICdweCc7XHJcbiAgICAgICAgICAgICAgICAkdGlwLnN0eWxlLnRvcCA9ICRwYXJlbnQub2Zmc2V0VG9wICsgKCRwYXJlbnQub2Zmc2V0SGVpZ2h0IC8gMikgLSAoJHRpcC5vZmZzZXRIZWlnaHQgLyAyKSArICdweCc7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSBpZihjdXJQb3MgPT09ICdzZScpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICR0aXAuc3R5bGUubGVmdCA9ICRwYXJlbnQub2Zmc2V0TGVmdCArICRwYXJlbnQub2Zmc2V0V2lkdGggKyAncHgnO1xyXG4gICAgICAgICAgICAgICAgJHRpcC5zdHlsZS50b3AgPSAkcGFyZW50Lm9mZnNldFRvcCArICRwYXJlbnQub2Zmc2V0SGVpZ2h0ICsgJ3B4JztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIGlmKGN1clBvcyA9PT0gJ3MnKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAkdGlwLnN0eWxlLmxlZnQgPSAkcGFyZW50Lm9mZnNldExlZnQgKyAoJHBhcmVudC5vZmZzZXRXaWR0aCAvIDIpIC0gKCR0aXAub2Zmc2V0V2lkdGggLyAyKSArICdweCc7XHJcbiAgICAgICAgICAgICAgICAkdGlwLnN0eWxlLnRvcCA9ICRwYXJlbnQub2Zmc2V0VG9wICsgJHBhcmVudC5vZmZzZXRIZWlnaHQgKyAncHgnO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgaWYoY3VyUG9zID09PSAnc3cnKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAkdGlwLnN0eWxlLmxlZnQgPSAkcGFyZW50Lm9mZnNldExlZnQgLSAkdGlwLm9mZnNldFdpZHRoICsgJ3B4JztcclxuICAgICAgICAgICAgICAgICR0aXAuc3R5bGUudG9wID0gJHBhcmVudC5vZmZzZXRUb3AgKyAkcGFyZW50Lm9mZnNldEhlaWdodCArICdweCc7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSBpZihjdXJQb3MgPT09ICd3JylcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgJHRpcC5zdHlsZS5sZWZ0ID0gJHBhcmVudC5vZmZzZXRMZWZ0IC0gJHRpcC5vZmZzZXRXaWR0aCArICdweCc7XHJcbiAgICAgICAgICAgICAgICAkdGlwLnN0eWxlLnRvcCA9ICRwYXJlbnQub2Zmc2V0VG9wICsgKCRwYXJlbnQub2Zmc2V0SGVpZ2h0IC8gMikgLSAoJHRpcC5vZmZzZXRIZWlnaHQgLyAyKSArICdweCc7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAkdGlwLnN0eWxlLmxlZnQgPSAkcGFyZW50Lm9mZnNldExlZnQgLSAkdGlwLm9mZnNldFdpZHRoICsgJ3B4JztcclxuICAgICAgICAgICAgICAgICR0aXAuc3R5bGUudG9wID0gJHBhcmVudC5vZmZzZXRUb3AgLSAkdGlwLm9mZnNldEhlaWdodCArICdweCc7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIENoZWNrIHRvIHNlZSBpZiB0aGUgdGlwIGlzIHdpdGhpbiB0aGUgd2luZG93XHJcbiAgICAgICAgZnVuY3Rpb24gX2NoZWNrUG9zKCR0aXApXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2YXIgcmVjdCA9ICR0aXAuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICAgICAgcmVjdC50b3AgPj0gMCAmJlxyXG4gICAgICAgICAgICAgICAgcmVjdC5sZWZ0ID49IDAgJiZcclxuICAgICAgICAgICAgICAgIHJlY3QuYm90dG9tIDw9ICh3aW5kb3cuaW5uZXJIZWlnaHQgfHwgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsaWVudEhlaWdodCkgJiZcclxuICAgICAgICAgICAgICAgIHJlY3QucmlnaHQgPD0gKHdpbmRvdy5pbm5lcldpZHRoIHx8IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGllbnRXaWR0aClcclxuICAgICAgICAgICAgKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIHJlc3RyaWN0OiAnRScsXHJcbiAgICAgICAgICAgIHNjb3BlOiB7XHJcbiAgICAgICAgICAgICAgICBjb25maWc6ICc9J1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICByZXBsYWNlOiB0cnVlLFxyXG4gICAgICAgICAgICBsaW5rOiBmdW5jdGlvbihzY29wZSwgZWxlbWVudCwgYXR0cnMpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBJZiB0aGUgdXNlciBkb2Vzbid0IHByb3ZpZGUgZXNzZW50aWFsIGluZm9ybWF0aW9uLCBlcnJvciBvdXRcclxuICAgICAgICAgICAgICAgIGlmKCFzY29wZS5jb25maWcudGl0bGUgfHwgIXNjb3BlLmNvbmZpZy5ib2R5KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcignRXJyb3I6IE5vIHRpdGxlIG9yIGJvZHkgaW5mb3JtYXRpb24gcHJvdmlkZWQuJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIDE7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gSWYgdGhlIHVzZXIgZG9lc24ndCBwcm92aWRlIGEgcG9zaXRpb24sIGRlZmF1bHQgJ25vcnRoJ1xyXG4gICAgICAgICAgICAgICAgaWYoIXNjb3BlLmNvbmZpZy5wb3NpdGlvbiB8fCB0eXBlb2Ygc2NvcGUuY29uZmlnLnBvc2l0aW9uICE9PSAnc3RyaW5nJyB8fCBfcG9zLmluZGV4T2Yoc2NvcGUuY29uZmlnLnBvc2l0aW9uKSA8IDApXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2NvcGUuY29uZmlnLnBvc2l0aW9uID0gJ24nO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIC8vIENyZWF0ZSB0aXAgZWxlbWVudFxyXG4gICAgICAgICAgICAgICAgdmFyICR0aXAgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBBcHBlbmQgdG8gRE9NXHJcbiAgICAgICAgICAgICAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKCR0aXApO1xyXG4gICAgICAgICAgICAgICAgJHRpcC5zdHlsZS5wb3NpdGlvbiA9ICdhYnNvbHV0ZSc7XHJcbiAgICAgICAgICAgICAgICAkdGlwLmlubmVySFRNTCA9ICc8c3Bhbj4nKyBzY29wZS5jb25maWcudGl0bGUgKyc8L3NwYW4+PGRpdj4nKyBzY29wZS5jb25maWcuYm9keSArJzwvZGl2Pic7XHJcbiAgICAgICAgICAgICAgICAkdGlwLmNsYXNzTmFtZSA9ICdib3NzeVRvb2x0aXAnO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIERpc2FibGUgYnJvd3NlcidzIHRvb2x0aXBcclxuICAgICAgICAgICAgICAgIGVsZW1lbnRbMF0udGl0bGUgPSAnJztcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGVsZW1lbnQpO1xyXG5cclxuICAgICAgICAgICAgICAgIHZhciBpID0gMCxcclxuICAgICAgICAgICAgICAgICAgICBsb2NrZWQ7XHJcblxyXG4gICAgICAgICAgICAgICAgZG8ge1xyXG4gICAgICAgICAgICAgICAgICAgIGxvY2tlZCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgX21vdmVUaXAoZWxlbWVudFswXSwgJHRpcCwgc2NvcGUuY29uZmlnLnBvc2l0aW9uKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gQ29udGludWUgdG8gbG9vcCBpZiAkdGlwIGlzIGNsaXBwZWRcclxuICAgICAgICAgICAgICAgICAgICBpZighX2NoZWNrUG9zKCR0aXApKVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbG9ja2VkID0gZmFsc2U7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBXcmFwIGFyb3VuZCBhcnJheSBpZiB0aGUgZW5kIGlzIGhpdFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoc2NvcGUuY29uZmlnLnBvc2l0aW9uID09PSAnbncnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzY29wZS5jb25maWcucG9zaXRpb24gPSAnbic7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzY29wZS5jb25maWcucG9zaXRpb24gPSBfcG9zW19wb3MuaW5kZXhPZihzY29wZS5jb25maWcucG9zaXRpb24pICsgMV07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChpID09PSA4KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICArK2k7XHJcbiAgICAgICAgICAgICAgICB9IHdoaWxlIChsb2NrZWQgPT09IGZhbHNlKTtcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBIaWRlIGl0IHVudGlsIG1vdXNlIGV2ZW50XHJcbiAgICAgICAgICAgICAgICAkdGlwLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gTW91c2UgZXZlbnRzXHJcbiAgICAgICAgICAgICAgICBlbGVtZW50Lm9uKCdtb3VzZWVudGVyJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgJHRpcC5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAub24oJ21vdXNlbGVhdmUnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgICAgICAkdGlwLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG4gICAgfSk7Il0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9