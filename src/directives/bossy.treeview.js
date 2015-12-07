function TreeviewController($scope, $rootScope) {

  $scope.contents = {
    showingChildren: [],
    nodes: $scope.treeData.nodes
  };
  
  $scope.nodeClicked = function($event, $index) {

    var indexInArr = $scope.contents.showingChildren.indexOf($index);
    (indexInArr > -1) ?
    $scope.contents.showingChildren.splice(indexInArr, 1):
      $scope.contents.showingChildren.push($index);
    $scope.changeSelection($event);
  };

  $scope.itemClicked = function($event, $index) {
    $scope.changeSelection($event);
  };

  $scope.showChildren = function($index) {
    if ($scope.contents.showingChildren.indexOf($index) > -1){
      return true;}
    return false;
  };

  $scope.changeSelection = function($event) {
    if (!angular.isUndefined($rootScope.curSelectedTV)){
      $rootScope.curSelectedTV.toggleClass('selected');}
    $rootScope.curSelectedTV = angular.element($event.target);
    $rootScope.curSelectedTV.toggleClass('selected');
  };
} //end TreeviewController

function Treeview($compile) {
  return {
    restrict: 'AE',
    scope: {
      treeData: '=',
    },
    controller: TreeviewController,
    link: function(scope, elem, attr) {
      var directiveTemplate =
        '<ul ng-if="contents.nodes">' +
          '<li ng-repeat="node in contents.nodes" >' +
            '<span ng-if="node.node">' +
              '<div class="nodeIcon collapsed" ng-click="nodeClicked($event, $index)" ' +
                'ng-class="showChildren($index) ? \'expanded\' : \'collapsed\'"> ' +
             '{{node.node.value}}' +
              '</div>' +
              '<bossy-treeview ng-show="showChildren($index)"' +
                'tree-data="node.node"></bossy-treeview>' +
            '</span>' +
            '<span ng-if="node.item">' +
              '<div class="fileIcon"ng-click="itemClicked($event, $index)">' +
                '{{node.item.value}}' + '<div class="content-type- {{node.item.type}}">' + 
                '<span ng-if="node.item.type">' + '{{node.item.type}}' + 
                 '</span>' + '</div>' +
              '</div>' +
            '</span>' +
          '</li>' +
        '</ul>';
      elem.append(($compile(directiveTemplate))(scope));
    }
  };
} //end Treeview

Treeview.$inject = ['$compile'];
TreeviewController.$inject = ['$scope', '$rootScope'];

angular.module('bossy.treeview',['bossy.filters'])
  .controller('bossyTreeviewController', TreeviewController)
  .directive('bossyTreeview', Treeview);
