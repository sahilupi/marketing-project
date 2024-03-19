"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.LoginComponent = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var animations_1 = require("src/app/shared/common/animations");
var LoginComponent = /** @class */ (function () {
    function LoginComponent(fb, el, userApiService, router) {
        this.fb = fb;
        this.el = el;
        this.userApiService = userApiService;
        this.router = router;
        this.submitted = false;
        this.isLoading = false;
        this.currentUrl = '';
    }
    LoginComponent.prototype.ngOnInit = function () {
        this.loginForm = this.fb.group({
            email: new forms_1.FormControl(null, [forms_1.Validators.required, forms_1.Validators.email]),
            password: new forms_1.FormControl(null, [forms_1.Validators.required])
        });
        this.currentUrl = this.router.url;
    };
    Object.defineProperty(LoginComponent.prototype, "f", {
        get: function () {
            return this.loginForm.controls;
        },
        enumerable: false,
        configurable: true
    });
    LoginComponent.prototype.submitForm = function () {
        var _this = this;
        this.submitted = true;
        this.serverErrorMessages = '';
        if (!this.loginForm.valid) {
            for (var _i = 0, _a = Object.keys(this.f); _i < _a.length; _i++) {
                var key = _a[_i];
                if (this.f[key].invalid) {
                    var invalidControl = this.el.nativeElement.querySelector('[formControlName="' + key + '"]');
                    invalidControl.focus();
                    break;
                }
            }
            return;
        }
        this.isLoading = true;
        if (this.router.url === '/auth/admin/login') {
            this.userApiService.postAdminLogin(this.loginForm.value).subscribe(function (res) {
                _this.userApiService.setToken(res['token']);
                _this.router.navigate(["/admin/orders"]);
                _this.scrollTop();
                _this.isLoading = false;
            }, function (err) {
                _this.serverErrorMessages = err.error['message'];
                _this.isLoading = false;
            });
        }
        else {
            this.userApiService.postUserLogin(this.loginForm.value).subscribe(function (res) {
                _this.userApiService.setToken(res['token']);
                _this.router.navigate(["/advertiser/allvideocheckout"]);
                _this.scrollTop();
                _this.isLoading = false;
            }, function (err) {
                _this.serverErrorMessages = err.error['message'];
                _this.isLoading = false;
            });
        }
    };
    LoginComponent.prototype.scrollTop = function () {
        window.scrollTo({
            top: 0
        });
    };
    LoginComponent = __decorate([
        core_1.Component({
            selector: 'app-login',
            templateUrl: './login.component.html',
            styleUrls: ['./login.component.css'],
            animations: [animations_1.fallIn()],
            host: { '[@fallIn]': '' }
        })
    ], LoginComponent);
    return LoginComponent;
}());
exports.LoginComponent = LoginComponent;
