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

	}]).directive('bossyCalendar', [function () {
		return {
			restrict: 'AE',
			scope: {
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

            $http.get(data, { responseType: 'json' } )
                .success( function( data ) {
                    if( angular.isObject( data ) ) {
                        deferred.resolve(data);
                    }
                    else {
                        //TODO: replace error message with online doc link like ng errors
                        deferred.reject('directive.bossyForm: GET request to url did not produce data object');
                    }
                })
                .error(function(responseData, status) {
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
                text: function (obj, key, isRequired) {
                    return '<bossy-input title="\''+obj.title+'\'" type="\''+ obj.inputType +'\'" value="\''+_data.address[key]+'\'"' + ( isRequired ? ' required' : '' ) + '></bossy-input>';
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
                            var requiredList = typeof( value.required ) !== 'undefined' ? value.required : null;
                            template += buildTemplate(value.properties, fullKey, requiredList );
                            break;
                        case 'array':
                            template += buildTemplate(value.items.properties, fullKey);
                            break;
                        case 'number' || 'integer':
                            template += _itemTemplate.number(value);
                            break;
                        case 'string':
                            var isRequired = false;
                            if( required && required.indexOf(key) !== -1 ) {
                                isRequired = true;
                            }
                            template += _itemTemplate.text(value, key, isRequired);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImJvc3N5LmpzIiwiYm9zc3kuY2FsZW5kYXIuanMiLCJib3NzeS5jb21ib2JveC5jYXNjYWRpbmdEcm9wZG93bi5qcyIsImJvc3N5LmNvbWJvYm94LmNoZWNrYm94TXVsdGlzZWxlY3QuanMiLCJib3NzeS5jb21ib2JveC5tdWx0aXNlbGVjdC5qcyIsImJvc3N5LmRhdGEuanMiLCJib3NzeS5kYXRhX2dyaWQuanMiLCJib3NzeS5kcm9wZG93bi5qcyIsImJvc3N5LmZvcm0uanMiLCJib3NzeS5pbnB1dC5qcyIsImJvc3N5Lm51bWVyaWN0ZXh0Ym94LmpzIiwiYm9zc3kuc2NoZW1hLmpzIiwiYm9zc3kuc2xpZGVyLmpzIiwiYm9zc3kudG9vbHRpcC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUMxQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDcEtBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDeEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUM3R0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDckpBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQzNEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNwRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ2xGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDbElBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNoQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDekZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDMUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDN1VBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiYm9zc3kuYWxsLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyohXG4gKiBib3NzeS5qc1xuICovXG5cbi8qIVxuICogaHR0cDovL0Jvc3N5VUkuY29tL1xuICpcbiAqIEJvc3N5VUkgLSBDcmVhdGVkIHdpdGggTE9WRSBieSBCdWlsZC5jb20gT3BlbiBTb3VyY2UgQ29uc29ydGl1bVxuICpcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZS4gUGxlYXNlIHNlZSBMSUNFTlNFIGZvciBtb3JlIGluZm9ybWF0aW9uLlxuICpcbiovXG5cbi8vVE9ETzogbmVlZCBsYXlvdXQsIGxhYmVsc1xudmFyIGJvc3N5ID0gYW5ndWxhci5tb2R1bGUoJ2Jvc3N5JywgW1xuXHRcdCdib3NzeS5jYWxlbmRhcicsXG5cdFx0J2Jvc3N5LmRhdGEnLFxuXHRcdCdib3NzeS5kcm9wZG93bicsXG5cdFx0J2Jvc3N5LmZvcm0nLFxuXHRcdCdib3NzeS5pbnB1dCcsXG5cdFx0J2Jvc3N5Lm51bWVyaWN0ZXh0Ym94Jyxcblx0XHQnYm9zc3kuc2NoZW1hJyxcblx0XHQnYm9zc3kudG9vbHRpcCcsXG5cdFx0J2Jvc3N5LmRhdGFncmlkJ1xuXHRdXG4pO1xuIiwiYW5ndWxhci5tb2R1bGUoJ2Jvc3N5LmNhbGVuZGFyJywgW10pXG5cdC5jb250cm9sbGVyKCdDYWxlbmRhckNvbnRyb2xsZXInLCBbJyRzY29wZScsIGZ1bmN0aW9uICgkc2NvcGUpIHtcblxuXHRcdHZhciBfbW9udGhNYXBzID0ge30sXG5cdFx0XHRvcHRpb25zID0ge30sXG5cdFx0XHRkZWZhdWx0cyA9IHt9LFxuXHRcdFx0dW5pdmVyc2FsID0ge1xuXHRcdFx0XHREQVk6IDI0ICogNjAgKiA2MCAqIDEwMDAsXG5cdFx0XHRcdEhPVVI6IDYwICogNjAgKiAxMDAwXG5cdFx0XHR9O1xuXG5cdFx0JHNjb3BlLmRheXMgPSBbXG5cdFx0XHQnU3VuZGF5Jyxcblx0XHRcdCdNb25kYXknLFxuXHRcdFx0J1R1ZXNkYXknLFxuXHRcdFx0J1dlZG5lc2RheScsXG5cdFx0XHQnVGh1cnNkYXknLFxuXHRcdFx0J0ZyaWRheScsXG5cdFx0XHQnU2F0dXJkYXknXG5cdFx0XTtcblxuXHRcdCRzY29wZS5tb250aHMgPSBbXG5cdFx0XHQnSmFudWFyeScsXG5cdFx0XHQnRmVicnVhcnknLFxuXHRcdFx0J01hcmNoJyxcblx0XHRcdCdBcHJpbCcsXG5cdFx0XHQnTWF5Jyxcblx0XHRcdCdKdW5lJyxcblx0XHRcdCdKdWx5Jyxcblx0XHRcdCdBdWd1c3QnLFxuXHRcdFx0J1NlcHRlbWJlcicsXG5cdFx0XHQnT2N0b2JlcicsXG5cdFx0XHQnTm92ZW1iZXInLFxuXHRcdFx0J0RlY2VtYmVyJ1xuXHRcdF07XG5cblx0XHQkc2NvcGUucHJldmlvdXNNb250aCA9IGZ1bmN0aW9uKCkge1xuXHRcdFx0dmFyIGRhdGUgPSBuZXcgRGF0ZSgkc2NvcGUuY3VycmVudC55ZWFyLCAoJHNjb3BlLmN1cnJlbnQubW9udGggLSAxKSwgMSk7XG5cdFx0XHRzZXRDdXJyZW50TW9udGhBbmRZZWFyKGRhdGUuZ2V0TW9udGgoKSwgZGF0ZS5nZXRGdWxsWWVhcigpKTtcblx0XHRcdCRzY29wZS51cGRhdGVEYXRlTWFwKCk7XG5cdFx0fTtcblxuXHRcdCRzY29wZS5uZXh0TW9udGggPSBmdW5jdGlvbigpIHtcblx0XHRcdHZhciBkYXRlID0gbmV3IERhdGUoJHNjb3BlLmN1cnJlbnQueWVhciwgKCRzY29wZS5jdXJyZW50Lm1vbnRoICsgMSksIDEpO1xuXHRcdFx0c2V0Q3VycmVudE1vbnRoQW5kWWVhcihkYXRlLmdldE1vbnRoKCksIGRhdGUuZ2V0RnVsbFllYXIoKSk7XG5cdFx0XHQkc2NvcGUudXBkYXRlRGF0ZU1hcCgpO1xuXHRcdH07XG5cblx0XHQkc2NvcGUuc2VsZWN0RGF0ZSA9IGZ1bmN0aW9uKHRpbWUpIHtcblx0XHRcdHZhciBkYXRlID0gZ2V0U3RhbmRhcmRUaW1lKG5ldyBEYXRlKHRpbWUpKTtcblx0XHRcdGlmIChkYXlJc091dE9mUmFuZ2UoZGF0ZSkpIHtcblx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0fVxuXHRcdFx0aWYgKGRhdGUubW9udGggIT09ICRzY29wZS5jdXJyZW50Lm1vbnRoKSB7XG5cdFx0XHRcdHNldEN1cnJlbnRNb250aEFuZFllYXIoZGF0ZS5tb250aCwgZGF0ZS55ZWFyKTtcblx0XHRcdFx0JHNjb3BlLnVwZGF0ZURhdGVNYXAoKTtcblx0XHRcdH1cblx0XHRcdHNldFNlbGVjdGVkRGF0ZShuZXcgRGF0ZSh0aW1lKSk7XG5cdFx0fTtcblxuXHRcdCRzY29wZS51cGRhdGVEYXRlTWFwID0gZnVuY3Rpb24oKSB7XG5cdFx0XHR2YXIgcmF3Q3VycmVudERheSA9ICgkc2NvcGUuY3VycmVudC5yYXcuZ2V0RGF5KCkgKiB1bml2ZXJzYWwuREFZKSxcblx0XHRcdFx0Zmlyc3RXZWVrRGF5ID0gbmV3IERhdGUoJHNjb3BlLmN1cnJlbnQudGltZSAtIHJhd0N1cnJlbnREYXkpLFxuXHRcdFx0XHRpc01vbnRoQ29tcGxldGUgPSBmYWxzZTtcblxuXHRcdFx0JHNjb3BlLmRhdGVNYXAgPSBbXTtcblxuXHRcdFx0d2hpbGUgKCFpc01vbnRoQ29tcGxldGUpIHtcblx0XHRcdFx0dmFyIHdlZWsgPSBbXTtcblx0XHRcdFx0aWYgKCRzY29wZS5kYXRlTWFwLmxlbmd0aCA9PT0gNSkge1xuXHRcdFx0XHRcdGlzTW9udGhDb21wbGV0ZSA9IHRydWU7XG5cdFx0XHRcdH1cblx0XHRcdFx0Zm9yICh2YXIgd2Vla0RheSA9IDA7IHdlZWtEYXkgPCA3OyB3ZWVrRGF5KyspIHtcblx0XHRcdFx0XHR2YXIgcmF3VGhpc0RhdGUgPSBmaXJzdFdlZWtEYXkuZ2V0VGltZSgpICsgKHdlZWtEYXkgKiB1bml2ZXJzYWwuREFZKSxcblx0XHRcdFx0XHRcdHRoaXNEYXRlID0gKG5ldyBEYXRlKHJhd1RoaXNEYXRlKSk7XG5cdFx0XHRcdFx0Ly8gZml4IGZvciBEU1Qgb2RkbmVzc1xuXHRcdFx0XHRcdGlmICh0aGlzRGF0ZS5nZXRIb3VycygpID09PSAyMykge1xuXHRcdFx0XHRcdFx0dGhpc0RhdGUgPSAobmV3IERhdGUodGhpc0RhdGUuZ2V0VGltZSgpICsgdW5pdmVyc2FsLkhPVVIpKTtcblx0XHRcdFx0XHR9IGVsc2UgaWYgKHRoaXNEYXRlLmdldEhvdXJzKCkgPT09IDEpIHtcblx0XHRcdFx0XHRcdHRoaXNEYXRlID0gKG5ldyBEYXRlKHRoaXNEYXRlLmdldFRpbWUoKSAtIHVuaXZlcnNhbC5IT1VSKSk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdHZhciBkYXRlID0gZ2V0U3RhbmRhcmRUaW1lKHRoaXNEYXRlKTtcblx0XHRcdFx0XHRkYXRlLmRheUluTW9udGggPSB0aGlzRGF0ZS5nZXRNb250aCgpID09PSAkc2NvcGUuY3VycmVudC5yYXcuZ2V0TW9udGgoKSA/ICdkYXktaW4tbW9udGgnIDogJyc7XG5cdFx0XHRcdFx0ZGF0ZS5kaXNhYmxlZERheSA9IGRheUlzT3V0T2ZSYW5nZShkYXRlKSA/ICdkaXNhYmxlZC1kYXknIDogJyc7XG5cdFx0XHRcdFx0d2Vlay5wdXNoKGRhdGUpO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGZpcnN0V2Vla0RheSA9IG5ldyBEYXRlKGZpcnN0V2Vla0RheS5nZXRUaW1lKCkgKyAoNyAqIHVuaXZlcnNhbC5EQVkpKTtcblx0XHRcdFx0JHNjb3BlLmRhdGVNYXAucHVzaCh3ZWVrKTtcblx0XHRcdH1cblx0XHR9O1xuXG5cdFx0ZnVuY3Rpb24gZ2V0U3RhbmRhcmRUaW1lKGRhdGUpIHtcblx0XHRcdHJldHVybiB7XG5cdFx0XHRcdHJhdzogZGF0ZSxcblx0XHRcdFx0eWVhcjogZGF0ZS5nZXRGdWxsWWVhcigpLFxuXHRcdFx0XHRtb250aE5hbWU6IGdldE1vbnRoTmFtZShkYXRlLmdldE1vbnRoKCkpLFxuXHRcdFx0XHRtb250aDogZGF0ZS5nZXRNb250aCgpLFxuXHRcdFx0XHRkYXk6IGdldERheU5hbWUoZGF0ZSksXG5cdFx0XHRcdGRhdGU6IGRhdGUuZ2V0RGF0ZSgpLFxuXHRcdFx0XHR0aW1lOiBkYXRlLmdldFRpbWUoKVxuXHRcdFx0fTtcblx0XHR9XG5cblx0XHRmdW5jdGlvbiBnZXRUaW1lT2JqZWN0SWZEYXRlKGRhdGUpIHtcblx0XHRcdGlmIChhbmd1bGFyLmlzRGF0ZShuZXcgRGF0ZShkYXRlKSkpIHtcblx0XHRcdFx0cmV0dXJuIGdldFN0YW5kYXJkVGltZShuZXcgRGF0ZShkYXRlKSk7XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0fVxuXG5cdFx0ZnVuY3Rpb24gc2V0Q29uZmlnT3B0aW9ucygpIHtcblx0XHRcdCRzY29wZS5jb25maWcgPSAkc2NvcGUuY29uZmlnIHx8IHt9O1xuXHRcdFx0JHNjb3BlLmNvbmZpZy5zdGFydCA9IGdldFRpbWVPYmplY3RJZkRhdGUoJHNjb3BlLmNvbmZpZy5zdGFydCk7XG5cdFx0XHQkc2NvcGUuY29uZmlnLmVuZCA9IGdldFRpbWVPYmplY3RJZkRhdGUoJHNjb3BlLmNvbmZpZy5lbmQpO1xuXHRcdFx0b3B0aW9ucyA9IGFuZ3VsYXIuZXh0ZW5kKHt9LCBkZWZhdWx0cywgJHNjb3BlLmNvbmZpZyk7XG5cdFx0fVxuXG5cdFx0ZnVuY3Rpb24gZGF5SXNPdXRPZlJhbmdlKF9kYXRlKSB7XG5cdFx0XHR2YXIgaGFzUmFuZ2UgPSBvcHRpb25zLnN0YXJ0ICYmIG9wdGlvbnMuZW5kO1xuXHRcdFx0aWYgKGhhc1JhbmdlICYmIChfZGF0ZS50aW1lIDwgb3B0aW9ucy5zdGFydC50aW1lIHx8IF9kYXRlLnRpbWUgPiBvcHRpb25zLmVuZC50aW1lKSkge1xuXHRcdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHRcdH0gZWxzZSBpZiAob3B0aW9ucy5zdGFydCAmJiBfZGF0ZS50aW1lIDwgb3B0aW9ucy5zdGFydC50aW1lKSB7XG5cdFx0XHRcdHJldHVybiB0cnVlO1xuXHRcdFx0fSBlbHNlIGlmIChvcHRpb25zLmVuZCAmJiBfZGF0ZS50aW1lID4gb3B0aW9ucy5lbmQudGltZSkge1xuXHRcdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHRmdW5jdGlvbiBzZXRTZWxlY3RlZERhdGUoZGF0ZSkge1xuXHRcdFx0JHNjb3BlLnNlbGVjdGVkID0gZ2V0U3RhbmRhcmRUaW1lKGRhdGUpO1xuXHRcdFx0JHNjb3BlLm5nTW9kZWwgPSAkc2NvcGUuc2VsZWN0ZWQucmF3O1xuXHRcdH1cblxuXHRcdGZ1bmN0aW9uIHNldEN1cnJlbnRNb250aEFuZFllYXIobW9udGgsIHllYXIpIHtcblx0XHRcdHZhciBkYXRlID0gbmV3IERhdGUoeWVhciAhPT0gdW5kZWZpbmVkID8geWVhciA6ICRzY29wZS5zZWxlY3RlZC55ZWFyLCBtb250aCAhPT0gdW5kZWZpbmVkID8gbW9udGggOiAkc2NvcGUuc2VsZWN0ZWQubW9udGgsIDEpO1xuXHRcdFx0JHNjb3BlLmN1cnJlbnQgPSBnZXRTdGFuZGFyZFRpbWUoZGF0ZSk7XG5cdFx0fVxuXG5cdFx0ZnVuY3Rpb24gZ2V0TW9udGhOYW1lKG1vbnRoKSB7XG5cdFx0XHRyZXR1cm4gJHNjb3BlLm1vbnRoc1ttb250aF07XG5cdFx0fVxuXG5cdFx0ZnVuY3Rpb24gZ2V0RGF5TmFtZShkYXRlKSB7XG5cdFx0XHRyZXR1cm4gJHNjb3BlLmRheXNbZGF0ZS5nZXREYXkoKV07XG5cdFx0fVxuXG5cdFx0ZnVuY3Rpb24gaW5pdGlhbGl6ZSgpIHtcblx0XHRcdHNldENvbmZpZ09wdGlvbnMoKTtcblx0XHRcdHNldFNlbGVjdGVkRGF0ZSgkc2NvcGUubmdNb2RlbCB8fCBuZXcgRGF0ZSgpKTtcblx0XHRcdHNldEN1cnJlbnRNb250aEFuZFllYXIoKTtcblx0XHRcdCRzY29wZS51cGRhdGVEYXRlTWFwKCk7XG5cdFx0fVxuXG5cdFx0aW5pdGlhbGl6ZSgpO1xuXG5cdH1dKS5kaXJlY3RpdmUoJ2Jvc3N5Q2FsZW5kYXInLCBbZnVuY3Rpb24gKCkge1xuXHRcdHJldHVybiB7XG5cdFx0XHRyZXN0cmljdDogJ0FFJyxcblx0XHRcdHNjb3BlOiB7XG5cdFx0XHRcdGNvbmZpZzogJz0nXG5cdFx0XHR9LFxuXHRcdFx0dGVtcGxhdGVVcmw6ICd0ZW1wbGF0ZXMvYm9zc3kuY2FsZW5kYXIuaHRtbCcsLy8kdGVtcGxhdGVDYWNoZS5nZXQoJ3RlbXBsYXRlcy9ib3NzeS5jYWxlbmRhci5odG1sJyksXG5cdFx0XHRjb250cm9sbGVyOiAnQ2FsZW5kYXJDb250cm9sbGVyJ1xuXHRcdH07XG5cdH1dKTsiLCJ2YXIgYXBwID0gYW5ndWxhci5tb2R1bGUoJ2Jvc3N5LmNvbWJvYm94LmNhc2NhZGluZ0Ryb3Bkb3duJywgW10pO1xuXG5hcHAuY29udHJvbGxlcignQXBwQ3RybCcsIGZ1bmN0aW9uKCRzY29wZSkge1xuXG4gICAgLy8gYWRkIGNob2ljZXMgZm9yIHRoZSAzIGRyb3Bkb3duc1xuICAgIC8vIGRlcGVuZGVuY2llcyBpbiBhcnJheXMgKEEgLSBBMSAtIEExYSlcbiAgICAkc2NvcGUuY2hvaWNlcyA9IHtcbiAgICAgICAgJ09wdGlvbiBBJzoge1xuICAgICAgICAgICAgJ09wdGlvbiBBMSc6IFsnT3B0aW9uIEExYScsICdPcHRpb24gQTFiJywgJ09wdGlvbiBBMWMnXSxcbiAgICAgICAgICAgICdPcHRpb24gQTInOiBbJ09wdGlvbiBBMmEnLCAnT3B0aW9uIEEyYicsICdPcHRpb24gQTJjJ10sXG4gICAgICAgICAgICAnT3B0aW9uIEEzJzogWydPcHRpb24gQTNhJywgJ09wdGlvbiBBM2InLCAnT3B0aW9uIEEzYyddXG4gICAgICAgIH0sXG4gICAgICAgICdPcHRpb24gQic6IHtcbiAgICAgICAgICAgICdPcHRpb24gQjEnOiBbJ09wdGlvbiBCMWEnLCAnT3B0aW9uIEIxYicsICdPcHRpb24gQjFjJ10sXG4gICAgICAgICAgICAnT3B0aW9uIEIyJzogWydPcHRpb24gQjJhJywgJ09wdGlvbiBCMmInLCAnT3B0aW9uIEIyYyddLFxuICAgICAgICAgICAgJ09wdGlvbiBCMyc6IFsnT3B0aW9uIEIzYScsICdPcHRpb24gQjNiJywgJ09wdGlvbiBCM2MnXVxuICAgICAgICB9LFxuICAgICAgICAnT3B0aW9uIEMnOiB7XG4gICAgICAgICAgICAnT3B0aW9uIEMxJzogWydPcHRpb24gQzFhJywgJ09wdGlvbiBDMWInLCAnT3B0aW9uIEMxYyddLFxuICAgICAgICAgICAgJ09wdGlvbiBDMic6IFsnT3B0aW9uIEMyYScsICdPcHRpb24gQzJiJywgJ09wdGlvbiBDM2InXSxcbiAgICAgICAgICAgICdPcHRpb24gQzMnOiBbJ09wdGlvbiBDM2EnLCAnT3B0aW9uIEMzYicsICdPcHRpb24gQzNjJ11cbiAgICAgICAgfVxuICAgIH07XG5cbn0pOyIsInZhciBhcHAgPSBhbmd1bGFyLm1vZHVsZSgnYm9zc3kuY29tYm9ib3guY2hlY2tib3hNdWx0aXNlbGVjdCcsIFtdKTtcblxuYXBwLmNvbnRyb2xsZXIoJ0FwcEN0cmwnLCBmdW5jdGlvbigkc2NvcGUpIHtcblxuICAgIC8vIHNldCBjaG9pY2VzXG4gICAgJHNjb3BlLmNob2ljZXMgPSBbJ09wdGlvbiBBJywgJ09wdGlvbiBCJywgJ09wdGlvbiBDJ107XG5cbiAgICAvLyBhcnJheVxuICAgICRzY29wZS5uYW1lID0ge2Nob2ljZXM6IFtdfTtcblxuICAgIC8vIGZ1bmN0aW9uIHNlbGVjdEFsbCB0byBzZWxlY3QgYWxsIGNoZWNrYm94ZXNcbiAgICAkc2NvcGUuc2VsZWN0QWxsID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICRzY29wZS5uYW1lLmNob2ljZXMgPSBhbmd1bGFyLmNvcHkoJHNjb3BlLmNob2ljZXMpO1xuICAgIH07XG5cbiAgICAvLyBmdW5jdGlvbiBkZXNlbGVjdEFsbCB0byBkZXNlbGVjdCBhbGwgY2hlY2tib3hlc1xuICAgICRzY29wZS5kZXNlbGVjdEFsbCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAkc2NvcGUubmFtZS5jaG9pY2VzID0gW107XG4gICAgfTtcblxufSk7XG5cbmFwcC5kaXJlY3RpdmUoJ2Jvc3N5Q2hlY2tib3hNdWx0aXNlbGVjdCcsIFsnJHBhcnNlJywgJyRjb21waWxlJywgZnVuY3Rpb24oJHBhcnNlLCAkY29tcGlsZSkge1xuXG4gICAgLy8gYWRkIHRoZSBzZWxlY3RlZCBjaG9pY2UgdG8gY2hvaWNlc1xuICAgIGZ1bmN0aW9uIGFkZENob2ljZSAoYXJyLCBpdGVtKSB7XG4gICAgICAgIGFyciA9IGFuZ3VsYXIuaXNBcnJheShhcnIpID8gYXJyIDogW107XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYXJyLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBpZiAoYW5ndWxhci5lcXVhbHMoYXJyW2ldLCBpdGVtKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBhcnI7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgLy8gYWRkIGNob2ljZSB0byBhcnJheVxuICAgICAgICBhcnIucHVzaChpdGVtKTtcbiAgICAgICAgLy8gcmV0dXJuIG5ldyBhcnJheVxuICAgICAgICByZXR1cm4gYXJyO1xuICAgIH1cblxuICAgIC8vIHJlbW92ZSB0aGUgc2VsZWN0ZWQgY2hvaWNlIGZyb20gY2hvaWNlcyB3aGVuIGNsaWNrZWRcbiAgICBmdW5jdGlvbiByZW1vdmVDaG9pY2UoYXJyLCBpdGVtKSB7XG4gICAgICAgIGlmIChhbmd1bGFyLmlzQXJyYXkoYXJyKSkge1xuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBhcnIubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBpZiAoYW5ndWxhci5lcXVhbHMoYXJyW2ldLCBpdGVtKSkge1xuICAgICAgICAgICAgICAgICAgICAvLyByZW1vdmUgZnJvbSBhcnJheVxuICAgICAgICAgICAgICAgICAgICBhcnIuc3BsaWNlKGksIDEpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgLy8gcmV0dXJuIG5ldyBhcnJheVxuICAgICAgICByZXR1cm4gYXJyO1xuICAgIH1cblxuICAgIC8vIGNvbnRhaW5zIC0gY2hlY2sgd2hpY2ggaXRlbXMgdGhlIGFycmF5IGNvbnRhaW5zXG4gICAgZnVuY3Rpb24gY29udGFpbkNoZWNrYm94IChhcnIsIGl0ZW0pIHtcbiAgICAgICAgaWYgKGFuZ3VsYXIuaXNBcnJheShhcnIpKSB7XG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGFyci5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIGlmIChhbmd1bGFyLmVxdWFscyhhcnJbaV0sIGl0ZW0pKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgLy8gd2F0Y2ggYmVoYXZpb3VyIG9mIGRpcmVjdGl2ZSBhbmQgbW9kZWxcbiAgICBmdW5jdGlvbiB3YXRjaChzY29wZSwgZWxlbSwgYXR0cnMpIHtcblxuICAgICAgICAvLyBjb21waWxlIC0gbmctbW9kZWwgcG9pbnRpbmcgdG8gY2hlY2tlZFxuICAgICAgICAkY29tcGlsZShlbGVtKShzY29wZSk7XG5cbiAgICAgICAgLy8gZ2V0dGVyIGFuZCBzZXR0ZXIgZm9yIG9yaWdpbmFsIG1vZGVsXG4gICAgICAgIHZhciBnZXR0ZXIgPSAkcGFyc2UoYXR0cnMuYm9zc3lDaGVja2JveE11bHRpc2VsZWN0KTtcbiAgICAgICAgdmFyIHNldHRlciA9IGdldHRlci5hc3NpZ247XG5cbiAgICAgICAgLy8gdmFsdWUgYWRkZWQgdG8gbGlzdFxuICAgICAgICB2YXIgdmFsdWUgPSAkcGFyc2UoYXR0cnMuYm9zc3lMaXN0VmFsdWUpKHNjb3BlLiRwYXJlbnQpO1xuXG4gICAgICAgIC8vIHdhdGNoIHRoZSBjaGFuZ2Ugb2YgY2hlY2tlZCB2YWx1ZXNcbiAgICAgICAgc2NvcGUuJHdhdGNoKCdjaGVja2VkJywgZnVuY3Rpb24obmV3VmFsdWUsIG9sZFZhbHVlKSB7XG4gICAgICAgICAgICBpZiAobmV3VmFsdWUgPT09IG9sZFZhbHVlKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdmFyIGFjdHVhbCA9IGdldHRlcihzY29wZS4kcGFyZW50KTtcbiAgICAgICAgICAgIGlmIChuZXdWYWx1ZSA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgICAgIHNldHRlcihzY29wZS4kcGFyZW50LCBhZGRDaG9pY2UgKGFjdHVhbCwgdmFsdWUpKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgc2V0dGVyKHNjb3BlLiRwYXJlbnQsIHJlbW92ZUNob2ljZShhY3R1YWwsIHZhbHVlKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8vIHdhdGNoIGNoYW5nZSBvZiBvcmlnaW5hbCBtb2RlbFxuICAgICAgICBzY29wZS4kcGFyZW50LiR3YXRjaChhdHRycy5ib3NzeUNoZWNrYm94TXVsdGlzZWxlY3QsIGZ1bmN0aW9uKG5ld0Fycikge1xuICAgICAgICAgICAgc2NvcGUuY2hlY2tlZCA9IGNvbnRhaW5DaGVja2JveCAobmV3QXJyLCB2YWx1ZSk7XG4gICAgICAgIH0sIHRydWUpO1xuICAgIH1cblxuICAgIHJldHVybiB7XG4gICAgICAgIHJlc3RyaWN0OiAnQUUnLFxuICAgICAgICBzY29wZTogdHJ1ZSxcbiAgICAgICAgY29tcGlsZTogZnVuY3Rpb24odEVsZW1lbnQsIHRBdHRycykge1xuICAgICAgICAgICAgLy8gbG9jYWwgdmFyaWFibGUgc3RvcmluZyBjaGVja2JveCBtb2RlbFxuICAgICAgICAgICAgdEVsZW1lbnQuYXR0cignbmctbW9kZWwnLCAnY2hlY2tlZCcpO1xuICAgICAgICAgICAgLy8gcHJldmVudCByZWN1cnNpb25cbiAgICAgICAgICAgIHRFbGVtZW50LnJlbW92ZUF0dHIoJ2Jvc3N5LWNoZWNrYm94LW11bHRpc2VsZWN0Jyk7XG4gICAgICAgICAgICByZXR1cm4gd2F0Y2g7XG4gICAgICAgIH1cbiAgICB9O1xuXG59XSk7IiwidmFyIGFwcCA9IGFuZ3VsYXIubW9kdWxlKCdib3NzeS5jb21ib2JveC5tdWx0aXNlbGVjdCcsIFtdKTtcblxuYXBwLmNvbnRyb2xsZXIoJ0FwcEN0cmwnLCBmdW5jdGlvbigkc2NvcGUpIHtcblxuICAgIC8vIGFkZCBjaG9pY2VzIGZvciBtdWx0aXNlbGVjdCBpbiBhcnJheVxuICAgICRzY29wZS5jaG9pY2VzID0gW3tpZDoxLCBuYW1lOiAnT3B0aW9uIEEnfSxcbiAgICAgICAgICAgICAgICAgICAgICB7aWQ6MiwgbmFtZTogJ09wdGlvbiBCJ30sXG4gICAgICAgICAgICAgICAgICAgICAge2lkOjMsIG5hbWU6ICdPcHRpb24gQyd9XG4gICAgICAgICAgICAgICAgICAgICBdO1xuXG4gICAgLy8gc2VsZWN0ZWQgY2hvaWNlXG4gICAgJHNjb3BlLnNlbGVjdGVkQ2hvaWNlID0gW107XG5cbn0pO1xuXG4vLyBpbmplY3QgZnVuY3Rpb25zXG5hcHAuZmFjdG9yeSgnb3B0aW9uUGFyc2VyJywgWyckcGFyc2UnLCBmdW5jdGlvbiAoJHBhcnNlKSB7XG5cbiAgICB2YXIgVFlQRUFIRUFEX1JFR0VYUCA9IC9eXFxzKiguKj8pKD86XFxzK2FzXFxzKyguKj8pKT9cXHMrZm9yXFxzKyg/OihbXFwkXFx3XVtcXCRcXHdcXGRdKikpXFxzK2luXFxzKyguKikkLztcblxuICAgIHJldHVybiB7XG4gICAgICAgIHBhcnNlOiBmdW5jdGlvbiAoaW5wdXQpIHtcblxuICAgICAgICAgICAgLy8gY2hlY2sgaW5wdXRzXG4gICAgICAgICAgICB2YXIgbWF0Y2ggPSBpbnB1dC5tYXRjaChUWVBFQUhFQURfUkVHRVhQKSwgbW9kZWxNYXBwZXIsIHZpZXdNYXBwZXIsIHNvdXJjZTtcbiAgICAgICAgICAgIGlmICghbWF0Y2gpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAgICAgICAgICAgICAgICAgICAnRXhwZWN0ZWQgdHlwZWFoZWFkIHNwZWNpZmljYXRpb24gaW4gZm9ybSBvZiBcIl9tb2RlbFZhbHVlXyAoYXMgX2xhYmVsXyk/IGZvciBfaXRlbV8gaW4gX2NvbGxlY3Rpb25fXCInICtcbiAgICAgICAgICAgICAgICAgICAgICAgICcgYnV0IGdvdCBcIicgKyBpbnB1dCArICdcIi4nKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICBpdGVtTmFtZTogbWF0Y2hbM10sXG4gICAgICAgICAgICAgICAgc291cmNlOiAkcGFyc2UobWF0Y2hbNF0pLFxuICAgICAgICAgICAgICAgIHZpZXdNYXBwZXI6ICRwYXJzZShtYXRjaFsyXSB8fCBtYXRjaFsxXSksXG4gICAgICAgICAgICAgICAgbW9kZWxNYXBwZXI6ICRwYXJzZShtYXRjaFsxXSlcbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICB9O1xufV0pO1xuXG5hcHAuZGlyZWN0aXZlKCdib3NzeU11bHRpc2VsZWN0JyxcblxuICAgICAgICBmdW5jdGlvbiAoJGRvY3VtZW50LCAkY29tcGlsZSwgb3B0aW9uUGFyc2VyKSB7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIHJlc3RyaWN0OiAnRScsXG4gICAgICAgICAgICAgICAgcmVxdWlyZTogJ25nTW9kZWwnLFxuICAgICAgICAgICAgICAgIGxpbms6IGZ1bmN0aW9uIChvcmlnaW5hbFNjb3BlLCBlbGVtZW50LCBhdHRycywgbW9kZWxDdHJsKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgLy8gZGVjbGFyZSB2YXJpYWJsZXNcbiAgICAgICAgICAgICAgICAgICAgdmFyIGV4cCA9IGF0dHJzLm9wdGlvbnMsXG4gICAgICAgICAgICAgICAgICAgICAgICBwYXJzZWRSZXN1bHQgPSBvcHRpb25QYXJzZXIucGFyc2UoZXhwKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGlzTXVsdGlwbGUgPSBhdHRycy5tdWx0aXBsZSA/IHRydWUgOiBmYWxzZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHNjb3BlID0gb3JpZ2luYWxTY29wZS4kbmV3KCksXG4gICAgICAgICAgICAgICAgICAgICAgICBjaGFuZ2VIYW5kbGVyID0gYXR0cnMuY2hhbmdlIHx8IGFuZ3VsYXIubm9vcDtcblxuICAgICAgICAgICAgICAgICAgICBzY29wZS5pdGVtcyA9IFtdO1xuICAgICAgICAgICAgICAgICAgICBzY29wZS5tdWx0aXBsZSA9IGlzTXVsdGlwbGU7XG5cbiAgICAgICAgICAgICAgICAgICAgLy8gaW5jbHVkZSBzZWNvbmQgZGlyZWN0aXZlICh0ZW1wbGF0ZSlcbiAgICAgICAgICAgICAgICAgICAgdmFyIHBvcFVwRWwgPSBhbmd1bGFyLmVsZW1lbnQoJzxib3NzeS1tdWx0aXNlbGVjdC1wb3B1cD48L2Jvc3N5LW11bHRpc2VsZWN0LXBvcHVwPicpO1xuXG4gICAgICAgICAgICAgICAgICAgIC8vIGFuYWx5c2UgbW9kZWxcbiAgICAgICAgICAgICAgICAgICAgZnVuY3Rpb24gcGFyc2VNb2RlbCgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBtb2RlbCA9IHBhcnNlZFJlc3VsdC5zb3VyY2Uob3JpZ2luYWxTY29wZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IG1vZGVsLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGxvY2FsID0ge307XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbG9jYWxbcGFyc2VkUmVzdWx0Lml0ZW1OYW1lXSA9IG1vZGVsW2ldO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNjb3BlLml0ZW1zLnB1c2goe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsYWJlbDogcGFyc2VkUmVzdWx0LnZpZXdNYXBwZXIobG9jYWwpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtb2RlbDogbW9kZWxbaV0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNoZWNrZWQ6IGZhbHNlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICBwYXJzZU1vZGVsKCk7XG5cbiAgICAgICAgICAgICAgICAgICAgLy8gYWRkIHRlbXBsYXRlIGRpcmVjdGl2ZVxuICAgICAgICAgICAgICAgICAgICBlbGVtZW50LmFwcGVuZCgkY29tcGlsZShwb3BVcEVsKShzY29wZSkpO1xuXG4gICAgICAgICAgICAgICAgICAgIC8vIHNlbGVjdGlvbiBmdW5jdGlvblxuICAgICAgICAgICAgICAgICAgICBmdW5jdGlvbiBzZWxlY3RNdWx0aXBsZShpdGVtKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpdGVtLmNoZWNrZWQgPSAhaXRlbS5jaGVja2VkO1xuICAgICAgICAgICAgICAgICAgICAgICAgc2V0TW9kZWxWYWx1ZSh0cnVlKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIC8vIGFycmF5IGZvciBtdWx0aXBsZSBzZWxlY3Rpb25cbiAgICAgICAgICAgICAgICAgICAgZnVuY3Rpb24gc2V0TW9kZWxWYWx1ZShpc011bHRpcGxlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgdmFsdWU7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoaXNNdWx0aXBsZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlID0gW107XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYW5ndWxhci5mb3JFYWNoKHNjb3BlLml0ZW1zLCBmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoaXRlbS5jaGVja2VkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZS5wdXNoKGl0ZW0ubW9kZWwpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFuZ3VsYXIuZm9yRWFjaChzY29wZS5pdGVtcywgZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGl0ZW0uY2hlY2tlZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWUgPSBpdGVtLm1vZGVsO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBtb2RlbEN0cmwuJHNldFZpZXdWYWx1ZSh2YWx1ZSk7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAvLyBmdW5jdGlvbiBmb3Igc2VsZWN0aW9uIG9mIGFsbFxuICAgICAgICAgICAgICAgICAgICBzY29wZS5jaGVja0FsbCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghaXNNdWx0aXBsZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGFuZ3VsYXIuZm9yRWFjaChzY29wZS5pdGVtcywgZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpdGVtLmNoZWNrZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBzZXRNb2RlbFZhbHVlKHRydWUpO1xuICAgICAgICAgICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAgICAgICAgIC8vIGZ1bmN0aW9uIGZvciBzZWxlY3Rpb24gb2Ygbm9uZVxuICAgICAgICAgICAgICAgICAgICBzY29wZS51bmNoZWNrQWxsID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgYW5ndWxhci5mb3JFYWNoKHNjb3BlLml0ZW1zLCBmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW0uY2hlY2tlZCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBzZXRNb2RlbFZhbHVlKHRydWUpO1xuICAgICAgICAgICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAgICAgICAgIHNjb3BlLnNlbGVjdCA9IGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBUT0RPOiBhZGQgc2VsZWN0U2luZ2xlIGZ1bmN0aW9uID8/P1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGlzTXVsdGlwbGUgIT09IGZhbHNlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZWN0TXVsdGlwbGUoaXRlbSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfTtcbiAgICAgICAgfSk7XG5cbi8vIGRpcmVjdGl2ZSBzdG9yaW5nIHRlbXBsYXRlXG5hcHAuZGlyZWN0aXZlKCdib3NzeU11bHRpc2VsZWN0UG9wdXAnLCBbJyRkb2N1bWVudCcsIGZ1bmN0aW9uICgkZG9jdW1lbnQpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHJlc3RyaWN0OiAnRScsXG4gICAgICAgICAgICBzY29wZTogZmFsc2UsXG4gICAgICAgICAgICByZXBsYWNlOiB0cnVlLFxuICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICcuLi90ZW1wbGF0ZXMvYm9zc3kuY29tYm9ib3gubXVsdGlzZWxlY3QuaHRtbCcsXG4gICAgICAgICAgICBsaW5rOiBmdW5jdGlvbiAoc2NvcGUsIGVsZW1lbnQsIGF0dHIpIHtcblxuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgIH1dKTtcbiIsImFuZ3VsYXIubW9kdWxlKCdib3NzeS5kYXRhJywgW10pXG4vKipcbkBuZ2RvYyBzZXJ2aWNlXG5AbmFtZSAkZGF0YVxuQHJlcXVpcmVzICRxXG5AcmVxdWlyZXMgJGh0dHBcblxuKi9cbiAgICAuZmFjdG9yeSgnJGRhdGEnLCBbJyRxJywnJGh0dHAnLCAnJHNjb3BlJywgZnVuY3Rpb24gKCRxLCAkaHR0cCwgJHNjb3BlKSB7XG5cbiAgICAgICAgZnVuY3Rpb24gX2dldERhdGEgKGRhdGEpIHtcbiAgICAgICAgICAgIGlmIChhbmd1bGFyLmlzU3RyaW5nKGRhdGEpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIF9nZXRSZW1vdGVEYXRhKGRhdGEpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAoYW5ndWxhci5pc09iamVjdChkYXRhKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBkYXRhO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAoYW5ndWxhci5pc0Z1bmN0aW9uKGRhdGEpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIF9nZXREYXRhKCBkYXRhLmNhbGwoJHNjb3BlKSApO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgLy9UT0RPOiByZXBsYWNlIGVycm9yIG1lc3NhZ2Ugd2l0aCBvbmxpbmUgZG9jIGxpbmsgbGlrZSBuZyBlcnJvcnNcbiAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKCdkaXJlY3RpdmUuYm9zc3lGb3JtOiBubyBkYXRhIHVybCBvciBvYmplY3QgZ2l2ZW4nKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGZ1bmN0aW9uIF9nZXRSZW1vdGVEYXRhKGRhdGEpIHtcbiAgICAgICAgICAgIHZhciBkZWZlcnJlZCA9ICRxLmRlZmVyKCk7XG5cbiAgICAgICAgICAgICRodHRwLmdldChkYXRhLCB7IHJlc3BvbnNlVHlwZTogJ2pzb24nIH0gKVxuICAgICAgICAgICAgICAgIC5zdWNjZXNzKCBmdW5jdGlvbiggZGF0YSApIHtcbiAgICAgICAgICAgICAgICAgICAgaWYoIGFuZ3VsYXIuaXNPYmplY3QoIGRhdGEgKSApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlc29sdmUoZGF0YSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvL1RPRE86IHJlcGxhY2UgZXJyb3IgbWVzc2FnZSB3aXRoIG9ubGluZSBkb2MgbGluayBsaWtlIG5nIGVycm9yc1xuICAgICAgICAgICAgICAgICAgICAgICAgZGVmZXJyZWQucmVqZWN0KCdkaXJlY3RpdmUuYm9zc3lGb3JtOiBHRVQgcmVxdWVzdCB0byB1cmwgZGlkIG5vdCBwcm9kdWNlIGRhdGEgb2JqZWN0Jyk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIC5lcnJvcihmdW5jdGlvbihyZXNwb25zZURhdGEsIHN0YXR1cykge1xuICAgICAgICAgICAgICAgICAgICAvL1RPRE86IHJlcGxhY2UgZXJyb3IgbWVzc2FnZSB3aXRoIG9ubGluZSBkb2MgbGluayBsaWtlIG5nIGVycm9yc1xuICAgICAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZWplY3QoJ2RpcmVjdGl2ZS5ib3NzeUZvcm06IEdFVCByZXF1ZXN0IHRvIHVybCBcIicgKyBkYXRhICsgJ1wiIGZhaWxlZCB3aXRoIHN0YXR1cyBcIicgKyBzdGF0dXMgKyAnXCInKTtcbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgcmV0dXJuIGRlZmVycmVkLnByb21pc2U7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICBAbmdkb2MgbWV0aG9kXG4gICAgICAgICAgICBAbmFtZSBnZXREYXRhXG4gICAgICAgICAgICBAbWV0aG9kT2YgJGRhdGFcbiAgICAgICAgICAgIEBwYXJhbSB7c3RyaW5nLG9iamVjdCxmdW5jdGlvbn0gZGF0YSBJZiBkYXRhIGlzIGEgc3RyaW5nLCBpdCB3aWxsIGJlIHRyZWF0ZWQgYXMgYSB1cmwgdG8gcmV0cmlldmUgZGF0YSBmcm9tLiBJZiBkYXRhIGlzIGFuIG9iamVjdCBpdCB3aWxsIGJlIGltbWVkaWF0ZWx5IHJldHVybmVkLiBJZiBkYXRhIGlzIGEgZnVuY3Rpb24sIHRoZSBmdW5jdGlvbiB3aWxsIGJlIGNhbGxlZCBhbmQgcHJvY2Vzc2VkIHVudGlsIGFuIG9iamVjdCBpcyBwcm9kdWNlZFxuICAgICAgICAgICAgQHJldHVybnMge09iamVjdH0gRWl0aGVyIGEgJHEgcHJvbWlzZSwgYSBkYXRhIG9iamVjdCBvciBhIHN0cmluZy5cbiAgICAgICAgICAgICovXG4gICAgICAgICAgICBnZXREYXRhOiBfZ2V0RGF0YVxuICAgICAgICB9O1xuICAgIH1dKVxuO1xuIiwiYW5ndWxhci5tb2R1bGUoJ2Jvc3N5LmRhdGFncmlkJywgW10pXG5cdC5jb250cm9sbGVyKCdEYXRhR3JpZENvbnRyb2xsZXInLCBbJyRzY29wZScsIGZ1bmN0aW9uKCRzY29wZSl7XG5cblx0XHR2YXIgbnVtYmVyQ29tcGFyZSA9IGZ1bmN0aW9uKGEsIGIpIHtcblx0XHRcdHZhciByZXN1bHQgPSAwO1xuXHRcdFx0aWYgKGEgPCBiKSB7XG5cdFx0XHRcdHJlc3VsdCA9IC0xO1xuXHRcdFx0fSBlbHNlIGlmIChhID4gYikge1xuXHRcdFx0XHRyZXN1bHQgPSAxO1xuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIHJlc3VsdDtcblx0XHR9O1xuXG5cdFx0dmFyIHN0cmluZ0NvbXBhcmUgPSBmdW5jdGlvbihhLCBiKSB7XG5cdFx0XHQvLyB0b0xvd2VyQ2FzZSBuZWVkZWQgdG8gc3VwcG9ydCBhbGwgYnJvd3NlcnNcblx0XHRcdHJldHVybiBhLnRvTG93ZXJDYXNlKCkubG9jYWxlQ29tcGFyZShiLnRvTG93ZXJDYXNlKCkpO1xuXHRcdH07XG5cblx0XHR2YXIgZm9ybWF0dGVkTnVtYmVyQ29tcGFyZSA9IGZ1bmN0aW9uKGEsIGIpIHtcblx0XHRcdC8vIHN0cmlwIG5vbi1udW1lcmljIGNoYXJhY3RlcnMsIGFuZCBjb252ZXJ0IHRvIG51bWJlciB3aXRoIHVuYXJ5IHBsdXNcblx0XHRcdGEgPSArYS5yZXBsYWNlKC9bXlxcZC4tXS9naSwgJycpO1xuXHRcdFx0YiA9ICtiLnJlcGxhY2UoL1teXFxkLi1dL2dpLCAnJyk7XG5cdFx0XHRyZXR1cm4gbnVtYmVyQ29tcGFyZShhLCBiKTtcblx0XHR9O1xuXG5cdFx0dmFyIGNvbHVtbkNvbXBhcmUgPSBmdW5jdGlvbihhLCBiLCBjb2x1bW5JbmRleCl7XG5cdFx0XHR2YXIgY29sdW1uVHlwZSA9ICRzY29wZS5jb25maWcuZGF0YS5jb2x1bW5zW2NvbHVtbkluZGV4XS50eXBlLFxuXHRcdFx0XHRyZXN1bHQgPSAwO1xuXHRcdFx0aWYgKGNvbHVtblR5cGUgPT09ICdudW1iZXInKSB7XG5cdFx0XHRcdHJlc3VsdCA9IG51bWJlckNvbXBhcmUoYVtjb2x1bW5JbmRleF0sIGJbY29sdW1uSW5kZXhdKTtcblx0XHRcdH0gZWxzZSBpZiAoY29sdW1uVHlwZSA9PT0gJ3N0cmluZycpIHtcblx0XHRcdFx0cmVzdWx0ID0gc3RyaW5nQ29tcGFyZShhW2NvbHVtbkluZGV4XSwgYltjb2x1bW5JbmRleF0pO1xuXHRcdFx0fSBlbHNlIGlmIChjb2x1bW5UeXBlID09PSAnbW9uZXknKSB7XG5cdFx0XHRcdHJlc3VsdCA9IGZvcm1hdHRlZE51bWJlckNvbXBhcmUoYVtjb2x1bW5JbmRleF0sIGJbY29sdW1uSW5kZXhdKTtcblx0XHRcdH1cblx0XHRcdHJldHVybiByZXN1bHQ7XG5cdFx0fTtcblxuXHRcdHZhciBjYWxjdWxhdGVTb3J0ZGlyZWN0aW9uID0gZnVuY3Rpb24oY29sdW1uSW5kZXgpe1xuXHRcdFx0Ly8gMSA9IGFzYyBvciAgLTEgPSBkZXNjXG5cdFx0XHRpZiAoJHNjb3BlLmNvbmZpZy5kYXRhLmNvbHVtbnNbY29sdW1uSW5kZXhdLnNvcnREaXJlY3Rpb24pIHtcblx0XHRcdFx0JHNjb3BlLmNvbmZpZy5kYXRhLmNvbHVtbnNbY29sdW1uSW5kZXhdLnNvcnREaXJlY3Rpb24gPSAtJHNjb3BlLmNvbmZpZy5kYXRhLmNvbHVtbnNbY29sdW1uSW5kZXhdLnNvcnREaXJlY3Rpb247XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHQkc2NvcGUuY29uZmlnLmRhdGEuY29sdW1uc1tjb2x1bW5JbmRleF0uc29ydERpcmVjdGlvbiA9IDE7XG5cdFx0XHR9XG5cblx0XHRcdHJldHVybiAkc2NvcGUuY29uZmlnLmRhdGEuY29sdW1uc1tjb2x1bW5JbmRleF0uc29ydERpcmVjdGlvbjtcblx0XHR9O1xuXG5cdFx0JHNjb3BlLnNvcnRDb2x1bW4gPSBmdW5jdGlvbihjb2x1bW5JbmRleCkge1xuXHRcdFx0dmFyIHNvcnREaXJlY3Rpb24gPSBjYWxjdWxhdGVTb3J0ZGlyZWN0aW9uKGNvbHVtbkluZGV4KTtcblxuXHRcdFx0JHNjb3BlLmNvbmZpZy5kYXRhLnJvd3MgPSAkc2NvcGUuY29uZmlnLmRhdGEucm93cy5zb3J0KGZ1bmN0aW9uKGEsIGIpe1xuXHRcdFx0XHRyZXR1cm4gc29ydERpcmVjdGlvbiAqIGNvbHVtbkNvbXBhcmUoYSwgYiwgY29sdW1uSW5kZXgpO1xuXHRcdFx0fSk7XG5cdFx0fTtcblx0fV0pXG5cdC5kaXJlY3RpdmUoJ2Jvc3N5RGF0YWdyaWQnLCBbZnVuY3Rpb24oKVxuXHR7XG5cdFx0cmV0dXJuIHtcblx0XHRcdHJlc3RyaWN0OiAnRUEnLFxuXHRcdFx0c2NvcGU6IHtcblx0XHRcdFx0Y29uZmlnOiAnPSdcblx0XHRcdH0sXG5cdFx0XHR0ZW1wbGF0ZVVybDogJ2Jvc3N5LmRhdGFncmlkLmh0bWwnLFxuXHRcdFx0Y29udHJvbGxlcjogJ0RhdGFHcmlkQ29udHJvbGxlcidcblx0XHR9O1xuXHR9XSk7XG4iLCJhbmd1bGFyLm1vZHVsZSgnYm9zc3kuZHJvcGRvd24nLCBbXSlcblx0LnJ1bihmdW5jdGlvbigkdGVtcGxhdGVDYWNoZSl7XG4gICAgICAgICR0ZW1wbGF0ZUNhY2hlLnB1dCgnYm9zc3ktZHJvcGRvd24uaHRtbCcsICc8ZGl2PjxzZWxlY3Qgbmctb3B0aW9ucz1cIml0ZW1bZHJvcGRvd24udGl0bGVdIGZvciBpdGVtIGluIGRyb3Bkb3duLml0ZW1zIHwgb3JkZXJCeTogZHJvcGRvd24udGl0bGVcIiBuZy1tb2RlbD1cInNlbGVjdGVkSXRlbVwiIG5nLWNoYW5nZT1cImRyb3Bkb3duLnVwZGF0ZVNlbGVjdGVkSXRlbShzZWxlY3RlZEl0ZW0pXCI+PG9wdGlvbiB2YWx1ZT1cIlwiIG5nLWhpZGU9XCJzZWxlY3RlZEl0ZW1cIj5QbGVhc2Ugc2VsZWN0IG9uZS4uLjwvb3B0aW9uPjwvc2VsZWN0PjwvZGl2PicpO1xuICAgIH0pXG5cdC5kaXJlY3RpdmUoJ2Jvc3N5RHJvcGRvd24nLCBmdW5jdGlvbigkaHR0cCwgJGNvbXBpbGUpIHtcblx0XHRyZXR1cm4ge1xuXHRcdFx0cmVzdHJpY3Q6ICdFQScsXG5cdFx0XHRzY29wZToge1xuXHRcdFx0XHRjb25maWc6ICc9Jyxcblx0XHRcdFx0c2VsZWN0OiAnPScsXG5cdFx0XHRcdGl0ZW1zOiAnPSdcblx0XHRcdH0sXG5cdFx0XHR0ZW1wbGF0ZVVybDogJycsXG5cdFx0XHRsaW5rOiBmdW5jdGlvbihzY29wZSwgZWxlbWVudCwgYXR0cnMpIHtcblx0XHRcdFx0dmFyIGN1c3RvbVRlbXBsYXRlO1xuXG5cdFx0XHRcdC8vQ2hlY2tzIGlmIHVzZXIgaXMgZGVmaW5pbmcgYSB1cmwgb3IgaW5uZXIgaHRtbFxuXHRcdFx0XHQvL0lmIGl0IGlzIGEgdXJsLCB0aGUgdGVtcGxhdGUgbXVzdCBiZSBsb2NhdGVkIGluIGEgbG9jYWwgZGlyZWN0b3J5IG9yIGFkZGVkIHRvIHRoZSBET00gdmlhIG5nLWluY2x1ZGVcblx0XHRcdFx0aWYoc2NvcGUuZHJvcGRvd24udGVtcGxhdGVbMF0gIT09ICc8Jykge1xuXHRcdFx0XHRcdGN1c3RvbVRlbXBsYXRlID0gJGNvbXBpbGUoJzxuZy1pbmNsdWRlIHNyYz1cImRyb3Bkb3duLnRlbXBsYXRlXCI+PC9uZy1pbmNsdWRlPicpKHNjb3BlKTtcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRjdXN0b21UZW1wbGF0ZSA9ICRjb21waWxlKHNjb3BlLmRyb3Bkb3duLnRlbXBsYXRlKShzY29wZSk7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHQvL0luamVjdHMgdGVtcGxhdGVcblx0XHRcdFx0ZWxlbWVudC5yZXBsYWNlV2l0aChjdXN0b21UZW1wbGF0ZSk7XG5cdFx0XHR9LFxuXHRcdFx0Y29udHJvbGxlcjogZnVuY3Rpb24oJHNjb3BlKSB7XG5cdFx0XHRcdHZhciB0aGlzRHJvcGRvd24gPSB0aGlzO1xuXHRcdFx0XHR0aGlzRHJvcGRvd24udGl0bGUgPSAkc2NvcGUuY29uZmlnLnRpdGxlO1xuXHRcdFx0XHR0aGlzRHJvcGRvd24uaXRlbXMgPSBbXTtcblxuXHRcdFx0XHQvL1JldHJpZXZlIGpzb24gY29udGFpbmluZyBvYmplY3RzIHRvIHBvcHVsYXRlIHRoZSBkcm9wZG93bi5cblx0XHRcdFx0aWYoJHNjb3BlLmNvbmZpZy5zcmMpIHtcblx0XHRcdFx0XHQvL0NoZWNrcyB0aGF0IGNvbmZpZy5zcmMgaXMgYSBKU09OIGZpbGUuXG5cdFx0XHRcdFx0aWYoJHNjb3BlLmNvbmZpZy5zcmMuc3Vic3RyKCRzY29wZS5jb25maWcuc3JjLmxlbmd0aC01LCAkc2NvcGUuY29uZmlnLnNyYy5sZW5ndGgpID09PSAnLmpzb24nKSB7XG5cdFx0XHRcdFx0XHQkaHR0cC5nZXQoJHNjb3BlLmNvbmZpZy5zcmMpXG5cdFx0XHRcdFx0XHRcdC5zdWNjZXNzKGZ1bmN0aW9uKGRhdGEpIHtcblx0XHRcdFx0XHRcdFx0XHR0aGlzRHJvcGRvd24uaXRlbXMgPSBkYXRhO1xuXHRcdFx0XHRcdFx0XHRcdC8vQ2hlY2tzIHZhbGlkaXR5IG9mIHRoZSB0aXRsZSBmaWVsZCBhcyBpdCBhcHBsaWVzIHRvIHRoZSBKU09OLlxuXHRcdFx0XHRcdFx0XHRcdGlmKCF0aGlzRHJvcGRvd24uaXRlbXNbMF0uaGFzT3duUHJvcGVydHkodGhpc0Ryb3Bkb3duLnRpdGxlKSkge1xuXHRcdFx0XHRcdFx0XHRcdFx0Y29uc29sZS5lcnJvcignRVJST1I6ICRzY29wZS5jb25maWcudGl0bGU6IFwiJyArICRzY29wZS5jb25maWcudGl0bGUgKyAnXCIgaXMgbm90IGEgbWVtYmVyIG9mIHRoZSBsb2FkZWQgSlNPTiBkYXRhLiBQbGVhc2Ugc3BlY2lmeSBhIHZhbGlkIFwidGl0bGVcIiB0byBsaXN0LicpO1xuXHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0XHQvL0F0dGFjaGVzIHJldHJpZXZlZCBpdGVtcyB0byAkc2NvcGUuaXRlbXMgZm9yIGFkZGl0aW9uYWwgZnVuY3Rpb25hbGl0eS5cblx0XHRcdFx0XHRcdFx0XHRpZigkc2NvcGUuaXRlbXMpIHtcblx0XHRcdFx0XHRcdFx0XHRcdCRzY29wZS5pdGVtcyA9IHRoaXNEcm9wZG93bi5pdGVtcztcblx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdH0pXG5cdFx0XHRcdFx0XHRcdC5lcnJvcihmdW5jdGlvbihkYXRhKSB7XG5cdFx0XHRcdFx0XHRcdFx0Y29uc29sZS5lcnJvcignRVJST1I6IEZhaWwgdG8gbG9hZCBKU09OIGRhdGEgZnJvbSB0aGUgcGF0aDogXCInICsgJHNjb3BlLmNvbmZpZy5zcmMgKyAnXCInKTtcblx0XHRcdFx0XHRcdFx0fSk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdC8vTG9ncyBhbiBlcnJvciB0byBpZGVudGlmeSB0aGF0IGEganNvbiBmaWxlIHdhcyBub3QgbG9hZGVkLlxuXHRcdFx0XHRcdGVsc2Uge1xuXHRcdFx0XHRcdFx0Y29uc29sZS5lcnJvcignRVJST1I6IFwiJHNjb3BlLmNvbmZpZy5zcmNcIjogXCInICsgJHNjb3BlLmNvbmZpZy5zcmMgKyAnXCIgaXMgbm90IGEgdmFsaWQgSlNPTiBmaWxlLicpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHQvL0Z1bmN0aW9uIGNhbGxlZCB0byB1cGRhdGUgc2VsZWN0IGluIHRoZSB0ZW1wbGF0ZS5cblx0XHRcdFx0XHR0aGlzRHJvcGRvd24udXBkYXRlU2VsZWN0ZWRJdGVtID0gZnVuY3Rpb24oc2VsZWN0ZWRJdGVtKSB7XG5cdFx0XHRcdFx0XHQvL1NpbmdsZSBzZWxlY3Qgb2JqZWN0IHRpZWQgdG8gdGhlIGNvbmZpZyBvYmplY3QuXG5cdFx0XHRcdFx0XHRpZiAoJHNjb3BlLmNvbmZpZy5zZWxlY3QpIHtcblx0XHRcdFx0XHRcdFx0JHNjb3BlLmNvbmZpZy5zZWxlY3QgPSBzZWxlY3RlZEl0ZW07XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHQvL1VzZXIgY2FuIGNvbGxlY3QgYW5kIHV0aWxpemUgbXVsdGlwbGUgc2VsZWN0IG9iamVjdHMgd2l0aCB0aGUgc2FtZSBjb25maWcgb2JqZWN0IGlmIHBhc3NpbmcgaW4gYSBkaXN0aW5jdCBzZWxlY3QgcGFyYW0uXG5cdFx0XHRcdFx0XHRpZiAoJHNjb3BlLnNlbGVjdCkge1xuXHRcdFx0XHRcdFx0XHQkc2NvcGUuc2VsZWN0ID0gc2VsZWN0ZWRJdGVtO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH07XG5cdFx0XHRcdFx0Ly9EZXRlcm1pbmUgaWYgY3VzdG9tIHRlbXBsYXRlIFVybCBoYXMgYmVlbiBkZWZpbmVkLlxuXHRcdFx0XHRcdGlmICgkc2NvcGUuY29uZmlnLnRlbXBsYXRlKSB7XG5cdFx0XHRcdFx0XHR0aGlzRHJvcGRvd24udGVtcGxhdGUgPSAkc2NvcGUuY29uZmlnLnRlbXBsYXRlO1xuXHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHR0aGlzRHJvcGRvd24udGVtcGxhdGUgPSAnYm9zc3ktZHJvcGRvd24uaHRtbCc7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHRcdC8vTG9ncyBhbiBlcnJvciBpZiAnc3JjJyBoYXMgbm90IGJlZW4gZGVmaW5lZC5cblx0XHRcdFx0ZWxzZSB7XG5cdFx0XHRcdFx0Y29uc29sZS5lcnJvcignRVJST1I6IFwiJHNjb3BlLmNvbmZpZy5zcmNcIiBoYXMgbm90IGJlZW4gc3BlY2lmaWVkIHdpdGhpbiB0aGUgXCJjb25maWdcIiBvYmplY3QuIFBsZWFzZSBwYXNzIGluIGEgdmFsaWQgcGF0aCB0byBhIEpTT04gZmlsZS4nKTtcblx0XHRcdFx0fVxuXHRcdFx0fSxcblx0XHRcdGNvbnRyb2xsZXJBczogJ2Ryb3Bkb3duJ1xuXHRcdH07XG5cdH0pO1xuIiwiYW5ndWxhci5tb2R1bGUoJ2Jvc3N5LmZvcm0nLCBbXSlcbiAgICAucnVuKGZ1bmN0aW9uKCR0ZW1wbGF0ZUNhY2hlKXtcbiAgICAgICAgJHRlbXBsYXRlQ2FjaGUucHV0KCdib3NzeS1pbnB1dC5odG1sJywgJ3RlbXBsYXRlcy9ib3NzeS1pbnB1dC5odG1sJyk7XG4gICAgfSlcbiAgICAuZGlyZWN0aXZlKCdib3NzeUZvcm0nLFsnJGNvbXBpbGUnLCckaHR0cCcsJyRzY2hlbWEnLCckZGF0YScsIGZ1bmN0aW9uICgkY29tcGlsZSwgJGh0dHAsICRzY2hlbWEsICRkYXRhKSB7XG4gICAgICAgIHZhciBfc2NoZW1hLFxuICAgICAgICAgICAgX2RhdGEsXG4gICAgICAgICAgICBfb3B0aW9ucyA9IHtcbiAgICAgICAgICAgICAgICBzaG93TGFiZWxzOiB0cnVlLFxuICAgICAgICAgICAgICAgIGhlYWRlcjogJ1RoaXMgaXMgaGVhZGVyJyxcbiAgICAgICAgICAgICAgICBmb290ZXI6ICdUaGlzIGlzIGZvb3RlcicsXG4gICAgICAgICAgICAgICAgdGhlbWU6ICdncmVlbicsXG4gICAgICAgICAgICAgICAgYnV0dG9uOiAnU2F2ZSdcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBfaXRlbVRlbXBsYXRlID0ge1xuICAgICAgICAgICAgICAgIG51bWJlcjogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gJzxpbnB1dCB0eXBlPVwibnVtYmVyXCIvPic7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB0ZXh0OiBmdW5jdGlvbiAob2JqLCBrZXksIGlzUmVxdWlyZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuICc8Ym9zc3ktaW5wdXQgdGl0bGU9XCJcXCcnK29iai50aXRsZSsnXFwnXCIgdHlwZT1cIlxcJycrIG9iai5pbnB1dFR5cGUgKydcXCdcIiB2YWx1ZT1cIlxcJycrX2RhdGEuYWRkcmVzc1trZXldKydcXCdcIicgKyAoIGlzUmVxdWlyZWQgPyAnIHJlcXVpcmVkJyA6ICcnICkgKyAnPjwvYm9zc3ktaW5wdXQ+JztcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHRleHRBcmVhOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAnPHRleHRhcmVhPjwvdGV4dGFyZWE+JztcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGNoZWNrYm94OiBmdW5jdGlvbihvYmope1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gJzxkaXYgY2xhc3M9XCJjaGVja2JveFwiPjxsYWJlbD48aW5wdXQgdHlwZT1cImNoZWNrYm94XCI+JytvYmoudGl0bGUrJzwvbGFiZWw+PC9kaXY+JztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgIGZ1bmN0aW9uIHNldERhdGEoZGF0YSkge1xuICAgICAgICAgICAgdmFyIHJlc3VsdCA9ICRkYXRhLmdldERhdGEoZGF0YSk7XG4gICAgICAgICAgICBpZiggYW5ndWxhci5pc0Z1bmN0aW9uKCByZXN1bHQudGhlbiApICYmIGFuZ3VsYXIuaXNGdW5jdGlvbiggcmVzdWx0LmNhdGNoICkgJiYgYW5ndWxhci5pc0Z1bmN0aW9uKCByZXN1bHQuZmluYWxseSApICkge1xuICAgICAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIF9kYXRhID0gcmVzdWx0O1xuICAgICAgICAgICAgfVxuXG4gICAgICAgIH1cblxuICAgICAgICBmdW5jdGlvbiBzZXRTY2hlbWEoc2NoZW1hKSB7XG4gICAgICAgICAgICBfc2NoZW1hID0gJHNjaGVtYS5nZXRTY2hlbWEoc2NoZW1hKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGZ1bmN0aW9uIGJ1aWxkVGVtcGxhdGUoc2NoZW1hUGFydCwgcGFyZW50S2V5LCByZXF1aXJlZCkge1xuICAgICAgICAgICAgdmFyIHRlbXBsYXRlID0gJycsXG4gICAgICAgICAgICAgICAgZnVsbEtleSA9ICcnO1xuICAgICAgICAgICAgYW5ndWxhci5mb3JFYWNoKHNjaGVtYVBhcnQsIGZ1bmN0aW9uKHZhbHVlLCBrZXkpIHtcbiAgICAgICAgICAgICAgICBpZiAodmFsdWUudHlwZSkge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhmdWxsS2V5ICsgJyBpcyAnKyB2YWx1ZS50eXBlKTtcbiAgICAgICAgICAgICAgICAgICAgc3dpdGNoICh2YWx1ZS50eXBlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlICdvYmplY3QnOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciByZXF1aXJlZExpc3QgPSB0eXBlb2YoIHZhbHVlLnJlcXVpcmVkICkgIT09ICd1bmRlZmluZWQnID8gdmFsdWUucmVxdWlyZWQgOiBudWxsO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlICs9IGJ1aWxkVGVtcGxhdGUodmFsdWUucHJvcGVydGllcywgZnVsbEtleSwgcmVxdWlyZWRMaXN0ICk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlICdhcnJheSc6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGUgKz0gYnVpbGRUZW1wbGF0ZSh2YWx1ZS5pdGVtcy5wcm9wZXJ0aWVzLCBmdWxsS2V5KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ251bWJlcicgfHwgJ2ludGVnZXInOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlICs9IF9pdGVtVGVtcGxhdGUubnVtYmVyKHZhbHVlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ3N0cmluZyc6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGlzUmVxdWlyZWQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiggcmVxdWlyZWQgJiYgcmVxdWlyZWQuaW5kZXhPZihrZXkpICE9PSAtMSApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaXNSZXF1aXJlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlICs9IF9pdGVtVGVtcGxhdGUudGV4dCh2YWx1ZSwga2V5LCBpc1JlcXVpcmVkKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ2Jvb2xlYW4nOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlICs9IF9pdGVtVGVtcGxhdGUuY2hlY2tib3godmFsdWUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSwgdGhpcyk7XG4gICAgICAgICAgICByZXR1cm4gdGVtcGxhdGU7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgcmVzdHJpY3Q6ICdFJyxcbiAgICAgICAgICAgIHJlcGxhY2U6IHRydWUsXG4gICAgICAgICAgICB0ZW1wbGF0ZTogJycsXG4gICAgICAgICAgICBzY29wZToge1xuICAgICAgICAgICAgICAgIGNvbmZpZzonPScsIC8vQ3JlYXRlIHNjb3BlIGlzb2xhdGlvbiB3aXRoIGJpLWRpcmVjdGlvbmFsIGJpbmRpbmcsXG4gICAgICAgICAgICAgICAgdGl0bGU6ICc9J1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGxpbms6IGZ1bmN0aW9uIChzY29wZSwgZWxlbWVudCwgYXR0cmlidXRlcykge1xuICAgICAgICAgICAgICAgIHNjb3BlLmNvbmZpZy5vcHRpb25zID0gYW5ndWxhci5leHRlbmQoX29wdGlvbnMsIHNjb3BlLmNvbmZpZy5vcHRpb25zKTtcblxuICAgICAgICAgICAgICAgIHZhciBwcm9taXNlID0gc2V0RGF0YShzY29wZS5jb25maWcuZGF0YSk7XG4gICAgICAgICAgICAgICAgc2V0U2NoZW1hKHNjb3BlLmNvbmZpZy5zY2hlbWEpO1xuICAgICAgICAgICAgICAgIGlmKCBwcm9taXNlICkge1xuICAgICAgICAgICAgICAgICAgICAvL3RvZG86IHNldCBkaXJlY3RpdmUgdG8gbG9hZGluZyBzdGF0ZVxuICAgICAgICAgICAgICAgICAgICBwcm9taXNlLnRoZW4oXG4gICAgICAgICAgICAgICAgICAgICAgICBmdW5jdGlvbihyZXN1bHQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL3RvZG86IHNldCBkaXJlY3RpdmUgdG8gbG9hZGVkIHN0YXRlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgX2RhdGEgPSByZXN1bHQ7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxlbWVudC5odG1sKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnPGZvcm0gbm92YWxpZGF0ZSBjbGFzcz1cInt7Y29uZmlnLm9wdGlvbnMudGhlbWV9fVwiPicrXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICc8ZGl2IGNsYXNzPVwiYmFubmVyIHBhZ2UtaGVhZGVyXCI+PGgzPnt7Y29uZmlnLm9wdGlvbnMuaGVhZGVyfX08L2gzPjwvZGl2PicrXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBidWlsZFRlbXBsYXRlKF9zY2hlbWEpICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICc8YnV0dG9uIG5nLWlmPVwiY29uZmlnLm9wdGlvbnMuYnV0dG9uXCI+e3tjb25maWcub3B0aW9ucy5idXR0b259fTwvYnV0dG9uPicgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnPGRpdiBjbGFzcz1cInBhZ2UtZm9vdGVyXCI+PGgzPnt7Y29uZmlnLm9wdGlvbnMuZm9vdGVyfX08L2gzPjwvZGl2PicrXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICc8L2Zvcm0+J1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJGNvbXBpbGUoZWxlbWVudC5jb250ZW50cygpKShzY29wZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgZnVuY3Rpb24ocmVhc29uKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy90b2RvOiBzZXQgZGlyZWN0aXZlIHRvIGVycm9yIHN0YXRlXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgZWxlbWVudC5odG1sKFxuICAgICAgICAgICAgICAgICAgICAgICAgJzxmb3JtIG5vdmFsaWRhdGUgY2xhc3M9XCJ7e2NvbmZpZy5vcHRpb25zLnRoZW1lfX1cIj5MT0FESU5HLi4uPC9mb3JtPidcbiAgICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICAgICAgJGNvbXBpbGUoZWxlbWVudC5jb250ZW50cygpKShzY29wZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBlbGVtZW50Lmh0bWwoXG4gICAgICAgICAgICAgICAgICAgICAgICAnPGZvcm0gbm92YWxpZGF0ZSBjbGFzcz1cInt7Y29uZmlnLm9wdGlvbnMudGhlbWV9fVwiPicrXG4gICAgICAgICAgICAgICAgICAgICAgICAnPGRpdiBjbGFzcz1cImJhbm5lciBwYWdlLWhlYWRlclwiPjxoMz57e2NvbmZpZy5vcHRpb25zLmhlYWRlcn19PC9oMz48L2Rpdj4nK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJ1aWxkVGVtcGxhdGUoX3NjaGVtYSkgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICc8YnV0dG9uIG5nLWlmPVwiY29uZmlnLm9wdGlvbnMuYnV0dG9uXCI+e3tjb25maWcub3B0aW9ucy5idXR0b259fTwvYnV0dG9uPicgK1xuICAgICAgICAgICAgICAgICAgICAgICAgJzxkaXYgY2xhc3M9XCJwYWdlLWZvb3RlclwiPjxoMz57e2NvbmZpZy5vcHRpb25zLmZvb3Rlcn19PC9oMz48L2Rpdj4nK1xuICAgICAgICAgICAgICAgICAgICAgICAgJzwvZm9ybT4nXG4gICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgICAgICRjb21waWxlKGVsZW1lbnQuY29udGVudHMoKSkoc2NvcGUpO1xuICAgICAgICAgICAgICAgIH1cblxuXG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG5cbiAgICB9XSlcbjsiLCJhbmd1bGFyLm1vZHVsZSgnYm9zc3kuaW5wdXQnLCBbXSlcbiAgICAucnVuKGZ1bmN0aW9uKCR0ZW1wbGF0ZUNhY2hlKXtcbiAgICAgICAgJHRlbXBsYXRlQ2FjaGUucHV0KCdib3NzeS1pbnB1dC5odG1sJywgJzxkaXYgY2xhc3M9XCJmb3JtLWdyb3VwIGJvc3N5LWlucHV0XCI+PGxhYmVsIGZvcj1cIlwiPnt7dGl0bGV9fTwvbGFiZWw+PGlucHV0IHR5cGU9XCJ7e3R5cGV9fVwiIGNsYXNzPVwiZm9ybS1jb250cm9sXCIgcGxhY2Vob2xkZXI9XCJcIiB2YWx1ZT1cInt7dmFsdWV9fVwiLz48c3Bhbj48L3NwYW4+PC9kaXY+Jyk7XG4gICAgfSlcbiAgICAuZGlyZWN0aXZlKCdib3NzeUlucHV0JyxbJyRjb21waWxlJywnJGh0dHAnLCckc2NoZW1hJywnJGRhdGEnLCckdGVtcGxhdGVDYWNoZScsIGZ1bmN0aW9uICgkY29tcGlsZSwgJGh0dHAsICRzY2hlbWEsICRkYXRhLCAkdGVtcGxhdGVDYWNoZSkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgcmVzdHJpY3Q6ICdFJyxcbiAgICAgICAgICAgIHJlcGxhY2U6IHRydWUsXG4gICAgICAgICAgICBzY29wZToge1xuICAgICAgICAgICAgICAgIHRpdGxlOiAnPScsXG4gICAgICAgICAgICAgICAgdmFsdWU6ICc9JyxcbiAgICAgICAgICAgICAgICB0eXBlOiAnPScsXG4gICAgICAgICAgICAgICAgcmVxdWlyZWQ6ICc9J1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHRlbXBsYXRlOiAkdGVtcGxhdGVDYWNoZS5nZXQoJ2Jvc3N5LWlucHV0Lmh0bWwnKVxuICAgICAgICB9O1xuICAgIH1dKTsiLCJ2YXIgYXBwID0gYW5ndWxhci5tb2R1bGUoJ2Jvc3N5Lm51bWVyaWN0ZXh0Ym94JyxbXSk7XG5cblxuYXBwLmNvbnRyb2xsZXIoJ2Jvc3N5bnVtZXJpY0N0cmwnLGZ1bmN0aW9uKCRzY29wZSl7XG4gICAgdmFyIHN5bWJvbHM9WyckJywnJScsJ2xicyddO1xuICAgIHZhciBpbml0aWFsVmFsdWU9MDtcblxuXG4gICAgdmFyIGtleSA9IHtcbiAgICAgICAgcHJpY2U6MCxcbiAgICAgICAgd2VpZ2h0OjAsXG4gICAgICAgIGRpc2NvdW50OjAsXG4gICAgICAgIHN0b2NrOjBcbiAgICB9O1xuXG5cbiAgICAkc2NvcGUucCA9IHN5bWJvbHNbMF0gKyBpbml0aWFsVmFsdWU7XG4gICAgJHNjb3BlLncgPSBpbml0aWFsVmFsdWUgKyBzeW1ib2xzWzJdO1xuICAgICRzY29wZS5kID0gaW5pdGlhbFZhbHVlICsgc3ltYm9sc1sxXTtcbiAgICAkc2NvcGUucyA9IGluaXRpYWxWYWx1ZTtcblxuICAgICRzY29wZS5pbmNyZW1lbnQgPSBmdW5jdGlvbihhKXtcbiAgICAgICAgc3dpdGNoKGEpe1xuICAgICAgICAgICAgY2FzZSAncHJpY2UnOlxuICAgICAgICAgICAgICAgIGtleS5wcmljZSsrO1xuICAgICAgICAgICAgICAgICRzY29wZS5wID0gc3ltYm9sc1swXSArIGtleS5wcmljZTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJ3dlaWdodCc6XG4gICAgICAgICAgICAgICAga2V5LndlaWdodCsrO1xuICAgICAgICAgICAgICAgICRzY29wZS53PWtleS53ZWlnaHQgKyBzeW1ib2xzWzJdO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAnZGlzY291bnQnOlxuICAgICAgICAgICAgICAgIGtleS5kaXNjb3VudCsrO1xuICAgICAgICAgICAgICAgICRzY29wZS5kID0ga2V5LmRpc2NvdW50ICsgc3ltYm9sc1sxXTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJ3N0b2NrJzpcbiAgICAgICAgICAgICAgICBrZXkuc3RvY2srKztcbiAgICAgICAgICAgICAgICAkc2NvcGUucz1rZXkuc3RvY2s7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgfTtcbiAgICAkc2NvcGUuZGVjcmVtZW50ID0gZnVuY3Rpb24oYSl7XG5cbiAgICAgICAgc3dpdGNoKGEpe1xuICAgICAgICAgICAgY2FzZSAncHJpY2UnOlxuICAgICAgICAgICAgICAgIGlmKGtleS5wcmljZT4wKVxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAga2V5LnByaWNlLS07XG4gICAgICAgICAgICAgICAgICAgICRzY29wZS5wID0gc3ltYm9sc1swXSArIGtleS5wcmljZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICd3ZWlnaHQnOlxuICAgICAgICAgICAgICAgIGlmKGtleS53ZWlnaHQ+MCl7XG4gICAgICAgICAgICAgICAgICAgIGtleS53ZWlnaHQtLTtcbiAgICAgICAgICAgICAgICAgICAgJHNjb3BlLnc9a2V5LndlaWdodCArIHN5bWJvbHNbMl07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAnZGlzY291bnQnOlxuICAgICAgICAgICAgICAgIGlmKGtleS5kaXNjb3VudD4wKVxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAga2V5LmRpc2NvdW50LS07XG4gICAgICAgICAgICAgICAgICAgICRzY29wZS5kID0ga2V5LmRpc2NvdW50KyBzeW1ib2xzWzFdO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJ3N0b2NrJzpcbiAgICAgICAgICAgICAgICBpZihrZXkuc3RvY2s+MCl7XG4gICAgICAgICAgICAgICAgICAgIGtleS5zdG9jay0tO1xuICAgICAgICAgICAgICAgICAgICAkc2NvcGUucz1rZXkuc3RvY2s7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuXG4gICAgfTtcblxufSk7XG5cblxuYXBwLmRpcmVjdGl2ZSgnYm9zc3ludW1lcmljdGV4dGJveCcsZnVuY3Rpb24oKXtcbiAgICByZXR1cm57XG4gICAgICAgIGNvbnRyb2xsZXI6J2Jvc3N5bnVtZXJpY0N0cmwnLFxuICAgICAgICByZXN0cmljdDonRScsXG4gICAgICAgIHRyYW5zY2x1ZGU6dHJ1ZSxcbiAgICAgICAgdGVtcGxhdGVVcmw6J2Jvc3N5Lm51bWVyaWN0ZXh0Ym94Lmh0bWwnXG5cbiAgICB9O1xufSk7IiwiYW5ndWxhci5tb2R1bGUoJ2Jvc3N5LnNjaGVtYScsIFtdKVxuICAgIC5mYWN0b3J5KCckc2NoZW1hJywgWyckcScsICckaHR0cCcsIGZ1bmN0aW9uICgkcSwgJGh0dHApIHtcblxuICAgICAgICBmdW5jdGlvbiBfZ2V0U2NoZW1hIChzY2hlbWEpIHtcbiAgICAgICAgICAgIGlmIChhbmd1bGFyLmlzU3RyaW5nKHNjaGVtYSkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gX2dldFJlbW90ZVNjaGVtYShzY2hlbWEpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAoYW5ndWxhci5pc09iamVjdChzY2hlbWEpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHNjaGVtYTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIC8vVE9ETzogcmVwbGFjZSBlcnJvciBtZXNzYWdlIHdpdGggb25saW5lIGRvYyBsaW5rIGxpa2UgbmcgZXJyb3JzXG4gICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcignZGlyZWN0aXZlLmJvc3N5Rm9ybTogbm8gc2NoZW1hIHVybCBvciBvYmplY3QgZ2l2ZW4nKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGZ1bmN0aW9uIF9nZXRSZW1vdGVTY2hlbWEoc2NoZW1hKSB7XG4gICAgICAgICAgICB2YXIgZGVmZXJyZWQgPSAkcS5kZWZlcigpO1xuXG4gICAgICAgICAgICAkaHR0cC5nZXQoIHNjaGVtYSApXG4gICAgICAgICAgICAgICAgLnN1Y2Nlc3MoIGZ1bmN0aW9uKCBkYXRhICkge1xuICAgICAgICAgICAgICAgICAgICBpZiggYW5ndWxhci5pc09iamVjdCggZGF0YSApICkge1xuICAgICAgICAgICAgICAgICAgICAgICAgZGVmZXJyZWQucmVzb2x2ZShkYXRhKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vVE9ETzogcmVwbGFjZSBlcnJvciBtZXNzYWdlIHdpdGggb25saW5lIGRvYyBsaW5rIGxpa2UgbmcgZXJyb3JzXG4gICAgICAgICAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZWplY3QoJ2RpcmVjdGl2ZS5ib3NzeUZvcm06IEdFVCByZXF1ZXN0IHRvIHVybCBkaWQgbm90IHByb2R1Y2Ugc2NoZW1hIG9iamVjdCcpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAuZXJyb3IoIGZ1bmN0aW9uKGRhdGEsIHN0YXR1cykge1xuICAgICAgICAgICAgICAgICAgICAvL1RPRE86IHJlcGxhY2UgZXJyb3IgbWVzc2FnZSB3aXRoIG9ubGluZSBkb2MgbGluayBsaWtlIG5nIGVycm9yc1xuICAgICAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZWplY3QoJ2RpcmVjdGl2ZS5ib3NzeUZvcm06IEdFVCByZXF1ZXN0IHRvIHVybCBcIicgKyBzY2hlbWEgKyAnXCIgZmFpbGVkIHdpdGggc3RhdHVzIFwiJyArIHN0YXR1cyArICdcIicpO1xuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICByZXR1cm4gZGVmZXJyZWQucHJvbWlzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBnZXRTY2hlbWE6IF9nZXRTY2hlbWFcbiAgICAgICAgfTtcbiAgICB9XSlcbjtcbiIsIi8qVGhpcyBpcyBhIHNsaWRlciB3aWRnZXQgY3JlYXRlZCBpbiBhbmd1bGFyIGFzIHBhcnQgb2YgdGhlIEJvc3N5VUkgd2lkZ2V0cy5cbiAqIFRoZSBlYXNpZXN0IHdheSB0byB1c2UgdGhlIHNsaWRlciBpcyB0byBpbmNsdWRlIGl0IGluIHlvdXIgSFRNTCBhbmQgdGhlblxuICogY3JlYXRlIGEgdGFnIDxib3NzeS1zbGlkZXI+PC9ib3NzeS1zbGlkZXI+LiBUaGlzIHdpZGdldCB0YWtlIGluIHNldmVyYWxcbiAqIHdheXMgdG8gY3VzdG9taXplLiBMaXN0IG9mIGN1c3RvbWl6YXRpb25zIGF2YWlsYWJsZS5cbiAqIG1heCAgICAgICAgICAgICAgZGVmYXVsdHMgdG8gMTAwXG4gKiBtaW4gICAgICAgICAgICAgIGRlZmF1bHRzIHRvIDFcbiAqIHdpZHRoICAgICAgICAgICAgZGVmYXVsdHMgdG8gMjUwcHhcbiAqIGJhcmZpbGxjb2xvciAgICAgZGVmYXVsdHMgdG8gZGFya2JsdWU6IG11c3QgYmUgcGFzc2VkIGFzIGhleGFkZWNpbWFsIGNvbG9yIGZvcm1hdCAjMDAwMDAwXG4gKiBiYXJlbXB0eWNvbG9yICAgIGRlZmF1bHRzIHRvIGxpZ2h0Z3JleVxuICogYnV0dG9uY29sb3IgICAgICBkZWZhdWx0cyB0byByZWRcbiAqIHN0ZXAgICAgICAgICAgICAgZGVmYXVsdHMgdG8gcmVkXG4gKiBvcmllbnRhdGlvbiAgICAgIGRlZmF1bHRzIHRvIGhvcml6b250YWxcbiAqIGV4LlxuICogPGJvc3N5LXNsaWRlciBtYXg9XCIyMFwiIG1pbj1cIi01XCIgb3JpZW50YXRpb249XCJ2ZXJ0aWNhbFwiPjwvYm9zc3ktc2xpZGVyPiovXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cblxudmFyIGFwcCA9IGFuZ3VsYXIubW9kdWxlKCdib3NzeS5zbGlkZXInLCBbXSk7XG5hcHAuY29udHJvbGxlcignU2xpZGVyQ29udHJvbGxlcicsIFsnJHNjb3BlJywgZnVuY3Rpb24gKCRzY29wZSkge1xuICAgIC8vdGhlc2UgYXJlIG91ciBkZWZhdWx0IHZhbHVlcyBhbmQgYXJlIHRoZSB2YXJpYWJsZXMgdGhhdCBjYW4gYmUgY2hhbmdlZCBieSB1c2VyIG9mIG91ciB3aWRnZXRzXG4gICAgJHNjb3BlLm1heCA9IDEwO1xuICAgICRzY29wZS52YWx1ZSA9IDA7XG4gICAgJHNjb3BlLm1pbiA9IDE7XG4gICAgJHNjb3BlLmZpbGxXaWR0aCA9IDA7XG4gICAgJHNjb3BlLmVtcHRXaWR0aCA9IDA7XG4gICAgJHNjb3BlLmJhcldpZHRoID0gMjUwO1xuICAgICRzY29wZS5iYXJQaWVjZSA9IDA7XG4gICAgJHNjb3BlLnN0ZXAgPSAxO1xuICAgICRzY29wZS5pc01vdXNlRG93biA9IDA7XG4gICAgJHNjb3BlLnlDb3JkID0gMDtcbiAgICAkc2NvcGUueENvcmQgPSAwO1xuICAgICRzY29wZS5uZXdYQ29yZCA9IDA7XG4gICAgJHNjb3BlLm5ld1lDb3JkID0gMDtcbiAgICAkc2NvcGUub3JpZW50YXRpb24gPSBmYWxzZTtcbiAgICAkc2NvcGUuYnV0U2l6ZSA9IDE1O1xuICAgICRzY29wZS5iYXJmaWxsY29sb3IgPSAnIzAwMDBGRic7XG4gICAgJHNjb3BlLmJhcmVtcHR5Y29sb3IgPSAnI0QzRDNEMyc7XG4gICAgJHNjb3BlLmJ1dHRvbmNvbG9yID0gJyNGRjAwMDAnO1xuXG5cbiAgICAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cblxuICAgIC8qbWFrZUJhcigpXG4gICAgICogVGhpcyBjcmVhdGVzIHRoZSBpbml0aWFsIGdyYXBoaWMgb2YgdGhlIHNsaWRlciBhbmQgZW5zdXJlcyBpdCBpcyBpbiB0aGUgY29ycmVjdCBvcmRlclxuICAgICAqIENDID0gNCAqL1xuICAgICRzY29wZS5tYWtlQmFyID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAvL2J1dHRvbiBzaG91bGQgc2hvdyB1cCBpbiB0aGUgbWlkZGxlIG5vdyBvciBjbG9zZSB0byBpZiB1bmV2ZW5cbiAgICAgICAgJHNjb3BlLnZhbHVlID0gcGFyc2VJbnQoKCRzY29wZS5tYXggKyAkc2NvcGUubWluKSAvIDIpO1xuICAgICAgICBmb3IgKHZhciBjdXJyZW50ID0gJHNjb3BlLm1pbjsgY3VycmVudCA8PSAkc2NvcGUubWF4OyBjdXJyZW50KyspIHtcbiAgICAgICAgICAgIGlmIChjdXJyZW50IDwgJHNjb3BlLnZhbHVlKSB7XG4gICAgICAgICAgICAgICAgJHNjb3BlLmZpbGxXaWR0aCsrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGN1cnJlbnQgPiAkc2NvcGUudmFsdWUpIHtcbiAgICAgICAgICAgICAgICAkc2NvcGUuZW1wdFdpZHRoKys7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgJHNjb3BlLm5nTW9kZWwgPSAkc2NvcGUudmFsdWU7XG4gICAgICAgIHJldHVybjtcbiAgICB9O1xuICAgIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuXG4gICAgLyppbmNyZWFzZSgpXG4gICAgICogVGhpcyBjaGVja3MgYm91bmRzIHdoZW4gYXR0ZW1wdGluZyB0byBpbmNyZWFzZSB0aGUgdmFsdWUgYW5kIG1vdmVzIHRoZSBwb3NpdGlvblxuICAgICAqIG9mIHRoZSBzbGlkZXIgYnV0dG9uIGFuZCB1cGRhdGVzIHRoZSB2YWx1ZS5cbiAgICAgKiBDQyA9IDIqL1xuICAgICRzY29wZS5pbmNyZWFzZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKCRzY29wZS52YWx1ZSA8ICRzY29wZS5tYXgpIHtcbiAgICAgICAgICAgICRzY29wZS52YWx1ZSA9ICRzY29wZS52YWx1ZSArIDE7XG4gICAgICAgICAgICAkc2NvcGUuZmlsbFdpZHRoKys7XG4gICAgICAgICAgICAkc2NvcGUuZW1wdFdpZHRoLS07XG4gICAgICAgICAgICAkc2NvcGUubmdNb2RlbCA9ICRzY29wZS52YWx1ZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm47XG4gICAgfTtcbiAgICAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cblxuICAgIC8qYnV0SW5jcmVhc2UoKVxuICAgICAqIFRoaXMgZnVuY3Rpb24gYWxsb3dzIHRoZSBzbGlkZXIgdG8gaW5jcmVhc2UgaW4gaW5jcmVtZW50cy5cbiAgICAgKiBDQyA9IDEqL1xuICAgICRzY29wZS5idXRJbmNyZWFzZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGkgPSAwO1xuICAgICAgICBmb3IgKGkgPSAwOyBpIDwgJHNjb3BlLnN0ZXA7IGkrKykge1xuICAgICAgICAgICAgJHNjb3BlLmluY3JlYXNlKCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuO1xuICAgIH07XG4gICAgLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG5cbiAgICAvKmRlY3JlYXNlKClcbiAgICAgKiBUaGlzIGNoZWNrcyBib3VuZHMgd2hlbiBhdHRlbXB0aW5nIHRvIGRlY3JlYXNlIHRoZSB2YWx1ZSBhbmQgbW92ZXMgdGhlIHBvc2l0aW9uXG4gICAgICogb2YgdGhlIHNsaWRlciBidXR0b24gYW5kIHVwZGF0ZXMgdGhlIHZhbHVlLlxuICAgICAqIENDID0gMiovXG4gICAgJHNjb3BlLmRlY3JlYXNlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAoJHNjb3BlLnZhbHVlID4gJHNjb3BlLm1pbikge1xuICAgICAgICAgICAgJHNjb3BlLnZhbHVlID0gJHNjb3BlLnZhbHVlIC0gMTtcbiAgICAgICAgICAgICRzY29wZS5maWxsV2lkdGgtLTtcbiAgICAgICAgICAgICRzY29wZS5lbXB0V2lkdGgrKztcbiAgICAgICAgICAgICRzY29wZS5uZ01vZGVsID0gJHNjb3BlLnZhbHVlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybjtcbiAgICB9O1xuICAgIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuXG4gICAgLypidXREZWNyZWFzZSgpXG4gICAgICogVGhpcyBmdW5jdGlvbiBhbGxvd3MgdGhlIHNsaWRlciB0byBkZWNyZWFzZSBpbiBpbmNyZW1lbnRzXG4gICAgICogQ0MgPSAxKi9cbiAgICAkc2NvcGUuYnV0RGVjcmVhc2UgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBpID0gMDtcbiAgICAgICAgZm9yIChpID0gMDsgaSA8ICRzY29wZS5zdGVwOyBpKyspIHtcbiAgICAgICAgICAgICRzY29wZS5kZWNyZWFzZSgpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybjtcbiAgICB9O1xuICAgIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuXG4gICAgLyprZXlCaW5kKCRldmVudClcbiAgICAgKiBUaGlzIGZ1bmN0aW9uIGlzIHRvIGJpbmQgdGhlIGRlY3JlYXNlIGFuZCBpbmNyZWFzZSBmdW5jdGlvbiB3aXRoIHRoZSBhcnJvdyBrZXlzXG4gICAgICogQ0MgPSA1Ki9cbiAgICAkc2NvcGUua2V5QmluZCA9IGZ1bmN0aW9uIChldikge1xuICAgICAgICAkc2NvcGUucHJlc3NlZCA9IGV2LndoaWNoO1xuICAgICAgICAvL0lmIGFycm93IGtleShMZWZ0IG9yIERvd24pIGlzIHByZXNzZWQgdGhlbiBjYWxsIHRoZSBkZWNyZWFzZSgpIGZ1bmN0aW9uIHRvIGRlY3JlYXNlIHRoZSB2YWx1ZS5cbiAgICAgICAgaWYgKCRzY29wZS5wcmVzc2VkID09PSAzNyB8fCAkc2NvcGUucHJlc3NlZCA9PT0gNDApIHtcbiAgICAgICAgICAgICRzY29wZS5idXREZWNyZWFzZSgpO1xuXG4gICAgICAgIH1cbiAgICAgICAgLy9zYW1lIGFzIGFib3ZlIGJ1dCBmb3IgVXAgb3IgUmlnaHQgdG8gaW5jcmVhc2UgdGhlIHZhbHVlLlxuICAgICAgICBpZiAoJHNjb3BlLnByZXNzZWQgPT09IDM4IHx8ICRzY29wZS5wcmVzc2VkID09PSAzOSkge1xuICAgICAgICAgICAgJHNjb3BlLmJ1dEluY3JlYXNlKCk7XG5cbiAgICAgICAgfVxuICAgICAgICByZXR1cm47XG4gICAgfTtcbiAgICAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cblxuICAgIC8qZ3JleUNsaWNrKClcbiAgICAgKiBUaGlzIGZ1bmN0aW9uIGlzIHRvIGFsbG93IHRoZSB2YWx1ZSB0byBiZSBjaGFuZ2VkIHdoZW4gY2xpY2tpbmcgb24gdGhlIGJhclxuICAgICAqIENDID0gMSovXG4gICAgJHNjb3BlLmdyZXlDbGljayA9IGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICAvL1doZW4gY2xpY2sgb24gdGhlIGVtcHR5IGJhciB0aGUgYmFyIHdpbGwgaW5jcmVhc2VcbiAgICAgICAgJHNjb3BlLmJ1dEluY3JlYXNlKCk7XG5cbiAgICAgICAgcmV0dXJuO1xuICAgIH07XG4gICAgLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG5cbiAgICAvKmJhckNsaWNrKClcbiAgICAgKiBUaGlzIGZ1bmN0aW9uIGlzIHRvIGFsbG93IHRoZSB2YWx1ZSB0byBiZSBjaGFuZ2VkIHdoZW4gY2xpY2tpbmcgb24gdGhlIGJhclxuICAgICAqIENDID0gMSovXG4gICAgJHNjb3BlLmJhckNsaWNrID0gZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgIC8vV2hlbiBjbGljayBvbiB0aGUgRmlsbGVkIHVwIGNvbG9yIHNpZGUgdGhlIGJhciB3aWxsIGRlY3JlYXNlXG4gICAgICAgICRzY29wZS5idXREZWNyZWFzZSgpO1xuXG4gICAgICAgIHJldHVybjtcbiAgICB9O1xuICAgIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuXG4gICAgLypkcmFnKCRldmVudClcbiAgICAgKiBUaGlzIGZ1bmN0aW9uIGFsbG93cyB0aGUgYnV0dG9uIHRvIGRyYWcgYnkgZmluZGluZyBpdHMgbG9jYXRpb24gdGhlbiBjaGVja3MgaXQgYWdhaW5zdCBpdHMgb3JpZ2luYWwgbG9jYXRpb25cbiAgICAgKiBhbmQgaWYgaXQgaXMgZGlzdGFuY2UgaXMgZ3JlYXRlciB0aGFuIHRoZSBzaXplIG9mIGEgYmFycGllY2UgdXBkYXRlIHRoZSBncmFwaGljIGFuZCB2YWx1ZVxuICAgICAqIENDID0gOSovXG4gICAgJHNjb3BlLmRyYWcgPSBmdW5jdGlvbiAoZXZlbnQpIHtcblxuICAgICAgICAvL2dyYWIgdGhlIG1vdXNlIGxvY2F0aW9uXG4gICAgICAgIHZhciB4ID0gZXZlbnQuY2xpZW50WDtcbiAgICAgICAgdmFyIHkgPSBldmVudC5jbGllbnRZO1xuICAgICAgICAvL2NoZWNrIGlmIHRoZSBtb3VzZSBpcyBiZWluZyBoZWxkIGRvd25cbiAgICAgICAgaWYgKCRzY29wZS5pc01vdXNlRG93bikge1xuICAgICAgICAgICAgLy9jaGVjayB0aGUgb3JpZW50YXRpb25cbiAgICAgICAgICAgIGlmICgkc2NvcGUub3JpZW50YXRpb24pIHtcbiAgICAgICAgICAgICAgICAvL2lmIHRoaXMgaXMgdGhlIGZpcnN0IHRpbWUgeW91IGNsaWNrZWQgZG93biBnZXQgcmVhZHkgdG8gbW92ZSBpdFxuICAgICAgICAgICAgICAgIGlmICgkc2NvcGUueUNvcmQgPT09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgJHNjb3BlLnlDb3JkID0geTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIC8vY2hhbmdlIHRoZSBsb2NhdGlvbiBvZiB0aGUgc2xpZGVyIGFmdGVyIGVub3VnaCBtb3ZlbWVudFxuICAgICAgICAgICAgICAgICAgICAkc2NvcGUubmV3WUNvcmQgPSB5O1xuICAgICAgICAgICAgICAgICAgICB3aGlsZSAoKCRzY29wZS5uZXdZQ29yZCAtICRzY29wZS55Q29yZCkgPiAkc2NvcGUuYmFyUGllY2UgLyAyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAkc2NvcGUueUNvcmQgKz0gJHNjb3BlLmJhclBpZWNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgJHNjb3BlLmRlY3JlYXNlKCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgd2hpbGUgKCgkc2NvcGUubmV3WUNvcmQgLSAkc2NvcGUueUNvcmQpIDwgLSgkc2NvcGUuYmFyUGllY2UgLyAyKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgJHNjb3BlLnlDb3JkIC09ICRzY29wZS5iYXJQaWVjZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICRzY29wZS5pbmNyZWFzZSgpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgLy9pZiB0aGlzIGlzIHRoZSBmaXJzdCB0aW1lIHlvdSBjbGlja2VkIGRvd24gZ2V0IHJlYWR5IHRvIG1vdmUgaXRcbiAgICAgICAgICAgICAgICBpZiAoJHNjb3BlLnhDb3JkID09PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgICRzY29wZS54Q29yZCA9IHg7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAvL2NoYW5nZSB0aGUgbG9jYXRpb24gb2YgdGhlIHNsaWRlciBhZnRlciBlbm91Z2ggbW92ZW1lbnRcbiAgICAgICAgICAgICAgICAgICAgJHNjb3BlLm5ld1hDb3JkID0geDtcbiAgICAgICAgICAgICAgICAgICAgd2hpbGUgKCgkc2NvcGUubmV3WENvcmQgLSAkc2NvcGUueENvcmQpID4gJHNjb3BlLmJhclBpZWNlIC8gMikge1xuICAgICAgICAgICAgICAgICAgICAgICAgJHNjb3BlLnhDb3JkICs9ICRzY29wZS5iYXJQaWVjZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICRzY29wZS5pbmNyZWFzZSgpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHdoaWxlICgoJHNjb3BlLm5ld1hDb3JkIC0gJHNjb3BlLnhDb3JkKSA8IC0oJHNjb3BlLmJhclBpZWNlIC8gMikpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICRzY29wZS54Q29yZCAtPSAkc2NvcGUuYmFyUGllY2U7XG4gICAgICAgICAgICAgICAgICAgICAgICAkc2NvcGUuZGVjcmVhc2UoKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm47XG4gICAgfTtcbiAgICAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cblxuICAgIC8qZG93bigpXG4gICAgICogVGhpcyBmdW5jdGlvbiBsb2dzIHdoZW4gdGhlIG1vdXNlIGlzIGRvd25cbiAgICAgKiBDQyA9IDEqL1xuICAgICRzY29wZS5kb3duID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAkc2NvcGUubmV3WENvcmQgPSAwO1xuICAgICAgICAkc2NvcGUueENvcmQgPSAwO1xuICAgICAgICAkc2NvcGUubmV3WUNvcmQgPSAwO1xuICAgICAgICAkc2NvcGUueUNvcmQgPSAwO1xuICAgICAgICAkc2NvcGUuaXNNb3VzZURvd24gPSAxO1xuICAgICAgICByZXR1cm47XG4gICAgfTtcbiAgICAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cblxuICAgIC8qZG93bigpXG4gICAgICogVGhpcyBmdW5jdGlvbiBsb2dzIHdoZW4gdGhlIG1vdXNlIGlzIHVwXG4gICAgICogQ0MgPSAxKi9cbiAgICAkc2NvcGUudXAgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICRzY29wZS5uZXdYQ29yZCA9IDA7XG4gICAgICAgICRzY29wZS54Q29yZCA9IDA7XG4gICAgICAgICRzY29wZS5uZXdZQ29yZCA9IDA7XG4gICAgICAgICRzY29wZS55Q29yZCA9IDA7XG4gICAgICAgICRzY29wZS5pc01vdXNlRG93biA9IDA7XG4gICAgICAgIHJldHVybjtcbiAgICB9O1xuICAgIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xufV0pO1xuYXBwLmRpcmVjdGl2ZSgnYm9zc3lTbGlkZXInLCBmdW5jdGlvbiAoJGNvbXBpbGUpIHtcbiAgICB2YXIgbXlUZW1wbGF0ZTtcbiAgICByZXR1cm4ge1xuICAgICAgICAvL2FsbG93cyB0aGUgc2xpZGVyIHRvIGJlIGNyZWF0ZWQgYXMgYW5kIGF0dHJpYnV0ZSBvciBlbGVtZW50IDxib3NzeS1zbGlkZXI+PGJvc3N5LXNsaWRlcj5cbiAgICAgICAgcmVzdHJpY3Q6ICdBRScsXG4gICAgICAgIGNvbnRyb2xsZXI6ICdTbGlkZXJDb250cm9sbGVyJyxcbiAgICAgICAgc2NvcGU6IHtcbiAgICAgICAgICAgIG5nTW9kZWw6ICc9J1xuICAgICAgICB9LFxuICAgICAgICAvKmxpbms6IGZ1bmN0aW9uOlxuICAgICAgICAgKiBUaGlzIGFsbG93cyB1cyB0byBwdWxsIGluIHRoZSBzZXR0aW5ncyB0aGUgcHJvZ3JhbW1lciB3YW50cyBmb3IgdGhlIHNsaWRlciBhbmQgc2V0IHRoaW5ncyBjb3JyZWN0bHlcbiAgICAgICAgICogaXQgYWxzbyBpbml0aWFsaXplcyB0aGUgc2xpZGVyIGFuZCBhZGRzIHRoZSBjb3JyZWN0IG9yaWVudGF0aW9uIHRlbXBsYXRlIHRvIHRoZSBET00qL1xuICAgICAgICBsaW5rOiB7XG4gICAgICAgICAgICBwcmU6IGZ1bmN0aW9uIChzY29wZSwgaUVsZW0sIGlBdHRyKSB7XG4gICAgICAgICAgICAgICAgdmFyIHBhdHRlcm4gPSAvXiNbMC05YS1mQS1GXXs2fSQvOyAvL2N1cnJlbnRseSBhY2NlcHRzIGxvd2VyIGNhc2UgYS1mXG5cbiAgICAgICAgICAgICAgICAvL2NoZWNrcyB0byBzZWUgaWYgdGhlcmUgaXMgYSBtYXggYXR0cmlidXRlXG4gICAgICAgICAgICAgICAgaWYgKGlBdHRyLm1heCkge1xuICAgICAgICAgICAgICAgICAgICBzY29wZS5tYXggPSBwYXJzZUludChpQXR0ci5tYXgpO1xuICAgICAgICAgICAgICAgICAgICBpZiAoaXNOYU4oc2NvcGUubWF4KSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgc2NvcGUubWF4ID0gMTA7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgLy9jaGVja3MgdG8gc2VlIGlmIHRoZXJlIGlzIGEgbWluIGF0dHJpYnV0ZVxuICAgICAgICAgICAgICAgIGlmIChpQXR0ci5taW4pIHtcbiAgICAgICAgICAgICAgICAgICAgc2NvcGUubWluID0gcGFyc2VJbnQoaUF0dHIubWluKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGlzTmFOKHNjb3BlLm1pbikpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNjb3BlLm1pbiA9IDE7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgLy9jaGVja3MgZm9yIGJhciBjb2xvciBjdXN0b21pemF0aW9uXG4gICAgICAgICAgICAgICAgaWYgKGlBdHRyLmJhcmZpbGxjb2xvcikge1xuICAgICAgICAgICAgICAgICAgICBpZiAocGF0dGVybi50ZXN0KGlBdHRyLmJhcmZpbGxjb2xvcikpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNjb3BlLmJhcmZpbGxjb2xvciA9IGlBdHRyLmJhcmZpbGxjb2xvcjtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAvL2NoZWNrcyBmb3IgZW1wdHkgYmFyIGNvbG9yIGN1c3RvbWl6YXRpb25cblxuICAgICAgICAgICAgICAgIGlmIChpQXR0ci5iYXJlbXB0eWNvbG9yKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChwYXR0ZXJuLnRlc3QoaUF0dHIuYmFyZW1wdHljb2xvcikpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNjb3BlLmJhcmVtcHR5Y29sb3IgPSBpQXR0ci5iYXJlbXB0eWNvbG9yO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuXG5cbiAgICAgICAgICAgICAgICBpZiAoaUF0dHIuYnV0dG9uY29sb3IpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHBhdHRlcm4udGVzdChpQXR0ci5idXR0b25jb2xvcikpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNjb3BlLmJ1dHRvbmNvbG9yID0gaUF0dHIuYnV0dG9uY29sb3I7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgLy9maW5kIHRoZSBzdGVwIHNpemUgZm9yIGJ1dHRvbiBjbGlja3NcbiAgICAgICAgICAgICAgICBpZiAoaUF0dHIuc3RlcCkge1xuICAgICAgICAgICAgICAgICAgICBzY29wZS5zdGVwID0gaUF0dHIuc3RlcDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgLy9maW5kIHRoZSBwcmVmZXJyZWQgdG90YWwgd2lkdGggdG8gdXNlIGZvciB0aGUgc2xpZGVyXG4gICAgICAgICAgICAgICAgaWYgKGlBdHRyLndpZHRoKSB7XG4gICAgICAgICAgICAgICAgICAgIHNjb3BlLmJhcldpZHRoID0gaUF0dHIud2lkdGg7XG4gICAgICAgICAgICAgICAgICAgIHNjb3BlLmJhclBpZWNlID0gKHNjb3BlLmJhcldpZHRoIC8gKHNjb3BlLm1heCAtIHNjb3BlLm1pbikpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgc2NvcGUuYmFyUGllY2UgPSAoc2NvcGUuYmFyV2lkdGggLyAoc2NvcGUubWF4IC0gc2NvcGUubWluKSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIC8vY2hlY2tzIHRvIHNlZSBpZiB0aGVyZSBpcyBhIG9yaWVudGF0aW9uIGF0dHJpYnV0ZSBpZiB0aGVyZSBpcyBzZXQgb3VyIHRlbXBsYXRlIHRvIHRoZSB2ZXJ0aWNhbCB0ZW1wbGF0ZVxuICAgICAgICAgICAgICAgIGlmIChpQXR0ci5vcmllbnRhdGlvbikge1xuICAgICAgICAgICAgICAgICAgICBpZiAoJ3ZlcnRpY2FsJyA9PT0gaUF0dHIub3JpZW50YXRpb24pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNjb3BlLm9yaWVudGF0aW9uID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIG15VGVtcGxhdGUgPSAnPGRpdiBvbnNlbGVjdHN0YXJ0PVwicmV0dXJuIGZhbHNlO1wiIG9uZHJhZ3N0YXJ0PVwicmV0dXJuIGZhbHNlO1wibmctbW91c2VsZWF2ZT1cInVwKClcIiBuZy1tb3VzZW1vdmU9XCJkcmFnKCRldmVudClcIj4nICtcbiAgICAgICAgICAgICAgICAgICAgICAgICc8ZGl2IG5nLW1vdXNlbW92ZT1cImRyYWcoJGV2ZW50KVwiIG5nLW1vdXNldXA9XCJ1cCgpXCIgbmctY2xpY2s9XCJncmV5Q2xpY2soKVwic3R5bGU9XCJjdXJzb3I6cG9pbnRlcjttYXJnaW4tbGVmdDo5cHg7d2lkdGg6NXB4O2hlaWdodDp7e2JhclBpZWNlICogZW1wdFdpZHRofX1weDtiYWNrZ3JvdW5kLWNvbG9yOicgKyBzY29wZS5iYXJlbXB0eWNvbG9yICsgJzttYXJnaW4tYm90dG9tOjRweFwiPjwvZGl2PicgK1xuICAgICAgICAgICAgICAgICAgICAgICAgJzxkaXYgbmctbW91c2Vtb3ZlPVwiZHJhZygkZXZlbnQpXCIgbmctbW91c2Vkb3duPVwiZG93bigpXCIgbmctbW91c2V1cD1cInVwKClcIiBvcmllbnRhdGlvbj1cInZlcnRpY2FsXCIgc3R5bGU9XCJjdXJzb3I6bnMtcmVzaXplO21hcmdpbi10b3A6LTRweDttYXJnaW4tbGVmdDo1cHg7d2lkdGg6MTVweDtoZWlnaHQ6MTVweDtiYWNrZ3JvdW5kLWNvbG9yOicgKyBzY29wZS5idXR0b25jb2xvciArICc7Ym9yZGVyLXJhZGl1czo1MCU7XCI+PC9kaXY+JyArXG4gICAgICAgICAgICAgICAgICAgICAgICAnPGRpdiBuZy1tb3VzZW1vdmU9XCJkcmFnKCRldmVudClcIiBuZy1tb3VzZXVwPVwidXAoKVwiIG5nLWNsaWNrPVwiYmFyQ2xpY2soKVwic3R5bGU9XCJjdXJzb3I6cG9pbnRlcjttYXJnaW4tbGVmdDo5cHg7d2lkdGg6NXB4O2hlaWdodDp7e2JhclBpZWNlICogZmlsbFdpZHRofX1weDtiYWNrZ3JvdW5kLWNvbG9yOicgKyBzY29wZS5iYXJmaWxsY29sb3IgKyAnO21hcmdpbi1ib3R0b206NHB4XCI+PC9kaXY+JyArXG4gICAgICAgICAgICAgICAgICAgICAgICAnPC9kaXY+JztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG15VGVtcGxhdGUgPSAnPGRpdiBvbnNlbGVjdHN0YXJ0PVwicmV0dXJuIGZhbHNlO1wiIG9uZHJhZ3N0YXJ0PVwicmV0dXJuIGZhbHNlO1wiIG5nLW1vdXNlbGVhdmU9XCJ1cCgpXCJuZy1tb3VzZW1vdmU9XCJkcmFnKCRldmVudClcIj4nICtcbiAgICAgICAgICAgICAgICAgICAgICAgICc8ZGl2IG5nLW1vdXNlbW92ZT1cImRyYWcoJGV2ZW50KVwiIG5nLW1vdXNldXA9XCJ1cCgpXCIgbmctY2xpY2s9XCJiYXJDbGljaygpXCJzdHlsZT1cImN1cnNvcjpwb2ludGVyO2Rpc3BsYXk6aW5saW5lLWJsb2NrO3dpZHRoOnt7YmFyUGllY2UgKiBmaWxsV2lkdGh9fXB4O2hlaWdodDo1cHg7YmFja2dyb3VuZC1jb2xvcjonICsgc2NvcGUuYmFyZmlsbGNvbG9yICsgJzttYXJnaW4tYm90dG9tOjRweFwiPjwvZGl2PicgK1xuICAgICAgICAgICAgICAgICAgICAgICAgJzxkaXYgbmctbW91c2Vtb3ZlPVwiZHJhZygkZXZlbnQpXCIgbmctbW91c2Vkb3duPVwiZG93bigpXCIgbmctbW91c2V1cD1cInVwKClcIiBvcmllbnRhdGlvbj1cImhvcml6b250YWxcIiBzdHlsZT1cImN1cnNvcjpldy1yZXNpemU7ZGlzcGxheTppbmxpbmUtYmxvY2s7d2lkdGg6e3tidXRTaXplfX1weDtoZWlnaHQ6e3tidXRTaXplfX1weDtiYWNrZ3JvdW5kLWNvbG9yOicgKyBzY29wZS5idXR0b25jb2xvciArICc7Ym9yZGVyLXJhZGl1czo1MCU7XCI+PC9kaXY+JyArXG4gICAgICAgICAgICAgICAgICAgICAgICAnPGRpdiBuZy1tb3VzZW1vdmU9XCJkcmFnKCRldmVudClcIiBuZy1tb3VzZXVwPVwidXAoKVwiIG5nLWNsaWNrPVwiZ3JleUNsaWNrKClcInN0eWxlPVwiY3Vyc29yOnBvaW50ZXI7ZGlzcGxheTppbmxpbmUtYmxvY2s7d2lkdGg6e3tiYXJQaWVjZSAqIGVtcHRXaWR0aH19cHg7aGVpZ2h0OjVweDtiYWNrZ3JvdW5kLWNvbG9yOicgKyBzY29wZS5iYXJlbXB0eWNvbG9yICsgJzttYXJnaW4tYm90dG9tOjRweFwiPjwvZGl2PicgK1xuICAgICAgICAgICAgICAgICAgICAgICAgJzwvZGl2Pic7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIC8vdGhpcyBidWlsZHMgb3VyIGhvcml6b250YWwgdGVtcGxhdGVcbiAgICAgICAgICAgICAgICAgICAgbXlUZW1wbGF0ZSA9ICc8ZGl2IG9uc2VsZWN0c3RhcnQ9XCJyZXR1cm4gZmFsc2U7XCIgb25kcmFnc3RhcnQ9XCJyZXR1cm4gZmFsc2U7XCIgbmctbW91c2VsZWF2ZT1cInVwKClcIm5nLW1vdXNlbW92ZT1cImRyYWcoJGV2ZW50KVwiPicgK1xuICAgICAgICAgICAgICAgICAgICAnPGRpdiBuZy1tb3VzZW1vdmU9XCJkcmFnKCRldmVudClcIiBuZy1tb3VzZXVwPVwidXAoKVwiIG5nLWNsaWNrPVwiYmFyQ2xpY2soKVwic3R5bGU9XCJjdXJzb3I6cG9pbnRlcjtkaXNwbGF5OmlubGluZS1ibG9jazt3aWR0aDp7e2JhclBpZWNlICogZmlsbFdpZHRofX1weDtoZWlnaHQ6NXB4O2JhY2tncm91bmQtY29sb3I6JyArIHNjb3BlLmJhcmZpbGxjb2xvciArICc7bWFyZ2luLWJvdHRvbTo0cHhcIj48L2Rpdj4nICtcbiAgICAgICAgICAgICAgICAgICAgJzxkaXYgbmctbW91c2Vtb3ZlPVwiZHJhZygkZXZlbnQpXCIgbmctbW91c2Vkb3duPVwiZG93bigpXCIgbmctbW91c2V1cD1cInVwKClcIiBvcmllbnRhdGlvbj1cImhvcml6b250YWxcIiBzdHlsZT1cImN1cnNvcjpldy1yZXNpemU7ZGlzcGxheTppbmxpbmUtYmxvY2s7d2lkdGg6e3tidXRTaXplfX1weDtoZWlnaHQ6e3tidXRTaXplfX1weDtiYWNrZ3JvdW5kLWNvbG9yOicgKyBzY29wZS5idXR0b25jb2xvciArICc7Ym9yZGVyLXJhZGl1czo1MCU7XCI+PC9kaXY+JyArXG4gICAgICAgICAgICAgICAgICAgICc8ZGl2IG5nLW1vdXNlbW92ZT1cImRyYWcoJGV2ZW50KVwiIG5nLW1vdXNldXA9XCJ1cCgpXCIgbmctY2xpY2s9XCJncmV5Q2xpY2soKVwic3R5bGU9XCJjdXJzb3I6cG9pbnRlcjtkaXNwbGF5OmlubGluZS1ibG9jazt3aWR0aDp7e2JhclBpZWNlICogZW1wdFdpZHRofX1weDtoZWlnaHQ6NXB4O2JhY2tncm91bmQtY29sb3I6JyArIHNjb3BlLmJhcmVtcHR5Y29sb3IgKyAnO21hcmdpbi1ib3R0b206NHB4XCI+PC9kaXY+JyArXG4gICAgICAgICAgICAgICAgICAgICc8L2Rpdj4nO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAvL1dlIHNob3cgb3VyIHRlbXBsYXRlIGFuZCB0aGVuIGNvbXBpbGUgaXQgc28gdGhlIERPTSBrbm93cyBhYm91dCBvdXIgbmcgZnVuY3Rpb25zXG4gICAgICAgICAgICAgICAgaUVsZW0uaHRtbChteVRlbXBsYXRlKTtcbiAgICAgICAgICAgICAgICAkY29tcGlsZShpRWxlbS5jb250ZW50cygpKShzY29wZSk7XG4gICAgICAgICAgICAgICAgLy9jcmVhdGUgdGhlIGluaXRpYWwgYmFyXG4gICAgICAgICAgICAgICAgc2NvcGUubWFrZUJhcigpO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH07XG59KTtcblxuIiwiYW5ndWxhci5tb2R1bGUoJ2Jvc3N5LnRvb2x0aXAnLCBbXSlcbiAgICAuZGlyZWN0aXZlKCdib3NzeVRvb2x0aXAnLCBmdW5jdGlvbigpIHtcblxuICAgICAgICAvLyBQcml2YXRlIG1lbWJlciBhcnJheSBjb250YWluaW5nIGFsbCBrbm93biBwb3NpdGlvbnNcbiAgICAgICAgdmFyIF9wb3MgPSBbJ24nLCduZScsJ2UnLCdzZScsJ3MnLCdzdycsJ3cnLCdudyddO1xuXG4gICAgICAgIC8vIE1vdmUgdGhlIHRpcCB0byBhIGNlcnRhaW4gcG9zaXRpb25cbiAgICAgICAgZnVuY3Rpb24gX21vdmVUaXAoJHBhcmVudCwgJHRpcCwgY3VyUG9zKVxuICAgICAgICB7XG4gICAgICAgICAgICBpZihjdXJQb3MgPT09ICduJylcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAkdGlwLnN0eWxlLmxlZnQgPSAkcGFyZW50Lm9mZnNldExlZnQgKyAoJHBhcmVudC5vZmZzZXRXaWR0aCAvIDIpIC0gKCR0aXAub2Zmc2V0V2lkdGggLyAyKSArICdweCc7XG4gICAgICAgICAgICAgICAgJHRpcC5zdHlsZS50b3AgPSAkcGFyZW50Lm9mZnNldFRvcCAtICR0aXAub2Zmc2V0SGVpZ2h0ICsgJ3B4JztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYoY3VyUG9zID09PSAnbmUnKVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICR0aXAuc3R5bGUubGVmdCA9ICRwYXJlbnQub2Zmc2V0TGVmdCArICRwYXJlbnQub2Zmc2V0V2lkdGggKyAncHgnO1xuICAgICAgICAgICAgICAgICR0aXAuc3R5bGUudG9wID0gJHBhcmVudC5vZmZzZXRUb3AgLSAkdGlwLm9mZnNldEhlaWdodCArICdweCc7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmKGN1clBvcyA9PT0gJ2UnKVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICR0aXAuc3R5bGUubGVmdCA9ICRwYXJlbnQub2Zmc2V0TGVmdCArICRwYXJlbnQub2Zmc2V0V2lkdGggKyAncHgnO1xuICAgICAgICAgICAgICAgICR0aXAuc3R5bGUudG9wID0gJHBhcmVudC5vZmZzZXRUb3AgKyAoJHBhcmVudC5vZmZzZXRIZWlnaHQgLyAyKSAtICgkdGlwLm9mZnNldEhlaWdodCAvIDIpICsgJ3B4JztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYoY3VyUG9zID09PSAnc2UnKVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICR0aXAuc3R5bGUubGVmdCA9ICRwYXJlbnQub2Zmc2V0TGVmdCArICRwYXJlbnQub2Zmc2V0V2lkdGggKyAncHgnO1xuICAgICAgICAgICAgICAgICR0aXAuc3R5bGUudG9wID0gJHBhcmVudC5vZmZzZXRUb3AgKyAkcGFyZW50Lm9mZnNldEhlaWdodCArICdweCc7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmKGN1clBvcyA9PT0gJ3MnKVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICR0aXAuc3R5bGUubGVmdCA9ICRwYXJlbnQub2Zmc2V0TGVmdCArICgkcGFyZW50Lm9mZnNldFdpZHRoIC8gMikgLSAoJHRpcC5vZmZzZXRXaWR0aCAvIDIpICsgJ3B4JztcbiAgICAgICAgICAgICAgICAkdGlwLnN0eWxlLnRvcCA9ICRwYXJlbnQub2Zmc2V0VG9wICsgJHBhcmVudC5vZmZzZXRIZWlnaHQgKyAncHgnO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZihjdXJQb3MgPT09ICdzdycpXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgJHRpcC5zdHlsZS5sZWZ0ID0gJHBhcmVudC5vZmZzZXRMZWZ0IC0gJHRpcC5vZmZzZXRXaWR0aCArICdweCc7XG4gICAgICAgICAgICAgICAgJHRpcC5zdHlsZS50b3AgPSAkcGFyZW50Lm9mZnNldFRvcCArICRwYXJlbnQub2Zmc2V0SGVpZ2h0ICsgJ3B4JztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYoY3VyUG9zID09PSAndycpXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgJHRpcC5zdHlsZS5sZWZ0ID0gJHBhcmVudC5vZmZzZXRMZWZ0IC0gJHRpcC5vZmZzZXRXaWR0aCArICdweCc7XG4gICAgICAgICAgICAgICAgJHRpcC5zdHlsZS50b3AgPSAkcGFyZW50Lm9mZnNldFRvcCArICgkcGFyZW50Lm9mZnNldEhlaWdodCAvIDIpIC0gKCR0aXAub2Zmc2V0SGVpZ2h0IC8gMikgKyAncHgnO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICR0aXAuc3R5bGUubGVmdCA9ICRwYXJlbnQub2Zmc2V0TGVmdCAtICR0aXAub2Zmc2V0V2lkdGggKyAncHgnO1xuICAgICAgICAgICAgICAgICR0aXAuc3R5bGUudG9wID0gJHBhcmVudC5vZmZzZXRUb3AgLSAkdGlwLm9mZnNldEhlaWdodCArICdweCc7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAvLyBDaGVjayB0byBzZWUgaWYgdGhlIHRpcCBpcyB3aXRoaW4gdGhlIHdpbmRvd1xuICAgICAgICBmdW5jdGlvbiBfY2hlY2tQb3MoJHRpcClcbiAgICAgICAge1xuICAgICAgICAgICAgdmFyIHJlY3QgPSAkdGlwLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuXG4gICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgIHJlY3QudG9wID49IDAgJiZcbiAgICAgICAgICAgICAgICByZWN0LmxlZnQgPj0gMCAmJlxuICAgICAgICAgICAgICAgIHJlY3QuYm90dG9tIDw9ICh3aW5kb3cuaW5uZXJIZWlnaHQgfHwgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsaWVudEhlaWdodCkgJiZcbiAgICAgICAgICAgICAgICByZWN0LnJpZ2h0IDw9ICh3aW5kb3cuaW5uZXJXaWR0aCB8fCBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xpZW50V2lkdGgpXG4gICAgICAgICAgICApO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHJlc3RyaWN0OiAnRScsXG4gICAgICAgICAgICBzY29wZToge1xuICAgICAgICAgICAgICAgIGNvbmZpZzogJz0nXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgcmVwbGFjZTogdHJ1ZSxcbiAgICAgICAgICAgIGxpbms6IGZ1bmN0aW9uKHNjb3BlLCBlbGVtZW50LCBhdHRycykge1xuXG4gICAgICAgICAgICAgICAgLy8gSWYgdGhlIHVzZXIgZG9lc24ndCBwcm92aWRlIGVzc2VudGlhbCBpbmZvcm1hdGlvbiwgZXJyb3Igb3V0XG4gICAgICAgICAgICAgICAgaWYoIXNjb3BlLmNvbmZpZy50aXRsZSB8fCAhc2NvcGUuY29uZmlnLmJvZHkpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcignRXJyb3I6IE5vIHRpdGxlIG9yIGJvZHkgaW5mb3JtYXRpb24gcHJvdmlkZWQuJyk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAxO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIC8vIElmIHRoZSB1c2VyIGRvZXNuJ3QgcHJvdmlkZSBhIHBvc2l0aW9uLCBkZWZhdWx0ICdub3J0aCdcbiAgICAgICAgICAgICAgICBpZighc2NvcGUuY29uZmlnLnBvc2l0aW9uIHx8IHR5cGVvZiBzY29wZS5jb25maWcucG9zaXRpb24gIT09ICdzdHJpbmcnIHx8IF9wb3MuaW5kZXhPZihzY29wZS5jb25maWcucG9zaXRpb24pIDwgMClcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHNjb3BlLmNvbmZpZy5wb3NpdGlvbiA9ICduJztcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAvLyBDcmVhdGUgdGlwIGVsZW1lbnRcbiAgICAgICAgICAgICAgICB2YXIgJHRpcCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuXG4gICAgICAgICAgICAgICAgLy8gQXBwZW5kIHRvIERPTVxuICAgICAgICAgICAgICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoJHRpcCk7XG4gICAgICAgICAgICAgICAgJHRpcC5zdHlsZS5wb3NpdGlvbiA9ICdhYnNvbHV0ZSc7XG4gICAgICAgICAgICAgICAgJHRpcC5pbm5lckhUTUwgPSAnPHNwYW4+Jysgc2NvcGUuY29uZmlnLnRpdGxlICsnPC9zcGFuPjxkaXY+Jysgc2NvcGUuY29uZmlnLmJvZHkgKyc8L2Rpdj4nO1xuICAgICAgICAgICAgICAgICR0aXAuY2xhc3NOYW1lID0gJ2Jvc3N5VG9vbHRpcCc7XG5cbiAgICAgICAgICAgICAgICAvLyBEaXNhYmxlIGJyb3dzZXIncyB0b29sdGlwXG4gICAgICAgICAgICAgICAgZWxlbWVudFswXS50aXRsZSA9ICcnO1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGVsZW1lbnQpO1xuXG4gICAgICAgICAgICAgICAgdmFyIGkgPSAwLFxuICAgICAgICAgICAgICAgICAgICBsb2NrZWQ7XG5cbiAgICAgICAgICAgICAgICBkbyB7XG4gICAgICAgICAgICAgICAgICAgIGxvY2tlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIF9tb3ZlVGlwKGVsZW1lbnRbMF0sICR0aXAsIHNjb3BlLmNvbmZpZy5wb3NpdGlvbik7XG5cbiAgICAgICAgICAgICAgICAgICAgLy8gQ29udGludWUgdG8gbG9vcCBpZiAkdGlwIGlzIGNsaXBwZWRcbiAgICAgICAgICAgICAgICAgICAgaWYoIV9jaGVja1BvcygkdGlwKSlcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgbG9ja2VkID0gZmFsc2U7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIFdyYXAgYXJvdW5kIGFycmF5IGlmIHRoZSBlbmQgaXMgaGl0XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoc2NvcGUuY29uZmlnLnBvc2l0aW9uID09PSAnbncnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2NvcGUuY29uZmlnLnBvc2l0aW9uID0gJ24nO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzY29wZS5jb25maWcucG9zaXRpb24gPSBfcG9zW19wb3MuaW5kZXhPZihzY29wZS5jb25maWcucG9zaXRpb24pICsgMV07XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICBpZiAoaSA9PT0gOCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgKytpO1xuICAgICAgICAgICAgICAgIH0gd2hpbGUgKGxvY2tlZCA9PT0gZmFsc2UpO1xuXG4gICAgICAgICAgICAgICAgLy8gSGlkZSBpdCB1bnRpbCBtb3VzZSBldmVudFxuICAgICAgICAgICAgICAgICR0aXAuc3R5bGUuZGlzcGxheSA9ICdub25lJztcblxuICAgICAgICAgICAgICAgIC8vIE1vdXNlIGV2ZW50c1xuICAgICAgICAgICAgICAgIGVsZW1lbnQub24oJ21vdXNlZW50ZXInLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgJHRpcC5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIC5vbignbW91c2VsZWF2ZScsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICAkdGlwLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICB9KTsiXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=