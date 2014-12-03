var app = angular.module("bossy.combobox.checkboxMultiselect", []);

app.controller('AppCtrl', function($scope) {

    $scope.choices = ['Option A', 'Option B', 'Option C', 'Option D'];

    $scope.name = {choices: []};

    $scope.selectAll = function() {
        $scope.name.choices = angular.copy($scope.choices);
    };

    $scope.deselectAll = function() {
        $scope.name.choices = [];
    };

});

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