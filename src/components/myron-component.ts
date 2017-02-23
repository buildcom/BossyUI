import { Component, Input } from '@angular/core';
import {MyronExampleComponentConfig } from '../config/myron-config';

declare const module: any;

@Component({
	moduleId: module.id,
	selector: 'myron-component',
	template:
	`
	<div>
	  <h1>{{title}}</h1>
	  <h1 class="nameButton" (click)="nameEvent()">{{name}}</h1>
	  <div *ngIf="nameClicked">
	    <h4>Interests</h4>
	    <ul *ngFor="let interest of interests; let i = index;" (click)="changeColor(i)" class="interests">
	      <li *ngIf="interest.clicked" [style.background-color]="getColor()">
	        <span class="info">{{interest.id}} </span> {{interest.name}}
	      </li>
	      <li *ngIf="!interest.clicked" style="background-color: #ccd9ff">
	        <span class="info">{{interest.id}} </span> {{interest.name}}
	      </li>
	    </ul>
	  </div>
	</div>
	`,
	styles: [`
		.interests {
		  margin: 0 0 2em 0;
		  list-style-type: none;
		  padding: 0;
		  width: 15em;
		}

		.interests li {
		  cursor: pointer;
		  position: relative;
		  left: 0;
		  background-color: #EEE;
		  margin: .5em;
		  padding: .3em 0;
		  height: 2.4em;
		  border-radius: 4px;
		}

		.interests li:hover {
		  //background-color: #AAA !important;
		  -webkit-filter: drop-shadow(8px 8px 10px green);
		  filter: drop-shadow(8px 8px 10px red);
		}

		.interests .text {
		  position: relative;
		  top: -3px;
		}

		.interests .info {
		  display: inline-block;
		  font-size: small;
		  color: white;
		  padding: 0.8em 0.7em 0 0.7em;
		  background-color: #607D8B;
		  line-height: 1em;
		  position: relative;
		  left: -1px;
		  top: -4px;
		  height: 2.6em;
		  margin-right: .8em;
		  border-radius: 4px 0 0 4px;
		}
		`]
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
