define('TT.Model.FakeData',

  function(require, module, exports) {
    "use strict";

    var _id = 1,
      _people= [],
      _projects = [],
      _assignments = [],
      _possibleManagers = [],
      _possibleRoles = ['ITD','ID','Consultant'],
      _possibleTasks = ['Analysis', 'Design', 'Develop', 'Implement','Evaluate','Consult'],
      _possibleLobs = ['Information Technology', 'Asset Management', 'Human Resources', 'Institutional', 'A&O', 'Client Services', 'Finance', 'Internal Audit', 'Marketing', 'Risk Management'],
      _lorem = require('Nudoru.Browser.NLorem'),
      _arrayUtils = require('Nudoru.Core.ArrayUtils'),
      _numberUtils = require('Nudoru.Core.NumberUtils');

    function getPeople() {
      return _people;
    }

    function getProjects() {
      return _projects;
    }

    function getAssignments() {
      return _assignments;
    }

    function initialize() {

      _lorem.initialize();

      var numPeople = 70,
          numProjects = 500,
          numAssignments = 5000;

      for(var a = 0; a<10; a++) {
        _possibleManagers.push(_lorem.getFLName());
      }


      for(var i = 0; i<numPeople; i++) {
        _people.push(createPerson());
      }

      for(var j = 0; j<numProjects; j++) {
        _projects.push(createProject());
      }

      for(var k = 0; k<numAssignments; k++) {
        _assignments.push(createAssignment());
      }

      localStorage['mockTTData'] = {
        people: _people,
        projects: _projects,
        assignments: _assignments
      };

      console.log('Mock Local Data set');
      console.log(localStorage['mockTTData'].people);

    }

    function createPerson() {
      return {
        id: _lorem.fakeGUID(),
        name: _lorem.getFLName(),
        manager: _arrayUtils.rndElement(_possibleManagers),
        type: 'type_b',
        team: 'Dev Team',
        brlTeamManager: _arrayUtils.rndElement(_possibleManagers),
        brlSrLeader: _arrayUtils.rndElement(_possibleManagers),
        jobTitle: _arrayUtils.rndElement(_possibleRoles),
        primaryRole: _arrayUtils.rndElement(_possibleTasks),
        secondaryRole: _arrayUtils.rndElement(_possibleTasks),
        active: 'Y',
        inActiveDate: '',
        keySkills: _arrayUtils.rndElement(_possibleTasks),
        comments: 'No comments',
        photoURL: 'img/animals/kowala.jpg'
      };
    }

    function createProject() {
      return {
        id: _lorem.fakeGUID(),
        title: _lorem.getText(3,6),
        description: getParas(2),
        status: 'active',
        workType: 'Develop',
        requester: _lorem.getFLName(),
        audience: _arrayUtils.rndElement(_possibleLobs),
        audienceSize: _numberUtils.rndNumber(10, 500).toString(),
        projectLead: _lorem.getFLName(),
        startDate: _lorem.getDate().string,
        endDate: _lorem.getDate().string,
        deploymentDate: _lorem.getDate().string,
        finishDate: _lorem.getDate().string,
        comments: getParas(1),
        teamLeading: 'Dev Team',
        duration: _numberUtils.rndNumber(1, 5).toString()
      };

    }

    function createAssignment() {

      var person = _arrayUtils.rndElement(_people),
          project = _arrayUtils.rndElement(_projects);

      return {
        id: _lorem.fakeGUID(),
        resourceID: person.id,
        resourceName: person.name,
        projectID: project.id,
        projectTitle: project.title,
        startDate: _lorem.getDate().string,
        endDate: _lorem.getDate().string,
        role: person.primaryRole,
        allocation: _numberUtils.rndNumber(10, 25).toString(),
        comments: _lorem.getText(3,6),
        timeData: '',
        allocationData: ''
      };
    }

    function getParas(max) {
      var para = '',
        numPara = _numberUtils.rndNumber(1, max),
        i = 0;

      for (; i < numPara; i++) {
        para += '<p>' + _lorem.getParagraph(3, 7) + '</p>';
      }

      return para;
    }

    exports.initialize = initialize;
    exports.getPeople = getPeople;
    exports.getProjects = getProjects;
    exports.getAssignments = getAssignments;

  });