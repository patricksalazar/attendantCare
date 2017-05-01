import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';

// import { lbServices } from './lb-services';
import { IPatient, ICarePlan } from '../models/models';

/*
  Generated class for the PatientService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class PatientService {
  baseUrl = 'http://localhost:3000/api';
  limit = 10;

  constructor(public http: Http) {
    console.log('Hello PatientService Provider');
  }

  headers = new Headers({
     'Content-Type': 'application/json',
    //  'Authorization': this.authService.getToken(),
   });

  // Search for Patients
  search(queryParam: string): Observable<IPatient[]> {
    let query = {
      fields: {
        id: true, firstName: true, lastName: true
      },
      where: {
        or: [
          {firstName: {like: queryParam, options: "i"}},
          {lastName: {like: queryParam, options: "i"}}
        ]
      },
      limit: 10
    };

    let filter = encodeURI(JSON.stringify(query));
    return this.http.get(`${this.baseUrl}/patients?filter=${filter}`).map(res => <IPatient[]>res.json());
  }

  // Load all Patients
  findAll(): Observable<IPatient[]> {
    let query = { limit: 10 }
    const filter = encodeURI(JSON.stringify(query));
    return this.http.get(`${this.baseUrl}/patients?filter=${filter}`).map(res => <IPatient[]>res.json());
  }

  // Get Patient by id
  findById(patientId: string): Observable<IPatient> {
    console.debug("PatientService.findById id:"+patientId);
    let query = { include: ['phones', 'contacts'] }
    const filter = encodeURI(JSON.stringify(query));
    return this.http.get(`${this.baseUrl}/patients/${patientId}?filter=${filter}`).map(res => <IPatient>res.json());
  }

  getCarePlan(patientId: string): Observable<ICarePlan> {
    console.debug("PatientService.getCarePlan id:"+patientId);
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
      },
      limit: 1
    }
    const filter = encodeURI(JSON.stringify(query));
    return this.http.get(`${this.baseUrl}/patients/${patientId}/careplans?filter=${filter}`).map(res => {
      let val = <ICarePlan[]>res.json();
      return val[0];
    });
  }

}
