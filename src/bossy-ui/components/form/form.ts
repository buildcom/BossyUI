import {Component, Input, OnInit, SimpleChanges} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {BossyFormConfig} from '../../config/form';

@Component({
  selector: 'bossy-form',
  templateUrl: './form.html',
  styleUrls: ['./form.css'],
})
export class BossyFormComponent implements OnInit {
  @Input() config: BossyFormConfig;
  bossyForm: FormGroup;
  isFormInlinedFromConfig = false;
  isFormLabeledFromConfig = false;
  isFormDefaultGroupFromConfig = false;
  isFormGridFromConfig = false;
  isFormCompactGridFromConfig = false;
  isFormHorizontalFromConfig = false;
  isFormManualSizedFromConfig = false;
  isFormAutoSizedFromConfig = false;
  isFormDisabledFromConfig = false;
  isFormValidCheckedFromConfig = false;

  constructor(private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    const elements: any = {};

    const hasValidation = 'none';

    this.isFormInlinedFromConfig = this.config.isFormInlined;
    this.isFormLabeledFromConfig = this.config.isFormLabeled;
    this.isFormDefaultGroupFromConfig = this.config.isFormDefaultGroup;
    this.isFormGridFromConfig = this.config.isFormGrid;
    this.isFormCompactGridFromConfig = this.config.isFormCompactGrid;
    this.isFormHorizontalFromConfig = this.config.isFormHorizontal;
    this.isFormManualSizedFromConfig = this.config.isFormManualSized;
    this.isFormAutoSizedFromConfig = this.config.isFormAutoSized;
    this.isFormDisabledFromConfig = this.config.isFormDisabled;
    this.isFormValidCheckedFromConfig = this.config.isFormValidChecked;

    this.config.elements.forEach((element) => {
      const {name, value} = element;
      elements[name] = value;
    });

    this.bossyForm = this.formBuilder.group(elements);
  }

  onSubmit() {
    // TODO: return form data
  }
}
