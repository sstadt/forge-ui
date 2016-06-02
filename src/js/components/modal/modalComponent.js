
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
      defaultsTo: 'full'
    }
  },
  computed: {
    isMenu() {
      return this.modalSize === 'menu';
    }
  }
};
