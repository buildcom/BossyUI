describe('bossy.bktree tests', function() {
    
    var BKTree;

    beforeEach(module('bossy.utility')); // Dependency of bktree
    beforeEach(module('bossy.BKTree'));
    beforeEach(inject(function(_BKTree_) {
        BKTree = _BKTree_;
    }));

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

});

