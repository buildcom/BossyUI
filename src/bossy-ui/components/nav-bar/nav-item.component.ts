import { Component } from '@angular/core';

@Component({
  selector: 'bossy-nav-item',
  templateUrl: './nav-Item.html'
})
export class BossyNavItemComponent {
  public isActive = false;
  public id: string;
}
