describe('bossyUtility tests', function() {
    
    var utility;
    
    beforeEach(module('bossy.utility'));

    beforeEach(inject(function(_utility_) {
        utility = _utility_;
    }));

    describe('createMatrix tests', function() {

        it('Matrix 0 width and height is empty array', function() {
            var mat = utility.createMatrix(0,0);
            expect(mat).toEqual([]);
        });

    });
    
    describe('filterStartsWith tests', function() {
    });

});
