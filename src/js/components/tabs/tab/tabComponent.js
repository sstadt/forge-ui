
var tabTemplate = require('./tabTemplate.html');

var events = {};

events['TAB_COMPONENT_TAB_CLICKED'] = function TabClicked() {
  if (typeof this.clickCallback === 'function') {
    this.clickCallback();
  }
};

module.exports = {
  template: tabTemplate,
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
  data: function () {
    return {
      index: 0,
      show: false
    };
  },
  computed: {
    show: function () {
      return (this.$parent.active == this.index);
    }
  },
  watch: {
    heading: function () {
      this.$parent.tabs[this.index].heading = this.heading;
    }
  },
  created: function () {
    this.$parent.tabs.push({
      heading: this.heading,
      disabled: this.disabled,
      active: false
    });
  },
  ready: function () {
    for (var index in this.$parent.$children) {
      if (this.$parent.$children[index].$el == this.$el) {
        this.index = index;
        break;
      }
    }
  },
  events: events
};
