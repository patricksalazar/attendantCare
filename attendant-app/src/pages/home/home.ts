import { Component } from '@angular/core';

import { IonicPage, NavController } from 'ionic-angular';

import { InboxPage } from '../inbox/inbox';
import { SchedulePage } from '../schedule/schedule';
import { InformationPage } from '../information/information';
import { SelectPatientPage } from '../select-patient/select-patient';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  items = [];

  constructor(public navCtrl: NavController) {
      this.items = [
        { title: 'Inbox', icon: 'mail', page: 'InboxPage' },
        { title: 'Schedule', icon: 'calendar', page: 'SchedulePage' },
        { title: 'Patients', icon: 'contact', page: 'PatientsPage' },
        { title: 'Medications', icon: 'flask', page: 'Medications' },
        { title: 'Vitals', icon: 'thermometer', page: 'Vitals' },
        { title: 'Finances', icon: 'cash', page: 'Finances' },
        { title: 'Reports', icon: 'stats', page: 'Reports' },
        { title: 'Help', icon: 'help-circle', page: 'Help' },
      ];
  }

  openPage(page) {
    this.navCtrl.push(page);
  }

}
