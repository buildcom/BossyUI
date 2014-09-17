describe("bossyInput",function(){
var element;
var scope;
var compile;
var val;


beforeEach(module('Templates'))
beforeEach(inject(function($compile,$rootScope){
	scope=$rootScope;
	compile  = $compile;
	val = true;
	element = angular.element('<bossy-input title = "Sample Bossy Input">Bossy Input</bossy-input>');
	$compile(element)(scope);
	$rootScope.$digest();

}));
	it('should add bossy input',function(){
		var name = element.text();
		var title = element.attr("title");
		console.log(title);
		expect(name).toMatch("Bossy Input");
		expect(title).toMatch("Sample Bossy Input")

	})


 })