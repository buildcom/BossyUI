import { Component } from '@angular/core';

@Component({
  selector: 'bossy-nav-tab',
  templateUrl: './nav-tab.html'
})
export class BossyNavTabComponent {
  public isActive = false;
  public id: string;
  public tabSelect = () => {};
}
