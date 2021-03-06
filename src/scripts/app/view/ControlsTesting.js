import Nori from '../../nori/Nori.js';
import selected from '../../vendor/selected.js';
import Pikaday from '../../vendor/pikaday.js';

/**
 * Module for a dynamic application view for a route or a persistent view
 */

let datePicker;

export default Nori.createComponent({

  componentDidMount() {
    var dateField  = this.dom().querySelector('#dateField');
    datePicker = new Pikaday({
      field          : dateField,
      format         : 'l',
      disableWeekends: true,
      minDate        : new Date(2014, 0, 1), // Jan 1, 2014
      onSelect       () {
        console.log(datePicker.getMoment().format('l'));
      }
    });

    selected.init();
  },

  componentWillUnmount() {
    datePicker.destroy();
    datePicker = null;
  }


});