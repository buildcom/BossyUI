/*!
 * bossy.js
 */

/*!
 * http://BossyUI.com/
 *
 * BossyUI - Created with LOVE by Build.com Open Source Consortium
 *
 * Licensed under the MIT license. Please see LICENSE for more information.
 *
 */

angular.module('bossy', [])

    .directive('bossyForm', function () {
        return {
            restrict: 'E',
            template: '<form><p>test form</p></form>',
            scope: {
            },
            link: function (scope, element, attributes) {
                console.log('test');
            }
        };
    })
;
