import { Component } from '@angular/core';

@Component({
	selector: 'luke-short',
	template:
	`
  <div class ="superSpecialClass">
    <h3>Luke Short</h3>
  </div>
  `
})

export class LukeShortExampleComponent {
	isLoggedIn: boolean = false;
}
