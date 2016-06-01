
var defaultLabels = {
  question: '',
  yes: 'Submit',
  no: 'Cancel'
};

module.exports = {
  template: require('./promptTemplate.html'),
  data: function () {
    return {
      promptValue: '',
      questionLabel: defaultLabels.questionLabel,
      yesLabel: defaultLabels.yesLabel,
      noLabel: defaultLabels.noLabel,
      show: false,
      confirmed: false,
      ask: function (data) {
        var unwatch, self = this;

        self.questionLabel = data.question;
        self.yesLabel = data.yesLabel || defaultLabels.yes;
        self.noLabel = data.noLabel || defaultLabels.no;
        self.confirmed = undefined;
        self.show = true;

        unwatch = self.$watch('$data.confirmed', function (newVal, oldVal) {
          if (newVal && _.isFunction(data.yes)) {
            data.yes(self.promptValue);
          } else if (!newVal && _.isFunction (data.no)) {
            data.no();
          }
          unwatch();
          self.show = false;
        });
      }
    };
  },
  watch: {
    show: function (val) {
      if (val === true && this.$children.length > 0) {
        this.promptValue = '';
        this.$children[0].$children[0].$els.input.focus();
      }
    }
  },
  methods: {
    yes: function () {
      this.confirmed = true;
    },
    no: function () {
      this.confirmed = false;
    }
  }
};
