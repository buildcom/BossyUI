describe("Title",function(){
var element;
var $scope;
var $compile;
var template;
var val;

beforeEach(module('templates'));
beforeEach(module('./../../../../src/directives/templates/*.html'));
beforeEach(module('app.directive.bossy.input'));
beforeEach(inject(function($templateCache,_$compile_, _$rootScope_){
	$scope=_$rootScope_;
	$compile  = _$compile_;
	// template = $templateCache.get('./../../../../src/directives/templates/*.html');
	// $templateCache.put(template);

	val = true;
	element = angular.element("<bossy-input title='This is my bossy input'></bossy-input>");
	$compile(element)($scope);
	$scope.digest();

}))
 it('should work',function(){
 	$scope.$digest();
 	expect(val).toBe(true);
 })

describe("bossy-input",function(){
	it('should add bossy input with title which is passed',function(){
		 expect(val).toBe(true);
		//expect(element).toHaveAttr('title','This is my bossy input').toBe(true);
	})
})

 })