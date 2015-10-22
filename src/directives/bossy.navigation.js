angular.module('bossy.navigation')
    .directive('menu', function() {
        return {
            restrict: 'E',
            link: function(scope, element, attrs) {

                scope.Node = function(subMenuObj) {
                    this.title = subMenuObj.title;
                    if (angular.isString(subMenuObj.link) {
                        this.url = subMenuObj.link;
                    }
                    if (angular.isObject(subMenuObj.link) {
                        this.children = [];
                        for (childMenuObj in subMenuObj.link) {
                            this.children.push(new Node(childMenuObj));
                        }
                    }
                };

                scope.curNode = scope.rootNode = new Node(attrs.menuObj);
            }
        };
    })
;


