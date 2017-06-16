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
      Dropdown.create([...createCarePlanGroups(), ...createCarePlanTasks()], cb);
    });
  }

  // create care plan groups
  function createCarePlanGroups() {
    return [{
      selector: 'CPGroups',
      sequence: 10,
      code: "Bathing",
      description: 'Bathing'
    }, {
      selector: 'CPGroups',
      sequence: 11,
      code: "BathingTransfer",
      description: 'Bathing transfer'
    }, {
      selector: 'CPGroups',
      sequence: 12,
      code: "DressLower",
      description: 'Dress Lower'
    }, {
      selector: 'CPGroups',
      sequence: 13,
      code: "DressUpper",
      description: 'Dress Upper'
    }, {
      selector: 'CPGroups',
      sequence: 14,
      code: "Grooming",
      description: 'Grooming'
    }, {
      selector: 'CPGroups',
      sequence: 15,
      code: "ToiletHygiene",
      description: 'Toileting Hygiene'
    }, {
      selector: 'CPGroups',
      sequence: 16,
      code: "ToiletTransfer",
      description: 'Toilet Transfer'
    }, {
      selector: 'CPGroups',
      sequence: 20,
      code: "Ambulation",
      description: 'Ambulation'
    }, {
      selector: 'CPGroups',
      sequence: 23,
      code: "Transferring",
      description: 'Transferring'
    }, {
      selector: 'CPGroups',
      sequence: 25,
      code: "Exercise",
      description: 'Exercise'
    }, {
      selector: 'CPGroups',
      sequence: 30,
      code: "Bladder",
      description: 'Bladder'
    }, {
      selector: 'CPGroups',
      sequence: 31,
      code: "BladderUrine",
      description: 'Bladder - Urine'
    }, {
      selector: 'CPGroups',
      sequence: 40,
      code: "BowelProgram",
      description: 'Bowel Program'
    }, {
      selector: 'CPGroups',
      sequence: 42,
      code: "BowelColostomy",
      description: 'Bowel - Colostomy'
    }, {
      selector: 'CPGroups',
      sequence: 50,
      code: "Cognitive",
      description: 'Cognitive'
    }, {
      selector: 'CPGroups',
      sequence: 51,
      code: "Behavior",
      description: 'Behavior'
    }, {
      selector: 'CPGroups',
      sequence: 60,
      code: "Nutrition",
      description: 'Nutrition'
    }, {
      selector: 'CPGroups',
      sequence: 61,
      code: "MealPlan",
      description: 'Meal Plan'
    }, {
      selector: 'CPGroups',
      sequence: 70,
      code: "Housekeeping",
      description: 'Light Housekeeping'
    }, {
      selector: 'CPGroups',
      sequence: 80,
      code: "Medications",
      description: 'Medications'
    }, {
      selector: 'CPGroups',
      sequence: 81,
      code: "Vitals",
      description: 'Monitor Vitals'
    }, {
      selector: 'CPGroups',
      sequence: 82,
      code: "FallPrecaution",
      description: 'Fall Precaution'
    }, {
      selector: 'CPGroups',
      sequence: 83,
      code: "Orthotics",
      description: 'Orthotics'
    }, {
      selector: 'CPGroups',
      sequence: 84,
      code: "Skin",
      description: 'Skin\\Wounds'
    }, {
      selector: 'CPGroups',
      sequence: 85,
      code: "IO",
      description: 'Input & Output'
    }, {
      selector: 'CPGroups',
      sequence: 86,
      code: "TubeFeeding",
      description: 'Tube Feeding'
    }, {
      selector: 'CPGroups',
      sequence: 87,
      code: "Respiratory",
      description: 'Respiratory'
    }, {
      selector: 'CPGroups',
      sequence: 88,
      code: "Seizures",
      description: 'Seizures'
    }, {
      selector: 'CPGroups',
      sequence: 89,
      code: "Emergency",
      description: 'Emergency'
    }, {
      selector: 'CPGroups',
      sequence: 99,
      code: "Injury",
      description: 'Injury'
    }];
  }

  // create care plan groups
  function createCarePlanTasks() {
    return [{
      selector: 'CPTasks',
      groupSequence: 10,
      group: "Bathing",
      sequence: 100,
      code: 'BathingIndependent',
      description: 'Independent with bathing'
    }, {
      selector: 'CPTasks',
      groupSequence: 10,
      group: "Bathing",
      sequence: 101,
      code: 'BathingPartialAssist',
      description: 'Partial assist with bathing; wash difficult areas'
    }, {
      selector: 'CPTasks',
      groupSequence: 10,
      group: "Bathing",
      sequence: 102,
      code: 'BathingAssist',
      description: 'Assist with bathing'
    }, {
      selector: 'CPTasks',
      groupSequence: 10,
      group: "Bathing",
      sequence: 103,
      code: 'BathingSupplies',
      description: 'Set up all necessary supplies for bathing'
    }, {
      selector: 'CPTasks',
      groupSequence: 10,
      group: "Bathing",
      sequence: 104,
      code: 'BathingStandby',
      description: 'Standby assist with bathing'
    }, {
      selector: 'CPTasks',
      groupSequence: 10,
      group: "Bathing",
      sequence: 105,
      code: 'BathingBed',
      description: 'Complete bed bath'
    }, {
      selector: 'CPTasks',
      groupSequence: 10,
      group: "Bathing",
      sequence: 107,
      code: 'BathingSupervise',
      description: 'Supervise client with bathing'
    }, {
      selector: 'CPTasks',
      groupSequence: 10,
      group: "Bathing",
      sequence: 900,
      code: 'BathingRefusal',
      description: 'Refused bed bath'
    }, {
      selector: 'CPTasks',
      groupSequence: 11,
      group: "BathingTransfer",
      sequence: 110,
      code: 'BathingTransferStandby',
      description: 'Standby assist in and out of bath'
    }, {
      selector: 'CPTasks',
      groupSequence: 11,
      group: "BathingTransfer",
      sequence: 111,
      code: 'BathingTransferAssist',
      description: 'Assist in and out of bath'
    }, {
      selector: 'CPTasks',
      groupSequence: 12,
      group: "DressLower",
      sequence: 120,
      code: 'DressLowerIndependent',
      description: 'Independent in dressing lower body'
    }, {
      selector: 'CPTasks',
      groupSequence: 12,
      group: "DressLower",
      sequence: 121,
      code: 'DressLowerLay',
      description: 'Lay out or hand clothes'
    }, {
      selector: 'CPTasks',
      groupSequence: 12,
      group: "DressLower",
      sequence: 122,
      code: 'DressLowerAssist',
      description: 'Assist in dressing lower body'
    }, {
      selector: 'CPTasks',
      groupSequence: 12,
      group: "DressLower",
      sequence: 123,
      code: 'DressLowerTotal',
      description: 'Total assist in dressing lower body'
    }, {
      selector: 'CPTasks',
      groupSequence: 13,
      group: "DressUpper",
      sequence: 130,
      code: 'DressUpperIndependent',
      description: 'Independent in dressing upper body'
    }, {
      selector: 'CPTasks',
      groupSequence: 13,
      group: "DressUpper",
      sequence: 131,
      code: 'DressUpperLay',
      description: 'Lay out or hand clothes'
    }, {
      selector: 'CPTasks',
      groupSequence: 13,
      group: "DressUpper",
      sequence: 132,
      code: 'DressUpperAssist',
      description: 'Assist in dressing upper body'
    }, {
      selector: 'CPTasks',
      groupSequence: 13,
      group: "DressUpper",
      sequence: 133,
      code: 'DressUpperTotal',
      description: 'Total assist in dressing upper body'
    }, {
      selector: 'CPTasks',
      groupSequence: 14,
      group: "Grooming",
      sequence: 140,
      code: 'GroomingIndependent',
      description: 'Independent with grooming'
    }, {
      selector: 'CPTasks',
      groupSequence: 14,
      group: "Grooming",
      sequence: 141,
      code: 'GroomingSetup',
      description: 'Setup grooming utensils within reach'
    }, {
      selector: 'CPTasks',
      groupSequence: 14,
      group: "Grooming",
      sequence: 142,
      code: 'GroomingAssist',
      description: 'Assist with grooming'
    }, {
      selector: 'CPTasks',
      groupSequence: 14,
      group: "Grooming",
      sequence: 143,
      code: 'GroomingTotal',
      description: 'Total assist with grooming'
    }, {
      selector: 'CPTasks',
      groupSequence: 15,
      group: "ToiletHygiene",
      sequence: 150,
      code: 'ToiletHygieneIndependent',
      description: 'Independent with toileting hygiene'
    }, {
      selector: 'CPTasks',
      groupSequence: 15,
      group: "ToiletHygiene",
      sequence: 151,
      code: 'ToiletHygieneSupplies',
      description: 'Setup supplies to do toilet hygiene'
    }, {
      selector: 'CPTasks',
      groupSequence: 15,
      group: "ToiletHygiene",
      sequence: 152,
      code: 'ToiletHygieneTotal',
      description: 'Total assist with toileting hygiene'
    }, {
      selector: 'CPTasks',
      groupSequence: 16,
      group: "ToiletTransfer",
      sequence: 160,
      code: 'ToiletTransferIndependent',
      description: 'Independent with toilet transfer'
    }, {
      selector: 'CPTasks',
      groupSequence: 16,
      group: "ToiletTransfer",
      sequence: 161,
      code: 'ToiletTransferStandby',
      description: 'Standby assist with toilet transfer'
    }, {
      selector: 'CPTasks',
      groupSequence: 16,
      group: "ToiletTransfer",
      sequence: 162,
      code: 'ToiletTransferAssist',
      description: 'Assist with toilet transfer'
    }, {
      selector: 'CPTasks',
      groupSequence: 16,
      group: "ToiletTransfer",
      sequence: 161,
      code: 'ToiletTransferTotal',
      description: 'Total Assist with toilet transfer'
    }, {
      selector: 'CPTasks',
      groupSequence: 20,
      group: "Ambulation",
      sequence: 200,
      code: 'AmbulationIndependent',
      description: 'Independent in walking including stairs'
    }, {
      selector: 'CPTasks',
      groupSequence: 20,
      group: "Ambulation",
      sequence: 201,
      code: 'AmbulationWithDevice',
      description: 'Independent in walking with assistive device'
    }, {
      selector: 'CPTasks',
      groupSequence: 20,
      group: "Ambulation",
      sequence: 202,
      code: 'AmbulationStandby',
      description: 'Standby assist while ambulating'
    }, {
      selector: 'CPTasks',
      groupSequence: 20,
      group: "Ambulation",
      sequence: 203,
      code: 'AmbulationStandbyWithDevice',
      description: 'Standby assist with assistive device'
    }, {
      selector: 'CPTasks',
      groupSequence: 20,
      group: "Ambulation",
      sequence: 205,
      code: 'AmbulationHandsOn',
      description: 'Hands on contact done at all times'
    }, {
      selector: 'CPTasks',
      groupSequence: 20,
      group: "Ambulation",
      sequence: 206,
      code: 'AmbulationBedridden',
      description: 'Client is bedridden'
    }, {
      selector: 'CPTasks',
      groupSequence: 20,
      group: "Ambulation",
      sequence: 207,
      code: 'AmbulationRelease',
      description: 'Perform pressure release as ordered'
    }, {
      selector: 'CPTasks',
      groupSequence: 20,
      group: "Ambulation",
      sequence: 210,
      code: 'WheelchairIndependent',
      description: 'Independent with wheelchair'
    }, {
      selector: 'CPTasks',
      groupSequence: 20,
      group: "Ambulation",
      sequence: 211,
      code: 'WheelchairAssist',
      description: 'Assist in moving client with wheelchair'
    }, {
      selector: 'CPTasks',
      groupSequence: 20,
      group: "Ambulation",
      sequence: 212,
      code: 'WheelchairRelease',
      description: 'Independent in doing pressure releases'
    }, {
      selector: 'CPTasks',
      groupSequence: 20,
      group: "Ambulation",
      sequence: 213,
      code: 'WheelchairRemind',
      description: 'Remind client to perform pressure release'
    }, {
      selector: 'CPTasks',
      groupSequence: 23,
      group: "Transferring",
      sequence: 230,
      code: 'TransferIndependent',
      description: 'Independent with transfer'
    }, {
      selector: 'CPTasks',
      groupSequence: 23,
      group: "Transferring",
      sequence: 231,
      code: 'TransferPivot',
      description: 'Pivot transfer'
    }, {
      selector: 'CPTasks',
      groupSequence: 23,
      group: "Transferring",
      sequence: 232,
      code: 'TransferStandby',
      description: 'Standby assist with transfer'
    }, {
      selector: 'CPTasks',
      groupSequence: 23,
      group: "Transferring",
      sequence: 233,
      code: 'TransferTotal',
      description: 'Total assist with transfer'
    }, {
      selector: 'CPTasks',
      groupSequence: 23,
      group: "Transferring",
      sequence: 234,
      code: 'TransferTwoPerson',
      description: '2 person assist transfer'
    }, {
      selector: 'CPTasks',
      groupSequence: 23,
      group: "Transferring",
      sequence: 235,
      code: 'TransferHoyer',
      description: 'Hoyer list transfer'
    }, {
      selector: 'CPTasks',
      groupSequence: 23,
      group: "Transferring",
      sequence: 236,
      code: 'TransferBoard',
      description: 'Transfer board transfer'
    }, {
      selector: 'CPTasks',
      groupSequence: 23,
      group: "Transferring",
      sequence: 237,
      code: 'TransferGaitBelt',
      description: 'Gait belt transfer'
    }, {
      selector: 'CPTasks',
      groupSequence: 25,
      group: "Exercise",
      sequence: 250,
      code: 'ExerciseOutpatient',
      description: 'Accompany to outpatient therapy'
    }, {
      selector: 'CPTasks',
      groupSequence: 25,
      group: "Exercise",
      sequence: 251,
      code: 'ExerciseAssist',
      description: 'Assist with home exercise program'
    }, {
      selector: 'CPTasks',
      groupSequence: 25,
      group: "Exercise",
      sequence: 252,
      code: 'ExerciseSupervise',
      description: 'Supervise client with home exercise program'
    }, {
      selector: 'CPTasks',
      groupSequence: 25,
      group: "Exercise",
      sequence: 254,
      code: 'ExerciseOutpatient',
      description: 'Perform passive/active ROM'
    }, {
      selector: 'CPTasks',
      groupSequence: 25,
      group: "Exercise",
      sequence: 918,
      code: 'ExerciseRefusal',
      description: 'Client refused home exercise program'
    }, {
      selector: 'CPTasks',
      groupSequence: 30,
      group: "Bladder",
      sequence: 300,
      code: 'SelfCathIndependent',
      description: 'Independent with self catheterization'
    }, {
      selector: 'CPTasks',
      groupSequence: 30,
      group: "Bladder",
      sequence: 301,
      code: 'SelfCathSetup',
      description: 'Setup supplies for self cath'
    }, {
      selector: 'CPTasks',
      groupSequence: 30,
      group: "Bladder",
      sequence: 302,
      code: 'SelfCathInsert',
      description: 'Insert straight catheter'
    }, {
      selector: 'CPTasks',
      groupSequence: 30,
      group: "Bladder",
      sequence: 303,
      code: 'CathClean',
      description: 'Clean catheter and empty urine bag'
    }, {
      selector: 'CPTasks',
      groupSequence: 30,
      group: "Bladder",
      sequence: 304,
      code: 'BladderDiaper',
      description: 'Change diaper and perform pericare'
    }, {
      selector: 'CPTasks',
      groupSequence: 30,
      group: "Bladder",
      sequence: 305,
      code: 'UrostomyIndependent',
      description: 'Independent with urostomy care'
    }, {
      selector: 'CPTasks',
      groupSequence: 31,
      group: "BladderUrine",
      sequence: 306,
      code: 'UrostomySetup',
      description: 'Setup urostomy supplies'
    }, {
      selector: 'CPTasks',
      groupSequence: 30,
      group: "Bladder",
      sequence: 307,
      code: 'UrostomyTotal',
      description: 'Total assist with urostomy care'
    }, {
      selector: 'CPTasks',
      groupSequence: 31,
      group: "Urine",
      sequence: 310,
      code: 'UrineClear',
      description: 'Urine clear, yellow no odor or sediments'
    }, {
      selector: 'CPTasks',
      groupSequence: 31,
      group: "Urine",
      sequence: 901,
      code: 'UrineProblem',
      description: 'Urine cloudy, dark, concentrated or foul smelling'
    }, {
      selector: 'CPTasks',
      groupSequence: 40,
      group: "BowelProgram",
      sequence: 400,
      code: 'BowelIncontinent',
      description: 'Incontinent of bowel'
    }, {
      selector: 'CPTasks',
      groupSequence: 40,
      group: "BowelProgram",
      sequence: 940,
      code: 'BowelConstipated',
      description: 'Constipated - no BM for 3 days'
    }, {
      selector: 'CPTasks',
      groupSequence: 40,
      group: "BowelProgram",
      sequence: 941,
      code: 'BowelWatery',
      description: 'Loose waterystool'
    }, {
      selector: 'CPTasks',
      groupSequence: 40,
      group: "BowelProgram",
      sequence: 942,
      code: 'BowelProgramPoor',
      description: 'Poor result of bowel program'
    }, {
      selector: 'CPTasks',
      groupSequence: 40,
      group: "BowelProgram",
      sequence: 410,
      code: 'BowelDigital',
      description: 'Digital stimulation performed'
    }, {
      selector: 'CPTasks',
      groupSequence: 40,
      group: "BowelProgram",
      sequence: 411,
      code: 'BowelEnema',
      description: 'Gave fleet enema'
    }, {
      selector: 'CPTasks',
      groupSequence: 40,
      group: "BowelProgram",
      sequence: 412,
      code: 'BowelSuppository',
      description: 'Inserted suppository'
    }, {
      selector: 'CPTasks',
      groupSequence: 42,
      group: "Colostomy",
      sequence: 420,
      code: 'ColostomyIndependent',
      description: 'Independent with colostomy'
    }, {
      selector: 'CPTasks',
      groupSequence: 42,
      group: "Colostomy",
      sequence: 421,
      code: 'ColostomySetup',
      description: 'Setup colostomy supplies'
    }, {
      selector: 'CPTasks',
      groupSequence: 42,
      group: "Colostomy",
      sequence: 422,
      code: 'ColostomyTotal',
      description: 'Total assist with colostomy'
    }, {
      selector: 'CPTasks',
      groupSequence: 50,
      group: "Cognitive",
      sequence: 500,
      code: 'CognitiveAlertOriented',
      description: 'Client alert and able to communicate'
    }, {
      selector: 'CPTasks',
      groupSequence: 50,
      group: "Cognitive",
      sequence: 501,
      code: 'CognitiveDisoriented',
      description: 'Client disoriented'
    }, {
      selector: 'CPTasks',
      groupSequence: 50,
      group: "Cognitive",
      sequence: 502,
      code: 'CognitiveAlertNotOriented',
      description: 'Client alert but not able to communicate'
    }, {
      selector: 'CPTasks',
      groupSequence: 50,
      group: "Cognitive",
      sequence: 503,
      code: 'CognitiveConfused',
      description: 'Client communicated in confused manner'
    }, {
      selector: 'CPTasks',
      groupSequence: 50,
      group: "Cognitive",
      sequence: 504,
      code: 'CognitiveForgetful',
      description: 'Client forgetful, needs cues and redirection'
    }, {
      selector: 'CPTasks',
      groupSequence: 50,
      group: "Cognitive",
      sequence: 505,
      code: 'CognitiveDifficult',
      description: 'Client has difficulty in making decisions'
    }, {
      selector: 'CPTasks',
      groupSequence: 50,
      group: "Cognitive",
      sequence: 506,
      code: 'CognitiveUnresponsive',
      description: 'Client unresponsive'
    }, {
      selector: 'CPTasks',
      groupSequence: 51,
      group: "Behavior",
      sequence: 510,
      code: 'BehaviorAgitated',
      description: 'Client agitated, required redirection'
    }, {
      selector: 'CPTasks',
      groupSequence: 51,
      group: "Behavior",
      sequence: 511,
      code: 'BehaviorHallucinating',
      description: 'Client hallucinating but not disruptive'
    }, {
      selector: 'CPTasks',
      groupSequence: 51,
      group: "Behavior",
      sequence: 512,
      code: 'BehaviorImpulsive',
      description: 'Client impulsive - easily redirected'
    }, {
      selector: 'CPTasks',
      groupSequence: 51,
      group: "Behavior",
      sequence: 951,
      code: 'BehaviorCompative',
      description: 'Client was combative'
    }, {
      selector: 'CPTasks',
      groupSequence: 51,
      group: "Behavior",
      sequence: 952,
      code: 'BehaviorDisruptive',
      description: 'Client hallucinating and disruptive'
    }, {
      selector: 'CPTasks',
      groupSequence: 60,
      group: "Nutrition",
      sequence: 600,
      code: 'NutritionIndependent',
      description: 'Independent in eating, meal prep and setup'
    }, {
      selector: 'CPTasks',
      groupSequence: 60,
      group: "Nutrition",
      sequence: 601,
      code: 'NutritionSetup',
      description: 'Assist with meal setup'
    }, {
      selector: 'CPTasks',
      groupSequence: 60,
      group: "Nutrition",
      sequence: 602,
      code: 'NutritionStandby',
      description: 'Standby assist in eating, and meal prep'
    }, {
      selector: 'CPTasks',
      groupSequence: 60,
      group: "Nutrition",
      sequence: 603,
      code: 'NutritionTotal',
      description: 'Total assist in feeding client'
    }, {
      selector: 'CPTasks',
      groupSequence: 60,
      group: "Nutrition",
      sequence: 604,
      code: 'NutritionFeedingTube',
      description: 'Give supplemental nutrients through feeding tube'
    }, {
      selector: 'CPTasks',
      groupSequence: 60,
      group: "Nutrition",
      sequence: 605,
      code: 'NutritionNPO',
      description: 'Nothing by mouth'
    }, {
      selector: 'CPTasks',
      groupSequence: 60,
      group: "Nutrition",
      sequence: 606,
      code: 'NutritionRefusal',
      description: 'Client is unable or unwilling to receive tube feeding'
    }, {
      selector: 'CPTasks',
      groupSequence: 61,
      group: "MealPlan",
      sequence: 610,
      code: 'MealPlanIndependent',
      description: 'Independent in preparing all meals'
    }, {
      selector: 'CPTasks',
      groupSequence: 61,
      group: "MealPlan",
      sequence: 610,
      code: 'MealPlanIndependent',
      description: 'Independent in preparing all meals'
    }, {
      selector: 'CPTasks',
      groupSequence: 61,
      group: "MealPlan",
      sequence: 611,
      code: 'MealPlanAssist',
      description: 'Assist in preparing meals'
    }, {
      selector: 'CPTasks',
      groupSequence: 61,
      group: "MealPlan",
      sequence: 612,
      code: 'MealPlanRedirect',
      description: 'Give cues and direction while preparing meals'
    }, {
      selector: 'CPTasks',
      groupSequence: 61,
      group: "MealPlan",
      sequence: 613,
      code: 'MealPlanForgetful',
      description: 'Client forgetful.  Supervise meal preparation'
    }, {
      selector: 'CPTasks',
      groupSequence: 61,
      group: "MealPlan",
      sequence: 614,
      code: 'MealPlanUnable',
      description: 'Client unable to prepare all meals'
    }, {
      selector: 'CPTasks',
      groupSequence: 70,
      group: "Housekeeping",
      sequence: 700,
      code: 'HousekeepingLinen',
      description: 'Change linens'
    }, {
      selector: 'CPTasks',
      groupSequence: 70,
      group: "Housekeeping",
      sequence: 701,
      code: 'HousekeepingGarbage',
      description: 'Dispose garbage'
    }, {
      selector: 'CPTasks',
      groupSequence: 70,
      group: "Housekeeping",
      sequence: 702,
      code: 'HousekeepingErrands',
      description: 'Perform errands like groceries'
    }, {
      selector: 'CPTasks',
      groupSequence: 70,
      group: "Housekeeping",
      sequence: 703,
      code: 'HousekeepingErrandsNoClient',
      description: 'Perform errands like groceries w/o client'
    }, {
      selector: 'CPTasks',
      groupSequence: 70,
      group: "Housekeeping",
      sequence: 704,
      code: 'HousekeepingLaundry',
      description: 'Clean laundry'
    }, {
      selector: 'CPTasks',
      groupSequence: 70,
      group: "Housekeeping",
      sequence: 705,
      code: 'HousekeepingBathroom',
      description: 'Clean bathroom/empty commode'
    }, {
      selector: 'CPTasks',
      groupSequence: 70,
      group: "Housekeeping",
      sequence: 706,
      code: 'HousekeepingClean',
      description: 'Vaccuum/clean client\'s area'
    }, {
      selector: 'CPTasks',
      groupSequence: 80,
      group: "Medications",
      sequence: 800,
      code: 'MedicationIndependent',
      description: 'Independent in taking meds'
    }, {
      selector: 'CPTasks',
      groupSequence: 80,
      group: "Medications",
      sequence: 801,
      code: 'MedicationSetup',
      description: 'Setup weekly meds'
    }, {
      selector: 'CPTasks',
      groupSequence: 80,
      group: "Medications",
      sequence: 802,
      code: 'MedicationAssist',
      description: 'Assist and remind in taking meds'
    }, {
      selector: 'CPTasks',
      groupSequence: 80,
      group: "BloodThinner",
      sequence: 803,
      code: 'BloodThinnerMonitor',
      description: 'Monitor and observe blood thinner'
    }, {
      selector: 'CPTasks',
      groupSequence: 80,
      group: "BloodThinner",
      sequence: 983,
      code: 'BloodThinnerProblem',
      description: 'Noted bleeding, bruises, bloody nose/urine/stool'
    }, {
      selector: 'CPTasks',
      groupSequence: 81,
      group: "Vitals",
      sequence: 810,
      code: 'VitalsMonitor',
      description: 'Monitor and record vitals'
    }, {
      selector: 'CPTasks',
      groupSequence: 81,
      group: "Vitals",
      sequence: 981,
      code: 'VitalsOutsideRange',
      description: 'Vitals outside range'
    }, {
      selector: 'CPTasks',
      groupSequence: 81,
      group: "BloodSugar",
      sequence: 812,
      code: 'BloodSugarMonitor',
      description: 'Monitor and record blood sugar'
    }, {
      selector: 'CPTasks',
      groupSequence: 81,
      group: "BloodSugar",
      sequence: 982,
      code: 'BloodSugarOutsideRange',
      description: 'Blood sugar outside range'
    }, {
      selector: 'CPTasks',
      groupSequence: 82,
      group: "FallPrecaution",
      sequence: 820,
      code: 'FallPrecaution',
      description: 'Fall Precaution'
    }, {
      selector: 'CPTasks',
      groupSequence: 82,
      group: "FallPrecaution",
      sequence: 821,
      code: 'FallPrecautionFell',
      description: 'Client fell'
    }, {
      selector: 'CPTasks',
      groupSequence: 83,
      group: "Orthotics",
      sequence: 830,
      code: 'Orthotics',
      description: 'Apply or remove orthotic devices'
    }, {
      selector: 'CPTasks',
      groupSequence: 83,
      group: "Orthotics",
      sequence: 831,
      code: 'OrthoticSplints',
      description: 'Apply or remove splints'
    }, {
      selector: 'CPTasks',
      groupSequence: 83,
      group: "Orthotics",
      sequence: 832,
      code: 'OrthoticSplints',
      description: 'Apply or remove TED hose'
    }, {
      selector: 'CPTasks',
      groupSequence: 84,
      group: "Skin",
      sequence: 840,
      code: 'SkinBreakdown',
      description: 'Report any skin rash or breakdown'
    }, {
      selector: 'CPTasks',
      groupSequence: 84,
      group: "Skin",
      sequence: 841,
      code: 'DressingDry',
      description: 'Apply dry dressing'
    }, {
      selector: 'CPTasks',
      groupSequence: 84,
      group: "Skin",
      sequence: 842,
      code: 'DressingWetToDry',
      description: 'Apply wet to dry dressing'
    }, {
      selector: 'CPTasks',
      groupSequence: 84,
      group: "Skin",
      sequence: 984,
      code: 'DressingDrainage',
      description: 'Report increased drainage during dressing change'
    }, {
      selector: 'CPTasks',
      groupSequence: 85,
      group: "IO",
      sequence: 850,
      code: 'IOMonitor',
      description: 'Monitor and record intake and output'
    }, {
      selector: 'CPTasks',
      groupSequence: 86,
      group: "TubeFeeding",
      sequence: 860,
      code: 'TubeFeed',
      description: 'Perform G/PEG site care'
    }, {
      selector: 'CPTasks',
      groupSequence: 86,
      group: "TubeFeeding",
      sequence: 861,
      code: 'TubeFeedDrain',
      description: 'Note G/PEG tube redness or drainage'
    }, {
      selector: 'CPTasks',
      groupSequence: 87,
      group: "Respiratory",
      sequence: 870,
      code: 'RespiratoryOxygen',
      description: 'Oxygen precaution treatment'
    }, {
      selector: 'CPTasks',
      groupSequence: 87,
      group: "Respiratory",
      sequence: 871,
      code: 'TrachCarePerform',
      description: 'Perform trach care'
    }, {
      selector: 'CPTasks',
      groupSequence: 87,
      group: "Respiratory",
      sequence: 872,
      code: 'TrachCarePerform',
      description: 'Report redness or drainage near trach'
    }, {
      selector: 'CPTasks',
      groupSequence: 88,
      group: "Seizures",
      sequence: 880,
      code: 'Seizure',
      description: 'Monitor for seizures'
    }, {
      selector: 'CPTasks',
      groupSequence: 88,
      group: "Seizures",
      sequence: 988,
      code: 'SeizureEpisode',
      description: 'Client had episode of seizure'
    }, {
      selector: 'CPTasks',
      groupSequence: 89,
      group: "Emergency",
      sequence: 890,
      code: 'EmergencyLifeline',
      description: 'Client wearing lifeline'
    }, {
      selector: 'CPTasks',
      groupSequence: 89,
      group: "Emergency",
      sequence: 989,
      code: 'EmergencyLifelineRefusal',
      description: 'Client refused to wear lifeline'
    }, {
      selector: 'CPTasks',
      groupSequence: 99,
      group: "Injury",
      sequence: 999,
      code: 'Injury',
      description: 'Client injured'
    }];
  }
}
