angular.module('app.directive.bossy.slider', [])
    .controller('SliderController', ['$scope', function ($scope) {
        $scope.value = 5;
        $scope.max = 9;
        $scope.min = 1;
        $scope.string = "----o----";
        $scope.slider = ['-', '-', '-', '-', 'o', '-', '-', '-', '-'];

        //checks bounds when attempting to increase the value
        $scope.increase = function () {
            if ($scope.value < $scope.max) {
                $scope.slider[$scope.value - 1] = '-';
                $scope.value = $scope.value + 1;
                $scope.slider[$scope.value - 1] = 'o';
            }
            $scope.getstring();
        };

        //This function is to bind the decrease and increase function with the arrow keys
        $scope.keyBind = function (ev) {
            $scope.pressed = ev.which;
            //If arrow key(Left or Down) is pressed then call the decrease() function to decrease the value.
            if ($scope.pressed === 37 || $scope.pressed === 40) {
                $scope.decrease();
            }
            //same as above but for Up or Right to increase the value.
            if ($scope.pressed === 38 || $scope.pressed === 39) {
                $scope.increase();
            }
        };
        //checks bounds when attempting to decrease the value
        $scope.decrease = function () {
            if ($scope.value > $scope.min) {
                $scope.slider[$scope.value - 1] = '-';
                $scope.value = $scope.value - 1;
                $scope.slider[$scope.value - 1] = 'o';
            }
            $scope.getstring();
        };
        $scope.getstring = function () {  //function takes the slider array and creates a string of the contents. 
            $scope.string = "";
            //changed to the angular forEach loop for readability
            angular.forEach($scope.slider, function (item) {
                $scope.string += item;
            })

        };

    }]).directive('bossySlider', function () {
        return {
            restrict: 'AE',
            controller: 'SliderController',
            template: '<button ng-click="decrease()" ng-keydown="keyBind($event)">-</button><span>{{string}}</span><button ng-click="increase()" ng-keydown="keyBind($event)">+</button><p>The value is {{value}}!</p>',
            scope: {
            }
        }
    });