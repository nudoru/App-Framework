var LOREM = (function(){
  var _currentText = [],
      _textSets = [],
      _maleFirstNames = [],
      _femaleFirstNames = [],
      _lastNames = [],
      _punctuation = [],
      _months,
      _days;

  _textSets = [
    "Lorem ipsum dolor sit amet consectetur adipiscing elit Donec libero urna vehicula in odio quis pharetra pharetra magna Quisque pharetra elit in eros volutpat fringilla Nunc vitae nunc mattis rhoncus augue sit amet tempus magna Suspendisse interdum urna eu consectetur vestibulum lorem ligula scelerisque tortor a tincidunt eros odio et lectus Fusce a quam erat Aliquam quis libero sed orci porta congue Mauris ultricies porttitor sem at lacinia Morbi mattis urna ac sapien vehicula interdum Pellentesque commodo nisi id lacus laoreet maximus Ut eget posuere leo sit amet molestie augue Nullam volutpat nulla sit amet convallis tempus tellus lorem fermentum quam eget vestibulum orci est id ex Sed fermentum justo et augue pulvinar vehicula Nullam malesuada justo euismod molestie justo ut finibus quam Nullam pharetra erat nec hendrerit volutpat",
    "Perhaps a re-engineering of your current world view will re-energize your online nomenclature to enable a new holistic interactive enterprise internet communication solution Upscaling the resurgent networking exchange solutions, achieving a breakaway systemic electronic data interchange system synchronization, thereby exploiting technical environments for mission critical broad based capacity constrained systems Fundamentally transforming well designed actionable information whose semantic content is virtually null To more fully clarify the current exchange, a few aggregate issues will require addressing to facilitate this distributed communication venue In integrating non-aligned structures into existing legacy systems, a holistic gateway blueprint is a backward compatible packaging tangible of immeasurable strategic value in right-sizing conceptual frameworks when thinking outside the box This being said, the ownership issues inherent in dominant thematic implementations cannot be understated vis-a vis document distribution on a real operating system consisting primarily of elements regarded as outdated and therefore impelling as a integrated out sourcing avenue to facilitate multi-level name value pairing in static components In order to properly merge and articulate these core assets, an acquisition statement outlining the information architecture, leading to a ratcheting up of convergence across the organic platform is an opportunity without precedent in current applicability transactional modeling Implementing these goals requires a careful examination to encompass an increasing complex out sourcing disbursement to ensure the extant parameters are not exceeded while focusing on infrastructure cohesion Dynamic demand forecasting indicates that a mainstream approach may establish a basis for leading-edge information processing to insure the diversity of granularity in encompassing expansion of content provided within the multimedia framework under examination Empowerment in information design literacy demands the immediate and complete disregard of the entire contents of this cyberspace communication"

  ];

  _lastNames = 'Smith Johnson Williams Jones Brown Davis Miller Wilson Moore Taylor Anderson Thomas Jackson White Harris Martin Thompson Garcia Martinez Robinson Clark Rodriguez Lewis Lee Walker Hall Allen Young Hernandez King Wright Lopez Hill Scott Green Adams Baker Gonzalez Nelson Carter Mitchell Perez Roberts Turner Phillips Campbell Parker Evans Edwards Collins Stewart Sanchez Morris Rogers Reed Cook Morgan Bell Murphy Bailey Rivera Cooper Richardson Cox Howard Ward Torres Peterson Gray Ramirez James Watson Brooks Kelly Sanders Price Bennett Wood Barnes Ross Henderson Coleman Jenkins Perry Powell Long Patterson Hughes Flores Washington Butler Simmons Foster Gonzales Bryant Alexander Russell Griffin Diaz Hayes'.split(' ');

  _maleFirstNames = 'Thomas Arthur Lewis Clarence Leonard Albert Paul Carl Ralph Roy Earl Samuel Howard Richard Francis Laurence Herbert Elmer Ernest Theodore David Alfred Donald Russell Eugene Andrew Kenneth Herman Jesse Lester Floyd Michael Edwin Clifford Benjamin Clyde Glen Oscar Daniel'.split(' ');

  _femaleFirstNames = 'Elizabeth Ann Helen Margaret Ellen Catherine Lily Florence Ada Lou Ethel Emily Ruth Rose Frances Alice Bertha Clara Mabel Minnie Grace Jane Evelyn Gertrude Edna Pearl Laura Hazel Edith Esther Harriet Sarah May Matilda Martha Myrtle Josephin Maud Agnes Keri Julia Irene Mildred Cora'.split(' ');

  _punctuation = ['.','.','.','.','?','!'];

  _months = ['January','February','March','April','May','June','July','August','September','October','November','December'];

  _days = ['Monday','Tuesday','Wednesday','Thursday','Friday'];

  function init() {
    if(_currentText.length) {
      return;
    }
    setCurrentTextSet(1);
  }

  function setCurrentTextSet(index) {
    var _current = _textSets[index].toLowerCase();
    _currentText= _current.split(' ');
  }

  function getSentence(min,max) {
    var sentence = getText(min, max);
    return StringUtils.capitalizeFirstLetter(sentence) + getRandomItem(_punctuation);
  }

  function getParagraph(min, max) {
    var str = "",
      delim = " ",
      len = NumberUtils.rndNumber(min, max),
      i= 0;

    for(; i<len; i++) {
      if(i === len-1) {
        delim = "";
      }
      str += getSentence(1,10) + delim;
    }

    return str;
  }

  function getText(min, max) {
    init();

    var str = "",
        delim = " ",
        len = NumberUtils.rndNumber(min, max),
        i= 0;

    for(; i<len; i++) {
      if(i === len-1) {
        delim = "";
      }
      str += getRandomItem(_currentText) + delim;
    }

    return str;
  }

  function getRandomItem(arry) {
    var min = 0;
    var max = arry.length-1;
    return arry[NumberUtils.rndNumber(min, max)];
  }

  function getFirstName() {
    return NumberUtils.rndNumber(0,1) ? getRandomItem(_maleFirstNames) : getRandomItem(_femaleFirstNames);
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

  function getDate() {
    var month = NumberUtils.rndNumber(0,11),
        wkday = NumberUtils.rndNumber(0,4);

    return {
      monthNumber: month + 1,
      monthName: _months[month],
      monthDay: NumberUtils.rndNumber(1,28),
      weekDayNumber: wkday + 1,
      weekDay: _days[wkday],
      year: ArrayUtils.rndElement(['2010','2011','2012','2013','2014'])
    };
  }

  return {
    getText: getText,
    getSentence: getSentence,
    getParagraph: getParagraph,
    getFLName: getFLName,
    getLFName: getLFName,
    getDate: getDate
  };

}());