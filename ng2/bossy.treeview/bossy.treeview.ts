import {Component, OnInit} from 'angular2/core';

export interface BossyTreeviewConfig {

}

@Component({
    selector: 'bossy-treeview',
    templateUrl: 'bossy-treeview.html',
    inputs: ['config'],
    styleUrls: ['_bossy-treeview.css']
})

export  class BossyTreeview implements OnInit {
    public config: BossyTreeviewConfig;
}