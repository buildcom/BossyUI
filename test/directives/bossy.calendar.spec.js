describe('BossyCalenderUnitTests', function() {
    // Load the module with MainController
   beforeEach(module('bossy.calendar'));

    var ctrl, scope,element;


    // inject the $controller and $rootScope services
    // in the beforeEach block
    beforeEach(inject(function ($controller, $rootScope) {
        // Create a new scope that's a child of the $rootScope
        scope = $rootScope.$new();
        // Create the controller
        ctrl = $controller('CalendarController', {
            $scope: scope
        });
        scope.dirConfig={};

        element = angular.element('<bossy-calendar config="scope.dirConfig"></bossy-calendar>');

    }));


    it('should work',function(){

       console.log("done");
        console.log(scope);

    })

});