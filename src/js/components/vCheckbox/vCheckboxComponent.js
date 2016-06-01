
module.exports = {
  template: require('./vCheckboxTemplate.html'),
  data: function () {
    return {
      icon: 'unchecked',
      isError: false
    };
  },
  props: {
    checked: {
      type: Boolean,
      required: true,
      twoWay: true
    },
    label: {
      type: String,
      required: true
    },
    required: {
      type: Boolean,
      defaultsTo: false
    }
  },
  watch: {
    checked: function (val) {
      this.icon = (val === true) ? 'checked' : 'unchecked';
    }
  },
  ready: function () {
    this.icon = (this.checked === true) ? 'checked' : 'unchecked';
  },
  methods: {
    toggle: function () {
      this.checked = !this.checked;
    },
    isValid: function () {
      this.isError = (this.required) ? !this.checked : false;
      return !this.isError;
    }
  }
};
