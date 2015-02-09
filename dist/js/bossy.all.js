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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImJvc3N5LmpzIiwiYm9zc3kuY2FsZW5kYXIuanMiLCJib3NzeS5jb21ib2JveC5jYXNjYWRpbmdEcm9wZG93bi5qcyIsImJvc3N5LmNvbWJvYm94LmNoZWNrYm94TXVsdGlzZWxlY3QuanMiLCJib3NzeS5jb21ib2JveC5tdWx0aXNlbGVjdC5qcyIsImJvc3N5LmRhdGEuanMiLCJib3NzeS5kYXRhX2dyaWQuanMiLCJib3NzeS5kcm9wZG93bi5qcyIsImJvc3N5LmZvcm0uanMiLCJib3NzeS5pbnB1dC5qcyIsImJvc3N5Lm51bWVyaWN0ZXh0Ym94LmpzIiwiYm9zc3kuc2NoZW1hLmpzIiwiYm9zc3kuc2xpZGVyLmpzIiwiYm9zc3kudG9vbHRpcC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUMxQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDcEtBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDeEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUM3R0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDckpBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQzNEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNwRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ2xGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDbElBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNoQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDekZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDMUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDN1VBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiYm9zc3kuYWxsLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyohXHJcbiAqIGJvc3N5LmpzXHJcbiAqL1xyXG5cclxuLyohXHJcbiAqIGh0dHA6Ly9Cb3NzeVVJLmNvbS9cclxuICpcclxuICogQm9zc3lVSSAtIENyZWF0ZWQgd2l0aCBMT1ZFIGJ5IEJ1aWxkLmNvbSBPcGVuIFNvdXJjZSBDb25zb3J0aXVtXHJcbiAqXHJcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZS4gUGxlYXNlIHNlZSBMSUNFTlNFIGZvciBtb3JlIGluZm9ybWF0aW9uLlxyXG4gKlxyXG4qL1xyXG5cclxuLy9UT0RPOiBuZWVkIGxheW91dCwgbGFiZWxzXHJcbnZhciBib3NzeSA9IGFuZ3VsYXIubW9kdWxlKCdib3NzeScsIFtcclxuXHRcdCdib3NzeS5jYWxlbmRhcicsXHJcblx0XHQnYm9zc3kuZGF0YScsXHJcblx0XHQnYm9zc3kuZHJvcGRvd24nLFxyXG5cdFx0J2Jvc3N5LmZvcm0nLFxyXG5cdFx0J2Jvc3N5LmlucHV0JyxcclxuXHRcdCdib3NzeS5udW1lcmljdGV4dGJveCcsXHJcblx0XHQnYm9zc3kuc2NoZW1hJyxcclxuXHRcdCdib3NzeS50b29sdGlwJyxcclxuXHRcdCdib3NzeS5kYXRhZ3JpZCdcclxuXHRdXHJcbik7XHJcbiIsImFuZ3VsYXIubW9kdWxlKCdib3NzeS5jYWxlbmRhcicsIFtdKVxyXG5cdC5jb250cm9sbGVyKCdDYWxlbmRhckNvbnRyb2xsZXInLCBbJyRzY29wZScsIGZ1bmN0aW9uICgkc2NvcGUpIHtcclxuXHJcblx0XHR2YXIgX21vbnRoTWFwcyA9IHt9LFxyXG5cdFx0XHRvcHRpb25zID0ge30sXHJcblx0XHRcdGRlZmF1bHRzID0ge30sXHJcblx0XHRcdHVuaXZlcnNhbCA9IHtcclxuXHRcdFx0XHREQVk6IDI0ICogNjAgKiA2MCAqIDEwMDAsXHJcblx0XHRcdFx0SE9VUjogNjAgKiA2MCAqIDEwMDBcclxuXHRcdFx0fTtcclxuXHJcblx0XHQkc2NvcGUuZGF5cyA9IFtcclxuXHRcdFx0J1N1bmRheScsXHJcblx0XHRcdCdNb25kYXknLFxyXG5cdFx0XHQnVHVlc2RheScsXHJcblx0XHRcdCdXZWRuZXNkYXknLFxyXG5cdFx0XHQnVGh1cnNkYXknLFxyXG5cdFx0XHQnRnJpZGF5JyxcclxuXHRcdFx0J1NhdHVyZGF5J1xyXG5cdFx0XTtcclxuXHJcblx0XHQkc2NvcGUubW9udGhzID0gW1xyXG5cdFx0XHQnSmFudWFyeScsXHJcblx0XHRcdCdGZWJydWFyeScsXHJcblx0XHRcdCdNYXJjaCcsXHJcblx0XHRcdCdBcHJpbCcsXHJcblx0XHRcdCdNYXknLFxyXG5cdFx0XHQnSnVuZScsXHJcblx0XHRcdCdKdWx5JyxcclxuXHRcdFx0J0F1Z3VzdCcsXHJcblx0XHRcdCdTZXB0ZW1iZXInLFxyXG5cdFx0XHQnT2N0b2JlcicsXHJcblx0XHRcdCdOb3ZlbWJlcicsXHJcblx0XHRcdCdEZWNlbWJlcidcclxuXHRcdF07XHJcblxyXG5cdFx0JHNjb3BlLnByZXZpb3VzTW9udGggPSBmdW5jdGlvbigpIHtcclxuXHRcdFx0dmFyIGRhdGUgPSBuZXcgRGF0ZSgkc2NvcGUuY3VycmVudC55ZWFyLCAoJHNjb3BlLmN1cnJlbnQubW9udGggLSAxKSwgMSk7XHJcblx0XHRcdHNldEN1cnJlbnRNb250aEFuZFllYXIoZGF0ZS5nZXRNb250aCgpLCBkYXRlLmdldEZ1bGxZZWFyKCkpO1xyXG5cdFx0XHQkc2NvcGUudXBkYXRlRGF0ZU1hcCgpO1xyXG5cdFx0fTtcclxuXHJcblx0XHQkc2NvcGUubmV4dE1vbnRoID0gZnVuY3Rpb24oKSB7XHJcblx0XHRcdHZhciBkYXRlID0gbmV3IERhdGUoJHNjb3BlLmN1cnJlbnQueWVhciwgKCRzY29wZS5jdXJyZW50Lm1vbnRoICsgMSksIDEpO1xyXG5cdFx0XHRzZXRDdXJyZW50TW9udGhBbmRZZWFyKGRhdGUuZ2V0TW9udGgoKSwgZGF0ZS5nZXRGdWxsWWVhcigpKTtcclxuXHRcdFx0JHNjb3BlLnVwZGF0ZURhdGVNYXAoKTtcclxuXHRcdH07XHJcblxyXG5cdFx0JHNjb3BlLnNlbGVjdERhdGUgPSBmdW5jdGlvbih0aW1lKSB7XHJcblx0XHRcdHZhciBkYXRlID0gZ2V0U3RhbmRhcmRUaW1lKG5ldyBEYXRlKHRpbWUpKTtcclxuXHRcdFx0aWYgKGRheUlzT3V0T2ZSYW5nZShkYXRlKSkge1xyXG5cdFx0XHRcdHJldHVybjtcclxuXHRcdFx0fVxyXG5cdFx0XHRpZiAoZGF0ZS5tb250aCAhPT0gJHNjb3BlLmN1cnJlbnQubW9udGgpIHtcclxuXHRcdFx0XHRzZXRDdXJyZW50TW9udGhBbmRZZWFyKGRhdGUubW9udGgsIGRhdGUueWVhcik7XHJcblx0XHRcdFx0JHNjb3BlLnVwZGF0ZURhdGVNYXAoKTtcclxuXHRcdFx0fVxyXG5cdFx0XHRzZXRTZWxlY3RlZERhdGUobmV3IERhdGUodGltZSkpO1xyXG5cdFx0fTtcclxuXHJcblx0XHQkc2NvcGUudXBkYXRlRGF0ZU1hcCA9IGZ1bmN0aW9uKCkge1xyXG5cdFx0XHR2YXIgcmF3Q3VycmVudERheSA9ICgkc2NvcGUuY3VycmVudC5yYXcuZ2V0RGF5KCkgKiB1bml2ZXJzYWwuREFZKSxcclxuXHRcdFx0XHRmaXJzdFdlZWtEYXkgPSBuZXcgRGF0ZSgkc2NvcGUuY3VycmVudC50aW1lIC0gcmF3Q3VycmVudERheSksXHJcblx0XHRcdFx0aXNNb250aENvbXBsZXRlID0gZmFsc2U7XHJcblxyXG5cdFx0XHQkc2NvcGUuZGF0ZU1hcCA9IFtdO1xyXG5cclxuXHRcdFx0d2hpbGUgKCFpc01vbnRoQ29tcGxldGUpIHtcclxuXHRcdFx0XHR2YXIgd2VlayA9IFtdO1xyXG5cdFx0XHRcdGlmICgkc2NvcGUuZGF0ZU1hcC5sZW5ndGggPT09IDUpIHtcclxuXHRcdFx0XHRcdGlzTW9udGhDb21wbGV0ZSA9IHRydWU7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdGZvciAodmFyIHdlZWtEYXkgPSAwOyB3ZWVrRGF5IDwgNzsgd2Vla0RheSsrKSB7XHJcblx0XHRcdFx0XHR2YXIgcmF3VGhpc0RhdGUgPSBmaXJzdFdlZWtEYXkuZ2V0VGltZSgpICsgKHdlZWtEYXkgKiB1bml2ZXJzYWwuREFZKSxcclxuXHRcdFx0XHRcdFx0dGhpc0RhdGUgPSAobmV3IERhdGUocmF3VGhpc0RhdGUpKTtcclxuXHRcdFx0XHRcdC8vIGZpeCBmb3IgRFNUIG9kZG5lc3NcclxuXHRcdFx0XHRcdGlmICh0aGlzRGF0ZS5nZXRIb3VycygpID09PSAyMykge1xyXG5cdFx0XHRcdFx0XHR0aGlzRGF0ZSA9IChuZXcgRGF0ZSh0aGlzRGF0ZS5nZXRUaW1lKCkgKyB1bml2ZXJzYWwuSE9VUikpO1xyXG5cdFx0XHRcdFx0fSBlbHNlIGlmICh0aGlzRGF0ZS5nZXRIb3VycygpID09PSAxKSB7XHJcblx0XHRcdFx0XHRcdHRoaXNEYXRlID0gKG5ldyBEYXRlKHRoaXNEYXRlLmdldFRpbWUoKSAtIHVuaXZlcnNhbC5IT1VSKSk7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHR2YXIgZGF0ZSA9IGdldFN0YW5kYXJkVGltZSh0aGlzRGF0ZSk7XHJcblx0XHRcdFx0XHRkYXRlLmRheUluTW9udGggPSB0aGlzRGF0ZS5nZXRNb250aCgpID09PSAkc2NvcGUuY3VycmVudC5yYXcuZ2V0TW9udGgoKSA/ICdkYXktaW4tbW9udGgnIDogJyc7XHJcblx0XHRcdFx0XHRkYXRlLmRpc2FibGVkRGF5ID0gZGF5SXNPdXRPZlJhbmdlKGRhdGUpID8gJ2Rpc2FibGVkLWRheScgOiAnJztcclxuXHRcdFx0XHRcdHdlZWsucHVzaChkYXRlKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0Zmlyc3RXZWVrRGF5ID0gbmV3IERhdGUoZmlyc3RXZWVrRGF5LmdldFRpbWUoKSArICg3ICogdW5pdmVyc2FsLkRBWSkpO1xyXG5cdFx0XHRcdCRzY29wZS5kYXRlTWFwLnB1c2god2Vlayk7XHJcblx0XHRcdH1cclxuXHRcdH07XHJcblxyXG5cdFx0ZnVuY3Rpb24gZ2V0U3RhbmRhcmRUaW1lKGRhdGUpIHtcclxuXHRcdFx0cmV0dXJuIHtcclxuXHRcdFx0XHRyYXc6IGRhdGUsXHJcblx0XHRcdFx0eWVhcjogZGF0ZS5nZXRGdWxsWWVhcigpLFxyXG5cdFx0XHRcdG1vbnRoTmFtZTogZ2V0TW9udGhOYW1lKGRhdGUuZ2V0TW9udGgoKSksXHJcblx0XHRcdFx0bW9udGg6IGRhdGUuZ2V0TW9udGgoKSxcclxuXHRcdFx0XHRkYXk6IGdldERheU5hbWUoZGF0ZSksXHJcblx0XHRcdFx0ZGF0ZTogZGF0ZS5nZXREYXRlKCksXHJcblx0XHRcdFx0dGltZTogZGF0ZS5nZXRUaW1lKClcclxuXHRcdFx0fTtcclxuXHRcdH1cclxuXHJcblx0XHRmdW5jdGlvbiBnZXRUaW1lT2JqZWN0SWZEYXRlKGRhdGUpIHtcclxuXHRcdFx0aWYgKGFuZ3VsYXIuaXNEYXRlKG5ldyBEYXRlKGRhdGUpKSkge1xyXG5cdFx0XHRcdHJldHVybiBnZXRTdGFuZGFyZFRpbWUobmV3IERhdGUoZGF0ZSkpO1xyXG5cdFx0XHR9XHJcblx0XHRcdHJldHVybiBmYWxzZTtcclxuXHRcdH1cclxuXHJcblx0XHRmdW5jdGlvbiBzZXRDb25maWdPcHRpb25zKCkge1xyXG5cdFx0XHQkc2NvcGUuY29uZmlnID0gJHNjb3BlLmNvbmZpZyB8fCB7fTtcclxuXHRcdFx0JHNjb3BlLmNvbmZpZy5zdGFydCA9IGdldFRpbWVPYmplY3RJZkRhdGUoJHNjb3BlLmNvbmZpZy5zdGFydCk7XHJcblx0XHRcdCRzY29wZS5jb25maWcuZW5kID0gZ2V0VGltZU9iamVjdElmRGF0ZSgkc2NvcGUuY29uZmlnLmVuZCk7XHJcblx0XHRcdG9wdGlvbnMgPSBhbmd1bGFyLmV4dGVuZCh7fSwgZGVmYXVsdHMsICRzY29wZS5jb25maWcpO1xyXG5cdFx0fVxyXG5cclxuXHRcdGZ1bmN0aW9uIGRheUlzT3V0T2ZSYW5nZShfZGF0ZSkge1xyXG5cdFx0XHR2YXIgaGFzUmFuZ2UgPSBvcHRpb25zLnN0YXJ0ICYmIG9wdGlvbnMuZW5kO1xyXG5cdFx0XHRpZiAoaGFzUmFuZ2UgJiYgKF9kYXRlLnRpbWUgPCBvcHRpb25zLnN0YXJ0LnRpbWUgfHwgX2RhdGUudGltZSA+IG9wdGlvbnMuZW5kLnRpbWUpKSB7XHJcblx0XHRcdFx0cmV0dXJuIHRydWU7XHJcblx0XHRcdH0gZWxzZSBpZiAob3B0aW9ucy5zdGFydCAmJiBfZGF0ZS50aW1lIDwgb3B0aW9ucy5zdGFydC50aW1lKSB7XHJcblx0XHRcdFx0cmV0dXJuIHRydWU7XHJcblx0XHRcdH0gZWxzZSBpZiAob3B0aW9ucy5lbmQgJiYgX2RhdGUudGltZSA+IG9wdGlvbnMuZW5kLnRpbWUpIHtcclxuXHRcdFx0XHRyZXR1cm4gdHJ1ZTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cclxuXHRcdGZ1bmN0aW9uIHNldFNlbGVjdGVkRGF0ZShkYXRlKSB7XHJcblx0XHRcdCRzY29wZS5zZWxlY3RlZCA9IGdldFN0YW5kYXJkVGltZShkYXRlKTtcclxuXHRcdFx0JHNjb3BlLm5nTW9kZWwgPSAkc2NvcGUuc2VsZWN0ZWQucmF3O1xyXG5cdFx0fVxyXG5cclxuXHRcdGZ1bmN0aW9uIHNldEN1cnJlbnRNb250aEFuZFllYXIobW9udGgsIHllYXIpIHtcclxuXHRcdFx0dmFyIGRhdGUgPSBuZXcgRGF0ZSh5ZWFyICE9PSB1bmRlZmluZWQgPyB5ZWFyIDogJHNjb3BlLnNlbGVjdGVkLnllYXIsIG1vbnRoICE9PSB1bmRlZmluZWQgPyBtb250aCA6ICRzY29wZS5zZWxlY3RlZC5tb250aCwgMSk7XHJcblx0XHRcdCRzY29wZS5jdXJyZW50ID0gZ2V0U3RhbmRhcmRUaW1lKGRhdGUpO1xyXG5cdFx0fVxyXG5cclxuXHRcdGZ1bmN0aW9uIGdldE1vbnRoTmFtZShtb250aCkge1xyXG5cdFx0XHRyZXR1cm4gJHNjb3BlLm1vbnRoc1ttb250aF07XHJcblx0XHR9XHJcblxyXG5cdFx0ZnVuY3Rpb24gZ2V0RGF5TmFtZShkYXRlKSB7XHJcblx0XHRcdHJldHVybiAkc2NvcGUuZGF5c1tkYXRlLmdldERheSgpXTtcclxuXHRcdH1cclxuXHJcblx0XHRmdW5jdGlvbiBpbml0aWFsaXplKCkge1xyXG5cdFx0XHRzZXRDb25maWdPcHRpb25zKCk7XHJcblx0XHRcdHNldFNlbGVjdGVkRGF0ZSgkc2NvcGUubmdNb2RlbCB8fCBuZXcgRGF0ZSgpKTtcclxuXHRcdFx0c2V0Q3VycmVudE1vbnRoQW5kWWVhcigpO1xyXG5cdFx0XHQkc2NvcGUudXBkYXRlRGF0ZU1hcCgpO1xyXG5cdFx0fVxyXG5cclxuXHRcdGluaXRpYWxpemUoKTtcclxuXHJcblx0fV0pLmRpcmVjdGl2ZSgnYm9zc3lDYWxlbmRhcicsIFtmdW5jdGlvbiAoKSB7XHJcblx0XHRyZXR1cm4ge1xyXG5cdFx0XHRyZXN0cmljdDogJ0FFJyxcclxuXHRcdFx0c2NvcGU6IHtcclxuXHRcdFx0XHRjb25maWc6ICc9J1xyXG5cdFx0XHR9LFxyXG5cdFx0XHR0ZW1wbGF0ZVVybDogJ3RlbXBsYXRlcy9ib3NzeS5jYWxlbmRhci5odG1sJywvLyR0ZW1wbGF0ZUNhY2hlLmdldCgndGVtcGxhdGVzL2Jvc3N5LmNhbGVuZGFyLmh0bWwnKSxcclxuXHRcdFx0Y29udHJvbGxlcjogJ0NhbGVuZGFyQ29udHJvbGxlcidcclxuXHRcdH07XHJcblx0fV0pOyIsInZhciBhcHAgPSBhbmd1bGFyLm1vZHVsZSgnYm9zc3kuY29tYm9ib3guY2FzY2FkaW5nRHJvcGRvd24nLCBbXSk7XHJcblxyXG5hcHAuY29udHJvbGxlcignQXBwQ3RybCcsIGZ1bmN0aW9uKCRzY29wZSkge1xyXG5cclxuICAgIC8vIGFkZCBjaG9pY2VzIGZvciB0aGUgMyBkcm9wZG93bnNcclxuICAgIC8vIGRlcGVuZGVuY2llcyBpbiBhcnJheXMgKEEgLSBBMSAtIEExYSlcclxuICAgICRzY29wZS5jaG9pY2VzID0ge1xyXG4gICAgICAgICdPcHRpb24gQSc6IHtcclxuICAgICAgICAgICAgJ09wdGlvbiBBMSc6IFsnT3B0aW9uIEExYScsICdPcHRpb24gQTFiJywgJ09wdGlvbiBBMWMnXSxcclxuICAgICAgICAgICAgJ09wdGlvbiBBMic6IFsnT3B0aW9uIEEyYScsICdPcHRpb24gQTJiJywgJ09wdGlvbiBBMmMnXSxcclxuICAgICAgICAgICAgJ09wdGlvbiBBMyc6IFsnT3B0aW9uIEEzYScsICdPcHRpb24gQTNiJywgJ09wdGlvbiBBM2MnXVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgJ09wdGlvbiBCJzoge1xyXG4gICAgICAgICAgICAnT3B0aW9uIEIxJzogWydPcHRpb24gQjFhJywgJ09wdGlvbiBCMWInLCAnT3B0aW9uIEIxYyddLFxyXG4gICAgICAgICAgICAnT3B0aW9uIEIyJzogWydPcHRpb24gQjJhJywgJ09wdGlvbiBCMmInLCAnT3B0aW9uIEIyYyddLFxyXG4gICAgICAgICAgICAnT3B0aW9uIEIzJzogWydPcHRpb24gQjNhJywgJ09wdGlvbiBCM2InLCAnT3B0aW9uIEIzYyddXHJcbiAgICAgICAgfSxcclxuICAgICAgICAnT3B0aW9uIEMnOiB7XHJcbiAgICAgICAgICAgICdPcHRpb24gQzEnOiBbJ09wdGlvbiBDMWEnLCAnT3B0aW9uIEMxYicsICdPcHRpb24gQzFjJ10sXHJcbiAgICAgICAgICAgICdPcHRpb24gQzInOiBbJ09wdGlvbiBDMmEnLCAnT3B0aW9uIEMyYicsICdPcHRpb24gQzNiJ10sXHJcbiAgICAgICAgICAgICdPcHRpb24gQzMnOiBbJ09wdGlvbiBDM2EnLCAnT3B0aW9uIEMzYicsICdPcHRpb24gQzNjJ11cclxuICAgICAgICB9XHJcbiAgICB9O1xyXG5cclxufSk7IiwidmFyIGFwcCA9IGFuZ3VsYXIubW9kdWxlKCdib3NzeS5jb21ib2JveC5jaGVja2JveE11bHRpc2VsZWN0JywgW10pO1xyXG5cclxuYXBwLmNvbnRyb2xsZXIoJ0FwcEN0cmwnLCBmdW5jdGlvbigkc2NvcGUpIHtcclxuXHJcbiAgICAvLyBzZXQgY2hvaWNlc1xyXG4gICAgJHNjb3BlLmNob2ljZXMgPSBbJ09wdGlvbiBBJywgJ09wdGlvbiBCJywgJ09wdGlvbiBDJ107XHJcblxyXG4gICAgLy8gYXJyYXlcclxuICAgICRzY29wZS5uYW1lID0ge2Nob2ljZXM6IFtdfTtcclxuXHJcbiAgICAvLyBmdW5jdGlvbiBzZWxlY3RBbGwgdG8gc2VsZWN0IGFsbCBjaGVja2JveGVzXHJcbiAgICAkc2NvcGUuc2VsZWN0QWxsID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgJHNjb3BlLm5hbWUuY2hvaWNlcyA9IGFuZ3VsYXIuY29weSgkc2NvcGUuY2hvaWNlcyk7XHJcbiAgICB9O1xyXG5cclxuICAgIC8vIGZ1bmN0aW9uIGRlc2VsZWN0QWxsIHRvIGRlc2VsZWN0IGFsbCBjaGVja2JveGVzXHJcbiAgICAkc2NvcGUuZGVzZWxlY3RBbGwgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICAkc2NvcGUubmFtZS5jaG9pY2VzID0gW107XHJcbiAgICB9O1xyXG5cclxufSk7XHJcblxyXG5hcHAuZGlyZWN0aXZlKCdib3NzeUNoZWNrYm94TXVsdGlzZWxlY3QnLCBbJyRwYXJzZScsICckY29tcGlsZScsIGZ1bmN0aW9uKCRwYXJzZSwgJGNvbXBpbGUpIHtcclxuXHJcbiAgICAvLyBhZGQgdGhlIHNlbGVjdGVkIGNob2ljZSB0byBjaG9pY2VzXHJcbiAgICBmdW5jdGlvbiBhZGRDaG9pY2UgKGFyciwgaXRlbSkge1xyXG4gICAgICAgIGFyciA9IGFuZ3VsYXIuaXNBcnJheShhcnIpID8gYXJyIDogW107XHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBhcnIubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgaWYgKGFuZ3VsYXIuZXF1YWxzKGFycltpXSwgaXRlbSkpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBhcnI7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gYWRkIGNob2ljZSB0byBhcnJheVxyXG4gICAgICAgIGFyci5wdXNoKGl0ZW0pO1xyXG4gICAgICAgIC8vIHJldHVybiBuZXcgYXJyYXlcclxuICAgICAgICByZXR1cm4gYXJyO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIHJlbW92ZSB0aGUgc2VsZWN0ZWQgY2hvaWNlIGZyb20gY2hvaWNlcyB3aGVuIGNsaWNrZWRcclxuICAgIGZ1bmN0aW9uIHJlbW92ZUNob2ljZShhcnIsIGl0ZW0pIHtcclxuICAgICAgICBpZiAoYW5ndWxhci5pc0FycmF5KGFycikpIHtcclxuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBhcnIubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIGlmIChhbmd1bGFyLmVxdWFscyhhcnJbaV0sIGl0ZW0pKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gcmVtb3ZlIGZyb20gYXJyYXlcclxuICAgICAgICAgICAgICAgICAgICBhcnIuc3BsaWNlKGksIDEpO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIHJldHVybiBuZXcgYXJyYXlcclxuICAgICAgICByZXR1cm4gYXJyO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIGNvbnRhaW5zIC0gY2hlY2sgd2hpY2ggaXRlbXMgdGhlIGFycmF5IGNvbnRhaW5zXHJcbiAgICBmdW5jdGlvbiBjb250YWluQ2hlY2tib3ggKGFyciwgaXRlbSkge1xyXG4gICAgICAgIGlmIChhbmd1bGFyLmlzQXJyYXkoYXJyKSkge1xyXG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGFyci5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgaWYgKGFuZ3VsYXIuZXF1YWxzKGFycltpXSwgaXRlbSkpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gd2F0Y2ggYmVoYXZpb3VyIG9mIGRpcmVjdGl2ZSBhbmQgbW9kZWxcclxuICAgIGZ1bmN0aW9uIHdhdGNoKHNjb3BlLCBlbGVtLCBhdHRycykge1xyXG5cclxuICAgICAgICAvLyBjb21waWxlIC0gbmctbW9kZWwgcG9pbnRpbmcgdG8gY2hlY2tlZFxyXG4gICAgICAgICRjb21waWxlKGVsZW0pKHNjb3BlKTtcclxuXHJcbiAgICAgICAgLy8gZ2V0dGVyIGFuZCBzZXR0ZXIgZm9yIG9yaWdpbmFsIG1vZGVsXHJcbiAgICAgICAgdmFyIGdldHRlciA9ICRwYXJzZShhdHRycy5ib3NzeUNoZWNrYm94TXVsdGlzZWxlY3QpO1xyXG4gICAgICAgIHZhciBzZXR0ZXIgPSBnZXR0ZXIuYXNzaWduO1xyXG5cclxuICAgICAgICAvLyB2YWx1ZSBhZGRlZCB0byBsaXN0XHJcbiAgICAgICAgdmFyIHZhbHVlID0gJHBhcnNlKGF0dHJzLmJvc3N5TGlzdFZhbHVlKShzY29wZS4kcGFyZW50KTtcclxuXHJcbiAgICAgICAgLy8gd2F0Y2ggdGhlIGNoYW5nZSBvZiBjaGVja2VkIHZhbHVlc1xyXG4gICAgICAgIHNjb3BlLiR3YXRjaCgnY2hlY2tlZCcsIGZ1bmN0aW9uKG5ld1ZhbHVlLCBvbGRWYWx1ZSkge1xyXG4gICAgICAgICAgICBpZiAobmV3VmFsdWUgPT09IG9sZFZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdmFyIGFjdHVhbCA9IGdldHRlcihzY29wZS4kcGFyZW50KTtcclxuICAgICAgICAgICAgaWYgKG5ld1ZhbHVlID09PSB0cnVlKSB7XHJcbiAgICAgICAgICAgICAgICBzZXR0ZXIoc2NvcGUuJHBhcmVudCwgYWRkQ2hvaWNlIChhY3R1YWwsIHZhbHVlKSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBzZXR0ZXIoc2NvcGUuJHBhcmVudCwgcmVtb3ZlQ2hvaWNlKGFjdHVhbCwgdmFsdWUpKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICAvLyB3YXRjaCBjaGFuZ2Ugb2Ygb3JpZ2luYWwgbW9kZWxcclxuICAgICAgICBzY29wZS4kcGFyZW50LiR3YXRjaChhdHRycy5ib3NzeUNoZWNrYm94TXVsdGlzZWxlY3QsIGZ1bmN0aW9uKG5ld0Fycikge1xyXG4gICAgICAgICAgICBzY29wZS5jaGVja2VkID0gY29udGFpbkNoZWNrYm94IChuZXdBcnIsIHZhbHVlKTtcclxuICAgICAgICB9LCB0cnVlKTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIHJlc3RyaWN0OiAnQUUnLFxyXG4gICAgICAgIHNjb3BlOiB0cnVlLFxyXG4gICAgICAgIGNvbXBpbGU6IGZ1bmN0aW9uKHRFbGVtZW50LCB0QXR0cnMpIHtcclxuICAgICAgICAgICAgLy8gbG9jYWwgdmFyaWFibGUgc3RvcmluZyBjaGVja2JveCBtb2RlbFxyXG4gICAgICAgICAgICB0RWxlbWVudC5hdHRyKCduZy1tb2RlbCcsICdjaGVja2VkJyk7XHJcbiAgICAgICAgICAgIC8vIHByZXZlbnQgcmVjdXJzaW9uXHJcbiAgICAgICAgICAgIHRFbGVtZW50LnJlbW92ZUF0dHIoJ2Jvc3N5LWNoZWNrYm94LW11bHRpc2VsZWN0Jyk7XHJcbiAgICAgICAgICAgIHJldHVybiB3YXRjaDtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG5cclxufV0pOyIsInZhciBhcHAgPSBhbmd1bGFyLm1vZHVsZSgnYm9zc3kuY29tYm9ib3gubXVsdGlzZWxlY3QnLCBbXSk7XHJcblxyXG5hcHAuY29udHJvbGxlcignQXBwQ3RybCcsIGZ1bmN0aW9uKCRzY29wZSkge1xyXG5cclxuICAgIC8vIGFkZCBjaG9pY2VzIGZvciBtdWx0aXNlbGVjdCBpbiBhcnJheVxyXG4gICAgJHNjb3BlLmNob2ljZXMgPSBbe2lkOjEsIG5hbWU6ICdPcHRpb24gQSd9LFxyXG4gICAgICAgICAgICAgICAgICAgICAge2lkOjIsIG5hbWU6ICdPcHRpb24gQid9LFxyXG4gICAgICAgICAgICAgICAgICAgICAge2lkOjMsIG5hbWU6ICdPcHRpb24gQyd9XHJcbiAgICAgICAgICAgICAgICAgICAgIF07XHJcblxyXG4gICAgLy8gc2VsZWN0ZWQgY2hvaWNlXHJcbiAgICAkc2NvcGUuc2VsZWN0ZWRDaG9pY2UgPSBbXTtcclxuXHJcbn0pO1xyXG5cclxuLy8gaW5qZWN0IGZ1bmN0aW9uc1xyXG5hcHAuZmFjdG9yeSgnb3B0aW9uUGFyc2VyJywgWyckcGFyc2UnLCBmdW5jdGlvbiAoJHBhcnNlKSB7XHJcblxyXG4gICAgdmFyIFRZUEVBSEVBRF9SRUdFWFAgPSAvXlxccyooLio/KSg/Olxccythc1xccysoLio/KSk/XFxzK2ZvclxccysoPzooW1xcJFxcd11bXFwkXFx3XFxkXSopKVxccytpblxccysoLiopJC87XHJcblxyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICBwYXJzZTogZnVuY3Rpb24gKGlucHV0KSB7XHJcblxyXG4gICAgICAgICAgICAvLyBjaGVjayBpbnB1dHNcclxuICAgICAgICAgICAgdmFyIG1hdGNoID0gaW5wdXQubWF0Y2goVFlQRUFIRUFEX1JFR0VYUCksIG1vZGVsTWFwcGVyLCB2aWV3TWFwcGVyLCBzb3VyY2U7XHJcbiAgICAgICAgICAgIGlmICghbWF0Y2gpIHtcclxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcclxuICAgICAgICAgICAgICAgICAgICAgICAgJ0V4cGVjdGVkIHR5cGVhaGVhZCBzcGVjaWZpY2F0aW9uIGluIGZvcm0gb2YgXCJfbW9kZWxWYWx1ZV8gKGFzIF9sYWJlbF8pPyBmb3IgX2l0ZW1fIGluIF9jb2xsZWN0aW9uX1wiJyArXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICcgYnV0IGdvdCBcIicgKyBpbnB1dCArICdcIi4nKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgIGl0ZW1OYW1lOiBtYXRjaFszXSxcclxuICAgICAgICAgICAgICAgIHNvdXJjZTogJHBhcnNlKG1hdGNoWzRdKSxcclxuICAgICAgICAgICAgICAgIHZpZXdNYXBwZXI6ICRwYXJzZShtYXRjaFsyXSB8fCBtYXRjaFsxXSksXHJcbiAgICAgICAgICAgICAgICBtb2RlbE1hcHBlcjogJHBhcnNlKG1hdGNoWzFdKVxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcbn1dKTtcclxuXHJcbmFwcC5kaXJlY3RpdmUoJ2Jvc3N5TXVsdGlzZWxlY3QnLFxyXG5cclxuICAgICAgICBmdW5jdGlvbiAoJGRvY3VtZW50LCAkY29tcGlsZSwgb3B0aW9uUGFyc2VyKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICByZXN0cmljdDogJ0UnLFxyXG4gICAgICAgICAgICAgICAgcmVxdWlyZTogJ25nTW9kZWwnLFxyXG4gICAgICAgICAgICAgICAgbGluazogZnVuY3Rpb24gKG9yaWdpbmFsU2NvcGUsIGVsZW1lbnQsIGF0dHJzLCBtb2RlbEN0cmwpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gZGVjbGFyZSB2YXJpYWJsZXNcclxuICAgICAgICAgICAgICAgICAgICB2YXIgZXhwID0gYXR0cnMub3B0aW9ucyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgcGFyc2VkUmVzdWx0ID0gb3B0aW9uUGFyc2VyLnBhcnNlKGV4cCksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlzTXVsdGlwbGUgPSBhdHRycy5tdWx0aXBsZSA/IHRydWUgOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2NvcGUgPSBvcmlnaW5hbFNjb3BlLiRuZXcoKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2hhbmdlSGFuZGxlciA9IGF0dHJzLmNoYW5nZSB8fCBhbmd1bGFyLm5vb3A7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHNjb3BlLml0ZW1zID0gW107XHJcbiAgICAgICAgICAgICAgICAgICAgc2NvcGUubXVsdGlwbGUgPSBpc011bHRpcGxlO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAvLyBpbmNsdWRlIHNlY29uZCBkaXJlY3RpdmUgKHRlbXBsYXRlKVxyXG4gICAgICAgICAgICAgICAgICAgIHZhciBwb3BVcEVsID0gYW5ndWxhci5lbGVtZW50KCc8Ym9zc3ktbXVsdGlzZWxlY3QtcG9wdXA+PC9ib3NzeS1tdWx0aXNlbGVjdC1wb3B1cD4nKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gYW5hbHlzZSBtb2RlbFxyXG4gICAgICAgICAgICAgICAgICAgIGZ1bmN0aW9uIHBhcnNlTW9kZWwoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBtb2RlbCA9IHBhcnNlZFJlc3VsdC5zb3VyY2Uob3JpZ2luYWxTY29wZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbW9kZWwubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBsb2NhbCA9IHt9O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbG9jYWxbcGFyc2VkUmVzdWx0Lml0ZW1OYW1lXSA9IG1vZGVsW2ldO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2NvcGUuaXRlbXMucHVzaCh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGFiZWw6IHBhcnNlZFJlc3VsdC52aWV3TWFwcGVyKGxvY2FsKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtb2RlbDogbW9kZWxbaV0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2hlY2tlZDogZmFsc2VcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICBwYXJzZU1vZGVsKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC8vIGFkZCB0ZW1wbGF0ZSBkaXJlY3RpdmVcclxuICAgICAgICAgICAgICAgICAgICBlbGVtZW50LmFwcGVuZCgkY29tcGlsZShwb3BVcEVsKShzY29wZSkpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAvLyBzZWxlY3Rpb24gZnVuY3Rpb25cclxuICAgICAgICAgICAgICAgICAgICBmdW5jdGlvbiBzZWxlY3RNdWx0aXBsZShpdGVtKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW0uY2hlY2tlZCA9ICFpdGVtLmNoZWNrZWQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNldE1vZGVsVmFsdWUodHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAvLyBhcnJheSBmb3IgbXVsdGlwbGUgc2VsZWN0aW9uXHJcbiAgICAgICAgICAgICAgICAgICAgZnVuY3Rpb24gc2V0TW9kZWxWYWx1ZShpc011bHRpcGxlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciB2YWx1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGlzTXVsdGlwbGUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlID0gW107XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhbmd1bGFyLmZvckVhY2goc2NvcGUuaXRlbXMsIGZ1bmN0aW9uIChpdGVtKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGl0ZW0uY2hlY2tlZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZS5wdXNoKGl0ZW0ubW9kZWwpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYW5ndWxhci5mb3JFYWNoKHNjb3BlLml0ZW1zLCBmdW5jdGlvbiAoaXRlbSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpdGVtLmNoZWNrZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWUgPSBpdGVtLm1vZGVsO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgbW9kZWxDdHJsLiRzZXRWaWV3VmFsdWUodmFsdWUpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gZnVuY3Rpb24gZm9yIHNlbGVjdGlvbiBvZiBhbGxcclxuICAgICAgICAgICAgICAgICAgICBzY29wZS5jaGVja0FsbCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFpc011bHRpcGxlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgYW5ndWxhci5mb3JFYWNoKHNjb3BlLml0ZW1zLCBmdW5jdGlvbiAoaXRlbSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaXRlbS5jaGVja2VkID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNldE1vZGVsVmFsdWUodHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gZnVuY3Rpb24gZm9yIHNlbGVjdGlvbiBvZiBub25lXHJcbiAgICAgICAgICAgICAgICAgICAgc2NvcGUudW5jaGVja0FsbCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYW5ndWxhci5mb3JFYWNoKHNjb3BlLml0ZW1zLCBmdW5jdGlvbiAoaXRlbSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaXRlbS5jaGVja2VkID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZXRNb2RlbFZhbHVlKHRydWUpO1xyXG4gICAgICAgICAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHNjb3BlLnNlbGVjdCA9IGZ1bmN0aW9uIChpdGVtKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIFRPRE86IGFkZCBzZWxlY3RTaW5nbGUgZnVuY3Rpb24gPz8/XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpc011bHRpcGxlICE9PSBmYWxzZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZWN0TXVsdGlwbGUoaXRlbSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgIH0pO1xyXG5cclxuLy8gZGlyZWN0aXZlIHN0b3JpbmcgdGVtcGxhdGVcclxuYXBwLmRpcmVjdGl2ZSgnYm9zc3lNdWx0aXNlbGVjdFBvcHVwJywgWyckZG9jdW1lbnQnLCBmdW5jdGlvbiAoJGRvY3VtZW50KSB7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgcmVzdHJpY3Q6ICdFJyxcclxuICAgICAgICAgICAgc2NvcGU6IGZhbHNlLFxyXG4gICAgICAgICAgICByZXBsYWNlOiB0cnVlLFxyXG4gICAgICAgICAgICB0ZW1wbGF0ZVVybDogJy4uL3RlbXBsYXRlcy9ib3NzeS5jb21ib2JveC5tdWx0aXNlbGVjdC5odG1sJyxcclxuICAgICAgICAgICAgbGluazogZnVuY3Rpb24gKHNjb3BlLCBlbGVtZW50LCBhdHRyKSB7XHJcblxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuICAgIH1dKTtcclxuIiwiYW5ndWxhci5tb2R1bGUoJ2Jvc3N5LmRhdGEnLCBbXSlcclxuLyoqXHJcbkBuZ2RvYyBzZXJ2aWNlXHJcbkBuYW1lICRkYXRhXHJcbkByZXF1aXJlcyAkcVxyXG5AcmVxdWlyZXMgJGh0dHBcclxuXHJcbiovXHJcbiAgICAuZmFjdG9yeSgnJGRhdGEnLCBbJyRxJywnJGh0dHAnLCAnJHNjb3BlJywgZnVuY3Rpb24gKCRxLCAkaHR0cCwgJHNjb3BlKSB7XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIF9nZXREYXRhIChkYXRhKSB7XHJcbiAgICAgICAgICAgIGlmIChhbmd1bGFyLmlzU3RyaW5nKGRhdGEpKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gX2dldFJlbW90ZURhdGEoZGF0YSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSBpZiAoYW5ndWxhci5pc09iamVjdChkYXRhKSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGRhdGE7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSBpZiAoYW5ndWxhci5pc0Z1bmN0aW9uKGRhdGEpKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gX2dldERhdGEoIGRhdGEuY2FsbCgkc2NvcGUpICk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAvL1RPRE86IHJlcGxhY2UgZXJyb3IgbWVzc2FnZSB3aXRoIG9ubGluZSBkb2MgbGluayBsaWtlIG5nIGVycm9yc1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcignZGlyZWN0aXZlLmJvc3N5Rm9ybTogbm8gZGF0YSB1cmwgb3Igb2JqZWN0IGdpdmVuJyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIF9nZXRSZW1vdGVEYXRhKGRhdGEpIHtcclxuICAgICAgICAgICAgdmFyIGRlZmVycmVkID0gJHEuZGVmZXIoKTtcclxuXHJcbiAgICAgICAgICAgICRodHRwLmdldChkYXRhLCB7IHJlc3BvbnNlVHlwZTogJ2pzb24nIH0gKVxyXG4gICAgICAgICAgICAgICAgLnN1Y2Nlc3MoIGZ1bmN0aW9uKCBkYXRhICkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKCBhbmd1bGFyLmlzT2JqZWN0KCBkYXRhICkgKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlc29sdmUoZGF0YSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL1RPRE86IHJlcGxhY2UgZXJyb3IgbWVzc2FnZSB3aXRoIG9ubGluZSBkb2MgbGluayBsaWtlIG5nIGVycm9yc1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZWplY3QoJ2RpcmVjdGl2ZS5ib3NzeUZvcm06IEdFVCByZXF1ZXN0IHRvIHVybCBkaWQgbm90IHByb2R1Y2UgZGF0YSBvYmplY3QnKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmVycm9yKGZ1bmN0aW9uKHJlc3BvbnNlRGF0YSwgc3RhdHVzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy9UT0RPOiByZXBsYWNlIGVycm9yIG1lc3NhZ2Ugd2l0aCBvbmxpbmUgZG9jIGxpbmsgbGlrZSBuZyBlcnJvcnNcclxuICAgICAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZWplY3QoJ2RpcmVjdGl2ZS5ib3NzeUZvcm06IEdFVCByZXF1ZXN0IHRvIHVybCBcIicgKyBkYXRhICsgJ1wiIGZhaWxlZCB3aXRoIHN0YXR1cyBcIicgKyBzdGF0dXMgKyAnXCInKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuIGRlZmVycmVkLnByb21pc2U7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAvKipcclxuICAgICAgICAgICAgQG5nZG9jIG1ldGhvZFxyXG4gICAgICAgICAgICBAbmFtZSBnZXREYXRhXHJcbiAgICAgICAgICAgIEBtZXRob2RPZiAkZGF0YVxyXG4gICAgICAgICAgICBAcGFyYW0ge3N0cmluZyxvYmplY3QsZnVuY3Rpb259IGRhdGEgSWYgZGF0YSBpcyBhIHN0cmluZywgaXQgd2lsbCBiZSB0cmVhdGVkIGFzIGEgdXJsIHRvIHJldHJpZXZlIGRhdGEgZnJvbS4gSWYgZGF0YSBpcyBhbiBvYmplY3QgaXQgd2lsbCBiZSBpbW1lZGlhdGVseSByZXR1cm5lZC4gSWYgZGF0YSBpcyBhIGZ1bmN0aW9uLCB0aGUgZnVuY3Rpb24gd2lsbCBiZSBjYWxsZWQgYW5kIHByb2Nlc3NlZCB1bnRpbCBhbiBvYmplY3QgaXMgcHJvZHVjZWRcclxuICAgICAgICAgICAgQHJldHVybnMge09iamVjdH0gRWl0aGVyIGEgJHEgcHJvbWlzZSwgYSBkYXRhIG9iamVjdCBvciBhIHN0cmluZy5cclxuICAgICAgICAgICAgKi9cclxuICAgICAgICAgICAgZ2V0RGF0YTogX2dldERhdGFcclxuICAgICAgICB9O1xyXG4gICAgfV0pXHJcbjtcclxuIiwiYW5ndWxhci5tb2R1bGUoJ2Jvc3N5LmRhdGFncmlkJywgW10pXHJcblx0LmNvbnRyb2xsZXIoJ0RhdGFHcmlkQ29udHJvbGxlcicsIFsnJHNjb3BlJywgZnVuY3Rpb24oJHNjb3BlKXtcclxuXHJcblx0XHR2YXIgbnVtYmVyQ29tcGFyZSA9IGZ1bmN0aW9uKGEsIGIpIHtcclxuXHRcdFx0dmFyIHJlc3VsdCA9IDA7XHJcblx0XHRcdGlmIChhIDwgYikge1xyXG5cdFx0XHRcdHJlc3VsdCA9IC0xO1xyXG5cdFx0XHR9IGVsc2UgaWYgKGEgPiBiKSB7XHJcblx0XHRcdFx0cmVzdWx0ID0gMTtcclxuXHRcdFx0fVxyXG5cdFx0XHRyZXR1cm4gcmVzdWx0O1xyXG5cdFx0fTtcclxuXHJcblx0XHR2YXIgc3RyaW5nQ29tcGFyZSA9IGZ1bmN0aW9uKGEsIGIpIHtcclxuXHRcdFx0Ly8gdG9Mb3dlckNhc2UgbmVlZGVkIHRvIHN1cHBvcnQgYWxsIGJyb3dzZXJzXHJcblx0XHRcdHJldHVybiBhLnRvTG93ZXJDYXNlKCkubG9jYWxlQ29tcGFyZShiLnRvTG93ZXJDYXNlKCkpO1xyXG5cdFx0fTtcclxuXHJcblx0XHR2YXIgZm9ybWF0dGVkTnVtYmVyQ29tcGFyZSA9IGZ1bmN0aW9uKGEsIGIpIHtcclxuXHRcdFx0Ly8gc3RyaXAgbm9uLW51bWVyaWMgY2hhcmFjdGVycywgYW5kIGNvbnZlcnQgdG8gbnVtYmVyIHdpdGggdW5hcnkgcGx1c1xyXG5cdFx0XHRhID0gK2EucmVwbGFjZSgvW15cXGQuLV0vZ2ksICcnKTtcclxuXHRcdFx0YiA9ICtiLnJlcGxhY2UoL1teXFxkLi1dL2dpLCAnJyk7XHJcblx0XHRcdHJldHVybiBudW1iZXJDb21wYXJlKGEsIGIpO1xyXG5cdFx0fTtcclxuXHJcblx0XHR2YXIgY29sdW1uQ29tcGFyZSA9IGZ1bmN0aW9uKGEsIGIsIGNvbHVtbkluZGV4KXtcclxuXHRcdFx0dmFyIGNvbHVtblR5cGUgPSAkc2NvcGUuY29uZmlnLmRhdGEuY29sdW1uc1tjb2x1bW5JbmRleF0udHlwZSxcclxuXHRcdFx0XHRyZXN1bHQgPSAwO1xyXG5cdFx0XHRpZiAoY29sdW1uVHlwZSA9PT0gJ251bWJlcicpIHtcclxuXHRcdFx0XHRyZXN1bHQgPSBudW1iZXJDb21wYXJlKGFbY29sdW1uSW5kZXhdLCBiW2NvbHVtbkluZGV4XSk7XHJcblx0XHRcdH0gZWxzZSBpZiAoY29sdW1uVHlwZSA9PT0gJ3N0cmluZycpIHtcclxuXHRcdFx0XHRyZXN1bHQgPSBzdHJpbmdDb21wYXJlKGFbY29sdW1uSW5kZXhdLCBiW2NvbHVtbkluZGV4XSk7XHJcblx0XHRcdH0gZWxzZSBpZiAoY29sdW1uVHlwZSA9PT0gJ21vbmV5Jykge1xyXG5cdFx0XHRcdHJlc3VsdCA9IGZvcm1hdHRlZE51bWJlckNvbXBhcmUoYVtjb2x1bW5JbmRleF0sIGJbY29sdW1uSW5kZXhdKTtcclxuXHRcdFx0fVxyXG5cdFx0XHRyZXR1cm4gcmVzdWx0O1xyXG5cdFx0fTtcclxuXHJcblx0XHR2YXIgY2FsY3VsYXRlU29ydGRpcmVjdGlvbiA9IGZ1bmN0aW9uKGNvbHVtbkluZGV4KXtcclxuXHRcdFx0Ly8gMSA9IGFzYyBvciAgLTEgPSBkZXNjXHJcblx0XHRcdGlmICgkc2NvcGUuY29uZmlnLmRhdGEuY29sdW1uc1tjb2x1bW5JbmRleF0uc29ydERpcmVjdGlvbikge1xyXG5cdFx0XHRcdCRzY29wZS5jb25maWcuZGF0YS5jb2x1bW5zW2NvbHVtbkluZGV4XS5zb3J0RGlyZWN0aW9uID0gLSRzY29wZS5jb25maWcuZGF0YS5jb2x1bW5zW2NvbHVtbkluZGV4XS5zb3J0RGlyZWN0aW9uO1xyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdCRzY29wZS5jb25maWcuZGF0YS5jb2x1bW5zW2NvbHVtbkluZGV4XS5zb3J0RGlyZWN0aW9uID0gMTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0cmV0dXJuICRzY29wZS5jb25maWcuZGF0YS5jb2x1bW5zW2NvbHVtbkluZGV4XS5zb3J0RGlyZWN0aW9uO1xyXG5cdFx0fTtcclxuXHJcblx0XHQkc2NvcGUuc29ydENvbHVtbiA9IGZ1bmN0aW9uKGNvbHVtbkluZGV4KSB7XHJcblx0XHRcdHZhciBzb3J0RGlyZWN0aW9uID0gY2FsY3VsYXRlU29ydGRpcmVjdGlvbihjb2x1bW5JbmRleCk7XHJcblxyXG5cdFx0XHQkc2NvcGUuY29uZmlnLmRhdGEucm93cyA9ICRzY29wZS5jb25maWcuZGF0YS5yb3dzLnNvcnQoZnVuY3Rpb24oYSwgYil7XHJcblx0XHRcdFx0cmV0dXJuIHNvcnREaXJlY3Rpb24gKiBjb2x1bW5Db21wYXJlKGEsIGIsIGNvbHVtbkluZGV4KTtcclxuXHRcdFx0fSk7XHJcblx0XHR9O1xyXG5cdH1dKVxyXG5cdC5kaXJlY3RpdmUoJ2Jvc3N5RGF0YWdyaWQnLCBbZnVuY3Rpb24oKVxyXG5cdHtcclxuXHRcdHJldHVybiB7XHJcblx0XHRcdHJlc3RyaWN0OiAnRUEnLFxyXG5cdFx0XHRzY29wZToge1xyXG5cdFx0XHRcdGNvbmZpZzogJz0nXHJcblx0XHRcdH0sXHJcblx0XHRcdHRlbXBsYXRlVXJsOiAnYm9zc3kuZGF0YWdyaWQuaHRtbCcsXHJcblx0XHRcdGNvbnRyb2xsZXI6ICdEYXRhR3JpZENvbnRyb2xsZXInXHJcblx0XHR9O1xyXG5cdH1dKTtcclxuIiwiYW5ndWxhci5tb2R1bGUoJ2Jvc3N5LmRyb3Bkb3duJywgW10pXHJcblx0LnJ1bihmdW5jdGlvbigkdGVtcGxhdGVDYWNoZSl7XHJcbiAgICAgICAgJHRlbXBsYXRlQ2FjaGUucHV0KCdib3NzeS1kcm9wZG93bi5odG1sJywgJzxkaXY+PHNlbGVjdCBuZy1vcHRpb25zPVwiaXRlbVtkcm9wZG93bi50aXRsZV0gZm9yIGl0ZW0gaW4gZHJvcGRvd24uaXRlbXMgfCBvcmRlckJ5OiBkcm9wZG93bi50aXRsZVwiIG5nLW1vZGVsPVwic2VsZWN0ZWRJdGVtXCIgbmctY2hhbmdlPVwiZHJvcGRvd24udXBkYXRlU2VsZWN0ZWRJdGVtKHNlbGVjdGVkSXRlbSlcIj48b3B0aW9uIHZhbHVlPVwiXCIgbmctaGlkZT1cInNlbGVjdGVkSXRlbVwiPlBsZWFzZSBzZWxlY3Qgb25lLi4uPC9vcHRpb24+PC9zZWxlY3Q+PC9kaXY+Jyk7XHJcbiAgICB9KVxyXG5cdC5kaXJlY3RpdmUoJ2Jvc3N5RHJvcGRvd24nLCBmdW5jdGlvbigkaHR0cCwgJGNvbXBpbGUpIHtcclxuXHRcdHJldHVybiB7XHJcblx0XHRcdHJlc3RyaWN0OiAnRUEnLFxyXG5cdFx0XHRzY29wZToge1xyXG5cdFx0XHRcdGNvbmZpZzogJz0nLFxyXG5cdFx0XHRcdHNlbGVjdDogJz0nLFxyXG5cdFx0XHRcdGl0ZW1zOiAnPSdcclxuXHRcdFx0fSxcclxuXHRcdFx0dGVtcGxhdGVVcmw6ICcnLFxyXG5cdFx0XHRsaW5rOiBmdW5jdGlvbihzY29wZSwgZWxlbWVudCwgYXR0cnMpIHtcclxuXHRcdFx0XHR2YXIgY3VzdG9tVGVtcGxhdGU7XHJcblxyXG5cdFx0XHRcdC8vQ2hlY2tzIGlmIHVzZXIgaXMgZGVmaW5pbmcgYSB1cmwgb3IgaW5uZXIgaHRtbFxyXG5cdFx0XHRcdC8vSWYgaXQgaXMgYSB1cmwsIHRoZSB0ZW1wbGF0ZSBtdXN0IGJlIGxvY2F0ZWQgaW4gYSBsb2NhbCBkaXJlY3Rvcnkgb3IgYWRkZWQgdG8gdGhlIERPTSB2aWEgbmctaW5jbHVkZVxyXG5cdFx0XHRcdGlmKHNjb3BlLmRyb3Bkb3duLnRlbXBsYXRlWzBdICE9PSAnPCcpIHtcclxuXHRcdFx0XHRcdGN1c3RvbVRlbXBsYXRlID0gJGNvbXBpbGUoJzxuZy1pbmNsdWRlIHNyYz1cImRyb3Bkb3duLnRlbXBsYXRlXCI+PC9uZy1pbmNsdWRlPicpKHNjb3BlKTtcclxuXHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0Y3VzdG9tVGVtcGxhdGUgPSAkY29tcGlsZShzY29wZS5kcm9wZG93bi50ZW1wbGF0ZSkoc2NvcGUpO1xyXG5cdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0Ly9JbmplY3RzIHRlbXBsYXRlXHJcblx0XHRcdFx0ZWxlbWVudC5yZXBsYWNlV2l0aChjdXN0b21UZW1wbGF0ZSk7XHJcblx0XHRcdH0sXHJcblx0XHRcdGNvbnRyb2xsZXI6IGZ1bmN0aW9uKCRzY29wZSkge1xyXG5cdFx0XHRcdHZhciB0aGlzRHJvcGRvd24gPSB0aGlzO1xyXG5cdFx0XHRcdHRoaXNEcm9wZG93bi50aXRsZSA9ICRzY29wZS5jb25maWcudGl0bGU7XHJcblx0XHRcdFx0dGhpc0Ryb3Bkb3duLml0ZW1zID0gW107XHJcblxyXG5cdFx0XHRcdC8vUmV0cmlldmUganNvbiBjb250YWluaW5nIG9iamVjdHMgdG8gcG9wdWxhdGUgdGhlIGRyb3Bkb3duLlxyXG5cdFx0XHRcdGlmKCRzY29wZS5jb25maWcuc3JjKSB7XHJcblx0XHRcdFx0XHQvL0NoZWNrcyB0aGF0IGNvbmZpZy5zcmMgaXMgYSBKU09OIGZpbGUuXHJcblx0XHRcdFx0XHRpZigkc2NvcGUuY29uZmlnLnNyYy5zdWJzdHIoJHNjb3BlLmNvbmZpZy5zcmMubGVuZ3RoLTUsICRzY29wZS5jb25maWcuc3JjLmxlbmd0aCkgPT09ICcuanNvbicpIHtcclxuXHRcdFx0XHRcdFx0JGh0dHAuZ2V0KCRzY29wZS5jb25maWcuc3JjKVxyXG5cdFx0XHRcdFx0XHRcdC5zdWNjZXNzKGZ1bmN0aW9uKGRhdGEpIHtcclxuXHRcdFx0XHRcdFx0XHRcdHRoaXNEcm9wZG93bi5pdGVtcyA9IGRhdGE7XHJcblx0XHRcdFx0XHRcdFx0XHQvL0NoZWNrcyB2YWxpZGl0eSBvZiB0aGUgdGl0bGUgZmllbGQgYXMgaXQgYXBwbGllcyB0byB0aGUgSlNPTi5cclxuXHRcdFx0XHRcdFx0XHRcdGlmKCF0aGlzRHJvcGRvd24uaXRlbXNbMF0uaGFzT3duUHJvcGVydHkodGhpc0Ryb3Bkb3duLnRpdGxlKSkge1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRjb25zb2xlLmVycm9yKCdFUlJPUjogJHNjb3BlLmNvbmZpZy50aXRsZTogXCInICsgJHNjb3BlLmNvbmZpZy50aXRsZSArICdcIiBpcyBub3QgYSBtZW1iZXIgb2YgdGhlIGxvYWRlZCBKU09OIGRhdGEuIFBsZWFzZSBzcGVjaWZ5IGEgdmFsaWQgXCJ0aXRsZVwiIHRvIGxpc3QuJyk7XHJcblx0XHRcdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRcdFx0XHQvL0F0dGFjaGVzIHJldHJpZXZlZCBpdGVtcyB0byAkc2NvcGUuaXRlbXMgZm9yIGFkZGl0aW9uYWwgZnVuY3Rpb25hbGl0eS5cclxuXHRcdFx0XHRcdFx0XHRcdGlmKCRzY29wZS5pdGVtcykge1xyXG5cdFx0XHRcdFx0XHRcdFx0XHQkc2NvcGUuaXRlbXMgPSB0aGlzRHJvcGRvd24uaXRlbXM7XHJcblx0XHRcdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRcdFx0fSlcclxuXHRcdFx0XHRcdFx0XHQuZXJyb3IoZnVuY3Rpb24oZGF0YSkge1xyXG5cdFx0XHRcdFx0XHRcdFx0Y29uc29sZS5lcnJvcignRVJST1I6IEZhaWwgdG8gbG9hZCBKU09OIGRhdGEgZnJvbSB0aGUgcGF0aDogXCInICsgJHNjb3BlLmNvbmZpZy5zcmMgKyAnXCInKTtcclxuXHRcdFx0XHRcdFx0XHR9KTtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdC8vTG9ncyBhbiBlcnJvciB0byBpZGVudGlmeSB0aGF0IGEganNvbiBmaWxlIHdhcyBub3QgbG9hZGVkLlxyXG5cdFx0XHRcdFx0ZWxzZSB7XHJcblx0XHRcdFx0XHRcdGNvbnNvbGUuZXJyb3IoJ0VSUk9SOiBcIiRzY29wZS5jb25maWcuc3JjXCI6IFwiJyArICRzY29wZS5jb25maWcuc3JjICsgJ1wiIGlzIG5vdCBhIHZhbGlkIEpTT04gZmlsZS4nKTtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdC8vRnVuY3Rpb24gY2FsbGVkIHRvIHVwZGF0ZSBzZWxlY3QgaW4gdGhlIHRlbXBsYXRlLlxyXG5cdFx0XHRcdFx0dGhpc0Ryb3Bkb3duLnVwZGF0ZVNlbGVjdGVkSXRlbSA9IGZ1bmN0aW9uKHNlbGVjdGVkSXRlbSkge1xyXG5cdFx0XHRcdFx0XHQvL1NpbmdsZSBzZWxlY3Qgb2JqZWN0IHRpZWQgdG8gdGhlIGNvbmZpZyBvYmplY3QuXHJcblx0XHRcdFx0XHRcdGlmICgkc2NvcGUuY29uZmlnLnNlbGVjdCkge1xyXG5cdFx0XHRcdFx0XHRcdCRzY29wZS5jb25maWcuc2VsZWN0ID0gc2VsZWN0ZWRJdGVtO1xyXG5cdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRcdC8vVXNlciBjYW4gY29sbGVjdCBhbmQgdXRpbGl6ZSBtdWx0aXBsZSBzZWxlY3Qgb2JqZWN0cyB3aXRoIHRoZSBzYW1lIGNvbmZpZyBvYmplY3QgaWYgcGFzc2luZyBpbiBhIGRpc3RpbmN0IHNlbGVjdCBwYXJhbS5cclxuXHRcdFx0XHRcdFx0aWYgKCRzY29wZS5zZWxlY3QpIHtcclxuXHRcdFx0XHRcdFx0XHQkc2NvcGUuc2VsZWN0ID0gc2VsZWN0ZWRJdGVtO1xyXG5cdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHR9O1xyXG5cdFx0XHRcdFx0Ly9EZXRlcm1pbmUgaWYgY3VzdG9tIHRlbXBsYXRlIFVybCBoYXMgYmVlbiBkZWZpbmVkLlxyXG5cdFx0XHRcdFx0aWYgKCRzY29wZS5jb25maWcudGVtcGxhdGUpIHtcclxuXHRcdFx0XHRcdFx0dGhpc0Ryb3Bkb3duLnRlbXBsYXRlID0gJHNjb3BlLmNvbmZpZy50ZW1wbGF0ZTtcclxuXHRcdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHRcdHRoaXNEcm9wZG93bi50ZW1wbGF0ZSA9ICdib3NzeS1kcm9wZG93bi5odG1sJztcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0Ly9Mb2dzIGFuIGVycm9yIGlmICdzcmMnIGhhcyBub3QgYmVlbiBkZWZpbmVkLlxyXG5cdFx0XHRcdGVsc2Uge1xyXG5cdFx0XHRcdFx0Y29uc29sZS5lcnJvcignRVJST1I6IFwiJHNjb3BlLmNvbmZpZy5zcmNcIiBoYXMgbm90IGJlZW4gc3BlY2lmaWVkIHdpdGhpbiB0aGUgXCJjb25maWdcIiBvYmplY3QuIFBsZWFzZSBwYXNzIGluIGEgdmFsaWQgcGF0aCB0byBhIEpTT04gZmlsZS4nKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH0sXHJcblx0XHRcdGNvbnRyb2xsZXJBczogJ2Ryb3Bkb3duJ1xyXG5cdFx0fTtcclxuXHR9KTtcclxuIiwiYW5ndWxhci5tb2R1bGUoJ2Jvc3N5LmZvcm0nLCBbXSlcclxuICAgIC5ydW4oZnVuY3Rpb24oJHRlbXBsYXRlQ2FjaGUpe1xyXG4gICAgICAgICR0ZW1wbGF0ZUNhY2hlLnB1dCgnYm9zc3ktaW5wdXQuaHRtbCcsICd0ZW1wbGF0ZXMvYm9zc3ktaW5wdXQuaHRtbCcpO1xyXG4gICAgfSlcclxuICAgIC5kaXJlY3RpdmUoJ2Jvc3N5Rm9ybScsWyckY29tcGlsZScsJyRodHRwJywnJHNjaGVtYScsJyRkYXRhJywgZnVuY3Rpb24gKCRjb21waWxlLCAkaHR0cCwgJHNjaGVtYSwgJGRhdGEpIHtcclxuICAgICAgICB2YXIgX3NjaGVtYSxcclxuICAgICAgICAgICAgX2RhdGEsXHJcbiAgICAgICAgICAgIF9vcHRpb25zID0ge1xyXG4gICAgICAgICAgICAgICAgc2hvd0xhYmVsczogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIGhlYWRlcjogJ1RoaXMgaXMgaGVhZGVyJyxcclxuICAgICAgICAgICAgICAgIGZvb3RlcjogJ1RoaXMgaXMgZm9vdGVyJyxcclxuICAgICAgICAgICAgICAgIHRoZW1lOiAnZ3JlZW4nLFxyXG4gICAgICAgICAgICAgICAgYnV0dG9uOiAnU2F2ZSdcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgX2l0ZW1UZW1wbGF0ZSA9IHtcclxuICAgICAgICAgICAgICAgIG51bWJlcjogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAnPGlucHV0IHR5cGU9XCJudW1iZXJcIi8+JztcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICB0ZXh0OiBmdW5jdGlvbiAob2JqLCBrZXksIGlzUmVxdWlyZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gJzxib3NzeS1pbnB1dCB0aXRsZT1cIlxcJycrb2JqLnRpdGxlKydcXCdcIiB0eXBlPVwiXFwnJysgb2JqLmlucHV0VHlwZSArJ1xcJ1wiIHZhbHVlPVwiXFwnJytfZGF0YS5hZGRyZXNzW2tleV0rJ1xcJ1wiJyArICggaXNSZXF1aXJlZCA/ICcgcmVxdWlyZWQnIDogJycgKSArICc+PC9ib3NzeS1pbnB1dD4nO1xyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIHRleHRBcmVhOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuICc8dGV4dGFyZWE+PC90ZXh0YXJlYT4nO1xyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIGNoZWNrYm94OiBmdW5jdGlvbihvYmope1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAnPGRpdiBjbGFzcz1cImNoZWNrYm94XCI+PGxhYmVsPjxpbnB1dCB0eXBlPVwiY2hlY2tib3hcIj4nK29iai50aXRsZSsnPC9sYWJlbD48L2Rpdj4nO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICBmdW5jdGlvbiBzZXREYXRhKGRhdGEpIHtcclxuICAgICAgICAgICAgdmFyIHJlc3VsdCA9ICRkYXRhLmdldERhdGEoZGF0YSk7XHJcbiAgICAgICAgICAgIGlmKCBhbmd1bGFyLmlzRnVuY3Rpb24oIHJlc3VsdC50aGVuICkgJiYgYW5ndWxhci5pc0Z1bmN0aW9uKCByZXN1bHQuY2F0Y2ggKSAmJiBhbmd1bGFyLmlzRnVuY3Rpb24oIHJlc3VsdC5maW5hbGx5ICkgKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgX2RhdGEgPSByZXN1bHQ7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmdW5jdGlvbiBzZXRTY2hlbWEoc2NoZW1hKSB7XHJcbiAgICAgICAgICAgIF9zY2hlbWEgPSAkc2NoZW1hLmdldFNjaGVtYShzY2hlbWEpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZnVuY3Rpb24gYnVpbGRUZW1wbGF0ZShzY2hlbWFQYXJ0LCBwYXJlbnRLZXksIHJlcXVpcmVkKSB7XHJcbiAgICAgICAgICAgIHZhciB0ZW1wbGF0ZSA9ICcnLFxyXG4gICAgICAgICAgICAgICAgZnVsbEtleSA9ICcnO1xyXG4gICAgICAgICAgICBhbmd1bGFyLmZvckVhY2goc2NoZW1hUGFydCwgZnVuY3Rpb24odmFsdWUsIGtleSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKHZhbHVlLnR5cGUpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhmdWxsS2V5ICsgJyBpcyAnKyB2YWx1ZS50eXBlKTtcclxuICAgICAgICAgICAgICAgICAgICBzd2l0Y2ggKHZhbHVlLnR5cGUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAnb2JqZWN0JzpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciByZXF1aXJlZExpc3QgPSB0eXBlb2YoIHZhbHVlLnJlcXVpcmVkICkgIT09ICd1bmRlZmluZWQnID8gdmFsdWUucmVxdWlyZWQgOiBudWxsO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGUgKz0gYnVpbGRUZW1wbGF0ZSh2YWx1ZS5wcm9wZXJ0aWVzLCBmdWxsS2V5LCByZXF1aXJlZExpc3QgKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlICdhcnJheSc6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0ZW1wbGF0ZSArPSBidWlsZFRlbXBsYXRlKHZhbHVlLml0ZW1zLnByb3BlcnRpZXMsIGZ1bGxLZXkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ251bWJlcicgfHwgJ2ludGVnZXInOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGUgKz0gX2l0ZW1UZW1wbGF0ZS5udW1iZXIodmFsdWUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ3N0cmluZyc6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgaXNSZXF1aXJlZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYoIHJlcXVpcmVkICYmIHJlcXVpcmVkLmluZGV4T2Yoa2V5KSAhPT0gLTEgKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaXNSZXF1aXJlZCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0ZW1wbGF0ZSArPSBfaXRlbVRlbXBsYXRlLnRleHQodmFsdWUsIGtleSwgaXNSZXF1aXJlZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAnYm9vbGVhbic6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0ZW1wbGF0ZSArPSBfaXRlbVRlbXBsYXRlLmNoZWNrYm94KHZhbHVlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSwgdGhpcyk7XHJcbiAgICAgICAgICAgIHJldHVybiB0ZW1wbGF0ZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIHJlc3RyaWN0OiAnRScsXHJcbiAgICAgICAgICAgIHJlcGxhY2U6IHRydWUsXHJcbiAgICAgICAgICAgIHRlbXBsYXRlOiAnJyxcclxuICAgICAgICAgICAgc2NvcGU6IHtcclxuICAgICAgICAgICAgICAgIGNvbmZpZzonPScsIC8vQ3JlYXRlIHNjb3BlIGlzb2xhdGlvbiB3aXRoIGJpLWRpcmVjdGlvbmFsIGJpbmRpbmcsXHJcbiAgICAgICAgICAgICAgICB0aXRsZTogJz0nXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGxpbms6IGZ1bmN0aW9uIChzY29wZSwgZWxlbWVudCwgYXR0cmlidXRlcykge1xyXG4gICAgICAgICAgICAgICAgc2NvcGUuY29uZmlnLm9wdGlvbnMgPSBhbmd1bGFyLmV4dGVuZChfb3B0aW9ucywgc2NvcGUuY29uZmlnLm9wdGlvbnMpO1xyXG5cclxuICAgICAgICAgICAgICAgIHZhciBwcm9taXNlID0gc2V0RGF0YShzY29wZS5jb25maWcuZGF0YSk7XHJcbiAgICAgICAgICAgICAgICBzZXRTY2hlbWEoc2NvcGUuY29uZmlnLnNjaGVtYSk7XHJcbiAgICAgICAgICAgICAgICBpZiggcHJvbWlzZSApIHtcclxuICAgICAgICAgICAgICAgICAgICAvL3RvZG86IHNldCBkaXJlY3RpdmUgdG8gbG9hZGluZyBzdGF0ZVxyXG4gICAgICAgICAgICAgICAgICAgIHByb21pc2UudGhlbihcclxuICAgICAgICAgICAgICAgICAgICAgICAgZnVuY3Rpb24ocmVzdWx0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL3RvZG86IHNldCBkaXJlY3RpdmUgdG8gbG9hZGVkIHN0YXRlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBfZGF0YSA9IHJlc3VsdDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsZW1lbnQuaHRtbChcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnPGZvcm0gbm92YWxpZGF0ZSBjbGFzcz1cInt7Y29uZmlnLm9wdGlvbnMudGhlbWV9fVwiPicrXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJzxkaXYgY2xhc3M9XCJiYW5uZXIgcGFnZS1oZWFkZXJcIj48aDM+e3tjb25maWcub3B0aW9ucy5oZWFkZXJ9fTwvaDM+PC9kaXY+JytcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnVpbGRUZW1wbGF0ZShfc2NoZW1hKSArXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICc8YnV0dG9uIG5nLWlmPVwiY29uZmlnLm9wdGlvbnMuYnV0dG9uXCI+e3tjb25maWcub3B0aW9ucy5idXR0b259fTwvYnV0dG9uPicgK1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICc8ZGl2IGNsYXNzPVwicGFnZS1mb290ZXJcIj48aDM+e3tjb25maWcub3B0aW9ucy5mb290ZXJ9fTwvaDM+PC9kaXY+JytcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnPC9mb3JtPidcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkY29tcGlsZShlbGVtZW50LmNvbnRlbnRzKCkpKHNjb3BlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgZnVuY3Rpb24ocmVhc29uKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL3RvZG86IHNldCBkaXJlY3RpdmUgdG8gZXJyb3Igc3RhdGVcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgZWxlbWVudC5odG1sKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAnPGZvcm0gbm92YWxpZGF0ZSBjbGFzcz1cInt7Y29uZmlnLm9wdGlvbnMudGhlbWV9fVwiPkxPQURJTkcuLi48L2Zvcm0+J1xyXG4gICAgICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgICAgICAgICAgJGNvbXBpbGUoZWxlbWVudC5jb250ZW50cygpKShzY29wZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBlbGVtZW50Lmh0bWwoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICc8Zm9ybSBub3ZhbGlkYXRlIGNsYXNzPVwie3tjb25maWcub3B0aW9ucy50aGVtZX19XCI+JytcclxuICAgICAgICAgICAgICAgICAgICAgICAgJzxkaXYgY2xhc3M9XCJiYW5uZXIgcGFnZS1oZWFkZXJcIj48aDM+e3tjb25maWcub3B0aW9ucy5oZWFkZXJ9fTwvaDM+PC9kaXY+JytcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJ1aWxkVGVtcGxhdGUoX3NjaGVtYSkgK1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJzxidXR0b24gbmctaWY9XCJjb25maWcub3B0aW9ucy5idXR0b25cIj57e2NvbmZpZy5vcHRpb25zLmJ1dHRvbn19PC9idXR0b24+JyArXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICc8ZGl2IGNsYXNzPVwicGFnZS1mb290ZXJcIj48aDM+e3tjb25maWcub3B0aW9ucy5mb290ZXJ9fTwvaDM+PC9kaXY+JytcclxuICAgICAgICAgICAgICAgICAgICAgICAgJzwvZm9ybT4nXHJcbiAgICAgICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgICAgICAgICAkY29tcGlsZShlbGVtZW50LmNvbnRlbnRzKCkpKHNjb3BlKTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICB9XSlcclxuOyIsImFuZ3VsYXIubW9kdWxlKCdib3NzeS5pbnB1dCcsIFtdKVxyXG4gICAgLnJ1bihmdW5jdGlvbigkdGVtcGxhdGVDYWNoZSl7XHJcbiAgICAgICAgJHRlbXBsYXRlQ2FjaGUucHV0KCdib3NzeS1pbnB1dC5odG1sJywgJzxkaXYgY2xhc3M9XCJmb3JtLWdyb3VwIGJvc3N5LWlucHV0XCI+PGxhYmVsIGZvcj1cIlwiPnt7dGl0bGV9fTwvbGFiZWw+PGlucHV0IHR5cGU9XCJ7e3R5cGV9fVwiIGNsYXNzPVwiZm9ybS1jb250cm9sXCIgcGxhY2Vob2xkZXI9XCJcIiB2YWx1ZT1cInt7dmFsdWV9fVwiLz48c3Bhbj48L3NwYW4+PC9kaXY+Jyk7XHJcbiAgICB9KVxyXG4gICAgLmRpcmVjdGl2ZSgnYm9zc3lJbnB1dCcsWyckY29tcGlsZScsJyRodHRwJywnJHNjaGVtYScsJyRkYXRhJywnJHRlbXBsYXRlQ2FjaGUnLCBmdW5jdGlvbiAoJGNvbXBpbGUsICRodHRwLCAkc2NoZW1hLCAkZGF0YSwgJHRlbXBsYXRlQ2FjaGUpIHtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICByZXN0cmljdDogJ0UnLFxyXG4gICAgICAgICAgICByZXBsYWNlOiB0cnVlLFxyXG4gICAgICAgICAgICBzY29wZToge1xyXG4gICAgICAgICAgICAgICAgdGl0bGU6ICc9JyxcclxuICAgICAgICAgICAgICAgIHZhbHVlOiAnPScsXHJcbiAgICAgICAgICAgICAgICB0eXBlOiAnPScsXHJcbiAgICAgICAgICAgICAgICByZXF1aXJlZDogJz0nXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHRlbXBsYXRlOiAkdGVtcGxhdGVDYWNoZS5nZXQoJ2Jvc3N5LWlucHV0Lmh0bWwnKVxyXG4gICAgICAgIH07XHJcbiAgICB9XSk7IiwidmFyIGFwcCA9IGFuZ3VsYXIubW9kdWxlKCdib3NzeS5udW1lcmljdGV4dGJveCcsW10pO1xyXG5cclxuXHJcbmFwcC5jb250cm9sbGVyKCdib3NzeW51bWVyaWNDdHJsJyxmdW5jdGlvbigkc2NvcGUpe1xyXG4gICAgdmFyIHN5bWJvbHM9WyckJywnJScsJ2xicyddO1xyXG4gICAgdmFyIGluaXRpYWxWYWx1ZT0wO1xyXG5cclxuXHJcbiAgICB2YXIga2V5ID0ge1xyXG4gICAgICAgIHByaWNlOjAsXHJcbiAgICAgICAgd2VpZ2h0OjAsXHJcbiAgICAgICAgZGlzY291bnQ6MCxcclxuICAgICAgICBzdG9jazowXHJcbiAgICB9O1xyXG5cclxuXHJcbiAgICAkc2NvcGUucCA9IHN5bWJvbHNbMF0gKyBpbml0aWFsVmFsdWU7XHJcbiAgICAkc2NvcGUudyA9IGluaXRpYWxWYWx1ZSArIHN5bWJvbHNbMl07XHJcbiAgICAkc2NvcGUuZCA9IGluaXRpYWxWYWx1ZSArIHN5bWJvbHNbMV07XHJcbiAgICAkc2NvcGUucyA9IGluaXRpYWxWYWx1ZTtcclxuXHJcbiAgICAkc2NvcGUuaW5jcmVtZW50ID0gZnVuY3Rpb24oYSl7XHJcbiAgICAgICAgc3dpdGNoKGEpe1xyXG4gICAgICAgICAgICBjYXNlICdwcmljZSc6XHJcbiAgICAgICAgICAgICAgICBrZXkucHJpY2UrKztcclxuICAgICAgICAgICAgICAgICRzY29wZS5wID0gc3ltYm9sc1swXSArIGtleS5wcmljZTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlICd3ZWlnaHQnOlxyXG4gICAgICAgICAgICAgICAga2V5LndlaWdodCsrO1xyXG4gICAgICAgICAgICAgICAgJHNjb3BlLnc9a2V5LndlaWdodCArIHN5bWJvbHNbMl07XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAnZGlzY291bnQnOlxyXG4gICAgICAgICAgICAgICAga2V5LmRpc2NvdW50Kys7XHJcbiAgICAgICAgICAgICAgICAkc2NvcGUuZCA9IGtleS5kaXNjb3VudCArIHN5bWJvbHNbMV07XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAnc3RvY2snOlxyXG4gICAgICAgICAgICAgICAga2V5LnN0b2NrKys7XHJcbiAgICAgICAgICAgICAgICAkc2NvcGUucz1rZXkuc3RvY2s7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcbiAgICAkc2NvcGUuZGVjcmVtZW50ID0gZnVuY3Rpb24oYSl7XHJcblxyXG4gICAgICAgIHN3aXRjaChhKXtcclxuICAgICAgICAgICAgY2FzZSAncHJpY2UnOlxyXG4gICAgICAgICAgICAgICAgaWYoa2V5LnByaWNlPjApXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAga2V5LnByaWNlLS07XHJcbiAgICAgICAgICAgICAgICAgICAgJHNjb3BlLnAgPSBzeW1ib2xzWzBdICsga2V5LnByaWNlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgJ3dlaWdodCc6XHJcbiAgICAgICAgICAgICAgICBpZihrZXkud2VpZ2h0PjApe1xyXG4gICAgICAgICAgICAgICAgICAgIGtleS53ZWlnaHQtLTtcclxuICAgICAgICAgICAgICAgICAgICAkc2NvcGUudz1rZXkud2VpZ2h0ICsgc3ltYm9sc1syXTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlICdkaXNjb3VudCc6XHJcbiAgICAgICAgICAgICAgICBpZihrZXkuZGlzY291bnQ+MClcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBrZXkuZGlzY291bnQtLTtcclxuICAgICAgICAgICAgICAgICAgICAkc2NvcGUuZCA9IGtleS5kaXNjb3VudCsgc3ltYm9sc1sxXTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlICdzdG9jayc6XHJcbiAgICAgICAgICAgICAgICBpZihrZXkuc3RvY2s+MCl7XHJcbiAgICAgICAgICAgICAgICAgICAga2V5LnN0b2NrLS07XHJcbiAgICAgICAgICAgICAgICAgICAgJHNjb3BlLnM9a2V5LnN0b2NrO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcblxyXG4gICAgfTtcclxuXHJcbn0pO1xyXG5cclxuXHJcbmFwcC5kaXJlY3RpdmUoJ2Jvc3N5bnVtZXJpY3RleHRib3gnLGZ1bmN0aW9uKCl7XHJcbiAgICByZXR1cm57XHJcbiAgICAgICAgY29udHJvbGxlcjonYm9zc3ludW1lcmljQ3RybCcsXHJcbiAgICAgICAgcmVzdHJpY3Q6J0UnLFxyXG4gICAgICAgIHRyYW5zY2x1ZGU6dHJ1ZSxcclxuICAgICAgICB0ZW1wbGF0ZVVybDonYm9zc3kubnVtZXJpY3RleHRib3guaHRtbCdcclxuXHJcbiAgICB9O1xyXG59KTsiLCJhbmd1bGFyLm1vZHVsZSgnYm9zc3kuc2NoZW1hJywgW10pXHJcbiAgICAuZmFjdG9yeSgnJHNjaGVtYScsIFsnJHEnLCAnJGh0dHAnLCBmdW5jdGlvbiAoJHEsICRodHRwKSB7XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIF9nZXRTY2hlbWEgKHNjaGVtYSkge1xyXG4gICAgICAgICAgICBpZiAoYW5ndWxhci5pc1N0cmluZyhzY2hlbWEpKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gX2dldFJlbW90ZVNjaGVtYShzY2hlbWEpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgaWYgKGFuZ3VsYXIuaXNPYmplY3Qoc2NoZW1hKSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHNjaGVtYTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIC8vVE9ETzogcmVwbGFjZSBlcnJvciBtZXNzYWdlIHdpdGggb25saW5lIGRvYyBsaW5rIGxpa2UgbmcgZXJyb3JzXHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKCdkaXJlY3RpdmUuYm9zc3lGb3JtOiBubyBzY2hlbWEgdXJsIG9yIG9iamVjdCBnaXZlbicpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmdW5jdGlvbiBfZ2V0UmVtb3RlU2NoZW1hKHNjaGVtYSkge1xyXG4gICAgICAgICAgICB2YXIgZGVmZXJyZWQgPSAkcS5kZWZlcigpO1xyXG5cclxuICAgICAgICAgICAgJGh0dHAuZ2V0KCBzY2hlbWEgKVxyXG4gICAgICAgICAgICAgICAgLnN1Y2Nlc3MoIGZ1bmN0aW9uKCBkYXRhICkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKCBhbmd1bGFyLmlzT2JqZWN0KCBkYXRhICkgKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlc29sdmUoZGF0YSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL1RPRE86IHJlcGxhY2UgZXJyb3IgbWVzc2FnZSB3aXRoIG9ubGluZSBkb2MgbGluayBsaWtlIG5nIGVycm9yc1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZWplY3QoJ2RpcmVjdGl2ZS5ib3NzeUZvcm06IEdFVCByZXF1ZXN0IHRvIHVybCBkaWQgbm90IHByb2R1Y2Ugc2NoZW1hIG9iamVjdCcpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuZXJyb3IoIGZ1bmN0aW9uKGRhdGEsIHN0YXR1cykge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vVE9ETzogcmVwbGFjZSBlcnJvciBtZXNzYWdlIHdpdGggb25saW5lIGRvYyBsaW5rIGxpa2UgbmcgZXJyb3JzXHJcbiAgICAgICAgICAgICAgICAgICAgZGVmZXJyZWQucmVqZWN0KCdkaXJlY3RpdmUuYm9zc3lGb3JtOiBHRVQgcmVxdWVzdCB0byB1cmwgXCInICsgc2NoZW1hICsgJ1wiIGZhaWxlZCB3aXRoIHN0YXR1cyBcIicgKyBzdGF0dXMgKyAnXCInKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuIGRlZmVycmVkLnByb21pc2U7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBnZXRTY2hlbWE6IF9nZXRTY2hlbWFcclxuICAgICAgICB9O1xyXG4gICAgfV0pXHJcbjtcclxuIiwiLypUaGlzIGlzIGEgc2xpZGVyIHdpZGdldCBjcmVhdGVkIGluIGFuZ3VsYXIgYXMgcGFydCBvZiB0aGUgQm9zc3lVSSB3aWRnZXRzLlxyXG4gKiBUaGUgZWFzaWVzdCB3YXkgdG8gdXNlIHRoZSBzbGlkZXIgaXMgdG8gaW5jbHVkZSBpdCBpbiB5b3VyIEhUTUwgYW5kIHRoZW5cclxuICogY3JlYXRlIGEgdGFnIDxib3NzeS1zbGlkZXI+PC9ib3NzeS1zbGlkZXI+LiBUaGlzIHdpZGdldCB0YWtlIGluIHNldmVyYWxcclxuICogd2F5cyB0byBjdXN0b21pemUuIExpc3Qgb2YgY3VzdG9taXphdGlvbnMgYXZhaWxhYmxlLlxyXG4gKiBtYXggICAgICAgICAgICAgIGRlZmF1bHRzIHRvIDEwMFxyXG4gKiBtaW4gICAgICAgICAgICAgIGRlZmF1bHRzIHRvIDFcclxuICogd2lkdGggICAgICAgICAgICBkZWZhdWx0cyB0byAyNTBweFxyXG4gKiBiYXJmaWxsY29sb3IgICAgIGRlZmF1bHRzIHRvIGRhcmtibHVlOiBtdXN0IGJlIHBhc3NlZCBhcyBoZXhhZGVjaW1hbCBjb2xvciBmb3JtYXQgIzAwMDAwMFxyXG4gKiBiYXJlbXB0eWNvbG9yICAgIGRlZmF1bHRzIHRvIGxpZ2h0Z3JleVxyXG4gKiBidXR0b25jb2xvciAgICAgIGRlZmF1bHRzIHRvIHJlZFxyXG4gKiBzdGVwICAgICAgICAgICAgIGRlZmF1bHRzIHRvIHJlZFxyXG4gKiBvcmllbnRhdGlvbiAgICAgIGRlZmF1bHRzIHRvIGhvcml6b250YWxcclxuICogZXguXHJcbiAqIDxib3NzeS1zbGlkZXIgbWF4PVwiMjBcIiBtaW49XCItNVwiIG9yaWVudGF0aW9uPVwidmVydGljYWxcIj48L2Jvc3N5LXNsaWRlcj4qL1xyXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cclxuXHJcbnZhciBhcHAgPSBhbmd1bGFyLm1vZHVsZSgnYm9zc3kuc2xpZGVyJywgW10pO1xyXG5hcHAuY29udHJvbGxlcignU2xpZGVyQ29udHJvbGxlcicsIFsnJHNjb3BlJywgZnVuY3Rpb24gKCRzY29wZSkge1xyXG4gICAgLy90aGVzZSBhcmUgb3VyIGRlZmF1bHQgdmFsdWVzIGFuZCBhcmUgdGhlIHZhcmlhYmxlcyB0aGF0IGNhbiBiZSBjaGFuZ2VkIGJ5IHVzZXIgb2Ygb3VyIHdpZGdldHNcclxuICAgICRzY29wZS5tYXggPSAxMDA7XHJcbiAgICAkc2NvcGUudmFsdWUgPSAwO1xyXG4gICAgJHNjb3BlLm1pbiA9IDE7XHJcbiAgICAkc2NvcGUuZmlsbFdpZHRoID0gMDtcclxuICAgICRzY29wZS5lbXB0V2lkdGggPSAwO1xyXG4gICAgJHNjb3BlLmJhcldpZHRoID0gMjUwO1xyXG4gICAgJHNjb3BlLmJhclBpZWNlID0gMDtcclxuICAgICRzY29wZS5zdGVwID0gMTtcclxuICAgICRzY29wZS5pc01vdXNlRG93biA9IDA7XHJcbiAgICAkc2NvcGUueUNvcmQgPSAwO1xyXG4gICAgJHNjb3BlLnhDb3JkID0gMDtcclxuICAgICRzY29wZS5uZXdYQ29yZCA9IDA7XHJcbiAgICAkc2NvcGUubmV3WUNvcmQgPSAwO1xyXG4gICAgJHNjb3BlLm9yaWVudGF0aW9uID0gZmFsc2U7XHJcbiAgICAkc2NvcGUuYnV0U2l6ZSA9IDE1O1xyXG4gICAgJHNjb3BlLmJhcmZpbGxjb2xvciA9ICcjMDAwMEZGJztcclxuICAgICRzY29wZS5iYXJlbXB0eWNvbG9yID0gJyNEM0QzRDMnO1xyXG4gICAgJHNjb3BlLmJ1dHRvbmNvbG9yID0gJyNGRjAwMDAnO1xyXG5cclxuXHJcbiAgICAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cclxuXHJcbiAgICAvKm1ha2VCYXIoKVxyXG4gICAgICogVGhpcyBjcmVhdGVzIHRoZSBpbml0aWFsIGdyYXBoaWMgb2YgdGhlIHNsaWRlciBhbmQgZW5zdXJlcyBpdCBpcyBpbiB0aGUgY29ycmVjdCBvcmRlclxyXG4gICAgICogQ0MgPSA0ICovXHJcbiAgICAkc2NvcGUubWFrZUJhciA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAvL2J1dHRvbiBzaG91bGQgc2hvdyB1cCBpbiB0aGUgbWlkZGxlIG5vdyBvciBjbG9zZSB0byBpZiB1bmV2ZW5cclxuICAgICAgICAkc2NvcGUudmFsdWUgPSBwYXJzZUludCgoJHNjb3BlLm1heCArICRzY29wZS5taW4pIC8gMik7XHJcbiAgICAgICAgZm9yICh2YXIgY3VycmVudCA9ICRzY29wZS5taW47IGN1cnJlbnQgPD0gJHNjb3BlLm1heDsgY3VycmVudCsrKSB7XHJcbiAgICAgICAgICAgIGlmIChjdXJyZW50IDwgJHNjb3BlLnZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICAkc2NvcGUuZmlsbFdpZHRoKys7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKGN1cnJlbnQgPiAkc2NvcGUudmFsdWUpIHtcclxuICAgICAgICAgICAgICAgICRzY29wZS5lbXB0V2lkdGgrKztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICAkc2NvcGUubmdNb2RlbCA9ICRzY29wZS52YWx1ZTtcclxuICAgICAgICByZXR1cm47XHJcbiAgICB9O1xyXG4gICAgLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXHJcblxyXG4gICAgLyppbmNyZWFzZSgpXHJcbiAgICAgKiBUaGlzIGNoZWNrcyBib3VuZHMgd2hlbiBhdHRlbXB0aW5nIHRvIGluY3JlYXNlIHRoZSB2YWx1ZSBhbmQgbW92ZXMgdGhlIHBvc2l0aW9uXHJcbiAgICAgKiBvZiB0aGUgc2xpZGVyIGJ1dHRvbiBhbmQgdXBkYXRlcyB0aGUgdmFsdWUuXHJcbiAgICAgKiBDQyA9IDIqL1xyXG4gICAgJHNjb3BlLmluY3JlYXNlID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGlmICgkc2NvcGUudmFsdWUgPCAkc2NvcGUubWF4KSB7XHJcbiAgICAgICAgICAgICRzY29wZS52YWx1ZSA9ICRzY29wZS52YWx1ZSArIDE7XHJcbiAgICAgICAgICAgICRzY29wZS5maWxsV2lkdGgrKztcclxuICAgICAgICAgICAgJHNjb3BlLmVtcHRXaWR0aC0tO1xyXG4gICAgICAgICAgICAkc2NvcGUubmdNb2RlbCA9ICRzY29wZS52YWx1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgfTtcclxuICAgIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xyXG5cclxuICAgIC8qYnV0SW5jcmVhc2UoKVxyXG4gICAgICogVGhpcyBmdW5jdGlvbiBhbGxvd3MgdGhlIHNsaWRlciB0byBpbmNyZWFzZSBpbiBpbmNyZW1lbnRzLlxyXG4gICAgICogQ0MgPSAxKi9cclxuICAgICRzY29wZS5idXRJbmNyZWFzZSA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB2YXIgaSA9IDA7XHJcbiAgICAgICAgZm9yIChpID0gMDsgaSA8ICRzY29wZS5zdGVwOyBpKyspIHtcclxuICAgICAgICAgICAgJHNjb3BlLmluY3JlYXNlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybjtcclxuICAgIH07XHJcbiAgICAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cclxuXHJcbiAgICAvKmRlY3JlYXNlKClcclxuICAgICAqIFRoaXMgY2hlY2tzIGJvdW5kcyB3aGVuIGF0dGVtcHRpbmcgdG8gZGVjcmVhc2UgdGhlIHZhbHVlIGFuZCBtb3ZlcyB0aGUgcG9zaXRpb25cclxuICAgICAqIG9mIHRoZSBzbGlkZXIgYnV0dG9uIGFuZCB1cGRhdGVzIHRoZSB2YWx1ZS5cclxuICAgICAqIENDID0gMiovXHJcbiAgICAkc2NvcGUuZGVjcmVhc2UgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgaWYgKCRzY29wZS52YWx1ZSA+ICRzY29wZS5taW4pIHtcclxuICAgICAgICAgICAgJHNjb3BlLnZhbHVlID0gJHNjb3BlLnZhbHVlIC0gMTtcclxuICAgICAgICAgICAgJHNjb3BlLmZpbGxXaWR0aC0tO1xyXG4gICAgICAgICAgICAkc2NvcGUuZW1wdFdpZHRoKys7XHJcbiAgICAgICAgICAgICRzY29wZS5uZ01vZGVsID0gJHNjb3BlLnZhbHVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm47XHJcbiAgICB9O1xyXG4gICAgLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXHJcblxyXG4gICAgLypidXREZWNyZWFzZSgpXHJcbiAgICAgKiBUaGlzIGZ1bmN0aW9uIGFsbG93cyB0aGUgc2xpZGVyIHRvIGRlY3JlYXNlIGluIGluY3JlbWVudHNcclxuICAgICAqIENDID0gMSovXHJcbiAgICAkc2NvcGUuYnV0RGVjcmVhc2UgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdmFyIGkgPSAwO1xyXG4gICAgICAgIGZvciAoaSA9IDA7IGkgPCAkc2NvcGUuc3RlcDsgaSsrKSB7XHJcbiAgICAgICAgICAgICRzY29wZS5kZWNyZWFzZSgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm47XHJcbiAgICB9O1xyXG4gICAgLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXHJcblxyXG4gICAgLyprZXlCaW5kKCRldmVudClcclxuICAgICAqIFRoaXMgZnVuY3Rpb24gaXMgdG8gYmluZCB0aGUgZGVjcmVhc2UgYW5kIGluY3JlYXNlIGZ1bmN0aW9uIHdpdGggdGhlIGFycm93IGtleXNcclxuICAgICAqIENDID0gNSovXHJcbiAgICAkc2NvcGUua2V5QmluZCA9IGZ1bmN0aW9uIChldikge1xyXG4gICAgICAgICRzY29wZS5wcmVzc2VkID0gZXYud2hpY2g7XHJcbiAgICAgICAgLy9JZiBhcnJvdyBrZXkoTGVmdCBvciBEb3duKSBpcyBwcmVzc2VkIHRoZW4gY2FsbCB0aGUgZGVjcmVhc2UoKSBmdW5jdGlvbiB0byBkZWNyZWFzZSB0aGUgdmFsdWUuXHJcbiAgICAgICAgaWYgKCRzY29wZS5wcmVzc2VkID09PSAzNyB8fCAkc2NvcGUucHJlc3NlZCA9PT0gNDApIHtcclxuICAgICAgICAgICAgJHNjb3BlLmJ1dERlY3JlYXNlKCk7XHJcblxyXG4gICAgICAgIH1cclxuICAgICAgICAvL3NhbWUgYXMgYWJvdmUgYnV0IGZvciBVcCBvciBSaWdodCB0byBpbmNyZWFzZSB0aGUgdmFsdWUuXHJcbiAgICAgICAgaWYgKCRzY29wZS5wcmVzc2VkID09PSAzOCB8fCAkc2NvcGUucHJlc3NlZCA9PT0gMzkpIHtcclxuICAgICAgICAgICAgJHNjb3BlLmJ1dEluY3JlYXNlKCk7XHJcblxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm47XHJcbiAgICB9O1xyXG4gICAgLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXHJcblxyXG4gICAgLypncmV5Q2xpY2soKVxyXG4gICAgICogVGhpcyBmdW5jdGlvbiBpcyB0byBhbGxvdyB0aGUgdmFsdWUgdG8gYmUgY2hhbmdlZCB3aGVuIGNsaWNraW5nIG9uIHRoZSBiYXJcclxuICAgICAqIENDID0gMSovXHJcbiAgICAkc2NvcGUuZ3JleUNsaWNrID0gZnVuY3Rpb24gKGV2ZW50KSB7XHJcbiAgICAgICAgLy9XaGVuIGNsaWNrIG9uIHRoZSBlbXB0eSBiYXIgdGhlIGJhciB3aWxsIGluY3JlYXNlXHJcbiAgICAgICAgJHNjb3BlLmJ1dEluY3JlYXNlKCk7XHJcblxyXG4gICAgICAgIHJldHVybjtcclxuICAgIH07XHJcbiAgICAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cclxuXHJcbiAgICAvKmJhckNsaWNrKClcclxuICAgICAqIFRoaXMgZnVuY3Rpb24gaXMgdG8gYWxsb3cgdGhlIHZhbHVlIHRvIGJlIGNoYW5nZWQgd2hlbiBjbGlja2luZyBvbiB0aGUgYmFyXHJcbiAgICAgKiBDQyA9IDEqL1xyXG4gICAgJHNjb3BlLmJhckNsaWNrID0gZnVuY3Rpb24gKGV2ZW50KSB7XHJcbiAgICAgICAgLy9XaGVuIGNsaWNrIG9uIHRoZSBGaWxsZWQgdXAgY29sb3Igc2lkZSB0aGUgYmFyIHdpbGwgZGVjcmVhc2VcclxuICAgICAgICAkc2NvcGUuYnV0RGVjcmVhc2UoKTtcclxuXHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgfTtcclxuICAgIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xyXG5cclxuICAgIC8qZHJhZygkZXZlbnQpXHJcbiAgICAgKiBUaGlzIGZ1bmN0aW9uIGFsbG93cyB0aGUgYnV0dG9uIHRvIGRyYWcgYnkgZmluZGluZyBpdHMgbG9jYXRpb24gdGhlbiBjaGVja3MgaXQgYWdhaW5zdCBpdHMgb3JpZ2luYWwgbG9jYXRpb25cclxuICAgICAqIGFuZCBpZiBpdCBpcyBkaXN0YW5jZSBpcyBncmVhdGVyIHRoYW4gdGhlIHNpemUgb2YgYSBiYXJwaWVjZSB1cGRhdGUgdGhlIGdyYXBoaWMgYW5kIHZhbHVlXHJcbiAgICAgKiBDQyA9IDkqL1xyXG4gICAgJHNjb3BlLmRyYWcgPSBmdW5jdGlvbiAoZXZlbnQpIHtcclxuXHJcbiAgICAgICAgLy9ncmFiIHRoZSBtb3VzZSBsb2NhdGlvblxyXG4gICAgICAgIHZhciB4ID0gZXZlbnQuY2xpZW50WDtcclxuICAgICAgICB2YXIgeSA9IGV2ZW50LmNsaWVudFk7XHJcbiAgICAgICAgLy9jaGVjayBpZiB0aGUgbW91c2UgaXMgYmVpbmcgaGVsZCBkb3duXHJcbiAgICAgICAgaWYgKCRzY29wZS5pc01vdXNlRG93bikge1xyXG4gICAgICAgICAgICAvL2NoZWNrIHRoZSBvcmllbnRhdGlvblxyXG4gICAgICAgICAgICBpZiAoJHNjb3BlLm9yaWVudGF0aW9uKSB7XHJcbiAgICAgICAgICAgICAgICAvL2lmIHRoaXMgaXMgdGhlIGZpcnN0IHRpbWUgeW91IGNsaWNrZWQgZG93biBnZXQgcmVhZHkgdG8gbW92ZSBpdFxyXG4gICAgICAgICAgICAgICAgaWYgKCRzY29wZS55Q29yZCA9PT0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICRzY29wZS55Q29yZCA9IHk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAvL2NoYW5nZSB0aGUgbG9jYXRpb24gb2YgdGhlIHNsaWRlciBhZnRlciBlbm91Z2ggbW92ZW1lbnRcclxuICAgICAgICAgICAgICAgICAgICAkc2NvcGUubmV3WUNvcmQgPSB5O1xyXG4gICAgICAgICAgICAgICAgICAgIHdoaWxlICgoJHNjb3BlLm5ld1lDb3JkIC0gJHNjb3BlLnlDb3JkKSA+ICRzY29wZS5iYXJQaWVjZSAvIDIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJHNjb3BlLnlDb3JkICs9ICRzY29wZS5iYXJQaWVjZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJHNjb3BlLmRlY3JlYXNlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIHdoaWxlICgoJHNjb3BlLm5ld1lDb3JkIC0gJHNjb3BlLnlDb3JkKSA8IC0oJHNjb3BlLmJhclBpZWNlIC8gMikpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJHNjb3BlLnlDb3JkIC09ICRzY29wZS5iYXJQaWVjZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJHNjb3BlLmluY3JlYXNlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgLy9pZiB0aGlzIGlzIHRoZSBmaXJzdCB0aW1lIHlvdSBjbGlja2VkIGRvd24gZ2V0IHJlYWR5IHRvIG1vdmUgaXRcclxuICAgICAgICAgICAgICAgIGlmICgkc2NvcGUueENvcmQgPT09IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAkc2NvcGUueENvcmQgPSB4O1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy9jaGFuZ2UgdGhlIGxvY2F0aW9uIG9mIHRoZSBzbGlkZXIgYWZ0ZXIgZW5vdWdoIG1vdmVtZW50XHJcbiAgICAgICAgICAgICAgICAgICAgJHNjb3BlLm5ld1hDb3JkID0geDtcclxuICAgICAgICAgICAgICAgICAgICB3aGlsZSAoKCRzY29wZS5uZXdYQ29yZCAtICRzY29wZS54Q29yZCkgPiAkc2NvcGUuYmFyUGllY2UgLyAyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICRzY29wZS54Q29yZCArPSAkc2NvcGUuYmFyUGllY2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICRzY29wZS5pbmNyZWFzZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB3aGlsZSAoKCRzY29wZS5uZXdYQ29yZCAtICRzY29wZS54Q29yZCkgPCAtKCRzY29wZS5iYXJQaWVjZSAvIDIpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICRzY29wZS54Q29yZCAtPSAkc2NvcGUuYmFyUGllY2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICRzY29wZS5kZWNyZWFzZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm47XHJcbiAgICB9O1xyXG4gICAgLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXHJcblxyXG4gICAgLypkb3duKClcclxuICAgICAqIFRoaXMgZnVuY3Rpb24gbG9ncyB3aGVuIHRoZSBtb3VzZSBpcyBkb3duXHJcbiAgICAgKiBDQyA9IDEqL1xyXG4gICAgJHNjb3BlLmRvd24gPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgJHNjb3BlLm5ld1hDb3JkID0gMDtcclxuICAgICAgICAkc2NvcGUueENvcmQgPSAwO1xyXG4gICAgICAgICRzY29wZS5uZXdZQ29yZCA9IDA7XHJcbiAgICAgICAgJHNjb3BlLnlDb3JkID0gMDtcclxuICAgICAgICAkc2NvcGUuaXNNb3VzZURvd24gPSAxO1xyXG4gICAgICAgIHJldHVybjtcclxuICAgIH07XHJcbiAgICAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cclxuXHJcbiAgICAvKmRvd24oKVxyXG4gICAgICogVGhpcyBmdW5jdGlvbiBsb2dzIHdoZW4gdGhlIG1vdXNlIGlzIHVwXHJcbiAgICAgKiBDQyA9IDEqL1xyXG4gICAgJHNjb3BlLnVwID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICRzY29wZS5uZXdYQ29yZCA9IDA7XHJcbiAgICAgICAgJHNjb3BlLnhDb3JkID0gMDtcclxuICAgICAgICAkc2NvcGUubmV3WUNvcmQgPSAwO1xyXG4gICAgICAgICRzY29wZS55Q29yZCA9IDA7XHJcbiAgICAgICAgJHNjb3BlLmlzTW91c2VEb3duID0gMDtcclxuICAgICAgICByZXR1cm47XHJcbiAgICB9O1xyXG4gICAgLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXHJcbn1dKTtcclxuYXBwLmRpcmVjdGl2ZSgnYm9zc3lTbGlkZXInLCBmdW5jdGlvbiAoJGNvbXBpbGUpIHtcclxuICAgIHZhciBteVRlbXBsYXRlO1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICAvL2FsbG93cyB0aGUgc2xpZGVyIHRvIGJlIGNyZWF0ZWQgYXMgYW5kIGF0dHJpYnV0ZSBvciBlbGVtZW50IDxib3NzeS1zbGlkZXI+PGJvc3N5LXNsaWRlcj5cclxuICAgICAgICByZXN0cmljdDogJ0FFJyxcclxuICAgICAgICBjb250cm9sbGVyOiAnU2xpZGVyQ29udHJvbGxlcicsXHJcbiAgICAgICAgc2NvcGU6IHtcclxuICAgICAgICAgICAgbmdNb2RlbDogJz0nXHJcbiAgICAgICAgfSxcclxuICAgICAgICAvKmxpbms6IGZ1bmN0aW9uOlxyXG4gICAgICAgICAqIFRoaXMgYWxsb3dzIHVzIHRvIHB1bGwgaW4gdGhlIHNldHRpbmdzIHRoZSBwcm9ncmFtbWVyIHdhbnRzIGZvciB0aGUgc2xpZGVyIGFuZCBzZXQgdGhpbmdzIGNvcnJlY3RseVxyXG4gICAgICAgICAqIGl0IGFsc28gaW5pdGlhbGl6ZXMgdGhlIHNsaWRlciBhbmQgYWRkcyB0aGUgY29ycmVjdCBvcmllbnRhdGlvbiB0ZW1wbGF0ZSB0byB0aGUgRE9NKi9cclxuICAgICAgICBsaW5rOiB7XHJcbiAgICAgICAgICAgIHByZTogZnVuY3Rpb24gKHNjb3BlLCBpRWxlbSwgaUF0dHIpIHtcclxuICAgICAgICAgICAgICAgIHZhciBwYXR0ZXJuID0gL14jWzAtOWEtZkEtRl17Nn0kLzsgLy9jdXJyZW50bHkgYWNjZXB0cyBsb3dlciBjYXNlIGEtZlxyXG5cclxuICAgICAgICAgICAgICAgIC8vY2hlY2tzIHRvIHNlZSBpZiB0aGVyZSBpcyBhIG1heCBhdHRyaWJ1dGVcclxuICAgICAgICAgICAgICAgIGlmIChpQXR0ci5tYXgpIHtcclxuICAgICAgICAgICAgICAgICAgICBzY29wZS5tYXggPSBwYXJzZUludChpQXR0ci5tYXgpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChpc05hTihzY29wZS5tYXgpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNjb3BlLm1heCA9IDEwO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIC8vY2hlY2tzIHRvIHNlZSBpZiB0aGVyZSBpcyBhIG1pbiBhdHRyaWJ1dGVcclxuICAgICAgICAgICAgICAgIGlmIChpQXR0ci5taW4pIHtcclxuICAgICAgICAgICAgICAgICAgICBzY29wZS5taW4gPSBwYXJzZUludChpQXR0ci5taW4pO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChpc05hTihzY29wZS5taW4pKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNjb3BlLm1pbiA9IDE7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgLy9jaGVja3MgZm9yIGJhciBjb2xvciBjdXN0b21pemF0aW9uXHJcbiAgICAgICAgICAgICAgICBpZiAoaUF0dHIuYmFyZmlsbGNvbG9yKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHBhdHRlcm4udGVzdChpQXR0ci5iYXJmaWxsY29sb3IpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNjb3BlLmJhcmZpbGxjb2xvciA9IGlBdHRyLmJhcmZpbGxjb2xvcjtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAvL2NoZWNrcyBmb3IgZW1wdHkgYmFyIGNvbG9yIGN1c3RvbWl6YXRpb25cclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoaUF0dHIuYmFyZW1wdHljb2xvcikge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChwYXR0ZXJuLnRlc3QoaUF0dHIuYmFyZW1wdHljb2xvcikpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2NvcGUuYmFyZW1wdHljb2xvciA9IGlBdHRyLmJhcmVtcHR5Y29sb3I7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoaUF0dHIuYnV0dG9uY29sb3IpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAocGF0dGVybi50ZXN0KGlBdHRyLmJ1dHRvbmNvbG9yKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzY29wZS5idXR0b25jb2xvciA9IGlBdHRyLmJ1dHRvbmNvbG9yO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIC8vZmluZCB0aGUgc3RlcCBzaXplIGZvciBidXR0b24gY2xpY2tzXHJcbiAgICAgICAgICAgICAgICBpZiAoaUF0dHIuc3RlcCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHNjb3BlLnN0ZXAgPSBpQXR0ci5zdGVwO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgLy9maW5kIHRoZSBwcmVmZXJyZWQgdG90YWwgd2lkdGggdG8gdXNlIGZvciB0aGUgc2xpZGVyXHJcbiAgICAgICAgICAgICAgICBpZiAoaUF0dHIud2lkdGgpIHtcclxuICAgICAgICAgICAgICAgICAgICBzY29wZS5iYXJXaWR0aCA9IGlBdHRyLndpZHRoO1xyXG4gICAgICAgICAgICAgICAgICAgIHNjb3BlLmJhclBpZWNlID0gKHNjb3BlLmJhcldpZHRoIC8gKHNjb3BlLm1heCAtIHNjb3BlLm1pbikpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2NvcGUuYmFyUGllY2UgPSAoc2NvcGUuYmFyV2lkdGggLyAoc2NvcGUubWF4IC0gc2NvcGUubWluKSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAvL2NoZWNrcyB0byBzZWUgaWYgdGhlcmUgaXMgYSBvcmllbnRhdGlvbiBhdHRyaWJ1dGUgaWYgdGhlcmUgaXMgc2V0IG91ciB0ZW1wbGF0ZSB0byB0aGUgdmVydGljYWwgdGVtcGxhdGVcclxuICAgICAgICAgICAgICAgIGlmIChpQXR0ci5vcmllbnRhdGlvbikge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICgndmVydGljYWwnID09PSBpQXR0ci5vcmllbnRhdGlvbikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzY29wZS5vcmllbnRhdGlvbiA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG15VGVtcGxhdGUgPSAnPGRpdiBvbnNlbGVjdHN0YXJ0PVwicmV0dXJuIGZhbHNlO1wiIG9uZHJhZ3N0YXJ0PVwicmV0dXJuIGZhbHNlO1wibmctbW91c2VsZWF2ZT1cInVwKClcIiBuZy1tb3VzZW1vdmU9XCJkcmFnKCRldmVudClcIj4nICtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJzxkaXYgbmctbW91c2Vtb3ZlPVwiZHJhZygkZXZlbnQpXCIgbmctbW91c2V1cD1cInVwKClcIiBuZy1jbGljaz1cImdyZXlDbGljaygpXCJzdHlsZT1cImN1cnNvcjpwb2ludGVyO21hcmdpbi1sZWZ0OjlweDt3aWR0aDo1cHg7aGVpZ2h0Ont7YmFyUGllY2UgKiBlbXB0V2lkdGh9fXB4O2JhY2tncm91bmQtY29sb3I6JyArIHNjb3BlLmJhcmVtcHR5Y29sb3IgKyAnO21hcmdpbi1ib3R0b206NHB4XCI+PC9kaXY+JyArXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICc8ZGl2IG5nLW1vdXNlbW92ZT1cImRyYWcoJGV2ZW50KVwiIG5nLW1vdXNlZG93bj1cImRvd24oKVwiIG5nLW1vdXNldXA9XCJ1cCgpXCIgb3JpZW50YXRpb249XCJ2ZXJ0aWNhbFwiIHN0eWxlPVwiY3Vyc29yOm5zLXJlc2l6ZTttYXJnaW4tdG9wOi00cHg7bWFyZ2luLWxlZnQ6NXB4O3dpZHRoOjE1cHg7aGVpZ2h0OjE1cHg7YmFja2dyb3VuZC1jb2xvcjonICsgc2NvcGUuYnV0dG9uY29sb3IgKyAnO2JvcmRlci1yYWRpdXM6NTAlO1wiPjwvZGl2PicgK1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAnPGRpdiBuZy1tb3VzZW1vdmU9XCJkcmFnKCRldmVudClcIiBuZy1tb3VzZXVwPVwidXAoKVwiIG5nLWNsaWNrPVwiYmFyQ2xpY2soKVwic3R5bGU9XCJjdXJzb3I6cG9pbnRlcjttYXJnaW4tbGVmdDo5cHg7d2lkdGg6NXB4O2hlaWdodDp7e2JhclBpZWNlICogZmlsbFdpZHRofX1weDtiYWNrZ3JvdW5kLWNvbG9yOicgKyBzY29wZS5iYXJmaWxsY29sb3IgKyAnO21hcmdpbi1ib3R0b206NHB4XCI+PC9kaXY+JyArXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICc8L2Rpdj4nO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbXlUZW1wbGF0ZSA9ICc8ZGl2IG9uc2VsZWN0c3RhcnQ9XCJyZXR1cm4gZmFsc2U7XCIgb25kcmFnc3RhcnQ9XCJyZXR1cm4gZmFsc2U7XCIgbmctbW91c2VsZWF2ZT1cInVwKClcIm5nLW1vdXNlbW92ZT1cImRyYWcoJGV2ZW50KVwiPicgK1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAnPGRpdiBuZy1tb3VzZW1vdmU9XCJkcmFnKCRldmVudClcIiBuZy1tb3VzZXVwPVwidXAoKVwiIG5nLWNsaWNrPVwiYmFyQ2xpY2soKVwic3R5bGU9XCJjdXJzb3I6cG9pbnRlcjtkaXNwbGF5OmlubGluZS1ibG9jazt3aWR0aDp7e2JhclBpZWNlICogZmlsbFdpZHRofX1weDtoZWlnaHQ6NXB4O2JhY2tncm91bmQtY29sb3I6JyArIHNjb3BlLmJhcmZpbGxjb2xvciArICc7bWFyZ2luLWJvdHRvbTo0cHhcIj48L2Rpdj4nICtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJzxkaXYgbmctbW91c2Vtb3ZlPVwiZHJhZygkZXZlbnQpXCIgbmctbW91c2Vkb3duPVwiZG93bigpXCIgbmctbW91c2V1cD1cInVwKClcIiBvcmllbnRhdGlvbj1cImhvcml6b250YWxcIiBzdHlsZT1cImN1cnNvcjpldy1yZXNpemU7ZGlzcGxheTppbmxpbmUtYmxvY2s7d2lkdGg6e3tidXRTaXplfX1weDtoZWlnaHQ6e3tidXRTaXplfX1weDtiYWNrZ3JvdW5kLWNvbG9yOicgKyBzY29wZS5idXR0b25jb2xvciArICc7Ym9yZGVyLXJhZGl1czo1MCU7XCI+PC9kaXY+JyArXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICc8ZGl2IG5nLW1vdXNlbW92ZT1cImRyYWcoJGV2ZW50KVwiIG5nLW1vdXNldXA9XCJ1cCgpXCIgbmctY2xpY2s9XCJncmV5Q2xpY2soKVwic3R5bGU9XCJjdXJzb3I6cG9pbnRlcjtkaXNwbGF5OmlubGluZS1ibG9jazt3aWR0aDp7e2JhclBpZWNlICogZW1wdFdpZHRofX1weDtoZWlnaHQ6NXB4O2JhY2tncm91bmQtY29sb3I6JyArIHNjb3BlLmJhcmVtcHR5Y29sb3IgKyAnO21hcmdpbi1ib3R0b206NHB4XCI+PC9kaXY+JyArXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICc8L2Rpdj4nO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vdGhpcyBidWlsZHMgb3VyIGhvcml6b250YWwgdGVtcGxhdGVcclxuICAgICAgICAgICAgICAgICAgICBteVRlbXBsYXRlID0gJzxkaXYgb25zZWxlY3RzdGFydD1cInJldHVybiBmYWxzZTtcIiBvbmRyYWdzdGFydD1cInJldHVybiBmYWxzZTtcIiBuZy1tb3VzZWxlYXZlPVwidXAoKVwibmctbW91c2Vtb3ZlPVwiZHJhZygkZXZlbnQpXCI+JyArXHJcbiAgICAgICAgICAgICAgICAgICAgJzxkaXYgbmctbW91c2Vtb3ZlPVwiZHJhZygkZXZlbnQpXCIgbmctbW91c2V1cD1cInVwKClcIiBuZy1jbGljaz1cImJhckNsaWNrKClcInN0eWxlPVwiY3Vyc29yOnBvaW50ZXI7ZGlzcGxheTppbmxpbmUtYmxvY2s7d2lkdGg6e3tiYXJQaWVjZSAqIGZpbGxXaWR0aH19cHg7aGVpZ2h0OjVweDtiYWNrZ3JvdW5kLWNvbG9yOicgKyBzY29wZS5iYXJmaWxsY29sb3IgKyAnO21hcmdpbi1ib3R0b206NHB4XCI+PC9kaXY+JyArXHJcbiAgICAgICAgICAgICAgICAgICAgJzxkaXYgbmctbW91c2Vtb3ZlPVwiZHJhZygkZXZlbnQpXCIgbmctbW91c2Vkb3duPVwiZG93bigpXCIgbmctbW91c2V1cD1cInVwKClcIiBvcmllbnRhdGlvbj1cImhvcml6b250YWxcIiBzdHlsZT1cImN1cnNvcjpldy1yZXNpemU7ZGlzcGxheTppbmxpbmUtYmxvY2s7d2lkdGg6e3tidXRTaXplfX1weDtoZWlnaHQ6e3tidXRTaXplfX1weDtiYWNrZ3JvdW5kLWNvbG9yOicgKyBzY29wZS5idXR0b25jb2xvciArICc7Ym9yZGVyLXJhZGl1czo1MCU7XCI+PC9kaXY+JyArXHJcbiAgICAgICAgICAgICAgICAgICAgJzxkaXYgbmctbW91c2Vtb3ZlPVwiZHJhZygkZXZlbnQpXCIgbmctbW91c2V1cD1cInVwKClcIiBuZy1jbGljaz1cImdyZXlDbGljaygpXCJzdHlsZT1cImN1cnNvcjpwb2ludGVyO2Rpc3BsYXk6aW5saW5lLWJsb2NrO3dpZHRoOnt7YmFyUGllY2UgKiBlbXB0V2lkdGh9fXB4O2hlaWdodDo1cHg7YmFja2dyb3VuZC1jb2xvcjonICsgc2NvcGUuYmFyZW1wdHljb2xvciArICc7bWFyZ2luLWJvdHRvbTo0cHhcIj48L2Rpdj4nICtcclxuICAgICAgICAgICAgICAgICAgICAnPC9kaXY+JztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIC8vV2Ugc2hvdyBvdXIgdGVtcGxhdGUgYW5kIHRoZW4gY29tcGlsZSBpdCBzbyB0aGUgRE9NIGtub3dzIGFib3V0IG91ciBuZyBmdW5jdGlvbnNcclxuICAgICAgICAgICAgICAgIGlFbGVtLmh0bWwobXlUZW1wbGF0ZSk7XHJcbiAgICAgICAgICAgICAgICAkY29tcGlsZShpRWxlbS5jb250ZW50cygpKShzY29wZSk7XHJcbiAgICAgICAgICAgICAgICAvL2NyZWF0ZSB0aGUgaW5pdGlhbCBiYXJcclxuICAgICAgICAgICAgICAgIHNjb3BlLm1ha2VCYXIoKTtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH07XHJcbn0pO1xyXG5cclxuIiwiYW5ndWxhci5tb2R1bGUoJ2Jvc3N5LnRvb2x0aXAnLCBbXSlcclxuICAgIC5kaXJlY3RpdmUoJ2Jvc3N5VG9vbHRpcCcsIGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICAvLyBQcml2YXRlIG1lbWJlciBhcnJheSBjb250YWluaW5nIGFsbCBrbm93biBwb3NpdGlvbnNcclxuICAgICAgICB2YXIgX3BvcyA9IFsnbicsJ25lJywnZScsJ3NlJywncycsJ3N3JywndycsJ253J107XHJcblxyXG4gICAgICAgIC8vIE1vdmUgdGhlIHRpcCB0byBhIGNlcnRhaW4gcG9zaXRpb25cclxuICAgICAgICBmdW5jdGlvbiBfbW92ZVRpcCgkcGFyZW50LCAkdGlwLCBjdXJQb3MpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZihjdXJQb3MgPT09ICduJylcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgJHRpcC5zdHlsZS5sZWZ0ID0gJHBhcmVudC5vZmZzZXRMZWZ0ICsgKCRwYXJlbnQub2Zmc2V0V2lkdGggLyAyKSAtICgkdGlwLm9mZnNldFdpZHRoIC8gMikgKyAncHgnO1xyXG4gICAgICAgICAgICAgICAgJHRpcC5zdHlsZS50b3AgPSAkcGFyZW50Lm9mZnNldFRvcCAtICR0aXAub2Zmc2V0SGVpZ2h0ICsgJ3B4JztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIGlmKGN1clBvcyA9PT0gJ25lJylcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgJHRpcC5zdHlsZS5sZWZ0ID0gJHBhcmVudC5vZmZzZXRMZWZ0ICsgJHBhcmVudC5vZmZzZXRXaWR0aCArICdweCc7XHJcbiAgICAgICAgICAgICAgICAkdGlwLnN0eWxlLnRvcCA9ICRwYXJlbnQub2Zmc2V0VG9wIC0gJHRpcC5vZmZzZXRIZWlnaHQgKyAncHgnO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgaWYoY3VyUG9zID09PSAnZScpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICR0aXAuc3R5bGUubGVmdCA9ICRwYXJlbnQub2Zmc2V0TGVmdCArICRwYXJlbnQub2Zmc2V0V2lkdGggKyAncHgnO1xyXG4gICAgICAgICAgICAgICAgJHRpcC5zdHlsZS50b3AgPSAkcGFyZW50Lm9mZnNldFRvcCArICgkcGFyZW50Lm9mZnNldEhlaWdodCAvIDIpIC0gKCR0aXAub2Zmc2V0SGVpZ2h0IC8gMikgKyAncHgnO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgaWYoY3VyUG9zID09PSAnc2UnKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAkdGlwLnN0eWxlLmxlZnQgPSAkcGFyZW50Lm9mZnNldExlZnQgKyAkcGFyZW50Lm9mZnNldFdpZHRoICsgJ3B4JztcclxuICAgICAgICAgICAgICAgICR0aXAuc3R5bGUudG9wID0gJHBhcmVudC5vZmZzZXRUb3AgKyAkcGFyZW50Lm9mZnNldEhlaWdodCArICdweCc7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSBpZihjdXJQb3MgPT09ICdzJylcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgJHRpcC5zdHlsZS5sZWZ0ID0gJHBhcmVudC5vZmZzZXRMZWZ0ICsgKCRwYXJlbnQub2Zmc2V0V2lkdGggLyAyKSAtICgkdGlwLm9mZnNldFdpZHRoIC8gMikgKyAncHgnO1xyXG4gICAgICAgICAgICAgICAgJHRpcC5zdHlsZS50b3AgPSAkcGFyZW50Lm9mZnNldFRvcCArICRwYXJlbnQub2Zmc2V0SGVpZ2h0ICsgJ3B4JztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIGlmKGN1clBvcyA9PT0gJ3N3JylcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgJHRpcC5zdHlsZS5sZWZ0ID0gJHBhcmVudC5vZmZzZXRMZWZ0IC0gJHRpcC5vZmZzZXRXaWR0aCArICdweCc7XHJcbiAgICAgICAgICAgICAgICAkdGlwLnN0eWxlLnRvcCA9ICRwYXJlbnQub2Zmc2V0VG9wICsgJHBhcmVudC5vZmZzZXRIZWlnaHQgKyAncHgnO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgaWYoY3VyUG9zID09PSAndycpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICR0aXAuc3R5bGUubGVmdCA9ICRwYXJlbnQub2Zmc2V0TGVmdCAtICR0aXAub2Zmc2V0V2lkdGggKyAncHgnO1xyXG4gICAgICAgICAgICAgICAgJHRpcC5zdHlsZS50b3AgPSAkcGFyZW50Lm9mZnNldFRvcCArICgkcGFyZW50Lm9mZnNldEhlaWdodCAvIDIpIC0gKCR0aXAub2Zmc2V0SGVpZ2h0IC8gMikgKyAncHgnO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgJHRpcC5zdHlsZS5sZWZ0ID0gJHBhcmVudC5vZmZzZXRMZWZ0IC0gJHRpcC5vZmZzZXRXaWR0aCArICdweCc7XHJcbiAgICAgICAgICAgICAgICAkdGlwLnN0eWxlLnRvcCA9ICRwYXJlbnQub2Zmc2V0VG9wIC0gJHRpcC5vZmZzZXRIZWlnaHQgKyAncHgnO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBDaGVjayB0byBzZWUgaWYgdGhlIHRpcCBpcyB3aXRoaW4gdGhlIHdpbmRvd1xyXG4gICAgICAgIGZ1bmN0aW9uIF9jaGVja1BvcygkdGlwKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFyIHJlY3QgPSAkdGlwLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgICAgIHJlY3QudG9wID49IDAgJiZcclxuICAgICAgICAgICAgICAgIHJlY3QubGVmdCA+PSAwICYmXHJcbiAgICAgICAgICAgICAgICByZWN0LmJvdHRvbSA8PSAod2luZG93LmlubmVySGVpZ2h0IHx8IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGllbnRIZWlnaHQpICYmXHJcbiAgICAgICAgICAgICAgICByZWN0LnJpZ2h0IDw9ICh3aW5kb3cuaW5uZXJXaWR0aCB8fCBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xpZW50V2lkdGgpXHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICByZXN0cmljdDogJ0UnLFxyXG4gICAgICAgICAgICBzY29wZToge1xyXG4gICAgICAgICAgICAgICAgY29uZmlnOiAnPSdcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgcmVwbGFjZTogdHJ1ZSxcclxuICAgICAgICAgICAgbGluazogZnVuY3Rpb24oc2NvcGUsIGVsZW1lbnQsIGF0dHJzKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gSWYgdGhlIHVzZXIgZG9lc24ndCBwcm92aWRlIGVzc2VudGlhbCBpbmZvcm1hdGlvbiwgZXJyb3Igb3V0XHJcbiAgICAgICAgICAgICAgICBpZighc2NvcGUuY29uZmlnLnRpdGxlIHx8ICFzY29wZS5jb25maWcuYm9keSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ0Vycm9yOiBObyB0aXRsZSBvciBib2R5IGluZm9ybWF0aW9uIHByb3ZpZGVkLicpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAxO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIC8vIElmIHRoZSB1c2VyIGRvZXNuJ3QgcHJvdmlkZSBhIHBvc2l0aW9uLCBkZWZhdWx0ICdub3J0aCdcclxuICAgICAgICAgICAgICAgIGlmKCFzY29wZS5jb25maWcucG9zaXRpb24gfHwgdHlwZW9mIHNjb3BlLmNvbmZpZy5wb3NpdGlvbiAhPT0gJ3N0cmluZycgfHwgX3Bvcy5pbmRleE9mKHNjb3BlLmNvbmZpZy5wb3NpdGlvbikgPCAwKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIHNjb3BlLmNvbmZpZy5wb3NpdGlvbiA9ICduJztcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAvLyBDcmVhdGUgdGlwIGVsZW1lbnRcclxuICAgICAgICAgICAgICAgIHZhciAkdGlwID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gQXBwZW5kIHRvIERPTVxyXG4gICAgICAgICAgICAgICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZCgkdGlwKTtcclxuICAgICAgICAgICAgICAgICR0aXAuc3R5bGUucG9zaXRpb24gPSAnYWJzb2x1dGUnO1xyXG4gICAgICAgICAgICAgICAgJHRpcC5pbm5lckhUTUwgPSAnPHNwYW4+Jysgc2NvcGUuY29uZmlnLnRpdGxlICsnPC9zcGFuPjxkaXY+Jysgc2NvcGUuY29uZmlnLmJvZHkgKyc8L2Rpdj4nO1xyXG4gICAgICAgICAgICAgICAgJHRpcC5jbGFzc05hbWUgPSAnYm9zc3lUb29sdGlwJztcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBEaXNhYmxlIGJyb3dzZXIncyB0b29sdGlwXHJcbiAgICAgICAgICAgICAgICBlbGVtZW50WzBdLnRpdGxlID0gJyc7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlbGVtZW50KTtcclxuXHJcbiAgICAgICAgICAgICAgICB2YXIgaSA9IDAsXHJcbiAgICAgICAgICAgICAgICAgICAgbG9ja2VkO1xyXG5cclxuICAgICAgICAgICAgICAgIGRvIHtcclxuICAgICAgICAgICAgICAgICAgICBsb2NrZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIF9tb3ZlVGlwKGVsZW1lbnRbMF0sICR0aXAsIHNjb3BlLmNvbmZpZy5wb3NpdGlvbik7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC8vIENvbnRpbnVlIHRvIGxvb3AgaWYgJHRpcCBpcyBjbGlwcGVkXHJcbiAgICAgICAgICAgICAgICAgICAgaWYoIV9jaGVja1BvcygkdGlwKSlcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxvY2tlZCA9IGZhbHNlO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gV3JhcCBhcm91bmQgYXJyYXkgaWYgdGhlIGVuZCBpcyBoaXRcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHNjb3BlLmNvbmZpZy5wb3NpdGlvbiA9PT0gJ253Jykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2NvcGUuY29uZmlnLnBvc2l0aW9uID0gJ24nO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2NvcGUuY29uZmlnLnBvc2l0aW9uID0gX3Bvc1tfcG9zLmluZGV4T2Yoc2NvcGUuY29uZmlnLnBvc2l0aW9uKSArIDFdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAoaSA9PT0gOCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgKytpO1xyXG4gICAgICAgICAgICAgICAgfSB3aGlsZSAobG9ja2VkID09PSBmYWxzZSk7XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gSGlkZSBpdCB1bnRpbCBtb3VzZSBldmVudFxyXG4gICAgICAgICAgICAgICAgJHRpcC5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIE1vdXNlIGV2ZW50c1xyXG4gICAgICAgICAgICAgICAgZWxlbWVudC5vbignbW91c2VlbnRlcicsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICR0aXAuc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLm9uKCdtb3VzZWxlYXZlJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgJHRpcC5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuICAgIH0pOyJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==