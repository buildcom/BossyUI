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

                var popUpEl = angular.element('<multiselect-popup></multiselect-popup>');

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

app.directive('multiselectPopup', ['$document', function ($document) {
    return {
        restrict: 'E',
        scope: false,
        replace: true,
        templateUrl: 'multiselect.tmpl.html',
        link: function (scope, element, attr) {

        }
    }
}]);