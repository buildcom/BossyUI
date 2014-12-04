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