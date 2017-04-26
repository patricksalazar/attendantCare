// Patient model
export interface Patient {
  id: string,
  firstName: string,
  lastName: string,
  fullAddress: string,
  geoloc: {
    lat: number,
    lng: number
  },
  admitDate: Date,
  birthDate: Date,
  priority: number,
  memberId: string,
  groupId: string
}
