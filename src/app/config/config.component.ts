import {AfterViewInit, Component, Input, OnInit} from '@angular/core';
import {ConfigService} from '../config.service';

declare const ace: any;

@Component({
  selector: 'app-config',
  templateUrl: './config.component.html'
})
export class ConfigComponent implements OnInit, AfterViewInit {
  @Input() configName: string;
  editor: any;
  editorId: string;
  editorValue: string;
  error: string;

  constructor(private configService: ConfigService) {
  }

  ngOnInit() {
    const configObject = this.configService[this.configName].getValue();
    this.editorValue = `var config = ${JSON.stringify(configObject, null, '\t')};`;
    this.editorId = `editor${this.configName}`;
  }

  ngAfterViewInit() {
    this.editor = ace.edit(this.editorId);

    this.editor.setTheme('ace/theme/monokai');
    this.editor.getSession().setMode('ace/mode/javascript');
  }

  updateConfig() {
    const value = this.editor.getValue().replace(/^var config = /, '').replace(/;/g, '');

    this.error = null;

    try {
      this.configService.setConfig(this.configName, JSON.parse(value));
    } catch (error) {
      this.error = error;
    }
  }
}



