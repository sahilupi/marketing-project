import { Component, ElementRef, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { fallIn } from 'src/app/shared/common/animations';
import { LoginResponse, SignupResponse, UserApiService } from 'src/app/shared/services/user-api.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  animations: [fallIn()],
  host: { '[@fallIn]': '' }
})
export class RegisterComponent implements OnInit {
  signupForm: FormGroup;
  serverErrorMessages: string;
  submitted: boolean = false;
  isLoading: boolean = false;

  constructor(private fb: FormBuilder, private el: ElementRef, private router: Router, private userApiService: UserApiService) { }

  ngOnInit(): void {
    this.signupForm = this.fb.group({
      fullName: new FormControl(null, [Validators.required]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required]),
      confirmPassword: new FormControl(null, [Validators.required]),
    },
      {
        validator: this.ConfirmedValidator('password', 'confirmPassword'),
      });
  }

  get f() {
    return this.signupForm.controls;
  }

  ConfirmedValidator(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];
      if (
        matchingControl.errors &&
        !matchingControl.errors['confirmedValidator']
      ) {
        return;
      }
      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ confirmedValidator: true });
      } else {
        matchingControl.setErrors(null);
      }
    };
  }

  submitForm() {
    this.submitted = true;
    this.serverErrorMessages = '';
    if (!this.signupForm.valid) {
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
    const formBody = {
      fullName: this.signupForm.value.fullName,
      email: this.signupForm.value.email,
      password: this.signupForm.value.password,
      confirmPassword: this.signupForm.value.confirmPassword,
    }
    this.userApiService.postRegisterUser(formBody).subscribe((res: SignupResponse) => {
      this.isLoading = false;
      console.log(res)
      // this.toastMessageService.success(res['message']);
      this.router.navigate(['/auth/user/login'])
    }, error => {
      console.log(error)
      this.isLoading = false;
      // this.toastMessageService.error(error.error.message);
      this.serverErrorMessages = error.error.message;
    })
  }

  scrollTop() {
    window.scrollTo({
      top: 0
    });
  }
}
