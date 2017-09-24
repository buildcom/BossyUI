import {Component, Input} from '@angular/core';
import {BossyFormSelectMenuConfig} from '../../config/form-selectmenu';

@Component({
  selector: 'bossy-form-selectmenu',
  templateUrl: './form-selectmenu.html',
})

export class BossyFormSelectMenuComponent {
  @Input() config: BossyFormSelectMenuConfig;
}
