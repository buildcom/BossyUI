'use strict';

var directiveModule = angular.module('multiselect-dropdown', []) //new module for directive

            .directive('ngMultiselect', [function () { //custom directive with name "ngMultiselect !!!CamelCase

        return { //properties
            replace: false,
            restrict: 'A',
            scope: {
                selectedModel: '=',
                options: '=',
                extraSettings: '='
            },
            template: function (element, attrs) { //template used for dropdown multiselect
                var checkboxes = attrs.checkboxes ? true : false;
                var groups = attrs.groupBy ? true : false; //all options declared in app.js (choices)

                var template = '<div class="btn-group">' +
                               '<button type="button" ng-class="settings.buttonClasses" ng-click="dropdownToggle()">{{getButtonText()}}<i class="caret"></i></button>' +
                               '<ul class="dropdown-menu" ng-style="{display: open ? \'block\' : \'none\'}" style="cursor:pointer;" >' +
                               '<li ng-hide="!settings.showSelectAll || settings.selectionLimit > 0" style="cursor:pointer;"><a data-ng-click="selectAll()"><span class="glyphicon glyphicon-ok-circle"></span><span style="font-weight: bold">{{texts.selectAll}}</span></a>' +
                               '<li ng-show="settings.showDeselectAll" style="cursor:pointer;"><a data-ng-click="deselectAll();"><span class="glyphicon glyphicon-remove-circle"></span><span style="font-weight: bold">{{texts.deselectAll}}</span></a></li>' + '<hr>';

                if (groups) {
                    template += '<li ng-repeat-start="option in orderedItems" ng-show="getPropertyForObject(option, settings.groupBy) !== getPropertyForObject(orderedItems[$index - 1], settings.groupBy)" role="presentation" class="dropdown-header">{{ getGroupTitle(getPropertyForObject(option, settings.groupBy)) }}</li>';
                    template += '<li ng-repeat-end role="presentation">';
                } else {
                    template += '<li role="presentation" ng-repeat="option in options">';
                }

                template += '<a role="menuitem" tabindex="-1" ng-click="setSelectedItem(getPropertyForObject(option,settings.idProp))">' +
                            '<span data-ng-class="{\'glyphicon glyphicon-ok\': isChecked(getPropertyForObject(option,settings.idProp))}"></span> {{getPropertyForObject(option, settings.display)}}</a>' +
                            '</li>' +
                            '<li class="divider" ng-show="settings.selectionLimit > 1"></li>' +
                            '<li role="presentation" ng-show="settings.selectionLimit > 1"><a role="menuitem">{{selectedModel.length}} {{texts.selectionOf}} {{settings.selectionLimit}} {{texts.selectionCount}}</a></li>' +
                            '</ul>' +
                            '</div>';

                element.html(template);
            },

            link: function ($scope, $element, $attrs) { //all functions for multiselect
                var $dropdownTrigger = $element.children()[0];

                $scope.dropdownToggle = function () {
                    $scope.open = !$scope.open; //if open -> close, if close -> open
                };

                $scope.events = { //events for links
                    onItemSelect: angular.noop, //single item select
                    onItemDeselect: angular.noop,
                    onSelectAll: angular.noop, //all item select
                    onDeselectAll: angular.noop
                };

                $scope.settings = { //settings for dropdown
                    dynamicTitle: true, //if false -> no change after selection
                    display: 'name', //see choices in app.js
                    idProp: 'id',
                    externalIdProp: 'id',
                    selectionLimit: 0, //enter amount of selection limit (also possible in app.js)
                    showSelectAll: true,
                    showDeselectAll: true,
                    buttonClasses: 'btn btn-default' //set up classes used for buttons (bootstrap)
                };

                $scope.texts = { //all texts used
                    selectAll: 'All',
                    deselectAll: 'None',
                    selectionCount: 'selected',
                    selectionOf: '/',
                    defaultButtonText: 'Make Selection',
                    dynamicButtonTextSuffix: 'selected'
                };

                angular.extend($scope.settings, $scope.extraSettings || []); //extend application with extra settings (selection limiter etc.)

                function getFindObj(id) { //option-selection via id (->app.js, choices)
                    var findObj = {};

                    if ($scope.settings.externalIdProp === '') {
                        findObj[$scope.settings.idProp] = id;
                    } else {
                        findObj[$scope.settings.externalIdProp] = id;
                    }

                    return findObj;
                }

                $scope.getButtonText = function () { //set up of dynamic button text
                    if ($scope.settings.dynamicTitle && ($scope.selectedModel.length > 0 || (angular.isObject($scope.selectedModel) && _.keys($scope.selectedModel).length > 0))) {
                        if ($scope.settings.smartButtonMaxItems > 0) {
                            var itemsText = [];

                            angular.forEach($scope.options, function (optionItem) {
                                if ($scope.isChecked($scope.getPropertyForObject(optionItem, $scope.settings.idProp))) {
                                    var displayText = $scope.getPropertyForObject(optionItem, $scope.settings.display);
                                    var converterResponse = $scope.settings.smartButtonTextConverter(displayText, optionItem);

                                    itemsText.push(converterResponse ? converterResponse : displayText);
                                }
                            });

                            if ($scope.selectedModel.length > $scope.settings.smartButtonMaxItems) {
                                itemsText = itemsText.slice(0, $scope.settings.smartButtonMaxItems);
                                itemsText.push('...');
                            }

                            return itemsText.join(', ');
                        } else {
                            var totalSelected;

                            if ($scope.singleSelection) {
                                totalSelected = ($scope.selectedModel !== null && angular.isDefined($scope.selectedModel[$scope.settings.idProp])) ? 1 : 0;
                            } else {
                                totalSelected = angular.isDefined($scope.selectedModel) ? $scope.selectedModel.length : 0;
                            }

                            if (totalSelected === 0) {
                                return $scope.texts.defaultButtonText;
                            } else {
                                return totalSelected + ' ' + $scope.texts.dynamicButtonTextSuffix;
                            }
                        }
                    } else {
                        return $scope.texts.defaultButtonText;
                    }
                };

                $scope.getPropertyForObject = function (object, property) { //set up object properties
                    if (angular.isDefined(object) && object.hasOwnProperty(property)) {
                        return object[property];
                    }

                    return '';
                };

                $scope.selectAll = function () { //set up select all function
                    $scope.deselectAll(false);
                    $scope.events.onSelectAll();

                    angular.forEach($scope.options, function (value) {
                        $scope.setSelectedItem(value[$scope.settings.idProp], true);
                    });
                };

                $scope.deselectAll = function (sendEvent) { //set up deselect all function
                    sendEvent = sendEvent || true;

                    if (sendEvent) {
                        $scope.events.onDeselectAll();
                    }

                    if ($scope.singleSelection) {
                        clearObject($scope.selectedModel);
                    } else {
                        $scope.selectedModel.splice(0, $scope.selectedModel.length);
                    }
                };

                $scope.setSelectedItem = function (id, dontRemove) { //set up select item
                    var findObj = getFindObj(id);
                    var finalObj = null;

                    if ($scope.settings.externalIdProp === '') {
                        finalObj = _.find($scope.options, findObj);
                    } else {
                        finalObj = findObj;
                    }

                    dontRemove = dontRemove || false;

                    var exists = _.findIndex($scope.selectedModel, findObj) !== -1;

                    if (!dontRemove && exists) {
                        $scope.selectedModel.splice(_.findIndex($scope.selectedModel, findObj), 1);
                        $scope.events.onItemDeselect(findObj);
                    } else if (!exists && ($scope.settings.selectionLimit === 0 || $scope.selectedModel.length < $scope.settings.selectionLimit)) {
                        $scope.selectedModel.push(finalObj);
                        $scope.events.onItemSelect(finalObj);
                    }
                };

                $scope.isChecked = function (id) {
                    if ($scope.singleSelection) {
                        return $scope.selectedModel !== null && angular.isDefined($scope.selectedModel[$scope.settings.idProp]) && $scope.selectedModel[$scope.settings.idProp] === getFindObj(id)[$scope.settings.idProp];
                    }
                    return _.findIndex($scope.selectedModel, getFindObj(id)) !== -1;
                };

            }
        };
    }]);
