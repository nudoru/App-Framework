import Nori from '../../nori/Nori.js';

export default Nori.view().createComponent('', {

  counter: 0,

  getDOMEvents() {
    return {
      'click button.button-neutral-light': () => this.setProps({label: 'Clicked ' + (++this.counter) + ' times'})
    };
  },

  template() {
    return this.tmpl(`
      <div>
        <button class="button-neutral-light">{{id}}, {{label}}</button>
      </div>
    `);
  }

});