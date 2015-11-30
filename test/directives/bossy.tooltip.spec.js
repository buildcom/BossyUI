describe('Tooltip Directive:', function() {

  var scope,element;

  beforeEach(module('bossy.tooltip'));
  beforeEach(function(){
    spyOn(console, 'error');
  });
  beforeEach(inject(function($rootScope, $compile){
    element = angular.element('<bossy-tooltip data="directiveData" options="directiveOptions">Anchor</bossy-tooltip>');

    scope = $rootScope.$new();
    scope.directiveData = {};
    scope.directiveOptions = {};
    $compile(element)(scope);
    scope.$digest();
  }));
  
  // No text given, should log error to console
  it('toolTip should log an error for empty tooltip content when transclude is false and no text given',function(){
    expect(console.error).toHaveBeenCalled();
  });


  // No options
  it('toolTip with empty options should create default bossy-tooltip-active class', function(){
    scope.directiveData = {text: 'Tooltip Text'};
    scope.$digest();

    var divElement = element.find("div");
    expect(divElement.hasClass("bossy-tooltip-active")).toBeTruthy();
  });
 
  // Check tooltip text
  it('toolTip tooltip text should be "Tooltip Text"', function(){
    scope.directiveData = {text: 'Tooltip Text'};
    scope.$digest();
    
    var iscope = element.isolateScope();
    expect(iscope.data.text).toEqual('Tooltip Text');
  });
  
  // Check anchor text
  it('toolTip anchor text should be "Anchor"', function(){
    scope.directiveData = {text: 'Tooltip Text'};
    scope.$digest();

    var anchorElement = element.find('span');
    while (anchorElement.length && !anchorElement.hasClass('ng-scope')){
      anchorElement = anchorElement.find('span');
    }
    anchorElement = angular.element(anchorElement[0]);
    expect(anchorElement.text()).toEqual('Anchor');
  });

  // Option tests
  // Color
  it('toolTip should be red, should have div class with red class', function(){
    scope.directiveData = {text: 'Tooltip Text'};
    scope.directiveOptions = {color: 'red'};
    scope.$digest();

    var divElement = element.find("div");
    expect(divElement.hasClass("red")).toBeTruthy();
  });

  it('toolTip color option should be case insensitive', function(){
    scope.directiveData = {text: 'Tooltip Text'};
    scope.directiveOptions = {color: 'RED'};
    scope.$digest();

    var divElement = element.find("div");
    expect(divElement.hasClass("red")).toBeTruthy();

    scope.directiveOptions = {color: 'rEd'};
    scope.$digest();

    var divElement = element.find("div");
    expect(divElement.hasClass("red")).toBeTruthy();
  });

/*
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

  var element = angular.element('<bossy-tooltip data="directiveData" options="directiveOptions">Anchor<div class="tooltip-content"><b>tooltip text</b></div></bossy-tooltip>');
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
*/

/* TODO
  Base
    *base css class
    *error on no tooltip content
    *no options
  Data
    *Anchor text
    *tooltip text
    html
  Options
    align
    position
    *color
    type
    transclude
    persist
    progress
    icon
    iconFloat
*/
});
