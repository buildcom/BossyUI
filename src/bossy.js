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

//TODO: need layout, labels
var bossy = angular.module('bossy', [
        'app.factory.bossy.data',
        'app.factory.bossy.schema',
        'app.directive.bossy.form',
        'app.directive.bossy.input',
        'app.directive.bossy.button'
    ]
);
