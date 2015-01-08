angular.module('SandboxApp', [
    'bossy'
])

    .controller('SandboxCtrl', ['$scope', '$document', '$window', function($scope, $document, $window) {
        var module =  angular.module('bossy');

        $scope.directives = [];

        for (var i in module.requires) {
            $scope.directives.push(module.requires[i]);
        }

        $scope.openFiddle = function (directive) {
            var url = 'http://jsfiddle.net/api/post/angularjs/1.2.1/',
                form = angular.element('<form style="display: none;" target="_blank" method="post" action="' + url + '"></form>'),
                js = angular.element('<input type="hidden" name="js">'),
                html = angular.element('<input type="hidden" name="html">'),
                resources = angular.element('<input type="hidden" name="resources">'),
                bossyRef = $window.location.origin + $window.location.pathname.replace('index.html', '') + 'js/bossy.all.js';

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
;