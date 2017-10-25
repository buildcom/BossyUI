import {Injectable} from '@angular/core';
import {BossyFormConfig} from '../bossy-ui/config/form';
// import {BossyFormPreset} from './mock-form';

@Injectable()
export class FormConstantService {
    VARIANT = 'secondary';
    NAME = 'missingname';
    HREF = '#';
    DANGER = 'danger';
    WARNING = 'warning';
    ERROR = 'error';
    /*
    getFormConfig(): BossyFormConfig{
        return BossyFormPreset;
    } */
}
