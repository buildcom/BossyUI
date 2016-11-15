import { Component } from '@angular/core';

declare const module: any;

@Component({
    moduleId: module.id,
    selector: 'bossy-formlabel',
    templateUrl: '../templates/formlabel.html',
    styleUrls: ['../styles/formlabel.css'],
    inputs: [
        'config'
    ]
})
export class BossyFormLabel {
    // code here

}
