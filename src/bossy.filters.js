/*!
 * bossy.filters.js
 */

/*!
 * http://BossyUI.com/
 *
 * BossyUI - Created with LOVE by Build.com Open Source Consortium
 *
 * Licensed under the MIT license. Please see LICENSE for more information.
 *
*/

angular.module('bossy.filters', [])
.filter('bossyUnsafeHtml', function($sce) {
	return function(val) {
		return $sce.trustAsHtml(val);
	};});
