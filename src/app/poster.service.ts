import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Url } from 'url';

@Injectable()
export class PosterService {
    constructor(
    private http: HttpClient,
    ) { }

    poster (input: any, postURL: string): Observable<any> {
        return this.http.post(postURL, input);
    }
}

/*  method to be added to all components that calls this service
    
    componentFormControl = new FormControl();

    posterer(): void {
    let input = { emailInput: this.textFormControl.value };
    console.log(this.textFormControl.value);
    console.log(this.config.APIUrl);
    console.log(JSON.stringify(input));
    this.posterService.poster({ input } as any, this.config.APIUrl)
      .subscribe( res => {
        console.log(JSON.stringify(res));
      },
      err => {
        console.log("Error occured");
      });
    this.textFormControl.reset();
*/
