"use strict";

(function e(t, n, r) {
  function s(o, u) {
    if (!n[o]) {
      if (!t[o]) {
        var a = typeof require == "function" && require;if (!u && a) return a(o, !0);if (i) return i(o, !0);throw new Error("Cannot find module '" + o + "'");
      }var f = n[o] = { exports: {} };t[o][0].call(f.exports, function (e) {
        var n = t[o][1][e];return s(n ? n : e);
      }, f, f.exports, e, t, n, r);
    }return n[o].exports;
  }var i = typeof require == "function" && require;for (var o = 0; o < r.length; o++) {
    s(r[o]);
  }return s;
})({ 1: [function (require, module, exports) {

    var alertComponent = require('./alertComponent.js');

    Vue.component('alert', alertComponent);
  }, { "./alertComponent.js": 2 }], 2: [function (require, module, exports) {

    module.exports = {
      template: require('./alertTemplate.html'),
      props: {
        canClose: {
          type: Boolean,
          defaultsTo: false
        }
      },
      data: function data() {
        return {
          messages: [],
          type: ''
        };
      },

      methods: {
        close: function close() {
          this.messages = [];
        },
        addMessage: function addMessage(type, message) {
          if (this.type !== type) {
            this.type = type;
            this.messages = [message];
          } else {
            this.messages.push(message);
          }
        },
        message: function message(_message) {
          this.addMessage('', _message);
        },
        primary: function primary(message) {
          this.addMessage('primary', message);
        },
        secondary: function secondary(message) {
          this.addMessage('secondary', message);
        },
        success: function success(message) {
          this.addMessage('success', message);
        },
        warning: function warning(message) {
          this.addMessage('warning', message);
        },
        alert: function alert(message) {
          this.addMessage('alert', message);
        }
      }
    };
  }, { "./alertTemplate.html": 3 }], 3: [function (require, module, exports) {
    module.exports = "\n<div class=\"alert-box\" v-bind:class=\"{\n    callout: true,\n    primary: type === 'primary',\n    secondary: type === 'secondary',\n    success: type === 'success',\n    warning: type === 'warning',\n    alert: type === 'alert'\n  }\" transition=\"fade\" v-show=\"messages.length > 0\">\n  <ul>\n    <li v-for=\"message in messages\" track-by=\"$index\">{{ message }}</li>\n  </ul>\n  <button class=\"close-button\" aria-label=\"Dismiss alert\" type=\"button\" v-if=\"canClose\" v-on:click=\"close()\">\n    <span aria-hidden=\"true\">&times;</span>\n  </button>\n</div>\n";
  }, {}], 4: [function (require, module, exports) {

    var iconComponent = require('./iconComponent.js');

    Vue.component('icon', iconComponent);
  }, { "./iconComponent.js": 5 }], 5: [function (require, module, exports) {

    module.exports = {
      template: require('./iconTemplate.html'),
      props: ['name']
    };
  }, { "./iconTemplate.html": 6 }], 6: [function (require, module, exports) {
    module.exports = "\n<svg class=\"icon-image {{ name }}\">\n  <use xmlns:xlink=\"http://www.w3.org/1999/xlink\" xlink:href=\"#icon-{{ name }}\"></use>\n</svg>\n";
  }, {}], 7: [function (require, module, exports) {

    var loaderComponent = require('./loaderComponent.js');

    Vue.component('loader', loaderComponent);
  }, { "./loaderComponent.js": 8 }], 8: [function (require, module, exports) {

    module.exports = {
      template: require('./loaderTemplate.html'),
      data: function data() {
        return {
          greeting: 'loader component'
        };
      },

      methods: {
        sayHi: function sayHi() {
          console.log('hi!');
        }
      }
    };
  }, { "./loaderTemplate.html": 9 }], 9: [function (require, module, exports) {
    module.exports = "<div class=\"loader\">Loading...</div>\n";
  }, {}], 10: [function (require, module, exports) {

    var modalComponent = require('./modalComponent.js');

    Vue.component('modal', modalComponent);
  }, { "./modalComponent.js": 11 }], 11: [function (require, module, exports) {

    module.exports = {
      template: require('./modalTemplate.html'),
      props: {
        show: {
          type: Boolean,
          required: true,
          twoWay: true
        },
        modalSize: {
          type: String,
          default: 'full'
        },
        transition: {
          type: String,
          default: 'zoom-out'
        }
      }
    };
  }, { "./modalTemplate.html": 12 }], 12: [function (require, module, exports) {
    module.exports = "\n<div class=\"modal\" :transition=\"transition\" v-show=\"show\">\n  <div v-on:click.prevent :class=\"{ 'modal-content': true, 'small': modalSize === 'small', 'full': modalSize === 'full' }\">\n    <div class=\"modal-header\">\n      <slot name=\"header\"></slot>\n    </div>\n    <slot name=\"content\"></slot>\n    <span v-on:click=\"show = false\" aria-label=\"Close\">&#215;</span>\n  </div>\n</div>\n";
  }, {}], 13: [function (require, module, exports) {

    var promptComponent = require('./promptComponent');

    Vue.component('prompt', promptComponent);
  }, { "./promptComponent": 14 }], 14: [function (require, module, exports) {

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
          options.yes(showInput ? vm.promptValue : null);
        } else if (!newVal && _.isFunction(options.no)) {
          options.no();
        }
        unwatch();
        vm.show = false;
      });
    }

    module.exports = {
      template: require('./promptTemplate.html'),
      props: {
        transition: {
          type: String,
          default: 'zoom-out'
        }
      },
      data: function data() {
        return {
          promptValue: '',
          questionLabel: defaultLabels.questionLabel,
          yesLabel: defaultLabels.yesLabel,
          noLabel: defaultLabels.noLabel,
          show: false,
          confirmed: false,
          showInput: false,
          ask: function ask(options) {
            prompt(this, options, true);
          },
          confirm: function confirm(options) {
            prompt(this, options, false);
          }
        };
      },

      watch: {
        show: function show(val) {
          if (val === true && this.$children.length > 0) {
            this.promptValue = '';
            this.$children[0].$children[0].$els.input.focus();
          }
        }
      },
      methods: {
        yes: function yes() {
          this.confirmed = true;
        },
        no: function no() {
          this.confirmed = false;
        }
      }
    };
  }, { "./promptTemplate.html": 15 }], 15: [function (require, module, exports) {
    module.exports = "\n\n<div class=\"prompt prompt-modal\" :transition=\"transition\" v-show=\"show\">\n  <div class=\"prompt-overlay\" v-on:click=\"no()\"></div>\n  <div class=\"prompt-content\">\n    <v-form v-if=\"showInput\" :submit-callback=\"yes\" :ajax=\"true\">\n      <p>{{ questionLabel }}</p>\n      <v-input type=\"text\" label=\"Response\" name=\"promptResponse\" :value.sync=\"promptValue\" :required=\"true\"></v-input>\n      <div class=\"controls\">\n        <button type=\"button\" class=\"button small\" v-on:click=\"no()\">{{ noLabel }}</button>\n        <button type=\"submit\" class=\"button small\">{{ yesLabel }}</button>\n      </div>\n    </v-form>\n    <div v-else>\n      <p>{{ questionLabel }}</p>\n      <div class=\"controls\">\n        <button type=\"button\" class=\"button small\" v-on:click=\"no()\">{{ noLabel }}</button>\n        <button type=\"submit\" class=\"button small\" v-on:click=\"yes()\">{{ yesLabel }}</button>\n      </div>\n    </div>\n  </div>\n</div>\n";
  }, {}], 16: [function (require, module, exports) {

    var tabComponent = require('./tabComponent.js');

    Vue.component('tab', tabComponent);
  }, { "./tabComponent.js": 17 }], 17: [function (require, module, exports) {

    module.exports = {
      template: require('./tabTemplate.html'),
      props: {
        heading: {
          type: String,
          required: true
        },
        disabled: {
          type: Boolean,
          default: false
        },
        clickCallback: {
          type: Function
        }
      },
      data: function data() {
        return {
          index: 0,
          show: false
        };
      },

      computed: {
        show: function show() {
          return this.$parent.active == this.index;
        }
      },
      watch: {
        heading: function heading() {
          this.$parent.tabs[this.index].heading = this.heading;
        }
      },
      created: function created() {
        this.$parent.tabs.push({
          heading: this.heading,
          disabled: this.disabled,
          active: false
        });
      },
      ready: function ready() {
        for (var index in this.$parent.$children) {
          if (this.$parent.$children[index].$el == this.$el) {
            this.index = index;
            break;
          }
        }
      },

      events: {
        TAB_COMPONENT_TAB_CLICKED: function TabClicked() {
          if (typeof this.clickCallback === 'function') {
            this.clickCallback();
          }
        }
      }
    };
  }, { "./tabTemplate.html": 18 }], 18: [function (require, module, exports) {
    module.exports = "<div class=\"tab\" v-show=\"show\">\n  <slot></slot>\n</div>\n";
  }, {}], 19: [function (require, module, exports) {

    var tabsComponent = require('./tabsComponent.js');

    require('./tab/tab.js');

    Vue.component('tabs', tabsComponent);
  }, { "./tab/tab.js": 16, "./tabsComponent.js": 20 }], 20: [function (require, module, exports) {

    module.exports = {
      template: require('./tabsTemplate.html'),
      props: {
        active: {
          type: Number,
          default: 0
        }
      },
      data: function data() {
        return {
          tabs: []
        };
      },
      ready: function ready() {
        if (this.tabs[0]) {
          this.tabs[0].active = true;
        }
      },

      methods: {
        handleTabListClick: function handleTabListClick(index, el) {
          if (!el.disabled) this.active = index;

          for (var i = 0, j = this.tabs.length; i < j; i++) {
            this.tabs[i].active = i == index;
            if (this.tabs[i].active) {
              this.$children[i].$emit('TAB_COMPONENT_TAB_CLICKED');
            }
          }
        }
      }
    };
  }, { "./tabsTemplate.html": 21 }], 21: [function (require, module, exports) {
    module.exports = "\n\n<div class=\"tabs\">\n  <!-- Tabs Nav -->\n  <ul class=\"tab-nav\">\n    <li v-for=\"tab in tabs\" v-bind:class=\"{ 'active': tab.active }\" v-on:click.prevent=\"handleTabListClick($index, tab)\" :disabled=\"tab.disabled\">\n      {{ tab.heading }}\n    </li>\n  </ul>\n\n  <!-- Tab Panes -->\n  <div class=\"tab-content\" v-el:tabContent>\n      <slot></slot>\n  </div>\n</div>\n";
  }, {}], 22: [function (require, module, exports) {

    var vCheckboxComponent = require('./vCheckboxComponent.js');

    Vue.component('vCheckbox', vCheckboxComponent);
  }, { "./vCheckboxComponent.js": 23 }], 23: [function (require, module, exports) {

    module.exports = {
      template: require('./vCheckboxTemplate.html'),
      data: function data() {
        return {
          icon: 'unchecked',
          isError: false
        };
      },

      props: {
        checked: {
          type: Boolean,
          required: true,
          twoWay: true
        },
        label: {
          type: String,
          required: true
        },
        required: {
          type: Boolean,
          defaultsTo: false
        }
      },
      watch: {
        checked: function checked(val) {
          this.icon = val === true ? 'checked' : 'unchecked';
        }
      },
      ready: function ready() {
        this.icon = this.checked === true ? 'checked' : 'unchecked';
      },

      methods: {
        toggle: function toggle() {
          this.checked = !this.checked;
        },
        isValid: function isValid() {
          this.isError = this.required ? !this.checked : false;
          return !this.isError;
        }
      }
    };
  }, { "./vCheckboxTemplate.html": 24 }], 24: [function (require, module, exports) {
    module.exports = "\n<div :class=\"{ 'checkbox': true, 'error': isError }\">\n  <icon v-on:click=\"toggle()\" :name=\"icon\"></icon>\n  <span v-on:click=\"toggle()\">{{ label }}</span>\n</div>\n";
  }, {}], 25: [function (require, module, exports) {

    var vFormComponent = require('./vFormComponent.js');

    Vue.component('vForm', vFormComponent);
  }, { "./vFormComponent.js": 26 }], 26: [function (require, module, exports) {

    module.exports = {
      template: require('./vFormTemplate.html'),
      props: {
        method: {
          type: String,
          defaultsTo: 'POST'
        },
        action: {
          type: String,
          defaultsTo: ''
        },
        ajax: {
          type: Boolean,
          defaultsTo: false
        },
        submitCallback: {
          type: Function
        }
      },
      methods: {
        submitForm: function submitForm(event) {
          if (this.ajax || !this.isValid()) {
            event.preventDefault();
          }

          if (this.ajax && this.isValid() && typeof this.submitCallback === 'function') {
            this.submitCallback();
          }
        },
        isValid: function isValid() {
          var self = this,
              formIsValid = true;

          for (var i = 0, j = self.$children.length; i < j; i++) {
            if (_.isFunction(self.$children[i].isValid)) {
              // has input validation attached
              formIsValid = formIsValid && self.$children[i].isValid();
            }
          }

          return formIsValid;
        }
      }
    };
  }, { "./vFormTemplate.html": 27 }], 27: [function (require, module, exports) {
    module.exports = "\n<form v-if=\"ajax\" v-el:form v-on:submit.prevent=\"submitForm\" :method=\"method\" :action=\"action\" novalidate>\n  <slot></slot>\n</form>\n<form v-else v-el:form v-on:submit=\"submitForm\" :method=\"method\" :action=\"action\" novalidate>\n  <slot></slot>\n</form>\n";
  }, {}], 28: [function (require, module, exports) {

    var vInputComponent = require('./vInputComponent.js');

    Vue.component('vInput', vInputComponent);
  }, { "./vInputComponent.js": 29 }], 29: [function (require, module, exports) {

    var validationRules = require('./validationRules.js');

    module.exports = {
      template: require('./vInputTemplate.html'),
      props: {
        label: {
          type: String
        },
        name: {
          type: String
        },
        type: {
          type: String,
          required: true
        },
        placeholder: {
          type: String
        },
        icon: {
          type: String
        },
        value: {
          type: String,
          required: true,
          twoWay: true
        },
        required: {
          type: Boolean,
          defaultsTo: false
        },
        equalTo: {
          type: Object,
          defaultsTo: null
        },
        simple: {
          type: Boolean,
          defaultsTo: false
        }
      },
      data: function data() {
        return {
          error: ''
        };
      },

      filters: {
        isSimple: function isSimple(val) {
          return this.simple ? '' : val;
        }
      },
      methods: {
        isValid: function isValid() {
          this.validate();
          return this.error.length === 0;
        },

        debounceValidate: _.debounce(function () {
          this.validate();
        }, 500),
        validate: function validate() {
          var label = this.label || this.name;

          // required validation
          if (this.required && this.value.length === 0) {
            this.error = label + ' is required';

            // html5 data type validation
          } else if (validationRules.hasOwnProperty(this.type) && !validationRules[this.type].regex.test(this.value)) {
              this.error = validationRules[this.type].defaultError;

              // equivalency validation
            } else if (this.equalTo && this.equalTo.value !== this.value) {
                this.error = 'Must match ' + this.equalTo.label;

                // input is valid
              } else {
                  this.error = '';
                }
        }
      }
    };
  }, { "./vInputTemplate.html": 30, "./validationRules.js": 31 }], 30: [function (require, module, exports) {
    module.exports = "\n<label class=\"v-input\">\n  {{ label | isSimple }}\n  <div class=\"input-wrap\">\n    <i class=\"fa fa-{{ icon }}\" v-if=\"icon\"></i>\n    <textarea v-if=\"type === 'textarea'\"\n      v-el:input\n      :class=\"{ 'error': error.length > 0 }\"\n      name=\"{{ name }}\"\n      placeholder=\"{{ placeholder }}\"\n      v-model=\"value\"\n      v-on:blur=\"validate()\"></textarea>\n    <input v-else\n      v-el:input\n      :class=\"{ 'error': error.length > 0 }\"\n      name=\"{{ name }}\"\n      type=\"{{ type }}\"\n      placeholder=\"{{ placeholder }}\"\n      v-model=\"value\"\n      v-on:blur=\"validate()\" />\n    <small v-if=\"error.length > 0\" transition=\"slide-up-x-small\" class=\"error\">{{ error }}</small>\n  </div>\n</label>\n";
  }, {}], 31: [function (require, module, exports) {

    module.exports = {
      email: {
        regex: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        defaultError: 'Please enter a valid email address'
      },
      url: {
        regex: /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,4}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/,
        defaultError: 'Please enter a valid URL'
      },
      number: {
        regex: /[-.0-9]+/,
        defaultError: 'Please enter a valid number'
      }
    };
  }, {}], 32: [function (require, module, exports) {

    var vSelectComponent = require('./vSelectComponent.js');

    Vue.component('vSelect', vSelectComponent);
  }, { "./vSelectComponent.js": 33 }], 33: [function (require, module, exports) {

    module.exports = {
      template: require('./vSelectTemplate.html'),
      props: {
        label: {
          type: String,
          defaultsTo: ''
        },
        selected: {
          type: String,
          required: true,
          twoWay: true
        },
        options: {
          type: Array,
          required: true
        },
        required: {
          type: Boolean,
          defaultsTo: false
        }
      },
      data: function data() {
        return {
          isError: false
        };
      },
      ready: function ready() {
        var self = this,
            selectedIndex = _.findIndex(self.options, function (option) {
          return option.value === self.selected;
        });

        if (self.required && selectedIndex === -1) {
          self.selected = self.options[0].value;
        }
      },

      methods: {
        isValid: function isValid() {
          this.isError = !this.required || this.selected.length > 0;
          return this.isError;
        }
      }
    };
  }, { "./vSelectTemplate.html": 34 }], 34: [function (require, module, exports) {
    module.exports = "\n<label class=\"v-select\">\n  {{ label }}\n  <select v-model=\"selected\" :class=\"{ 'error': isError }\">\n    <option v-if=\"!required\" value=\"\"></option>\n    <option v-for=\"option in options\" :value=\"option.value\">{{ option.label }}</option>\n  </select>\n</label>\n";
  }, {}], 35: [function (require, module, exports) {

    require('./components/alert/alert.js');
    require('./components/icon/icon.js');
    require('./components/modal/modal.js');
    require('./components/prompt/prompt.js');
    require('./components/loader/loader.js');
    require('./components/tabs/tabs.js');
    require('./components/vForm/vForm.js');
    require('./components/vInput/vInput.js');
    require('./components/vSelect/vSelect.js');
    require('./components/vCheckbox/vCheckbox.js');
  }, { "./components/alert/alert.js": 1, "./components/icon/icon.js": 4, "./components/loader/loader.js": 7, "./components/modal/modal.js": 10, "./components/prompt/prompt.js": 13, "./components/tabs/tabs.js": 19, "./components/vCheckbox/vCheckbox.js": 22, "./components/vForm/vForm.js": 25, "./components/vInput/vInput.js": 28, "./components/vSelect/vSelect.js": 32 }] }, {}, [35]);
