
module.exports = {
  template: require('./alertTemplate.html'),
  props: {
    canClose: {
      type: Boolean,
      defaultsTo: false
    }
  },
  data() {
    return {
      messages: [],
      type: ''
    };
  },
  methods: {
    close() {
      this.messages = [];
    },
    addMessage(type, message) {
      if (this.type !== type) {
        this.type = type;
        this.messages = [message];
      } else {
        this.messages.push(message);
      }
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
