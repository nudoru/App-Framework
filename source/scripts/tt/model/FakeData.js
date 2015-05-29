define('TT.Model.FakeData',

  function(require, module, exports) {
    "use strict";

    var _id = 1,
      _people= [],
      _projects = [],
      _assignments = [],
      _possibleContributors = [],
      _possibleLobs = ['Information Technology', 'Asset Management', 'Human Resources', 'Institutional', 'A&O', 'Client Services', 'Finance', 'Internal Audit', 'Marketing', 'Risk Management'],
      _items = [],
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

      var numPeople = 60,
          numProjects = 400,
          numAssignments = 1000;

      for(var i = 0; i<numPeople; i++) {
        _people.push(createPerson());
      }

      for(var i = 0; i<numProjects; i++) {
        _projects.push(createProject());
      }

      for(var i = 0; i<numAssignments; i++) {
        _assignments.push(createAssignment());
      }

    }

    function createPerson() {
      return {
        id: '',
        name: '',
        manager: '',
        type: '',
        team: '',
        brlTeamManager: '',
        brlSrLeader: '',
        jobTitle: '',
        primaryRole: '',
        secondaryRole: '',
        active: '',
        inActiveDate: '',
        keySkills: '',
        comments: '',
        photoURL: ''
      };
    }

    function createProject() {
      return {
        id: '',
        title: '',
        description: '',
        status: '',
        workType: '',
        requester: '',
        audience: '',
        audienceSize: '',
        projectLead: '',
        startDate: '',
        endDate: '',
        deploymentDate: '',
        finishDate: '',
        comments: '',
        teamLeading: ''
      };

    }

    function createAssignment() {
      return {
        id: '',
        resourceName: '',
        startDate: '',
        endDate: '',
        role: '',
        allocation: '',
        comments: '',
        timeData: '',
        allocationData: ''
      };
    }

    function getParas(max) {
      var description = '',
        descriptionNumParas = _numberUtils.rndNumber(1, max),
        i = 0;

      for (; i < descriptionNumParas; i++) {
        description += '<p>' + _lorem.getParagraph(3, 7) + '</p>';
      }
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