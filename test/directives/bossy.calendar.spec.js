describe('CalendarUnitTests for Directive', function() {



    var element,scope;

    /**
     * Load Calendar Templates
     */
    beforeEach(module('bossy-templates'));

    beforeEach(inject(function($rootScope,$compile){

        scope=$rootScope.$new();
        scope.directiveConfig={};
        element = angular.element(
            '<div>' +
            '<bossy-calendar config="directiveConfig">' +
            '</bossy-calendar>'+
            '</div>');

        $compile(element)(scope);
        scope.$digest();

    }));

    describe('Bossy Calender Directive',function(){

        it('bossyCalendar template should not be null',function(){

            expect(element).toNotBe(null);

        });
    });
});