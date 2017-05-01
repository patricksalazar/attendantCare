import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the Patient Details page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-patient-menu',
  templateUrl: 'patient-menu.html',
})
export class PatientMenu {
  tab1Root: any = 'PatientDetailsPage';
  tab2Root: any = 'CarePlanPage';

  tabParams = {
    patientId: ""
  }

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.tabParams.patientId = navParams.get('patientId');
    console.log("Tab params:" + this.tabParams.patientId);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Patient Details');
  }

}
