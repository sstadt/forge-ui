
module.exports = {
  template: require('./vSelectTemplate.html'),
  props: {
    label: {
      type: String,
      default: ''
    },
    selected: {
      type: String,
      required: true,
      twoWay: true
    },
    options: {
      type: Array,
      required: true
    },
    required: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      isError: false
    };
  },
  ready() {
    var self = this,
      selectedIndex = _.findIndex(self.options, (option) => option.value === self.selected);

    if (self.required && selectedIndex === -1) {
      self.selected = self.options[0].value;
    }
  },
  methods: {
    isValid() {
      this.isError = !this.required || this.selected.length > 0;
      return this.isError;
    }
  }
};
