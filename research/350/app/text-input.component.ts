import { Component } from '@angular/core';

@Component ({
  selector: 'text-input',
  template: `
            <input type="text" value="{{inputInfo.value}}" size="{{inputInfo.size}}">
    `,
  inputs: ['inputInfo']
})

export class TextInput {

}
