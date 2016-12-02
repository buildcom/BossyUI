import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BossyCalendar }  from './components/calendar';
import { BossyFormInput } from './components/form-input';

@NgModule({
    imports: [
        BrowserModule
    ],
    declarations: [
        BossyCalendar,
        BossyFormInput
    ],
    exports: [
        BossyCalendar,
        BossyFormInput
    ]
})
export class BossyModule {
    static forRoot() {
        return {
            ngModule: BossyModule,
            providers: []
        };
    }
}
