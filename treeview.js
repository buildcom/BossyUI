function TreeviewController($scope) {

    //$scope.clickable = true;
    $scope.clicked = false;

    //revise
    $scope.hasIcons = function (data) {
        if (data.hasOwnProperty('icons')) {
            if (data.icons.hasOwnProperty[1]) $scope.curIconSrc = data.icons[1]; //collapse
            else $scope.curIconSrc = data.icons[0]; //expand / any other type
            return true;
        }
        return false;
    };

    /*
    //revise
    $scope.expanded = function (data) {
        if ($scope.$parent.tree.showing) return true;
        return false;
    }; */
} //end TreeviewController

function Treeview() {
    //HTML for tree
    var template =
        '<div class="treeviewWrapper">' +
        '{{treeData}}'+
        '<ul class="treeList">' +
        '<li ng-repeat="node in treeData" >' +
        '<div class="dataItem" ng-click="clicked=!clicked">' +
        //'<img ng-class="{\'expanded\': clicked, \'collapsed\': !clicked}">' +
        //' ng-if="hasIcons(data)" ng-src="curIconSrc"/> ' +
        //'{{node.value}}' +
        '<br>';
        if(node.nodes.length > 0)
          template += '<bossy-treeview tree-data="node.nodes" options=""></bossy-treeview>';
    template = template + 'li</div></li>ul</ul>';
    template += '</div> <!-- / treeviewWrapper -->';
    console.log('executed');

    return {
        restrict: 'AE',
        scope: {
            options: '=',
            treeData: '='
        },
        //template: template,
        controller: TreeviewController
    };
} //end Treeview

Treeview.$inject = [];
TreeviewController.$inject = ['$scope'];

angular.module('bossy.treeview')
    .controller('bossyTreeviewController', TreeviewController)
    .directive('bossyTreeview', Treeview);
  