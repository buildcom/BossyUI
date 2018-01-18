import {BossyFormElementComponent} from './form-element.component';

const formInput = new BossyFormElementComponent();

describe('the form input component', () => {
  it('should set default status to None', () => {
    expect(formInput.status).toEqual('none');
  });
});
