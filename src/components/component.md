```
import { Component } from '@angular/core';

declare const module: any;

@Component({
    moduleId: module.id,
    selector: 'bossy-[NAME]',
    templateUrl: '../templates/[NAME].html',
    styleUrls: ['../styles/[NAME].css'],
    inputs: [
        'config'
    ]
})
export class Bossy[NAME] {
    // code here

}
```
