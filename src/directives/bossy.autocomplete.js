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
                scope.maxCorrections = angular.isUndefined(scope.maxCorrections) ? 0 : scope.maxCorrections;
                scope.maxSuggestions = angular.isUndefined(scope.maxSuggestions) ? 5 : scope.maxSuggestions;
                scope.tree = new BKTree(scope.dict, scope.maxCorrections);
                scope.suggestions = []

                scope.updateSuggestions = function(query) {
                    var startsWithMatches = utility.filterStartsWith(scope.dict, query);
                        correctionMatches = scope.tree.query(query);
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
