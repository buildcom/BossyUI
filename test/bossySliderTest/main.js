describe('Unit: SliderController', function() {
  // Load the module with MainController
  beforeEach(module('bossy.slider'));

  var ctrl, scope;
  // inject the $controller and $rootScope services
  // in the beforeEach block
  beforeEach(inject(function($controller, $rootScope) {
    // Create a new scope that's a child of the $rootScope
    scope = $rootScope.$new();
    // Create the controller
    ctrl = $controller('SliderController', {
      $scope: scope
    });
    scope.makeBar();
  }));

  it('should increment the slider value when calling increase', function() {
      expect(scope.value).toEqual(5);
      scope.increase();
      expect(scope.value).toEqual(6);
  });

  it('should decrement the slider value when calling decrease', function() {
      expect(scope.value).toEqual(5);
      scope.decrease();
      expect(scope.value).toEqual(4);
  });

  it('should not increment past the max', function() {
      scope.value = scope.max;
      expect(scope.value).toEqual(10);
      scope.increase();
      expect(scope.value).toEqual(scope.max);
 	    scope.increase();
 	    scope.increase();
      expect(scope.value).toEqual(scope.max);
      expect(scope.value).toEqual(10);
  });

  it('should not decrement past the min', function() {
  	  scope.value = scope.min;
      expect(scope.value).toEqual(1);
      scope.decrease();
      expect(scope.value).toEqual(scope.min);
 	    scope.decrease();
 	    scope.decrease();
      expect(scope.value).toEqual(scope.min);
      expect(scope.value).toEqual(1);
  });
  /////////////////////////////////////////////////////////////
  it('grey clicks should increment the slider value when calling increase', function() {
      expect(scope.value).toEqual(5);
      scope.greyClick();
      expect(scope.value).toEqual(6);
  });

  it('bar clicks should decrement the slider value when calling decrease', function() {
      expect(scope.value).toEqual(5);
      scope.barClick();
      expect(scope.value).toEqual(4);
  });

  it('grey clicks should not increment past the max', function() {
      scope.value = scope.max;
      expect(scope.value).toEqual(10);
      scope.greyClick();
      expect(scope.value).toEqual(scope.max);
      scope.greyClick();
      scope.greyClick();
      expect(scope.value).toEqual(scope.max);
      expect(scope.value).toEqual(10);
  });

  it('bar clicks should not decrement past the min', function() {
      scope.value = scope.min;
      expect(scope.value).toEqual(1);
      scope.barClick();
      expect(scope.value).toEqual(scope.min);
      scope.barClick();
      scope.barClick();
      expect(scope.value).toEqual(scope.min);
      expect(scope.value).toEqual(1);
  });
  /////////////////////////////////////////////////////////////////

  it('should increment the slider value by steps', function() {
      expect(scope.value).toEqual(5);
      scope.butIncrease();
      expect(scope.value).toEqual(6);
      //The above tests for default stepping behavior. (step 1 at a time)
      scope.value = 5;
      expect(scope.value).toEqual(5);
      scope.step = 2;
      scope.butIncrease();
      expect(scope.value).toEqual(7);
  });

  it('should decrement the slider value by steps', function() {
    expect(scope.value).toEqual(5);
    scope.butDecrease();
    expect(scope.value).toEqual(4);
    //The above tests for default stepping behavior. (step 1 at a time)
    scope.value = 5;
    expect(scope.value).toEqual(5);
    scope.step = 2;
    scope.butDecrease();
    expect(scope.value).toEqual(3);
  });

  it('should not increment the slider value by steps past the max', function() {
      expect(scope.value).toEqual(5);
      scope.step = 2;
      scope.butIncrease();
      expect(scope.value).toEqual(7);
      scope.butIncrease();
      scope.butIncrease();
      scope.butIncrease();
      scope.butIncrease();
      expect(scope.value).toEqual(10);
  });

  it('should not decrement the slider value by steps past the min', function() {
      expect(scope.value).toEqual(5);
      scope.step = 2;
      scope.butDecrease();
      expect(scope.value).toEqual(3);
      scope.butDecrease();
      scope.butDecrease();
      scope.butDecrease();
      scope.butDecrease();
      expect(scope.value).toEqual(1);
  });

  it('should increment the slider value when calling increase', function() {
      expect(scope.value).toEqual(5);
      var fakeEvent = new Object;
      fakeEvent.which = 38;
      scope.keyBind(fakeEvent);
      expect(scope.value).toEqual(6);
      fakeEvent.which = 39;
      scope.keyBind(fakeEvent);
      expect(scope.value).toEqual(7);
  });

  it('should decrement the slider value when pressing the left or down keys', function() {
      expect(scope.value).toEqual(5);
      var fakeEvent = new Object;
      fakeEvent.which = 37;
      scope.keyBind(fakeEvent);
      expect(scope.value).toEqual(4);
      fakeEvent.which = 40;
      scope.keyBind(fakeEvent);
      expect(scope.value).toEqual(3);
  });

  it('should not increment the slider value past max when pressing keys', function() {
      expect(scope.value).toEqual(5);
      var fakeEvent = new Object;
      fakeEvent.which = 38;
      scope.keyBind(fakeEvent);
      expect(scope.value).toEqual(6);
      fakeEvent.which = 39;
      scope.keyBind(fakeEvent);
      expect(scope.value).toEqual(7);
      scope.keyBind(fakeEvent);
      scope.keyBind(fakeEvent);
      scope.keyBind(fakeEvent);
      scope.keyBind(fakeEvent);
      scope.keyBind(fakeEvent);
      expect(scope.value).toEqual(10);
  });

  it('should not decrement the slider value past min when pressing keys', function() {
      expect(scope.value).toEqual(5);
      var fakeEvent = new Object;
      fakeEvent.which = 37;
      scope.keyBind(fakeEvent);
      expect(scope.value).toEqual(4);
      fakeEvent.which = 40;
      scope.keyBind(fakeEvent);
      expect(scope.value).toEqual(3);
      scope.keyBind(fakeEvent);
      scope.keyBind(fakeEvent);
      scope.keyBind(fakeEvent);
      scope.keyBind(fakeEvent);
      scope.keyBind(fakeEvent);
      expect(scope.value).toEqual(1);
  });

  it('should set mouse coords to zero and set mouse down to 1', function() {
      scope.down();
      expect(scope.newXCord).toEqual(0);
      expect(scope.xCord).toEqual(0);
      expect(scope.newYCord).toEqual(0);
      expect(scope.yCord).toEqual(0);
      expect(scope.isMouseDown).toEqual(1);
  });

  it('should set mouse coords to zero and set mouse down to 0', function() {
      scope.down();
      scope.up();
      expect(scope.newXCord).toEqual(0);
      expect(scope.xCord).toEqual(0);
      expect(scope.newYCord).toEqual(0);
      expect(scope.yCord).toEqual(0);
      expect(scope.isMouseDown).toEqual(0);
  });

  it('should increment the slider when clicking and dragging by 1', function() {
      scope.down();
      var fakeDrag = new Object;
      fakeDrag.clientX = 400;
      fakeDrag.clientY = 200;
      scope.drag(fakeDrag);
      fakeDrag.clientX = 402;
      fakeDrag.clientY = 200;
      scope.drag(fakeDrag);
      expect(scope.value).toEqual(6);
  });

    it('should decrement the slider when clicking and dragging by 1', function() {
      scope.down();
      var fakeDrag = new Object;
      fakeDrag.clientX = 400;
      fakeDrag.clientY = 200;
      scope.drag(fakeDrag);
      fakeDrag.clientX = 398;
      fakeDrag.clientY = 200;
      scope.drag(fakeDrag);
      expect(scope.value).toEqual(4);
  });

  it('should not increment the slider past max when clicking and dragging', function() {
      scope.down();
      var fakeDrag = new Object;
      fakeDrag.clientY = 400 + (i*2)
      for (var i = 0; i < 10; i++) {
        fakeDrag.clientX = 400 + (i*2);
        scope.drag(fakeDrag);
      };
      expect(scope.value).toEqual(10);
  });

    it('should not decrement the slider past than min when clicking and dragging', function() {
      scope.down();
      var fakeDrag = new Object;
      fakeDrag.clientY = 400 + (i*2)
      for (var i = 0; i < 10; i++) {
        fakeDrag.clientX = 400 - (i*2);
        scope.drag(fakeDrag);
      };
      expect(scope.value).toEqual(1); 
  });
})