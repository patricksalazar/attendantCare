import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';

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

  constructor(public navCtrl: NavController, public navParams: NavParams, public events: Events) {
    this.tabParams.patientId = navParams.get('patientId');
    events.subscribe('patient:save', (opts) => {
      if (navCtrl.canGoBack()) {
        navCtrl.pop();
      }else {
        navCtrl.setRoot("HomePage");
      }
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Patient Details');
  }

  ionViewDidLeave() {
    this.events.unsubscribe('patient:save');
  }

}
