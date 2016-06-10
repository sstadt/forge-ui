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
        }
      },
      data: function data() {
        return {
          error: ''
        };
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
    module.exports = "\n<label class=\"v-input\">\n  {{ label }}\n  <div class=\"input-wrap\">\n    <i class=\"fa fa-{{ icon }}\" v-if=\"icon\"></i>\n    <textarea v-if=\"type === 'textarea'\"\n      v-el:input\n      :class=\"{ 'error': error.length > 0 }\"\n      name=\"{{ name }}\"\n      placeholder=\"{{ placeholder }}\"\n      v-model=\"value\"\n      v-on:blur=\"validate()\"></textarea>\n    <input v-else\n      v-el:input\n      :class=\"{ 'error': error.length > 0 }\"\n      name=\"{{ name }}\"\n      type=\"{{ type }}\"\n      placeholder=\"{{ placeholder }}\"\n      v-model=\"value\"\n      v-on:blur=\"validate()\" />\n    <small v-if=\"error.length > 0\" transition=\"slide-up-x-small\" class=\"error\">{{ error }}</small>\n  </div>\n</label>\n";
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
//# sourceMappingURL=data:application/json;base64,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LEVBQWlCLE1BQWpCLEVBQXdCLE9BQXhCLEVBQWdDO0FBQ3JFLFdBQU8sT0FBUCxHQUFpQix5UkFBakI7QUFFQyxHQUhtQyxFQUdsQyxFQUhrQyxDQTlqQnFYLEVBaWtCblosSUFBRyxDQUFDLFVBQVMsT0FBVCxFQUFpQixNQUFqQixFQUF3QixPQUF4QixFQUFnQzs7QUFFMUMsWUFBUSw2QkFBUjtBQUNBLFlBQVEsMkJBQVI7QUFDQSxZQUFRLDZCQUFSO0FBQ0EsWUFBUSwrQkFBUjtBQUNBLFlBQVEsK0JBQVI7QUFDQSxZQUFRLDJCQUFSO0FBQ0EsWUFBUSw2QkFBUjtBQUNBLFlBQVEsK0JBQVI7QUFDQSxZQUFRLGlDQUFSO0FBQ0EsWUFBUSxxQ0FBUjtBQUVDLEdBYlEsRUFhUCxFQUFDLCtCQUE4QixDQUEvQixFQUFpQyw2QkFBNEIsQ0FBN0QsRUFBK0QsaUNBQWdDLENBQS9GLEVBQWlHLCtCQUE4QixFQUEvSCxFQUFrSSxpQ0FBZ0MsRUFBbEssRUFBcUssNkJBQTRCLEVBQWpNLEVBQW9NLHVDQUFzQyxFQUExTyxFQUE2TywrQkFBOEIsRUFBM1EsRUFBOFEsaUNBQWdDLEVBQTlTLEVBQWlULG1DQUFrQyxFQUFuVixFQWJPLENBamtCZ1osRUFBelosRUE4a0IyVixFQTlrQjNWLEVBOGtCOFYsQ0FBQyxFQUFELENBOWtCOVYiLCJmaWxlIjoibXl1aS5qcyIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dGhyb3cgbmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKX12YXIgZj1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwoZi5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxmLGYuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pKHsxOltmdW5jdGlvbihyZXF1aXJlLG1vZHVsZSxleHBvcnRzKXtcblxudmFyIGFsZXJ0Q29tcG9uZW50ID0gcmVxdWlyZSgnLi9hbGVydENvbXBvbmVudC5qcycpO1xuXG5WdWUuY29tcG9uZW50KCdhbGVydCcsIGFsZXJ0Q29tcG9uZW50KTtcblxufSx7XCIuL2FsZXJ0Q29tcG9uZW50LmpzXCI6Mn1dLDI6W2Z1bmN0aW9uKHJlcXVpcmUsbW9kdWxlLGV4cG9ydHMpe1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgdGVtcGxhdGU6IHJlcXVpcmUoJy4vYWxlcnRUZW1wbGF0ZS5odG1sJyksXG4gIHByb3BzOiB7XG4gICAgY2FuQ2xvc2U6IHtcbiAgICAgIHR5cGU6IEJvb2xlYW4sXG4gICAgICBkZWZhdWx0c1RvOiBmYWxzZVxuICAgIH1cbiAgfSxcbiAgZGF0YSgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgbWVzc2FnZXM6IFtdLFxuICAgICAgdHlwZTogJydcbiAgICB9O1xuICB9LFxuICBtZXRob2RzOiB7XG4gICAgY2xvc2UoKSB7XG4gICAgICB0aGlzLm1lc3NhZ2VzID0gW107XG4gICAgfSxcbiAgICBhZGRNZXNzYWdlKHR5cGUsIG1lc3NhZ2UpIHtcbiAgICAgIGlmICh0aGlzLnR5cGUgIT09IHR5cGUpIHtcbiAgICAgICAgdGhpcy50eXBlID0gdHlwZTtcbiAgICAgICAgdGhpcy5tZXNzYWdlcyA9IFttZXNzYWdlXTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMubWVzc2FnZXMucHVzaChtZXNzYWdlKTtcbiAgICAgIH1cbiAgICB9LFxuICAgIG1lc3NhZ2UobWVzc2FnZSkge1xuICAgICAgdGhpcy5hZGRNZXNzYWdlKCcnLCBtZXNzYWdlKTtcbiAgICB9LFxuICAgIHByaW1hcnkobWVzc2FnZSkge1xuICAgICAgdGhpcy5hZGRNZXNzYWdlKCdwcmltYXJ5JywgbWVzc2FnZSk7XG4gICAgfSxcbiAgICBzZWNvbmRhcnkobWVzc2FnZSkge1xuICAgICAgdGhpcy5hZGRNZXNzYWdlKCdzZWNvbmRhcnknLCBtZXNzYWdlKTtcbiAgICB9LFxuICAgIHN1Y2Nlc3MobWVzc2FnZSkge1xuICAgICAgdGhpcy5hZGRNZXNzYWdlKCdzdWNjZXNzJywgbWVzc2FnZSk7XG4gICAgfSxcbiAgICB3YXJuaW5nKG1lc3NhZ2UpIHtcbiAgICAgIHRoaXMuYWRkTWVzc2FnZSgnd2FybmluZycsIG1lc3NhZ2UpO1xuICAgIH0sXG4gICAgYWxlcnQobWVzc2FnZSkge1xuICAgICAgdGhpcy5hZGRNZXNzYWdlKCdhbGVydCcsIG1lc3NhZ2UpO1xuICAgIH1cbiAgfVxufTtcblxufSx7XCIuL2FsZXJ0VGVtcGxhdGUuaHRtbFwiOjN9XSwzOltmdW5jdGlvbihyZXF1aXJlLG1vZHVsZSxleHBvcnRzKXtcbm1vZHVsZS5leHBvcnRzID0gXCJcXG48ZGl2IGNsYXNzPVxcXCJhbGVydC1ib3hcXFwiIHYtYmluZDpjbGFzcz1cXFwie1xcbiAgICBjYWxsb3V0OiB0cnVlLFxcbiAgICBwcmltYXJ5OiB0eXBlID09PSAncHJpbWFyeScsXFxuICAgIHNlY29uZGFyeTogdHlwZSA9PT0gJ3NlY29uZGFyeScsXFxuICAgIHN1Y2Nlc3M6IHR5cGUgPT09ICdzdWNjZXNzJyxcXG4gICAgd2FybmluZzogdHlwZSA9PT0gJ3dhcm5pbmcnLFxcbiAgICBhbGVydDogdHlwZSA9PT0gJ2FsZXJ0J1xcbiAgfVxcXCIgdHJhbnNpdGlvbj1cXFwiZmFkZVxcXCIgdi1zaG93PVxcXCJtZXNzYWdlcy5sZW5ndGggPiAwXFxcIj5cXG4gIDx1bD5cXG4gICAgPGxpIHYtZm9yPVxcXCJtZXNzYWdlIGluIG1lc3NhZ2VzXFxcIiB0cmFjay1ieT1cXFwiJGluZGV4XFxcIj57eyBtZXNzYWdlIH19PC9saT5cXG4gIDwvdWw+XFxuICA8YnV0dG9uIGNsYXNzPVxcXCJjbG9zZS1idXR0b25cXFwiIGFyaWEtbGFiZWw9XFxcIkRpc21pc3MgYWxlcnRcXFwiIHR5cGU9XFxcImJ1dHRvblxcXCIgdi1pZj1cXFwiY2FuQ2xvc2VcXFwiIHYtb246Y2xpY2s9XFxcImNsb3NlKClcXFwiPlxcbiAgICA8c3BhbiBhcmlhLWhpZGRlbj1cXFwidHJ1ZVxcXCI+JnRpbWVzOzwvc3Bhbj5cXG4gIDwvYnV0dG9uPlxcbjwvZGl2PlxcblwiO1xuXG59LHt9XSw0OltmdW5jdGlvbihyZXF1aXJlLG1vZHVsZSxleHBvcnRzKXtcblxudmFyIGljb25Db21wb25lbnQgPSByZXF1aXJlKCcuL2ljb25Db21wb25lbnQuanMnKTtcblxuVnVlLmNvbXBvbmVudCgnaWNvbicsIGljb25Db21wb25lbnQpO1xuXG59LHtcIi4vaWNvbkNvbXBvbmVudC5qc1wiOjV9XSw1OltmdW5jdGlvbihyZXF1aXJlLG1vZHVsZSxleHBvcnRzKXtcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIHRlbXBsYXRlOiByZXF1aXJlKCcuL2ljb25UZW1wbGF0ZS5odG1sJyksXG4gIHByb3BzOiBbJ25hbWUnXVxufTtcblxufSx7XCIuL2ljb25UZW1wbGF0ZS5odG1sXCI6Nn1dLDY6W2Z1bmN0aW9uKHJlcXVpcmUsbW9kdWxlLGV4cG9ydHMpe1xubW9kdWxlLmV4cG9ydHMgPSBcIlxcbjxzdmcgY2xhc3M9XFxcImljb24taW1hZ2Uge3sgbmFtZSB9fVxcXCI+XFxuICA8dXNlIHhtbG5zOnhsaW5rPVxcXCJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rXFxcIiB4bGluazpocmVmPVxcXCIjaWNvbi17eyBuYW1lIH19XFxcIj48L3VzZT5cXG48L3N2Zz5cXG5cIjtcblxufSx7fV0sNzpbZnVuY3Rpb24ocmVxdWlyZSxtb2R1bGUsZXhwb3J0cyl7XG5cbnZhciBsb2FkZXJDb21wb25lbnQgPSByZXF1aXJlKCcuL2xvYWRlckNvbXBvbmVudC5qcycpO1xuXG5WdWUuY29tcG9uZW50KCdsb2FkZXInLCBsb2FkZXJDb21wb25lbnQpO1xuXG59LHtcIi4vbG9hZGVyQ29tcG9uZW50LmpzXCI6OH1dLDg6W2Z1bmN0aW9uKHJlcXVpcmUsbW9kdWxlLGV4cG9ydHMpe1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgdGVtcGxhdGU6IHJlcXVpcmUoJy4vbG9hZGVyVGVtcGxhdGUuaHRtbCcpLFxuICBkYXRhKCkge1xuICAgIHJldHVybiB7XG4gICAgICBncmVldGluZzogJ2xvYWRlciBjb21wb25lbnQnLFxuICAgIH07XG4gIH0sXG4gIG1ldGhvZHM6IHtcbiAgICBzYXlIaSgpIHtcbiAgICAgIGNvbnNvbGUubG9nKCdoaSEnKTtcbiAgICB9XG4gIH1cbn07XG5cbn0se1wiLi9sb2FkZXJUZW1wbGF0ZS5odG1sXCI6OX1dLDk6W2Z1bmN0aW9uKHJlcXVpcmUsbW9kdWxlLGV4cG9ydHMpe1xubW9kdWxlLmV4cG9ydHMgPSBcIjxkaXYgY2xhc3M9XFxcImxvYWRlclxcXCI+TG9hZGluZy4uLjwvZGl2PlxcblwiO1xuXG59LHt9XSwxMDpbZnVuY3Rpb24ocmVxdWlyZSxtb2R1bGUsZXhwb3J0cyl7XG5cbnZhciBtb2RhbENvbXBvbmVudCA9IHJlcXVpcmUoJy4vbW9kYWxDb21wb25lbnQuanMnKTtcblxuVnVlLmNvbXBvbmVudCgnbW9kYWwnLCBtb2RhbENvbXBvbmVudCk7XG5cbn0se1wiLi9tb2RhbENvbXBvbmVudC5qc1wiOjExfV0sMTE6W2Z1bmN0aW9uKHJlcXVpcmUsbW9kdWxlLGV4cG9ydHMpe1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgdGVtcGxhdGU6IHJlcXVpcmUoJy4vbW9kYWxUZW1wbGF0ZS5odG1sJyksXG4gIHByb3BzOiB7XG4gICAgc2hvdzoge1xuICAgICAgdHlwZTogQm9vbGVhbixcbiAgICAgIHJlcXVpcmVkOiB0cnVlLFxuICAgICAgdHdvV2F5OiB0cnVlXG4gICAgfSxcbiAgICBtb2RhbFNpemU6IHtcbiAgICAgIHR5cGU6IFN0cmluZyxcbiAgICAgIGRlZmF1bHQ6ICdmdWxsJ1xuICAgIH0sXG4gICAgdHJhbnNpdGlvbjoge1xuICAgICAgdHlwZTogU3RyaW5nLFxuICAgICAgZGVmYXVsdDogJ3pvb20tb3V0J1xuICAgIH1cbiAgfVxufTtcblxufSx7XCIuL21vZGFsVGVtcGxhdGUuaHRtbFwiOjEyfV0sMTI6W2Z1bmN0aW9uKHJlcXVpcmUsbW9kdWxlLGV4cG9ydHMpe1xubW9kdWxlLmV4cG9ydHMgPSBcIlxcbjxkaXYgY2xhc3M9XFxcIm1vZGFsXFxcIiA6dHJhbnNpdGlvbj1cXFwidHJhbnNpdGlvblxcXCIgdi1zaG93PVxcXCJzaG93XFxcIj5cXG4gIDxkaXYgdi1vbjpjbGljay5wcmV2ZW50IDpjbGFzcz1cXFwieyAnbW9kYWwtY29udGVudCc6IHRydWUsICdzbWFsbCc6IG1vZGFsU2l6ZSA9PT0gJ3NtYWxsJywgJ2Z1bGwnOiBtb2RhbFNpemUgPT09ICdmdWxsJyB9XFxcIj5cXG4gICAgPGRpdiBjbGFzcz1cXFwibW9kYWwtaGVhZGVyXFxcIj5cXG4gICAgICA8c2xvdCBuYW1lPVxcXCJoZWFkZXJcXFwiPjwvc2xvdD5cXG4gICAgPC9kaXY+XFxuICAgIDxzbG90IG5hbWU9XFxcImNvbnRlbnRcXFwiPjwvc2xvdD5cXG4gICAgPHNwYW4gdi1vbjpjbGljaz1cXFwic2hvdyA9IGZhbHNlXFxcIiBhcmlhLWxhYmVsPVxcXCJDbG9zZVxcXCI+JiMyMTU7PC9zcGFuPlxcbiAgPC9kaXY+XFxuPC9kaXY+XFxuXCI7XG5cbn0se31dLDEzOltmdW5jdGlvbihyZXF1aXJlLG1vZHVsZSxleHBvcnRzKXtcblxudmFyIHByb21wdENvbXBvbmVudCA9IHJlcXVpcmUoJy4vcHJvbXB0Q29tcG9uZW50Jyk7XG5cblZ1ZS5jb21wb25lbnQoJ3Byb21wdCcsIHByb21wdENvbXBvbmVudCk7XG5cbn0se1wiLi9wcm9tcHRDb21wb25lbnRcIjoxNH1dLDE0OltmdW5jdGlvbihyZXF1aXJlLG1vZHVsZSxleHBvcnRzKXtcblxudmFyIGRlZmF1bHRMYWJlbHMgPSB7XG4gIHF1ZXN0aW9uOiAnJyxcbiAgeWVzOiAnU3VibWl0JyxcbiAgbm86ICdDYW5jZWwnXG59O1xuXG5mdW5jdGlvbiBwcm9tcHQodm0sIG9wdGlvbnMsIHNob3dJbnB1dCkge1xuICB2YXIgdW53YXRjaDtcblxuICB2bS5xdWVzdGlvbkxhYmVsID0gb3B0aW9ucy5xdWVzdGlvbjtcbiAgdm0ueWVzTGFiZWwgPSBvcHRpb25zLnllc0xhYmVsIHx8IGRlZmF1bHRMYWJlbHMueWVzO1xuICB2bS5ub0xhYmVsID0gb3B0aW9ucy5ub0xhYmVsIHx8IGRlZmF1bHRMYWJlbHMubm87XG4gIHZtLmNvbmZpcm1lZCA9IHVuZGVmaW5lZDtcbiAgdm0uc2hvd0lucHV0ID0gc2hvd0lucHV0O1xuICB2bS5zaG93ID0gdHJ1ZTtcblxuICB1bndhdGNoID0gdm0uJHdhdGNoKCckZGF0YS5jb25maXJtZWQnLCBmdW5jdGlvbiAobmV3VmFsLCBvbGRWYWwpIHtcbiAgICBpZiAobmV3VmFsICYmIF8uaXNGdW5jdGlvbihvcHRpb25zLnllcykpIHtcbiAgICAgIG9wdGlvbnMueWVzKChzaG93SW5wdXQpID8gdm0ucHJvbXB0VmFsdWUgOiBudWxsKTtcbiAgICB9IGVsc2UgaWYgKCFuZXdWYWwgJiYgXy5pc0Z1bmN0aW9uIChvcHRpb25zLm5vKSkge1xuICAgICAgb3B0aW9ucy5ubygpO1xuICAgIH1cbiAgICB1bndhdGNoKCk7XG4gICAgdm0uc2hvdyA9IGZhbHNlO1xuICB9KTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIHRlbXBsYXRlOiByZXF1aXJlKCcuL3Byb21wdFRlbXBsYXRlLmh0bWwnKSxcbiAgcHJvcHM6IHtcbiAgICB0cmFuc2l0aW9uOiB7XG4gICAgICB0eXBlOiBTdHJpbmcsXG4gICAgICBkZWZhdWx0OiAnem9vbS1vdXQnXG4gICAgfVxuICB9LFxuICBkYXRhKCkge1xuICAgIHJldHVybiB7XG4gICAgICBwcm9tcHRWYWx1ZTogJycsXG4gICAgICBxdWVzdGlvbkxhYmVsOiBkZWZhdWx0TGFiZWxzLnF1ZXN0aW9uTGFiZWwsXG4gICAgICB5ZXNMYWJlbDogZGVmYXVsdExhYmVscy55ZXNMYWJlbCxcbiAgICAgIG5vTGFiZWw6IGRlZmF1bHRMYWJlbHMubm9MYWJlbCxcbiAgICAgIHNob3c6IGZhbHNlLFxuICAgICAgY29uZmlybWVkOiBmYWxzZSxcbiAgICAgIHNob3dJbnB1dDogZmFsc2UsXG4gICAgICBhc2sob3B0aW9ucykge1xuICAgICAgICBwcm9tcHQodGhpcywgb3B0aW9ucywgdHJ1ZSk7XG4gICAgICB9LFxuICAgICAgY29uZmlybShvcHRpb25zKSB7XG4gICAgICAgIHByb21wdCh0aGlzLCBvcHRpb25zLCBmYWxzZSk7XG4gICAgICB9XG4gICAgfTtcbiAgfSxcbiAgd2F0Y2g6IHtcbiAgICBzaG93KHZhbCkge1xuICAgICAgaWYgKHZhbCA9PT0gdHJ1ZSAmJiB0aGlzLiRjaGlsZHJlbi5sZW5ndGggPiAwKSB7XG4gICAgICAgIHRoaXMucHJvbXB0VmFsdWUgPSAnJztcbiAgICAgICAgdGhpcy4kY2hpbGRyZW5bMF0uJGNoaWxkcmVuWzBdLiRlbHMuaW5wdXQuZm9jdXMoKTtcbiAgICAgIH1cbiAgICB9XG4gIH0sXG4gIG1ldGhvZHM6IHtcbiAgICB5ZXMoKSB7XG4gICAgICB0aGlzLmNvbmZpcm1lZCA9IHRydWU7XG4gICAgfSxcbiAgICBubygpIHtcbiAgICAgIHRoaXMuY29uZmlybWVkID0gZmFsc2U7XG4gICAgfVxuICB9XG59O1xuXG59LHtcIi4vcHJvbXB0VGVtcGxhdGUuaHRtbFwiOjE1fV0sMTU6W2Z1bmN0aW9uKHJlcXVpcmUsbW9kdWxlLGV4cG9ydHMpe1xubW9kdWxlLmV4cG9ydHMgPSBcIlxcblxcbjxkaXYgY2xhc3M9XFxcInByb21wdCBwcm9tcHQtbW9kYWxcXFwiIDp0cmFuc2l0aW9uPVxcXCJ0cmFuc2l0aW9uXFxcIiB2LXNob3c9XFxcInNob3dcXFwiPlxcbiAgPGRpdiBjbGFzcz1cXFwicHJvbXB0LW92ZXJsYXlcXFwiIHYtb246Y2xpY2s9XFxcIm5vKClcXFwiPjwvZGl2PlxcbiAgPGRpdiBjbGFzcz1cXFwicHJvbXB0LWNvbnRlbnRcXFwiPlxcbiAgICA8di1mb3JtIHYtaWY9XFxcInNob3dJbnB1dFxcXCIgOnN1Ym1pdC1jYWxsYmFjaz1cXFwieWVzXFxcIiA6YWpheD1cXFwidHJ1ZVxcXCI+XFxuICAgICAgPHA+e3sgcXVlc3Rpb25MYWJlbCB9fTwvcD5cXG4gICAgICA8di1pbnB1dCB0eXBlPVxcXCJ0ZXh0XFxcIiBsYWJlbD1cXFwiUmVzcG9uc2VcXFwiIG5hbWU9XFxcInByb21wdFJlc3BvbnNlXFxcIiA6dmFsdWUuc3luYz1cXFwicHJvbXB0VmFsdWVcXFwiIDpyZXF1aXJlZD1cXFwidHJ1ZVxcXCI+PC92LWlucHV0PlxcbiAgICAgIDxkaXYgY2xhc3M9XFxcImNvbnRyb2xzXFxcIj5cXG4gICAgICAgIDxidXR0b24gdHlwZT1cXFwiYnV0dG9uXFxcIiBjbGFzcz1cXFwiYnV0dG9uIHNtYWxsXFxcIiB2LW9uOmNsaWNrPVxcXCJubygpXFxcIj57eyBub0xhYmVsIH19PC9idXR0b24+XFxuICAgICAgICA8YnV0dG9uIHR5cGU9XFxcInN1Ym1pdFxcXCIgY2xhc3M9XFxcImJ1dHRvbiBzbWFsbFxcXCI+e3sgeWVzTGFiZWwgfX08L2J1dHRvbj5cXG4gICAgICA8L2Rpdj5cXG4gICAgPC92LWZvcm0+XFxuICAgIDxkaXYgdi1lbHNlPlxcbiAgICAgIDxwPnt7IHF1ZXN0aW9uTGFiZWwgfX08L3A+XFxuICAgICAgPGRpdiBjbGFzcz1cXFwiY29udHJvbHNcXFwiPlxcbiAgICAgICAgPGJ1dHRvbiB0eXBlPVxcXCJidXR0b25cXFwiIGNsYXNzPVxcXCJidXR0b24gc21hbGxcXFwiIHYtb246Y2xpY2s9XFxcIm5vKClcXFwiPnt7IG5vTGFiZWwgfX08L2J1dHRvbj5cXG4gICAgICAgIDxidXR0b24gdHlwZT1cXFwic3VibWl0XFxcIiBjbGFzcz1cXFwiYnV0dG9uIHNtYWxsXFxcIiB2LW9uOmNsaWNrPVxcXCJ5ZXMoKVxcXCI+e3sgeWVzTGFiZWwgfX08L2J1dHRvbj5cXG4gICAgICA8L2Rpdj5cXG4gICAgPC9kaXY+XFxuICA8L2Rpdj5cXG48L2Rpdj5cXG5cIjtcblxufSx7fV0sMTY6W2Z1bmN0aW9uKHJlcXVpcmUsbW9kdWxlLGV4cG9ydHMpe1xuXG52YXIgdGFiQ29tcG9uZW50ID0gcmVxdWlyZSgnLi90YWJDb21wb25lbnQuanMnKTtcblxuVnVlLmNvbXBvbmVudCgndGFiJywgdGFiQ29tcG9uZW50KTtcblxufSx7XCIuL3RhYkNvbXBvbmVudC5qc1wiOjE3fV0sMTc6W2Z1bmN0aW9uKHJlcXVpcmUsbW9kdWxlLGV4cG9ydHMpe1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgdGVtcGxhdGU6IHJlcXVpcmUoJy4vdGFiVGVtcGxhdGUuaHRtbCcpLFxuICBwcm9wczoge1xuICAgIGhlYWRpbmc6IHtcbiAgICAgIHR5cGU6IFN0cmluZyxcbiAgICAgIHJlcXVpcmVkOiB0cnVlXG4gICAgfSxcbiAgICBjbGlja0NhbGxiYWNrOiB7XG4gICAgICB0eXBlOiBGdW5jdGlvblxuICAgIH1cbiAgfSxcbiAgZGF0YSgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgaW5kZXg6IDAsXG4gICAgICBzaG93OiBmYWxzZVxuICAgIH07XG4gIH0sXG4gIGNvbXB1dGVkOiB7XG4gICAgc2hvdygpIHtcbiAgICAgIHJldHVybiAodGhpcy4kcGFyZW50LmFjdGl2ZSA9PSB0aGlzLmluZGV4KTtcbiAgICB9XG4gIH0sXG4gIHdhdGNoOiB7XG4gICAgaGVhZGluZygpIHtcbiAgICAgIHRoaXMuJHBhcmVudC50YWJzW3RoaXMuaW5kZXhdLmhlYWRpbmcgPSB0aGlzLmhlYWRpbmc7XG4gICAgfVxuICB9LFxuICBjcmVhdGVkKCkge1xuICAgIHRoaXMuJHBhcmVudC50YWJzLnB1c2goe1xuICAgICAgaGVhZGluZzogdGhpcy5oZWFkaW5nLFxuICAgICAgYWN0aXZlOiBmYWxzZVxuICAgIH0pO1xuICB9LFxuICByZWFkeSgpIHtcbiAgICBmb3IgKHZhciBpbmRleCBpbiB0aGlzLiRwYXJlbnQuJGNoaWxkcmVuKSB7XG4gICAgICBpZiAodGhpcy4kcGFyZW50LiRjaGlsZHJlbltpbmRleF0uJGVsID09IHRoaXMuJGVsKSB7XG4gICAgICAgIHRoaXMuaW5kZXggPSBpbmRleDtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfVxuICB9LFxuICBldmVudHM6IHtcbiAgICBUQUJfQ09NUE9ORU5UX1RBQl9DTElDS0VEOiBmdW5jdGlvbiBUYWJDbGlja2VkKCkge1xuICAgICAgaWYgKHR5cGVvZiB0aGlzLmNsaWNrQ2FsbGJhY2sgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgdGhpcy5jbGlja0NhbGxiYWNrKCk7XG4gICAgICB9XG4gICAgfVxuICB9XG59O1xuXG59LHtcIi4vdGFiVGVtcGxhdGUuaHRtbFwiOjE4fV0sMTg6W2Z1bmN0aW9uKHJlcXVpcmUsbW9kdWxlLGV4cG9ydHMpe1xubW9kdWxlLmV4cG9ydHMgPSBcIjxkaXYgY2xhc3M9XFxcInRhYlxcXCIgdi1zaG93PVxcXCJzaG93XFxcIj5cXG4gIDxzbG90Pjwvc2xvdD5cXG48L2Rpdj5cXG5cIjtcblxufSx7fV0sMTk6W2Z1bmN0aW9uKHJlcXVpcmUsbW9kdWxlLGV4cG9ydHMpe1xuXG52YXIgdGFic0NvbXBvbmVudCA9IHJlcXVpcmUoJy4vdGFic0NvbXBvbmVudC5qcycpO1xuXG5yZXF1aXJlKCcuL3RhYi90YWIuanMnKTtcblxuVnVlLmNvbXBvbmVudCgndGFicycsIHRhYnNDb21wb25lbnQpO1xuXG59LHtcIi4vdGFiL3RhYi5qc1wiOjE2LFwiLi90YWJzQ29tcG9uZW50LmpzXCI6MjB9XSwyMDpbZnVuY3Rpb24ocmVxdWlyZSxtb2R1bGUsZXhwb3J0cyl7XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICB0ZW1wbGF0ZTogcmVxdWlyZSgnLi90YWJzVGVtcGxhdGUuaHRtbCcpLFxuICBwcm9wczoge1xuICAgIGFjdGl2ZToge1xuICAgICAgdHlwZTogTnVtYmVyLFxuICAgICAgZGVmYXVsdDogMFxuICAgIH1cbiAgfSxcbiAgZGF0YSgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgdGFiczogW11cbiAgICB9O1xuICB9LFxuICByZWFkeSgpIHtcbiAgICBpZiAodGhpcy50YWJzWzBdKSB7XG4gICAgICB0aGlzLnRhYnNbMF0uYWN0aXZlID0gdHJ1ZTtcbiAgICB9XG4gIH0sXG4gIG1ldGhvZHM6IHtcbiAgICBoYW5kbGVUYWJMaXN0Q2xpY2soaW5kZXgsIGVsKSB7XG4gICAgICBpZiAoIWVsLmRpc2FibGVkKSB0aGlzLmFjdGl2ZSA9IGluZGV4O1xuXG4gICAgICBmb3IgKHZhciBpID0gMCwgaiA9IHRoaXMudGFicy5sZW5ndGg7IGkgPCBqOyBpKyspIHtcbiAgICAgICAgdGhpcy50YWJzW2ldLmFjdGl2ZSA9IChpID09IGluZGV4KTtcbiAgICAgICAgaWYgKHRoaXMudGFic1tpXS5hY3RpdmUpIHtcbiAgICAgICAgICB0aGlzLiRjaGlsZHJlbltpXS4kZW1pdCgnVEFCX0NPTVBPTkVOVF9UQUJfQ0xJQ0tFRCcpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG59O1xuXG59LHtcIi4vdGFic1RlbXBsYXRlLmh0bWxcIjoyMX1dLDIxOltmdW5jdGlvbihyZXF1aXJlLG1vZHVsZSxleHBvcnRzKXtcbm1vZHVsZS5leHBvcnRzID0gXCJcXG5cXG48ZGl2IGNsYXNzPVxcXCJ0YWJzXFxcIj5cXG4gIDwhLS0gVGFicyBOYXYgLS0+XFxuICA8dWwgY2xhc3M9XFxcInRhYi1uYXZcXFwiPlxcbiAgICA8bGkgdi1mb3I9XFxcInRhYiBpbiB0YWJzXFxcIiB2LWJpbmQ6Y2xhc3M9XFxcInsgJ2FjdGl2ZSc6IHRhYi5hY3RpdmUgfVxcXCIgdi1vbjpjbGljay5wcmV2ZW50PVxcXCJoYW5kbGVUYWJMaXN0Q2xpY2soJGluZGV4LCB0YWIpXFxcIiA6ZGlzYWJsZWQ9XFxcInRhYi5kaXNhYmxlZFxcXCI+XFxuICAgICAge3sgdGFiLmhlYWRpbmcgfX1cXG4gICAgPC9saT5cXG4gIDwvdWw+XFxuXFxuICA8IS0tIFRhYiBQYW5lcyAtLT5cXG4gIDxkaXYgY2xhc3M9XFxcInRhYi1jb250ZW50XFxcIiB2LWVsOnRhYkNvbnRlbnQ+XFxuICAgICAgPHNsb3Q+PC9zbG90PlxcbiAgPC9kaXY+XFxuPC9kaXY+XFxuXCI7XG5cbn0se31dLDIyOltmdW5jdGlvbihyZXF1aXJlLG1vZHVsZSxleHBvcnRzKXtcblxudmFyIHZDaGVja2JveENvbXBvbmVudCA9IHJlcXVpcmUoJy4vdkNoZWNrYm94Q29tcG9uZW50LmpzJyk7XG5cblZ1ZS5jb21wb25lbnQoJ3ZDaGVja2JveCcsIHZDaGVja2JveENvbXBvbmVudCk7XG5cbn0se1wiLi92Q2hlY2tib3hDb21wb25lbnQuanNcIjoyM31dLDIzOltmdW5jdGlvbihyZXF1aXJlLG1vZHVsZSxleHBvcnRzKXtcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIHRlbXBsYXRlOiByZXF1aXJlKCcuL3ZDaGVja2JveFRlbXBsYXRlLmh0bWwnKSxcbiAgZGF0YSgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgaWNvbjogJ3VuY2hlY2tlZCcsXG4gICAgICBpc0Vycm9yOiBmYWxzZVxuICAgIH07XG4gIH0sXG4gIHByb3BzOiB7XG4gICAgY2hlY2tlZDoge1xuICAgICAgdHlwZTogQm9vbGVhbixcbiAgICAgIHJlcXVpcmVkOiB0cnVlLFxuICAgICAgdHdvV2F5OiB0cnVlXG4gICAgfSxcbiAgICBsYWJlbDoge1xuICAgICAgdHlwZTogU3RyaW5nLFxuICAgICAgcmVxdWlyZWQ6IHRydWVcbiAgICB9LFxuICAgIHJlcXVpcmVkOiB7XG4gICAgICB0eXBlOiBCb29sZWFuLFxuICAgICAgZGVmYXVsdHNUbzogZmFsc2VcbiAgICB9XG4gIH0sXG4gIHdhdGNoOiB7XG4gICAgY2hlY2tlZCh2YWwpIHtcbiAgICAgIHRoaXMuaWNvbiA9ICh2YWwgPT09IHRydWUpID8gJ2NoZWNrZWQnIDogJ3VuY2hlY2tlZCc7XG4gICAgfVxuICB9LFxuICByZWFkeSgpIHtcbiAgICB0aGlzLmljb24gPSAodGhpcy5jaGVja2VkID09PSB0cnVlKSA/ICdjaGVja2VkJyA6ICd1bmNoZWNrZWQnO1xuICB9LFxuICBtZXRob2RzOiB7XG4gICAgdG9nZ2xlKCkge1xuICAgICAgdGhpcy5jaGVja2VkID0gIXRoaXMuY2hlY2tlZDtcbiAgICB9LFxuICAgIGlzVmFsaWQoKSB7XG4gICAgICB0aGlzLmlzRXJyb3IgPSAodGhpcy5yZXF1aXJlZCkgPyAhdGhpcy5jaGVja2VkIDogZmFsc2U7XG4gICAgICByZXR1cm4gIXRoaXMuaXNFcnJvcjtcbiAgICB9XG4gIH1cbn07XG5cbn0se1wiLi92Q2hlY2tib3hUZW1wbGF0ZS5odG1sXCI6MjR9XSwyNDpbZnVuY3Rpb24ocmVxdWlyZSxtb2R1bGUsZXhwb3J0cyl7XG5tb2R1bGUuZXhwb3J0cyA9IFwiXFxuPGRpdiA6Y2xhc3M9XFxcInsgJ2NoZWNrYm94JzogdHJ1ZSwgJ2Vycm9yJzogaXNFcnJvciB9XFxcIj5cXG4gIDxpY29uIHYtb246Y2xpY2s9XFxcInRvZ2dsZSgpXFxcIiA6bmFtZT1cXFwiaWNvblxcXCI+PC9pY29uPlxcbiAgPHNwYW4gdi1vbjpjbGljaz1cXFwidG9nZ2xlKClcXFwiPnt7IGxhYmVsIH19PC9zcGFuPlxcbjwvZGl2PlxcblwiO1xuXG59LHt9XSwyNTpbZnVuY3Rpb24ocmVxdWlyZSxtb2R1bGUsZXhwb3J0cyl7XG5cbnZhciB2Rm9ybUNvbXBvbmVudCA9IHJlcXVpcmUoJy4vdkZvcm1Db21wb25lbnQuanMnKTtcblxuVnVlLmNvbXBvbmVudCgndkZvcm0nLCB2Rm9ybUNvbXBvbmVudCk7XG5cbn0se1wiLi92Rm9ybUNvbXBvbmVudC5qc1wiOjI2fV0sMjY6W2Z1bmN0aW9uKHJlcXVpcmUsbW9kdWxlLGV4cG9ydHMpe1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgdGVtcGxhdGU6IHJlcXVpcmUoJy4vdkZvcm1UZW1wbGF0ZS5odG1sJyksXG4gIHByb3BzOiB7XG4gICAgbWV0aG9kOiB7XG4gICAgICB0eXBlOiBTdHJpbmcsXG4gICAgICBkZWZhdWx0c1RvOiAnUE9TVCdcbiAgICB9LFxuICAgIGFjdGlvbjoge1xuICAgICAgdHlwZTogU3RyaW5nLFxuICAgICAgZGVmYXVsdHNUbzogJydcbiAgICB9LFxuICAgIGFqYXg6IHtcbiAgICAgIHR5cGU6IEJvb2xlYW4sXG4gICAgICBkZWZhdWx0c1RvOiBmYWxzZVxuICAgIH0sXG4gICAgc3VibWl0Q2FsbGJhY2s6IHtcbiAgICAgIHR5cGU6IEZ1bmN0aW9uXG4gICAgfVxuICB9LFxuICBtZXRob2RzOiB7XG4gICAgc3VibWl0Rm9ybShldmVudCkge1xuICAgICAgaWYgKHRoaXMuYWpheCB8fCAhdGhpcy5pc1ZhbGlkKCkpIHtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgIH1cblxuICAgICAgaWYgKHRoaXMuYWpheCAmJiB0aGlzLmlzVmFsaWQoKSAmJiB0eXBlb2YgdGhpcy5zdWJtaXRDYWxsYmFjayA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICB0aGlzLnN1Ym1pdENhbGxiYWNrKCk7XG4gICAgICB9XG4gICAgfSxcbiAgICBpc1ZhbGlkKCkge1xuICAgICAgdmFyIHNlbGYgPSB0aGlzLFxuICAgICAgICBmb3JtSXNWYWxpZCA9IHRydWU7XG5cbiAgICAgIGZvciAodmFyIGkgPSAwLCBqID0gc2VsZi4kY2hpbGRyZW4ubGVuZ3RoOyBpIDwgajsgaSsrKSB7XG4gICAgICAgIGlmIChfLmlzRnVuY3Rpb24oc2VsZi4kY2hpbGRyZW5baV0uaXNWYWxpZCkpIHsgLy8gaGFzIGlucHV0IHZhbGlkYXRpb24gYXR0YWNoZWRcbiAgICAgICAgICBmb3JtSXNWYWxpZCA9IGZvcm1Jc1ZhbGlkICYmIHNlbGYuJGNoaWxkcmVuW2ldLmlzVmFsaWQoKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICByZXR1cm4gZm9ybUlzVmFsaWQ7XG4gICAgfVxuICB9XG59O1xuXG59LHtcIi4vdkZvcm1UZW1wbGF0ZS5odG1sXCI6Mjd9XSwyNzpbZnVuY3Rpb24ocmVxdWlyZSxtb2R1bGUsZXhwb3J0cyl7XG5tb2R1bGUuZXhwb3J0cyA9IFwiXFxuPGZvcm0gdi1pZj1cXFwiYWpheFxcXCIgdi1lbDpmb3JtIHYtb246c3VibWl0LnByZXZlbnQ9XFxcInN1Ym1pdEZvcm1cXFwiIDptZXRob2Q9XFxcIm1ldGhvZFxcXCIgOmFjdGlvbj1cXFwiYWN0aW9uXFxcIiBub3ZhbGlkYXRlPlxcbiAgPHNsb3Q+PC9zbG90PlxcbjwvZm9ybT5cXG48Zm9ybSB2LWVsc2Ugdi1lbDpmb3JtIHYtb246c3VibWl0PVxcXCJzdWJtaXRGb3JtXFxcIiA6bWV0aG9kPVxcXCJtZXRob2RcXFwiIDphY3Rpb249XFxcImFjdGlvblxcXCIgbm92YWxpZGF0ZT5cXG4gIDxzbG90Pjwvc2xvdD5cXG48L2Zvcm0+XFxuXCI7XG5cbn0se31dLDI4OltmdW5jdGlvbihyZXF1aXJlLG1vZHVsZSxleHBvcnRzKXtcblxudmFyIHZJbnB1dENvbXBvbmVudCA9IHJlcXVpcmUoJy4vdklucHV0Q29tcG9uZW50LmpzJyk7XG5cblZ1ZS5jb21wb25lbnQoJ3ZJbnB1dCcsIHZJbnB1dENvbXBvbmVudCk7XG5cbn0se1wiLi92SW5wdXRDb21wb25lbnQuanNcIjoyOX1dLDI5OltmdW5jdGlvbihyZXF1aXJlLG1vZHVsZSxleHBvcnRzKXtcblxudmFyIHZhbGlkYXRpb25SdWxlcyA9IHJlcXVpcmUoJy4vdmFsaWRhdGlvblJ1bGVzLmpzJyk7XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICB0ZW1wbGF0ZTogcmVxdWlyZSgnLi92SW5wdXRUZW1wbGF0ZS5odG1sJyksXG4gIHByb3BzOiB7XG4gICAgbGFiZWw6IHtcbiAgICAgIHR5cGU6IFN0cmluZ1xuICAgIH0sXG4gICAgbmFtZToge1xuICAgICAgdHlwZTogU3RyaW5nXG4gICAgfSxcbiAgICB0eXBlOiB7XG4gICAgICB0eXBlOiBTdHJpbmcsXG4gICAgICByZXF1aXJlZDogdHJ1ZVxuICAgIH0sXG4gICAgcGxhY2Vob2xkZXI6IHtcbiAgICAgIHR5cGU6IFN0cmluZ1xuICAgIH0sXG4gICAgaWNvbjoge1xuICAgICAgdHlwZTogU3RyaW5nXG4gICAgfSxcbiAgICB2YWx1ZToge1xuICAgICAgdHlwZTogU3RyaW5nLFxuICAgICAgcmVxdWlyZWQ6IHRydWUsXG4gICAgICB0d29XYXk6IHRydWVcbiAgICB9LFxuICAgIHJlcXVpcmVkOiB7XG4gICAgICB0eXBlOiBCb29sZWFuLFxuICAgICAgZGVmYXVsdHNUbzogZmFsc2VcbiAgICB9LFxuICAgIGVxdWFsVG86IHtcbiAgICAgIHR5cGU6IE9iamVjdCxcbiAgICAgIGRlZmF1bHRzVG86IG51bGxcbiAgICB9XG4gIH0sXG4gIGRhdGEoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGVycm9yOiAnJ1xuICAgIH07XG4gIH0sXG4gIG1ldGhvZHM6IHtcbiAgICBpc1ZhbGlkKCkge1xuICAgICAgdGhpcy52YWxpZGF0ZSgpO1xuICAgICAgcmV0dXJuICh0aGlzLmVycm9yLmxlbmd0aCA9PT0gMCk7XG4gICAgfSxcbiAgICBkZWJvdW5jZVZhbGlkYXRlOiBfLmRlYm91bmNlKGZ1bmN0aW9uICgpIHtcbiAgICAgIHRoaXMudmFsaWRhdGUoKTtcbiAgICB9LCA1MDApLFxuICAgIHZhbGlkYXRlKCkge1xuICAgICAgdmFyIGxhYmVsID0gdGhpcy5sYWJlbCB8fCB0aGlzLm5hbWU7XG5cbiAgICAgIC8vIHJlcXVpcmVkIHZhbGlkYXRpb25cbiAgICAgIGlmICh0aGlzLnJlcXVpcmVkICYmIHRoaXMudmFsdWUubGVuZ3RoID09PSAwKSB7XG4gICAgICAgIHRoaXMuZXJyb3IgPSBsYWJlbCArICcgaXMgcmVxdWlyZWQnO1xuXG4gICAgICAvLyBodG1sNSBkYXRhIHR5cGUgdmFsaWRhdGlvblxuICAgICAgfSBlbHNlIGlmICh2YWxpZGF0aW9uUnVsZXMuaGFzT3duUHJvcGVydHkodGhpcy50eXBlKSAmJiAhdmFsaWRhdGlvblJ1bGVzW3RoaXMudHlwZV0ucmVnZXgudGVzdCh0aGlzLnZhbHVlKSkge1xuICAgICAgICB0aGlzLmVycm9yID0gdmFsaWRhdGlvblJ1bGVzW3RoaXMudHlwZV0uZGVmYXVsdEVycm9yO1xuXG4gICAgICAvLyBlcXVpdmFsZW5jeSB2YWxpZGF0aW9uXG4gICAgICB9IGVsc2UgaWYgKHRoaXMuZXF1YWxUbyAmJiB0aGlzLmVxdWFsVG8udmFsdWUgIT09IHRoaXMudmFsdWUpIHtcbiAgICAgICAgdGhpcy5lcnJvciA9ICdNdXN0IG1hdGNoICcgKyB0aGlzLmVxdWFsVG8ubGFiZWw7XG5cbiAgICAgIC8vIGlucHV0IGlzIHZhbGlkXG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLmVycm9yID0gJyc7XG4gICAgICB9XG4gICAgfVxuICB9XG59O1xuXG59LHtcIi4vdklucHV0VGVtcGxhdGUuaHRtbFwiOjMwLFwiLi92YWxpZGF0aW9uUnVsZXMuanNcIjozMX1dLDMwOltmdW5jdGlvbihyZXF1aXJlLG1vZHVsZSxleHBvcnRzKXtcbm1vZHVsZS5leHBvcnRzID0gXCJcXG48bGFiZWwgY2xhc3M9XFxcInYtaW5wdXRcXFwiPlxcbiAge3sgbGFiZWwgfX1cXG4gIDxkaXYgY2xhc3M9XFxcImlucHV0LXdyYXBcXFwiPlxcbiAgICA8aSBjbGFzcz1cXFwiZmEgZmEte3sgaWNvbiB9fVxcXCIgdi1pZj1cXFwiaWNvblxcXCI+PC9pPlxcbiAgICA8dGV4dGFyZWEgdi1pZj1cXFwidHlwZSA9PT0gJ3RleHRhcmVhJ1xcXCJcXG4gICAgICB2LWVsOmlucHV0XFxuICAgICAgOmNsYXNzPVxcXCJ7ICdlcnJvcic6IGVycm9yLmxlbmd0aCA+IDAgfVxcXCJcXG4gICAgICBuYW1lPVxcXCJ7eyBuYW1lIH19XFxcIlxcbiAgICAgIHBsYWNlaG9sZGVyPVxcXCJ7eyBwbGFjZWhvbGRlciB9fVxcXCJcXG4gICAgICB2LW1vZGVsPVxcXCJ2YWx1ZVxcXCJcXG4gICAgICB2LW9uOmJsdXI9XFxcInZhbGlkYXRlKClcXFwiPjwvdGV4dGFyZWE+XFxuICAgIDxpbnB1dCB2LWVsc2VcXG4gICAgICB2LWVsOmlucHV0XFxuICAgICAgOmNsYXNzPVxcXCJ7ICdlcnJvcic6IGVycm9yLmxlbmd0aCA+IDAgfVxcXCJcXG4gICAgICBuYW1lPVxcXCJ7eyBuYW1lIH19XFxcIlxcbiAgICAgIHR5cGU9XFxcInt7IHR5cGUgfX1cXFwiXFxuICAgICAgcGxhY2Vob2xkZXI9XFxcInt7IHBsYWNlaG9sZGVyIH19XFxcIlxcbiAgICAgIHYtbW9kZWw9XFxcInZhbHVlXFxcIlxcbiAgICAgIHYtb246Ymx1cj1cXFwidmFsaWRhdGUoKVxcXCIgLz5cXG4gICAgPHNtYWxsIHYtaWY9XFxcImVycm9yLmxlbmd0aCA+IDBcXFwiIHRyYW5zaXRpb249XFxcInNsaWRlLXVwLXgtc21hbGxcXFwiIGNsYXNzPVxcXCJlcnJvclxcXCI+e3sgZXJyb3IgfX08L3NtYWxsPlxcbiAgPC9kaXY+XFxuPC9sYWJlbD5cXG5cIjtcblxufSx7fV0sMzE6W2Z1bmN0aW9uKHJlcXVpcmUsbW9kdWxlLGV4cG9ydHMpe1xuXG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBlbWFpbDoge1xuICAgIHJlZ2V4OiAvXigoW148PigpXFxbXFxdXFxcXC4sOzpcXHNAXCJdKyhcXC5bXjw+KClcXFtcXF1cXFxcLiw7Olxcc0BcIl0rKSopfChcIi4rXCIpKUAoKFxcW1swLTldezEsM31cXC5bMC05XXsxLDN9XFwuWzAtOV17MSwzfVxcLlswLTldezEsM31dKXwoKFthLXpBLVpcXC0wLTldK1xcLikrW2EtekEtWl17Mix9KSkkLyxcbiAgICBkZWZhdWx0RXJyb3I6ICdQbGVhc2UgZW50ZXIgYSB2YWxpZCBlbWFpbCBhZGRyZXNzJ1xuICB9LFxuICB1cmw6IHtcbiAgICByZWdleDogL2h0dHBzPzpcXC9cXC8od3d3XFwuKT9bLWEtekEtWjAtOUA6JS5fXFwrfiM9XXsyLDI1Nn1cXC5bYS16XXsyLDR9XFxiKFstYS16QS1aMC05QDolX1xcKy5+Iz8mLy89XSopLyxcbiAgICBkZWZhdWx0RXJyb3I6ICdQbGVhc2UgZW50ZXIgYSB2YWxpZCBVUkwnXG4gIH0sXG4gIG51bWJlcjoge1xuICAgIHJlZ2V4OiAvWy0uMC05XSsvLFxuICAgIGRlZmF1bHRFcnJvcjogJ1BsZWFzZSBlbnRlciBhIHZhbGlkIG51bWJlcidcbiAgfVxufTtcblxufSx7fV0sMzI6W2Z1bmN0aW9uKHJlcXVpcmUsbW9kdWxlLGV4cG9ydHMpe1xuXG52YXIgdlNlbGVjdENvbXBvbmVudCA9IHJlcXVpcmUoJy4vdlNlbGVjdENvbXBvbmVudC5qcycpO1xuXG5WdWUuY29tcG9uZW50KCd2U2VsZWN0JywgdlNlbGVjdENvbXBvbmVudCk7XG5cbn0se1wiLi92U2VsZWN0Q29tcG9uZW50LmpzXCI6MzN9XSwzMzpbZnVuY3Rpb24ocmVxdWlyZSxtb2R1bGUsZXhwb3J0cyl7XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICB0ZW1wbGF0ZTogcmVxdWlyZSgnLi92U2VsZWN0VGVtcGxhdGUuaHRtbCcpLFxuICBwcm9wczoge1xuICAgIGxhYmVsOiB7XG4gICAgICB0eXBlOiBTdHJpbmcsXG4gICAgICBkZWZhdWx0c1RvOiAnJ1xuICAgIH0sXG4gICAgc2VsZWN0ZWQ6IHtcbiAgICAgIHR5cGU6IFN0cmluZyxcbiAgICAgIHJlcXVpcmVkOiB0cnVlLFxuICAgICAgdHdvV2F5OiB0cnVlXG4gICAgfSxcbiAgICBvcHRpb25zOiB7XG4gICAgICB0eXBlOiBBcnJheSxcbiAgICAgIHJlcXVpcmVkOiB0cnVlXG4gICAgfSxcbiAgICByZXF1aXJlZDoge1xuICAgICAgdHlwZTogQm9vbGVhbixcbiAgICAgIGRlZmF1bHRzVG86IGZhbHNlXG4gICAgfVxuICB9LFxuICBkYXRhKCkge1xuICAgIHJldHVybiB7XG4gICAgICBpc0Vycm9yOiBmYWxzZVxuICAgIH07XG4gIH0sXG4gIHJlYWR5KCkge1xuICAgIHZhciBzZWxmID0gdGhpcyxcbiAgICAgIHNlbGVjdGVkSW5kZXggPSBfLmZpbmRJbmRleChzZWxmLm9wdGlvbnMsIChvcHRpb24pID0+IG9wdGlvbi52YWx1ZSA9PT0gc2VsZi5zZWxlY3RlZCk7XG5cbiAgICBpZiAoc2VsZi5yZXF1aXJlZCAmJiBzZWxlY3RlZEluZGV4ID09PSAtMSkge1xuICAgICAgc2VsZi5zZWxlY3RlZCA9IHNlbGYub3B0aW9uc1swXS52YWx1ZTtcbiAgICB9XG4gIH0sXG4gIG1ldGhvZHM6IHtcbiAgICBpc1ZhbGlkKCkge1xuICAgICAgdGhpcy5pc0Vycm9yID0gIXRoaXMucmVxdWlyZWQgfHwgdGhpcy5zZWxlY3RlZC5sZW5ndGggPiAwO1xuICAgICAgcmV0dXJuIHRoaXMuaXNFcnJvcjtcbiAgICB9XG4gIH1cbn07XG5cbn0se1wiLi92U2VsZWN0VGVtcGxhdGUuaHRtbFwiOjM0fV0sMzQ6W2Z1bmN0aW9uKHJlcXVpcmUsbW9kdWxlLGV4cG9ydHMpe1xubW9kdWxlLmV4cG9ydHMgPSBcIlxcbjxsYWJlbCBjbGFzcz1cXFwidi1zZWxlY3RcXFwiPlxcbiAge3sgbGFiZWwgfX1cXG4gIDxzZWxlY3Qgdi1tb2RlbD1cXFwic2VsZWN0ZWRcXFwiIDpjbGFzcz1cXFwieyAnZXJyb3InOiBpc0Vycm9yIH1cXFwiPlxcbiAgICA8b3B0aW9uIHYtaWY9XFxcIiFyZXF1aXJlZFxcXCIgdmFsdWU9XFxcIlxcXCI+PC9vcHRpb24+XFxuICAgIDxvcHRpb24gdi1mb3I9XFxcIm9wdGlvbiBpbiBvcHRpb25zXFxcIiA6dmFsdWU9XFxcIm9wdGlvbi52YWx1ZVxcXCI+e3sgb3B0aW9uLmxhYmVsIH19PC9vcHRpb24+XFxuICA8L3NlbGVjdD5cXG48L2xhYmVsPlxcblwiO1xuXG59LHt9XSwzNTpbZnVuY3Rpb24ocmVxdWlyZSxtb2R1bGUsZXhwb3J0cyl7XG5cbnJlcXVpcmUoJy4vY29tcG9uZW50cy9hbGVydC9hbGVydC5qcycpO1xucmVxdWlyZSgnLi9jb21wb25lbnRzL2ljb24vaWNvbi5qcycpO1xucmVxdWlyZSgnLi9jb21wb25lbnRzL21vZGFsL21vZGFsLmpzJyk7XG5yZXF1aXJlKCcuL2NvbXBvbmVudHMvcHJvbXB0L3Byb21wdC5qcycpO1xucmVxdWlyZSgnLi9jb21wb25lbnRzL2xvYWRlci9sb2FkZXIuanMnKTtcbnJlcXVpcmUoJy4vY29tcG9uZW50cy90YWJzL3RhYnMuanMnKTtcbnJlcXVpcmUoJy4vY29tcG9uZW50cy92Rm9ybS92Rm9ybS5qcycpO1xucmVxdWlyZSgnLi9jb21wb25lbnRzL3ZJbnB1dC92SW5wdXQuanMnKTtcbnJlcXVpcmUoJy4vY29tcG9uZW50cy92U2VsZWN0L3ZTZWxlY3QuanMnKTtcbnJlcXVpcmUoJy4vY29tcG9uZW50cy92Q2hlY2tib3gvdkNoZWNrYm94LmpzJyk7XG5cbn0se1wiLi9jb21wb25lbnRzL2FsZXJ0L2FsZXJ0LmpzXCI6MSxcIi4vY29tcG9uZW50cy9pY29uL2ljb24uanNcIjo0LFwiLi9jb21wb25lbnRzL2xvYWRlci9sb2FkZXIuanNcIjo3LFwiLi9jb21wb25lbnRzL21vZGFsL21vZGFsLmpzXCI6MTAsXCIuL2NvbXBvbmVudHMvcHJvbXB0L3Byb21wdC5qc1wiOjEzLFwiLi9jb21wb25lbnRzL3RhYnMvdGFicy5qc1wiOjE5LFwiLi9jb21wb25lbnRzL3ZDaGVja2JveC92Q2hlY2tib3guanNcIjoyMixcIi4vY29tcG9uZW50cy92Rm9ybS92Rm9ybS5qc1wiOjI1LFwiLi9jb21wb25lbnRzL3ZJbnB1dC92SW5wdXQuanNcIjoyOCxcIi4vY29tcG9uZW50cy92U2VsZWN0L3ZTZWxlY3QuanNcIjozMn1dfSx7fSxbMzVdKSJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
