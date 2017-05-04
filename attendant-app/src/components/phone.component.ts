import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'phone',
  template: 'phone.html'
})
export class PhoneComponent {
  // we will pass in address from App component
  @Input('group') public phoneGroup: FormGroup;

  constructor() {}

}
