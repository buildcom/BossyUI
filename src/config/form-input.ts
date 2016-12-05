export class BossyFormInputConfig{
    type: string;
    id: string;
    required: boolean;
    label: string;
    lines: number;

    constructor(type: string) {
        this.type = type;
        this.id = '';
        this.required = false;
        this.label = '';        
        this.lines = 1;
    }
}
