APP.createNameSpace('APP.Model.DummyData');

APP.AppModel.DummyData = (function(){

  var _id = 1,
      _possibleYears = ['2010','2011','2012','2013','2014'],
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
      _possibleLobs = ['Information Technology','Finance','Human Resources','Investment','Legal','Client Services','Risk Management','Marketing'],
      //_possibleCategories = ['Online','Event','Test','Session','Material','Curriculum'],
      _possibleCategories = ['item-category1','item-category2','item-category3','item-category4','item-category5'],
      _possibleTags = ['template','storyline','social','game','mobile','sharepoint','html','system','ilt','paper based','application','show me','simulation'],
      _possibleComplexity = ['High','Medium','Low'],
      _possibleLinks = ['http://google.com', 'http://yahoo.com', 'http://bing.com'];
      _items = [];

  function getItems() {
    return _items;
  }

  function initialize() {
    var i=0;

    for(i=0; i<20; i++) {
      _possibleContributors.push(NLorem.getLFName());
    }

    for(i=0; i<100; i++) {
      _items.push(createItem());
    }

  }

  function createItem() {
    var o = Object.create(ItemVO.prototype),
        additionalImages = [],
        additionalNumImages = NumberUtils.rndNumber(1,10),
        description = '',
        descriptionNumParas = NumberUtils.rndNumber(1,5),
        i = 0;

    for(;i<descriptionNumParas; i++) {
      description += '<p>'+NLorem.getParagraph(3,7)+'</p>';
    }

    for(i=0;i<additionalNumImages; i++) {
      additionalImages.push('img/' + ArrayUtils.rndElement(_possiblePreviewImages));
    }

    o.title = StringUtils.capitalizeFirstLetter(NLorem.getText(3,10));
    o.shortTitle = o.title.substr(0, 10) + '...';
    o.description = description;
    o.images = additionalImages;
    o.previewImage = additionalImages[0];
    o.id = ''+_id++;
    o.dateStarted = 'January 1, 2010';
    o.dateCompleted = 'December 31, 2014';
    o.quarter = 'Q'+NumberUtils.rndNumber(1,4).toString();
    o.duration = NumberUtils.rndNumber(1,5).toString() + ' hour(s)';
    o.contributors = ArrayUtils.getRandomSetOfElements(_possibleContributors, 5);
    o.categories = ArrayUtils.getRandomSetOfElements(_possibleCategories, 2);
    o.companyArea = ArrayUtils.rndElement(_possibleLobs);
    o.complexity = ArrayUtils.rndElement(_possibleComplexity);
    o.type = 'WBT';
    o.links = ArrayUtils.getRandomSetOfElements(_possibleLinks, 5);
    o.tags = ArrayUtils.getRandomSetOfElements(_possibleTags, 3);
    return o;
  }



  return {
    initialize: initialize,
    getItems: getItems
  };

}());