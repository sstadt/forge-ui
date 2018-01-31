
import template from './alertTemplate.html';

var component = {
  template,
  props: {
    canClose: {
      type: Boolean,
      default: false
    },
    transition: {
      type: String,
      default: 'fade'
    }
  },
  data() {
    return {
      messages: [],
      type: '',
      show: false
    };
  },
  methods: {
    close() {
      this.show = false;
    },
    reset() {
      this.messages = [];
    },
    addMessage(type, message) {
      if (this.type !== type) {
        this.type = type;
        this.messages = [message];
      } else {
        this.messages.push(message);
      }

      this.show = true;
    },
    message(message) {
      this.addMessage('', message);
    },
    primary(message) {
      this.addMessage('primary', message);
    },
    secondary(message) {
      this.addMessage('secondary', message);
    },
    success(message) {
      this.addMessage('success', message);
    },
    warning(message) {
      this.addMessage('warning', message);
    },
    alert(message) {
      this.addMessage('alert', message);
    }
  }
};

export default component;
