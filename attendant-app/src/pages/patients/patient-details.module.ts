import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PatientDetailsPage } from './patient-details';
import { SharedModule } from '../../components/shared.module';

@NgModule({
  declarations: [
    PatientDetailsPage
  ],
  imports: [
    IonicPageModule.forChild(PatientDetailsPage),
    SharedModule
  ],
  exports: [
    PatientDetailsPage
  ]
})
export class PatientDetailsModule {}
