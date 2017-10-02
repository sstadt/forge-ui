
import template from './fCheckboxTemplate.html';

var component = {
  template,
  props: {
    value: {
      type: Boolean,
      required: true
    },
    label: {
      type: String,
      required: true
    },
    required: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      isError: false,
      isChecked: this.value
    };
  },
  watch: {
    isChecked() {
      this.$emit('input', this.isChecked);
    }
  },
  methods: {
    isValid() {
      this.isError = (this.required) ? !this.isChecked : false;
      return !this.isError;
    }
  }
};

export default component;
