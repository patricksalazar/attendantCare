import { Component } from '@angular/core';

import { IonicPage, NavController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  items = [];
  title: string = "Care Coordinator";

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

  changeTitle(title) {
    this.title = title;
  }

}
