describe('Treeview Directive:', function() {

  var scope,element,compile;

  beforeEach(module('bossy.treeview'));
  beforeEach(inject(function($rootScope, $compile){
    element = angular.element('<bossy-treeview data="directiveData"></bossy-treeview>');
    scope = $rootScope.$new();
    compile = $compile;
    scope.directiveData = {};
    $compile(element)(scope);
    scope.$digest();

 } ));

//test for zero nodes
it('treeview handles no input',function(){
	//console.log("Key Num: " + Object.keys(scope.directiveData).length);
      expect(Object.keys(scope.directiveData).length).toBe(0);
});

//tests for one nodes object
it('treeview handles one input',function(){
     scope.directiveData = {  "nodes": [ {"item":{"value": "file"}}]  };
     scope.$digest();
     expect(Object.keys(scope.directiveData).length).toBe(1);
});
  
//test for two nodes 
it('treeview handles two inputs',function(){
     scope.directiveData = {  "nodes": [ {"item":{"value": "file"}}],"nodes2": [ {"item":{"value": "file"}}]};
     scope.$digest();
     expect(Object.keys(scope.directiveData).length).toBe(2);
});

//test for node inside nodes object
it('treeview handles node nodes', function(){
    scope.directiveData = {  "nodes": [ {"node":{"value": "folder"}}]};
    expect(scope.directiveData.nodes[0].node.value).toBe("folder");
});

//test for item inside nodes object
it('treeview handles item nodes ', function(){
    scope.directiveData = {  "nodes": [ {"item":{"value": "file"}}]};
    expect(scope.directiveData.nodes[0].item.value).toBe("file");
});

//test for item next to node inside nodes object
it('treeview nodes handle node and item', function(){
     scope.directiveData = {  "nodes": [ {"node":{"value": "folder"}},{"item":{"value": "file"}}]};
     expect(scope.directiveData.nodes[1].item.value).toBe("file");
     expect(scope.directiveData.nodes[0].node.value).toBe("folder");
});

//test for item inside of node inside of nodes obejct
it('treeview handles second level nodes containing node item', function(){
     scope.directiveData =   { "nodes": [	{"node": { "value": "folder", "nodes": [ { "item": { "value": "file"}}]}}]} ;
     expect(scope.directiveData.nodes[0].node.nodes[0].item.value).toBe("file");
     expect(scope.directiveData.nodes[0].node.value).toBe("folder");

});

//test for item inside of node inside two second level nodes
it('treeview handles two second level nodes', function(){
     scope.directiveData =   { "nodes": [ {"node": { "value": "folder", "nodes1": [ { "item": { "value": "file"}}], "nodes2": [ { "item": { "value": "file1"}},{ "item": { "value": "file2"}}]}}]} ;
     expect(scope.directiveData.nodes[0].node.nodes1[0].item.value).toBe("file");
     expect(scope.directiveData.nodes[0].node.nodes2[0].item.value).toBe("file1");
     expect(scope.directiveData.nodes[0].node.nodes2[1].item.value).toBe("file2");
     expect(scope.directiveData.nodes[0].node.value).toBe("folder");
});


//test for item inside of third level node
it('treeview handles third level nodes with item and second level nodes with item', function(){
     scope.directiveData =  { "nodes": [   {"node": { "value": "folder", "nodes2": [{"node": { "value": "folder2", "nodes3": [ { "item": { "value": "file3"}}]}} , { "item": { "value": "file4"}}]}}]} ;
     expect(scope.directiveData.nodes[0].node.nodes2[0].node.nodes3[0].item.value).toBe("file3");
     expect(scope.directiveData.nodes[0].node.nodes2[1].item.value).toBe("file4");
     expect(scope.directiveData.nodes[0].node.nodes2[0].node.value).toBe("folder2");
     expect(scope.directiveData.nodes[0].node.value).toBe("folder");
});


 
});
