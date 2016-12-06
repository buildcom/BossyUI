export class BossyFormInputConfig{
    name: string;
    type: string;
    id: string;
    cssClass: string;
    required: boolean;
    label: string;
    rows: number;
    cols: number;
    placeholder: string;

    constructor(name: string, type: string, cssClass: string, id: string, required: boolean, label: string) {
        this.name = name;
        this.type = type;
        this.cssClass = cssClass;
        this.id = id;
        this.required = required;
        this.label = label;
        this.rows = 1;
        this.cols = 75;
        this.placeholder = '';
    }
}
