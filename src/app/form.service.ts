import { Injectable } from '@angular/core';
import {BossyCalendarComponent} from '../bossy-ui/components/calendar/calendar'
import {BossyDropdownComponent} from '../bossy-ui/components/dropdown/dropdown'
import {BossyDropdownMenuItemComponent} from '../bossy-ui/components/dropdown-menu/dropdown-menu'
import {BossyFormComponent} from '../bossy-ui/components/form/form';
import {BossyFormInputComponent} from '../bossy-ui/components/form-input/form-input';
import {BossyFormInputErrorComponent} from '../bossy-ui/components/form-input-error/form-input-error'
import {BossyFormLabelComponent} from '../bossy-ui/components/form-label/form-label';
import {BossyFormRadioComponent} from '../bossy-ui/components/form-radio/form-radio';
import {BossyFormSelectMenuComponent} from '../bossy-ui/components/form-selectmenu/form-selectmenu';
import {BossyFormTextareaComponent} from '../bossy-ui/components/form-textarea/form-textarea';
import {BossySliderComponent} from '../bossy-ui/components/slider/slider';

@Injectable()
export class FormService{
    calendar : BossyCalendarComponent;
    dropdown : BossyDropdownComponent;
    dropdownmenu: BossyDropdownMenuItemComponent;
    formcomponent: BossyFormComponent;
    forminput : BossyFormInputComponent;
    forminpurerror: BossyFormInputErrorComponent;
    formlabel: BossyFormLabelComponent;
    formradio: BossyFormRadioComponent;
    formselectmenu: BossyFormSelectMenuComponent;
    formtextarea: BossyFormTextareaComponent;
    slider: BossySliderComponent;
}