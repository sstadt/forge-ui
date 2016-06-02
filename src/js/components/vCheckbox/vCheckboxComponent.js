
module.exports = {
  template: require('./vCheckboxTemplate.html'),
  data() {
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
    checked(val) {
      this.icon = (val === true) ? 'checked' : 'unchecked';
    }
  },
  ready() {
    this.icon = (this.checked === true) ? 'checked' : 'unchecked';
  },
  methods: {
    toggle() {
      this.checked = !this.checked;
    },
    isValid() {
      this.isError = (this.required) ? !this.checked : false;
      return !this.isError;
    }
  }
};
