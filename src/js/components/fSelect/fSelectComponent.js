
import template from './fSelectTemplate.html';

var component = {
  template,
  props: {
    label: {
      type: String,
      default: ''
    },
    value: {
      type: String,
      required: true
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
      isError: false,
      selectedValue: this.value
    };
  },
  watch: {
    selectedValue() {
      this.$emit('input', this.selectedValue);
    }
  },
  mounted() {
    var self = this,
      selectedIndex = self.options.findIndex((option) => option.value === self.selectedValue);

    if (self.required && selectedIndex === -1) {
      self.selectedValue = self.options[0].value;
    }
  }
};

export default component;
