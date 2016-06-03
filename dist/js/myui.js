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

    function Alert() {
      this.messages = [];
      this.type = '';
    }

    Alert.prototype.close = function () {
      this.messages = [];
    };

    Alert.prototype.setType = function (type) {
      if (this.type !== type) {
        this.messages = [];
      }
      this.type = type;
    };

    Alert.prototype.addMessage = function (message, fade, fadeDuration, onFade) {
      var self = this;

      fadeDuration = fadeDuration || 10000;

      self.messages.push(message);

      if (fade) {
        setTimeout(function () {
          self.messages.splice(_.findIndex(this.messages, function (existingMessage) {
            return existingMessage === message;
          }), 1);
          if (typeof onFade === 'function') {
            onFade();
          }
        }, fadeDuration);
      }
    };

    Alert.prototype.message = function (message, fade, duration, onFade) {
      this.setType('');
      this.addMessage(message, fade, duration, onFade);
    };

    Alert.prototype.info = function (message, fade, duration, onFade) {
      this.setType('info');
      this.addMessage(message, fade, duration, onFade);
    };

    Alert.prototype.success = function (message, fade, duration, onFade) {
      this.setType('success');
      this.addMessage(message, fade, duration, onFade);
    };

    Alert.prototype.warning = function (message, fade, duration, onFade) {
      this.setType('warning');
      this.addMessage(message, fade, duration, onFade);
    };

    Alert.prototype.error = function (message, fade, duration, onFade) {
      this.setType('alert');
      this.addMessage(message, fade, duration, onFade);
    };

    module.exports = Alert;
  }, {}], 2: [function (require, module, exports) {

    var alertComponent = require('./alertComponent.js');

    Vue.component('alert', alertComponent);
  }, { "./alertComponent.js": 3 }], 3: [function (require, module, exports) {

    var Alert = require('./alert.class.js');

    module.exports = {
      template: require('./alertTemplate.html'),
      props: {
        alert: {
          type: Object,
          required: true,
          twoWay: true
        },
        canClose: {
          type: Boolean,
          defaultsTo: false
        }
      },
      ready: function ready() {
        this.alert = new Alert();
      },

      methods: {
        close: function close() {
          this.alert.close();
        }
      }
    };
  }, { "./alert.class.js": 1, "./alertTemplate.html": 4 }], 4: [function (require, module, exports) {
    module.exports = "\n<div class=\"alert-box\" v-bind:class=\"{\n    success: alert.type === 'success',\n    warning: alert.type === 'warning',\n    info: alert.type === 'info',\n    alert: alert.type === 'alert',\n    secondary: alert.type === 'secondary'\n  }\" transition=\"fade\" v-show=\"alert.messages && alert.messages.length > 0\">\n  <ul>\n    <li v-for=\"message in alert.messages\" track-by=\"$index\">{{ message }}</li>\n  </ul>\n  <a href=\"#\" class=\"close\" v-if=\"canClose\" v-on:click=\"close()\"><icon name=\"multiply\"></icon></a>\n</div>\n";
  }, {}], 5: [function (require, module, exports) {

    var iconComponent = require('./iconComponent.js');

    Vue.component('icon', iconComponent);
  }, { "./iconComponent.js": 6 }], 6: [function (require, module, exports) {

    module.exports = {
      template: require('./iconTemplate.html'),
      props: ['name']
    };
  }, { "./iconTemplate.html": 7 }], 7: [function (require, module, exports) {
    module.exports = "\n<svg class=\"icon-image {{ name }}\">\n  <use xmlns:xlink=\"http://www.w3.org/1999/xlink\" xlink:href=\"#icon-{{ name }}\"></use>\n</svg>\n";
  }, {}], 8: [function (require, module, exports) {

    var loaderComponent = require('./loaderComponent.js');

    Vue.component('loader', loaderComponent);
  }, { "./loaderComponent.js": 9 }], 9: [function (require, module, exports) {

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
  }, { "./loaderTemplate.html": 10 }], 10: [function (require, module, exports) {
    module.exports = "<div class=\"loader\">Loading...</div>\n";
  }, {}], 11: [function (require, module, exports) {

    var modalComponent = require('./modalComponent.js');

    Vue.component('modal', modalComponent);
  }, { "./modalComponent.js": 12 }], 12: [function (require, module, exports) {

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
          defaultsTo: 'full'
        }
      },
      computed: {
        isMenu: function isMenu() {
          return this.modalSize === 'menu';
        }
      }
    };
  }, { "./modalTemplate.html": 13 }], 13: [function (require, module, exports) {
    module.exports = "\n<div class=\"modal\" transition=\"zoom-in\" v-show=\"show\" v-on:click.prevent=\"show = false\">\n  <div :class=\"{ 'modal-content': true, 'small': modalSize === 'small', 'full': modalSize === 'full' }\">\n    <div class=\"modal-header\">\n      <slot name=\"header\"></slot>\n    </div>\n    <slot name=\"content\"></slot>\n    <span v-on:click=\"show = false\" aria-label=\"Close\">&#215;</span>\n  </div>\n</div>\n";
  }, {}], 14: [function (require, module, exports) {

    var promptComponent = require('./promptComponent');

    Vue.component('prompt', promptComponent);
  }, { "./promptComponent": 15 }], 15: [function (require, module, exports) {

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
  }, { "./promptTemplate.html": 16 }], 16: [function (require, module, exports) {
    module.exports = "\n\n<div class=\"prompt prompt-modal\" transition=\"zoom-in\" v-show=\"show\">\n  <div class=\"prompt-overlay\" v-on:click=\"no()\"></div>\n  <div class=\"prompt-content\">\n    <v-form :submit-callback=\"yes\" :ajax=\"true\">\n      <p class=\"text-center\">{{ questionLabel }}</p>\n      <v-input type=\"text\" label=\"Response\" name=\"promptResponse\" :value.sync=\"promptValue\" :required=\"true\"></v-input>\n      <div class=\"controls\">\n        <button type=\"button\" class=\"tiny\" type=\"button\" v-on:click=\"no()\">{{ noLabel }}</button>\n        <button type=\"submit\" class=\"tiny\" type=\"submit\">{{ yesLabel }}</button>\n      </div>\n    </v-form>\n  </div>\n</div>\n";
  }, {}], 17: [function (require, module, exports) {

    var tabComponent = require('./tabComponent.js');

    Vue.component('tab', tabComponent);
  }, { "./tabComponent.js": 18 }], 18: [function (require, module, exports) {

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
  }, { "./tabTemplate.html": 19 }], 19: [function (require, module, exports) {
    module.exports = "<div class=\"tab\" v-show=\"show\">\n  <slot></slot>\n</div>\n";
  }, {}], 20: [function (require, module, exports) {

    var tabsComponent = require('./tabsComponent.js');

    require('./tab/tab.js');

    Vue.component('tabs', tabsComponent);
  }, { "./tab/tab.js": 17, "./tabsComponent.js": 21 }], 21: [function (require, module, exports) {

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
  }, { "./tabsTemplate.html": 22 }], 22: [function (require, module, exports) {
    module.exports = "\n\n<div class=\"tabs\">\n  <!-- Tabs Nav -->\n  <ul class=\"tab-nav\">\n    <li v-for=\"tab in tabs\" v-bind:class=\"{ 'active': tab.active }\" v-on:click.prevent=\"handleTabListClick($index, tab)\" :disabled=\"tab.disabled\">\n      {{ tab.heading }}\n    </li>\n  </ul>\n\n  <!-- Tab Panes -->\n  <div class=\"tab-content\" v-el:tabContent>\n      <slot></slot>\n  </div>\n</div>\n";
  }, {}], 23: [function (require, module, exports) {

    var vCheckboxComponent = require('./vCheckboxComponent.js');

    Vue.component('vCheckbox', vCheckboxComponent);
  }, { "./vCheckboxComponent.js": 24 }], 24: [function (require, module, exports) {

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
  }, { "./vCheckboxTemplate.html": 25 }], 25: [function (require, module, exports) {
    module.exports = "\n<div :class=\"{ 'checkbox': true, 'error': isError }\">\n  <icon v-on:click=\"toggle()\" :name=\"icon\"></icon>\n  <span v-on:click=\"toggle()\">{{ label }}</span>\n</div>\n";
  }, {}], 26: [function (require, module, exports) {

    var vFormComponent = require('./vFormComponent.js');

    Vue.component('vForm', vFormComponent);
  }, { "./vFormComponent.js": 27 }], 27: [function (require, module, exports) {

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
  }, { "./vFormTemplate.html": 28 }], 28: [function (require, module, exports) {
    module.exports = "\n<form v-if=\"ajax\" v-el:form v-on:submit.prevent=\"submitForm\" :method=\"method\" :action=\"action\" novalidate>\n  <slot></slot>\n</form>\n<form v-else v-el:form v-on:submit=\"submitForm\" :method=\"method\" :action=\"action\" novalidate>\n  <slot></slot>\n</form>\n";
  }, {}], 29: [function (require, module, exports) {

    var vInputComponent = require('./vInputComponent.js');

    Vue.component('vInput', vInputComponent);
  }, { "./vInputComponent.js": 30 }], 30: [function (require, module, exports) {

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
  }, { "./vInputTemplate.html": 31, "./validationRules.js": 32 }], 31: [function (require, module, exports) {
    module.exports = "\n<label class=\"v-input\">\n  {{ label | isSimple }} <span v-if=\"!required && !simple\" class=\"right\">optional</span>\n  <div class=\"input-wrap\">\n    <i class=\"fa fa-{{ icon }}\" v-if=\"icon\"></i>\n    <textarea v-if=\"type === 'textarea'\"\n      v-el:input\n      :class=\"{ 'error': error.length > 0 }\"\n      name=\"{{ name }}\"\n      placeholder=\"{{ placeholder }}\"\n      v-model=\"value\"\n      v-on:blur=\"validate()\"></textarea>\n    <input v-else\n      v-el:input\n      :class=\"{ 'error': error.length > 0 }\"\n      name=\"{{ name }}\"\n      type=\"{{ type }}\"\n      placeholder=\"{{ placeholder }}\"\n      v-model=\"value\"\n      v-on:blur=\"validate()\" />\n    <small v-if=\"error.length > 0\" transition=\"slide-up-x-small\" class=\"error\">{{ error }}</small>\n  </div>\n</label>\n";
  }, {}], 32: [function (require, module, exports) {

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
  }, {}], 33: [function (require, module, exports) {

    var vSelectComponent = require('./vSelectComponent.js');

    Vue.component('vSelect', vSelectComponent);
  }, { "./vSelectComponent.js": 34 }], 34: [function (require, module, exports) {

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
  }, { "./vSelectTemplate.html": 35 }], 35: [function (require, module, exports) {
    module.exports = "\n<label class=\"v-select\">\n  {{ label }}\n  <select v-model=\"selected\" :class=\"{ 'error': isError }\">\n    <option v-if=\"!required\" value=\"\"></option>\n    <option v-for=\"option in options\" :value=\"option.value\">{{ option.label }}</option>\n  </select>\n</label>\n";
  }, {}], 36: [function (require, module, exports) {

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
  }, { "./components/alert/alert.js": 2, "./components/icon/icon.js": 5, "./components/loader/loader.js": 8, "./components/modal/modal.js": 11, "./components/prompt/prompt.js": 14, "./components/tabs/tabs.js": 20, "./components/vCheckbox/vCheckbox.js": 23, "./components/vForm/vForm.js": 26, "./components/vInput/vInput.js": 29, "./components/vSelect/vSelect.js": 33 }] }, {}, [36]);
