// Phone model
export interface IPhone {
  id: string,
  patientId: string,
  number: number,
  type: string,
  extension: number,
  carrier: string
}

class Phone implements IPhone {
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
  specialty: string,
  phone: number,
  email: string,
  isEmergencyContact: boolean
}

class Contact implements IContact {
  id: string;
  patientId: string;
  firstName: string;
  lastName: string;
  type: string;
  specialty: string;
  phone: number;
  email: string;
  isEmergencyContact: boolean;
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
  name: string,
  sequence: number,
}

// CarePlan Tasks for care plan model
export interface ICarePlanTask {
  sequence: number,
  key: number,
  description: string,
  enabled: boolean
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
  tasks: [ICarePlanTask]
}

class CarePlan implements ICarePlan {
  id: string;
  name: string;
  startDate: Date;
  endDate: Date;
  discipline: string;
  createdBy: string;
  createDate: Date;
  updatedBy: string;
  updateDate: Date;
  tasks: [ICarePlanTask];
}
