
var Alert = require('./alert.class.js');

module.exports = {
  template: require('./alertTemplate.html'),
  props: {
    alert: {
      type: Object,
      required: true,
      twoWay: true
    },
    canClose: {
      type: Boolean,
      defaultsTo: false
    }
  },
  ready() {
    this.alert = new Alert();
  },
  methods: {
    close() {
      this.alert.close();
    }
  }
};
