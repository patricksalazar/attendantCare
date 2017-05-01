import { NgModule, ErrorHandler } from '@angular/core';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';

import { MyApp } from './app.component';
import { InformationPage } from '../pages/information/information';
import {CareNotePage} from '../pages/care-note/care-note';
import {SelectPatientPage} from '../pages/select-patient/select-patient';
import { MessagePage } from '../pages/message/message';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { PatientService } from '../providers/patient-service';

@NgModule({
  declarations: [
    MyApp,
    MessagePage,
    InformationPage,
    CareNotePage,
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
    MessagePage,
    InformationPage,
    CareNotePage,
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
