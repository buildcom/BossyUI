describe("bossyDropdown", function () {
var $rootScope,
	$scope,
	controller;

	beforeEach(function() {
		angular.module('whatever', ['bossy.dropdown'])
				.controller('testController', ['$scope', function($scope) {
					$scope.myConfig = {
						src: 'https://gist.githubusercontent.com/mshafrir/2646763/raw/bfb35f17bc5d5f86ec0f10b80f7b80e823e9197f/states_titlecase.json',
						title: 'abbreviation',
						items: [],
						select: {}//,
						//template: '<div>shit</div>'
						//template: 'other-template.html'
						//template: 'https://raw.githubusercontent.com/smartin43/javabang-BossyUI/smartin43/src/directives/templates/other-template.html'
					};
				}]);

		inject(function ($injector) {
			$rootScope = $injector.get('$rootScope');
			$scope = $rootScope.$new();
			controller = $injector.get('controller')("testController", {$scope: $scope});
		});
	});

	describe()
});


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