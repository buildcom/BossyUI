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
var ConfigComponent = (function () {
    function ConfigComponent(configService) {
        this.configService = configService;
    }
    ConfigComponent.prototype.ngOnInit = function () {
        var _this = this;
        var config = this.configService[this.configName].getValue();
        this.editorValue = "var config = " + JSON.stringify(config, null, '\t') + ";";
        this.editorId = "editor" + this.configName;
        this.configService[this.configName].subscribe(function (config) {
            _this.componentData = {
                component: _this.component,
                config: config
            };
        });
    };
    ConfigComponent.prototype.ngAfterViewInit = function () {
        this.editor = ace.edit(this.editorId);
        this.editor.setTheme('ace/theme/monokai');
        this.editor.getSession().setMode('ace/mode/javascript');
    };
    ConfigComponent.prototype.updateConfig = function () {
        var value = this.editor.getValue().replace(/^var config = /, '').replace(/;/g, '');
        this.error = null;
        try {
            this.configService.setConfig(this.configName, JSON.parse(value));
        }
        catch (error) {
            this.error = error;
        }
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], ConfigComponent.prototype, "configName", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", core_1.Component)
    ], ConfigComponent.prototype, "component", void 0);
    ConfigComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'sandbox-config',
            templateUrl: '../templates/config.component.html'
        }),
        __metadata("design:paramtypes", [config_service_1.ConfigService])
    ], ConfigComponent);
    return ConfigComponent;
}());
exports.ConfigComponent = ConfigComponent;
//# sourceMappingURL=config.component.js.map