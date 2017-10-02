
import template from './tabTemplate.html';

// module.exports = {
//   template,
//   props: {
//     heading: {
//       type: String,
//       required: true
//     }
//   },
//   data() {
//     return {
//       active: false
//     };
//   },
//   ready() {
//     this.$dispatch('TAB_COMPONENT_TAB_CREATED', this.heading);
//   },
//   events: {
//     TAB_COMPONENT_TAB_CLICKED(msg) {
//       this.active = this.heading === msg;
//     }
//   }
// };



var component = {
  template,
  props: {
    heading: {
      type: String,
      required: true
    },
    selected: {
      default: false
    }
  },
  data() {
    return {
      active: false
    };
  },
  mounted() {
    this.active = this.selected;
    this.$parent.addTab(this);
  }
};

export default component;
