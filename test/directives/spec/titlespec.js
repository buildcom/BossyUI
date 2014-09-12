describe("Title",function(){
var element;
var $scope;
var $compile;
var val;

//beforeEach(module("../../../src/directives/templates/bossy-input.html"));
beforeEach(module('app.directive.bossy.input'));
beforeEach(inject(function(_$compile_, _$rootScope_){
	$scope=_$rootScope_;
	$compile  = _$compile_;

	val = true;
	element = angular.element("<bossy-input title='This is my bossy input'></bossy-input>");
	$compile(element)($scope);

}))
 it('should work',function(){
 	$scope.$digest();
 	expect(val).toBe(true);
 })

// describe("bossy-input",function(){
// 	it('should add bossy input with title which is passed',function(){
// 		//$compile(element)($scope);
// 		//expect(element).toHaveAttr('title','This is my bossy input').toBe(true);
// 	})
// })

 })