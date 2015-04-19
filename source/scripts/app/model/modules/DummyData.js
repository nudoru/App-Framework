define('APP.AppModel.DummyData',

  function(require, module, exports) {

    var _id = 1,
      _possibleYears = ['2010', '2011', '2012', '2013', '2014'],
      _possiblePreviewImages = [
        'screenshots/screenshot1.png',
        'screenshots/screenshot2.png',
        'screenshots/screenshot3.png',
        'screenshots/screenshot4.png',
        'screenshots/screenshot5.jpg',
        'screenshots/screenshot6.jpg',
        'screenshots/screenshot7.jpg',
        'screenshots/screenshot8.png',
        'screenshots/screenshot9.png',
        'screenshots/screenshot11.png',
        'screenshots/screenshot12.png'
      ],
      _possibleContributors = [],
      _possibleLobs = ['Information Technology', 'Asset Management', 'Human Resources', 'Institutional', 'A&O', 'Client Services', 'Finance', 'Internal Audit', 'Marketing', 'Risk Management'],
      _possibleCategories = ['Synchronous', 'Asynchronous', 'Just-In-Time'],
      _possibleTypes = ['WBT', 'ILT', 'VILT', 'App', 'Multimedia', 'Sharepoint', 'Blended', 'Game', 'Simulation', 'EPSS', 'Informational'],
      _possibleTags = ['template', 'storyline', 'social', 'game', 'mobile', 'sharepoint', 'html', 'system', 'ilt', 'paper based', 'application', 'show me', 'simulation'],
      _possibleComplexity = ['High', 'Medium', 'Low'],
      _possibleLinks = ['http://google.com', 'http://yahoo.com', 'http://bing.com'],
      _items = [],
      _lorem = require('nudoru.utils.NLorem'),
      _arrayUtils = require('nudoru.utils.ArrayUtils'),
      _stringUtils = require('nudoru.utils.StringUtils'),
      _numberUtils = require('nudoru.utils.NumberUtils');

    function getItems() {
      return _items;
    }

    function initialize() {
      var i = 0;

      _lorem.initialize();

      for (i = 0; i < 20; i++) {
        _possibleContributors.push(_lorem.getLFName());
      }

      for (i = 0; i < 100; i++) {
        _items.push(createItem());
      }

    }

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

    exports.initialize = initialize;
    exports.getItems = getItems;

  });