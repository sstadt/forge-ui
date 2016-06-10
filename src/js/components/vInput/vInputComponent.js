
var validationRules = require('./validationRules.js');

module.exports = {
  template: require('./vInputTemplate.html'),
  props: {
    label: {
      type: String
    },
    name: {
      type: String
    },
    type: {
      type: String,
      required: true
    },
    placeholder: {
      type: String
    },
    icon: {
      type: String
    },
    value: {
      type: String,
      required: true,
      twoWay: true
    },
    required: {
      type: Boolean,
      defaultsTo: false
    },
    equalTo: {
      type: Object,
      defaultsTo: null
    }
  },
  data() {
    return {
      error: ''
    };
  },
  methods: {
    isValid() {
      this.validate();
      return (this.error.length === 0);
    },
    debounceValidate: _.debounce(function () {
      this.validate();
    }, 500),
    validate() {
      var label = this.label || this.name;

      // required validation
      if (this.required && this.value.length === 0) {
        this.error = label + ' is required';

      // html5 data type validation
      } else if (validationRules.hasOwnProperty(this.type) && !validationRules[this.type].regex.test(this.value)) {
        this.error = validationRules[this.type].defaultError;

      // equivalency validation
      } else if (this.equalTo && this.equalTo.value !== this.value) {
        this.error = 'Must match ' + this.equalTo.label;

      // input is valid
      } else {
        this.error = '';
      }
    }
  }
};
