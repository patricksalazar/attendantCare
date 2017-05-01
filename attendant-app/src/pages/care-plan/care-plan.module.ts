import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CarePlanPage } from './care-plan';
import { CarePlanService } from '../../providers/careplan-service';

@NgModule({
  declarations: [
    CarePlanPage
  ],
  imports: [
    IonicPageModule.forChild(CarePlanPage)
  ],
  exports: [
    CarePlanPage
  ],
  providers: [
    CarePlanService
  ]
})
export class CarePlanModule {}
