angular.module('bossy.navigation', ['bossy.data'])

    .directive('menu', ['$data', function($data) {
        return {

            restrict: 'E',
            link: function(scope, element, attrs) {

                Node = function(parentNode, menuObj) {
                    var i, childMenuObj;
                    this.title = menuObj.title;
                    this.parentNode = parentNode;
                    if (angular.isString(menuObj.link)) {
                        this.url = menuObj.link;
                    }
                    if (angular.isArray(menuObj.link)) {
                        this.children = [];
                        for (i = 0; i < menuObj.link.length; i++) {
                            this.children.push(new Node(this, menuObj.link[i]));
                        }
                    }
                };

                scope.menu = {
                    open: false,
                    root: null,
                    cur: null,
                };

                $data.getData(attrs.data).then(function(result) {
                    scope.menu.cur = scope.menu.root = new Node(null, result.navigation[0]);
                    console.log(result.navigation[0]);
                });

                scope.updateView = function(node) {
                    scope.menu.cur = node;
                    console.log(scope.menu.cur.children);
                };

                scope.toggleOpen = function() {
                    scope.menu.open = !scope.menu.open;
                    scope.menu.cur = scope.menu.root;
                };

            },
            template: 
               '<div>' +
                  '<strong ng-click="toggleOpen()">{{menu.root.title}}</strong>' +
                  '<ol ng-show="menu.open">' +
                      '<lh ng-show="menu.cur!==menu.root" ng-click="updateView(menu.cur.parentNode)">{{menu.cur.title}}</lh>' +
                      '<li ng-repeat="node in menu.cur.children">' +
                          '<a ng-if="node.url" ng-attr-href="{{node.url}}">{{node.title}}</a>' +
                          '<div ng-if="node.children" ng-click="updateView(node)">{{node.title}}</div>' +
                      '</li>' +
                  '</ol>' +
              '<div>'

        };
    }])
;
