describe('bossyInput', function() {
	var element;

	beforeEach(module('Templates'));
	beforeEach(inject(function(){
		element = angular.element('<bossy-input title = "Sample Bossy Input">Bossy Input</bossy-input>');

	}));

	it('should add bossy input',function(){
		expect(element.text()).toMatch('Bossy Input');
		expect(element.attr('title')).toMatch('Sample Bossy Input');
	});

});