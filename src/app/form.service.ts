import {Injectable} from '@angular/core';
import {BossyFormConfig} from '../bossy-ui/config/form';

@Injectable()
export class FormConstantService {
    VARIANT = 'secondary';
    NAME = 'missingname';
    HREF = '#';
    DANGER = 'danger';
    WARNING = 'warning';
    ERROR = 'error';
}
