import {Component} from '@angular/core'

@Component ({
  selector: 'text-area',
  template: `
    <div>
         <textarea
         cols={{placeholderConfig.cols}}
         name={{placeholderConfig.name}}
         placeholder={{placeholderConfig.placeholder}}
         ></textarea>
    </div>
  `,
  inputs: [
    'config'
  ]
})

export class TextArea  {
  public config: {rows: number, cols: number}

  placeholderConfig : any = { rows: 50,
                              cols: 100,
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

}

/*
 autofocus={{placeholderConfig.autofocus}}
 dirname={{placeholderConfig.dirname}}
 disabled={{placeholderConfig.disabled}}
 maxlength={{placeholderConfig.maxlength}}
 readonly={{placeholderConfig.readonly}}
 required={{placeholderConfig.required}}
 wrap={{placeholderConfig.wrap}}
 */
