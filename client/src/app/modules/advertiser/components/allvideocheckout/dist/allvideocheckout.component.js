"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AllvideocheckoutComponent = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var rxjs_1 = require("rxjs");
var animations_1 = require("src/app/shared/common/animations");
var environment_1 = require("src/environments/environment");
var AllvideocheckoutComponent = /** @class */ (function () {
    function AllvideocheckoutComponent(fb, el, orderService, stripeService) {
        this.fb = fb;
        this.el = el;
        this.orderService = orderService;
        this.stripeService = stripeService;
        this.submitted = false;
        this.isLoading = false;
        this.razorPayOptions = {
            "key": "YOUR_KEY_ID",
            "amount": 0,
            "currency": "INR",
            "name": "Younedia",
            "description": "Test Transaction",
            "image": "/assets/images/logo/balancedyte-logo.png",
            "order_id": "order_IluGWxBm9U8zJ8",
            "handler": function (res) {
                console.log(res);
            }
        };
        this.targetAndWantsArray = [
            { name: 'Likes & Comments', value: 'Likes & Comments', id: 'likes' },
            { name: 'Subscribers', value: 'Subscribers', id: 'subscribers' },
            { name: 'Installs', value: 'Installs', id: 'installs' }
        ];
        this.videoCategoryArray = [
            { value: "Film and Animation", name: "Film and Animation", id: "Film and Animation" },
            { value: "Autos and Vehicles", name: "Autos and Vehicles", id: "Autos and Vehicles" },
            { value: "Music", name: "Music", id: "Music" },
            { value: "Pets and Animals", name: "Pets and Animals", id: "Pets and Animals" },
            { value: "Sports", name: "Sports", id: "Sports" },
            { value: "Travel and Events", name: "Travel and Events", id: "Travel and Events" },
            { value: "Gaming", name: "Gaming", id: "" },
            { value: "People and Blogs", name: "People and Blogs", id: "People and Blogs" },
            { value: "Comedy", name: "Comedy", id: "Comedy" },
            { value: "Entertainment", name: "Entertainment", id: "Entertainment" },
            { value: "News and Politics", name: "News and Politics", id: "News and Politics" },
            { value: "How to and Style", name: "How to and Style", id: "How to and Style" },
            { value: "Education", name: "Education", id: "Education" },
            { value: "Science and Technology", name: "Science and Technology", id: "Science and Technology" },
            { value: "Nonprofits and Activism", name: "Nonprofits and Activism", id: "Nonprofits and Activism" }
        ];
    }
    AllvideocheckoutComponent.prototype.ngOnInit = function () {
        this.checkoutForm = this.fb.group({
            youtubeLink: new forms_1.FormControl('', [forms_1.Validators.required]),
            targetAndWants: new forms_1.FormArray([]),
            gender: new forms_1.FormControl(null),
            age: new forms_1.FormControl(null),
            location: new forms_1.FormControl(null, [forms_1.Validators.required]),
            country: new forms_1.FormControl(''),
            videoCategory: new forms_1.FormControl(null),
            keywords: new forms_1.FormControl(null),
            budget: new forms_1.FormControl(null, [forms_1.Validators.required])
        });
    };
    Object.defineProperty(AllvideocheckoutComponent.prototype, "f", {
        get: function () {
            return this.checkoutForm.controls;
        },
        enumerable: false,
        configurable: true
    });
    AllvideocheckoutComponent.prototype.onCountTotalViews = function () {
        return +this.f['budget'].value * 5;
    };
    AllvideocheckoutComponent.prototype.onTargetAndWantsCheckboxChange = function (event) {
        var selectedTargetAndWants = this.checkoutForm.controls['targetAndWants'];
        if (event.target.checked) {
            selectedTargetAndWants.push(new forms_1.FormControl(event.target.value));
        }
        else {
            var index = selectedTargetAndWants.controls
                .findIndex(function (x) { return x.value === event.target.value; });
            selectedTargetAndWants.removeAt(index);
        }
    };
    AllvideocheckoutComponent.prototype.showVideoThumbnail = function () {
        var id = this.f['youtubeLink'].value;
        var i1 = id.indexOf("=");
        var idRefined = id.substring(i1 + 1, id.length);
        if (idRefined.indexOf("&") != -1) {
            idRefined = idRefined.substring(0, idRefined.indexOf("&"));
        }
        this.previewLink = "https://youtube.com/embed/" + idRefined;
    };
    AllvideocheckoutComponent.prototype.onChangeLocation = function (event) {
        if (event.target.value.toLowerCase() === 'country') {
            this.f['country'].setValidators([forms_1.Validators.required, forms_1.Validators.minLength(3)]);
            this.f['country'].updateValueAndValidity();
        }
        else {
            this.f['country'].clearValidators();
            this.f['country'].updateValueAndValidity();
        }
    };
    AllvideocheckoutComponent.prototype.submitForm = function () {
        var _this = this;
        this.submitted = true;
        if (!this.checkoutForm.valid) {
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
        var formBody = Object.assign({}, this.checkoutForm.value, { views: this.onCountTotalViews() });
        var domain = environment_1.environment.domain;
        this.orderService.postPlaceOrder(formBody, domain).pipe(rxjs_1.switchMap(function (session) {
            return _this.stripeService.redirectToCheckout({ sessionId: session.sessionId });
        })).subscribe(function (res) {
            _this.stripeService.redirectToCheckout({ sessionId: res.sessionId });
        }, function (err) {
            console.log(err);
        });
    };
    AllvideocheckoutComponent = __decorate([
        core_1.Component({
            selector: 'app-allvideocheckout',
            templateUrl: './allvideocheckout.component.html',
            styleUrls: ['./allvideocheckout.component.css'],
            animations: [animations_1.fallIn()],
            host: { '[@fallIn]': '' }
        })
    ], AllvideocheckoutComponent);
    return AllvideocheckoutComponent;
}());
exports.AllvideocheckoutComponent = AllvideocheckoutComponent;
