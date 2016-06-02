
module.exports = {
  template: require('./tabsTemplate.html'),
  props: {
    active: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      tabs: []
    };
  },
  ready() {
    if (this.tabs[0]) {
      this.tabs[0].active = true;
    }
  },
  methods: {
    handleTabListClick(index, el) {
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
