(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/platform-browser'), require('@angular/forms')) :
	typeof define === 'function' && define.amd ? define(['exports', '@angular/core', '@angular/platform-browser', '@angular/forms'], factory) :
	(factory((global.ng = global.ng || {}, global.ng.bossyui = global.ng.bossyui || {}),global.ng.core,global.ng['platform-browser'],global.ng.forms));
}(this, (function (exports,_angular_core,_angular_platformBrowser,_angular_forms) { 'use strict';

function __decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}

exports.BossyCalendar = (function () {
    function BossyCalendar() {
        this.dateMap = [];
        this.days = [
            'Sunday',
            'Monday',
            'Tuesday',
            'Wednesday',
            'Thursday',
            'Friday',
            'Saturday'
        ];
        this.display = new Date();
        this.selected = new Date();
    }
    BossyCalendar.prototype.ngOnInit = function () {
        this.updateDateMap();
    };
    BossyCalendar.prototype.previousMonth = function () {
        this.selectMonth(this.display.getMonth() - 1);
    };
    BossyCalendar.prototype.nextMonth = function () {
        this.selectMonth(this.display.getMonth() + 1);
    };
    BossyCalendar.prototype.selectMonth = function (month) {
        var year = this.display.getFullYear();
        this.display = new Date(year, month, 1);
        this.updateDateMap();
    };
    BossyCalendar.prototype.selectDate = function (date) {
        if (!date.inMonth) {
            if (date.day > 7) {
                this.selected = new Date(this.display.getFullYear(), this.display.getMonth() - 1, date.day);
                this.previousMonth();
            }
            else {
                this.selected = new Date(this.display.getFullYear(), this.display.getMonth() + 1, date.day);
                this.nextMonth();
            }
        }
        else {
            this.selected = new Date(this.display.getFullYear(), this.display.getMonth(), date.day);
            this.updateDateMap();
        }
    };
    BossyCalendar.prototype.updateDateMap = function () {
        var month = [];
        var week = [];
        var startDate = new Date(this.display.getFullYear(), this.display.getMonth(), 1);
        var endDate = new Date(this.display.getFullYear(), this.display.getMonth() + 1, 0);
        var endDatePrevious = new Date(this.display.getFullYear(), this.display.getMonth(), 0);
        var day = 1;
        var endDay = parseInt(endDate.toDateString().split(' ')[2]);
        var endDayPrevious = parseInt(endDatePrevious.toDateString().split(' ')[2]);
        while (day <= endDay) {
            var weekDay = ((day - 1) + startDate.getDay()) % 7;
            var weekDayValue = new Date(this.display.getFullYear(), this.display.getMonth(), day).toDateString();
            if (weekDay === 0) {
                month.push(week);
                week = [];
            }
            week[weekDay] = {
                day: day,
                inMonth: true,
                value: weekDayValue,
                selected: (weekDayValue === this.selected.toDateString())
            };
            day++;
        }
        month.push(week);
        var first = month[0].reverse();
        var last = month.slice(-1)[0];
        day = 1;
        for (var i = 0; i < 7; i++) {
            if (!first[i]) {
                first[i] = { day: endDayPrevious, inMonth: false };
                endDayPrevious--;
            }
            if (!last[i]) {
                last[i] = { day: day, inMonth: false };
                day++;
            }
        }
        first.reverse();
        this.dateMap = month;
    };
    return BossyCalendar;
}());
__decorate([
    _angular_core.Input()
], exports.BossyCalendar.prototype, "config");
exports.BossyCalendar = __decorate([
    _angular_core.Component({
        selector: 'bossy-calendar',
        template: "<div class=\"bossy-calendar\">\n\t<div class=\"bossy-calendar-view\">\n\t\t<table>\n\t\t\t<thead>\n\t\t\t<tr class=\"bossy-calendar-heading\">\n\t\t\t\t<td (click)=\"previousMonth()\" title=\"Previous month\" class=\"bossy-calendar-month-selector\">\n\t\t\t\t\t<img src=\"https://cdn4.iconfinder.com/data/icons/ionicons/512/icon-chevron-left-128.png\" title=\"Previous Month\" width=\"25\"/>\n\t\t\t\t</td>\n\t\t\t\t<td colspan=\"5\" class=\"bossy-calendar-month\">{{display | date}}</td>\n\t\t\t\t<td (click)=\"nextMonth()\" title=\"Next month\" class=\"bossy-calendar-month-selector\">\n\t\t\t\t\t<img src=\"https://cdn4.iconfinder.com/data/icons/ionicons/512/icon-chevron-right-128.png\" title=\"Next Month\" width=\"25\">\n\t\t\t\t</td>\n\t\t\t</tr>\n\t\t\t</thead>\n\t\t\t<tbody>\n\t\t\t<tr class=\"bossy-calendar-week-days\">\n\t\t\t\t<td *ngFor=\"let day of days\" title=\"{{day}}\">{{day.slice(0, 2)}}</td>\n\t\t\t</tr>\n\t\t\t<tr *ngFor=\"let week of dateMap\" class=\"bossy-calendar-week-days\">\n\t\t\t\t<td *ngFor=\"let date of week\" class=\"bossy-calendar-week-day\" [class.bossy-calendar-not-current]=\"!date.inMonth\" [class.selected]=\"date.selected\" (click)=\"selectDate(date)\">\n\t\t\t\t\t{{date.day}}\n\t\t\t\t</td>\n\t\t\t</tr>\n\t\t\t</tbody>\n\t\t</table>\n\t</div>\n</div>",
        styles: [".bossy-calendar {\n\tposition: relative;\n\tbackground-color: white;\n\tdisplay: inline-block;\n\tborder-radius: 3px;\n\tbox-shadow:\n\t\t0 1px 2.97px 0.03px rgba(0,0,0,0.35),\n\t\t0 4px 10.45px 0.55px rgba(0,0,0,0.21);\n}\n.bossy-calendar-view {\n\tposition: relative;\n\tpadding: 30px;\n\tdisplay: inline-block;\n}\n.bossy-calendar-view table {\n    min-width: 214px;\n}\n.bossy-calendar-view table tr td {\n    padding: 4px; text-align: center;\n}\n.bossy-calendar-heading {\n \ttext-align: center;\n \tfont: bold 26px \"Helvetica Neue\", \"Helvetica\", \"Arial\", sans-serif;\n \tcolor: #000;\n}\n.bossy-calendar-month {\n\tmin-width: 250px;\n}\n.bossy-calendar-month-selector {\n\tcursor: pointer;\n \tbackground-color: #3582a2;\n\tdisplay: block;\n\theight: 45px;\n\twidth: 45px;\n\tborder-radius: 5px;\n}\n.bossy-calendar-month-selector:hover {\n \tbackground-color: #0076A8;\n}\n.bossy-calendar-week-days {\n\tborder-bottom: 1px solid #e8e8e8;\n}\n.bossy-calendar-not-current {\n\tcolor: #dfdfdf;\n}\n.bossy-calendar-week-day {\n\tcursor: pointer;\n}\n.bossy-calendar-week-day.selected {\n\tcolor: #fff;\n \tbackground-color: #3582a2;\n}\n.selected {\n\t/*font-size: 23px;*/\n\tfont-weight: 100;\n}\n.bossy-calendar-date-selected strong {\n\tdisplay: block;\n\tfont-size: 12px;\n}"]
    })
], exports.BossyCalendar);

exports.BossyFormInput = (function () {
    function BossyFormInput() {
        this.hasSuccess = false;
        this.hasWarning = false;
        this.hasDanger = false;
    }
    BossyFormInput.prototype.ngOnInit = function () {
        var _a = this.config, name = _a.name, value = _a.value, formGroup = _a.formGroup;
        if (formGroup) {
            console.log('formgroup', name);
            formGroup.addControl(name, new _angular_forms.FormControl(value));
        }
    };
    BossyFormInput.prototype.output = function () {
    };
    return BossyFormInput;
}());
__decorate([
    _angular_core.Input()
], exports.BossyFormInput.prototype, "config");
exports.BossyFormInput = __decorate([
    _angular_core.Component({
        selector: 'bossy-form-input',
        template: "<div [ngSwitch]=\"config.type\" class=\"{{ bossy-form-input }}\">\n    <div *ngSwitchCase=\"'number'\">\n        <input type=\"number\" name=\"{{ config.name }}\" placeholder=\"{{ config.placeholder }}\"/>\n    </div>\n    <div *ngSwitchCase=\"'textarea'\">\n        <textarea name=\"{{ config.name }}\" placeholder=\"{{ config.placeholder }}\" rows=\"{{ config.rows }}\" cols=\"{{ config.cols }}\"></textarea>\n    </div>\n    <div *ngSwitchCase=\"'email'\">\n        <input type=\"email\">\n    </div>\n    <div *ngSwitchCase=\"'selectmenu'\">\n        <bossy-form-selectmenu  [config]=\"config.selectmenu\"></bossy-form-selectmenu>\n    </div>\n    <div *ngSwitchDefault>\n        <input type=\"text\" name=\"{{ config.name }}\" placeholder=\"{{ config.placeholder }}\"/>\n    </div>\n</div>\n",
        styles: [".bossy-form-input {\n\n\tvalue: 'bossy-form-input';\n}\n"]
    })
], exports.BossyFormInput);

exports.BossyForm = (function () {
    function BossyForm(formBuilder) {
        this.formBuilder = formBuilder;
        this.isFormInlinedFromConfig = false;
    }
    BossyForm.prototype.ngOnInit = function () {
        var elements = {};
        this.isFormInlinedFromConfig = this.config.isFormInlined;
        this.config.elements.forEach(function (element) {
            var name = element.name, value = element.value;
            elements[name] = value;
        });
        this.bossyForm = this.formBuilder.group(elements);
    };
    BossyForm.prototype.onSubmit = function () {
        // TODO: return form data
    };
    return BossyForm;
}());
__decorate([
    _angular_core.Input()
], exports.BossyForm.prototype, "config");
exports.BossyForm = __decorate([
    _angular_core.Component({
        selector: 'bossy-form',
        template: "<form [formGroup]=\"bossyForm\" novalidate [ngClass]=\"{'form-inline': isFormInlinedFromConfig}\">\n\t<div *ngFor=\"let element of config.elements\" class=\"form-group\">\n\t\t<bossy-form-label [config]=\"element.label\"></bossy-form-label>\n\t\t<div [ngSwitch]=\"element.type\">\n\t\t\t<div *ngSwitchCase=\"'number'\" [ngClass]=\"{'has-success': element.hasSuccess, 'has-warning': element.hasWarning, 'has-danger': element.hasDanger}\">\n\t\t\t\t<input type=\"number\" name=\"{{ element.name }}\" placeholder=\"{{ element.placeholder }}\" formControlName=\"{{ element.name }}\" class=\"form-control\"\n\t\t\t\t\t\t[ngClass]=\"{'form-control-success': element.hasSuccess, 'form-control-warning': element.hasWarning, 'form-control-danger': element.hasDanger}\"/>\n\t\t\t</div>\n\t\t\t<div *ngSwitchCase=\"'password'\" [ngClass]=\"{'has-success': element.hasSuccess, 'has-warning': element.hasWarning, 'has-danger': element.hasDanger}\">\n\t\t\t\t<input type=\"password\" name=\"{{ element.name }}\" placeholder=\"{{ element.placeholder }}\" formControlName=\"{{ element.name }}\" class=\"form-control\"\n\t\t\t\t\t\t[ngClass]=\"{'form-control-success': element.hasSuccess, 'form-control-warning': element.hasWarning, 'form-control-danger': element.hasDanger}\"/>\n\t\t\t</div>\n\t\t\t<div *ngSwitchCase=\"'textarea'\" [ngClass]=\"{'has-success': element.hasSuccess, 'has-warning': element.hasWarning, 'has-danger': element.hasDanger}\">\n\t\t\t\t<textarea name=\"{{ element.name }}\" placeholder=\"{{ element.placeholder }}\" rows=\"{{ element.rows }}\" cols=\"{{ element.cols }}\" formControlName=\"{{ element.name }}\" class=\"form-control\"\n\t\t\t\t\t\t[ngClass]=\"{'form-control-success': element.hasSuccess, 'form-control-warning': element.hasWarning, 'form-control-danger': element.hasDanger}\"></textarea>\n\t\t\t</div>\n\t\t\t<div *ngSwitchCase=\"'email'\" [ngClass]=\"{'has-success': element.hasSuccess, 'has-warning': element.hasWarning, 'has-danger': element.hasDanger}\">\n\t\t\t\t<input type=\"email\" formControlName=\"{{ element.name }}\" class=\"form-control\"\n\t\t\t\t\t\t[ngClass]=\"{'form-control-success': element.hasSuccess, 'form-control-warning': element.hasWarning, 'form-control-danger': element.hasDanger}\">\n\t\t\t\t<bossy-form-input-error [formGroup]=\"bossyForm\" [controlName]=\"element.name\" [errorCssClass]=\"element.errorCssClass\"></bossy-form-input-error>\n\t\t\t</div>\n\t\t\t<div *ngSwitchCase=\"'date'\" [ngClass]=\"{'has-success': element.hasSuccess, 'has-warning': element.hasWarning, 'has-danger': element.hasDanger}\">\n\t\t\t\t<input type=\"date\" placeholder=\"{{ element.placeholder }}\" formControlName=\"{{ element.name }}\" class=\"form-control\"\n\t\t\t\t\t\t[ngClass]=\"{'form-control-success': element.hasSuccess, 'form-control-warning': element.hasWarning, 'form-control-danger': element.hasDanger}\">\n\t\t\t</div>\n\t\t\t<div *ngSwitchCase=\"'radio'\">\n\t\t\t\t<div *ngFor=\"let radioItem of element.radio.items; let i = index\" [ngClass]=\"{'form-check': true, ' form-check-inline': element.isInline}\" id=\"{{element.radio.componentId}}\">\n\t\t\t\t  <label class=\"form-check-label\" id=\"{{element.radio.componentId}}_label{{i}}\">\n\t\t\t\t    <input class=\"form-check-input\" type=\"radio\" name=\"radio\" id=\"{{element.radio.componentId}}_input{{i}}\" value=\"radioOption{{i}}\" [disabled]=radioItem.isDisabled>  {{radioItem.value}}\n\t\t\t\t  </label>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t\t<div *ngSwitchCase=\"'selectmenu'\">\n\t\t\t\t<bossy-form-input type=\"selectmenu\" [config]=\"element\"></bossy-form-input>\n\t\t\t</div>\n\t\t\t<div *ngSwitchDefault [ngClass]=\"{'has-success': element.hasSuccess, 'has-warning': element.hasWarning, 'has-danger': element.hasDanger}\">\n\t\t\t\t<input type=\"text\" name=\"{{ element.name }}\" placeholder=\"{{ element.placeholder }}\" formControlName=\"{{ element.name }}\" class=\"form-control\"\n\t\t\t\t\t\t[ngClass]=\"{'form-control-success': element.hasSuccess, 'form-control-warning': element.hasWarning, 'form-control-danger': element.hasDanger}\"/>\n\t\t\t</div>\n\t\t</div>\n\t</div>\n</form>\n",
        styles: [""]
    })
], exports.BossyForm);

exports.BossyFormLabel = (function () {
    function BossyFormLabel() {
        this.isInline = false;
        this.hasSuccess = false;
        this.hasWarning = false;
        this.hasDanger = false;
    }
    return BossyFormLabel;
}());
__decorate([
    _angular_core.Input()
], exports.BossyFormLabel.prototype, "config");
exports.BossyFormLabel = __decorate([
    _angular_core.Component({
        selector: 'bossy-form-label',
        template: "<div *ngIf=\"config?.text\" [ngClass]=\"{'has-success': config?.hasSuccess, 'has-warning': config?.hasWarning, 'has-danger': config?.hasDanger}\">\n\t<label [ngClass]=\"{'form-control-label': config?.inline, 'form-control-label': true}\">\n\t\t{{config.text}}\n\t</label>\n</div>\n",
        styles: [".bossy-inline-label {\n\tclear: both;\n\tfloat: left;\n\tmargin-right: 10px;\n}\n"]
    })
], exports.BossyFormLabel);

exports.BossyFormRadio = (function () {
    function BossyFormRadio() {
        this.items = [];
        this.componentId = '';
        this.isInline = false;
    }
    BossyFormRadio.prototype.ngOnInit = function () {
        var _this = this;
        this.config.items.forEach(function (element) {
            _this.items.push(element);
        });
        this.componentId = this.config.componentId;
        if (this.config.isInline !== undefined) {
            this.isInline = this.config.isInline;
        }
    };
    return BossyFormRadio;
}());
__decorate([
    _angular_core.Input()
], exports.BossyFormRadio.prototype, "config");
exports.BossyFormRadio = __decorate([
    _angular_core.Component({
        selector: 'bossy-form-radio',
        template: "<div *ngFor=\"let element of items; let i = index\" [ngClass]=\"{'form-check': true, ' form-check-inline': isInline}\" id=\"{{this.componentId}}\">\n  <label class=\"form-check-label\" id=\"{{this.componentId}}_label{{i}}\">\n    <input class=\"form-check-input\" type=\"radio\" name=\"radio\" id=\"{{this.componentId}}_input{{i}}\" value=\"radioOption{{i}}\" [disabled]=element.isDisabled>  {{element.value}}\n  </label>\n</div>\n"
    })
], exports.BossyFormRadio);

exports.BossyDropdown = (function () {
    function BossyDropdown() {
        this.type = 'Button';
        this.isSplit = false;
        this.isDropup = false;
        this.isRightAligned = false;
        this.variant = 'secondary';
        this.size = undefined;
    }
    BossyDropdown.prototype.showMenuOnClick = function (event) {
        var element = event.target.parentElement;
        // Checks for 'show' so that we can add btn-group/dropup later
        if (!element.classList.contains('show')) {
            element.classList.add('show');
            event.target.setAttribute('aria-expanded', 'true');
        }
        else {
            element.classList.remove('show');
            event.target.setAttribute('aria-expanded', 'false');
        }
    };
    BossyDropdown.prototype.ngOnInit = function () {
        if (this.config.variant !== undefined) {
            this.variant = this.config.variant;
        }
        if (this.config.size === 'large') {
            this.size = 'btn-lg';
        }
        else if (this.config.size === 'small') {
            this.size = 'btn-sm';
        }
        if (this.config.isRightAligned !== undefined) {
            this.isRightAligned = this.config.isRightAligned;
        }
    };
    return BossyDropdown;
}());
__decorate([
    _angular_core.Input()
], exports.BossyDropdown.prototype, "config");
exports.BossyDropdown = __decorate([
    _angular_core.Component({
        selector: 'bossy-dropdown',
        template: "<div class=\"btn-group\" (click)=\"showMenuOnClick($event)\">\n\t<button *ngIf=\"!config?.isSplit\" class=\"btn btn-{{variant}} {{size}} dropdown-toggle\" id='dropdownMenuButton' data-toggle=\"dropdown\" aria-haspopup=\"true\" aria-expanded=\"false\">\n\t\t{{config.name}}\n\t</button>\n\t<button *ngIf=\"config?.isSplit\" class=\"btn btn-{{variant}} {{size}}\"  type=\"button\">\n\t\t{{config.name}}\n\t</button>\n\t<button *ngIf=\"config?.isSplit\" type=\"button\" class=\"btn btn-{{variant}} {{size}} dropdown-toggle dropdown-toggle-split\" data-toggle=\"dropdown\" aria-haspopup=\"true\" aria-expanded=\"false\">\n    <span class=\"sr-only\">Toggle Dropdown</span>\n  </button>\n\t<div class=\"dropdown-menu\" [ngClass]=\"{'dropdown-menu-right': isRightAligned}\" aria-labelledby=\"dropdownMenuButton\">\n\t\t<bossy-dropdown-menu *ngFor=\"let item of config.items\" [config]=\"item\"></bossy-dropdown-menu>\n\t</div>\n</div>\n"
    })
], exports.BossyDropdown);

exports.BossyDropdownMenuItem = (function () {
    function BossyDropdownMenuItem() {
        this.type = 'button';
        this.name = 'missingName';
        this.href = '#';
        this.isDisabled = false;
    }
    BossyDropdownMenuItem.prototype.checkForDisabled = function () {
        if (this.config.isDisabled) {
            return 'disabled';
        }
    };
    return BossyDropdownMenuItem;
}());
__decorate([
    _angular_core.Input()
], exports.BossyDropdownMenuItem.prototype, "config");
exports.BossyDropdownMenuItem = __decorate([
    _angular_core.Component({
        selector: 'bossy-dropdown-menu',
        template: "<div [ngSwitch]=\"config.type\">\n\t<div *ngSwitchCase=\"'button'\">\n\t\t<button class=\"dropdown-item {{checkForDisabled()}}\" type=\"button\">{{config.name}}</button>\n\t</div>\n\t<div *ngSwitchCase=\"'divider'\">\n\t\t<div  class=\"dropdown-divider\"></div>\n\t</div>\n\t<div *ngSwitchCase=\"'header'\">\n\t\t<h6 class=\"dropdown-header\">{{config.name}}</h6>\n\t</div>\n\t<div *ngSwitchDefault>\n\t\t<a class=\"dropdown-item {{checkForDisabled()}}\" href=\"{{config.href}}\">{{config.name}}</a>\n</div>\n"
    })
], exports.BossyDropdownMenuItem);

exports.BossyFormInputError = (function () {
    function BossyFormInputError() {
    }
    return BossyFormInputError;
}());
__decorate([
    _angular_core.Input()
], exports.BossyFormInputError.prototype, "controlName");
__decorate([
    _angular_core.Input()
], exports.BossyFormInputError.prototype, "formGroup");
__decorate([
    _angular_core.Input()
], exports.BossyFormInputError.prototype, "errorCssClass");
exports.BossyFormInputError = __decorate([
    _angular_core.Component({
        selector: 'bossy-form-input-error',
        template: "<div class =\"form-control-feedback\" *ngIf=\"formGroup.controls[controlName].hasError(controlName)\">\n    <div *ngFor=\"let error of formGroup.controls[controlName].errors[controlName]\" [class]=\"errorCssClass\">\n        {{ error }}\n    </div>\n</div>\n",
        styles: [""]
    })
], exports.BossyFormInputError);

exports.BossyFormSelectMenu = (function () {
    function BossyFormSelectMenu() {
    }
    return BossyFormSelectMenu;
}());
__decorate([
    _angular_core.Input()
], exports.BossyFormSelectMenu.prototype, "config");
exports.BossyFormSelectMenu = __decorate([
    _angular_core.Component({
        selector: 'bossy-form-selectmenu',
        template: "<select class=\"custom-select\">\n  <option selected>{{config.title}}</option>\n  <option *ngFor=\"let item of config.items\" value=item.value [disabled]=item.isDisabled >{{item.value}}</option>\n</select>\n"
    })
], exports.BossyFormSelectMenu);

var BossyFormTextarea = (function () {
    function BossyFormTextarea() {
        this.hasSuccess = false;
        this.hasWarning = false;
        this.hasDanger = false;
    }
    BossyFormTextarea.prototype.ngOnInit = function () {
        var _a = this.config, name = _a.name, value = _a.value, formGroup = _a.formGroup;
        if (formGroup) {
            formGroup.addControl(name, new _angular_forms.FormControl(value));
        }
    };
    BossyFormTextarea.prototype.output = function () {
    };
    return BossyFormTextarea;
}());
__decorate([
    _angular_core.Input()
], BossyFormTextarea.prototype, "config");
BossyFormTextarea = __decorate([
    _angular_core.Component({
        selector: 'bossy-form-textarea',
        template: "<div [ngSwitch]=\"config.type\" class=\"{{ bossy-form-textarea }}\">\n  <div class=\"form-group\">\n    <label for=\"comment\"> {{ config.label }}</label>\n    <textarea class=\"form-control\" name=\"{{ config.name }}\" placeholder=\"{{ config.placeholder }}\" rows=\"{{ config.rows }}\" cols=\"{{ config.cols }}\"></textarea>\n  </div>\n</div>\n",
        styles: [".bossy-form-textarea {\n\tvalue: 'bossy-form-textarea';\n}\n"]
    })
], BossyFormTextarea);

var BossyCalendarConfig = (function () {
    function BossyCalendarConfig() {
        this.defaultDate = new Date();
    }
    return BossyCalendarConfig;
}());

var BossyFormConfig = (function () {
    function BossyFormConfig(elements, isFormInlined) {
        this.elements = elements;
        this.isFormInlined = isFormInlined;
    }
    return BossyFormConfig;
}());

var BossyFormInputConfig = (function () {
    function BossyFormInputConfig(options) {
        var _this = this;
        Object.keys(options).forEach(function (key) {
            _this[key] = options[key];
        });
    }
    return BossyFormInputConfig;
}());

var BossyFormLabelConfig = (function () {
    function BossyFormLabelConfig(text, inline, hasSuccess, hasWarning, hasDanger) {
        this.text = text;
        this.inline = inline;
        this.hasSuccess = hasSuccess;
        this.hasWarning = hasWarning;
        this.hasDanger = hasDanger;
    }
    return BossyFormLabelConfig;
}());

var BossyFormSelectMenuConfig = (function () {
    function BossyFormSelectMenuConfig(options) {
        var _this = this;
        Object.keys(options).forEach(function (key) {
            _this[key] = options[key];
        });
    }
    return BossyFormSelectMenuConfig;
}());

// Define object for each radio element
// Config for radio component
var BossyFormRadioConfig = (function () {
    function BossyFormRadioConfig(options) {
        Object.assign(this, options);
    }
    return BossyFormRadioConfig;
}());

var BossyDropdownConfig = (function () {
    function BossyDropdownConfig(name, type, items, isSplit, size, isDropup, isRightAligned, variant) {
        this.name = name;
        this.type = type;
        this.items = items;
        this.isSplit = isSplit;
        this.size = size;
        this.isDropup = isDropup;
        this.isRightAligned = isRightAligned;
        this.variant = variant;
    }
    return BossyDropdownConfig;
}());

var BossyDropdownMenuItemConfig = (function () {
    function BossyDropdownMenuItemConfig(type, name, href, isDisabled) {
        this.type = type;
        this.name = name;
        this.href = href;
        this.isDisabled = isDisabled;
    }
    return BossyDropdownMenuItemConfig;
}());

exports.BossyModule = BossyModule_1 = (function () {
    function BossyModule() {
    }
    BossyModule.forRoot = function () {
        return {
            ngModule: BossyModule_1,
            providers: []
        };
    };
    return BossyModule;
}());
exports.BossyModule = BossyModule_1 = __decorate([
    _angular_core.NgModule({
        imports: [
            _angular_platformBrowser.BrowserModule,
            _angular_forms.ReactiveFormsModule
        ],
        declarations: [
            exports.BossyCalendar,
            exports.BossyFormInput,
            exports.BossyForm,
            exports.BossyFormLabel,
            exports.BossyFormRadio,
            exports.BossyDropdown,
            exports.BossyDropdownMenuItem,
            exports.BossyFormInputError,
            exports.BossyFormSelectMenu,
            BossyFormTextarea
        ],
        exports: [
            exports.BossyCalendar,
            exports.BossyFormInput,
            exports.BossyForm,
            exports.BossyFormRadio,
            exports.BossyDropdown,
            exports.BossyDropdownMenuItem,
            exports.BossyFormSelectMenu,
            BossyFormTextarea
        ]
    })
], exports.BossyModule);
var BossyModule_1;

exports.BossyCalendarConfig = BossyCalendarConfig;
exports.BossyFormConfig = BossyFormConfig;
exports.BossyFormInputConfig = BossyFormInputConfig;
exports.BossyFormLabelConfig = BossyFormLabelConfig;
exports.BossyFormSelectMenuConfig = BossyFormSelectMenuConfig;
exports.BossyFormRadioConfig = BossyFormRadioConfig;
exports.BossyDropdownConfig = BossyDropdownConfig;
exports.BossyDropdownMenuItemConfig = BossyDropdownMenuItemConfig;

Object.defineProperty(exports, '__esModule', { value: true });

})));
