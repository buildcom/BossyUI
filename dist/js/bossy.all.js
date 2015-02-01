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
			templateUrl: 'bossy.calendar.html',
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImJvc3N5LmpzIiwiYm9zc3kuY2FsZW5kYXIuanMiLCJib3NzeS5jb21ib2JveC5jYXNjYWRpbmdEcm9wZG93bi5qcyIsImJvc3N5LmNvbWJvYm94LmNoZWNrYm94TXVsdGlzZWxlY3QuanMiLCJib3NzeS5jb21ib2JveC5tdWx0aXNlbGVjdC5qcyIsImJvc3N5LmRhdGEuanMiLCJib3NzeS5kYXRhX2dyaWQuanMiLCJib3NzeS5kcm9wZG93bi5qcyIsImJvc3N5LmZvcm0uanMiLCJib3NzeS5pbnB1dC5qcyIsImJvc3N5Lm51bWVyaWN0ZXh0Ym94LmpzIiwiYm9zc3kuc2NoZW1hLmpzIiwiYm9zc3kuc2xpZGVyLmpzIiwiYm9zc3kudG9vbHRpcC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUMxQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDcEtBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDeEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUM3R0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDckpBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQzNEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNwRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ2xGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDbElBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ2pCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUN6RkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUMxQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUM3VUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJib3NzeS5hbGwuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiFcbiAqIGJvc3N5LmpzXG4gKi9cblxuLyohXG4gKiBodHRwOi8vQm9zc3lVSS5jb20vXG4gKlxuICogQm9zc3lVSSAtIENyZWF0ZWQgd2l0aCBMT1ZFIGJ5IEJ1aWxkLmNvbSBPcGVuIFNvdXJjZSBDb25zb3J0aXVtXG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlLiBQbGVhc2Ugc2VlIExJQ0VOU0UgZm9yIG1vcmUgaW5mb3JtYXRpb24uXG4gKlxuKi9cblxuLy9UT0RPOiBuZWVkIGxheW91dCwgbGFiZWxzXG52YXIgYm9zc3kgPSBhbmd1bGFyLm1vZHVsZSgnYm9zc3knLCBbXG5cdFx0J2Jvc3N5LmNhbGVuZGFyJyxcblx0XHQnYm9zc3kuZGF0YScsXG5cdFx0J2Jvc3N5LmRyb3Bkb3duJyxcblx0XHQnYm9zc3kuZm9ybScsXG5cdFx0J2Jvc3N5LmlucHV0Jyxcblx0XHQnYm9zc3kubnVtZXJpY3RleHRib3gnLFxuXHRcdCdib3NzeS5zY2hlbWEnLFxuXHRcdCdib3NzeS50b29sdGlwJyxcblx0XHQnYm9zc3kuZGF0YWdyaWQnXG5cdF1cbik7XG4iLCJhbmd1bGFyLm1vZHVsZSgnYm9zc3kuY2FsZW5kYXInLCBbXSlcblx0LmNvbnRyb2xsZXIoJ0NhbGVuZGFyQ29udHJvbGxlcicsIFsnJHNjb3BlJywgZnVuY3Rpb24gKCRzY29wZSkge1xuXG5cdFx0dmFyIF9tb250aE1hcHMgPSB7fSxcblx0XHRcdG9wdGlvbnMgPSB7fSxcblx0XHRcdGRlZmF1bHRzID0ge30sXG5cdFx0XHR1bml2ZXJzYWwgPSB7XG5cdFx0XHRcdERBWTogMjQgKiA2MCAqIDYwICogMTAwMCxcblx0XHRcdFx0SE9VUjogNjAgKiA2MCAqIDEwMDBcblx0XHRcdH07XG5cblx0XHQkc2NvcGUuZGF5cyA9IFtcblx0XHRcdCdTdW5kYXknLFxuXHRcdFx0J01vbmRheScsXG5cdFx0XHQnVHVlc2RheScsXG5cdFx0XHQnV2VkbmVzZGF5Jyxcblx0XHRcdCdUaHVyc2RheScsXG5cdFx0XHQnRnJpZGF5Jyxcblx0XHRcdCdTYXR1cmRheSdcblx0XHRdO1xuXG5cdFx0JHNjb3BlLm1vbnRocyA9IFtcblx0XHRcdCdKYW51YXJ5Jyxcblx0XHRcdCdGZWJydWFyeScsXG5cdFx0XHQnTWFyY2gnLFxuXHRcdFx0J0FwcmlsJyxcblx0XHRcdCdNYXknLFxuXHRcdFx0J0p1bmUnLFxuXHRcdFx0J0p1bHknLFxuXHRcdFx0J0F1Z3VzdCcsXG5cdFx0XHQnU2VwdGVtYmVyJyxcblx0XHRcdCdPY3RvYmVyJyxcblx0XHRcdCdOb3ZlbWJlcicsXG5cdFx0XHQnRGVjZW1iZXInXG5cdFx0XTtcblxuXHRcdCRzY29wZS5wcmV2aW91c01vbnRoID0gZnVuY3Rpb24oKSB7XG5cdFx0XHR2YXIgZGF0ZSA9IG5ldyBEYXRlKCRzY29wZS5jdXJyZW50LnllYXIsICgkc2NvcGUuY3VycmVudC5tb250aCAtIDEpLCAxKTtcblx0XHRcdHNldEN1cnJlbnRNb250aEFuZFllYXIoZGF0ZS5nZXRNb250aCgpLCBkYXRlLmdldEZ1bGxZZWFyKCkpO1xuXHRcdFx0JHNjb3BlLnVwZGF0ZURhdGVNYXAoKTtcblx0XHR9O1xuXG5cdFx0JHNjb3BlLm5leHRNb250aCA9IGZ1bmN0aW9uKCkge1xuXHRcdFx0dmFyIGRhdGUgPSBuZXcgRGF0ZSgkc2NvcGUuY3VycmVudC55ZWFyLCAoJHNjb3BlLmN1cnJlbnQubW9udGggKyAxKSwgMSk7XG5cdFx0XHRzZXRDdXJyZW50TW9udGhBbmRZZWFyKGRhdGUuZ2V0TW9udGgoKSwgZGF0ZS5nZXRGdWxsWWVhcigpKTtcblx0XHRcdCRzY29wZS51cGRhdGVEYXRlTWFwKCk7XG5cdFx0fTtcblxuXHRcdCRzY29wZS5zZWxlY3REYXRlID0gZnVuY3Rpb24odGltZSkge1xuXHRcdFx0dmFyIGRhdGUgPSBnZXRTdGFuZGFyZFRpbWUobmV3IERhdGUodGltZSkpO1xuXHRcdFx0aWYgKGRheUlzT3V0T2ZSYW5nZShkYXRlKSkge1xuXHRcdFx0XHRyZXR1cm47XG5cdFx0XHR9XG5cdFx0XHRpZiAoZGF0ZS5tb250aCAhPT0gJHNjb3BlLmN1cnJlbnQubW9udGgpIHtcblx0XHRcdFx0c2V0Q3VycmVudE1vbnRoQW5kWWVhcihkYXRlLm1vbnRoLCBkYXRlLnllYXIpO1xuXHRcdFx0XHQkc2NvcGUudXBkYXRlRGF0ZU1hcCgpO1xuXHRcdFx0fVxuXHRcdFx0c2V0U2VsZWN0ZWREYXRlKG5ldyBEYXRlKHRpbWUpKTtcblx0XHR9O1xuXG5cdFx0JHNjb3BlLnVwZGF0ZURhdGVNYXAgPSBmdW5jdGlvbigpIHtcblx0XHRcdHZhciByYXdDdXJyZW50RGF5ID0gKCRzY29wZS5jdXJyZW50LnJhdy5nZXREYXkoKSAqIHVuaXZlcnNhbC5EQVkpLFxuXHRcdFx0XHRmaXJzdFdlZWtEYXkgPSBuZXcgRGF0ZSgkc2NvcGUuY3VycmVudC50aW1lIC0gcmF3Q3VycmVudERheSksXG5cdFx0XHRcdGlzTW9udGhDb21wbGV0ZSA9IGZhbHNlO1xuXG5cdFx0XHQkc2NvcGUuZGF0ZU1hcCA9IFtdO1xuXG5cdFx0XHR3aGlsZSAoIWlzTW9udGhDb21wbGV0ZSkge1xuXHRcdFx0XHR2YXIgd2VlayA9IFtdO1xuXHRcdFx0XHRpZiAoJHNjb3BlLmRhdGVNYXAubGVuZ3RoID09PSA1KSB7XG5cdFx0XHRcdFx0aXNNb250aENvbXBsZXRlID0gdHJ1ZTtcblx0XHRcdFx0fVxuXHRcdFx0XHRmb3IgKHZhciB3ZWVrRGF5ID0gMDsgd2Vla0RheSA8IDc7IHdlZWtEYXkrKykge1xuXHRcdFx0XHRcdHZhciByYXdUaGlzRGF0ZSA9IGZpcnN0V2Vla0RheS5nZXRUaW1lKCkgKyAod2Vla0RheSAqIHVuaXZlcnNhbC5EQVkpLFxuXHRcdFx0XHRcdFx0dGhpc0RhdGUgPSAobmV3IERhdGUocmF3VGhpc0RhdGUpKTtcblx0XHRcdFx0XHQvLyBmaXggZm9yIERTVCBvZGRuZXNzXG5cdFx0XHRcdFx0aWYgKHRoaXNEYXRlLmdldEhvdXJzKCkgPT09IDIzKSB7XG5cdFx0XHRcdFx0XHR0aGlzRGF0ZSA9IChuZXcgRGF0ZSh0aGlzRGF0ZS5nZXRUaW1lKCkgKyB1bml2ZXJzYWwuSE9VUikpO1xuXHRcdFx0XHRcdH0gZWxzZSBpZiAodGhpc0RhdGUuZ2V0SG91cnMoKSA9PT0gMSkge1xuXHRcdFx0XHRcdFx0dGhpc0RhdGUgPSAobmV3IERhdGUodGhpc0RhdGUuZ2V0VGltZSgpIC0gdW5pdmVyc2FsLkhPVVIpKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0dmFyIGRhdGUgPSBnZXRTdGFuZGFyZFRpbWUodGhpc0RhdGUpO1xuXHRcdFx0XHRcdGRhdGUuZGF5SW5Nb250aCA9IHRoaXNEYXRlLmdldE1vbnRoKCkgPT09ICRzY29wZS5jdXJyZW50LnJhdy5nZXRNb250aCgpID8gJ2RheS1pbi1tb250aCcgOiAnJztcblx0XHRcdFx0XHRkYXRlLmRpc2FibGVkRGF5ID0gZGF5SXNPdXRPZlJhbmdlKGRhdGUpID8gJ2Rpc2FibGVkLWRheScgOiAnJztcblx0XHRcdFx0XHR3ZWVrLnB1c2goZGF0ZSk7XG5cdFx0XHRcdH1cblx0XHRcdFx0Zmlyc3RXZWVrRGF5ID0gbmV3IERhdGUoZmlyc3RXZWVrRGF5LmdldFRpbWUoKSArICg3ICogdW5pdmVyc2FsLkRBWSkpO1xuXHRcdFx0XHQkc2NvcGUuZGF0ZU1hcC5wdXNoKHdlZWspO1xuXHRcdFx0fVxuXHRcdH07XG5cblx0XHRmdW5jdGlvbiBnZXRTdGFuZGFyZFRpbWUoZGF0ZSkge1xuXHRcdFx0cmV0dXJuIHtcblx0XHRcdFx0cmF3OiBkYXRlLFxuXHRcdFx0XHR5ZWFyOiBkYXRlLmdldEZ1bGxZZWFyKCksXG5cdFx0XHRcdG1vbnRoTmFtZTogZ2V0TW9udGhOYW1lKGRhdGUuZ2V0TW9udGgoKSksXG5cdFx0XHRcdG1vbnRoOiBkYXRlLmdldE1vbnRoKCksXG5cdFx0XHRcdGRheTogZ2V0RGF5TmFtZShkYXRlKSxcblx0XHRcdFx0ZGF0ZTogZGF0ZS5nZXREYXRlKCksXG5cdFx0XHRcdHRpbWU6IGRhdGUuZ2V0VGltZSgpXG5cdFx0XHR9O1xuXHRcdH1cblxuXHRcdGZ1bmN0aW9uIGdldFRpbWVPYmplY3RJZkRhdGUoZGF0ZSkge1xuXHRcdFx0aWYgKGFuZ3VsYXIuaXNEYXRlKG5ldyBEYXRlKGRhdGUpKSkge1xuXHRcdFx0XHRyZXR1cm4gZ2V0U3RhbmRhcmRUaW1lKG5ldyBEYXRlKGRhdGUpKTtcblx0XHRcdH1cblx0XHRcdHJldHVybiBmYWxzZTtcblx0XHR9XG5cblx0XHRmdW5jdGlvbiBzZXRDb25maWdPcHRpb25zKCkge1xuXHRcdFx0JHNjb3BlLmNvbmZpZyA9ICRzY29wZS5jb25maWcgfHwge307XG5cdFx0XHQkc2NvcGUuY29uZmlnLnN0YXJ0ID0gZ2V0VGltZU9iamVjdElmRGF0ZSgkc2NvcGUuY29uZmlnLnN0YXJ0KTtcblx0XHRcdCRzY29wZS5jb25maWcuZW5kID0gZ2V0VGltZU9iamVjdElmRGF0ZSgkc2NvcGUuY29uZmlnLmVuZCk7XG5cdFx0XHRvcHRpb25zID0gYW5ndWxhci5leHRlbmQoe30sIGRlZmF1bHRzLCAkc2NvcGUuY29uZmlnKTtcblx0XHR9XG5cblx0XHRmdW5jdGlvbiBkYXlJc091dE9mUmFuZ2UoX2RhdGUpIHtcblx0XHRcdHZhciBoYXNSYW5nZSA9IG9wdGlvbnMuc3RhcnQgJiYgb3B0aW9ucy5lbmQ7XG5cdFx0XHRpZiAoaGFzUmFuZ2UgJiYgKF9kYXRlLnRpbWUgPCBvcHRpb25zLnN0YXJ0LnRpbWUgfHwgX2RhdGUudGltZSA+IG9wdGlvbnMuZW5kLnRpbWUpKSB7XG5cdFx0XHRcdHJldHVybiB0cnVlO1xuXHRcdFx0fSBlbHNlIGlmIChvcHRpb25zLnN0YXJ0ICYmIF9kYXRlLnRpbWUgPCBvcHRpb25zLnN0YXJ0LnRpbWUpIHtcblx0XHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0XHR9IGVsc2UgaWYgKG9wdGlvbnMuZW5kICYmIF9kYXRlLnRpbWUgPiBvcHRpb25zLmVuZC50aW1lKSB7XG5cdFx0XHRcdHJldHVybiB0cnVlO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdGZ1bmN0aW9uIHNldFNlbGVjdGVkRGF0ZShkYXRlKSB7XG5cdFx0XHQkc2NvcGUuc2VsZWN0ZWQgPSBnZXRTdGFuZGFyZFRpbWUoZGF0ZSk7XG5cdFx0XHQkc2NvcGUubmdNb2RlbCA9ICRzY29wZS5zZWxlY3RlZC5yYXc7XG5cdFx0fVxuXG5cdFx0ZnVuY3Rpb24gc2V0Q3VycmVudE1vbnRoQW5kWWVhcihtb250aCwgeWVhcikge1xuXHRcdFx0dmFyIGRhdGUgPSBuZXcgRGF0ZSh5ZWFyICE9PSB1bmRlZmluZWQgPyB5ZWFyIDogJHNjb3BlLnNlbGVjdGVkLnllYXIsIG1vbnRoICE9PSB1bmRlZmluZWQgPyBtb250aCA6ICRzY29wZS5zZWxlY3RlZC5tb250aCwgMSk7XG5cdFx0XHQkc2NvcGUuY3VycmVudCA9IGdldFN0YW5kYXJkVGltZShkYXRlKTtcblx0XHR9XG5cblx0XHRmdW5jdGlvbiBnZXRNb250aE5hbWUobW9udGgpIHtcblx0XHRcdHJldHVybiAkc2NvcGUubW9udGhzW21vbnRoXTtcblx0XHR9XG5cblx0XHRmdW5jdGlvbiBnZXREYXlOYW1lKGRhdGUpIHtcblx0XHRcdHJldHVybiAkc2NvcGUuZGF5c1tkYXRlLmdldERheSgpXTtcblx0XHR9XG5cblx0XHRmdW5jdGlvbiBpbml0aWFsaXplKCkge1xuXHRcdFx0c2V0Q29uZmlnT3B0aW9ucygpO1xuXHRcdFx0c2V0U2VsZWN0ZWREYXRlKCRzY29wZS5uZ01vZGVsIHx8IG5ldyBEYXRlKCkpO1xuXHRcdFx0c2V0Q3VycmVudE1vbnRoQW5kWWVhcigpO1xuXHRcdFx0JHNjb3BlLnVwZGF0ZURhdGVNYXAoKTtcblx0XHR9XG5cblx0XHRpbml0aWFsaXplKCk7XG5cblx0fV0pLmRpcmVjdGl2ZSgnYm9zc3lDYWxlbmRhcicsIFtmdW5jdGlvbiAoKSB7XG5cdFx0cmV0dXJuIHtcblx0XHRcdHJlc3RyaWN0OiAnQUUnLFxuXHRcdFx0c2NvcGU6IHtcblx0XHRcdFx0Y29uZmlnOiAnPSdcblx0XHRcdH0sXG5cdFx0XHR0ZW1wbGF0ZVVybDogJ2Jvc3N5LmNhbGVuZGFyLmh0bWwnLFxuXHRcdFx0Y29udHJvbGxlcjogJ0NhbGVuZGFyQ29udHJvbGxlcidcblx0XHR9O1xuXHR9XSk7IiwidmFyIGFwcCA9IGFuZ3VsYXIubW9kdWxlKCdib3NzeS5jb21ib2JveC5jYXNjYWRpbmdEcm9wZG93bicsIFtdKTtcblxuYXBwLmNvbnRyb2xsZXIoJ0FwcEN0cmwnLCBmdW5jdGlvbigkc2NvcGUpIHtcblxuICAgIC8vIGFkZCBjaG9pY2VzIGZvciB0aGUgMyBkcm9wZG93bnNcbiAgICAvLyBkZXBlbmRlbmNpZXMgaW4gYXJyYXlzIChBIC0gQTEgLSBBMWEpXG4gICAgJHNjb3BlLmNob2ljZXMgPSB7XG4gICAgICAgICdPcHRpb24gQSc6IHtcbiAgICAgICAgICAgICdPcHRpb24gQTEnOiBbJ09wdGlvbiBBMWEnLCAnT3B0aW9uIEExYicsICdPcHRpb24gQTFjJ10sXG4gICAgICAgICAgICAnT3B0aW9uIEEyJzogWydPcHRpb24gQTJhJywgJ09wdGlvbiBBMmInLCAnT3B0aW9uIEEyYyddLFxuICAgICAgICAgICAgJ09wdGlvbiBBMyc6IFsnT3B0aW9uIEEzYScsICdPcHRpb24gQTNiJywgJ09wdGlvbiBBM2MnXVxuICAgICAgICB9LFxuICAgICAgICAnT3B0aW9uIEInOiB7XG4gICAgICAgICAgICAnT3B0aW9uIEIxJzogWydPcHRpb24gQjFhJywgJ09wdGlvbiBCMWInLCAnT3B0aW9uIEIxYyddLFxuICAgICAgICAgICAgJ09wdGlvbiBCMic6IFsnT3B0aW9uIEIyYScsICdPcHRpb24gQjJiJywgJ09wdGlvbiBCMmMnXSxcbiAgICAgICAgICAgICdPcHRpb24gQjMnOiBbJ09wdGlvbiBCM2EnLCAnT3B0aW9uIEIzYicsICdPcHRpb24gQjNjJ11cbiAgICAgICAgfSxcbiAgICAgICAgJ09wdGlvbiBDJzoge1xuICAgICAgICAgICAgJ09wdGlvbiBDMSc6IFsnT3B0aW9uIEMxYScsICdPcHRpb24gQzFiJywgJ09wdGlvbiBDMWMnXSxcbiAgICAgICAgICAgICdPcHRpb24gQzInOiBbJ09wdGlvbiBDMmEnLCAnT3B0aW9uIEMyYicsICdPcHRpb24gQzNiJ10sXG4gICAgICAgICAgICAnT3B0aW9uIEMzJzogWydPcHRpb24gQzNhJywgJ09wdGlvbiBDM2InLCAnT3B0aW9uIEMzYyddXG4gICAgICAgIH1cbiAgICB9O1xuXG59KTsiLCJ2YXIgYXBwID0gYW5ndWxhci5tb2R1bGUoJ2Jvc3N5LmNvbWJvYm94LmNoZWNrYm94TXVsdGlzZWxlY3QnLCBbXSk7XG5cbmFwcC5jb250cm9sbGVyKCdBcHBDdHJsJywgZnVuY3Rpb24oJHNjb3BlKSB7XG5cbiAgICAvLyBzZXQgY2hvaWNlc1xuICAgICRzY29wZS5jaG9pY2VzID0gWydPcHRpb24gQScsICdPcHRpb24gQicsICdPcHRpb24gQyddO1xuXG4gICAgLy8gYXJyYXlcbiAgICAkc2NvcGUubmFtZSA9IHtjaG9pY2VzOiBbXX07XG5cbiAgICAvLyBmdW5jdGlvbiBzZWxlY3RBbGwgdG8gc2VsZWN0IGFsbCBjaGVja2JveGVzXG4gICAgJHNjb3BlLnNlbGVjdEFsbCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAkc2NvcGUubmFtZS5jaG9pY2VzID0gYW5ndWxhci5jb3B5KCRzY29wZS5jaG9pY2VzKTtcbiAgICB9O1xuXG4gICAgLy8gZnVuY3Rpb24gZGVzZWxlY3RBbGwgdG8gZGVzZWxlY3QgYWxsIGNoZWNrYm94ZXNcbiAgICAkc2NvcGUuZGVzZWxlY3RBbGwgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgJHNjb3BlLm5hbWUuY2hvaWNlcyA9IFtdO1xuICAgIH07XG5cbn0pO1xuXG5hcHAuZGlyZWN0aXZlKCdib3NzeUNoZWNrYm94TXVsdGlzZWxlY3QnLCBbJyRwYXJzZScsICckY29tcGlsZScsIGZ1bmN0aW9uKCRwYXJzZSwgJGNvbXBpbGUpIHtcblxuICAgIC8vIGFkZCB0aGUgc2VsZWN0ZWQgY2hvaWNlIHRvIGNob2ljZXNcbiAgICBmdW5jdGlvbiBhZGRDaG9pY2UgKGFyciwgaXRlbSkge1xuICAgICAgICBhcnIgPSBhbmd1bGFyLmlzQXJyYXkoYXJyKSA/IGFyciA6IFtdO1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGFyci5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgaWYgKGFuZ3VsYXIuZXF1YWxzKGFycltpXSwgaXRlbSkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gYXJyO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIC8vIGFkZCBjaG9pY2UgdG8gYXJyYXlcbiAgICAgICAgYXJyLnB1c2goaXRlbSk7XG4gICAgICAgIC8vIHJldHVybiBuZXcgYXJyYXlcbiAgICAgICAgcmV0dXJuIGFycjtcbiAgICB9XG5cbiAgICAvLyByZW1vdmUgdGhlIHNlbGVjdGVkIGNob2ljZSBmcm9tIGNob2ljZXMgd2hlbiBjbGlja2VkXG4gICAgZnVuY3Rpb24gcmVtb3ZlQ2hvaWNlKGFyciwgaXRlbSkge1xuICAgICAgICBpZiAoYW5ndWxhci5pc0FycmF5KGFycikpIHtcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYXJyLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgaWYgKGFuZ3VsYXIuZXF1YWxzKGFycltpXSwgaXRlbSkpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gcmVtb3ZlIGZyb20gYXJyYXlcbiAgICAgICAgICAgICAgICAgICAgYXJyLnNwbGljZShpLCAxKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIC8vIHJldHVybiBuZXcgYXJyYXlcbiAgICAgICAgcmV0dXJuIGFycjtcbiAgICB9XG5cbiAgICAvLyBjb250YWlucyAtIGNoZWNrIHdoaWNoIGl0ZW1zIHRoZSBhcnJheSBjb250YWluc1xuICAgIGZ1bmN0aW9uIGNvbnRhaW5DaGVja2JveCAoYXJyLCBpdGVtKSB7XG4gICAgICAgIGlmIChhbmd1bGFyLmlzQXJyYXkoYXJyKSkge1xuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBhcnIubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBpZiAoYW5ndWxhci5lcXVhbHMoYXJyW2ldLCBpdGVtKSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIC8vIHdhdGNoIGJlaGF2aW91ciBvZiBkaXJlY3RpdmUgYW5kIG1vZGVsXG4gICAgZnVuY3Rpb24gd2F0Y2goc2NvcGUsIGVsZW0sIGF0dHJzKSB7XG5cbiAgICAgICAgLy8gY29tcGlsZSAtIG5nLW1vZGVsIHBvaW50aW5nIHRvIGNoZWNrZWRcbiAgICAgICAgJGNvbXBpbGUoZWxlbSkoc2NvcGUpO1xuXG4gICAgICAgIC8vIGdldHRlciBhbmQgc2V0dGVyIGZvciBvcmlnaW5hbCBtb2RlbFxuICAgICAgICB2YXIgZ2V0dGVyID0gJHBhcnNlKGF0dHJzLmJvc3N5Q2hlY2tib3hNdWx0aXNlbGVjdCk7XG4gICAgICAgIHZhciBzZXR0ZXIgPSBnZXR0ZXIuYXNzaWduO1xuXG4gICAgICAgIC8vIHZhbHVlIGFkZGVkIHRvIGxpc3RcbiAgICAgICAgdmFyIHZhbHVlID0gJHBhcnNlKGF0dHJzLmJvc3N5TGlzdFZhbHVlKShzY29wZS4kcGFyZW50KTtcblxuICAgICAgICAvLyB3YXRjaCB0aGUgY2hhbmdlIG9mIGNoZWNrZWQgdmFsdWVzXG4gICAgICAgIHNjb3BlLiR3YXRjaCgnY2hlY2tlZCcsIGZ1bmN0aW9uKG5ld1ZhbHVlLCBvbGRWYWx1ZSkge1xuICAgICAgICAgICAgaWYgKG5ld1ZhbHVlID09PSBvbGRWYWx1ZSkge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHZhciBhY3R1YWwgPSBnZXR0ZXIoc2NvcGUuJHBhcmVudCk7XG4gICAgICAgICAgICBpZiAobmV3VmFsdWUgPT09IHRydWUpIHtcbiAgICAgICAgICAgICAgICBzZXR0ZXIoc2NvcGUuJHBhcmVudCwgYWRkQ2hvaWNlIChhY3R1YWwsIHZhbHVlKSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHNldHRlcihzY29wZS4kcGFyZW50LCByZW1vdmVDaG9pY2UoYWN0dWFsLCB2YWx1ZSkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICAvLyB3YXRjaCBjaGFuZ2Ugb2Ygb3JpZ2luYWwgbW9kZWxcbiAgICAgICAgc2NvcGUuJHBhcmVudC4kd2F0Y2goYXR0cnMuYm9zc3lDaGVja2JveE11bHRpc2VsZWN0LCBmdW5jdGlvbihuZXdBcnIpIHtcbiAgICAgICAgICAgIHNjb3BlLmNoZWNrZWQgPSBjb250YWluQ2hlY2tib3ggKG5ld0FyciwgdmFsdWUpO1xuICAgICAgICB9LCB0cnVlKTtcbiAgICB9XG5cbiAgICByZXR1cm4ge1xuICAgICAgICByZXN0cmljdDogJ0FFJyxcbiAgICAgICAgc2NvcGU6IHRydWUsXG4gICAgICAgIGNvbXBpbGU6IGZ1bmN0aW9uKHRFbGVtZW50LCB0QXR0cnMpIHtcbiAgICAgICAgICAgIC8vIGxvY2FsIHZhcmlhYmxlIHN0b3JpbmcgY2hlY2tib3ggbW9kZWxcbiAgICAgICAgICAgIHRFbGVtZW50LmF0dHIoJ25nLW1vZGVsJywgJ2NoZWNrZWQnKTtcbiAgICAgICAgICAgIC8vIHByZXZlbnQgcmVjdXJzaW9uXG4gICAgICAgICAgICB0RWxlbWVudC5yZW1vdmVBdHRyKCdib3NzeS1jaGVja2JveC1tdWx0aXNlbGVjdCcpO1xuICAgICAgICAgICAgcmV0dXJuIHdhdGNoO1xuICAgICAgICB9XG4gICAgfTtcblxufV0pOyIsInZhciBhcHAgPSBhbmd1bGFyLm1vZHVsZSgnYm9zc3kuY29tYm9ib3gubXVsdGlzZWxlY3QnLCBbXSk7XG5cbmFwcC5jb250cm9sbGVyKCdBcHBDdHJsJywgZnVuY3Rpb24oJHNjb3BlKSB7XG5cbiAgICAvLyBhZGQgY2hvaWNlcyBmb3IgbXVsdGlzZWxlY3QgaW4gYXJyYXlcbiAgICAkc2NvcGUuY2hvaWNlcyA9IFt7aWQ6MSwgbmFtZTogJ09wdGlvbiBBJ30sXG4gICAgICAgICAgICAgICAgICAgICAge2lkOjIsIG5hbWU6ICdPcHRpb24gQid9LFxuICAgICAgICAgICAgICAgICAgICAgIHtpZDozLCBuYW1lOiAnT3B0aW9uIEMnfVxuICAgICAgICAgICAgICAgICAgICAgXTtcblxuICAgIC8vIHNlbGVjdGVkIGNob2ljZVxuICAgICRzY29wZS5zZWxlY3RlZENob2ljZSA9IFtdO1xuXG59KTtcblxuLy8gaW5qZWN0IGZ1bmN0aW9uc1xuYXBwLmZhY3RvcnkoJ29wdGlvblBhcnNlcicsIFsnJHBhcnNlJywgZnVuY3Rpb24gKCRwYXJzZSkge1xuXG4gICAgdmFyIFRZUEVBSEVBRF9SRUdFWFAgPSAvXlxccyooLio/KSg/Olxccythc1xccysoLio/KSk/XFxzK2ZvclxccysoPzooW1xcJFxcd11bXFwkXFx3XFxkXSopKVxccytpblxccysoLiopJC87XG5cbiAgICByZXR1cm4ge1xuICAgICAgICBwYXJzZTogZnVuY3Rpb24gKGlucHV0KSB7XG5cbiAgICAgICAgICAgIC8vIGNoZWNrIGlucHV0c1xuICAgICAgICAgICAgdmFyIG1hdGNoID0gaW5wdXQubWF0Y2goVFlQRUFIRUFEX1JFR0VYUCksIG1vZGVsTWFwcGVyLCB2aWV3TWFwcGVyLCBzb3VyY2U7XG4gICAgICAgICAgICBpZiAoIW1hdGNoKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgICAgICAgICAgICAgICAgICAgJ0V4cGVjdGVkIHR5cGVhaGVhZCBzcGVjaWZpY2F0aW9uIGluIGZvcm0gb2YgXCJfbW9kZWxWYWx1ZV8gKGFzIF9sYWJlbF8pPyBmb3IgX2l0ZW1fIGluIF9jb2xsZWN0aW9uX1wiJyArXG4gICAgICAgICAgICAgICAgICAgICAgICAnIGJ1dCBnb3QgXCInICsgaW5wdXQgKyAnXCIuJyk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgaXRlbU5hbWU6IG1hdGNoWzNdLFxuICAgICAgICAgICAgICAgIHNvdXJjZTogJHBhcnNlKG1hdGNoWzRdKSxcbiAgICAgICAgICAgICAgICB2aWV3TWFwcGVyOiAkcGFyc2UobWF0Y2hbMl0gfHwgbWF0Y2hbMV0pLFxuICAgICAgICAgICAgICAgIG1vZGVsTWFwcGVyOiAkcGFyc2UobWF0Y2hbMV0pXG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgfTtcbn1dKTtcblxuYXBwLmRpcmVjdGl2ZSgnYm9zc3lNdWx0aXNlbGVjdCcsXG5cbiAgICAgICAgZnVuY3Rpb24gKCRkb2N1bWVudCwgJGNvbXBpbGUsIG9wdGlvblBhcnNlcikge1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICByZXN0cmljdDogJ0UnLFxuICAgICAgICAgICAgICAgIHJlcXVpcmU6ICduZ01vZGVsJyxcbiAgICAgICAgICAgICAgICBsaW5rOiBmdW5jdGlvbiAob3JpZ2luYWxTY29wZSwgZWxlbWVudCwgYXR0cnMsIG1vZGVsQ3RybCkge1xuXG4gICAgICAgICAgICAgICAgICAgIC8vIGRlY2xhcmUgdmFyaWFibGVzXG4gICAgICAgICAgICAgICAgICAgIHZhciBleHAgPSBhdHRycy5vcHRpb25zLFxuICAgICAgICAgICAgICAgICAgICAgICAgcGFyc2VkUmVzdWx0ID0gb3B0aW9uUGFyc2VyLnBhcnNlKGV4cCksXG4gICAgICAgICAgICAgICAgICAgICAgICBpc011bHRpcGxlID0gYXR0cnMubXVsdGlwbGUgPyB0cnVlIDogZmFsc2UsXG4gICAgICAgICAgICAgICAgICAgICAgICBzY29wZSA9IG9yaWdpbmFsU2NvcGUuJG5ldygpLFxuICAgICAgICAgICAgICAgICAgICAgICAgY2hhbmdlSGFuZGxlciA9IGF0dHJzLmNoYW5nZSB8fCBhbmd1bGFyLm5vb3A7XG5cbiAgICAgICAgICAgICAgICAgICAgc2NvcGUuaXRlbXMgPSBbXTtcbiAgICAgICAgICAgICAgICAgICAgc2NvcGUubXVsdGlwbGUgPSBpc011bHRpcGxlO1xuXG4gICAgICAgICAgICAgICAgICAgIC8vIGluY2x1ZGUgc2Vjb25kIGRpcmVjdGl2ZSAodGVtcGxhdGUpXG4gICAgICAgICAgICAgICAgICAgIHZhciBwb3BVcEVsID0gYW5ndWxhci5lbGVtZW50KCc8Ym9zc3ktbXVsdGlzZWxlY3QtcG9wdXA+PC9ib3NzeS1tdWx0aXNlbGVjdC1wb3B1cD4nKTtcblxuICAgICAgICAgICAgICAgICAgICAvLyBhbmFseXNlIG1vZGVsXG4gICAgICAgICAgICAgICAgICAgIGZ1bmN0aW9uIHBhcnNlTW9kZWwoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgbW9kZWwgPSBwYXJzZWRSZXN1bHQuc291cmNlKG9yaWdpbmFsU2NvcGUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBtb2RlbC5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBsb2NhbCA9IHt9O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxvY2FsW3BhcnNlZFJlc3VsdC5pdGVtTmFtZV0gPSBtb2RlbFtpXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzY29wZS5pdGVtcy5wdXNoKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGFiZWw6IHBhcnNlZFJlc3VsdC52aWV3TWFwcGVyKGxvY2FsKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbW9kZWw6IG1vZGVsW2ldLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaGVja2VkOiBmYWxzZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgcGFyc2VNb2RlbCgpO1xuXG4gICAgICAgICAgICAgICAgICAgIC8vIGFkZCB0ZW1wbGF0ZSBkaXJlY3RpdmVcbiAgICAgICAgICAgICAgICAgICAgZWxlbWVudC5hcHBlbmQoJGNvbXBpbGUocG9wVXBFbCkoc2NvcGUpKTtcblxuICAgICAgICAgICAgICAgICAgICAvLyBzZWxlY3Rpb24gZnVuY3Rpb25cbiAgICAgICAgICAgICAgICAgICAgZnVuY3Rpb24gc2VsZWN0TXVsdGlwbGUoaXRlbSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaXRlbS5jaGVja2VkID0gIWl0ZW0uY2hlY2tlZDtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNldE1vZGVsVmFsdWUodHJ1ZSk7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAvLyBhcnJheSBmb3IgbXVsdGlwbGUgc2VsZWN0aW9uXG4gICAgICAgICAgICAgICAgICAgIGZ1bmN0aW9uIHNldE1vZGVsVmFsdWUoaXNNdWx0aXBsZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHZhbHVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGlzTXVsdGlwbGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZSA9IFtdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFuZ3VsYXIuZm9yRWFjaChzY29wZS5pdGVtcywgZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGl0ZW0uY2hlY2tlZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWUucHVzaChpdGVtLm1vZGVsKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhbmd1bGFyLmZvckVhY2goc2NvcGUuaXRlbXMsIGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpdGVtLmNoZWNrZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlID0gaXRlbS5tb2RlbDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgbW9kZWxDdHJsLiRzZXRWaWV3VmFsdWUodmFsdWUpO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgLy8gZnVuY3Rpb24gZm9yIHNlbGVjdGlvbiBvZiBhbGxcbiAgICAgICAgICAgICAgICAgICAgc2NvcGUuY2hlY2tBbGwgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIWlzTXVsdGlwbGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBhbmd1bGFyLmZvckVhY2goc2NvcGUuaXRlbXMsIGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaXRlbS5jaGVja2VkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgc2V0TW9kZWxWYWx1ZSh0cnVlKTtcbiAgICAgICAgICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgICAgICAgICAvLyBmdW5jdGlvbiBmb3Igc2VsZWN0aW9uIG9mIG5vbmVcbiAgICAgICAgICAgICAgICAgICAgc2NvcGUudW5jaGVja0FsbCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGFuZ3VsYXIuZm9yRWFjaChzY29wZS5pdGVtcywgZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpdGVtLmNoZWNrZWQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgc2V0TW9kZWxWYWx1ZSh0cnVlKTtcbiAgICAgICAgICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgICAgICAgICBzY29wZS5zZWxlY3QgPSBmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gVE9ETzogYWRkIHNlbGVjdFNpbmdsZSBmdW5jdGlvbiA/Pz9cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpc011bHRpcGxlICE9PSBmYWxzZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGVjdE11bHRpcGxlKGl0ZW0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH07XG4gICAgICAgIH0pO1xuXG4vLyBkaXJlY3RpdmUgc3RvcmluZyB0ZW1wbGF0ZVxuYXBwLmRpcmVjdGl2ZSgnYm9zc3lNdWx0aXNlbGVjdFBvcHVwJywgWyckZG9jdW1lbnQnLCBmdW5jdGlvbiAoJGRvY3VtZW50KSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICByZXN0cmljdDogJ0UnLFxuICAgICAgICAgICAgc2NvcGU6IGZhbHNlLFxuICAgICAgICAgICAgcmVwbGFjZTogdHJ1ZSxcbiAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAnLi4vdGVtcGxhdGVzL2Jvc3N5LmNvbWJvYm94Lm11bHRpc2VsZWN0Lmh0bWwnLFxuICAgICAgICAgICAgbGluazogZnVuY3Rpb24gKHNjb3BlLCBlbGVtZW50LCBhdHRyKSB7XG5cbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICB9XSk7XG4iLCJhbmd1bGFyLm1vZHVsZSgnYm9zc3kuZGF0YScsIFtdKVxuLyoqXG5Abmdkb2Mgc2VydmljZVxuQG5hbWUgJGRhdGFcbkByZXF1aXJlcyAkcVxuQHJlcXVpcmVzICRodHRwXG5cbiovXG4gICAgLmZhY3RvcnkoJyRkYXRhJywgWyckcScsJyRodHRwJywgJyRzY29wZScsIGZ1bmN0aW9uICgkcSwgJGh0dHAsICRzY29wZSkge1xuXG4gICAgICAgIGZ1bmN0aW9uIF9nZXREYXRhIChkYXRhKSB7XG4gICAgICAgICAgICBpZiAoYW5ndWxhci5pc1N0cmluZyhkYXRhKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBfZ2V0UmVtb3RlRGF0YShkYXRhKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKGFuZ3VsYXIuaXNPYmplY3QoZGF0YSkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZGF0YTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKGFuZ3VsYXIuaXNGdW5jdGlvbihkYXRhKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBfZ2V0RGF0YSggZGF0YS5jYWxsKCRzY29wZSkgKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIC8vVE9ETzogcmVwbGFjZSBlcnJvciBtZXNzYWdlIHdpdGggb25saW5lIGRvYyBsaW5rIGxpa2UgbmcgZXJyb3JzXG4gICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcignZGlyZWN0aXZlLmJvc3N5Rm9ybTogbm8gZGF0YSB1cmwgb3Igb2JqZWN0IGdpdmVuJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBmdW5jdGlvbiBfZ2V0UmVtb3RlRGF0YShkYXRhKSB7XG4gICAgICAgICAgICB2YXIgZGVmZXJyZWQgPSAkcS5kZWZlcigpO1xuXG4gICAgICAgICAgICAkaHR0cC5nZXQoZGF0YSwgeyByZXNwb25zZVR5cGU6ICdqc29uJyB9IClcbiAgICAgICAgICAgICAgICAuc3VjY2VzcyggZnVuY3Rpb24oIGRhdGEgKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmKCBhbmd1bGFyLmlzT2JqZWN0KCBkYXRhICkgKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZXNvbHZlKGRhdGEpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy9UT0RPOiByZXBsYWNlIGVycm9yIG1lc3NhZ2Ugd2l0aCBvbmxpbmUgZG9jIGxpbmsgbGlrZSBuZyBlcnJvcnNcbiAgICAgICAgICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlamVjdCgnZGlyZWN0aXZlLmJvc3N5Rm9ybTogR0VUIHJlcXVlc3QgdG8gdXJsIGRpZCBub3QgcHJvZHVjZSBkYXRhIG9iamVjdCcpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAuZXJyb3IoZnVuY3Rpb24ocmVzcG9uc2VEYXRhLCBzdGF0dXMpIHtcbiAgICAgICAgICAgICAgICAgICAgLy9UT0RPOiByZXBsYWNlIGVycm9yIG1lc3NhZ2Ugd2l0aCBvbmxpbmUgZG9jIGxpbmsgbGlrZSBuZyBlcnJvcnNcbiAgICAgICAgICAgICAgICAgICAgZGVmZXJyZWQucmVqZWN0KCdkaXJlY3RpdmUuYm9zc3lGb3JtOiBHRVQgcmVxdWVzdCB0byB1cmwgXCInICsgZGF0YSArICdcIiBmYWlsZWQgd2l0aCBzdGF0dXMgXCInICsgc3RhdHVzICsgJ1wiJyk7XG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIHJldHVybiBkZWZlcnJlZC5wcm9taXNlO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgQG5nZG9jIG1ldGhvZFxuICAgICAgICAgICAgQG5hbWUgZ2V0RGF0YVxuICAgICAgICAgICAgQG1ldGhvZE9mICRkYXRhXG4gICAgICAgICAgICBAcGFyYW0ge3N0cmluZyxvYmplY3QsZnVuY3Rpb259IGRhdGEgSWYgZGF0YSBpcyBhIHN0cmluZywgaXQgd2lsbCBiZSB0cmVhdGVkIGFzIGEgdXJsIHRvIHJldHJpZXZlIGRhdGEgZnJvbS4gSWYgZGF0YSBpcyBhbiBvYmplY3QgaXQgd2lsbCBiZSBpbW1lZGlhdGVseSByZXR1cm5lZC4gSWYgZGF0YSBpcyBhIGZ1bmN0aW9uLCB0aGUgZnVuY3Rpb24gd2lsbCBiZSBjYWxsZWQgYW5kIHByb2Nlc3NlZCB1bnRpbCBhbiBvYmplY3QgaXMgcHJvZHVjZWRcbiAgICAgICAgICAgIEByZXR1cm5zIHtPYmplY3R9IEVpdGhlciBhICRxIHByb21pc2UsIGEgZGF0YSBvYmplY3Qgb3IgYSBzdHJpbmcuXG4gICAgICAgICAgICAqL1xuICAgICAgICAgICAgZ2V0RGF0YTogX2dldERhdGFcbiAgICAgICAgfTtcbiAgICB9XSlcbjtcbiIsImFuZ3VsYXIubW9kdWxlKCdib3NzeS5kYXRhZ3JpZCcsIFtdKVxuXHQuY29udHJvbGxlcignRGF0YUdyaWRDb250cm9sbGVyJywgWyckc2NvcGUnLCBmdW5jdGlvbigkc2NvcGUpe1xuXG5cdFx0dmFyIG51bWJlckNvbXBhcmUgPSBmdW5jdGlvbihhLCBiKSB7XG5cdFx0XHR2YXIgcmVzdWx0ID0gMDtcblx0XHRcdGlmIChhIDwgYikge1xuXHRcdFx0XHRyZXN1bHQgPSAtMTtcblx0XHRcdH0gZWxzZSBpZiAoYSA+IGIpIHtcblx0XHRcdFx0cmVzdWx0ID0gMTtcblx0XHRcdH1cblx0XHRcdHJldHVybiByZXN1bHQ7XG5cdFx0fTtcblxuXHRcdHZhciBzdHJpbmdDb21wYXJlID0gZnVuY3Rpb24oYSwgYikge1xuXHRcdFx0Ly8gdG9Mb3dlckNhc2UgbmVlZGVkIHRvIHN1cHBvcnQgYWxsIGJyb3dzZXJzXG5cdFx0XHRyZXR1cm4gYS50b0xvd2VyQ2FzZSgpLmxvY2FsZUNvbXBhcmUoYi50b0xvd2VyQ2FzZSgpKTtcblx0XHR9O1xuXG5cdFx0dmFyIGZvcm1hdHRlZE51bWJlckNvbXBhcmUgPSBmdW5jdGlvbihhLCBiKSB7XG5cdFx0XHQvLyBzdHJpcCBub24tbnVtZXJpYyBjaGFyYWN0ZXJzLCBhbmQgY29udmVydCB0byBudW1iZXIgd2l0aCB1bmFyeSBwbHVzXG5cdFx0XHRhID0gK2EucmVwbGFjZSgvW15cXGQuLV0vZ2ksICcnKTtcblx0XHRcdGIgPSArYi5yZXBsYWNlKC9bXlxcZC4tXS9naSwgJycpO1xuXHRcdFx0cmV0dXJuIG51bWJlckNvbXBhcmUoYSwgYik7XG5cdFx0fTtcblxuXHRcdHZhciBjb2x1bW5Db21wYXJlID0gZnVuY3Rpb24oYSwgYiwgY29sdW1uSW5kZXgpe1xuXHRcdFx0dmFyIGNvbHVtblR5cGUgPSAkc2NvcGUuY29uZmlnLmRhdGEuY29sdW1uc1tjb2x1bW5JbmRleF0udHlwZSxcblx0XHRcdFx0cmVzdWx0ID0gMDtcblx0XHRcdGlmIChjb2x1bW5UeXBlID09PSAnbnVtYmVyJykge1xuXHRcdFx0XHRyZXN1bHQgPSBudW1iZXJDb21wYXJlKGFbY29sdW1uSW5kZXhdLCBiW2NvbHVtbkluZGV4XSk7XG5cdFx0XHR9IGVsc2UgaWYgKGNvbHVtblR5cGUgPT09ICdzdHJpbmcnKSB7XG5cdFx0XHRcdHJlc3VsdCA9IHN0cmluZ0NvbXBhcmUoYVtjb2x1bW5JbmRleF0sIGJbY29sdW1uSW5kZXhdKTtcblx0XHRcdH0gZWxzZSBpZiAoY29sdW1uVHlwZSA9PT0gJ21vbmV5Jykge1xuXHRcdFx0XHRyZXN1bHQgPSBmb3JtYXR0ZWROdW1iZXJDb21wYXJlKGFbY29sdW1uSW5kZXhdLCBiW2NvbHVtbkluZGV4XSk7XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gcmVzdWx0O1xuXHRcdH07XG5cblx0XHR2YXIgY2FsY3VsYXRlU29ydGRpcmVjdGlvbiA9IGZ1bmN0aW9uKGNvbHVtbkluZGV4KXtcblx0XHRcdC8vIDEgPSBhc2Mgb3IgIC0xID0gZGVzY1xuXHRcdFx0aWYgKCRzY29wZS5jb25maWcuZGF0YS5jb2x1bW5zW2NvbHVtbkluZGV4XS5zb3J0RGlyZWN0aW9uKSB7XG5cdFx0XHRcdCRzY29wZS5jb25maWcuZGF0YS5jb2x1bW5zW2NvbHVtbkluZGV4XS5zb3J0RGlyZWN0aW9uID0gLSRzY29wZS5jb25maWcuZGF0YS5jb2x1bW5zW2NvbHVtbkluZGV4XS5zb3J0RGlyZWN0aW9uO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0JHNjb3BlLmNvbmZpZy5kYXRhLmNvbHVtbnNbY29sdW1uSW5kZXhdLnNvcnREaXJlY3Rpb24gPSAxO1xuXHRcdFx0fVxuXG5cdFx0XHRyZXR1cm4gJHNjb3BlLmNvbmZpZy5kYXRhLmNvbHVtbnNbY29sdW1uSW5kZXhdLnNvcnREaXJlY3Rpb247XG5cdFx0fTtcblxuXHRcdCRzY29wZS5zb3J0Q29sdW1uID0gZnVuY3Rpb24oY29sdW1uSW5kZXgpIHtcblx0XHRcdHZhciBzb3J0RGlyZWN0aW9uID0gY2FsY3VsYXRlU29ydGRpcmVjdGlvbihjb2x1bW5JbmRleCk7XG5cblx0XHRcdCRzY29wZS5jb25maWcuZGF0YS5yb3dzID0gJHNjb3BlLmNvbmZpZy5kYXRhLnJvd3Muc29ydChmdW5jdGlvbihhLCBiKXtcblx0XHRcdFx0cmV0dXJuIHNvcnREaXJlY3Rpb24gKiBjb2x1bW5Db21wYXJlKGEsIGIsIGNvbHVtbkluZGV4KTtcblx0XHRcdH0pO1xuXHRcdH07XG5cdH1dKVxuXHQuZGlyZWN0aXZlKCdib3NzeURhdGFncmlkJywgW2Z1bmN0aW9uKClcblx0e1xuXHRcdHJldHVybiB7XG5cdFx0XHRyZXN0cmljdDogJ0VBJyxcblx0XHRcdHNjb3BlOiB7XG5cdFx0XHRcdGNvbmZpZzogJz0nXG5cdFx0XHR9LFxuXHRcdFx0dGVtcGxhdGVVcmw6ICdib3NzeS5kYXRhZ3JpZC5odG1sJyxcblx0XHRcdGNvbnRyb2xsZXI6ICdEYXRhR3JpZENvbnRyb2xsZXInXG5cdFx0fTtcblx0fV0pO1xuIiwiYW5ndWxhci5tb2R1bGUoJ2Jvc3N5LmRyb3Bkb3duJywgW10pXG5cdC5ydW4oZnVuY3Rpb24oJHRlbXBsYXRlQ2FjaGUpe1xuICAgICAgICAkdGVtcGxhdGVDYWNoZS5wdXQoJ2Jvc3N5LWRyb3Bkb3duLmh0bWwnLCAnPGRpdj48c2VsZWN0IG5nLW9wdGlvbnM9XCJpdGVtW2Ryb3Bkb3duLnRpdGxlXSBmb3IgaXRlbSBpbiBkcm9wZG93bi5pdGVtcyB8IG9yZGVyQnk6IGRyb3Bkb3duLnRpdGxlXCIgbmctbW9kZWw9XCJzZWxlY3RlZEl0ZW1cIiBuZy1jaGFuZ2U9XCJkcm9wZG93bi51cGRhdGVTZWxlY3RlZEl0ZW0oc2VsZWN0ZWRJdGVtKVwiPjxvcHRpb24gdmFsdWU9XCJcIiBuZy1oaWRlPVwic2VsZWN0ZWRJdGVtXCI+UGxlYXNlIHNlbGVjdCBvbmUuLi48L29wdGlvbj48L3NlbGVjdD48L2Rpdj4nKTtcbiAgICB9KVxuXHQuZGlyZWN0aXZlKCdib3NzeURyb3Bkb3duJywgZnVuY3Rpb24oJGh0dHAsICRjb21waWxlKSB7XG5cdFx0cmV0dXJuIHtcblx0XHRcdHJlc3RyaWN0OiAnRUEnLFxuXHRcdFx0c2NvcGU6IHtcblx0XHRcdFx0Y29uZmlnOiAnPScsXG5cdFx0XHRcdHNlbGVjdDogJz0nLFxuXHRcdFx0XHRpdGVtczogJz0nXG5cdFx0XHR9LFxuXHRcdFx0dGVtcGxhdGVVcmw6ICcnLFxuXHRcdFx0bGluazogZnVuY3Rpb24oc2NvcGUsIGVsZW1lbnQsIGF0dHJzKSB7XG5cdFx0XHRcdHZhciBjdXN0b21UZW1wbGF0ZTtcblxuXHRcdFx0XHQvL0NoZWNrcyBpZiB1c2VyIGlzIGRlZmluaW5nIGEgdXJsIG9yIGlubmVyIGh0bWxcblx0XHRcdFx0Ly9JZiBpdCBpcyBhIHVybCwgdGhlIHRlbXBsYXRlIG11c3QgYmUgbG9jYXRlZCBpbiBhIGxvY2FsIGRpcmVjdG9yeSBvciBhZGRlZCB0byB0aGUgRE9NIHZpYSBuZy1pbmNsdWRlXG5cdFx0XHRcdGlmKHNjb3BlLmRyb3Bkb3duLnRlbXBsYXRlWzBdICE9PSAnPCcpIHtcblx0XHRcdFx0XHRjdXN0b21UZW1wbGF0ZSA9ICRjb21waWxlKCc8bmctaW5jbHVkZSBzcmM9XCJkcm9wZG93bi50ZW1wbGF0ZVwiPjwvbmctaW5jbHVkZT4nKShzY29wZSk7XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0Y3VzdG9tVGVtcGxhdGUgPSAkY29tcGlsZShzY29wZS5kcm9wZG93bi50ZW1wbGF0ZSkoc2NvcGUpO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0Ly9JbmplY3RzIHRlbXBsYXRlXG5cdFx0XHRcdGVsZW1lbnQucmVwbGFjZVdpdGgoY3VzdG9tVGVtcGxhdGUpO1xuXHRcdFx0fSxcblx0XHRcdGNvbnRyb2xsZXI6IGZ1bmN0aW9uKCRzY29wZSkge1xuXHRcdFx0XHR2YXIgdGhpc0Ryb3Bkb3duID0gdGhpcztcblx0XHRcdFx0dGhpc0Ryb3Bkb3duLnRpdGxlID0gJHNjb3BlLmNvbmZpZy50aXRsZTtcblx0XHRcdFx0dGhpc0Ryb3Bkb3duLml0ZW1zID0gW107XG5cblx0XHRcdFx0Ly9SZXRyaWV2ZSBqc29uIGNvbnRhaW5pbmcgb2JqZWN0cyB0byBwb3B1bGF0ZSB0aGUgZHJvcGRvd24uXG5cdFx0XHRcdGlmKCRzY29wZS5jb25maWcuc3JjKSB7XG5cdFx0XHRcdFx0Ly9DaGVja3MgdGhhdCBjb25maWcuc3JjIGlzIGEgSlNPTiBmaWxlLlxuXHRcdFx0XHRcdGlmKCRzY29wZS5jb25maWcuc3JjLnN1YnN0cigkc2NvcGUuY29uZmlnLnNyYy5sZW5ndGgtNSwgJHNjb3BlLmNvbmZpZy5zcmMubGVuZ3RoKSA9PT0gJy5qc29uJykge1xuXHRcdFx0XHRcdFx0JGh0dHAuZ2V0KCRzY29wZS5jb25maWcuc3JjKVxuXHRcdFx0XHRcdFx0XHQuc3VjY2VzcyhmdW5jdGlvbihkYXRhKSB7XG5cdFx0XHRcdFx0XHRcdFx0dGhpc0Ryb3Bkb3duLml0ZW1zID0gZGF0YTtcblx0XHRcdFx0XHRcdFx0XHQvL0NoZWNrcyB2YWxpZGl0eSBvZiB0aGUgdGl0bGUgZmllbGQgYXMgaXQgYXBwbGllcyB0byB0aGUgSlNPTi5cblx0XHRcdFx0XHRcdFx0XHRpZighdGhpc0Ryb3Bkb3duLml0ZW1zWzBdLmhhc093blByb3BlcnR5KHRoaXNEcm9wZG93bi50aXRsZSkpIHtcblx0XHRcdFx0XHRcdFx0XHRcdGNvbnNvbGUuZXJyb3IoJ0VSUk9SOiAkc2NvcGUuY29uZmlnLnRpdGxlOiBcIicgKyAkc2NvcGUuY29uZmlnLnRpdGxlICsgJ1wiIGlzIG5vdCBhIG1lbWJlciBvZiB0aGUgbG9hZGVkIEpTT04gZGF0YS4gUGxlYXNlIHNwZWNpZnkgYSB2YWxpZCBcInRpdGxlXCIgdG8gbGlzdC4nKTtcblx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdFx0Ly9BdHRhY2hlcyByZXRyaWV2ZWQgaXRlbXMgdG8gJHNjb3BlLml0ZW1zIGZvciBhZGRpdGlvbmFsIGZ1bmN0aW9uYWxpdHkuXG5cdFx0XHRcdFx0XHRcdFx0aWYoJHNjb3BlLml0ZW1zKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHQkc2NvcGUuaXRlbXMgPSB0aGlzRHJvcGRvd24uaXRlbXM7XG5cdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHR9KVxuXHRcdFx0XHRcdFx0XHQuZXJyb3IoZnVuY3Rpb24oZGF0YSkge1xuXHRcdFx0XHRcdFx0XHRcdGNvbnNvbGUuZXJyb3IoJ0VSUk9SOiBGYWlsIHRvIGxvYWQgSlNPTiBkYXRhIGZyb20gdGhlIHBhdGg6IFwiJyArICRzY29wZS5jb25maWcuc3JjICsgJ1wiJyk7XG5cdFx0XHRcdFx0XHRcdH0pO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHQvL0xvZ3MgYW4gZXJyb3IgdG8gaWRlbnRpZnkgdGhhdCBhIGpzb24gZmlsZSB3YXMgbm90IGxvYWRlZC5cblx0XHRcdFx0XHRlbHNlIHtcblx0XHRcdFx0XHRcdGNvbnNvbGUuZXJyb3IoJ0VSUk9SOiBcIiRzY29wZS5jb25maWcuc3JjXCI6IFwiJyArICRzY29wZS5jb25maWcuc3JjICsgJ1wiIGlzIG5vdCBhIHZhbGlkIEpTT04gZmlsZS4nKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0Ly9GdW5jdGlvbiBjYWxsZWQgdG8gdXBkYXRlIHNlbGVjdCBpbiB0aGUgdGVtcGxhdGUuXG5cdFx0XHRcdFx0dGhpc0Ryb3Bkb3duLnVwZGF0ZVNlbGVjdGVkSXRlbSA9IGZ1bmN0aW9uKHNlbGVjdGVkSXRlbSkge1xuXHRcdFx0XHRcdFx0Ly9TaW5nbGUgc2VsZWN0IG9iamVjdCB0aWVkIHRvIHRoZSBjb25maWcgb2JqZWN0LlxuXHRcdFx0XHRcdFx0aWYgKCRzY29wZS5jb25maWcuc2VsZWN0KSB7XG5cdFx0XHRcdFx0XHRcdCRzY29wZS5jb25maWcuc2VsZWN0ID0gc2VsZWN0ZWRJdGVtO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0Ly9Vc2VyIGNhbiBjb2xsZWN0IGFuZCB1dGlsaXplIG11bHRpcGxlIHNlbGVjdCBvYmplY3RzIHdpdGggdGhlIHNhbWUgY29uZmlnIG9iamVjdCBpZiBwYXNzaW5nIGluIGEgZGlzdGluY3Qgc2VsZWN0IHBhcmFtLlxuXHRcdFx0XHRcdFx0aWYgKCRzY29wZS5zZWxlY3QpIHtcblx0XHRcdFx0XHRcdFx0JHNjb3BlLnNlbGVjdCA9IHNlbGVjdGVkSXRlbTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9O1xuXHRcdFx0XHRcdC8vRGV0ZXJtaW5lIGlmIGN1c3RvbSB0ZW1wbGF0ZSBVcmwgaGFzIGJlZW4gZGVmaW5lZC5cblx0XHRcdFx0XHRpZiAoJHNjb3BlLmNvbmZpZy50ZW1wbGF0ZSkge1xuXHRcdFx0XHRcdFx0dGhpc0Ryb3Bkb3duLnRlbXBsYXRlID0gJHNjb3BlLmNvbmZpZy50ZW1wbGF0ZTtcblx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0dGhpc0Ryb3Bkb3duLnRlbXBsYXRlID0gJ2Jvc3N5LWRyb3Bkb3duLmh0bWwnO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0XHQvL0xvZ3MgYW4gZXJyb3IgaWYgJ3NyYycgaGFzIG5vdCBiZWVuIGRlZmluZWQuXG5cdFx0XHRcdGVsc2Uge1xuXHRcdFx0XHRcdGNvbnNvbGUuZXJyb3IoJ0VSUk9SOiBcIiRzY29wZS5jb25maWcuc3JjXCIgaGFzIG5vdCBiZWVuIHNwZWNpZmllZCB3aXRoaW4gdGhlIFwiY29uZmlnXCIgb2JqZWN0LiBQbGVhc2UgcGFzcyBpbiBhIHZhbGlkIHBhdGggdG8gYSBKU09OIGZpbGUuJyk7XG5cdFx0XHRcdH1cblx0XHRcdH0sXG5cdFx0XHRjb250cm9sbGVyQXM6ICdkcm9wZG93bidcblx0XHR9O1xuXHR9KTtcbiIsImFuZ3VsYXIubW9kdWxlKCdib3NzeS5mb3JtJywgW10pXG4gICAgLnJ1bihmdW5jdGlvbigkdGVtcGxhdGVDYWNoZSl7XG4gICAgICAgICR0ZW1wbGF0ZUNhY2hlLnB1dCgnYm9zc3ktaW5wdXQuaHRtbCcsICd0ZW1wbGF0ZXMvYm9zc3ktaW5wdXQuaHRtbCcpO1xuICAgIH0pXG4gICAgLmRpcmVjdGl2ZSgnYm9zc3lGb3JtJyxbJyRjb21waWxlJywnJGh0dHAnLCckc2NoZW1hJywnJGRhdGEnLCBmdW5jdGlvbiAoJGNvbXBpbGUsICRodHRwLCAkc2NoZW1hLCAkZGF0YSkge1xuICAgICAgICB2YXIgX3NjaGVtYSxcbiAgICAgICAgICAgIF9kYXRhLFxuICAgICAgICAgICAgX29wdGlvbnMgPSB7XG4gICAgICAgICAgICAgICAgc2hvd0xhYmVsczogdHJ1ZSxcbiAgICAgICAgICAgICAgICBoZWFkZXI6ICdUaGlzIGlzIGhlYWRlcicsXG4gICAgICAgICAgICAgICAgZm9vdGVyOiAnVGhpcyBpcyBmb290ZXInLFxuICAgICAgICAgICAgICAgIHRoZW1lOiAnZ3JlZW4nLFxuICAgICAgICAgICAgICAgIGJ1dHRvbjogJ1NhdmUnXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgX2l0ZW1UZW1wbGF0ZSA9IHtcbiAgICAgICAgICAgICAgICBudW1iZXI6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuICc8aW5wdXQgdHlwZT1cIm51bWJlclwiLz4nO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgdGV4dDogZnVuY3Rpb24gKG9iaiwga2V5LCBpc1JlcXVpcmVkKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAnPGJvc3N5LWlucHV0IHRpdGxlPVwiXFwnJytvYmoudGl0bGUrJ1xcJ1wiIHR5cGU9XCJcXCcnKyBvYmouaW5wdXRUeXBlICsnXFwnXCIgdmFsdWU9XCJcXCcnK19kYXRhLmFkZHJlc3Nba2V5XSsnXFwnXCInICsgKCBpc1JlcXVpcmVkID8gJyByZXF1aXJlZCcgOiAnJyApICsgJz48L2Jvc3N5LWlucHV0Pic7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB0ZXh0QXJlYTogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gJzx0ZXh0YXJlYT48L3RleHRhcmVhPic7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBjaGVja2JveDogZnVuY3Rpb24ob2JqKXtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuICc8ZGl2IGNsYXNzPVwiY2hlY2tib3hcIj48bGFiZWw+PGlucHV0IHR5cGU9XCJjaGVja2JveFwiPicrb2JqLnRpdGxlKyc8L2xhYmVsPjwvZGl2Pic7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfTtcblxuICAgICAgICBmdW5jdGlvbiBzZXREYXRhKGRhdGEpIHtcbiAgICAgICAgICAgIHZhciByZXN1bHQgPSAkZGF0YS5nZXREYXRhKGRhdGEpO1xuICAgICAgICAgICAgaWYoIGFuZ3VsYXIuaXNGdW5jdGlvbiggcmVzdWx0LnRoZW4gKSAmJiBhbmd1bGFyLmlzRnVuY3Rpb24oIHJlc3VsdC5jYXRjaCApICYmIGFuZ3VsYXIuaXNGdW5jdGlvbiggcmVzdWx0LmZpbmFsbHkgKSApIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBfZGF0YSA9IHJlc3VsdDtcbiAgICAgICAgICAgIH1cblxuICAgICAgICB9XG5cbiAgICAgICAgZnVuY3Rpb24gc2V0U2NoZW1hKHNjaGVtYSkge1xuICAgICAgICAgICAgX3NjaGVtYSA9ICRzY2hlbWEuZ2V0U2NoZW1hKHNjaGVtYSk7XG4gICAgICAgIH1cblxuICAgICAgICBmdW5jdGlvbiBidWlsZFRlbXBsYXRlKHNjaGVtYVBhcnQsIHBhcmVudEtleSwgcmVxdWlyZWQpIHtcbiAgICAgICAgICAgIHZhciB0ZW1wbGF0ZSA9ICcnLFxuICAgICAgICAgICAgICAgIGZ1bGxLZXkgPSAnJztcbiAgICAgICAgICAgIGFuZ3VsYXIuZm9yRWFjaChzY2hlbWFQYXJ0LCBmdW5jdGlvbih2YWx1ZSwga2V5KSB7XG4gICAgICAgICAgICAgICAgaWYgKHZhbHVlLnR5cGUpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coZnVsbEtleSArICcgaXMgJysgdmFsdWUudHlwZSk7XG4gICAgICAgICAgICAgICAgICAgIHN3aXRjaCAodmFsdWUudHlwZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAnb2JqZWN0JzpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgcmVxdWlyZWRMaXN0ID0gdHlwZW9mKCB2YWx1ZS5yZXF1aXJlZCApICE9PSAndW5kZWZpbmVkJyA/IHZhbHVlLnJlcXVpcmVkIDogbnVsbDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0ZW1wbGF0ZSArPSBidWlsZFRlbXBsYXRlKHZhbHVlLnByb3BlcnRpZXMsIGZ1bGxLZXksIHJlcXVpcmVkTGlzdCApO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAnYXJyYXknOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlICs9IGJ1aWxkVGVtcGxhdGUodmFsdWUuaXRlbXMucHJvcGVydGllcywgZnVsbEtleSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlICdudW1iZXInIHx8ICdpbnRlZ2VyJzpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0ZW1wbGF0ZSArPSBfaXRlbVRlbXBsYXRlLm51bWJlcih2YWx1ZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlICdzdHJpbmcnOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBpc1JlcXVpcmVkID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYoIHJlcXVpcmVkICYmIHJlcXVpcmVkLmluZGV4T2Yoa2V5KSAhPT0gLTEgKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlzUmVxdWlyZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0ZW1wbGF0ZSArPSBfaXRlbVRlbXBsYXRlLnRleHQodmFsdWUsIGtleSwgaXNSZXF1aXJlZCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlICdib29sZWFuJzpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0ZW1wbGF0ZSArPSBfaXRlbVRlbXBsYXRlLmNoZWNrYm94KHZhbHVlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sIHRoaXMpO1xuICAgICAgICAgICAgcmV0dXJuIHRlbXBsYXRlO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHJlc3RyaWN0OiAnRScsXG4gICAgICAgICAgICByZXBsYWNlOiB0cnVlLFxuICAgICAgICAgICAgdGVtcGxhdGU6ICcnLFxuICAgICAgICAgICAgc2NvcGU6IHtcbiAgICAgICAgICAgICAgICBjb25maWc6Jz0nLCAvL0NyZWF0ZSBzY29wZSBpc29sYXRpb24gd2l0aCBiaS1kaXJlY3Rpb25hbCBiaW5kaW5nLFxuICAgICAgICAgICAgICAgIHRpdGxlOiAnPSdcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBsaW5rOiBmdW5jdGlvbiAoc2NvcGUsIGVsZW1lbnQsIGF0dHJpYnV0ZXMpIHtcbiAgICAgICAgICAgICAgICBzY29wZS5jb25maWcub3B0aW9ucyA9IGFuZ3VsYXIuZXh0ZW5kKF9vcHRpb25zLCBzY29wZS5jb25maWcub3B0aW9ucyk7XG5cbiAgICAgICAgICAgICAgICB2YXIgcHJvbWlzZSA9IHNldERhdGEoc2NvcGUuY29uZmlnLmRhdGEpO1xuICAgICAgICAgICAgICAgIHNldFNjaGVtYShzY29wZS5jb25maWcuc2NoZW1hKTtcbiAgICAgICAgICAgICAgICBpZiggcHJvbWlzZSApIHtcbiAgICAgICAgICAgICAgICAgICAgLy90b2RvOiBzZXQgZGlyZWN0aXZlIHRvIGxvYWRpbmcgc3RhdGVcbiAgICAgICAgICAgICAgICAgICAgcHJvbWlzZS50aGVuKFxuICAgICAgICAgICAgICAgICAgICAgICAgZnVuY3Rpb24ocmVzdWx0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy90b2RvOiBzZXQgZGlyZWN0aXZlIHRvIGxvYWRlZCBzdGF0ZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9kYXRhID0gcmVzdWx0O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsZW1lbnQuaHRtbChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJzxmb3JtIG5vdmFsaWRhdGUgY2xhc3M9XCJ7e2NvbmZpZy5vcHRpb25zLnRoZW1lfX1cIj4nK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnPGRpdiBjbGFzcz1cImJhbm5lciBwYWdlLWhlYWRlclwiPjxoMz57e2NvbmZpZy5vcHRpb25zLmhlYWRlcn19PC9oMz48L2Rpdj4nK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnVpbGRUZW1wbGF0ZShfc2NoZW1hKSArXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnPGJ1dHRvbiBuZy1pZj1cImNvbmZpZy5vcHRpb25zLmJ1dHRvblwiPnt7Y29uZmlnLm9wdGlvbnMuYnV0dG9ufX08L2J1dHRvbj4nICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJzxkaXYgY2xhc3M9XCJwYWdlLWZvb3RlclwiPjxoMz57e2NvbmZpZy5vcHRpb25zLmZvb3Rlcn19PC9oMz48L2Rpdj4nK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnPC9mb3JtPidcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICRjb21waWxlKGVsZW1lbnQuY29udGVudHMoKSkoc2NvcGUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGZ1bmN0aW9uKHJlYXNvbikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vdG9kbzogc2V0IGRpcmVjdGl2ZSB0byBlcnJvciBzdGF0ZVxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIGVsZW1lbnQuaHRtbChcbiAgICAgICAgICAgICAgICAgICAgICAgICc8Zm9ybSBub3ZhbGlkYXRlIGNsYXNzPVwie3tjb25maWcub3B0aW9ucy50aGVtZX19XCI+TE9BRElORy4uLjwvZm9ybT4nXG4gICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgICAgICRjb21waWxlKGVsZW1lbnQuY29udGVudHMoKSkoc2NvcGUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgZWxlbWVudC5odG1sKFxuICAgICAgICAgICAgICAgICAgICAgICAgJzxmb3JtIG5vdmFsaWRhdGUgY2xhc3M9XCJ7e2NvbmZpZy5vcHRpb25zLnRoZW1lfX1cIj4nK1xuICAgICAgICAgICAgICAgICAgICAgICAgJzxkaXYgY2xhc3M9XCJiYW5uZXIgcGFnZS1oZWFkZXJcIj48aDM+e3tjb25maWcub3B0aW9ucy5oZWFkZXJ9fTwvaDM+PC9kaXY+JytcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBidWlsZFRlbXBsYXRlKF9zY2hlbWEpICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAnPGJ1dHRvbiBuZy1pZj1cImNvbmZpZy5vcHRpb25zLmJ1dHRvblwiPnt7Y29uZmlnLm9wdGlvbnMuYnV0dG9ufX08L2J1dHRvbj4nICtcbiAgICAgICAgICAgICAgICAgICAgICAgICc8ZGl2IGNsYXNzPVwicGFnZS1mb290ZXJcIj48aDM+e3tjb25maWcub3B0aW9ucy5mb290ZXJ9fTwvaDM+PC9kaXY+JytcbiAgICAgICAgICAgICAgICAgICAgICAgICc8L2Zvcm0+J1xuICAgICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgICAgICAkY29tcGlsZShlbGVtZW50LmNvbnRlbnRzKCkpKHNjb3BlKTtcbiAgICAgICAgICAgICAgICB9XG5cblxuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuXG4gICAgfV0pXG47IiwiYW5ndWxhci5tb2R1bGUoJ2Jvc3N5LmlucHV0JywgW10pXG4gICAgLnJ1bihmdW5jdGlvbigkdGVtcGxhdGVDYWNoZSl7XG4gICAgICAgICR0ZW1wbGF0ZUNhY2hlLnB1dCgnYm9zc3ktaW5wdXQuaHRtbCcsICc8ZGl2IGNsYXNzPVwiZm9ybS1ncm91cCBib3NzeS1pbnB1dFwiPjxsYWJlbCBmb3I9XCJcIj57e3RpdGxlfX08L2xhYmVsPjxpbnB1dCB0eXBlPVwie3t0eXBlfX1cIiBjbGFzcz1cImZvcm0tY29udHJvbFwiIHBsYWNlaG9sZGVyPVwiXCIgdmFsdWU9XCJ7e3ZhbHVlfX1cIi8+PHNwYW4+PC9zcGFuPjwvZGl2PicpO1xuICAgIH0pXG4gICAgLmRpcmVjdGl2ZSgnYm9zc3lJbnB1dCcsWyckY29tcGlsZScsJyRodHRwJywnJHNjaGVtYScsJyRkYXRhJywnJHRlbXBsYXRlQ2FjaGUnLCBmdW5jdGlvbiAoJGNvbXBpbGUsICRodHRwLCAkc2NoZW1hLCAkZGF0YSwgJHRlbXBsYXRlQ2FjaGUpIHtcbiAgICBcdHJldHVybiB7XG5cdFx0XHRyZXN0cmljdDogJ0UnLFxuXHRcdFx0cmVwbGFjZTogdHJ1ZSxcblx0XHRcdHNjb3BlOiB7XG5cdFx0XHRcdHRpdGxlOiAnPScsXG5cdFx0XHRcdHZhbHVlOiAnPScsXG5cdFx0XHRcdHR5cGU6ICc9Jyxcblx0XHRcdFx0cmVxdWlyZWQ6ICc9J1xuXHRcdFx0fSxcblx0XHRcdHRlbXBsYXRlOiAkdGVtcGxhdGVDYWNoZS5nZXQoJ2Jvc3N5LWlucHV0Lmh0bWwnKVxuXHRcdH07XG4gICAgfV0pO1xuIiwidmFyIGFwcCA9IGFuZ3VsYXIubW9kdWxlKCdib3NzeS5udW1lcmljdGV4dGJveCcsW10pO1xuXG5cbmFwcC5jb250cm9sbGVyKCdib3NzeW51bWVyaWNDdHJsJyxmdW5jdGlvbigkc2NvcGUpe1xuICAgIHZhciBzeW1ib2xzPVsnJCcsJyUnLCdsYnMnXTtcbiAgICB2YXIgaW5pdGlhbFZhbHVlPTA7XG5cblxuICAgIHZhciBrZXkgPSB7XG4gICAgICAgIHByaWNlOjAsXG4gICAgICAgIHdlaWdodDowLFxuICAgICAgICBkaXNjb3VudDowLFxuICAgICAgICBzdG9jazowXG4gICAgfTtcblxuXG4gICAgJHNjb3BlLnAgPSBzeW1ib2xzWzBdICsgaW5pdGlhbFZhbHVlO1xuICAgICRzY29wZS53ID0gaW5pdGlhbFZhbHVlICsgc3ltYm9sc1syXTtcbiAgICAkc2NvcGUuZCA9IGluaXRpYWxWYWx1ZSArIHN5bWJvbHNbMV07XG4gICAgJHNjb3BlLnMgPSBpbml0aWFsVmFsdWU7XG5cbiAgICAkc2NvcGUuaW5jcmVtZW50ID0gZnVuY3Rpb24oYSl7XG4gICAgICAgIHN3aXRjaChhKXtcbiAgICAgICAgICAgIGNhc2UgJ3ByaWNlJzpcbiAgICAgICAgICAgICAgICBrZXkucHJpY2UrKztcbiAgICAgICAgICAgICAgICAkc2NvcGUucCA9IHN5bWJvbHNbMF0gKyBrZXkucHJpY2U7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICd3ZWlnaHQnOlxuICAgICAgICAgICAgICAgIGtleS53ZWlnaHQrKztcbiAgICAgICAgICAgICAgICAkc2NvcGUudz1rZXkud2VpZ2h0ICsgc3ltYm9sc1syXTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJ2Rpc2NvdW50JzpcbiAgICAgICAgICAgICAgICBrZXkuZGlzY291bnQrKztcbiAgICAgICAgICAgICAgICAkc2NvcGUuZCA9IGtleS5kaXNjb3VudCArIHN5bWJvbHNbMV07XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICdzdG9jayc6XG4gICAgICAgICAgICAgICAga2V5LnN0b2NrKys7XG4gICAgICAgICAgICAgICAgJHNjb3BlLnM9a2V5LnN0b2NrO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgIH07XG4gICAgJHNjb3BlLmRlY3JlbWVudCA9IGZ1bmN0aW9uKGEpe1xuXG4gICAgICAgIHN3aXRjaChhKXtcbiAgICAgICAgICAgIGNhc2UgJ3ByaWNlJzpcbiAgICAgICAgICAgICAgICBpZihrZXkucHJpY2U+MClcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIGtleS5wcmljZS0tO1xuICAgICAgICAgICAgICAgICAgICAkc2NvcGUucCA9IHN5bWJvbHNbMF0gKyBrZXkucHJpY2U7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAnd2VpZ2h0JzpcbiAgICAgICAgICAgICAgICBpZihrZXkud2VpZ2h0PjApe1xuICAgICAgICAgICAgICAgICAgICBrZXkud2VpZ2h0LS07XG4gICAgICAgICAgICAgICAgICAgICRzY29wZS53PWtleS53ZWlnaHQgKyBzeW1ib2xzWzJdO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJ2Rpc2NvdW50JzpcbiAgICAgICAgICAgICAgICBpZihrZXkuZGlzY291bnQ+MClcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIGtleS5kaXNjb3VudC0tO1xuICAgICAgICAgICAgICAgICAgICAkc2NvcGUuZCA9IGtleS5kaXNjb3VudCsgc3ltYm9sc1sxXTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICdzdG9jayc6XG4gICAgICAgICAgICAgICAgaWYoa2V5LnN0b2NrPjApe1xuICAgICAgICAgICAgICAgICAgICBrZXkuc3RvY2stLTtcbiAgICAgICAgICAgICAgICAgICAgJHNjb3BlLnM9a2V5LnN0b2NrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cblxuICAgIH07XG5cbn0pO1xuXG5cbmFwcC5kaXJlY3RpdmUoJ2Jvc3N5bnVtZXJpY3RleHRib3gnLGZ1bmN0aW9uKCl7XG4gICAgcmV0dXJue1xuICAgICAgICBjb250cm9sbGVyOidib3NzeW51bWVyaWNDdHJsJyxcbiAgICAgICAgcmVzdHJpY3Q6J0UnLFxuICAgICAgICB0cmFuc2NsdWRlOnRydWUsXG4gICAgICAgIHRlbXBsYXRlVXJsOidib3NzeS5udW1lcmljdGV4dGJveC5odG1sJ1xuXG4gICAgfTtcbn0pOyIsImFuZ3VsYXIubW9kdWxlKCdib3NzeS5zY2hlbWEnLCBbXSlcbiAgICAuZmFjdG9yeSgnJHNjaGVtYScsIFsnJHEnLCAnJGh0dHAnLCBmdW5jdGlvbiAoJHEsICRodHRwKSB7XG5cbiAgICAgICAgZnVuY3Rpb24gX2dldFNjaGVtYSAoc2NoZW1hKSB7XG4gICAgICAgICAgICBpZiAoYW5ndWxhci5pc1N0cmluZyhzY2hlbWEpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIF9nZXRSZW1vdGVTY2hlbWEoc2NoZW1hKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKGFuZ3VsYXIuaXNPYmplY3Qoc2NoZW1hKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBzY2hlbWE7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAvL1RPRE86IHJlcGxhY2UgZXJyb3IgbWVzc2FnZSB3aXRoIG9ubGluZSBkb2MgbGluayBsaWtlIG5nIGVycm9yc1xuICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ2RpcmVjdGl2ZS5ib3NzeUZvcm06IG5vIHNjaGVtYSB1cmwgb3Igb2JqZWN0IGdpdmVuJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBmdW5jdGlvbiBfZ2V0UmVtb3RlU2NoZW1hKHNjaGVtYSkge1xuICAgICAgICAgICAgdmFyIGRlZmVycmVkID0gJHEuZGVmZXIoKTtcblxuICAgICAgICAgICAgJGh0dHAuZ2V0KCBzY2hlbWEgKVxuICAgICAgICAgICAgICAgIC5zdWNjZXNzKCBmdW5jdGlvbiggZGF0YSApIHtcbiAgICAgICAgICAgICAgICAgICAgaWYoIGFuZ3VsYXIuaXNPYmplY3QoIGRhdGEgKSApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlc29sdmUoZGF0YSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvL1RPRE86IHJlcGxhY2UgZXJyb3IgbWVzc2FnZSB3aXRoIG9ubGluZSBkb2MgbGluayBsaWtlIG5nIGVycm9yc1xuICAgICAgICAgICAgICAgICAgICAgICAgZGVmZXJyZWQucmVqZWN0KCdkaXJlY3RpdmUuYm9zc3lGb3JtOiBHRVQgcmVxdWVzdCB0byB1cmwgZGlkIG5vdCBwcm9kdWNlIHNjaGVtYSBvYmplY3QnKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgLmVycm9yKCBmdW5jdGlvbihkYXRhLCBzdGF0dXMpIHtcbiAgICAgICAgICAgICAgICAgICAgLy9UT0RPOiByZXBsYWNlIGVycm9yIG1lc3NhZ2Ugd2l0aCBvbmxpbmUgZG9jIGxpbmsgbGlrZSBuZyBlcnJvcnNcbiAgICAgICAgICAgICAgICAgICAgZGVmZXJyZWQucmVqZWN0KCdkaXJlY3RpdmUuYm9zc3lGb3JtOiBHRVQgcmVxdWVzdCB0byB1cmwgXCInICsgc2NoZW1hICsgJ1wiIGZhaWxlZCB3aXRoIHN0YXR1cyBcIicgKyBzdGF0dXMgKyAnXCInKTtcbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgcmV0dXJuIGRlZmVycmVkLnByb21pc2U7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgZ2V0U2NoZW1hOiBfZ2V0U2NoZW1hXG4gICAgICAgIH07XG4gICAgfV0pXG47XG4iLCIvKlRoaXMgaXMgYSBzbGlkZXIgd2lkZ2V0IGNyZWF0ZWQgaW4gYW5ndWxhciBhcyBwYXJ0IG9mIHRoZSBCb3NzeVVJIHdpZGdldHMuXG4gKiBUaGUgZWFzaWVzdCB3YXkgdG8gdXNlIHRoZSBzbGlkZXIgaXMgdG8gaW5jbHVkZSBpdCBpbiB5b3VyIEhUTUwgYW5kIHRoZW5cbiAqIGNyZWF0ZSBhIHRhZyA8Ym9zc3ktc2xpZGVyPjwvYm9zc3ktc2xpZGVyPi4gVGhpcyB3aWRnZXQgdGFrZSBpbiBzZXZlcmFsXG4gKiB3YXlzIHRvIGN1c3RvbWl6ZS4gTGlzdCBvZiBjdXN0b21pemF0aW9ucyBhdmFpbGFibGUuXG4gKiBtYXggICAgICAgICAgICAgIGRlZmF1bHRzIHRvIDEwMFxuICogbWluICAgICAgICAgICAgICBkZWZhdWx0cyB0byAxXG4gKiB3aWR0aCAgICAgICAgICAgIGRlZmF1bHRzIHRvIDI1MHB4XG4gKiBiYXJmaWxsY29sb3IgICAgIGRlZmF1bHRzIHRvIGRhcmtibHVlOiBtdXN0IGJlIHBhc3NlZCBhcyBoZXhhZGVjaW1hbCBjb2xvciBmb3JtYXQgIzAwMDAwMFxuICogYmFyZW1wdHljb2xvciAgICBkZWZhdWx0cyB0byBsaWdodGdyZXlcbiAqIGJ1dHRvbmNvbG9yICAgICAgZGVmYXVsdHMgdG8gcmVkXG4gKiBzdGVwICAgICAgICAgICAgIGRlZmF1bHRzIHRvIHJlZFxuICogb3JpZW50YXRpb24gICAgICBkZWZhdWx0cyB0byBob3Jpem9udGFsXG4gKiBleC5cbiAqIDxib3NzeS1zbGlkZXIgbWF4PVwiMjBcIiBtaW49XCItNVwiIG9yaWVudGF0aW9uPVwidmVydGljYWxcIj48L2Jvc3N5LXNsaWRlcj4qL1xuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG5cbnZhciBhcHAgPSBhbmd1bGFyLm1vZHVsZSgnYm9zc3kuc2xpZGVyJywgW10pO1xuYXBwLmNvbnRyb2xsZXIoJ1NsaWRlckNvbnRyb2xsZXInLCBbJyRzY29wZScsIGZ1bmN0aW9uICgkc2NvcGUpIHtcbiAgICAvL3RoZXNlIGFyZSBvdXIgZGVmYXVsdCB2YWx1ZXMgYW5kIGFyZSB0aGUgdmFyaWFibGVzIHRoYXQgY2FuIGJlIGNoYW5nZWQgYnkgdXNlciBvZiBvdXIgd2lkZ2V0c1xuICAgICRzY29wZS5tYXggPSAxMDA7XG4gICAgJHNjb3BlLnZhbHVlID0gMDtcbiAgICAkc2NvcGUubWluID0gMTtcbiAgICAkc2NvcGUuZmlsbFdpZHRoID0gMDtcbiAgICAkc2NvcGUuZW1wdFdpZHRoID0gMDtcbiAgICAkc2NvcGUuYmFyV2lkdGggPSAyNTA7XG4gICAgJHNjb3BlLmJhclBpZWNlID0gMDtcbiAgICAkc2NvcGUuc3RlcCA9IDE7XG4gICAgJHNjb3BlLmlzTW91c2VEb3duID0gMDtcbiAgICAkc2NvcGUueUNvcmQgPSAwO1xuICAgICRzY29wZS54Q29yZCA9IDA7XG4gICAgJHNjb3BlLm5ld1hDb3JkID0gMDtcbiAgICAkc2NvcGUubmV3WUNvcmQgPSAwO1xuICAgICRzY29wZS5vcmllbnRhdGlvbiA9IGZhbHNlO1xuICAgICRzY29wZS5idXRTaXplID0gMTU7XG4gICAgJHNjb3BlLmJhcmZpbGxjb2xvciA9ICcjMDAwMEZGJztcbiAgICAkc2NvcGUuYmFyZW1wdHljb2xvciA9ICcjRDNEM0QzJztcbiAgICAkc2NvcGUuYnV0dG9uY29sb3IgPSAnI0ZGMDAwMCc7XG5cblxuICAgIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuXG4gICAgLyptYWtlQmFyKClcbiAgICAgKiBUaGlzIGNyZWF0ZXMgdGhlIGluaXRpYWwgZ3JhcGhpYyBvZiB0aGUgc2xpZGVyIGFuZCBlbnN1cmVzIGl0IGlzIGluIHRoZSBjb3JyZWN0IG9yZGVyXG4gICAgICogQ0MgPSA0ICovXG4gICAgJHNjb3BlLm1ha2VCYXIgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIC8vYnV0dG9uIHNob3VsZCBzaG93IHVwIGluIHRoZSBtaWRkbGUgbm93IG9yIGNsb3NlIHRvIGlmIHVuZXZlblxuICAgICAgICAkc2NvcGUudmFsdWUgPSBwYXJzZUludCgoJHNjb3BlLm1heCArICRzY29wZS5taW4pIC8gMik7XG4gICAgICAgIGZvciAodmFyIGN1cnJlbnQgPSAkc2NvcGUubWluOyBjdXJyZW50IDw9ICRzY29wZS5tYXg7IGN1cnJlbnQrKykge1xuICAgICAgICAgICAgaWYgKGN1cnJlbnQgPCAkc2NvcGUudmFsdWUpIHtcbiAgICAgICAgICAgICAgICAkc2NvcGUuZmlsbFdpZHRoKys7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoY3VycmVudCA+ICRzY29wZS52YWx1ZSkge1xuICAgICAgICAgICAgICAgICRzY29wZS5lbXB0V2lkdGgrKztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICAkc2NvcGUubmdNb2RlbCA9ICRzY29wZS52YWx1ZTtcbiAgICAgICAgcmV0dXJuO1xuICAgIH07XG4gICAgLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG5cbiAgICAvKmluY3JlYXNlKClcbiAgICAgKiBUaGlzIGNoZWNrcyBib3VuZHMgd2hlbiBhdHRlbXB0aW5nIHRvIGluY3JlYXNlIHRoZSB2YWx1ZSBhbmQgbW92ZXMgdGhlIHBvc2l0aW9uXG4gICAgICogb2YgdGhlIHNsaWRlciBidXR0b24gYW5kIHVwZGF0ZXMgdGhlIHZhbHVlLlxuICAgICAqIENDID0gMiovXG4gICAgJHNjb3BlLmluY3JlYXNlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAoJHNjb3BlLnZhbHVlIDwgJHNjb3BlLm1heCkge1xuICAgICAgICAgICAgJHNjb3BlLnZhbHVlID0gJHNjb3BlLnZhbHVlICsgMTtcbiAgICAgICAgICAgICRzY29wZS5maWxsV2lkdGgrKztcbiAgICAgICAgICAgICRzY29wZS5lbXB0V2lkdGgtLTtcbiAgICAgICAgICAgICRzY29wZS5uZ01vZGVsID0gJHNjb3BlLnZhbHVlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybjtcbiAgICB9O1xuICAgIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuXG4gICAgLypidXRJbmNyZWFzZSgpXG4gICAgICogVGhpcyBmdW5jdGlvbiBhbGxvd3MgdGhlIHNsaWRlciB0byBpbmNyZWFzZSBpbiBpbmNyZW1lbnRzLlxuICAgICAqIENDID0gMSovXG4gICAgJHNjb3BlLmJ1dEluY3JlYXNlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgaSA9IDA7XG4gICAgICAgIGZvciAoaSA9IDA7IGkgPCAkc2NvcGUuc3RlcDsgaSsrKSB7XG4gICAgICAgICAgICAkc2NvcGUuaW5jcmVhc2UoKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm47XG4gICAgfTtcbiAgICAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cblxuICAgIC8qZGVjcmVhc2UoKVxuICAgICAqIFRoaXMgY2hlY2tzIGJvdW5kcyB3aGVuIGF0dGVtcHRpbmcgdG8gZGVjcmVhc2UgdGhlIHZhbHVlIGFuZCBtb3ZlcyB0aGUgcG9zaXRpb25cbiAgICAgKiBvZiB0aGUgc2xpZGVyIGJ1dHRvbiBhbmQgdXBkYXRlcyB0aGUgdmFsdWUuXG4gICAgICogQ0MgPSAyKi9cbiAgICAkc2NvcGUuZGVjcmVhc2UgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmICgkc2NvcGUudmFsdWUgPiAkc2NvcGUubWluKSB7XG4gICAgICAgICAgICAkc2NvcGUudmFsdWUgPSAkc2NvcGUudmFsdWUgLSAxO1xuICAgICAgICAgICAgJHNjb3BlLmZpbGxXaWR0aC0tO1xuICAgICAgICAgICAgJHNjb3BlLmVtcHRXaWR0aCsrO1xuICAgICAgICAgICAgJHNjb3BlLm5nTW9kZWwgPSAkc2NvcGUudmFsdWU7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuO1xuICAgIH07XG4gICAgLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG5cbiAgICAvKmJ1dERlY3JlYXNlKClcbiAgICAgKiBUaGlzIGZ1bmN0aW9uIGFsbG93cyB0aGUgc2xpZGVyIHRvIGRlY3JlYXNlIGluIGluY3JlbWVudHNcbiAgICAgKiBDQyA9IDEqL1xuICAgICRzY29wZS5idXREZWNyZWFzZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGkgPSAwO1xuICAgICAgICBmb3IgKGkgPSAwOyBpIDwgJHNjb3BlLnN0ZXA7IGkrKykge1xuICAgICAgICAgICAgJHNjb3BlLmRlY3JlYXNlKCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuO1xuICAgIH07XG4gICAgLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG5cbiAgICAvKmtleUJpbmQoJGV2ZW50KVxuICAgICAqIFRoaXMgZnVuY3Rpb24gaXMgdG8gYmluZCB0aGUgZGVjcmVhc2UgYW5kIGluY3JlYXNlIGZ1bmN0aW9uIHdpdGggdGhlIGFycm93IGtleXNcbiAgICAgKiBDQyA9IDUqL1xuICAgICRzY29wZS5rZXlCaW5kID0gZnVuY3Rpb24gKGV2KSB7XG4gICAgICAgICRzY29wZS5wcmVzc2VkID0gZXYud2hpY2g7XG4gICAgICAgIC8vSWYgYXJyb3cga2V5KExlZnQgb3IgRG93bikgaXMgcHJlc3NlZCB0aGVuIGNhbGwgdGhlIGRlY3JlYXNlKCkgZnVuY3Rpb24gdG8gZGVjcmVhc2UgdGhlIHZhbHVlLlxuICAgICAgICBpZiAoJHNjb3BlLnByZXNzZWQgPT09IDM3IHx8ICRzY29wZS5wcmVzc2VkID09PSA0MCkge1xuICAgICAgICAgICAgJHNjb3BlLmJ1dERlY3JlYXNlKCk7XG5cbiAgICAgICAgfVxuICAgICAgICAvL3NhbWUgYXMgYWJvdmUgYnV0IGZvciBVcCBvciBSaWdodCB0byBpbmNyZWFzZSB0aGUgdmFsdWUuXG4gICAgICAgIGlmICgkc2NvcGUucHJlc3NlZCA9PT0gMzggfHwgJHNjb3BlLnByZXNzZWQgPT09IDM5KSB7XG4gICAgICAgICAgICAkc2NvcGUuYnV0SW5jcmVhc2UoKTtcblxuICAgICAgICB9XG4gICAgICAgIHJldHVybjtcbiAgICB9O1xuICAgIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuXG4gICAgLypncmV5Q2xpY2soKVxuICAgICAqIFRoaXMgZnVuY3Rpb24gaXMgdG8gYWxsb3cgdGhlIHZhbHVlIHRvIGJlIGNoYW5nZWQgd2hlbiBjbGlja2luZyBvbiB0aGUgYmFyXG4gICAgICogQ0MgPSAxKi9cbiAgICAkc2NvcGUuZ3JleUNsaWNrID0gZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgIC8vV2hlbiBjbGljayBvbiB0aGUgZW1wdHkgYmFyIHRoZSBiYXIgd2lsbCBpbmNyZWFzZVxuICAgICAgICAkc2NvcGUuYnV0SW5jcmVhc2UoKTtcblxuICAgICAgICByZXR1cm47XG4gICAgfTtcbiAgICAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cblxuICAgIC8qYmFyQ2xpY2soKVxuICAgICAqIFRoaXMgZnVuY3Rpb24gaXMgdG8gYWxsb3cgdGhlIHZhbHVlIHRvIGJlIGNoYW5nZWQgd2hlbiBjbGlja2luZyBvbiB0aGUgYmFyXG4gICAgICogQ0MgPSAxKi9cbiAgICAkc2NvcGUuYmFyQ2xpY2sgPSBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgICAgLy9XaGVuIGNsaWNrIG9uIHRoZSBGaWxsZWQgdXAgY29sb3Igc2lkZSB0aGUgYmFyIHdpbGwgZGVjcmVhc2VcbiAgICAgICAgJHNjb3BlLmJ1dERlY3JlYXNlKCk7XG5cbiAgICAgICAgcmV0dXJuO1xuICAgIH07XG4gICAgLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG5cbiAgICAvKmRyYWcoJGV2ZW50KVxuICAgICAqIFRoaXMgZnVuY3Rpb24gYWxsb3dzIHRoZSBidXR0b24gdG8gZHJhZyBieSBmaW5kaW5nIGl0cyBsb2NhdGlvbiB0aGVuIGNoZWNrcyBpdCBhZ2FpbnN0IGl0cyBvcmlnaW5hbCBsb2NhdGlvblxuICAgICAqIGFuZCBpZiBpdCBpcyBkaXN0YW5jZSBpcyBncmVhdGVyIHRoYW4gdGhlIHNpemUgb2YgYSBiYXJwaWVjZSB1cGRhdGUgdGhlIGdyYXBoaWMgYW5kIHZhbHVlXG4gICAgICogQ0MgPSA5Ki9cbiAgICAkc2NvcGUuZHJhZyA9IGZ1bmN0aW9uIChldmVudCkge1xuXG4gICAgICAgIC8vZ3JhYiB0aGUgbW91c2UgbG9jYXRpb25cbiAgICAgICAgdmFyIHggPSBldmVudC5jbGllbnRYO1xuICAgICAgICB2YXIgeSA9IGV2ZW50LmNsaWVudFk7XG4gICAgICAgIC8vY2hlY2sgaWYgdGhlIG1vdXNlIGlzIGJlaW5nIGhlbGQgZG93blxuICAgICAgICBpZiAoJHNjb3BlLmlzTW91c2VEb3duKSB7XG4gICAgICAgICAgICAvL2NoZWNrIHRoZSBvcmllbnRhdGlvblxuICAgICAgICAgICAgaWYgKCRzY29wZS5vcmllbnRhdGlvbikge1xuICAgICAgICAgICAgICAgIC8vaWYgdGhpcyBpcyB0aGUgZmlyc3QgdGltZSB5b3UgY2xpY2tlZCBkb3duIGdldCByZWFkeSB0byBtb3ZlIGl0XG4gICAgICAgICAgICAgICAgaWYgKCRzY29wZS55Q29yZCA9PT0gMCkge1xuICAgICAgICAgICAgICAgICAgICAkc2NvcGUueUNvcmQgPSB5O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgLy9jaGFuZ2UgdGhlIGxvY2F0aW9uIG9mIHRoZSBzbGlkZXIgYWZ0ZXIgZW5vdWdoIG1vdmVtZW50XG4gICAgICAgICAgICAgICAgICAgICRzY29wZS5uZXdZQ29yZCA9IHk7XG4gICAgICAgICAgICAgICAgICAgIHdoaWxlICgoJHNjb3BlLm5ld1lDb3JkIC0gJHNjb3BlLnlDb3JkKSA+ICRzY29wZS5iYXJQaWVjZSAvIDIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICRzY29wZS55Q29yZCArPSAkc2NvcGUuYmFyUGllY2U7XG4gICAgICAgICAgICAgICAgICAgICAgICAkc2NvcGUuZGVjcmVhc2UoKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB3aGlsZSAoKCRzY29wZS5uZXdZQ29yZCAtICRzY29wZS55Q29yZCkgPCAtKCRzY29wZS5iYXJQaWVjZSAvIDIpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAkc2NvcGUueUNvcmQgLT0gJHNjb3BlLmJhclBpZWNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgJHNjb3BlLmluY3JlYXNlKCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAvL2lmIHRoaXMgaXMgdGhlIGZpcnN0IHRpbWUgeW91IGNsaWNrZWQgZG93biBnZXQgcmVhZHkgdG8gbW92ZSBpdFxuICAgICAgICAgICAgICAgIGlmICgkc2NvcGUueENvcmQgPT09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgJHNjb3BlLnhDb3JkID0geDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIC8vY2hhbmdlIHRoZSBsb2NhdGlvbiBvZiB0aGUgc2xpZGVyIGFmdGVyIGVub3VnaCBtb3ZlbWVudFxuICAgICAgICAgICAgICAgICAgICAkc2NvcGUubmV3WENvcmQgPSB4O1xuICAgICAgICAgICAgICAgICAgICB3aGlsZSAoKCRzY29wZS5uZXdYQ29yZCAtICRzY29wZS54Q29yZCkgPiAkc2NvcGUuYmFyUGllY2UgLyAyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAkc2NvcGUueENvcmQgKz0gJHNjb3BlLmJhclBpZWNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgJHNjb3BlLmluY3JlYXNlKCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgd2hpbGUgKCgkc2NvcGUubmV3WENvcmQgLSAkc2NvcGUueENvcmQpIDwgLSgkc2NvcGUuYmFyUGllY2UgLyAyKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgJHNjb3BlLnhDb3JkIC09ICRzY29wZS5iYXJQaWVjZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICRzY29wZS5kZWNyZWFzZSgpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybjtcbiAgICB9O1xuICAgIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuXG4gICAgLypkb3duKClcbiAgICAgKiBUaGlzIGZ1bmN0aW9uIGxvZ3Mgd2hlbiB0aGUgbW91c2UgaXMgZG93blxuICAgICAqIENDID0gMSovXG4gICAgJHNjb3BlLmRvd24gPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICRzY29wZS5uZXdYQ29yZCA9IDA7XG4gICAgICAgICRzY29wZS54Q29yZCA9IDA7XG4gICAgICAgICRzY29wZS5uZXdZQ29yZCA9IDA7XG4gICAgICAgICRzY29wZS55Q29yZCA9IDA7XG4gICAgICAgICRzY29wZS5pc01vdXNlRG93biA9IDE7XG4gICAgICAgIHJldHVybjtcbiAgICB9O1xuICAgIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuXG4gICAgLypkb3duKClcbiAgICAgKiBUaGlzIGZ1bmN0aW9uIGxvZ3Mgd2hlbiB0aGUgbW91c2UgaXMgdXBcbiAgICAgKiBDQyA9IDEqL1xuICAgICRzY29wZS51cCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgJHNjb3BlLm5ld1hDb3JkID0gMDtcbiAgICAgICAgJHNjb3BlLnhDb3JkID0gMDtcbiAgICAgICAgJHNjb3BlLm5ld1lDb3JkID0gMDtcbiAgICAgICAgJHNjb3BlLnlDb3JkID0gMDtcbiAgICAgICAgJHNjb3BlLmlzTW91c2VEb3duID0gMDtcbiAgICAgICAgcmV0dXJuO1xuICAgIH07XG4gICAgLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG59XSk7XG5hcHAuZGlyZWN0aXZlKCdib3NzeVNsaWRlcicsIGZ1bmN0aW9uICgkY29tcGlsZSkge1xuICAgIHZhciBteVRlbXBsYXRlO1xuICAgIHJldHVybiB7XG4gICAgICAgIC8vYWxsb3dzIHRoZSBzbGlkZXIgdG8gYmUgY3JlYXRlZCBhcyBhbmQgYXR0cmlidXRlIG9yIGVsZW1lbnQgPGJvc3N5LXNsaWRlcj48Ym9zc3ktc2xpZGVyPlxuICAgICAgICByZXN0cmljdDogJ0FFJyxcbiAgICAgICAgY29udHJvbGxlcjogJ1NsaWRlckNvbnRyb2xsZXInLFxuICAgICAgICBzY29wZToge1xuICAgICAgICAgICAgbmdNb2RlbDogJz0nXG4gICAgICAgIH0sXG4gICAgICAgIC8qbGluazogZnVuY3Rpb246XG4gICAgICAgICAqIFRoaXMgYWxsb3dzIHVzIHRvIHB1bGwgaW4gdGhlIHNldHRpbmdzIHRoZSBwcm9ncmFtbWVyIHdhbnRzIGZvciB0aGUgc2xpZGVyIGFuZCBzZXQgdGhpbmdzIGNvcnJlY3RseVxuICAgICAgICAgKiBpdCBhbHNvIGluaXRpYWxpemVzIHRoZSBzbGlkZXIgYW5kIGFkZHMgdGhlIGNvcnJlY3Qgb3JpZW50YXRpb24gdGVtcGxhdGUgdG8gdGhlIERPTSovXG4gICAgICAgIGxpbms6IHtcbiAgICAgICAgICAgIHByZTogZnVuY3Rpb24gKHNjb3BlLCBpRWxlbSwgaUF0dHIpIHtcbiAgICAgICAgICAgICAgICB2YXIgcGF0dGVybiA9IC9eI1swLTlhLWZBLUZdezZ9JC87IC8vY3VycmVudGx5IGFjY2VwdHMgbG93ZXIgY2FzZSBhLWZcblxuICAgICAgICAgICAgICAgIC8vY2hlY2tzIHRvIHNlZSBpZiB0aGVyZSBpcyBhIG1heCBhdHRyaWJ1dGVcbiAgICAgICAgICAgICAgICBpZiAoaUF0dHIubWF4KSB7XG4gICAgICAgICAgICAgICAgICAgIHNjb3BlLm1heCA9IHBhcnNlSW50KGlBdHRyLm1heCk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChpc05hTihzY29wZS5tYXgpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzY29wZS5tYXggPSAxMDtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAvL2NoZWNrcyB0byBzZWUgaWYgdGhlcmUgaXMgYSBtaW4gYXR0cmlidXRlXG4gICAgICAgICAgICAgICAgaWYgKGlBdHRyLm1pbikge1xuICAgICAgICAgICAgICAgICAgICBzY29wZS5taW4gPSBwYXJzZUludChpQXR0ci5taW4pO1xuICAgICAgICAgICAgICAgICAgICBpZiAoaXNOYU4oc2NvcGUubWluKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgc2NvcGUubWluID0gMTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAvL2NoZWNrcyBmb3IgYmFyIGNvbG9yIGN1c3RvbWl6YXRpb25cbiAgICAgICAgICAgICAgICBpZiAoaUF0dHIuYmFyZmlsbGNvbG9yKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChwYXR0ZXJuLnRlc3QoaUF0dHIuYmFyZmlsbGNvbG9yKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgc2NvcGUuYmFyZmlsbGNvbG9yID0gaUF0dHIuYmFyZmlsbGNvbG9yO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIC8vY2hlY2tzIGZvciBlbXB0eSBiYXIgY29sb3IgY3VzdG9taXphdGlvblxuXG4gICAgICAgICAgICAgICAgaWYgKGlBdHRyLmJhcmVtcHR5Y29sb3IpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHBhdHRlcm4udGVzdChpQXR0ci5iYXJlbXB0eWNvbG9yKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgc2NvcGUuYmFyZW1wdHljb2xvciA9IGlBdHRyLmJhcmVtcHR5Y29sb3I7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG5cblxuICAgICAgICAgICAgICAgIGlmIChpQXR0ci5idXR0b25jb2xvcikge1xuICAgICAgICAgICAgICAgICAgICBpZiAocGF0dGVybi50ZXN0KGlBdHRyLmJ1dHRvbmNvbG9yKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgc2NvcGUuYnV0dG9uY29sb3IgPSBpQXR0ci5idXR0b25jb2xvcjtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAvL2ZpbmQgdGhlIHN0ZXAgc2l6ZSBmb3IgYnV0dG9uIGNsaWNrc1xuICAgICAgICAgICAgICAgIGlmIChpQXR0ci5zdGVwKSB7XG4gICAgICAgICAgICAgICAgICAgIHNjb3BlLnN0ZXAgPSBpQXR0ci5zdGVwO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAvL2ZpbmQgdGhlIHByZWZlcnJlZCB0b3RhbCB3aWR0aCB0byB1c2UgZm9yIHRoZSBzbGlkZXJcbiAgICAgICAgICAgICAgICBpZiAoaUF0dHIud2lkdGgpIHtcbiAgICAgICAgICAgICAgICAgICAgc2NvcGUuYmFyV2lkdGggPSBpQXR0ci53aWR0aDtcbiAgICAgICAgICAgICAgICAgICAgc2NvcGUuYmFyUGllY2UgPSAoc2NvcGUuYmFyV2lkdGggLyAoc2NvcGUubWF4IC0gc2NvcGUubWluKSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBzY29wZS5iYXJQaWVjZSA9IChzY29wZS5iYXJXaWR0aCAvIChzY29wZS5tYXggLSBzY29wZS5taW4pKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgLy9jaGVja3MgdG8gc2VlIGlmIHRoZXJlIGlzIGEgb3JpZW50YXRpb24gYXR0cmlidXRlIGlmIHRoZXJlIGlzIHNldCBvdXIgdGVtcGxhdGUgdG8gdGhlIHZlcnRpY2FsIHRlbXBsYXRlXG4gICAgICAgICAgICAgICAgaWYgKGlBdHRyLm9yaWVudGF0aW9uKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICgndmVydGljYWwnID09PSBpQXR0ci5vcmllbnRhdGlvbikge1xuICAgICAgICAgICAgICAgICAgICAgICAgc2NvcGUub3JpZW50YXRpb24gPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgbXlUZW1wbGF0ZSA9ICc8ZGl2IG9uc2VsZWN0c3RhcnQ9XCJyZXR1cm4gZmFsc2U7XCIgb25kcmFnc3RhcnQ9XCJyZXR1cm4gZmFsc2U7XCJuZy1tb3VzZWxlYXZlPVwidXAoKVwiIG5nLW1vdXNlbW92ZT1cImRyYWcoJGV2ZW50KVwiPicgK1xuICAgICAgICAgICAgICAgICAgICAgICAgJzxkaXYgbmctbW91c2Vtb3ZlPVwiZHJhZygkZXZlbnQpXCIgbmctbW91c2V1cD1cInVwKClcIiBuZy1jbGljaz1cImdyZXlDbGljaygpXCJzdHlsZT1cImN1cnNvcjpwb2ludGVyO21hcmdpbi1sZWZ0OjlweDt3aWR0aDo1cHg7aGVpZ2h0Ont7YmFyUGllY2UgKiBlbXB0V2lkdGh9fXB4O2JhY2tncm91bmQtY29sb3I6JyArIHNjb3BlLmJhcmVtcHR5Y29sb3IgKyAnO21hcmdpbi1ib3R0b206NHB4XCI+PC9kaXY+JyArXG4gICAgICAgICAgICAgICAgICAgICAgICAnPGRpdiBuZy1tb3VzZW1vdmU9XCJkcmFnKCRldmVudClcIiBuZy1tb3VzZWRvd249XCJkb3duKClcIiBuZy1tb3VzZXVwPVwidXAoKVwiIG9yaWVudGF0aW9uPVwidmVydGljYWxcIiBzdHlsZT1cImN1cnNvcjpucy1yZXNpemU7bWFyZ2luLXRvcDotNHB4O21hcmdpbi1sZWZ0OjVweDt3aWR0aDoxNXB4O2hlaWdodDoxNXB4O2JhY2tncm91bmQtY29sb3I6JyArIHNjb3BlLmJ1dHRvbmNvbG9yICsgJztib3JkZXItcmFkaXVzOjUwJTtcIj48L2Rpdj4nICtcbiAgICAgICAgICAgICAgICAgICAgICAgICc8ZGl2IG5nLW1vdXNlbW92ZT1cImRyYWcoJGV2ZW50KVwiIG5nLW1vdXNldXA9XCJ1cCgpXCIgbmctY2xpY2s9XCJiYXJDbGljaygpXCJzdHlsZT1cImN1cnNvcjpwb2ludGVyO21hcmdpbi1sZWZ0OjlweDt3aWR0aDo1cHg7aGVpZ2h0Ont7YmFyUGllY2UgKiBmaWxsV2lkdGh9fXB4O2JhY2tncm91bmQtY29sb3I6JyArIHNjb3BlLmJhcmZpbGxjb2xvciArICc7bWFyZ2luLWJvdHRvbTo0cHhcIj48L2Rpdj4nICtcbiAgICAgICAgICAgICAgICAgICAgICAgICc8L2Rpdj4nO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgbXlUZW1wbGF0ZSA9ICc8ZGl2IG9uc2VsZWN0c3RhcnQ9XCJyZXR1cm4gZmFsc2U7XCIgb25kcmFnc3RhcnQ9XCJyZXR1cm4gZmFsc2U7XCIgbmctbW91c2VsZWF2ZT1cInVwKClcIm5nLW1vdXNlbW92ZT1cImRyYWcoJGV2ZW50KVwiPicgK1xuICAgICAgICAgICAgICAgICAgICAgICAgJzxkaXYgbmctbW91c2Vtb3ZlPVwiZHJhZygkZXZlbnQpXCIgbmctbW91c2V1cD1cInVwKClcIiBuZy1jbGljaz1cImJhckNsaWNrKClcInN0eWxlPVwiY3Vyc29yOnBvaW50ZXI7ZGlzcGxheTppbmxpbmUtYmxvY2s7d2lkdGg6e3tiYXJQaWVjZSAqIGZpbGxXaWR0aH19cHg7aGVpZ2h0OjVweDtiYWNrZ3JvdW5kLWNvbG9yOicgKyBzY29wZS5iYXJmaWxsY29sb3IgKyAnO21hcmdpbi1ib3R0b206NHB4XCI+PC9kaXY+JyArXG4gICAgICAgICAgICAgICAgICAgICAgICAnPGRpdiBuZy1tb3VzZW1vdmU9XCJkcmFnKCRldmVudClcIiBuZy1tb3VzZWRvd249XCJkb3duKClcIiBuZy1tb3VzZXVwPVwidXAoKVwiIG9yaWVudGF0aW9uPVwiaG9yaXpvbnRhbFwiIHN0eWxlPVwiY3Vyc29yOmV3LXJlc2l6ZTtkaXNwbGF5OmlubGluZS1ibG9jazt3aWR0aDp7e2J1dFNpemV9fXB4O2hlaWdodDp7e2J1dFNpemV9fXB4O2JhY2tncm91bmQtY29sb3I6JyArIHNjb3BlLmJ1dHRvbmNvbG9yICsgJztib3JkZXItcmFkaXVzOjUwJTtcIj48L2Rpdj4nICtcbiAgICAgICAgICAgICAgICAgICAgICAgICc8ZGl2IG5nLW1vdXNlbW92ZT1cImRyYWcoJGV2ZW50KVwiIG5nLW1vdXNldXA9XCJ1cCgpXCIgbmctY2xpY2s9XCJncmV5Q2xpY2soKVwic3R5bGU9XCJjdXJzb3I6cG9pbnRlcjtkaXNwbGF5OmlubGluZS1ibG9jazt3aWR0aDp7e2JhclBpZWNlICogZW1wdFdpZHRofX1weDtoZWlnaHQ6NXB4O2JhY2tncm91bmQtY29sb3I6JyArIHNjb3BlLmJhcmVtcHR5Y29sb3IgKyAnO21hcmdpbi1ib3R0b206NHB4XCI+PC9kaXY+JyArXG4gICAgICAgICAgICAgICAgICAgICAgICAnPC9kaXY+JztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgLy90aGlzIGJ1aWxkcyBvdXIgaG9yaXpvbnRhbCB0ZW1wbGF0ZVxuICAgICAgICAgICAgICAgICAgICBteVRlbXBsYXRlID0gJzxkaXYgb25zZWxlY3RzdGFydD1cInJldHVybiBmYWxzZTtcIiBvbmRyYWdzdGFydD1cInJldHVybiBmYWxzZTtcIiBuZy1tb3VzZWxlYXZlPVwidXAoKVwibmctbW91c2Vtb3ZlPVwiZHJhZygkZXZlbnQpXCI+JyArXG4gICAgICAgICAgICAgICAgICAgICc8ZGl2IG5nLW1vdXNlbW92ZT1cImRyYWcoJGV2ZW50KVwiIG5nLW1vdXNldXA9XCJ1cCgpXCIgbmctY2xpY2s9XCJiYXJDbGljaygpXCJzdHlsZT1cImN1cnNvcjpwb2ludGVyO2Rpc3BsYXk6aW5saW5lLWJsb2NrO3dpZHRoOnt7YmFyUGllY2UgKiBmaWxsV2lkdGh9fXB4O2hlaWdodDo1cHg7YmFja2dyb3VuZC1jb2xvcjonICsgc2NvcGUuYmFyZmlsbGNvbG9yICsgJzttYXJnaW4tYm90dG9tOjRweFwiPjwvZGl2PicgK1xuICAgICAgICAgICAgICAgICAgICAnPGRpdiBuZy1tb3VzZW1vdmU9XCJkcmFnKCRldmVudClcIiBuZy1tb3VzZWRvd249XCJkb3duKClcIiBuZy1tb3VzZXVwPVwidXAoKVwiIG9yaWVudGF0aW9uPVwiaG9yaXpvbnRhbFwiIHN0eWxlPVwiY3Vyc29yOmV3LXJlc2l6ZTtkaXNwbGF5OmlubGluZS1ibG9jazt3aWR0aDp7e2J1dFNpemV9fXB4O2hlaWdodDp7e2J1dFNpemV9fXB4O2JhY2tncm91bmQtY29sb3I6JyArIHNjb3BlLmJ1dHRvbmNvbG9yICsgJztib3JkZXItcmFkaXVzOjUwJTtcIj48L2Rpdj4nICtcbiAgICAgICAgICAgICAgICAgICAgJzxkaXYgbmctbW91c2Vtb3ZlPVwiZHJhZygkZXZlbnQpXCIgbmctbW91c2V1cD1cInVwKClcIiBuZy1jbGljaz1cImdyZXlDbGljaygpXCJzdHlsZT1cImN1cnNvcjpwb2ludGVyO2Rpc3BsYXk6aW5saW5lLWJsb2NrO3dpZHRoOnt7YmFyUGllY2UgKiBlbXB0V2lkdGh9fXB4O2hlaWdodDo1cHg7YmFja2dyb3VuZC1jb2xvcjonICsgc2NvcGUuYmFyZW1wdHljb2xvciArICc7bWFyZ2luLWJvdHRvbTo0cHhcIj48L2Rpdj4nICtcbiAgICAgICAgICAgICAgICAgICAgJzwvZGl2Pic7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIC8vV2Ugc2hvdyBvdXIgdGVtcGxhdGUgYW5kIHRoZW4gY29tcGlsZSBpdCBzbyB0aGUgRE9NIGtub3dzIGFib3V0IG91ciBuZyBmdW5jdGlvbnNcbiAgICAgICAgICAgICAgICBpRWxlbS5odG1sKG15VGVtcGxhdGUpO1xuICAgICAgICAgICAgICAgICRjb21waWxlKGlFbGVtLmNvbnRlbnRzKCkpKHNjb3BlKTtcbiAgICAgICAgICAgICAgICAvL2NyZWF0ZSB0aGUgaW5pdGlhbCBiYXJcbiAgICAgICAgICAgICAgICBzY29wZS5tYWtlQmFyKCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfTtcbn0pO1xuXG4iLCJhbmd1bGFyLm1vZHVsZSgnYm9zc3kudG9vbHRpcCcsIFtdKVxuICAgIC5kaXJlY3RpdmUoJ2Jvc3N5VG9vbHRpcCcsIGZ1bmN0aW9uKCkge1xuXG4gICAgICAgIC8vIFByaXZhdGUgbWVtYmVyIGFycmF5IGNvbnRhaW5pbmcgYWxsIGtub3duIHBvc2l0aW9uc1xuICAgICAgICB2YXIgX3BvcyA9IFsnbicsJ25lJywnZScsJ3NlJywncycsJ3N3JywndycsJ253J107XG5cbiAgICAgICAgLy8gTW92ZSB0aGUgdGlwIHRvIGEgY2VydGFpbiBwb3NpdGlvblxuICAgICAgICBmdW5jdGlvbiBfbW92ZVRpcCgkcGFyZW50LCAkdGlwLCBjdXJQb3MpXG4gICAgICAgIHtcbiAgICAgICAgICAgIGlmKGN1clBvcyA9PT0gJ24nKVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICR0aXAuc3R5bGUubGVmdCA9ICRwYXJlbnQub2Zmc2V0TGVmdCArICgkcGFyZW50Lm9mZnNldFdpZHRoIC8gMikgLSAoJHRpcC5vZmZzZXRXaWR0aCAvIDIpICsgJ3B4JztcbiAgICAgICAgICAgICAgICAkdGlwLnN0eWxlLnRvcCA9ICRwYXJlbnQub2Zmc2V0VG9wIC0gJHRpcC5vZmZzZXRIZWlnaHQgKyAncHgnO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZihjdXJQb3MgPT09ICduZScpXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgJHRpcC5zdHlsZS5sZWZ0ID0gJHBhcmVudC5vZmZzZXRMZWZ0ICsgJHBhcmVudC5vZmZzZXRXaWR0aCArICdweCc7XG4gICAgICAgICAgICAgICAgJHRpcC5zdHlsZS50b3AgPSAkcGFyZW50Lm9mZnNldFRvcCAtICR0aXAub2Zmc2V0SGVpZ2h0ICsgJ3B4JztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYoY3VyUG9zID09PSAnZScpXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgJHRpcC5zdHlsZS5sZWZ0ID0gJHBhcmVudC5vZmZzZXRMZWZ0ICsgJHBhcmVudC5vZmZzZXRXaWR0aCArICdweCc7XG4gICAgICAgICAgICAgICAgJHRpcC5zdHlsZS50b3AgPSAkcGFyZW50Lm9mZnNldFRvcCArICgkcGFyZW50Lm9mZnNldEhlaWdodCAvIDIpIC0gKCR0aXAub2Zmc2V0SGVpZ2h0IC8gMikgKyAncHgnO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZihjdXJQb3MgPT09ICdzZScpXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgJHRpcC5zdHlsZS5sZWZ0ID0gJHBhcmVudC5vZmZzZXRMZWZ0ICsgJHBhcmVudC5vZmZzZXRXaWR0aCArICdweCc7XG4gICAgICAgICAgICAgICAgJHRpcC5zdHlsZS50b3AgPSAkcGFyZW50Lm9mZnNldFRvcCArICRwYXJlbnQub2Zmc2V0SGVpZ2h0ICsgJ3B4JztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYoY3VyUG9zID09PSAncycpXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgJHRpcC5zdHlsZS5sZWZ0ID0gJHBhcmVudC5vZmZzZXRMZWZ0ICsgKCRwYXJlbnQub2Zmc2V0V2lkdGggLyAyKSAtICgkdGlwLm9mZnNldFdpZHRoIC8gMikgKyAncHgnO1xuICAgICAgICAgICAgICAgICR0aXAuc3R5bGUudG9wID0gJHBhcmVudC5vZmZzZXRUb3AgKyAkcGFyZW50Lm9mZnNldEhlaWdodCArICdweCc7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmKGN1clBvcyA9PT0gJ3N3JylcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAkdGlwLnN0eWxlLmxlZnQgPSAkcGFyZW50Lm9mZnNldExlZnQgLSAkdGlwLm9mZnNldFdpZHRoICsgJ3B4JztcbiAgICAgICAgICAgICAgICAkdGlwLnN0eWxlLnRvcCA9ICRwYXJlbnQub2Zmc2V0VG9wICsgJHBhcmVudC5vZmZzZXRIZWlnaHQgKyAncHgnO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZihjdXJQb3MgPT09ICd3JylcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAkdGlwLnN0eWxlLmxlZnQgPSAkcGFyZW50Lm9mZnNldExlZnQgLSAkdGlwLm9mZnNldFdpZHRoICsgJ3B4JztcbiAgICAgICAgICAgICAgICAkdGlwLnN0eWxlLnRvcCA9ICRwYXJlbnQub2Zmc2V0VG9wICsgKCRwYXJlbnQub2Zmc2V0SGVpZ2h0IC8gMikgLSAoJHRpcC5vZmZzZXRIZWlnaHQgLyAyKSArICdweCc7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgJHRpcC5zdHlsZS5sZWZ0ID0gJHBhcmVudC5vZmZzZXRMZWZ0IC0gJHRpcC5vZmZzZXRXaWR0aCArICdweCc7XG4gICAgICAgICAgICAgICAgJHRpcC5zdHlsZS50b3AgPSAkcGFyZW50Lm9mZnNldFRvcCAtICR0aXAub2Zmc2V0SGVpZ2h0ICsgJ3B4JztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIC8vIENoZWNrIHRvIHNlZSBpZiB0aGUgdGlwIGlzIHdpdGhpbiB0aGUgd2luZG93XG4gICAgICAgIGZ1bmN0aW9uIF9jaGVja1BvcygkdGlwKVxuICAgICAgICB7XG4gICAgICAgICAgICB2YXIgcmVjdCA9ICR0aXAuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG5cbiAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgcmVjdC50b3AgPj0gMCAmJlxuICAgICAgICAgICAgICAgIHJlY3QubGVmdCA+PSAwICYmXG4gICAgICAgICAgICAgICAgcmVjdC5ib3R0b20gPD0gKHdpbmRvdy5pbm5lckhlaWdodCB8fCBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xpZW50SGVpZ2h0KSAmJlxuICAgICAgICAgICAgICAgIHJlY3QucmlnaHQgPD0gKHdpbmRvdy5pbm5lcldpZHRoIHx8IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGllbnRXaWR0aClcbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgcmVzdHJpY3Q6ICdFJyxcbiAgICAgICAgICAgIHNjb3BlOiB7XG4gICAgICAgICAgICAgICAgY29uZmlnOiAnPSdcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICByZXBsYWNlOiB0cnVlLFxuICAgICAgICAgICAgbGluazogZnVuY3Rpb24oc2NvcGUsIGVsZW1lbnQsIGF0dHJzKSB7XG5cbiAgICAgICAgICAgICAgICAvLyBJZiB0aGUgdXNlciBkb2Vzbid0IHByb3ZpZGUgZXNzZW50aWFsIGluZm9ybWF0aW9uLCBlcnJvciBvdXRcbiAgICAgICAgICAgICAgICBpZighc2NvcGUuY29uZmlnLnRpdGxlIHx8ICFzY29wZS5jb25maWcuYm9keSkge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKCdFcnJvcjogTm8gdGl0bGUgb3IgYm9keSBpbmZvcm1hdGlvbiBwcm92aWRlZC4nKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIDE7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgLy8gSWYgdGhlIHVzZXIgZG9lc24ndCBwcm92aWRlIGEgcG9zaXRpb24sIGRlZmF1bHQgJ25vcnRoJ1xuICAgICAgICAgICAgICAgIGlmKCFzY29wZS5jb25maWcucG9zaXRpb24gfHwgdHlwZW9mIHNjb3BlLmNvbmZpZy5wb3NpdGlvbiAhPT0gJ3N0cmluZycgfHwgX3Bvcy5pbmRleE9mKHNjb3BlLmNvbmZpZy5wb3NpdGlvbikgPCAwKVxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgc2NvcGUuY29uZmlnLnBvc2l0aW9uID0gJ24nO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIC8vIENyZWF0ZSB0aXAgZWxlbWVudFxuICAgICAgICAgICAgICAgIHZhciAkdGlwID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG5cbiAgICAgICAgICAgICAgICAvLyBBcHBlbmQgdG8gRE9NXG4gICAgICAgICAgICAgICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZCgkdGlwKTtcbiAgICAgICAgICAgICAgICAkdGlwLnN0eWxlLnBvc2l0aW9uID0gJ2Fic29sdXRlJztcbiAgICAgICAgICAgICAgICAkdGlwLmlubmVySFRNTCA9ICc8c3Bhbj4nKyBzY29wZS5jb25maWcudGl0bGUgKyc8L3NwYW4+PGRpdj4nKyBzY29wZS5jb25maWcuYm9keSArJzwvZGl2Pic7XG4gICAgICAgICAgICAgICAgJHRpcC5jbGFzc05hbWUgPSAnYm9zc3lUb29sdGlwJztcblxuICAgICAgICAgICAgICAgIC8vIERpc2FibGUgYnJvd3NlcidzIHRvb2x0aXBcbiAgICAgICAgICAgICAgICBlbGVtZW50WzBdLnRpdGxlID0gJyc7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coZWxlbWVudCk7XG5cbiAgICAgICAgICAgICAgICB2YXIgaSA9IDAsXG4gICAgICAgICAgICAgICAgICAgIGxvY2tlZDtcblxuICAgICAgICAgICAgICAgIGRvIHtcbiAgICAgICAgICAgICAgICAgICAgbG9ja2VkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgX21vdmVUaXAoZWxlbWVudFswXSwgJHRpcCwgc2NvcGUuY29uZmlnLnBvc2l0aW9uKTtcblxuICAgICAgICAgICAgICAgICAgICAvLyBDb250aW51ZSB0byBsb29wIGlmICR0aXAgaXMgY2xpcHBlZFxuICAgICAgICAgICAgICAgICAgICBpZighX2NoZWNrUG9zKCR0aXApKVxuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICBsb2NrZWQgPSBmYWxzZTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gV3JhcCBhcm91bmQgYXJyYXkgaWYgdGhlIGVuZCBpcyBoaXRcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzY29wZS5jb25maWcucG9zaXRpb24gPT09ICdudycpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzY29wZS5jb25maWcucG9zaXRpb24gPSAnbic7XG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNjb3BlLmNvbmZpZy5wb3NpdGlvbiA9IF9wb3NbX3Bvcy5pbmRleE9mKHNjb3BlLmNvbmZpZy5wb3NpdGlvbikgKyAxXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIGlmIChpID09PSA4KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICArK2k7XG4gICAgICAgICAgICAgICAgfSB3aGlsZSAobG9ja2VkID09PSBmYWxzZSk7XG5cbiAgICAgICAgICAgICAgICAvLyBIaWRlIGl0IHVudGlsIG1vdXNlIGV2ZW50XG4gICAgICAgICAgICAgICAgJHRpcC5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuXG4gICAgICAgICAgICAgICAgLy8gTW91c2UgZXZlbnRzXG4gICAgICAgICAgICAgICAgZWxlbWVudC5vbignbW91c2VlbnRlcicsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICAkdGlwLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgLm9uKCdtb3VzZWxlYXZlJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgICR0aXAuc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgIH0pOyJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==