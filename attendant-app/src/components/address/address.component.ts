import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  // moduleId: module.id,
  selector: 'address',
  templateUrl: 'address.html'
})
export class AddressComponent {
  // we will pass in address from App component
  @Input('group')
  public addressGroup: FormGroup;

}
