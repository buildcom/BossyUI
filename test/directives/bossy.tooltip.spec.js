describe('Tooltip Directive:', function() {

  var scope,element,compile;

  beforeEach(module('bossy.tooltip'));
  beforeEach(function(){
    spyOn(console, 'error');
  });
  beforeEach(inject(function($rootScope, $compile){
    element = angular.element('<bossy-tooltip config="config">Anchor</bossy-tooltip>');

    scope = $rootScope.$new();
    compile = $compile;
    //scope.config = {};
    scope.config = {
	    data: {}
    };
    $compile(element)(scope);
    scope.$digest();
  }));

  // No text given, should log error to console
  it('toolTip should log an error for empty tooltip content when transclude is false and no text given',function(){
    expect(console.error).toHaveBeenCalled();
  });


  // No options
  it('toolTip with empty options should create default bossy-tooltip-active class', function(){
    scope.config = {text: 'Tooltip Text'};
    scope.$digest();

    var divElement = element.find("div");
    expect(divElement.hasClass("bossy-tooltip-container")).toBeTruthy();
  });

  // Check tooltip text
  it('toolTip tooltip text should be "Tooltip Text"', function(){
    scope.config = {text: 'Tooltip Text'};
    scope.$digest();

    var iscope = element.isolateScope();
    expect(iscope.config.text).toEqual('Tooltip Text');
  });

  // Check anchor text
  it('toolTip anchor text should be "Anchor"', function(){
    scope.config = {text: 'Tooltip Text'};
    scope.$digest();

    var anchorElement = element.find('span');
    while (anchorElement.length && !anchorElement.hasClass('ng-scope')){
      anchorElement = anchorElement.find('span');
    }
    anchorElement = angular.element(anchorElement[0]);
    expect(anchorElement.text()).toEqual('Anchor');
  });

  // Isolate scope variables
  it('toolTip isolate scope variables passing correctly', function(){
    scope.config = {
	    text: 'Tooltip Text',
	    align: 'left',
		position: 'bottom',
		color: 'red',
		type: 'download',
		transclude: true,
		persist: true,
		progress: '10',
		icon: 'scissor-icon',
		iconFloat: 'right'
    };
    scope.$digest();

    var iscope = element.isolateScope();
    expect(iscope.config).toEqual(scope.config);
    expect(iscope.config.text).toEqual(scope.config.text);
  });

  // Option tests
  // Color
  it('toolTip should be red, should have div class with red class', function(){
    scope.config = {
	    text: 'Tooltip Text',
	    color: 'red'
    };
    scope.$digest();

    var divElement = element.find("div");
    expect(divElement.hasClass("red")).toBeTruthy();
  });

  it('toolTip color option should be case insensitive', function(){
    scope.config = {
	    text: 'Tooltip Text',
	    color: 'red'
    };
    scope.$digest();

    var divElement = element.find("div");
    expect(divElement.hasClass("red")).toBeTruthy();

    scope.config = {color: 'rEd'};
    scope.$digest();

    var divElement = element.find("div");
    expect(divElement.hasClass("red")).toBeTruthy();
  });

  // Align
  it('toolTip should align left, having div class with bossy-tooltip-align-left class', function(){
    scope.config = {
	    text: 'Tooltip Text',
	    align: 'left'
    };
    scope.$digest();

    var divElement = element.find("div");
    expect(divElement.hasClass("bossy-tooltip-align-left")).toBeTruthy();
  });

  it('toolTip should align right, having div class with bossy-tooltip-align-right class', function(){
    scope.config = {
	    text: 'Tooltip Text',
	    align: 'right'
    };
    scope.$digest();

    var divElement = element.find("div");
    expect(divElement.hasClass("bossy-tooltip-align-right")).toBeTruthy();
  });

  it('toolTip align option should be case insensitive', function(){
    scope.config = {
	    text: 'Tooltip Text',
	    align: 'RIGHT'
    };
    scope.$digest();

    var divElement = element.find("div");
    expect(divElement.hasClass("bossy-tooltip-align-right")).toBeTruthy();

    scope.config = {
	    text: 'Tooltip Text',
	    align: 'LeFt'
    };
    scope.$digest();

    var divElement = element.find("div");
    expect(divElement.hasClass("bossy-tooltip-align-left")).toBeTruthy();
  });

  // Position
  it('toolTip position: "left", should apply "bossy-tooltip-pos-left" class to tooltip div', function(){
    scope.config = {text: 'Tooltip Text', position: "left"};
    scope.$digest();

    var divElement = element.find("div");
    expect(divElement.hasClass("bossy-tooltip-pos-left")).toBeTruthy();
  });

  it('toolTip position: "right", should apply "bossy-tooltip-pos-right" class to tooltip div', function(){
    scope.config = {text: 'Tooltip Text', position: "right"};
    scope.$digest();

    var divElement = element.find("div");
    expect(divElement.hasClass("bossy-tooltip-pos-right")).toBeTruthy();
  });

  it('toolTip position: "bottom", should apply "bossy-tooltip-pos-bottom" class to tooltip div', function(){
    scope.config = {text: 'Tooltip Text', position: "bottom"};
    scope.$digest();

    var divElement = element.find("div");
    expect(divElement.hasClass("bossy-tooltip-pos-bottom")).toBeTruthy();
  });

  it('toolTip position, should should be case insensitive', function(){
    scope.config = {text: 'Tooltip Text', position: "LEFT"};
    scope.$digest();

    var divElement = element.find("div");
    expect(divElement.hasClass("bossy-tooltip-pos-left")).toBeTruthy();

    scope.config = {position: 'RiGhT'};
    scope.$digest();

    divElement = element.find("div");
    expect(divElement.hasClass("bossy-tooltip-pos-right")).toBeTruthy();

    scope.config = {position: 'bOTTOm'};
    scope.$digest();

    divElement = element.find("div");
    expect(divElement.hasClass("bossy-tooltip-pos-bottom")).toBeTruthy();
  });

  // Persist
  it('toolTip should be be visible via "active" class when persist is true', function(){
    scope.config = {text: 'Tooltip Text', persist: true};
    scope.$digest();

    var divElement = element.find("div");
    expect(divElement.hasClass("active")).toBeTruthy();
  });

  // Transclude
  it('toolTip transclude, html content between ', function(){
    element = angular.element('<bossy-tooltip config="config">Anchor<div class="tooltip-content"><b>transclude tooltip text</b></div></bossy-tooltip>');
    scope.config = {transclude: true};
    compile(element)(scope);
    scope.$digest();

    var divElement = element.find("b");
    expect(divElement.text()).toEqual('transclude tooltip text');
  });

  // Type - Download
  it('toolTip type: download, should apply download class', function(){
    scope.config = {text: 'Tooltip Text', type: 'download'};
    scope.$digest();

    var divElement = element.find("div");
    expect(divElement.hasClass("download")).toBeTruthy();
  });

  it('toolTip type: download, should apply "progress-bar" class', function(){
    scope.config = {text: 'Tooltip Text', type: 'download'};
    scope.$digest();

    var divElement = element.find("div").find("div");
    expect(divElement.hasClass("progress-bar")).toBeTruthy();
  });

  it('toolTip type: download, should apply "progress" percent styling to progress bar element', function(){
    scope.config = {text: 'Tooltip Text', type: 'download', progress: '10'};
    scope.$digest();

    var divElement = element.find('div');
    while (divElement.length && !divElement.hasClass('progress-bar')){
      divElement = divElement.find('div');
    }
    divElement = angular.element(divElement[0]);
    expect(divElement.css('width')).toEqual('10%');
  });

  it('toolTip type: download, should be case insensitive', function(){
    scope.config = {text: 'Tooltip Text', type: 'DOWNload'};
    scope.$digest();

    var divElement = element.find("div");
    expect(divElement.hasClass("download")).toBeTruthy();

    scope.config = {type: 'DOWNLOAD'};
    scope.$digest();

    var divElement = element.find("div");
    expect(divElement.hasClass("download")).toBeTruthy();
  });

  // Icon
  it('toolTip icon, should apply class "icon ionicon (icon name)" to the i element', function(){
    scope.config = {text: 'Tooltip Text', icon: 'scissor-icon'};
    scope.$digest();

    var iElement = element.find("i");
    expect(iElement.hasClass("icon")).toBeTruthy();
    expect(iElement.hasClass("ionicon")).toBeTruthy();
    expect(iElement.hasClass("scissor-icon")).toBeTruthy();
  });

  it('toolTip iconFloat: left, should apply icon float left position to i ionicon element', function(){
    scope.config = {text: 'Tooltip Text', icon: 'scissor-icon', iconFloat: 'left'};
    scope.$digest();

    var iElement = element.find("i");
    expect(iElement.hasClass("icon-left")).toBeTruthy();
  });

  it('toolTip iconFloat: right, should apply icon float right position to i ionicon element', function(){
    scope.config = {text: 'Tooltip Text', icon: 'scissor-icon', iconFloat: 'right'};
    scope.$digest();

    var iElement = element.find("i");
    expect(iElement.hasClass("icon-right")).toBeTruthy();
  });

  it('toolTip iconFloat option should be case insensitive', function(){
    scope.config = {text: 'Tooltip Text', icon: 'scissor-icon', iconFloat: 'RIGHT'};
    scope.$digest();

    var iElement = element.find("i");
    expect(iElement.hasClass("icon-right")).toBeTruthy();

    scope.config = {iconFloat: 'lEfT'};
    scope.$digest();

    var iElement = element.find("i");
    expect(iElement.hasClass("icon-left")).toBeTruthy();
  });
});
