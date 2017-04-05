import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { MessagePage } from '../message/message';

/*
  Generated class for the Inbox page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-inbox',
  templateUrl: 'inbox.html'
})
export class InboxPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad InboxPage');
  }

  openMessage() {
      this.navCtrl.push(MessagePage);
  }

}
