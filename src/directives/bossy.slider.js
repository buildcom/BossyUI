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
    $scope.max = 10;
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
    $scope.barfillcolor = '#0000FF';
    $scope.baremptycolor = '#D3D3D3';
    $scope.buttoncolor = '#FF0000';


    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////

    /*makeBar()
     * This creates the initial graphic of the slider and ensures it is in the correct order
     * CC = 4 */
    $scope.makeBar = function () {
        //button should show up in the middle now or close to if uneven
        $scope.value = parseInt(($scope.max + $scope.min) / 2);
        for (var current = $scope.min; current <= $scope.max; current++) {
            if (current < $scope.value) {
                $scope.fillWidth++;
            }
            if (current > $scope.value) {
                $scope.emptWidth++;
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
    };
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
    };
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
}]);
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
                var pattern = /^#[0-9a-fA-F]{6}$/; //currently accepts lower case a-f

                //checks to see if there is a max attribute
                if (iAttr.max) {
                    scope.max = parseInt(iAttr.max);
                    if (isNaN(scope.max)) {
                        scope.max = 10;
                    }
                }
                //checks to see if there is a min attribute
                if (iAttr.min) {
                    scope.min = parseInt(iAttr.min);
                    if (isNaN(scope.min)) {
                        scope.min = 1;
                    }
                }
                //checks for bar color customization
                if (iAttr.barfillcolor) {
                    if (pattern.test(iAttr.barfillcolor)) {
                        scope.barfillcolor = iAttr.barfillcolor;
                    }
                }
                //checks for empty bar color customization

                if (iAttr.baremptycolor) {
                    if (pattern.test(iAttr.baremptycolor)) {
                        scope.baremptycolor = iAttr.baremptycolor;
                    }
                }


                if (iAttr.buttoncolor) {
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
    };
});

