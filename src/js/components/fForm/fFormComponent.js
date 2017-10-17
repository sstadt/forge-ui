
import template from './fFormTemplate.html';
import forgeUtil from '../../forge-util.js';

var component = {
  template,
  props: {
    method: {
      type: String,
      default: 'POST'
    },
    action: {
      type: String,
      default: ''
    },
    ajax: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    submitForm(event) {
      if (this.ajax || !this.isValid()) {
        event.preventDefault();
      }

      if (this.ajax && this.isValid()) {
        this.$emit('submit');
      }
    },
    isValid() {
      var self = this,
        formIsValid = true;

      for (var i = 0, j = self.$children.length; i < j; i++) {
        if (forgeUtil.isFunction(self.$children[i].isValid)) { // has input validation attached
          let inputIsValid = self.$children[i].isValid();
          formIsValid = formIsValid && inputIsValid;
        }
      }

      return formIsValid;
    }
  }
};

export default component;
