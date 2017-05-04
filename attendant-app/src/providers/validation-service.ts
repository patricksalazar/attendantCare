import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

/*
  Generated class for the ValidationService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class ValidationService {

  constructor() {
    console.log('Hello ValidationService Provider');
  }

  static getValidationErrorMessage(validatorName: string, validationValue?: any) {
    let config = {
      'required': 'Required',
      'invalidEmailAddress': 'A valid email address is required',
      'invalidPassword': 'Invalid password.  Password must be at least 6 characters and contain 1 number and 1 symbol',
      'minLength': `Minimum length is ${validationValue.requiredLength}`,
      'maxlength': `Maximum length is ${validationValue.requiredLength}`,
      'futureDate': 'Date cannot be in the future'
    };
    if (!config[validatorName]) {
      console.error("Could not find error message for key:"+validatorName);
    }
    return config[validatorName];
  }

  static emailValidator(control) {
    // RFC2822 compliant regex
    if (!control.value || control.value.match(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/)) {
        return null;
    } else {
        return { 'invalidEmailAddress': true };
    }
  }

  static passwordValidator(control) {
    // {6,100}           - Assert password is between 6 and 100 characters
    // (?=.*[0-9])       - Assert a string has at least one number
    if (control.value.match(/^(?=.*[0-9])[a-zA-Z0-9!@#$%^&*]{6,100}$/)) {
        return null;
    } else {
        return { 'invalidPassword': true };
    }
}
}
