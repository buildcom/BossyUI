import { Component } from '@angular/core';

@Component({
  selector: 'tylercomp',
  template:`
    <div>
    <h1>Hello my name is {{ name }}</h1>
    <h2>What's up?</h2>
    <input value="">
    </div>
    `
})

export class TylerComponent {
  name = 'Tyler';
}
