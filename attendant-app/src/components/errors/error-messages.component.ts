import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ValidationService } from '../../providers/validation-service';

@Component({
  selector: 'error-messages',
  templateUrl: 'error-messages.html'
})
export class ErrorMessagesComponent {
  @Input() control: FormControl;

  constructor() {}

  get errorMessages() {
    for (let propertyName in this.control.errors) {
      // console.debug("propertyName:"+propertyName);
      // console.debug("errors:"+JSON.stringify(this.control.errors));
      if (this.control.errors.hasOwnProperty(propertyName) && this.control.dirty) {
        return ValidationService.getValidationErrorMessage(propertyName, this.control.errors[propertyName]);
      }
    }

    return null;
  }
}
