import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import {getDaysofWeek} from '../../utils/dateUtils';

import {CareNotePage} from '../care-note/care-note';

/*
  Generated class for the Schedule page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-schedule',
  templateUrl: 'schedule.html'
})
export class SchedulePage {
  today;
  weekArray = [];

  constructor(public navCtrl: NavController, public navParams: NavParams) {
      this.today = new Date();
      this.weekArray = getDaysofWeek(this.today);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SchedulePage');
  }

  openPage(page) {
    switch(page) {
      case 'shift':
        this.navCtrl.push(CareNotePage);
        break;
    }
  }
}
