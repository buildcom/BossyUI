import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class FormService {
    constructor(
      private http: HttpClient,
    ) { }

    post(data: any, url: string): Observable<any> {
      return this.http.post(url, data);
    }

    get(url): Observable<any> {
      return this.http.get(url);
    }
}
