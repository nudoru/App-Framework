export default Nori.view().createComponent('', {

  counter: 0,

  getDOMEvents() {
    return {
      'click p': () => this.setProps({label:'Clicked ' + (++this.counter) + ' times'})
    };
  },

  template(props, state) {
    return this.from(`
      <div class="nori__block">
        <p>{{id}}, {{label}}</p>
      </div>
    `);
  }

});