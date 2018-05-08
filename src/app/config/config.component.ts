import { AfterViewInit, Component, Input, OnInit, ViewChild, ViewChildren, ContentChild } from '@angular/core';
import { ConfigService } from '../config.service';
import { BossyModalComponent, BossyNavsComponent } from '../../bossy-ui/bossy-ui.module';
import { BossyAlertComponent } from '../../bossy-ui/components/alert/alert.component';

declare const ace: any;

@Component({
  selector: 'app-config',
  templateUrl: './config.component.html'
})
export class ConfigComponent implements OnInit, AfterViewInit {
  @Input() configName: string;
  @Input() componentType;
  @ContentChild('example') component;
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
    this.configService[this.configName].subscribe({});
    this.editor.setTheme('ace/theme/monokai');
    this.editor.getSession().setMode('ace/mode/javascript');
  }
  updateComponent(component) {
    if (!component) {
      return;
    }
    if (component.ngOnInit) {
      component.ngOnInit();
    }
    if (component.ngAfterContentInit) {
      component.ngAfterContentInit();
    }
    if (component.ngAfterViewInit) {
      component.ngAfterViewInit();
    }
  }

  updateConfig() {
    const value = this.editor.getValue().replace(/^var config = /, '').replace(/;/g, '');
    this.error = null;
    try {
      this.configService.setConfig(this.configName, JSON.parse(value));
    } catch (error) {
      this.error = error;
    }
    setTimeout(() => this.updateComponent(this.component), 100);
  }
}



