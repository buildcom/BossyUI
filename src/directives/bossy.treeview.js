//Bossy-UI Treeview Directive
//Sample Demo: http://plnkr.co/edit/EjBvBqt2M1BrOHGuQQbF?p=preview
function TreeviewController($scope, $rootScope) {
  
    //Create a subtree for all children in structure
    //Create an array for storing currently showing children of a given node
    $scope.contents = {showingChildren: [], nodes: $scope.treeData.nodes};

    //Handling of a clicked folder (node)
    $scope.nodeClicked = function($event, $index){
      var indexInArr = $scope.contents.showingChildren.indexOf($index);
      (indexInArr>-1) ? 
        $scope.contents.showingChildren.splice(indexInArr, 1) :
        $scope.contents.showingChildren.push($index);
      $scope.changeSelection($event);  
    };
    
    //Handling of a clicked item
    $scope.itemClicked = function($event, $index){
      $scope.changeSelection($event);
    }
    
    //Returns if current node is showing children or not
    $scope.showChildren = function($index){
      if($scope.contents.showingChildren.indexOf($index)>-1)
        return true;
      return false;  
    };
    
    //Allow for highlighting of last clicked item or folder
    $scope.changeSelection = function($event){
      if(!angular.isUndefined($rootScope.curSelected))
        $rootScope.curSelected.toggleClass('selected');
      $rootScope.curSelected = angular.element($event.target);
      $rootScope.curSelected.toggleClass('selected');
    };
} //end TreeviewController

//Main directive definition object
function Treeview($compile){
    return {
        restrict: 'AE',
        scope: {
            treeData: '=',
        },
        controller: TreeviewController,
        link: function(scope, elem, attr){
          var directiveTemplate =   
           '<ul ng-if="contents.nodes">'+
            '<li ng-repeat="node in contents.nodes" >' +
              '<span ng-if="node.node">'+
                '<div class="nodeIcon collapsed" ng-click="nodeClicked($event, $index)" ' +
                'ng-class="showChildren($index) ? \'expanded\' : \'collapsed\'"> ' +
                  '{{node.node.value}}</div>' +
                '<bossy-treeview ng-show="showChildren($index)"' +
                  'tree-data="node.node"></bossy-treeview>' +
              '</span>' +
              '<span ng-if="node.item">' +
                '<div class="fileIcon"ng-click="itemClicked($event, $index)">' +
                '{{node.item.value}}</div>' +
              '</span>' +
            '</li>'+
           '</ul>';
           //Compile the template so that the recursing directive functions properly
           elem.append(($compile(directiveTemplate))(scope));
       }   
    };
} //end Treeview

Treeview.$inject = ['$compile'];
TreeviewController.$inject = ['$scope', '$rootScope'];

angular.module('bossy.treeview')
    .controller('bossyTreeviewController', TreeviewController)
    .directive('bossyTreeview', Treeview);