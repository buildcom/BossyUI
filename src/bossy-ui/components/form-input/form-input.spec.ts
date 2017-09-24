import {BossyFormInputComponent} from './form-input';

const formInput = new BossyFormInputComponent();

describe('the form input component', () => {
  it('should set default hasSuccess to false', () => {
    expect(formInput.hasSuccess).toEqual(false);
  });
});

describe('the form input component', () => {
  it('should set default hasWarning to false', () => {
    expect(formInput.hasWarning).toEqual(false);
  });
});

describe('the form input component', () => {
  it('should set default hasDanger to false', () => {
    expect(formInput.hasDanger).toEqual(false);
  });
});
