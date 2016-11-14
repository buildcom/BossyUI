export class BossyFormInputConfig{
    controlType: string;
    id: string;
    required: boolean;
    xPosition: number;
    yPosition: number;
    label: string;


    constructor(controlType: string) {
        this.controlType = controlType;
        this.id = '';
        this.required = false;
        this.xPosition = 0;
        this.yPosition = 0;
        this.label = '';
    }
}