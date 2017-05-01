import { FormControl } from '@angular/forms';

export class DateValidator {
  static previousDate(control: FormControl): any {
    if (control.value instanceof Date && !isNaN(control.value.valueOf())) {
      return { "Not a valid date": true };
    }

    let now = new Date();
    if (control.value > now) {
      return { "Date cannot be in the future": true };
    }
  }
}
