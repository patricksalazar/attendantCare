import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PatientsPage } from './patients';

@NgModule({
  declarations: [
    PatientsPage,
  ],
  imports: [
    IonicPageModule.forChild(PatientsPage)
  ],
  exports: [
    PatientsPage
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PatientsModule {}
