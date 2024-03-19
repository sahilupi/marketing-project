import { Component } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o/public_api';
import { fallIn } from 'src/app/shared/common/animations';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  animations: [fallIn()],
  host: { '[@fallIn]': '' }
})
export class HomeComponent {

  customOptions: OwlOptions = {
    loop: true,
    autoplay: true,
    center: true,
    dots: false,
    autoHeight: true,
    autoWidth: true,
    responsive: {
      0: {
        items: 1,
      },
      600: {
        items: 1,
      },
      1000: {
        items: 1,
      }
    }
  }

  scrollTop() {
    window.scrollTo({
      top: 0
    });
  }

}
