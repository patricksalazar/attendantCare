import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ErrorMessagesComponent } from '../../components/errors/error-message.component';
import { PatientDetailsPage } from './patient-details';

@NgModule({
  declarations: [
    PatientDetailsPage,
    ErrorMessagesComponent
  ],
  imports: [
    IonicPageModule.forChild(PatientDetailsPage)
  ],
  exports: [
    PatientDetailsPage
  ]
})
export class PatientDetailsModule {}
