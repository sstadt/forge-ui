
module.exports = {
  template: require('./vFormTemplate.html'),
  props: {
    method: {
      type: String,
      defaultsTo: 'POST'
    },
    action: {
      type: String,
      defaultsTo: ''
    },
    async: {
      type: Boolean,
      defaultsTo: false
    },
    submitCallback: {
      type: Function
    }
  },
  methods: {
    submitForm(event) {
      if (this.async || !this.isValid()) {
        event.preventDefault();
      }

      if (this.async && this.isValid() && typeof this.submitCallback === 'function') {
        this.submitCallback();
      }
    },
    isValid() {
      var self = this,
        formIsValid = true;

      for (var i = 0, j = self.$children.length; i < j; i++) {
        if (_.isFunction(self.$children[i].isValid)) { // has input validation attached
          formIsValid = formIsValid && self.$children[i].isValid();
        }
      }

      return formIsValid;
    }
  }
};
