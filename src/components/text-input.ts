import { Component } from '@angular/core';

declare const module: any;

@Component({
    moduleId: module.id,
    selector: 'bossy-text-input',
    templateUrl: '../templates/text-input.html',
    styleUrls: ['../styles/text-input.css'],
    inputs: [
        'config'
    ]
})
export class BossyTextInput {
    // code here

}
