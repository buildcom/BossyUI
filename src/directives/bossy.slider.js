/*This is a slider widget created in angular as part of the BossyUI widgets.
 * The easiest way to use the slider is to include it in your HTML and then
 * create a tag <bossy-slider></bossy-slider>. This widget take in several
 * ways to customize. Currently it takes max, min, and orientation. It is
 * expected to take color and button color. ex.
 * <bossy-slider max="20" min="-5" orientation="vertical"></bossy-slider>*/
///////////////////////////////////////////////////////////////////////////////////////////////////////////////

angular.module('app.directive.bossy.slider', [])
    .controller('SliderController', ['$scope', function ($scope) {


        //these are our default values and are the variables that can be changed by user of our widgets
        $scope.max = 10;
        $scope.min = 1;
        $scope.fillWidth = 0;
        $scope.emptWidth = 0;

        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////

        /*makeBar()
         * This creates the initial graphic of the slider and ensures it is in the correct order*/
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
         * of the slider button and updates the value.*/
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

        /*decrease()
         * This checks bounds when attempting to decrease the value and moves the position
         * of the slider button and updates the value.*/
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
            return;
        };
        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////

        /*drag()
         * This function is to allow the slider button to slide and update the value when released*/
        $scope.drag = function () {
            alert("drag");
            return;
        };
        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////

        /*barClick()
         * This function is to allow the value to be changed when clicking on the bar*/
        $scope.barClick = function () {
            alert("bar click");
            return;
        };
        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////


    }]).directive('bossySlider', function ($compile) {
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
            link: function (scope, iElem, iAttr) {

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
                scope.barfillcolor = "#0000FF";
                if (iAttr.barfillcolor) {
                    var pattern = /^#[0-9a-fA-F]{6}$/; //currently accepts lower case a-f
                    if (pattern.test(iAttr.barfillcolor)) {
                        scope.barfillcolor = iAttr.barfillcolor;
                    }
                }
                //checks for empty bar color customization
                scope.baremptycolor = "#D3D3D3";
                if (iAttr.baremptycolor) {
                    var pattern = /^#[0-9a-fA-F]{6}$/; //currently accepts lower case a-f
                    if (pattern.test(iAttr.baremptycolor)) {
                        scope.baremptycolor = iAttr.baremptycolor;
                    }
                }

                scope.buttoncolor = "#FF0000";
                if (iAttr.buttoncolor) {
                    var pattern = /^#[0-9a-fA-F]{6}$/; //currently accepts lower case a-f
                    if (pattern.test(iAttr.buttoncolor)) {
                        scope.buttoncolor = iAttr.buttoncolor;
                    }
                }
                //checks to see if there is a orientation attribute if there is set our template to the vertical template
                if (iAttr.orientation) {
                    if ('vertical' === iAttr.orientation) {
                        myTemplate = '<button ng-click="increase()" ng-keydown="keyBind($event)">+</button>' +
                        '<div ng-click="barClick()" style="margin-left:9px;width:3px;height:{{10 * emptWidth}}px;background-color:' + scope.baremptycolor + ';margin-bottom:4px"></div>' +
                        '<div ng-mousedown="drag()" style="margin-top:-4px;margin-left:5px;width:10px;height:10px;background-color:' + scope.buttoncolor + ';border-radius:50%;"></div>' +
                        '<div ng-click="barClick()" style="margin-left:9px;width:3px;height:{{10 * fillWidth}}px;background-color:' + scope.barfillcolor + ';margin-bottom:4px"></div>' +
                        '<button ng-click="decrease()" ng-keydown="keyBind($event)">-</button>';
                    }
                }
                else {
                    //this builds our horizontal template
                    myTemplate = '<button ng-click="decrease()" ng-keydown="keyBind($event)">-</button>' +
                    '<div ng-click="barClick()" style="display:inline-block;width:{{10 * fillWidth}}px;height:3px;background-color:' + scope.barfillcolor + ';margin-bottom:4px"></div>' +
                    '<div ng-mousedown="drag()" style="display:inline-block;width:10px;height:10px;background-color:' + scope.buttoncolor + ';border-radius:50%;"></div>' +
                    '<div ng-click="barClick()" style="display:inline-block;width:{{10 * emptWidth}}px;height:3px;background-color:' + scope.baremptycolor + ';margin-bottom:4px"></div>' +
                    '<button ng-click="increase()" ng-keydown="keyBind($event)">+</button>';
                }
                //We show our template and then compile it so the DOM knows about our ng functions
                iElem.html(myTemplate);
                $compile(iElem.contents())(scope);
                //create the initial bar
                scope.makeBar();
                return;
            }
        }
    });