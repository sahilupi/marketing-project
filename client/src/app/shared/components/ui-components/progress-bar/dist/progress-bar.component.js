"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ProgressBarComponent = void 0;
var core_1 = require("@angular/core");
var ProgressBarComponent = /** @class */ (function () {
    function ProgressBarComponent(progressBarSer) {
        this.progressBarSer = progressBarSer;
        this.ratio = 0;
    }
    ProgressBarComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.progressBarSer.returnProgressObservable().subscribe(function (data) {
            _this.ratio = data;
            console.log(data);
        }); //subscribing to the subject
    };
    ProgressBarComponent.prototype.ngOnChanges = function (changes) {
        console.log((changes));
        this.prog.nativeElement.style.width = (changes['ratio'].currentValue * 100) + "%";
        this.percent.nativeElement.innerHTML = (changes['ratio'].currentValue * 100) + "% loaded";
    };
    __decorate([
        core_1.ViewChild('prog')
    ], ProgressBarComponent.prototype, "prog");
    __decorate([
        core_1.ViewChild('percent')
    ], ProgressBarComponent.prototype, "percent");
    ProgressBarComponent = __decorate([
        core_1.Component({
            selector: 'app-progress-bar',
            templateUrl: './progress-bar.component.html',
            styleUrls: ['./progress-bar.component.css']
        })
    ], ProgressBarComponent);
    return ProgressBarComponent;
}());
exports.ProgressBarComponent = ProgressBarComponent;
