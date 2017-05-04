import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ValidationService } from '../../providers/validation-service';

@Component({
  selector: 'error-messages',
  template: `<div *ngIf="errorMessage !== null">***{{errorMessage}}***</div>`
})
export class ErrorMessagesComponent {
  @Input() control: FormControl;

  constructor() {}

  get errorMessage() {
    for (let propertyName in this.control.errors) {
      // console.log("propertyName:"+propertyName);
      // console.log("errors:"+JSON.stringify(this.control.errors));
      if (this.control.errors.hasOwnProperty(propertyName) && this.control.dirty) {
        return ValidationService.getValidationErrorMessage(propertyName, this.control.errors[propertyName]);
      }
    }

    return null;
  }
}
