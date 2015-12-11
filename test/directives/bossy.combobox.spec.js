describe('Combobox Directive:', function() {

  var scope,element,compile,spyEvent;

  //load module
  beforeEach(module('bossy.combobox'));

  //set up element, create scope, compile, digest
  beforeEach(inject(function($rootScope, $compile){
    element = angular.element('<bossy-combobox config="config"></bossy-combobox>');

    scope = $rootScope.$new();
    compile = $compile;
    scope.config = {
	    list: []
    };
    $compile(element)(scope);
    scope.$digest();
  }));

  //ACTUAL TESTS BELOW
  //----------------------------------------
  //TESTING USER SPECIFICATIONS 
  //does the data in the scope of the directive equal what is passed in
  it('Combobox Test(1): isolate scope data is equal to passed in', function(){
    scope.config = {list: ['Ball','Stick','Table','Chalk']};
    scope.$digest();
    
    var iscope = element.isolateScope();
    expect(iscope.config.list).toEqual(['Ball','Stick','Table','Chalk']);
  });

  //dropdown elments should be elements defined by list
  it('Combobox Test(2): dropdown elements should be values defined in config.list', function(){
    scope.config = {list: ['Ball','Stick','Table','Chalk']};
    compile(element)(scope);
    scope.$digest();

    var dropdownElement = element.find("a");   

    dropdownElement = angular.element(dropdownElement[0]);
    expect(dropdownElement.text()).toEqual("Ball");
  });

  //TESTING FUNCTIONS TRIGGERING PROPERLY
  //clicking on dropdown elements should call function to add selected element
  it('Combobox Test(3): dropdown element clicked calls addSelection()', function(){
    scope.config = {list: ['Ball']};
    var test = compile(element)(scope);
    scope.$digest();

    var iscope = element.isolateScope();
    test.find("a").triggerHandler("click");   
  
    expect(iscope.selectedItems).toEqual(['Ball']);
  });

  //clicking on selected elements should call function to remove selected element
  it('Combobox Test(4): selected element clicked calls deleteSelection()', function(){
    scope.config = {list: ['Ball'], multi: true};
    var test = compile(element)(scope);
    scope.$digest();

    var iscope = element.isolateScope();
    test.find("a").triggerHandler("click");  
    test.find("label").triggerHandler("click");
  
    expect(iscope.selectedItems).toEqual([]);
  });

  //clicking on selected elements should call function to remove selected element
  it('Combobox Test(5): selectedItems only stores one element when not multi select', function(){
    scope.config = {list: ['Ball']};
    var test = compile(element)(scope);
    scope.$digest();

    var iscope = element.isolateScope();
    test.find("a").triggerHandler("click");  
    test.find("a").triggerHandler("click"); 
  
    expect(iscope.selectedItems).toEqual(['Ball']);
  });

  //clicking on selected elements should call function to remove selected element
  it('Combobox Test(6): element is not added to selectedItems if already in selectedItems', function(){
    scope.config = {list: ['Ball'], multi: true};
    var test = compile(element)(scope);
    scope.$digest();

    var iscope = element.isolateScope();
    test.find("a").triggerHandler("click");  
    test.find("a").triggerHandler("click"); 
  
    expect(iscope.selectedItems).toEqual(['Ball']);
  });

  //clicking on selected elements should call function to remove selected element
  it('Combobox Test(7): Sorts list objects by ascending if set to true', function(){
    scope.config = {list: ['Ball','Stick','Chalk'], multi: true, sort: true};
    var test = compile(element)(scope);
    scope.$digest();

    var dropdownElement = element.find("a");   
    var  dropdownElement1 = angular.element(dropdownElement[0]);
    var  dropdownElement2 = angular.element(dropdownElement[1]);
    var  dropdownElement3 = angular.element(dropdownElement[2]);

    expect(dropdownElement1.text()).toEqual("Ball");
    expect(dropdownElement2.text()).toEqual("Chalk");
    expect(dropdownElement3.text()).toEqual("Stick");
  });
});