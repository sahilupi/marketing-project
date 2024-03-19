"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.HeaderComponent = void 0;
var core_1 = require("@angular/core");
var animations_1 = require("src/app/shared/common/animations");
var HeaderComponent = /** @class */ (function () {
    function HeaderComponent(userApiService, router) {
        this.userApiService = userApiService;
        this.router = router;
        this.isMenuOpen = false;
    }
    HeaderComponent.prototype.toggleMenu = function () {
        this.isMenuOpen = !this.isMenuOpen;
    };
    HeaderComponent.prototype.isLoggedIn = function () {
        return this.userApiService.isLoggedIn();
    };
    HeaderComponent.prototype.isAdminLoggedIn = function () {
        return this.userApiService.isAdminLoggedIn();
    };
    HeaderComponent.prototype.onLogOut = function () {
        this.userApiService.deleteToken();
        this.router.navigate(['/auth/user/login']);
        this.scrollTop();
    };
    HeaderComponent.prototype.scrollTop = function () {
        window.scrollTo({
            top: 0
        });
    };
    HeaderComponent = __decorate([
        core_1.Component({
            selector: 'app-header',
            templateUrl: './header.component.html',
            styleUrls: ['./header.component.css'],
            animations: [animations_1.fallIn()],
            host: { '[@fallIn]': '' }
        })
    ], HeaderComponent);
    return HeaderComponent;
}());
exports.HeaderComponent = HeaderComponent;
