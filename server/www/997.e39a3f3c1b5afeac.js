"use strict";(self.webpackChunkmarkutting=self.webpackChunkmarkutting||[]).push([[997],{8997:(k,f,n)=>{n.r(f),n.d(f,{AuthModule:()=>u});var p=n(6895),a=n(6770),t=n(433),h=n(1606),r=n(8256),_=n(7952),v=n(7726);function Z(i,e){1&i&&(r.TgZ(0,"small",22),r._uU(1,"Email is required"),r.qZA())}function T(i,e){1&i&&(r.TgZ(0,"small",22),r._uU(1,"Email is invalid"),r.qZA())}function C(i,e){1&i&&(r.TgZ(0,"small",22),r._uU(1,"Password is required"),r.qZA())}function w(i,e){if(1&i&&(r.TgZ(0,"small",22),r._uU(1),r.qZA()),2&i){const o=r.oxw();r.xp6(1),r.hij(" ",o.serverErrorMessages,"")}}function b(i,e){if(1&i){const o=r.EpF();r.TgZ(0,"p",23),r._uU(1,"Don't have an account? "),r.TgZ(2,"a",24),r.NdJ("click",function(){r.CHM(o);const l=r.oxw();return r.KtG(l.scrollTop())}),r._uU(3,"Register here"),r.qZA()()}}class m{constructor(e,o,s,l){this.fb=e,this.el=o,this.userApiService=s,this.router=l,this.submitted=!1,this.isLoading=!1,this.currentUrl=""}ngOnInit(){this.loginForm=this.fb.group({email:new t.NI(null,[t.kI.required,t.kI.email]),password:new t.NI(null,[t.kI.required])}),this.currentUrl=this.router.url}get f(){return this.loginForm.controls}submitForm(){if(this.submitted=!0,this.serverErrorMessages="",this.loginForm.valid)this.isLoading=!0,"/auth/admin/login"===this.router.url?this.userApiService.postAdminLogin(this.loginForm.value).subscribe(e=>{this.userApiService.setToken(e.token),this.router.navigate(["/admin/orders"]),this.scrollTop(),this.isLoading=!1},e=>{this.serverErrorMessages=e.error.message,this.isLoading=!1}):this.userApiService.postUserLogin(this.loginForm.value).subscribe(e=>{this.userApiService.setToken(e.token),this.router.navigate(["/advertiser/allvideocheckout"]),this.scrollTop(),this.isLoading=!1},e=>{this.serverErrorMessages=e.error.message,this.isLoading=!1});else for(const e of Object.keys(this.f))if(this.f[e].invalid){this.el.nativeElement.querySelector('[formControlName="'+e+'"]').focus();break}}scrollTop(){window.scrollTo({top:0})}}function q(i,e){1&i&&(r.TgZ(0,"small",25),r._uU(1,"Name is required"),r.qZA())}function A(i,e){1&i&&(r.TgZ(0,"small",25),r._uU(1,"Email is required"),r.qZA())}function U(i,e){1&i&&(r.TgZ(0,"small",25),r._uU(1,"Email is invalid"),r.qZA())}function E(i,e){1&i&&(r.TgZ(0,"small",25),r._uU(1,"Password is required"),r.qZA())}function N(i,e){1&i&&(r.TgZ(0,"small",25),r._uU(1,"Please confirm your password."),r.qZA())}function I(i,e){1&i&&(r.TgZ(0,"small",25),r._uU(1,"Passwords do not match."),r.qZA())}function L(i,e){if(1&i&&(r.TgZ(0,"small",25),r._uU(1),r.qZA()),2&i){const o=r.oxw();r.xp6(1),r.hij(" ",o.serverErrorMessages,"")}}m.\u0275fac=function(e){return new(e||m)(r.Y36(t.qu),r.Y36(r.SBq),r.Y36(_.Q),r.Y36(a.F0))},m.\u0275cmp=r.Xpm({type:m,selectors:[["app-login"]],hostVars:1,hostBindings:function(e,o){2&e&&r.d8E("@fallIn",void 0)},decls:34,vars:6,consts:[[1,"contact__area-6"],[1,"container","g-0","pt-120","pb-110"],[1,"line-3"],[1,"row"],[1,"col-xxl-6","col-xl-6","col-lg-6","col-md-6"],[1,"sec-title-wrapper"],[1,"sec-title-2","animation__char_come"],[1,"row","contact__btm"],[1,"col-xxl-5","col-xl-5","col-lg-5","col-md-5"],[1,"col-xxl-7","col-xl-7","col-lg-7","col-md-7"],[1,"contact__form"],[3,"formGroup","ngSubmit"],[1,"row","g-3"],[1,"col-xxl-6","col-xl-6","col-12"],["type","email","formControlName","email","placeholder","Email *"],["class","has-error",4,"ngIf"],["type","password","formControlName","password","placeholder","Password *"],["class","link",4,"ngIf"],[1,"col-12"],[1,"btn_wrapper"],[1,"wc-btn-primary","btn-hover","btn-item"],[1,"fa-solid","fa-arrow-right"],[1,"has-error"],[1,"link"],["routerLink","/auth/user/register",3,"click"]],template:function(e,o){1&e&&(r.TgZ(0,"section",0)(1,"div",1),r._UZ(2,"span",2),r.TgZ(3,"div",3)(4,"div",4)(5,"div",5),r._UZ(6,"h2",6),r.qZA()(),r.TgZ(7,"div",4)(8,"div",5)(9,"h2",6),r._uU(10,"Log In"),r.qZA()()()(),r.TgZ(11,"div",7)(12,"div",8),r._UZ(13,"app-contact-data"),r.qZA(),r.TgZ(14,"div",9)(15,"div",10)(16,"form",11),r.NdJ("ngSubmit",function(){return o.submitForm()}),r.TgZ(17,"div",12)(18,"div",13),r._UZ(19,"input",14),r.YNc(20,Z,2,0,"small",15),r.YNc(21,T,2,0,"small",15),r.qZA(),r.TgZ(22,"div",13),r._UZ(23,"input",16),r.YNc(24,C,2,0,"small",15),r.qZA()(),r.YNc(25,w,2,1,"small",15),r.YNc(26,b,4,0,"p",17),r.TgZ(27,"div",12)(28,"div",18)(29,"div",19)(30,"button",20),r._UZ(31,"span"),r._uU(32," Login "),r._UZ(33,"i",21),r.qZA()()()()()()()()()()),2&e&&(r.xp6(16),r.Q6J("formGroup",o.loginForm),r.xp6(4),r.Q6J("ngIf",o.f.email.hasError("required")&&o.f.email.touched||o.f.email.hasError("required")&&o.submitted),r.xp6(1),r.Q6J("ngIf",o.f.email.hasError("email")&&o.f.email.touched||o.f.email.hasError("email")&&o.submitted),r.xp6(3),r.Q6J("ngIf",o.f.password.hasError("required")&&o.f.password.touched||o.f.password.hasError("required")&&o.submitted),r.xp6(1),r.Q6J("ngIf",null==o.serverErrorMessages?null:o.serverErrorMessages.trim()),r.xp6(1),r.Q6J("ngIf","/auth/user/login"===o.currentUrl))},dependencies:[p.O5,a.rH,t._Y,t.Fj,t.JJ,t.JL,t.sg,t.u,v.n],styles:[".has-error[_ngcontent-%COMP%]{border-color:red;color:red}.has-error[_ngcontent-%COMP%]:focus{border-color:red;color:red}.contact__form[_ngcontent-%COMP%]   input[_ngcontent-%COMP%], .contact__form[_ngcontent-%COMP%]   textarea[_ngcontent-%COMP%]{margin-bottom:0}.link[_ngcontent-%COMP%]{padding:20px 0}"],data:{animation:[(0,h.ph)()]}});class d{constructor(e,o,s,l){this.fb=e,this.el=o,this.router=s,this.userApiService=l,this.submitted=!1,this.isLoading=!1}ngOnInit(){this.signupForm=this.fb.group({fullName:new t.NI(null,[t.kI.required]),email:new t.NI(null,[t.kI.required,t.kI.email]),password:new t.NI(null,[t.kI.required]),confirmPassword:new t.NI(null,[t.kI.required])},{validator:this.ConfirmedValidator("password","confirmPassword")})}get f(){return this.signupForm.controls}ConfirmedValidator(e,o){return s=>{const g=s.controls[o];g.errors&&!g.errors.confirmedValidator||g.setErrors(s.controls[e].value!==g.value?{confirmedValidator:!0}:null)}}submitForm(){if(this.submitted=!0,this.serverErrorMessages="",this.signupForm.valid)this.isLoading=!0,this.userApiService.postRegisterUser({fullName:this.signupForm.value.fullName,email:this.signupForm.value.email,password:this.signupForm.value.password,confirmPassword:this.signupForm.value.confirmPassword}).subscribe(o=>{this.isLoading=!1,console.log(o),this.router.navigate(["/auth/user/login"])},o=>{console.log(o),this.isLoading=!1,this.serverErrorMessages=o.error.message});else for(const o of Object.keys(this.f))if(this.f[o].invalid){this.el.nativeElement.querySelector('[formControlName="'+o+'"]').focus();break}}scrollTop(){window.scrollTo({top:0})}}d.\u0275fac=function(e){return new(e||d)(r.Y36(t.qu),r.Y36(r.SBq),r.Y36(a.F0),r.Y36(_.Q))},d.\u0275cmp=r.Xpm({type:d,selectors:[["app-register"]],hostVars:1,hostBindings:function(e,o){2&e&&r.d8E("@fallIn",void 0)},decls:44,vars:8,consts:[[1,"contact__area-6"],[1,"container","g-0","pt-120","pb-110"],[1,"line-3"],[1,"row"],[1,"col-xxl-6","col-xl-6","col-lg-6","col-md-6"],[1,"sec-title-wrapper"],[1,"sec-title-2","animation__char_come"],[1,"row","contact__btm"],[1,"col-xxl-5","col-xl-5","col-lg-5","col-md-5"],[1,"col-xxl-7","col-xl-7","col-lg-7","col-md-7"],[1,"contact__form"],[3,"formGroup","ngSubmit"],[1,"row","g-3"],[1,"col-xxl-6","col-xl-6","col-12"],["type","text","formControlName","fullName","placeholder","Your Name *"],["class","has-error",4,"ngIf"],["type","email","formControlName","email","placeholder","Email *"],["type","password","formControlName","password","placeholder","Password *"],["type","password","formControlName","confirmPassword","placeholder","Confirm Password *"],[1,"link"],["routerLink","/auth/user/login",3,"click"],[1,"col-12"],[1,"btn_wrapper"],[1,"wc-btn-primary","btn-hover","btn-item"],[1,"fa-solid","fa-arrow-right"],[1,"has-error"]],template:function(e,o){1&e&&(r.TgZ(0,"section",0)(1,"div",1),r._UZ(2,"span",2),r.TgZ(3,"div",3)(4,"div",4)(5,"div",5),r._UZ(6,"h2",6),r.qZA()(),r.TgZ(7,"div",4)(8,"div",5)(9,"h2",6),r._uU(10,"Sign Up"),r.qZA()()()(),r.TgZ(11,"div",7)(12,"div",8),r._UZ(13,"app-contact-data"),r.qZA(),r.TgZ(14,"div",9)(15,"div",10)(16,"form",11),r.NdJ("ngSubmit",function(){return o.submitForm()}),r.TgZ(17,"div",12)(18,"div",13),r._UZ(19,"input",14),r.YNc(20,q,2,0,"small",15),r.qZA(),r.TgZ(21,"div",13),r._UZ(22,"input",16),r.YNc(23,A,2,0,"small",15),r.YNc(24,U,2,0,"small",15),r.qZA(),r.TgZ(25,"div",13),r._UZ(26,"input",17),r.YNc(27,E,2,0,"small",15),r.qZA(),r.TgZ(28,"div",13),r._UZ(29,"input",18),r.YNc(30,N,2,0,"small",15),r.YNc(31,I,2,0,"small",15),r.qZA()(),r.YNc(32,L,2,1,"small",15),r.TgZ(33,"p",19),r._uU(34,"Already have a account? "),r.TgZ(35,"a",20),r.NdJ("click",function(){return o.scrollTop()}),r._uU(36,"Login here"),r.qZA()(),r.TgZ(37,"div",12)(38,"div",21)(39,"div",22)(40,"button",23),r._UZ(41,"span"),r._uU(42," Signup "),r._UZ(43,"i",24),r.qZA()()()()()()()()()()),2&e&&(r.xp6(16),r.Q6J("formGroup",o.signupForm),r.xp6(4),r.Q6J("ngIf",o.f.fullName.hasError("required")&&o.f.fullName.touched||o.f.fullName.hasError("required")&&o.submitted),r.xp6(3),r.Q6J("ngIf",o.f.email.hasError("required")&&o.f.email.touched||o.f.email.hasError("required")&&o.submitted),r.xp6(1),r.Q6J("ngIf",o.f.email.hasError("email")&&o.f.email.touched||o.f.email.hasError("email")&&o.submitted),r.xp6(3),r.Q6J("ngIf",o.f.password.hasError("required")&&o.f.password.touched||o.f.password.hasError("required")&&o.submitted),r.xp6(3),r.Q6J("ngIf",o.f.confirmPassword.hasError("required")&&o.f.confirmPassword.touched||o.f.confirmPassword.hasError("required")&&o.submitted),r.xp6(1),r.Q6J("ngIf",o.f.confirmPassword.hasError("confirmedValidator")||o.f.password.hasError("confirmedValidator")),r.xp6(1),r.Q6J("ngIf",null==o.serverErrorMessages?null:o.serverErrorMessages.trim()))},dependencies:[p.O5,a.rH,t._Y,t.Fj,t.JJ,t.JL,t.sg,t.u,v.n],styles:[".has-error[_ngcontent-%COMP%]{border-color:red;color:red}.has-error[_ngcontent-%COMP%]:focus{border-color:red;color:red}.contact__form[_ngcontent-%COMP%]   input[_ngcontent-%COMP%], .contact__form[_ngcontent-%COMP%]   textarea[_ngcontent-%COMP%]{margin-bottom:0}.link[_ngcontent-%COMP%]{padding:20px 0}"],data:{animation:[(0,h.ph)()]}});const M=[{path:"",redirectTo:"user/login",pathMatch:"full"},{path:"user",children:[{path:"login",component:m,data:{title:"User Login"}},{path:"register",component:d,data:{title:"User Signup"}}]},{path:"admin",children:[{path:"login",component:m,data:{title:"Admin Login"}}]}];class c{}c.\u0275fac=function(e){return new(e||c)},c.\u0275mod=r.oAB({type:c}),c.\u0275inj=r.cJS({imports:[a.Bz.forChild(M),a.Bz]});var P=n(4466);class u{}u.\u0275fac=function(e){return new(e||u)},u.\u0275mod=r.oAB({type:u}),u.\u0275inj=r.cJS({imports:[p.ez,c,t.UX,P.m]})}}]);