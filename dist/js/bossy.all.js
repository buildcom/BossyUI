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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImJvc3N5LmpzIiwiYm9zc3kuY2FsZW5kYXIuanMiLCJib3NzeS5jb21ib2JveC5jYXNjYWRpbmdEcm9wZG93bi5qcyIsImJvc3N5LmNvbWJvYm94LmNoZWNrYm94TXVsdGlzZWxlY3QuanMiLCJib3NzeS5jb21ib2JveC5tdWx0aXNlbGVjdC5qcyIsImJvc3N5LmRhdGEuanMiLCJib3NzeS5kYXRhX2dyaWQuanMiLCJib3NzeS5kcm9wZG93bi5qcyIsImJvc3N5LmZvcm0uanMiLCJib3NzeS5pbnB1dC5qcyIsImJvc3N5Lm51bWVyaWN0ZXh0Ym94LmpzIiwiYm9zc3kuc2NoZW1hLmpzIiwiYm9zc3kuc2xpZGVyLmpzIiwiYm9zc3kudG9vbHRpcC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUMxQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNsS0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUN4QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQzdHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNySkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDM0RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3BFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDbEZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNsSUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDakJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3pGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQzFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQzdVQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImJvc3N5LmFsbC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qIVxyXG4gKiBib3NzeS5qc1xyXG4gKi9cclxuXHJcbi8qIVxyXG4gKiBodHRwOi8vQm9zc3lVSS5jb20vXHJcbiAqXHJcbiAqIEJvc3N5VUkgLSBDcmVhdGVkIHdpdGggTE9WRSBieSBCdWlsZC5jb20gT3BlbiBTb3VyY2UgQ29uc29ydGl1bVxyXG4gKlxyXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UuIFBsZWFzZSBzZWUgTElDRU5TRSBmb3IgbW9yZSBpbmZvcm1hdGlvbi5cclxuICpcclxuKi9cclxuXHJcbi8vVE9ETzogbmVlZCBsYXlvdXQsIGxhYmVsc1xyXG52YXIgYm9zc3kgPSBhbmd1bGFyLm1vZHVsZSgnYm9zc3knLCBbXHJcblx0XHQnYm9zc3kuY2FsZW5kYXInLFxyXG5cdFx0J2Jvc3N5LmRhdGEnLFxyXG5cdFx0J2Jvc3N5LmRyb3Bkb3duJyxcclxuXHRcdCdib3NzeS5mb3JtJyxcclxuXHRcdCdib3NzeS5pbnB1dCcsXHJcblx0XHQnYm9zc3kubnVtZXJpY3RleHRib3gnLFxyXG5cdFx0J2Jvc3N5LnNjaGVtYScsXHJcblx0XHQnYm9zc3kudG9vbHRpcCcsXHJcblx0XHQnYm9zc3kuZGF0YWdyaWQnXHJcblx0XVxyXG4pO1xyXG4iLCJhbmd1bGFyLm1vZHVsZSgnYm9zc3kuY2FsZW5kYXInLCBbXSlcclxuXHQuY29udHJvbGxlcignQ2FsZW5kYXJDb250cm9sbGVyJywgWyckc2NvcGUnLCBmdW5jdGlvbiAoJHNjb3BlKSB7XHJcblxyXG5cdFx0dmFyIF9tb250aE1hcHMgPSB7fSxcclxuXHRcdFx0b3B0aW9ucyA9IHt9LFxyXG5cdFx0XHRkZWZhdWx0cyA9IHtcclxuXHRcdFx0fSxcclxuXHRcdFx0dW5pdmVyc2FsID0ge1xyXG5cdFx0XHRcdERBWTogMjQgKiA2MCAqIDYwICogMTAwMCxcclxuXHRcdFx0XHRIT1VSOiA2MCAqIDYwICogMTAwMFxyXG5cdFx0XHR9O1xyXG5cclxuXHRcdCRzY29wZS5kYXlzID0gW1xyXG5cdFx0XHQnU3VuZGF5JyxcclxuXHRcdFx0J01vbmRheScsXHJcblx0XHRcdCdUdWVzZGF5JyxcclxuXHRcdFx0J1dlZG5lc2RheScsXHJcblx0XHRcdCdUaHVyc2RheScsXHJcblx0XHRcdCdGcmlkYXknLFxyXG5cdFx0XHQnU2F0dXJkYXknXHJcblx0XHRdO1xyXG5cclxuXHRcdCRzY29wZS5tb250aHMgPSBbXHJcblx0XHRcdCdKYW51YXJ5JyxcclxuXHRcdFx0J0ZlYnJ1YXJ5JyxcclxuXHRcdFx0J01hcmNoJyxcclxuXHRcdFx0J0FwcmlsJyxcclxuXHRcdFx0J01heScsXHJcblx0XHRcdCdKdW5lJyxcclxuXHRcdFx0J0p1bHknLFxyXG5cdFx0XHQnQXVndXN0JyxcclxuXHRcdFx0J1NlcHRlbWJlcicsXHJcblx0XHRcdCdPY3RvYmVyJyxcclxuXHRcdFx0J05vdmVtYmVyJyxcclxuXHRcdFx0J0RlY2VtYmVyJ1xyXG5cdFx0XTtcclxuXHJcblx0XHQkc2NvcGUucHJldmlvdXNNb250aCA9IGZ1bmN0aW9uKCkge1xyXG5cdFx0XHR2YXIgZGF0ZSA9IG5ldyBEYXRlKCRzY29wZS5jdXJyZW50LnllYXIsICgkc2NvcGUuY3VycmVudC5tb250aCAtIDEpLCAxKTtcclxuXHRcdFx0c2V0Q3VycmVudE1vbnRoQW5kWWVhcihkYXRlLmdldE1vbnRoKCksIGRhdGUuZ2V0RnVsbFllYXIoKSk7XHJcblx0XHRcdCRzY29wZS51cGRhdGVEYXRlTWFwKCk7XHJcblx0XHR9O1xyXG5cclxuXHRcdCRzY29wZS5uZXh0TW9udGggPSBmdW5jdGlvbigpIHtcclxuXHRcdFx0dmFyIGRhdGUgPSBuZXcgRGF0ZSgkc2NvcGUuY3VycmVudC55ZWFyLCAoJHNjb3BlLmN1cnJlbnQubW9udGggKyAxKSwgMSk7XHJcblx0XHRcdHNldEN1cnJlbnRNb250aEFuZFllYXIoZGF0ZS5nZXRNb250aCgpLCBkYXRlLmdldEZ1bGxZZWFyKCkpO1xyXG5cdFx0XHQkc2NvcGUudXBkYXRlRGF0ZU1hcCgpO1xyXG5cdFx0fTtcclxuXHJcblx0XHQkc2NvcGUuc2VsZWN0RGF0ZSA9IGZ1bmN0aW9uKHRpbWUpIHtcclxuXHRcdFx0dmFyIGRhdGUgPSBnZXRTdGFuZGFyZFRpbWUobmV3IERhdGUodGltZSkpO1xyXG5cdFx0XHRpZiAoZGF5SXNPdXRPZlJhbmdlKGRhdGUpKSB7XHJcblx0XHRcdFx0cmV0dXJuO1xyXG5cdFx0XHR9XHJcblx0XHRcdGlmIChkYXRlLm1vbnRoICE9PSAkc2NvcGUuY3VycmVudC5tb250aCkge1xyXG5cdFx0XHRcdHNldEN1cnJlbnRNb250aEFuZFllYXIoZGF0ZS5tb250aCwgZGF0ZS55ZWFyKTtcclxuXHRcdFx0XHQkc2NvcGUudXBkYXRlRGF0ZU1hcCgpO1xyXG5cdFx0XHR9XHJcblx0XHRcdHNldFNlbGVjdGVkRGF0ZShuZXcgRGF0ZSh0aW1lKSk7XHJcblx0XHR9O1xyXG5cclxuXHRcdCRzY29wZS51cGRhdGVEYXRlTWFwID0gZnVuY3Rpb24oKSB7XHJcblx0XHRcdHZhciBmaXJzdFdlZWtEYXkgPSBuZXcgRGF0ZSgkc2NvcGUuY3VycmVudC50aW1lIC0gKCRzY29wZS5jdXJyZW50LnJhdy5nZXREYXkoKSAqIHVuaXZlcnNhbC5EQVkpKSxcclxuXHRcdFx0XHRpc01vbnRoQ29tcGxldGUgPSBmYWxzZTtcclxuXHRcdFx0XHQkc2NvcGUuZGF0ZU1hcCA9IFtdO1xyXG5cclxuXHRcdFx0d2hpbGUgKCFpc01vbnRoQ29tcGxldGUpIHtcclxuXHRcdFx0XHR2YXIgd2VlayA9IFtdO1xyXG5cdFx0XHRcdGlmICgkc2NvcGUuZGF0ZU1hcC5sZW5ndGggPT09IDUpIHtcclxuXHRcdFx0XHRcdGlzTW9udGhDb21wbGV0ZSA9IHRydWU7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdGZvciAodmFyIHdlZWtEYXkgPSAwOyB3ZWVrRGF5IDwgNzsgd2Vla0RheSsrKSB7XHJcblx0XHRcdFx0XHR2YXIgX3RoaXNEYXRlID0gKG5ldyBEYXRlKGZpcnN0V2Vla0RheS5nZXRUaW1lKCkgKyAod2Vla0RheSAqIHVuaXZlcnNhbC5EQVkpKSk7XHJcblx0XHRcdFx0XHQvLyBmaXggZm9yIERTVCBvZGRuZXNzXHJcblx0XHRcdFx0XHRpZiAoX3RoaXNEYXRlLmdldEhvdXJzKCkgPT09IDIzKSB7XHJcblx0XHRcdFx0XHRcdF90aGlzRGF0ZSA9IChuZXcgRGF0ZShfdGhpc0RhdGUuZ2V0VGltZSgpICsgdW5pdmVyc2FsLkhPVVIpKTtcclxuXHRcdFx0XHRcdH0gZWxzZSBpZiAoX3RoaXNEYXRlLmdldEhvdXJzKCkgPT09IDEpIHtcclxuXHRcdFx0XHRcdFx0X3RoaXNEYXRlID0gKG5ldyBEYXRlKF90aGlzRGF0ZS5nZXRUaW1lKCkgLSB1bml2ZXJzYWwuSE9VUikpO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0dmFyIF9kYXRlID0gZ2V0U3RhbmRhcmRUaW1lKF90aGlzRGF0ZSk7XHJcblx0XHRcdFx0XHRfZGF0ZS5kYXlJbk1vbnRoID0gX3RoaXNEYXRlLmdldE1vbnRoKCkgPT09ICRzY29wZS5jdXJyZW50LnJhdy5nZXRNb250aCgpID8gJ2RheS1pbi1tb250aCcgOiAnJztcclxuXHRcdFx0XHRcdF9kYXRlLmRpc2FibGVkRGF5ID0gZGF5SXNPdXRPZlJhbmdlKF9kYXRlKSA/ICdkaXNhYmxlZC1kYXknIDogJyc7XHJcblx0XHRcdFx0XHR3ZWVrLnB1c2goX2RhdGUpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHRmaXJzdFdlZWtEYXkgPSBuZXcgRGF0ZShmaXJzdFdlZWtEYXkuZ2V0VGltZSgpICsgKDcgKiB1bml2ZXJzYWwuREFZKSk7XHJcblx0XHRcdFx0JHNjb3BlLmRhdGVNYXAucHVzaCh3ZWVrKTtcclxuXHRcdFx0fVxyXG5cdFx0fTtcclxuXHJcblx0XHRmdW5jdGlvbiBnZXRTdGFuZGFyZFRpbWUoZGF0ZSkge1xyXG5cdFx0XHRyZXR1cm4ge1xyXG5cdFx0XHRcdHJhdzogZGF0ZSxcclxuXHRcdFx0XHR5ZWFyOiBkYXRlLmdldEZ1bGxZZWFyKCksXHJcblx0XHRcdFx0bW9udGhOYW1lOiBnZXRNb250aE5hbWUoZGF0ZS5nZXRNb250aCgpKSxcclxuXHRcdFx0XHRtb250aDogZGF0ZS5nZXRNb250aCgpLFxyXG5cdFx0XHRcdGRheTogZ2V0RGF5TmFtZShkYXRlKSxcclxuXHRcdFx0XHRkYXRlOiBkYXRlLmdldERhdGUoKSxcclxuXHRcdFx0XHR0aW1lOiBkYXRlLmdldFRpbWUoKVxyXG5cdFx0XHR9O1xyXG5cdFx0fVxyXG5cclxuXHRcdGZ1bmN0aW9uIGdldFRpbWVPYmplY3RJZkRhdGUoZGF0ZSkge1xyXG5cdFx0XHRpZiAoYW5ndWxhci5pc0RhdGUobmV3IERhdGUoZGF0ZSkpKSB7XHJcblx0XHRcdFx0cmV0dXJuIGdldFN0YW5kYXJkVGltZShuZXcgRGF0ZShkYXRlKSk7XHJcblx0XHRcdH1cclxuXHRcdFx0cmV0dXJuIGZhbHNlO1xyXG5cdFx0fVxyXG5cclxuXHRcdGZ1bmN0aW9uIHNldENvbmZpZ09wdGlvbnMoKSB7XHJcblx0XHRcdCRzY29wZS5jb25maWcgPSAkc2NvcGUuY29uZmlnIHx8IHt9O1xyXG5cdFx0XHQkc2NvcGUuY29uZmlnLnN0YXJ0ID0gZ2V0VGltZU9iamVjdElmRGF0ZSgkc2NvcGUuY29uZmlnLnN0YXJ0KTtcclxuXHRcdFx0JHNjb3BlLmNvbmZpZy5lbmQgPSBnZXRUaW1lT2JqZWN0SWZEYXRlKCRzY29wZS5jb25maWcuZW5kKTtcclxuXHRcdFx0b3B0aW9ucyA9IGFuZ3VsYXIuZXh0ZW5kKHt9LCBkZWZhdWx0cywgJHNjb3BlLmNvbmZpZyk7XHJcblx0XHR9XHJcblxyXG5cdFx0ZnVuY3Rpb24gZGF5SXNPdXRPZlJhbmdlKF9kYXRlKSB7XHJcblx0XHRcdGlmIChvcHRpb25zLnN0YXJ0ICYmIG9wdGlvbnMuZW5kICYmIChfZGF0ZS50aW1lIDwgb3B0aW9ucy5zdGFydC50aW1lIHx8IF9kYXRlLnRpbWUgPiBvcHRpb25zLmVuZC50aW1lKSkge1xyXG5cdFx0XHRcdHJldHVybiB0cnVlO1xyXG5cdFx0XHR9IGVsc2UgaWYgKG9wdGlvbnMuc3RhcnQgJiYgX2RhdGUudGltZSA8IG9wdGlvbnMuc3RhcnQudGltZSkge1xyXG5cdFx0XHRcdHJldHVybiB0cnVlO1xyXG5cdFx0XHR9IGVsc2UgaWYgKG9wdGlvbnMuZW5kICYmIF9kYXRlLnRpbWUgPiBvcHRpb25zLmVuZC50aW1lKSB7XHJcblx0XHRcdFx0cmV0dXJuIHRydWU7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHJcblx0XHRmdW5jdGlvbiBzZXRTZWxlY3RlZERhdGUoZGF0ZSkge1xyXG5cdFx0XHQkc2NvcGUuc2VsZWN0ZWQgPSBnZXRTdGFuZGFyZFRpbWUoZGF0ZSk7XHJcblx0XHRcdCRzY29wZS5uZ01vZGVsID0gJHNjb3BlLnNlbGVjdGVkLnJhdztcclxuXHRcdH1cclxuXHJcblx0XHRmdW5jdGlvbiBzZXRDdXJyZW50TW9udGhBbmRZZWFyKG1vbnRoLCB5ZWFyKSB7XHJcblx0XHRcdHZhciBkYXRlID0gbmV3IERhdGUoeWVhciAhPT0gdW5kZWZpbmVkID8geWVhciA6ICRzY29wZS5zZWxlY3RlZC55ZWFyLCBtb250aCAhPT0gdW5kZWZpbmVkID8gbW9udGggOiAkc2NvcGUuc2VsZWN0ZWQubW9udGgsIDEpO1xyXG5cdFx0XHQkc2NvcGUuY3VycmVudCA9IGdldFN0YW5kYXJkVGltZShkYXRlKTtcclxuXHRcdH1cclxuXHJcblx0XHRmdW5jdGlvbiBnZXRNb250aE5hbWUobW9udGgpIHtcclxuXHRcdFx0cmV0dXJuICRzY29wZS5tb250aHNbbW9udGhdO1xyXG5cdFx0fVxyXG5cclxuXHRcdGZ1bmN0aW9uIGdldERheU5hbWUoZGF0ZSkge1xyXG5cdFx0XHRyZXR1cm4gJHNjb3BlLmRheXNbZGF0ZS5nZXREYXkoKV07XHJcblx0XHR9XHJcblxyXG5cdFx0ZnVuY3Rpb24gaW5pdGlhbGl6ZSgpIHtcclxuXHRcdFx0c2V0Q29uZmlnT3B0aW9ucygpO1xyXG5cdFx0XHRzZXRTZWxlY3RlZERhdGUoJHNjb3BlLm5nTW9kZWwgfHwgbmV3IERhdGUoKSk7XHJcblx0XHRcdHNldEN1cnJlbnRNb250aEFuZFllYXIoKTtcclxuXHRcdFx0JHNjb3BlLnVwZGF0ZURhdGVNYXAoKTtcclxuXHRcdH1cclxuXHJcblx0XHRpbml0aWFsaXplKCk7XHJcblxyXG5cdH1dKS5kaXJlY3RpdmUoJ2Jvc3N5Q2FsZW5kYXInLCBbZnVuY3Rpb24gKCkge1xyXG5cdFx0cmV0dXJuIHtcclxuXHRcdFx0cmVzdHJpY3Q6ICdBRScsXHJcblx0XHRcdHNjb3BlOiB7XHJcblx0XHRcdFx0bmdNb2RlbDogJz0nLFxyXG5cdFx0XHRcdGNvbmZpZzogJz0nXHJcblx0XHRcdH0sXHJcblx0XHRcdHRlbXBsYXRlVXJsOiAnYm9zc3kuY2FsZW5kYXIuaHRtbCcsXHJcblx0XHRcdGNvbnRyb2xsZXI6ICdDYWxlbmRhckNvbnRyb2xsZXInXHJcblx0XHR9O1xyXG5cdH1dKTsiLCJ2YXIgYXBwID0gYW5ndWxhci5tb2R1bGUoJ2Jvc3N5LmNvbWJvYm94LmNhc2NhZGluZ0Ryb3Bkb3duJywgW10pO1xyXG5cclxuYXBwLmNvbnRyb2xsZXIoJ0FwcEN0cmwnLCBmdW5jdGlvbigkc2NvcGUpIHtcclxuXHJcbiAgICAvLyBhZGQgY2hvaWNlcyBmb3IgdGhlIDMgZHJvcGRvd25zXHJcbiAgICAvLyBkZXBlbmRlbmNpZXMgaW4gYXJyYXlzIChBIC0gQTEgLSBBMWEpXHJcbiAgICAkc2NvcGUuY2hvaWNlcyA9IHtcclxuICAgICAgICAnT3B0aW9uIEEnOiB7XHJcbiAgICAgICAgICAgICdPcHRpb24gQTEnOiBbJ09wdGlvbiBBMWEnLCAnT3B0aW9uIEExYicsICdPcHRpb24gQTFjJ10sXHJcbiAgICAgICAgICAgICdPcHRpb24gQTInOiBbJ09wdGlvbiBBMmEnLCAnT3B0aW9uIEEyYicsICdPcHRpb24gQTJjJ10sXHJcbiAgICAgICAgICAgICdPcHRpb24gQTMnOiBbJ09wdGlvbiBBM2EnLCAnT3B0aW9uIEEzYicsICdPcHRpb24gQTNjJ11cclxuICAgICAgICB9LFxyXG4gICAgICAgICdPcHRpb24gQic6IHtcclxuICAgICAgICAgICAgJ09wdGlvbiBCMSc6IFsnT3B0aW9uIEIxYScsICdPcHRpb24gQjFiJywgJ09wdGlvbiBCMWMnXSxcclxuICAgICAgICAgICAgJ09wdGlvbiBCMic6IFsnT3B0aW9uIEIyYScsICdPcHRpb24gQjJiJywgJ09wdGlvbiBCMmMnXSxcclxuICAgICAgICAgICAgJ09wdGlvbiBCMyc6IFsnT3B0aW9uIEIzYScsICdPcHRpb24gQjNiJywgJ09wdGlvbiBCM2MnXVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgJ09wdGlvbiBDJzoge1xyXG4gICAgICAgICAgICAnT3B0aW9uIEMxJzogWydPcHRpb24gQzFhJywgJ09wdGlvbiBDMWInLCAnT3B0aW9uIEMxYyddLFxyXG4gICAgICAgICAgICAnT3B0aW9uIEMyJzogWydPcHRpb24gQzJhJywgJ09wdGlvbiBDMmInLCAnT3B0aW9uIEMzYiddLFxyXG4gICAgICAgICAgICAnT3B0aW9uIEMzJzogWydPcHRpb24gQzNhJywgJ09wdGlvbiBDM2InLCAnT3B0aW9uIEMzYyddXHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuXHJcbn0pOyIsInZhciBhcHAgPSBhbmd1bGFyLm1vZHVsZSgnYm9zc3kuY29tYm9ib3guY2hlY2tib3hNdWx0aXNlbGVjdCcsIFtdKTtcclxuXHJcbmFwcC5jb250cm9sbGVyKCdBcHBDdHJsJywgZnVuY3Rpb24oJHNjb3BlKSB7XHJcblxyXG4gICAgLy8gc2V0IGNob2ljZXNcclxuICAgICRzY29wZS5jaG9pY2VzID0gWydPcHRpb24gQScsICdPcHRpb24gQicsICdPcHRpb24gQyddO1xyXG5cclxuICAgIC8vIGFycmF5XHJcbiAgICAkc2NvcGUubmFtZSA9IHtjaG9pY2VzOiBbXX07XHJcblxyXG4gICAgLy8gZnVuY3Rpb24gc2VsZWN0QWxsIHRvIHNlbGVjdCBhbGwgY2hlY2tib3hlc1xyXG4gICAgJHNjb3BlLnNlbGVjdEFsbCA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICRzY29wZS5uYW1lLmNob2ljZXMgPSBhbmd1bGFyLmNvcHkoJHNjb3BlLmNob2ljZXMpO1xyXG4gICAgfTtcclxuXHJcbiAgICAvLyBmdW5jdGlvbiBkZXNlbGVjdEFsbCB0byBkZXNlbGVjdCBhbGwgY2hlY2tib3hlc1xyXG4gICAgJHNjb3BlLmRlc2VsZWN0QWxsID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgJHNjb3BlLm5hbWUuY2hvaWNlcyA9IFtdO1xyXG4gICAgfTtcclxuXHJcbn0pO1xyXG5cclxuYXBwLmRpcmVjdGl2ZSgnYm9zc3lDaGVja2JveE11bHRpc2VsZWN0JywgWyckcGFyc2UnLCAnJGNvbXBpbGUnLCBmdW5jdGlvbigkcGFyc2UsICRjb21waWxlKSB7XHJcblxyXG4gICAgLy8gYWRkIHRoZSBzZWxlY3RlZCBjaG9pY2UgdG8gY2hvaWNlc1xyXG4gICAgZnVuY3Rpb24gYWRkQ2hvaWNlIChhcnIsIGl0ZW0pIHtcclxuICAgICAgICBhcnIgPSBhbmd1bGFyLmlzQXJyYXkoYXJyKSA/IGFyciA6IFtdO1xyXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYXJyLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGlmIChhbmd1bGFyLmVxdWFscyhhcnJbaV0sIGl0ZW0pKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gYXJyO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIGFkZCBjaG9pY2UgdG8gYXJyYXlcclxuICAgICAgICBhcnIucHVzaChpdGVtKTtcclxuICAgICAgICAvLyByZXR1cm4gbmV3IGFycmF5XHJcbiAgICAgICAgcmV0dXJuIGFycjtcclxuICAgIH1cclxuXHJcbiAgICAvLyByZW1vdmUgdGhlIHNlbGVjdGVkIGNob2ljZSBmcm9tIGNob2ljZXMgd2hlbiBjbGlja2VkXHJcbiAgICBmdW5jdGlvbiByZW1vdmVDaG9pY2UoYXJyLCBpdGVtKSB7XHJcbiAgICAgICAgaWYgKGFuZ3VsYXIuaXNBcnJheShhcnIpKSB7XHJcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYXJyLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoYW5ndWxhci5lcXVhbHMoYXJyW2ldLCBpdGVtKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIHJlbW92ZSBmcm9tIGFycmF5XHJcbiAgICAgICAgICAgICAgICAgICAgYXJyLnNwbGljZShpLCAxKTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICAvLyByZXR1cm4gbmV3IGFycmF5XHJcbiAgICAgICAgcmV0dXJuIGFycjtcclxuICAgIH1cclxuXHJcbiAgICAvLyBjb250YWlucyAtIGNoZWNrIHdoaWNoIGl0ZW1zIHRoZSBhcnJheSBjb250YWluc1xyXG4gICAgZnVuY3Rpb24gY29udGFpbkNoZWNrYm94IChhcnIsIGl0ZW0pIHtcclxuICAgICAgICBpZiAoYW5ndWxhci5pc0FycmF5KGFycikpIHtcclxuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBhcnIubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIGlmIChhbmd1bGFyLmVxdWFscyhhcnJbaV0sIGl0ZW0pKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIHdhdGNoIGJlaGF2aW91ciBvZiBkaXJlY3RpdmUgYW5kIG1vZGVsXHJcbiAgICBmdW5jdGlvbiB3YXRjaChzY29wZSwgZWxlbSwgYXR0cnMpIHtcclxuXHJcbiAgICAgICAgLy8gY29tcGlsZSAtIG5nLW1vZGVsIHBvaW50aW5nIHRvIGNoZWNrZWRcclxuICAgICAgICAkY29tcGlsZShlbGVtKShzY29wZSk7XHJcblxyXG4gICAgICAgIC8vIGdldHRlciBhbmQgc2V0dGVyIGZvciBvcmlnaW5hbCBtb2RlbFxyXG4gICAgICAgIHZhciBnZXR0ZXIgPSAkcGFyc2UoYXR0cnMuYm9zc3lDaGVja2JveE11bHRpc2VsZWN0KTtcclxuICAgICAgICB2YXIgc2V0dGVyID0gZ2V0dGVyLmFzc2lnbjtcclxuXHJcbiAgICAgICAgLy8gdmFsdWUgYWRkZWQgdG8gbGlzdFxyXG4gICAgICAgIHZhciB2YWx1ZSA9ICRwYXJzZShhdHRycy5ib3NzeUxpc3RWYWx1ZSkoc2NvcGUuJHBhcmVudCk7XHJcblxyXG4gICAgICAgIC8vIHdhdGNoIHRoZSBjaGFuZ2Ugb2YgY2hlY2tlZCB2YWx1ZXNcclxuICAgICAgICBzY29wZS4kd2F0Y2goJ2NoZWNrZWQnLCBmdW5jdGlvbihuZXdWYWx1ZSwgb2xkVmFsdWUpIHtcclxuICAgICAgICAgICAgaWYgKG5ld1ZhbHVlID09PSBvbGRWYWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHZhciBhY3R1YWwgPSBnZXR0ZXIoc2NvcGUuJHBhcmVudCk7XHJcbiAgICAgICAgICAgIGlmIChuZXdWYWx1ZSA9PT0gdHJ1ZSkge1xyXG4gICAgICAgICAgICAgICAgc2V0dGVyKHNjb3BlLiRwYXJlbnQsIGFkZENob2ljZSAoYWN0dWFsLCB2YWx1ZSkpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgc2V0dGVyKHNjb3BlLiRwYXJlbnQsIHJlbW92ZUNob2ljZShhY3R1YWwsIHZhbHVlKSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgLy8gd2F0Y2ggY2hhbmdlIG9mIG9yaWdpbmFsIG1vZGVsXHJcbiAgICAgICAgc2NvcGUuJHBhcmVudC4kd2F0Y2goYXR0cnMuYm9zc3lDaGVja2JveE11bHRpc2VsZWN0LCBmdW5jdGlvbihuZXdBcnIpIHtcclxuICAgICAgICAgICAgc2NvcGUuY2hlY2tlZCA9IGNvbnRhaW5DaGVja2JveCAobmV3QXJyLCB2YWx1ZSk7XHJcbiAgICAgICAgfSwgdHJ1ZSk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICByZXN0cmljdDogJ0FFJyxcclxuICAgICAgICBzY29wZTogdHJ1ZSxcclxuICAgICAgICBjb21waWxlOiBmdW5jdGlvbih0RWxlbWVudCwgdEF0dHJzKSB7XHJcbiAgICAgICAgICAgIC8vIGxvY2FsIHZhcmlhYmxlIHN0b3JpbmcgY2hlY2tib3ggbW9kZWxcclxuICAgICAgICAgICAgdEVsZW1lbnQuYXR0cignbmctbW9kZWwnLCAnY2hlY2tlZCcpO1xyXG4gICAgICAgICAgICAvLyBwcmV2ZW50IHJlY3Vyc2lvblxyXG4gICAgICAgICAgICB0RWxlbWVudC5yZW1vdmVBdHRyKCdib3NzeS1jaGVja2JveC1tdWx0aXNlbGVjdCcpO1xyXG4gICAgICAgICAgICByZXR1cm4gd2F0Y2g7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuXHJcbn1dKTsiLCJ2YXIgYXBwID0gYW5ndWxhci5tb2R1bGUoJ2Jvc3N5LmNvbWJvYm94Lm11bHRpc2VsZWN0JywgW10pO1xyXG5cclxuYXBwLmNvbnRyb2xsZXIoJ0FwcEN0cmwnLCBmdW5jdGlvbigkc2NvcGUpIHtcclxuXHJcbiAgICAvLyBhZGQgY2hvaWNlcyBmb3IgbXVsdGlzZWxlY3QgaW4gYXJyYXlcclxuICAgICRzY29wZS5jaG9pY2VzID0gW3tpZDoxLCBuYW1lOiAnT3B0aW9uIEEnfSxcclxuICAgICAgICAgICAgICAgICAgICAgIHtpZDoyLCBuYW1lOiAnT3B0aW9uIEInfSxcclxuICAgICAgICAgICAgICAgICAgICAgIHtpZDozLCBuYW1lOiAnT3B0aW9uIEMnfVxyXG4gICAgICAgICAgICAgICAgICAgICBdO1xyXG5cclxuICAgIC8vIHNlbGVjdGVkIGNob2ljZVxyXG4gICAgJHNjb3BlLnNlbGVjdGVkQ2hvaWNlID0gW107XHJcblxyXG59KTtcclxuXHJcbi8vIGluamVjdCBmdW5jdGlvbnNcclxuYXBwLmZhY3RvcnkoJ29wdGlvblBhcnNlcicsIFsnJHBhcnNlJywgZnVuY3Rpb24gKCRwYXJzZSkge1xyXG5cclxuICAgIHZhciBUWVBFQUhFQURfUkVHRVhQID0gL15cXHMqKC4qPykoPzpcXHMrYXNcXHMrKC4qPykpP1xccytmb3JcXHMrKD86KFtcXCRcXHddW1xcJFxcd1xcZF0qKSlcXHMraW5cXHMrKC4qKSQvO1xyXG5cclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgcGFyc2U6IGZ1bmN0aW9uIChpbnB1dCkge1xyXG5cclxuICAgICAgICAgICAgLy8gY2hlY2sgaW5wdXRzXHJcbiAgICAgICAgICAgIHZhciBtYXRjaCA9IGlucHV0Lm1hdGNoKFRZUEVBSEVBRF9SRUdFWFApLCBtb2RlbE1hcHBlciwgdmlld01hcHBlciwgc291cmNlO1xyXG4gICAgICAgICAgICBpZiAoIW1hdGNoKSB7XHJcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICdFeHBlY3RlZCB0eXBlYWhlYWQgc3BlY2lmaWNhdGlvbiBpbiBmb3JtIG9mIFwiX21vZGVsVmFsdWVfIChhcyBfbGFiZWxfKT8gZm9yIF9pdGVtXyBpbiBfY29sbGVjdGlvbl9cIicgK1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAnIGJ1dCBnb3QgXCInICsgaW5wdXQgKyAnXCIuJyk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICBpdGVtTmFtZTogbWF0Y2hbM10sXHJcbiAgICAgICAgICAgICAgICBzb3VyY2U6ICRwYXJzZShtYXRjaFs0XSksXHJcbiAgICAgICAgICAgICAgICB2aWV3TWFwcGVyOiAkcGFyc2UobWF0Y2hbMl0gfHwgbWF0Y2hbMV0pLFxyXG4gICAgICAgICAgICAgICAgbW9kZWxNYXBwZXI6ICRwYXJzZShtYXRjaFsxXSlcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG59XSk7XHJcblxyXG5hcHAuZGlyZWN0aXZlKCdib3NzeU11bHRpc2VsZWN0JyxcclxuXHJcbiAgICAgICAgZnVuY3Rpb24gKCRkb2N1bWVudCwgJGNvbXBpbGUsIG9wdGlvblBhcnNlcikge1xyXG4gICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgcmVzdHJpY3Q6ICdFJyxcclxuICAgICAgICAgICAgICAgIHJlcXVpcmU6ICduZ01vZGVsJyxcclxuICAgICAgICAgICAgICAgIGxpbms6IGZ1bmN0aW9uIChvcmlnaW5hbFNjb3BlLCBlbGVtZW50LCBhdHRycywgbW9kZWxDdHJsKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC8vIGRlY2xhcmUgdmFyaWFibGVzXHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGV4cCA9IGF0dHJzLm9wdGlvbnMsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHBhcnNlZFJlc3VsdCA9IG9wdGlvblBhcnNlci5wYXJzZShleHApLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpc011bHRpcGxlID0gYXR0cnMubXVsdGlwbGUgPyB0cnVlIDogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNjb3BlID0gb3JpZ2luYWxTY29wZS4kbmV3KCksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNoYW5nZUhhbmRsZXIgPSBhdHRycy5jaGFuZ2UgfHwgYW5ndWxhci5ub29wO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBzY29wZS5pdGVtcyA9IFtdO1xyXG4gICAgICAgICAgICAgICAgICAgIHNjb3BlLm11bHRpcGxlID0gaXNNdWx0aXBsZTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gaW5jbHVkZSBzZWNvbmQgZGlyZWN0aXZlICh0ZW1wbGF0ZSlcclxuICAgICAgICAgICAgICAgICAgICB2YXIgcG9wVXBFbCA9IGFuZ3VsYXIuZWxlbWVudCgnPGJvc3N5LW11bHRpc2VsZWN0LXBvcHVwPjwvYm9zc3ktbXVsdGlzZWxlY3QtcG9wdXA+Jyk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC8vIGFuYWx5c2UgbW9kZWxcclxuICAgICAgICAgICAgICAgICAgICBmdW5jdGlvbiBwYXJzZU1vZGVsKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgbW9kZWwgPSBwYXJzZWRSZXN1bHQuc291cmNlKG9yaWdpbmFsU2NvcGUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IG1vZGVsLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgbG9jYWwgPSB7fTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxvY2FsW3BhcnNlZFJlc3VsdC5pdGVtTmFtZV0gPSBtb2RlbFtpXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNjb3BlLml0ZW1zLnB1c2goe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxhYmVsOiBwYXJzZWRSZXN1bHQudmlld01hcHBlcihsb2NhbCksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbW9kZWw6IG1vZGVsW2ldLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNoZWNrZWQ6IGZhbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgcGFyc2VNb2RlbCgpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAvLyBhZGQgdGVtcGxhdGUgZGlyZWN0aXZlXHJcbiAgICAgICAgICAgICAgICAgICAgZWxlbWVudC5hcHBlbmQoJGNvbXBpbGUocG9wVXBFbCkoc2NvcGUpKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gc2VsZWN0aW9uIGZ1bmN0aW9uXHJcbiAgICAgICAgICAgICAgICAgICAgZnVuY3Rpb24gc2VsZWN0TXVsdGlwbGUoaXRlbSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpdGVtLmNoZWNrZWQgPSAhaXRlbS5jaGVja2VkO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZXRNb2RlbFZhbHVlKHRydWUpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gYXJyYXkgZm9yIG11bHRpcGxlIHNlbGVjdGlvblxyXG4gICAgICAgICAgICAgICAgICAgIGZ1bmN0aW9uIHNldE1vZGVsVmFsdWUoaXNNdWx0aXBsZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgdmFsdWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpc011bHRpcGxlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZSA9IFtdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYW5ndWxhci5mb3JFYWNoKHNjb3BlLml0ZW1zLCBmdW5jdGlvbiAoaXRlbSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpdGVtLmNoZWNrZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWUucHVzaChpdGVtLm1vZGVsKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFuZ3VsYXIuZm9yRWFjaChzY29wZS5pdGVtcywgZnVuY3Rpb24gKGl0ZW0pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoaXRlbS5jaGVja2VkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlID0gaXRlbS5tb2RlbDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1vZGVsQ3RybC4kc2V0Vmlld1ZhbHVlKHZhbHVlKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC8vIGZ1bmN0aW9uIGZvciBzZWxlY3Rpb24gb2YgYWxsXHJcbiAgICAgICAgICAgICAgICAgICAgc2NvcGUuY2hlY2tBbGwgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghaXNNdWx0aXBsZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFuZ3VsYXIuZm9yRWFjaChzY29wZS5pdGVtcywgZnVuY3Rpb24gKGl0ZW0pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW0uY2hlY2tlZCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZXRNb2RlbFZhbHVlKHRydWUpO1xyXG4gICAgICAgICAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC8vIGZ1bmN0aW9uIGZvciBzZWxlY3Rpb24gb2Ygbm9uZVxyXG4gICAgICAgICAgICAgICAgICAgIHNjb3BlLnVuY2hlY2tBbGwgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFuZ3VsYXIuZm9yRWFjaChzY29wZS5pdGVtcywgZnVuY3Rpb24gKGl0ZW0pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW0uY2hlY2tlZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2V0TW9kZWxWYWx1ZSh0cnVlKTtcclxuICAgICAgICAgICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBzY29wZS5zZWxlY3QgPSBmdW5jdGlvbiAoaXRlbSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBUT0RPOiBhZGQgc2VsZWN0U2luZ2xlIGZ1bmN0aW9uID8/P1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoaXNNdWx0aXBsZSAhPT0gZmFsc2UpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGVjdE11bHRpcGxlKGl0ZW0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfTtcclxuICAgICAgICB9KTtcclxuXHJcbi8vIGRpcmVjdGl2ZSBzdG9yaW5nIHRlbXBsYXRlXHJcbmFwcC5kaXJlY3RpdmUoJ2Jvc3N5TXVsdGlzZWxlY3RQb3B1cCcsIFsnJGRvY3VtZW50JywgZnVuY3Rpb24gKCRkb2N1bWVudCkge1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIHJlc3RyaWN0OiAnRScsXHJcbiAgICAgICAgICAgIHNjb3BlOiBmYWxzZSxcclxuICAgICAgICAgICAgcmVwbGFjZTogdHJ1ZSxcclxuICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICcuLi90ZW1wbGF0ZXMvYm9zc3kuY29tYm9ib3gubXVsdGlzZWxlY3QuaHRtbCcsXHJcbiAgICAgICAgICAgIGxpbms6IGZ1bmN0aW9uIChzY29wZSwgZWxlbWVudCwgYXR0cikge1xyXG5cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcbiAgICB9XSk7XHJcbiIsImFuZ3VsYXIubW9kdWxlKCdib3NzeS5kYXRhJywgW10pXHJcbi8qKlxyXG5Abmdkb2Mgc2VydmljZVxyXG5AbmFtZSAkZGF0YVxyXG5AcmVxdWlyZXMgJHFcclxuQHJlcXVpcmVzICRodHRwXHJcblxyXG4qL1xyXG4gICAgLmZhY3RvcnkoJyRkYXRhJywgWyckcScsJyRodHRwJywgJyRzY29wZScsIGZ1bmN0aW9uICgkcSwgJGh0dHAsICRzY29wZSkge1xyXG5cclxuICAgICAgICBmdW5jdGlvbiBfZ2V0RGF0YSAoZGF0YSkge1xyXG4gICAgICAgICAgICBpZiAoYW5ndWxhci5pc1N0cmluZyhkYXRhKSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIF9nZXRSZW1vdGVEYXRhKGRhdGEpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgaWYgKGFuZ3VsYXIuaXNPYmplY3QoZGF0YSkpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBkYXRhO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgaWYgKGFuZ3VsYXIuaXNGdW5jdGlvbihkYXRhKSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIF9nZXREYXRhKCBkYXRhLmNhbGwoJHNjb3BlKSApO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgLy9UT0RPOiByZXBsYWNlIGVycm9yIG1lc3NhZ2Ugd2l0aCBvbmxpbmUgZG9jIGxpbmsgbGlrZSBuZyBlcnJvcnNcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ2RpcmVjdGl2ZS5ib3NzeUZvcm06IG5vIGRhdGEgdXJsIG9yIG9iamVjdCBnaXZlbicpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmdW5jdGlvbiBfZ2V0UmVtb3RlRGF0YShkYXRhKSB7XHJcbiAgICAgICAgICAgIHZhciBkZWZlcnJlZCA9ICRxLmRlZmVyKCk7XHJcblxyXG4gICAgICAgICAgICAkaHR0cC5nZXQoIGRhdGEsIHsgcmVzcG9uc2VUeXBlOiAnanNvbicgfSApXHJcbiAgICAgICAgICAgICAgICAuc3VjY2VzcyggZnVuY3Rpb24oIGRhdGEgKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYoIGFuZ3VsYXIuaXNPYmplY3QoIGRhdGEgKSApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGVmZXJyZWQucmVzb2x2ZShkYXRhKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vVE9ETzogcmVwbGFjZSBlcnJvciBtZXNzYWdlIHdpdGggb25saW5lIGRvYyBsaW5rIGxpa2UgbmcgZXJyb3JzXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlamVjdCgnZGlyZWN0aXZlLmJvc3N5Rm9ybTogR0VUIHJlcXVlc3QgdG8gdXJsIGRpZCBub3QgcHJvZHVjZSBkYXRhIG9iamVjdCcpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuZXJyb3IoIGZ1bmN0aW9uKHJlc3BvbnNlX2RhdGEsIHN0YXR1cykge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vVE9ETzogcmVwbGFjZSBlcnJvciBtZXNzYWdlIHdpdGggb25saW5lIGRvYyBsaW5rIGxpa2UgbmcgZXJyb3JzXHJcbiAgICAgICAgICAgICAgICAgICAgZGVmZXJyZWQucmVqZWN0KCdkaXJlY3RpdmUuYm9zc3lGb3JtOiBHRVQgcmVxdWVzdCB0byB1cmwgXCInICsgZGF0YSArICdcIiBmYWlsZWQgd2l0aCBzdGF0dXMgXCInICsgc3RhdHVzICsgJ1wiJyk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiBkZWZlcnJlZC5wcm9taXNlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgLyoqXHJcbiAgICAgICAgICAgIEBuZ2RvYyBtZXRob2RcclxuICAgICAgICAgICAgQG5hbWUgZ2V0RGF0YVxyXG4gICAgICAgICAgICBAbWV0aG9kT2YgJGRhdGFcclxuICAgICAgICAgICAgQHBhcmFtIHtzdHJpbmcsb2JqZWN0LGZ1bmN0aW9ufSBkYXRhIElmIGRhdGEgaXMgYSBzdHJpbmcsIGl0IHdpbGwgYmUgdHJlYXRlZCBhcyBhIHVybCB0byByZXRyaWV2ZSBkYXRhIGZyb20uIElmIGRhdGEgaXMgYW4gb2JqZWN0IGl0IHdpbGwgYmUgaW1tZWRpYXRlbHkgcmV0dXJuZWQuIElmIGRhdGEgaXMgYSBmdW5jdGlvbiwgdGhlIGZ1bmN0aW9uIHdpbGwgYmUgY2FsbGVkIGFuZCBwcm9jZXNzZWQgdW50aWwgYW4gb2JqZWN0IGlzIHByb2R1Y2VkXHJcbiAgICAgICAgICAgIEByZXR1cm5zIHtPYmplY3R9IEVpdGhlciBhICRxIHByb21pc2UsIGEgZGF0YSBvYmplY3Qgb3IgYSBzdHJpbmcuXHJcbiAgICAgICAgICAgICovXHJcbiAgICAgICAgICAgIGdldERhdGE6IF9nZXREYXRhXHJcbiAgICAgICAgfTtcclxuICAgIH1dKVxyXG47XHJcbiIsImFuZ3VsYXIubW9kdWxlKCdib3NzeS5kYXRhZ3JpZCcsIFtdKVxyXG5cdC5jb250cm9sbGVyKCdEYXRhR3JpZENvbnRyb2xsZXInLCBbJyRzY29wZScsIGZ1bmN0aW9uKCRzY29wZSl7XHJcblxyXG5cdFx0dmFyIG51bWJlckNvbXBhcmUgPSBmdW5jdGlvbihhLCBiKSB7XHJcblx0XHRcdHZhciByZXN1bHQgPSAwO1xyXG5cdFx0XHRpZiAoYSA8IGIpIHtcclxuXHRcdFx0XHRyZXN1bHQgPSAtMTtcclxuXHRcdFx0fSBlbHNlIGlmIChhID4gYikge1xyXG5cdFx0XHRcdHJlc3VsdCA9IDE7XHJcblx0XHRcdH1cclxuXHRcdFx0cmV0dXJuIHJlc3VsdDtcclxuXHRcdH07XHJcblxyXG5cdFx0dmFyIHN0cmluZ0NvbXBhcmUgPSBmdW5jdGlvbihhLCBiKSB7XHJcblx0XHRcdC8vIHRvTG93ZXJDYXNlIG5lZWRlZCB0byBzdXBwb3J0IGFsbCBicm93c2Vyc1xyXG5cdFx0XHRyZXR1cm4gYS50b0xvd2VyQ2FzZSgpLmxvY2FsZUNvbXBhcmUoYi50b0xvd2VyQ2FzZSgpKTtcclxuXHRcdH07XHJcblxyXG5cdFx0dmFyIGZvcm1hdHRlZE51bWJlckNvbXBhcmUgPSBmdW5jdGlvbihhLCBiKSB7XHJcblx0XHRcdC8vIHN0cmlwIG5vbi1udW1lcmljIGNoYXJhY3RlcnMsIGFuZCBjb252ZXJ0IHRvIG51bWJlciB3aXRoIHVuYXJ5IHBsdXNcclxuXHRcdFx0YSA9ICthLnJlcGxhY2UoL1teXFxkLi1dL2dpLCAnJyk7XHJcblx0XHRcdGIgPSArYi5yZXBsYWNlKC9bXlxcZC4tXS9naSwgJycpO1xyXG5cdFx0XHRyZXR1cm4gbnVtYmVyQ29tcGFyZShhLCBiKTtcclxuXHRcdH07XHJcblxyXG5cdFx0dmFyIGNvbHVtbkNvbXBhcmUgPSBmdW5jdGlvbihhLCBiLCBjb2x1bW5JbmRleCl7XHJcblx0XHRcdHZhciBjb2x1bW5UeXBlID0gJHNjb3BlLmNvbmZpZy5kYXRhLmNvbHVtbnNbY29sdW1uSW5kZXhdLnR5cGUsXHJcblx0XHRcdFx0cmVzdWx0ID0gMDtcclxuXHRcdFx0aWYgKGNvbHVtblR5cGUgPT09ICdudW1iZXInKSB7XHJcblx0XHRcdFx0cmVzdWx0ID0gbnVtYmVyQ29tcGFyZShhW2NvbHVtbkluZGV4XSwgYltjb2x1bW5JbmRleF0pO1xyXG5cdFx0XHR9IGVsc2UgaWYgKGNvbHVtblR5cGUgPT09ICdzdHJpbmcnKSB7XHJcblx0XHRcdFx0cmVzdWx0ID0gc3RyaW5nQ29tcGFyZShhW2NvbHVtbkluZGV4XSwgYltjb2x1bW5JbmRleF0pO1xyXG5cdFx0XHR9IGVsc2UgaWYgKGNvbHVtblR5cGUgPT09ICdtb25leScpIHtcclxuXHRcdFx0XHRyZXN1bHQgPSBmb3JtYXR0ZWROdW1iZXJDb21wYXJlKGFbY29sdW1uSW5kZXhdLCBiW2NvbHVtbkluZGV4XSk7XHJcblx0XHRcdH1cclxuXHRcdFx0cmV0dXJuIHJlc3VsdDtcclxuXHRcdH07XHJcblxyXG5cdFx0dmFyIGNhbGN1bGF0ZVNvcnRkaXJlY3Rpb24gPSBmdW5jdGlvbihjb2x1bW5JbmRleCl7XHJcblx0XHRcdC8vIDEgPSBhc2Mgb3IgIC0xID0gZGVzY1xyXG5cdFx0XHRpZiAoJHNjb3BlLmNvbmZpZy5kYXRhLmNvbHVtbnNbY29sdW1uSW5kZXhdLnNvcnREaXJlY3Rpb24pIHtcclxuXHRcdFx0XHQkc2NvcGUuY29uZmlnLmRhdGEuY29sdW1uc1tjb2x1bW5JbmRleF0uc29ydERpcmVjdGlvbiA9IC0kc2NvcGUuY29uZmlnLmRhdGEuY29sdW1uc1tjb2x1bW5JbmRleF0uc29ydERpcmVjdGlvbjtcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHQkc2NvcGUuY29uZmlnLmRhdGEuY29sdW1uc1tjb2x1bW5JbmRleF0uc29ydERpcmVjdGlvbiA9IDE7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHJldHVybiAkc2NvcGUuY29uZmlnLmRhdGEuY29sdW1uc1tjb2x1bW5JbmRleF0uc29ydERpcmVjdGlvbjtcclxuXHRcdH07XHJcblxyXG5cdFx0JHNjb3BlLnNvcnRDb2x1bW4gPSBmdW5jdGlvbihjb2x1bW5JbmRleCkge1xyXG5cdFx0XHR2YXIgc29ydERpcmVjdGlvbiA9IGNhbGN1bGF0ZVNvcnRkaXJlY3Rpb24oY29sdW1uSW5kZXgpO1xyXG5cclxuXHRcdFx0JHNjb3BlLmNvbmZpZy5kYXRhLnJvd3MgPSAkc2NvcGUuY29uZmlnLmRhdGEucm93cy5zb3J0KGZ1bmN0aW9uKGEsIGIpe1xyXG5cdFx0XHRcdHJldHVybiBzb3J0RGlyZWN0aW9uICogY29sdW1uQ29tcGFyZShhLCBiLCBjb2x1bW5JbmRleCk7XHJcblx0XHRcdH0pO1xyXG5cdFx0fTtcclxuXHR9XSlcclxuXHQuZGlyZWN0aXZlKCdib3NzeURhdGFncmlkJywgW2Z1bmN0aW9uKClcclxuXHR7XHJcblx0XHRyZXR1cm4ge1xyXG5cdFx0XHRyZXN0cmljdDogJ0VBJyxcclxuXHRcdFx0c2NvcGU6IHtcclxuXHRcdFx0XHRjb25maWc6ICc9J1xyXG5cdFx0XHR9LFxyXG5cdFx0XHR0ZW1wbGF0ZVVybDogJ2Jvc3N5LmRhdGFncmlkLmh0bWwnLFxyXG5cdFx0XHRjb250cm9sbGVyOiAnRGF0YUdyaWRDb250cm9sbGVyJ1xyXG5cdFx0fTtcclxuXHR9XSk7XHJcbiIsImFuZ3VsYXIubW9kdWxlKCdib3NzeS5kcm9wZG93bicsIFtdKVxyXG5cdC5ydW4oZnVuY3Rpb24oJHRlbXBsYXRlQ2FjaGUpe1xyXG4gICAgICAgICR0ZW1wbGF0ZUNhY2hlLnB1dCgnYm9zc3ktZHJvcGRvd24uaHRtbCcsICc8ZGl2PjxzZWxlY3Qgbmctb3B0aW9ucz1cIml0ZW1bZHJvcGRvd24udGl0bGVdIGZvciBpdGVtIGluIGRyb3Bkb3duLml0ZW1zIHwgb3JkZXJCeTogZHJvcGRvd24udGl0bGVcIiBuZy1tb2RlbD1cInNlbGVjdGVkSXRlbVwiIG5nLWNoYW5nZT1cImRyb3Bkb3duLnVwZGF0ZVNlbGVjdGVkSXRlbShzZWxlY3RlZEl0ZW0pXCI+PG9wdGlvbiB2YWx1ZT1cIlwiIG5nLWhpZGU9XCJzZWxlY3RlZEl0ZW1cIj5QbGVhc2Ugc2VsZWN0IG9uZS4uLjwvb3B0aW9uPjwvc2VsZWN0PjwvZGl2PicpO1xyXG4gICAgfSlcclxuXHQuZGlyZWN0aXZlKCdib3NzeURyb3Bkb3duJywgZnVuY3Rpb24oJGh0dHAsICRjb21waWxlKSB7XHJcblx0XHRyZXR1cm4ge1xyXG5cdFx0XHRyZXN0cmljdDogJ0VBJyxcclxuXHRcdFx0c2NvcGU6IHtcclxuXHRcdFx0XHRjb25maWc6ICc9JyxcclxuXHRcdFx0XHRzZWxlY3Q6ICc9JyxcclxuXHRcdFx0XHRpdGVtczogJz0nXHJcblx0XHRcdH0sXHJcblx0XHRcdHRlbXBsYXRlVXJsOiAnJyxcclxuXHRcdFx0bGluazogZnVuY3Rpb24oc2NvcGUsIGVsZW1lbnQsIGF0dHJzKSB7XHJcblx0XHRcdFx0dmFyIGN1c3RvbVRlbXBsYXRlO1xyXG5cclxuXHRcdFx0XHQvL0NoZWNrcyBpZiB1c2VyIGlzIGRlZmluaW5nIGEgdXJsIG9yIGlubmVyIGh0bWxcclxuXHRcdFx0XHQvL0lmIGl0IGlzIGEgdXJsLCB0aGUgdGVtcGxhdGUgbXVzdCBiZSBsb2NhdGVkIGluIGEgbG9jYWwgZGlyZWN0b3J5IG9yIGFkZGVkIHRvIHRoZSBET00gdmlhIG5nLWluY2x1ZGVcclxuXHRcdFx0XHRpZihzY29wZS5kcm9wZG93bi50ZW1wbGF0ZVswXSAhPT0gJzwnKSB7XHJcblx0XHRcdFx0XHRjdXN0b21UZW1wbGF0ZSA9ICRjb21waWxlKCc8bmctaW5jbHVkZSBzcmM9XCJkcm9wZG93bi50ZW1wbGF0ZVwiPjwvbmctaW5jbHVkZT4nKShzY29wZSk7XHJcblx0XHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdGN1c3RvbVRlbXBsYXRlID0gJGNvbXBpbGUoc2NvcGUuZHJvcGRvd24udGVtcGxhdGUpKHNjb3BlKTtcclxuXHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdC8vSW5qZWN0cyB0ZW1wbGF0ZVxyXG5cdFx0XHRcdGVsZW1lbnQucmVwbGFjZVdpdGgoY3VzdG9tVGVtcGxhdGUpO1xyXG5cdFx0XHR9LFxyXG5cdFx0XHRjb250cm9sbGVyOiBmdW5jdGlvbigkc2NvcGUpIHtcclxuXHRcdFx0XHR2YXIgdGhpc0Ryb3Bkb3duID0gdGhpcztcclxuXHRcdFx0XHR0aGlzRHJvcGRvd24udGl0bGUgPSAkc2NvcGUuY29uZmlnLnRpdGxlO1xyXG5cdFx0XHRcdHRoaXNEcm9wZG93bi5pdGVtcyA9IFtdO1xyXG5cclxuXHRcdFx0XHQvL1JldHJpZXZlIGpzb24gY29udGFpbmluZyBvYmplY3RzIHRvIHBvcHVsYXRlIHRoZSBkcm9wZG93bi5cclxuXHRcdFx0XHRpZigkc2NvcGUuY29uZmlnLnNyYykge1xyXG5cdFx0XHRcdFx0Ly9DaGVja3MgdGhhdCBjb25maWcuc3JjIGlzIGEgSlNPTiBmaWxlLlxyXG5cdFx0XHRcdFx0aWYoJHNjb3BlLmNvbmZpZy5zcmMuc3Vic3RyKCRzY29wZS5jb25maWcuc3JjLmxlbmd0aC01LCAkc2NvcGUuY29uZmlnLnNyYy5sZW5ndGgpID09PSAnLmpzb24nKSB7XHJcblx0XHRcdFx0XHRcdCRodHRwLmdldCgkc2NvcGUuY29uZmlnLnNyYylcclxuXHRcdFx0XHRcdFx0XHQuc3VjY2VzcyhmdW5jdGlvbihkYXRhKSB7XHJcblx0XHRcdFx0XHRcdFx0XHR0aGlzRHJvcGRvd24uaXRlbXMgPSBkYXRhO1xyXG5cdFx0XHRcdFx0XHRcdFx0Ly9DaGVja3MgdmFsaWRpdHkgb2YgdGhlIHRpdGxlIGZpZWxkIGFzIGl0IGFwcGxpZXMgdG8gdGhlIEpTT04uXHJcblx0XHRcdFx0XHRcdFx0XHRpZighdGhpc0Ryb3Bkb3duLml0ZW1zWzBdLmhhc093blByb3BlcnR5KHRoaXNEcm9wZG93bi50aXRsZSkpIHtcclxuXHRcdFx0XHRcdFx0XHRcdFx0Y29uc29sZS5lcnJvcignRVJST1I6ICRzY29wZS5jb25maWcudGl0bGU6IFwiJyArICRzY29wZS5jb25maWcudGl0bGUgKyAnXCIgaXMgbm90IGEgbWVtYmVyIG9mIHRoZSBsb2FkZWQgSlNPTiBkYXRhLiBQbGVhc2Ugc3BlY2lmeSBhIHZhbGlkIFwidGl0bGVcIiB0byBsaXN0LicpO1xyXG5cdFx0XHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0XHRcdFx0Ly9BdHRhY2hlcyByZXRyaWV2ZWQgaXRlbXMgdG8gJHNjb3BlLml0ZW1zIGZvciBhZGRpdGlvbmFsIGZ1bmN0aW9uYWxpdHkuXHJcblx0XHRcdFx0XHRcdFx0XHRpZigkc2NvcGUuaXRlbXMpIHtcclxuXHRcdFx0XHRcdFx0XHRcdFx0JHNjb3BlLml0ZW1zID0gdGhpc0Ryb3Bkb3duLml0ZW1zO1xyXG5cdFx0XHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0XHRcdH0pXHJcblx0XHRcdFx0XHRcdFx0LmVycm9yKGZ1bmN0aW9uKGRhdGEpIHtcclxuXHRcdFx0XHRcdFx0XHRcdGNvbnNvbGUuZXJyb3IoJ0VSUk9SOiBGYWlsIHRvIGxvYWQgSlNPTiBkYXRhIGZyb20gdGhlIHBhdGg6IFwiJyArICRzY29wZS5jb25maWcuc3JjICsgJ1wiJyk7XHJcblx0XHRcdFx0XHRcdFx0fSk7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHQvL0xvZ3MgYW4gZXJyb3IgdG8gaWRlbnRpZnkgdGhhdCBhIGpzb24gZmlsZSB3YXMgbm90IGxvYWRlZC5cclxuXHRcdFx0XHRcdGVsc2Uge1xyXG5cdFx0XHRcdFx0XHRjb25zb2xlLmVycm9yKCdFUlJPUjogXCIkc2NvcGUuY29uZmlnLnNyY1wiOiBcIicgKyAkc2NvcGUuY29uZmlnLnNyYyArICdcIiBpcyBub3QgYSB2YWxpZCBKU09OIGZpbGUuJyk7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHQvL0Z1bmN0aW9uIGNhbGxlZCB0byB1cGRhdGUgc2VsZWN0IGluIHRoZSB0ZW1wbGF0ZS5cclxuXHRcdFx0XHRcdHRoaXNEcm9wZG93bi51cGRhdGVTZWxlY3RlZEl0ZW0gPSBmdW5jdGlvbihzZWxlY3RlZEl0ZW0pIHtcclxuXHRcdFx0XHRcdFx0Ly9TaW5nbGUgc2VsZWN0IG9iamVjdCB0aWVkIHRvIHRoZSBjb25maWcgb2JqZWN0LlxyXG5cdFx0XHRcdFx0XHRpZiAoJHNjb3BlLmNvbmZpZy5zZWxlY3QpIHtcclxuXHRcdFx0XHRcdFx0XHQkc2NvcGUuY29uZmlnLnNlbGVjdCA9IHNlbGVjdGVkSXRlbTtcclxuXHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0XHQvL1VzZXIgY2FuIGNvbGxlY3QgYW5kIHV0aWxpemUgbXVsdGlwbGUgc2VsZWN0IG9iamVjdHMgd2l0aCB0aGUgc2FtZSBjb25maWcgb2JqZWN0IGlmIHBhc3NpbmcgaW4gYSBkaXN0aW5jdCBzZWxlY3QgcGFyYW0uXHJcblx0XHRcdFx0XHRcdGlmICgkc2NvcGUuc2VsZWN0KSB7XHJcblx0XHRcdFx0XHRcdFx0JHNjb3BlLnNlbGVjdCA9IHNlbGVjdGVkSXRlbTtcclxuXHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0fTtcclxuXHRcdFx0XHRcdC8vRGV0ZXJtaW5lIGlmIGN1c3RvbSB0ZW1wbGF0ZSBVcmwgaGFzIGJlZW4gZGVmaW5lZC5cclxuXHRcdFx0XHRcdGlmICgkc2NvcGUuY29uZmlnLnRlbXBsYXRlKSB7XHJcblx0XHRcdFx0XHRcdHRoaXNEcm9wZG93bi50ZW1wbGF0ZSA9ICRzY29wZS5jb25maWcudGVtcGxhdGU7XHJcblx0XHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0XHR0aGlzRHJvcGRvd24udGVtcGxhdGUgPSAnYm9zc3ktZHJvcGRvd24uaHRtbCc7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdC8vTG9ncyBhbiBlcnJvciBpZiAnc3JjJyBoYXMgbm90IGJlZW4gZGVmaW5lZC5cclxuXHRcdFx0XHRlbHNlIHtcclxuXHRcdFx0XHRcdGNvbnNvbGUuZXJyb3IoJ0VSUk9SOiBcIiRzY29wZS5jb25maWcuc3JjXCIgaGFzIG5vdCBiZWVuIHNwZWNpZmllZCB3aXRoaW4gdGhlIFwiY29uZmlnXCIgb2JqZWN0LiBQbGVhc2UgcGFzcyBpbiBhIHZhbGlkIHBhdGggdG8gYSBKU09OIGZpbGUuJyk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9LFxyXG5cdFx0XHRjb250cm9sbGVyQXM6ICdkcm9wZG93bidcclxuXHRcdH07XHJcblx0fSk7XHJcbiIsImFuZ3VsYXIubW9kdWxlKCdib3NzeS5mb3JtJywgW10pXHJcbiAgICAucnVuKGZ1bmN0aW9uKCR0ZW1wbGF0ZUNhY2hlKXtcclxuICAgICAgICAkdGVtcGxhdGVDYWNoZS5wdXQoJ2Jvc3N5LWlucHV0Lmh0bWwnLCAndGVtcGxhdGVzL2Jvc3N5LWlucHV0Lmh0bWwnKTtcclxuICAgIH0pXHJcbiAgICAuZGlyZWN0aXZlKCdib3NzeUZvcm0nLFsnJGNvbXBpbGUnLCckaHR0cCcsJyRzY2hlbWEnLCckZGF0YScsIGZ1bmN0aW9uICgkY29tcGlsZSwgJGh0dHAsICRzY2hlbWEsICRkYXRhKSB7XHJcbiAgICAgICAgdmFyIF9zY2hlbWEsXHJcbiAgICAgICAgICAgIF9kYXRhLFxyXG4gICAgICAgICAgICBfb3B0aW9ucyA9IHtcclxuICAgICAgICAgICAgICAgIHNob3dMYWJlbHM6IHRydWUsXHJcbiAgICAgICAgICAgICAgICBoZWFkZXI6ICdUaGlzIGlzIGhlYWRlcicsXHJcbiAgICAgICAgICAgICAgICBmb290ZXI6ICdUaGlzIGlzIGZvb3RlcicsXHJcbiAgICAgICAgICAgICAgICB0aGVtZTogJ2dyZWVuJyxcclxuICAgICAgICAgICAgICAgIGJ1dHRvbjogJ1NhdmUnXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIF9pdGVtVGVtcGxhdGUgPSB7XHJcbiAgICAgICAgICAgICAgICBudW1iZXI6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gJzxpbnB1dCB0eXBlPVwibnVtYmVyXCIvPic7XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgdGV4dDogZnVuY3Rpb24gKG9iaiwga2V5LCBpc19yZXF1aXJlZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAnPGJvc3N5LWlucHV0IHRpdGxlPVwiXFwnJytvYmoudGl0bGUrJ1xcJ1wiIHR5cGU9XCJcXCcnKyBvYmouaW5wdXRfdHlwZSArJ1xcJ1wiIHZhbHVlPVwiXFwnJytfZGF0YS5hZGRyZXNzW2tleV0rJ1xcJ1wiJyArICggaXNfcmVxdWlyZWQgPyAnIHJlcXVpcmVkJyA6ICcnICkgKyAnPjwvYm9zc3ktaW5wdXQ+JztcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICB0ZXh0QXJlYTogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAnPHRleHRhcmVhPjwvdGV4dGFyZWE+JztcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBjaGVja2JveDogZnVuY3Rpb24ob2JqKXtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gJzxkaXYgY2xhc3M9XCJjaGVja2JveFwiPjxsYWJlbD48aW5wdXQgdHlwZT1cImNoZWNrYm94XCI+JytvYmoudGl0bGUrJzwvbGFiZWw+PC9kaXY+JztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgZnVuY3Rpb24gc2V0RGF0YShkYXRhKSB7XHJcbiAgICAgICAgICAgIHZhciByZXN1bHQgPSAkZGF0YS5nZXREYXRhKGRhdGEpO1xyXG4gICAgICAgICAgICBpZiggYW5ndWxhci5pc0Z1bmN0aW9uKCByZXN1bHQudGhlbiApICYmIGFuZ3VsYXIuaXNGdW5jdGlvbiggcmVzdWx0LmNhdGNoICkgJiYgYW5ndWxhci5pc0Z1bmN0aW9uKCByZXN1bHQuZmluYWxseSApICkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIF9kYXRhID0gcmVzdWx0O1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZnVuY3Rpb24gc2V0U2NoZW1hKHNjaGVtYSkge1xyXG4gICAgICAgICAgICBfc2NoZW1hID0gJHNjaGVtYS5nZXRTY2hlbWEoc2NoZW1hKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIGJ1aWxkVGVtcGxhdGUoc2NoZW1hUGFydCwgcGFyZW50S2V5LCByZXF1aXJlZCkge1xyXG4gICAgICAgICAgICB2YXIgdGVtcGxhdGUgPSAnJyxcclxuICAgICAgICAgICAgICAgIGZ1bGxLZXkgPSAnJztcclxuICAgICAgICAgICAgYW5ndWxhci5mb3JFYWNoKHNjaGVtYVBhcnQsIGZ1bmN0aW9uKHZhbHVlLCBrZXkpIHtcclxuICAgICAgICAgICAgICAgIGlmICh2YWx1ZS50eXBlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coZnVsbEtleSArICcgaXMgJysgdmFsdWUudHlwZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgc3dpdGNoICh2YWx1ZS50eXBlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ29iamVjdCc6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgcmVxdWlyZWRfbGlzdCA9IHR5cGVvZiggdmFsdWUucmVxdWlyZWQgKSAhPT0gJ3VuZGVmaW5lZCcgPyB2YWx1ZS5yZXF1aXJlZCA6IG51bGw7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0ZW1wbGF0ZSArPSBidWlsZFRlbXBsYXRlKHZhbHVlLnByb3BlcnRpZXMsIGZ1bGxLZXksIHJlcXVpcmVkX2xpc3QgKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlICdhcnJheSc6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0ZW1wbGF0ZSArPSBidWlsZFRlbXBsYXRlKHZhbHVlLml0ZW1zLnByb3BlcnRpZXMsIGZ1bGxLZXkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ251bWJlcicgfHwgJ2ludGVnZXInOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGUgKz0gX2l0ZW1UZW1wbGF0ZS5udW1iZXIodmFsdWUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ3N0cmluZyc6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgaXNfcmVxdWlyZWQgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKCByZXF1aXJlZCAmJiByZXF1aXJlZC5pbmRleE9mKGtleSkgIT09IC0xICkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlzX3JlcXVpcmVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlICs9IF9pdGVtVGVtcGxhdGUudGV4dCh2YWx1ZSwga2V5LCBpc19yZXF1aXJlZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAnYm9vbGVhbic6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0ZW1wbGF0ZSArPSBfaXRlbVRlbXBsYXRlLmNoZWNrYm94KHZhbHVlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSwgdGhpcyk7XHJcbiAgICAgICAgICAgIHJldHVybiB0ZW1wbGF0ZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIHJlc3RyaWN0OiAnRScsXHJcbiAgICAgICAgICAgIHJlcGxhY2U6IHRydWUsXHJcbiAgICAgICAgICAgIHRlbXBsYXRlOiAnJyxcclxuICAgICAgICAgICAgc2NvcGU6IHtcclxuICAgICAgICAgICAgICAgIGNvbmZpZzonPScsIC8vQ3JlYXRlIHNjb3BlIGlzb2xhdGlvbiB3aXRoIGJpLWRpcmVjdGlvbmFsIGJpbmRpbmcsXHJcbiAgICAgICAgICAgICAgICB0aXRsZTogJz0nXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGxpbms6IGZ1bmN0aW9uIChzY29wZSwgZWxlbWVudCwgYXR0cmlidXRlcykge1xyXG4gICAgICAgICAgICAgICAgc2NvcGUuY29uZmlnLm9wdGlvbnMgPSBhbmd1bGFyLmV4dGVuZChfb3B0aW9ucywgc2NvcGUuY29uZmlnLm9wdGlvbnMpO1xyXG5cclxuICAgICAgICAgICAgICAgIHZhciBwcm9taXNlID0gc2V0RGF0YShzY29wZS5jb25maWcuZGF0YSk7XHJcbiAgICAgICAgICAgICAgICBzZXRTY2hlbWEoc2NvcGUuY29uZmlnLnNjaGVtYSk7XHJcbiAgICAgICAgICAgICAgICBpZiggcHJvbWlzZSApIHtcclxuICAgICAgICAgICAgICAgICAgICAvL3RvZG86IHNldCBkaXJlY3RpdmUgdG8gbG9hZGluZyBzdGF0ZVxyXG4gICAgICAgICAgICAgICAgICAgIHByb21pc2UudGhlbihcclxuICAgICAgICAgICAgICAgICAgICAgICAgZnVuY3Rpb24ocmVzdWx0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL3RvZG86IHNldCBkaXJlY3RpdmUgdG8gbG9hZGVkIHN0YXRlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBfZGF0YSA9IHJlc3VsdDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsZW1lbnQuaHRtbChcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnPGZvcm0gbm92YWxpZGF0ZSBjbGFzcz1cInt7Y29uZmlnLm9wdGlvbnMudGhlbWV9fVwiPicrXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJzxkaXYgY2xhc3M9XCJiYW5uZXIgcGFnZS1oZWFkZXJcIj48aDM+e3tjb25maWcub3B0aW9ucy5oZWFkZXJ9fTwvaDM+PC9kaXY+JytcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnVpbGRUZW1wbGF0ZShfc2NoZW1hKSArXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICc8YnV0dG9uIG5nLWlmPVwiY29uZmlnLm9wdGlvbnMuYnV0dG9uXCI+e3tjb25maWcub3B0aW9ucy5idXR0b259fTwvYnV0dG9uPicgK1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICc8ZGl2IGNsYXNzPVwicGFnZS1mb290ZXJcIj48aDM+e3tjb25maWcub3B0aW9ucy5mb290ZXJ9fTwvaDM+PC9kaXY+JytcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnPC9mb3JtPidcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkY29tcGlsZShlbGVtZW50LmNvbnRlbnRzKCkpKHNjb3BlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgZnVuY3Rpb24ocmVhc29uKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL3RvZG86IHNldCBkaXJlY3RpdmUgdG8gZXJyb3Igc3RhdGVcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgZWxlbWVudC5odG1sKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAnPGZvcm0gbm92YWxpZGF0ZSBjbGFzcz1cInt7Y29uZmlnLm9wdGlvbnMudGhlbWV9fVwiPkxPQURJTkcuLi48L2Zvcm0+J1xyXG4gICAgICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgICAgICAgICAgJGNvbXBpbGUoZWxlbWVudC5jb250ZW50cygpKShzY29wZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBlbGVtZW50Lmh0bWwoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICc8Zm9ybSBub3ZhbGlkYXRlIGNsYXNzPVwie3tjb25maWcub3B0aW9ucy50aGVtZX19XCI+JytcclxuICAgICAgICAgICAgICAgICAgICAgICAgJzxkaXYgY2xhc3M9XCJiYW5uZXIgcGFnZS1oZWFkZXJcIj48aDM+e3tjb25maWcub3B0aW9ucy5oZWFkZXJ9fTwvaDM+PC9kaXY+JytcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJ1aWxkVGVtcGxhdGUoX3NjaGVtYSkgK1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJzxidXR0b24gbmctaWY9XCJjb25maWcub3B0aW9ucy5idXR0b25cIj57e2NvbmZpZy5vcHRpb25zLmJ1dHRvbn19PC9idXR0b24+JyArXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICc8ZGl2IGNsYXNzPVwicGFnZS1mb290ZXJcIj48aDM+e3tjb25maWcub3B0aW9ucy5mb290ZXJ9fTwvaDM+PC9kaXY+JytcclxuICAgICAgICAgICAgICAgICAgICAgICAgJzwvZm9ybT4nXHJcbiAgICAgICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgICAgICAgICAkY29tcGlsZShlbGVtZW50LmNvbnRlbnRzKCkpKHNjb3BlKTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICB9XSlcclxuOyIsImFuZ3VsYXIubW9kdWxlKCdib3NzeS5pbnB1dCcsIFtdKVxyXG4gICAgLnJ1bihmdW5jdGlvbigkdGVtcGxhdGVDYWNoZSl7XHJcbiAgICAgICAgJHRlbXBsYXRlQ2FjaGUucHV0KCdib3NzeS1pbnB1dC5odG1sJywgJzxkaXYgY2xhc3M9XCJmb3JtLWdyb3VwIGJvc3N5LWlucHV0XCI+PGxhYmVsIGZvcj1cIlwiPnt7dGl0bGV9fTwvbGFiZWw+PGlucHV0IHR5cGU9XCJ7e3R5cGV9fVwiIGNsYXNzPVwiZm9ybS1jb250cm9sXCIgcGxhY2Vob2xkZXI9XCJcIiB2YWx1ZT1cInt7dmFsdWV9fVwiLz48c3Bhbj48L3NwYW4+PC9kaXY+Jyk7XHJcbiAgICB9KVxyXG4gICAgLmRpcmVjdGl2ZSgnYm9zc3lJbnB1dCcsWyckY29tcGlsZScsJyRodHRwJywnJHNjaGVtYScsJyRkYXRhJywnJHRlbXBsYXRlQ2FjaGUnLCBmdW5jdGlvbiAoJGNvbXBpbGUsICRodHRwLCAkc2NoZW1hLCAkZGF0YSwgJHRlbXBsYXRlQ2FjaGUpIHtcclxuICAgIFx0cmV0dXJuIHtcclxuXHRcdFx0cmVzdHJpY3Q6ICdFJyxcclxuXHRcdFx0cmVwbGFjZTogdHJ1ZSxcclxuXHRcdFx0c2NvcGU6IHtcclxuXHRcdFx0XHR0aXRsZTogJz0nLFxyXG5cdFx0XHRcdHZhbHVlOiAnPScsXHJcblx0XHRcdFx0dHlwZTogJz0nLFxyXG5cdFx0XHRcdHJlcXVpcmVkOiAnPSdcclxuXHRcdFx0fSxcclxuXHRcdFx0dGVtcGxhdGU6ICR0ZW1wbGF0ZUNhY2hlLmdldCgnYm9zc3ktaW5wdXQuaHRtbCcpXHJcblx0XHR9O1xyXG4gICAgfV0pO1xyXG4iLCJ2YXIgYXBwID0gYW5ndWxhci5tb2R1bGUoJ2Jvc3N5Lm51bWVyaWN0ZXh0Ym94JyxbXSk7XHJcblxyXG5cclxuYXBwLmNvbnRyb2xsZXIoJ2Jvc3N5bnVtZXJpY0N0cmwnLGZ1bmN0aW9uKCRzY29wZSl7XHJcbiAgICB2YXIgc3ltYm9scz1bJyQnLCclJywnbGJzJ107XHJcbiAgICB2YXIgaW5pdGlhbFZhbHVlPTA7XHJcblxyXG5cclxuICAgIHZhciBrZXkgPSB7XHJcbiAgICAgICAgcHJpY2U6MCxcclxuICAgICAgICB3ZWlnaHQ6MCxcclxuICAgICAgICBkaXNjb3VudDowLFxyXG4gICAgICAgIHN0b2NrOjBcclxuICAgIH07XHJcblxyXG5cclxuICAgICRzY29wZS5wID0gc3ltYm9sc1swXSArIGluaXRpYWxWYWx1ZTtcclxuICAgICRzY29wZS53ID0gaW5pdGlhbFZhbHVlICsgc3ltYm9sc1syXTtcclxuICAgICRzY29wZS5kID0gaW5pdGlhbFZhbHVlICsgc3ltYm9sc1sxXTtcclxuICAgICRzY29wZS5zID0gaW5pdGlhbFZhbHVlO1xyXG5cclxuICAgICRzY29wZS5pbmNyZW1lbnQgPSBmdW5jdGlvbihhKXtcclxuICAgICAgICBzd2l0Y2goYSl7XHJcbiAgICAgICAgICAgIGNhc2UgJ3ByaWNlJzpcclxuICAgICAgICAgICAgICAgIGtleS5wcmljZSsrO1xyXG4gICAgICAgICAgICAgICAgJHNjb3BlLnAgPSBzeW1ib2xzWzBdICsga2V5LnByaWNlO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgJ3dlaWdodCc6XHJcbiAgICAgICAgICAgICAgICBrZXkud2VpZ2h0Kys7XHJcbiAgICAgICAgICAgICAgICAkc2NvcGUudz1rZXkud2VpZ2h0ICsgc3ltYm9sc1syXTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlICdkaXNjb3VudCc6XHJcbiAgICAgICAgICAgICAgICBrZXkuZGlzY291bnQrKztcclxuICAgICAgICAgICAgICAgICRzY29wZS5kID0ga2V5LmRpc2NvdW50ICsgc3ltYm9sc1sxXTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlICdzdG9jayc6XHJcbiAgICAgICAgICAgICAgICBrZXkuc3RvY2srKztcclxuICAgICAgICAgICAgICAgICRzY29wZS5zPWtleS5zdG9jaztcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuICAgICRzY29wZS5kZWNyZW1lbnQgPSBmdW5jdGlvbihhKXtcclxuXHJcbiAgICAgICAgc3dpdGNoKGEpe1xyXG4gICAgICAgICAgICBjYXNlICdwcmljZSc6XHJcbiAgICAgICAgICAgICAgICBpZihrZXkucHJpY2U+MClcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBrZXkucHJpY2UtLTtcclxuICAgICAgICAgICAgICAgICAgICAkc2NvcGUucCA9IHN5bWJvbHNbMF0gKyBrZXkucHJpY2U7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAnd2VpZ2h0JzpcclxuICAgICAgICAgICAgICAgIGlmKGtleS53ZWlnaHQ+MCl7XHJcbiAgICAgICAgICAgICAgICAgICAga2V5LndlaWdodC0tO1xyXG4gICAgICAgICAgICAgICAgICAgICRzY29wZS53PWtleS53ZWlnaHQgKyBzeW1ib2xzWzJdO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgJ2Rpc2NvdW50JzpcclxuICAgICAgICAgICAgICAgIGlmKGtleS5kaXNjb3VudD4wKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGtleS5kaXNjb3VudC0tO1xyXG4gICAgICAgICAgICAgICAgICAgICRzY29wZS5kID0ga2V5LmRpc2NvdW50KyBzeW1ib2xzWzFdO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgJ3N0b2NrJzpcclxuICAgICAgICAgICAgICAgIGlmKGtleS5zdG9jaz4wKXtcclxuICAgICAgICAgICAgICAgICAgICBrZXkuc3RvY2stLTtcclxuICAgICAgICAgICAgICAgICAgICAkc2NvcGUucz1rZXkuc3RvY2s7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9O1xyXG5cclxufSk7XHJcblxyXG5cclxuYXBwLmRpcmVjdGl2ZSgnYm9zc3ludW1lcmljdGV4dGJveCcsZnVuY3Rpb24oKXtcclxuICAgIHJldHVybntcclxuICAgICAgICBjb250cm9sbGVyOidib3NzeW51bWVyaWNDdHJsJyxcclxuICAgICAgICByZXN0cmljdDonRScsXHJcbiAgICAgICAgdHJhbnNjbHVkZTp0cnVlLFxyXG4gICAgICAgIHRlbXBsYXRlVXJsOidib3NzeS5udW1lcmljdGV4dGJveC5odG1sJ1xyXG5cclxuICAgIH07XHJcbn0pOyIsImFuZ3VsYXIubW9kdWxlKCdib3NzeS5zY2hlbWEnLCBbXSlcclxuICAgIC5mYWN0b3J5KCckc2NoZW1hJywgWyckcScsICckaHR0cCcsIGZ1bmN0aW9uICgkcSwgJGh0dHApIHtcclxuXHJcbiAgICAgICAgZnVuY3Rpb24gX2dldFNjaGVtYSAoc2NoZW1hKSB7XHJcbiAgICAgICAgICAgIGlmIChhbmd1bGFyLmlzU3RyaW5nKHNjaGVtYSkpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBfZ2V0UmVtb3RlU2NoZW1hKHNjaGVtYSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSBpZiAoYW5ndWxhci5pc09iamVjdChzY2hlbWEpKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gc2NoZW1hO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgLy9UT0RPOiByZXBsYWNlIGVycm9yIG1lc3NhZ2Ugd2l0aCBvbmxpbmUgZG9jIGxpbmsgbGlrZSBuZyBlcnJvcnNcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ2RpcmVjdGl2ZS5ib3NzeUZvcm06IG5vIHNjaGVtYSB1cmwgb3Igb2JqZWN0IGdpdmVuJyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIF9nZXRSZW1vdGVTY2hlbWEoc2NoZW1hKSB7XHJcbiAgICAgICAgICAgIHZhciBkZWZlcnJlZCA9ICRxLmRlZmVyKCk7XHJcblxyXG4gICAgICAgICAgICAkaHR0cC5nZXQoIHNjaGVtYSApXHJcbiAgICAgICAgICAgICAgICAuc3VjY2VzcyggZnVuY3Rpb24oIGRhdGEgKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYoIGFuZ3VsYXIuaXNPYmplY3QoIGRhdGEgKSApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGVmZXJyZWQucmVzb2x2ZShkYXRhKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vVE9ETzogcmVwbGFjZSBlcnJvciBtZXNzYWdlIHdpdGggb25saW5lIGRvYyBsaW5rIGxpa2UgbmcgZXJyb3JzXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlamVjdCgnZGlyZWN0aXZlLmJvc3N5Rm9ybTogR0VUIHJlcXVlc3QgdG8gdXJsIGRpZCBub3QgcHJvZHVjZSBzY2hlbWEgb2JqZWN0Jyk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5lcnJvciggZnVuY3Rpb24oZGF0YSwgc3RhdHVzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy9UT0RPOiByZXBsYWNlIGVycm9yIG1lc3NhZ2Ugd2l0aCBvbmxpbmUgZG9jIGxpbmsgbGlrZSBuZyBlcnJvcnNcclxuICAgICAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZWplY3QoJ2RpcmVjdGl2ZS5ib3NzeUZvcm06IEdFVCByZXF1ZXN0IHRvIHVybCBcIicgKyBzY2hlbWEgKyAnXCIgZmFpbGVkIHdpdGggc3RhdHVzIFwiJyArIHN0YXR1cyArICdcIicpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gZGVmZXJyZWQucHJvbWlzZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIGdldFNjaGVtYTogX2dldFNjaGVtYVxyXG4gICAgICAgIH07XHJcbiAgICB9XSlcclxuO1xyXG4iLCIvKlRoaXMgaXMgYSBzbGlkZXIgd2lkZ2V0IGNyZWF0ZWQgaW4gYW5ndWxhciBhcyBwYXJ0IG9mIHRoZSBCb3NzeVVJIHdpZGdldHMuXHJcbiAqIFRoZSBlYXNpZXN0IHdheSB0byB1c2UgdGhlIHNsaWRlciBpcyB0byBpbmNsdWRlIGl0IGluIHlvdXIgSFRNTCBhbmQgdGhlblxyXG4gKiBjcmVhdGUgYSB0YWcgPGJvc3N5LXNsaWRlcj48L2Jvc3N5LXNsaWRlcj4uIFRoaXMgd2lkZ2V0IHRha2UgaW4gc2V2ZXJhbFxyXG4gKiB3YXlzIHRvIGN1c3RvbWl6ZS4gTGlzdCBvZiBjdXN0b21pemF0aW9ucyBhdmFpbGFibGUuXHJcbiAqIG1heCAgICAgICAgICAgICAgZGVmYXVsdHMgdG8gMTAwXHJcbiAqIG1pbiAgICAgICAgICAgICAgZGVmYXVsdHMgdG8gMVxyXG4gKiB3aWR0aCAgICAgICAgICAgIGRlZmF1bHRzIHRvIDI1MHB4XHJcbiAqIGJhcmZpbGxjb2xvciAgICAgZGVmYXVsdHMgdG8gZGFya2JsdWU6IG11c3QgYmUgcGFzc2VkIGFzIGhleGFkZWNpbWFsIGNvbG9yIGZvcm1hdCAjMDAwMDAwXHJcbiAqIGJhcmVtcHR5Y29sb3IgICAgZGVmYXVsdHMgdG8gbGlnaHRncmV5XHJcbiAqIGJ1dHRvbmNvbG9yICAgICAgZGVmYXVsdHMgdG8gcmVkXHJcbiAqIHN0ZXAgICAgICAgICAgICAgZGVmYXVsdHMgdG8gcmVkXHJcbiAqIG9yaWVudGF0aW9uICAgICAgZGVmYXVsdHMgdG8gaG9yaXpvbnRhbFxyXG4gKiBleC5cclxuICogPGJvc3N5LXNsaWRlciBtYXg9XCIyMFwiIG1pbj1cIi01XCIgb3JpZW50YXRpb249XCJ2ZXJ0aWNhbFwiPjwvYm9zc3ktc2xpZGVyPiovXHJcbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xyXG5cclxudmFyIGFwcCA9IGFuZ3VsYXIubW9kdWxlKCdib3NzeS5zbGlkZXInLCBbXSk7XHJcbmFwcC5jb250cm9sbGVyKCdTbGlkZXJDb250cm9sbGVyJywgWyckc2NvcGUnLCBmdW5jdGlvbiAoJHNjb3BlKSB7XHJcbiAgICAvL3RoZXNlIGFyZSBvdXIgZGVmYXVsdCB2YWx1ZXMgYW5kIGFyZSB0aGUgdmFyaWFibGVzIHRoYXQgY2FuIGJlIGNoYW5nZWQgYnkgdXNlciBvZiBvdXIgd2lkZ2V0c1xyXG4gICAgJHNjb3BlLm1heCA9IDEwO1xyXG4gICAgJHNjb3BlLnZhbHVlID0gMDtcclxuICAgICRzY29wZS5taW4gPSAxO1xyXG4gICAgJHNjb3BlLmZpbGxXaWR0aCA9IDA7XHJcbiAgICAkc2NvcGUuZW1wdFdpZHRoID0gMDtcclxuICAgICRzY29wZS5iYXJXaWR0aCA9IDI1MDtcclxuICAgICRzY29wZS5iYXJQaWVjZSA9IDA7XHJcbiAgICAkc2NvcGUuc3RlcCA9IDE7XHJcbiAgICAkc2NvcGUuaXNNb3VzZURvd24gPSAwO1xyXG4gICAgJHNjb3BlLnlDb3JkID0gMDtcclxuICAgICRzY29wZS54Q29yZCA9IDA7XHJcbiAgICAkc2NvcGUubmV3WENvcmQgPSAwO1xyXG4gICAgJHNjb3BlLm5ld1lDb3JkID0gMDtcclxuICAgICRzY29wZS5vcmllbnRhdGlvbiA9IGZhbHNlO1xyXG4gICAgJHNjb3BlLmJ1dFNpemUgPSAxNTtcclxuICAgICRzY29wZS5iYXJmaWxsY29sb3IgPSAnIzAwMDBGRic7XHJcbiAgICAkc2NvcGUuYmFyZW1wdHljb2xvciA9ICcjRDNEM0QzJztcclxuICAgICRzY29wZS5idXR0b25jb2xvciA9ICcjRkYwMDAwJztcclxuXHJcblxyXG4gICAgLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXHJcblxyXG4gICAgLyptYWtlQmFyKClcclxuICAgICAqIFRoaXMgY3JlYXRlcyB0aGUgaW5pdGlhbCBncmFwaGljIG9mIHRoZSBzbGlkZXIgYW5kIGVuc3VyZXMgaXQgaXMgaW4gdGhlIGNvcnJlY3Qgb3JkZXJcclxuICAgICAqIENDID0gNCAqL1xyXG4gICAgJHNjb3BlLm1ha2VCYXIgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgLy9idXR0b24gc2hvdWxkIHNob3cgdXAgaW4gdGhlIG1pZGRsZSBub3cgb3IgY2xvc2UgdG8gaWYgdW5ldmVuXHJcbiAgICAgICAgJHNjb3BlLnZhbHVlID0gcGFyc2VJbnQoKCRzY29wZS5tYXggKyAkc2NvcGUubWluKSAvIDIpO1xyXG4gICAgICAgIGZvciAodmFyIGN1cnJlbnQgPSAkc2NvcGUubWluOyBjdXJyZW50IDw9ICRzY29wZS5tYXg7IGN1cnJlbnQrKykge1xyXG4gICAgICAgICAgICBpZiAoY3VycmVudCA8ICRzY29wZS52YWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgJHNjb3BlLmZpbGxXaWR0aCsrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChjdXJyZW50ID4gJHNjb3BlLnZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICAkc2NvcGUuZW1wdFdpZHRoKys7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgJHNjb3BlLm5nTW9kZWwgPSAkc2NvcGUudmFsdWU7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgfTtcclxuICAgIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xyXG5cclxuICAgIC8qaW5jcmVhc2UoKVxyXG4gICAgICogVGhpcyBjaGVja3MgYm91bmRzIHdoZW4gYXR0ZW1wdGluZyB0byBpbmNyZWFzZSB0aGUgdmFsdWUgYW5kIG1vdmVzIHRoZSBwb3NpdGlvblxyXG4gICAgICogb2YgdGhlIHNsaWRlciBidXR0b24gYW5kIHVwZGF0ZXMgdGhlIHZhbHVlLlxyXG4gICAgICogQ0MgPSAyKi9cclxuICAgICRzY29wZS5pbmNyZWFzZSA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBpZiAoJHNjb3BlLnZhbHVlIDwgJHNjb3BlLm1heCkge1xyXG4gICAgICAgICAgICAkc2NvcGUudmFsdWUgPSAkc2NvcGUudmFsdWUgKyAxO1xyXG4gICAgICAgICAgICAkc2NvcGUuZmlsbFdpZHRoKys7XHJcbiAgICAgICAgICAgICRzY29wZS5lbXB0V2lkdGgtLTtcclxuICAgICAgICAgICAgJHNjb3BlLm5nTW9kZWwgPSAkc2NvcGUudmFsdWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybjtcclxuICAgIH07XHJcbiAgICAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cclxuXHJcbiAgICAvKmJ1dEluY3JlYXNlKClcclxuICAgICAqIFRoaXMgZnVuY3Rpb24gYWxsb3dzIHRoZSBzbGlkZXIgdG8gaW5jcmVhc2UgaW4gaW5jcmVtZW50cy5cclxuICAgICAqIENDID0gMSovXHJcbiAgICAkc2NvcGUuYnV0SW5jcmVhc2UgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdmFyIGkgPSAwO1xyXG4gICAgICAgIGZvciAoaSA9IDA7IGkgPCAkc2NvcGUuc3RlcDsgaSsrKSB7XHJcbiAgICAgICAgICAgICRzY29wZS5pbmNyZWFzZSgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm47XHJcbiAgICB9O1xyXG4gICAgLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXHJcblxyXG4gICAgLypkZWNyZWFzZSgpXHJcbiAgICAgKiBUaGlzIGNoZWNrcyBib3VuZHMgd2hlbiBhdHRlbXB0aW5nIHRvIGRlY3JlYXNlIHRoZSB2YWx1ZSBhbmQgbW92ZXMgdGhlIHBvc2l0aW9uXHJcbiAgICAgKiBvZiB0aGUgc2xpZGVyIGJ1dHRvbiBhbmQgdXBkYXRlcyB0aGUgdmFsdWUuXHJcbiAgICAgKiBDQyA9IDIqL1xyXG4gICAgJHNjb3BlLmRlY3JlYXNlID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGlmICgkc2NvcGUudmFsdWUgPiAkc2NvcGUubWluKSB7XHJcbiAgICAgICAgICAgICRzY29wZS52YWx1ZSA9ICRzY29wZS52YWx1ZSAtIDE7XHJcbiAgICAgICAgICAgICRzY29wZS5maWxsV2lkdGgtLTtcclxuICAgICAgICAgICAgJHNjb3BlLmVtcHRXaWR0aCsrO1xyXG4gICAgICAgICAgICAkc2NvcGUubmdNb2RlbCA9ICRzY29wZS52YWx1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgfTtcclxuICAgIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xyXG5cclxuICAgIC8qYnV0RGVjcmVhc2UoKVxyXG4gICAgICogVGhpcyBmdW5jdGlvbiBhbGxvd3MgdGhlIHNsaWRlciB0byBkZWNyZWFzZSBpbiBpbmNyZW1lbnRzXHJcbiAgICAgKiBDQyA9IDEqL1xyXG4gICAgJHNjb3BlLmJ1dERlY3JlYXNlID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHZhciBpID0gMDtcclxuICAgICAgICBmb3IgKGkgPSAwOyBpIDwgJHNjb3BlLnN0ZXA7IGkrKykge1xyXG4gICAgICAgICAgICAkc2NvcGUuZGVjcmVhc2UoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgfTtcclxuICAgIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xyXG5cclxuICAgIC8qa2V5QmluZCgkZXZlbnQpXHJcbiAgICAgKiBUaGlzIGZ1bmN0aW9uIGlzIHRvIGJpbmQgdGhlIGRlY3JlYXNlIGFuZCBpbmNyZWFzZSBmdW5jdGlvbiB3aXRoIHRoZSBhcnJvdyBrZXlzXHJcbiAgICAgKiBDQyA9IDUqL1xyXG4gICAgJHNjb3BlLmtleUJpbmQgPSBmdW5jdGlvbiAoZXYpIHtcclxuICAgICAgICAkc2NvcGUucHJlc3NlZCA9IGV2LndoaWNoO1xyXG4gICAgICAgIC8vSWYgYXJyb3cga2V5KExlZnQgb3IgRG93bikgaXMgcHJlc3NlZCB0aGVuIGNhbGwgdGhlIGRlY3JlYXNlKCkgZnVuY3Rpb24gdG8gZGVjcmVhc2UgdGhlIHZhbHVlLlxyXG4gICAgICAgIGlmICgkc2NvcGUucHJlc3NlZCA9PT0gMzcgfHwgJHNjb3BlLnByZXNzZWQgPT09IDQwKSB7XHJcbiAgICAgICAgICAgICRzY29wZS5idXREZWNyZWFzZSgpO1xyXG5cclxuICAgICAgICB9XHJcbiAgICAgICAgLy9zYW1lIGFzIGFib3ZlIGJ1dCBmb3IgVXAgb3IgUmlnaHQgdG8gaW5jcmVhc2UgdGhlIHZhbHVlLlxyXG4gICAgICAgIGlmICgkc2NvcGUucHJlc3NlZCA9PT0gMzggfHwgJHNjb3BlLnByZXNzZWQgPT09IDM5KSB7XHJcbiAgICAgICAgICAgICRzY29wZS5idXRJbmNyZWFzZSgpO1xyXG5cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgfTtcclxuICAgIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xyXG5cclxuICAgIC8qZ3JleUNsaWNrKClcclxuICAgICAqIFRoaXMgZnVuY3Rpb24gaXMgdG8gYWxsb3cgdGhlIHZhbHVlIHRvIGJlIGNoYW5nZWQgd2hlbiBjbGlja2luZyBvbiB0aGUgYmFyXHJcbiAgICAgKiBDQyA9IDEqL1xyXG4gICAgJHNjb3BlLmdyZXlDbGljayA9IGZ1bmN0aW9uIChldmVudCkge1xyXG4gICAgICAgIC8vV2hlbiBjbGljayBvbiB0aGUgZW1wdHkgYmFyIHRoZSBiYXIgd2lsbCBpbmNyZWFzZVxyXG4gICAgICAgICRzY29wZS5idXRJbmNyZWFzZSgpO1xyXG5cclxuICAgICAgICByZXR1cm47XHJcbiAgICB9O1xyXG4gICAgLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXHJcblxyXG4gICAgLypiYXJDbGljaygpXHJcbiAgICAgKiBUaGlzIGZ1bmN0aW9uIGlzIHRvIGFsbG93IHRoZSB2YWx1ZSB0byBiZSBjaGFuZ2VkIHdoZW4gY2xpY2tpbmcgb24gdGhlIGJhclxyXG4gICAgICogQ0MgPSAxKi9cclxuICAgICRzY29wZS5iYXJDbGljayA9IGZ1bmN0aW9uIChldmVudCkge1xyXG4gICAgICAgIC8vV2hlbiBjbGljayBvbiB0aGUgRmlsbGVkIHVwIGNvbG9yIHNpZGUgdGhlIGJhciB3aWxsIGRlY3JlYXNlXHJcbiAgICAgICAgJHNjb3BlLmJ1dERlY3JlYXNlKCk7XHJcblxyXG4gICAgICAgIHJldHVybjtcclxuICAgIH07XHJcbiAgICAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cclxuXHJcbiAgICAvKmRyYWcoJGV2ZW50KVxyXG4gICAgICogVGhpcyBmdW5jdGlvbiBhbGxvd3MgdGhlIGJ1dHRvbiB0byBkcmFnIGJ5IGZpbmRpbmcgaXRzIGxvY2F0aW9uIHRoZW4gY2hlY2tzIGl0IGFnYWluc3QgaXRzIG9yaWdpbmFsIGxvY2F0aW9uXHJcbiAgICAgKiBhbmQgaWYgaXQgaXMgZGlzdGFuY2UgaXMgZ3JlYXRlciB0aGFuIHRoZSBzaXplIG9mIGEgYmFycGllY2UgdXBkYXRlIHRoZSBncmFwaGljIGFuZCB2YWx1ZVxyXG4gICAgICogQ0MgPSA5Ki9cclxuICAgICRzY29wZS5kcmFnID0gZnVuY3Rpb24gKGV2ZW50KSB7XHJcblxyXG4gICAgICAgIC8vZ3JhYiB0aGUgbW91c2UgbG9jYXRpb25cclxuICAgICAgICB2YXIgeCA9IGV2ZW50LmNsaWVudFg7XHJcbiAgICAgICAgdmFyIHkgPSBldmVudC5jbGllbnRZO1xyXG4gICAgICAgIC8vY2hlY2sgaWYgdGhlIG1vdXNlIGlzIGJlaW5nIGhlbGQgZG93blxyXG4gICAgICAgIGlmICgkc2NvcGUuaXNNb3VzZURvd24pIHtcclxuICAgICAgICAgICAgLy9jaGVjayB0aGUgb3JpZW50YXRpb25cclxuICAgICAgICAgICAgaWYgKCRzY29wZS5vcmllbnRhdGlvbikge1xyXG4gICAgICAgICAgICAgICAgLy9pZiB0aGlzIGlzIHRoZSBmaXJzdCB0aW1lIHlvdSBjbGlja2VkIGRvd24gZ2V0IHJlYWR5IHRvIG1vdmUgaXRcclxuICAgICAgICAgICAgICAgIGlmICgkc2NvcGUueUNvcmQgPT09IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAkc2NvcGUueUNvcmQgPSB5O1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy9jaGFuZ2UgdGhlIGxvY2F0aW9uIG9mIHRoZSBzbGlkZXIgYWZ0ZXIgZW5vdWdoIG1vdmVtZW50XHJcbiAgICAgICAgICAgICAgICAgICAgJHNjb3BlLm5ld1lDb3JkID0geTtcclxuICAgICAgICAgICAgICAgICAgICB3aGlsZSAoKCRzY29wZS5uZXdZQ29yZCAtICRzY29wZS55Q29yZCkgPiAkc2NvcGUuYmFyUGllY2UgLyAyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICRzY29wZS55Q29yZCArPSAkc2NvcGUuYmFyUGllY2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICRzY29wZS5kZWNyZWFzZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB3aGlsZSAoKCRzY29wZS5uZXdZQ29yZCAtICRzY29wZS55Q29yZCkgPCAtKCRzY29wZS5iYXJQaWVjZSAvIDIpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICRzY29wZS55Q29yZCAtPSAkc2NvcGUuYmFyUGllY2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICRzY29wZS5pbmNyZWFzZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIC8vaWYgdGhpcyBpcyB0aGUgZmlyc3QgdGltZSB5b3UgY2xpY2tlZCBkb3duIGdldCByZWFkeSB0byBtb3ZlIGl0XHJcbiAgICAgICAgICAgICAgICBpZiAoJHNjb3BlLnhDb3JkID09PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgJHNjb3BlLnhDb3JkID0geDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vY2hhbmdlIHRoZSBsb2NhdGlvbiBvZiB0aGUgc2xpZGVyIGFmdGVyIGVub3VnaCBtb3ZlbWVudFxyXG4gICAgICAgICAgICAgICAgICAgICRzY29wZS5uZXdYQ29yZCA9IHg7XHJcbiAgICAgICAgICAgICAgICAgICAgd2hpbGUgKCgkc2NvcGUubmV3WENvcmQgLSAkc2NvcGUueENvcmQpID4gJHNjb3BlLmJhclBpZWNlIC8gMikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAkc2NvcGUueENvcmQgKz0gJHNjb3BlLmJhclBpZWNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAkc2NvcGUuaW5jcmVhc2UoKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgd2hpbGUgKCgkc2NvcGUubmV3WENvcmQgLSAkc2NvcGUueENvcmQpIDwgLSgkc2NvcGUuYmFyUGllY2UgLyAyKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAkc2NvcGUueENvcmQgLT0gJHNjb3BlLmJhclBpZWNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAkc2NvcGUuZGVjcmVhc2UoKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgfTtcclxuICAgIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xyXG5cclxuICAgIC8qZG93bigpXHJcbiAgICAgKiBUaGlzIGZ1bmN0aW9uIGxvZ3Mgd2hlbiB0aGUgbW91c2UgaXMgZG93blxyXG4gICAgICogQ0MgPSAxKi9cclxuICAgICRzY29wZS5kb3duID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICRzY29wZS5uZXdYQ29yZCA9IDA7XHJcbiAgICAgICAgJHNjb3BlLnhDb3JkID0gMDtcclxuICAgICAgICAkc2NvcGUubmV3WUNvcmQgPSAwO1xyXG4gICAgICAgICRzY29wZS55Q29yZCA9IDA7XHJcbiAgICAgICAgJHNjb3BlLmlzTW91c2VEb3duID0gMTtcclxuICAgICAgICByZXR1cm47XHJcbiAgICB9O1xyXG4gICAgLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXHJcblxyXG4gICAgLypkb3duKClcclxuICAgICAqIFRoaXMgZnVuY3Rpb24gbG9ncyB3aGVuIHRoZSBtb3VzZSBpcyB1cFxyXG4gICAgICogQ0MgPSAxKi9cclxuICAgICRzY29wZS51cCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAkc2NvcGUubmV3WENvcmQgPSAwO1xyXG4gICAgICAgICRzY29wZS54Q29yZCA9IDA7XHJcbiAgICAgICAgJHNjb3BlLm5ld1lDb3JkID0gMDtcclxuICAgICAgICAkc2NvcGUueUNvcmQgPSAwO1xyXG4gICAgICAgICRzY29wZS5pc01vdXNlRG93biA9IDA7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgfTtcclxuICAgIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xyXG59XSk7XHJcbmFwcC5kaXJlY3RpdmUoJ2Jvc3N5U2xpZGVyJywgZnVuY3Rpb24gKCRjb21waWxlKSB7XHJcbiAgICB2YXIgbXlUZW1wbGF0ZTtcclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgLy9hbGxvd3MgdGhlIHNsaWRlciB0byBiZSBjcmVhdGVkIGFzIGFuZCBhdHRyaWJ1dGUgb3IgZWxlbWVudCA8Ym9zc3ktc2xpZGVyPjxib3NzeS1zbGlkZXI+XHJcbiAgICAgICAgcmVzdHJpY3Q6ICdBRScsXHJcbiAgICAgICAgY29udHJvbGxlcjogJ1NsaWRlckNvbnRyb2xsZXInLFxyXG4gICAgICAgIHNjb3BlOiB7XHJcbiAgICAgICAgICAgIG5nTW9kZWw6ICc9J1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgLypsaW5rOiBmdW5jdGlvbjpcclxuICAgICAgICAgKiBUaGlzIGFsbG93cyB1cyB0byBwdWxsIGluIHRoZSBzZXR0aW5ncyB0aGUgcHJvZ3JhbW1lciB3YW50cyBmb3IgdGhlIHNsaWRlciBhbmQgc2V0IHRoaW5ncyBjb3JyZWN0bHlcclxuICAgICAgICAgKiBpdCBhbHNvIGluaXRpYWxpemVzIHRoZSBzbGlkZXIgYW5kIGFkZHMgdGhlIGNvcnJlY3Qgb3JpZW50YXRpb24gdGVtcGxhdGUgdG8gdGhlIERPTSovXHJcbiAgICAgICAgbGluazoge1xyXG4gICAgICAgICAgICBwcmU6IGZ1bmN0aW9uIChzY29wZSwgaUVsZW0sIGlBdHRyKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgcGF0dGVybiA9IC9eI1swLTlhLWZBLUZdezZ9JC87IC8vY3VycmVudGx5IGFjY2VwdHMgbG93ZXIgY2FzZSBhLWZcclxuXHJcbiAgICAgICAgICAgICAgICAvL2NoZWNrcyB0byBzZWUgaWYgdGhlcmUgaXMgYSBtYXggYXR0cmlidXRlXHJcbiAgICAgICAgICAgICAgICBpZiAoaUF0dHIubWF4KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2NvcGUubWF4ID0gcGFyc2VJbnQoaUF0dHIubWF4KTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoaXNOYU4oc2NvcGUubWF4KSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzY29wZS5tYXggPSAxMDtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAvL2NoZWNrcyB0byBzZWUgaWYgdGhlcmUgaXMgYSBtaW4gYXR0cmlidXRlXHJcbiAgICAgICAgICAgICAgICBpZiAoaUF0dHIubWluKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2NvcGUubWluID0gcGFyc2VJbnQoaUF0dHIubWluKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoaXNOYU4oc2NvcGUubWluKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzY29wZS5taW4gPSAxO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIC8vY2hlY2tzIGZvciBiYXIgY29sb3IgY3VzdG9taXphdGlvblxyXG4gICAgICAgICAgICAgICAgaWYgKGlBdHRyLmJhcmZpbGxjb2xvcikge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChwYXR0ZXJuLnRlc3QoaUF0dHIuYmFyZmlsbGNvbG9yKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzY29wZS5iYXJmaWxsY29sb3IgPSBpQXR0ci5iYXJmaWxsY29sb3I7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgLy9jaGVja3MgZm9yIGVtcHR5IGJhciBjb2xvciBjdXN0b21pemF0aW9uXHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKGlBdHRyLmJhcmVtcHR5Y29sb3IpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAocGF0dGVybi50ZXN0KGlBdHRyLmJhcmVtcHR5Y29sb3IpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNjb3BlLmJhcmVtcHR5Y29sb3IgPSBpQXR0ci5iYXJlbXB0eWNvbG9yO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKGlBdHRyLmJ1dHRvbmNvbG9yKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHBhdHRlcm4udGVzdChpQXR0ci5idXR0b25jb2xvcikpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2NvcGUuYnV0dG9uY29sb3IgPSBpQXR0ci5idXR0b25jb2xvcjtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAvL2ZpbmQgdGhlIHN0ZXAgc2l6ZSBmb3IgYnV0dG9uIGNsaWNrc1xyXG4gICAgICAgICAgICAgICAgaWYgKGlBdHRyLnN0ZXApIHtcclxuICAgICAgICAgICAgICAgICAgICBzY29wZS5zdGVwID0gaUF0dHIuc3RlcDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIC8vZmluZCB0aGUgcHJlZmVycmVkIHRvdGFsIHdpZHRoIHRvIHVzZSBmb3IgdGhlIHNsaWRlclxyXG4gICAgICAgICAgICAgICAgaWYgKGlBdHRyLndpZHRoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2NvcGUuYmFyV2lkdGggPSBpQXR0ci53aWR0aDtcclxuICAgICAgICAgICAgICAgICAgICBzY29wZS5iYXJQaWVjZSA9IChzY29wZS5iYXJXaWR0aCAvIChzY29wZS5tYXggLSBzY29wZS5taW4pKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHNjb3BlLmJhclBpZWNlID0gKHNjb3BlLmJhcldpZHRoIC8gKHNjb3BlLm1heCAtIHNjb3BlLm1pbikpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgLy9jaGVja3MgdG8gc2VlIGlmIHRoZXJlIGlzIGEgb3JpZW50YXRpb24gYXR0cmlidXRlIGlmIHRoZXJlIGlzIHNldCBvdXIgdGVtcGxhdGUgdG8gdGhlIHZlcnRpY2FsIHRlbXBsYXRlXHJcbiAgICAgICAgICAgICAgICBpZiAoaUF0dHIub3JpZW50YXRpb24pIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoJ3ZlcnRpY2FsJyA9PT0gaUF0dHIub3JpZW50YXRpb24pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2NvcGUub3JpZW50YXRpb24gPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBteVRlbXBsYXRlID0gJzxkaXYgb25zZWxlY3RzdGFydD1cInJldHVybiBmYWxzZTtcIiBvbmRyYWdzdGFydD1cInJldHVybiBmYWxzZTtcIm5nLW1vdXNlbGVhdmU9XCJ1cCgpXCIgbmctbW91c2Vtb3ZlPVwiZHJhZygkZXZlbnQpXCI+JyArXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICc8ZGl2IG5nLW1vdXNlbW92ZT1cImRyYWcoJGV2ZW50KVwiIG5nLW1vdXNldXA9XCJ1cCgpXCIgbmctY2xpY2s9XCJncmV5Q2xpY2soKVwic3R5bGU9XCJjdXJzb3I6cG9pbnRlcjttYXJnaW4tbGVmdDo5cHg7d2lkdGg6NXB4O2hlaWdodDp7e2JhclBpZWNlICogZW1wdFdpZHRofX1weDtiYWNrZ3JvdW5kLWNvbG9yOicgKyBzY29wZS5iYXJlbXB0eWNvbG9yICsgJzttYXJnaW4tYm90dG9tOjRweFwiPjwvZGl2PicgK1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAnPGRpdiBuZy1tb3VzZW1vdmU9XCJkcmFnKCRldmVudClcIiBuZy1tb3VzZWRvd249XCJkb3duKClcIiBuZy1tb3VzZXVwPVwidXAoKVwiIG9yaWVudGF0aW9uPVwidmVydGljYWxcIiBzdHlsZT1cImN1cnNvcjpucy1yZXNpemU7bWFyZ2luLXRvcDotNHB4O21hcmdpbi1sZWZ0OjVweDt3aWR0aDoxNXB4O2hlaWdodDoxNXB4O2JhY2tncm91bmQtY29sb3I6JyArIHNjb3BlLmJ1dHRvbmNvbG9yICsgJztib3JkZXItcmFkaXVzOjUwJTtcIj48L2Rpdj4nICtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJzxkaXYgbmctbW91c2Vtb3ZlPVwiZHJhZygkZXZlbnQpXCIgbmctbW91c2V1cD1cInVwKClcIiBuZy1jbGljaz1cImJhckNsaWNrKClcInN0eWxlPVwiY3Vyc29yOnBvaW50ZXI7bWFyZ2luLWxlZnQ6OXB4O3dpZHRoOjVweDtoZWlnaHQ6e3tiYXJQaWVjZSAqIGZpbGxXaWR0aH19cHg7YmFja2dyb3VuZC1jb2xvcjonICsgc2NvcGUuYmFyZmlsbGNvbG9yICsgJzttYXJnaW4tYm90dG9tOjRweFwiPjwvZGl2PicgK1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAnPC9kaXY+JztcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG15VGVtcGxhdGUgPSAnPGRpdiBvbnNlbGVjdHN0YXJ0PVwicmV0dXJuIGZhbHNlO1wiIG9uZHJhZ3N0YXJ0PVwicmV0dXJuIGZhbHNlO1wiIG5nLW1vdXNlbGVhdmU9XCJ1cCgpXCJuZy1tb3VzZW1vdmU9XCJkcmFnKCRldmVudClcIj4nICtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJzxkaXYgbmctbW91c2Vtb3ZlPVwiZHJhZygkZXZlbnQpXCIgbmctbW91c2V1cD1cInVwKClcIiBuZy1jbGljaz1cImJhckNsaWNrKClcInN0eWxlPVwiY3Vyc29yOnBvaW50ZXI7ZGlzcGxheTppbmxpbmUtYmxvY2s7d2lkdGg6e3tiYXJQaWVjZSAqIGZpbGxXaWR0aH19cHg7aGVpZ2h0OjVweDtiYWNrZ3JvdW5kLWNvbG9yOicgKyBzY29wZS5iYXJmaWxsY29sb3IgKyAnO21hcmdpbi1ib3R0b206NHB4XCI+PC9kaXY+JyArXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICc8ZGl2IG5nLW1vdXNlbW92ZT1cImRyYWcoJGV2ZW50KVwiIG5nLW1vdXNlZG93bj1cImRvd24oKVwiIG5nLW1vdXNldXA9XCJ1cCgpXCIgb3JpZW50YXRpb249XCJob3Jpem9udGFsXCIgc3R5bGU9XCJjdXJzb3I6ZXctcmVzaXplO2Rpc3BsYXk6aW5saW5lLWJsb2NrO3dpZHRoOnt7YnV0U2l6ZX19cHg7aGVpZ2h0Ont7YnV0U2l6ZX19cHg7YmFja2dyb3VuZC1jb2xvcjonICsgc2NvcGUuYnV0dG9uY29sb3IgKyAnO2JvcmRlci1yYWRpdXM6NTAlO1wiPjwvZGl2PicgK1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAnPGRpdiBuZy1tb3VzZW1vdmU9XCJkcmFnKCRldmVudClcIiBuZy1tb3VzZXVwPVwidXAoKVwiIG5nLWNsaWNrPVwiZ3JleUNsaWNrKClcInN0eWxlPVwiY3Vyc29yOnBvaW50ZXI7ZGlzcGxheTppbmxpbmUtYmxvY2s7d2lkdGg6e3tiYXJQaWVjZSAqIGVtcHRXaWR0aH19cHg7aGVpZ2h0OjVweDtiYWNrZ3JvdW5kLWNvbG9yOicgKyBzY29wZS5iYXJlbXB0eWNvbG9yICsgJzttYXJnaW4tYm90dG9tOjRweFwiPjwvZGl2PicgK1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAnPC9kaXY+JztcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAvL3RoaXMgYnVpbGRzIG91ciBob3Jpem9udGFsIHRlbXBsYXRlXHJcbiAgICAgICAgICAgICAgICAgICAgbXlUZW1wbGF0ZSA9ICc8ZGl2IG9uc2VsZWN0c3RhcnQ9XCJyZXR1cm4gZmFsc2U7XCIgb25kcmFnc3RhcnQ9XCJyZXR1cm4gZmFsc2U7XCIgbmctbW91c2VsZWF2ZT1cInVwKClcIm5nLW1vdXNlbW92ZT1cImRyYWcoJGV2ZW50KVwiPicgK1xyXG4gICAgICAgICAgICAgICAgICAgICc8ZGl2IG5nLW1vdXNlbW92ZT1cImRyYWcoJGV2ZW50KVwiIG5nLW1vdXNldXA9XCJ1cCgpXCIgbmctY2xpY2s9XCJiYXJDbGljaygpXCJzdHlsZT1cImN1cnNvcjpwb2ludGVyO2Rpc3BsYXk6aW5saW5lLWJsb2NrO3dpZHRoOnt7YmFyUGllY2UgKiBmaWxsV2lkdGh9fXB4O2hlaWdodDo1cHg7YmFja2dyb3VuZC1jb2xvcjonICsgc2NvcGUuYmFyZmlsbGNvbG9yICsgJzttYXJnaW4tYm90dG9tOjRweFwiPjwvZGl2PicgK1xyXG4gICAgICAgICAgICAgICAgICAgICc8ZGl2IG5nLW1vdXNlbW92ZT1cImRyYWcoJGV2ZW50KVwiIG5nLW1vdXNlZG93bj1cImRvd24oKVwiIG5nLW1vdXNldXA9XCJ1cCgpXCIgb3JpZW50YXRpb249XCJob3Jpem9udGFsXCIgc3R5bGU9XCJjdXJzb3I6ZXctcmVzaXplO2Rpc3BsYXk6aW5saW5lLWJsb2NrO3dpZHRoOnt7YnV0U2l6ZX19cHg7aGVpZ2h0Ont7YnV0U2l6ZX19cHg7YmFja2dyb3VuZC1jb2xvcjonICsgc2NvcGUuYnV0dG9uY29sb3IgKyAnO2JvcmRlci1yYWRpdXM6NTAlO1wiPjwvZGl2PicgK1xyXG4gICAgICAgICAgICAgICAgICAgICc8ZGl2IG5nLW1vdXNlbW92ZT1cImRyYWcoJGV2ZW50KVwiIG5nLW1vdXNldXA9XCJ1cCgpXCIgbmctY2xpY2s9XCJncmV5Q2xpY2soKVwic3R5bGU9XCJjdXJzb3I6cG9pbnRlcjtkaXNwbGF5OmlubGluZS1ibG9jazt3aWR0aDp7e2JhclBpZWNlICogZW1wdFdpZHRofX1weDtoZWlnaHQ6NXB4O2JhY2tncm91bmQtY29sb3I6JyArIHNjb3BlLmJhcmVtcHR5Y29sb3IgKyAnO21hcmdpbi1ib3R0b206NHB4XCI+PC9kaXY+JyArXHJcbiAgICAgICAgICAgICAgICAgICAgJzwvZGl2Pic7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAvL1dlIHNob3cgb3VyIHRlbXBsYXRlIGFuZCB0aGVuIGNvbXBpbGUgaXQgc28gdGhlIERPTSBrbm93cyBhYm91dCBvdXIgbmcgZnVuY3Rpb25zXHJcbiAgICAgICAgICAgICAgICBpRWxlbS5odG1sKG15VGVtcGxhdGUpO1xyXG4gICAgICAgICAgICAgICAgJGNvbXBpbGUoaUVsZW0uY29udGVudHMoKSkoc2NvcGUpO1xyXG4gICAgICAgICAgICAgICAgLy9jcmVhdGUgdGhlIGluaXRpYWwgYmFyXHJcbiAgICAgICAgICAgICAgICBzY29wZS5tYWtlQmFyKCk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9O1xyXG59KTtcclxuXHJcbiIsImFuZ3VsYXIubW9kdWxlKCdib3NzeS50b29sdGlwJywgW10pXHJcbiAgICAuZGlyZWN0aXZlKCdib3NzeVRvb2x0aXAnLCBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgLy8gUHJpdmF0ZSBtZW1iZXIgYXJyYXkgY29udGFpbmluZyBhbGwga25vd24gcG9zaXRpb25zXHJcbiAgICAgICAgdmFyIF9wb3MgPSBbJ24nLCduZScsJ2UnLCdzZScsJ3MnLCdzdycsJ3cnLCdudyddO1xyXG5cclxuICAgICAgICAvLyBNb3ZlIHRoZSB0aXAgdG8gYSBjZXJ0YWluIHBvc2l0aW9uXHJcbiAgICAgICAgZnVuY3Rpb24gX21vdmVUaXAoJHBhcmVudCwgJHRpcCwgY3VyUG9zKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWYoY3VyUG9zID09PSAnbicpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICR0aXAuc3R5bGUubGVmdCA9ICRwYXJlbnQub2Zmc2V0TGVmdCArICgkcGFyZW50Lm9mZnNldFdpZHRoIC8gMikgLSAoJHRpcC5vZmZzZXRXaWR0aCAvIDIpICsgJ3B4JztcclxuICAgICAgICAgICAgICAgICR0aXAuc3R5bGUudG9wID0gJHBhcmVudC5vZmZzZXRUb3AgLSAkdGlwLm9mZnNldEhlaWdodCArICdweCc7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSBpZihjdXJQb3MgPT09ICduZScpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICR0aXAuc3R5bGUubGVmdCA9ICRwYXJlbnQub2Zmc2V0TGVmdCArICRwYXJlbnQub2Zmc2V0V2lkdGggKyAncHgnO1xyXG4gICAgICAgICAgICAgICAgJHRpcC5zdHlsZS50b3AgPSAkcGFyZW50Lm9mZnNldFRvcCAtICR0aXAub2Zmc2V0SGVpZ2h0ICsgJ3B4JztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIGlmKGN1clBvcyA9PT0gJ2UnKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAkdGlwLnN0eWxlLmxlZnQgPSAkcGFyZW50Lm9mZnNldExlZnQgKyAkcGFyZW50Lm9mZnNldFdpZHRoICsgJ3B4JztcclxuICAgICAgICAgICAgICAgICR0aXAuc3R5bGUudG9wID0gJHBhcmVudC5vZmZzZXRUb3AgKyAoJHBhcmVudC5vZmZzZXRIZWlnaHQgLyAyKSAtICgkdGlwLm9mZnNldEhlaWdodCAvIDIpICsgJ3B4JztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIGlmKGN1clBvcyA9PT0gJ3NlJylcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgJHRpcC5zdHlsZS5sZWZ0ID0gJHBhcmVudC5vZmZzZXRMZWZ0ICsgJHBhcmVudC5vZmZzZXRXaWR0aCArICdweCc7XHJcbiAgICAgICAgICAgICAgICAkdGlwLnN0eWxlLnRvcCA9ICRwYXJlbnQub2Zmc2V0VG9wICsgJHBhcmVudC5vZmZzZXRIZWlnaHQgKyAncHgnO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgaWYoY3VyUG9zID09PSAncycpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICR0aXAuc3R5bGUubGVmdCA9ICRwYXJlbnQub2Zmc2V0TGVmdCArICgkcGFyZW50Lm9mZnNldFdpZHRoIC8gMikgLSAoJHRpcC5vZmZzZXRXaWR0aCAvIDIpICsgJ3B4JztcclxuICAgICAgICAgICAgICAgICR0aXAuc3R5bGUudG9wID0gJHBhcmVudC5vZmZzZXRUb3AgKyAkcGFyZW50Lm9mZnNldEhlaWdodCArICdweCc7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSBpZihjdXJQb3MgPT09ICdzdycpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICR0aXAuc3R5bGUubGVmdCA9ICRwYXJlbnQub2Zmc2V0TGVmdCAtICR0aXAub2Zmc2V0V2lkdGggKyAncHgnO1xyXG4gICAgICAgICAgICAgICAgJHRpcC5zdHlsZS50b3AgPSAkcGFyZW50Lm9mZnNldFRvcCArICRwYXJlbnQub2Zmc2V0SGVpZ2h0ICsgJ3B4JztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIGlmKGN1clBvcyA9PT0gJ3cnKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAkdGlwLnN0eWxlLmxlZnQgPSAkcGFyZW50Lm9mZnNldExlZnQgLSAkdGlwLm9mZnNldFdpZHRoICsgJ3B4JztcclxuICAgICAgICAgICAgICAgICR0aXAuc3R5bGUudG9wID0gJHBhcmVudC5vZmZzZXRUb3AgKyAoJHBhcmVudC5vZmZzZXRIZWlnaHQgLyAyKSAtICgkdGlwLm9mZnNldEhlaWdodCAvIDIpICsgJ3B4JztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICR0aXAuc3R5bGUubGVmdCA9ICRwYXJlbnQub2Zmc2V0TGVmdCAtICR0aXAub2Zmc2V0V2lkdGggKyAncHgnO1xyXG4gICAgICAgICAgICAgICAgJHRpcC5zdHlsZS50b3AgPSAkcGFyZW50Lm9mZnNldFRvcCAtICR0aXAub2Zmc2V0SGVpZ2h0ICsgJ3B4JztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gQ2hlY2sgdG8gc2VlIGlmIHRoZSB0aXAgaXMgd2l0aGluIHRoZSB3aW5kb3dcclxuICAgICAgICBmdW5jdGlvbiBfY2hlY2tQb3MoJHRpcClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhciByZWN0ID0gJHRpcC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgICAgICByZWN0LnRvcCA+PSAwICYmXHJcbiAgICAgICAgICAgICAgICByZWN0LmxlZnQgPj0gMCAmJlxyXG4gICAgICAgICAgICAgICAgcmVjdC5ib3R0b20gPD0gKHdpbmRvdy5pbm5lckhlaWdodCB8fCBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xpZW50SGVpZ2h0KSAmJlxyXG4gICAgICAgICAgICAgICAgcmVjdC5yaWdodCA8PSAod2luZG93LmlubmVyV2lkdGggfHwgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsaWVudFdpZHRoKVxyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgcmVzdHJpY3Q6ICdFJyxcclxuICAgICAgICAgICAgc2NvcGU6IHtcclxuICAgICAgICAgICAgICAgIGNvbmZpZzogJz0nXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHJlcGxhY2U6IHRydWUsXHJcbiAgICAgICAgICAgIGxpbms6IGZ1bmN0aW9uKHNjb3BlLCBlbGVtZW50LCBhdHRycykge1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIElmIHRoZSB1c2VyIGRvZXNuJ3QgcHJvdmlkZSBlc3NlbnRpYWwgaW5mb3JtYXRpb24sIGVycm9yIG91dFxyXG4gICAgICAgICAgICAgICAgaWYoIXNjb3BlLmNvbmZpZy50aXRsZSB8fCAhc2NvcGUuY29uZmlnLmJvZHkpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKCdFcnJvcjogTm8gdGl0bGUgb3IgYm9keSBpbmZvcm1hdGlvbiBwcm92aWRlZC4nKTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gMTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAvLyBJZiB0aGUgdXNlciBkb2Vzbid0IHByb3ZpZGUgYSBwb3NpdGlvbiwgZGVmYXVsdCAnbm9ydGgnXHJcbiAgICAgICAgICAgICAgICBpZighc2NvcGUuY29uZmlnLnBvc2l0aW9uIHx8IHR5cGVvZiBzY29wZS5jb25maWcucG9zaXRpb24gIT09ICdzdHJpbmcnIHx8IF9wb3MuaW5kZXhPZihzY29wZS5jb25maWcucG9zaXRpb24pIDwgMClcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBzY29wZS5jb25maWcucG9zaXRpb24gPSAnbic7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gQ3JlYXRlIHRpcCBlbGVtZW50XHJcbiAgICAgICAgICAgICAgICB2YXIgJHRpcCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIEFwcGVuZCB0byBET01cclxuICAgICAgICAgICAgICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoJHRpcCk7XHJcbiAgICAgICAgICAgICAgICAkdGlwLnN0eWxlLnBvc2l0aW9uID0gJ2Fic29sdXRlJztcclxuICAgICAgICAgICAgICAgICR0aXAuaW5uZXJIVE1MID0gJzxzcGFuPicrIHNjb3BlLmNvbmZpZy50aXRsZSArJzwvc3Bhbj48ZGl2PicrIHNjb3BlLmNvbmZpZy5ib2R5ICsnPC9kaXY+JztcclxuICAgICAgICAgICAgICAgICR0aXAuY2xhc3NOYW1lID0gJ2Jvc3N5VG9vbHRpcCc7XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gRGlzYWJsZSBicm93c2VyJ3MgdG9vbHRpcFxyXG4gICAgICAgICAgICAgICAgZWxlbWVudFswXS50aXRsZSA9ICcnO1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coZWxlbWVudCk7XHJcblxyXG4gICAgICAgICAgICAgICAgdmFyIGkgPSAwLFxyXG4gICAgICAgICAgICAgICAgICAgIGxvY2tlZDtcclxuXHJcbiAgICAgICAgICAgICAgICBkbyB7XHJcbiAgICAgICAgICAgICAgICAgICAgbG9ja2VkID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICBfbW92ZVRpcChlbGVtZW50WzBdLCAkdGlwLCBzY29wZS5jb25maWcucG9zaXRpb24pO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAvLyBDb250aW51ZSB0byBsb29wIGlmICR0aXAgaXMgY2xpcHBlZFxyXG4gICAgICAgICAgICAgICAgICAgIGlmKCFfY2hlY2tQb3MoJHRpcCkpXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsb2NrZWQgPSBmYWxzZTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIFdyYXAgYXJvdW5kIGFycmF5IGlmIHRoZSBlbmQgaXMgaGl0XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzY29wZS5jb25maWcucG9zaXRpb24gPT09ICdudycpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNjb3BlLmNvbmZpZy5wb3NpdGlvbiA9ICduJztcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNjb3BlLmNvbmZpZy5wb3NpdGlvbiA9IF9wb3NbX3Bvcy5pbmRleE9mKHNjb3BlLmNvbmZpZy5wb3NpdGlvbikgKyAxXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGkgPT09IDgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICsraTtcclxuICAgICAgICAgICAgICAgIH0gd2hpbGUgKGxvY2tlZCA9PT0gZmFsc2UpO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIEhpZGUgaXQgdW50aWwgbW91c2UgZXZlbnRcclxuICAgICAgICAgICAgICAgICR0aXAuc3R5bGUuZGlzcGxheSA9ICdub25lJztcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBNb3VzZSBldmVudHNcclxuICAgICAgICAgICAgICAgIGVsZW1lbnQub24oJ21vdXNlZW50ZXInLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgICAgICAkdGlwLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5vbignbW91c2VsZWF2ZScsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICR0aXAuc3R5bGUuZGlzcGxheSA9ICdub25lJztcclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcbiAgICB9KTsiXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=