"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AppModule = void 0;
var http_1 = require("@angular/common/http");
var core_1 = require("@angular/core");
var platform_browser_1 = require("@angular/platform-browser");
var animations_1 = require("@angular/platform-browser/animations");
var ngx_progressbar_1 = require("ngx-progressbar");
var http_2 = require("ngx-progressbar/http");
var app_routing_module_1 = require("./app-routing.module");
var app_component_1 = require("./app.component");
var not_found_component_1 = require("./components/not-found/not-found.component");
var core_module_1 = require("./modules/core/core.module");
var auth_interceptor_1 = require("./shared/auth/auth.interceptor");
var success_component_1 = require("./components/success/success.component");
var shared_module_1 = require("./shared/shared.module");
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            declarations: [
                app_component_1.AppComponent,
                not_found_component_1.NotFoundComponent,
                success_component_1.SuccessComponent
            ],
            imports: [
                platform_browser_1.BrowserModule,
                app_routing_module_1.AppRoutingModule,
                core_module_1.CoreModule,
                shared_module_1.SharedModule,
                animations_1.BrowserAnimationsModule,
                ngx_progressbar_1.NgProgressModule.withConfig({
                    color: "black",
                    spinner: false
                }),
                http_2.NgProgressHttpModule
            ],
            providers: [{
                    provide: http_1.HTTP_INTERCEPTORS,
                    useClass: auth_interceptor_1.AuthInterceptor,
                    multi: true
                }],
            bootstrap: [app_component_1.AppComponent]
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
