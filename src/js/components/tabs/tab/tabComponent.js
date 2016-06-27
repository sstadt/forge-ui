
module.exports = {
  template: require('./tabTemplate.html'),
  props: ['heading'],
  data: function() {
    return {
      active: false
    };
  },
  ready: function() {
    this.$dispatch('TAB_COMPONENT_TAB_CREATED', this.heading);
  },
  events: {
    'test': function(msg) {
      if (this.heading === msg) {
        this.active = true;
      } else {
        this.active = false;
      }
    }
  }
};

// module.exports = {
//   template: require('./tabTemplate.html'),
//   props: {
//     heading: {
//       type: String,
//       required: true
//     },
//     clickCallback: {
//       type: Function
//     }
//   },
//   data() {
//     return {
//       index: 0,
//       show: false
//     };
//   },
//   computed: {
//     show() {
//       return (this.$parent.active == this.index);
//     }
//   },
//   watch: {
//     heading() {
//       this.$parent.tabs[this.index].heading = this.heading;
//     }
//   },
//   created() {
//     this.$parent.tabs.push({
//       heading: this.heading,
//       active: false
//     });
//   },
//   ready() {
//     for (var index in this.$parent.$children) {
//       if (this.$parent.$children[index].$el == this.$el) {
//         this.index = index;
//         break;
//       }
//     }
//   },
//   events: {
//     TAB_COMPONENT_TAB_CLICKED() {
//       if (typeof this.clickCallback === 'function') {
//         this.clickCallback();
//       }
//     }
//   }
// };
