import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';

import { IPatient, Patient, IPhone, IContact } from '../../models/models';
import { PatientService } from '../../providers/patient-service';
import { DateValidator } from '../../validators/date';
import { ValidationService } from '../../providers/validation-service';

/**
 * Generated class for the Patient Details page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-patient-details',
  templateUrl: 'patient-details.html',
})
export class PatientDetailsPage {
  patientId: string;
  isLoaded: boolean;
  patientForm: FormGroup;

  // TODO add phone number masks
  constructor(public navCtrl: NavController, public navParams: NavParams, public toastCtrl: ToastController, public formBuilder: FormBuilder, private patientService: PatientService) {
    this.isLoaded = false;
    this.patientId = navParams.get('patientId');

    if (this.patientId) {
      patientService.findById(this.patientId).subscribe(patient => {
        this.patientForm = this.initPatientForm(patient);
        this.isLoaded = true;
      });
    }else {
      let patient = new Patient();
      this.patientForm = this.initPatientForm(patient);
      this.isLoaded = true;
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PatientDetailsPage');
  }

  initPatientForm(patient: IPatient) {
    let phones = this.initPhones(patient.phones);
    let contacts = this.initContacts(patient.contacts);
    return this.formBuilder.group({
      firstName: [patient.firstName, Validators.compose([Validators.required, Validators.maxLength(50), Validators.pattern('[a-zA-Z ]*')])],
      lastName: [patient.lastName, Validators.compose([Validators.required, Validators.maxLength(50), Validators.pattern('[a-zA-Z ]*')])],
      email: [patient.email, ValidationService.emailValidator],
      fullAddress: [patient.fullAddress, Validators.compose([Validators.required])], // TODO call google to check
      admitDate: [patient.admitDate, DateValidator.previousDate],
      birthDate: [patient.birthDate, DateValidator.previousDate],
      groupId: [patient.groupId],
      memberId: [patient.memberId],
      phones: phones,
      personalContacts: contacts.personalControl,
      physicians: contacts.personalControl,
      otherContacts: this.formBuilder.array([])
    });
  }

  initPhones(phones: IPhone[]) {
    const phoneControl = this.formBuilder.array([]);
    if (phones) {
      for (let phone of phones) {
        phoneControl.push(this.formBuilder.group({
          id: [phone.id],
          patientId: [phone.patientId],
          type: [phone.type, Validators.required], // TODO check type dropdown
          number: [phone.number, Validators.required] //, Validators.pattern('[^\D?(\d{3})\D?\D?(\d{3})\D?(\d{4})$]'
        }));
      }
    }
    return phoneControl;
  }

  initContact(contact: IContact) {
    return this.formBuilder.group({
      id: [contact.id],
      patientId: [contact.patientId],
      firstName: [contact.firstName, Validators.compose([Validators.required, Validators.maxLength(50), Validators.pattern('[a-zA-Z ]*')])],
      lastName: [contact.lastName, Validators.compose([Validators.maxLength(50), Validators.pattern('[a-zA-Z ]*')])],
      type: [contact.type, Validators.compose([Validators.required])],
      specialty: [contact.specialty],
      phone: [contact.phone],
      email: [contact.email],
      isEmergencyContact: [contact.isEmergencyContact]
    });
  }

  initContacts(contacts: IContact[]) {
    const personalControl = this.formBuilder.array([]);
    const physicianControl = this.formBuilder.array([]);
    const otherControl = this.formBuilder.array([]);

    if (contacts) {
      for (let contact of contacts) {
        // if (!contact.isEmergencyContact) contact.isEmergencyContact = false;
        // if (!contact.specialty) contact.specialty = "";
        if (contact.type === 'personal') {
          personalControl.push(this.initContact(contact));
        }else if (contact.type === 'physician') {
          physicianControl.push(this.initContact(contact));
        }else {
          otherControl.push(this.initContact(contact));
        }
      }
    }
    return { personalControl, physicianControl, otherControl };
  }

  save() {
    if (!this.patientForm.valid) {
      console.error("Error: " + JSON.stringify(this.patientForm.errors));
      let keys = Object.keys(this.patientForm.controls);
      for (let key of keys) {
        let control = this.patientForm.controls[key];
        if (!control.valid) {
          console.log("Key:"+key+", valid:"+control.valid+", errors:"+JSON.stringify(control.errors));
        }
      }
    }else {
      if (this.patientId) {
        console.log("Update Patient!!");
        this.patientService.update(this.patientId, this.patientForm.value).subscribe(
          patient => {
            console.debug("Patient after: " + JSON.stringify(patient));
            this.patientId = patient.id;
            let toast = this.toastCtrl.create({message: 'Patient updated successfully', duration: 5000});
            toast.present();
          },
          err => {
            console.log(err);
          }
        );
      }else {
        console.log("Create Patient!!");
        this.patientService.create(this.patientForm.value).subscribe(
          patient => {
            console.debug("Patient after: " + JSON.stringify(patient));
            let toast = this.toastCtrl.create({message: 'Patient created successfully', duration: 5000});
            toast.present();
          },
          err => {
            console.log(err);
          }
        );
      }
    }
  }

}
