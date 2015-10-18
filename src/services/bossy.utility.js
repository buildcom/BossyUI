// Need a helpful function that's not directly tied to a
// controller/directive/service? Put it here.

angular.module('bossy.utility', [])
    .service('utility', function() {

        /**
         * @param int x
         * @param int y
         */
        this.createMatrix = function(x,y) {
            var i, mat = new Array(x);
            for (i = 0; i < x; i++) {
                mat[i] = new Array(y);
            }
            return mat;
        };

        /**
         * @param [String] words
         * @param String query
         * @param Boolean caseInsensitive
         */
        this.filterStartsWith = function(words, query, caseInsensitive) {
            var compare;
            if (caseInsensitive) {
                compare = function(w) {
                    return w.toLowerCase().startsWith(query.toLowerCase());
                };
            }
            else {
                compare = function(w) {
                    return w.startsWith(query)
                };
            }
            return words.filter(compare);
        };

    })
;

