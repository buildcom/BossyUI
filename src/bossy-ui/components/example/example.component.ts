import { Component } from "@angular/core";

@Component({
  selector: "bossy-example",
  template: `
		<div class="myClass">
			<ng-content></ng-content>
		</div>
	`,
  styles: [
    `.myClass {
			background-color: pink
		}`
  ]
})
export class ExampleComponent {}
