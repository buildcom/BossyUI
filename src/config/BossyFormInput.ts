export class BossyFormInputConfig{
    type: string;
    id: string;
    required: boolean;
    label: string;


    constructor(type: string) {
        this.type = type;
        this.id = '';
        this.required = false;
        this.label = '';
    }
}
