import { Component, ElementRef, SimpleChanges, ViewChild } from '@angular/core';
import { ProgressBarService } from 'src/app/shared/services/progressbar.service';

@Component({
  selector: 'app-progress-bar',
  templateUrl: './progress-bar.component.html',
  styleUrls: ['./progress-bar.component.css']
})
export class ProgressBarComponent {
  constructor(private progressBarSer: ProgressBarService) { }
  ratio: number = 0;

  @ViewChild('prog') prog: ElementRef;
  @ViewChild('percent') percent: ElementRef;
  ngOnInit() {
    this.progressBarSer.returnProgressObservable().subscribe((data: any) => {
      this.ratio = data;
      console.log(data)
    }); //subscribing to the subject
  }
  ngOnChanges(changes: SimpleChanges) {
    console.log((changes))
    this.prog.nativeElement.style.width = (changes['ratio'].currentValue * 100) +"%";
    this.percent.nativeElement.innerHTML = (changes['ratio'].currentValue * 100) +"% loaded";
  }
}
