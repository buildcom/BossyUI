import { Component } from '@angular/core';

interface inputData {
  type: string;
  value: string;
  size: string;
  checked: string;
  maxLength: string;
  minLength: string;
}

@Component ({
  selector: 'this-app',
  template: `
        <h1>This App</h1>
        <p>This thing does things.</p>
        <div *ngFor="let inputItem of inputArray" [ngSwitch]="inputItem.type">
            <text-input *ngSwitchCase="'text'" [inputInfo]="inputItem"></text-input>
            <input type="button" *ngSwitchCase="'button'" value="{{inputItem.value}}">
            <label *ngSwitchCase="'checkbox'"><input type="checkbox">{{inputItem.value}}</label>
            <textarea *ngSwitchCase="'textbox'" value="{{inputItem.value}}"></textarea>
        </div>
    `,
})

export class AppComponent {
  inputArray= INPUT;

}

var INPUT: inputData[] = [{"type":"text","value":"username","size":"30","checked":"","maxLength":"30","minLength":"5"},
  {"type":"button","value":"Click Me!","size":"10","checked":"","maxLength":"","minLength":""},
  {"type":"checkbox","value":"Huh?","size":"30","checked":"true","maxLength":"","minLength":""},
  {"type":"textbox","value":"Address","size":"50","checked":"","maxLength":"50","minLength":"0"},
  {"type":"text","value":"AnotherThing!","size":"40","checked":"","maxLength":"30","minLength":"5"},
  {"type":"button","value":"AnotherThing!","size":"40","checked":"","maxLength":"30","minLength":"5"}]
