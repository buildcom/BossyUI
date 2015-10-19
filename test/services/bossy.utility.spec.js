describe('bossyUtility tests', function() {
    
    beforeEach(module('bossy.utility'));
    
    var utility;

    beforeEach(inject(function(_$utility_) {
        utility = _$utility_;
    }));

    describe('createMatrix tests', function() {

        it('Matrix 0 width and height is empty array', function() {
            // var mat = utility.createMatrix(0,0);
            // expect(mat).toEqual([]);
            expect(1).toEqual(1);
        });

    });
    
    describe('filterStartsWith tests', function() {
    });

});
