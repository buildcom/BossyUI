describe('CalendarControllerUnitTests', function() {

    beforeEach(module('bossy.calendar'));

    var ctrl, scope;
    // inject the $controller and $rootScope services
    // in the beforeEach block
    beforeEach(inject(function($controller, $rootScope) {
        // Create a new scope that's a child of the $rootScope
        scope = $rootScope.$new();
        scope.config={};
        // Create the controller
        ctrl = $controller('CalendarController', {
            $scope: scope
        });
    }));
    describe('Controller Initialization',function(){

        it('initialization variables should not be null',function(){

            expect(scope.months).toNotBe(undefined);
            expect(scope.days).toNotBe(undefined);

        });
        it('updateDateMap should be called', function() {

            spyOn(scope,"updateDateMap");
            //console.log(ctrl);
            //console.log(scope);
            scope.updateDateMap();
            expect(scope.updateDateMap).toHaveBeenCalled();
        });

        it('scope.nextMonth should be called',function(){

            spyOn(scope,'nextMonth');
            scope.nextMonth();
            expect(scope.nextMonth).toHaveBeenCalled();
        });

        it('scope.previousMonth should be called',function(){

            spyOn(scope,'previousMonth');
            scope.previousMonth();
            expect(scope.previousMonth).toHaveBeenCalled();
        });
    });

});