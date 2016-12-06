import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BossyCalendar }  from './components/calendar';
import { BossyFormInput } from './components/form-input';
import { BossyForm } from './components/form';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

@NgModule({
    imports: [
        BrowserModule,
        ReactiveFormsModule,
        FormsModule
    ],
    declarations: [
        BossyCalendar,
        BossyFormInput,
        BossyForm
    ],
    exports: [
        BossyCalendar,
        BossyFormInput,
        BossyForm
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
