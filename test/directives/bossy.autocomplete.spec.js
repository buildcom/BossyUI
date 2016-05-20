describe('bossyAutocomplete tests', function() {

    var utility, BKTree, $rootScope, $compile, scope, elem;

    // Load module
    beforeEach(module('bossy.autocomplete'));

    // Inject dependencies
    beforeEach(inject(function(_utility_, _BKTree_, _$rootScope_, _$compile_) {
        utility = _utility_;
        BKTree = _BKTree_;
        $rootScope = _$rootScope_;
        $compile = _$compile_;
    }));
    
    describe('utility tests', function() {

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

			it('Border testing on createMatrix function', function() {
                var i, mat = utility.createMatrix(3,5);
                expect(mat[0].length).not.toBe(6);
				expect(mat[1].length).not.toBe(6);
				expect(mat[2].length).not.toBe(6);
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

			it('Matches case sensitive words', function() {
                var words = ['mat', 'MAT'];
                var matches = utility.filterStartsWith(words, 'mat', false);
                expect(matches).toEqual(['mat']);
            });

        });

    });

    describe('BKTree tests', function() {

        it('Empty tree has null root', function() {
            var tree = new BKTree([], 0);
            expect(tree._root).toEqual(null);
        });

        it('Non-empty tree has non-null root', function() {
            var tree = new BKTree(['abc', 'xyz'], 0);
            expect(tree._root).not.toEqual(null);
        });

        it('Zero tolerance query returns only exact match', function() {
            var tree = new BKTree(['abc', 'xyz', 'bbc']);
            expect(tree.query('abc', 0)).toEqual(['abc']);
            expect(tree.query('yyz', 0)).toEqual([]);
        });

        it('Tree does not contain duplicates', function() {
            var tree = new BKTree(['cat', 'cat', 'cat']);
            expect(tree.query('cat', 0)).toEqual(['cat']);
        });

        it('Tree with 1 tolerance matches words 1 correction from query', function() {
            var tree = new BKTree(['cat', 'rat', 'bat', 'dog', 'frog']);
            expect(tree.query('mat', 1)).toEqual(['cat', 'rat', 'bat']);
        });

		it('Tree with 0 tolerance returns 2 similar words with different case', function() {
            var tree = new BKTree(['mat', 'MAT']);
            expect(tree.query('mat', 0)).toEqual(['mat', 'MAT']);
        });

    });

    describe('bossy.autocomplete tests', function() {
        
        it('Element is created', function() {
            scope = $rootScope.$new()
            scope.config = { dict: [] };
            elem = angular.element('<bossy-autocomplete config="config"></bossy-autocomplete>');
            $compile(elem)(scope);
            // Check if input tag was created
            expect(elem.find('input').length).toEqual(1); 
        });

    });

});
