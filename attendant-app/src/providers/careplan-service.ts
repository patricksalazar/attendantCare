import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';

// import { lbServices } from './lb-services';
import { ICarePlan, ICarePlanGroup, ICarePlanTask } from '../models/models';

/*
  Generated class for the CarePlanService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class CarePlanService {
  baseUrl = 'http://localhost:3000/api';
  limit = 10;

  constructor(public http: Http) {
    console.log('Hello CarePlanService Provider');
  }

  headers = new Headers({
     'Content-Type': 'application/json',
    //  'Authorization': this.authService.getToken(),
   });

  // Load all CarePlans
  findAll(): Observable<ICarePlan[]> {
    let query = { limit: 10 }
    const filter = encodeURI(JSON.stringify(query));
    return this.http.get(`${this.baseUrl}/careplans?filter=${filter}`).map(res => <ICarePlan[]>res.json());
  }

  // Get CarePlan by id
  findById(careplanId: string): Observable<ICarePlan> {
    if (careplanId) {
      let query = {
        include: {
          relation: 'groups',
          scope: {
            order: 'sequence ASC',
            include: {
              relation: 'tasks',
              scope: {
                order: 'sequence ASC'
              }
            }
          }
        }
      }
      const filter = encodeURI(JSON.stringify(query));
      return this.http.get(`${this.baseUrl}/careplans/${careplanId}?filter=${filter}`).map(res => <ICarePlan>res.json());
    }else {
      return null;
    }
  }

  createGroups(careplanId: string, groups: ICarePlanGroup[]) {
    console.debug("PatientService.createPhone");
    return this.http.post(`${this.baseUrl}/careplans/${careplanId}/groups`, groups)
      .map(response => {
        console.log("Create success response="+JSON.stringify(response));
        return response.json();
      })
      .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }

  createTasks(groupId: string, tasks: ICarePlanTask[]) {
    console.debug("PatientService.createPhone");
    return this.http.post(`${this.baseUrl}/careplangroups/${groupId}/tasks`, tasks)
      .map(response => {
        console.log("Create success response="+JSON.stringify(response));
        return response.json();
      })
      .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }
}
