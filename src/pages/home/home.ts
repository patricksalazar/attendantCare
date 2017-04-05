import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';

import { InboxPage } from '../inbox/inbox';
import { SchedulePage } from '../schedule/schedule';
import { InformationPage } from '../information/information';
import { SelectPatientPage } from '../select-patient/select-patient';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  items = [];

  constructor(public navCtrl: NavController) {
      this.items = [
        { title: 'Inbox', icon: 'mail', page: 'inbox' },
        { title: 'Schedule', icon: 'calendar', page: 'schedule' },
        { title: 'Information', icon: 'information-circle', page: 'information' },
        { title: 'Care Plan', icon: 'medkit', page: 'careplan' },
        { title: 'Medications', icon: 'flask', page: 'medications' },
        { title: 'Vitals', icon: 'thermometer', page: 'vitals' },
        { title: 'Finances', icon: 'cash', page: 'finances' },
        { title: 'Reports', icon: 'stats', page: 'reports' },
        { title: 'Help', icon: 'help-circle', page: 'help' },
      ];
  }

  openPage(page) {
    switch(page) {
      case 'inbox':
        this.navCtrl.push(InboxPage);
        break;
      case 'schedule':
        this.navCtrl.push(SchedulePage);
        break;
      case 'information':
        this.navCtrl.push(InformationPage);
        break;
      case 'careplan':
        this.navCtrl.push(SelectPatientPage, {nextPage: 'careplan'});
        break;
    }
  }

}
