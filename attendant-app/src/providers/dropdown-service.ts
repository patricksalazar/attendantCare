import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';

// import { lbServices } from './lb-services';
import { IDropdown } from '../models/models';

/*
  Generated class for the PatientService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class DropdownService {
  baseUrl = 'http://localhost:3000/api';
  limit = 10;

  constructor(public http: Http) {
    console.log('Hello DropdownService Provider');
  }

  headers = new Headers({
     'Content-Type': 'application/json',
    //  'Authorization': this.authService.getToken(),
   });

  // Load all Patients
  findAll(): Observable<IDropdown[]> {
    let query = { limit: 10 }
    const filter = encodeURI(JSON.stringify(query));
    return this.http.get(`${this.baseUrl}/dropdown?filter=${filter}`).map(res => <IDropdown[]>res.json());
  }

  findBySelector(selector: string, group: string): Observable<IDropdown[]> {
    console.debug("DropdownService.findBySelector: "+selector + ", group:" + group);
    let query = {
      where: {
        selector: selector,
      },
      order: [
        'groupSequence ASC',
        'sequence ASC',
      ]
    };
    if (group) query.where["group"] = group;
    const filter = encodeURI(JSON.stringify(query));
    return this.http.get(`${this.baseUrl}/dropdown?filter=${filter}`).map(res => {
      return <IDropdown[]>res.json();
    });
  }

  findAllSelectors(selectors: string[]): Observable<IDropdown[]> {
    console.debug("DropdownService.findAllSelectors: "+selectors);
    let query = {
      where: {
        selector: { inq: selectors }
      },
      order: [
        'groupSequence ASC',
        'sequence ASC',
      ]
    }
    const filter = encodeURI(JSON.stringify(query));
    return this.http.get(`${this.baseUrl}/dropdown?filter=${filter}`).map(res => {
      return <IDropdown[]>res.json();
    });
  }

  create(dropdown: IDropdown) {
    console.debug("DropdownService.create");
    return this.http.post(`${this.baseUrl}/dropdown/`, dropdown)
      .map(response => {
        console.log("Create success response="+JSON.stringify(response.json()));
        return response;
      })
      .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }

  update(dropdown: IDropdown) {
    console.debug("DropdownService.update: " + dropdown.id);
    return this.http.put(`${this.baseUrl}/dropdown/${dropdown.id}`, dropdown)
      .map(response => {
        console.log("Create success response="+JSON.stringify(response));
        return response;
      })
      .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }

  delete(dropdown: IDropdown) {
    console.debug("DropdownService.delete: " + dropdown.id);
    return this.http.delete(`${this.baseUrl}/dropdown/${dropdown.id}`)
      .map(response => {
        console.log("Delete success response="+JSON.stringify(response));
        return response;
      })
      .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }
}
