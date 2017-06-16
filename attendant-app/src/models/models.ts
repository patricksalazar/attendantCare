// Dropdown
export interface IDropdown {
  id: string,
  selector: string,
  group: string,
  groupSequence: number,
  sequence: number,
  code: string,
  description: string,
  enabled: boolean
}

export class Dropdown implements IDropdown {
  id: string;
  selector: string;
  group: string;
  groupSequence: number;
  sequence: number;
  code: string;
  description: string;
  enabled: boolean;
}

// Phone model
export interface IPhone {
  id: string,
  patientId: string,
  number: number,
  type: string,
  extension: number,
  carrier: string
}

export class Phone implements IPhone {
  id: string;
  patientId: string;
  number: number;
  type: string;
  extension: number;
  carrier: string;
}

// Contact model
export interface IContact {
  id: string,
  patientId: string,
  firstName: string,
  lastName: string,
  type: string,
  company: string,
  title: string,
  npi: string,
  phone: number,
  email: string,
  isEmergencyContact: boolean,
  isPowerOfAttorney: boolean
}

export class Contact implements IContact {
  id: string;
  patientId: string;
  firstName: string;
  lastName: string;
  type: string;
  company: string;
  title: string;
  npi: string;
  phone: number;
  email: string;
  isEmergencyContact: boolean;
  isPowerOfAttorney: boolean;
}

// Patient model
export interface IPatient {
  id: string,
  firstName: string,
  lastName: string,
  fullAddress: string,
  geoloc: {
    lat: number,
    lng: number
  },
  email: string,
  admitDate: Date,
  birthDate: Date,
  priority: number,
  memberId: string,
  groupId: string,
  phones: [IPhone],
  contacts: [IContact]
}

export class Patient implements IPatient {
  id: string;
  firstName: string;
  lastName: string;
  fullAddress: string;
  geoloc: {
    lat: number;
    lng: number
  };
  email: string;
  admitDate: Date;
  birthDate: Date;
  priority: number;
  memberId: string;
  groupId: string;
  phones: [IPhone];
  contacts: [IContact];
}

// CarePlan Groups for care plan model
export interface ICarePlanGroup {
  id: string,
  code: string,
  name: string,
  sequence: number,
  tasks: [ICarePlanTask]
}

export class CarePlanGroup implements ICarePlanGroup {
  id: string;
  code: string;
  name: string;
  sequence: number;
  tasks: [ICarePlanTask];
}

// CarePlan Tasks for care plan model
export interface ICarePlanTask {
  id: string,
  sequence: number,
  key: number,
  description: string,
  enabled: boolean
}

export class CarePlanTask implements ICarePlanTask {
  id: string;
  sequence: number;
  key: number;
  description: string;
  enabled: boolean;
}

// CarePlan model
export interface ICarePlan {
  id: string,
  name: string,
  startDate: Date,
  endDate: Date,
  discipline: string,
  createdBy: string,
  createDate: Date,
  updatedBy: string,
  updateDate: Date,
  patientId: string,
  groups: [ICarePlanGroup]
}

export class CarePlan implements ICarePlan {
  id: string;
  name: string;
  startDate: Date;
  endDate: Date;
  discipline: string;
  createdBy: string;
  createDate: Date;
  updatedBy: string;
  updateDate: Date;
  patientId: string;
  groups: [ICarePlanGroup];
}
