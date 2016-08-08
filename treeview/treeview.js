function TreeviewController($scope) {
    $scope.hiddenChildren = false;

    $scope.clicked = function($event){
      if(!$scope.hiddenChildren)
        angular.element($event.target).children().css("display", "none");
      else
        angular.element($event.target).children().css("display", "initial");
      $scope.hiddenChildren = !$scope.hiddenChildren;
    };
    
    $scope.contents = {name: $scope.treeData.value, nodes: $scope.treeData.nodes};

} //end TreeviewController

function Treeview($compile){

    return {
        restrict: 'AE',
        scope: {
            treeData: '=',
            options: '='
        },
        controller: TreeviewController,
        link: function(scope, element, attr){
          var directiveTemplate =   
           '<ul ng-if="contents.nodes">'+
            '<li ng-repeat="node in contents.nodes" ng-click="clicked($event)">' +
              '<span ng-if="node.node">'+
                '{{node.node.value}}' +
                '<bossy-treeview tree-data="node.node" options=""></bossy-treeview>' +
              '</span>' +
              '<span ng-if="node.item">' +
                '{{node.item.value}}' +
              '</span>' +
            '</li>'+
           '</ul>';
           element.append(($compile(directiveTemplate))(scope));
       }   
    };
} //end Treeview

Treeview.$inject = ['$compile'];
TreeviewController.$inject = ['$scope'];

angular.module('bossy.treeview')
    .controller('bossyTreeviewController', TreeviewController)
    .directive('bossyTreeview', Treeview);
  
