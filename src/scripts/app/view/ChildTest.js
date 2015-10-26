let counter = 0;

let Component = Nori.view().createComponent({

  getDOMEvents() {
    return {
      'click button': () => this.setProps({label:'Clicked ' + (++counter )+ ' times'})
    };
  },


});

export default Component;