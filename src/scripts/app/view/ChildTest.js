import Nori from '../../nori/Nori.js';
import _ from '../../vendor/lodash.min.js';

export default Nori.createComponent({

  counter: 0,

  getDOMEvents() {
    return {
      'click button.button-neutral-light': () => this.setProps({label: 'Clicked ' + (++this.counter) + ' times'})
    };
  },

  render() {
    let combined     = _.merge({}, this.props, this.state),
        templateFunc = this.tmpl(`<div>
            <button class="button-neutral-light">{{id}}, {{label}}</button>
            <div class="test__subchild"></div>
          </div>`);
    return templateFunc(combined);
  }

});