
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
      return `#${this.name}`;
    },
    iconClasses() {
      let classes = { 'icon-image': true };
      classes[this.name] = true;
      return classes;
    },
    sizeInPx() {
      return `${this.size}px`;
    }
  }
};

export default component;
