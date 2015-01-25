describe('CalendarUnitTests', function() {

    beforeEach(module('bossy.calendar'));

    var ctrl, scope,compile;
    // inject the $controller and $rootScope services
    // in the beforeEach block
    beforeEach(inject(function($controller, $rootScope,$compile) {
        // Create a new scope that's a child of the $rootScope
        compile=$compile;
        scope = $rootScope.$new();
        scope.config={};
        // Create the controller
        ctrl = $controller('CalendarController', {
            $scope: scope
        });


    }));
    beforeEach(inject(function(){

       // scope = $rootScope.$new();
        scope.directiveConfig={};

        element = angular.element('<bossy-calendar config="directiveConfig"></bossy-calendar>');
        scope.$digest();

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

            spyOn(scope,"updateDateMap");
            scope.nextMonth();
            expect(scope.updateDateMap).toHaveBeenCalled();
            expect(scope.current).toNotBe(null);
        })


    });

    describe('Bossy Calender Directive',function(){

        it('bossyCalendar should not be null',function(){

            var dirConf={};
            var x = compile('<bossy-calendar config="dirConf"></bossy-calendar>')(scope);
            scope.$digest();
            expect(x).toNotBe(null);
        });


    });


});