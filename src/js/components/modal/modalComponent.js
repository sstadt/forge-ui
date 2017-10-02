
import template from './modalTemplate.html';

var component = {
  template,
  props: {
    modalSize: {
      type: String,
      default: 'full'
    },
    transition: {
      type: String,
      default: 'zoom-out'
    }
  },
  data() {
    return {
      show: false
    }
  },
  methods: {
    open() {
      this.show = true;
    },
    close() {
      this.show = false;
    }
  }
};

export default component;
