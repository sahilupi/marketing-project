import { Injectable } from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpInterceptor,
    HttpEventType
} from '@angular/common/http';

import { tap } from 'rxjs/operators';
// import { UserService } from 'src/app/modules/employe/services/user.service';
// import { AdminService } from 'src/app/modules/admin/services/admin.service';
import { UserApiService } from '../services/user-api.service';
import { ProgressBarService } from '../services/progressbar.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(private userApiService: UserApiService, private progressBarSer: ProgressBarService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler) {

        if (req.headers.get('noauth'))
            return next.handle(req.clone());
        else {
            let clonedreq;
            clonedreq = req.clone({
                headers: req.headers.set("Authorization", "Bearer " + this.userApiService.getToken())
            });
            return next.handle(clonedreq).pipe(
                tap(
                    event => {
                        if (event.type === HttpEventType.DownloadProgress && event.total) {
                            // here we get the updated progress values, call your service or what ever here
                            this.progressBarSer.returnProgress(event.loaded / event.total);
                            // this.spinnerService.updateGlobalProgress(Math.round(event.loaded / event.total * 100)); // display & update progress bar
                            const percentage = Math.round(100 * event.loaded / event.total);
                            console.log(percentage);
                        } else if (event.type === HttpEventType.Response) {
                            this.progressBarSer.returnProgress(null);
                            // this.spinnerService.updateGlobalProgress(null); // hide progress bar
                        }
                    },
                    err => {
                        console.log("ERROR", err);
                        if (err['statusText'] === "Unknown Error") {
                            // this.toasterMsgService.error(err['statusText']);
                        }
                    })
            );
        }
    }
}
