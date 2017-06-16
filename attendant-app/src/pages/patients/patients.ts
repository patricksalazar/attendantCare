import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';

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

  constructor(public navCtrl: NavController, public navParams: NavParams, public events: Events, private patientService: PatientService) {
    console.log("Return patient, params: " + JSON.stringify(navParams));
    this.findAll();
  }

  selectPatient(patientId: string) {
    this.navCtrl.push('PatientMenu', { patientId });
    this.events.subscribe("patient:save", (opts) => {
      console.log("options: " + JSON.stringify(opts));
      if (opts.refresh) this.findAll();
    });
  }

  newPatient() {
    this.navCtrl.push('PatientMenu');
    this.events.subscribe("patient:save", (opts) => {
      console.log("options: " + JSON.stringify(opts));
      if (opts.refresh) this.findAll();
    });
  }

  search(ev: any) {
    // set val to the value of the searchbar
    let val = ev.target.value;

    // search patient
    console.log("Search value: " + val);
    if (!val || val.trim() === "") {
      this.findAll();
    }else {
      this.patientService.search(val).subscribe(patients => {
        this.patients = patients;
        console.log("Patient Search finished");
      });
    }
  }

  cancelSearch() {
    this.findAll();
  }

  findAll() {
    this.patientService.findAll().subscribe(patients => {
      this.patients = patients;
    });
  }

}
