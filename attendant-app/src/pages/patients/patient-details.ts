import { Component } from '@angular/core';
import { FormBuilder, FormArray, FormGroup, Validators } from '@angular/forms';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { IPatient, Patient } from '../../models/models';
import { PatientService } from '../../providers/patient-service';
import { DateValidator } from '../../validators/date';

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
  patient: IPatient;
  isLoaded: boolean;
  patientForm: FormGroup;

  // TODO add phone number masks
  constructor(public navCtrl: NavController, public navParams: NavParams, public formBuilder: FormBuilder, private patientService: PatientService) {
    this.isLoaded = false;
    this.patientId = navParams.get('patientId');
    this.patientForm = this.initPatientForm();

    if (this.patientId) {
      patientService.findById(this.patientId).subscribe(patient => {
        this.patient = patient;
        this.fillPatientFrom(patient);
        this.isLoaded = true;
      });
    }else {
      this.patient = new Patient();
      this.isLoaded = true;
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PatientDetailsPage');
  }

  initPatientForm() {
    return this.formBuilder.group({
      firstName: ['', Validators.compose([Validators.required, Validators.maxLength(50), Validators.pattern('[a-zA-Z ]*')])],
      lastName: ['', Validators.compose([Validators.required, Validators.maxLength(50), Validators.pattern('[a-zA-Z ]*')])],
      email: ['', Validators.compose([Validators.email ])],
      fullAddress: ['', Validators.compose([Validators.required])], // TODO call google to check
      admitDate: ['', DateValidator.previousDate],
      birthDate: ['', DateValidator.previousDate],
      groupId: [''],
      memberId: [''],
      phones: this.formBuilder.array([
        this.initPhones(),
      ]),
      personalContacts: this.formBuilder.array([
        this.initContacts(),
      ]),
      physicians: this.formBuilder.array([
        this.initContacts(),
      ]),
      otherContacts: this.formBuilder.array([
        this.initContacts(),
      ])
    });
  }

  fillPatientFrom(patient: IPatient) {
    let contacts = this.fillContactForm(patient);

    this.patientForm.patchValue({
      firstName: patient.firstName,
      lastName: patient.lastName,
      email: patient.email || '',
      fullAddress: patient.fullAddress,
      admitDate: patient.admitDate,
      birthDate: patient.birthDate,
      groupId: patient.groupId,
      memberId: patient.memberId,
      phones: patient.phones,
      personalContacts: contacts.personalContacts,
      physicians: contacts.physicians,
      otherContacts: contacts.otherContacts
    });
  }

  initPhones() {
    return this.formBuilder.group({
      type: ['', Validators.required], // TODO check type dropdown
      number: ['', Validators.compose([Validators.required, Validators.pattern('[^\D?(\d{3})\D?\D?(\d{3})\D?(\d{4})$]')])]
    });
  }

  initContacts() {
    return this.formBuilder.group({
      firstName: ['', Validators.compose([Validators.required, Validators.maxLength(50), Validators.pattern('[a-zA-Z ]*')])],
      lastName: ['', Validators.compose([Validators.required, Validators.maxLength(50), Validators.pattern('[a-zA-Z ]*')])],
      type: ['', Validators.compose([Validators.required])],
      specialty: ['', Validators.compose([Validators.required])]
    })
  }

  fillContactForm(patient: IPatient) {
    const personalControl = <FormArray> this.patientForm.controls['personalContacts'];
    const physicianControl = <FormArray> this.patientForm.controls['physicians'];
    const otherControl = <FormArray> this.patientForm.controls['otherContacts'];
    for (let i=0; i<personalControl.length; i++) { personalControl.removeAt(0) }
    for (let i=0; i<physicianControl.length; i++) { physicianControl.removeAt(0) }
    for (let i=0; i<otherControl.length; i++) { otherControl.removeAt(0) }

    let personalContacts = [];
    let physicians = [];
    let otherContacts = [];
    for (let contact of patient.contacts) {
      if (contact.type === 'personal') {
        personalControl.push(this.initContacts());
        personalContacts.push(contact);
      }else if (contact.type === 'physician') {
        physicianControl.push(this.initContacts());
        physicians.push(contact);
      }else {
        otherControl.push(this.initContacts());
        otherContacts.push(contact);
      }
    }
    return { personalContacts, physicians, otherContacts };
  }

  save() {
    if (!this.patientForm.valid) {
      console.error("Error: " + JSON.stringify(this.patientForm.errors));
    }else {
      console.log("Success!!");
    }
  }

}
