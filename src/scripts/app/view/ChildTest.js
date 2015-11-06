import Nori from '../../nori/Nori.js';

export default Nori.view().createComponent('', {

  counter: 0,

  getDOMEvents() {
    return {
      'click button': () => this.setProps({label: 'Clicked ' + (++this.counter) + ' times'})
    };
  },

  template() {
    return this.from(`
      <div>
        <button>{{id}}, {{label}}</button>
      </div>
    `);
  }

});