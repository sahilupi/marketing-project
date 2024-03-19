import { Component, ElementRef, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { fallIn } from 'src/app/shared/common/animations';
import { LoginResponse, UserApiService } from 'src/app/shared/services/user-api.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  animations: [fallIn()],
  host: { '[@fallIn]': '' }
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  submitted: boolean = false;
  isLoading: boolean = false;
  serverErrorMessages: string;
  currentUrl = '';

  constructor( private fb: FormBuilder, private el: ElementRef, private userApiService: UserApiService, private router: Router ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required])
    });
    this.currentUrl = this.router.url;
  }

  get f() {
    return this.loginForm.controls;
  }

  submitForm() {
    this.submitted = true;
    this.serverErrorMessages = '';
    if(!this.loginForm.valid) {
      for (const key of Object.keys(this.f)) {
        if (this.f[key].invalid) {
          const invalidControl = this.el.nativeElement.querySelector('[formControlName="' + key + '"]');
          invalidControl.focus();
          break;
        }
      }
      return;
    }
    this.isLoading = true;
    if (this.router.url === '/auth/admin/login') {
      this.userApiService.postAdminLogin(this.loginForm.value).subscribe(
        (res: LoginResponse) => {
          this.userApiService.setToken(res['token']);
          this.router.navigate([`/admin/orders`]);
          this.scrollTop();
          this.isLoading = false;
        },
        err => {
          this.serverErrorMessages = err.error['message'];
          this.isLoading = false;
        }
      );
    }
    else {
      this.userApiService.postUserLogin(this.loginForm.value).subscribe(
        (res: LoginResponse) => {
          this.userApiService.setToken(res['token']);
          this.router.navigate([`/advertiser/allvideocheckout`]);
          this.scrollTop();
          this.isLoading = false;
        },
        err => {
          this.serverErrorMessages = err.error['message'];
          this.isLoading = false;
        }
      );
    }
  }

  scrollTop() {
    window.scrollTo({
      top: 0
    });
  }
}
