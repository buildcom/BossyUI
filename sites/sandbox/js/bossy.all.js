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
        'bossy.combobox.multiselect',
        'bossy.numerictextbox',
        'bossy.schema',
        'bossy.tooltip',
        'bossy.toast'
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


angular.module('bossy.toast', ['ngAnimate'])

  .controller('ToasterController', ['$scope', '$interval', '$timeout', function($scope, $interval, $timeout)
  {
    /**
     *  Toast is a constructor for toast objects
     * 
     * @param {String} message        [text that goes within the message]
     * @param {Integer} timeout       [time in milliseconds till timeout]
     * @param {CSS} background        [background color]
     * @param {CSS} color             [text color]
     * @param {CSS} height            [toast height]
     * @param {CSS} width             [toast width]
     * @param {CSS} margin            [toast margins]
     * @param {CSS} padding           [toast padding]
     * @param {CSS} border_radius     [toast border-radius]
     */
    function Toast(message, timeout, background, color, height, width, margin, padding, border_radius){
      this.message = message;
      this.timeout = timeout;
      this.background = background || "#333"; //default background is dark gray
      this.color = color || "#FFF"; //default text color is white
      this.height = height || "30px"; //default height is 30px
      this.width = width || ""; //default width is content specific
      this.margin = margin || "5px 0px"; //default margins are only for top and bottom
      this.padding = padding || "5px 5px";//default padding on all edges
      this.border_radius = border_radius || "0px";//default to square edges
    }

    /** universal members **/
    $scope.toasts = []; //toasts is a stack of toasts made by the user

    /**
     *  compareTimeouts is used to sort the list of toasts by the expiration
     * 
     * @param  {Toast} a [Toast object one]
     * @param  {Toast} b [Toast object two]
     * @return {1, 0, -1}   [true, equal, false]
     */
    function compareTimeouts(a,b) {
      if (a.timeout < b.timeout)
         return -1;
      if (a.timeout > b.timeout)
        return 1;
      return 0;
    }

    /**
     * checkTimer is responsible for returning a true or false depending on if the timer
     * has a value of greater than 0
     * 
     * @param  {Toast} toast [toast to check the timer of]
     * @return {Boolean}       [True if timer is less than 0, false otherwise]
     */
    function checkTimer(toast){
      if(toast.timeout > 0)
        return false;
      return true;
    }

     /**
     * timeToast is responsible for isolating the scope of each individual toast and 
     * setting up a timer with $interval that removes 200 miliseconds from the timer
     * for each interval of 200 miliseconds until the timeout reaches 0.
     * 
     * @param  {Toast} toast [toast to time for removal]
     */
    function timeToast(toast){
      subtract = $interval(function(){toast.timeout = toast.timeout - 200;}, 200, toast.timeout/200);
      result = $interval(function(){if(checkTimer(toast)){$scope.toasts.splice(0, 1); delete toast;}}, 200, toast.timeout/200)
    }

    /**
     * bossyToast requires a message and timeout to create a new Toast object 
     * which is then added to the stack of toasts
     * 
     * @param  {String} message [Message to toast]
     * @param  {Int} timeout [Time in ms to display toast]
     */
    $scope.bossyToast = function(message, timeout){
      //console.log("Beginning Toast"); // verifies function was called correctly
      new_toast = new Toast(message, timeout);
      //console.log(new_toast); // shows the details of the newly created toast message
      $scope.toasts.push(new_toast); // adds the toast to the toastlist
      $scope.toasts.sort(compareTimeouts); // first toast to expire is at the bottom
      //console.log($scope.toasts);  // shows the toasts list before toast is removed
      // always removes the lowest time remaining item
      timeToast(new_toast);
      // outputs at the moment the toast is removed from the toastlist
      //$timeout(function(){console.log("Ending Toast")}, new_toast.timeout); 
    };
  }])
  .directive('toast', [function () {
    return {
      restrict: 'AE',
      scope: {
        toast: '=config'
      },
      template: '{{toast.message}} {{toast.timeout}}'
    };
  }])
  .directive('toaster', [function () {
    return {
      restrict: 'AE',
      scope: {
        toasts: '=config'
      },
      controller: 'ToasterController',
      template: '<style>.bossy-toaster {box-sizing: border-box; position: relative; bottom: 50px; margin: 0 auto;width: 300px;display: block;}.bossy-toast { box-sizing: border-box; position: relative; height: 30px; padding: 6px 10px; margin: 5px 0px; background: #222; color: #FFF;display: block;transition: all .3s ease-out;text-align: center;border-radius: 15px;}.bossy-toast.ng-enter.enter-active, .bossy-toast.ng-leave { transform: scale(1); }.bossy-toast.ng-leave.ng-leave-active, .bossy-toast.ng-enter { transform: scale(0); } </style><h1>Toast Test</h1>Toast Message<input ng-model="toastMessage">Toast Timer (ms)<input type="number" ng-model="toastTime"><button ng-click="bossyToast(toastMessage, toastTime)">Click for toast</button><div class="bossy-toaster"><toast ng-repeat="toast in oasts" config="toast" class="bossy-toast"></toast></div>'
    };
  }]);


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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImJvc3N5LmpzIiwiYm9zc3kuY2FsZW5kYXIuanMiLCJib3NzeS5jb21ib2JveC5jYXNjYWRpbmdEcm9wZG93bi5qcyIsImJvc3N5LmNvbWJvYm94LmNoZWNrYm94TXVsdGlzZWxlY3QuanMiLCJib3NzeS5jb21ib2JveC5tdWx0aXNlbGVjdC5qcyIsImJvc3N5LmRhdGEuanMiLCJib3NzeS5kcm9wZG93bi5qcyIsImJvc3N5LmVkaXRhYmxlLmpzIiwiYm9zc3kuZm9ybS5qcyIsImJvc3N5LmlucHV0LmpzIiwiYm9zc3kubnVtZXJpY3RleHRib3guanMiLCJib3NzeS5zY2hlbWEuanMiLCJib3NzeS5zbGlkZXIuanMiLCJib3NzeS50b2FzdC5qcyIsImJvc3N5LnRvb2x0aXAuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUMzQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUM1SkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUN4QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUM1R0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ2pKQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUMzREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDN0VBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ2xJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNqQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3hGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQzFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDalZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNoSEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiYm9zc3kuYWxsLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyohXG4gKiBib3NzeS5qc1xuICovXG5cbi8qIVxuICogaHR0cDovL0Jvc3N5VUkuY29tL1xuICpcbiAqIEJvc3N5VUkgLSBDcmVhdGVkIHdpdGggTE9WRSBieSBCdWlsZC5jb20gT3BlbiBTb3VyY2UgQ29uc29ydGl1bVxuICpcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZS4gUGxlYXNlIHNlZSBMSUNFTlNFIGZvciBtb3JlIGluZm9ybWF0aW9uLlxuICpcbiovXG5cbi8vVE9ETzogbmVlZCBsYXlvdXQsIGxhYmVsc1xudmFyIGJvc3N5ID0gYW5ndWxhci5tb2R1bGUoJ2Jvc3N5JywgW1xuICAgICAgICAnYm9zc3kuY2FsZW5kYXInLFxuICAgICAgICAnYm9zc3kuZGF0YScsXG4gICAgICAgICdib3NzeS5kcm9wZG93bicsXG4gICAgICAgICdib3NzeS5mb3JtJyxcbiAgICAgICAgJ2Jvc3N5LmlucHV0JyxcbiAgICAgICAgJ2Jvc3N5LmNvbWJvYm94Lm11bHRpc2VsZWN0JyxcbiAgICAgICAgJ2Jvc3N5Lm51bWVyaWN0ZXh0Ym94JyxcbiAgICAgICAgJ2Jvc3N5LnNjaGVtYScsXG4gICAgICAgICdib3NzeS50b29sdGlwJyxcbiAgICAgICAgJ2Jvc3N5LnRvYXN0J1xuICAgIF1cbik7XG4iLCJhbmd1bGFyLm1vZHVsZSgnYm9zc3kuY2FsZW5kYXInLCBbXSlcblx0LmNvbnRyb2xsZXIoJ0NhbGVuZGFyQ29udHJvbGxlcicsIFsnJHNjb3BlJywgZnVuY3Rpb24gKCRzY29wZSkge1xuXG5cdFx0dmFyIF9tb250aE1hcHMgPSB7fSxcblx0XHRcdG9wdGlvbnMgPSB7fSxcblx0XHRcdGRlZmF1bHRzID0ge1xuXHRcdFx0fSxcblx0XHRcdHVuaXZlcnNhbCA9IHtcblx0XHRcdFx0REFZOiAyNCAqIDYwICogNjAgKiAxMDAwLFxuXHRcdFx0XHRIT1VSOiA2MCAqIDYwICogMTAwMFxuXHRcdFx0fTtcblxuXHRcdCRzY29wZS5kYXlzID0gW1xuXHRcdFx0J1N1bmRheScsXG5cdFx0XHQnTW9uZGF5Jyxcblx0XHRcdCdUdWVzZGF5Jyxcblx0XHRcdCdXZWRuZXNkYXknLFxuXHRcdFx0J1RodXJzZGF5Jyxcblx0XHRcdCdGcmlkYXknLFxuXHRcdFx0J1NhdHVyZGF5J1xuXHRcdF07XG5cdFx0JHNjb3BlLm1vbnRocyA9IFtcblx0XHRcdCdKYW51YXJ5Jyxcblx0XHRcdCdGZWJydWFyeScsXG5cdFx0XHQnTWFyY2gnLFxuXHRcdFx0J0FwcmlsJyxcblx0XHRcdCdNYXknLFxuXHRcdFx0J0p1bmUnLFxuXHRcdFx0J0p1bHknLFxuXHRcdFx0J0F1Z3VzdCcsXG5cdFx0XHQnU2VwdGVtYmVyJyxcblx0XHRcdCdPY3RvYmVyJyxcblx0XHRcdCdOb3ZlbWJlcicsXG5cdFx0XHQnRGVjZW1iZXInXG5cdFx0XTtcblxuXHRcdGZ1bmN0aW9uIGdldFN0YW5kYXJkVGltZShkYXRlKSB7XG5cdFx0XHRyZXR1cm4ge1xuXHRcdFx0XHRyYXc6IGRhdGUsXG5cdFx0XHRcdHllYXI6IGRhdGUuZ2V0RnVsbFllYXIoKSxcblx0XHRcdFx0bW9udGhOYW1lOiBfZ2V0TW9udGhOYW1lKGRhdGUuZ2V0TW9udGgoKSksXG5cdFx0XHRcdG1vbnRoOiBkYXRlLmdldE1vbnRoKCksXG5cdFx0XHRcdGRheTogX2dldERheU5hbWUoZGF0ZSksXG5cdFx0XHRcdGRhdGU6IGRhdGUuZ2V0RGF0ZSgpLFxuXHRcdFx0XHR0aW1lOiBkYXRlLmdldFRpbWUoKVxuXHRcdFx0fTtcblx0XHR9XG5cblx0XHRmdW5jdGlvbiBfZ2V0VGltZU9iamVjdElmRGF0ZShkYXRlKSB7XG5cdFx0XHRpZiAoYW5ndWxhci5pc0RhdGUobmV3IERhdGUoZGF0ZSkpKSB7XG5cdFx0XHRcdHJldHVybiBnZXRTdGFuZGFyZFRpbWUobmV3IERhdGUoZGF0ZSkpO1xuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdH1cblxuXHRcdGZ1bmN0aW9uIHNldENvbmZpZ09wdGlvbnMoKSB7XG5cdFx0XHQkc2NvcGUuY29uZmlnLnN0YXJ0ID0gX2dldFRpbWVPYmplY3RJZkRhdGUoJHNjb3BlLmNvbmZpZy5zdGFydCk7XG5cdFx0XHQkc2NvcGUuY29uZmlnLmVuZCA9IF9nZXRUaW1lT2JqZWN0SWZEYXRlKCRzY29wZS5jb25maWcuZW5kKTtcblx0XHRcdG9wdGlvbnMgPSBhbmd1bGFyLmV4dGVuZCh7fSwgZGVmYXVsdHMsICRzY29wZS5jb25maWcpO1xuXHRcdH1cblxuXHRcdGZ1bmN0aW9uIF9kYXlJc091dE9mUmFuZ2UoX2RhdGUpIHtcblx0XHRcdGlmIChvcHRpb25zLnN0YXJ0ICYmIG9wdGlvbnMuZW5kICYmIChfZGF0ZS50aW1lIDwgb3B0aW9ucy5zdGFydC50aW1lIHx8IF9kYXRlLnRpbWUgPiBvcHRpb25zLmVuZC50aW1lKSkge1xuXHRcdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHRcdH0gZWxzZSBpZiAob3B0aW9ucy5zdGFydCAmJiBfZGF0ZS50aW1lIDwgb3B0aW9ucy5zdGFydC50aW1lKSB7XG5cdFx0XHRcdHJldHVybiB0cnVlO1xuXHRcdFx0fSBlbHNlIGlmIChvcHRpb25zLmVuZCAmJiBfZGF0ZS50aW1lID4gb3B0aW9ucy5lbmQudGltZSkge1xuXHRcdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHRmdW5jdGlvbiBfc2V0U2VsZWN0ZWREYXRlKGRhdGUpIHtcblx0XHRcdCRzY29wZS5zZWxlY3RlZCA9IGdldFN0YW5kYXJkVGltZShkYXRlKTtcblx0XHRcdCRzY29wZS5uZ01vZGVsID0gJHNjb3BlLnNlbGVjdGVkLnJhdztcblx0XHR9XG5cblx0XHRmdW5jdGlvbiBfc2V0Q3VycmVudE1vbnRoQW5kWWVhcihtb250aCwgeWVhcikge1xuXHRcdFx0dmFyIGRhdGUgPSBuZXcgRGF0ZSh5ZWFyICE9PSB1bmRlZmluZWQgPyB5ZWFyIDogJHNjb3BlLnNlbGVjdGVkLnllYXIsIG1vbnRoICE9PSB1bmRlZmluZWQgPyBtb250aCA6ICRzY29wZS5zZWxlY3RlZC5tb250aCwgMSk7XG5cdFx0XHQkc2NvcGUuY3VycmVudCA9IGdldFN0YW5kYXJkVGltZShkYXRlKTtcblx0XHR9XG5cblx0XHRmdW5jdGlvbiBfZ2V0TW9udGhOYW1lKG1vbnRoKSB7XG5cdFx0XHRyZXR1cm4gJHNjb3BlLm1vbnRoc1ttb250aF07XG5cdFx0fVxuXG5cdFx0ZnVuY3Rpb24gX2dldERheU5hbWUoZGF0ZSkge1xuXHRcdFx0cmV0dXJuICRzY29wZS5kYXlzW2RhdGUuZ2V0RGF5KCldO1xuXHRcdH1cblxuXHRcdCRzY29wZS5wcmV2aW91c01vbnRoID0gZnVuY3Rpb24oKSB7XG5cdFx0XHR2YXIgZGF0ZSA9IG5ldyBEYXRlKCRzY29wZS5jdXJyZW50LnllYXIsICgkc2NvcGUuY3VycmVudC5tb250aCAtIDEpLCAxKTtcblx0XHRcdF9zZXRDdXJyZW50TW9udGhBbmRZZWFyKGRhdGUuZ2V0TW9udGgoKSwgZGF0ZS5nZXRGdWxsWWVhcigpKTtcblx0XHRcdCRzY29wZS51cGRhdGVEYXRlTWFwKCk7XG5cdFx0fTtcblxuXHRcdCRzY29wZS5uZXh0TW9udGggPSBmdW5jdGlvbigpIHtcblx0XHRcdHZhciBkYXRlID0gbmV3IERhdGUoJHNjb3BlLmN1cnJlbnQueWVhciwgKCRzY29wZS5jdXJyZW50Lm1vbnRoICsgMSksIDEpO1xuXHRcdFx0X3NldEN1cnJlbnRNb250aEFuZFllYXIoZGF0ZS5nZXRNb250aCgpLCBkYXRlLmdldEZ1bGxZZWFyKCkpO1xuXHRcdFx0JHNjb3BlLnVwZGF0ZURhdGVNYXAoKTtcblx0XHR9O1xuXG5cdFx0JHNjb3BlLnNlbGVjdERhdGUgPSBmdW5jdGlvbih0aW1lKSB7XG5cdFx0XHR2YXIgZGF0ZSA9IGdldFN0YW5kYXJkVGltZShuZXcgRGF0ZSh0aW1lKSk7XG5cdFx0XHRpZiAoX2RheUlzT3V0T2ZSYW5nZShkYXRlKSkge1xuXHRcdFx0XHRyZXR1cm47XG5cdFx0XHR9XG5cdFx0XHRpZiAoZGF0ZS5tb250aCAhPT0gJHNjb3BlLmN1cnJlbnQubW9udGgpIHtcblx0XHRcdFx0X3NldEN1cnJlbnRNb250aEFuZFllYXIoZGF0ZS5tb250aCwgZGF0ZS55ZWFyKTtcblx0XHRcdFx0JHNjb3BlLnVwZGF0ZURhdGVNYXAoKTtcblx0XHRcdH1cblx0XHRcdF9zZXRTZWxlY3RlZERhdGUobmV3IERhdGUodGltZSkpO1xuXHRcdH07XG5cblx0XHQkc2NvcGUudXBkYXRlRGF0ZU1hcCA9IGZ1bmN0aW9uKCkge1xuXHRcdFx0dmFyIGZpcnN0V2Vla0RheSA9IG5ldyBEYXRlKCRzY29wZS5jdXJyZW50LnRpbWUgLSAoJHNjb3BlLmN1cnJlbnQucmF3LmdldERheSgpICogdW5pdmVyc2FsLkRBWSkpLFxuXHRcdFx0XHRpc01vbnRoQ29tcGxldGUgPSBmYWxzZTtcblx0XHRcdFx0JHNjb3BlLmRhdGVNYXAgPSBbXTtcblxuXHRcdFx0d2hpbGUgKCFpc01vbnRoQ29tcGxldGUpIHtcblx0XHRcdFx0dmFyIHdlZWsgPSBbXTtcblx0XHRcdFx0aWYgKCRzY29wZS5kYXRlTWFwLmxlbmd0aCA9PT0gNSkge1xuXHRcdFx0XHRcdGlzTW9udGhDb21wbGV0ZSA9IHRydWU7XG5cdFx0XHRcdH1cblx0XHRcdFx0Zm9yICh2YXIgd2Vla0RheSA9IDA7IHdlZWtEYXkgPCA3OyB3ZWVrRGF5KyspIHtcblx0XHRcdFx0XHR2YXIgX3RoaXNEYXRlID0gKG5ldyBEYXRlKGZpcnN0V2Vla0RheS5nZXRUaW1lKCkgKyAod2Vla0RheSAqIHVuaXZlcnNhbC5EQVkpKSk7XG5cdFx0XHRcdFx0Ly8gZml4IGZvciBEU1Qgb2RkbmVzc1xuXHRcdFx0XHRcdGlmIChfdGhpc0RhdGUuZ2V0SG91cnMoKSA9PT0gMjMpIHtcblx0XHRcdFx0XHRcdF90aGlzRGF0ZSA9IChuZXcgRGF0ZShfdGhpc0RhdGUuZ2V0VGltZSgpICsgdW5pdmVyc2FsLkhPVVIpKTtcblx0XHRcdFx0XHR9IGVsc2UgaWYgKF90aGlzRGF0ZS5nZXRIb3VycygpID09PSAxKSB7XG5cdFx0XHRcdFx0XHRfdGhpc0RhdGUgPSAobmV3IERhdGUoX3RoaXNEYXRlLmdldFRpbWUoKSAtIHVuaXZlcnNhbC5IT1VSKSk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdHZhciBfZGF0ZSA9IGdldFN0YW5kYXJkVGltZShfdGhpc0RhdGUpO1xuXHRcdFx0XHRcdF9kYXRlLmRheUluTW9udGggPSBfdGhpc0RhdGUuZ2V0TW9udGgoKSA9PT0gJHNjb3BlLmN1cnJlbnQucmF3LmdldE1vbnRoKCkgPyAnZGF5LWluLW1vbnRoJyA6ICcnO1xuXHRcdFx0XHRcdF9kYXRlLmRpc2FibGVkRGF5ID0gX2RheUlzT3V0T2ZSYW5nZShfZGF0ZSkgPyAnZGlzYWJsZWQtZGF5JyA6ICcnO1xuXHRcdFx0XHRcdHdlZWsucHVzaChfZGF0ZSk7XG5cdFx0XHRcdH1cblx0XHRcdFx0Zmlyc3RXZWVrRGF5ID0gbmV3IERhdGUoZmlyc3RXZWVrRGF5LmdldFRpbWUoKSArICg3ICogdW5pdmVyc2FsLkRBWSkpO1xuXHRcdFx0XHQkc2NvcGUuZGF0ZU1hcC5wdXNoKHdlZWspO1xuXHRcdFx0fVxuXHRcdH07XG5cblx0XHRzZXRDb25maWdPcHRpb25zKCk7XG5cdFx0X3NldFNlbGVjdGVkRGF0ZSgkc2NvcGUubmdNb2RlbCB8fCBuZXcgRGF0ZSgpKTtcblx0XHRfc2V0Q3VycmVudE1vbnRoQW5kWWVhcigpO1xuXHRcdCRzY29wZS51cGRhdGVEYXRlTWFwKCk7XG5cblx0fV0pLmRpcmVjdGl2ZSgnYm9zc3lDYWxlbmRhcicsIFtmdW5jdGlvbiAoKSB7XG5cdFx0cmV0dXJuIHtcblx0XHRcdHJlc3RyaWN0OiAnQUUnLFxuXHRcdFx0c2NvcGU6IHtcblx0XHRcdFx0bmdNb2RlbDogJz0nLFxuXHRcdFx0XHRjb25maWc6ICc9J1xuXHRcdFx0fSxcblx0XHRcdHRlbXBsYXRlOiAnPHN0eWxlPmJvc3N5LWNhbGVuZGFyIC5kYXktaW4tbW9udGh7Zm9udC13ZWlnaHQ6NzAwfWJvc3N5LWNhbGVuZGFyIC5kaXNhYmxlZC1kYXl7Y29sb3I6I2NjY308L3N0eWxlPjx0YWJsZT48dHI+PHRkIG5nLWNsaWNrPVwicHJldmlvdXNNb250aCgpXCIgdGl0bGU9XCJQcmV2aW91cyBtb250aFwiPiZsdDs8L3RkPjx0ZCBjb2xzcGFuPVwiNVwiPnt7Y3VycmVudC5tb250aE5hbWV9fSB7e2N1cnJlbnQueWVhcn19PC90ZD48dGQgbmctY2xpY2s9XCJuZXh0TW9udGgoKVwiIHRpdGxlPVwiTmV4dCBtb250aFwiPiZndDs8L3RkPjwvdHI+PHRkIG5nLXJlcGVhdD1cImRheSBpbiBkYXlzXCIgdGl0bGU9XCJ7e2RheX19XCI+e3tkYXkgfCBsaW1pdFRvIDogMn19PC90ZD48dHIgbmctcmVwZWF0PVwid2VlayBpbiBkYXRlTWFwXCI+PHRkIG5nLXJlcGVhdD1cImN1cnJlbnQgaW4gd2Vla1wiIG5nLWNsaWNrPVwic2VsZWN0RGF0ZShjdXJyZW50LnRpbWUpXCIgY2xhc3M9XCJ7e2N1cnJlbnQuZGF5SW5Nb250aH19IHt7Y3VycmVudC5kaXNhYmxlZERheX19XCI+e3tjdXJyZW50LmRhdGV9fTwvdGQ+PC90cj48dHI+PHRkIGNvbHNwYW49XCI3XCI+e3tzZWxlY3RlZC5kYXl9fSwge3tzZWxlY3RlZC5tb250aE5hbWV9fSB7e3NlbGVjdGVkLmRhdGV9fSwge3tzZWxlY3RlZC55ZWFyfX08L3RkPjwvdHI+PC90YWJsZT4nLFxuXHRcdFx0Y29udHJvbGxlcjogJ0NhbGVuZGFyQ29udHJvbGxlcidcblx0XHR9O1xuXHR9XSk7IiwidmFyIGFwcCA9IGFuZ3VsYXIubW9kdWxlKFwiYm9zc3kuY29tYm9ib3guY2FzY2FkaW5nRHJvcGRvd25cIiwgW10pO1xuXG5hcHAuY29udHJvbGxlcignQXBwQ3RybCcsIGZ1bmN0aW9uKCRzY29wZSkge1xuXG4gICAgLy8gYWRkIGNob2ljZXMgZm9yIHRoZSAzIGRyb3Bkb3duc1xuICAgIC8vIGRlcGVuZGVuY2llcyBpbiBhcnJheXMgKEEgLSBBMSAtIEExYSlcbiAgICAkc2NvcGUuY2hvaWNlcyA9IHtcbiAgICAgICAgJ09wdGlvbiBBJzoge1xuICAgICAgICAgICAgJ09wdGlvbiBBMSc6IFsnT3B0aW9uIEExYScsICdPcHRpb24gQTFiJywgJ09wdGlvbiBBMWMnXSxcbiAgICAgICAgICAgICdPcHRpb24gQTInOiBbJ09wdGlvbiBBMmEnLCAnT3B0aW9uIEEyYicsICdPcHRpb24gQTJjJ10sXG4gICAgICAgICAgICAnT3B0aW9uIEEzJzogWydPcHRpb24gQTNhJywgJ09wdGlvbiBBM2InLCAnT3B0aW9uIEEzYyddXG4gICAgICAgIH0sXG4gICAgICAgICdPcHRpb24gQic6IHtcbiAgICAgICAgICAgICdPcHRpb24gQjEnOiBbJ09wdGlvbiBCMWEnLCAnT3B0aW9uIEIxYicsICdPcHRpb24gQjFjJ10sXG4gICAgICAgICAgICAnT3B0aW9uIEIyJzogWydPcHRpb24gQjJhJywgJ09wdGlvbiBCMmInLCAnT3B0aW9uIEIyYyddLFxuICAgICAgICAgICAgJ09wdGlvbiBCMyc6IFsnT3B0aW9uIEIzYScsICdPcHRpb24gQjNiJywgJ09wdGlvbiBCM2MnXVxuICAgICAgICB9LFxuICAgICAgICAnT3B0aW9uIEMnOiB7XG4gICAgICAgICAgICAnT3B0aW9uIEMxJzogWydPcHRpb24gQzFhJywgJ09wdGlvbiBDMWInLCAnT3B0aW9uIEMxYyddLFxuICAgICAgICAgICAgJ09wdGlvbiBDMic6IFsnT3B0aW9uIEMyYScsICdPcHRpb24gQzJiJywgJ09wdGlvbiBDM2InXSxcbiAgICAgICAgICAgICdPcHRpb24gQzMnOiBbJ09wdGlvbiBDM2EnLCAnT3B0aW9uIEMzYicsICdPcHRpb24gQzNjJ11cbiAgICAgICAgfVxuICAgIH07XG5cbn0pIiwidmFyIGFwcCA9IGFuZ3VsYXIubW9kdWxlKFwiYm9zc3kuY29tYm9ib3guY2hlY2tib3hNdWx0aXNlbGVjdFwiLCBbXSk7XG5cbmFwcC5jb250cm9sbGVyKCdBcHBDdHJsJywgZnVuY3Rpb24oJHNjb3BlKSB7XG5cbiAgICAvLyBzZXQgY2hvaWNlc1xuICAgICRzY29wZS5jaG9pY2VzID0gWydPcHRpb24gQScsICdPcHRpb24gQicsICdPcHRpb24gQyddO1xuXG4gICAgLy8gYXJyYXlcbiAgICAkc2NvcGUubmFtZSA9IHtjaG9pY2VzOiBbXX07XG5cbiAgICAvLyBmdW5jdGlvbiBzZWxlY3RBbGwgdG8gc2VsZWN0IGFsbCBjaGVja2JveGVzXG4gICAgJHNjb3BlLnNlbGVjdEFsbCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAkc2NvcGUubmFtZS5jaG9pY2VzID0gYW5ndWxhci5jb3B5KCRzY29wZS5jaG9pY2VzKTtcbiAgICB9O1xuXG4gICAgLy8gZnVuY3Rpb24gZGVzZWxlY3RBbGwgdG8gZGVzZWxlY3QgYWxsIGNoZWNrYm94ZXNcbiAgICAkc2NvcGUuZGVzZWxlY3RBbGwgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgJHNjb3BlLm5hbWUuY2hvaWNlcyA9IFtdO1xuICAgIH07XG5cbn0pO1xuXG5hcHAuZGlyZWN0aXZlKCdib3NzeUNoZWNrYm94TXVsdGlzZWxlY3QnLCBbJyRwYXJzZScsICckY29tcGlsZScsIGZ1bmN0aW9uKCRwYXJzZSwgJGNvbXBpbGUpIHtcblxuICAgIHJldHVybiB7XG4gICAgICAgIHJlc3RyaWN0OiAnQUUnLFxuICAgICAgICBzY29wZTogdHJ1ZSxcbiAgICAgICAgY29tcGlsZTogZnVuY3Rpb24odEVsZW1lbnQsIHRBdHRycykge1xuICAgICAgICAgICAgLy8gbG9jYWwgdmFyaWFibGUgc3RvcmluZyBjaGVja2JveCBtb2RlbFxuICAgICAgICAgICAgdEVsZW1lbnQuYXR0cignbmctbW9kZWwnLCAnY2hlY2tlZCcpO1xuICAgICAgICAgICAgLy8gcHJldmVudCByZWN1cnNpb25cbiAgICAgICAgICAgIHRFbGVtZW50LnJlbW92ZUF0dHIoJ2Jvc3N5LWNoZWNrYm94LW11bHRpc2VsZWN0Jyk7XG4gICAgICAgICAgICByZXR1cm4gd2F0Y2g7XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgICAgIC8vIGFkZCB0aGUgc2VsZWN0ZWQgY2hvaWNlIHRvIGNob2ljZXNcbiAgICAgICAgZnVuY3Rpb24gYWRkQ2hvaWNlIChhcnIsIGl0ZW0pIHtcbiAgICAgICAgICAgIGFyciA9IGFuZ3VsYXIuaXNBcnJheShhcnIpID8gYXJyIDogW107XG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGFyci5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIGlmIChhbmd1bGFyLmVxdWFscyhhcnJbaV0sIGl0ZW0pKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBhcnI7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gYWRkIGNob2ljZSB0byBhcnJheVxuICAgICAgICAgICAgYXJyLnB1c2goaXRlbSk7XG4gICAgICAgICAgICAvLyByZXR1cm4gbmV3IGFycmF5XG4gICAgICAgICAgICByZXR1cm4gYXJyO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gcmVtb3ZlIHRoZSBzZWxlY3RlZCBjaG9pY2UgZnJvbSBjaG9pY2VzIHdoZW4gY2xpY2tlZFxuICAgICAgICBmdW5jdGlvbiByZW1vdmVDaG9pY2UoYXJyLCBpdGVtKSB7XG4gICAgICAgICAgICBpZiAoYW5ndWxhci5pc0FycmF5KGFycikpIHtcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGFyci5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICBpZiAoYW5ndWxhci5lcXVhbHMoYXJyW2ldLCBpdGVtKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gcmVtb3ZlIGZyb20gYXJyYXlcbiAgICAgICAgICAgICAgICAgICAgICAgIGFyci5zcGxpY2UoaSwgMSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIHJldHVybiBuZXcgYXJyYXlcbiAgICAgICAgICAgIHJldHVybiBhcnI7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBjb250YWlucyAtIGNoZWNrIHdoaWNoIGl0ZW1zIHRoZSBhcnJheSBjb250YWluc1xuICAgICAgICBmdW5jdGlvbiBjb250YWluQ2hlY2tib3ggKGFyciwgaXRlbSkge1xuICAgICAgICAgICAgaWYgKGFuZ3VsYXIuaXNBcnJheShhcnIpKSB7XG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBhcnIubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGFuZ3VsYXIuZXF1YWxzKGFycltpXSwgaXRlbSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gd2F0Y2ggYmVoYXZpb3VyIG9mIGRpcmVjdGl2ZSBhbmQgbW9kZWxcbiAgICAgICAgZnVuY3Rpb24gd2F0Y2goc2NvcGUsIGVsZW0sIGF0dHJzKSB7XG5cbiAgICAgICAgICAgIC8vIGNvbXBpbGUgLSBuZy1tb2RlbCBwb2ludGluZyB0byBjaGVja2VkXG4gICAgICAgICAgICAkY29tcGlsZShlbGVtKShzY29wZSk7XG5cbiAgICAgICAgICAgIC8vIGdldHRlciBhbmQgc2V0dGVyIGZvciBvcmlnaW5hbCBtb2RlbFxuICAgICAgICAgICAgdmFyIGdldHRlciA9ICRwYXJzZShhdHRycy5ib3NzeUNoZWNrYm94TXVsdGlzZWxlY3QpO1xuICAgICAgICAgICAgdmFyIHNldHRlciA9IGdldHRlci5hc3NpZ247XG5cbiAgICAgICAgICAgIC8vIHZhbHVlIGFkZGVkIHRvIGxpc3RcbiAgICAgICAgICAgIHZhciB2YWx1ZSA9ICRwYXJzZShhdHRycy5ib3NzeUxpc3RWYWx1ZSkoc2NvcGUuJHBhcmVudCk7XG5cbiAgICAgICAgICAgIC8vIHdhdGNoIHRoZSBjaGFuZ2Ugb2YgY2hlY2tlZCB2YWx1ZXNcbiAgICAgICAgICAgIHNjb3BlLiR3YXRjaCgnY2hlY2tlZCcsIGZ1bmN0aW9uKG5ld1ZhbHVlLCBvbGRWYWx1ZSkge1xuICAgICAgICAgICAgICAgIGlmIChuZXdWYWx1ZSA9PT0gb2xkVmFsdWUpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB2YXIgYWN0dWFsID0gZ2V0dGVyKHNjb3BlLiRwYXJlbnQpO1xuICAgICAgICAgICAgICAgIGlmIChuZXdWYWx1ZSA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgICAgICAgICBzZXR0ZXIoc2NvcGUuJHBhcmVudCwgYWRkQ2hvaWNlIChhY3R1YWwsIHZhbHVlKSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgc2V0dGVyKHNjb3BlLiRwYXJlbnQsIHJlbW92ZUNob2ljZShhY3R1YWwsIHZhbHVlKSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIC8vIHdhdGNoIGNoYW5nZSBvZiBvcmlnaW5hbCBtb2RlbFxuICAgICAgICAgICAgc2NvcGUuJHBhcmVudC4kd2F0Y2goYXR0cnMuYm9zc3lDaGVja2JveE11bHRpc2VsZWN0LCBmdW5jdGlvbihuZXdBcnIpIHtcbiAgICAgICAgICAgICAgICBzY29wZS5jaGVja2VkID0gY29udGFpbkNoZWNrYm94IChuZXdBcnIsIHZhbHVlKTtcbiAgICAgICAgICAgIH0sIHRydWUpO1xuICAgICAgICB9XG59XSk7IiwidmFyIGFwcCA9IGFuZ3VsYXIubW9kdWxlKCdib3NzeS5jb21ib2JveC5tdWx0aXNlbGVjdCcsIFtdKTtcblxuYXBwLmNvbnRyb2xsZXIoJ0FwcEN0cmwnLCBmdW5jdGlvbigkc2NvcGUpIHtcblxuICAgIC8vIGFkZCBjaG9pY2VzIGZvciBtdWx0aXNlbGVjdCBpbiBhcnJheVxuICAgICRzY29wZS5jaG9pY2VzID0gW3tpZDoxLCBuYW1lOiAnT3B0aW9uIEEnfSxcbiAgICAgICAgICAgICAgICAgICAgICB7aWQ6MiwgbmFtZTogJ09wdGlvbiBCJ30sXG4gICAgICAgICAgICAgICAgICAgICAge2lkOjMsIG5hbWU6ICdPcHRpb24gQyd9XG4gICAgICAgICAgICAgICAgICAgICBdO1xuXG4gICAgLy8gc2VsZWN0ZWQgY2hvaWNlXG4gICAgJHNjb3BlLnNlbGVjdGVkQ2hvaWNlID0gW107XG5cbn0pXG5cbi8vIGluamVjdCBmdW5jdGlvbnNcbmFwcC5mYWN0b3J5KCdvcHRpb25QYXJzZXInLCBbJyRwYXJzZScsIGZ1bmN0aW9uICgkcGFyc2UpIHtcblxuICAgIHZhciBUWVBFQUhFQURfUkVHRVhQID0gL15cXHMqKC4qPykoPzpcXHMrYXNcXHMrKC4qPykpP1xccytmb3JcXHMrKD86KFtcXCRcXHddW1xcJFxcd1xcZF0qKSlcXHMraW5cXHMrKC4qKSQvO1xuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgcGFyc2U6IGZ1bmN0aW9uIChpbnB1dCkge1xuXG4gICAgICAgICAgICAvLyBjaGVjayBpbnB1dHNcbiAgICAgICAgICAgIHZhciBtYXRjaCA9IGlucHV0Lm1hdGNoKFRZUEVBSEVBRF9SRUdFWFApLCBtb2RlbE1hcHBlciwgdmlld01hcHBlciwgc291cmNlO1xuICAgICAgICAgICAgaWYgKCFtYXRjaCkge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiRXhwZWN0ZWQgdHlwZWFoZWFkIHNwZWNpZmljYXRpb24gaW4gZm9ybSBvZiAnX21vZGVsVmFsdWVfIChhcyBfbGFiZWxfKT8gZm9yIF9pdGVtXyBpbiBfY29sbGVjdGlvbl8nXCIgK1xuICAgICAgICAgICAgICAgICAgICAgICAgXCIgYnV0IGdvdCAnXCIgKyBpbnB1dCArIFwiJy5cIik7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgaXRlbU5hbWU6IG1hdGNoWzNdLFxuICAgICAgICAgICAgICAgIHNvdXJjZTogJHBhcnNlKG1hdGNoWzRdKSxcbiAgICAgICAgICAgICAgICB2aWV3TWFwcGVyOiAkcGFyc2UobWF0Y2hbMl0gfHwgbWF0Y2hbMV0pLFxuICAgICAgICAgICAgICAgIG1vZGVsTWFwcGVyOiAkcGFyc2UobWF0Y2hbMV0pXG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgfTtcbn1dKVxuXG5hcHAuZGlyZWN0aXZlKCdib3NzeU11bHRpc2VsZWN0JyxcblxuICAgICAgICBmdW5jdGlvbiAoJGRvY3VtZW50LCAkY29tcGlsZSwgb3B0aW9uUGFyc2VyKSB7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIHJlc3RyaWN0OiAnRScsXG4gICAgICAgICAgICAgICAgcmVxdWlyZTogJ25nTW9kZWwnLFxuICAgICAgICAgICAgICAgIGxpbms6IGZ1bmN0aW9uIChvcmlnaW5hbFNjb3BlLCBlbGVtZW50LCBhdHRycywgbW9kZWxDdHJsKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgLy8gZGVjbGFyZSB2YXJpYWJsZXNcbiAgICAgICAgICAgICAgICAgICAgdmFyIGV4cCA9IGF0dHJzLm9wdGlvbnMsXG4gICAgICAgICAgICAgICAgICAgICAgICBwYXJzZWRSZXN1bHQgPSBvcHRpb25QYXJzZXIucGFyc2UoZXhwKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGlzTXVsdGlwbGUgPSBhdHRycy5tdWx0aXBsZSA/IHRydWUgOiBmYWxzZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHNjb3BlID0gb3JpZ2luYWxTY29wZS4kbmV3KCksXG4gICAgICAgICAgICAgICAgICAgICAgICBjaGFuZ2VIYW5kbGVyID0gYXR0cnMuY2hhbmdlIHx8IGFuZ3VsZXIubm9vcDtcblxuICAgICAgICAgICAgICAgICAgICBzY29wZS5pdGVtcyA9IFtdO1xuICAgICAgICAgICAgICAgICAgICBzY29wZS5tdWx0aXBsZSA9IGlzTXVsdGlwbGU7XG5cbiAgICAgICAgICAgICAgICAgICAgLy8gaW5jbHVkZSBzZWNvbmQgZGlyZWN0aXZlICh0ZW1wbGF0ZSlcbiAgICAgICAgICAgICAgICAgICAgdmFyIHBvcFVwRWwgPSBhbmd1bGFyLmVsZW1lbnQoJzxib3NzeS1tdWx0aXNlbGVjdC1wb3B1cD48L2Jvc3N5LW11bHRpc2VsZWN0LXBvcHVwPicpO1xuXG4gICAgICAgICAgICAgICAgICAgIC8vIGFuYWx5c2UgbW9kZWxcbiAgICAgICAgICAgICAgICAgICAgZnVuY3Rpb24gcGFyc2VNb2RlbCgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBtb2RlbCA9IHBhcnNlZFJlc3VsdC5zb3VyY2Uob3JpZ2luYWxTY29wZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IG1vZGVsLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGxvY2FsID0ge307XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbG9jYWxbcGFyc2VkUmVzdWx0Lml0ZW1OYW1lXSA9IG1vZGVsW2ldO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNjb3BlLml0ZW1zLnB1c2goe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsYWJlbDogcGFyc2VkUmVzdWx0LnZpZXdNYXBwZXIobG9jYWwpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtb2RlbDogbW9kZWxbaV0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNoZWNrZWQ6IGZhbHNlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICBwYXJzZU1vZGVsKCk7XG5cbiAgICAgICAgICAgICAgICAgICAgLy8gYWRkIHRlbXBsYXRlIGRpcmVjdGl2ZVxuICAgICAgICAgICAgICAgICAgICBlbGVtZW50LmFwcGVuZCgkY29tcGlsZShwb3BVcEVsKShzY29wZSkpO1xuXG4gICAgICAgICAgICAgICAgICAgIC8vIHNlbGVjdGlvbiBmdW5jdGlvblxuICAgICAgICAgICAgICAgICAgICBmdW5jdGlvbiBzZWxlY3RNdWx0aXBsZShpdGVtKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpdGVtLmNoZWNrZWQgPSAhaXRlbS5jaGVja2VkO1xuICAgICAgICAgICAgICAgICAgICAgICAgc2V0TW9kZWxWYWx1ZSh0cnVlKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIC8vIGFycmF5IGZvciBtdWx0aXBsZSBzZWxlY3Rpb25cbiAgICAgICAgICAgICAgICAgICAgZnVuY3Rpb24gc2V0TW9kZWxWYWx1ZShpc011bHRpcGxlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoaXNNdWx0aXBsZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlID0gW107XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYW5ndWxhci5mb3JFYWNoKHNjb3BlLml0ZW1zLCBmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoaXRlbS5jaGVja2VkKSB2YWx1ZS5wdXNoKGl0ZW0ubW9kZWwpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFuZ3VsYXIuZm9yRWFjaChzY29wZS5pdGVtcywgZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGl0ZW0uY2hlY2tlZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWUgPSBpdGVtLm1vZGVsO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIG1vZGVsQ3RybC4kc2V0Vmlld1ZhbHVlKHZhbHVlKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIC8vIGZ1bmN0aW9uIGZvciBzZWxlY3Rpb24gb2YgYWxsXG4gICAgICAgICAgICAgICAgICAgIHNjb3BlLmNoZWNrQWxsID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFpc011bHRpcGxlKSByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgICAgICBhbmd1bGFyLmZvckVhY2goc2NvcGUuaXRlbXMsIGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaXRlbS5jaGVja2VkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgc2V0TW9kZWxWYWx1ZSh0cnVlKTtcbiAgICAgICAgICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgICAgICAgICAvLyBmdW5jdGlvbiBmb3Igc2VsZWN0aW9uIG9mIG5vbmVcbiAgICAgICAgICAgICAgICAgICAgc2NvcGUudW5jaGVja0FsbCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGFuZ3VsYXIuZm9yRWFjaChzY29wZS5pdGVtcywgZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpdGVtLmNoZWNrZWQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgc2V0TW9kZWxWYWx1ZSh0cnVlKTtcbiAgICAgICAgICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgICAgICAgICBzY29wZS5zZWxlY3QgPSBmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGlzTXVsdGlwbGUgPT09IGZhbHNlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZWN0U2luZ2xlKGl0ZW0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxlY3RNdWx0aXBsZShpdGVtKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH07XG4gICAgICAgIH0pXG5cbi8vIGRpcmVjdGl2ZSBzdG9yaW5nIHRlbXBsYXRlXG5hcHAuZGlyZWN0aXZlKCdib3NzeU11bHRpc2VsZWN0UG9wdXAnLCBbJyRkb2N1bWVudCcsIGZ1bmN0aW9uICgkZG9jdW1lbnQpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHJlc3RyaWN0OiAnRScsXG4gICAgICAgICAgICBzY29wZTogZmFsc2UsXG4gICAgICAgICAgICByZXBsYWNlOiB0cnVlLFxuICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICcuLi90ZW1wbGF0ZXMvYm9zc3kuY29tYm9ib3gubXVsdGlzZWxlY3QuaHRtbCcsXG4gICAgICAgICAgICBsaW5rOiBmdW5jdGlvbiAoc2NvcGUsIGVsZW1lbnQsIGF0dHIpIHtcblxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfV0pO1xuIiwiYW5ndWxhci5tb2R1bGUoJ2Jvc3N5LmRhdGEnLCBbXSlcbi8qKlxuQG5nZG9jIHNlcnZpY2VcbkBuYW1lICRkYXRhXG5AcmVxdWlyZXMgJHFcbkByZXF1aXJlcyAkaHR0cFxuXG4qL1xuICAgIC5mYWN0b3J5KCckZGF0YScsIFsnJHEnLCckaHR0cCcsZnVuY3Rpb24gKCRxLCRodHRwKSB7XG5cbiAgICAgICAgZnVuY3Rpb24gX2dldERhdGEgKGRhdGEpIHtcbiAgICAgICAgICAgIGlmIChhbmd1bGFyLmlzU3RyaW5nKGRhdGEpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIF9nZXRSZW1vdGVEYXRhKGRhdGEpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAoYW5ndWxhci5pc09iamVjdChkYXRhKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBkYXRhO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAoYW5ndWxhci5pc0Z1bmN0aW9uKGRhdGEpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIF9nZXREYXRhKCBkYXRhLmNhbGwoJHNjb3BlKSApO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgLy9UT0RPOiByZXBsYWNlIGVycm9yIG1lc3NhZ2Ugd2l0aCBvbmxpbmUgZG9jIGxpbmsgbGlrZSBuZyBlcnJvcnNcbiAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKCdkaXJlY3RpdmUuYm9zc3lGb3JtOiBubyBkYXRhIHVybCBvciBvYmplY3QgZ2l2ZW4nKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGZ1bmN0aW9uIF9nZXRSZW1vdGVEYXRhKGRhdGEpIHtcbiAgICAgICAgICAgIHZhciBkZWZlcnJlZCA9ICRxLmRlZmVyKCk7XG5cbiAgICAgICAgICAgICRodHRwLmdldCggZGF0YSwgeyByZXNwb25zZVR5cGU6ICdqc29uJyB9IClcbiAgICAgICAgICAgICAgICAuc3VjY2VzcyggZnVuY3Rpb24oIGRhdGEgKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmKCBhbmd1bGFyLmlzT2JqZWN0KCBkYXRhICkgKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZXNvbHZlKGRhdGEpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy9UT0RPOiByZXBsYWNlIGVycm9yIG1lc3NhZ2Ugd2l0aCBvbmxpbmUgZG9jIGxpbmsgbGlrZSBuZyBlcnJvcnNcbiAgICAgICAgICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlamVjdCgnZGlyZWN0aXZlLmJvc3N5Rm9ybTogR0VUIHJlcXVlc3QgdG8gdXJsIGRpZCBub3QgcHJvZHVjZSBkYXRhIG9iamVjdCcpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAuZXJyb3IoIGZ1bmN0aW9uKHJlc3BvbnNlX2RhdGEsIHN0YXR1cykge1xuICAgICAgICAgICAgICAgICAgICAvL1RPRE86IHJlcGxhY2UgZXJyb3IgbWVzc2FnZSB3aXRoIG9ubGluZSBkb2MgbGluayBsaWtlIG5nIGVycm9yc1xuICAgICAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZWplY3QoJ2RpcmVjdGl2ZS5ib3NzeUZvcm06IEdFVCByZXF1ZXN0IHRvIHVybCBcIicgKyBkYXRhICsgJ1wiIGZhaWxlZCB3aXRoIHN0YXR1cyBcIicgKyBzdGF0dXMgKyAnXCInKTtcbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgcmV0dXJuIGRlZmVycmVkLnByb21pc2U7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICBAbmdkb2MgbWV0aG9kXG4gICAgICAgICAgICBAbmFtZSBnZXREYXRhXG4gICAgICAgICAgICBAbWV0aG9kT2YgJGRhdGFcbiAgICAgICAgICAgIEBwYXJhbSB7c3RyaW5nLG9iamVjdCxmdW5jdGlvbn0gZGF0YSBJZiBkYXRhIGlzIGEgc3RyaW5nLCBpdCB3aWxsIGJlIHRyZWF0ZWQgYXMgYSB1cmwgdG8gcmV0cmlldmUgZGF0YSBmcm9tLiBJZiBkYXRhIGlzIGFuIG9iamVjdCBpdCB3aWxsIGJlIGltbWVkaWF0ZWx5IHJldHVybmVkLiBJZiBkYXRhIGlzIGEgZnVuY3Rpb24sIHRoZSBmdW5jdGlvbiB3aWxsIGJlIGNhbGxlZCBhbmQgcHJvY2Vzc2VkIHVudGlsIGFuIG9iamVjdCBpcyBwcm9kdWNlZFxuICAgICAgICAgICAgQHJldHVybnMge09iamVjdH0gRWl0aGVyIGEgJHEgcHJvbWlzZSwgYSBkYXRhIG9iamVjdCBvciBhIHN0cmluZy5cbiAgICAgICAgICAgICovXG4gICAgICAgICAgICBnZXREYXRhOiBfZ2V0RGF0YVxuICAgICAgICB9O1xuICAgIH1dKVxuO1xuIiwiYW5ndWxhci5tb2R1bGUoJ2Jvc3N5LmRyb3Bkb3duJywgW10pXG5cdC5ydW4oZnVuY3Rpb24oJHRlbXBsYXRlQ2FjaGUpe1xuICAgICAgICAkdGVtcGxhdGVDYWNoZS5wdXQoJ2Jvc3N5LWRyb3Bkb3duLmh0bWwnLCAnPGRpdj48c2VsZWN0IG5nLW9wdGlvbnM9XCJpdGVtW2Ryb3Bkb3duLnRpdGxlXSBmb3IgaXRlbSBpbiBkcm9wZG93bi5pdGVtcyB8IG9yZGVyQnk6IGRyb3Bkb3duLnRpdGxlXCIgbmctbW9kZWw9XCJzZWxlY3RlZEl0ZW1cIiBuZy1jaGFuZ2U9XCJkcm9wZG93bi51cGRhdGVTZWxlY3RlZEl0ZW0oc2VsZWN0ZWRJdGVtKVwiPjxvcHRpb24gdmFsdWU9XCJcIiBuZy1oaWRlPVwic2VsZWN0ZWRJdGVtXCI+UGxlYXNlIHNlbGVjdCBvbmUuLi48L29wdGlvbj48L3NlbGVjdD48L2Rpdj4nKTtcdFxuICAgIH0pXG5cdC5kaXJlY3RpdmUoJ2Jvc3N5RHJvcGRvd24nLCBmdW5jdGlvbigkaHR0cCwgJGNvbXBpbGUpIHtcblx0XHRyZXR1cm4ge1xuXHRcdFx0cmVzdHJpY3Q6ICdFQScsXG5cdFx0XHRzY29wZToge1xuXHRcdFx0XHRjb25maWc6IFwiPVwiLFxuXHRcdFx0XHRzZWxlY3Q6IFwiPVwiLFxuXHRcdFx0XHRpdGVtczogXCI9XCJcblx0XHRcdH0sXG5cdFx0XHR0ZW1wbGF0ZVVybDogJycsXG5cdFx0XHRsaW5rOiBmdW5jdGlvbihzY29wZSwgZWxlbWVudCwgYXR0cnMpIHtcblx0XHRcdFx0dmFyIGN1c3RvbVRlbXBsYXRlO1xuXG5cdFx0XHRcdC8vQ2hlY2tzIGlmIHVzZXIgaXMgZGVmaW5pbmcgYSB1cmwgb3IgaW5uZXIgaHRtbFxuXHRcdFx0XHQvL0lmIGl0IGlzIGEgdXJsLCB0aGUgdGVtcGxhdGUgbXVzdCBiZSBsb2NhdGVkIGluIGEgbG9jYWwgZGlyZWN0b3J5IG9yIGFkZGVkIHRvIHRoZSBET00gdmlhIG5nLWluY2x1ZGVcblx0XHRcdFx0aWYoc2NvcGUuZHJvcGRvd24udGVtcGxhdGVbMF0gIT09ICc8Jylcblx0XHRcdFx0XHRjdXN0b21UZW1wbGF0ZSA9ICRjb21waWxlKCc8bmctaW5jbHVkZSBzcmM9XCJkcm9wZG93bi50ZW1wbGF0ZVwiPjwvbmctaW5jbHVkZT4nKShzY29wZSk7XG5cdFx0XHRcdGVsc2Vcblx0XHRcdFx0XHRjdXN0b21UZW1wbGF0ZSA9ICRjb21waWxlKHNjb3BlLmRyb3Bkb3duLnRlbXBsYXRlKShzY29wZSk7XG5cdFx0XHRcdFxuXHRcdFx0XHQvL0luamVjdHMgdGVtcGxhdGVcblx0XHRcdFx0ZWxlbWVudC5yZXBsYWNlV2l0aChjdXN0b21UZW1wbGF0ZSk7XG5cdFx0XHR9LFxuXHRcdFx0Y29udHJvbGxlcjogZnVuY3Rpb24oJHNjb3BlKSB7XG5cdFx0XHRcdHZhciB0aGlzRHJvcGRvd24gPSB0aGlzO1xuXHRcdFx0XHR0aGlzRHJvcGRvd24udGl0bGUgPSAkc2NvcGUuY29uZmlnLnRpdGxlO1xuXHRcdFx0XHR0aGlzRHJvcGRvd24uaXRlbXMgPSBbXTtcblxuXHRcdFx0XHQvL1JldHJpZXZlIGpzb24gY29udGFpbmluZyBvYmplY3RzIHRvIHBvcHVsYXRlIHRoZSBkcm9wZG93bi5cblx0XHRcdFx0aWYoJHNjb3BlLmNvbmZpZy5zcmMpIHtcblx0XHRcdFx0XHQvL0NoZWNrcyB0aGF0IGNvbmZpZy5zcmMgaXMgYSBKU09OIGZpbGUuXG5cdFx0XHRcdFx0aWYoJHNjb3BlLmNvbmZpZy5zcmMuc3Vic3RyKCRzY29wZS5jb25maWcuc3JjLmxlbmd0aC01LCAkc2NvcGUuY29uZmlnLnNyYy5sZW5ndGgpID09ICcuanNvbicpIHtcblx0XHRcdFx0XHRcdCRodHRwLmdldCgkc2NvcGUuY29uZmlnLnNyYylcblx0XHRcdFx0XHRcdFx0LnN1Y2Nlc3MoZnVuY3Rpb24oZGF0YSkge1xuXHRcdFx0XHRcdFx0XHRcdHRoaXNEcm9wZG93bi5pdGVtcyA9IGRhdGE7XG5cdFx0XHRcdFx0XHRcdFx0Ly9DaGVja3MgdmFsaWRpdHkgb2YgdGhlIHRpdGxlIGZpZWxkIGFzIGl0IGFwcGxpZXMgdG8gdGhlIEpTT04uXG5cdFx0XHRcdFx0XHRcdFx0aWYoIXRoaXNEcm9wZG93bi5pdGVtc1swXS5oYXNPd25Qcm9wZXJ0eSh0aGlzRHJvcGRvd24udGl0bGUpKVxuXHRcdFx0XHRcdFx0XHRcdFx0Y29uc29sZS5lcnJvcihcIkVSUk9SOiAkc2NvcGUuY29uZmlnLnRpdGxlOiBcXCdcIiArICRzY29wZS5jb25maWcudGl0bGUgKyBcIlxcJycgaXMgbm90IGEgbWVtYmVyIG9mIHRoZSBsb2FkZWQgSlNPTiBkYXRhLiBQbGVhc2Ugc3BlY2lmeSBhIHZhbGlkIFxcJ3RpdGxlXFwnIHRvIGxpc3QuXCIpO1xuXHRcdFx0XHRcdFx0XHRcdC8vQXR0YWNoZXMgcmV0cmlldmVkIGl0ZW1zIHRvICRzY29wZS5pdGVtcyBmb3IgYWRkaXRpb25hbCBmdW5jdGlvbmFsaXR5LlxuXHRcdFx0XHRcdFx0XHRcdGlmKCRzY29wZS5pdGVtcylcblx0XHRcdFx0XHRcdFx0XHRcdCRzY29wZS5pdGVtcyA9IHRoaXNEcm9wZG93bi5pdGVtcztcblx0XHRcdFx0XHRcdFx0fSlcblx0XHRcdFx0XHRcdFx0LmVycm9yKGZ1bmN0aW9uKGRhdGEpIHtcblx0XHRcdFx0XHRcdFx0XHRjb25zb2xlLmVycm9yKFwiRVJST1I6IEZhaWwgdG8gbG9hZCBKU09OIGRhdGEgZnJvbSB0aGUgcGF0aDogXFwnXCIgKyAkc2NvcGUuY29uZmlnLnNyYyArIFwiXFwnXCIpO1xuXHRcdFx0XHRcdFx0XHR9KTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0Ly9Mb2dzIGFuIGVycm9yIHRvIGlkZW50aWZ5IHRoYXQgYSBqc29uIGZpbGUgd2FzIG5vdCBsb2FkZWQuXG5cdFx0XHRcdFx0ZWxzZSB7XG5cdFx0XHRcdFx0XHRjb25zb2xlLmVycm9yKCBcIkVSUk9SOiBcXCckc2NvcGUuY29uZmlnLnNyY1xcJzogXFwnXCIgKyAkc2NvcGUuY29uZmlnLnNyYyArIFwiXFwnIGlzIG5vdCBhIHZhbGlkIEpTT04gZmlsZS5cIik7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdC8vRnVuY3Rpb24gY2FsbGVkIHRvIHVwZGF0ZSBzZWxlY3QgaW4gdGhlIHRlbXBsYXRlLlxuXHRcdFx0XHRcdHRoaXNEcm9wZG93bi51cGRhdGVTZWxlY3RlZEl0ZW0gPSBmdW5jdGlvbihzZWxlY3RlZEl0ZW0pIHtcblx0XHRcdFx0XHRcdC8vU2luZ2xlIHNlbGVjdCBvYmplY3QgdGllZCB0byB0aGUgY29uZmlnIG9iamVjdC5cblx0XHRcdFx0XHRcdGlmKCRzY29wZS5jb25maWcuc2VsZWN0KVxuXHRcdFx0XHRcdFx0XHQkc2NvcGUuY29uZmlnLnNlbGVjdCA9IHNlbGVjdGVkSXRlbTtcblx0XHRcdFx0XHRcdC8vVXNlciBjYW4gY29sbGVjdCBhbmQgdXRpbGl6ZSBtdWx0aXBsZSBzZWxlY3Qgb2JqZWN0cyB3aXRoIHRoZSBzYW1lIGNvbmZpZyBvYmplY3QgaWYgcGFzc2luZyBpbiBhIGRpc3RpbmN0IHNlbGVjdCBwYXJhbS5cblx0XHRcdFx0XHRcdGlmKCRzY29wZS5zZWxlY3QpXG5cdFx0XHRcdFx0XHRcdCRzY29wZS5zZWxlY3QgPSBzZWxlY3RlZEl0ZW07XG5cdFx0XHRcdFx0fTtcblx0XHRcdFx0XHQvL0RldGVybWluZSBpZiBjdXN0b20gdGVtcGxhdGUgVXJsIGhhcyBiZWVuIGRlZmluZWQuXG5cdFx0XHRcdFx0aWYoJHNjb3BlLmNvbmZpZy50ZW1wbGF0ZSlcblx0XHRcdFx0XHRcdHRoaXNEcm9wZG93bi50ZW1wbGF0ZSA9ICRzY29wZS5jb25maWcudGVtcGxhdGU7XG5cdFx0XHRcdFx0ZWxzZSB7XG5cdFx0XHRcdFx0XHR0aGlzRHJvcGRvd24udGVtcGxhdGUgPSAnYm9zc3ktZHJvcGRvd24uaHRtbCc7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHRcdC8vTG9ncyBhbiBlcnJvciBpZiAnc3JjJyBoYXMgbm90IGJlZW4gZGVmaW5lZC5cblx0XHRcdFx0ZWxzZSB7XG5cdFx0XHRcdFx0Y29uc29sZS5lcnJvciggXCJFUlJPUjogXFwnJHNjb3BlLmNvbmZpZy5zcmNcXCcgaGFzIG5vdCBiZWVuIHNwZWNpZmllZCB3aXRoaW4gdGhlIFxcJ2NvbmZpZ1xcJyBvYmplY3QuIFBsZWFzZSBwYXNzIGluIGEgdmFsaWQgcGF0aCB0byBhIEpTT04gZmlsZS5cIik7XG5cdFx0XHRcdH07XG5cdFx0XHR9LFxuXHRcdFx0Y29udHJvbGxlckFzOiAnZHJvcGRvd24nXG5cdFx0fTtcblx0fSlcbiIsIiIsImFuZ3VsYXIubW9kdWxlKCdib3NzeS5mb3JtJywgW10pXG4gICAgLnJ1bihmdW5jdGlvbigkdGVtcGxhdGVDYWNoZSl7XG4gICAgICAgICR0ZW1wbGF0ZUNhY2hlLnB1dCgnYm9zc3ktaW5wdXQuaHRtbCcsICd0ZW1wbGF0ZXMvYm9zc3ktaW5wdXQuaHRtbCcpO1xuICAgIH0pXG4gICAgLmRpcmVjdGl2ZSgnYm9zc3lGb3JtJyxbJyRjb21waWxlJywnJGh0dHAnLCckc2NoZW1hJywnJGRhdGEnLCBmdW5jdGlvbiAoJGNvbXBpbGUsICRodHRwLCAkc2NoZW1hLCAkZGF0YSkge1xuICAgICAgICB2YXIgX3NjaGVtYSxcbiAgICAgICAgICAgIF9kYXRhLFxuICAgICAgICAgICAgX29wdGlvbnMgPSB7XG4gICAgICAgICAgICAgICAgc2hvd0xhYmVsczogdHJ1ZSxcbiAgICAgICAgICAgICAgICBoZWFkZXI6ICdUaGlzIGlzIGhlYWRlcicsXG4gICAgICAgICAgICAgICAgZm9vdGVyOiAnVGhpcyBpcyBmb290ZXInLFxuICAgICAgICAgICAgICAgIHRoZW1lOiAnZ3JlZW4nLFxuICAgICAgICAgICAgICAgIGJ1dHRvbjogJ1NhdmUnXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgX2l0ZW1UZW1wbGF0ZSA9IHtcbiAgICAgICAgICAgICAgICBudW1iZXI6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuICc8aW5wdXQgdHlwZT1cIm51bWJlclwiLz4nO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgdGV4dDogZnVuY3Rpb24gKG9iaiwga2V5LCBpc19yZXF1aXJlZCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gJzxib3NzeS1pbnB1dCB0aXRsZT1cIlxcJycrb2JqLnRpdGxlKydcXCdcIiB0eXBlPVwiXFwnJysgb2JqLmlucHV0X3R5cGUgKydcXCdcIiB2YWx1ZT1cIlxcJycrX2RhdGEuYWRkcmVzc1trZXldKydcXCdcIicgKyAoIGlzX3JlcXVpcmVkID8gJyByZXF1aXJlZCcgOiAnJyApICsgJz48L2Jvc3N5LWlucHV0Pic7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB0ZXh0QXJlYTogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gJzx0ZXh0YXJlYT48L3RleHRhcmVhPic7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBjaGVja2JveDogZnVuY3Rpb24ob2JqKXtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuICc8ZGl2IGNsYXNzPVwiY2hlY2tib3hcIj48bGFiZWw+PGlucHV0IHR5cGU9XCJjaGVja2JveFwiPicrb2JqLnRpdGxlKyc8L2xhYmVsPjwvZGl2Pic7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfTtcblxuICAgICAgICBmdW5jdGlvbiBzZXREYXRhKGRhdGEpIHtcbiAgICAgICAgICAgIHZhciByZXN1bHQgPSAkZGF0YS5nZXREYXRhKGRhdGEpO1xuICAgICAgICAgICAgaWYoIGFuZ3VsYXIuaXNGdW5jdGlvbiggcmVzdWx0LnRoZW4gKSAmJiBhbmd1bGFyLmlzRnVuY3Rpb24oIHJlc3VsdC5jYXRjaCApICYmIGFuZ3VsYXIuaXNGdW5jdGlvbiggcmVzdWx0LmZpbmFsbHkgKSApIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBfZGF0YSA9IHJlc3VsdDtcbiAgICAgICAgICAgIH1cblxuICAgICAgICB9XG5cbiAgICAgICAgZnVuY3Rpb24gc2V0U2NoZW1hKHNjaGVtYSkge1xuICAgICAgICAgICAgX3NjaGVtYSA9ICRzY2hlbWEuZ2V0U2NoZW1hKHNjaGVtYSk7XG4gICAgICAgIH1cblxuICAgICAgICBmdW5jdGlvbiBidWlsZFRlbXBsYXRlKHNjaGVtYVBhcnQsIHBhcmVudEtleSwgcmVxdWlyZWQpIHtcbiAgICAgICAgICAgIHZhciB0ZW1wbGF0ZSA9ICcnLFxuICAgICAgICAgICAgICAgIGZ1bGxLZXkgPSAnJztcbiAgICAgICAgICAgIGFuZ3VsYXIuZm9yRWFjaChzY2hlbWFQYXJ0LCBmdW5jdGlvbih2YWx1ZSwga2V5KSB7XG4gICAgICAgICAgICAgICAgaWYgKHZhbHVlLnR5cGUpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coZnVsbEtleSArICcgaXMgJysgdmFsdWUudHlwZSk7XG4gICAgICAgICAgICAgICAgICAgIHN3aXRjaCAodmFsdWUudHlwZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAnb2JqZWN0JzpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgcmVxdWlyZWRfbGlzdCA9IHR5cGVvZiggdmFsdWUucmVxdWlyZWQgKSAhPT0gJ3VuZGVmaW5lZCcgPyB2YWx1ZS5yZXF1aXJlZCA6IG51bGw7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGUgKz0gYnVpbGRUZW1wbGF0ZSh2YWx1ZS5wcm9wZXJ0aWVzLCBmdWxsS2V5LCByZXF1aXJlZF9saXN0ICk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlICdhcnJheSc6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGUgKz0gYnVpbGRUZW1wbGF0ZSh2YWx1ZS5pdGVtcy5wcm9wZXJ0aWVzLCBmdWxsS2V5KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ251bWJlcicgfHwgJ2ludGVnZXInOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlICs9IF9pdGVtVGVtcGxhdGUubnVtYmVyKHZhbHVlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ3N0cmluZyc6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGlzX3JlcXVpcmVkID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYoIHJlcXVpcmVkICYmIHJlcXVpcmVkLmluZGV4T2Yoa2V5KSAhPT0gLTEgKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlzX3JlcXVpcmVkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGUgKz0gX2l0ZW1UZW1wbGF0ZS50ZXh0KHZhbHVlLCBrZXksIGlzX3JlcXVpcmVkKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ2Jvb2xlYW4nOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlICs9IF9pdGVtVGVtcGxhdGUuY2hlY2tib3godmFsdWUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSwgdGhpcyk7XG4gICAgICAgICAgICByZXR1cm4gdGVtcGxhdGU7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgcmVzdHJpY3Q6ICdFJyxcbiAgICAgICAgICAgIHJlcGxhY2U6IHRydWUsXG4gICAgICAgICAgICB0ZW1wbGF0ZTogJycsXG4gICAgICAgICAgICBzY29wZToge1xuICAgICAgICAgICAgICAgIGNvbmZpZzonPScsIC8vQ3JlYXRlIHNjb3BlIGlzb2xhdGlvbiB3aXRoIGJpLWRpcmVjdGlvbmFsIGJpbmRpbmcsXG4gICAgICAgICAgICAgICAgdGl0bGU6ICc9J1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGxpbms6IGZ1bmN0aW9uIChzY29wZSwgZWxlbWVudCwgYXR0cmlidXRlcykge1xuICAgICAgICAgICAgICAgIHNjb3BlLmNvbmZpZy5vcHRpb25zID0gYW5ndWxhci5leHRlbmQoX29wdGlvbnMsIHNjb3BlLmNvbmZpZy5vcHRpb25zKTtcblxuICAgICAgICAgICAgICAgIHZhciBwcm9taXNlID0gc2V0RGF0YShzY29wZS5jb25maWcuZGF0YSk7XG4gICAgICAgICAgICAgICAgc2V0U2NoZW1hKHNjb3BlLmNvbmZpZy5zY2hlbWEpO1xuICAgICAgICAgICAgICAgIGlmKCBwcm9taXNlICkge1xuICAgICAgICAgICAgICAgICAgICAvL3RvZG86IHNldCBkaXJlY3RpdmUgdG8gbG9hZGluZyBzdGF0ZVxuICAgICAgICAgICAgICAgICAgICBwcm9taXNlLnRoZW4oXG4gICAgICAgICAgICAgICAgICAgICAgICBmdW5jdGlvbihyZXN1bHQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL3RvZG86IHNldCBkaXJlY3RpdmUgdG8gbG9hZGVkIHN0YXRlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgX2RhdGEgPSByZXN1bHQ7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxlbWVudC5odG1sKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnPGZvcm0gbm92YWxpZGF0ZSBjbGFzcz1cInt7Y29uZmlnLm9wdGlvbnMudGhlbWV9fVwiPicrXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICc8ZGl2IGNsYXNzPVwiYmFubmVyIHBhZ2UtaGVhZGVyXCI+PGgzPnt7Y29uZmlnLm9wdGlvbnMuaGVhZGVyfX08L2gzPjwvZGl2PicrXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBidWlsZFRlbXBsYXRlKF9zY2hlbWEpICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICc8YnV0dG9uIG5nLWlmPVwiY29uZmlnLm9wdGlvbnMuYnV0dG9uXCI+e3tjb25maWcub3B0aW9ucy5idXR0b259fTwvYnV0dG9uPicgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnPGRpdiBjbGFzcz1cInBhZ2UtZm9vdGVyXCI+PGgzPnt7Y29uZmlnLm9wdGlvbnMuZm9vdGVyfX08L2gzPjwvZGl2PicrXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICc8L2Zvcm0+J1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJGNvbXBpbGUoZWxlbWVudC5jb250ZW50cygpKShzY29wZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgZnVuY3Rpb24ocmVhc29uKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy90b2RvOiBzZXQgZGlyZWN0aXZlIHRvIGVycm9yIHN0YXRlXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgZWxlbWVudC5odG1sKFxuICAgICAgICAgICAgICAgICAgICAgICAgJzxmb3JtIG5vdmFsaWRhdGUgY2xhc3M9XCJ7e2NvbmZpZy5vcHRpb25zLnRoZW1lfX1cIj5MT0FESU5HLi4uPC9mb3JtPidcbiAgICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICAgICAgJGNvbXBpbGUoZWxlbWVudC5jb250ZW50cygpKShzY29wZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBlbGVtZW50Lmh0bWwoXG4gICAgICAgICAgICAgICAgICAgICAgICAnPGZvcm0gbm92YWxpZGF0ZSBjbGFzcz1cInt7Y29uZmlnLm9wdGlvbnMudGhlbWV9fVwiPicrXG4gICAgICAgICAgICAgICAgICAgICAgICAnPGRpdiBjbGFzcz1cImJhbm5lciBwYWdlLWhlYWRlclwiPjxoMz57e2NvbmZpZy5vcHRpb25zLmhlYWRlcn19PC9oMz48L2Rpdj4nK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJ1aWxkVGVtcGxhdGUoX3NjaGVtYSkgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICc8YnV0dG9uIG5nLWlmPVwiY29uZmlnLm9wdGlvbnMuYnV0dG9uXCI+e3tjb25maWcub3B0aW9ucy5idXR0b259fTwvYnV0dG9uPicgK1xuICAgICAgICAgICAgICAgICAgICAgICAgJzxkaXYgY2xhc3M9XCJwYWdlLWZvb3RlclwiPjxoMz57e2NvbmZpZy5vcHRpb25zLmZvb3Rlcn19PC9oMz48L2Rpdj4nK1xuICAgICAgICAgICAgICAgICAgICAgICAgJzwvZm9ybT4nXG4gICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgICAgICRjb21waWxlKGVsZW1lbnQuY29udGVudHMoKSkoc2NvcGUpO1xuICAgICAgICAgICAgICAgIH1cblxuXG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG5cbiAgICB9XSlcbjsiLCJhbmd1bGFyLm1vZHVsZSgnYm9zc3kuaW5wdXQnLCBbXSlcbiAgICAucnVuKGZ1bmN0aW9uKCR0ZW1wbGF0ZUNhY2hlKXtcbiAgICAgICAgJHRlbXBsYXRlQ2FjaGUucHV0KCdib3NzeS1pbnB1dC5odG1sJywgJzxkaXYgY2xhc3M9XCJmb3JtLWdyb3VwIGJvc3N5LWlucHV0XCI+PGxhYmVsIGZvcj1cIlwiPnt7dGl0bGV9fTwvbGFiZWw+PGlucHV0IHR5cGU9XCJ7e3R5cGV9fVwiIGNsYXNzPVwiZm9ybS1jb250cm9sXCIgcGxhY2Vob2xkZXI9XCJcIiB2YWx1ZT1cInt7dmFsdWV9fVwiLz48c3Bhbj48L3NwYW4+PC9kaXY+Jyk7XG4gICAgfSlcbiAgICAuZGlyZWN0aXZlKCdib3NzeUlucHV0JyxbJyRjb21waWxlJywnJGh0dHAnLCckc2NoZW1hJywnJGRhdGEnLCckdGVtcGxhdGVDYWNoZScsIGZ1bmN0aW9uICgkY29tcGlsZSwgJGh0dHAsICRzY2hlbWEsICRkYXRhLCAkdGVtcGxhdGVDYWNoZSkge1xuICAgIFx0cmV0dXJuIHtcblx0XHRcdHJlc3RyaWN0OiAnRScsXG5cdFx0XHRyZXBsYWNlOiB0cnVlLFxuXHRcdFx0c2NvcGU6IHtcblx0XHRcdFx0dGl0bGU6ICc9Jyxcblx0XHRcdFx0dmFsdWU6ICc9Jyxcblx0XHRcdFx0dHlwZTogJz0nLFxuXHRcdFx0XHRyZXF1aXJlZDogJz0nXG5cdFx0XHR9LFxuXHRcdFx0dGVtcGxhdGU6ICR0ZW1wbGF0ZUNhY2hlLmdldCgnYm9zc3ktaW5wdXQuaHRtbCcpXG5cdFx0fTtcbiAgICB9XSk7XG4iLCJ2YXIgYXBwID0gYW5ndWxhci5tb2R1bGUoJ2Jvc3N5Lm51bWVyaWN0ZXh0Ym94JyxbXSk7XG5cblxuYXBwLmNvbnRyb2xsZXIoJ2Jvc3N5bnVtZXJpY0N0cmwnLGZ1bmN0aW9uKCRzY29wZSl7XG4gICAgdmFyIHN5bWJvbHM9WyckJywnJScsJ2xicyddO1xuICAgIHZhciBpbml0aWFsVmFsdWU9MDtcblxuXG4gICAgdmFyIGtleSA9IHtcbiAgICAgICAgcHJpY2U6MCxcbiAgICAgICAgd2VpZ2h0OjAsXG4gICAgICAgIGRpc2NvdW50OjAsXG4gICAgICAgIHN0b2NrOjBcbiAgICB9O1xuXG5cbiAgICAkc2NvcGUucCA9IHN5bWJvbHNbMF0gKyBpbml0aWFsVmFsdWU7XG4gICAgJHNjb3BlLncgPSBpbml0aWFsVmFsdWUgKyBzeW1ib2xzWzJdO1xuICAgICRzY29wZS5kID0gaW5pdGlhbFZhbHVlICsgc3ltYm9sc1sxXTtcbiAgICAkc2NvcGUucyA9IGluaXRpYWxWYWx1ZTtcblxuICAgICRzY29wZS5pbmNyZW1lbnQgPSBmdW5jdGlvbihhKXtcbiAgICAgICAgc3dpdGNoKGEpe1xuICAgICAgICAgICAgY2FzZSAncHJpY2UnOlxuICAgICAgICAgICAgICAgIGtleS5wcmljZSsrO1xuICAgICAgICAgICAgICAgICRzY29wZS5wID0gc3ltYm9sc1swXSArIGtleS5wcmljZTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJ3dlaWdodCc6XG4gICAgICAgICAgICAgICAga2V5LndlaWdodCsrO1xuICAgICAgICAgICAgICAgICRzY29wZS53PWtleS53ZWlnaHQgKyBzeW1ib2xzWzJdO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAnZGlzY291bnQnOlxuICAgICAgICAgICAgICAgIGtleS5kaXNjb3VudCsrO1xuICAgICAgICAgICAgICAgICRzY29wZS5kID0ga2V5LmRpc2NvdW50ICsgc3ltYm9sc1sxXTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJ3N0b2NrJzpcbiAgICAgICAgICAgICAgICBrZXkuc3RvY2srKztcbiAgICAgICAgICAgICAgICAkc2NvcGUucz1rZXkuc3RvY2s7XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgfVxuICAgICRzY29wZS5kZWNyZW1lbnQgPSBmdW5jdGlvbihhKXtcblxuICAgICAgICBzd2l0Y2goYSl7XG4gICAgICAgICAgICBjYXNlICdwcmljZSc6XG4gICAgICAgICAgICAgICAgaWYoa2V5LnByaWNlPjApXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBrZXkucHJpY2UtLTtcbiAgICAgICAgICAgICAgICAgICAgJHNjb3BlLnAgPSBzeW1ib2xzWzBdICsga2V5LnByaWNlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJ3dlaWdodCc6XG4gICAgICAgICAgICAgICAgaWYoa2V5LndlaWdodD4wKXtcbiAgICAgICAgICAgICAgICAgICAga2V5LndlaWdodC0tO1xuICAgICAgICAgICAgICAgICAgICAkc2NvcGUudz1rZXkud2VpZ2h0ICsgc3ltYm9sc1syXTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICdkaXNjb3VudCc6XG4gICAgICAgICAgICAgICAgaWYoa2V5LmRpc2NvdW50PjApXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBrZXkuZGlzY291bnQtLTtcbiAgICAgICAgICAgICAgICAgICAgJHNjb3BlLmQgPSBrZXkuZGlzY291bnQrIHN5bWJvbHNbMV07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAnc3RvY2snOlxuICAgICAgICAgICAgICAgIGlmKGtleS5zdG9jaz4wKXtcbiAgICAgICAgICAgICAgICAgICAga2V5LnN0b2NrLS07XG4gICAgICAgICAgICAgICAgICAgICRzY29wZS5zPWtleS5zdG9jaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG5cbiAgICB9XG5cbn0pO1xuXG5cbmFwcC5kaXJlY3RpdmUoJ2Jvc3N5bnVtZXJpY3RleHRib3gnLGZ1bmN0aW9uKCl7XG4gICAgcmV0dXJue1xuICAgICAgICBjb250cm9sbGVyOidib3NzeW51bWVyaWNDdHJsJyxcbiAgICAgICAgcmVzdHJpY3Q6J0UnLFxuICAgICAgICB0cmFuc2NsdWRlOnRydWUsXG4gICAgICAgIHRlbXBsYXRlVXJsOidib3NzeS5udW1lcmljdGV4dGJveC5odG1sJ1xuXG4gICAgfVxufSk7XHQiLCJhbmd1bGFyLm1vZHVsZSgnYm9zc3kuc2NoZW1hJywgW10pXG4gICAgLmZhY3RvcnkoJyRzY2hlbWEnLCBbJyRxJywgJyRodHRwJywgZnVuY3Rpb24gKCRxLCAkaHR0cCkge1xuXG4gICAgICAgIGZ1bmN0aW9uIF9nZXRTY2hlbWEgKHNjaGVtYSkge1xuICAgICAgICAgICAgaWYgKGFuZ3VsYXIuaXNTdHJpbmcoc2NoZW1hKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBfZ2V0UmVtb3RlU2NoZW1hKHNjaGVtYSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChhbmd1bGFyLmlzT2JqZWN0KHNjaGVtYSkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gc2NoZW1hO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgLy9UT0RPOiByZXBsYWNlIGVycm9yIG1lc3NhZ2Ugd2l0aCBvbmxpbmUgZG9jIGxpbmsgbGlrZSBuZyBlcnJvcnNcbiAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKCdkaXJlY3RpdmUuYm9zc3lGb3JtOiBubyBzY2hlbWEgdXJsIG9yIG9iamVjdCBnaXZlbicpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgZnVuY3Rpb24gX2dldFJlbW90ZVNjaGVtYShzY2hlbWEpIHtcbiAgICAgICAgICAgIHZhciBkZWZlcnJlZCA9ICRxLmRlZmVyKCk7XG5cbiAgICAgICAgICAgICRodHRwLmdldCggc2NoZW1hIClcbiAgICAgICAgICAgICAgICAuc3VjY2VzcyggZnVuY3Rpb24oIGRhdGEgKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmKCBhbmd1bGFyLmlzT2JqZWN0KCBkYXRhICkgKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZXNvbHZlKGRhdGEpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy9UT0RPOiByZXBsYWNlIGVycm9yIG1lc3NhZ2Ugd2l0aCBvbmxpbmUgZG9jIGxpbmsgbGlrZSBuZyBlcnJvcnNcbiAgICAgICAgICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlamVjdCgnZGlyZWN0aXZlLmJvc3N5Rm9ybTogR0VUIHJlcXVlc3QgdG8gdXJsIGRpZCBub3QgcHJvZHVjZSBzY2hlbWEgb2JqZWN0Jyk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIC5lcnJvciggZnVuY3Rpb24oZGF0YSwgc3RhdHVzKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vVE9ETzogcmVwbGFjZSBlcnJvciBtZXNzYWdlIHdpdGggb25saW5lIGRvYyBsaW5rIGxpa2UgbmcgZXJyb3JzXG4gICAgICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlamVjdCgnZGlyZWN0aXZlLmJvc3N5Rm9ybTogR0VUIHJlcXVlc3QgdG8gdXJsIFwiJyArIHNjaGVtYSArICdcIiBmYWlsZWQgd2l0aCBzdGF0dXMgXCInICsgc3RhdHVzICsgJ1wiJyk7XG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIHJldHVybiBkZWZlcnJlZC5wcm9taXNlO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGdldFNjaGVtYTogX2dldFNjaGVtYVxuICAgICAgICB9O1xuICAgIH1dKVxuO1xuIiwiLypUaGlzIGlzIGEgc2xpZGVyIHdpZGdldCBjcmVhdGVkIGluIGFuZ3VsYXIgYXMgcGFydCBvZiB0aGUgQm9zc3lVSSB3aWRnZXRzLlxuICogVGhlIGVhc2llc3Qgd2F5IHRvIHVzZSB0aGUgc2xpZGVyIGlzIHRvIGluY2x1ZGUgaXQgaW4geW91ciBIVE1MIGFuZCB0aGVuXG4gKiBjcmVhdGUgYSB0YWcgPGJvc3N5LXNsaWRlcj48L2Jvc3N5LXNsaWRlcj4uIFRoaXMgd2lkZ2V0IHRha2UgaW4gc2V2ZXJhbFxuICogd2F5cyB0byBjdXN0b21pemUuIExpc3Qgb2YgY3VzdG9taXphdGlvbnMgYXZhaWxhYmxlLlxuICogbWF4ICAgICAgICAgICAgICBkZWZhdWx0cyB0byAxMDBcbiAqIG1pbiAgICAgICAgICAgICAgZGVmYXVsdHMgdG8gMVxuICogd2lkdGggICAgICAgICAgICBkZWZhdWx0cyB0byAyNTBweFxuICogYmFyZmlsbGNvbG9yICAgICBkZWZhdWx0cyB0byBkYXJrYmx1ZTogbXVzdCBiZSBwYXNzZWQgYXMgaGV4YWRlY2ltYWwgY29sb3IgZm9ybWF0ICMwMDAwMDBcbiAqIGJhcmVtcHR5Y29sb3IgICAgZGVmYXVsdHMgdG8gbGlnaHRncmV5XG4gKiBidXR0b25jb2xvciAgICAgIGRlZmF1bHRzIHRvIHJlZFxuICogc3RlcCAgICAgICAgICAgICBkZWZhdWx0cyB0byByZWRcbiAqIG9yaWVudGF0aW9uICAgICAgZGVmYXVsdHMgdG8gaG9yaXpvbnRhbFxuICogZXguXG4gKiA8Ym9zc3ktc2xpZGVyIG1heD1cIjIwXCIgbWluPVwiLTVcIiBvcmllbnRhdGlvbj1cInZlcnRpY2FsXCI+PC9ib3NzeS1zbGlkZXI+Ki9cbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuXG52YXIgYXBwID0gYW5ndWxhci5tb2R1bGUoJ2Jvc3N5LnNsaWRlcicsIFtdKTtcbmFwcC5jb250cm9sbGVyKCdTbGlkZXJDb250cm9sbGVyJywgWyckc2NvcGUnLCBmdW5jdGlvbiAoJHNjb3BlKSB7XG4gICAgLy90aGVzZSBhcmUgb3VyIGRlZmF1bHQgdmFsdWVzIGFuZCBhcmUgdGhlIHZhcmlhYmxlcyB0aGF0IGNhbiBiZSBjaGFuZ2VkIGJ5IHVzZXIgb2Ygb3VyIHdpZGdldHNcbiAgICAkc2NvcGUubWF4ID0gMTAwO1xuICAgICRzY29wZS52YWx1ZSA9IDA7XG4gICAgJHNjb3BlLm1pbiA9IDE7XG4gICAgJHNjb3BlLmZpbGxXaWR0aCA9IDA7XG4gICAgJHNjb3BlLmVtcHRXaWR0aCA9IDA7XG4gICAgJHNjb3BlLmJhcldpZHRoID0gMjUwO1xuICAgICRzY29wZS5iYXJQaWVjZSA9IDA7XG4gICAgJHNjb3BlLnN0ZXAgPSAxO1xuICAgICRzY29wZS5pc01vdXNlRG93biA9IDA7XG4gICAgJHNjb3BlLnlDb3JkID0gMDtcbiAgICAkc2NvcGUueENvcmQgPSAwO1xuICAgICRzY29wZS5uZXdYQ29yZCA9IDA7XG4gICAgJHNjb3BlLm5ld1lDb3JkID0gMDtcbiAgICAkc2NvcGUub3JpZW50YXRpb24gPSBmYWxzZTtcbiAgICAkc2NvcGUuYnV0U2l6ZSA9IDE1O1xuICAgICRzY29wZS5iYXJmaWxsY29sb3IgPSBcIiMwMDAwRkZcIjtcbiAgICAkc2NvcGUuYmFyZW1wdHljb2xvciA9IFwiI0QzRDNEM1wiO1xuICAgICRzY29wZS5idXR0b25jb2xvciA9IFwiI0ZGMDAwMFwiO1xuXG5cbiAgICAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cblxuICAgIC8qbWFrZUJhcigpXG4gICAgICogVGhpcyBjcmVhdGVzIHRoZSBpbml0aWFsIGdyYXBoaWMgb2YgdGhlIHNsaWRlciBhbmQgZW5zdXJlcyBpdCBpcyBpbiB0aGUgY29ycmVjdCBvcmRlclxuICAgICAqIENDID0gNCAqL1xuICAgICRzY29wZS5tYWtlQmFyID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAvL2J1dHRvbiBzaG91bGQgc2hvdyB1cCBpbiB0aGUgbWlkZGxlIG5vdyBvciBjbG9zZSB0byBpZiB1bmV2ZW5cbiAgICAgICAgJHNjb3BlLnZhbHVlID0gcGFyc2VJbnQoKCRzY29wZS5tYXggKyAkc2NvcGUubWluKSAvIDIpO1xuICAgICAgICBmb3IgKHZhciBjdXJyZW50ID0gJHNjb3BlLm1pbjsgY3VycmVudCA8PSAkc2NvcGUubWF4OyBjdXJyZW50KyspIHtcbiAgICAgICAgICAgIGlmIChjdXJyZW50IDwgKCRzY29wZS52YWx1ZSkpIHtcbiAgICAgICAgICAgICAgICAkc2NvcGUuZmlsbFdpZHRoKys7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoY3VycmVudCA+ICgkc2NvcGUudmFsdWUpKSB7XG4gICAgICAgICAgICAgICAgJHNjb3BlLmVtcHRXaWR0aCsrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGN1cnJlbnQgPT0gKCRzY29wZS52YWx1ZSkpIHtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICAkc2NvcGUubmdNb2RlbCA9ICRzY29wZS52YWx1ZTtcbiAgICAgICAgcmV0dXJuO1xuICAgIH07XG4gICAgLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG5cbiAgICAvKmluY3JlYXNlKClcbiAgICAgKiBUaGlzIGNoZWNrcyBib3VuZHMgd2hlbiBhdHRlbXB0aW5nIHRvIGluY3JlYXNlIHRoZSB2YWx1ZSBhbmQgbW92ZXMgdGhlIHBvc2l0aW9uXG4gICAgICogb2YgdGhlIHNsaWRlciBidXR0b24gYW5kIHVwZGF0ZXMgdGhlIHZhbHVlLlxuICAgICAqIENDID0gMiovXG4gICAgJHNjb3BlLmluY3JlYXNlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAoJHNjb3BlLnZhbHVlIDwgJHNjb3BlLm1heCkge1xuICAgICAgICAgICAgJHNjb3BlLnZhbHVlID0gJHNjb3BlLnZhbHVlICsgMTtcbiAgICAgICAgICAgICRzY29wZS5maWxsV2lkdGgrKztcbiAgICAgICAgICAgICRzY29wZS5lbXB0V2lkdGgtLTtcbiAgICAgICAgICAgICRzY29wZS5uZ01vZGVsID0gJHNjb3BlLnZhbHVlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybjtcbiAgICB9O1xuICAgIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuXG4gICAgLypidXRJbmNyZWFzZSgpXG4gICAgICogVGhpcyBmdW5jdGlvbiBhbGxvd3MgdGhlIHNsaWRlciB0byBpbmNyZWFzZSBpbiBpbmNyZW1lbnRzLlxuICAgICAqIENDID0gMSovXG4gICAgJHNjb3BlLmJ1dEluY3JlYXNlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgaSA9IDA7XG4gICAgICAgIGZvciAoaSA9IDA7IGkgPCAkc2NvcGUuc3RlcDsgaSsrKSB7XG4gICAgICAgICAgICAkc2NvcGUuaW5jcmVhc2UoKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuXG4gICAgLypkZWNyZWFzZSgpXG4gICAgICogVGhpcyBjaGVja3MgYm91bmRzIHdoZW4gYXR0ZW1wdGluZyB0byBkZWNyZWFzZSB0aGUgdmFsdWUgYW5kIG1vdmVzIHRoZSBwb3NpdGlvblxuICAgICAqIG9mIHRoZSBzbGlkZXIgYnV0dG9uIGFuZCB1cGRhdGVzIHRoZSB2YWx1ZS5cbiAgICAgKiBDQyA9IDIqL1xuICAgICRzY29wZS5kZWNyZWFzZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKCRzY29wZS52YWx1ZSA+ICRzY29wZS5taW4pIHtcbiAgICAgICAgICAgICRzY29wZS52YWx1ZSA9ICRzY29wZS52YWx1ZSAtIDE7XG4gICAgICAgICAgICAkc2NvcGUuZmlsbFdpZHRoLS07XG4gICAgICAgICAgICAkc2NvcGUuZW1wdFdpZHRoKys7XG4gICAgICAgICAgICAkc2NvcGUubmdNb2RlbCA9ICRzY29wZS52YWx1ZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm47XG4gICAgfTtcbiAgICAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cblxuICAgIC8qYnV0RGVjcmVhc2UoKVxuICAgICAqIFRoaXMgZnVuY3Rpb24gYWxsb3dzIHRoZSBzbGlkZXIgdG8gZGVjcmVhc2UgaW4gaW5jcmVtZW50c1xuICAgICAqIENDID0gMSovXG4gICAgJHNjb3BlLmJ1dERlY3JlYXNlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgaSA9IDA7XG4gICAgICAgIGZvciAoaSA9IDA7IGkgPCAkc2NvcGUuc3RlcDsgaSsrKSB7XG4gICAgICAgICAgICAkc2NvcGUuZGVjcmVhc2UoKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuXG4gICAgLyprZXlCaW5kKCRldmVudClcbiAgICAgKiBUaGlzIGZ1bmN0aW9uIGlzIHRvIGJpbmQgdGhlIGRlY3JlYXNlIGFuZCBpbmNyZWFzZSBmdW5jdGlvbiB3aXRoIHRoZSBhcnJvdyBrZXlzXG4gICAgICogQ0MgPSA1Ki9cbiAgICAkc2NvcGUua2V5QmluZCA9IGZ1bmN0aW9uIChldikge1xuICAgICAgICAkc2NvcGUucHJlc3NlZCA9IGV2LndoaWNoO1xuICAgICAgICAvL0lmIGFycm93IGtleShMZWZ0IG9yIERvd24pIGlzIHByZXNzZWQgdGhlbiBjYWxsIHRoZSBkZWNyZWFzZSgpIGZ1bmN0aW9uIHRvIGRlY3JlYXNlIHRoZSB2YWx1ZS5cbiAgICAgICAgaWYgKCRzY29wZS5wcmVzc2VkID09PSAzNyB8fCAkc2NvcGUucHJlc3NlZCA9PT0gNDApIHtcbiAgICAgICAgICAgICRzY29wZS5idXREZWNyZWFzZSgpO1xuXG4gICAgICAgIH1cbiAgICAgICAgLy9zYW1lIGFzIGFib3ZlIGJ1dCBmb3IgVXAgb3IgUmlnaHQgdG8gaW5jcmVhc2UgdGhlIHZhbHVlLlxuICAgICAgICBpZiAoJHNjb3BlLnByZXNzZWQgPT09IDM4IHx8ICRzY29wZS5wcmVzc2VkID09PSAzOSkge1xuICAgICAgICAgICAgJHNjb3BlLmJ1dEluY3JlYXNlKCk7XG5cbiAgICAgICAgfVxuICAgICAgICByZXR1cm47XG4gICAgfTtcbiAgICAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cblxuICAgIC8qZ3JleUNsaWNrKClcbiAgICAgKiBUaGlzIGZ1bmN0aW9uIGlzIHRvIGFsbG93IHRoZSB2YWx1ZSB0byBiZSBjaGFuZ2VkIHdoZW4gY2xpY2tpbmcgb24gdGhlIGJhclxuICAgICAqIENDID0gMSovXG4gICAgJHNjb3BlLmdyZXlDbGljayA9IGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICAvL1doZW4gY2xpY2sgb24gdGhlIGVtcHR5IGJhciB0aGUgYmFyIHdpbGwgaW5jcmVhc2VcbiAgICAgICAgJHNjb3BlLmJ1dEluY3JlYXNlKCk7XG5cbiAgICAgICAgcmV0dXJuO1xuICAgIH07XG4gICAgLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG5cbiAgICAvKmJhckNsaWNrKClcbiAgICAgKiBUaGlzIGZ1bmN0aW9uIGlzIHRvIGFsbG93IHRoZSB2YWx1ZSB0byBiZSBjaGFuZ2VkIHdoZW4gY2xpY2tpbmcgb24gdGhlIGJhclxuICAgICAqIENDID0gMSovXG4gICAgJHNjb3BlLmJhckNsaWNrID0gZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgIC8vV2hlbiBjbGljayBvbiB0aGUgRmlsbGVkIHVwIGNvbG9yIHNpZGUgdGhlIGJhciB3aWxsIGRlY3JlYXNlXG4gICAgICAgICRzY29wZS5idXREZWNyZWFzZSgpO1xuXG4gICAgICAgIHJldHVybjtcbiAgICB9O1xuICAgIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuXG4gICAgLypkcmFnKCRldmVudClcbiAgICAgKiBUaGlzIGZ1bmN0aW9uIGFsbG93cyB0aGUgYnV0dG9uIHRvIGRyYWcgYnkgZmluZGluZyBpdHMgbG9jYXRpb24gdGhlbiBjaGVja3MgaXQgYWdhaW5zdCBpdHMgb3JpZ2luYWwgbG9jYXRpb25cbiAgICAgKiBhbmQgaWYgaXQgaXMgZGlzdGFuY2UgaXMgZ3JlYXRlciB0aGFuIHRoZSBzaXplIG9mIGEgYmFycGllY2UgdXBkYXRlIHRoZSBncmFwaGljIGFuZCB2YWx1ZVxuICAgICAqIENDID0gOSovXG4gICAgJHNjb3BlLmRyYWcgPSBmdW5jdGlvbiAoZXZlbnQpIHtcblxuICAgICAgICAvL2dyYWIgdGhlIG1vdXNlIGxvY2F0aW9uXG4gICAgICAgIHZhciB4ID0gZXZlbnQuY2xpZW50WDtcbiAgICAgICAgdmFyIHkgPSBldmVudC5jbGllbnRZO1xuICAgICAgICAvL2NoZWNrIGlmIHRoZSBtb3VzZSBpcyBiZWluZyBoZWxkIGRvd25cbiAgICAgICAgaWYgKCRzY29wZS5pc01vdXNlRG93bikge1xuICAgICAgICAgICAgLy9jaGVjayB0aGUgb3JpZW50YXRpb25cbiAgICAgICAgICAgIGlmICgkc2NvcGUub3JpZW50YXRpb24pIHtcbiAgICAgICAgICAgICAgICAvL2lmIHRoaXMgaXMgdGhlIGZpcnN0IHRpbWUgeW91IGNsaWNrZWQgZG93biBnZXQgcmVhZHkgdG8gbW92ZSBpdFxuICAgICAgICAgICAgICAgIGlmICgkc2NvcGUueUNvcmQgPT09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgJHNjb3BlLnlDb3JkID0geTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIC8vY2hhbmdlIHRoZSBsb2NhdGlvbiBvZiB0aGUgc2xpZGVyIGFmdGVyIGVub3VnaCBtb3ZlbWVudFxuICAgICAgICAgICAgICAgICAgICAkc2NvcGUubmV3WUNvcmQgPSB5O1xuICAgICAgICAgICAgICAgICAgICB3aGlsZSAoKCRzY29wZS5uZXdZQ29yZCAtICRzY29wZS55Q29yZCkgPiAkc2NvcGUuYmFyUGllY2UgLyAyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAkc2NvcGUueUNvcmQgKz0gJHNjb3BlLmJhclBpZWNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgJHNjb3BlLmRlY3JlYXNlKCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgd2hpbGUgKCgkc2NvcGUubmV3WUNvcmQgLSAkc2NvcGUueUNvcmQpIDwgLSgkc2NvcGUuYmFyUGllY2UgLyAyKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgJHNjb3BlLnlDb3JkIC09ICRzY29wZS5iYXJQaWVjZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICRzY29wZS5pbmNyZWFzZSgpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgLy9pZiB0aGlzIGlzIHRoZSBmaXJzdCB0aW1lIHlvdSBjbGlja2VkIGRvd24gZ2V0IHJlYWR5IHRvIG1vdmUgaXRcbiAgICAgICAgICAgICAgICBpZiAoJHNjb3BlLnhDb3JkID09PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgICRzY29wZS54Q29yZCA9IHg7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAvL2NoYW5nZSB0aGUgbG9jYXRpb24gb2YgdGhlIHNsaWRlciBhZnRlciBlbm91Z2ggbW92ZW1lbnRcbiAgICAgICAgICAgICAgICAgICAgJHNjb3BlLm5ld1hDb3JkID0geDtcbiAgICAgICAgICAgICAgICAgICAgd2hpbGUgKCgkc2NvcGUubmV3WENvcmQgLSAkc2NvcGUueENvcmQpID4gJHNjb3BlLmJhclBpZWNlIC8gMikge1xuICAgICAgICAgICAgICAgICAgICAgICAgJHNjb3BlLnhDb3JkICs9ICRzY29wZS5iYXJQaWVjZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICRzY29wZS5pbmNyZWFzZSgpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHdoaWxlICgoJHNjb3BlLm5ld1hDb3JkIC0gJHNjb3BlLnhDb3JkKSA8IC0oJHNjb3BlLmJhclBpZWNlIC8gMikpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICRzY29wZS54Q29yZCAtPSAkc2NvcGUuYmFyUGllY2U7XG4gICAgICAgICAgICAgICAgICAgICAgICAkc2NvcGUuZGVjcmVhc2UoKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm47XG4gICAgfTtcbiAgICAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cblxuICAgIC8qZG93bigpXG4gICAgICogVGhpcyBmdW5jdGlvbiBsb2dzIHdoZW4gdGhlIG1vdXNlIGlzIGRvd25cbiAgICAgKiBDQyA9IDEqL1xuICAgICRzY29wZS5kb3duID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAkc2NvcGUubmV3WENvcmQgPSAwO1xuICAgICAgICAkc2NvcGUueENvcmQgPSAwO1xuICAgICAgICAkc2NvcGUubmV3WUNvcmQgPSAwO1xuICAgICAgICAkc2NvcGUueUNvcmQgPSAwO1xuICAgICAgICAkc2NvcGUuaXNNb3VzZURvd24gPSAxO1xuICAgICAgICByZXR1cm47XG4gICAgfTtcbiAgICAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cblxuICAgIC8qZG93bigpXG4gICAgICogVGhpcyBmdW5jdGlvbiBsb2dzIHdoZW4gdGhlIG1vdXNlIGlzIHVwXG4gICAgICogQ0MgPSAxKi9cbiAgICAkc2NvcGUudXAgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICRzY29wZS5uZXdYQ29yZCA9IDA7XG4gICAgICAgICRzY29wZS54Q29yZCA9IDA7XG4gICAgICAgICRzY29wZS5uZXdZQ29yZCA9IDA7XG4gICAgICAgICRzY29wZS55Q29yZCA9IDA7XG4gICAgICAgICRzY29wZS5pc01vdXNlRG93biA9IDA7XG4gICAgICAgIHJldHVybjtcbiAgICB9O1xuICAgIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xufV0pXG5hcHAuZGlyZWN0aXZlKCdib3NzeVNsaWRlcicsIGZ1bmN0aW9uICgkY29tcGlsZSkge1xuICAgIHZhciBteVRlbXBsYXRlO1xuICAgIHJldHVybiB7XG4gICAgICAgIC8vYWxsb3dzIHRoZSBzbGlkZXIgdG8gYmUgY3JlYXRlZCBhcyBhbmQgYXR0cmlidXRlIG9yIGVsZW1lbnQgPGJvc3N5LXNsaWRlcj48Ym9zc3ktc2xpZGVyPlxuICAgICAgICByZXN0cmljdDogJ0FFJyxcbiAgICAgICAgY29udHJvbGxlcjogJ1NsaWRlckNvbnRyb2xsZXInLFxuICAgICAgICBzY29wZToge1xuICAgICAgICAgICAgbmdNb2RlbDogJz0nXG4gICAgICAgIH0sXG4gICAgICAgIC8qbGluazogZnVuY3Rpb246XG4gICAgICAgICAqIFRoaXMgYWxsb3dzIHVzIHRvIHB1bGwgaW4gdGhlIHNldHRpbmdzIHRoZSBwcm9ncmFtbWVyIHdhbnRzIGZvciB0aGUgc2xpZGVyIGFuZCBzZXQgdGhpbmdzIGNvcnJlY3RseVxuICAgICAgICAgKiBpdCBhbHNvIGluaXRpYWxpemVzIHRoZSBzbGlkZXIgYW5kIGFkZHMgdGhlIGNvcnJlY3Qgb3JpZW50YXRpb24gdGVtcGxhdGUgdG8gdGhlIERPTSovXG4gICAgICAgIGxpbms6IHtcbiAgICAgICAgICAgIHByZTogZnVuY3Rpb24gKHNjb3BlLCBpRWxlbSwgaUF0dHIpIHtcblxuICAgICAgICAgICAgICAgIC8vY2hlY2tzIHRvIHNlZSBpZiB0aGVyZSBpcyBhIG1heCBhdHRyaWJ1dGVcbiAgICAgICAgICAgICAgICBpZiAoaUF0dHIubWF4KSB7XG4gICAgICAgICAgICAgICAgICAgIHNjb3BlLm1heCA9IHBhcnNlSW50KGlBdHRyLm1heCk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChzY29wZS5tYXggPT09IE5hTikge1xuICAgICAgICAgICAgICAgICAgICAgICAgc2NvcGUubWF4ID0gMTA7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgLy9jaGVja3MgdG8gc2VlIGlmIHRoZXJlIGlzIGEgbWluIGF0dHJpYnV0ZVxuICAgICAgICAgICAgICAgIGlmIChpQXR0ci5taW4pIHtcbiAgICAgICAgICAgICAgICAgICAgc2NvcGUubWluID0gcGFyc2VJbnQoaUF0dHIubWluKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHNjb3BlLm1pbiA9PT0gTmFOKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzY29wZS5taW4gPSAxO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIC8vY2hlY2tzIGZvciBiYXIgY29sb3IgY3VzdG9taXphdGlvblxuICAgICAgICAgICAgICAgIGlmIChpQXR0ci5iYXJmaWxsY29sb3IpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHBhdHRlcm4gPSAvXiNbMC05YS1mQS1GXXs2fSQvOyAvL2N1cnJlbnRseSBhY2NlcHRzIGxvd2VyIGNhc2UgYS1mXG4gICAgICAgICAgICAgICAgICAgIGlmIChwYXR0ZXJuLnRlc3QoaUF0dHIuYmFyZmlsbGNvbG9yKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgc2NvcGUuYmFyZmlsbGNvbG9yID0gaUF0dHIuYmFyZmlsbGNvbG9yO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIC8vY2hlY2tzIGZvciBlbXB0eSBiYXIgY29sb3IgY3VzdG9taXphdGlvblxuXG4gICAgICAgICAgICAgICAgaWYgKGlBdHRyLmJhcmVtcHR5Y29sb3IpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHBhdHRlcm4gPSAvXiNbMC05YS1mQS1GXXs2fSQvOyAvL2N1cnJlbnRseSBhY2NlcHRzIGxvd2VyIGNhc2UgYS1mXG4gICAgICAgICAgICAgICAgICAgIGlmIChwYXR0ZXJuLnRlc3QoaUF0dHIuYmFyZW1wdHljb2xvcikpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNjb3BlLmJhcmVtcHR5Y29sb3IgPSBpQXR0ci5iYXJlbXB0eWNvbG9yO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuXG5cbiAgICAgICAgICAgICAgICBpZiAoaUF0dHIuYnV0dG9uY29sb3IpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHBhdHRlcm4gPSAvXiNbMC05YS1mQS1GXXs2fSQvOyAvL2N1cnJlbnRseSBhY2NlcHRzIGxvd2VyIGNhc2UgYS1mXG4gICAgICAgICAgICAgICAgICAgIGlmIChwYXR0ZXJuLnRlc3QoaUF0dHIuYnV0dG9uY29sb3IpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzY29wZS5idXR0b25jb2xvciA9IGlBdHRyLmJ1dHRvbmNvbG9yO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIC8vZmluZCB0aGUgc3RlcCBzaXplIGZvciBidXR0b24gY2xpY2tzXG4gICAgICAgICAgICAgICAgaWYgKGlBdHRyLnN0ZXApIHtcbiAgICAgICAgICAgICAgICAgICAgc2NvcGUuc3RlcCA9IGlBdHRyLnN0ZXA7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIC8vZmluZCB0aGUgcHJlZmVycmVkIHRvdGFsIHdpZHRoIHRvIHVzZSBmb3IgdGhlIHNsaWRlclxuICAgICAgICAgICAgICAgIGlmIChpQXR0ci53aWR0aCkge1xuICAgICAgICAgICAgICAgICAgICBzY29wZS5iYXJXaWR0aCA9IGlBdHRyLndpZHRoO1xuICAgICAgICAgICAgICAgICAgICBzY29wZS5iYXJQaWVjZSA9IChzY29wZS5iYXJXaWR0aCAvIChzY29wZS5tYXggLSBzY29wZS5taW4pKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHNjb3BlLmJhclBpZWNlID0gKHNjb3BlLmJhcldpZHRoIC8gKHNjb3BlLm1heCAtIHNjb3BlLm1pbikpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAvL2NoZWNrcyB0byBzZWUgaWYgdGhlcmUgaXMgYSBvcmllbnRhdGlvbiBhdHRyaWJ1dGUgaWYgdGhlcmUgaXMgc2V0IG91ciB0ZW1wbGF0ZSB0byB0aGUgdmVydGljYWwgdGVtcGxhdGVcbiAgICAgICAgICAgICAgICBpZiAoaUF0dHIub3JpZW50YXRpb24pIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCd2ZXJ0aWNhbCcgPT09IGlBdHRyLm9yaWVudGF0aW9uKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzY29wZS5vcmllbnRhdGlvbiA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICBteVRlbXBsYXRlID0gJzxkaXYgb25zZWxlY3RzdGFydD1cInJldHVybiBmYWxzZTtcIiBvbmRyYWdzdGFydD1cInJldHVybiBmYWxzZTtcIm5nLW1vdXNlbGVhdmU9XCJ1cCgpXCIgbmctbW91c2Vtb3ZlPVwiZHJhZygkZXZlbnQpXCI+JyArXG4gICAgICAgICAgICAgICAgICAgICAgICAnPGRpdiBuZy1tb3VzZW1vdmU9XCJkcmFnKCRldmVudClcIiBuZy1tb3VzZXVwPVwidXAoKVwiIG5nLWNsaWNrPVwiZ3JleUNsaWNrKClcInN0eWxlPVwiY3Vyc29yOnBvaW50ZXI7bWFyZ2luLWxlZnQ6OXB4O3dpZHRoOjVweDtoZWlnaHQ6e3tiYXJQaWVjZSAqIGVtcHRXaWR0aH19cHg7YmFja2dyb3VuZC1jb2xvcjonICsgc2NvcGUuYmFyZW1wdHljb2xvciArICc7bWFyZ2luLWJvdHRvbTo0cHhcIj48L2Rpdj4nICtcbiAgICAgICAgICAgICAgICAgICAgICAgICc8ZGl2IG5nLW1vdXNlbW92ZT1cImRyYWcoJGV2ZW50KVwiIG5nLW1vdXNlZG93bj1cImRvd24oKVwiIG5nLW1vdXNldXA9XCJ1cCgpXCIgb3JpZW50YXRpb249XCJ2ZXJ0aWNhbFwiIHN0eWxlPVwiY3Vyc29yOm5zLXJlc2l6ZTttYXJnaW4tdG9wOi00cHg7bWFyZ2luLWxlZnQ6NXB4O3dpZHRoOjE1cHg7aGVpZ2h0OjE1cHg7YmFja2dyb3VuZC1jb2xvcjonICsgc2NvcGUuYnV0dG9uY29sb3IgKyAnO2JvcmRlci1yYWRpdXM6NTAlO1wiPjwvZGl2PicgK1xuICAgICAgICAgICAgICAgICAgICAgICAgJzxkaXYgbmctbW91c2Vtb3ZlPVwiZHJhZygkZXZlbnQpXCIgbmctbW91c2V1cD1cInVwKClcIiBuZy1jbGljaz1cImJhckNsaWNrKClcInN0eWxlPVwiY3Vyc29yOnBvaW50ZXI7bWFyZ2luLWxlZnQ6OXB4O3dpZHRoOjVweDtoZWlnaHQ6e3tiYXJQaWVjZSAqIGZpbGxXaWR0aH19cHg7YmFja2dyb3VuZC1jb2xvcjonICsgc2NvcGUuYmFyZmlsbGNvbG9yICsgJzttYXJnaW4tYm90dG9tOjRweFwiPjwvZGl2PicgK1xuICAgICAgICAgICAgICAgICAgICAgICAgJzwvZGl2Pic7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBteVRlbXBsYXRlID0gJzxkaXYgb25zZWxlY3RzdGFydD1cInJldHVybiBmYWxzZTtcIiBvbmRyYWdzdGFydD1cInJldHVybiBmYWxzZTtcIiBuZy1tb3VzZWxlYXZlPVwidXAoKVwibmctbW91c2Vtb3ZlPVwiZHJhZygkZXZlbnQpXCI+JyArXG4gICAgICAgICAgICAgICAgICAgICAgICAnPGRpdiBuZy1tb3VzZW1vdmU9XCJkcmFnKCRldmVudClcIiBuZy1tb3VzZXVwPVwidXAoKVwiIG5nLWNsaWNrPVwiYmFyQ2xpY2soKVwic3R5bGU9XCJjdXJzb3I6cG9pbnRlcjtkaXNwbGF5OmlubGluZS1ibG9jazt3aWR0aDp7e2JhclBpZWNlICogZmlsbFdpZHRofX1weDtoZWlnaHQ6NXB4O2JhY2tncm91bmQtY29sb3I6JyArIHNjb3BlLmJhcmZpbGxjb2xvciArICc7bWFyZ2luLWJvdHRvbTo0cHhcIj48L2Rpdj4nICtcbiAgICAgICAgICAgICAgICAgICAgICAgICc8ZGl2IG5nLW1vdXNlbW92ZT1cImRyYWcoJGV2ZW50KVwiIG5nLW1vdXNlZG93bj1cImRvd24oKVwiIG5nLW1vdXNldXA9XCJ1cCgpXCIgb3JpZW50YXRpb249XCJob3Jpem9udGFsXCIgc3R5bGU9XCJjdXJzb3I6ZXctcmVzaXplO2Rpc3BsYXk6aW5saW5lLWJsb2NrO3dpZHRoOnt7YnV0U2l6ZX19cHg7aGVpZ2h0Ont7YnV0U2l6ZX19cHg7YmFja2dyb3VuZC1jb2xvcjonICsgc2NvcGUuYnV0dG9uY29sb3IgKyAnO2JvcmRlci1yYWRpdXM6NTAlO1wiPjwvZGl2PicgK1xuICAgICAgICAgICAgICAgICAgICAgICAgJzxkaXYgbmctbW91c2Vtb3ZlPVwiZHJhZygkZXZlbnQpXCIgbmctbW91c2V1cD1cInVwKClcIiBuZy1jbGljaz1cImdyZXlDbGljaygpXCJzdHlsZT1cImN1cnNvcjpwb2ludGVyO2Rpc3BsYXk6aW5saW5lLWJsb2NrO3dpZHRoOnt7YmFyUGllY2UgKiBlbXB0V2lkdGh9fXB4O2hlaWdodDo1cHg7YmFja2dyb3VuZC1jb2xvcjonICsgc2NvcGUuYmFyZW1wdHljb2xvciArICc7bWFyZ2luLWJvdHRvbTo0cHhcIj48L2Rpdj4nICtcbiAgICAgICAgICAgICAgICAgICAgICAgICc8L2Rpdj4nO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAvL3RoaXMgYnVpbGRzIG91ciBob3Jpem9udGFsIHRlbXBsYXRlXG4gICAgICAgICAgICAgICAgICAgIG15VGVtcGxhdGUgPSAnPGRpdiBvbnNlbGVjdHN0YXJ0PVwicmV0dXJuIGZhbHNlO1wiIG9uZHJhZ3N0YXJ0PVwicmV0dXJuIGZhbHNlO1wiIG5nLW1vdXNlbGVhdmU9XCJ1cCgpXCJuZy1tb3VzZW1vdmU9XCJkcmFnKCRldmVudClcIj4nICtcbiAgICAgICAgICAgICAgICAgICAgJzxkaXYgbmctbW91c2Vtb3ZlPVwiZHJhZygkZXZlbnQpXCIgbmctbW91c2V1cD1cInVwKClcIiBuZy1jbGljaz1cImJhckNsaWNrKClcInN0eWxlPVwiY3Vyc29yOnBvaW50ZXI7ZGlzcGxheTppbmxpbmUtYmxvY2s7d2lkdGg6e3tiYXJQaWVjZSAqIGZpbGxXaWR0aH19cHg7aGVpZ2h0OjVweDtiYWNrZ3JvdW5kLWNvbG9yOicgKyBzY29wZS5iYXJmaWxsY29sb3IgKyAnO21hcmdpbi1ib3R0b206NHB4XCI+PC9kaXY+JyArXG4gICAgICAgICAgICAgICAgICAgICc8ZGl2IG5nLW1vdXNlbW92ZT1cImRyYWcoJGV2ZW50KVwiIG5nLW1vdXNlZG93bj1cImRvd24oKVwiIG5nLW1vdXNldXA9XCJ1cCgpXCIgb3JpZW50YXRpb249XCJob3Jpem9udGFsXCIgc3R5bGU9XCJjdXJzb3I6ZXctcmVzaXplO2Rpc3BsYXk6aW5saW5lLWJsb2NrO3dpZHRoOnt7YnV0U2l6ZX19cHg7aGVpZ2h0Ont7YnV0U2l6ZX19cHg7YmFja2dyb3VuZC1jb2xvcjonICsgc2NvcGUuYnV0dG9uY29sb3IgKyAnO2JvcmRlci1yYWRpdXM6NTAlO1wiPjwvZGl2PicgK1xuICAgICAgICAgICAgICAgICAgICAnPGRpdiBuZy1tb3VzZW1vdmU9XCJkcmFnKCRldmVudClcIiBuZy1tb3VzZXVwPVwidXAoKVwiIG5nLWNsaWNrPVwiZ3JleUNsaWNrKClcInN0eWxlPVwiY3Vyc29yOnBvaW50ZXI7ZGlzcGxheTppbmxpbmUtYmxvY2s7d2lkdGg6e3tiYXJQaWVjZSAqIGVtcHRXaWR0aH19cHg7aGVpZ2h0OjVweDtiYWNrZ3JvdW5kLWNvbG9yOicgKyBzY29wZS5iYXJlbXB0eWNvbG9yICsgJzttYXJnaW4tYm90dG9tOjRweFwiPjwvZGl2PicgK1xuICAgICAgICAgICAgICAgICAgICAnPC9kaXY+JztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgLy9XZSBzaG93IG91ciB0ZW1wbGF0ZSBhbmQgdGhlbiBjb21waWxlIGl0IHNvIHRoZSBET00ga25vd3MgYWJvdXQgb3VyIG5nIGZ1bmN0aW9uc1xuICAgICAgICAgICAgICAgIGlFbGVtLmh0bWwobXlUZW1wbGF0ZSk7XG4gICAgICAgICAgICAgICAgJGNvbXBpbGUoaUVsZW0uY29udGVudHMoKSkoc2NvcGUpO1xuICAgICAgICAgICAgICAgIC8vY3JlYXRlIHRoZSBpbml0aWFsIGJhclxuICAgICAgICAgICAgICAgIHNjb3BlLm1ha2VCYXIoKTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG59KTtcblxuIiwiYW5ndWxhci5tb2R1bGUoJ2Jvc3N5LnRvYXN0JywgWyduZ0FuaW1hdGUnXSlcblxuICAuY29udHJvbGxlcignVG9hc3RlckNvbnRyb2xsZXInLCBbJyRzY29wZScsICckaW50ZXJ2YWwnLCAnJHRpbWVvdXQnLCBmdW5jdGlvbigkc2NvcGUsICRpbnRlcnZhbCwgJHRpbWVvdXQpXG4gIHtcbiAgICAvKipcbiAgICAgKiAgVG9hc3QgaXMgYSBjb25zdHJ1Y3RvciBmb3IgdG9hc3Qgb2JqZWN0c1xuICAgICAqIFxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBtZXNzYWdlICAgICAgICBbdGV4dCB0aGF0IGdvZXMgd2l0aGluIHRoZSBtZXNzYWdlXVxuICAgICAqIEBwYXJhbSB7SW50ZWdlcn0gdGltZW91dCAgICAgICBbdGltZSBpbiBtaWxsaXNlY29uZHMgdGlsbCB0aW1lb3V0XVxuICAgICAqIEBwYXJhbSB7Q1NTfSBiYWNrZ3JvdW5kICAgICAgICBbYmFja2dyb3VuZCBjb2xvcl1cbiAgICAgKiBAcGFyYW0ge0NTU30gY29sb3IgICAgICAgICAgICAgW3RleHQgY29sb3JdXG4gICAgICogQHBhcmFtIHtDU1N9IGhlaWdodCAgICAgICAgICAgIFt0b2FzdCBoZWlnaHRdXG4gICAgICogQHBhcmFtIHtDU1N9IHdpZHRoICAgICAgICAgICAgIFt0b2FzdCB3aWR0aF1cbiAgICAgKiBAcGFyYW0ge0NTU30gbWFyZ2luICAgICAgICAgICAgW3RvYXN0IG1hcmdpbnNdXG4gICAgICogQHBhcmFtIHtDU1N9IHBhZGRpbmcgICAgICAgICAgIFt0b2FzdCBwYWRkaW5nXVxuICAgICAqIEBwYXJhbSB7Q1NTfSBib3JkZXJfcmFkaXVzICAgICBbdG9hc3QgYm9yZGVyLXJhZGl1c11cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBUb2FzdChtZXNzYWdlLCB0aW1lb3V0LCBiYWNrZ3JvdW5kLCBjb2xvciwgaGVpZ2h0LCB3aWR0aCwgbWFyZ2luLCBwYWRkaW5nLCBib3JkZXJfcmFkaXVzKXtcbiAgICAgIHRoaXMubWVzc2FnZSA9IG1lc3NhZ2U7XG4gICAgICB0aGlzLnRpbWVvdXQgPSB0aW1lb3V0O1xuICAgICAgdGhpcy5iYWNrZ3JvdW5kID0gYmFja2dyb3VuZCB8fCBcIiMzMzNcIjsgLy9kZWZhdWx0IGJhY2tncm91bmQgaXMgZGFyayBncmF5XG4gICAgICB0aGlzLmNvbG9yID0gY29sb3IgfHwgXCIjRkZGXCI7IC8vZGVmYXVsdCB0ZXh0IGNvbG9yIGlzIHdoaXRlXG4gICAgICB0aGlzLmhlaWdodCA9IGhlaWdodCB8fCBcIjMwcHhcIjsgLy9kZWZhdWx0IGhlaWdodCBpcyAzMHB4XG4gICAgICB0aGlzLndpZHRoID0gd2lkdGggfHwgXCJcIjsgLy9kZWZhdWx0IHdpZHRoIGlzIGNvbnRlbnQgc3BlY2lmaWNcbiAgICAgIHRoaXMubWFyZ2luID0gbWFyZ2luIHx8IFwiNXB4IDBweFwiOyAvL2RlZmF1bHQgbWFyZ2lucyBhcmUgb25seSBmb3IgdG9wIGFuZCBib3R0b21cbiAgICAgIHRoaXMucGFkZGluZyA9IHBhZGRpbmcgfHwgXCI1cHggNXB4XCI7Ly9kZWZhdWx0IHBhZGRpbmcgb24gYWxsIGVkZ2VzXG4gICAgICB0aGlzLmJvcmRlcl9yYWRpdXMgPSBib3JkZXJfcmFkaXVzIHx8IFwiMHB4XCI7Ly9kZWZhdWx0IHRvIHNxdWFyZSBlZGdlc1xuICAgIH1cblxuICAgIC8qKiB1bml2ZXJzYWwgbWVtYmVycyAqKi9cbiAgICAkc2NvcGUudG9hc3RzID0gW107IC8vdG9hc3RzIGlzIGEgc3RhY2sgb2YgdG9hc3RzIG1hZGUgYnkgdGhlIHVzZXJcblxuICAgIC8qKlxuICAgICAqICBjb21wYXJlVGltZW91dHMgaXMgdXNlZCB0byBzb3J0IHRoZSBsaXN0IG9mIHRvYXN0cyBieSB0aGUgZXhwaXJhdGlvblxuICAgICAqIFxuICAgICAqIEBwYXJhbSAge1RvYXN0fSBhIFtUb2FzdCBvYmplY3Qgb25lXVxuICAgICAqIEBwYXJhbSAge1RvYXN0fSBiIFtUb2FzdCBvYmplY3QgdHdvXVxuICAgICAqIEByZXR1cm4gezEsIDAsIC0xfSAgIFt0cnVlLCBlcXVhbCwgZmFsc2VdXG4gICAgICovXG4gICAgZnVuY3Rpb24gY29tcGFyZVRpbWVvdXRzKGEsYikge1xuICAgICAgaWYgKGEudGltZW91dCA8IGIudGltZW91dClcbiAgICAgICAgIHJldHVybiAtMTtcbiAgICAgIGlmIChhLnRpbWVvdXQgPiBiLnRpbWVvdXQpXG4gICAgICAgIHJldHVybiAxO1xuICAgICAgcmV0dXJuIDA7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogY2hlY2tUaW1lciBpcyByZXNwb25zaWJsZSBmb3IgcmV0dXJuaW5nIGEgdHJ1ZSBvciBmYWxzZSBkZXBlbmRpbmcgb24gaWYgdGhlIHRpbWVyXG4gICAgICogaGFzIGEgdmFsdWUgb2YgZ3JlYXRlciB0aGFuIDBcbiAgICAgKiBcbiAgICAgKiBAcGFyYW0gIHtUb2FzdH0gdG9hc3QgW3RvYXN0IHRvIGNoZWNrIHRoZSB0aW1lciBvZl1cbiAgICAgKiBAcmV0dXJuIHtCb29sZWFufSAgICAgICBbVHJ1ZSBpZiB0aW1lciBpcyBsZXNzIHRoYW4gMCwgZmFsc2Ugb3RoZXJ3aXNlXVxuICAgICAqL1xuICAgIGZ1bmN0aW9uIGNoZWNrVGltZXIodG9hc3Qpe1xuICAgICAgaWYodG9hc3QudGltZW91dCA+IDApXG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxuICAgICAvKipcbiAgICAgKiB0aW1lVG9hc3QgaXMgcmVzcG9uc2libGUgZm9yIGlzb2xhdGluZyB0aGUgc2NvcGUgb2YgZWFjaCBpbmRpdmlkdWFsIHRvYXN0IGFuZCBcbiAgICAgKiBzZXR0aW5nIHVwIGEgdGltZXIgd2l0aCAkaW50ZXJ2YWwgdGhhdCByZW1vdmVzIDIwMCBtaWxpc2Vjb25kcyBmcm9tIHRoZSB0aW1lclxuICAgICAqIGZvciBlYWNoIGludGVydmFsIG9mIDIwMCBtaWxpc2Vjb25kcyB1bnRpbCB0aGUgdGltZW91dCByZWFjaGVzIDAuXG4gICAgICogXG4gICAgICogQHBhcmFtICB7VG9hc3R9IHRvYXN0IFt0b2FzdCB0byB0aW1lIGZvciByZW1vdmFsXVxuICAgICAqL1xuICAgIGZ1bmN0aW9uIHRpbWVUb2FzdCh0b2FzdCl7XG4gICAgICBzdWJ0cmFjdCA9ICRpbnRlcnZhbChmdW5jdGlvbigpe3RvYXN0LnRpbWVvdXQgPSB0b2FzdC50aW1lb3V0IC0gMjAwO30sIDIwMCwgdG9hc3QudGltZW91dC8yMDApO1xuICAgICAgcmVzdWx0ID0gJGludGVydmFsKGZ1bmN0aW9uKCl7aWYoY2hlY2tUaW1lcih0b2FzdCkpeyRzY29wZS50b2FzdHMuc3BsaWNlKDAsIDEpOyBkZWxldGUgdG9hc3Q7fX0sIDIwMCwgdG9hc3QudGltZW91dC8yMDApXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogYm9zc3lUb2FzdCByZXF1aXJlcyBhIG1lc3NhZ2UgYW5kIHRpbWVvdXQgdG8gY3JlYXRlIGEgbmV3IFRvYXN0IG9iamVjdCBcbiAgICAgKiB3aGljaCBpcyB0aGVuIGFkZGVkIHRvIHRoZSBzdGFjayBvZiB0b2FzdHNcbiAgICAgKiBcbiAgICAgKiBAcGFyYW0gIHtTdHJpbmd9IG1lc3NhZ2UgW01lc3NhZ2UgdG8gdG9hc3RdXG4gICAgICogQHBhcmFtICB7SW50fSB0aW1lb3V0IFtUaW1lIGluIG1zIHRvIGRpc3BsYXkgdG9hc3RdXG4gICAgICovXG4gICAgJHNjb3BlLmJvc3N5VG9hc3QgPSBmdW5jdGlvbihtZXNzYWdlLCB0aW1lb3V0KXtcbiAgICAgIC8vY29uc29sZS5sb2coXCJCZWdpbm5pbmcgVG9hc3RcIik7IC8vIHZlcmlmaWVzIGZ1bmN0aW9uIHdhcyBjYWxsZWQgY29ycmVjdGx5XG4gICAgICBuZXdfdG9hc3QgPSBuZXcgVG9hc3QobWVzc2FnZSwgdGltZW91dCk7XG4gICAgICAvL2NvbnNvbGUubG9nKG5ld190b2FzdCk7IC8vIHNob3dzIHRoZSBkZXRhaWxzIG9mIHRoZSBuZXdseSBjcmVhdGVkIHRvYXN0IG1lc3NhZ2VcbiAgICAgICRzY29wZS50b2FzdHMucHVzaChuZXdfdG9hc3QpOyAvLyBhZGRzIHRoZSB0b2FzdCB0byB0aGUgdG9hc3RsaXN0XG4gICAgICAkc2NvcGUudG9hc3RzLnNvcnQoY29tcGFyZVRpbWVvdXRzKTsgLy8gZmlyc3QgdG9hc3QgdG8gZXhwaXJlIGlzIGF0IHRoZSBib3R0b21cbiAgICAgIC8vY29uc29sZS5sb2coJHNjb3BlLnRvYXN0cyk7ICAvLyBzaG93cyB0aGUgdG9hc3RzIGxpc3QgYmVmb3JlIHRvYXN0IGlzIHJlbW92ZWRcbiAgICAgIC8vIGFsd2F5cyByZW1vdmVzIHRoZSBsb3dlc3QgdGltZSByZW1haW5pbmcgaXRlbVxuICAgICAgdGltZVRvYXN0KG5ld190b2FzdCk7XG4gICAgICAvLyBvdXRwdXRzIGF0IHRoZSBtb21lbnQgdGhlIHRvYXN0IGlzIHJlbW92ZWQgZnJvbSB0aGUgdG9hc3RsaXN0XG4gICAgICAvLyR0aW1lb3V0KGZ1bmN0aW9uKCl7Y29uc29sZS5sb2coXCJFbmRpbmcgVG9hc3RcIil9LCBuZXdfdG9hc3QudGltZW91dCk7IFxuICAgIH07XG4gIH1dKVxuICAuZGlyZWN0aXZlKCd0b2FzdCcsIFtmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHJlc3RyaWN0OiAnQUUnLFxuICAgICAgc2NvcGU6IHtcbiAgICAgICAgdG9hc3Q6ICc9Y29uZmlnJ1xuICAgICAgfSxcbiAgICAgIHRlbXBsYXRlOiAne3t0b2FzdC5tZXNzYWdlfX0ge3t0b2FzdC50aW1lb3V0fX0nXG4gICAgfTtcbiAgfV0pXG4gIC5kaXJlY3RpdmUoJ3RvYXN0ZXInLCBbZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiB7XG4gICAgICByZXN0cmljdDogJ0FFJyxcbiAgICAgIHNjb3BlOiB7XG4gICAgICAgIHRvYXN0czogJz1jb25maWcnXG4gICAgICB9LFxuICAgICAgY29udHJvbGxlcjogJ1RvYXN0ZXJDb250cm9sbGVyJyxcbiAgICAgIHRlbXBsYXRlOiAnPHN0eWxlPi5ib3NzeS10b2FzdGVyIHtib3gtc2l6aW5nOiBib3JkZXItYm94OyBwb3NpdGlvbjogcmVsYXRpdmU7IGJvdHRvbTogNTBweDsgbWFyZ2luOiAwIGF1dG87d2lkdGg6IDMwMHB4O2Rpc3BsYXk6IGJsb2NrO30uYm9zc3ktdG9hc3QgeyBib3gtc2l6aW5nOiBib3JkZXItYm94OyBwb3NpdGlvbjogcmVsYXRpdmU7IGhlaWdodDogMzBweDsgcGFkZGluZzogNnB4IDEwcHg7IG1hcmdpbjogNXB4IDBweDsgYmFja2dyb3VuZDogIzIyMjsgY29sb3I6ICNGRkY7ZGlzcGxheTogYmxvY2s7dHJhbnNpdGlvbjogYWxsIC4zcyBlYXNlLW91dDt0ZXh0LWFsaWduOiBjZW50ZXI7Ym9yZGVyLXJhZGl1czogMTVweDt9LmJvc3N5LXRvYXN0Lm5nLWVudGVyLmVudGVyLWFjdGl2ZSwgLmJvc3N5LXRvYXN0Lm5nLWxlYXZlIHsgdHJhbnNmb3JtOiBzY2FsZSgxKTsgfS5ib3NzeS10b2FzdC5uZy1sZWF2ZS5uZy1sZWF2ZS1hY3RpdmUsIC5ib3NzeS10b2FzdC5uZy1lbnRlciB7IHRyYW5zZm9ybTogc2NhbGUoMCk7IH0gPC9zdHlsZT48aDE+VG9hc3QgVGVzdDwvaDE+VG9hc3QgTWVzc2FnZTxpbnB1dCBuZy1tb2RlbD1cInRvYXN0TWVzc2FnZVwiPlRvYXN0IFRpbWVyIChtcyk8aW5wdXQgdHlwZT1cIm51bWJlclwiIG5nLW1vZGVsPVwidG9hc3RUaW1lXCI+PGJ1dHRvbiBuZy1jbGljaz1cImJvc3N5VG9hc3QodG9hc3RNZXNzYWdlLCB0b2FzdFRpbWUpXCI+Q2xpY2sgZm9yIHRvYXN0PC9idXR0b24+PGRpdiBjbGFzcz1cImJvc3N5LXRvYXN0ZXJcIj48dG9hc3QgbmctcmVwZWF0PVwidG9hc3QgaW4gb2FzdHNcIiBjb25maWc9XCJ0b2FzdFwiIGNsYXNzPVwiYm9zc3ktdG9hc3RcIj48L3RvYXN0PjwvZGl2PidcbiAgICB9O1xuICB9XSk7XG5cbiIsImFuZ3VsYXIubW9kdWxlKCdib3NzeS50b29sdGlwJywgW10pXG4gICAgLmRpcmVjdGl2ZSgnYm9zc3lUb29sdGlwJywgZnVuY3Rpb24oKSB7XG4gICAgXG4gICAgICAgIC8vIFByaXZhdGUgbWVtYmVyIGFycmF5IGNvbnRhaW5pbmcgYWxsIGtub3duIHBvc2l0aW9uc1xuICAgICAgICBfcG9zID0gWyduJywnbmUnLCdlJywnc2UnLCdzJywnc3cnLCd3JywnbncnXTtcbiAgICAgICAgXG4gICAgICAgIC8vIE1vdmUgdGhlIHRpcCB0byBhIGNlcnRhaW4gcG9zaXRpb25cbiAgICAgICAgZnVuY3Rpb24gX21vdmVUaXAoJHBhcmVudCwgJHRpcCwgY3VyUG9zKVxuICAgICAgICB7XG4gICAgICAgICAgICBpZihjdXJQb3MgPT0gJ24nKVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICR0aXAuc3R5bGUubGVmdCA9ICRwYXJlbnQub2Zmc2V0TGVmdCArICgkcGFyZW50Lm9mZnNldFdpZHRoIC8gMikgLSAoJHRpcC5vZmZzZXRXaWR0aCAvIDIpICsgJ3B4JztcbiAgICAgICAgICAgICAgICAkdGlwLnN0eWxlLnRvcCA9ICRwYXJlbnQub2Zmc2V0VG9wIC0gJHRpcC5vZmZzZXRIZWlnaHQgKyAncHgnO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZihjdXJQb3MgPT0gJ25lJylcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAkdGlwLnN0eWxlLmxlZnQgPSAkcGFyZW50Lm9mZnNldExlZnQgKyAkcGFyZW50Lm9mZnNldFdpZHRoICsgJ3B4JztcbiAgICAgICAgICAgICAgICAkdGlwLnN0eWxlLnRvcCA9ICRwYXJlbnQub2Zmc2V0VG9wIC0gJHRpcC5vZmZzZXRIZWlnaHQgKyAncHgnO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZihjdXJQb3MgPT0gJ2UnKVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICR0aXAuc3R5bGUubGVmdCA9ICRwYXJlbnQub2Zmc2V0TGVmdCArICRwYXJlbnQub2Zmc2V0V2lkdGggKyAncHgnO1xuICAgICAgICAgICAgICAgICR0aXAuc3R5bGUudG9wID0gJHBhcmVudC5vZmZzZXRUb3AgKyAoJHBhcmVudC5vZmZzZXRIZWlnaHQgLyAyKSAtICgkdGlwLm9mZnNldEhlaWdodCAvIDIpICsgJ3B4JztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYoY3VyUG9zID09ICdzZScpXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgJHRpcC5zdHlsZS5sZWZ0ID0gJHBhcmVudC5vZmZzZXRMZWZ0ICsgJHBhcmVudC5vZmZzZXRXaWR0aCArICdweCc7XG4gICAgICAgICAgICAgICAgJHRpcC5zdHlsZS50b3AgPSAkcGFyZW50Lm9mZnNldFRvcCArICRwYXJlbnQub2Zmc2V0SGVpZ2h0ICsgJ3B4JztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYoY3VyUG9zID09ICdzJylcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAkdGlwLnN0eWxlLmxlZnQgPSAkcGFyZW50Lm9mZnNldExlZnQgKyAoJHBhcmVudC5vZmZzZXRXaWR0aCAvIDIpIC0gKCR0aXAub2Zmc2V0V2lkdGggLyAyKSArICdweCc7XG4gICAgICAgICAgICAgICAgJHRpcC5zdHlsZS50b3AgPSAkcGFyZW50Lm9mZnNldFRvcCArICRwYXJlbnQub2Zmc2V0SGVpZ2h0ICsgJ3B4JztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYoY3VyUG9zID09ICdzdycpXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgJHRpcC5zdHlsZS5sZWZ0ID0gJHBhcmVudC5vZmZzZXRMZWZ0IC0gJHRpcC5vZmZzZXRXaWR0aCArICdweCc7XG4gICAgICAgICAgICAgICAgJHRpcC5zdHlsZS50b3AgPSAkcGFyZW50Lm9mZnNldFRvcCArICRwYXJlbnQub2Zmc2V0SGVpZ2h0ICsgJ3B4JztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYoY3VyUG9zID09ICd3JylcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAkdGlwLnN0eWxlLmxlZnQgPSAkcGFyZW50Lm9mZnNldExlZnQgLSAkdGlwLm9mZnNldFdpZHRoICsgJ3B4JztcbiAgICAgICAgICAgICAgICAkdGlwLnN0eWxlLnRvcCA9ICRwYXJlbnQub2Zmc2V0VG9wICsgKCRwYXJlbnQub2Zmc2V0SGVpZ2h0IC8gMikgLSAoJHRpcC5vZmZzZXRIZWlnaHQgLyAyKSArICdweCc7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgJHRpcC5zdHlsZS5sZWZ0ID0gJHBhcmVudC5vZmZzZXRMZWZ0IC0gJHRpcC5vZmZzZXRXaWR0aCArICdweCc7XG4gICAgICAgICAgICAgICAgJHRpcC5zdHlsZS50b3AgPSAkcGFyZW50Lm9mZnNldFRvcCAtICR0aXAub2Zmc2V0SGVpZ2h0ICsgJ3B4JztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgLy8gQ2hlY2sgdG8gc2VlIGlmIHRoZSB0aXAgaXMgd2l0aGluIHRoZSB3aW5kb3dcbiAgICAgICAgZnVuY3Rpb24gX2NoZWNrUG9zKCR0aXApXG4gICAgICAgIHtcbiAgICAgICAgICAgIHZhciByZWN0ID0gJHRpcC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICByZWN0LnRvcCA+PSAwICYmXG4gICAgICAgICAgICAgICAgcmVjdC5sZWZ0ID49IDAgJiZcbiAgICAgICAgICAgICAgICByZWN0LmJvdHRvbSA8PSAod2luZG93LmlubmVySGVpZ2h0IHx8IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGllbnRIZWlnaHQpICYmXG4gICAgICAgICAgICAgICAgcmVjdC5yaWdodCA8PSAod2luZG93LmlubmVyV2lkdGggfHwgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsaWVudFdpZHRoKVxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICByZXN0cmljdDogJ0UnLFxuICAgICAgICAgICAgc2NvcGU6IHtcbiAgICAgICAgICAgICAgICBjb25maWc6IFwiPVwiXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgcmVwbGFjZTogdHJ1ZSxcbiAgICAgICAgICAgIGxpbms6IGZ1bmN0aW9uKHNjb3BlLCBlbGVtZW50LCBhdHRycykge1xuICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgLy8gSWYgdGhlIHVzZXIgZG9lc24ndCBwcm92aWRlIGVzc2VudGlhbCBpbmZvcm1hdGlvbiwgZXJyb3Igb3V0XG4gICAgICAgICAgICAgICAgaWYoIXNjb3BlLmNvbmZpZy50aXRsZSB8fCAhc2NvcGUuY29uZmlnLmJvZHkpXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKFwiRXJyb3I6IE5vIHRpdGxlIG9yIGJvZHkgaW5mb3JtYXRpb24gcHJvdmlkZWQuXCIpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gMTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgLy8gSWYgdGhlIHVzZXIgZG9lc24ndCBwcm92aWRlIGEgcG9zaXRpb24sIGRlZmF1bHQgJ25vcnRoJ1xuICAgICAgICAgICAgICAgIGlmKCFzY29wZS5jb25maWcucG9zaXRpb24gfHwgdHlwZW9mIHNjb3BlLmNvbmZpZy5wb3NpdGlvbiAhPT0gJ3N0cmluZycgfHwgX3Bvcy5pbmRleE9mKHNjb3BlLmNvbmZpZy5wb3NpdGlvbikgPCAwKVxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgc2NvcGUuY29uZmlnLnBvc2l0aW9uID0gJ24nO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAvLyBDcmVhdGUgdGlwIGVsZW1lbnRcbiAgICAgICAgICAgICAgICB2YXIgJHRpcCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIC8vIEFwcGVuZCB0byBET01cbiAgICAgICAgICAgICAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKCR0aXApO1xuICAgICAgICAgICAgICAgICR0aXAuc3R5bGUucG9zaXRpb24gPSAnYWJzb2x1dGUnO1xuICAgICAgICAgICAgICAgICR0aXAuaW5uZXJIVE1MID0gJzxzcGFuPicrIHNjb3BlLmNvbmZpZy50aXRsZSArJzwvc3Bhbj48ZGl2PicrIHNjb3BlLmNvbmZpZy5ib2R5ICsnPC9kaXY+JztcbiAgICAgICAgICAgICAgICAkdGlwLmNsYXNzTmFtZSA9ICdib3NzeVRvb2x0aXAnO1xuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIC8vIERpc2FibGUgYnJvd3NlcidzIHRvb2x0aXBcbiAgICAgICAgICAgICAgICBlbGVtZW50WzBdLnRpdGxlID0gJyc7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coZWxlbWVudCk7XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgdmFyIGkgPSAwO1xuICAgICAgICAgICAgICAgIGRvXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBsb2NrZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICBfbW92ZVRpcChlbGVtZW50WzBdLCAkdGlwLCBzY29wZS5jb25maWcucG9zaXRpb24pO1xuICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgLy8gQ29udGludWUgdG8gbG9vcCBpZiAkdGlwIGlzIGNsaXBwZWRcbiAgICAgICAgICAgICAgICAgICAgaWYoIV9jaGVja1BvcygkdGlwKSlcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgbG9ja2VkID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIFdyYXAgYXJvdW5kIGFycmF5IGlmIHRoZSBlbmQgaXMgaGl0XG4gICAgICAgICAgICAgICAgICAgICAgICBpZihzY29wZS5jb25maWcucG9zaXRpb24gPT0gJ253JylcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzY29wZS5jb25maWcucG9zaXRpb24gPSAnbic7XG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2NvcGUuY29uZmlnLnBvc2l0aW9uID0gX3Bvc1tfcG9zLmluZGV4T2Yoc2NvcGUuY29uZmlnLnBvc2l0aW9uKSArIDFdO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICBpZihpID09IDgpXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICsraTtcbiAgICAgICAgICAgICAgICB9IHdoaWxlKGxvY2tlZCA9PSBmYWxzZSk7XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgLy8gSGlkZSBpdCB1bnRpbCBtb3VzZSBldmVudFxuICAgICAgICAgICAgICAgICR0aXAuc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAvLyBNb3VzZSBldmVudHNcbiAgICAgICAgICAgICAgICBlbGVtZW50Lm9uKCdtb3VzZWVudGVyJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgICR0aXAuc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAub24oJ21vdXNlbGVhdmUnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgJHRpcC5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgfSk7Il0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9