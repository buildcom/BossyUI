angular.module('bossy.navigation')
    .directive('menu', function() {
        return {
            restrict: 'E',
            link: function(scope, element, attrs) {

                scope.Node = function(parentNode, subMenuObj) {
                    this.title = subMenuObj.title;
                    this.parentNode = parentNode;
                    if (angular.isString(subMenuObj.link) {
                        this.url = subMenuObj.link;
                    }
                    if (angular.isObject(subMenuObj.link) {
                        this.children = [];
                        for (childMenuObj in subMenuObj.link) {
                            this.children.push(new Node(this, childMenuObj));
                        }
                    }
                };

                scope.curNode = scope.rootNode = new scope.Node(null, attrs.menuObj);

                scope.updateView = function() {
                    scope.curTitle = scope.curNode.title;
                    scope.curChildren = scope.curNode.children;
                }
            }
        };
    })
;


