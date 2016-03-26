import {BrowserDomAdapter, Component, OnInit} from 'angular2/core';

@Component({
  selector: 'bossy-graph-line',
  inputs['config'],
  templateUrl: 'bossy-graph-line.html',
  providers: [BrowserDomAdapter]
})

@Component({
  selector: 'bossy-graph-dot',
  inputs['config'],
  templateUrl: 'bossy-graph-dot.html',
  providers: [BrowserDomAdapter]
})

@Component({
  selector: 'bossy-graph-bar',
  inputs['config'],
  templateUrl: 'bossy-graph-bar.html',
  providers: [BrowserDomAdapter]
})

export class BossyGraph implements OnInit{
  private _dom: BrowserDomAdapter;
  public config: BossyGraphConfig;

  buildBarSVG(width, height, data){
  var graphMarkup = []
  graphMarkup.push('<svg style="width:',
                    width,
                    'px; height:',
                    height,
                    'px;">');

  var dataSetLength = data.length;
  data.forEach(function(bar, index) {
    var x = index * (width / dataSetLength);
    var y = height - bar;
    var w = width / dataSetLength;

    graphMarkup.push('<rect x="',
                      x,
                      '" y="',
                      y,
                      '" width="',
                      w,
                      '" height="',
                      bar,
                      '" style="fill:rgb(0,0,255);stroke-width:1;stroke:rgb(0,0,0)"></rect>');
  });

  graphMarkup.push('</svg>');

  return graphMarkup.join("");
  }

  ngOnInit(){
    // Fail safe in case config are not given
    if (!this.config) {
      this.config = {
        'max': 0,
        'height': 200,
        'width': 200,
        'xLabel': undefined,
        'yLabel': undefined,
      };
    }
    var barSVGTag = buildBarSVG(this.config.width, this.config.height, this.data)
    var element = this._dom.query('bossy-graph-bar');
    element.append(barSVGTag);

    // Throw an error if text is not given
    if (!this.config.text) {
      console.error('You must include content for graph.');
    }
  }
}
