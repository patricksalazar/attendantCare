import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { IPatient } from '../../models/models';
import { PatientService } from '../../providers/patient-service';

/**
 * Generated class for the Patients page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-patients',
  templateUrl: 'patients.html',
})
export class PatientsPage {
  patients: IPatient[];

  constructor(public navCtrl: NavController, public navParams: NavParams, private patientService: PatientService) {
    patientService.findAll().subscribe(patients => {
      this.patients = patients;
      console.log("Patients: "+JSON.stringify(patients));
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Patients');
  }

  selectPatient(patientId: string) {
    console.log("called selectPatient: " + patientId);
    this.navCtrl.push('PatientMenu', { patientId });
  }

  search(ev: any) {
    // set val to the value of the searchbar
    let val = ev.target.value;

    // search patient
    this.patientService.search(val).subscribe(patients => {
      this.patients = patients;
      console.log("Patient Search finished");
    })
  }

}
