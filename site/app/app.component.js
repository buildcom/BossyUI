"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var config_service_1 = require("./config.service");
var calendar_1 = require("../../dist/config/calendar");
var calendar_2 = require("../../dist/components/calendar");
var form_input_1 = require("../../dist/config/form-input");
var form_input_2 = require("../../dist/components/form-input");
var form_1 = require("../../dist/config/form");
var form_2 = require("../../dist/components/form");
var form_label_1 = require("../../dist/config/form-label");
var form_radio_1 = require("../../dist/components/form-radio");
var form_radio_2 = require("../../dist/config/form-radio");
var dropdown_1 = require("../../dist/components/dropdown");
var dropdown_2 = require("../../dist/config/dropdown");
var dropdown_menu_1 = require("../../dist/components/dropdown-menu");
var dropdown_menu_2 = require("../../dist/config/dropdown-menu");
var form_selectmenu_1 = require("../../dist/components/form-selectmenu");
var form_selectmenu_2 = require("../../dist/config/form-selectmenu");
var bossy_form_textarea_1 = require("../../dist/components/bossy-form-textarea");
var bossy_form_textarea_2 = require("../../dist/config/bossy-form-textarea");
var AppComponent = (function () {
    function AppComponent(configService) {
        this.configService = configService;
        this.bossyCalendar = calendar_2.BossyCalendar;
        this.bossyForm = form_2.BossyForm;
        this.bossyFormRadio = form_radio_1.BossyFormRadio;
        this.bossyDropdown = dropdown_1.BossyDropdown;
        this.bossyDropdownMenuItem = dropdown_menu_1.BossyDropdownMenuItem;
        this.bossyFormInput = form_input_2.BossyFormInput;
        this.bossyFormSelectMenu = form_selectmenu_1.BossyFormSelectMenu;
        this.bossyFormTextarea = bossy_form_textarea_1.BossyFormTextarea;
    }
    AppComponent.prototype.ngOnInit = function () {
        var calendarConfig = new calendar_1.BossyCalendarConfig();
        var formInput1 = {
            name: 'textInput',
            type: 'text',
            value: 'test value for text',
            label: new form_label_1.BossyFormLabelConfig('text label test', true, false, false, false)
        }, formInput2 = {
            name: 'textareaInput',
            type: 'textarea',
            value: 'test value for textarea',
            rows: 5,
            cols: 10
        }, formInput3 = {
            name: 'emailInput',
            type: 'email',
            value: 'test value for email'
        }, formInput4 = {
            name: 'Input',
            type: 'text'
        }, formInput5 = {
            name: 'selectmenu',
            type: 'selectmenu',
            selectmenu: new form_selectmenu_2.BossyFormSelectMenuConfig({
                title: 'Vegetables',
                items: [
                    { value: 'carrot' },
                    { value: 'celery', isDisabled: true },
                    { value: 'potato' }
                ]
            })
        }, formInput6 = {
            name: 'radio',
            type: 'radio',
            label: new form_label_1.BossyFormLabelConfig('Test label for radio button'),
            radio: new form_radio_2.BossyFormRadioConfig({
                componentId: 'myRadio',
                items: [
                    { value: 'Option 1' },
                    { value: 'Option 2' },
                    { value: 'Option 3', isDisabled: true }
                ]
            })
        }, textareaInput1 = {
            name: 'textareaInput',
            type: 'textarea',
            label: 'Comments',
            rows: 5,
            placeholder: 'Put your comment here'
        };
        var formConfig = new form_1.BossyFormConfig([
            new form_input_1.BossyFormInputConfig(formInput1),
            new form_input_1.BossyFormInputConfig(formInput2),
            new form_input_1.BossyFormInputConfig(formInput3),
            new form_input_1.BossyFormInputConfig(formInput5),
            new form_input_1.BossyFormInputConfig(formInput6)
        ]);
        var bossyFormRadioConfig = new form_radio_2.BossyFormRadioConfig({
            componentId: 'Pick Star Wars',
            items: [
                { value: 'The Neon Demon', isDisabled: true },
                { value: 'Star Wars Episode VI: Return of the Jedi', isDisabled: false },
                { value: 'Silence of the Lambs', isDisabled: true },
                { value: 'Twilight', isDisabled: true }
            ]
        });
        var formInputConfig = new form_input_1.BossyFormInputConfig(formInput4);
        var dropdownConfig = new dropdown_2.BossyDropdownConfig('Dropdown Menu', 'button', [
            new dropdown_menu_2.BossyDropdownMenuItemConfig('button', 'Item 1', '#', false),
            new dropdown_menu_2.BossyDropdownMenuItemConfig('button', 'Item 2'),
            new dropdown_menu_2.BossyDropdownMenuItemConfig('button', 'Item 3')
        ], false, 'large', undefined, false, 'primary');
        var selectMenuConfig = new form_selectmenu_2.BossyFormSelectMenuConfig({
            title: 'State',
            items: [
                { value: 'California' },
                { value: 'Nevada', isDisabled: true },
                { value: 'Oregon' }
            ]
        });
        var bossyFormTextareaConfig = new bossy_form_textarea_2.BossyFormTextareaConfig(textareaInput1);
        this.configService.setConfig('calendarConfig', calendarConfig);
        this.configService.setConfig('formConfig', formConfig);
        this.configService.setConfig('FormInputConfig', formInputConfig);
        this.configService.setConfig('bossyFormRadioConfig', bossyFormRadioConfig);
        this.configService.setConfig('dropdownConfig', dropdownConfig);
        this.configService.setConfig('selectMenuConfig', selectMenuConfig);
        this.configService.setConfig('bossyFormTextareaConfig', bossyFormTextareaConfig);
    };
    AppComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'sandbox-app',
            templateUrl: '../templates/app.component.html',
            providers: [config_service_1.ConfigService]
        }),
        __metadata("design:paramtypes", [config_service_1.ConfigService])
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map