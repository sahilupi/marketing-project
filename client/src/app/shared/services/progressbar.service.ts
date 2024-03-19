import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: 'root'
})

export class ProgressBarService {
  constructor() { }
  private progressSub = new BehaviorSubject(0);
  returnProgressObservable() {
    return this.progressSub.asObservable();
  }
  returnProgress(data: any) {
    this.progressSub.next(data);
  }
}
