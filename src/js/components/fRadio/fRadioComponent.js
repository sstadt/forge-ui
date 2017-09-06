
import template from './fRadioTemplate.html';

var component = {
  template,
  data() {
    return {
      selected: '',
      isError: false
    };
  },
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
    selected: {
      type: String,
      required: true
    },
    required: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    isValid() {
      this.isError = (this.required) ? this.selected.length === 0 : false;
      return !this.isError;
    }
  }
};

export default component;
