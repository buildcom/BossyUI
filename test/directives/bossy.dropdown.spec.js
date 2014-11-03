describe("bossyDropdown",function(){
var element;
var scope;
var compile;
var val;
var http;


beforeEach(module('Templates'))
beforeEach(inject(function($compile,$rootScope, $http){
	scope=$rootScope;
	compile  = $compile;
	val = true;
	element = angular.element('<bossy-dropdown title="name"></bossy-dropdown>');
	$compile(element)(scope);
	$rootScope.$digest();
	http = $http;

}));
	it('should populate bossy dropdown',function(){
		expect(element.attr("title")).toMatch("name");

	})
	it('should throw error to broken promise',function(){
		expect(http.get("")).toThrow(new Error("http.get FAILED"));

	})

 })