import { Component, Input } from '@angular/core';
import { LukeShortExampleComponentConfig } from '../config/luke-short-name-example-config';

export class InterestObject {
	constructor(
		public elementClicked: boolean,
		public elementHovered: boolean,
		public name: string) { }
}

@Component({
	selector: 'luke-short',
	template:
	`
  <div class ="superSpecialClass">
		<h3 style ="cursor: pointer" (click)="clkNamFxn()">{{nameFromConfig}}</h3>
		<div *ngIf="clickedName">
			<ul *ngFor="let interestObj of arrOfInterests; let i = index" (click)="clkElemFxn(i)" class="interest" (mouseenter)="hovElemFxn(i)" (mouseleave)="hovElemFxn(i)" style="width: 480px;" [style.background-color]="interestObj.elementClicked ? colorFromConfig: 'LightBlue'">
				<li *ngIf="interestObj.elementClicked" style="margin: 10px; width: 400px; cursor: pointer;">
					{{interestObj.name}}
					<img src="https://media.tenor.co/images/c5b530e6249f489ec4acc9f7ab25144a/raw" style="margin: 10px; width: 380px;"/>
				</li>
				<li *ngIf="!interestObj.elementClicked" style="margin: 10px; width: 400px; cursor: pointer;">
					{{interestObj.name}}
				</li>
			</ul>
		</div>
  </div>
  `,
	styles: [`
		.interest li:hover{
			-webkit-filter: opacity(30%);
			border-style: dotted;
			filter: opacity(30%);
		}
		`]
})

export class LukeShortExampleComponent {
	@Input() config: LukeShortExampleComponentConfig;
	clickedName: boolean = false;
	nameFromConfig: string = '';
	colorFromConfig: string = '';
	arrOfInterests: Array<InterestObject> = [];

	ngOnInit() {
		// Get name from config
		this.nameFromConfig = this.config.name;

		// Get interests from config
		this.config.interests.forEach((interest) => {
			this.arrOfInterests.push(new InterestObject(false, false, interest));
		});

		// Get color from config
		this.colorFromConfig = this.config.color;
	};


	// Toggle functions for mouse hover and mouse clicks
	clkNamFxn() {
		this.clickedName = !this.clickedName;
	}
	clkElemFxn(elIndx: number) {
		this.arrOfInterests[elIndx].elementClicked = !this.arrOfInterests[elIndx].elementClicked;
	}
	hovElemFxn(elIndx: number) {
		this.arrOfInterests[elIndx].elementHovered = !this.arrOfInterests[elIndx].elementHovered;
	}
}
