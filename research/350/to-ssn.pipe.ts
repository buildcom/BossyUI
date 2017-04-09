import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'ToSSN', pure : false})
export class ToSSN implements PipeTransform {
  transform(value: string): string {
    return value.substr(0, 3) + "-" + value.substr(3, 2) + "-" + value.substr(5, 4);
  }
}
