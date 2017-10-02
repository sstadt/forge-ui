
import template from './tabsTemplate.html';

// var component = {
//   template,
//   data() {
//     return {
//       tabs: [],
//       activeTab: ''
//     };
//   },
//   events: {
//     TAB_COMPONENT_TAB_CREATED(heading) {
//       var self = this,
//         active = this.tabs.length === 0;
//
//       this.tabs.push({ heading, active });
//       if (active) this.activate(heading);
//     }
//   },
//   methods: {
//     activate(heading) {
//       this.activeTab = heading;
//       this.$broadcast('TAB_COMPONENT_TAB_CLICKED', heading);
//     }
//   }
// };




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
