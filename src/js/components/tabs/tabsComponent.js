
var tabsTemplate = require('./tabsTemplate.html');

module.exports = {
  template: tabsTemplate,
  props: {
    active: {
      type: Number,
      default: 0
    }
  },
  data: function () {
    return {
      tabs: []
    };
  },
  ready: function () {
    if (this.tabs[0]) {
      this.tabs[0].active = true;
    }
  },
  methods: {
    handleTabListClick: function (index, el) {
      if (!el.disabled) this.active = index;

      for (var i = 0, j = this.tabs.length; i < j; i++) {
        this.tabs[i].active = (i == index);
        if (this.tabs[i].active) {
          this.$children[i].$emit('TAB_COMPONENT_TAB_CLICKED');
        }
      }
    }
  }
};
