"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AuthInterceptor = void 0;
var core_1 = require("@angular/core");
var http_1 = require("@angular/common/http");
var operators_1 = require("rxjs/operators");
var AuthInterceptor = /** @class */ (function () {
    function AuthInterceptor(userApiService, progressBarSer) {
        this.userApiService = userApiService;
        this.progressBarSer = progressBarSer;
    }
    AuthInterceptor.prototype.intercept = function (req, next) {
        var _this = this;
        if (req.headers.get('noauth'))
            return next.handle(req.clone());
        else {
            var clonedreq = void 0;
            clonedreq = req.clone({
                headers: req.headers.set("Authorization", "Bearer " + this.userApiService.getToken())
            });
            return next.handle(clonedreq).pipe(operators_1.tap(function (event) {
                if (event.type === http_1.HttpEventType.DownloadProgress && event.total) {
                    // here we get the updated progress values, call your service or what ever here
                    _this.progressBarSer.returnProgress(event.loaded / event.total);
                    // this.spinnerService.updateGlobalProgress(Math.round(event.loaded / event.total * 100)); // display & update progress bar
                    var percentage = Math.round(100 * event.loaded / event.total);
                    console.log(percentage);
                }
                else if (event.type === http_1.HttpEventType.Response) {
                    _this.progressBarSer.returnProgress(null);
                    // this.spinnerService.updateGlobalProgress(null); // hide progress bar
                }
            }, function (err) {
                console.log("ERROR", err);
                if (err['statusText'] === "Unknown Error") {
                    // this.toasterMsgService.error(err['statusText']);
                }
            }));
        }
    };
    AuthInterceptor = __decorate([
        core_1.Injectable()
    ], AuthInterceptor);
    return AuthInterceptor;
}());
exports.AuthInterceptor = AuthInterceptor;
