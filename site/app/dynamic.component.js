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
var calendar_1 = require("../../dist/components/calendar");
var form_1 = require("../../dist/components/form");
var form_radio_1 = require("../../dist/components/form-radio");
var dropdown_1 = require("../../dist/components/dropdown");
var dropdown_menu_1 = require("../../dist/components/dropdown-menu");
var form_input_1 = require("../../dist/components/form-input");
var form_selectmenu_1 = require("../../dist/components/form-selectmenu");
var bossy_form_textarea_1 = require("../../dist/components/bossy-form-textarea");
var DynamicComponent = (function () {
    function DynamicComponent(resolver) {
        this.resolver = resolver;
        this.currentComponent = null;
    }
    Object.defineProperty(DynamicComponent.prototype, "componentData", {
        set: function (data) {
            if (!data) {
                return;
            }
            var injector = core_1.ReflectiveInjector.fromResolvedProviders([], this.dynamicComponentContainer.parentInjector);
            var factory = this.resolver.resolveComponentFactory(data.component);
            var component = factory.create(injector);
            component.instance['config'] = data.config;
            this.dynamicComponentContainer.insert(component.hostView);
            if (this.currentComponent) {
                this.currentComponent.destroy();
            }
            this.currentComponent = component;
        },
        enumerable: true,
        configurable: true
    });
    __decorate([
        core_1.ViewChild('dynamicComponentContainer', { read: core_1.ViewContainerRef }),
        __metadata("design:type", core_1.ViewContainerRef)
    ], DynamicComponent.prototype, "dynamicComponentContainer", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [Object])
    ], DynamicComponent.prototype, "componentData", null);
    DynamicComponent = __decorate([
        core_1.Component({
            selector: 'dynamic-component',
            entryComponents: [calendar_1.BossyCalendar, form_1.BossyForm, form_input_1.BossyFormInput, form_radio_1.BossyFormRadio, dropdown_1.BossyDropdown, dropdown_menu_1.BossyDropdownMenuItem, form_selectmenu_1.BossyFormSelectMenu, bossy_form_textarea_1.BossyFormTextarea],
            template: "<div #dynamicComponentContainer></div>",
        }),
        __metadata("design:paramtypes", [core_1.ComponentFactoryResolver])
    ], DynamicComponent);
    return DynamicComponent;
}());
exports.DynamicComponent = DynamicComponent;
//# sourceMappingURL=dynamic.component.js.map