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

        it('scope.dateMap should not be null after updateDateMap is called',function(){

            scope.updateDateMap();
            expect(scope.dateMap).toNotBe(null);



        })

        it('calling scope.selectDate should set the selectedDate',function(){
             var time = new Date().getTime();
            //Lets assign ngModel to null to verify it actually gets set later.
            scope.ngModel=null;
            scope.selectDate(time);
            expect(scope.ngModel).toNotBe(null);
        })

        it('calling scope.nextMonth should set the current Month and Year',function(){

            //scope.current=null; //assigning current to null to verify if its set later.
            console.log(scope.current);
            spyOn(scope,"updateDateMap");
            scope.nextMonth();
            expect(scope.updateDateMap).toHaveBeenCalled();
            expect(scope.current).toNotBe(null);
        })


    });


});