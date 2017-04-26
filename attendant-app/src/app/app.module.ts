import { NgModule, ErrorHandler } from '@angular/core';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';

import { MyApp } from './app.component';
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

import { PatientService } from '../providers/patient-service';

@NgModule({
  declarations: [
    MyApp,
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
    IonicModule.forRoot(MyApp),
    BrowserModule,
    HttpModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
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
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    PatientService
  ]
})
export class AppModule {}
