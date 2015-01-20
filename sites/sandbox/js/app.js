angular.module('SandboxApp', [
    'bossy',
    'mc.resizer'
])
.controller('SandboxCtrl', ['$scope', '$document', '$window', function($scope, $document, $window) {
    var module =  angular.module('bossy'),
        bossyRef = $window.location.origin + $window.location.pathname.replace('index.html', '') + 'js/bossy.all.js';

    $scope.directives = [];

    for (var i in module.requires) {
        $scope.directives.push(module.requires[i]);
    }

    // PostToCodepen
    $scope.postToCodepen = function (directive) {
        var url = 'http://codepen.io/pen/define',
            penForm = angular.element('<form style="display: none;" target="_blank" method="post" action="' + url + '"></form>'),
            penFormData = angular.element('<input type="hidden" name="data">');

        // Replace Quotes and Return object as string.
        var setDataString = function (data){
            var string = JSON.stringify(data);
            string = string.replace(/"/g, "&quot;");
            string = string.replace(/'/g, "&apos;");
            return string;
        };


        var getData = function(){
            var htmlCode = '<script src="//cdnjs.cloudflare.com/ajax/libs/angular.js/1.3.1/angular.min.js"></script>' +
                '<script src="' + bossyRef + '"></script>\n' +
                '<div ng-app="sandboxApp" ng-controller="sandboxCtrl">\n' +
                '   <' + directive.replace('.', '-') + ' config="directiveConfig">\n' +
                '</div>';

            var jsCode = '' +
                'angular.module("sandboxApp", ["bossy"])\n\n' +
                '.controller("sandboxCtrl", ["$scope", function($scope) {\n' +
                '' +
                '   $scope.directiveConfig = {};\n' +
                '}])\n\n;';

            return setDataString({
                title              : "",
                description        : "",
                html               : htmlCode,
                html_pre_processor : "none",
                css                : "",
                css_pre_processor  : "scss",
                css_starter        : "neither",
                css_prefix_free    : false,
                js                 : jsCode,
                js_pre_processor   : "none",
                js_modernizr       : false,
                js_library         : "",
                html_classes       : "",
                css_external       : "",
                js_external        : ""
            });
        };

        penFormData.attr('value', getData());
        penForm.append(penFormData);

        $document.find('body').append(penForm);
        penForm[0].submit();
        penForm.remove();


    };

    $scope.openFiddle = function (directive) {
        var url = 'http://jsfiddle.net/api/post/angularjs/1.2.1/',
            form = angular.element('<form style="display: none;" target="_blank" method="post" action="' + url + '"></form>'),
            js = angular.element('<input type="hidden" name="js">'),
            html = angular.element('<input type="hidden" name="html">'),
            resources = angular.element('<input type="hidden" name="resources">');


        var htmlCode = '' +
            '<script src="' + bossyRef + '"></script>\n' +
            '<div ng-app="sandboxApp" ng-controller="sandboxCtrl">\n' +
            '   <' + directive.replace('.', '-') + ' config="directiveConfig">\n' +
            '</div>';

        html.attr('value', htmlCode);
        form.append(html);

        var jsCode = '' +
            'angular.module("sandboxApp", ["bossy"])\n\n' +
            '.controller("sandboxCtrl", ["$scope", function($scope) {\n' +
            '' +
            '   $scope.directiveConfig = {};\n' +
            '}])\n\n;';

        js.attr('value', jsCode);
        form.append(js);

        resources.attr('value', '');
        form.append(resources);

        $document.find('body').append(form);
        form[0].submit();
        form.remove();
    };
}])
.directive('doneTyping', function($rootScope){
    
    return {
        restrict: 'A',
        link: function(scope, element, atts) {
            console.log("binding events to the textarea");
            element.find('div.ace_line').bind('onchange', function(){
                $rootScope.$broadcast('doneTyping');
            });
            scope.$on('doneTyping', function(event, message){
                console.log("DONE TYPING");
            });
        }
    };
});