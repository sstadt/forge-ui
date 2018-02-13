
import template from './iconTemplate.html';

var component = {
  template,
  props: {
    name: {
      type: String,
      required: true
    },
    size: {
      type: Number,
      default: 20
    }
  },
  computed: {
    icon() {
      return `#${name}`;
    }
  }
};

export default component;
