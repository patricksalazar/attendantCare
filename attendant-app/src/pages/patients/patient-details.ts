import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonicPage, NavController, NavParams, ToastController, Events, ModalController } from 'ionic-angular';

import { IPatient, Patient, IPhone, IContact } from '../../models/models';
import { PatientService } from '../../providers/patient-service';
import { DateValidator } from '../../validators/date';
import { ValidationService } from '../../providers/validation-service';
import { PhoneComponent } from '../../components/phone/phone.component';
import { ContactComponent } from '../../components/contact/contact.component';

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
  phones: IPhone[];
  personalContacts: IContact[];
  physicians: IContact[];
  otherContacts: IContact[];

  // TODO add phone number masks
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public events: Events,
    public modalCtrl: ModalController,
    public toastCtrl: ToastController,
    public formBuilder: FormBuilder,
    private patientService: PatientService
  ) {
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

  initPatientForm(patient: IPatient) {
    this.phones = patient.phones;
    let contacts = this.initContacts(patient.contacts);
    this.personalContacts = contacts.personalContacts;
    this.physicians = contacts.physicians;
    this.otherContacts = contacts.otherContacts;
    return this.formBuilder.group({
      id: [patient.id],
      firstName: [patient.firstName, Validators.compose([Validators.required, Validators.maxLength(50), Validators.pattern('[a-zA-Z ]*')])],
      lastName: [patient.lastName, Validators.compose([Validators.required, Validators.maxLength(50), Validators.pattern('[a-zA-Z ]*')])],
      email: [patient.email, ValidationService.emailValidator],
      fullAddress: [patient.fullAddress, Validators.compose([Validators.required])], // TODO call google to check
      admitDate: [patient.admitDate, DateValidator.previousDate],
      birthDate: [patient.birthDate, DateValidator.previousDate],
      groupId: [patient.groupId],
      memberId: [patient.memberId],
    });
  }

  initContact(contact: IContact) {
    return {
      id: contact.id,
      patientId: contact.patientId,
      firstName: contact.firstName,
      lastName: contact.lastName,
      company: contact.company,
      type: contact.type,
      title: contact.title,
      phone: contact.phone,
      email: contact.email,
      isEmergencyContact: contact.isEmergencyContact,
      isPowerOfAttorney: contact.isPowerOfAttorney
    };
  }

  initContacts(contacts: IContact[]) {
    let personalContacts = [];
    let physicians = [];
    let otherContacts = [];
    if (contacts) {
      for (let contact of contacts) {
        // if (!contact.isEmergencyContact) contact.isEmergencyContact = false;
        // if (!contact.specialty) contact.specialty = "";
        if (contact.type === 'personal') {
          personalContacts.push(contact);
        }else if (contact.type === 'physician') {
          physicians.push(contact);
        }else {
          otherContacts.push(contact);
        }
      }
    }
    return { personalContacts, physicians, otherContacts };
  }

  save() {
    // Invalid form
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
      // Update Patient
      if (this.patientId) {
        console.log("Update Patient!!");
        this.patientService.update(this.patientId, this.patientForm.value).subscribe(
          patient => {
            console.debug("Patient after: " + JSON.stringify(patient));
            this.patientId = patient.id;
            this.toastCtrl.create({
              message: 'Patient updated successfully', duration: 3000, position: "top", showCloseButton: true}
            ).present();
            this.events.publish("patient:save", {refresh: true});
          },
          err => {
            console.log(err);
          }
        );
        // Create Patient
      }else {
        let patient = this.patientForm.value;
        patient.phones = this.phones;
        patient.contacts = [...this.personalContacts, ...this.physicians, ...this.otherContacts];
        console.log("Create Patient!!: " + JSON.stringify(patient) );
        this.patientService.create(patient).subscribe(
          patient => {
            console.debug("Patient after: " + JSON.stringify(patient));
            this.toastCtrl.create({message: 'Patient created successfully', duration: 3000, position: "top", showCloseButton: true}).present();
            this.events.publish("patient:save", {refresh: true});
          },
          err => {
            console.log(err);
          }
        );
      }
    }
  }

  cancel() {
    this.events.publish("patient:save", {refresh: false});
  }

  delete() {
    console.log("Delete Patient!");
    this.patientService.delete(this.patientId).subscribe(
      patient => {
        this.toastCtrl.create(
          {message: 'Patient deleted successfully', duration: 3000, position: "top", showCloseButton: true}
        ).present();
        this.events.publish("patient:save", {refresh: true});
      },
      err => {
        this.toastCtrl.create(
          {message: 'Unable to delete patient: err=' + JSON.stringify(err), duration: 3000, position: "top", showCloseButton: true}
        ).present();
        console.log(err);
      }
    )
  }

  createPhone() {
    console.log("createPhone");
    let modal = this.modalCtrl.create(PhoneComponent, { patientId: this.patientId });
    modal.onDidDismiss(phone => {
      console.log("Phone 1: " + JSON.stringify(phone));
      if (phone != null) {  // if saved
        console.log("Phone modal: " + JSON.stringify(phone));
        if (this.patientId) {
          this.patientService.createPhone(this.patientId, phone).subscribe(
            phone => {
              this.toastCtrl.create(
                {message: 'Phone created successfully', duration: 3000, position: "top", showCloseButton: true}
              ).present();
            },
            err => {
              this.toastCtrl.create(
                {message: 'Unable to create phone', duration: 3000, position: "top", showCloseButton: true}
              ).present();
              console.error("Unable to create phone, error=" + JSON.stringify(err));
            }
          )
        }
        if (!this.phones) this.phones = [];
        this.phones.push(phone);
      }
    });
    modal.present();
  } // end create phone

  createContact(type: string) {
    console.log("createContact: type=" + type);
    let modal = this.modalCtrl.create(ContactComponent, { patientId: this.patientId, type: type });
    modal.onDidDismiss(contact => {
      if (contact != null) { // if saved
        console.log("Contact modal: " + JSON.stringify(contact));
        if (this.patientId) {
          this.patientService.createContact(this.patientId, contact).subscribe(
            phone => {
              this.toastCtrl.create(
                {message: 'Contact created successfully', duration: 3000, position: "top", showCloseButton: true}
              ).present();
            },
            err => {
              this.toastCtrl.create(
                {message: 'Unable to create contact', duration: 3000, position: "top", showCloseButton: true}
              ).present();
              console.error("Unable to create contact, error=" + JSON.stringify(err));
            }
          )
        }
        switch (type) {
          case 'personal':
            this.personalContacts.push(contact);
            break;
          case 'physician':
            this.physicians.push(contact);
            break;
          default:
            this.otherContacts.push(contact);
            break;
        }
      }
    });
    modal.present();
  } // end create contact
}
