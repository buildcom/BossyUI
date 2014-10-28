var app = angular.module('myApp', []);

app.controller('AppCtrl', function($scope) {
    $scope.choices = [
                      {id:1, name: 'Option A'},
                      {id:2, name: 'Option B'},
                      {id:3, name: 'Option C'}
                     ];
    $scope.selectedChoice = [];
});

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

app.directive('multiselect',

        function ($parse, $document, $compile, optionParser) {
            return {
                restrict: 'E',
                require: 'ngModel',
                link: function (originalScope, element, attrs, modelCtrl) {

                    var exp = attrs.options,
                        parsedResult = optionParser.parse(exp),
                        isMultiple = attrs.multiple ? true : false,
                        required = false,
                        scope = originalScope.$new(),
                        changeHandler = attrs.change || anguler.noop;

                    scope.items = [];
                    scope.header = 'Make selection';
                    scope.multiple = isMultiple;
                    scope.disabled = false;

                    var popUpEl = angular.element('<multiselect-popup></multiselect-popup>');

                    function parseModel() {
                        scope.items.length = 0;
                        var model = parsedResult.source(originalScope);
                        if(!angular.isDefined(model)) return;
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
                        var value;

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
                            scope.toggleSelect();
                        } else {
                            selectMultiple(item);
                        }
                    }
                }
            };
        })

app.directive('multiselectPopup', ['$document', function ($document) {
        return {
            restrict: 'E',
            scope: false,
            replace: true,
            templateUrl: 'multiselect.tmpl.html',
            link: function (scope, element, attrs) {

                scope.toggleSelect = function () {
                    if (element.hasClass('open')) {
                        element.removeClass('open');
                        $document.unbind('click', clickHandler);
                    } else {
                        element.addClass('open');
                        $document.bind('click', clickHandler);
                        scope.focus();
                    }
                };

                function clickHandler(event) {
                    if (elementMatchesAnyInArray(event.target, element.find(event.target.tagName)))
                        return;
                    element.removeClass('open');
                    $document.unbind('click', clickHandler);
                    scope.$apply();
                }

                var elementMatchesAnyInArray = function (element, elementArray) {
                    for (var i = 0; i < elementArray.length; i++)
                        if (element == elementArray[i])
                            return true;
                    return false;
                }
            }
        }
    }]);