System.register(['angular2/platform/browser', 'angular2/core'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var browser_1, core_1;
    var AppComponent;
    return {
        setters:[
            function (browser_1_1) {
                browser_1 = browser_1_1;
            },
            function (core_1_1) {
                core_1 = core_1_1;
            }],
        execute: function() {
            AppComponent = (function () {
                function AppComponent(dynamicComponentLoader, elementRef) {
                    this.dynamicComponentLoader = dynamicComponentLoader;
                    this.elementRef = elementRef;
                    this.components = Components;
                    this.loadComponents();
                }
                AppComponent.prototype.loadComponents = function () {
                    var _this = this;
                    this.config = { foo: 'bar' };
                    this.components.forEach(function (component) {
                        System.import(component.path)
                            .then(function (componentModule) {
                            _this.dynamicComponentLoader.loadIntoLocation(componentModule[component.fullName], _this.elementRef, 'content')
                                .then(function (component) {
                                //component.instance.inputProperty = this.config.Calendar;
                                //component.instance.inputValue = this.config.Calendar;
                                component.instance.config = _this.config;
                            });
                        });
                    });
                };
                AppComponent = __decorate([
                    core_1.Component({
                        selector: 'sandbox-app',
                        template: "\n        <div class=\"row\">\n            <div class=\"col-fixed-200\">\n                <ul class=\"left-menu\">\n                    <li class=\"left-menu-item\" *ngFor=\"#c of components\">{{c.shortName}}</li>\n                </ul>\n            </div>\n            <div class=\"col-offset-200\">\n                <div class=\"row\">\n                    <div #content></div>\n                    <!--<bossy-calendar [config]=\"config\"></bossy-calendar>-->\n                </div>\n            </div>\n        </div>\n    ",
                    }), 
                    __metadata('design:paramtypes', [core_1.DynamicComponentLoader, core_1.ElementRef])
                ], AppComponent);
                return AppComponent;
            }());
            browser_1.bootstrap(AppComponent);
        }
    }
});
//# sourceMappingURL=app.component.js.map