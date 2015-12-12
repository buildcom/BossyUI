angular.module('bossy.navigation', ['bossy.data'])

    .directive('navigation', ['$q', '$compile', '$data', function($q, $compile, $data) {
        return {
            scope: { 
                menuUrl: '@?',
                menuObj: '=?',
            },
            link: function(scope, element, attrs) {

                scope.toggleOpen = function(menuId) {
                    if (scope.menuObj.activeMenuId === menuId) {
                        scope.menuObj.activeMenuId = undefined;
                    }
                    else {
                        if (scope.menuObj._activeRoot == menuId) {
                            scope.menuObj.activeMenuId = undefined;
                            scope.menuObj._activeRoot = undefined;
                        }
                        else {
                            scope.menuObj.activeMenuId = menuId;
                            scope.menuObj._activeRoot = menuId;
                        }
                    }
                }

                // Each call to uniqueId() returns the next integer 
                // in the sequence 0,1,2,..., prepent a '__' to the
                // id to avoid conflicts with user-specified ids
                var __next_id = 1;
                function uniqueId() {
                    return '__' + __next_id++;
                }

                // Traverses subMenuObj and builds a <ul> for every submenu
                function buildSubMenus(subMenusElem, parentMenuId, subMenuObj, isRoot) {

                    // Create the <ul> element for subMenuObj. The element 
                    // should only show when its id is the active menu id
                    var subMenuElem = angular.element(
                        '<ul class="submenu" ng-show="menuObj.activeMenuId===\'' + 
                        subMenuObj.menuId + '\'"></ul>'
                    );

                    if (!isRoot) {
                        // The header for the submenu element sets the active menu
                        // id to the parent menu's id when clicked. 
                        subMenuElem.append(angular.element(
                            '<lh class="submenu-header"><strong ng-click="menuObj.activeMenuId=\'' + 
                            parentMenuId + '\'">' + subMenuObj.title + 
                            '</strong></lh>'
                        ));
                    }

                    angular.forEach(subMenuObj.subMenus, function(childMenuObj) {
                        if (childMenuObj.subMenus) {
                            // Generate an id if the user didn't specify one
                            if (angular.isUndefined(childMenuObj.menuId)) {
                                childMenuObj.menuId = uniqueId();
                            }
                            subMenuElem.append(angular.element(
                                '<li class="submenu-item"><span ng-click=menuObj.activeMenuId=\'' + 
                                childMenuObj.menuId + '\'>' + childMenuObj.title + 
                                '</span></li>'
                            ));
                            buildSubMenus(subMenusElem, subMenuObj.menuId, childMenuObj, false);
                        }
                        if (childMenuObj.url) {
                            subMenuElem.append(angular.element(
                                '<li class="submenu-item"><a class="navbar-link" href="' + childMenuObj.url + '">' + 
                                childMenuObj.title + '</a></li>'
                            ));
                        }
                    });
                    subMenusElem.append(subMenuElem);
                }
    
                function buildNavbar(menuObj) {
                    var navbar = angular.element('<ul class="navbar"></ul>');
                    angular.forEach(scope.menuObj.navigation, function(rootMenuObj) {
                        var rootMenuElem, subMenusElem;
                        if (angular.isUndefined(rootMenuObj.menuId)) {
                            rootMenuObj.menuId = uniqueId();
                        }
                        if (rootMenuObj.subMenus) {
                            rootMenuElem = angular.element(
                                '<li class="navbar-item"><strong ng-click="toggleOpen(\'' + 
                                rootMenuObj.menuId + '\')">' + rootMenuObj.title + 
                                '</strong></li>'
                            );
                            buildSubMenus(rootMenuElem, '', rootMenuObj, true);
                            rootMenuElem.append(subMenusElem);
                        }
                        else if (rootMenuObj.url) {
                            rootMenuElem = angular.element( 
                                '<li class="navbar-item"><a class="navbar-link" href="' + rootMenuObj.url + '">' + 
                                rootMenuObj.title + '</a></li>'
                            );
                        }
                        navbar.append(rootMenuElem);
                    });
                    element.append(navbar);
                    $compile(element.contents())(scope);
                }

                console.log(scope.menuUrl);
                $q.when($data.getData(scope.menuUrl || scope.menuObj)).then(function(result) {
                    scope.menuObj = result;
                    buildNavbar(result);
                });
            },
        };
    }])

    .controller('MyCtrl', ['$scope', function($scope) {
        $scope.demo2Menu = {

            "activeMenuId": "python",
            "navigation": 
            [
                {
                    "title": "Home",
                    "url": "http://www.bossyui.io/"
                },
                {
                    "title": "Resumes",
                    "menuId": "resumes",
                    "subMenus":
                    [
                        {
                            "title": "Technical",
                            "url": "https://www.linkedin.com/in/eddie-bracho-00b8ab84"
                        },
                        {
                            "title": "General",
                            "url": "https://www.linkedin.com/in/eddie-bracho-00b8ab84"
                        }
                    ]
                },
                {
                    "title": "Projects",
                    "menuId": "projects",
                    "subMenus":
                    [
                        {
                            "title": "Python",
                            "menuId": "python",
                            "subMenus":
                            [
                                {
                                    "title": "Artificial Neural Network",
                                    "url": "https://github.com/ebracho/ANN"
                                },
                                {
                                    "title": "Boolean Expression Interpreter",
                                    "url": "https://github.com/ebracho/Boolean_Expression_Interpreter"
                                },
                                {
                                    "title": "Tetris Clone",
                                    "url": "https://github.com/ebracho/Tetris"
                                },
                                {
                                    "title": "Irc Bot",
                                    "url": "https://github.com/ebracho/kazbot"
                                }
                            ]
                        },
                        {
                            "title": "Javascript",
                            "menuId": "javascript",
                            "subMenus":
                            [
                                {
                                    "title": "Navigation",
                                    "url": "https://github.com/ebracho/BossyUI/tree/NAVIGATION-170"
                                },
                                {
                                    "title": "Autocomplete",
                                    "url": "https://github.com/ebracho/BossyUI/tree/AUTOCOMPLETE-163"
                                }
                            ]
                        },
                        {
                            "title": "C++",
                            "menuId": "c++",
                            "subMenus":
                            [
                                {
                                    "title": "Matrix Library",
                                    "url": "ebracho.com/projects/c++/matrix_library"
                                }
                            ]
                        }
                    ]
                },
                {
                    "title": "Github",
                    "url": "http://github.com/ebracho"
                }
            ]
        };
    }])
;

