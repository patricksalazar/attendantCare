import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PatientMenu } from './patient-menu';

@NgModule({
  declarations: [
    PatientMenu
  ],
  imports: [
    IonicPageModule.forChild(PatientMenu)
  ],
  exports: [
    PatientMenu
  ]
})
export class PatientMenuModule {}
