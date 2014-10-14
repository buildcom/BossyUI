var multiSelect = angular.module('multiSelect', ['multiselect-dropdown'])

        .controller('AppCtrl', [ '$scope', function ($scope) { //new controller for HTML-element

            $scope.choicesModel = []; //set up model

            $scope.choices = [ //array for options within dropdown
                {id: 1, name: "Option A"},
                {id: 2, name: "Option B"},
                {id: 3, name: "Option C"},
                {id: 4, name: "Option D"},
                {id: 5, name: "Option E"}
            ];

            $scope.choicesSettings = { //set up displayed text while items selected
                smartButtonMaxItems: 8,
                smartButtonTextConverter: function(itemText, originalItem) {
                    return itemText.replace('Option','');
                }
            };

            // $scope.choicesSettings = {selectionLimit: 3};
            // uncomment when selection limit wanted
        }]);
