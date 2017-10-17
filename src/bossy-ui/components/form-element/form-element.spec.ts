import {BossyFormElementComponent} from './form-element';

const formInput = new BossyFormElementComponent();

describe('the form input component', () => {
  it('should set default hasValidation to None', () => {
    expect(formInput.hasValidation).toEqual('None');
  });
});
