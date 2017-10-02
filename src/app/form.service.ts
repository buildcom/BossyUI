import { Injectable } from '@angular/core';

@Injectable()
export class BossyDropdownMenu{
    type = 'button';
    name = 'missingName';
    href = '#';
    isDisabled = false;
}

/*
.service('BossyDropdownMenu', function(){
    //this.selector = 'bossy-dropdown-menu';
    //this.templateURL = './dropdown-menu.html';
    this.type = 'button';
    this.name = 'missingName';
    this.href = '#';
    this.isDisabled = false;
});

.service('BossyDropDownComponent'), function(){
    this.type = 'Button';
    this.isSplit = false;
    this.isDropup = false;
    this.isRightAligned = false;
    this.variant = 'secondary';
   // this.size: string = undefined;
}
*/