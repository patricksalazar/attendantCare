import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';

// import { lbServices } from './lb-services';
import { IPatient, ICarePlan, IPhone, IContact } from '../models/models';

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

  create(patient: IPatient) {
    console.debug("PatientService.create");
    return this.http.post(`${this.baseUrl}/patients/`, patient)
      .map(res => res.json())
      .flatMap((p:IPatient) => {
        console.log("Create success response="+JSON.stringify(p));
        let patientId = p.id;
        console.log("patientId:" + patientId);
        let phoneApi = this.createPhone(patientId, patient.phones);
        let contactApi = this.createContact(patientId, patient.contacts);
        return Observable.forkJoin(phoneApi, contactApi).map(res => {
          console.log("Create success response child="+JSON.stringify(res));
          return res;
        });
      })
      .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }

  update(patientId: string, patient: IPatient) {
    console.debug("PatientService.create");
    return this.http.put(`${this.baseUrl}/patients/${patientId}`, patient)
      .map(response => {
        console.log("Create success response="+JSON.stringify(response));
        return response.json();
      })
      .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }

  delete(patientId: string) {
    console.debug("PatientService.delete");
    return this.http.delete(`${this.baseUrl}/patients/${patientId}`)
      .map(response => {
        console.log("Create success response="+JSON.stringify(response));
        return response;
      })
      .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }

  createPhone(patientId: string, phones: IPhone[]) {
    console.debug("PatientService.createPhone");
    return this.http.post(`${this.baseUrl}/patients/${patientId}/phones`, phones)
      .map(response => {
        console.log("Create success response="+JSON.stringify(response));
        return response;
      })
      .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }

  createContact(patientId: string, contacts: IContact[]) {
    console.debug("PatientService.createContact");
    return this.http.post(`${this.baseUrl}/patients/${patientId}/contacts`, contacts)
      .map(response => {
        console.log("Create success response="+JSON.stringify(response));
        return response;
      })
      .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }
}
