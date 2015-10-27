let counter = 0;

export default Nori.view().createComponent({

  getDOMEvents() {
    return {
      'click button': () => this.setProps({label:'Clicked ' + (++counter) + ' times'})
    };
  },

  template(props, state) {
    return this.from(`
      <div>
        <button>{{label}}</button>
      </div>
    `);
  }

});