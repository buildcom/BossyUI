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

		setConfigOptions();
		setSelectedDate($scope.ngModel || new Date());
		setCurrentMonthAndYear();
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImJvc3N5LmpzIiwiYm9zc3kuY2FsZW5kYXIuanMiLCJib3NzeS5jb21ib2JveC5jYXNjYWRpbmdEcm9wZG93bi5qcyIsImJvc3N5LmNvbWJvYm94LmNoZWNrYm94TXVsdGlzZWxlY3QuanMiLCJib3NzeS5jb21ib2JveC5tdWx0aXNlbGVjdC5qcyIsImJvc3N5LmRhdGEuanMiLCJib3NzeS5kcm9wZG93bi5qcyIsImJvc3N5LmZvcm0uanMiLCJib3NzeS5pbnB1dC5qcyIsImJvc3N5Lm51bWVyaWN0ZXh0Ym94LmpzIiwiYm9zc3kuc2NoZW1hLmpzIiwiYm9zc3kuc2xpZGVyLmpzIiwiYm9zc3kudG9vbHRpcC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDekJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUM3SkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUN4QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUM1R0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ2pKQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUMzREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDN0VBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNsSUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDakJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUN4RkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUMxQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ2pWQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJib3NzeS5hbGwuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiFcbiAqIGJvc3N5LmpzXG4gKi9cblxuLyohXG4gKiBodHRwOi8vQm9zc3lVSS5jb20vXG4gKlxuICogQm9zc3lVSSAtIENyZWF0ZWQgd2l0aCBMT1ZFIGJ5IEJ1aWxkLmNvbSBPcGVuIFNvdXJjZSBDb25zb3J0aXVtXG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlLiBQbGVhc2Ugc2VlIExJQ0VOU0UgZm9yIG1vcmUgaW5mb3JtYXRpb24uXG4gKlxuKi9cblxuLy9UT0RPOiBuZWVkIGxheW91dCwgbGFiZWxzXG52YXIgYm9zc3kgPSBhbmd1bGFyLm1vZHVsZSgnYm9zc3knLCBbXG4gICAgICAgICdib3NzeS5jYWxlbmRhcicsXG4gICAgICAgICdib3NzeS5kYXRhJyxcbiAgICAgICAgJ2Jvc3N5LmRyb3Bkb3duJyxcbiAgICAgICAgJ2Jvc3N5LmZvcm0nLFxuICAgICAgICAnYm9zc3kuaW5wdXQnLFxuICAgICAgICAnYm9zc3kubnVtZXJpY3RleHRib3gnLFxuICAgICAgICAnYm9zc3kuc2NoZW1hJyxcbiAgICAgICAgJ2Jvc3N5LnRvb2x0aXAnXG4gICAgXVxuKTtcbiIsImFuZ3VsYXIubW9kdWxlKCdib3NzeS5jYWxlbmRhcicsIFtdKVxuXHQuY29udHJvbGxlcignQ2FsZW5kYXJDb250cm9sbGVyJywgWyckc2NvcGUnLCBmdW5jdGlvbiAoJHNjb3BlKSB7XG5cblx0XHR2YXIgX21vbnRoTWFwcyA9IHt9LFxuXHRcdFx0b3B0aW9ucyA9IHt9LFxuXHRcdFx0ZGVmYXVsdHMgPSB7XG5cdFx0XHR9LFxuXHRcdFx0dW5pdmVyc2FsID0ge1xuXHRcdFx0XHREQVk6IDI0ICogNjAgKiA2MCAqIDEwMDAsXG5cdFx0XHRcdEhPVVI6IDYwICogNjAgKiAxMDAwXG5cdFx0XHR9O1xuXG5cdFx0JHNjb3BlLmRheXMgPSBbXG5cdFx0XHQnU3VuZGF5Jyxcblx0XHRcdCdNb25kYXknLFxuXHRcdFx0J1R1ZXNkYXknLFxuXHRcdFx0J1dlZG5lc2RheScsXG5cdFx0XHQnVGh1cnNkYXknLFxuXHRcdFx0J0ZyaWRheScsXG5cdFx0XHQnU2F0dXJkYXknXG5cdFx0XTtcblxuXHRcdCRzY29wZS5tb250aHMgPSBbXG5cdFx0XHQnSmFudWFyeScsXG5cdFx0XHQnRmVicnVhcnknLFxuXHRcdFx0J01hcmNoJyxcblx0XHRcdCdBcHJpbCcsXG5cdFx0XHQnTWF5Jyxcblx0XHRcdCdKdW5lJyxcblx0XHRcdCdKdWx5Jyxcblx0XHRcdCdBdWd1c3QnLFxuXHRcdFx0J1NlcHRlbWJlcicsXG5cdFx0XHQnT2N0b2JlcicsXG5cdFx0XHQnTm92ZW1iZXInLFxuXHRcdFx0J0RlY2VtYmVyJ1xuXHRcdF07XG5cblx0XHQkc2NvcGUucHJldmlvdXNNb250aCA9IGZ1bmN0aW9uKCkge1xuXHRcdFx0dmFyIGRhdGUgPSBuZXcgRGF0ZSgkc2NvcGUuY3VycmVudC55ZWFyLCAoJHNjb3BlLmN1cnJlbnQubW9udGggLSAxKSwgMSk7XG5cdFx0XHRzZXRDdXJyZW50TW9udGhBbmRZZWFyKGRhdGUuZ2V0TW9udGgoKSwgZGF0ZS5nZXRGdWxsWWVhcigpKTtcblx0XHRcdCRzY29wZS51cGRhdGVEYXRlTWFwKCk7XG5cdFx0fTtcblxuXHRcdCRzY29wZS5uZXh0TW9udGggPSBmdW5jdGlvbigpIHtcblx0XHRcdHZhciBkYXRlID0gbmV3IERhdGUoJHNjb3BlLmN1cnJlbnQueWVhciwgKCRzY29wZS5jdXJyZW50Lm1vbnRoICsgMSksIDEpO1xuXHRcdFx0c2V0Q3VycmVudE1vbnRoQW5kWWVhcihkYXRlLmdldE1vbnRoKCksIGRhdGUuZ2V0RnVsbFllYXIoKSk7XG5cdFx0XHQkc2NvcGUudXBkYXRlRGF0ZU1hcCgpO1xuXHRcdH07XG5cblx0XHQkc2NvcGUuc2VsZWN0RGF0ZSA9IGZ1bmN0aW9uKHRpbWUpIHtcblx0XHRcdHZhciBkYXRlID0gZ2V0U3RhbmRhcmRUaW1lKG5ldyBEYXRlKHRpbWUpKTtcblx0XHRcdGlmIChkYXlJc091dE9mUmFuZ2UoZGF0ZSkpIHtcblx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0fVxuXHRcdFx0aWYgKGRhdGUubW9udGggIT09ICRzY29wZS5jdXJyZW50Lm1vbnRoKSB7XG5cdFx0XHRcdHNldEN1cnJlbnRNb250aEFuZFllYXIoZGF0ZS5tb250aCwgZGF0ZS55ZWFyKTtcblx0XHRcdFx0JHNjb3BlLnVwZGF0ZURhdGVNYXAoKTtcblx0XHRcdH1cblx0XHRcdHNldFNlbGVjdGVkRGF0ZShuZXcgRGF0ZSh0aW1lKSk7XG5cdFx0fTtcblxuXHRcdCRzY29wZS51cGRhdGVEYXRlTWFwID0gZnVuY3Rpb24oKSB7XG5cdFx0XHR2YXIgZmlyc3RXZWVrRGF5ID0gbmV3IERhdGUoJHNjb3BlLmN1cnJlbnQudGltZSAtICgkc2NvcGUuY3VycmVudC5yYXcuZ2V0RGF5KCkgKiB1bml2ZXJzYWwuREFZKSksXG5cdFx0XHRcdGlzTW9udGhDb21wbGV0ZSA9IGZhbHNlO1xuXHRcdFx0XHQkc2NvcGUuZGF0ZU1hcCA9IFtdO1xuXG5cdFx0XHR3aGlsZSAoIWlzTW9udGhDb21wbGV0ZSkge1xuXHRcdFx0XHR2YXIgd2VlayA9IFtdO1xuXHRcdFx0XHRpZiAoJHNjb3BlLmRhdGVNYXAubGVuZ3RoID09PSA1KSB7XG5cdFx0XHRcdFx0aXNNb250aENvbXBsZXRlID0gdHJ1ZTtcblx0XHRcdFx0fVxuXHRcdFx0XHRmb3IgKHZhciB3ZWVrRGF5ID0gMDsgd2Vla0RheSA8IDc7IHdlZWtEYXkrKykge1xuXHRcdFx0XHRcdHZhciBfdGhpc0RhdGUgPSAobmV3IERhdGUoZmlyc3RXZWVrRGF5LmdldFRpbWUoKSArICh3ZWVrRGF5ICogdW5pdmVyc2FsLkRBWSkpKTtcblx0XHRcdFx0XHQvLyBmaXggZm9yIERTVCBvZGRuZXNzXG5cdFx0XHRcdFx0aWYgKF90aGlzRGF0ZS5nZXRIb3VycygpID09PSAyMykge1xuXHRcdFx0XHRcdFx0X3RoaXNEYXRlID0gKG5ldyBEYXRlKF90aGlzRGF0ZS5nZXRUaW1lKCkgKyB1bml2ZXJzYWwuSE9VUikpO1xuXHRcdFx0XHRcdH0gZWxzZSBpZiAoX3RoaXNEYXRlLmdldEhvdXJzKCkgPT09IDEpIHtcblx0XHRcdFx0XHRcdF90aGlzRGF0ZSA9IChuZXcgRGF0ZShfdGhpc0RhdGUuZ2V0VGltZSgpIC0gdW5pdmVyc2FsLkhPVVIpKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0dmFyIF9kYXRlID0gZ2V0U3RhbmRhcmRUaW1lKF90aGlzRGF0ZSk7XG5cdFx0XHRcdFx0X2RhdGUuZGF5SW5Nb250aCA9IF90aGlzRGF0ZS5nZXRNb250aCgpID09PSAkc2NvcGUuY3VycmVudC5yYXcuZ2V0TW9udGgoKSA/ICdkYXktaW4tbW9udGgnIDogJyc7XG5cdFx0XHRcdFx0X2RhdGUuZGlzYWJsZWREYXkgPSBkYXlJc091dE9mUmFuZ2UoX2RhdGUpID8gJ2Rpc2FibGVkLWRheScgOiAnJztcblx0XHRcdFx0XHR3ZWVrLnB1c2goX2RhdGUpO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGZpcnN0V2Vla0RheSA9IG5ldyBEYXRlKGZpcnN0V2Vla0RheS5nZXRUaW1lKCkgKyAoNyAqIHVuaXZlcnNhbC5EQVkpKTtcblx0XHRcdFx0JHNjb3BlLmRhdGVNYXAucHVzaCh3ZWVrKTtcblx0XHRcdH1cblx0XHR9O1xuXG5cdFx0ZnVuY3Rpb24gZ2V0U3RhbmRhcmRUaW1lKGRhdGUpIHtcblx0XHRcdHJldHVybiB7XG5cdFx0XHRcdHJhdzogZGF0ZSxcblx0XHRcdFx0eWVhcjogZGF0ZS5nZXRGdWxsWWVhcigpLFxuXHRcdFx0XHRtb250aE5hbWU6IGdldE1vbnRoTmFtZShkYXRlLmdldE1vbnRoKCkpLFxuXHRcdFx0XHRtb250aDogZGF0ZS5nZXRNb250aCgpLFxuXHRcdFx0XHRkYXk6IGdldERheU5hbWUoZGF0ZSksXG5cdFx0XHRcdGRhdGU6IGRhdGUuZ2V0RGF0ZSgpLFxuXHRcdFx0XHR0aW1lOiBkYXRlLmdldFRpbWUoKVxuXHRcdFx0fTtcblx0XHR9XG5cblx0XHRmdW5jdGlvbiBnZXRUaW1lT2JqZWN0SWZEYXRlKGRhdGUpIHtcblx0XHRcdGlmIChhbmd1bGFyLmlzRGF0ZShuZXcgRGF0ZShkYXRlKSkpIHtcblx0XHRcdFx0cmV0dXJuIGdldFN0YW5kYXJkVGltZShuZXcgRGF0ZShkYXRlKSk7XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0fVxuXG5cdFx0ZnVuY3Rpb24gc2V0Q29uZmlnT3B0aW9ucygpIHtcblx0XHRcdCRzY29wZS5jb25maWcuc3RhcnQgPSBnZXRUaW1lT2JqZWN0SWZEYXRlKCRzY29wZS5jb25maWcuc3RhcnQpO1xuXHRcdFx0JHNjb3BlLmNvbmZpZy5lbmQgPSBnZXRUaW1lT2JqZWN0SWZEYXRlKCRzY29wZS5jb25maWcuZW5kKTtcblx0XHRcdG9wdGlvbnMgPSBhbmd1bGFyLmV4dGVuZCh7fSwgZGVmYXVsdHMsICRzY29wZS5jb25maWcpO1xuXHRcdH1cblxuXHRcdGZ1bmN0aW9uIGRheUlzT3V0T2ZSYW5nZShfZGF0ZSkge1xuXHRcdFx0aWYgKG9wdGlvbnMuc3RhcnQgJiYgb3B0aW9ucy5lbmQgJiYgKF9kYXRlLnRpbWUgPCBvcHRpb25zLnN0YXJ0LnRpbWUgfHwgX2RhdGUudGltZSA+IG9wdGlvbnMuZW5kLnRpbWUpKSB7XG5cdFx0XHRcdHJldHVybiB0cnVlO1xuXHRcdFx0fSBlbHNlIGlmIChvcHRpb25zLnN0YXJ0ICYmIF9kYXRlLnRpbWUgPCBvcHRpb25zLnN0YXJ0LnRpbWUpIHtcblx0XHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0XHR9IGVsc2UgaWYgKG9wdGlvbnMuZW5kICYmIF9kYXRlLnRpbWUgPiBvcHRpb25zLmVuZC50aW1lKSB7XG5cdFx0XHRcdHJldHVybiB0cnVlO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdGZ1bmN0aW9uIHNldFNlbGVjdGVkRGF0ZShkYXRlKSB7XG5cdFx0XHQkc2NvcGUuc2VsZWN0ZWQgPSBnZXRTdGFuZGFyZFRpbWUoZGF0ZSk7XG5cdFx0XHQkc2NvcGUubmdNb2RlbCA9ICRzY29wZS5zZWxlY3RlZC5yYXc7XG5cdFx0fVxuXG5cdFx0ZnVuY3Rpb24gc2V0Q3VycmVudE1vbnRoQW5kWWVhcihtb250aCwgeWVhcikge1xuXHRcdFx0dmFyIGRhdGUgPSBuZXcgRGF0ZSh5ZWFyICE9PSB1bmRlZmluZWQgPyB5ZWFyIDogJHNjb3BlLnNlbGVjdGVkLnllYXIsIG1vbnRoICE9PSB1bmRlZmluZWQgPyBtb250aCA6ICRzY29wZS5zZWxlY3RlZC5tb250aCwgMSk7XG5cdFx0XHQkc2NvcGUuY3VycmVudCA9IGdldFN0YW5kYXJkVGltZShkYXRlKTtcblx0XHR9XG5cblx0XHRmdW5jdGlvbiBnZXRNb250aE5hbWUobW9udGgpIHtcblx0XHRcdHJldHVybiAkc2NvcGUubW9udGhzW21vbnRoXTtcblx0XHR9XG5cblx0XHRmdW5jdGlvbiBnZXREYXlOYW1lKGRhdGUpIHtcblx0XHRcdHJldHVybiAkc2NvcGUuZGF5c1tkYXRlLmdldERheSgpXTtcblx0XHR9XG5cblx0XHRzZXRDb25maWdPcHRpb25zKCk7XG5cdFx0c2V0U2VsZWN0ZWREYXRlKCRzY29wZS5uZ01vZGVsIHx8IG5ldyBEYXRlKCkpO1xuXHRcdHNldEN1cnJlbnRNb250aEFuZFllYXIoKTtcblx0XHQkc2NvcGUudXBkYXRlRGF0ZU1hcCgpO1xuXG5cdH1dKS5kaXJlY3RpdmUoJ2Jvc3N5Q2FsZW5kYXInLCBbZnVuY3Rpb24gKCkge1xuXHRcdHJldHVybiB7XG5cdFx0XHRyZXN0cmljdDogJ0FFJyxcblx0XHRcdHNjb3BlOiB7XG5cdFx0XHRcdG5nTW9kZWw6ICc9Jyxcblx0XHRcdFx0Y29uZmlnOiAnPSdcblx0XHRcdH0sXG5cdFx0XHR0ZW1wbGF0ZTogJzxzdHlsZT5ib3NzeS1jYWxlbmRhciAuZGF5LWluLW1vbnRoe2ZvbnQtd2VpZ2h0OjcwMH1ib3NzeS1jYWxlbmRhciAuZGlzYWJsZWQtZGF5e2NvbG9yOiNjY2N9PC9zdHlsZT48dGFibGU+PHRyPjx0ZCBuZy1jbGljaz1cInByZXZpb3VzTW9udGgoKVwiIHRpdGxlPVwiUHJldmlvdXMgbW9udGhcIj4mbHQ7PC90ZD48dGQgY29sc3Bhbj1cIjVcIj57e2N1cnJlbnQubW9udGhOYW1lfX0ge3tjdXJyZW50LnllYXJ9fTwvdGQ+PHRkIG5nLWNsaWNrPVwibmV4dE1vbnRoKClcIiB0aXRsZT1cIk5leHQgbW9udGhcIj4mZ3Q7PC90ZD48L3RyPjx0ZCBuZy1yZXBlYXQ9XCJkYXkgaW4gZGF5c1wiIHRpdGxlPVwie3tkYXl9fVwiPnt7ZGF5IHwgbGltaXRUbyA6IDJ9fTwvdGQ+PHRyIG5nLXJlcGVhdD1cIndlZWsgaW4gZGF0ZU1hcFwiPjx0ZCBuZy1yZXBlYXQ9XCJjdXJyZW50IGluIHdlZWtcIiBuZy1jbGljaz1cInNlbGVjdERhdGUoY3VycmVudC50aW1lKVwiIGNsYXNzPVwie3tjdXJyZW50LmRheUluTW9udGh9fSB7e2N1cnJlbnQuZGlzYWJsZWREYXl9fVwiPnt7Y3VycmVudC5kYXRlfX08L3RkPjwvdHI+PHRyPjx0ZCBjb2xzcGFuPVwiN1wiPnt7c2VsZWN0ZWQuZGF5fX0sIHt7c2VsZWN0ZWQubW9udGhOYW1lfX0ge3tzZWxlY3RlZC5kYXRlfX0sIHt7c2VsZWN0ZWQueWVhcn19PC90ZD48L3RyPjwvdGFibGU+Jyxcblx0XHRcdGNvbnRyb2xsZXI6ICdDYWxlbmRhckNvbnRyb2xsZXInXG5cdFx0fTtcblx0fV0pOyIsInZhciBhcHAgPSBhbmd1bGFyLm1vZHVsZShcImJvc3N5LmNvbWJvYm94LmNhc2NhZGluZ0Ryb3Bkb3duXCIsIFtdKTtcblxuYXBwLmNvbnRyb2xsZXIoJ0FwcEN0cmwnLCBmdW5jdGlvbigkc2NvcGUpIHtcblxuICAgIC8vIGFkZCBjaG9pY2VzIGZvciB0aGUgMyBkcm9wZG93bnNcbiAgICAvLyBkZXBlbmRlbmNpZXMgaW4gYXJyYXlzIChBIC0gQTEgLSBBMWEpXG4gICAgJHNjb3BlLmNob2ljZXMgPSB7XG4gICAgICAgICdPcHRpb24gQSc6IHtcbiAgICAgICAgICAgICdPcHRpb24gQTEnOiBbJ09wdGlvbiBBMWEnLCAnT3B0aW9uIEExYicsICdPcHRpb24gQTFjJ10sXG4gICAgICAgICAgICAnT3B0aW9uIEEyJzogWydPcHRpb24gQTJhJywgJ09wdGlvbiBBMmInLCAnT3B0aW9uIEEyYyddLFxuICAgICAgICAgICAgJ09wdGlvbiBBMyc6IFsnT3B0aW9uIEEzYScsICdPcHRpb24gQTNiJywgJ09wdGlvbiBBM2MnXVxuICAgICAgICB9LFxuICAgICAgICAnT3B0aW9uIEInOiB7XG4gICAgICAgICAgICAnT3B0aW9uIEIxJzogWydPcHRpb24gQjFhJywgJ09wdGlvbiBCMWInLCAnT3B0aW9uIEIxYyddLFxuICAgICAgICAgICAgJ09wdGlvbiBCMic6IFsnT3B0aW9uIEIyYScsICdPcHRpb24gQjJiJywgJ09wdGlvbiBCMmMnXSxcbiAgICAgICAgICAgICdPcHRpb24gQjMnOiBbJ09wdGlvbiBCM2EnLCAnT3B0aW9uIEIzYicsICdPcHRpb24gQjNjJ11cbiAgICAgICAgfSxcbiAgICAgICAgJ09wdGlvbiBDJzoge1xuICAgICAgICAgICAgJ09wdGlvbiBDMSc6IFsnT3B0aW9uIEMxYScsICdPcHRpb24gQzFiJywgJ09wdGlvbiBDMWMnXSxcbiAgICAgICAgICAgICdPcHRpb24gQzInOiBbJ09wdGlvbiBDMmEnLCAnT3B0aW9uIEMyYicsICdPcHRpb24gQzNiJ10sXG4gICAgICAgICAgICAnT3B0aW9uIEMzJzogWydPcHRpb24gQzNhJywgJ09wdGlvbiBDM2InLCAnT3B0aW9uIEMzYyddXG4gICAgICAgIH1cbiAgICB9O1xuXG59KSIsInZhciBhcHAgPSBhbmd1bGFyLm1vZHVsZShcImJvc3N5LmNvbWJvYm94LmNoZWNrYm94TXVsdGlzZWxlY3RcIiwgW10pO1xuXG5hcHAuY29udHJvbGxlcignQXBwQ3RybCcsIGZ1bmN0aW9uKCRzY29wZSkge1xuXG4gICAgLy8gc2V0IGNob2ljZXNcbiAgICAkc2NvcGUuY2hvaWNlcyA9IFsnT3B0aW9uIEEnLCAnT3B0aW9uIEInLCAnT3B0aW9uIEMnXTtcblxuICAgIC8vIGFycmF5XG4gICAgJHNjb3BlLm5hbWUgPSB7Y2hvaWNlczogW119O1xuXG4gICAgLy8gZnVuY3Rpb24gc2VsZWN0QWxsIHRvIHNlbGVjdCBhbGwgY2hlY2tib3hlc1xuICAgICRzY29wZS5zZWxlY3RBbGwgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgJHNjb3BlLm5hbWUuY2hvaWNlcyA9IGFuZ3VsYXIuY29weSgkc2NvcGUuY2hvaWNlcyk7XG4gICAgfTtcblxuICAgIC8vIGZ1bmN0aW9uIGRlc2VsZWN0QWxsIHRvIGRlc2VsZWN0IGFsbCBjaGVja2JveGVzXG4gICAgJHNjb3BlLmRlc2VsZWN0QWxsID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICRzY29wZS5uYW1lLmNob2ljZXMgPSBbXTtcbiAgICB9O1xuXG59KTtcblxuYXBwLmRpcmVjdGl2ZSgnYm9zc3lDaGVja2JveE11bHRpc2VsZWN0JywgWyckcGFyc2UnLCAnJGNvbXBpbGUnLCBmdW5jdGlvbigkcGFyc2UsICRjb21waWxlKSB7XG5cbiAgICByZXR1cm4ge1xuICAgICAgICByZXN0cmljdDogJ0FFJyxcbiAgICAgICAgc2NvcGU6IHRydWUsXG4gICAgICAgIGNvbXBpbGU6IGZ1bmN0aW9uKHRFbGVtZW50LCB0QXR0cnMpIHtcbiAgICAgICAgICAgIC8vIGxvY2FsIHZhcmlhYmxlIHN0b3JpbmcgY2hlY2tib3ggbW9kZWxcbiAgICAgICAgICAgIHRFbGVtZW50LmF0dHIoJ25nLW1vZGVsJywgJ2NoZWNrZWQnKTtcbiAgICAgICAgICAgIC8vIHByZXZlbnQgcmVjdXJzaW9uXG4gICAgICAgICAgICB0RWxlbWVudC5yZW1vdmVBdHRyKCdib3NzeS1jaGVja2JveC1tdWx0aXNlbGVjdCcpO1xuICAgICAgICAgICAgcmV0dXJuIHdhdGNoO1xuICAgICAgICB9XG4gICAgfTtcblxuICAgICAgICAvLyBhZGQgdGhlIHNlbGVjdGVkIGNob2ljZSB0byBjaG9pY2VzXG4gICAgICAgIGZ1bmN0aW9uIGFkZENob2ljZSAoYXJyLCBpdGVtKSB7XG4gICAgICAgICAgICBhcnIgPSBhbmd1bGFyLmlzQXJyYXkoYXJyKSA/IGFyciA6IFtdO1xuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBhcnIubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBpZiAoYW5ndWxhci5lcXVhbHMoYXJyW2ldLCBpdGVtKSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gYXJyO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIGFkZCBjaG9pY2UgdG8gYXJyYXlcbiAgICAgICAgICAgIGFyci5wdXNoKGl0ZW0pO1xuICAgICAgICAgICAgLy8gcmV0dXJuIG5ldyBhcnJheVxuICAgICAgICAgICAgcmV0dXJuIGFycjtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIHJlbW92ZSB0aGUgc2VsZWN0ZWQgY2hvaWNlIGZyb20gY2hvaWNlcyB3aGVuIGNsaWNrZWRcbiAgICAgICAgZnVuY3Rpb24gcmVtb3ZlQ2hvaWNlKGFyciwgaXRlbSkge1xuICAgICAgICAgICAgaWYgKGFuZ3VsYXIuaXNBcnJheShhcnIpKSB7XG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBhcnIubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGFuZ3VsYXIuZXF1YWxzKGFycltpXSwgaXRlbSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIHJlbW92ZSBmcm9tIGFycmF5XG4gICAgICAgICAgICAgICAgICAgICAgICBhcnIuc3BsaWNlKGksIDEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyByZXR1cm4gbmV3IGFycmF5XG4gICAgICAgICAgICByZXR1cm4gYXJyO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gY29udGFpbnMgLSBjaGVjayB3aGljaCBpdGVtcyB0aGUgYXJyYXkgY29udGFpbnNcbiAgICAgICAgZnVuY3Rpb24gY29udGFpbkNoZWNrYm94IChhcnIsIGl0ZW0pIHtcbiAgICAgICAgICAgIGlmIChhbmd1bGFyLmlzQXJyYXkoYXJyKSkge1xuICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYXJyLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChhbmd1bGFyLmVxdWFscyhhcnJbaV0sIGl0ZW0pKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIHdhdGNoIGJlaGF2aW91ciBvZiBkaXJlY3RpdmUgYW5kIG1vZGVsXG4gICAgICAgIGZ1bmN0aW9uIHdhdGNoKHNjb3BlLCBlbGVtLCBhdHRycykge1xuXG4gICAgICAgICAgICAvLyBjb21waWxlIC0gbmctbW9kZWwgcG9pbnRpbmcgdG8gY2hlY2tlZFxuICAgICAgICAgICAgJGNvbXBpbGUoZWxlbSkoc2NvcGUpO1xuXG4gICAgICAgICAgICAvLyBnZXR0ZXIgYW5kIHNldHRlciBmb3Igb3JpZ2luYWwgbW9kZWxcbiAgICAgICAgICAgIHZhciBnZXR0ZXIgPSAkcGFyc2UoYXR0cnMuYm9zc3lDaGVja2JveE11bHRpc2VsZWN0KTtcbiAgICAgICAgICAgIHZhciBzZXR0ZXIgPSBnZXR0ZXIuYXNzaWduO1xuXG4gICAgICAgICAgICAvLyB2YWx1ZSBhZGRlZCB0byBsaXN0XG4gICAgICAgICAgICB2YXIgdmFsdWUgPSAkcGFyc2UoYXR0cnMuYm9zc3lMaXN0VmFsdWUpKHNjb3BlLiRwYXJlbnQpO1xuXG4gICAgICAgICAgICAvLyB3YXRjaCB0aGUgY2hhbmdlIG9mIGNoZWNrZWQgdmFsdWVzXG4gICAgICAgICAgICBzY29wZS4kd2F0Y2goJ2NoZWNrZWQnLCBmdW5jdGlvbihuZXdWYWx1ZSwgb2xkVmFsdWUpIHtcbiAgICAgICAgICAgICAgICBpZiAobmV3VmFsdWUgPT09IG9sZFZhbHVlKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdmFyIGFjdHVhbCA9IGdldHRlcihzY29wZS4kcGFyZW50KTtcbiAgICAgICAgICAgICAgICBpZiAobmV3VmFsdWUgPT09IHRydWUpIHtcbiAgICAgICAgICAgICAgICAgICAgc2V0dGVyKHNjb3BlLiRwYXJlbnQsIGFkZENob2ljZSAoYWN0dWFsLCB2YWx1ZSkpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHNldHRlcihzY29wZS4kcGFyZW50LCByZW1vdmVDaG9pY2UoYWN0dWFsLCB2YWx1ZSkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAvLyB3YXRjaCBjaGFuZ2Ugb2Ygb3JpZ2luYWwgbW9kZWxcbiAgICAgICAgICAgIHNjb3BlLiRwYXJlbnQuJHdhdGNoKGF0dHJzLmJvc3N5Q2hlY2tib3hNdWx0aXNlbGVjdCwgZnVuY3Rpb24obmV3QXJyKSB7XG4gICAgICAgICAgICAgICAgc2NvcGUuY2hlY2tlZCA9IGNvbnRhaW5DaGVja2JveCAobmV3QXJyLCB2YWx1ZSk7XG4gICAgICAgICAgICB9LCB0cnVlKTtcbiAgICAgICAgfVxufV0pOyIsInZhciBhcHAgPSBhbmd1bGFyLm1vZHVsZSgnYm9zc3kuY29tYm9ib3gubXVsdGlzZWxlY3QnLCBbXSk7XG5cbmFwcC5jb250cm9sbGVyKCdBcHBDdHJsJywgZnVuY3Rpb24oJHNjb3BlKSB7XG5cbiAgICAvLyBhZGQgY2hvaWNlcyBmb3IgbXVsdGlzZWxlY3QgaW4gYXJyYXlcbiAgICAkc2NvcGUuY2hvaWNlcyA9IFt7aWQ6MSwgbmFtZTogJ09wdGlvbiBBJ30sXG4gICAgICAgICAgICAgICAgICAgICAge2lkOjIsIG5hbWU6ICdPcHRpb24gQid9LFxuICAgICAgICAgICAgICAgICAgICAgIHtpZDozLCBuYW1lOiAnT3B0aW9uIEMnfVxuICAgICAgICAgICAgICAgICAgICAgXTtcblxuICAgIC8vIHNlbGVjdGVkIGNob2ljZVxuICAgICRzY29wZS5zZWxlY3RlZENob2ljZSA9IFtdO1xuXG59KVxuXG4vLyBpbmplY3QgZnVuY3Rpb25zXG5hcHAuZmFjdG9yeSgnb3B0aW9uUGFyc2VyJywgWyckcGFyc2UnLCBmdW5jdGlvbiAoJHBhcnNlKSB7XG5cbiAgICB2YXIgVFlQRUFIRUFEX1JFR0VYUCA9IC9eXFxzKiguKj8pKD86XFxzK2FzXFxzKyguKj8pKT9cXHMrZm9yXFxzKyg/OihbXFwkXFx3XVtcXCRcXHdcXGRdKikpXFxzK2luXFxzKyguKikkLztcblxuICAgIHJldHVybiB7XG4gICAgICAgIHBhcnNlOiBmdW5jdGlvbiAoaW5wdXQpIHtcblxuICAgICAgICAgICAgLy8gY2hlY2sgaW5wdXRzXG4gICAgICAgICAgICB2YXIgbWF0Y2ggPSBpbnB1dC5tYXRjaChUWVBFQUhFQURfUkVHRVhQKSwgbW9kZWxNYXBwZXIsIHZpZXdNYXBwZXIsIHNvdXJjZTtcbiAgICAgICAgICAgIGlmICghbWF0Y2gpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAgICAgICAgICAgICAgICAgICBcIkV4cGVjdGVkIHR5cGVhaGVhZCBzcGVjaWZpY2F0aW9uIGluIGZvcm0gb2YgJ19tb2RlbFZhbHVlXyAoYXMgX2xhYmVsXyk/IGZvciBfaXRlbV8gaW4gX2NvbGxlY3Rpb25fJ1wiICtcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiIGJ1dCBnb3QgJ1wiICsgaW5wdXQgKyBcIicuXCIpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIGl0ZW1OYW1lOiBtYXRjaFszXSxcbiAgICAgICAgICAgICAgICBzb3VyY2U6ICRwYXJzZShtYXRjaFs0XSksXG4gICAgICAgICAgICAgICAgdmlld01hcHBlcjogJHBhcnNlKG1hdGNoWzJdIHx8IG1hdGNoWzFdKSxcbiAgICAgICAgICAgICAgICBtb2RlbE1hcHBlcjogJHBhcnNlKG1hdGNoWzFdKVxuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgIH07XG59XSlcblxuYXBwLmRpcmVjdGl2ZSgnYm9zc3lNdWx0aXNlbGVjdCcsXG5cbiAgICAgICAgZnVuY3Rpb24gKCRkb2N1bWVudCwgJGNvbXBpbGUsIG9wdGlvblBhcnNlcikge1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICByZXN0cmljdDogJ0UnLFxuICAgICAgICAgICAgICAgIHJlcXVpcmU6ICduZ01vZGVsJyxcbiAgICAgICAgICAgICAgICBsaW5rOiBmdW5jdGlvbiAob3JpZ2luYWxTY29wZSwgZWxlbWVudCwgYXR0cnMsIG1vZGVsQ3RybCkge1xuXG4gICAgICAgICAgICAgICAgICAgIC8vIGRlY2xhcmUgdmFyaWFibGVzXG4gICAgICAgICAgICAgICAgICAgIHZhciBleHAgPSBhdHRycy5vcHRpb25zLFxuICAgICAgICAgICAgICAgICAgICAgICAgcGFyc2VkUmVzdWx0ID0gb3B0aW9uUGFyc2VyLnBhcnNlKGV4cCksXG4gICAgICAgICAgICAgICAgICAgICAgICBpc011bHRpcGxlID0gYXR0cnMubXVsdGlwbGUgPyB0cnVlIDogZmFsc2UsXG4gICAgICAgICAgICAgICAgICAgICAgICBzY29wZSA9IG9yaWdpbmFsU2NvcGUuJG5ldygpLFxuICAgICAgICAgICAgICAgICAgICAgICAgY2hhbmdlSGFuZGxlciA9IGF0dHJzLmNoYW5nZSB8fCBhbmd1bGVyLm5vb3A7XG5cbiAgICAgICAgICAgICAgICAgICAgc2NvcGUuaXRlbXMgPSBbXTtcbiAgICAgICAgICAgICAgICAgICAgc2NvcGUubXVsdGlwbGUgPSBpc011bHRpcGxlO1xuXG4gICAgICAgICAgICAgICAgICAgIC8vIGluY2x1ZGUgc2Vjb25kIGRpcmVjdGl2ZSAodGVtcGxhdGUpXG4gICAgICAgICAgICAgICAgICAgIHZhciBwb3BVcEVsID0gYW5ndWxhci5lbGVtZW50KCc8Ym9zc3ktbXVsdGlzZWxlY3QtcG9wdXA+PC9ib3NzeS1tdWx0aXNlbGVjdC1wb3B1cD4nKTtcblxuICAgICAgICAgICAgICAgICAgICAvLyBhbmFseXNlIG1vZGVsXG4gICAgICAgICAgICAgICAgICAgIGZ1bmN0aW9uIHBhcnNlTW9kZWwoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgbW9kZWwgPSBwYXJzZWRSZXN1bHQuc291cmNlKG9yaWdpbmFsU2NvcGUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBtb2RlbC5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBsb2NhbCA9IHt9O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxvY2FsW3BhcnNlZFJlc3VsdC5pdGVtTmFtZV0gPSBtb2RlbFtpXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzY29wZS5pdGVtcy5wdXNoKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGFiZWw6IHBhcnNlZFJlc3VsdC52aWV3TWFwcGVyKGxvY2FsKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbW9kZWw6IG1vZGVsW2ldLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaGVja2VkOiBmYWxzZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgcGFyc2VNb2RlbCgpO1xuXG4gICAgICAgICAgICAgICAgICAgIC8vIGFkZCB0ZW1wbGF0ZSBkaXJlY3RpdmVcbiAgICAgICAgICAgICAgICAgICAgZWxlbWVudC5hcHBlbmQoJGNvbXBpbGUocG9wVXBFbCkoc2NvcGUpKTtcblxuICAgICAgICAgICAgICAgICAgICAvLyBzZWxlY3Rpb24gZnVuY3Rpb25cbiAgICAgICAgICAgICAgICAgICAgZnVuY3Rpb24gc2VsZWN0TXVsdGlwbGUoaXRlbSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaXRlbS5jaGVja2VkID0gIWl0ZW0uY2hlY2tlZDtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNldE1vZGVsVmFsdWUodHJ1ZSk7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAvLyBhcnJheSBmb3IgbXVsdGlwbGUgc2VsZWN0aW9uXG4gICAgICAgICAgICAgICAgICAgIGZ1bmN0aW9uIHNldE1vZGVsVmFsdWUoaXNNdWx0aXBsZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGlzTXVsdGlwbGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZSA9IFtdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFuZ3VsYXIuZm9yRWFjaChzY29wZS5pdGVtcywgZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGl0ZW0uY2hlY2tlZCkgdmFsdWUucHVzaChpdGVtLm1vZGVsKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhbmd1bGFyLmZvckVhY2goc2NvcGUuaXRlbXMsIGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpdGVtLmNoZWNrZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlID0gaXRlbS5tb2RlbDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBtb2RlbEN0cmwuJHNldFZpZXdWYWx1ZSh2YWx1ZSk7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAvLyBmdW5jdGlvbiBmb3Igc2VsZWN0aW9uIG9mIGFsbFxuICAgICAgICAgICAgICAgICAgICBzY29wZS5jaGVja0FsbCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghaXNNdWx0aXBsZSkgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgICAgICAgYW5ndWxhci5mb3JFYWNoKHNjb3BlLml0ZW1zLCBmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW0uY2hlY2tlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNldE1vZGVsVmFsdWUodHJ1ZSk7XG4gICAgICAgICAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgICAgICAgICAgLy8gZnVuY3Rpb24gZm9yIHNlbGVjdGlvbiBvZiBub25lXG4gICAgICAgICAgICAgICAgICAgIHNjb3BlLnVuY2hlY2tBbGwgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBhbmd1bGFyLmZvckVhY2goc2NvcGUuaXRlbXMsIGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaXRlbS5jaGVja2VkID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNldE1vZGVsVmFsdWUodHJ1ZSk7XG4gICAgICAgICAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgICAgICAgICAgc2NvcGUuc2VsZWN0ID0gZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpc011bHRpcGxlID09PSBmYWxzZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGVjdFNpbmdsZShpdGVtKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZWN0TXVsdGlwbGUoaXRlbSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9O1xuICAgICAgICB9KVxuXG4vLyBkaXJlY3RpdmUgc3RvcmluZyB0ZW1wbGF0ZVxuYXBwLmRpcmVjdGl2ZSgnYm9zc3lNdWx0aXNlbGVjdFBvcHVwJywgWyckZG9jdW1lbnQnLCBmdW5jdGlvbiAoJGRvY3VtZW50KSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICByZXN0cmljdDogJ0UnLFxuICAgICAgICAgICAgc2NvcGU6IGZhbHNlLFxuICAgICAgICAgICAgcmVwbGFjZTogdHJ1ZSxcbiAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAnLi4vdGVtcGxhdGVzL2Jvc3N5LmNvbWJvYm94Lm11bHRpc2VsZWN0Lmh0bWwnLFxuICAgICAgICAgICAgbGluazogZnVuY3Rpb24gKHNjb3BlLCBlbGVtZW50LCBhdHRyKSB7XG5cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1dKTtcbiIsImFuZ3VsYXIubW9kdWxlKCdib3NzeS5kYXRhJywgW10pXG4vKipcbkBuZ2RvYyBzZXJ2aWNlXG5AbmFtZSAkZGF0YVxuQHJlcXVpcmVzICRxXG5AcmVxdWlyZXMgJGh0dHBcblxuKi9cbiAgICAuZmFjdG9yeSgnJGRhdGEnLCBbJyRxJywnJGh0dHAnLGZ1bmN0aW9uICgkcSwkaHR0cCkge1xuXG4gICAgICAgIGZ1bmN0aW9uIF9nZXREYXRhIChkYXRhKSB7XG4gICAgICAgICAgICBpZiAoYW5ndWxhci5pc1N0cmluZyhkYXRhKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBfZ2V0UmVtb3RlRGF0YShkYXRhKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKGFuZ3VsYXIuaXNPYmplY3QoZGF0YSkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZGF0YTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKGFuZ3VsYXIuaXNGdW5jdGlvbihkYXRhKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBfZ2V0RGF0YSggZGF0YS5jYWxsKCRzY29wZSkgKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIC8vVE9ETzogcmVwbGFjZSBlcnJvciBtZXNzYWdlIHdpdGggb25saW5lIGRvYyBsaW5rIGxpa2UgbmcgZXJyb3JzXG4gICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcignZGlyZWN0aXZlLmJvc3N5Rm9ybTogbm8gZGF0YSB1cmwgb3Igb2JqZWN0IGdpdmVuJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBmdW5jdGlvbiBfZ2V0UmVtb3RlRGF0YShkYXRhKSB7XG4gICAgICAgICAgICB2YXIgZGVmZXJyZWQgPSAkcS5kZWZlcigpO1xuXG4gICAgICAgICAgICAkaHR0cC5nZXQoIGRhdGEsIHsgcmVzcG9uc2VUeXBlOiAnanNvbicgfSApXG4gICAgICAgICAgICAgICAgLnN1Y2Nlc3MoIGZ1bmN0aW9uKCBkYXRhICkge1xuICAgICAgICAgICAgICAgICAgICBpZiggYW5ndWxhci5pc09iamVjdCggZGF0YSApICkge1xuICAgICAgICAgICAgICAgICAgICAgICAgZGVmZXJyZWQucmVzb2x2ZShkYXRhKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vVE9ETzogcmVwbGFjZSBlcnJvciBtZXNzYWdlIHdpdGggb25saW5lIGRvYyBsaW5rIGxpa2UgbmcgZXJyb3JzXG4gICAgICAgICAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZWplY3QoJ2RpcmVjdGl2ZS5ib3NzeUZvcm06IEdFVCByZXF1ZXN0IHRvIHVybCBkaWQgbm90IHByb2R1Y2UgZGF0YSBvYmplY3QnKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgLmVycm9yKCBmdW5jdGlvbihyZXNwb25zZV9kYXRhLCBzdGF0dXMpIHtcbiAgICAgICAgICAgICAgICAgICAgLy9UT0RPOiByZXBsYWNlIGVycm9yIG1lc3NhZ2Ugd2l0aCBvbmxpbmUgZG9jIGxpbmsgbGlrZSBuZyBlcnJvcnNcbiAgICAgICAgICAgICAgICAgICAgZGVmZXJyZWQucmVqZWN0KCdkaXJlY3RpdmUuYm9zc3lGb3JtOiBHRVQgcmVxdWVzdCB0byB1cmwgXCInICsgZGF0YSArICdcIiBmYWlsZWQgd2l0aCBzdGF0dXMgXCInICsgc3RhdHVzICsgJ1wiJyk7XG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIHJldHVybiBkZWZlcnJlZC5wcm9taXNlO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgQG5nZG9jIG1ldGhvZFxuICAgICAgICAgICAgQG5hbWUgZ2V0RGF0YVxuICAgICAgICAgICAgQG1ldGhvZE9mICRkYXRhXG4gICAgICAgICAgICBAcGFyYW0ge3N0cmluZyxvYmplY3QsZnVuY3Rpb259IGRhdGEgSWYgZGF0YSBpcyBhIHN0cmluZywgaXQgd2lsbCBiZSB0cmVhdGVkIGFzIGEgdXJsIHRvIHJldHJpZXZlIGRhdGEgZnJvbS4gSWYgZGF0YSBpcyBhbiBvYmplY3QgaXQgd2lsbCBiZSBpbW1lZGlhdGVseSByZXR1cm5lZC4gSWYgZGF0YSBpcyBhIGZ1bmN0aW9uLCB0aGUgZnVuY3Rpb24gd2lsbCBiZSBjYWxsZWQgYW5kIHByb2Nlc3NlZCB1bnRpbCBhbiBvYmplY3QgaXMgcHJvZHVjZWRcbiAgICAgICAgICAgIEByZXR1cm5zIHtPYmplY3R9IEVpdGhlciBhICRxIHByb21pc2UsIGEgZGF0YSBvYmplY3Qgb3IgYSBzdHJpbmcuXG4gICAgICAgICAgICAqL1xuICAgICAgICAgICAgZ2V0RGF0YTogX2dldERhdGFcbiAgICAgICAgfTtcbiAgICB9XSlcbjtcbiIsImFuZ3VsYXIubW9kdWxlKCdib3NzeS5kcm9wZG93bicsIFtdKVxuXHQucnVuKGZ1bmN0aW9uKCR0ZW1wbGF0ZUNhY2hlKXtcbiAgICAgICAgJHRlbXBsYXRlQ2FjaGUucHV0KCdib3NzeS1kcm9wZG93bi5odG1sJywgJzxkaXY+PHNlbGVjdCBuZy1vcHRpb25zPVwiaXRlbVtkcm9wZG93bi50aXRsZV0gZm9yIGl0ZW0gaW4gZHJvcGRvd24uaXRlbXMgfCBvcmRlckJ5OiBkcm9wZG93bi50aXRsZVwiIG5nLW1vZGVsPVwic2VsZWN0ZWRJdGVtXCIgbmctY2hhbmdlPVwiZHJvcGRvd24udXBkYXRlU2VsZWN0ZWRJdGVtKHNlbGVjdGVkSXRlbSlcIj48b3B0aW9uIHZhbHVlPVwiXCIgbmctaGlkZT1cInNlbGVjdGVkSXRlbVwiPlBsZWFzZSBzZWxlY3Qgb25lLi4uPC9vcHRpb24+PC9zZWxlY3Q+PC9kaXY+Jyk7XHRcbiAgICB9KVxuXHQuZGlyZWN0aXZlKCdib3NzeURyb3Bkb3duJywgZnVuY3Rpb24oJGh0dHAsICRjb21waWxlKSB7XG5cdFx0cmV0dXJuIHtcblx0XHRcdHJlc3RyaWN0OiAnRUEnLFxuXHRcdFx0c2NvcGU6IHtcblx0XHRcdFx0Y29uZmlnOiBcIj1cIixcblx0XHRcdFx0c2VsZWN0OiBcIj1cIixcblx0XHRcdFx0aXRlbXM6IFwiPVwiXG5cdFx0XHR9LFxuXHRcdFx0dGVtcGxhdGVVcmw6ICcnLFxuXHRcdFx0bGluazogZnVuY3Rpb24oc2NvcGUsIGVsZW1lbnQsIGF0dHJzKSB7XG5cdFx0XHRcdHZhciBjdXN0b21UZW1wbGF0ZTtcblxuXHRcdFx0XHQvL0NoZWNrcyBpZiB1c2VyIGlzIGRlZmluaW5nIGEgdXJsIG9yIGlubmVyIGh0bWxcblx0XHRcdFx0Ly9JZiBpdCBpcyBhIHVybCwgdGhlIHRlbXBsYXRlIG11c3QgYmUgbG9jYXRlZCBpbiBhIGxvY2FsIGRpcmVjdG9yeSBvciBhZGRlZCB0byB0aGUgRE9NIHZpYSBuZy1pbmNsdWRlXG5cdFx0XHRcdGlmKHNjb3BlLmRyb3Bkb3duLnRlbXBsYXRlWzBdICE9PSAnPCcpXG5cdFx0XHRcdFx0Y3VzdG9tVGVtcGxhdGUgPSAkY29tcGlsZSgnPG5nLWluY2x1ZGUgc3JjPVwiZHJvcGRvd24udGVtcGxhdGVcIj48L25nLWluY2x1ZGU+Jykoc2NvcGUpO1xuXHRcdFx0XHRlbHNlXG5cdFx0XHRcdFx0Y3VzdG9tVGVtcGxhdGUgPSAkY29tcGlsZShzY29wZS5kcm9wZG93bi50ZW1wbGF0ZSkoc2NvcGUpO1xuXHRcdFx0XHRcblx0XHRcdFx0Ly9JbmplY3RzIHRlbXBsYXRlXG5cdFx0XHRcdGVsZW1lbnQucmVwbGFjZVdpdGgoY3VzdG9tVGVtcGxhdGUpO1xuXHRcdFx0fSxcblx0XHRcdGNvbnRyb2xsZXI6IGZ1bmN0aW9uKCRzY29wZSkge1xuXHRcdFx0XHR2YXIgdGhpc0Ryb3Bkb3duID0gdGhpcztcblx0XHRcdFx0dGhpc0Ryb3Bkb3duLnRpdGxlID0gJHNjb3BlLmNvbmZpZy50aXRsZTtcblx0XHRcdFx0dGhpc0Ryb3Bkb3duLml0ZW1zID0gW107XG5cblx0XHRcdFx0Ly9SZXRyaWV2ZSBqc29uIGNvbnRhaW5pbmcgb2JqZWN0cyB0byBwb3B1bGF0ZSB0aGUgZHJvcGRvd24uXG5cdFx0XHRcdGlmKCRzY29wZS5jb25maWcuc3JjKSB7XG5cdFx0XHRcdFx0Ly9DaGVja3MgdGhhdCBjb25maWcuc3JjIGlzIGEgSlNPTiBmaWxlLlxuXHRcdFx0XHRcdGlmKCRzY29wZS5jb25maWcuc3JjLnN1YnN0cigkc2NvcGUuY29uZmlnLnNyYy5sZW5ndGgtNSwgJHNjb3BlLmNvbmZpZy5zcmMubGVuZ3RoKSA9PSAnLmpzb24nKSB7XG5cdFx0XHRcdFx0XHQkaHR0cC5nZXQoJHNjb3BlLmNvbmZpZy5zcmMpXG5cdFx0XHRcdFx0XHRcdC5zdWNjZXNzKGZ1bmN0aW9uKGRhdGEpIHtcblx0XHRcdFx0XHRcdFx0XHR0aGlzRHJvcGRvd24uaXRlbXMgPSBkYXRhO1xuXHRcdFx0XHRcdFx0XHRcdC8vQ2hlY2tzIHZhbGlkaXR5IG9mIHRoZSB0aXRsZSBmaWVsZCBhcyBpdCBhcHBsaWVzIHRvIHRoZSBKU09OLlxuXHRcdFx0XHRcdFx0XHRcdGlmKCF0aGlzRHJvcGRvd24uaXRlbXNbMF0uaGFzT3duUHJvcGVydHkodGhpc0Ryb3Bkb3duLnRpdGxlKSlcblx0XHRcdFx0XHRcdFx0XHRcdGNvbnNvbGUuZXJyb3IoXCJFUlJPUjogJHNjb3BlLmNvbmZpZy50aXRsZTogXFwnXCIgKyAkc2NvcGUuY29uZmlnLnRpdGxlICsgXCJcXCcnIGlzIG5vdCBhIG1lbWJlciBvZiB0aGUgbG9hZGVkIEpTT04gZGF0YS4gUGxlYXNlIHNwZWNpZnkgYSB2YWxpZCBcXCd0aXRsZVxcJyB0byBsaXN0LlwiKTtcblx0XHRcdFx0XHRcdFx0XHQvL0F0dGFjaGVzIHJldHJpZXZlZCBpdGVtcyB0byAkc2NvcGUuaXRlbXMgZm9yIGFkZGl0aW9uYWwgZnVuY3Rpb25hbGl0eS5cblx0XHRcdFx0XHRcdFx0XHRpZigkc2NvcGUuaXRlbXMpXG5cdFx0XHRcdFx0XHRcdFx0XHQkc2NvcGUuaXRlbXMgPSB0aGlzRHJvcGRvd24uaXRlbXM7XG5cdFx0XHRcdFx0XHRcdH0pXG5cdFx0XHRcdFx0XHRcdC5lcnJvcihmdW5jdGlvbihkYXRhKSB7XG5cdFx0XHRcdFx0XHRcdFx0Y29uc29sZS5lcnJvcihcIkVSUk9SOiBGYWlsIHRvIGxvYWQgSlNPTiBkYXRhIGZyb20gdGhlIHBhdGg6IFxcJ1wiICsgJHNjb3BlLmNvbmZpZy5zcmMgKyBcIlxcJ1wiKTtcblx0XHRcdFx0XHRcdFx0fSk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdC8vTG9ncyBhbiBlcnJvciB0byBpZGVudGlmeSB0aGF0IGEganNvbiBmaWxlIHdhcyBub3QgbG9hZGVkLlxuXHRcdFx0XHRcdGVsc2Uge1xuXHRcdFx0XHRcdFx0Y29uc29sZS5lcnJvciggXCJFUlJPUjogXFwnJHNjb3BlLmNvbmZpZy5zcmNcXCc6IFxcJ1wiICsgJHNjb3BlLmNvbmZpZy5zcmMgKyBcIlxcJyBpcyBub3QgYSB2YWxpZCBKU09OIGZpbGUuXCIpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHQvL0Z1bmN0aW9uIGNhbGxlZCB0byB1cGRhdGUgc2VsZWN0IGluIHRoZSB0ZW1wbGF0ZS5cblx0XHRcdFx0XHR0aGlzRHJvcGRvd24udXBkYXRlU2VsZWN0ZWRJdGVtID0gZnVuY3Rpb24oc2VsZWN0ZWRJdGVtKSB7XG5cdFx0XHRcdFx0XHQvL1NpbmdsZSBzZWxlY3Qgb2JqZWN0IHRpZWQgdG8gdGhlIGNvbmZpZyBvYmplY3QuXG5cdFx0XHRcdFx0XHRpZigkc2NvcGUuY29uZmlnLnNlbGVjdClcblx0XHRcdFx0XHRcdFx0JHNjb3BlLmNvbmZpZy5zZWxlY3QgPSBzZWxlY3RlZEl0ZW07XG5cdFx0XHRcdFx0XHQvL1VzZXIgY2FuIGNvbGxlY3QgYW5kIHV0aWxpemUgbXVsdGlwbGUgc2VsZWN0IG9iamVjdHMgd2l0aCB0aGUgc2FtZSBjb25maWcgb2JqZWN0IGlmIHBhc3NpbmcgaW4gYSBkaXN0aW5jdCBzZWxlY3QgcGFyYW0uXG5cdFx0XHRcdFx0XHRpZigkc2NvcGUuc2VsZWN0KVxuXHRcdFx0XHRcdFx0XHQkc2NvcGUuc2VsZWN0ID0gc2VsZWN0ZWRJdGVtO1xuXHRcdFx0XHRcdH07XG5cdFx0XHRcdFx0Ly9EZXRlcm1pbmUgaWYgY3VzdG9tIHRlbXBsYXRlIFVybCBoYXMgYmVlbiBkZWZpbmVkLlxuXHRcdFx0XHRcdGlmKCRzY29wZS5jb25maWcudGVtcGxhdGUpXG5cdFx0XHRcdFx0XHR0aGlzRHJvcGRvd24udGVtcGxhdGUgPSAkc2NvcGUuY29uZmlnLnRlbXBsYXRlO1xuXHRcdFx0XHRcdGVsc2Uge1xuXHRcdFx0XHRcdFx0dGhpc0Ryb3Bkb3duLnRlbXBsYXRlID0gJ2Jvc3N5LWRyb3Bkb3duLmh0bWwnO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0XHQvL0xvZ3MgYW4gZXJyb3IgaWYgJ3NyYycgaGFzIG5vdCBiZWVuIGRlZmluZWQuXG5cdFx0XHRcdGVsc2Uge1xuXHRcdFx0XHRcdGNvbnNvbGUuZXJyb3IoIFwiRVJST1I6IFxcJyRzY29wZS5jb25maWcuc3JjXFwnIGhhcyBub3QgYmVlbiBzcGVjaWZpZWQgd2l0aGluIHRoZSBcXCdjb25maWdcXCcgb2JqZWN0LiBQbGVhc2UgcGFzcyBpbiBhIHZhbGlkIHBhdGggdG8gYSBKU09OIGZpbGUuXCIpO1xuXHRcdFx0XHR9O1xuXHRcdFx0fSxcblx0XHRcdGNvbnRyb2xsZXJBczogJ2Ryb3Bkb3duJ1xuXHRcdH07XG5cdH0pXG4iLCJhbmd1bGFyLm1vZHVsZSgnYm9zc3kuZm9ybScsIFtdKVxuICAgIC5ydW4oZnVuY3Rpb24oJHRlbXBsYXRlQ2FjaGUpe1xuICAgICAgICAkdGVtcGxhdGVDYWNoZS5wdXQoJ2Jvc3N5LWlucHV0Lmh0bWwnLCAndGVtcGxhdGVzL2Jvc3N5LWlucHV0Lmh0bWwnKTtcbiAgICB9KVxuICAgIC5kaXJlY3RpdmUoJ2Jvc3N5Rm9ybScsWyckY29tcGlsZScsJyRodHRwJywnJHNjaGVtYScsJyRkYXRhJywgZnVuY3Rpb24gKCRjb21waWxlLCAkaHR0cCwgJHNjaGVtYSwgJGRhdGEpIHtcbiAgICAgICAgdmFyIF9zY2hlbWEsXG4gICAgICAgICAgICBfZGF0YSxcbiAgICAgICAgICAgIF9vcHRpb25zID0ge1xuICAgICAgICAgICAgICAgIHNob3dMYWJlbHM6IHRydWUsXG4gICAgICAgICAgICAgICAgaGVhZGVyOiAnVGhpcyBpcyBoZWFkZXInLFxuICAgICAgICAgICAgICAgIGZvb3RlcjogJ1RoaXMgaXMgZm9vdGVyJyxcbiAgICAgICAgICAgICAgICB0aGVtZTogJ2dyZWVuJyxcbiAgICAgICAgICAgICAgICBidXR0b246ICdTYXZlJ1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIF9pdGVtVGVtcGxhdGUgPSB7XG4gICAgICAgICAgICAgICAgbnVtYmVyOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAnPGlucHV0IHR5cGU9XCJudW1iZXJcIi8+JztcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHRleHQ6IGZ1bmN0aW9uIChvYmosIGtleSwgaXNfcmVxdWlyZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuICc8Ym9zc3ktaW5wdXQgdGl0bGU9XCJcXCcnK29iai50aXRsZSsnXFwnXCIgdHlwZT1cIlxcJycrIG9iai5pbnB1dF90eXBlICsnXFwnXCIgdmFsdWU9XCJcXCcnK19kYXRhLmFkZHJlc3Nba2V5XSsnXFwnXCInICsgKCBpc19yZXF1aXJlZCA/ICcgcmVxdWlyZWQnIDogJycgKSArICc+PC9ib3NzeS1pbnB1dD4nO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgdGV4dEFyZWE6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuICc8dGV4dGFyZWE+PC90ZXh0YXJlYT4nO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgY2hlY2tib3g6IGZ1bmN0aW9uKG9iail7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAnPGRpdiBjbGFzcz1cImNoZWNrYm94XCI+PGxhYmVsPjxpbnB1dCB0eXBlPVwiY2hlY2tib3hcIj4nK29iai50aXRsZSsnPC9sYWJlbD48L2Rpdj4nO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgZnVuY3Rpb24gc2V0RGF0YShkYXRhKSB7XG4gICAgICAgICAgICB2YXIgcmVzdWx0ID0gJGRhdGEuZ2V0RGF0YShkYXRhKTtcbiAgICAgICAgICAgIGlmKCBhbmd1bGFyLmlzRnVuY3Rpb24oIHJlc3VsdC50aGVuICkgJiYgYW5ndWxhci5pc0Z1bmN0aW9uKCByZXN1bHQuY2F0Y2ggKSAmJiBhbmd1bGFyLmlzRnVuY3Rpb24oIHJlc3VsdC5maW5hbGx5ICkgKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgX2RhdGEgPSByZXN1bHQ7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfVxuXG4gICAgICAgIGZ1bmN0aW9uIHNldFNjaGVtYShzY2hlbWEpIHtcbiAgICAgICAgICAgIF9zY2hlbWEgPSAkc2NoZW1hLmdldFNjaGVtYShzY2hlbWEpO1xuICAgICAgICB9XG5cbiAgICAgICAgZnVuY3Rpb24gYnVpbGRUZW1wbGF0ZShzY2hlbWFQYXJ0LCBwYXJlbnRLZXksIHJlcXVpcmVkKSB7XG4gICAgICAgICAgICB2YXIgdGVtcGxhdGUgPSAnJyxcbiAgICAgICAgICAgICAgICBmdWxsS2V5ID0gJyc7XG4gICAgICAgICAgICBhbmd1bGFyLmZvckVhY2goc2NoZW1hUGFydCwgZnVuY3Rpb24odmFsdWUsIGtleSkge1xuICAgICAgICAgICAgICAgIGlmICh2YWx1ZS50eXBlKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGZ1bGxLZXkgKyAnIGlzICcrIHZhbHVlLnR5cGUpO1xuICAgICAgICAgICAgICAgICAgICBzd2l0Y2ggKHZhbHVlLnR5cGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ29iamVjdCc6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHJlcXVpcmVkX2xpc3QgPSB0eXBlb2YoIHZhbHVlLnJlcXVpcmVkICkgIT09ICd1bmRlZmluZWQnID8gdmFsdWUucmVxdWlyZWQgOiBudWxsO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlICs9IGJ1aWxkVGVtcGxhdGUodmFsdWUucHJvcGVydGllcywgZnVsbEtleSwgcmVxdWlyZWRfbGlzdCApO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAnYXJyYXknOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlICs9IGJ1aWxkVGVtcGxhdGUodmFsdWUuaXRlbXMucHJvcGVydGllcywgZnVsbEtleSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlICdudW1iZXInIHx8ICdpbnRlZ2VyJzpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0ZW1wbGF0ZSArPSBfaXRlbVRlbXBsYXRlLm51bWJlcih2YWx1ZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlICdzdHJpbmcnOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBpc19yZXF1aXJlZCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKCByZXF1aXJlZCAmJiByZXF1aXJlZC5pbmRleE9mKGtleSkgIT09IC0xICkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpc19yZXF1aXJlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlICs9IF9pdGVtVGVtcGxhdGUudGV4dCh2YWx1ZSwga2V5LCBpc19yZXF1aXJlZCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlICdib29sZWFuJzpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0ZW1wbGF0ZSArPSBfaXRlbVRlbXBsYXRlLmNoZWNrYm94KHZhbHVlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sIHRoaXMpO1xuICAgICAgICAgICAgcmV0dXJuIHRlbXBsYXRlO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHJlc3RyaWN0OiAnRScsXG4gICAgICAgICAgICByZXBsYWNlOiB0cnVlLFxuICAgICAgICAgICAgdGVtcGxhdGU6ICcnLFxuICAgICAgICAgICAgc2NvcGU6IHtcbiAgICAgICAgICAgICAgICBjb25maWc6Jz0nLCAvL0NyZWF0ZSBzY29wZSBpc29sYXRpb24gd2l0aCBiaS1kaXJlY3Rpb25hbCBiaW5kaW5nLFxuICAgICAgICAgICAgICAgIHRpdGxlOiAnPSdcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBsaW5rOiBmdW5jdGlvbiAoc2NvcGUsIGVsZW1lbnQsIGF0dHJpYnV0ZXMpIHtcbiAgICAgICAgICAgICAgICBzY29wZS5jb25maWcub3B0aW9ucyA9IGFuZ3VsYXIuZXh0ZW5kKF9vcHRpb25zLCBzY29wZS5jb25maWcub3B0aW9ucyk7XG5cbiAgICAgICAgICAgICAgICB2YXIgcHJvbWlzZSA9IHNldERhdGEoc2NvcGUuY29uZmlnLmRhdGEpO1xuICAgICAgICAgICAgICAgIHNldFNjaGVtYShzY29wZS5jb25maWcuc2NoZW1hKTtcbiAgICAgICAgICAgICAgICBpZiggcHJvbWlzZSApIHtcbiAgICAgICAgICAgICAgICAgICAgLy90b2RvOiBzZXQgZGlyZWN0aXZlIHRvIGxvYWRpbmcgc3RhdGVcbiAgICAgICAgICAgICAgICAgICAgcHJvbWlzZS50aGVuKFxuICAgICAgICAgICAgICAgICAgICAgICAgZnVuY3Rpb24ocmVzdWx0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy90b2RvOiBzZXQgZGlyZWN0aXZlIHRvIGxvYWRlZCBzdGF0ZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9kYXRhID0gcmVzdWx0O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsZW1lbnQuaHRtbChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJzxmb3JtIG5vdmFsaWRhdGUgY2xhc3M9XCJ7e2NvbmZpZy5vcHRpb25zLnRoZW1lfX1cIj4nK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnPGRpdiBjbGFzcz1cImJhbm5lciBwYWdlLWhlYWRlclwiPjxoMz57e2NvbmZpZy5vcHRpb25zLmhlYWRlcn19PC9oMz48L2Rpdj4nK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnVpbGRUZW1wbGF0ZShfc2NoZW1hKSArXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnPGJ1dHRvbiBuZy1pZj1cImNvbmZpZy5vcHRpb25zLmJ1dHRvblwiPnt7Y29uZmlnLm9wdGlvbnMuYnV0dG9ufX08L2J1dHRvbj4nICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJzxkaXYgY2xhc3M9XCJwYWdlLWZvb3RlclwiPjxoMz57e2NvbmZpZy5vcHRpb25zLmZvb3Rlcn19PC9oMz48L2Rpdj4nK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnPC9mb3JtPidcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICRjb21waWxlKGVsZW1lbnQuY29udGVudHMoKSkoc2NvcGUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGZ1bmN0aW9uKHJlYXNvbikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vdG9kbzogc2V0IGRpcmVjdGl2ZSB0byBlcnJvciBzdGF0ZVxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIGVsZW1lbnQuaHRtbChcbiAgICAgICAgICAgICAgICAgICAgICAgICc8Zm9ybSBub3ZhbGlkYXRlIGNsYXNzPVwie3tjb25maWcub3B0aW9ucy50aGVtZX19XCI+TE9BRElORy4uLjwvZm9ybT4nXG4gICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgICAgICRjb21waWxlKGVsZW1lbnQuY29udGVudHMoKSkoc2NvcGUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgZWxlbWVudC5odG1sKFxuICAgICAgICAgICAgICAgICAgICAgICAgJzxmb3JtIG5vdmFsaWRhdGUgY2xhc3M9XCJ7e2NvbmZpZy5vcHRpb25zLnRoZW1lfX1cIj4nK1xuICAgICAgICAgICAgICAgICAgICAgICAgJzxkaXYgY2xhc3M9XCJiYW5uZXIgcGFnZS1oZWFkZXJcIj48aDM+e3tjb25maWcub3B0aW9ucy5oZWFkZXJ9fTwvaDM+PC9kaXY+JytcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBidWlsZFRlbXBsYXRlKF9zY2hlbWEpICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAnPGJ1dHRvbiBuZy1pZj1cImNvbmZpZy5vcHRpb25zLmJ1dHRvblwiPnt7Y29uZmlnLm9wdGlvbnMuYnV0dG9ufX08L2J1dHRvbj4nICtcbiAgICAgICAgICAgICAgICAgICAgICAgICc8ZGl2IGNsYXNzPVwicGFnZS1mb290ZXJcIj48aDM+e3tjb25maWcub3B0aW9ucy5mb290ZXJ9fTwvaDM+PC9kaXY+JytcbiAgICAgICAgICAgICAgICAgICAgICAgICc8L2Zvcm0+J1xuICAgICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgICAgICAkY29tcGlsZShlbGVtZW50LmNvbnRlbnRzKCkpKHNjb3BlKTtcbiAgICAgICAgICAgICAgICB9XG5cblxuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuXG4gICAgfV0pXG47IiwiYW5ndWxhci5tb2R1bGUoJ2Jvc3N5LmlucHV0JywgW10pXG4gICAgLnJ1bihmdW5jdGlvbigkdGVtcGxhdGVDYWNoZSl7XG4gICAgICAgICR0ZW1wbGF0ZUNhY2hlLnB1dCgnYm9zc3ktaW5wdXQuaHRtbCcsICc8ZGl2IGNsYXNzPVwiZm9ybS1ncm91cCBib3NzeS1pbnB1dFwiPjxsYWJlbCBmb3I9XCJcIj57e3RpdGxlfX08L2xhYmVsPjxpbnB1dCB0eXBlPVwie3t0eXBlfX1cIiBjbGFzcz1cImZvcm0tY29udHJvbFwiIHBsYWNlaG9sZGVyPVwiXCIgdmFsdWU9XCJ7e3ZhbHVlfX1cIi8+PHNwYW4+PC9zcGFuPjwvZGl2PicpO1xuICAgIH0pXG4gICAgLmRpcmVjdGl2ZSgnYm9zc3lJbnB1dCcsWyckY29tcGlsZScsJyRodHRwJywnJHNjaGVtYScsJyRkYXRhJywnJHRlbXBsYXRlQ2FjaGUnLCBmdW5jdGlvbiAoJGNvbXBpbGUsICRodHRwLCAkc2NoZW1hLCAkZGF0YSwgJHRlbXBsYXRlQ2FjaGUpIHtcbiAgICBcdHJldHVybiB7XG5cdFx0XHRyZXN0cmljdDogJ0UnLFxuXHRcdFx0cmVwbGFjZTogdHJ1ZSxcblx0XHRcdHNjb3BlOiB7XG5cdFx0XHRcdHRpdGxlOiAnPScsXG5cdFx0XHRcdHZhbHVlOiAnPScsXG5cdFx0XHRcdHR5cGU6ICc9Jyxcblx0XHRcdFx0cmVxdWlyZWQ6ICc9J1xuXHRcdFx0fSxcblx0XHRcdHRlbXBsYXRlOiAkdGVtcGxhdGVDYWNoZS5nZXQoJ2Jvc3N5LWlucHV0Lmh0bWwnKVxuXHRcdH07XG4gICAgfV0pO1xuIiwidmFyIGFwcCA9IGFuZ3VsYXIubW9kdWxlKCdib3NzeS5udW1lcmljdGV4dGJveCcsW10pO1xuXG5cbmFwcC5jb250cm9sbGVyKCdib3NzeW51bWVyaWNDdHJsJyxmdW5jdGlvbigkc2NvcGUpe1xuICAgIHZhciBzeW1ib2xzPVsnJCcsJyUnLCdsYnMnXTtcbiAgICB2YXIgaW5pdGlhbFZhbHVlPTA7XG5cblxuICAgIHZhciBrZXkgPSB7XG4gICAgICAgIHByaWNlOjAsXG4gICAgICAgIHdlaWdodDowLFxuICAgICAgICBkaXNjb3VudDowLFxuICAgICAgICBzdG9jazowXG4gICAgfTtcblxuXG4gICAgJHNjb3BlLnAgPSBzeW1ib2xzWzBdICsgaW5pdGlhbFZhbHVlO1xuICAgICRzY29wZS53ID0gaW5pdGlhbFZhbHVlICsgc3ltYm9sc1syXTtcbiAgICAkc2NvcGUuZCA9IGluaXRpYWxWYWx1ZSArIHN5bWJvbHNbMV07XG4gICAgJHNjb3BlLnMgPSBpbml0aWFsVmFsdWU7XG5cbiAgICAkc2NvcGUuaW5jcmVtZW50ID0gZnVuY3Rpb24oYSl7XG4gICAgICAgIHN3aXRjaChhKXtcbiAgICAgICAgICAgIGNhc2UgJ3ByaWNlJzpcbiAgICAgICAgICAgICAgICBrZXkucHJpY2UrKztcbiAgICAgICAgICAgICAgICAkc2NvcGUucCA9IHN5bWJvbHNbMF0gKyBrZXkucHJpY2U7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICd3ZWlnaHQnOlxuICAgICAgICAgICAgICAgIGtleS53ZWlnaHQrKztcbiAgICAgICAgICAgICAgICAkc2NvcGUudz1rZXkud2VpZ2h0ICsgc3ltYm9sc1syXTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJ2Rpc2NvdW50JzpcbiAgICAgICAgICAgICAgICBrZXkuZGlzY291bnQrKztcbiAgICAgICAgICAgICAgICAkc2NvcGUuZCA9IGtleS5kaXNjb3VudCArIHN5bWJvbHNbMV07XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICdzdG9jayc6XG4gICAgICAgICAgICAgICAga2V5LnN0b2NrKys7XG4gICAgICAgICAgICAgICAgJHNjb3BlLnM9a2V5LnN0b2NrO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgIH1cbiAgICAkc2NvcGUuZGVjcmVtZW50ID0gZnVuY3Rpb24oYSl7XG5cbiAgICAgICAgc3dpdGNoKGEpe1xuICAgICAgICAgICAgY2FzZSAncHJpY2UnOlxuICAgICAgICAgICAgICAgIGlmKGtleS5wcmljZT4wKVxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAga2V5LnByaWNlLS07XG4gICAgICAgICAgICAgICAgICAgICRzY29wZS5wID0gc3ltYm9sc1swXSArIGtleS5wcmljZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICd3ZWlnaHQnOlxuICAgICAgICAgICAgICAgIGlmKGtleS53ZWlnaHQ+MCl7XG4gICAgICAgICAgICAgICAgICAgIGtleS53ZWlnaHQtLTtcbiAgICAgICAgICAgICAgICAgICAgJHNjb3BlLnc9a2V5LndlaWdodCArIHN5bWJvbHNbMl07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAnZGlzY291bnQnOlxuICAgICAgICAgICAgICAgIGlmKGtleS5kaXNjb3VudD4wKVxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAga2V5LmRpc2NvdW50LS07XG4gICAgICAgICAgICAgICAgICAgICRzY29wZS5kID0ga2V5LmRpc2NvdW50KyBzeW1ib2xzWzFdO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJ3N0b2NrJzpcbiAgICAgICAgICAgICAgICBpZihrZXkuc3RvY2s+MCl7XG4gICAgICAgICAgICAgICAgICAgIGtleS5zdG9jay0tO1xuICAgICAgICAgICAgICAgICAgICAkc2NvcGUucz1rZXkuc3RvY2s7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuXG4gICAgfVxuXG59KTtcblxuXG5hcHAuZGlyZWN0aXZlKCdib3NzeW51bWVyaWN0ZXh0Ym94JyxmdW5jdGlvbigpe1xuICAgIHJldHVybntcbiAgICAgICAgY29udHJvbGxlcjonYm9zc3ludW1lcmljQ3RybCcsXG4gICAgICAgIHJlc3RyaWN0OidFJyxcbiAgICAgICAgdHJhbnNjbHVkZTp0cnVlLFxuICAgICAgICB0ZW1wbGF0ZVVybDonYm9zc3kubnVtZXJpY3RleHRib3guaHRtbCdcblxuICAgIH1cbn0pO1x0IiwiYW5ndWxhci5tb2R1bGUoJ2Jvc3N5LnNjaGVtYScsIFtdKVxuICAgIC5mYWN0b3J5KCckc2NoZW1hJywgWyckcScsICckaHR0cCcsIGZ1bmN0aW9uICgkcSwgJGh0dHApIHtcblxuICAgICAgICBmdW5jdGlvbiBfZ2V0U2NoZW1hIChzY2hlbWEpIHtcbiAgICAgICAgICAgIGlmIChhbmd1bGFyLmlzU3RyaW5nKHNjaGVtYSkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gX2dldFJlbW90ZVNjaGVtYShzY2hlbWEpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAoYW5ndWxhci5pc09iamVjdChzY2hlbWEpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHNjaGVtYTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIC8vVE9ETzogcmVwbGFjZSBlcnJvciBtZXNzYWdlIHdpdGggb25saW5lIGRvYyBsaW5rIGxpa2UgbmcgZXJyb3JzXG4gICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcignZGlyZWN0aXZlLmJvc3N5Rm9ybTogbm8gc2NoZW1hIHVybCBvciBvYmplY3QgZ2l2ZW4nKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGZ1bmN0aW9uIF9nZXRSZW1vdGVTY2hlbWEoc2NoZW1hKSB7XG4gICAgICAgICAgICB2YXIgZGVmZXJyZWQgPSAkcS5kZWZlcigpO1xuXG4gICAgICAgICAgICAkaHR0cC5nZXQoIHNjaGVtYSApXG4gICAgICAgICAgICAgICAgLnN1Y2Nlc3MoIGZ1bmN0aW9uKCBkYXRhICkge1xuICAgICAgICAgICAgICAgICAgICBpZiggYW5ndWxhci5pc09iamVjdCggZGF0YSApICkge1xuICAgICAgICAgICAgICAgICAgICAgICAgZGVmZXJyZWQucmVzb2x2ZShkYXRhKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vVE9ETzogcmVwbGFjZSBlcnJvciBtZXNzYWdlIHdpdGggb25saW5lIGRvYyBsaW5rIGxpa2UgbmcgZXJyb3JzXG4gICAgICAgICAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZWplY3QoJ2RpcmVjdGl2ZS5ib3NzeUZvcm06IEdFVCByZXF1ZXN0IHRvIHVybCBkaWQgbm90IHByb2R1Y2Ugc2NoZW1hIG9iamVjdCcpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAuZXJyb3IoIGZ1bmN0aW9uKGRhdGEsIHN0YXR1cykge1xuICAgICAgICAgICAgICAgICAgICAvL1RPRE86IHJlcGxhY2UgZXJyb3IgbWVzc2FnZSB3aXRoIG9ubGluZSBkb2MgbGluayBsaWtlIG5nIGVycm9yc1xuICAgICAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZWplY3QoJ2RpcmVjdGl2ZS5ib3NzeUZvcm06IEdFVCByZXF1ZXN0IHRvIHVybCBcIicgKyBzY2hlbWEgKyAnXCIgZmFpbGVkIHdpdGggc3RhdHVzIFwiJyArIHN0YXR1cyArICdcIicpO1xuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICByZXR1cm4gZGVmZXJyZWQucHJvbWlzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBnZXRTY2hlbWE6IF9nZXRTY2hlbWFcbiAgICAgICAgfTtcbiAgICB9XSlcbjtcbiIsIi8qVGhpcyBpcyBhIHNsaWRlciB3aWRnZXQgY3JlYXRlZCBpbiBhbmd1bGFyIGFzIHBhcnQgb2YgdGhlIEJvc3N5VUkgd2lkZ2V0cy5cbiAqIFRoZSBlYXNpZXN0IHdheSB0byB1c2UgdGhlIHNsaWRlciBpcyB0byBpbmNsdWRlIGl0IGluIHlvdXIgSFRNTCBhbmQgdGhlblxuICogY3JlYXRlIGEgdGFnIDxib3NzeS1zbGlkZXI+PC9ib3NzeS1zbGlkZXI+LiBUaGlzIHdpZGdldCB0YWtlIGluIHNldmVyYWxcbiAqIHdheXMgdG8gY3VzdG9taXplLiBMaXN0IG9mIGN1c3RvbWl6YXRpb25zIGF2YWlsYWJsZS5cbiAqIG1heCAgICAgICAgICAgICAgZGVmYXVsdHMgdG8gMTAwXG4gKiBtaW4gICAgICAgICAgICAgIGRlZmF1bHRzIHRvIDFcbiAqIHdpZHRoICAgICAgICAgICAgZGVmYXVsdHMgdG8gMjUwcHhcbiAqIGJhcmZpbGxjb2xvciAgICAgZGVmYXVsdHMgdG8gZGFya2JsdWU6IG11c3QgYmUgcGFzc2VkIGFzIGhleGFkZWNpbWFsIGNvbG9yIGZvcm1hdCAjMDAwMDAwXG4gKiBiYXJlbXB0eWNvbG9yICAgIGRlZmF1bHRzIHRvIGxpZ2h0Z3JleVxuICogYnV0dG9uY29sb3IgICAgICBkZWZhdWx0cyB0byByZWRcbiAqIHN0ZXAgICAgICAgICAgICAgZGVmYXVsdHMgdG8gcmVkXG4gKiBvcmllbnRhdGlvbiAgICAgIGRlZmF1bHRzIHRvIGhvcml6b250YWxcbiAqIGV4LlxuICogPGJvc3N5LXNsaWRlciBtYXg9XCIyMFwiIG1pbj1cIi01XCIgb3JpZW50YXRpb249XCJ2ZXJ0aWNhbFwiPjwvYm9zc3ktc2xpZGVyPiovXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cblxudmFyIGFwcCA9IGFuZ3VsYXIubW9kdWxlKCdib3NzeS5zbGlkZXInLCBbXSk7XG5hcHAuY29udHJvbGxlcignU2xpZGVyQ29udHJvbGxlcicsIFsnJHNjb3BlJywgZnVuY3Rpb24gKCRzY29wZSkge1xuICAgIC8vdGhlc2UgYXJlIG91ciBkZWZhdWx0IHZhbHVlcyBhbmQgYXJlIHRoZSB2YXJpYWJsZXMgdGhhdCBjYW4gYmUgY2hhbmdlZCBieSB1c2VyIG9mIG91ciB3aWRnZXRzXG4gICAgJHNjb3BlLm1heCA9IDEwMDtcbiAgICAkc2NvcGUudmFsdWUgPSAwO1xuICAgICRzY29wZS5taW4gPSAxO1xuICAgICRzY29wZS5maWxsV2lkdGggPSAwO1xuICAgICRzY29wZS5lbXB0V2lkdGggPSAwO1xuICAgICRzY29wZS5iYXJXaWR0aCA9IDI1MDtcbiAgICAkc2NvcGUuYmFyUGllY2UgPSAwO1xuICAgICRzY29wZS5zdGVwID0gMTtcbiAgICAkc2NvcGUuaXNNb3VzZURvd24gPSAwO1xuICAgICRzY29wZS55Q29yZCA9IDA7XG4gICAgJHNjb3BlLnhDb3JkID0gMDtcbiAgICAkc2NvcGUubmV3WENvcmQgPSAwO1xuICAgICRzY29wZS5uZXdZQ29yZCA9IDA7XG4gICAgJHNjb3BlLm9yaWVudGF0aW9uID0gZmFsc2U7XG4gICAgJHNjb3BlLmJ1dFNpemUgPSAxNTtcbiAgICAkc2NvcGUuYmFyZmlsbGNvbG9yID0gXCIjMDAwMEZGXCI7XG4gICAgJHNjb3BlLmJhcmVtcHR5Y29sb3IgPSBcIiNEM0QzRDNcIjtcbiAgICAkc2NvcGUuYnV0dG9uY29sb3IgPSBcIiNGRjAwMDBcIjtcblxuXG4gICAgLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG5cbiAgICAvKm1ha2VCYXIoKVxuICAgICAqIFRoaXMgY3JlYXRlcyB0aGUgaW5pdGlhbCBncmFwaGljIG9mIHRoZSBzbGlkZXIgYW5kIGVuc3VyZXMgaXQgaXMgaW4gdGhlIGNvcnJlY3Qgb3JkZXJcbiAgICAgKiBDQyA9IDQgKi9cbiAgICAkc2NvcGUubWFrZUJhciA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgLy9idXR0b24gc2hvdWxkIHNob3cgdXAgaW4gdGhlIG1pZGRsZSBub3cgb3IgY2xvc2UgdG8gaWYgdW5ldmVuXG4gICAgICAgICRzY29wZS52YWx1ZSA9IHBhcnNlSW50KCgkc2NvcGUubWF4ICsgJHNjb3BlLm1pbikgLyAyKTtcbiAgICAgICAgZm9yICh2YXIgY3VycmVudCA9ICRzY29wZS5taW47IGN1cnJlbnQgPD0gJHNjb3BlLm1heDsgY3VycmVudCsrKSB7XG4gICAgICAgICAgICBpZiAoY3VycmVudCA8ICgkc2NvcGUudmFsdWUpKSB7XG4gICAgICAgICAgICAgICAgJHNjb3BlLmZpbGxXaWR0aCsrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGN1cnJlbnQgPiAoJHNjb3BlLnZhbHVlKSkge1xuICAgICAgICAgICAgICAgICRzY29wZS5lbXB0V2lkdGgrKztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChjdXJyZW50ID09ICgkc2NvcGUudmFsdWUpKSB7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgJHNjb3BlLm5nTW9kZWwgPSAkc2NvcGUudmFsdWU7XG4gICAgICAgIHJldHVybjtcbiAgICB9O1xuICAgIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuXG4gICAgLyppbmNyZWFzZSgpXG4gICAgICogVGhpcyBjaGVja3MgYm91bmRzIHdoZW4gYXR0ZW1wdGluZyB0byBpbmNyZWFzZSB0aGUgdmFsdWUgYW5kIG1vdmVzIHRoZSBwb3NpdGlvblxuICAgICAqIG9mIHRoZSBzbGlkZXIgYnV0dG9uIGFuZCB1cGRhdGVzIHRoZSB2YWx1ZS5cbiAgICAgKiBDQyA9IDIqL1xuICAgICRzY29wZS5pbmNyZWFzZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKCRzY29wZS52YWx1ZSA8ICRzY29wZS5tYXgpIHtcbiAgICAgICAgICAgICRzY29wZS52YWx1ZSA9ICRzY29wZS52YWx1ZSArIDE7XG4gICAgICAgICAgICAkc2NvcGUuZmlsbFdpZHRoKys7XG4gICAgICAgICAgICAkc2NvcGUuZW1wdFdpZHRoLS07XG4gICAgICAgICAgICAkc2NvcGUubmdNb2RlbCA9ICRzY29wZS52YWx1ZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm47XG4gICAgfTtcbiAgICAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cblxuICAgIC8qYnV0SW5jcmVhc2UoKVxuICAgICAqIFRoaXMgZnVuY3Rpb24gYWxsb3dzIHRoZSBzbGlkZXIgdG8gaW5jcmVhc2UgaW4gaW5jcmVtZW50cy5cbiAgICAgKiBDQyA9IDEqL1xuICAgICRzY29wZS5idXRJbmNyZWFzZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGkgPSAwO1xuICAgICAgICBmb3IgKGkgPSAwOyBpIDwgJHNjb3BlLnN0ZXA7IGkrKykge1xuICAgICAgICAgICAgJHNjb3BlLmluY3JlYXNlKCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cblxuICAgIC8qZGVjcmVhc2UoKVxuICAgICAqIFRoaXMgY2hlY2tzIGJvdW5kcyB3aGVuIGF0dGVtcHRpbmcgdG8gZGVjcmVhc2UgdGhlIHZhbHVlIGFuZCBtb3ZlcyB0aGUgcG9zaXRpb25cbiAgICAgKiBvZiB0aGUgc2xpZGVyIGJ1dHRvbiBhbmQgdXBkYXRlcyB0aGUgdmFsdWUuXG4gICAgICogQ0MgPSAyKi9cbiAgICAkc2NvcGUuZGVjcmVhc2UgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmICgkc2NvcGUudmFsdWUgPiAkc2NvcGUubWluKSB7XG4gICAgICAgICAgICAkc2NvcGUudmFsdWUgPSAkc2NvcGUudmFsdWUgLSAxO1xuICAgICAgICAgICAgJHNjb3BlLmZpbGxXaWR0aC0tO1xuICAgICAgICAgICAgJHNjb3BlLmVtcHRXaWR0aCsrO1xuICAgICAgICAgICAgJHNjb3BlLm5nTW9kZWwgPSAkc2NvcGUudmFsdWU7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuO1xuICAgIH07XG4gICAgLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG5cbiAgICAvKmJ1dERlY3JlYXNlKClcbiAgICAgKiBUaGlzIGZ1bmN0aW9uIGFsbG93cyB0aGUgc2xpZGVyIHRvIGRlY3JlYXNlIGluIGluY3JlbWVudHNcbiAgICAgKiBDQyA9IDEqL1xuICAgICRzY29wZS5idXREZWNyZWFzZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGkgPSAwO1xuICAgICAgICBmb3IgKGkgPSAwOyBpIDwgJHNjb3BlLnN0ZXA7IGkrKykge1xuICAgICAgICAgICAgJHNjb3BlLmRlY3JlYXNlKCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cblxuICAgIC8qa2V5QmluZCgkZXZlbnQpXG4gICAgICogVGhpcyBmdW5jdGlvbiBpcyB0byBiaW5kIHRoZSBkZWNyZWFzZSBhbmQgaW5jcmVhc2UgZnVuY3Rpb24gd2l0aCB0aGUgYXJyb3cga2V5c1xuICAgICAqIENDID0gNSovXG4gICAgJHNjb3BlLmtleUJpbmQgPSBmdW5jdGlvbiAoZXYpIHtcbiAgICAgICAgJHNjb3BlLnByZXNzZWQgPSBldi53aGljaDtcbiAgICAgICAgLy9JZiBhcnJvdyBrZXkoTGVmdCBvciBEb3duKSBpcyBwcmVzc2VkIHRoZW4gY2FsbCB0aGUgZGVjcmVhc2UoKSBmdW5jdGlvbiB0byBkZWNyZWFzZSB0aGUgdmFsdWUuXG4gICAgICAgIGlmICgkc2NvcGUucHJlc3NlZCA9PT0gMzcgfHwgJHNjb3BlLnByZXNzZWQgPT09IDQwKSB7XG4gICAgICAgICAgICAkc2NvcGUuYnV0RGVjcmVhc2UoKTtcblxuICAgICAgICB9XG4gICAgICAgIC8vc2FtZSBhcyBhYm92ZSBidXQgZm9yIFVwIG9yIFJpZ2h0IHRvIGluY3JlYXNlIHRoZSB2YWx1ZS5cbiAgICAgICAgaWYgKCRzY29wZS5wcmVzc2VkID09PSAzOCB8fCAkc2NvcGUucHJlc3NlZCA9PT0gMzkpIHtcbiAgICAgICAgICAgICRzY29wZS5idXRJbmNyZWFzZSgpO1xuXG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuO1xuICAgIH07XG4gICAgLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG5cbiAgICAvKmdyZXlDbGljaygpXG4gICAgICogVGhpcyBmdW5jdGlvbiBpcyB0byBhbGxvdyB0aGUgdmFsdWUgdG8gYmUgY2hhbmdlZCB3aGVuIGNsaWNraW5nIG9uIHRoZSBiYXJcbiAgICAgKiBDQyA9IDEqL1xuICAgICRzY29wZS5ncmV5Q2xpY2sgPSBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgICAgLy9XaGVuIGNsaWNrIG9uIHRoZSBlbXB0eSBiYXIgdGhlIGJhciB3aWxsIGluY3JlYXNlXG4gICAgICAgICRzY29wZS5idXRJbmNyZWFzZSgpO1xuXG4gICAgICAgIHJldHVybjtcbiAgICB9O1xuICAgIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuXG4gICAgLypiYXJDbGljaygpXG4gICAgICogVGhpcyBmdW5jdGlvbiBpcyB0byBhbGxvdyB0aGUgdmFsdWUgdG8gYmUgY2hhbmdlZCB3aGVuIGNsaWNraW5nIG9uIHRoZSBiYXJcbiAgICAgKiBDQyA9IDEqL1xuICAgICRzY29wZS5iYXJDbGljayA9IGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICAvL1doZW4gY2xpY2sgb24gdGhlIEZpbGxlZCB1cCBjb2xvciBzaWRlIHRoZSBiYXIgd2lsbCBkZWNyZWFzZVxuICAgICAgICAkc2NvcGUuYnV0RGVjcmVhc2UoKTtcblxuICAgICAgICByZXR1cm47XG4gICAgfTtcbiAgICAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cblxuICAgIC8qZHJhZygkZXZlbnQpXG4gICAgICogVGhpcyBmdW5jdGlvbiBhbGxvd3MgdGhlIGJ1dHRvbiB0byBkcmFnIGJ5IGZpbmRpbmcgaXRzIGxvY2F0aW9uIHRoZW4gY2hlY2tzIGl0IGFnYWluc3QgaXRzIG9yaWdpbmFsIGxvY2F0aW9uXG4gICAgICogYW5kIGlmIGl0IGlzIGRpc3RhbmNlIGlzIGdyZWF0ZXIgdGhhbiB0aGUgc2l6ZSBvZiBhIGJhcnBpZWNlIHVwZGF0ZSB0aGUgZ3JhcGhpYyBhbmQgdmFsdWVcbiAgICAgKiBDQyA9IDkqL1xuICAgICRzY29wZS5kcmFnID0gZnVuY3Rpb24gKGV2ZW50KSB7XG5cbiAgICAgICAgLy9ncmFiIHRoZSBtb3VzZSBsb2NhdGlvblxuICAgICAgICB2YXIgeCA9IGV2ZW50LmNsaWVudFg7XG4gICAgICAgIHZhciB5ID0gZXZlbnQuY2xpZW50WTtcbiAgICAgICAgLy9jaGVjayBpZiB0aGUgbW91c2UgaXMgYmVpbmcgaGVsZCBkb3duXG4gICAgICAgIGlmICgkc2NvcGUuaXNNb3VzZURvd24pIHtcbiAgICAgICAgICAgIC8vY2hlY2sgdGhlIG9yaWVudGF0aW9uXG4gICAgICAgICAgICBpZiAoJHNjb3BlLm9yaWVudGF0aW9uKSB7XG4gICAgICAgICAgICAgICAgLy9pZiB0aGlzIGlzIHRoZSBmaXJzdCB0aW1lIHlvdSBjbGlja2VkIGRvd24gZ2V0IHJlYWR5IHRvIG1vdmUgaXRcbiAgICAgICAgICAgICAgICBpZiAoJHNjb3BlLnlDb3JkID09PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgICRzY29wZS55Q29yZCA9IHk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAvL2NoYW5nZSB0aGUgbG9jYXRpb24gb2YgdGhlIHNsaWRlciBhZnRlciBlbm91Z2ggbW92ZW1lbnRcbiAgICAgICAgICAgICAgICAgICAgJHNjb3BlLm5ld1lDb3JkID0geTtcbiAgICAgICAgICAgICAgICAgICAgd2hpbGUgKCgkc2NvcGUubmV3WUNvcmQgLSAkc2NvcGUueUNvcmQpID4gJHNjb3BlLmJhclBpZWNlIC8gMikge1xuICAgICAgICAgICAgICAgICAgICAgICAgJHNjb3BlLnlDb3JkICs9ICRzY29wZS5iYXJQaWVjZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICRzY29wZS5kZWNyZWFzZSgpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHdoaWxlICgoJHNjb3BlLm5ld1lDb3JkIC0gJHNjb3BlLnlDb3JkKSA8IC0oJHNjb3BlLmJhclBpZWNlIC8gMikpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICRzY29wZS55Q29yZCAtPSAkc2NvcGUuYmFyUGllY2U7XG4gICAgICAgICAgICAgICAgICAgICAgICAkc2NvcGUuaW5jcmVhc2UoKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIC8vaWYgdGhpcyBpcyB0aGUgZmlyc3QgdGltZSB5b3UgY2xpY2tlZCBkb3duIGdldCByZWFkeSB0byBtb3ZlIGl0XG4gICAgICAgICAgICAgICAgaWYgKCRzY29wZS54Q29yZCA9PT0gMCkge1xuICAgICAgICAgICAgICAgICAgICAkc2NvcGUueENvcmQgPSB4O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgLy9jaGFuZ2UgdGhlIGxvY2F0aW9uIG9mIHRoZSBzbGlkZXIgYWZ0ZXIgZW5vdWdoIG1vdmVtZW50XG4gICAgICAgICAgICAgICAgICAgICRzY29wZS5uZXdYQ29yZCA9IHg7XG4gICAgICAgICAgICAgICAgICAgIHdoaWxlICgoJHNjb3BlLm5ld1hDb3JkIC0gJHNjb3BlLnhDb3JkKSA+ICRzY29wZS5iYXJQaWVjZSAvIDIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICRzY29wZS54Q29yZCArPSAkc2NvcGUuYmFyUGllY2U7XG4gICAgICAgICAgICAgICAgICAgICAgICAkc2NvcGUuaW5jcmVhc2UoKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB3aGlsZSAoKCRzY29wZS5uZXdYQ29yZCAtICRzY29wZS54Q29yZCkgPCAtKCRzY29wZS5iYXJQaWVjZSAvIDIpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAkc2NvcGUueENvcmQgLT0gJHNjb3BlLmJhclBpZWNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgJHNjb3BlLmRlY3JlYXNlKCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuO1xuICAgIH07XG4gICAgLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG5cbiAgICAvKmRvd24oKVxuICAgICAqIFRoaXMgZnVuY3Rpb24gbG9ncyB3aGVuIHRoZSBtb3VzZSBpcyBkb3duXG4gICAgICogQ0MgPSAxKi9cbiAgICAkc2NvcGUuZG93biA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgJHNjb3BlLm5ld1hDb3JkID0gMDtcbiAgICAgICAgJHNjb3BlLnhDb3JkID0gMDtcbiAgICAgICAgJHNjb3BlLm5ld1lDb3JkID0gMDtcbiAgICAgICAgJHNjb3BlLnlDb3JkID0gMDtcbiAgICAgICAgJHNjb3BlLmlzTW91c2VEb3duID0gMTtcbiAgICAgICAgcmV0dXJuO1xuICAgIH07XG4gICAgLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG5cbiAgICAvKmRvd24oKVxuICAgICAqIFRoaXMgZnVuY3Rpb24gbG9ncyB3aGVuIHRoZSBtb3VzZSBpcyB1cFxuICAgICAqIENDID0gMSovXG4gICAgJHNjb3BlLnVwID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAkc2NvcGUubmV3WENvcmQgPSAwO1xuICAgICAgICAkc2NvcGUueENvcmQgPSAwO1xuICAgICAgICAkc2NvcGUubmV3WUNvcmQgPSAwO1xuICAgICAgICAkc2NvcGUueUNvcmQgPSAwO1xuICAgICAgICAkc2NvcGUuaXNNb3VzZURvd24gPSAwO1xuICAgICAgICByZXR1cm47XG4gICAgfTtcbiAgICAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbn1dKVxuYXBwLmRpcmVjdGl2ZSgnYm9zc3lTbGlkZXInLCBmdW5jdGlvbiAoJGNvbXBpbGUpIHtcbiAgICB2YXIgbXlUZW1wbGF0ZTtcbiAgICByZXR1cm4ge1xuICAgICAgICAvL2FsbG93cyB0aGUgc2xpZGVyIHRvIGJlIGNyZWF0ZWQgYXMgYW5kIGF0dHJpYnV0ZSBvciBlbGVtZW50IDxib3NzeS1zbGlkZXI+PGJvc3N5LXNsaWRlcj5cbiAgICAgICAgcmVzdHJpY3Q6ICdBRScsXG4gICAgICAgIGNvbnRyb2xsZXI6ICdTbGlkZXJDb250cm9sbGVyJyxcbiAgICAgICAgc2NvcGU6IHtcbiAgICAgICAgICAgIG5nTW9kZWw6ICc9J1xuICAgICAgICB9LFxuICAgICAgICAvKmxpbms6IGZ1bmN0aW9uOlxuICAgICAgICAgKiBUaGlzIGFsbG93cyB1cyB0byBwdWxsIGluIHRoZSBzZXR0aW5ncyB0aGUgcHJvZ3JhbW1lciB3YW50cyBmb3IgdGhlIHNsaWRlciBhbmQgc2V0IHRoaW5ncyBjb3JyZWN0bHlcbiAgICAgICAgICogaXQgYWxzbyBpbml0aWFsaXplcyB0aGUgc2xpZGVyIGFuZCBhZGRzIHRoZSBjb3JyZWN0IG9yaWVudGF0aW9uIHRlbXBsYXRlIHRvIHRoZSBET00qL1xuICAgICAgICBsaW5rOiB7XG4gICAgICAgICAgICBwcmU6IGZ1bmN0aW9uIChzY29wZSwgaUVsZW0sIGlBdHRyKSB7XG5cbiAgICAgICAgICAgICAgICAvL2NoZWNrcyB0byBzZWUgaWYgdGhlcmUgaXMgYSBtYXggYXR0cmlidXRlXG4gICAgICAgICAgICAgICAgaWYgKGlBdHRyLm1heCkge1xuICAgICAgICAgICAgICAgICAgICBzY29wZS5tYXggPSBwYXJzZUludChpQXR0ci5tYXgpO1xuICAgICAgICAgICAgICAgICAgICBpZiAoc2NvcGUubWF4ID09PSBOYU4pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNjb3BlLm1heCA9IDEwO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIC8vY2hlY2tzIHRvIHNlZSBpZiB0aGVyZSBpcyBhIG1pbiBhdHRyaWJ1dGVcbiAgICAgICAgICAgICAgICBpZiAoaUF0dHIubWluKSB7XG4gICAgICAgICAgICAgICAgICAgIHNjb3BlLm1pbiA9IHBhcnNlSW50KGlBdHRyLm1pbik7XG4gICAgICAgICAgICAgICAgICAgIGlmIChzY29wZS5taW4gPT09IE5hTikge1xuICAgICAgICAgICAgICAgICAgICAgICAgc2NvcGUubWluID0gMTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAvL2NoZWNrcyBmb3IgYmFyIGNvbG9yIGN1c3RvbWl6YXRpb25cbiAgICAgICAgICAgICAgICBpZiAoaUF0dHIuYmFyZmlsbGNvbG9yKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBwYXR0ZXJuID0gL14jWzAtOWEtZkEtRl17Nn0kLzsgLy9jdXJyZW50bHkgYWNjZXB0cyBsb3dlciBjYXNlIGEtZlxuICAgICAgICAgICAgICAgICAgICBpZiAocGF0dGVybi50ZXN0KGlBdHRyLmJhcmZpbGxjb2xvcikpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNjb3BlLmJhcmZpbGxjb2xvciA9IGlBdHRyLmJhcmZpbGxjb2xvcjtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAvL2NoZWNrcyBmb3IgZW1wdHkgYmFyIGNvbG9yIGN1c3RvbWl6YXRpb25cblxuICAgICAgICAgICAgICAgIGlmIChpQXR0ci5iYXJlbXB0eWNvbG9yKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBwYXR0ZXJuID0gL14jWzAtOWEtZkEtRl17Nn0kLzsgLy9jdXJyZW50bHkgYWNjZXB0cyBsb3dlciBjYXNlIGEtZlxuICAgICAgICAgICAgICAgICAgICBpZiAocGF0dGVybi50ZXN0KGlBdHRyLmJhcmVtcHR5Y29sb3IpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzY29wZS5iYXJlbXB0eWNvbG9yID0gaUF0dHIuYmFyZW1wdHljb2xvcjtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cblxuXG4gICAgICAgICAgICAgICAgaWYgKGlBdHRyLmJ1dHRvbmNvbG9yKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBwYXR0ZXJuID0gL14jWzAtOWEtZkEtRl17Nn0kLzsgLy9jdXJyZW50bHkgYWNjZXB0cyBsb3dlciBjYXNlIGEtZlxuICAgICAgICAgICAgICAgICAgICBpZiAocGF0dGVybi50ZXN0KGlBdHRyLmJ1dHRvbmNvbG9yKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgc2NvcGUuYnV0dG9uY29sb3IgPSBpQXR0ci5idXR0b25jb2xvcjtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAvL2ZpbmQgdGhlIHN0ZXAgc2l6ZSBmb3IgYnV0dG9uIGNsaWNrc1xuICAgICAgICAgICAgICAgIGlmIChpQXR0ci5zdGVwKSB7XG4gICAgICAgICAgICAgICAgICAgIHNjb3BlLnN0ZXAgPSBpQXR0ci5zdGVwO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAvL2ZpbmQgdGhlIHByZWZlcnJlZCB0b3RhbCB3aWR0aCB0byB1c2UgZm9yIHRoZSBzbGlkZXJcbiAgICAgICAgICAgICAgICBpZiAoaUF0dHIud2lkdGgpIHtcbiAgICAgICAgICAgICAgICAgICAgc2NvcGUuYmFyV2lkdGggPSBpQXR0ci53aWR0aDtcbiAgICAgICAgICAgICAgICAgICAgc2NvcGUuYmFyUGllY2UgPSAoc2NvcGUuYmFyV2lkdGggLyAoc2NvcGUubWF4IC0gc2NvcGUubWluKSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBzY29wZS5iYXJQaWVjZSA9IChzY29wZS5iYXJXaWR0aCAvIChzY29wZS5tYXggLSBzY29wZS5taW4pKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgLy9jaGVja3MgdG8gc2VlIGlmIHRoZXJlIGlzIGEgb3JpZW50YXRpb24gYXR0cmlidXRlIGlmIHRoZXJlIGlzIHNldCBvdXIgdGVtcGxhdGUgdG8gdGhlIHZlcnRpY2FsIHRlbXBsYXRlXG4gICAgICAgICAgICAgICAgaWYgKGlBdHRyLm9yaWVudGF0aW9uKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICgndmVydGljYWwnID09PSBpQXR0ci5vcmllbnRhdGlvbikge1xuICAgICAgICAgICAgICAgICAgICAgICAgc2NvcGUub3JpZW50YXRpb24gPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgbXlUZW1wbGF0ZSA9ICc8ZGl2IG9uc2VsZWN0c3RhcnQ9XCJyZXR1cm4gZmFsc2U7XCIgb25kcmFnc3RhcnQ9XCJyZXR1cm4gZmFsc2U7XCJuZy1tb3VzZWxlYXZlPVwidXAoKVwiIG5nLW1vdXNlbW92ZT1cImRyYWcoJGV2ZW50KVwiPicgK1xuICAgICAgICAgICAgICAgICAgICAgICAgJzxkaXYgbmctbW91c2Vtb3ZlPVwiZHJhZygkZXZlbnQpXCIgbmctbW91c2V1cD1cInVwKClcIiBuZy1jbGljaz1cImdyZXlDbGljaygpXCJzdHlsZT1cImN1cnNvcjpwb2ludGVyO21hcmdpbi1sZWZ0OjlweDt3aWR0aDo1cHg7aGVpZ2h0Ont7YmFyUGllY2UgKiBlbXB0V2lkdGh9fXB4O2JhY2tncm91bmQtY29sb3I6JyArIHNjb3BlLmJhcmVtcHR5Y29sb3IgKyAnO21hcmdpbi1ib3R0b206NHB4XCI+PC9kaXY+JyArXG4gICAgICAgICAgICAgICAgICAgICAgICAnPGRpdiBuZy1tb3VzZW1vdmU9XCJkcmFnKCRldmVudClcIiBuZy1tb3VzZWRvd249XCJkb3duKClcIiBuZy1tb3VzZXVwPVwidXAoKVwiIG9yaWVudGF0aW9uPVwidmVydGljYWxcIiBzdHlsZT1cImN1cnNvcjpucy1yZXNpemU7bWFyZ2luLXRvcDotNHB4O21hcmdpbi1sZWZ0OjVweDt3aWR0aDoxNXB4O2hlaWdodDoxNXB4O2JhY2tncm91bmQtY29sb3I6JyArIHNjb3BlLmJ1dHRvbmNvbG9yICsgJztib3JkZXItcmFkaXVzOjUwJTtcIj48L2Rpdj4nICtcbiAgICAgICAgICAgICAgICAgICAgICAgICc8ZGl2IG5nLW1vdXNlbW92ZT1cImRyYWcoJGV2ZW50KVwiIG5nLW1vdXNldXA9XCJ1cCgpXCIgbmctY2xpY2s9XCJiYXJDbGljaygpXCJzdHlsZT1cImN1cnNvcjpwb2ludGVyO21hcmdpbi1sZWZ0OjlweDt3aWR0aDo1cHg7aGVpZ2h0Ont7YmFyUGllY2UgKiBmaWxsV2lkdGh9fXB4O2JhY2tncm91bmQtY29sb3I6JyArIHNjb3BlLmJhcmZpbGxjb2xvciArICc7bWFyZ2luLWJvdHRvbTo0cHhcIj48L2Rpdj4nICtcbiAgICAgICAgICAgICAgICAgICAgICAgICc8L2Rpdj4nO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgbXlUZW1wbGF0ZSA9ICc8ZGl2IG9uc2VsZWN0c3RhcnQ9XCJyZXR1cm4gZmFsc2U7XCIgb25kcmFnc3RhcnQ9XCJyZXR1cm4gZmFsc2U7XCIgbmctbW91c2VsZWF2ZT1cInVwKClcIm5nLW1vdXNlbW92ZT1cImRyYWcoJGV2ZW50KVwiPicgK1xuICAgICAgICAgICAgICAgICAgICAgICAgJzxkaXYgbmctbW91c2Vtb3ZlPVwiZHJhZygkZXZlbnQpXCIgbmctbW91c2V1cD1cInVwKClcIiBuZy1jbGljaz1cImJhckNsaWNrKClcInN0eWxlPVwiY3Vyc29yOnBvaW50ZXI7ZGlzcGxheTppbmxpbmUtYmxvY2s7d2lkdGg6e3tiYXJQaWVjZSAqIGZpbGxXaWR0aH19cHg7aGVpZ2h0OjVweDtiYWNrZ3JvdW5kLWNvbG9yOicgKyBzY29wZS5iYXJmaWxsY29sb3IgKyAnO21hcmdpbi1ib3R0b206NHB4XCI+PC9kaXY+JyArXG4gICAgICAgICAgICAgICAgICAgICAgICAnPGRpdiBuZy1tb3VzZW1vdmU9XCJkcmFnKCRldmVudClcIiBuZy1tb3VzZWRvd249XCJkb3duKClcIiBuZy1tb3VzZXVwPVwidXAoKVwiIG9yaWVudGF0aW9uPVwiaG9yaXpvbnRhbFwiIHN0eWxlPVwiY3Vyc29yOmV3LXJlc2l6ZTtkaXNwbGF5OmlubGluZS1ibG9jazt3aWR0aDp7e2J1dFNpemV9fXB4O2hlaWdodDp7e2J1dFNpemV9fXB4O2JhY2tncm91bmQtY29sb3I6JyArIHNjb3BlLmJ1dHRvbmNvbG9yICsgJztib3JkZXItcmFkaXVzOjUwJTtcIj48L2Rpdj4nICtcbiAgICAgICAgICAgICAgICAgICAgICAgICc8ZGl2IG5nLW1vdXNlbW92ZT1cImRyYWcoJGV2ZW50KVwiIG5nLW1vdXNldXA9XCJ1cCgpXCIgbmctY2xpY2s9XCJncmV5Q2xpY2soKVwic3R5bGU9XCJjdXJzb3I6cG9pbnRlcjtkaXNwbGF5OmlubGluZS1ibG9jazt3aWR0aDp7e2JhclBpZWNlICogZW1wdFdpZHRofX1weDtoZWlnaHQ6NXB4O2JhY2tncm91bmQtY29sb3I6JyArIHNjb3BlLmJhcmVtcHR5Y29sb3IgKyAnO21hcmdpbi1ib3R0b206NHB4XCI+PC9kaXY+JyArXG4gICAgICAgICAgICAgICAgICAgICAgICAnPC9kaXY+JztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgLy90aGlzIGJ1aWxkcyBvdXIgaG9yaXpvbnRhbCB0ZW1wbGF0ZVxuICAgICAgICAgICAgICAgICAgICBteVRlbXBsYXRlID0gJzxkaXYgb25zZWxlY3RzdGFydD1cInJldHVybiBmYWxzZTtcIiBvbmRyYWdzdGFydD1cInJldHVybiBmYWxzZTtcIiBuZy1tb3VzZWxlYXZlPVwidXAoKVwibmctbW91c2Vtb3ZlPVwiZHJhZygkZXZlbnQpXCI+JyArXG4gICAgICAgICAgICAgICAgICAgICc8ZGl2IG5nLW1vdXNlbW92ZT1cImRyYWcoJGV2ZW50KVwiIG5nLW1vdXNldXA9XCJ1cCgpXCIgbmctY2xpY2s9XCJiYXJDbGljaygpXCJzdHlsZT1cImN1cnNvcjpwb2ludGVyO2Rpc3BsYXk6aW5saW5lLWJsb2NrO3dpZHRoOnt7YmFyUGllY2UgKiBmaWxsV2lkdGh9fXB4O2hlaWdodDo1cHg7YmFja2dyb3VuZC1jb2xvcjonICsgc2NvcGUuYmFyZmlsbGNvbG9yICsgJzttYXJnaW4tYm90dG9tOjRweFwiPjwvZGl2PicgK1xuICAgICAgICAgICAgICAgICAgICAnPGRpdiBuZy1tb3VzZW1vdmU9XCJkcmFnKCRldmVudClcIiBuZy1tb3VzZWRvd249XCJkb3duKClcIiBuZy1tb3VzZXVwPVwidXAoKVwiIG9yaWVudGF0aW9uPVwiaG9yaXpvbnRhbFwiIHN0eWxlPVwiY3Vyc29yOmV3LXJlc2l6ZTtkaXNwbGF5OmlubGluZS1ibG9jazt3aWR0aDp7e2J1dFNpemV9fXB4O2hlaWdodDp7e2J1dFNpemV9fXB4O2JhY2tncm91bmQtY29sb3I6JyArIHNjb3BlLmJ1dHRvbmNvbG9yICsgJztib3JkZXItcmFkaXVzOjUwJTtcIj48L2Rpdj4nICtcbiAgICAgICAgICAgICAgICAgICAgJzxkaXYgbmctbW91c2Vtb3ZlPVwiZHJhZygkZXZlbnQpXCIgbmctbW91c2V1cD1cInVwKClcIiBuZy1jbGljaz1cImdyZXlDbGljaygpXCJzdHlsZT1cImN1cnNvcjpwb2ludGVyO2Rpc3BsYXk6aW5saW5lLWJsb2NrO3dpZHRoOnt7YmFyUGllY2UgKiBlbXB0V2lkdGh9fXB4O2hlaWdodDo1cHg7YmFja2dyb3VuZC1jb2xvcjonICsgc2NvcGUuYmFyZW1wdHljb2xvciArICc7bWFyZ2luLWJvdHRvbTo0cHhcIj48L2Rpdj4nICtcbiAgICAgICAgICAgICAgICAgICAgJzwvZGl2Pic7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIC8vV2Ugc2hvdyBvdXIgdGVtcGxhdGUgYW5kIHRoZW4gY29tcGlsZSBpdCBzbyB0aGUgRE9NIGtub3dzIGFib3V0IG91ciBuZyBmdW5jdGlvbnNcbiAgICAgICAgICAgICAgICBpRWxlbS5odG1sKG15VGVtcGxhdGUpO1xuICAgICAgICAgICAgICAgICRjb21waWxlKGlFbGVtLmNvbnRlbnRzKCkpKHNjb3BlKTtcbiAgICAgICAgICAgICAgICAvL2NyZWF0ZSB0aGUgaW5pdGlhbCBiYXJcbiAgICAgICAgICAgICAgICBzY29wZS5tYWtlQmFyKCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxufSk7XG5cbiIsImFuZ3VsYXIubW9kdWxlKCdib3NzeS50b29sdGlwJywgW10pXG4gICAgLmRpcmVjdGl2ZSgnYm9zc3lUb29sdGlwJywgZnVuY3Rpb24oKSB7XG4gICAgXG4gICAgICAgIC8vIFByaXZhdGUgbWVtYmVyIGFycmF5IGNvbnRhaW5pbmcgYWxsIGtub3duIHBvc2l0aW9uc1xuICAgICAgICBfcG9zID0gWyduJywnbmUnLCdlJywnc2UnLCdzJywnc3cnLCd3JywnbncnXTtcbiAgICAgICAgXG4gICAgICAgIC8vIE1vdmUgdGhlIHRpcCB0byBhIGNlcnRhaW4gcG9zaXRpb25cbiAgICAgICAgZnVuY3Rpb24gX21vdmVUaXAoJHBhcmVudCwgJHRpcCwgY3VyUG9zKVxuICAgICAgICB7XG4gICAgICAgICAgICBpZihjdXJQb3MgPT0gJ24nKVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICR0aXAuc3R5bGUubGVmdCA9ICRwYXJlbnQub2Zmc2V0TGVmdCArICgkcGFyZW50Lm9mZnNldFdpZHRoIC8gMikgLSAoJHRpcC5vZmZzZXRXaWR0aCAvIDIpICsgJ3B4JztcbiAgICAgICAgICAgICAgICAkdGlwLnN0eWxlLnRvcCA9ICRwYXJlbnQub2Zmc2V0VG9wIC0gJHRpcC5vZmZzZXRIZWlnaHQgKyAncHgnO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZihjdXJQb3MgPT0gJ25lJylcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAkdGlwLnN0eWxlLmxlZnQgPSAkcGFyZW50Lm9mZnNldExlZnQgKyAkcGFyZW50Lm9mZnNldFdpZHRoICsgJ3B4JztcbiAgICAgICAgICAgICAgICAkdGlwLnN0eWxlLnRvcCA9ICRwYXJlbnQub2Zmc2V0VG9wIC0gJHRpcC5vZmZzZXRIZWlnaHQgKyAncHgnO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZihjdXJQb3MgPT0gJ2UnKVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICR0aXAuc3R5bGUubGVmdCA9ICRwYXJlbnQub2Zmc2V0TGVmdCArICRwYXJlbnQub2Zmc2V0V2lkdGggKyAncHgnO1xuICAgICAgICAgICAgICAgICR0aXAuc3R5bGUudG9wID0gJHBhcmVudC5vZmZzZXRUb3AgKyAoJHBhcmVudC5vZmZzZXRIZWlnaHQgLyAyKSAtICgkdGlwLm9mZnNldEhlaWdodCAvIDIpICsgJ3B4JztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYoY3VyUG9zID09ICdzZScpXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgJHRpcC5zdHlsZS5sZWZ0ID0gJHBhcmVudC5vZmZzZXRMZWZ0ICsgJHBhcmVudC5vZmZzZXRXaWR0aCArICdweCc7XG4gICAgICAgICAgICAgICAgJHRpcC5zdHlsZS50b3AgPSAkcGFyZW50Lm9mZnNldFRvcCArICRwYXJlbnQub2Zmc2V0SGVpZ2h0ICsgJ3B4JztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYoY3VyUG9zID09ICdzJylcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAkdGlwLnN0eWxlLmxlZnQgPSAkcGFyZW50Lm9mZnNldExlZnQgKyAoJHBhcmVudC5vZmZzZXRXaWR0aCAvIDIpIC0gKCR0aXAub2Zmc2V0V2lkdGggLyAyKSArICdweCc7XG4gICAgICAgICAgICAgICAgJHRpcC5zdHlsZS50b3AgPSAkcGFyZW50Lm9mZnNldFRvcCArICRwYXJlbnQub2Zmc2V0SGVpZ2h0ICsgJ3B4JztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYoY3VyUG9zID09ICdzdycpXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgJHRpcC5zdHlsZS5sZWZ0ID0gJHBhcmVudC5vZmZzZXRMZWZ0IC0gJHRpcC5vZmZzZXRXaWR0aCArICdweCc7XG4gICAgICAgICAgICAgICAgJHRpcC5zdHlsZS50b3AgPSAkcGFyZW50Lm9mZnNldFRvcCArICRwYXJlbnQub2Zmc2V0SGVpZ2h0ICsgJ3B4JztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYoY3VyUG9zID09ICd3JylcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAkdGlwLnN0eWxlLmxlZnQgPSAkcGFyZW50Lm9mZnNldExlZnQgLSAkdGlwLm9mZnNldFdpZHRoICsgJ3B4JztcbiAgICAgICAgICAgICAgICAkdGlwLnN0eWxlLnRvcCA9ICRwYXJlbnQub2Zmc2V0VG9wICsgKCRwYXJlbnQub2Zmc2V0SGVpZ2h0IC8gMikgLSAoJHRpcC5vZmZzZXRIZWlnaHQgLyAyKSArICdweCc7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgJHRpcC5zdHlsZS5sZWZ0ID0gJHBhcmVudC5vZmZzZXRMZWZ0IC0gJHRpcC5vZmZzZXRXaWR0aCArICdweCc7XG4gICAgICAgICAgICAgICAgJHRpcC5zdHlsZS50b3AgPSAkcGFyZW50Lm9mZnNldFRvcCAtICR0aXAub2Zmc2V0SGVpZ2h0ICsgJ3B4JztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgLy8gQ2hlY2sgdG8gc2VlIGlmIHRoZSB0aXAgaXMgd2l0aGluIHRoZSB3aW5kb3dcbiAgICAgICAgZnVuY3Rpb24gX2NoZWNrUG9zKCR0aXApXG4gICAgICAgIHtcbiAgICAgICAgICAgIHZhciByZWN0ID0gJHRpcC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICByZWN0LnRvcCA+PSAwICYmXG4gICAgICAgICAgICAgICAgcmVjdC5sZWZ0ID49IDAgJiZcbiAgICAgICAgICAgICAgICByZWN0LmJvdHRvbSA8PSAod2luZG93LmlubmVySGVpZ2h0IHx8IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGllbnRIZWlnaHQpICYmXG4gICAgICAgICAgICAgICAgcmVjdC5yaWdodCA8PSAod2luZG93LmlubmVyV2lkdGggfHwgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsaWVudFdpZHRoKVxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICByZXN0cmljdDogJ0UnLFxuICAgICAgICAgICAgc2NvcGU6IHtcbiAgICAgICAgICAgICAgICBjb25maWc6IFwiPVwiXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgcmVwbGFjZTogdHJ1ZSxcbiAgICAgICAgICAgIGxpbms6IGZ1bmN0aW9uKHNjb3BlLCBlbGVtZW50LCBhdHRycykge1xuICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgLy8gSWYgdGhlIHVzZXIgZG9lc24ndCBwcm92aWRlIGVzc2VudGlhbCBpbmZvcm1hdGlvbiwgZXJyb3Igb3V0XG4gICAgICAgICAgICAgICAgaWYoIXNjb3BlLmNvbmZpZy50aXRsZSB8fCAhc2NvcGUuY29uZmlnLmJvZHkpXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKFwiRXJyb3I6IE5vIHRpdGxlIG9yIGJvZHkgaW5mb3JtYXRpb24gcHJvdmlkZWQuXCIpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gMTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgLy8gSWYgdGhlIHVzZXIgZG9lc24ndCBwcm92aWRlIGEgcG9zaXRpb24sIGRlZmF1bHQgJ25vcnRoJ1xuICAgICAgICAgICAgICAgIGlmKCFzY29wZS5jb25maWcucG9zaXRpb24gfHwgdHlwZW9mIHNjb3BlLmNvbmZpZy5wb3NpdGlvbiAhPT0gJ3N0cmluZycgfHwgX3Bvcy5pbmRleE9mKHNjb3BlLmNvbmZpZy5wb3NpdGlvbikgPCAwKVxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgc2NvcGUuY29uZmlnLnBvc2l0aW9uID0gJ24nO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAvLyBDcmVhdGUgdGlwIGVsZW1lbnRcbiAgICAgICAgICAgICAgICB2YXIgJHRpcCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIC8vIEFwcGVuZCB0byBET01cbiAgICAgICAgICAgICAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKCR0aXApO1xuICAgICAgICAgICAgICAgICR0aXAuc3R5bGUucG9zaXRpb24gPSAnYWJzb2x1dGUnO1xuICAgICAgICAgICAgICAgICR0aXAuaW5uZXJIVE1MID0gJzxzcGFuPicrIHNjb3BlLmNvbmZpZy50aXRsZSArJzwvc3Bhbj48ZGl2PicrIHNjb3BlLmNvbmZpZy5ib2R5ICsnPC9kaXY+JztcbiAgICAgICAgICAgICAgICAkdGlwLmNsYXNzTmFtZSA9ICdib3NzeVRvb2x0aXAnO1xuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIC8vIERpc2FibGUgYnJvd3NlcidzIHRvb2x0aXBcbiAgICAgICAgICAgICAgICBlbGVtZW50WzBdLnRpdGxlID0gJyc7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coZWxlbWVudCk7XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgdmFyIGkgPSAwO1xuICAgICAgICAgICAgICAgIGRvXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBsb2NrZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICBfbW92ZVRpcChlbGVtZW50WzBdLCAkdGlwLCBzY29wZS5jb25maWcucG9zaXRpb24pO1xuICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgLy8gQ29udGludWUgdG8gbG9vcCBpZiAkdGlwIGlzIGNsaXBwZWRcbiAgICAgICAgICAgICAgICAgICAgaWYoIV9jaGVja1BvcygkdGlwKSlcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgbG9ja2VkID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIFdyYXAgYXJvdW5kIGFycmF5IGlmIHRoZSBlbmQgaXMgaGl0XG4gICAgICAgICAgICAgICAgICAgICAgICBpZihzY29wZS5jb25maWcucG9zaXRpb24gPT0gJ253JylcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzY29wZS5jb25maWcucG9zaXRpb24gPSAnbic7XG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2NvcGUuY29uZmlnLnBvc2l0aW9uID0gX3Bvc1tfcG9zLmluZGV4T2Yoc2NvcGUuY29uZmlnLnBvc2l0aW9uKSArIDFdO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICBpZihpID09IDgpXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICsraTtcbiAgICAgICAgICAgICAgICB9IHdoaWxlKGxvY2tlZCA9PSBmYWxzZSk7XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgLy8gSGlkZSBpdCB1bnRpbCBtb3VzZSBldmVudFxuICAgICAgICAgICAgICAgICR0aXAuc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAvLyBNb3VzZSBldmVudHNcbiAgICAgICAgICAgICAgICBlbGVtZW50Lm9uKCdtb3VzZWVudGVyJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgICR0aXAuc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAub24oJ21vdXNlbGVhdmUnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgJHRpcC5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgfSk7Il0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9