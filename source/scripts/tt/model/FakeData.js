define('TT.FakeData',

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
      _lorem = require('nudoru.utils.NLorem'),
      _arrayUtils = require('nudoru.utils.ArrayUtils'),
      _stringUtils = require('nudoru.utils.StringUtils'),
      _numberUtils = require('nudoru.utils.NumberUtils');

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

      var numPeople = 100,
          numProjects = 40,
          numAssignments = 10;

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

    /*
    function createItem() {
      var o = Object.create(APP.AppModel.ItemVO.properties),
        additionalImages = [],
        additionalNumImages = _numberUtils.rndNumber(1, 10),
        description = '',
        descriptionNumParas = _numberUtils.rndNumber(1, 5),
        i = 0;

      for (; i < descriptionNumParas; i++) {
        description += '<p>' + _lorem.getParagraph(3, 7) + '</p>';
      }

      for (i = 0; i < additionalNumImages; i++) {
        additionalImages.push('img/' + _arrayUtils.rndElement(_possiblePreviewImages));
      }

      o.title = _stringUtils.capitalizeFirstLetter(_lorem.getText(3, 10));
      o.shortTitle = o.title.substr(0, 10) + '...';
      o.description = description;
      o.images = additionalImages;
      o.previewImage = additionalImages[0];
      o.id = '' + _id++;
      o.dateStarted = 'January 1, 2010';
      o.dateCompleted = 'December 31, 2014';
      o.quarter = 'Q' + _numberUtils.rndNumber(1, 4).toString();
      o.duration = _numberUtils.rndNumber(1, 5).toString() + ' hour(s)';
      o.contributors = _arrayUtils.getRandomSetOfElements(_possibleContributors, 5);
      o.categories = _arrayUtils.getRandomSetOfElements(_possibleCategories, 1);
      o.types = _arrayUtils.getRandomSetOfElements(_possibleTypes, 3);
      o.companyArea = _arrayUtils.rndElement(_possibleLobs);
      o.complexity = _arrayUtils.rndElement(_possibleComplexity);
      o.links = _arrayUtils.getRandomSetOfElements(_possibleLinks, 5);
      o.tags = _arrayUtils.getRandomSetOfElements(_possibleTags, 3);
      return o;
    }
    */

    exports.initialize = initialize;
    exports.getPeople = getPeople;
    exports.getProjects = getProjects;
    exports.getAssignments = getAssignments;

  });