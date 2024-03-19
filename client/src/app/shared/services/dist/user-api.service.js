"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.UserApiService = void 0;
var core_1 = require("@angular/core");
var http_1 = require("@angular/common/http");
var environment_1 = require("src/environments/environment");
var UserApiService = /** @class */ (function () {
    function UserApiService(http) {
        this.http = http;
        this.noAuthHeader = { headers: new http_1.HttpHeaders({ 'NoAuth': 'True' }) };
    }
    UserApiService.prototype.postRegisterUser = function (user) {
        return this.http.post(environment_1.environment.apiBaseUrl + '/users/register-user', user, this.noAuthHeader);
    };
    UserApiService.prototype.postUserLogin = function (authCredentials) {
        return this.http.post(environment_1.environment.apiBaseUrl + '/users/authenticate', authCredentials, { reportProgress: true });
    };
    UserApiService.prototype.postAdminLogin = function (authCredentials) {
        return this.http.post(environment_1.environment.apiBaseUrl + '/users/authenticate-admin', authCredentials, this.noAuthHeader);
    };
    UserApiService.prototype.getUserProfile = function () {
        return this.http.get(environment_1.environment.apiBaseUrl + '/users/getUserProfile', { reportProgress: true });
    };
    UserApiService.prototype.postContactForm = function (form) {
        return this.http.post(environment_1.environment.apiBaseUrl + '/users/post-contact-form', form);
    };
    UserApiService.prototype.postUpdateUserProfile = function (userBody) {
        return this.http.patch(environment_1.environment.apiBaseUrl + '/users/patchUpdateUserProfile', userBody);
    };
    UserApiService.prototype.putChangePassword = function (passwordBody) {
        return this.http.put(environment_1.environment.apiBaseUrl + "/users/change-password", passwordBody);
    };
    UserApiService.prototype.requestResetPassword = function (body) {
        return this.http.post(environment_1.environment.apiBaseUrl + "/users/req-reset-password", body);
    };
    UserApiService.prototype.newPassword = function (body) {
        return this.http.post(environment_1.environment.apiBaseUrl + "/users/new-password", body);
    };
    UserApiService.prototype.validatePasswordToken = function (body) {
        return this.http.post(environment_1.environment.apiBaseUrl + "/users/valid-password-token", body);
    };
    //Helper Methods
    UserApiService.prototype.setToken = function (token) {
        localStorage.setItem('token', token);
    };
    UserApiService.prototype.getToken = function () {
        return localStorage.getItem('token');
    };
    UserApiService.prototype.deleteToken = function () {
        localStorage.removeItem('token');
    };
    UserApiService.prototype.getUserPayload = function () {
        var token = this.getToken();
        if (token) {
            var userPayload = atob(token.split('.')[1]);
            return JSON.parse(userPayload);
        }
        else
            return null;
    };
    UserApiService.prototype.isAdminLoggedIn = function () {
        var _a;
        var userPayload = this.getUserPayload();
        if (userPayload && ((_a = userPayload.role) === null || _a === void 0 ? void 0 : _a.toLowerCase()) === 'admin')
            return userPayload.exp > Date.now() / 1000;
        else {
            return false;
        }
    };
    UserApiService.prototype.isLoggedIn = function () {
        var userPayload = this.getUserPayload();
        if (userPayload)
            return userPayload.exp > Date.now() / 1000;
        else
            return false;
    };
    UserApiService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], UserApiService);
    return UserApiService;
}());
exports.UserApiService = UserApiService;
