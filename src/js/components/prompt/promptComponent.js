
import template from './promptTemplate.html';

var defaultLabels = {
  question: '',
  yes: 'Submit',
  no: 'Cancel'
};

function prompt(vm, options, showInput) {
  var unwatch;

  vm.questionLabel = options.question;
  vm.yesLabel = options.yesLabel || defaultLabels.yes;
  vm.noLabel = options.noLabel || defaultLabels.no;
  vm.confirmed = undefined;
  vm.showInput = showInput;
  vm.show = true;

  unwatch = vm.$watch('$data.confirmed', function (newVal, oldVal) {
    if (newVal && _.isFunction(options.yes)) {
      options.yes((showInput) ? vm.promptValue : null);
    } else if (!newVal && _.isFunction (options.no)) {
      options.no();
    }
    unwatch();
    vm.show = false;
  });
}

var component = {
  template,
  props: {
    transition: {
      type: String,
      default: 'zoom-out'
    }
  },
  data() {
    return {
      promptValue: '',
      questionLabel: defaultLabels.question,
      yesLabel: defaultLabels.yes,
      noLabel: defaultLabels.no,
      show: false,
      confirmed: false,
      showInput: false,
      ask(options) {
        prompt(this, options, true);
      },
      confirm(options) {
        prompt(this, options, false);
      }
    };
  },
  methods: {
    yes() {
      this.confirmed = true;
    },
    no() {
      this.confirmed = false;
    }
  }
};

export default component;
