
import template from './tabTemplate.html';

var component = {
  template,
  props: {
    heading: {
      type: String,
      required: true
    },
    selected: {
      default: false
    }
  },
  data() {
    return {
      active: false
    };
  },
  mounted() {
    this.active = this.selected;
    this.$parent.addTab(this);
  }
};

export default component;
