import { Component } from '@angular/core';
import { fallIn } from 'src/app/shared/common/animations';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css'],
  animations: [fallIn()],
  host: { '[@fallIn]': '' }
})

export class AboutComponent {

  scrollTop() {
    window.scrollTo({
      top: 0
    });
  }
}
