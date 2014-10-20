angular.module('BossyUI-ComboBox')
    .controller('Controller', ['$scope', function($scope){
        $scope.choices = [
            { name: "Option A" },
            { name: "Option B" },
            { name: "Option C" }
        ]
    }])
    .directive('Textfield', function($timeout) {
        
    });