angular.module('bossy.autocomplete', ['bossy.BKTree', 'bossy.utility'])
    .directive('bossyAutocomplete', ['BKTree', 'utility', function(BKTree, utility) {
        return {
            restrict: 'E',
            replace: true,
            scope: {
                dict: '=',
                maxCorrections: '=?', // Default: 0
                maxSuggestions: '=?', // Default: 5
            },
            link: function(scope, element, attrs) {
                var i;
                scope.maxCorrections = scope.maxCorrections || 0;
                scope.maxSuggestions = scope.maxSuggestions || 5;
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
    }])
;

