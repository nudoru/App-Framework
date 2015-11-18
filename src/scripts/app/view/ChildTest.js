import Nori from '../../nori/Nori.js';
import ObjectAssign from '../../nudoru/util/ObjectAssign.js';


export default Nori.createComponent({

  counter: 0,

  getDOMEvents() {
    return {
      'click button.button-neutral-light': () => this.setProps({label: 'Clicked ' + (++this.counter) + ' times'})
    };
  },

  render() {
    let combined     = ObjectAssign({}, this.props, this.state),
        templateFunc = this.tmpl(`<div>
            <button class="button-neutral-light">{{id}}, {{label}}</button>
            <div class="test__subchild"></div>
          </div>`);
    return templateFunc(combined);
  }

});