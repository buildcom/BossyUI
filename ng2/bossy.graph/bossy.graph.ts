import {Component, OnInit} from 'angular2/core';

@Component({
  selector: 'bossy-graph-line',
  inputs['config'],
  templateUrl: 'bossy-graph-line.html'
})

@Component({
  selector: 'bossy-graph-dot',
  inputs['config'],
  templateUrl: 'bossy-graph-dot.html'
})

@Component({
  selector: 'bossy-graph-bar',
  inputs['config'],
  templateUrl: 'bossy-graph-bar.html'
})

export class BossyGraph implements OnInit{
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
}
