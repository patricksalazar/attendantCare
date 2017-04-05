import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { InboxPage } from '../pages/inbox/inbox';
import { SchedulePage } from '../pages/schedule/schedule';
import { InformationPage } from '../pages/information/information';
import {CarePlanPage} from '../pages/care-plan/care-plan';
import {CareNotePage} from '../pages/care-note/care-note';
import {SelectPatientPage} from '../pages/select-patient/select-patient';
import { MessagePage } from '../pages/message/message';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    InboxPage,
    MessagePage,
    SchedulePage,
    InformationPage,
    CareNotePage,
    CarePlanPage,
    SelectPatientPage
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    InboxPage,
    MessagePage,
    SchedulePage,
    InformationPage,
    CareNotePage,
    CarePlanPage,
    SelectPatientPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
