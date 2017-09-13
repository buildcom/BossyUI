import {Component} from '@angular/core';

declare const module: any;

@Component({
	moduleId: module.id,
	selector: 'bossy-me',
	templateUrl: '../templates/me.html',
	styleUrls: ['../styles/me.css']
})

export class Me {
	showHobbies = false;
	constructor() {

	}
	onNameClick() {
		this.showHobbies = !this.showHobbies;
	}
}
