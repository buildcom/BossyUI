angular.module('bossy.input', [])
    .run(function($templateCache){
        $templateCache.put('bossy-input.html', '<div class="form-group bossy-input"><label for="">{{title}}</label><input type="{{type}}" class="form-control" placeholder="" value="{{value}}"/><span></span></div>');
    })
    .directive('bossyInput',['$compile','$http','$schema','$data','$templateCache', function ($compile, $http, $schema, $data, $templateCache) {
        return {
            restrict: 'E',
            replace: true,
            scope: {
                title: '=',
                value: '=',
                type: '=',
                required: '='
            },
            template: $templateCache.get('bossy-input.html')
        };
    }]);