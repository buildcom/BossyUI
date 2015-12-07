describe('Combobox Directive:', function() {

  var scope,element,compile,spyEvent;

  //load module
  beforeEach(module('bossy.combobox'));

  //set up element, create scope, compile, digest
  beforeEach(inject(function($rootScope, $compile){
    element = angular.element('<bossy-combobox config="directiveData" options="directiveOptions"></bossy-combobox>');

    scope = $rootScope.$new();
    compile = $compile;
    scope.directiveData = {};
    scope.directiveOptions = {};
    $compile(element)(scope);
    scope.$digest();
  }));

  //ACTUAL TESTS BELOW
  //----------------------------------------
  //TESTING FUNCTIONS(might not actually need)
  //add elements to selectedItems array
  it('Combobox Test(1): addSelection adds elements to selectedItems', function(){
    var iscope = element.isolateScope();
    iscope.addSelection('dog');
    expect(iscope.selectedItems).toEqual(['dog']);
  });

  //remove elements from selected array
  it('Combobox Test(2): deleteSelection removes elements from selectedItems', function(){
    var iscope = element.isolateScope();
    iscope.addSelection('dog');
    iscope.addSelection('cat');
    iscope.deleteSelection('dog');
    expect(iscope.selectedItems).toEqual(['cat']);
  });

  //TESTING USER SPECIFICATIONS 
  //does the data in the scope of the directive equal what is passed in
  it('Combobox Test(3): isolate scope data is equal to passed in', function(){
    scope.directiveData = {list: ['Ball','Stick','Table','Chalk']};
    scope.$digest();
    
    var iscope = element.isolateScope();
    expect(iscope.config.list).toEqual(['Ball','Stick','Table','Chalk']);
  });

  //dropdown elments should be elements defined by list
  it('Combobox Test(4): dropdown elements should be values defined in config.list', function(){
    scope.directiveData = {list: ['Ball','Stick','Table','Chalk']};
    compile(element)(scope);
    scope.$digest();

    var dropdownElement = element.find("a");   

    dropdownElement = angular.element(dropdownElement[0]);
    expect(dropdownElement.text()).toEqual("Ball");
  });

  //TESTING FUNCTIONS TRIGGERING PROPERLY
  //clicking on dropdown elements should call function to add selected element
  it('Combobox Test(5): dropdown element clicked calls addSelection()', function(){
    scope.directiveData = {list: ['Ball','Stick']};
    var test = compile(element)(scope);
    scope.$digest();

    var iscope = element.isolateScope();
    test.find("a").triggerHandler("click");   
  
    expect(iscope.selectedItems).toEqual(['Ball','Stick']);
  });

  //clicking on selected elements should call function to remove selected element
  it('Combobox Test(6): selected element clicked calls deleteSelection()', function(){
    scope.directiveData = {list: ['Ball','Stick']};
    var test = compile(element)(scope);
    scope.$digest();

    var iscope = element.isolateScope();
    test.find("a").triggerHandler("click");  
    test.find("span").triggerHandler("click");
  
    expect(iscope.selectedItems).toEqual([]);
  });
});