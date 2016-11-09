export class InputConfig{
    //element attributes
    xPosition: number;
    yPosition: number;
    controlType: string;
    label: string;

    //<input> attributes
    autocomplete: boolean;
    autofocus: boolean;
    dirname: string;
    disabled: boolean;
    formnovalidate: boolean;
    max: string;
    maxlength: number;
    min: string;
    multiple: boolean;
    name: string;
    pattern: string;
    placeholder: string;
    readonly: boolean;
    required: boolean;
    size: number;
    src: string;
    step: number;
    type: string;
    value: string;

    //global attributes
    accesskey: string;
    cls: string; //class
    contenteditable: boolean;
    contextmenu: string;
    dir: string;
    draggable: boolean;
    dropzone: string;
    hidden: boolean;
    id: string;
    lang: string;
    spellcheck: boolean;
    style: string;
    tabindex: number;
    title: string;
    translate: boolean;

    constructor(options: {
        xPosition?: number,
        yPosition?: number,
        controlType: string;
        label?: string;
        autocomplete?: boolean,
        autofocus?: boolean,
        dirname?: string,
        disabled?: boolean,
        formnovalidate?: boolean,
        max?: string,
        maxlength?: number,
        min?: string,
        multiple?: boolean,
        name?: string,
        pattern?: string,
        placeholder?: string,
        readonly?: boolean,
        required?: boolean,
        size?: number,
        src?: string,
        step?: number,
        type?: string,
        value?: string,
        accesskey?: string,
        cls?: string,
        contenteditable?: boolean,
        contextmenu?: string,
        dir?: string,
        draggable?: boolean,
        dropzone?: string,
        hidden?: boolean,
        id?: string,
        lang?: string,
        spellcheck?: boolean,
        style?: string,
        tabindex?: number,
        title?: string,
        translate?: boolean
    } = {}){
        this.xPosition = options.xPosition === undefined ? 0 : options.xPosition;
        this.yPosition = options.yPosition === undefined ? 0 : options.yPosition;
        this.controlType = options.controlType;
        this.label = options.label || '';
        this.autocomplete = options.autocomplete ? true : false;
        this.autofocus = options.autofocus ? true : false;
        this.dirname = options.dirname || '';
        this.disabled = options.disabled ? true : false;
        this.formnovalidate = options.formnovalidate ? true : false;
        this.max = options.max || '';
        this.maxlength = options.maxlength === undefined ? 0 : options.maxlength;
        this.min = options.min || '';
        this.multiple = options.multiple ? true : false;
        this.name = options.name || '';
        this.pattern = options.pattern || '';
        this.placeholder = options.placeholder || '';
        this.readonly = options.readonly ? true : false;
        this.required = options.required ? true : false;
        this.size = options.size === undefined ? 0 : options.size;
        this.src = options.src || '';
        this.step = options.step === undefined ? 0 : options.step;
        this.type = options.type || '';
        this.value = options.value || '';
        this.accesskey = options.accesskey || '';
        this.cls = options.cls || '';
        this.contenteditable = options.contenteditable ? true : false;
        this.contextmenu = options.contextmenu || '';
        this.dir = options.dir || '';
        this.draggable = options.draggable ? true : false;
        this.dropzone = options.dropzone || '';
        this.hidden = options.hidden ? true : false;
        this.id = options.id || '';
        this.lang = options.lang || '';
        this.spellcheck = options.spellcheck ? true : false;
        this.style = options.style || '';
        this.tabindex = options.tabindex === undefined ? 0 : options.tabindex;
        this.title = options.title || '';
        this.translate = options.translate ? true : false;
    }
}