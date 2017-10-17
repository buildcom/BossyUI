import { Injectable } from '@angular/core';

@Injectable()
export class FormConfigService {
    TYPE: string = undefined;
    ISSPLIT = false;
    ISDROPUP = false;
    ISRIGHTALIGNED = false;
    VARIANT = 'Secondary';
    SIZE: string = undefined;
    NAME = 'MissingName';
    HREF = '#';
    HASVALIDATION = true;
    DANGER = 'Danger'
    WARNING = 'Warning';
    ERROR = 'Error';
    ISINLINE = false;
}
