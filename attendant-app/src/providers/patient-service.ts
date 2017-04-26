import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';

// import { lbServices } from './lb-services';
import { Patient } from '../models/models';

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

  // Load all Patients
  load(): Observable<Patient[]> {
    let query = { limit: 10 }
    const filter = encodeURI(JSON.stringify(query));
    return this.http.get(`${this.baseUrl}/patients?filter=${filter}`).map(res => <Patient[]>res.json());
  }

  // Search for Patients
  search(queryParam: string): Observable<Patient[]> {
    let query = {
      where: {
        or: [
          {firstName: {like: queryParam, options: "i"}},
          {lastName: {like: queryParam, options: "i"}}
        ]
      },
      limit: 10
    };

    let filter = encodeURI(JSON.stringify(query));
    return this.http.get(`${this.baseUrl}/patients?filter=${filter}`).map(res => <Patient[]>res.json());
  }

}
