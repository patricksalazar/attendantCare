import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavParams, ViewController } from 'ionic-angular';

import { IContact, Contact } from '../../models/models';
import { ValidationService } from '../../providers/validation-service';

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactComponent {
  contact: IContact;
  contactForm: FormGroup;
  masks: any;

  constructor(public navParams: NavParams, public viewCtrl: ViewController, public formBuilder: FormBuilder) {
    this.contact = navParams.get("contact");
    console.log("started ContactComponent, contact=" + JSON.stringify(this.contact));
    if (!this.contact || !this.contact.id) {
      this.contact = new Contact();
      this.contact.type = navParams.get("type");
      console.log("new contact: " + this.contact.type);
    }
    this.contactForm = this.initContact(this.contact);
    this.masks = {
      phoneNumber: ['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]
    }
  }

  initContact(contact: IContact) {
    return this.formBuilder.group({
      id: [contact.id],
      patientId: [contact.patientId],
      type: [contact.type, Validators.required], // TODO check type dropdown
      firstName: [contact.firstName, Validators.compose([Validators.required, Validators.maxLength(50), Validators.pattern('[a-zA-Z ]*')])],
      lastName: [contact.lastName, Validators.compose([Validators.maxLength(50), Validators.pattern('[a-zA-Z ]*')])],
      company: [contact.company, Validators.compose([Validators.maxLength(50), Validators.pattern('[a-zA-Z0-9& ]*')])],
      title: [contact.title, Validators.required],
      npi: [contact.npi, Validators.pattern[0-9]],  // TODO check NPI number
      phone: [contact.phone, Validators.compose([Validators.required, ValidationService.phoneValidator])],
      email: [contact.email, ValidationService.emailValidator],
      isEmergencyContact: [contact.isEmergencyContact]
    });
  }

  save() {
    let data = this.contactForm.value;
    console.log("Contact Form: " + JSON.stringify(data));
    data = this.unmaskData(data);
    this.viewCtrl.dismiss(data);
  }

  unmaskData(data) {
    let unmaskedData = data;
    unmaskedData.number = data.phone.replace(/\D+/g, '');
    return unmaskedData;
  }

  cancel() {
    this.viewCtrl.dismiss(null);
  }

}
