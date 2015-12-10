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
                        scope.menuObj.activeMenuId = menuId;
                    }
                }

                // Each call to uniqueId() returns the next integer 
                // in the sequence 0,1,2,..., prepend a '__' to the
                // id to avoid conflicts with user-specified ids
                var __next_id = 1;
                function uniqueId() {
                    return '__' + __next_id++;
                }

                // Traverses subMenuObj and builds a <ul> for every submenu
                function buildSubMenus(subMenusElem, parentMenuId, subMenuObj) {

                    // Create the <ul> element for subMenuObj. The element 
                    // should only show when its id is the active menu id
                    var subMenuElem = angular.element(
                        '<ul ng-show="menuObj.activeMenuId===\'' + 
                        subMenuObj.menuId + '\'"></ul>'
                    );

                    // The header for the submenu element sets the active menu
                    // id to the parent menu's id when clicked. 
                    subMenuElem.append(angular.element(
                        '<lh><strong ng-click="menuObj.activeMenuId=\'' + 
                        parentMenuId + '\'">' + subMenuObj.title + 
                        '</strong></lh>'
                    ));

                    angular.forEach(subMenuObj.subMenus, function(childMenuObj) {
                        if (childMenuObj.subMenus) {

                            // Generate an id if the user didn't specify one
                            if (angular.isUndefined(childMenuObj.menuId)) {
                                childMenuObj.menuId = uniqueId();
                            }
                            subMenuElem.append(angular.element(
                                '<li><span ng-click=menuObj.activeMenuId=\'' + 
                                childMenuObj.menuId + '\'>' + childMenuObj.title + 
                                '</span></li>'
                            ));
                            buildSubMenus(subMenusElem, subMenuObj.menuId, childMenuObj);
                        }
                        if (childMenuObj.url) {
                            subMenuElem.append(angular.element(
                                '<li><a href="' + childMenuObj.url + '">' + 
                                childMenuObj.title + '</a></li>'
                            ));
                        }
                    });
                    subMenusElem.append(subMenuElem);
                }
    
                function buildNavbar(menuObj) {
                    var navbar = angular.element('<ul>');
                    angular.forEach(scope.menuObj.navigation, function(rootMenuObj) {
                        var rootMenuElem, subMenusElem;
                        if (angular.isUndefined(rootMenuObj.menuId)) {
                            rootMenuObj.menuId = uniqueId();
                        }
                        if (rootMenuObj.subMenus) {
                            rootMenuElem = angular.element(
                                '<li><strong ng-click="toggleOpen(\'' + 
                                rootMenuObj.menuId + '\')">' + rootMenuObj.title + 
                                '</strong></li>'
                            );
                            buildSubMenus(rootMenuElem, '', rootMenuObj);
                            rootMenuElem.append(subMenusElem);
                        }
                        else if (rootMenuObj.url) {
                            rootMenuElem = angular.element( 
                                '<li><a href="' + rootMenuObj.url + '">' + 
                                rootMenuObj.title + '</a>'
                            );
                        }
                        navbar.append(rootMenuElem);
                    });
                    element.append(navbar);
                    $compile(element.contents())(scope);
                }

                $q.when($data.getData(scope.menuUrl || scope.menuObj)).then(function(result) {
                    scope.menuObj = result;
                    buildNavbar(result);
                });
            },
        };
    }])
;
