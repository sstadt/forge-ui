
var defaultLabels = {
  question: '',
  yes: 'Yes',
  no: 'No'
};

module.exports = {
  template: require('./confirmTemplate.html'),
  data: function () {
    return {
      questionLabel: defaultLabels.questionLabel,
      yesLabel: defaultLabels.yesLabel,
      noLabel: defaultLabels.noLabel,
      show :false,
      confirmed: false,
      ask: function (data) {
        var unwatch, self = this;

        self.questionLabel = data.question;
        self.yesLabel = data.yesLabel || defaultLabels.yes;
        self.noLabel = data.noLabel || defaultLabels.no;
        self.confirmed = undefined;
        self.show = true;

        unwatch = self.$watch('$data.confirmed', function (newVal, oldVal) {
          if (newVal === true && _.isFunction(data.yes)) {
            data.yes();
          } else if (newVal !== oldVal && _.isFunction (data.no)) {
            data.no();
          }
          unwatch();
          self.show = false;
        });
      }
    };
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
