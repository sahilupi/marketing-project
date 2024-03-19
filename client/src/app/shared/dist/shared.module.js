"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.SharedModule = void 0;
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var safe_pipe_1 = require("./pipes/safe.pipe");
var contact_data_component_1 = require("./components/reusuable-components/contact-data/contact-data.component");
var http_1 = require("@angular/common/http");
var progress_bar_component_1 = require("./components/ui-components/progress-bar/progress-bar.component");
var SharedModule = /** @class */ (function () {
    function SharedModule() {
    }
    SharedModule = __decorate([
        core_1.NgModule({
            declarations: [
                safe_pipe_1.SafePipe,
                contact_data_component_1.ContactDataComponent,
                progress_bar_component_1.ProgressBarComponent
            ],
            imports: [
                common_1.CommonModule,
                http_1.HttpClientModule
            ],
            exports: [
                safe_pipe_1.SafePipe,
                contact_data_component_1.ContactDataComponent,
                progress_bar_component_1.ProgressBarComponent
            ]
        })
    ], SharedModule);
    return SharedModule;
}());
exports.SharedModule = SharedModule;
