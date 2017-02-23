import { Component, Input } from '@angular/core';
import {MyronExampleComponentConfig } from '../config/myron-config';

declare const module: any;

@Component({
	moduleId: module.id,
	selector: 'myron-component',
	templateUrl: '../templates/myron-component.html',
	styleUrls: ['../styles/myron-component.css'],
})

export class MyronExampleComponent {
	@Input() config: MyronExampleComponentConfig;
	name = 'Myron Kant';
	color = 'lightgreen';
	interests = [];
	nameClicked: boolean = false;

	ngOnInit() {
		this.name = this.config.name,
		this.config.interests.forEach((name, i) => {
			this.interests.push({ id: (i + 1), name, clicked: false });
		});
		this.color = this.config.color;
	}

	getColor() {
		if (this.nameClicked) {
			return this.color;
		}
	}

	nameEvent() {
		if (this.nameClicked) {
			this.nameClicked = false;
		} else {
			this.nameClicked = true;
		}
	}

	changeColor(index: number) {
		this.interests[index].clicked = !this.interests[index].clicked;
	}

}
