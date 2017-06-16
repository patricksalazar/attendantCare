import { NgModule, ErrorHandler, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { TextMaskModule } from 'angular2-text-mask';

import { MyApp } from './app.component';
import { InformationPage } from '../pages/information/information';
import {CareNotePage} from '../pages/care-note/care-note';
import { MessagePage } from '../pages/message/message';
import { SharedModule } from '../components/shared.module';
import { PhoneComponent } from '../components/phone/phone.component';
import { ContactComponent } from '../components/contact/contact.component';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { PatientService } from '../providers/patient-service';
import { ValidationService } from '../providers/validation-service';
import { DropdownService } from '../providers/dropdown-service';

@NgModule({
  declarations: [
    MyApp,
    MessagePage,
    InformationPage,
    CareNotePage,
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    BrowserModule,
    HttpModule,
    TextMaskModule,
    SharedModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    MessagePage,
    InformationPage,
    CareNotePage,
    PhoneComponent,
    ContactComponent
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    PatientService,
    ValidationService,
    DropdownService
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class AppModule {}
