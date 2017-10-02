
import template from './fRadioTemplate.html';

var component = {
  template,
  props: {
    label: {
      type: String,
      default: ''
    },
    name: {
      type: String,
      required: true
    },
    options: {
      type: Array,
      required: true
    },
    value: {
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
      selectedOption: '',
      isError: false
    };
  },
  watch: {
    selectedOption() {
      console.log(this.selectedOption);
      this.$emit('input', this.selectedOption);
    }
  },
  methods: {
    isValid() {
      this.isError = (this.required) ? this.selectedOption.length === 0 : false;
      return !this.isError;
    }
  }
};

export default component;
