import { Directive, ElementRef, Input, HostListener} from '@angular/core';

@Directive({
  selector: '[bossy-mask]'
})
export class BossyMaskDirective{
  @Input('bossy-mask') mask: string;

  constructor(private element: ElementRef) {}


  @HostListener('input') onInput() {
    if (this.mask == 'ssn') {
      this.element.nativeElement.value = this.ssn(this.element.nativeElement.value);
    } else if (this.mask == 'phone') {
      this.element.nativeElement.value = this.phone(this.element.nativeElement.value);
    }

  }

  valueWithDigitsOnly(value : string) {
    value = value.replace(/\D/g,'');
    return value;
  }


  phone(passedInValue : string) : string {
    let newValue = this.valueWithDigitsOnly(passedInValue);

    if (newValue.length > 9) {
      newValue = newValue.slice(0, 10);
    }
    if (this.valueWithDigitsOnly(passedInValue)[0]) {
      newValue = "(" + newValue;
    }
    if (this.valueWithDigitsOnly(passedInValue)[3]) {
      newValue = newValue.slice(0, 4) + ") " + newValue.slice(4, newValue.length);
    }
    if (this.valueWithDigitsOnly(passedInValue)[6]) {
      newValue = newValue.slice(0, 9) + "-" + newValue.slice(9, newValue.length);
    }
    return newValue;
  }

  ssn(passedInValue : string): string {
    let newValue = this.valueWithDigitsOnly(passedInValue);

    if (newValue.length > 9) {
      newValue = newValue.slice(0, 9);
    }
    if (this.valueWithDigitsOnly(passedInValue)[3]) {
      newValue = newValue.slice(0, 3) + "-" + newValue.slice(3, newValue.length);
    }
    if (this.valueWithDigitsOnly(passedInValue)[5]) {
      newValue = newValue.slice(0, 6) + "-" + newValue.slice(6, newValue.length);
    }
    return newValue;
  }
}