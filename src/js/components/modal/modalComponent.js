
module.exports = {
  template: require('./modalTemplate.html'),
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
