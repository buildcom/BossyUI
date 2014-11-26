angular.module('bossy.dropdown', [])
    .run(function($templateCache) {
        $templateCache.put('jasmineTest.html', 'jasmineTest.html');
    })
    
    /*.factory('bossyDropdownFactory', ['$http', function($http) {
        return {
            _options: {
                title: 'drop title',
                content: 'pop'
            }
        }
        // $http.get('https://gist.githubusercontent.com/mshafrir/2646763/raw/bfb35f17bc5d5f86ec0f10b80f7b80e823e9197f/states_titlecase.json').success(function(data){
            // _options.content = data;
        // })
    }])*/
    
    .directive('bossyDropdown', function($compile, $data/*, $schema*/) {
        var _data;
        function setData(data) {
            var result = $data.getData(data);
            if( angular.isFunction( result.then ) && angular.isFunction( result.catch ) && angular.isFunction( result.finally ) ) //{
                return result;
            else
                console.log(result);//return result;
            /*} else {
                _data = result;
            }*/
        }
        
        return {
            restrict: 'EA',
            replace: true,
            scope: {
                src: '@',
                placeholder: '='
            },
            template: '',
            //templateUrl: 'bossy.dropdown.html',
            link: function(scope, element, attrs) {
                console.log(element);
                var json = setData(scope.src);
                element.html(
                    '<select>'
                        + '<option ng-repeat="j in json" value="{{j.code}}">{{j.name}}</option>'
                    + '</select>'
                );
                $compile(element.contents())(scope);
            }
            /*controller:['$scope', 'bossyDropdownFactory', function($scope, bossyDropdownFactory) {
                    this._options = {
                    title: bossyDropdownFactory._options.title,
                    content: bossyDropdownFactory._options.content
                };
            }],
            controllerAs: "drops"*/
        };
    });