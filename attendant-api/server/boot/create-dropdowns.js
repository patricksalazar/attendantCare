const async = require('async');
module.exports = function(app) {
  // data sources
  var attDS = app.dataSources.attendant;

  // create all models
  async.parallel({
    dropdowns: async.apply(createDropdowns)
  }, function (err, results) {
    if (err) throw err;
    console.log("created dropdowns");
  } );

  // create dropdowns
  function createDropdowns(cb) {
    attDS.automigrate('Dropdown', function (err) {
      if (err) return cb(err);
      let Dropdown = app.models.Dropdown;
      Dropdown.create([{
        selector: 'CarePlan',
        group: 'Bathing',
        sequence: 1.1,
        code: 101,
        description: 'Total assist with bathing'
      }, {
        selector: 'CarePlan',
        group: 'Bathing',
        sequence: 1.2,
        code: 102,
        description: 'Assist with bathing'
      }, {
        selector: 'CarePlan',
        group: 'Bathing',
        sequence: 1.3,
        code: 103,
        description: 'Partial assist with bathing'
      }, {
        selector: 'CarePlan',
        group: 'Bathing',
        sequence: 1.4,
        code: 104,
        description: 'Standby assist with bathing'
      }, {
        selector: 'CarePlan',
        group: 'Bathing',
        sequence: 1.5,
        code: 105,
        description: 'Independent with bathing'
      }, {
        selector: 'CarePlan',
        group: 'Dressing - Upper',
        sequence: 2.1,
        code: 121,
        description: 'Total assist with upper dressing'
      }, {
        selector: 'CarePlan',
        group: 'Dressing - Upper',
        sequence: 2.2,
        code: 122,
        description: 'Assist with upper dressing'
      }, {
        selector: 'CarePlan',
        group: 'Dressing - Upper',
        sequence: 2.3,
        code: 123,
        description: 'Partial assist with upper dressing'
      }, {
        selector: 'CarePlan',
        group: 'Dressing - Upper',
        sequence: 2.4,
        code: 124,
        description: 'Standby assist with upper dressing'
      }, {
        selector: 'CarePlan',
        group: 'Dressing - Upper',
        sequence: 2.5,
        code: 125,
        description: 'Independent with upper dressing'
      }, {
        selector: 'CarePlan',
        group: 'Dressing - Lower',
        sequence: 3.1,
        code: 131,
        description: 'Total assist with lower dressing'
      }, {
        selector: 'CarePlan',
        group: 'Dressing - Lower',
        sequence: 3.2,
        code: 132,
        description: 'Assist with lower dressing'
      }, {
        selector: 'CarePlan',
        group: 'Dressing - Lower',
        sequence: 3.3,
        code: 133,
        description: 'Partial assist with lower dressing'
      }, {
        selector: 'CarePlan',
        group: 'Dressing - Lower',
        sequence: 3.4,
        code: 134,
        description: 'Standby assist with lower dressing'
      }, {
        selector: 'CarePlan',
        group: 'Dressing - Lower',
        sequence: 3.5,
        code: 135,
        description: 'Independent with lower dressing'
      }, {
        selector: 'CarePlan',
        group: 'Ambulation',
        sequence: 4.1,
        code: 141,
        description: 'Independent in walking'
      }, {
        selector: 'CarePlan',
        group: 'Ambulation',
        sequence: 4.2,
        code: 142,
        description: 'Use wheelchair and independent'
      }, {
        selector: 'CarePlan',
        group: 'Ambulation',
        sequence: 4.3,
        code: 143,
        description: 'Use wheelchair and help maneuver'
      }, {
        selector: 'CarePlan',
        group: 'Ambulation',
        sequence: 4.4,
        code: 144,
        description: 'Perform pressure release'
      }], cb);
    });
  }

}
