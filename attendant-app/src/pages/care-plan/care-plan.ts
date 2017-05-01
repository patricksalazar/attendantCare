import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { ICarePlan } from '../../models/models';
// import { CarePlanService } from '../../providers/careplan-service';
import { PatientService } from '../../providers/patient-service';

/*
  Generated class for the CarePlan page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@IonicPage()
@Component({
  selector: 'page-care-plan',
  templateUrl: 'care-plan.html'
})
export class CarePlanPage {
  isLoaded: boolean;
  patientId: string;
  careplan: ICarePlan;

  constructor(public navCtrl: NavController, public navParams: NavParams, private patientService: PatientService) {
    this.patientId = navParams.get('patientId');
    console.log("CarePlanPage id:" + this.patientId);
    patientService.getCarePlan(this.patientId).subscribe(careplan => {
      console.debug("Care Plan: "+JSON.stringify(careplan));
      this.careplan = careplan;
      this.isLoaded = true;
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CarePlanPage');
  }

}
