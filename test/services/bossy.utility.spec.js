describe('bossyUtility tests', function() {
    
    var utility;
    
    beforeEach(module('bossy.utility'));

    beforeEach(inject(function(_utility_) {
        utility = _utility_;
    }));

    describe('createMatrix tests', function() {

        it('Matrix of 0 width and height is empty array', function() {
            var mat = utility.createMatrix(0,0);
            expect(mat).toEqual([]);
        });

        it('Matrix of n width has length n', function() {
            var mat = utility.createMatrix(3,5);
            expect(mat.length).toEqual(3);
        });

        it('Matrix of m height contains arrays of length m', function() {
            var i, mat = utility.createMatrix(3,5);
            expect(mat[0].length).toEqual(5);
            expect(mat[1].length).toEqual(5);
            expect(mat[2].length).toEqual(5);
        });

    });
    
    describe('filterStartsWith tests', function() {
        
        it('Filtering an empty list returns []', function() {
            var matches = utility.filterStartsWith([], 'x', false);
            expect(matches).toEqual([]);
        });

        it('Returns [] when no words start with query', function() {
            var matches = utility.filterStartsWith(['axx', 'bxx', 'cxx'], 'x', false);
            expect(matches).toEqual([]);
        });

        it('Returns words that start with query', function() {
            var words = ['car', 'star', 'can', 'cup', 'CAR'];
            var matches = utility.filterStartsWith(words, 'ca', false);
            expect(matches).toEqual(['car', 'can']);
        });

        it('Ignores case when caseInsensitive is true', function() {
            var words = ['bOat', 'BoAr', 'BOnd', 'bar'];
            var matches = utility.filterStartsWith(words, 'bo', true);
            expect(matches).toEqual(['bOat', 'BoAr', 'BOnd']);
        });
    });

});
