import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonicPage, NavController, NavParams, ModalController, ToastController } from 'ionic-angular';

import { ICarePlan, CarePlan, ICarePlanGroup, CarePlanGroup, CarePlanTask } from '../../models/models';
// import { CarePlanService } from '../../providers/careplan-service';
import { PatientService } from '../../providers/patient-service';
import { CarePlanService } from '../../providers/careplan-service';
import { DropdownComponent } from '../../components/dropdown/dropdown.component';

/*
  Generated class for the CarePlan page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@IonicPage()
@Component({
  selector: 'page-care-plan',
  templateUrl: 'care-plan.html'
})
export class CarePlanPage {
  isLoaded: boolean;
  patientId: string;
  careplanId: string;
  careForm: FormGroup;
  groups: ICarePlanGroup[];

  constructor(
    public navCtrl: NavController, public navParams: NavParams,
    public modalCtrl: ModalController,
    public toastCtrl: ToastController,
    public formBuilder: FormBuilder,
    private patientService: PatientService,
    private careplanService: CarePlanService
  ) {
    this.patientId = navParams.get('patientId');
    console.log("CarePlanPage id:" + this.patientId);
    patientService.getCarePlan(this.patientId).subscribe(careplan => {
      console.debug("Care Plan: "+JSON.stringify(careplan));
      if (!careplan || !careplan.id) {
        careplan = new CarePlan();
        this.groups = [];
      }else {
        this.careplanId = careplan.id;
        this.groups = careplan.groups;
      }
      this.careForm = this.initCarePlan(careplan);
      this.isLoaded = true;
    })
  }

  initCarePlan(careplan: ICarePlan) {
    return this.formBuilder.group({
      id: [careplan.id],
      patientId: [careplan.patientId],
      name: [careplan.name, Validators.compose([Validators.required, Validators.maxLength(50), Validators.pattern('[a-zA-Z ]*')])],
      startDate: [careplan.startDate],
      endDate: [careplan.endDate],
      discipline: [careplan.discipline, Validators.required]
    })
  }

  addGroups() {
    let modal = this.modalCtrl.create(DropdownComponent, { selector: "CPGroups" });
    modal.onDidDismiss(selection => {
      if (selection != null) { // if saved
        let newGroups = [];
        let seq = (this.groups ? this.groups.length * 10 + 10 : 10);
        for (let dropdown of selection) {
          let group = new CarePlanGroup();
          group.code = dropdown.code;
          group.name = dropdown.description;
          group.sequence = seq;
          newGroups.push(group);
          seq += 10;
        }

        // Add to group
        if (!this.groups) this.groups = [];
        this.groups.push(...newGroups);

        // Post to server
        if (this.careplanId) {
          this.careplanService.createGroups(this.careplanId, newGroups).subscribe(
            groups => {
              console.log("Created these groups: " + JSON.stringify(groups));
              for (let group of groups) {
                for (let g of this.groups) {
                  if (group.code == g.code) {
                    console.log("Found you: "+g.code);
                    g.id = group.id;
                  }
                }
              }
              this.toastCtrl.create(
                {message: 'Groups created successfully', duration: 3000, position: "top", showCloseButton: true}
              ).present();
            },
            err => {
              this.toastCtrl.create(
                {message: 'Unable to create groups', duration: 3000, position: "top", showCloseButton: true}
              ).present();
              console.error("Unable to create groups, error=" + JSON.stringify(err));
            }
          );
        } // end if
      }
    });
    modal.present();
  } // end add groups

  addGroupTasks(group) {
    let modal = this.modalCtrl.create(DropdownComponent, { selector: "CPTasks", group: group.code });
    modal.onDidDismiss(selection => {
      if (selection != null) { // if saved
        let newTasks = [];
        let seq = (group.tasks ? group.tasks.length * 10 + 10 : 10);
        for (let dropdown of selection) {
          let task = new CarePlanTask();
          task.key = dropdown.code;
          task.description = dropdown.description;
          task.sequence = seq;
          task.enabled = true;
          newTasks.push(task);
          seq += 10;
        }

        // Add to group
        if (!group.tasks) group.tasks = [];
        group.tasks.push(...newTasks);

        // Post to server
        if (group.id) {
          this.careplanService.createTasks(group.id, newTasks).subscribe(
            tasks => {
              this.toastCtrl.create(
                {message: 'Tasks created successfully', duration: 3000, position: "top", showCloseButton: true}
              ).present();
            },
            err => {
              this.toastCtrl.create(
                {message: 'Unable to create tasks', duration: 3000, position: "top", showCloseButton: true}
              ).present();
              console.error("Unable to create tasks, error=" + JSON.stringify(err));
            }
          );
        } // end if
      }
    });
    modal.present();
  } // end add groups

}
