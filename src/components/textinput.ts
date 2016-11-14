import { Component } from '@angular/core';

declare const module: any;

@Component({
    moduleId: module.id,
    selector: 'bossy-textinput',
    templateUrl: '../templates/textinput.html',
    styleUrls: ['../styles/textinput.css'],
    inputs: [
        'config'
    ]
})
export class Bossytextinput {
    // code here

}
