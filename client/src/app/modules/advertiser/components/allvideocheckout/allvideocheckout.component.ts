import { Component, ElementRef, OnInit } from '@angular/core';
import { FormControl, Validators, FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { StripeService } from 'ngx-stripe';
import { switchMap } from 'rxjs';

import { fallIn } from 'src/app/shared/common/animations';
import { OrderApiService } from 'src/app/shared/services/order-api.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-allvideocheckout',
  templateUrl: './allvideocheckout.component.html',
  styleUrls: ['./allvideocheckout.component.css'],
  animations: [fallIn()],
  host: { '[@fallIn]': '' }
})

export class AllvideocheckoutComponent implements OnInit {

  checkoutForm: FormGroup;
  previewLink: string;
  submitted: boolean = false;
  isLoading: boolean = false;
  razorOrderId: string;
  userId: string;
  razorPayOptions = {
    "key": "YOUR_KEY_ID", // Enter the Key ID generated from the Dashboard
    "amount": 0, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
    "currency": "INR",
    "name": "Younedia",
    "description": "Test Transaction",
    "image": "/assets/images/logo/balancedyte-logo.png",
    "order_id": "order_IluGWxBm9U8zJ8", //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
    "handler": (res: any) => {
      console.log(res);
    }
  };

  targetAndWantsArray: Array<any> = [
    { name: 'Likes & Comments', value: 'Likes & Comments', id: 'likes' },
    { name: 'Subscribers', value: 'Subscribers', id: 'subscribers' },
    { name: 'Installs', value: 'Installs', id: 'installs' }
  ];

  videoCategoryArray:Array<any> = [
    { value:"Film and Animation", name: "Film and Animation", id:"Film and Animation" },
    { value:"Autos and Vehicles", name: "Autos and Vehicles", id:"Autos and Vehicles" },
    { value:"Music", name: "Music", id:"Music" },
    { value:"Pets and Animals", name: "Pets and Animals", id:"Pets and Animals" },
    { value:"Sports", name: "Sports", id:"Sports" },
    { value:"Travel and Events", name: "Travel and Events", id:"Travel and Events" },
    { value:"Gaming", name: "Gaming", id:"" },
    { value:"People and Blogs", name: "People and Blogs", id:"People and Blogs" },
    { value:"Comedy", name: "Comedy", id:"Comedy" },
    { value:"Entertainment", name: "Entertainment", id:"Entertainment" },
    { value:"News and Politics", name: "News and Politics", id:"News and Politics" },
    { value:"How to and Style", name: "How to and Style", id:"How to and Style" },
    { value:"Education", name: "Education", id:"Education" },
    { value:"Science and Technology", name: "Science and Technology", id:"Science and Technology" },
    { value:"Nonprofits and Activism", name: "Nonprofits and Activism", id:"Nonprofits and Activism" }
  ];

  constructor( private fb: FormBuilder, private el: ElementRef, private orderService: OrderApiService, private stripeService: StripeService ){}

  ngOnInit(): void {
    this.checkoutForm = this.fb.group({
      youtubeLink: new FormControl('', [Validators.required]),
      targetAndWants: new FormArray([]),
      gender: new FormControl(null),
      age: new FormControl(null),
      location: new FormControl(null, [Validators.required]),
      country: new FormControl(''),
      videoCategory: new FormControl(null),
      keywords: new FormControl(null),
      budget: new FormControl(null, [Validators.required])
    });
  }

  get f() {
    return this.checkoutForm.controls;
  }

  onCountTotalViews() {
    return +this.f['budget'].value * 5;
  }

  onTargetAndWantsCheckboxChange(event: any) {
    const selectedTargetAndWants = (this.checkoutForm.controls['targetAndWants'] as FormArray);
    if (event.target.checked) {
      selectedTargetAndWants.push(new FormControl(event.target.value));
    } else {
      const index = selectedTargetAndWants.controls
      .findIndex(x => x.value === event.target.value);
      selectedTargetAndWants.removeAt(index);
    }
  }

  showVideoThumbnail() {
      const id = this.f['youtubeLink'].value;
      const i1 = id.indexOf("=");
      let idRefined = id.substring(i1 + 1, id.length);
      if (idRefined.indexOf("&") != -1) {
          idRefined = idRefined.substring(0, idRefined.indexOf("&"));
      }
      this.previewLink = "https://youtube.com/embed/" + idRefined;
  }

  onChangeLocation(event: any) {
    if(event.target.value.toLowerCase() === 'country') {
      this.f['country'].setValidators([Validators.required, Validators.minLength(3)]);
      this.f['country'].updateValueAndValidity();
    }
    else {
      this.f['country'].clearValidators();
      this.f['country'].updateValueAndValidity();
    }
  }

  submitForm() {
    this.submitted = true;
    if(!this.checkoutForm.valid) {
      for (const key of Object.keys(this.f)) {
        if (this.f[key].invalid) {
          const invalidControl = this.el.nativeElement.querySelector('[formControlName="' + key + '"]');
          invalidControl.focus();
          break;
        }
      }
      return;
    }
    const formBody = Object.assign({}, this.checkoutForm.value,  {views: this.onCountTotalViews() });
    const domain = environment.domain;
    this.orderService.postPlaceOrder(formBody, domain).pipe(
      switchMap((session: any) => {
        return this.stripeService.redirectToCheckout({ sessionId: session.sessionId })
      })
    ).subscribe((res: any) => {
      this.stripeService.redirectToCheckout({ sessionId: res.sessionId })
    }, err => {
      console.log(err);
    })
  }
}
