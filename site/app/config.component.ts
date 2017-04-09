import {Component, Input, OnChanges} from '@angular/core';
import {ConfigService} from './config.service';

declare const module: any;
declare const ace: any;

@Component({
	moduleId: module.id,
	selector: 'sandbox-config',
	templateUrl: '../templates/config.component.html'
})
export class ConfigComponent {
	@Input() configName: string;
	@Input() component: Component;
	componentData: any;
	editor: any;
	editorId: string;
	editorValue: string;
	error: string;

	constructor(private configService: ConfigService) {}

	ngOnInit() {
		const config = this.configService[this.configName].getValue();
		this.editorValue = `var config = ${JSON.stringify(config, null, '\t')};`;
		this.editorId = `editor${this.configName}`;

		this.configService[this.configName].subscribe((config) => {
			this.componentData = {
				component: this.component,
				config
			};
		});
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



