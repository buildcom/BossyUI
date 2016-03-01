import {Component,, OnInit} from 'angular2/core';

@Component({
	selector: 'bossy-input',
	templateUrl: 'bossy-input-default.html'
})

@Component({
	selector: 'bossy-input-prefix',
	templateUrl: 'bossy-input-prefix.html'
})

@Component({
	selector: 'bossy-input-postfix',
	templateUrl: 'bossy-input-postfix.html'
})

@Component({
	selector: 'bossy-input-counter',
	templateUrl: 'bossy-input-counter.html'
})

export class BossyInput{
	valueChange(val) {
		if(currentLength >= max){
			value = value.substring(0, max - 1);
		}
		currentLength = val.length;
	}

	ngOnInit() {
		// Fail safe in case config are not given
		if (!this.config) {
			this.config = {
				'maxLength': 0,
				'height': 200,
				'width': 200,
				'type': 'text',
				'value': '',
				'title': 'title',
				'currentLength': 0
			};
		}
		// Throw an error if text is not given
		if (!this.config.text) {
			console.error('You must include content for tool tip.');
		}
	}
}