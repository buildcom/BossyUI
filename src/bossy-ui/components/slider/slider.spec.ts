import {BossySliderComponent} from './slider.component';

let slider: BossySliderComponent;
describe('the slider component', () => {
  beforeEach(() => {
    slider = new BossySliderComponent();
    slider.ngOnInit();
  });
  it('should increase it\'s value when the increase function is called', () => {
    const initialValue = slider.value;
    slider.increase();
    expect(slider.value).toEqual(initialValue + 1);
  });
  it('should decrease it\'s value when the decrease function is called', () => {
    const initialValue = slider.value;
    slider.decrease();
    expect(slider.value).toEqual(initialValue - 1);
  });
  it('should decrease it\'s value relative to it\'s step size when the butDecrease function is called', () => {
    const initialValue = slider.value;
    slider.butDecrease();
    expect(slider.value).toEqual(initialValue - slider.step);
  });
  it('should increase it\'s value relative to it\'s step size when the butIncrease function is called', () => {
    const initialValue = slider.value;
    slider.butIncrease();
    expect(slider.value).toEqual(initialValue + slider.step);
  });
  it('should decrease it\'s value relative to it\'s step size when the bar is clicked on the lower side', () => {
    const initialValue = slider.value;
    slider.barClick();
    expect(slider.value).toEqual(initialValue - slider.step);
  });
  it('should increase it\'s value relative to it\'s step size when the bar is clicked on the higher side', () => {
    const initialValue = slider.value;
    slider.greyClick();
    expect(slider.value).toEqual(initialValue + slider.step);
  });
  it('should internally set isMouseDown when down is called', () => {
    expect(slider.isMouseDown).toBeFalsy();
    slider.down();
    expect(slider.isMouseDown).toBeTruthy();
  });
  it('should internally set isMouseDown when up is called', () => {
    expect(slider.isMouseDown).toBeFalsy();
    slider.up();
    expect(slider.isMouseDown).toBeFalsy();
  });
  it('should log mouse being up or down', () => {
    expect(slider.isMouseDown).toBeFalsy();
    slider.down();
    expect(slider.isMouseDown).toBeTruthy();
    slider.up();
    expect(slider.isMouseDown).toBeFalsy();
  });
  it('should not decrease past it\'s minimum value', () => {
    for (let i = 0; i < 10000; i++) {
      slider.decrease();
    }
    expect(slider.value >= slider.min).toBeTruthy();
  });
  it('should not increase past it\'s maximum value', () => {
    for (let i = 0; i < 10000; i++) {
      slider.increase();
    }
    expect(slider.value >= slider.min).toBeTruthy();
  });
  it('should decrease when the left arrow key is pressed', () => {
    const keyEvent = {which: 37},
      initialValue = slider.value;
    slider.keyBind(keyEvent);
    expect(slider.value).toEqual(initialValue - slider.step);
  });
  it('should decrease when the down arrow key is pressed', () => {
    const keyEvent = {which: 40},
      initialValue = slider.value;
    slider.keyBind(keyEvent);
    expect(slider.value).toEqual(initialValue - slider.step);
  });
  it('should increase when the up arrow key is pressed', () => {
    const keyEvent = {which: 38},
      initialValue = slider.value;
    slider.keyBind(keyEvent);
    expect(slider.value).toEqual(initialValue + slider.step);
  });
  it('should increase when the right arrow key is pressed', () => {
    const keyEvent = {which: 39},
      initialValue = slider.value;
    slider.keyBind(keyEvent);
    expect(slider.value).toEqual(initialValue + slider.step);
  });
  it('should not increase or decrease when another key is pressed', () => {
    const keyEvent = {which: 0},
      initialValue = slider.value;
    for (let i = 0; i < 37; i++) {
      keyEvent.which = i;
      slider.keyBind(keyEvent);
      expect(slider.value).toEqual(initialValue);
    }
  });
});
