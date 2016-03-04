import {Component, OnInit} from 'angular2/core';

export interface BossyComboboxConfig {
    item: number;
    selectedItems: string;
    multi: boolean;
    sort: boolean;
    text: string;
    title: string;
    list: string[];
    placeholder: string;
}

@Component({
    selector: 'bossy-combobox',
    templateUrl: 'bossy-combobox.html',
    inputs: ['config'],
    styleUrls: ['_bossy-combobox.css']
})

export class BossyCombobox implements OnInit {
    public config: BossyComboboxConfig;
    public list: string[];
    public selectedItems: string[];
    public multi: boolean;
    public sort: boolean;
    public title: string;
    public placeholder: string;

    // Remove item from the list of selected items and place it back in the dropbox
    deleteSelection = function(item) {
        var index = this.selectedItems.indexOf(item);
        this.selectedItems.splice(index, 1);
    };

    // Add selected item to selection list and remove it from the dropdown box
    addSelection = function(item) {
        if(this.multi == false) {
            this.selectedItems = [];
        }
        if (this.selectedItems.indexOf(item) == -1) {
            this.selectedItems.push(item);
        }
    };

    //sorts ComboBox elements
    sortFunction = function(sortByName) {
        if(this.sort == true) {
            return sortByName;
        }
    };

    ngOnInit(){
        // Fail safe in case config are not given
        if (!this.config) {
            this.config = <BossyComboboxConfig>{
                'selectedItems': []
                /*
                *
                *
                */
            };
        }
        this.list=this.config.list;
        this.title=this.config.title;
        this.placeholder=this.config.placeholder;
        this.sort=this.config.sort;
        this.multi=this.config.multi;
        this.selectedItems = [];

        // Throw an error if text is not given
        if (!this.config.text) {
            console.error('You must include content for combo box.');
        }
    }
}