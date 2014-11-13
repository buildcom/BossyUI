/*This is a slider widget created in angular as part of the BossyUI widgets.
 * The easiest way to use the slider is to include it in your HTML and then
 * create a tag <bossy-slider></bossy-slider>. This widget take in several
 * ways to customize. Currently it takes max, min, and orientation. It is
 * expected to take color and button color. ex.
 * <bossy-slider max="20" min="-5" orientation="vertical"></bossy-slider>*/
///////////////////////////////////////////////////////////////////////////////////////////////////////////////

angular.module('app.directive.bossy.slider', [])
    .controller('SliderController', ['$scope', '$sce', function ($scope, $sce) {


        //these are our default values and are the variables that can be changed by user of our widgets
        $scope.max = 10;
        $scope.min = 1;
        $scope.orientation = "horizontal";
        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////

        //"Art" for a bar piece
        $scope.barPiece = '<div style="display:inline-block;width:10px;height:3px;background-color:blue;margin-bottom:4px"></div>';
        //"Art" for a slider button offset
        $scope.slideOff = '<div style="display:inline-block;width:10px;height:3px;background-color:lightgrey;margin-bottom:4px"></div>';
        //"Art" for a slider button
        $scope.slideBut = '<div style="display:inline-block;width:10px;height:10px;background-color:red;border-radius:50%;"></div>';

        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////

        //as it is named it is used to maintain correct alignment with the slider bar array
        var offSet;
        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////

        /*makeBar()
         * This initializes the array that keeps track of all the pieces of the slider,
         * it initializes the off-set used to map the sliders value to the correct position
         * in the array*/
        $scope.makeBar = function () {
            var constructSlider = [];
            offSet = $scope.min - 1;
            //button should show up in the middle now or close to if uneven
            $scope.value = parseInt(($scope.max + $scope.min) / 2);
            if ($scope.orientation === "vertical") {
                $scope.barPiece = '<div style="margin-left:9px;width:3px;height:10px;background-color:blue;"></div>';
                $scope.slideBut = '<div style="margin-left:5px;width:10px;height:10px;background-color:red;border-radius:50%;"></div>';
                $scope.slideOff = '<div style="margin-left:9px;width:3px;height:10px;background-color:lightgrey;"></div>';
            }
            for (var current = $scope.min; current <= $scope.max; current++) {
                if (current < ($scope.value)) {
                    constructSlider.push($scope.barPiece);
                }
                if (current > ($scope.value)) {
                    constructSlider.push($scope.slideOff);
                }
                if (current == ($scope.value)) {
                    constructSlider.push($scope.slideBut);
                }
            }
            return constructSlider;
        };
        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////

        /*renderHTML(string)
         * This take a string in the format of HTML and validates it for use as HTML*/
        $scope.renderHtml = function (html_code) {
            return $sce.trustAsHtml(html_code);
        };
        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////

        /*increase()
         * This checks bounds when attempting to increase the value and moves the position
         * of the slider button and updates the value.*/
        $scope.increase = function () {
            if ($scope.value < $scope.max) {
                $scope.slider[$scope.value - offSet - 1] = $scope.barPiece;
                $scope.value = $scope.value + 1;
                $scope.slider[$scope.value - offSet - 1] = $scope.slideBut;
            }
            $scope.draw();
        };
        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////

        /*decrease()
         * This checks bounds when attempting to decrease the value and moves the position
         * of the slider button and updates the value.*/
        $scope.decrease = function () {
            if ($scope.value > $scope.min) {
                $scope.slider[$scope.value - offSet - 1] = $scope.slideOff;
                $scope.value = $scope.value - 1;
                $scope.slider[$scope.value - offSet - 1] = $scope.slideBut;
            }
            $scope.draw();
        };
        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////

        /*keyBind($event)
         * This function is to bind the decrease and increase function with the arrow keys*/
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
        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////
        /*draw()
         * This function takes the slider array and creates a string of the contents. So it can be rendered
         * in HTML.*/
        $scope.draw = function () {
            $scope.string = "";
            if ($scope.orientation === "vertical")
                $scope.slider.reverse();

            //changed to the angular forEach loop for readability
            angular.forEach($scope.slider, function (item) {
                $scope.string += item;
            })

            if ($scope.orientation === "vertical")
                $scope.slider.reverse();

            //this should allow the programmer access to this value outside the slider controller
            $scope.ngModel = $scope.value;
            return $scope.string;
        };
        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////

    }]).directive('bossySlider', function () {
        return {
            //allows the slider to be created as and attribute or element <bossy-slider><bossy-slider>
            restrict: 'AE',
            controller: 'SliderController',
            //This is the template the slider form takes and inserts into HTML
            template: '<button ng-click="decrease()" ng-keydown="keyBind($event)">-</button><span ng-bind-html="renderHtml(string)"></span><button ng-click="increase()" ng-keydown="keyBind($event)">+</button>',
            scope: {
                ngModel: '='
            },
            //This allows us to pull input from the elements attributes
            link: function (scope, iElem, iAttr) {
                //checks to see if there is a max attribute
                if (iAttr.max) {
                    scope.max = parseInt(iAttr.max);
                }
                //checks to see if there is a min attribute
                if (iAttr.min) {
                    scope.min = parseInt(iAttr.min);
                }
                //checks to see if there is a orientation attribute
                if (iAttr.orientation) {
                    scope.orientation = iAttr.orientation;
                }
                scope.slider = scope.makeBar();
                scope.draw();
            }
        }
    });