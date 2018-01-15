
import template from './snackbarTemplate.html';

var component = {
  template,
  props: {
    timeout: {
      type: Number,
      default: 4000
    },
    actionLabel: {
      type: String,
      default: 'Go'
    },
    transition: {
      type: String,
      default: 'fade'
    },
    position: {
      type: String,
      default: 'bottom left'
    }
  },
  data() {
    return {
      show: false,
      action: null,
      message: ''
    };
  },
  computed: {
    positionStyle() {
      let style = {};

      if (this.position === 'bottom' || this.position === 'top') {
        style.left = '50%';
        style.transform = 'translateX(-50%)';
      }

      if (this.position === 'left' || this.position === 'right') {
        style.top = '50%';
        style.transform = 'translateY(-50%)';
      }

      if (this.position.indexOf('bottom') > -1) {
        style.bottom = '20px';
      }

      if (this.position.indexOf('top') > -1) {
        style.top = '20px';
      }

      if (this.position.indexOf('left') > -1) {
        style.left = '20px';
      }

      if (this.position.indexOf('right') > -1) {
        style.right = '20px';
      }

      return style;
    },
    actionIsLink() {
      return typeof this.action === 'string';
    }
  },
  methods: {
    toast(msg, action) {
      if (action) {
        this.action = action;
      }

      this.message = msg;
      this.show = true;

      if (this.timeout > 0) {
        setTimeout(() => this.close(), this.timeout);
      }
    },
    executeAction() {
      this.action();
      this.close();
    },
    close() {
      this.show = false;
    },
    reset() {
      this.action = null;
      this.message = '';
    }
  }
};

export default component;
