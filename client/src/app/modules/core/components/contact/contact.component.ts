import { Component } from '@angular/core';

import { fallIn } from 'src/app/shared/common/animations';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
  animations: [fallIn()],
  host: { '[@fallIn]': '' }
})
export class ContactComponent {

}
