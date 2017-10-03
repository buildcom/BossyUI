import {BossyFormInputComponent} from './form-input';

const formInput = new BossyFormInputComponent();

describe('the form input component', () => {
  it('should set default hasSuccess to false', () => {
    expect(formInput.hasValidation.hasSuccess).toEqual(false);
  });
});

describe('the form input component', () => {
  it('should set default hasWarning to false', () => {
    expect(formInput.hasValidation.hasWarning).toEqual(false);
  });
});

describe('the form input component', () => {
  it('should set default hasDanger to false', () => {
    expect(formInput.hasValidation.hasDanger).toEqual(false);
  });
});
