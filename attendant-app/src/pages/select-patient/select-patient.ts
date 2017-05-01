import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

/*
  Generated class for the SelectPatient page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-select-patient',
  templateUrl: 'select-patient.html'
})
export class SelectPatientPage {
  nextPage;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.nextPage = navParams.get('nextPage');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SelectPatientPage');
  }

  selectPatient() {
    console.log("called selectPatient");
    switch(this.nextPage) {
      case 'careplan':
        this.navCtrl.push("CarePlan");
        break;
    }
  }
}
