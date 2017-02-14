import { Component } from '@angular/core';

@Component({
	selector: 'tylercomp',
	template: `
    <div>
    <h3>{{ name }}</h3>
    </div>
    `
})

export class TylerComponent {
	name = 'Tyler Chaney';
}
