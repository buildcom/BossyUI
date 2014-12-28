describe('Unit: SliderController', function() {
    // Load the module with MainController
    beforeEach(module('bossy.slider'));

    var ctrl, scope;
    // inject the $controller and $rootScope services
    // in the beforeEach block
    beforeEach(inject(function ($controller, $rootScope) {
        // Create a new scope that's a child of the $rootScope
        scope = $rootScope.$new();
        // Create the controller
        ctrl = $controller('SliderController', {
            $scope: scope
        });
        scope.makeBar();
    }));


});