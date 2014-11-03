describe("bossyDropdown",function(){
var element;
var scope;
var compile;
var val;


beforeEach(module('Templates'))
beforeEach(inject(function($compile,$rootScope){
	scope=$rootScope;
	compile  = $compile;
	val = true;
	scope.myConfig = {
		src: 'https://gist.githubusercontent.com/mshafrir/2646763/raw/bfb35f17bc5d5f86ec0f10b80f7b80e823e9197f/states_titlecase.json',
		title: 'name'
	};
	element = angular.element('<bossy-dropdown config={{myConfig}}></bossy-dropdown>');
	$compile(element)(scope);
	$rootScope.$digest();

}));
	// it('should populate bossy dropdown',function(){
	// 	expect(element.items.length).toMatch(58);

	// })


 })