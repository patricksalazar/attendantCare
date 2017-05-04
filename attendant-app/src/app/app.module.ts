import { NgModule, ErrorHandler, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';

import { MyApp } from './app.component';
import { InformationPage } from '../pages/information/information';
import {CareNotePage} from '../pages/care-note/care-note';
import { MessagePage } from '../pages/message/message';
// import { ErrorMessagesComponent } from '../components/errors/error-message.component';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { PatientService } from '../providers/patient-service';
import { ValidationService } from '../providers/validation-service';

@NgModule({
  declarations: [
    MyApp,
    MessagePage,
    InformationPage,
    CareNotePage,
    // ErrorMessagesComponent
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
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    PatientService,
    ValidationService
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class AppModule {}
