describe('bossySchema test', function(){

	var schemaService,
		rootScope,
		deferred;
	beforeEach(module('Templates'));
	beforeEach(module('bossy.schema'));
	beforeEach(inject(function(_$schema_, _$rootScope_, _$q_) {
		schemaService = _$schema_;
		rootScope = _$rootScope_;

		deferred = _$q_.defer();
		deferred.resolve('data');
		spyOn(schemaService,'getSchema').andReturn(deferred.promise);
	}));

	it('should call getSchema function',function(){
		schemaService.getSchema();
		expect(schemaService.getSchema).toHaveBeenCalledWith();
	});

	it('getSchema should be called with arguments',function(){
		var x =schemaService.getSchema('abc');
		expect(schemaService.getSchema).toHaveBeenCalledWith('abc');
	});
	var input = {
		title: 'Login Form',
		type: 'object',
		properties: {
			title: {
				type: 'string',
				tag: 'bossy-label',
				title: 'Login to enter',
			},
			terms: {
				type: 'boolean',
				tag: 'bossy-radio',
				title: 'Accept terms and conditions'
			},
			username: {
				type: 'string',
				tag: 'bossy-input-text',
				title: 'Username'
			},
			gender: {
				title: 'Gender',
				type: 'string',
				enum: ['female', 'male']
			}
		},
		required: ['terms', 'gender', 'username']
	};

	it('getSchema should return valid data',function(){
		var x = schemaService.getSchema(input);
		rootScope.$apply();
		expect(schemaService.getSchema).toHaveBeenCalledWith(input);
		expect(x).toMatch(input);
	});
});