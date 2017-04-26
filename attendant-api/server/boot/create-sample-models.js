const async = require('async');
module.exports = function(app) {
  // data sources
  var attDS = app.dataSources.attendant;

  // create all models
  async.parallel({
    patients: async.apply(createPatients),
    companies: async.apply(createCompanies)
  }, function (err, results) {
    if (err) throw err;
    console.log("created patients and companies");
    async.parallel({
      contacts: async.apply(createContacts, results.patients),
      phones: async.apply(createPhones, results.patients),
      careplan: async.apply(createCarePlan, results.patients)
    }, function(err, results) {
      if (err) throw err;
      createCarePlanTasks(results.careplan, function(err) {
        console.log('> models created successfully.');
      });
    });
  } );

  // create companies
  function createPatients(cb) {
    attDS.automigrate('Patient', function (err) {
      if (err) return cb(err);
      let Patient = app.models.Patient;
      Patient.create([{
        firstName: 'John',
        lastName: 'Doe',
        fullAddress: '27500 Novi Rd, Novi, MI 48377',
        geoloc: {
          lat: 42.492093,
          lng: -83.470182
        },
        admitDate: new Date('January 1, 2010 00:00:00'),
        birthDate: new Date('April 1, 1950 00:00:00'),
        priority: 2,
        memberId: 'AAA123456',
        groupId: '12345'
      }, {
        firstName: 'Pesty',
        lastName: 'Patient',
        fullAddress: '2800 W Big Beaver Rd, Troy, MI 48084',
        geoloc: {
          lat: 42.562840,
          lng: -83.184157
        },
        admitDate: new Date('August 10, 2012 00:00:00'),
        birthDate: new Date('September 9, 1975 00:00:00'),
        priority: 1,
        memberId: 'ABC654321',
        groupId: '12345'
      }, {
        firstName: 'Fred',
        lastName: 'Frank',
        fullAddress: '18900 Michigan Ave, Dearborn, MI 48126',
        geoloc: {
          lat: 42.316686,
          lng: -83.22819
        },
        admitDate: new Date('June 6, 2014 00:00:00'),
        birthDate: new Date('November 15, 1945 00:00:00'),
        priority: 2,
        memberId: 'XYZ987654',
        groupId: '55555'
      }], cb);
    });
  }

  // create companies
  function createCompanies(cb) {
    attDS.automigrate('Company', function (err) {
      if (err) return cb(err);
      let Company = app.models.Company;
      Company.create([{
        name: 'Franks Family',
        type: 'family',
        fullAddress: '2800 W Big Beaver Rd., Troy, MI 48084',
        ein: 123456789,
        phone: 2485550100,
        fax: 2485550105
      }, {
        name: 'Auto Insurance',
        type: 'payer',
        fullAddress: '600 E Lafayette Blvd, Detroit, MI 48226',
        ein: 999999999,
        phone: 3135550100,
        fax: 3135550105
      }, {
        name: 'Home Care',
        type: 'homecare',
        fullAddress: '26000 Evergreen Rd, Southfield, MI 48076',
        ein: 555555555,
        phone: 2485550400,
        fax: 2485550405
      }, {
        name: 'Case Manager',
        type: 'casemanager',
        fullAddress: '28400 Telegraph Rd, Southfield, MI 48034',
        ein: 777777777,
        phone: 2485550700,
        fax: 2485550705
      }], cb);
    });
  }

  // create contacts
  function createContacts(patients, cb) {
    attDS.automigrate('Contact', function(err) {
      if (err) return cb(err);
      let Contact = app.models.Contact;
      Contact.create([{
        firstName: 'Jane',
        lastName: 'Doe',
        type: 'personal',
        specialty: 'spouse',
        email: 'janedoe@yahoo.com',
        isEmergencyContact: true,
        patientId: patients[0].id
      }, {
        firstName: 'Paul',
        lastName: 'Patient',
        type: 'personal',
        specialty: 'spouse',
        email: 'ppatient@gmail.com',
        patientId: patients[1].id
      }, {
        firstName: 'Francine',
        lastName: 'Frank',
        type: 'personal',
        specialty: 'spouse',
        email: 'ffrank@test.com',
        isEmergencyContact: true,
        patientId: patients[2].id
      }, {
        firstName: 'Patrick',
        lastName: 'Primary',
        type: 'physician',
        specialty: 'PCP',
        email: 'pprimary@hospital.com',
        patientId: patients[0].id
      }, {
        firstName: 'Ronald',
        lastName: 'Rehab',
        type: 'physician',
        specialty: 'PM&R',
        email: 'rrehab@hospital.com',
        patientId: patients[0].id
      }, {
        firstName: 'Charles',
        lastName: 'Care',
        type: 'physician',
        specialty: 'PCP',
        email: 'ccare@yahoo.com',
        patientId: patients[1].id
      }, {
        firstName: 'Phyllis',
        lastName: 'Physician',
        type: 'physician',
        specialty: 'PCP',
        email: 'pphysician@hospital.com',
        patientId: patients[2].id
      }, {
        firstName: 'Carol',
        lastName: 'Cardio',
        type: 'physician',
        specialty: 'Cardio',
        email: 'ccardio@gmail.com',
        patientId: patients[2].id
      }, {
        firstName: 'Alex',
        lastName: 'Auto',
        type: 'adjustor',
        email: 'aauto@insurance.com',
        patientId: patients[0].id
      }, {
        firstName: 'Amy',
        lastName: 'Auto',
        type: 'adjustor',
        email: 'amyauto@insurance.com',
        patientId: patients[1].id
      }, {
        firstName: 'Andrew',
        lastName: 'Adjustor',
        type: 'adjustor',
        email: 'adjustor@insurance.com',
        patientId: patients[2].id
      }, {
        firstName: 'Carol',
        lastName: 'Case',
        type: 'casemanager',
        email: 'ccase@casemgmt.com',
        patientId: patients[0].id
      }, {
        firstName: 'Carol',
        lastName: 'Case',
        type: 'casemanager',
        email: 'ccase@casemgmt.com',
        patientId: patients[1].id
      }, {
        firstName: 'Chelsea',
        lastName: 'Chelsea',
        type: 'casemanager',
        email: 'chelsea@gmail.com',
        patientId: patients[2].id
      }], cb);
    });
  }

  // create phone
  function createPhones(patients, cb) {
      attDS.automigrate('Phone', function(err) {
        if (err) return cb(err);
        let Phone = app.models.Phone;
        Phone.create([{
          number: 2485550100,
          type: 'home',
          patientId: patients[0].id
        }, {
          number: 3135558000,
          type: 'mobile',
          patientId: patients[1].id
        }, {
          number: 8105559999,
          type: 'home',
          patientId: patients[2].id
        }], cb);
      });
  }

  // create care plan
  function createCarePlan(patients, cb) {
      attDS.automigrate('CarePlan', function(err) {
        if (err) return cb(err);
        let CarePlan = app.models.CarePlan;
        CarePlan.create([{
          name: 'John Doe\'s Care Plan',
          startDate: new Date('April 1, 2017 00:00:00'),
          discipline: 'HHA',
          createdBy: 'test',
          createDate: new Date(),
          updatedBy: 'test',
          updateDate: new Date(),
          patientId: patients[0].id
        }, {
          name: 'Pesty Patient\'s Care Plan',
          startDate: new Date('April 20, 2017 00:00:00'),
          discipline: 'HHA',
          createdBy: 'test',
          createDate: new Date(),
          updatedBy: 'test',
          updateDate: new Date(),
          patientId: patients[1].id
        }, {
          name: 'Fred Frank\'s Care Plan',
          startDate: new Date('April 24, 2017 00:00:00'),
          discipline: 'HHA',
          createdBy: 'test',
          createDate: new Date(),
          updatedBy: 'test',
          updateDate: new Date(),
          patientId: patients[2].id
        }], cb);
      });
  }

  // create care plan
  function createCarePlanTasks(careplan, cb) {
      attDS.automigrate('CarePlanTask', function(err) {
        if (err) return cb(err);
        let CarePlanTask = app.models.CarePlanTask;
        CarePlanTask.create([{
          group: 'Bathing',
          groupSequence: 1,
          sequence: 1.1,
          taskId: 101,
          taskDescription: 'Total assist with bathing',
          carePlanId: careplan[0].id
        }, {
          group: 'Bathing',
          groupSequence: 1,
          sequence: 1.2,
          taskId: 102,
          taskDescription: 'Assist with bathing',
          carePlanId: careplan[0].id
        }, {
          group: 'Dressing - Upper',
          groupSequence: 2,
          sequence: 2.1,
          taskId: 121,
          taskDescription: 'Total assist with upper dressing',
          carePlanId: careplan[0].id
        }, {
          group: 'Dressing - Upper',
          groupSequence: 2,
          sequence: 2.2,
          taskId: 122,
          taskDescription: 'Assist with upper dressing',
          carePlanId: careplan[0].id
        }, {
          group: 'Dressing - Lower',
          groupSequence: 3,
          sequence: 3.2,
          taskId: 132,
          taskDescription: 'Assist with lower dressing',
          carePlanId: careplan[0].id
        }, {
          group: 'Dressing - Lower',
          groupSequence: 3,
          sequence: 3.3,
          taskId: 133,
          taskDescription: 'Partial assist with lower dressing',
          carePlanId: careplan[0].id
        }, {
          group: 'Ambulation',
          groupSequence: 4,
          sequence: 4.3,
          taskId: 143,
          taskDescription: 'Use wheelchair and help maneuver',
          carePlanId: careplan[0].id
        }, {
          group: 'Ambulation',
          groupSequence: 4,
          sequence: 4.4,
          taskId: 144,
          taskDescription: 'Perform pressure release',
          carePlanId: careplan[0].id
        }, {
          group: 'Bathing',
          groupSequence: 1,
          sequence: 1.2,
          taskId: 102,
          taskDescription: 'Assist with bathing',
          carePlanId: careplan[1].id
        }, {
          group: 'Bathing',
          groupSequence: 1,
          sequence: 1.3,
          taskId: 103,
          taskDescription: 'Partial assist with bathing',
          carePlanId: careplan[1].id
        }, {
          group: 'Dressing - Upper',
          groupSequence: 2,
          sequence: 2.2,
          taskId: 122,
          taskDescription: 'Assist with upper dressing',
          carePlanId: careplan[1].id
        }, {
          group: 'Dressing - Upper',
          groupSequence: 2,
          sequence: 2.3,
          taskId: 123,
          taskDescription: 'Partial assist with upper dressing',
          carePlanId: careplan[1].id
        }, {
          group: 'Dressing - Lower',
          groupSequence: 3,
          sequence: 3.3,
          taskId: 133,
          taskDescription: 'Partial assist with lower dressing',
          carePlanId: careplan[1].id
        }, {
          group: 'Dressing - Lower',
          groupSequence: 3,
          sequence: 3.4,
          taskId: 134,
          taskDescription: 'Standby assist with lower dressing',
          carePlanId: careplan[1].id
        }, {
          group: 'Ambulation',
          groupSequence: 4,
          sequence: 4.2,
          taskId: 142,
          taskDescription: 'Use wheelchair and independent',
          carePlanId: careplan[1].id
        }, {
          group: 'Ambulation',
          groupSequence: 4,
          sequence: 4.3,
          taskId: 143,
          taskDescription: 'Use wheelchair and help maneuver',
          carePlanId: careplan[1].id
        }, {
          group: 'Bathing',
          groupSequence: 1,
          sequence: 1.4,
          taskId: 104,
          taskDescription: 'Standby assist with bathing',
          carePlanId: careplan[0].id
        }, {
          group: 'Bathing',
          groupSequence: 1,
          sequence: 1.5,
          taskId: 105,
          taskDescription: 'Independent with bathing',
          carePlanId: careplan[0].id
        }, {
          group: 'Dressing - Upper',
          groupSequence: 2,
          sequence: 2.3,
          taskId: 123,
          taskDescription: 'Partial assist with upper dressing',
          carePlanId: careplan[0].id
        }, {
          group: 'Dressing - Upper',
          groupSequence: 2,
          sequence: 2.4,
          taskId: 124,
          taskDescription: 'Standby assist with upper dressing',
          carePlanId: careplan[0].id
        }, {
          group: 'Dressing - Upper',
          groupSequence: 2,
          sequence: 2.5,
          taskId: 125,
          taskDescription: 'Independent with upper dressing',
          carePlanId: careplan[0].id
        }, {
          group: 'Dressing - Lower',
          groupSequence: 3,
          sequence: 3.4,
          taskId: 134,
          taskDescription: 'Standby assist with lower dressing',
          carePlanId: careplan[0].id
        }, {
          group: 'Dressing - Lower',
          groupSequence: 3,
          sequence: 3.5,
          taskId: 135,
          taskDescription: 'Independent with lower dressing',
          carePlanId: careplan[0].id
        }, {
          group: 'Ambulation',
          groupSequence: 4,
          sequence: 4.1,
          taskId: 141,
          taskDescription: 'Independent in walking',
          carePlanId: careplan[0].id
        }, {
          group: 'Ambulation',
          groupSequence: 4,
          sequence: 4.4,
          taskId: 144,
          taskDescription: 'Perform pressure release',
          carePlanId: careplan[0].id
        }], cb);
      });
  }

}
