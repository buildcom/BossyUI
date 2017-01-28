import {Component} from '@angular/core';
import {MaskService} from './mask.service';

@Component ({
  selector: 'masks-and-services-testbed',
  template: `
    <div>
         <div><b>Pipe:</b> {{"123456789" | ToSSN}}</div>
         <div><b>Service:</b> {{maskService.value}}</div>
         <div> <input [(ngModel)]="model" value="{{model | uppercase}}"></div>
    </div>
  `,
  inputs: [
    'config'
  ],
  providers: [MaskService]
})

export class MasksAndServicesTestbed {
  constructor(private maskService : MaskService) {
  };
}

/*




 placeholderConfig : any = { rows: 50,
 cols: 50,
 name: "textArea1",
 placeholder: "testing placeholder",
 autofocus: true,
 dirname: null,
 disabled: null,
 maxlength: null,
 readonly: null,
 required: null,
 wrap: null
 };


 autofocus={{placeholderConfig.autofocus}}
 dirname={{placeholderConfig.dirname}}
 disabled={{placeholderConfig.disabled}}
 maxlength={{placeholderConfig.maxlength}}
 readonly={{placeholderConfig.readonly}}
 required={{placeholderConfig.required}}
 wrap={{placeholderConfig.wrap}}
 */
