import { FormControl } from '@angular/forms';

export class DateValidator {
  static previousDate(control: FormControl): any {
    if (control.value instanceof Date && !isNaN(control.value.valueOf())) {
      return { "Not a valid date": true };
    }

    let now = new Date();
    let d = new Date(control.value);
    if (d > now) {
      return { "futureDate": true };
    }
  }
}
