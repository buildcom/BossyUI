(function() {

    /**
     * [Input description]
     * @param {[type]} $compile [description]
     */
    function Input($compile) {

        var templateDefault = '<fieldset class="bossy-fieldset"> <legend class="bossy-legend">{{config.title}}</legend> <div class="bossy-input"> <input type="{{config.type}}" placeholder="{{config.placeholder}}" value="{{config.value}}"/> <span></span> </div> </fieldset>';
        var templatePrefix = '<fieldset class="bossy-fieldset"> <legend class="bossy-legend">{{config.title}}</legend> <div class="bossy-input"> <input class="prefix" type="{{config.type}}" placeholder="{{config.placeholder}}" value="{{config.value}}"/> <span></span> <span class="bossy-input-component bossy-input-prefix">{{config.prefixText}}</span> </div> </fieldset>';
        var templatePostfix = '<fieldset class="bossy-fieldset"> <legend class="bossy-legend">{{config.title}}</legend> <div class="bossy-input"> <input class="postfix" type="{{config.type}}" placeholder="{{config.placeholder}}" value="{{config.value}}"/> <span></span> <span class="bossy-input-component bossy-input-postfix">{{config.postfixText}}</span> </div> </fieldset>';

        var getTemplate = function(templateType) {
            var template = '';

            switch (templateType) {
                case 'prefix':
                    template = templatePrefix;
                    break;
                case 'postfix':
                    template = templatePostfix;
                    break;
                default:
                    template = templateDefault;
                    break;
            }
            return template;
        }


        _controller.$inject = ['$scope', '$filter'];

        function _controller($scope, $filter) {
            var config = {
                maxLength: 0,
                height: 200,
                width: 200,
                type: 'text',
                value: '',
                title: 'title'
            };

            $scope.config = angular.extend({}, config, $scope.config);            
        }

        return {
            restrict: 'E',
            replace: true,
            scope: {
                config: '='
            },
            link: function(scope, element, attrs) {
                element.html(getTemplate(scope.config.templateType));
                $compile(element.contents())(scope);
                
                scope.$watch(function($scope) {
                    return $scope.config.value;
                }, function(newVal, oldVal) {
                    console.log(newVal, oldVal);
                }, true);
            },
            template: templateDefault,
            controller: _controller
        };
    }

    Input.$inject = ['$compile'];

    angular.module('bossy.input', [])
        .directive('bossyInput', Input);
})();