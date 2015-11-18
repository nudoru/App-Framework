import moment from '../../vendor/moment.min.js';
import Nori from '../Nori.js';
import ObservableSubject from './ObservableSubject';

export default Nori.createClass({

  mixins: [ObservableSubject()],

  momentInst: moment(),

  now() {
    return moment().format('YY-M-D@h:m:s a');
  },

  prettyNow() {
    return moment().format('MMM Do YYYY, h:mm a');
  },

  getTimeStamp() {
    return moment().format('M-D-YY,h:mm:ss,a');
  },

  getCurrentWeek() {
    return this.momentInst.week();
  },

  getCurrentYear() {
    return this.momentInst.year();
  },

  resetToCurrent() {
    this.momentInst = moment();
    this.notifyChange();
  },

  forwardWeek() {
    var wk = this.momentInst.week();
    this.momentInst.week(++wk);
    this.notifyChange();
  },

  backwardWeek() {
    var wk = this.momentInst.week();
    this.momentInst.week(--wk);
    this.notifyChange();
  },

  debug() {
    console.log(this.getCurrentWeek(), this.getCurrentYear(), this.getPrettyDateString(), this.getDateString());
  },

  getDateString() {
    return this.getCurrentYear() + '_' + this.getCurrentWeek();
  },

  getPrettyDateString(format) {
    format = format || 'MMM Do, YYYY';
    return this.momentInst.format(format);
  },

  notifyChange() {
    var payload = {
      type   : 'time_move',
      mapType: 'time',
      mapID  : ''
    };
    this.notify('CHANGE', payload);
  }

});