
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
    activate({ heading }) {
      this.tabs.forEach(function (tab) {
        tab.active = heading === tab.heading;
      });
    }
  }
};

export default component;
