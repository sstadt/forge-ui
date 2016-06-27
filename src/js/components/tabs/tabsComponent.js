
module.exports = {
  template: require('./tabsTemplate.html'),
  data: function() {
    return {
      tabs: [],
      isactive: ''
    };
  },
  events: {
    TAB_COMPONENT_TAB_CREATED(heading) {
      var self = this;

      this.tabs.push({
        message: heading,
        active: self.tabs.length === 1
      });
    }
  },
  methods: {
    notify: function(msg) {
      this.isactive = msg.message;
      this.$broadcast('test', msg.message);
    }
  }
};

// module.exports = {
//   template: require('./tabsTemplate.html'),
//   props: {
//     active: {
//       type: Number,
//       default: 0
//     }
//   },
//   data() {
//     return {
//       tabs: []
//     };
//   },
//   ready() {
//     if (this.tabs[0]) {
//       this.tabs[0].active = true;
//     }
//   },
//   methods: {
//     handleTabListClick(index, el) {
//       if (!el.disabled) this.active = index;
//
//       for (var i = 0, j = this.tabs.length; i < j; i++) {
//         this.tabs[i].active = (i == index);
//         if (this.tabs[i].active) {
//           this.$children[i].$emit('TAB_COMPONENT_TAB_CLICKED');
//         }
//       }
//     }
//   }
// };