//# sourceMappingURL=data:application/json;base64,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bEssRUFBcUssNkJBQTRCLEVBQWpNLEVBQW9NLHVDQUFzQyxFQUExTyxFQUE2TywrQkFBOEIsRUFBM1EsRUFBOFEsaUNBQWdDLEVBQTlTLEVBQWlULG1DQUFrQyxFQUFuVixFQWJPLENBcG5CZ1osRUFBelosRUFpb0IyVixFQWpvQjNWLEVBaW9COFYsQ0FBQyxFQUFELENBam9COVYiLCJmaWxlIjoibXl1aS5qcyIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dGhyb3cgbmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKX12YXIgZj1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwoZi5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxmLGYuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pKHsxOltmdW5jdGlvbihyZXF1aXJlLG1vZHVsZSxleHBvcnRzKXtcblxuZnVuY3Rpb24gQWxlcnQoKSB7XG4gIHRoaXMubWVzc2FnZXMgPSBbXTtcbiAgdGhpcy50eXBlID0gJyc7XG59XG5cbkFsZXJ0LnByb3RvdHlwZS5jbG9zZSA9IGZ1bmN0aW9uICgpIHtcbiAgdGhpcy5tZXNzYWdlcyA9IFtdO1xufTtcblxuQWxlcnQucHJvdG90eXBlLnNldFR5cGUgPSBmdW5jdGlvbiAodHlwZSkge1xuICBpZiAodGhpcy50eXBlICE9PSB0eXBlKSB7XG4gICAgdGhpcy5tZXNzYWdlcyA9IFtdO1xuICB9XG4gIHRoaXMudHlwZSA9IHR5cGU7XG59O1xuXG5BbGVydC5wcm90b3R5cGUuYWRkTWVzc2FnZSA9IGZ1bmN0aW9uIChtZXNzYWdlLCBmYWRlLCBmYWRlRHVyYXRpb24sIG9uRmFkZSkge1xuICB2YXIgc2VsZiA9IHRoaXM7XG5cbiAgZmFkZUR1cmF0aW9uID0gZmFkZUR1cmF0aW9uIHx8IDEwMDAwO1xuXG4gIHNlbGYubWVzc2FnZXMucHVzaChtZXNzYWdlKTtcblxuICBpZiAoZmFkZSkge1xuICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgc2VsZi5tZXNzYWdlcy5zcGxpY2UoXy5maW5kSW5kZXgodGhpcy5tZXNzYWdlcywgZnVuY3Rpb24gKGV4aXN0aW5nTWVzc2FnZSkge1xuICAgICAgICByZXR1cm4gZXhpc3RpbmdNZXNzYWdlID09PSBtZXNzYWdlO1xuICAgICAgfSksIDEpO1xuICAgICAgaWYgKHR5cGVvZiBvbkZhZGUgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgb25GYWRlKCk7XG4gICAgICB9XG4gICAgfSwgZmFkZUR1cmF0aW9uKTtcbiAgfVxufTtcblxuQWxlcnQucHJvdG90eXBlLm1lc3NhZ2UgPSBmdW5jdGlvbiAobWVzc2FnZSwgZmFkZSwgZHVyYXRpb24sIG9uRmFkZSkge1xuICB0aGlzLnNldFR5cGUoJycpO1xuICB0aGlzLmFkZE1lc3NhZ2UobWVzc2FnZSwgZmFkZSwgZHVyYXRpb24sIG9uRmFkZSk7XG59O1xuXG5BbGVydC5wcm90b3R5cGUuaW5mbyA9IGZ1bmN0aW9uIChtZXNzYWdlLCBmYWRlLCBkdXJhdGlvbiwgb25GYWRlKSB7XG4gIHRoaXMuc2V0VHlwZSgnaW5mbycpO1xuICB0aGlzLmFkZE1lc3NhZ2UobWVzc2FnZSwgZmFkZSwgZHVyYXRpb24sIG9uRmFkZSk7XG59O1xuXG5BbGVydC5wcm90b3R5cGUuc3VjY2VzcyA9IGZ1bmN0aW9uIChtZXNzYWdlLCBmYWRlLCBkdXJhdGlvbiwgb25GYWRlKSB7XG4gIHRoaXMuc2V0VHlwZSgnc3VjY2VzcycpO1xuICB0aGlzLmFkZE1lc3NhZ2UobWVzc2FnZSwgZmFkZSwgZHVyYXRpb24sIG9uRmFkZSk7XG59O1xuXG5BbGVydC5wcm90b3R5cGUud2FybmluZyA9IGZ1bmN0aW9uIChtZXNzYWdlLCBmYWRlLCBkdXJhdGlvbiwgb25GYWRlKSB7XG4gIHRoaXMuc2V0VHlwZSgnd2FybmluZycpO1xuICB0aGlzLmFkZE1lc3NhZ2UobWVzc2FnZSwgZmFkZSwgZHVyYXRpb24sIG9uRmFkZSk7XG59O1xuXG5BbGVydC5wcm90b3R5cGUuZXJyb3IgPSBmdW5jdGlvbiAobWVzc2FnZSwgZmFkZSwgZHVyYXRpb24sIG9uRmFkZSkge1xuICB0aGlzLnNldFR5cGUoJ2FsZXJ0Jyk7XG4gIHRoaXMuYWRkTWVzc2FnZShtZXNzYWdlLCBmYWRlLCBkdXJhdGlvbiwgb25GYWRlKTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gQWxlcnQ7XG5cbn0se31dLDI6W2Z1bmN0aW9uKHJlcXVpcmUsbW9kdWxlLGV4cG9ydHMpe1xuXG52YXIgYWxlcnRDb21wb25lbnQgPSByZXF1aXJlKCcuL2FsZXJ0Q29tcG9uZW50LmpzJyk7XG5cblZ1ZS5jb21wb25lbnQoJ2FsZXJ0JywgYWxlcnRDb21wb25lbnQpO1xuXG59LHtcIi4vYWxlcnRDb21wb25lbnQuanNcIjozfV0sMzpbZnVuY3Rpb24ocmVxdWlyZSxtb2R1bGUsZXhwb3J0cyl7XG5cbnZhciBBbGVydCA9IHJlcXVpcmUoJy4vYWxlcnQuY2xhc3MuanMnKTtcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIHRlbXBsYXRlOiByZXF1aXJlKCcuL2FsZXJ0VGVtcGxhdGUuaHRtbCcpLFxuICBwcm9wczoge1xuICAgIGFsZXJ0OiB7XG4gICAgICB0eXBlOiBPYmplY3QsXG4gICAgICByZXF1aXJlZDogdHJ1ZSxcbiAgICAgIHR3b1dheTogdHJ1ZVxuICAgIH0sXG4gICAgY2FuQ2xvc2U6IHtcbiAgICAgIHR5cGU6IEJvb2xlYW4sXG4gICAgICBkZWZhdWx0c1RvOiBmYWxzZVxuICAgIH1cbiAgfSxcbiAgcmVhZHkoKSB7XG4gICAgdGhpcy5hbGVydCA9IG5ldyBBbGVydCgpO1xuICB9LFxuICBtZXRob2RzOiB7XG4gICAgY2xvc2UoKSB7XG4gICAgICB0aGlzLmFsZXJ0LmNsb3NlKCk7XG4gICAgfVxuICB9XG59O1xuXG59LHtcIi4vYWxlcnQuY2xhc3MuanNcIjoxLFwiLi9hbGVydFRlbXBsYXRlLmh0bWxcIjo0fV0sNDpbZnVuY3Rpb24ocmVxdWlyZSxtb2R1bGUsZXhwb3J0cyl7XG5tb2R1bGUuZXhwb3J0cyA9IFwiXFxuPGRpdiBjbGFzcz1cXFwiYWxlcnQtYm94XFxcIiB2LWJpbmQ6Y2xhc3M9XFxcIntcXG4gICAgc3VjY2VzczogYWxlcnQudHlwZSA9PT0gJ3N1Y2Nlc3MnLFxcbiAgICB3YXJuaW5nOiBhbGVydC50eXBlID09PSAnd2FybmluZycsXFxuICAgIGluZm86IGFsZXJ0LnR5cGUgPT09ICdpbmZvJyxcXG4gICAgYWxlcnQ6IGFsZXJ0LnR5cGUgPT09ICdhbGVydCcsXFxuICAgIHNlY29uZGFyeTogYWxlcnQudHlwZSA9PT0gJ3NlY29uZGFyeSdcXG4gIH1cXFwiIHRyYW5zaXRpb249XFxcImZhZGVcXFwiIHYtc2hvdz1cXFwiYWxlcnQubWVzc2FnZXMgJiYgYWxlcnQubWVzc2FnZXMubGVuZ3RoID4gMFxcXCI+XFxuICA8dWw+XFxuICAgIDxsaSB2LWZvcj1cXFwibWVzc2FnZSBpbiBhbGVydC5tZXNzYWdlc1xcXCIgdHJhY2stYnk9XFxcIiRpbmRleFxcXCI+e3sgbWVzc2FnZSB9fTwvbGk+XFxuICA8L3VsPlxcbiAgPGEgaHJlZj1cXFwiI1xcXCIgY2xhc3M9XFxcImNsb3NlXFxcIiB2LWlmPVxcXCJjYW5DbG9zZVxcXCIgdi1vbjpjbGljaz1cXFwiY2xvc2UoKVxcXCI+PGljb24gbmFtZT1cXFwibXVsdGlwbHlcXFwiPjwvaWNvbj48L2E+XFxuPC9kaXY+XFxuXCI7XG5cbn0se31dLDU6W2Z1bmN0aW9uKHJlcXVpcmUsbW9kdWxlLGV4cG9ydHMpe1xuXG52YXIgaWNvbkNvbXBvbmVudCA9IHJlcXVpcmUoJy4vaWNvbkNvbXBvbmVudC5qcycpO1xuXG5WdWUuY29tcG9uZW50KCdpY29uJywgaWNvbkNvbXBvbmVudCk7XG5cbn0se1wiLi9pY29uQ29tcG9uZW50LmpzXCI6Nn1dLDY6W2Z1bmN0aW9uKHJlcXVpcmUsbW9kdWxlLGV4cG9ydHMpe1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgdGVtcGxhdGU6IHJlcXVpcmUoJy4vaWNvblRlbXBsYXRlLmh0bWwnKSxcbiAgcHJvcHM6IFsnbmFtZSddXG59O1xuXG59LHtcIi4vaWNvblRlbXBsYXRlLmh0bWxcIjo3fV0sNzpbZnVuY3Rpb24ocmVxdWlyZSxtb2R1bGUsZXhwb3J0cyl7XG5tb2R1bGUuZXhwb3J0cyA9IFwiXFxuPHN2ZyBjbGFzcz1cXFwiaWNvbi1pbWFnZSB7eyBuYW1lIH19XFxcIj5cXG4gIDx1c2UgeG1sbnM6eGxpbms9XFxcImh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmtcXFwiIHhsaW5rOmhyZWY9XFxcIiNpY29uLXt7IG5hbWUgfX1cXFwiPjwvdXNlPlxcbjwvc3ZnPlxcblwiO1xuXG59LHt9XSw4OltmdW5jdGlvbihyZXF1aXJlLG1vZHVsZSxleHBvcnRzKXtcblxudmFyIGxvYWRlckNvbXBvbmVudCA9IHJlcXVpcmUoJy4vbG9hZGVyQ29tcG9uZW50LmpzJyk7XG5cblZ1ZS5jb21wb25lbnQoJ2xvYWRlcicsIGxvYWRlckNvbXBvbmVudCk7XG5cbn0se1wiLi9sb2FkZXJDb21wb25lbnQuanNcIjo5fV0sOTpbZnVuY3Rpb24ocmVxdWlyZSxtb2R1bGUsZXhwb3J0cyl7XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICB0ZW1wbGF0ZTogcmVxdWlyZSgnLi9sb2FkZXJUZW1wbGF0ZS5odG1sJyksXG4gIGRhdGEoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGdyZWV0aW5nOiAnbG9hZGVyIGNvbXBvbmVudCcsXG4gICAgfTtcbiAgfSxcbiAgbWV0aG9kczoge1xuICAgIHNheUhpKCkge1xuICAgICAgY29uc29sZS5sb2coJ2hpIScpO1xuICAgIH1cbiAgfVxufTtcblxufSx7XCIuL2xvYWRlclRlbXBsYXRlLmh0bWxcIjoxMH1dLDEwOltmdW5jdGlvbihyZXF1aXJlLG1vZHVsZSxleHBvcnRzKXtcbm1vZHVsZS5leHBvcnRzID0gXCI8ZGl2IGNsYXNzPVxcXCJsb2FkZXJcXFwiPkxvYWRpbmcuLi48L2Rpdj5cXG5cIjtcblxufSx7fV0sMTE6W2Z1bmN0aW9uKHJlcXVpcmUsbW9kdWxlLGV4cG9ydHMpe1xuXG52YXIgbW9kYWxDb21wb25lbnQgPSByZXF1aXJlKCcuL21vZGFsQ29tcG9uZW50LmpzJyk7XG5cblZ1ZS5jb21wb25lbnQoJ21vZGFsJywgbW9kYWxDb21wb25lbnQpO1xuXG59LHtcIi4vbW9kYWxDb21wb25lbnQuanNcIjoxMn1dLDEyOltmdW5jdGlvbihyZXF1aXJlLG1vZHVsZSxleHBvcnRzKXtcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIHRlbXBsYXRlOiByZXF1aXJlKCcuL21vZGFsVGVtcGxhdGUuaHRtbCcpLFxuICBwcm9wczoge1xuICAgIHNob3c6IHtcbiAgICAgIHR5cGU6IEJvb2xlYW4sXG4gICAgICByZXF1aXJlZDogdHJ1ZSxcbiAgICAgIHR3b1dheTogdHJ1ZVxuICAgIH0sXG4gICAgbW9kYWxTaXplOiB7XG4gICAgICB0eXBlOiBTdHJpbmcsXG4gICAgICBkZWZhdWx0c1RvOiAnZnVsbCdcbiAgICB9XG4gIH0sXG4gIGNvbXB1dGVkOiB7XG4gICAgaXNNZW51KCkge1xuICAgICAgcmV0dXJuIHRoaXMubW9kYWxTaXplID09PSAnbWVudSc7XG4gICAgfVxuICB9XG59O1xuXG59LHtcIi4vbW9kYWxUZW1wbGF0ZS5odG1sXCI6MTN9XSwxMzpbZnVuY3Rpb24ocmVxdWlyZSxtb2R1bGUsZXhwb3J0cyl7XG5tb2R1bGUuZXhwb3J0cyA9IFwiXFxuPGRpdiBjbGFzcz1cXFwibW9kYWxcXFwiIHRyYW5zaXRpb249XFxcInpvb20taW5cXFwiIHYtc2hvdz1cXFwic2hvd1xcXCIgdi1vbjpjbGljay5wcmV2ZW50PVxcXCJzaG93ID0gZmFsc2VcXFwiPlxcbiAgPGRpdiA6Y2xhc3M9XFxcInsgJ21vZGFsLWNvbnRlbnQnOiB0cnVlLCAnc21hbGwnOiBtb2RhbFNpemUgPT09ICdzbWFsbCcsICdmdWxsJzogbW9kYWxTaXplID09PSAnZnVsbCcgfVxcXCI+XFxuICAgIDxkaXYgY2xhc3M9XFxcIm1vZGFsLWhlYWRlclxcXCI+XFxuICAgICAgPHNsb3QgbmFtZT1cXFwiaGVhZGVyXFxcIj48L3Nsb3Q+XFxuICAgIDwvZGl2PlxcbiAgICA8c2xvdCBuYW1lPVxcXCJjb250ZW50XFxcIj48L3Nsb3Q+XFxuICAgIDxzcGFuIHYtb246Y2xpY2s9XFxcInNob3cgPSBmYWxzZVxcXCIgYXJpYS1sYWJlbD1cXFwiQ2xvc2VcXFwiPiYjMjE1Ozwvc3Bhbj5cXG4gIDwvZGl2PlxcbjwvZGl2PlxcblwiO1xuXG59LHt9XSwxNDpbZnVuY3Rpb24ocmVxdWlyZSxtb2R1bGUsZXhwb3J0cyl7XG5cbnZhciBwcm9tcHRDb21wb25lbnQgPSByZXF1aXJlKCcuL3Byb21wdENvbXBvbmVudCcpO1xuXG5WdWUuY29tcG9uZW50KCdwcm9tcHQnLCBwcm9tcHRDb21wb25lbnQpO1xuXG59LHtcIi4vcHJvbXB0Q29tcG9uZW50XCI6MTV9XSwxNTpbZnVuY3Rpb24ocmVxdWlyZSxtb2R1bGUsZXhwb3J0cyl7XG5cbnZhciBkZWZhdWx0TGFiZWxzID0ge1xuICBxdWVzdGlvbjogJycsXG4gIHllczogJ1N1Ym1pdCcsXG4gIG5vOiAnQ2FuY2VsJ1xufTtcblxuZnVuY3Rpb24gcHJvbXB0KHZtLCBvcHRpb25zLCBzaG93SW5wdXQpIHtcbiAgdmFyIHVud2F0Y2g7XG5cbiAgdm0ucXVlc3Rpb25MYWJlbCA9IG9wdGlvbnMucXVlc3Rpb247XG4gIHZtLnllc0xhYmVsID0gb3B0aW9ucy55ZXNMYWJlbCB8fCBkZWZhdWx0TGFiZWxzLnllcztcbiAgdm0ubm9MYWJlbCA9IG9wdGlvbnMubm9MYWJlbCB8fCBkZWZhdWx0TGFiZWxzLm5vO1xuICB2bS5jb25maXJtZWQgPSB1bmRlZmluZWQ7XG4gIHZtLnNob3dJbnB1dCA9IHNob3dJbnB1dDtcbiAgdm0uc2hvdyA9IHRydWU7XG5cbiAgdW53YXRjaCA9IHZtLiR3YXRjaCgnJGRhdGEuY29uZmlybWVkJywgZnVuY3Rpb24gKG5ld1ZhbCwgb2xkVmFsKSB7XG4gICAgaWYgKG5ld1ZhbCAmJiBfLmlzRnVuY3Rpb24ob3B0aW9ucy55ZXMpKSB7XG4gICAgICBvcHRpb25zLnllcygoc2hvd0lucHV0KSA/IHZtLnByb21wdFZhbHVlIDogbnVsbCk7XG4gICAgfSBlbHNlIGlmICghbmV3VmFsICYmIF8uaXNGdW5jdGlvbiAob3B0aW9ucy5ubykpIHtcbiAgICAgIG9wdGlvbnMubm8oKTtcbiAgICB9XG4gICAgdW53YXRjaCgpO1xuICAgIHZtLnNob3cgPSBmYWxzZTtcbiAgfSk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICB0ZW1wbGF0ZTogcmVxdWlyZSgnLi9wcm9tcHRUZW1wbGF0ZS5odG1sJyksXG4gIGRhdGEoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHByb21wdFZhbHVlOiAnJyxcbiAgICAgIHF1ZXN0aW9uTGFiZWw6IGRlZmF1bHRMYWJlbHMucXVlc3Rpb25MYWJlbCxcbiAgICAgIHllc0xhYmVsOiBkZWZhdWx0TGFiZWxzLnllc0xhYmVsLFxuICAgICAgbm9MYWJlbDogZGVmYXVsdExhYmVscy5ub0xhYmVsLFxuICAgICAgc2hvdzogZmFsc2UsXG4gICAgICBjb25maXJtZWQ6IGZhbHNlLFxuICAgICAgc2hvd0lucHV0OiBmYWxzZSxcbiAgICAgIGFzayhvcHRpb25zKSB7XG4gICAgICAgIHByb21wdCh0aGlzLCBvcHRpb25zLCB0cnVlKTtcbiAgICAgIH0sXG4gICAgICBjb25maXJtKG9wdGlvbnMpIHtcbiAgICAgICAgcHJvbXB0KHRoaXMsIG9wdGlvbnMsIGZhbHNlKTtcbiAgICAgIH1cbiAgICB9O1xuICB9LFxuICB3YXRjaDoge1xuICAgIHNob3codmFsKSB7XG4gICAgICBpZiAodmFsID09PSB0cnVlICYmIHRoaXMuJGNoaWxkcmVuLmxlbmd0aCA+IDApIHtcbiAgICAgICAgdGhpcy5wcm9tcHRWYWx1ZSA9ICcnO1xuICAgICAgICB0aGlzLiRjaGlsZHJlblswXS4kY2hpbGRyZW5bMF0uJGVscy5pbnB1dC5mb2N1cygpO1xuICAgICAgfVxuICAgIH1cbiAgfSxcbiAgbWV0aG9kczoge1xuICAgIHllcygpIHtcbiAgICAgIHRoaXMuY29uZmlybWVkID0gdHJ1ZTtcbiAgICB9LFxuICAgIG5vKCkge1xuICAgICAgdGhpcy5jb25maXJtZWQgPSBmYWxzZTtcbiAgICB9XG4gIH1cbn07XG5cbn0se1wiLi9wcm9tcHRUZW1wbGF0ZS5odG1sXCI6MTZ9XSwxNjpbZnVuY3Rpb24ocmVxdWlyZSxtb2R1bGUsZXhwb3J0cyl7XG5tb2R1bGUuZXhwb3J0cyA9IFwiXFxuXFxuPGRpdiBjbGFzcz1cXFwicHJvbXB0IHByb21wdC1tb2RhbFxcXCIgdHJhbnNpdGlvbj1cXFwiem9vbS1pblxcXCIgdi1zaG93PVxcXCJzaG93XFxcIj5cXG4gIDxkaXYgY2xhc3M9XFxcInByb21wdC1vdmVybGF5XFxcIiB2LW9uOmNsaWNrPVxcXCJubygpXFxcIj48L2Rpdj5cXG4gIDxkaXYgY2xhc3M9XFxcInByb21wdC1jb250ZW50XFxcIj5cXG4gICAgPHYtZm9ybSA6c3VibWl0LWNhbGxiYWNrPVxcXCJ5ZXNcXFwiIDphamF4PVxcXCJ0cnVlXFxcIj5cXG4gICAgICA8cCBjbGFzcz1cXFwidGV4dC1jZW50ZXJcXFwiPnt7IHF1ZXN0aW9uTGFiZWwgfX08L3A+XFxuICAgICAgPHYtaW5wdXQgdHlwZT1cXFwidGV4dFxcXCIgbGFiZWw9XFxcIlJlc3BvbnNlXFxcIiBuYW1lPVxcXCJwcm9tcHRSZXNwb25zZVxcXCIgOnZhbHVlLnN5bmM9XFxcInByb21wdFZhbHVlXFxcIiA6cmVxdWlyZWQ9XFxcInRydWVcXFwiPjwvdi1pbnB1dD5cXG4gICAgICA8ZGl2IGNsYXNzPVxcXCJjb250cm9sc1xcXCI+XFxuICAgICAgICA8YnV0dG9uIHR5cGU9XFxcImJ1dHRvblxcXCIgY2xhc3M9XFxcInRpbnlcXFwiIHR5cGU9XFxcImJ1dHRvblxcXCIgdi1vbjpjbGljaz1cXFwibm8oKVxcXCI+e3sgbm9MYWJlbCB9fTwvYnV0dG9uPlxcbiAgICAgICAgPGJ1dHRvbiB0eXBlPVxcXCJzdWJtaXRcXFwiIGNsYXNzPVxcXCJ0aW55XFxcIiB0eXBlPVxcXCJzdWJtaXRcXFwiPnt7IHllc0xhYmVsIH19PC9idXR0b24+XFxuICAgICAgPC9kaXY+XFxuICAgIDwvdi1mb3JtPlxcbiAgPC9kaXY+XFxuPC9kaXY+XFxuXCI7XG5cbn0se31dLDE3OltmdW5jdGlvbihyZXF1aXJlLG1vZHVsZSxleHBvcnRzKXtcblxudmFyIHRhYkNvbXBvbmVudCA9IHJlcXVpcmUoJy4vdGFiQ29tcG9uZW50LmpzJyk7XG5cblZ1ZS5jb21wb25lbnQoJ3RhYicsIHRhYkNvbXBvbmVudCk7XG5cbn0se1wiLi90YWJDb21wb25lbnQuanNcIjoxOH1dLDE4OltmdW5jdGlvbihyZXF1aXJlLG1vZHVsZSxleHBvcnRzKXtcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIHRlbXBsYXRlOiByZXF1aXJlKCcuL3RhYlRlbXBsYXRlLmh0bWwnKSxcbiAgcHJvcHM6IHtcbiAgICBoZWFkaW5nOiB7XG4gICAgICB0eXBlOiBTdHJpbmcsXG4gICAgICByZXF1aXJlZDogdHJ1ZVxuICAgIH0sXG4gICAgZGlzYWJsZWQ6IHtcbiAgICAgIHR5cGU6IEJvb2xlYW4sXG4gICAgICBkZWZhdWx0OiBmYWxzZVxuICAgIH0sXG4gICAgY2xpY2tDYWxsYmFjazoge1xuICAgICAgdHlwZTogRnVuY3Rpb25cbiAgICB9XG4gIH0sXG4gIGRhdGEoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGluZGV4OiAwLFxuICAgICAgc2hvdzogZmFsc2VcbiAgICB9O1xuICB9LFxuICBjb21wdXRlZDoge1xuICAgIHNob3coKSB7XG4gICAgICByZXR1cm4gKHRoaXMuJHBhcmVudC5hY3RpdmUgPT0gdGhpcy5pbmRleCk7XG4gICAgfVxuICB9LFxuICB3YXRjaDoge1xuICAgIGhlYWRpbmcoKSB7XG4gICAgICB0aGlzLiRwYXJlbnQudGFic1t0aGlzLmluZGV4XS5oZWFkaW5nID0gdGhpcy5oZWFkaW5nO1xuICAgIH1cbiAgfSxcbiAgY3JlYXRlZCgpIHtcbiAgICB0aGlzLiRwYXJlbnQudGFicy5wdXNoKHtcbiAgICAgIGhlYWRpbmc6IHRoaXMuaGVhZGluZyxcbiAgICAgIGRpc2FibGVkOiB0aGlzLmRpc2FibGVkLFxuICAgICAgYWN0aXZlOiBmYWxzZVxuICAgIH0pO1xuICB9LFxuICByZWFkeSgpIHtcbiAgICBmb3IgKHZhciBpbmRleCBpbiB0aGlzLiRwYXJlbnQuJGNoaWxkcmVuKSB7XG4gICAgICBpZiAodGhpcy4kcGFyZW50LiRjaGlsZHJlbltpbmRleF0uJGVsID09IHRoaXMuJGVsKSB7XG4gICAgICAgIHRoaXMuaW5kZXggPSBpbmRleDtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfVxuICB9LFxuICBldmVudHM6IHtcbiAgICBUQUJfQ09NUE9ORU5UX1RBQl9DTElDS0VEOiBmdW5jdGlvbiBUYWJDbGlja2VkKCkge1xuICAgICAgaWYgKHR5cGVvZiB0aGlzLmNsaWNrQ2FsbGJhY2sgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgdGhpcy5jbGlja0NhbGxiYWNrKCk7XG4gICAgICB9XG4gICAgfVxuICB9XG59O1xuXG59LHtcIi4vdGFiVGVtcGxhdGUuaHRtbFwiOjE5fV0sMTk6W2Z1bmN0aW9uKHJlcXVpcmUsbW9kdWxlLGV4cG9ydHMpe1xubW9kdWxlLmV4cG9ydHMgPSBcIjxkaXYgY2xhc3M9XFxcInRhYlxcXCIgdi1zaG93PVxcXCJzaG93XFxcIj5cXG4gIDxzbG90Pjwvc2xvdD5cXG48L2Rpdj5cXG5cIjtcblxufSx7fV0sMjA6W2Z1bmN0aW9uKHJlcXVpcmUsbW9kdWxlLGV4cG9ydHMpe1xuXG52YXIgdGFic0NvbXBvbmVudCA9IHJlcXVpcmUoJy4vdGFic0NvbXBvbmVudC5qcycpO1xuXG5yZXF1aXJlKCcuL3RhYi90YWIuanMnKTtcblxuVnVlLmNvbXBvbmVudCgndGFicycsIHRhYnNDb21wb25lbnQpO1xuXG59LHtcIi4vdGFiL3RhYi5qc1wiOjE3LFwiLi90YWJzQ29tcG9uZW50LmpzXCI6MjF9XSwyMTpbZnVuY3Rpb24ocmVxdWlyZSxtb2R1bGUsZXhwb3J0cyl7XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICB0ZW1wbGF0ZTogcmVxdWlyZSgnLi90YWJzVGVtcGxhdGUuaHRtbCcpLFxuICBwcm9wczoge1xuICAgIGFjdGl2ZToge1xuICAgICAgdHlwZTogTnVtYmVyLFxuICAgICAgZGVmYXVsdDogMFxuICAgIH1cbiAgfSxcbiAgZGF0YSgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgdGFiczogW11cbiAgICB9O1xuICB9LFxuICByZWFkeSgpIHtcbiAgICBpZiAodGhpcy50YWJzWzBdKSB7XG4gICAgICB0aGlzLnRhYnNbMF0uYWN0aXZlID0gdHJ1ZTtcbiAgICB9XG4gIH0sXG4gIG1ldGhvZHM6IHtcbiAgICBoYW5kbGVUYWJMaXN0Q2xpY2soaW5kZXgsIGVsKSB7XG4gICAgICBpZiAoIWVsLmRpc2FibGVkKSB0aGlzLmFjdGl2ZSA9IGluZGV4O1xuXG4gICAgICBmb3IgKHZhciBpID0gMCwgaiA9IHRoaXMudGFicy5sZW5ndGg7IGkgPCBqOyBpKyspIHtcbiAgICAgICAgdGhpcy50YWJzW2ldLmFjdGl2ZSA9IChpID09IGluZGV4KTtcbiAgICAgICAgaWYgKHRoaXMudGFic1tpXS5hY3RpdmUpIHtcbiAgICAgICAgICB0aGlzLiRjaGlsZHJlbltpXS4kZW1pdCgnVEFCX0NPTVBPTkVOVF9UQUJfQ0xJQ0tFRCcpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG59O1xuXG59LHtcIi4vdGFic1RlbXBsYXRlLmh0bWxcIjoyMn1dLDIyOltmdW5jdGlvbihyZXF1aXJlLG1vZHVsZSxleHBvcnRzKXtcbm1vZHVsZS5leHBvcnRzID0gXCJcXG5cXG48ZGl2IGNsYXNzPVxcXCJ0YWJzXFxcIj5cXG4gIDwhLS0gVGFicyBOYXYgLS0+XFxuICA8dWwgY2xhc3M9XFxcInRhYi1uYXZcXFwiPlxcbiAgICA8bGkgdi1mb3I9XFxcInRhYiBpbiB0YWJzXFxcIiB2LWJpbmQ6Y2xhc3M9XFxcInsgJ2FjdGl2ZSc6IHRhYi5hY3RpdmUgfVxcXCIgdi1vbjpjbGljay5wcmV2ZW50PVxcXCJoYW5kbGVUYWJMaXN0Q2xpY2soJGluZGV4LCB0YWIpXFxcIiA6ZGlzYWJsZWQ9XFxcInRhYi5kaXNhYmxlZFxcXCI+XFxuICAgICAge3sgdGFiLmhlYWRpbmcgfX1cXG4gICAgPC9saT5cXG4gIDwvdWw+XFxuXFxuICA8IS0tIFRhYiBQYW5lcyAtLT5cXG4gIDxkaXYgY2xhc3M9XFxcInRhYi1jb250ZW50XFxcIiB2LWVsOnRhYkNvbnRlbnQ+XFxuICAgICAgPHNsb3Q+PC9zbG90PlxcbiAgPC9kaXY+XFxuPC9kaXY+XFxuXCI7XG5cbn0se31dLDIzOltmdW5jdGlvbihyZXF1aXJlLG1vZHVsZSxleHBvcnRzKXtcblxudmFyIHZDaGVja2JveENvbXBvbmVudCA9IHJlcXVpcmUoJy4vdkNoZWNrYm94Q29tcG9uZW50LmpzJyk7XG5cblZ1ZS5jb21wb25lbnQoJ3ZDaGVja2JveCcsIHZDaGVja2JveENvbXBvbmVudCk7XG5cbn0se1wiLi92Q2hlY2tib3hDb21wb25lbnQuanNcIjoyNH1dLDI0OltmdW5jdGlvbihyZXF1aXJlLG1vZHVsZSxleHBvcnRzKXtcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIHRlbXBsYXRlOiByZXF1aXJlKCcuL3ZDaGVja2JveFRlbXBsYXRlLmh0bWwnKSxcbiAgZGF0YSgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgaWNvbjogJ3VuY2hlY2tlZCcsXG4gICAgICBpc0Vycm9yOiBmYWxzZVxuICAgIH07XG4gIH0sXG4gIHByb3BzOiB7XG4gICAgY2hlY2tlZDoge1xuICAgICAgdHlwZTogQm9vbGVhbixcbiAgICAgIHJlcXVpcmVkOiB0cnVlLFxuICAgICAgdHdvV2F5OiB0cnVlXG4gICAgfSxcbiAgICBsYWJlbDoge1xuICAgICAgdHlwZTogU3RyaW5nLFxuICAgICAgcmVxdWlyZWQ6IHRydWVcbiAgICB9LFxuICAgIHJlcXVpcmVkOiB7XG4gICAgICB0eXBlOiBCb29sZWFuLFxuICAgICAgZGVmYXVsdHNUbzogZmFsc2VcbiAgICB9XG4gIH0sXG4gIHdhdGNoOiB7XG4gICAgY2hlY2tlZCh2YWwpIHtcbiAgICAgIHRoaXMuaWNvbiA9ICh2YWwgPT09IHRydWUpID8gJ2NoZWNrZWQnIDogJ3VuY2hlY2tlZCc7XG4gICAgfVxuICB9LFxuICByZWFkeSgpIHtcbiAgICB0aGlzLmljb24gPSAodGhpcy5jaGVja2VkID09PSB0cnVlKSA/ICdjaGVja2VkJyA6ICd1bmNoZWNrZWQnO1xuICB9LFxuICBtZXRob2RzOiB7XG4gICAgdG9nZ2xlKCkge1xuICAgICAgdGhpcy5jaGVja2VkID0gIXRoaXMuY2hlY2tlZDtcbiAgICB9LFxuICAgIGlzVmFsaWQoKSB7XG4gICAgICB0aGlzLmlzRXJyb3IgPSAodGhpcy5yZXF1aXJlZCkgPyAhdGhpcy5jaGVja2VkIDogZmFsc2U7XG4gICAgICByZXR1cm4gIXRoaXMuaXNFcnJvcjtcbiAgICB9XG4gIH1cbn07XG5cbn0se1wiLi92Q2hlY2tib3hUZW1wbGF0ZS5odG1sXCI6MjV9XSwyNTpbZnVuY3Rpb24ocmVxdWlyZSxtb2R1bGUsZXhwb3J0cyl7XG5tb2R1bGUuZXhwb3J0cyA9IFwiXFxuPGRpdiA6Y2xhc3M9XFxcInsgJ2NoZWNrYm94JzogdHJ1ZSwgJ2Vycm9yJzogaXNFcnJvciB9XFxcIj5cXG4gIDxpY29uIHYtb246Y2xpY2s9XFxcInRvZ2dsZSgpXFxcIiA6bmFtZT1cXFwiaWNvblxcXCI+PC9pY29uPlxcbiAgPHNwYW4gdi1vbjpjbGljaz1cXFwidG9nZ2xlKClcXFwiPnt7IGxhYmVsIH19PC9zcGFuPlxcbjwvZGl2PlxcblwiO1xuXG59LHt9XSwyNjpbZnVuY3Rpb24ocmVxdWlyZSxtb2R1bGUsZXhwb3J0cyl7XG5cbnZhciB2Rm9ybUNvbXBvbmVudCA9IHJlcXVpcmUoJy4vdkZvcm1Db21wb25lbnQuanMnKTtcblxuVnVlLmNvbXBvbmVudCgndkZvcm0nLCB2Rm9ybUNvbXBvbmVudCk7XG5cbn0se1wiLi92Rm9ybUNvbXBvbmVudC5qc1wiOjI3fV0sMjc6W2Z1bmN0aW9uKHJlcXVpcmUsbW9kdWxlLGV4cG9ydHMpe1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgdGVtcGxhdGU6IHJlcXVpcmUoJy4vdkZvcm1UZW1wbGF0ZS5odG1sJyksXG4gIHByb3BzOiB7XG4gICAgbWV0aG9kOiB7XG4gICAgICB0eXBlOiBTdHJpbmcsXG4gICAgICBkZWZhdWx0c1RvOiAnUE9TVCdcbiAgICB9LFxuICAgIGFjdGlvbjoge1xuICAgICAgdHlwZTogU3RyaW5nLFxuICAgICAgZGVmYXVsdHNUbzogJydcbiAgICB9LFxuICAgIGFqYXg6IHtcbiAgICAgIHR5cGU6IEJvb2xlYW4sXG4gICAgICBkZWZhdWx0c1RvOiBmYWxzZVxuICAgIH0sXG4gICAgc3VibWl0Q2FsbGJhY2s6IHtcbiAgICAgIHR5cGU6IEZ1bmN0aW9uXG4gICAgfVxuICB9LFxuICBtZXRob2RzOiB7XG4gICAgc3VibWl0Rm9ybShldmVudCkge1xuICAgICAgaWYgKHRoaXMuYWpheCB8fCAhdGhpcy5pc1ZhbGlkKCkpIHtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgIH1cblxuICAgICAgaWYgKHRoaXMuYWpheCAmJiB0aGlzLmlzVmFsaWQoKSAmJiB0eXBlb2YgdGhpcy5zdWJtaXRDYWxsYmFjayA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICB0aGlzLnN1Ym1pdENhbGxiYWNrKCk7XG4gICAgICB9XG4gICAgfSxcbiAgICBpc1ZhbGlkKCkge1xuICAgICAgdmFyIHNlbGYgPSB0aGlzLFxuICAgICAgICBmb3JtSXNWYWxpZCA9IHRydWU7XG5cbiAgICAgIGZvciAodmFyIGkgPSAwLCBqID0gc2VsZi4kY2hpbGRyZW4ubGVuZ3RoOyBpIDwgajsgaSsrKSB7XG4gICAgICAgIGlmIChfLmlzRnVuY3Rpb24oc2VsZi4kY2hpbGRyZW5baV0uaXNWYWxpZCkpIHsgLy8gaGFzIGlucHV0IHZhbGlkYXRpb24gYXR0YWNoZWRcbiAgICAgICAgICBmb3JtSXNWYWxpZCA9IGZvcm1Jc1ZhbGlkICYmIHNlbGYuJGNoaWxkcmVuW2ldLmlzVmFsaWQoKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICByZXR1cm4gZm9ybUlzVmFsaWQ7XG4gICAgfVxuICB9XG59O1xuXG59LHtcIi4vdkZvcm1UZW1wbGF0ZS5odG1sXCI6Mjh9XSwyODpbZnVuY3Rpb24ocmVxdWlyZSxtb2R1bGUsZXhwb3J0cyl7XG5tb2R1bGUuZXhwb3J0cyA9IFwiXFxuPGZvcm0gdi1pZj1cXFwiYWpheFxcXCIgdi1lbDpmb3JtIHYtb246c3VibWl0LnByZXZlbnQ9XFxcInN1Ym1pdEZvcm1cXFwiIDptZXRob2Q9XFxcIm1ldGhvZFxcXCIgOmFjdGlvbj1cXFwiYWN0aW9uXFxcIiBub3ZhbGlkYXRlPlxcbiAgPHNsb3Q+PC9zbG90PlxcbjwvZm9ybT5cXG48Zm9ybSB2LWVsc2Ugdi1lbDpmb3JtIHYtb246c3VibWl0PVxcXCJzdWJtaXRGb3JtXFxcIiA6bWV0aG9kPVxcXCJtZXRob2RcXFwiIDphY3Rpb249XFxcImFjdGlvblxcXCIgbm92YWxpZGF0ZT5cXG4gIDxzbG90Pjwvc2xvdD5cXG48L2Zvcm0+XFxuXCI7XG5cbn0se31dLDI5OltmdW5jdGlvbihyZXF1aXJlLG1vZHVsZSxleHBvcnRzKXtcblxudmFyIHZJbnB1dENvbXBvbmVudCA9IHJlcXVpcmUoJy4vdklucHV0Q29tcG9uZW50LmpzJyk7XG5cblZ1ZS5jb21wb25lbnQoJ3ZJbnB1dCcsIHZJbnB1dENvbXBvbmVudCk7XG5cbn0se1wiLi92SW5wdXRDb21wb25lbnQuanNcIjozMH1dLDMwOltmdW5jdGlvbihyZXF1aXJlLG1vZHVsZSxleHBvcnRzKXtcblxudmFyIHZhbGlkYXRpb25SdWxlcyA9IHJlcXVpcmUoJy4vdmFsaWRhdGlvblJ1bGVzLmpzJyk7XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICB0ZW1wbGF0ZTogcmVxdWlyZSgnLi92SW5wdXRUZW1wbGF0ZS5odG1sJyksXG4gIHByb3BzOiB7XG4gICAgbGFiZWw6IHtcbiAgICAgIHR5cGU6IFN0cmluZ1xuICAgIH0sXG4gICAgbmFtZToge1xuICAgICAgdHlwZTogU3RyaW5nXG4gICAgfSxcbiAgICB0eXBlOiB7XG4gICAgICB0eXBlOiBTdHJpbmcsXG4gICAgICByZXF1aXJlZDogdHJ1ZVxuICAgIH0sXG4gICAgcGxhY2Vob2xkZXI6IHtcbiAgICAgIHR5cGU6IFN0cmluZ1xuICAgIH0sXG4gICAgaWNvbjoge1xuICAgICAgdHlwZTogU3RyaW5nXG4gICAgfSxcbiAgICB2YWx1ZToge1xuICAgICAgdHlwZTogU3RyaW5nLFxuICAgICAgcmVxdWlyZWQ6IHRydWUsXG4gICAgICB0d29XYXk6IHRydWVcbiAgICB9LFxuICAgIHJlcXVpcmVkOiB7XG4gICAgICB0eXBlOiBCb29sZWFuLFxuICAgICAgZGVmYXVsdHNUbzogZmFsc2VcbiAgICB9LFxuICAgIGVxdWFsVG86IHtcbiAgICAgIHR5cGU6IE9iamVjdCxcbiAgICAgIGRlZmF1bHRzVG86IG51bGxcbiAgICB9LFxuICAgIHNpbXBsZToge1xuICAgICAgdHlwZTogQm9vbGVhbixcbiAgICAgIGRlZmF1bHRzVG86IGZhbHNlXG4gICAgfVxuICB9LFxuICBkYXRhKCkge1xuICAgIHJldHVybiB7XG4gICAgICBlcnJvcjogJydcbiAgICB9O1xuICB9LFxuICBmaWx0ZXJzOiB7XG4gICAgaXNTaW1wbGUodmFsKSB7XG4gICAgICByZXR1cm4gKHRoaXMuc2ltcGxlKSA/ICcnIDogdmFsO1xuICAgIH1cbiAgfSxcbiAgbWV0aG9kczoge1xuICAgIGlzVmFsaWQoKSB7XG4gICAgICB0aGlzLnZhbGlkYXRlKCk7XG4gICAgICByZXR1cm4gKHRoaXMuZXJyb3IubGVuZ3RoID09PSAwKTtcbiAgICB9LFxuICAgIGRlYm91bmNlVmFsaWRhdGU6IF8uZGVib3VuY2UoZnVuY3Rpb24gKCkge1xuICAgICAgdGhpcy52YWxpZGF0ZSgpO1xuICAgIH0sIDUwMCksXG4gICAgdmFsaWRhdGUoKSB7XG4gICAgICB2YXIgbGFiZWwgPSB0aGlzLmxhYmVsIHx8IHRoaXMubmFtZTtcblxuICAgICAgLy8gcmVxdWlyZWQgdmFsaWRhdGlvblxuICAgICAgaWYgKHRoaXMucmVxdWlyZWQgJiYgdGhpcy52YWx1ZS5sZW5ndGggPT09IDApIHtcbiAgICAgICAgdGhpcy5lcnJvciA9IGxhYmVsICsgJyBpcyByZXF1aXJlZCc7XG5cbiAgICAgIC8vIGh0bWw1IGRhdGEgdHlwZSB2YWxpZGF0aW9uXG4gICAgICB9IGVsc2UgaWYgKHZhbGlkYXRpb25SdWxlcy5oYXNPd25Qcm9wZXJ0eSh0aGlzLnR5cGUpICYmICF2YWxpZGF0aW9uUnVsZXNbdGhpcy50eXBlXS5yZWdleC50ZXN0KHRoaXMudmFsdWUpKSB7XG4gICAgICAgIHRoaXMuZXJyb3IgPSB2YWxpZGF0aW9uUnVsZXNbdGhpcy50eXBlXS5kZWZhdWx0RXJyb3I7XG5cbiAgICAgIC8vIGVxdWl2YWxlbmN5IHZhbGlkYXRpb25cbiAgICAgIH0gZWxzZSBpZiAodGhpcy5lcXVhbFRvICYmIHRoaXMuZXF1YWxUby52YWx1ZSAhPT0gdGhpcy52YWx1ZSkge1xuICAgICAgICB0aGlzLmVycm9yID0gJ011c3QgbWF0Y2ggJyArIHRoaXMuZXF1YWxUby5sYWJlbDtcblxuICAgICAgLy8gaW5wdXQgaXMgdmFsaWRcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuZXJyb3IgPSAnJztcbiAgICAgIH1cbiAgICB9XG4gIH1cbn07XG5cbn0se1wiLi92SW5wdXRUZW1wbGF0ZS5odG1sXCI6MzEsXCIuL3ZhbGlkYXRpb25SdWxlcy5qc1wiOjMyfV0sMzE6W2Z1bmN0aW9uKHJlcXVpcmUsbW9kdWxlLGV4cG9ydHMpe1xubW9kdWxlLmV4cG9ydHMgPSBcIlxcbjxsYWJlbCBjbGFzcz1cXFwidi1pbnB1dFxcXCI+XFxuICB7eyBsYWJlbCB8IGlzU2ltcGxlIH19IDxzcGFuIHYtaWY9XFxcIiFyZXF1aXJlZCAmJiAhc2ltcGxlXFxcIiBjbGFzcz1cXFwicmlnaHRcXFwiPm9wdGlvbmFsPC9zcGFuPlxcbiAgPGRpdiBjbGFzcz1cXFwiaW5wdXQtd3JhcFxcXCI+XFxuICAgIDxpIGNsYXNzPVxcXCJmYSBmYS17eyBpY29uIH19XFxcIiB2LWlmPVxcXCJpY29uXFxcIj48L2k+XFxuICAgIDx0ZXh0YXJlYSB2LWlmPVxcXCJ0eXBlID09PSAndGV4dGFyZWEnXFxcIlxcbiAgICAgIHYtZWw6aW5wdXRcXG4gICAgICA6Y2xhc3M9XFxcInsgJ2Vycm9yJzogZXJyb3IubGVuZ3RoID4gMCB9XFxcIlxcbiAgICAgIG5hbWU9XFxcInt7IG5hbWUgfX1cXFwiXFxuICAgICAgcGxhY2Vob2xkZXI9XFxcInt7IHBsYWNlaG9sZGVyIH19XFxcIlxcbiAgICAgIHYtbW9kZWw9XFxcInZhbHVlXFxcIlxcbiAgICAgIHYtb246Ymx1cj1cXFwidmFsaWRhdGUoKVxcXCI+PC90ZXh0YXJlYT5cXG4gICAgPGlucHV0IHYtZWxzZVxcbiAgICAgIHYtZWw6aW5wdXRcXG4gICAgICA6Y2xhc3M9XFxcInsgJ2Vycm9yJzogZXJyb3IubGVuZ3RoID4gMCB9XFxcIlxcbiAgICAgIG5hbWU9XFxcInt7IG5hbWUgfX1cXFwiXFxuICAgICAgdHlwZT1cXFwie3sgdHlwZSB9fVxcXCJcXG4gICAgICBwbGFjZWhvbGRlcj1cXFwie3sgcGxhY2Vob2xkZXIgfX1cXFwiXFxuICAgICAgdi1tb2RlbD1cXFwidmFsdWVcXFwiXFxuICAgICAgdi1vbjpibHVyPVxcXCJ2YWxpZGF0ZSgpXFxcIiAvPlxcbiAgICA8c21hbGwgdi1pZj1cXFwiZXJyb3IubGVuZ3RoID4gMFxcXCIgdHJhbnNpdGlvbj1cXFwic2xpZGUtdXAteC1zbWFsbFxcXCIgY2xhc3M9XFxcImVycm9yXFxcIj57eyBlcnJvciB9fTwvc21hbGw+XFxuICA8L2Rpdj5cXG48L2xhYmVsPlxcblwiO1xuXG59LHt9XSwzMjpbZnVuY3Rpb24ocmVxdWlyZSxtb2R1bGUsZXhwb3J0cyl7XG5cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIGVtYWlsOiB7XG4gICAgcmVnZXg6IC9eKChbXjw+KClcXFtcXF1cXFxcLiw7Olxcc0BcIl0rKFxcLltePD4oKVxcW1xcXVxcXFwuLDs6XFxzQFwiXSspKil8KFwiLitcIikpQCgoXFxbWzAtOV17MSwzfVxcLlswLTldezEsM31cXC5bMC05XXsxLDN9XFwuWzAtOV17MSwzfV0pfCgoW2EtekEtWlxcLTAtOV0rXFwuKStbYS16QS1aXXsyLH0pKSQvLFxuICAgIGRlZmF1bHRFcnJvcjogJ1BsZWFzZSBlbnRlciBhIHZhbGlkIGVtYWlsIGFkZHJlc3MnXG4gIH0sXG4gIHVybDoge1xuICAgIHJlZ2V4OiAvaHR0cHM/OlxcL1xcLyh3d3dcXC4pP1stYS16QS1aMC05QDolLl9cXCt+Iz1dezIsMjU2fVxcLlthLXpdezIsNH1cXGIoWy1hLXpBLVowLTlAOiVfXFwrLn4jPyYvLz1dKikvLFxuICAgIGRlZmF1bHRFcnJvcjogJ1BsZWFzZSBlbnRlciBhIHZhbGlkIFVSTCdcbiAgfSxcbiAgbnVtYmVyOiB7XG4gICAgcmVnZXg6IC9bLS4wLTldKy8sXG4gICAgZGVmYXVsdEVycm9yOiAnUGxlYXNlIGVudGVyIGEgdmFsaWQgbnVtYmVyJ1xuICB9XG59O1xuXG59LHt9XSwzMzpbZnVuY3Rpb24ocmVxdWlyZSxtb2R1bGUsZXhwb3J0cyl7XG5cbnZhciB2U2VsZWN0Q29tcG9uZW50ID0gcmVxdWlyZSgnLi92U2VsZWN0Q29tcG9uZW50LmpzJyk7XG5cblZ1ZS5jb21wb25lbnQoJ3ZTZWxlY3QnLCB2U2VsZWN0Q29tcG9uZW50KTtcblxufSx7XCIuL3ZTZWxlY3RDb21wb25lbnQuanNcIjozNH1dLDM0OltmdW5jdGlvbihyZXF1aXJlLG1vZHVsZSxleHBvcnRzKXtcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIHRlbXBsYXRlOiByZXF1aXJlKCcuL3ZTZWxlY3RUZW1wbGF0ZS5odG1sJyksXG4gIHByb3BzOiB7XG4gICAgbGFiZWw6IHtcbiAgICAgIHR5cGU6IFN0cmluZyxcbiAgICAgIGRlZmF1bHRzVG86ICcnXG4gICAgfSxcbiAgICBzZWxlY3RlZDoge1xuICAgICAgdHlwZTogU3RyaW5nLFxuICAgICAgcmVxdWlyZWQ6IHRydWUsXG4gICAgICB0d29XYXk6IHRydWVcbiAgICB9LFxuICAgIG9wdGlvbnM6IHtcbiAgICAgIHR5cGU6IEFycmF5LFxuICAgICAgcmVxdWlyZWQ6IHRydWVcbiAgICB9LFxuICAgIHJlcXVpcmVkOiB7XG4gICAgICB0eXBlOiBCb29sZWFuLFxuICAgICAgZGVmYXVsdHNUbzogZmFsc2VcbiAgICB9XG4gIH0sXG4gIGRhdGEoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGlzRXJyb3I6IGZhbHNlXG4gICAgfTtcbiAgfSxcbiAgcmVhZHkoKSB7XG4gICAgdmFyIHNlbGYgPSB0aGlzLFxuICAgICAgc2VsZWN0ZWRJbmRleCA9IF8uZmluZEluZGV4KHNlbGYub3B0aW9ucywgKG9wdGlvbikgPT4gb3B0aW9uLnZhbHVlID09PSBzZWxmLnNlbGVjdGVkKTtcblxuICAgIGlmIChzZWxmLnJlcXVpcmVkICYmIHNlbGVjdGVkSW5kZXggPT09IC0xKSB7XG4gICAgICBzZWxmLnNlbGVjdGVkID0gc2VsZi5vcHRpb25zWzBdLnZhbHVlO1xuICAgIH1cbiAgfSxcbiAgbWV0aG9kczoge1xuICAgIGlzVmFsaWQoKSB7XG4gICAgICB0aGlzLmlzRXJyb3IgPSAhdGhpcy5yZXF1aXJlZCB8fCB0aGlzLnNlbGVjdGVkLmxlbmd0aCA+IDA7XG4gICAgICByZXR1cm4gdGhpcy5pc0Vycm9yO1xuICAgIH1cbiAgfVxufTtcblxufSx7XCIuL3ZTZWxlY3RUZW1wbGF0ZS5odG1sXCI6MzV9XSwzNTpbZnVuY3Rpb24ocmVxdWlyZSxtb2R1bGUsZXhwb3J0cyl7XG5tb2R1bGUuZXhwb3J0cyA9IFwiXFxuPGxhYmVsIGNsYXNzPVxcXCJ2LXNlbGVjdFxcXCI+XFxuICB7eyBsYWJlbCB9fVxcbiAgPHNlbGVjdCB2LW1vZGVsPVxcXCJzZWxlY3RlZFxcXCIgOmNsYXNzPVxcXCJ7ICdlcnJvcic6IGlzRXJyb3IgfVxcXCI+XFxuICAgIDxvcHRpb24gdi1pZj1cXFwiIXJlcXVpcmVkXFxcIiB2YWx1ZT1cXFwiXFxcIj48L29wdGlvbj5cXG4gICAgPG9wdGlvbiB2LWZvcj1cXFwib3B0aW9uIGluIG9wdGlvbnNcXFwiIDp2YWx1ZT1cXFwib3B0aW9uLnZhbHVlXFxcIj57eyBvcHRpb24ubGFiZWwgfX08L29wdGlvbj5cXG4gIDwvc2VsZWN0PlxcbjwvbGFiZWw+XFxuXCI7XG5cbn0se31dLDM2OltmdW5jdGlvbihyZXF1aXJlLG1vZHVsZSxleHBvcnRzKXtcblxucmVxdWlyZSgnLi9jb21wb25lbnRzL2FsZXJ0L2FsZXJ0LmpzJyk7XG5yZXF1aXJlKCcuL2NvbXBvbmVudHMvaWNvbi9pY29uLmpzJyk7XG5yZXF1aXJlKCcuL2NvbXBvbmVudHMvbW9kYWwvbW9kYWwuanMnKTtcbnJlcXVpcmUoJy4vY29tcG9uZW50cy9wcm9tcHQvcHJvbXB0LmpzJyk7XG5yZXF1aXJlKCcuL2NvbXBvbmVudHMvbG9hZGVyL2xvYWRlci5qcycpO1xucmVxdWlyZSgnLi9jb21wb25lbnRzL3RhYnMvdGFicy5qcycpO1xucmVxdWlyZSgnLi9jb21wb25lbnRzL3ZGb3JtL3ZGb3JtLmpzJyk7XG5yZXF1aXJlKCcuL2NvbXBvbmVudHMvdklucHV0L3ZJbnB1dC5qcycpO1xucmVxdWlyZSgnLi9jb21wb25lbnRzL3ZTZWxlY3QvdlNlbGVjdC5qcycpO1xucmVxdWlyZSgnLi9jb21wb25lbnRzL3ZDaGVja2JveC92Q2hlY2tib3guanMnKTtcblxufSx7XCIuL2NvbXBvbmVudHMvYWxlcnQvYWxlcnQuanNcIjoyLFwiLi9jb21wb25lbnRzL2ljb24vaWNvbi5qc1wiOjUsXCIuL2NvbXBvbmVudHMvbG9hZGVyL2xvYWRlci5qc1wiOjgsXCIuL2NvbXBvbmVudHMvbW9kYWwvbW9kYWwuanNcIjoxMSxcIi4vY29tcG9uZW50cy9wcm9tcHQvcHJvbXB0LmpzXCI6MTQsXCIuL2NvbXBvbmVudHMvdGFicy90YWJzLmpzXCI6MjAsXCIuL2NvbXBvbmVudHMvdkNoZWNrYm94L3ZDaGVja2JveC5qc1wiOjIzLFwiLi9jb21wb25lbnRzL3ZGb3JtL3ZGb3JtLmpzXCI6MjYsXCIuL2NvbXBvbmVudHMvdklucHV0L3ZJbnB1dC5qc1wiOjI5LFwiLi9jb21wb25lbnRzL3ZTZWxlY3QvdlNlbGVjdC5qc1wiOjMzfV19LHt9LFszNl0pIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
