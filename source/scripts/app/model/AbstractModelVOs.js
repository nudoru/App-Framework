function CategoryVO() {}
CategoryVO.prototype = {
  name: '',
  icon: ''
};

function RoleVO() {}
RoleVO.prototype = {
  name: '',
  icon: ''
};

function ContributorVO() {}
ContributorVO.prototype = {
  firstName: '',
  lastName: '',
  name: '',
  title: '',
  email: '',
  picture: '',
  roles: []
};

function ItemVO() {}
ItemVO.prototype = {
  title: '',
  shortTitle: '',
  description: '',
  previewImage: '',
  id: '',
  dateStarted: '',
  dateCompleted: '',
  quarter: '',
  duration: '',
  contributors: [],
  categories: [],
  companyArea: '',
  complexity: '',
  links: [],
  images: [],
  tags: [],
  metadata: []
};