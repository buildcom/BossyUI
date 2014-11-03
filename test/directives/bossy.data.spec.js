describe('bossyData',function(){

    var dataService,
        deferred;

    beforeEach(module('bossy.data'));

    beforeEach(inject(function(_$data_,_$q_) {
            dataService = _$data_;

            deferred = _$q_.defer();
            deferred.resolve('data');
            spyOn(dataService,'getData').andReturn(deferred.promise);
        })
    );

    it('should call getData function',function(){
        dataService.getData();
        expect(dataService.getData).toHaveBeenCalledWith();

    });

    it('getData should be called with arguments',function(){
        dataService.getData('abc');
        expect(dataService.getData).toHaveBeenCalledWith('abc');

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

    it('getData should return valid data',function(){

        var data = dataService.getData(input);
        expect(dataService.getData).toHaveBeenCalledWith(input);
        expect(data).toMatch(input);
    });

});
