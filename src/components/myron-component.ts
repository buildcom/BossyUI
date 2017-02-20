import { Component } from '@angular/core';
import {MyronExampleComponentConfig } from '../config/myron-config';

declare const module: any;

@Component({
	moduleId: module.id,
	selector: 'myron-component',
	template:
	`
	<div>
	  <h1>{{title}}</h1>
	  <h3>{{name}}'s Component!'</h3>
	</div>
	`

})

export class MyronExampleComponent {
	name = 'Myron';
}
