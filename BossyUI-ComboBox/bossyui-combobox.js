var bossyuicombobox = angular.module('bossyui-combobox', [])

bossyuicombobox.controller('defaultCtrl', function($scope){
    $scope.suggestions = [
        { name: "Option A" },
        { name: "Option B" },
        { name: "Option C" }
    ]
});
bossyuicombobox.directive('bossytextbox', function() {
    return {
        template: '<input list="options">' +
            '<datalist id="options">' +
            '<option ng-repeat="s in suggestions" value="{{s.name}}"></option>' +
            '</datalist>',
        link: function($scope){
            $scope.suggestions = [
                { name: "angular" },
                { name: "bossy" },
                { name: "combobox" }
            ]  
        }
    };
});