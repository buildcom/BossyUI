angular.module('bossy.navigation', ['bossy.data'])

    .directive('navigation', ['$data', function($data) {
        return {

            link: function(scope, element, attrs) {
                var root;

                function Node(parentNode, menuObj) {
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
                }

                // Retrieve the menu data
                $data.getData(attrs.data).then(function(result) {
                    // TODO: validate result
                    scope.menuList = result.navigation;
                    // Initialize state tree & settings for each menu in the navbar
                    scope.menus = [];
                    angular.forEach(scope.menuList, function(menu, key) {
                        root = new Node(null, menu);
                        scope.menus.push( 
                            {
                                open: false,
                                curNode: root,
                                rootNode: root,
                            }
                        );
                    });

                    scope.curOpenMenuIndex = null;

                    // Called when a menu header is clicked.
                    scope.toggleOpen = function(menu, menuIndex) {
                        // menu is open
                        if (scope.curOpenMenuIndex === menuIndex) {
                            scope.curOpenMenuIndex = null;
                        }
                        // menu is closed
                        else {
                            scope.curOpenMenuIndex = menuIndex;
                            // Reset menu state
                            menu.curNode = menu.rootNode;
                        }
                    };
                });

            },
            template:
                '<ul>' +
                  '<li ng-repeat="menu in menus">' +
                    // If the menu header is a link
                    '<a ng-if="menu.rootNode.url" href="menu.rootNode.url">{{menu.rootNode.title}}</a>' +
                    // If the menu expands to submenus (it has children)
                    '<strong ng-if="menu.rootNode.children" ng-click="toggleOpen(menu, $index)">{{menu.rootNode.title}}</strong>' +
                    // Each menu expands to a submenu
                    // Only current open menu is shown (expanded)
                    '<ul ng-show="curOpenMenuIndex===$index">' +
                      // List header only shows when the current node is not the root
                      // Clicking the header sets the current node to its parent.
                      '<lh ng-if="menu.curNode!==menu.rootNode" ng-click="menu.curNode=menu.curNode.parentNode"><strong>{{menu.curNode.title}}</strong></lh>' +
                      '<li ng-repeat="node in menu.curNode.children">' +
                        // Leaf node (is a link)
                        '<a ng-if="node.url" href="node.url">{{node.title}}</a>' +
                        // Subtree (has a submenu)
                        '<span ng-if="node.children" ng-click="menu.curNode=node">{{node.title}}</span>' +
                      '</li>' +
                    '</ul>' +
                  '</li>' +
                '</ul>'
        };

    }])
;
