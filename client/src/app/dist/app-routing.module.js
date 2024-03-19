"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AppRoutingModule = void 0;
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var not_found_component_1 = require("./components/not-found/not-found.component");
var user_auth_guard_1 = require("./shared/auth/user-auth.guard");
var success_component_1 = require("./components/success/success.component");
var admin_auth_guard_1 = require("./shared/auth/admin-auth.guard");
var routes = [
    {
        path: '',
        loadChildren: function () { return Promise.resolve().then(function () { return require('./modules/core/core.module'); }).then(function (m) { return m.CoreModule; }); }
    },
    {
        path: 'advertiser', canActivate: [user_auth_guard_1.UserAuthGuard],
        loadChildren: function () { return Promise.resolve().then(function () { return require('./modules/advertiser/advertiser.module'); }).then(function (m) { return m.AdvertiserModule; }); }
    },
    {
        path: 'auth',
        loadChildren: function () { return Promise.resolve().then(function () { return require('./modules/auth/auth.module'); }).then(function (m) { return m.AuthModule; }); }
    },
    {
        path: 'admin',
        loadChildren: function () { return Promise.resolve().then(function () { return require('./modules/admin/admin.module'); }).then(function (m) { return m.AdminModule; }); },
        canActivate: [admin_auth_guard_1.AdminAuthGuard]
    },
    {
        path: 'success', component: success_component_1.SuccessComponent, title: 'Order Placed', canActivate: [user_auth_guard_1.UserAuthGuard]
    },
    {
        path: '**', component: not_found_component_1.NotFoundComponent, data: { title: 'Page not found' }
    }
];
var AppRoutingModule = /** @class */ (function () {
    function AppRoutingModule() {
    }
    AppRoutingModule = __decorate([
        core_1.NgModule({
            imports: [router_1.RouterModule.forRoot(routes, { preloadingStrategy: router_1.PreloadAllModules, initialNavigation: 'enabledBlocking' })],
            exports: [router_1.RouterModule]
        })
    ], AppRoutingModule);
    return AppRoutingModule;
}());
exports.AppRoutingModule = AppRoutingModule;
