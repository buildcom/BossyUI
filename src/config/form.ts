import { BossyFormInputConfig } from '../config/form-input';

export class BossyFormConfig {
    elements: Array<BossyFormInputConfig>;

    constructor(elements: Array<BossyFormInputConfig>){
        this.elements = elements;
    }
}
