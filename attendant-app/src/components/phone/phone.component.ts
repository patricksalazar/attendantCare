import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavParams, ViewController } from 'ionic-angular';

import { IPhone, Phone } from '../../models/models';
import { ValidationService } from '../../providers/validation-service';

@Component({
  selector: 'page-phone',
  templateUrl: 'phone.html'
})
export class PhoneComponent {
  phone: IPhone;
  phoneForm: FormGroup;
  masks: any;

  constructor(public navParams: NavParams, public viewCtrl: ViewController, public formBuilder: FormBuilder) {
    this.phone = navParams.get("phone");
    console.log("started PhoneComponent, phone=" + JSON.stringify(this.phone));
    if (!this.phone || !this.phone.id) {
      this.phone = new Phone();
    }
    this.phoneForm = this.initPhone(this.phone);
    this.masks = {
      phoneNumber: ['(', /[2-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]
    }
  }

  initPhone(phone: IPhone) {
    return this.formBuilder.group({
      id: [phone.id],
      patientId: [phone.patientId],
      type: [phone.type, Validators.required], // TODO check type dropdown
      number: [phone.number, Validators.compose([Validators.required, ValidationService.phoneValidator])],
      extension: [phone.extension, Validators.pattern("[1-9]*")],
      carrier: [phone.carrier]
    });
  }

  save() {
    let data = this.phoneForm.value;
    data = this.unmaskData(data);
    this.viewCtrl.dismiss(data);
  }

  unmaskData(data) {
    let unmaskedData = data;
    unmaskedData.number = data.number.replace(/\D+/g, '');
    return unmaskedData;
  }

  cancel() {
    this.viewCtrl.dismiss(null);
  }

}
