
module.exports = {
  template: require('./tabTemplate.html'),
  props: {
    heading: {
      type: String,
      required: true
    },
    disabled: {
      type: Boolean,
      default: false
    },
    clickCallback: {
      type: Function
    }
  },
  data() {
    return {
      index: 0,
      show: false
    };
  },
  computed: {
    show() {
      return (this.$parent.active == this.index);
    }
  },
  watch: {
    heading() {
      this.$parent.tabs[this.index].heading = this.heading;
    }
  },
  created() {
    this.$parent.tabs.push({
      heading: this.heading,
      disabled: this.disabled,
      active: false
    });
  },
  ready() {
    for (var index in this.$parent.$children) {
      if (this.$parent.$children[index].$el == this.$el) {
        this.index = index;
        break;
      }
    }
  },
  events: {
    TAB_COMPONENT_TAB_CLICKED: function TabClicked() {
      if (typeof this.clickCallback === 'function') {
        this.clickCallback();
      }
    }
  }
};
