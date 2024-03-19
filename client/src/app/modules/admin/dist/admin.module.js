"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AdminModule = void 0;
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var admin_index_component_1 = require("./admin-index/admin-index.component");
var users_component_1 = require("./users/users.component");
var orders_component_1 = require("./orders/orders.component");
var router_1 = require("@angular/router");
var admin_auth_guard_1 = require("src/app/shared/auth/admin-auth.guard");
var all_orders_resolver_1 = require("./resolvers/all-orders.resolver");
var routes = [
    {
        path: '', component: admin_index_component_1.AdminIndexComponent, title: 'Admin Dashboard - Markutting', canActivate: [admin_auth_guard_1.AdminAuthGuard]
    },
    {
        path: 'orders', component: orders_component_1.OrdersComponent, title: 'View All orders - Markutting', canActivate: [admin_auth_guard_1.AdminAuthGuard], resolve: { allorders: all_orders_resolver_1.AllOrdersResolver }
    },
    {
        path: 'users', component: users_component_1.UsersComponent, title: 'View All Users - Markutting', canActivate: [admin_auth_guard_1.AdminAuthGuard]
    }
];
var AdminModule = /** @class */ (function () {
    function AdminModule() {
    }
    AdminModule = __decorate([
        core_1.NgModule({
            declarations: [
                admin_index_component_1.AdminIndexComponent,
                users_component_1.UsersComponent,
                orders_component_1.OrdersComponent
            ],
            imports: [
                common_1.CommonModule,
                router_1.RouterModule.forChild(routes)
            ]
        })
    ], AdminModule);
    return AdminModule;
}());
exports.AdminModule = AdminModule;
