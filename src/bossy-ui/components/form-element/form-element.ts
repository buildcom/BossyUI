import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'bossy-form-element',
  templateUrl: './form-element.html',
  styleUrls: ['./form-element.css']
})
export class BossyFormElementComponent {
  // TODO: Make BossyFormElementConfig
  // https://github.com/buildcom/BossyUI/issues/528
  // @Input() config: BossyFormElementConfig;

  type = "element";

  constructor() {
  }

  ngOnInit() {

  }

  changeType(value) {
    // console.log(value);
    this.type = value;
  }
}
