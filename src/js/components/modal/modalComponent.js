
import template from './modalTemplate.html';

var component = {
  template,
  props: {
    show: {
      type: Boolean,
      required: true,
      twoWay: true
    },
    modalSize: {
      type: String,
      default: 'full'
    },
    transition: {
      type: String,
      default: 'zoom-out'
    }
  }
};

export default component;
