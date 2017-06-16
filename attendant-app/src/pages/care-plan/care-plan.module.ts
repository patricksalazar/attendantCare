import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CarePlanPage } from './care-plan';
import { CarePlanService } from '../../providers/careplan-service';
import { SharedModule } from '../../components/shared.module';

@NgModule({
  declarations: [
    CarePlanPage
  ],
  imports: [
    IonicPageModule.forChild(CarePlanPage),
    SharedModule
  ],
  exports: [
    CarePlanPage
  ],
  providers: [
    CarePlanService
  ]
})
export class CarePlanModule {}
