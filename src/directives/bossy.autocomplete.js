/**
 * @param {param} options
 * @param {Array} [options.dict=["apples", "oranges", "bananas"]] - Array of items for autocomplete.
 * @param {Number} [options.maxCorrections=0] - Maximum corrections.
 * @param {Number} [options.maxSuggestions=5] - Maximum suggestions.
 */
function Autocomplete (BKTree, utility) {
	return {
		restrict: 'E',
		replace: true,
		scope: {
			options: '='
		},
		link: function(scope, element, attrs) {
			scope.dict = scope.options.dict || [];
			scope.maxCorrections = scope.options.maxCorrections || 0;
			scope.maxSuggestions = scope.options.maxSuggestions || 5;
			scope.tree = new BKTree(scope.dict);
			scope.suggestions = [];

			scope.updateSuggestions = function(query) {
				var startsWithMatches = utility.filterStartsWith(scope.dict, query, true),
					correctionMatches = scope.tree.query(query, scope.maxCorrections);
				if (query.length > 0) {
					// ng-repeat doesn't work with Sets
					scope.suggestions = Array.from(new Set(startsWithMatches.concat(correctionMatches)));
				}
				else {
					scope.suggestions = [];
				}
			};

			scope.chooseSuggestion = function(suggestion) {
				scope.query = suggestion;
				scope.updateSuggestions(suggestion);
			};
		},
		template: '<div>' +
		'  <input ng-model="query" ng-change="updateSuggestions(query)">' +
		'  <div ng-repeat="sug in suggestions" ng-click="chooseSuggestion(sug)">{{sug}}</div>' +
		'</div>'
	};
}

Autocomplete.$inject = ['BKTree', 'utility'];

function AutocompleteUtility() {

	this.createMatrix = function(x,y) {
		var i, mat = new Array(x);
		for (i = 0; i < x; i++) {
			mat[i] = new Array(y);
		}
		return mat;
	};

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

}

AutocompleteUtility.$inject = [];

function AutocompleteBKTree (utility) {

	function levDist(str1, str2) {
		var i, j, mat = utility.createMatrix(str1.length + 1, str2.length + 1);
		// More readable if strings are 1-indexed
		// lower case for case-insensitive matching
		str1 = ' ' + str1.toLowerCase();
		str2 = ' ' + str2.toLowerCase();
		// Initialize first row values to edit distance from empty string
		for (i = 0; i < str1.length; i++) {
			mat[i][0] = i;
		}
		// Initialize first column values to edit distance from empty string
		for (j = 0; j < str2.length; j++) {
			mat[0][j] = j;
		}
		// Flood fill mat with edit distances between substrs of str1/str2
		for (j = 1; j < str2.length; j++) {
			for (i = 1; i < str1.length; i++) {
				if (str1[i] === str2[j]) {
					mat[i][j] = mat[i-1][j-1];
				}
				else {
					mat[i][j] = Math.min(mat[i-1][j] + 1,    // a deletion
						mat[i][j-1] + 1,    // an insertion
						mat[i-1][j-1] + 1); // a substitution
				}
			}
		}
		return mat[str1.length - 1][str2.length - 1];
	}

	var BKTreeNode = function(str) {
		this.str = str;
		this.children = {}; // key is edit-distance from this.str
	};

	BKTreeNode.prototype = {

		add: function(newNode) {
			var dist; // if newNode.str in tree, do nothing.
			if (newNode.str !== this.str) {
				dist = levDist(newNode.str, this.str);
				if (this.children[dist] === undefined) {
					this.children[dist] = newNode;
				}
				else {
					this.children[dist].add(newNode);
				}
			}
		},

		search: function(query, tolerance, matchObj) {
			var i, dist = levDist(query, this.str);
			if (dist <= tolerance) {
				matchObj[dist].push(this.str);
			}
			// Can't have negative distance
			i = dist - tolerance > 0 ? dist - tolerance : 0;
			for (; i <= dist + tolerance; i++) {
				if(this.children[i]) {
					this.children[i].search(query, tolerance, matchObj);
				}
			}
		}

	};

	function buildBKTree(dict) {
		var i, root = dict.length > 0 ? new BKTreeNode(dict[0]) : null;
		for (i = 1; i < dict.length; i++) {
			root.add(new BKTreeNode(dict[i]));
		}
		return root;
	}

	function searchBKTree(root, query, tolerance) {
		var dist, matchObj = {}, matches = [];
		for (dist = 0; dist <= tolerance; dist++) {
			matchObj[dist] = [];
		}
		root.search(query, tolerance, matchObj);
		for (dist = 0; dist <= tolerance; dist++) {
			matches = matches.concat(matchObj[dist]);
		}
		return matches;
	}

	return function(dict) {
		this._root = buildBKTree(dict);
		this.query = function(query, tolerance) {
			return this._root ? searchBKTree(this._root, query, tolerance) : [];
		};
	};
}

AutocompleteBKTree.$inject = ['utility'];

angular.module('bossy.autocomplete', [])
    .service('utility', AutocompleteUtility)
    .factory('BKTree', AutocompleteBKTree)
    .directive('bossyAutocomplete', Autocomplete);

