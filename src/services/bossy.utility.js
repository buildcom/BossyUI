// Want a helpful function that's not directly tied to a
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
         * @param Array arr1
         * @param Array arr2
         */
        this.union = function(arr1, arr2) {
            var i, res = [], sum = arr1.concat(arr2)
            for (i = 0; i < sum.length; i++) {
                if (res.indexOf(sum[i]) !== -1) {
                    res.push(sum[i]);
                }
            }
            return res;
        };

    })
;
