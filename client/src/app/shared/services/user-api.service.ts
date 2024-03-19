import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

export interface LoginResponse {
  success: boolean;
  message: string;
  token: string;
  _id: string;
}

export interface SignupResponse {
  success: boolean;
  message: string;
}

interface LoginData {
  email: string;
  password: string
}

interface SignupData {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserApiService {

  constructor(private http: HttpClient) { }

  noAuthHeader = { headers: new HttpHeaders({ 'NoAuth': 'True' }) };

  postRegisterUser(user: SignupData): Observable<SignupResponse>{
    return this.http.post<SignupResponse>(environment.apiBaseUrl+'/users/register-user', user, this.noAuthHeader);
  }

  postUserLogin(authCredentials:LoginData): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(environment.apiBaseUrl + '/users/authenticate', authCredentials, {reportProgress: true});
  }

  postAdminLogin(authCredentials:LoginData): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(environment.apiBaseUrl + '/users/authenticate-admin', authCredentials, this.noAuthHeader);
  }

  getUserProfile() {
    return this.http.get(environment.apiBaseUrl + '/users/getUserProfile', {reportProgress: true});
  }

  postContactForm(form:any) {
    return this.http.post(environment.apiBaseUrl + '/users/post-contact-form', form);
  }

  postUpdateUserProfile(userBody:any) {
    return this.http.patch(environment.apiBaseUrl + '/users/patchUpdateUserProfile', userBody);
  }

  putChangePassword(passwordBody:any) {
    return this.http.put(environment.apiBaseUrl + `/users/change-password`, passwordBody);
  }

  requestResetPassword(body:any) {
    return this.http.post(`${environment.apiBaseUrl}/users/req-reset-password`, body);
  }

  newPassword(body:any){
    return this.http.post(`${environment.apiBaseUrl}/users/new-password`, body);
  }

  validatePasswordToken(body:any) {
    return this.http.post(`${environment.apiBaseUrl}/users/valid-password-token`, body);
  }

  //Helper Methods

  setToken(token: string) {
    localStorage.setItem('token', token);
  }

  getToken() {
    return localStorage.getItem('token');
  }

  deleteToken() {
    localStorage.removeItem('token');
  }

  getUserPayload() {
    const token = this.getToken();
    if (token) {
      const userPayload = atob(token.split('.')[1]);
      return JSON.parse(userPayload);
    }
    else
      return null;
  }

  isAdminLoggedIn() {
    const userPayload = this.getUserPayload();
    if (userPayload && userPayload.role?.toLowerCase() === 'admin')
      return userPayload.exp > Date.now() / 1000;
    else{
      return false;
    }
  }

  isLoggedIn() {
    const userPayload = this.getUserPayload();
    if (userPayload)
      return userPayload.exp > Date.now() / 1000;
    else
      return false;
  }
}
