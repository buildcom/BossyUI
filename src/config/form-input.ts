export class BossyFormInputConfig{
    name: string;
    type: string;
    id: string;
    cssClass: string;
    required: boolean;
    label: string;
    rows: number;
    cols: number;
    name: string;
    placeholder: string;

    constructor(name: string, type: string, cssClass: string, id: string, required: boolean, label: string) {
        this.name = name;
        this.type = type;
<<<<<<< HEAD
        this.cssClass = cssClass;
        this.id = id;
        this.required = required;
        this.label = label;
=======
        this.id = '';
        this.required = false;
        this.label = '';
        this.rows = 1;
        this.cols = 75;
        this.name = '';
        this.placeholder = '';
>>>>>>> 9fc819cd72c2aabdddb29dcf6505cb7ce3b7a9c1
    }
}
