var app = angular.module("comboboxApp", []);

app.controller('CheckCtrl', function($scope) {

    $scope.choices = ['Noodles', 'Soup', 'Chicken', 'Salad'];

    $scope.name = {choices: []};

    $scope.selectAll = function() {
        $scope.name.choices = angular.copy($scope.choices);
    };

    $scope.deselectAll = function() {
        $scope.name.choices = [];
    };

});

app.controller('CascadingCtrl', function($scope) {

    $scope.choices = {
        'USA': {
            'California': ['San Diego', 'San Francisco', 'Las Vegas'],
            'Oregon': ['Salem', 'Portland', 'Eugene'],
            'New York': ['Albany', 'New York City', 'Rochester']
        },
        'Canada': {
            'Québec': ['Montreal', 'Québec', 'Laval'],
            'Ontario': ['Toronto', 'Ottawa', 'Brampton'],
            'Alberta': ['Calgary', 'Edmonton', 'Red Deer']
        },
        'Mexico': {
            'Jalisco': ['Guadalajara', 'Nayarit', 'Lagos de Moreno'],
            'Puebla': ['Puebla', 'Atlixco', 'Cholula'],
            'Veracruz': ['Veracruz', 'Las Bajadas']
        }
    };

})

app.controller('MultiCtrl', function($scope) {
    $scope.choices = [{name: 'Chicken'},
                      {name: 'Beef'}
    ];
    $scope.selectedChoice = [];

})

app.factory('optionParser', ['$parse', function ($parse) {

    var TYPEAHEAD_REGEXP = /^\s*(.*?)(?:\s+as\s+(.*?))?\s+for\s+(?:([\$\w][\$\w\d]*))\s+in\s+(.*)$/;

    return {
        parse: function (input) {

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

app.directive('bossyCheckboxMultiselect', ['$parse', '$compile', function($parse, $compile) {

    return {
        restrict: 'AE',
        scope: true,
        compile: function(tElement, tAttrs) {
            tElement.attr('ng-model', 'checked');
            tElement.removeAttr('bossy-checkbox-multiselect');
            return watch;
        }
    };

    function addChoice (arr, item) {
        arr = angular.isArray(arr) ? arr : [];
        for (var i = 0; i < arr.length; i++) {
            if (angular.equals(arr[i], item)) {
                return arr;
            }
        }
        arr.push(item);
        return arr;
    }

    function removeChoice(arr, item) {
        if (angular.isArray(arr)) {
            for (var i = 0; i < arr.length; i++) {
                if (angular.equals(arr[i], item)) {
                    arr.splice(i, 1);
                    break;
                }
            }
        }
        return arr;
    }

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

    function watch(scope, elem, attrs) {

        $compile(elem)(scope);

        var getter = $parse(attrs.bossyCheckboxMultiselect);
        var setter = getter.assign;

        var value = $parse(attrs.bossyListValue)(scope.$parent);

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

        scope.$parent.$watch(attrs.bossyCheckboxMultiselect, function(newArr) {
            scope.checked = containCheckbox (newArr, value);
        }, true);
    }
}]);

app.directive('bossyMultiselect',

    function ($document, $compile, optionParser) {
        return {
            restrict: 'E',
            require: 'ngModel',
            link: function (originalScope, element, attrs, modelCtrl) {

                var exp = attrs.options,
                    parsedResult = optionParser.parse(exp),
                    isMultiple = attrs.multiple ? true : false,
                    scope = originalScope.$new(),
                    changeHandler = attrs.change || anguler.noop;

                scope.items = [];
                scope.multiple = isMultiple;

                var popUpEl = angular.element('<bossy-multiselect-popup></bossy-multiselect-popup>');

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

                element.append($compile(popUpEl)(scope));

                function selectMultiple(item) {
                    item.checked = !item.checked;
                    setModelValue(true);
                }

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

                scope.checkAll = function () {
                    if (!isMultiple) return;
                    angular.forEach(scope.items, function (item) {
                        item.checked = true;
                    });
                    setModelValue(true);
                };

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

app.directive('bossyMultiselectPopup', ['$document', function ($document) {
    return {
        restrict: 'E',
        scope: false,
        replace: true,
        templateUrl: 'multiselect.tmpl.html',
        link: function (scope, element, attr) {

        }
    }
}]);