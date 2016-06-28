
module.exports = {
  template: require('./tabTemplate.html'),
  props: ['heading'],
  data() {
    return {
      active: false
    };
  },
  ready() {
    this.$dispatch('TAB_COMPONENT_TAB_CREATED', this.heading);
  },
  events: {
    TAB_COMPONENT_TAB_CLICKED(msg) {
      this.active = this.heading === msg;
    }
  }
};
