var Lorem = function () {

  var _currentText      = [],
      _textSets         = [],
      _maleFirstNames   = [],
      _femaleFirstNames = [],
      _lastNames        = [],
      _punctuation      = [],
      _months,
      _days,
      _initialized      = false,
      _arrayUtils       = require('../core/ArrayUtils.js'),
      _stringUtils      = require('../core/StringUtils.js'),
      _numberUtils      = require('../core/NumberUtils.js');

  _textSets = [
    "Perhaps a re-engineering of your current world view will re-energize your online nomenclature to enable a new holistic interactive enterprise internet communication solution Upscaling the resurgent networking exchange solutions, achieving a breakaway systemic electronic data interchange system synchronization, thereby exploiting technical environments for mission critical broad based capacity constrained systems Fundamentally transforming well designed actionable information whose semantic content is virtually null To more fully clarify the current exchange, a few aggregate issues will require addressing to facilitate this distributed communication venue In integrating non-aligned structures into existing legacy systems, a holistic gateway blueprint is a backward compatible packaging tangible"
  ];

  _lastNames = 'Smith Johnson Williams Jones Brown Davis Miller Wilson Moore Taylor Anderson Thomas Jackson White Harris Martin Thompson Garcia Martinez Robinson Clark Rodriguez Lewis Lee Walker Hall Allen Young Hernandez King Wright Lopez Hill Scott Green Adams Baker Gonzalez Nelson Carter Mitchell Perez Roberts Turner Phillips Campbell Parker Evans Edwards Collins Stewart Sanchez Morris Rogers Reed Cook Morgan Bell Murphy'.split(' ');

  _maleFirstNames = 'Thomas Arthur Lewis Clarence Leonard Albert Paul Carl Ralph Roy Earl Samuel Howard Richard Francis Laurence Herbert Elmer Ernest Theodore David Alfred Donald Russell Eugene Andrew Kenneth Herman Jesse Lester Floyd Michael Edwin Clifford Benjamin Clyde Glen Oscar Daniel'.split(' ');

  _femaleFirstNames = 'Elizabeth Ann Helen Margaret Ellen Catherine Lily Florence Ada Lou Ethel Emily Ruth Rose Frances Alice Bertha Clara Mabel Minnie Grace Jane Evelyn Gertrude Edna Pearl Laura Hazel Edith Esther Harriet Sarah May Matilda Martha Myrtle Josephin Maud Agnes Keri Julia Irene Mildred Cora'.split(' ');

  _punctuation = ['.', '.', '.', '.', '?', '!'];

  _months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  _days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

  function initialize() {
    if (_initialized) {
      return;
    }
    setCurrentTextSet(0);
    _initialized = true;
  }

  function setCurrentTextSet(index) {
    var _current = _textSets[index].toLowerCase();
    _currentText = _current.split(' ');
  }

  function getSentence(min, max) {
    var sentence = getText(min, max);

    return _stringUtils.capitalizeFirstLetter(sentence) + getRandomItem(_punctuation);
  }

  function getParagraph(min, max) {
    var str   = "",
        delim = " ",
        len   = _numberUtils.rndNumber(min, max),
        i     = 0;

    for (; i < len; i++) {
      if (i === len - 1) {
        delim = "";
      }
      str += getSentence(1, 10) + delim;
    }

    return str;
  }

  function getText(min, max) {
    var str   = "",
        delim = " ",
        len   = _numberUtils.rndNumber(min, max),
        i     = 0;

    for (; i < len; i++) {
      if (i === len - 1) {
        delim = "";
      }
      str += getRandomItem(_currentText) + delim;
    }

    return str;
  }

  function getRandomItem(arry) {
    var min = 0;
    var max = arry.length - 1;
    return arry[_numberUtils.rndNumber(min, max)];
  }

  function getFirstName() {
    return _numberUtils.rndNumber(0, 1) ? getRandomItem(_maleFirstNames) : getRandomItem(_femaleFirstNames);
  }

  function getLastName() {
    return getRandomItem(_lastNames);
  }

  function getFLName() {
    return getFirstName() + " " + getLastName();
  }

  function getLFName() {
    return getLastName() + ", " + getFirstName();
  }

  /**
   * Better implementation http://stackoverflow.com/questions/9035627/elegant-method-to-generate-array-of-random-dates-within-two-dates
   * @returns {{monthNumber: *, monthName: *, monthDay, weekDayNumber: *, weekDay: *, year}}
   */
  function getDate() {
    var month = _numberUtils.rndNumber(0, 11),
        wkday = _numberUtils.rndNumber(0, 4),
        date  = {
          monthNumber  : month + 1,
          monthName    : _months[month],
          monthDay     : _numberUtils.rndNumber(1, 28),
          weekDayNumber: wkday + 1,
          weekDay      : _days[wkday],
          year         : _arrayUtils.rndElement(['2010', '2011', '2012', '2013', '2014', '2015', '2016'])
        };

    date.string = date.monthName + ' ' + date.monthDay + ', ' + date.year;

    return date;

  }

  /**
   * http://stackoverflow.com/questions/105034/create-guid-uuid-in-javascript
   * @returns {string}
   */
  function fakeGUID() {
    function s4() {
      return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
    }

    return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
  }

  return {
    initialize  : initialize,
    getText     : getText,
    getSentence : getSentence,
    getParagraph: getParagraph,
    getFLName   : getFLName,
    getLFName   : getLFName,
    getDate     : getDate,
    fakeGUID    : fakeGUID
  };

};

export default Lorem();
