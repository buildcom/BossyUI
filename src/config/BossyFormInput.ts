export class BossyFormInputConfig{
    controlType: string;
    id: string;
    required: boolean;
    label: string;


    constructor(controlType: string) {
        this.controlType = controlType;
        this.id = '';
        this.required = false;
        this.label = '';
    }
}
