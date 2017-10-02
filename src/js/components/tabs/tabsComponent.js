
import template from './tabsTemplate.html';

var component = {
  template,
  data() {
    return {
      tabs: []
    };
  },
  methods: {
    addTab(newTab) {
      this.tabs.push(newTab);
    },
    activate(selectedTab) {
      _.forEach(this.tabs, function (tab) {
        tab.active = selectedTab.heading === tab.heading;
      });
    }
  }
};

export default component;
