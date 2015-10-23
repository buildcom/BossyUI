describe('Tooltip Directive:', function() {

    var scope,compiledElement,compile;

    beforeEach(function(){
        module('bossy.tooltip');
        inject(function($rootScope, $compile){
            scope = $rootScope.$new();
            compile = $compile;
        });
    });
    

    it('toolTip HTML replacement should not be null',function(){
        scope.directiveData = {text: 'Tooltip Text'};
        scope.directiveOptions = {};
        var element = angular.element('<bossy-tooltip data="directiveData" options="directiveOptions">Anchor</bossy-tooltip>');
        element = compile(element)(scope);
        scope.$digest();
        
        expect(element).toNotBe(null);
    });
    
    it('toolTip anchor text should be "Anchor"', function(){
        scope.directiveData = {text: 'Tooltip Text'};
        scope.directiveOptions = {};
        var element = angular.element('<bossy-tooltip data="directiveData" options="directiveOptions">Anchor</bossy-tooltip>');
        element = compile(element)(scope);
        scope.$digest();
        
        var spanElement = element.find("span").html(); 
        expect(spanElement).toContain('<span class="link">Anchor<');
    });
});