//# sourceMappingURL=data:application/json;base64,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QUFrQ2YsZUFBUztBQUNQLGVBRE8scUJBQ0c7QUFDUixlQUFLLE9BQUwsR0FBZSxDQUFDLEtBQUssUUFBTixJQUFrQixLQUFLLFFBQUwsQ0FBYyxNQUFkLEdBQXVCLENBQXhEO0FBQ0EsaUJBQU8sS0FBSyxPQUFaO0FBQ0Q7QUFKTTtBQWxDTSxLQUFqQjtBQTBDQyxHQTVDa0MsRUE0Q2pDLEVBQUMsMEJBQXlCLEVBQTFCLEVBNUNpQyxDQWhpQnNYLEVBNGtCeFgsSUFBRyxDQUFDLFVBQVMsT0FBVCxFQUFpQixNQUFqQixFQUF3QixPQUF4QixFQUFnQztBQUNyRSxXQUFPLE9BQVAsR0FBaUIseVJBQWpCO0FBRUMsR0FIbUMsRUFHbEMsRUFIa0MsQ0E1a0JxWCxFQStrQm5aLElBQUcsQ0FBQyxVQUFTLE9BQVQsRUFBaUIsTUFBakIsRUFBd0IsT0FBeEIsRUFBZ0M7O0FBRTFDLFlBQVEsNkJBQVI7QUFDQSxZQUFRLDJCQUFSO0FBQ0EsWUFBUSw2QkFBUjtBQUNBLFlBQVEsK0JBQVI7QUFDQSxZQUFRLCtCQUFSO0FBQ0EsWUFBUSwyQkFBUjtBQUNBLFlBQVEsNkJBQVI7QUFDQSxZQUFRLCtCQUFSO0FBQ0EsWUFBUSxpQ0FBUjtBQUNBLFlBQVEscUNBQVI7QUFFQyxHQWJRLEVBYVAsRUFBQywrQkFBOEIsQ0FBL0IsRUFBaUMsNkJBQTRCLENBQTdELEVBQStELGlDQUFnQyxDQUEvRixFQUFpRywrQkFBOEIsRUFBL0gsRUFBa0ksaUNBQWdDLEVBQWxLLEVBQXFLLDZCQUE0QixFQUFqTSxFQUFvTSx1Q0FBc0MsRUFBMU8sRUFBNk8sK0JBQThCLEVBQTNRLEVBQThRLGlDQUFnQyxFQUE5UyxFQUFpVCxtQ0FBa0MsRUFBblYsRUFiTyxDQS9rQmdaLEVBQXpaLEVBNGxCMlYsRUE1bEIzVixFQTRsQjhWLENBQUMsRUFBRCxDQTVsQjlWIiwiZmlsZSI6Im15dWkuanMiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3Rocm93IG5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIil9dmFyIGY9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGYuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sZixmLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSh7MTpbZnVuY3Rpb24ocmVxdWlyZSxtb2R1bGUsZXhwb3J0cyl7XG5cbnZhciBhbGVydENvbXBvbmVudCA9IHJlcXVpcmUoJy4vYWxlcnRDb21wb25lbnQuanMnKTtcblxuVnVlLmNvbXBvbmVudCgnYWxlcnQnLCBhbGVydENvbXBvbmVudCk7XG5cbn0se1wiLi9hbGVydENvbXBvbmVudC5qc1wiOjJ9XSwyOltmdW5jdGlvbihyZXF1aXJlLG1vZHVsZSxleHBvcnRzKXtcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIHRlbXBsYXRlOiByZXF1aXJlKCcuL2FsZXJ0VGVtcGxhdGUuaHRtbCcpLFxuICBwcm9wczoge1xuICAgIGNhbkNsb3NlOiB7XG4gICAgICB0eXBlOiBCb29sZWFuLFxuICAgICAgZGVmYXVsdHNUbzogZmFsc2VcbiAgICB9XG4gIH0sXG4gIGRhdGEoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIG1lc3NhZ2VzOiBbXSxcbiAgICAgIHR5cGU6ICcnXG4gICAgfTtcbiAgfSxcbiAgbWV0aG9kczoge1xuICAgIGNsb3NlKCkge1xuICAgICAgdGhpcy5tZXNzYWdlcyA9IFtdO1xuICAgIH0sXG4gICAgYWRkTWVzc2FnZSh0eXBlLCBtZXNzYWdlKSB7XG4gICAgICBpZiAodGhpcy50eXBlICE9PSB0eXBlKSB7XG4gICAgICAgIHRoaXMudHlwZSA9IHR5cGU7XG4gICAgICAgIHRoaXMubWVzc2FnZXMgPSBbbWVzc2FnZV07XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLm1lc3NhZ2VzLnB1c2gobWVzc2FnZSk7XG4gICAgICB9XG4gICAgfSxcbiAgICBtZXNzYWdlKG1lc3NhZ2UpIHtcbiAgICAgIHRoaXMuYWRkTWVzc2FnZSgnJywgbWVzc2FnZSk7XG4gICAgfSxcbiAgICBwcmltYXJ5KG1lc3NhZ2UpIHtcbiAgICAgIHRoaXMuYWRkTWVzc2FnZSgncHJpbWFyeScsIG1lc3NhZ2UpO1xuICAgIH0sXG4gICAgc2Vjb25kYXJ5KG1lc3NhZ2UpIHtcbiAgICAgIHRoaXMuYWRkTWVzc2FnZSgnc2Vjb25kYXJ5JywgbWVzc2FnZSk7XG4gICAgfSxcbiAgICBzdWNjZXNzKG1lc3NhZ2UpIHtcbiAgICAgIHRoaXMuYWRkTWVzc2FnZSgnc3VjY2VzcycsIG1lc3NhZ2UpO1xuICAgIH0sXG4gICAgd2FybmluZyhtZXNzYWdlKSB7XG4gICAgICB0aGlzLmFkZE1lc3NhZ2UoJ3dhcm5pbmcnLCBtZXNzYWdlKTtcbiAgICB9LFxuICAgIGFsZXJ0KG1lc3NhZ2UpIHtcbiAgICAgIHRoaXMuYWRkTWVzc2FnZSgnYWxlcnQnLCBtZXNzYWdlKTtcbiAgICB9XG4gIH1cbn07XG5cbn0se1wiLi9hbGVydFRlbXBsYXRlLmh0bWxcIjozfV0sMzpbZnVuY3Rpb24ocmVxdWlyZSxtb2R1bGUsZXhwb3J0cyl7XG5tb2R1bGUuZXhwb3J0cyA9IFwiXFxuPGRpdiBjbGFzcz1cXFwiYWxlcnQtYm94XFxcIiB2LWJpbmQ6Y2xhc3M9XFxcIntcXG4gICAgY2FsbG91dDogdHJ1ZSxcXG4gICAgcHJpbWFyeTogdHlwZSA9PT0gJ3ByaW1hcnknLFxcbiAgICBzZWNvbmRhcnk6IHR5cGUgPT09ICdzZWNvbmRhcnknLFxcbiAgICBzdWNjZXNzOiB0eXBlID09PSAnc3VjY2VzcycsXFxuICAgIHdhcm5pbmc6IHR5cGUgPT09ICd3YXJuaW5nJyxcXG4gICAgYWxlcnQ6IHR5cGUgPT09ICdhbGVydCdcXG4gIH1cXFwiIHRyYW5zaXRpb249XFxcImZhZGVcXFwiIHYtc2hvdz1cXFwibWVzc2FnZXMubGVuZ3RoID4gMFxcXCI+XFxuICA8dWw+XFxuICAgIDxsaSB2LWZvcj1cXFwibWVzc2FnZSBpbiBtZXNzYWdlc1xcXCIgdHJhY2stYnk9XFxcIiRpbmRleFxcXCI+e3sgbWVzc2FnZSB9fTwvbGk+XFxuICA8L3VsPlxcbiAgPGJ1dHRvbiBjbGFzcz1cXFwiY2xvc2UtYnV0dG9uXFxcIiBhcmlhLWxhYmVsPVxcXCJEaXNtaXNzIGFsZXJ0XFxcIiB0eXBlPVxcXCJidXR0b25cXFwiIHYtaWY9XFxcImNhbkNsb3NlXFxcIiB2LW9uOmNsaWNrPVxcXCJjbG9zZSgpXFxcIj5cXG4gICAgPHNwYW4gYXJpYS1oaWRkZW49XFxcInRydWVcXFwiPiZ0aW1lczs8L3NwYW4+XFxuICA8L2J1dHRvbj5cXG48L2Rpdj5cXG5cIjtcblxufSx7fV0sNDpbZnVuY3Rpb24ocmVxdWlyZSxtb2R1bGUsZXhwb3J0cyl7XG5cbnZhciBpY29uQ29tcG9uZW50ID0gcmVxdWlyZSgnLi9pY29uQ29tcG9uZW50LmpzJyk7XG5cblZ1ZS5jb21wb25lbnQoJ2ljb24nLCBpY29uQ29tcG9uZW50KTtcblxufSx7XCIuL2ljb25Db21wb25lbnQuanNcIjo1fV0sNTpbZnVuY3Rpb24ocmVxdWlyZSxtb2R1bGUsZXhwb3J0cyl7XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICB0ZW1wbGF0ZTogcmVxdWlyZSgnLi9pY29uVGVtcGxhdGUuaHRtbCcpLFxuICBwcm9wczogWyduYW1lJ11cbn07XG5cbn0se1wiLi9pY29uVGVtcGxhdGUuaHRtbFwiOjZ9XSw2OltmdW5jdGlvbihyZXF1aXJlLG1vZHVsZSxleHBvcnRzKXtcbm1vZHVsZS5leHBvcnRzID0gXCJcXG48c3ZnIGNsYXNzPVxcXCJpY29uLWltYWdlIHt7IG5hbWUgfX1cXFwiPlxcbiAgPHVzZSB4bWxuczp4bGluaz1cXFwiaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGlua1xcXCIgeGxpbms6aHJlZj1cXFwiI2ljb24te3sgbmFtZSB9fVxcXCI+PC91c2U+XFxuPC9zdmc+XFxuXCI7XG5cbn0se31dLDc6W2Z1bmN0aW9uKHJlcXVpcmUsbW9kdWxlLGV4cG9ydHMpe1xuXG52YXIgbG9hZGVyQ29tcG9uZW50ID0gcmVxdWlyZSgnLi9sb2FkZXJDb21wb25lbnQuanMnKTtcblxuVnVlLmNvbXBvbmVudCgnbG9hZGVyJywgbG9hZGVyQ29tcG9uZW50KTtcblxufSx7XCIuL2xvYWRlckNvbXBvbmVudC5qc1wiOjh9XSw4OltmdW5jdGlvbihyZXF1aXJlLG1vZHVsZSxleHBvcnRzKXtcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIHRlbXBsYXRlOiByZXF1aXJlKCcuL2xvYWRlclRlbXBsYXRlLmh0bWwnKSxcbiAgZGF0YSgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgZ3JlZXRpbmc6ICdsb2FkZXIgY29tcG9uZW50JyxcbiAgICB9O1xuICB9LFxuICBtZXRob2RzOiB7XG4gICAgc2F5SGkoKSB7XG4gICAgICBjb25zb2xlLmxvZygnaGkhJyk7XG4gICAgfVxuICB9XG59O1xuXG59LHtcIi4vbG9hZGVyVGVtcGxhdGUuaHRtbFwiOjl9XSw5OltmdW5jdGlvbihyZXF1aXJlLG1vZHVsZSxleHBvcnRzKXtcbm1vZHVsZS5leHBvcnRzID0gXCI8ZGl2IGNsYXNzPVxcXCJsb2FkZXJcXFwiPkxvYWRpbmcuLi48L2Rpdj5cXG5cIjtcblxufSx7fV0sMTA6W2Z1bmN0aW9uKHJlcXVpcmUsbW9kdWxlLGV4cG9ydHMpe1xuXG52YXIgbW9kYWxDb21wb25lbnQgPSByZXF1aXJlKCcuL21vZGFsQ29tcG9uZW50LmpzJyk7XG5cblZ1ZS5jb21wb25lbnQoJ21vZGFsJywgbW9kYWxDb21wb25lbnQpO1xuXG59LHtcIi4vbW9kYWxDb21wb25lbnQuanNcIjoxMX1dLDExOltmdW5jdGlvbihyZXF1aXJlLG1vZHVsZSxleHBvcnRzKXtcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIHRlbXBsYXRlOiByZXF1aXJlKCcuL21vZGFsVGVtcGxhdGUuaHRtbCcpLFxuICBwcm9wczoge1xuICAgIHNob3c6IHtcbiAgICAgIHR5cGU6IEJvb2xlYW4sXG4gICAgICByZXF1aXJlZDogdHJ1ZSxcbiAgICAgIHR3b1dheTogdHJ1ZVxuICAgIH0sXG4gICAgbW9kYWxTaXplOiB7XG4gICAgICB0eXBlOiBTdHJpbmcsXG4gICAgICBkZWZhdWx0OiAnZnVsbCdcbiAgICB9LFxuICAgIHRyYW5zaXRpb246IHtcbiAgICAgIHR5cGU6IFN0cmluZyxcbiAgICAgIGRlZmF1bHQ6ICd6b29tLW91dCdcbiAgICB9XG4gIH1cbn07XG5cbn0se1wiLi9tb2RhbFRlbXBsYXRlLmh0bWxcIjoxMn1dLDEyOltmdW5jdGlvbihyZXF1aXJlLG1vZHVsZSxleHBvcnRzKXtcbm1vZHVsZS5leHBvcnRzID0gXCJcXG48ZGl2IGNsYXNzPVxcXCJtb2RhbFxcXCIgOnRyYW5zaXRpb249XFxcInRyYW5zaXRpb25cXFwiIHYtc2hvdz1cXFwic2hvd1xcXCI+XFxuICA8ZGl2IHYtb246Y2xpY2sucHJldmVudCA6Y2xhc3M9XFxcInsgJ21vZGFsLWNvbnRlbnQnOiB0cnVlLCAnc21hbGwnOiBtb2RhbFNpemUgPT09ICdzbWFsbCcsICdmdWxsJzogbW9kYWxTaXplID09PSAnZnVsbCcgfVxcXCI+XFxuICAgIDxkaXYgY2xhc3M9XFxcIm1vZGFsLWhlYWRlclxcXCI+XFxuICAgICAgPHNsb3QgbmFtZT1cXFwiaGVhZGVyXFxcIj48L3Nsb3Q+XFxuICAgIDwvZGl2PlxcbiAgICA8c2xvdCBuYW1lPVxcXCJjb250ZW50XFxcIj48L3Nsb3Q+XFxuICAgIDxzcGFuIHYtb246Y2xpY2s9XFxcInNob3cgPSBmYWxzZVxcXCIgYXJpYS1sYWJlbD1cXFwiQ2xvc2VcXFwiPiYjMjE1Ozwvc3Bhbj5cXG4gIDwvZGl2PlxcbjwvZGl2PlxcblwiO1xuXG59LHt9XSwxMzpbZnVuY3Rpb24ocmVxdWlyZSxtb2R1bGUsZXhwb3J0cyl7XG5cbnZhciBwcm9tcHRDb21wb25lbnQgPSByZXF1aXJlKCcuL3Byb21wdENvbXBvbmVudCcpO1xuXG5WdWUuY29tcG9uZW50KCdwcm9tcHQnLCBwcm9tcHRDb21wb25lbnQpO1xuXG59LHtcIi4vcHJvbXB0Q29tcG9uZW50XCI6MTR9XSwxNDpbZnVuY3Rpb24ocmVxdWlyZSxtb2R1bGUsZXhwb3J0cyl7XG5cbnZhciBkZWZhdWx0TGFiZWxzID0ge1xuICBxdWVzdGlvbjogJycsXG4gIHllczogJ1N1Ym1pdCcsXG4gIG5vOiAnQ2FuY2VsJ1xufTtcblxuZnVuY3Rpb24gcHJvbXB0KHZtLCBvcHRpb25zLCBzaG93SW5wdXQpIHtcbiAgdmFyIHVud2F0Y2g7XG5cbiAgdm0ucXVlc3Rpb25MYWJlbCA9IG9wdGlvbnMucXVlc3Rpb247XG4gIHZtLnllc0xhYmVsID0gb3B0aW9ucy55ZXNMYWJlbCB8fCBkZWZhdWx0TGFiZWxzLnllcztcbiAgdm0ubm9MYWJlbCA9IG9wdGlvbnMubm9MYWJlbCB8fCBkZWZhdWx0TGFiZWxzLm5vO1xuICB2bS5jb25maXJtZWQgPSB1bmRlZmluZWQ7XG4gIHZtLnNob3dJbnB1dCA9IHNob3dJbnB1dDtcbiAgdm0uc2hvdyA9IHRydWU7XG5cbiAgdW53YXRjaCA9IHZtLiR3YXRjaCgnJGRhdGEuY29uZmlybWVkJywgZnVuY3Rpb24gKG5ld1ZhbCwgb2xkVmFsKSB7XG4gICAgaWYgKG5ld1ZhbCAmJiBfLmlzRnVuY3Rpb24ob3B0aW9ucy55ZXMpKSB7XG4gICAgICBvcHRpb25zLnllcygoc2hvd0lucHV0KSA/IHZtLnByb21wdFZhbHVlIDogbnVsbCk7XG4gICAgfSBlbHNlIGlmICghbmV3VmFsICYmIF8uaXNGdW5jdGlvbiAob3B0aW9ucy5ubykpIHtcbiAgICAgIG9wdGlvbnMubm8oKTtcbiAgICB9XG4gICAgdW53YXRjaCgpO1xuICAgIHZtLnNob3cgPSBmYWxzZTtcbiAgfSk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICB0ZW1wbGF0ZTogcmVxdWlyZSgnLi9wcm9tcHRUZW1wbGF0ZS5odG1sJyksXG4gIHByb3BzOiB7XG4gICAgdHJhbnNpdGlvbjoge1xuICAgICAgdHlwZTogU3RyaW5nLFxuICAgICAgZGVmYXVsdDogJ3pvb20tb3V0J1xuICAgIH1cbiAgfSxcbiAgZGF0YSgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgcHJvbXB0VmFsdWU6ICcnLFxuICAgICAgcXVlc3Rpb25MYWJlbDogZGVmYXVsdExhYmVscy5xdWVzdGlvbkxhYmVsLFxuICAgICAgeWVzTGFiZWw6IGRlZmF1bHRMYWJlbHMueWVzTGFiZWwsXG4gICAgICBub0xhYmVsOiBkZWZhdWx0TGFiZWxzLm5vTGFiZWwsXG4gICAgICBzaG93OiBmYWxzZSxcbiAgICAgIGNvbmZpcm1lZDogZmFsc2UsXG4gICAgICBzaG93SW5wdXQ6IGZhbHNlLFxuICAgICAgYXNrKG9wdGlvbnMpIHtcbiAgICAgICAgcHJvbXB0KHRoaXMsIG9wdGlvbnMsIHRydWUpO1xuICAgICAgfSxcbiAgICAgIGNvbmZpcm0ob3B0aW9ucykge1xuICAgICAgICBwcm9tcHQodGhpcywgb3B0aW9ucywgZmFsc2UpO1xuICAgICAgfVxuICAgIH07XG4gIH0sXG4gIHdhdGNoOiB7XG4gICAgc2hvdyh2YWwpIHtcbiAgICAgIGlmICh2YWwgPT09IHRydWUgJiYgdGhpcy4kY2hpbGRyZW4ubGVuZ3RoID4gMCkge1xuICAgICAgICB0aGlzLnByb21wdFZhbHVlID0gJyc7XG4gICAgICAgIHRoaXMuJGNoaWxkcmVuWzBdLiRjaGlsZHJlblswXS4kZWxzLmlucHV0LmZvY3VzKCk7XG4gICAgICB9XG4gICAgfVxuICB9LFxuICBtZXRob2RzOiB7XG4gICAgeWVzKCkge1xuICAgICAgdGhpcy5jb25maXJtZWQgPSB0cnVlO1xuICAgIH0sXG4gICAgbm8oKSB7XG4gICAgICB0aGlzLmNvbmZpcm1lZCA9IGZhbHNlO1xuICAgIH1cbiAgfVxufTtcblxufSx7XCIuL3Byb21wdFRlbXBsYXRlLmh0bWxcIjoxNX1dLDE1OltmdW5jdGlvbihyZXF1aXJlLG1vZHVsZSxleHBvcnRzKXtcbm1vZHVsZS5leHBvcnRzID0gXCJcXG5cXG48ZGl2IGNsYXNzPVxcXCJwcm9tcHQgcHJvbXB0LW1vZGFsXFxcIiA6dHJhbnNpdGlvbj1cXFwidHJhbnNpdGlvblxcXCIgdi1zaG93PVxcXCJzaG93XFxcIj5cXG4gIDxkaXYgY2xhc3M9XFxcInByb21wdC1vdmVybGF5XFxcIiB2LW9uOmNsaWNrPVxcXCJubygpXFxcIj48L2Rpdj5cXG4gIDxkaXYgY2xhc3M9XFxcInByb21wdC1jb250ZW50XFxcIj5cXG4gICAgPHYtZm9ybSB2LWlmPVxcXCJzaG93SW5wdXRcXFwiIDpzdWJtaXQtY2FsbGJhY2s9XFxcInllc1xcXCIgOmFqYXg9XFxcInRydWVcXFwiPlxcbiAgICAgIDxwPnt7IHF1ZXN0aW9uTGFiZWwgfX08L3A+XFxuICAgICAgPHYtaW5wdXQgdHlwZT1cXFwidGV4dFxcXCIgbGFiZWw9XFxcIlJlc3BvbnNlXFxcIiBuYW1lPVxcXCJwcm9tcHRSZXNwb25zZVxcXCIgOnZhbHVlLnN5bmM9XFxcInByb21wdFZhbHVlXFxcIiA6cmVxdWlyZWQ9XFxcInRydWVcXFwiPjwvdi1pbnB1dD5cXG4gICAgICA8ZGl2IGNsYXNzPVxcXCJjb250cm9sc1xcXCI+XFxuICAgICAgICA8YnV0dG9uIHR5cGU9XFxcImJ1dHRvblxcXCIgY2xhc3M9XFxcImJ1dHRvbiBzbWFsbFxcXCIgdi1vbjpjbGljaz1cXFwibm8oKVxcXCI+e3sgbm9MYWJlbCB9fTwvYnV0dG9uPlxcbiAgICAgICAgPGJ1dHRvbiB0eXBlPVxcXCJzdWJtaXRcXFwiIGNsYXNzPVxcXCJidXR0b24gc21hbGxcXFwiPnt7IHllc0xhYmVsIH19PC9idXR0b24+XFxuICAgICAgPC9kaXY+XFxuICAgIDwvdi1mb3JtPlxcbiAgICA8ZGl2IHYtZWxzZT5cXG4gICAgICA8cD57eyBxdWVzdGlvbkxhYmVsIH19PC9wPlxcbiAgICAgIDxkaXYgY2xhc3M9XFxcImNvbnRyb2xzXFxcIj5cXG4gICAgICAgIDxidXR0b24gdHlwZT1cXFwiYnV0dG9uXFxcIiBjbGFzcz1cXFwiYnV0dG9uIHNtYWxsXFxcIiB2LW9uOmNsaWNrPVxcXCJubygpXFxcIj57eyBub0xhYmVsIH19PC9idXR0b24+XFxuICAgICAgICA8YnV0dG9uIHR5cGU9XFxcInN1Ym1pdFxcXCIgY2xhc3M9XFxcImJ1dHRvbiBzbWFsbFxcXCIgdi1vbjpjbGljaz1cXFwieWVzKClcXFwiPnt7IHllc0xhYmVsIH19PC9idXR0b24+XFxuICAgICAgPC9kaXY+XFxuICAgIDwvZGl2PlxcbiAgPC9kaXY+XFxuPC9kaXY+XFxuXCI7XG5cbn0se31dLDE2OltmdW5jdGlvbihyZXF1aXJlLG1vZHVsZSxleHBvcnRzKXtcblxudmFyIHRhYkNvbXBvbmVudCA9IHJlcXVpcmUoJy4vdGFiQ29tcG9uZW50LmpzJyk7XG5cblZ1ZS5jb21wb25lbnQoJ3RhYicsIHRhYkNvbXBvbmVudCk7XG5cbn0se1wiLi90YWJDb21wb25lbnQuanNcIjoxN31dLDE3OltmdW5jdGlvbihyZXF1aXJlLG1vZHVsZSxleHBvcnRzKXtcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIHRlbXBsYXRlOiByZXF1aXJlKCcuL3RhYlRlbXBsYXRlLmh0bWwnKSxcbiAgcHJvcHM6IHtcbiAgICBoZWFkaW5nOiB7XG4gICAgICB0eXBlOiBTdHJpbmcsXG4gICAgICByZXF1aXJlZDogdHJ1ZVxuICAgIH0sXG4gICAgZGlzYWJsZWQ6IHtcbiAgICAgIHR5cGU6IEJvb2xlYW4sXG4gICAgICBkZWZhdWx0OiBmYWxzZVxuICAgIH0sXG4gICAgY2xpY2tDYWxsYmFjazoge1xuICAgICAgdHlwZTogRnVuY3Rpb25cbiAgICB9XG4gIH0sXG4gIGRhdGEoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGluZGV4OiAwLFxuICAgICAgc2hvdzogZmFsc2VcbiAgICB9O1xuICB9LFxuICBjb21wdXRlZDoge1xuICAgIHNob3coKSB7XG4gICAgICByZXR1cm4gKHRoaXMuJHBhcmVudC5hY3RpdmUgPT0gdGhpcy5pbmRleCk7XG4gICAgfVxuICB9LFxuICB3YXRjaDoge1xuICAgIGhlYWRpbmcoKSB7XG4gICAgICB0aGlzLiRwYXJlbnQudGFic1t0aGlzLmluZGV4XS5oZWFkaW5nID0gdGhpcy5oZWFkaW5nO1xuICAgIH1cbiAgfSxcbiAgY3JlYXRlZCgpIHtcbiAgICB0aGlzLiRwYXJlbnQudGFicy5wdXNoKHtcbiAgICAgIGhlYWRpbmc6IHRoaXMuaGVhZGluZyxcbiAgICAgIGRpc2FibGVkOiB0aGlzLmRpc2FibGVkLFxuICAgICAgYWN0aXZlOiBmYWxzZVxuICAgIH0pO1xuICB9LFxuICByZWFkeSgpIHtcbiAgICBmb3IgKHZhciBpbmRleCBpbiB0aGlzLiRwYXJlbnQuJGNoaWxkcmVuKSB7XG4gICAgICBpZiAodGhpcy4kcGFyZW50LiRjaGlsZHJlbltpbmRleF0uJGVsID09IHRoaXMuJGVsKSB7XG4gICAgICAgIHRoaXMuaW5kZXggPSBpbmRleDtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfVxuICB9LFxuICBldmVudHM6IHtcbiAgICBUQUJfQ09NUE9ORU5UX1RBQl9DTElDS0VEOiBmdW5jdGlvbiBUYWJDbGlja2VkKCkge1xuICAgICAgaWYgKHR5cGVvZiB0aGlzLmNsaWNrQ2FsbGJhY2sgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgdGhpcy5jbGlja0NhbGxiYWNrKCk7XG4gICAgICB9XG4gICAgfVxuICB9XG59O1xuXG59LHtcIi4vdGFiVGVtcGxhdGUuaHRtbFwiOjE4fV0sMTg6W2Z1bmN0aW9uKHJlcXVpcmUsbW9kdWxlLGV4cG9ydHMpe1xubW9kdWxlLmV4cG9ydHMgPSBcIjxkaXYgY2xhc3M9XFxcInRhYlxcXCIgdi1zaG93PVxcXCJzaG93XFxcIj5cXG4gIDxzbG90Pjwvc2xvdD5cXG48L2Rpdj5cXG5cIjtcblxufSx7fV0sMTk6W2Z1bmN0aW9uKHJlcXVpcmUsbW9kdWxlLGV4cG9ydHMpe1xuXG52YXIgdGFic0NvbXBvbmVudCA9IHJlcXVpcmUoJy4vdGFic0NvbXBvbmVudC5qcycpO1xuXG5yZXF1aXJlKCcuL3RhYi90YWIuanMnKTtcblxuVnVlLmNvbXBvbmVudCgndGFicycsIHRhYnNDb21wb25lbnQpO1xuXG59LHtcIi4vdGFiL3RhYi5qc1wiOjE2LFwiLi90YWJzQ29tcG9uZW50LmpzXCI6MjB9XSwyMDpbZnVuY3Rpb24ocmVxdWlyZSxtb2R1bGUsZXhwb3J0cyl7XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICB0ZW1wbGF0ZTogcmVxdWlyZSgnLi90YWJzVGVtcGxhdGUuaHRtbCcpLFxuICBwcm9wczoge1xuICAgIGFjdGl2ZToge1xuICAgICAgdHlwZTogTnVtYmVyLFxuICAgICAgZGVmYXVsdDogMFxuICAgIH1cbiAgfSxcbiAgZGF0YSgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgdGFiczogW11cbiAgICB9O1xuICB9LFxuICByZWFkeSgpIHtcbiAgICBpZiAodGhpcy50YWJzWzBdKSB7XG4gICAgICB0aGlzLnRhYnNbMF0uYWN0aXZlID0gdHJ1ZTtcbiAgICB9XG4gIH0sXG4gIG1ldGhvZHM6IHtcbiAgICBoYW5kbGVUYWJMaXN0Q2xpY2soaW5kZXgsIGVsKSB7XG4gICAgICBpZiAoIWVsLmRpc2FibGVkKSB0aGlzLmFjdGl2ZSA9IGluZGV4O1xuXG4gICAgICBmb3IgKHZhciBpID0gMCwgaiA9IHRoaXMudGFicy5sZW5ndGg7IGkgPCBqOyBpKyspIHtcbiAgICAgICAgdGhpcy50YWJzW2ldLmFjdGl2ZSA9IChpID09IGluZGV4KTtcbiAgICAgICAgaWYgKHRoaXMudGFic1tpXS5hY3RpdmUpIHtcbiAgICAgICAgICB0aGlzLiRjaGlsZHJlbltpXS4kZW1pdCgnVEFCX0NPTVBPTkVOVF9UQUJfQ0xJQ0tFRCcpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG59O1xuXG59LHtcIi4vdGFic1RlbXBsYXRlLmh0bWxcIjoyMX1dLDIxOltmdW5jdGlvbihyZXF1aXJlLG1vZHVsZSxleHBvcnRzKXtcbm1vZHVsZS5leHBvcnRzID0gXCJcXG5cXG48ZGl2IGNsYXNzPVxcXCJ0YWJzXFxcIj5cXG4gIDwhLS0gVGFicyBOYXYgLS0+XFxuICA8dWwgY2xhc3M9XFxcInRhYi1uYXZcXFwiPlxcbiAgICA8bGkgdi1mb3I9XFxcInRhYiBpbiB0YWJzXFxcIiB2LWJpbmQ6Y2xhc3M9XFxcInsgJ2FjdGl2ZSc6IHRhYi5hY3RpdmUgfVxcXCIgdi1vbjpjbGljay5wcmV2ZW50PVxcXCJoYW5kbGVUYWJMaXN0Q2xpY2soJGluZGV4LCB0YWIpXFxcIiA6ZGlzYWJsZWQ9XFxcInRhYi5kaXNhYmxlZFxcXCI+XFxuICAgICAge3sgdGFiLmhlYWRpbmcgfX1cXG4gICAgPC9saT5cXG4gIDwvdWw+XFxuXFxuICA8IS0tIFRhYiBQYW5lcyAtLT5cXG4gIDxkaXYgY2xhc3M9XFxcInRhYi1jb250ZW50XFxcIiB2LWVsOnRhYkNvbnRlbnQ+XFxuICAgICAgPHNsb3Q+PC9zbG90PlxcbiAgPC9kaXY+XFxuPC9kaXY+XFxuXCI7XG5cbn0se31dLDIyOltmdW5jdGlvbihyZXF1aXJlLG1vZHVsZSxleHBvcnRzKXtcblxudmFyIHZDaGVja2JveENvbXBvbmVudCA9IHJlcXVpcmUoJy4vdkNoZWNrYm94Q29tcG9uZW50LmpzJyk7XG5cblZ1ZS5jb21wb25lbnQoJ3ZDaGVja2JveCcsIHZDaGVja2JveENvbXBvbmVudCk7XG5cbn0se1wiLi92Q2hlY2tib3hDb21wb25lbnQuanNcIjoyM31dLDIzOltmdW5jdGlvbihyZXF1aXJlLG1vZHVsZSxleHBvcnRzKXtcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIHRlbXBsYXRlOiByZXF1aXJlKCcuL3ZDaGVja2JveFRlbXBsYXRlLmh0bWwnKSxcbiAgZGF0YSgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgaWNvbjogJ3VuY2hlY2tlZCcsXG4gICAgICBpc0Vycm9yOiBmYWxzZVxuICAgIH07XG4gIH0sXG4gIHByb3BzOiB7XG4gICAgY2hlY2tlZDoge1xuICAgICAgdHlwZTogQm9vbGVhbixcbiAgICAgIHJlcXVpcmVkOiB0cnVlLFxuICAgICAgdHdvV2F5OiB0cnVlXG4gICAgfSxcbiAgICBsYWJlbDoge1xuICAgICAgdHlwZTogU3RyaW5nLFxuICAgICAgcmVxdWlyZWQ6IHRydWVcbiAgICB9LFxuICAgIHJlcXVpcmVkOiB7XG4gICAgICB0eXBlOiBCb29sZWFuLFxuICAgICAgZGVmYXVsdHNUbzogZmFsc2VcbiAgICB9XG4gIH0sXG4gIHdhdGNoOiB7XG4gICAgY2hlY2tlZCh2YWwpIHtcbiAgICAgIHRoaXMuaWNvbiA9ICh2YWwgPT09IHRydWUpID8gJ2NoZWNrZWQnIDogJ3VuY2hlY2tlZCc7XG4gICAgfVxuICB9LFxuICByZWFkeSgpIHtcbiAgICB0aGlzLmljb24gPSAodGhpcy5jaGVja2VkID09PSB0cnVlKSA/ICdjaGVja2VkJyA6ICd1bmNoZWNrZWQnO1xuICB9LFxuICBtZXRob2RzOiB7XG4gICAgdG9nZ2xlKCkge1xuICAgICAgdGhpcy5jaGVja2VkID0gIXRoaXMuY2hlY2tlZDtcbiAgICB9LFxuICAgIGlzVmFsaWQoKSB7XG4gICAgICB0aGlzLmlzRXJyb3IgPSAodGhpcy5yZXF1aXJlZCkgPyAhdGhpcy5jaGVja2VkIDogZmFsc2U7XG4gICAgICByZXR1cm4gIXRoaXMuaXNFcnJvcjtcbiAgICB9XG4gIH1cbn07XG5cbn0se1wiLi92Q2hlY2tib3hUZW1wbGF0ZS5odG1sXCI6MjR9XSwyNDpbZnVuY3Rpb24ocmVxdWlyZSxtb2R1bGUsZXhwb3J0cyl7XG5tb2R1bGUuZXhwb3J0cyA9IFwiXFxuPGRpdiA6Y2xhc3M9XFxcInsgJ2NoZWNrYm94JzogdHJ1ZSwgJ2Vycm9yJzogaXNFcnJvciB9XFxcIj5cXG4gIDxpY29uIHYtb246Y2xpY2s9XFxcInRvZ2dsZSgpXFxcIiA6bmFtZT1cXFwiaWNvblxcXCI+PC9pY29uPlxcbiAgPHNwYW4gdi1vbjpjbGljaz1cXFwidG9nZ2xlKClcXFwiPnt7IGxhYmVsIH19PC9zcGFuPlxcbjwvZGl2PlxcblwiO1xuXG59LHt9XSwyNTpbZnVuY3Rpb24ocmVxdWlyZSxtb2R1bGUsZXhwb3J0cyl7XG5cbnZhciB2Rm9ybUNvbXBvbmVudCA9IHJlcXVpcmUoJy4vdkZvcm1Db21wb25lbnQuanMnKTtcblxuVnVlLmNvbXBvbmVudCgndkZvcm0nLCB2Rm9ybUNvbXBvbmVudCk7XG5cbn0se1wiLi92Rm9ybUNvbXBvbmVudC5qc1wiOjI2fV0sMjY6W2Z1bmN0aW9uKHJlcXVpcmUsbW9kdWxlLGV4cG9ydHMpe1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgdGVtcGxhdGU6IHJlcXVpcmUoJy4vdkZvcm1UZW1wbGF0ZS5odG1sJyksXG4gIHByb3BzOiB7XG4gICAgbWV0aG9kOiB7XG4gICAgICB0eXBlOiBTdHJpbmcsXG4gICAgICBkZWZhdWx0c1RvOiAnUE9TVCdcbiAgICB9LFxuICAgIGFjdGlvbjoge1xuICAgICAgdHlwZTogU3RyaW5nLFxuICAgICAgZGVmYXVsdHNUbzogJydcbiAgICB9LFxuICAgIGFqYXg6IHtcbiAgICAgIHR5cGU6IEJvb2xlYW4sXG4gICAgICBkZWZhdWx0c1RvOiBmYWxzZVxuICAgIH0sXG4gICAgc3VibWl0Q2FsbGJhY2s6IHtcbiAgICAgIHR5cGU6IEZ1bmN0aW9uXG4gICAgfVxuICB9LFxuICBtZXRob2RzOiB7XG4gICAgc3VibWl0Rm9ybShldmVudCkge1xuICAgICAgaWYgKHRoaXMuYWpheCB8fCAhdGhpcy5pc1ZhbGlkKCkpIHtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgIH1cblxuICAgICAgaWYgKHRoaXMuYWpheCAmJiB0aGlzLmlzVmFsaWQoKSAmJiB0eXBlb2YgdGhpcy5zdWJtaXRDYWxsYmFjayA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICB0aGlzLnN1Ym1pdENhbGxiYWNrKCk7XG4gICAgICB9XG4gICAgfSxcbiAgICBpc1ZhbGlkKCkge1xuICAgICAgdmFyIHNlbGYgPSB0aGlzLFxuICAgICAgICBmb3JtSXNWYWxpZCA9IHRydWU7XG5cbiAgICAgIGZvciAodmFyIGkgPSAwLCBqID0gc2VsZi4kY2hpbGRyZW4ubGVuZ3RoOyBpIDwgajsgaSsrKSB7XG4gICAgICAgIGlmIChfLmlzRnVuY3Rpb24oc2VsZi4kY2hpbGRyZW5baV0uaXNWYWxpZCkpIHsgLy8gaGFzIGlucHV0IHZhbGlkYXRpb24gYXR0YWNoZWRcbiAgICAgICAgICBmb3JtSXNWYWxpZCA9IGZvcm1Jc1ZhbGlkICYmIHNlbGYuJGNoaWxkcmVuW2ldLmlzVmFsaWQoKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICByZXR1cm4gZm9ybUlzVmFsaWQ7XG4gICAgfVxuICB9XG59O1xuXG59LHtcIi4vdkZvcm1UZW1wbGF0ZS5odG1sXCI6Mjd9XSwyNzpbZnVuY3Rpb24ocmVxdWlyZSxtb2R1bGUsZXhwb3J0cyl7XG5tb2R1bGUuZXhwb3J0cyA9IFwiXFxuPGZvcm0gdi1pZj1cXFwiYWpheFxcXCIgdi1lbDpmb3JtIHYtb246c3VibWl0LnByZXZlbnQ9XFxcInN1Ym1pdEZvcm1cXFwiIDptZXRob2Q9XFxcIm1ldGhvZFxcXCIgOmFjdGlvbj1cXFwiYWN0aW9uXFxcIiBub3ZhbGlkYXRlPlxcbiAgPHNsb3Q+PC9zbG90PlxcbjwvZm9ybT5cXG48Zm9ybSB2LWVsc2Ugdi1lbDpmb3JtIHYtb246c3VibWl0PVxcXCJzdWJtaXRGb3JtXFxcIiA6bWV0aG9kPVxcXCJtZXRob2RcXFwiIDphY3Rpb249XFxcImFjdGlvblxcXCIgbm92YWxpZGF0ZT5cXG4gIDxzbG90Pjwvc2xvdD5cXG48L2Zvcm0+XFxuXCI7XG5cbn0se31dLDI4OltmdW5jdGlvbihyZXF1aXJlLG1vZHVsZSxleHBvcnRzKXtcblxudmFyIHZJbnB1dENvbXBvbmVudCA9IHJlcXVpcmUoJy4vdklucHV0Q29tcG9uZW50LmpzJyk7XG5cblZ1ZS5jb21wb25lbnQoJ3ZJbnB1dCcsIHZJbnB1dENvbXBvbmVudCk7XG5cbn0se1wiLi92SW5wdXRDb21wb25lbnQuanNcIjoyOX1dLDI5OltmdW5jdGlvbihyZXF1aXJlLG1vZHVsZSxleHBvcnRzKXtcblxudmFyIHZhbGlkYXRpb25SdWxlcyA9IHJlcXVpcmUoJy4vdmFsaWRhdGlvblJ1bGVzLmpzJyk7XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICB0ZW1wbGF0ZTogcmVxdWlyZSgnLi92SW5wdXRUZW1wbGF0ZS5odG1sJyksXG4gIHByb3BzOiB7XG4gICAgbGFiZWw6IHtcbiAgICAgIHR5cGU6IFN0cmluZ1xuICAgIH0sXG4gICAgbmFtZToge1xuICAgICAgdHlwZTogU3RyaW5nXG4gICAgfSxcbiAgICB0eXBlOiB7XG4gICAgICB0eXBlOiBTdHJpbmcsXG4gICAgICByZXF1aXJlZDogdHJ1ZVxuICAgIH0sXG4gICAgcGxhY2Vob2xkZXI6IHtcbiAgICAgIHR5cGU6IFN0cmluZ1xuICAgIH0sXG4gICAgaWNvbjoge1xuICAgICAgdHlwZTogU3RyaW5nXG4gICAgfSxcbiAgICB2YWx1ZToge1xuICAgICAgdHlwZTogU3RyaW5nLFxuICAgICAgcmVxdWlyZWQ6IHRydWUsXG4gICAgICB0d29XYXk6IHRydWVcbiAgICB9LFxuICAgIHJlcXVpcmVkOiB7XG4gICAgICB0eXBlOiBCb29sZWFuLFxuICAgICAgZGVmYXVsdHNUbzogZmFsc2VcbiAgICB9LFxuICAgIGVxdWFsVG86IHtcbiAgICAgIHR5cGU6IE9iamVjdCxcbiAgICAgIGRlZmF1bHRzVG86IG51bGxcbiAgICB9LFxuICAgIHNpbXBsZToge1xuICAgICAgdHlwZTogQm9vbGVhbixcbiAgICAgIGRlZmF1bHRzVG86IGZhbHNlXG4gICAgfVxuICB9LFxuICBkYXRhKCkge1xuICAgIHJldHVybiB7XG4gICAgICBlcnJvcjogJydcbiAgICB9O1xuICB9LFxuICBmaWx0ZXJzOiB7XG4gICAgaXNTaW1wbGUodmFsKSB7XG4gICAgICByZXR1cm4gKHRoaXMuc2ltcGxlKSA/ICcnIDogdmFsO1xuICAgIH1cbiAgfSxcbiAgbWV0aG9kczoge1xuICAgIGlzVmFsaWQoKSB7XG4gICAgICB0aGlzLnZhbGlkYXRlKCk7XG4gICAgICByZXR1cm4gKHRoaXMuZXJyb3IubGVuZ3RoID09PSAwKTtcbiAgICB9LFxuICAgIGRlYm91bmNlVmFsaWRhdGU6IF8uZGVib3VuY2UoZnVuY3Rpb24gKCkge1xuICAgICAgdGhpcy52YWxpZGF0ZSgpO1xuICAgIH0sIDUwMCksXG4gICAgdmFsaWRhdGUoKSB7XG4gICAgICB2YXIgbGFiZWwgPSB0aGlzLmxhYmVsIHx8IHRoaXMubmFtZTtcblxuICAgICAgLy8gcmVxdWlyZWQgdmFsaWRhdGlvblxuICAgICAgaWYgKHRoaXMucmVxdWlyZWQgJiYgdGhpcy52YWx1ZS5sZW5ndGggPT09IDApIHtcbiAgICAgICAgdGhpcy5lcnJvciA9IGxhYmVsICsgJyBpcyByZXF1aXJlZCc7XG5cbiAgICAgIC8vIGh0bWw1IGRhdGEgdHlwZSB2YWxpZGF0aW9uXG4gICAgICB9IGVsc2UgaWYgKHZhbGlkYXRpb25SdWxlcy5oYXNPd25Qcm9wZXJ0eSh0aGlzLnR5cGUpICYmICF2YWxpZGF0aW9uUnVsZXNbdGhpcy50eXBlXS5yZWdleC50ZXN0KHRoaXMudmFsdWUpKSB7XG4gICAgICAgIHRoaXMuZXJyb3IgPSB2YWxpZGF0aW9uUnVsZXNbdGhpcy50eXBlXS5kZWZhdWx0RXJyb3I7XG5cbiAgICAgIC8vIGVxdWl2YWxlbmN5IHZhbGlkYXRpb25cbiAgICAgIH0gZWxzZSBpZiAodGhpcy5lcXVhbFRvICYmIHRoaXMuZXF1YWxUby52YWx1ZSAhPT0gdGhpcy52YWx1ZSkge1xuICAgICAgICB0aGlzLmVycm9yID0gJ011c3QgbWF0Y2ggJyArIHRoaXMuZXF1YWxUby5sYWJlbDtcblxuICAgICAgLy8gaW5wdXQgaXMgdmFsaWRcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuZXJyb3IgPSAnJztcbiAgICAgIH1cbiAgICB9XG4gIH1cbn07XG5cbn0se1wiLi92SW5wdXRUZW1wbGF0ZS5odG1sXCI6MzAsXCIuL3ZhbGlkYXRpb25SdWxlcy5qc1wiOjMxfV0sMzA6W2Z1bmN0aW9uKHJlcXVpcmUsbW9kdWxlLGV4cG9ydHMpe1xubW9kdWxlLmV4cG9ydHMgPSBcIlxcbjxsYWJlbCBjbGFzcz1cXFwidi1pbnB1dFxcXCI+XFxuICB7eyBsYWJlbCB8IGlzU2ltcGxlIH19XFxuICA8ZGl2IGNsYXNzPVxcXCJpbnB1dC13cmFwXFxcIj5cXG4gICAgPGkgY2xhc3M9XFxcImZhIGZhLXt7IGljb24gfX1cXFwiIHYtaWY9XFxcImljb25cXFwiPjwvaT5cXG4gICAgPHRleHRhcmVhIHYtaWY9XFxcInR5cGUgPT09ICd0ZXh0YXJlYSdcXFwiXFxuICAgICAgdi1lbDppbnB1dFxcbiAgICAgIDpjbGFzcz1cXFwieyAnZXJyb3InOiBlcnJvci5sZW5ndGggPiAwIH1cXFwiXFxuICAgICAgbmFtZT1cXFwie3sgbmFtZSB9fVxcXCJcXG4gICAgICBwbGFjZWhvbGRlcj1cXFwie3sgcGxhY2Vob2xkZXIgfX1cXFwiXFxuICAgICAgdi1tb2RlbD1cXFwidmFsdWVcXFwiXFxuICAgICAgdi1vbjpibHVyPVxcXCJ2YWxpZGF0ZSgpXFxcIj48L3RleHRhcmVhPlxcbiAgICA8aW5wdXQgdi1lbHNlXFxuICAgICAgdi1lbDppbnB1dFxcbiAgICAgIDpjbGFzcz1cXFwieyAnZXJyb3InOiBlcnJvci5sZW5ndGggPiAwIH1cXFwiXFxuICAgICAgbmFtZT1cXFwie3sgbmFtZSB9fVxcXCJcXG4gICAgICB0eXBlPVxcXCJ7eyB0eXBlIH19XFxcIlxcbiAgICAgIHBsYWNlaG9sZGVyPVxcXCJ7eyBwbGFjZWhvbGRlciB9fVxcXCJcXG4gICAgICB2LW1vZGVsPVxcXCJ2YWx1ZVxcXCJcXG4gICAgICB2LW9uOmJsdXI9XFxcInZhbGlkYXRlKClcXFwiIC8+XFxuICAgIDxzbWFsbCB2LWlmPVxcXCJlcnJvci5sZW5ndGggPiAwXFxcIiB0cmFuc2l0aW9uPVxcXCJzbGlkZS11cC14LXNtYWxsXFxcIiBjbGFzcz1cXFwiZXJyb3JcXFwiPnt7IGVycm9yIH19PC9zbWFsbD5cXG4gIDwvZGl2PlxcbjwvbGFiZWw+XFxuXCI7XG5cbn0se31dLDMxOltmdW5jdGlvbihyZXF1aXJlLG1vZHVsZSxleHBvcnRzKXtcblxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgZW1haWw6IHtcbiAgICByZWdleDogL14oKFtePD4oKVxcW1xcXVxcXFwuLDs6XFxzQFwiXSsoXFwuW148PigpXFxbXFxdXFxcXC4sOzpcXHNAXCJdKykqKXwoXCIuK1wiKSlAKChcXFtbMC05XXsxLDN9XFwuWzAtOV17MSwzfVxcLlswLTldezEsM31cXC5bMC05XXsxLDN9XSl8KChbYS16QS1aXFwtMC05XStcXC4pK1thLXpBLVpdezIsfSkpJC8sXG4gICAgZGVmYXVsdEVycm9yOiAnUGxlYXNlIGVudGVyIGEgdmFsaWQgZW1haWwgYWRkcmVzcydcbiAgfSxcbiAgdXJsOiB7XG4gICAgcmVnZXg6IC9odHRwcz86XFwvXFwvKHd3d1xcLik/Wy1hLXpBLVowLTlAOiUuX1xcK34jPV17MiwyNTZ9XFwuW2Etel17Miw0fVxcYihbLWEtekEtWjAtOUA6JV9cXCsufiM/Ji8vPV0qKS8sXG4gICAgZGVmYXVsdEVycm9yOiAnUGxlYXNlIGVudGVyIGEgdmFsaWQgVVJMJ1xuICB9LFxuICBudW1iZXI6IHtcbiAgICByZWdleDogL1stLjAtOV0rLyxcbiAgICBkZWZhdWx0RXJyb3I6ICdQbGVhc2UgZW50ZXIgYSB2YWxpZCBudW1iZXInXG4gIH1cbn07XG5cbn0se31dLDMyOltmdW5jdGlvbihyZXF1aXJlLG1vZHVsZSxleHBvcnRzKXtcblxudmFyIHZTZWxlY3RDb21wb25lbnQgPSByZXF1aXJlKCcuL3ZTZWxlY3RDb21wb25lbnQuanMnKTtcblxuVnVlLmNvbXBvbmVudCgndlNlbGVjdCcsIHZTZWxlY3RDb21wb25lbnQpO1xuXG59LHtcIi4vdlNlbGVjdENvbXBvbmVudC5qc1wiOjMzfV0sMzM6W2Z1bmN0aW9uKHJlcXVpcmUsbW9kdWxlLGV4cG9ydHMpe1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgdGVtcGxhdGU6IHJlcXVpcmUoJy4vdlNlbGVjdFRlbXBsYXRlLmh0bWwnKSxcbiAgcHJvcHM6IHtcbiAgICBsYWJlbDoge1xuICAgICAgdHlwZTogU3RyaW5nLFxuICAgICAgZGVmYXVsdHNUbzogJydcbiAgICB9LFxuICAgIHNlbGVjdGVkOiB7XG4gICAgICB0eXBlOiBTdHJpbmcsXG4gICAgICByZXF1aXJlZDogdHJ1ZSxcbiAgICAgIHR3b1dheTogdHJ1ZVxuICAgIH0sXG4gICAgb3B0aW9uczoge1xuICAgICAgdHlwZTogQXJyYXksXG4gICAgICByZXF1aXJlZDogdHJ1ZVxuICAgIH0sXG4gICAgcmVxdWlyZWQ6IHtcbiAgICAgIHR5cGU6IEJvb2xlYW4sXG4gICAgICBkZWZhdWx0c1RvOiBmYWxzZVxuICAgIH1cbiAgfSxcbiAgZGF0YSgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgaXNFcnJvcjogZmFsc2VcbiAgICB9O1xuICB9LFxuICByZWFkeSgpIHtcbiAgICB2YXIgc2VsZiA9IHRoaXMsXG4gICAgICBzZWxlY3RlZEluZGV4ID0gXy5maW5kSW5kZXgoc2VsZi5vcHRpb25zLCAob3B0aW9uKSA9PiBvcHRpb24udmFsdWUgPT09IHNlbGYuc2VsZWN0ZWQpO1xuXG4gICAgaWYgKHNlbGYucmVxdWlyZWQgJiYgc2VsZWN0ZWRJbmRleCA9PT0gLTEpIHtcbiAgICAgIHNlbGYuc2VsZWN0ZWQgPSBzZWxmLm9wdGlvbnNbMF0udmFsdWU7XG4gICAgfVxuICB9LFxuICBtZXRob2RzOiB7XG4gICAgaXNWYWxpZCgpIHtcbiAgICAgIHRoaXMuaXNFcnJvciA9ICF0aGlzLnJlcXVpcmVkIHx8IHRoaXMuc2VsZWN0ZWQubGVuZ3RoID4gMDtcbiAgICAgIHJldHVybiB0aGlzLmlzRXJyb3I7XG4gICAgfVxuICB9XG59O1xuXG59LHtcIi4vdlNlbGVjdFRlbXBsYXRlLmh0bWxcIjozNH1dLDM0OltmdW5jdGlvbihyZXF1aXJlLG1vZHVsZSxleHBvcnRzKXtcbm1vZHVsZS5leHBvcnRzID0gXCJcXG48bGFiZWwgY2xhc3M9XFxcInYtc2VsZWN0XFxcIj5cXG4gIHt7IGxhYmVsIH19XFxuICA8c2VsZWN0IHYtbW9kZWw9XFxcInNlbGVjdGVkXFxcIiA6Y2xhc3M9XFxcInsgJ2Vycm9yJzogaXNFcnJvciB9XFxcIj5cXG4gICAgPG9wdGlvbiB2LWlmPVxcXCIhcmVxdWlyZWRcXFwiIHZhbHVlPVxcXCJcXFwiPjwvb3B0aW9uPlxcbiAgICA8b3B0aW9uIHYtZm9yPVxcXCJvcHRpb24gaW4gb3B0aW9uc1xcXCIgOnZhbHVlPVxcXCJvcHRpb24udmFsdWVcXFwiPnt7IG9wdGlvbi5sYWJlbCB9fTwvb3B0aW9uPlxcbiAgPC9zZWxlY3Q+XFxuPC9sYWJlbD5cXG5cIjtcblxufSx7fV0sMzU6W2Z1bmN0aW9uKHJlcXVpcmUsbW9kdWxlLGV4cG9ydHMpe1xuXG5yZXF1aXJlKCcuL2NvbXBvbmVudHMvYWxlcnQvYWxlcnQuanMnKTtcbnJlcXVpcmUoJy4vY29tcG9uZW50cy9pY29uL2ljb24uanMnKTtcbnJlcXVpcmUoJy4vY29tcG9uZW50cy9tb2RhbC9tb2RhbC5qcycpO1xucmVxdWlyZSgnLi9jb21wb25lbnRzL3Byb21wdC9wcm9tcHQuanMnKTtcbnJlcXVpcmUoJy4vY29tcG9uZW50cy9sb2FkZXIvbG9hZGVyLmpzJyk7XG5yZXF1aXJlKCcuL2NvbXBvbmVudHMvdGFicy90YWJzLmpzJyk7XG5yZXF1aXJlKCcuL2NvbXBvbmVudHMvdkZvcm0vdkZvcm0uanMnKTtcbnJlcXVpcmUoJy4vY29tcG9uZW50cy92SW5wdXQvdklucHV0LmpzJyk7XG5yZXF1aXJlKCcuL2NvbXBvbmVudHMvdlNlbGVjdC92U2VsZWN0LmpzJyk7XG5yZXF1aXJlKCcuL2NvbXBvbmVudHMvdkNoZWNrYm94L3ZDaGVja2JveC5qcycpO1xuXG59LHtcIi4vY29tcG9uZW50cy9hbGVydC9hbGVydC5qc1wiOjEsXCIuL2NvbXBvbmVudHMvaWNvbi9pY29uLmpzXCI6NCxcIi4vY29tcG9uZW50cy9sb2FkZXIvbG9hZGVyLmpzXCI6NyxcIi4vY29tcG9uZW50cy9tb2RhbC9tb2RhbC5qc1wiOjEwLFwiLi9jb21wb25lbnRzL3Byb21wdC9wcm9tcHQuanNcIjoxMyxcIi4vY29tcG9uZW50cy90YWJzL3RhYnMuanNcIjoxOSxcIi4vY29tcG9uZW50cy92Q2hlY2tib3gvdkNoZWNrYm94LmpzXCI6MjIsXCIuL2NvbXBvbmVudHMvdkZvcm0vdkZvcm0uanNcIjoyNSxcIi4vY29tcG9uZW50cy92SW5wdXQvdklucHV0LmpzXCI6MjgsXCIuL2NvbXBvbmVudHMvdlNlbGVjdC92U2VsZWN0LmpzXCI6MzJ9XX0se30sWzM1XSkiXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
