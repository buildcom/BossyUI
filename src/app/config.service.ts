import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';


@Injectable()
export class ConfigService {
  setConfig(name: string, value: any) {
    if (!this[name]) {
      this[name] = new BehaviorSubject({});
    }

    this[name].next(value);
  }
}
