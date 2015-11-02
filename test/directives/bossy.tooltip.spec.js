describe('Tooltip Directive:', function() {

    var scope,compiledElement,compile;

    beforeEach(function(){
        module('bossy.tooltip');
        inject(function($rootScope, $compile){
            scope = $rootScope.$new();
            compile = $compile;
        });
    });
    
    // Tooltip returns something
    it('toolTip HTML replacement should not be null',function(){
        scope.directiveData = {};
        scope.directiveOptions = {};
        var element = angular.element('<bossy-tooltip data="directiveData" options="directiveOptions">Anchor</bossy-tooltip>');
        element = compile(element)(scope);
        scope.$digest();
        
        expect(element).toNotBe(null);
    });
    
    // No options, no data
    it('toolTip with no data and options should create empty string tooltip',function(){
        scope.directiveData = {};
        scope.directiveOptions = {};
        var element = angular.element('<bossy-tooltip data="directiveData" options="directiveOptions">Anchor</bossy-tooltip>');
        element = compile(element)(scope);
        scope.$digest();
        
        var spanElement = element.find("div");
        expect(spanElement.text()).toContain('');
    });

    // No options
    it('toolTip with empty options should create default tooltip-active class', function(){
        scope.directiveData = {text: 'Tooltip Text'};
        scope.directiveOptions = {};
        var element = angular.element('<bossy-tooltip data="directiveData" options="directiveOptions">Anchor</bossy-tooltip>');
        element = compile(element)(scope);

        scope.$digest();
        
        var spanElement = element.find("div");
        expect(spanElement.hasClass("tooltip-active")).toBeTruthy();
    });
    
    // Check anchor and tooltip text
    it('toolTip anchor text and tooltip text should be "Anchor" and "Tooltip Text"', function(){
        scope.directiveData = {text: 'Tooltip Text'};
        scope.directiveOptions = {};
        var element = angular.element('<bossy-tooltip data="directiveData" options="directiveOptions">Anchor</bossy-tooltip>');
        element = compile(element)(scope);

        scope.$digest();
        
        var spanElement = element.find("span").find("span");
        expect(spanElement.text()).toContain('AnchorTooltip Text');
    });

    // link class
    it('toolTip should have link class', function(){
        scope.directiveData = {text: 'Tooltip Text'};
        scope.directiveOptions = {};
        var element = angular.element('<bossy-tooltip data="directiveData" options="directiveOptions">Anchor</bossy-tooltip>');
        element = compile(element)(scope);

        scope.$digest();
        
        var spanElement = element.find("span").find("span");
        expect(spanElement.hasClass("link")).toBeTruthy();
    });
    
    // tooltip-active class
    it('toolTip should have div class with tooltip-active class', function(){
        scope.directiveData = {text: 'Tooltip Text'};
        scope.directiveOptions = {};
        var element = angular.element('<bossy-tooltip data="directiveData" options="directiveOptions">Anchor</bossy-tooltip>');
        element = compile(element)(scope);

        scope.$digest();
        
        var spanElement = element.find("div");
        expect(spanElement.hasClass("tooltip-active")).toBeTruthy();
    });

    // Option tests
    // Color
    it('toolTip should be red, should have div class with red class', function(){
        scope.directiveData = {text: 'Tooltip Text'};
        scope.directiveOptions = {color: 'red'};
        var element = angular.element('<bossy-tooltip data="directiveData" options="directiveOptions">Anchor</bossy-tooltip>');
        element = compile(element)(scope);

        scope.$digest();
        
        var spanElement = element.find("div");
        expect(spanElement.hasClass("red")).toBeTruthy();
    });
    
    it('toolTip color option should be case insensitive', function(){
        scope.directiveData = {text: 'Tooltip Text'};
        scope.directiveOptions = {color: 'red'};
        var element = angular.element('<bossy-tooltip data="directiveData" options="directiveOptions">Anchor</bossy-tooltip>');
        element = compile(element)(scope);

        scope.$digest();
        
        var spanElement = element.find("div");
        expect(spanElement.hasClass("red")).toBeTruthy();
        
        scope.directiveData = {text: 'Tooltip Text'};
        scope.directiveOptions = {color: 'RED'};
        var element = angular.element('<bossy-tooltip data="directiveData" options="directiveOptions">Anchor</bossy-tooltip>');
        element = compile(element)(scope);

        scope.$digest();
        
        var spanElement = element.find("div");
        expect(spanElement.hasClass("red")).toBeTruthy();
        
        scope.directiveData = {text: 'Tooltip Text'};
        scope.directiveOptions = {color: 'rEd'};
        var element = angular.element('<bossy-tooltip data="directiveData" options="directiveOptions">Anchor</bossy-tooltip>');
        element = compile(element)(scope);

        scope.$digest();
        
        var spanElement = element.find("div");
        expect(spanElement.hasClass("red")).toBeTruthy();
    });

    // Align
    it('toolTip should align left, having div class with tooltip-left class', function(){
        scope.directiveData = {text: 'Tooltip Text'};
        scope.directiveOptions = {align: 'left'};
        var element = angular.element('<bossy-tooltip data="directiveData" options="directiveOptions">Anchor</bossy-tooltip>');
        element = compile(element)(scope);

        scope.$digest();
        
        var spanElement = element.find("div");
        expect(spanElement.hasClass("tooltip-left")).toBeTruthy();
    });
    
    it('toolTip should align right, having div class with tooltip-right class', function(){
        scope.directiveData = {text: 'Tooltip Text'};
        scope.directiveOptions = {align: 'right'};
        var element = angular.element('<bossy-tooltip data="directiveData" options="directiveOptions">Anchor</bossy-tooltip>');
        element = compile(element)(scope);

        scope.$digest();
        
        var spanElement = element.find("div");
        expect(spanElement.hasClass("tooltip-right")).toBeTruthy();
    });
    
    it('toolTip align option should be case insensitive', function(){
        scope.directiveData = {text: 'Tooltip Text'};
        scope.directiveOptions = {align: 'RIGHT'};
        var element = angular.element('<bossy-tooltip data="directiveData" options="directiveOptions">Anchor</bossy-tooltip>');
        element = compile(element)(scope);

        scope.$digest();
        
        var spanElement = element.find("div");
        expect(spanElement.hasClass("tooltip-right")).toBeTruthy();
        
        scope.directiveData = {text: 'Tooltip Text'};
        scope.directiveOptions = {align: 'LeFt'};
        var element = angular.element('<bossy-tooltip data="directiveData" options="directiveOptions">Anchor</bossy-tooltip>');
        element = compile(element)(scope);

        scope.$digest();
        
        var spanElement = element.find("div");
        expect(spanElement.hasClass("tooltip-left")).toBeTruthy();
    });

    // Type
    it('toolTip type html, should have div class with content-html class', function(){
        scope.directiveData = {text: 'Tooltip Text'};
        scope.directiveOptions = {type: 'html'};
        var element = angular.element('<bossy-tooltip data="directiveData" options="directiveOptions">Anchor</bossy-tooltip>');
        element = compile(element)(scope);

        scope.$digest();
        
        var spanElement = element.find("div");
        expect(spanElement.hasClass("content-html")).toBeTruthy();
    });
    
    it('toolTip type alert, should have div class with alert class', function(){
        scope.directiveData = {text: 'Tooltip Text'};
        scope.directiveOptions = {type: 'alert'};
        var element = angular.element('<bossy-tooltip data="directiveData" options="directiveOptions">Anchor</bossy-tooltip>');
        element = compile(element)(scope);

        scope.$digest();
        
        var spanElement = element.find("div");
        expect(spanElement.hasClass("alert")).toBeTruthy();
    });
    
    it('toolTip type download, should have div class with download class', function(){
        scope.directiveData = {text: 'Tooltip Text'};
        scope.directiveOptions = {type: 'download'};
        var element = angular.element('<bossy-tooltip data="directiveData" options="directiveOptions">Anchor</bossy-tooltip>');
        element = compile(element)(scope);

        scope.$digest();
        
        var spanElement = element.find("div");
        expect(spanElement.hasClass("download")).toBeTruthy();
    });
    
    it('toolTip type, should be case insensitive', function(){
        scope.directiveData = {text: 'Tooltip Text'};
        scope.directiveOptions = {type: 'DOWNLOAD'};
        var element = angular.element('<bossy-tooltip data="directiveData" options="directiveOptions">Anchor</bossy-tooltip>');
        element = compile(element)(scope);

        scope.$digest();
        
        var spanElement = element.find("div");
        expect(spanElement.hasClass("download")).toBeTruthy();
        
        scope.directiveOptions = {type: 'aLeRt'};
        var element = angular.element('<bossy-tooltip data="directiveData" options="directiveOptions">Anchor</bossy-tooltip>');
        element = compile(element)(scope);

        scope.$digest();
        
        var spanElement = element.find("div");
        expect(spanElement.hasClass("alert")).toBeTruthy();
        
        scope.directiveOptions = {type: 'HtMl'};
        var element = angular.element('<bossy-tooltip data="directiveData" options="directiveOptions">Anchor</bossy-tooltip>');
        element = compile(element)(scope);

        scope.$digest();
        
        var spanElement = element.find("div");
        expect(spanElement.hasClass("content-html")).toBeTruthy();
    });

    // Transclude
    it('toolTip transclude = true, should allow html content in anchor', function(){
        scope.directiveData = {};
        scope.directiveOptions = {type: 'download', transclude: true};

        var element = angular.element('<bossy-tooltip data="directiveData" options="directiveOptions">Anchor<div><b>tooltip text</b></div></bossy-tooltip>');
        element = compile(element)(scope);

        scope.$digest();
        
        var spanElement = element.find("div");
        expect(spanElement.hasClass("tooltip-active")).toBeTruthy();
        spanElement = spanElement.find("b");
        expect(spanElement.text()).toContain("tooltip text");
    });
    
    // Persist
    it('toolTip persistence, should apply "active" class to tooltip', function(){
        scope.directiveData = {text: 'Tooltip Text'};
        scope.directiveOptions = {type: 'download', persist: true};

        var element = angular.element('<bossy-tooltip data="directiveData" options="directiveOptions">Anchor</bossy-tooltip>');
        element = compile(element)(scope);

        scope.$digest();

        var spanElement = element.find("div");
        expect(spanElement.hasClass("active")).toBeTruthy();
    });
    
    // Tooltip Position
    it('toolTip position: "left", should apply "tooltip-pos-left" class to tooltip div', function(){
        scope.directiveData = {text: 'Tooltip Text'};
        scope.directiveOptions = {position: "left"};

        var element = angular.element('<bossy-tooltip data="directiveData" options="directiveOptions">Anchor</bossy-tooltip>');
        element = compile(element)(scope);

        scope.$digest();
        
        var spanElement = element.find("div");
        expect(spanElement.hasClass("tooltip-pos-left")).toBeTruthy();
    });
    
    it('toolTip position: "right", should apply "tooltip-pos-right" class to tooltip div', function(){
        scope.directiveData = {text: 'Tooltip Text'};
        scope.directiveOptions = {position: "right"};

        var element = angular.element('<bossy-tooltip data="directiveData" options="directiveOptions">Anchor</bossy-tooltip>');
        element = compile(element)(scope);

        scope.$digest();
        
        var spanElement = element.find("div");
        expect(spanElement.hasClass("tooltip-pos-right")).toBeTruthy();
    });
    
    it('toolTip position: "bottom", should apply "tooltip-pos-bottom" class to tooltip div', function(){
        scope.directiveData = {text: 'Tooltip Text'};
        scope.directiveOptions = {position: "bottom"};

        var element = angular.element('<bossy-tooltip data="directiveData" options="directiveOptions">Anchor</bossy-tooltip>');
        element = compile(element)(scope);

        scope.$digest();
        
        var spanElement = element.find("div");
        expect(spanElement.hasClass("tooltip-pos-bottom")).toBeTruthy();
    });
    
    it('toolTip position, should should be case insensitive', function(){
        scope.directiveData = {text: 'Tooltip Text'};
        scope.directiveOptions = {position: "LEFT"};
        var element = angular.element('<bossy-tooltip data="directiveData" options="directiveOptions">Anchor</bossy-tooltip>');
        element = compile(element)(scope);

        scope.$digest();
        
        var spanElement = element.find("div");
        expect(spanElement.hasClass("tooltip-pos-left")).toBeTruthy();
        
        scope.directiveOptions = {position: 'RiGhT'};
        var element = angular.element('<bossy-tooltip data="directiveData" options="directiveOptions">Anchor</bossy-tooltip>');
        element = compile(element)(scope);

        scope.$digest();
        
        var spanElement = element.find("div");
        expect(spanElement.hasClass("tooltip-pos-right")).toBeTruthy();
        
        scope.directiveOptions = {position: 'bOTTOm'};
        var element = angular.element('<bossy-tooltip data="directiveData" options="directiveOptions">Anchor</bossy-tooltip>');
        element = compile(element)(scope);

        scope.$digest();
        
        var spanElement = element.find("div");
        expect(spanElement.hasClass("tooltip-pos-bottom")).toBeTruthy();
    });
});
