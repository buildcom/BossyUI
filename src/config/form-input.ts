export class BossyFormInputConfig{
    type: string;
    id: string;
    required: boolean;
    label: string;
    rows: number;
    cols: number;
    name: string;
    placeholder: string;

    constructor(type: string) {
        this.type = type;
        this.id = '';
        this.required = false;
        this.label = '';
        this.rows = 1;
        this.cols = 75;
        this.name = '';
        this.placeholder = '';
    }
}
