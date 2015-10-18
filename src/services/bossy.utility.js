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
         */
        this.filterStartsWith = function(words, query) {
            return words.filter(function(w) {
                return w.startsWith(query);
            });
        };

        /**
         * http://stackoverflow.com/a/10050831
         *
         * @param int n
         * @return [0..n-1]
         */
        this.range = function(n) {
            return Array.apply(null, Array(n)).map(function (_, i) {return i;});
        }

    })
;
