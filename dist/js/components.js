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
    module.exports = "\n<div class=\"modal\" transition=\"zoom-in\" v-show=\"show\" v-on:click.prevent=\"show = false\">\n  <div class=\"{ 'modal-content': true, 'small': modalSize === 'small', 'full': modalSize === 'full' }\">\n    <div class=\"modal-header\">\n      <slot name=\"header\"></slot>\n    </div>\n    <slot name=\"content\"></slot>\n    <span v-on:click=\"show = false\" aria-label=\"Close\">&#215;</span>\n  </div>\n</div>\n";
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
    module.exports = "\n\n<div class=\"tabs\">\n    <!-- Tabs Nav -->\n    <ul class=\"tab-nav\">\n        <li v-for=\"tab in tabs\" v-bind:class=\"{ 'active': tab.active }\" v-on:click.prevent=\"handleTabListClick($index, tab)\" :disabled=\"tab.disabled\">\n            <a href=\"#\">{{ tab.heading }}</a>\n        </li>\n    </ul>\n\n    <!-- Tab Panes -->\n    <div class=\"tab-content\" v-el:tabContent>\n        <slot></slot>\n    </div>\n</div>\n";
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
//# sourceMappingURL=data:application/json;base64,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Z0MsRUFBbEssRUFBcUssNkJBQTRCLEVBQWpNLEVBQW9NLHVDQUFzQyxFQUExTyxFQUE2TywrQkFBOEIsRUFBM1EsRUFBOFEsaUNBQWdDLEVBQTlTLEVBQWlULG1DQUFrQyxFQUFuVixFQWJPLENBcG5CZ1osRUFBelosRUFpb0IyVixFQWpvQjNWLEVBaW9COFYsQ0FBQyxFQUFELENBam9COVYiLCJmaWxlIjoiY29tcG9uZW50cy5qcyIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dGhyb3cgbmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKX12YXIgZj1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwoZi5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxmLGYuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pKHsxOltmdW5jdGlvbihyZXF1aXJlLG1vZHVsZSxleHBvcnRzKXtcblxuZnVuY3Rpb24gQWxlcnQoKSB7XG4gIHRoaXMubWVzc2FnZXMgPSBbXTtcbiAgdGhpcy50eXBlID0gJyc7XG59XG5cbkFsZXJ0LnByb3RvdHlwZS5jbG9zZSA9IGZ1bmN0aW9uICgpIHtcbiAgdGhpcy5tZXNzYWdlcyA9IFtdO1xufTtcblxuQWxlcnQucHJvdG90eXBlLnNldFR5cGUgPSBmdW5jdGlvbiAodHlwZSkge1xuICBpZiAodGhpcy50eXBlICE9PSB0eXBlKSB7XG4gICAgdGhpcy5tZXNzYWdlcyA9IFtdO1xuICB9XG4gIHRoaXMudHlwZSA9IHR5cGU7XG59O1xuXG5BbGVydC5wcm90b3R5cGUuYWRkTWVzc2FnZSA9IGZ1bmN0aW9uIChtZXNzYWdlLCBmYWRlLCBmYWRlRHVyYXRpb24sIG9uRmFkZSkge1xuICB2YXIgc2VsZiA9IHRoaXM7XG5cbiAgZmFkZUR1cmF0aW9uID0gZmFkZUR1cmF0aW9uIHx8IDEwMDAwO1xuXG4gIHNlbGYubWVzc2FnZXMucHVzaChtZXNzYWdlKTtcblxuICBpZiAoZmFkZSkge1xuICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgc2VsZi5tZXNzYWdlcy5zcGxpY2UoXy5maW5kSW5kZXgodGhpcy5tZXNzYWdlcywgZnVuY3Rpb24gKGV4aXN0aW5nTWVzc2FnZSkge1xuICAgICAgICByZXR1cm4gZXhpc3RpbmdNZXNzYWdlID09PSBtZXNzYWdlO1xuICAgICAgfSksIDEpO1xuICAgICAgaWYgKHR5cGVvZiBvbkZhZGUgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgb25GYWRlKCk7XG4gICAgICB9XG4gICAgfSwgZmFkZUR1cmF0aW9uKTtcbiAgfVxufTtcblxuQWxlcnQucHJvdG90eXBlLm1lc3NhZ2UgPSBmdW5jdGlvbiAobWVzc2FnZSwgZmFkZSwgZHVyYXRpb24sIG9uRmFkZSkge1xuICB0aGlzLnNldFR5cGUoJycpO1xuICB0aGlzLmFkZE1lc3NhZ2UobWVzc2FnZSwgZmFkZSwgZHVyYXRpb24sIG9uRmFkZSk7XG59O1xuXG5BbGVydC5wcm90b3R5cGUuaW5mbyA9IGZ1bmN0aW9uIChtZXNzYWdlLCBmYWRlLCBkdXJhdGlvbiwgb25GYWRlKSB7XG4gIHRoaXMuc2V0VHlwZSgnaW5mbycpO1xuICB0aGlzLmFkZE1lc3NhZ2UobWVzc2FnZSwgZmFkZSwgZHVyYXRpb24sIG9uRmFkZSk7XG59O1xuXG5BbGVydC5wcm90b3R5cGUuc3VjY2VzcyA9IGZ1bmN0aW9uIChtZXNzYWdlLCBmYWRlLCBkdXJhdGlvbiwgb25GYWRlKSB7XG4gIHRoaXMuc2V0VHlwZSgnc3VjY2VzcycpO1xuICB0aGlzLmFkZE1lc3NhZ2UobWVzc2FnZSwgZmFkZSwgZHVyYXRpb24sIG9uRmFkZSk7XG59O1xuXG5BbGVydC5wcm90b3R5cGUud2FybmluZyA9IGZ1bmN0aW9uIChtZXNzYWdlLCBmYWRlLCBkdXJhdGlvbiwgb25GYWRlKSB7XG4gIHRoaXMuc2V0VHlwZSgnd2FybmluZycpO1xuICB0aGlzLmFkZE1lc3NhZ2UobWVzc2FnZSwgZmFkZSwgZHVyYXRpb24sIG9uRmFkZSk7XG59O1xuXG5BbGVydC5wcm90b3R5cGUuZXJyb3IgPSBmdW5jdGlvbiAobWVzc2FnZSwgZmFkZSwgZHVyYXRpb24sIG9uRmFkZSkge1xuICB0aGlzLnNldFR5cGUoJ2FsZXJ0Jyk7XG4gIHRoaXMuYWRkTWVzc2FnZShtZXNzYWdlLCBmYWRlLCBkdXJhdGlvbiwgb25GYWRlKTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gQWxlcnQ7XG5cbn0se31dLDI6W2Z1bmN0aW9uKHJlcXVpcmUsbW9kdWxlLGV4cG9ydHMpe1xuXG52YXIgYWxlcnRDb21wb25lbnQgPSByZXF1aXJlKCcuL2FsZXJ0Q29tcG9uZW50LmpzJyk7XG5cblZ1ZS5jb21wb25lbnQoJ2FsZXJ0JywgYWxlcnRDb21wb25lbnQpO1xuXG59LHtcIi4vYWxlcnRDb21wb25lbnQuanNcIjozfV0sMzpbZnVuY3Rpb24ocmVxdWlyZSxtb2R1bGUsZXhwb3J0cyl7XG5cbnZhciBBbGVydCA9IHJlcXVpcmUoJy4vYWxlcnQuY2xhc3MuanMnKTtcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIHRlbXBsYXRlOiByZXF1aXJlKCcuL2FsZXJ0VGVtcGxhdGUuaHRtbCcpLFxuICBwcm9wczoge1xuICAgIGFsZXJ0OiB7XG4gICAgICB0eXBlOiBPYmplY3QsXG4gICAgICByZXF1aXJlZDogdHJ1ZSxcbiAgICAgIHR3b1dheTogdHJ1ZVxuICAgIH0sXG4gICAgY2FuQ2xvc2U6IHtcbiAgICAgIHR5cGU6IEJvb2xlYW4sXG4gICAgICBkZWZhdWx0c1RvOiBmYWxzZVxuICAgIH1cbiAgfSxcbiAgcmVhZHkoKSB7XG4gICAgdGhpcy5hbGVydCA9IG5ldyBBbGVydCgpO1xuICB9LFxuICBtZXRob2RzOiB7XG4gICAgY2xvc2UoKSB7XG4gICAgICB0aGlzLmFsZXJ0LmNsb3NlKCk7XG4gICAgfVxuICB9XG59O1xuXG59LHtcIi4vYWxlcnQuY2xhc3MuanNcIjoxLFwiLi9hbGVydFRlbXBsYXRlLmh0bWxcIjo0fV0sNDpbZnVuY3Rpb24ocmVxdWlyZSxtb2R1bGUsZXhwb3J0cyl7XG5tb2R1bGUuZXhwb3J0cyA9IFwiXFxuPGRpdiBjbGFzcz1cXFwiYWxlcnQtYm94XFxcIiB2LWJpbmQ6Y2xhc3M9XFxcIntcXG4gICAgc3VjY2VzczogYWxlcnQudHlwZSA9PT0gJ3N1Y2Nlc3MnLFxcbiAgICB3YXJuaW5nOiBhbGVydC50eXBlID09PSAnd2FybmluZycsXFxuICAgIGluZm86IGFsZXJ0LnR5cGUgPT09ICdpbmZvJyxcXG4gICAgYWxlcnQ6IGFsZXJ0LnR5cGUgPT09ICdhbGVydCcsXFxuICAgIHNlY29uZGFyeTogYWxlcnQudHlwZSA9PT0gJ3NlY29uZGFyeSdcXG4gIH1cXFwiIHRyYW5zaXRpb249XFxcImZhZGVcXFwiIHYtc2hvdz1cXFwiYWxlcnQubWVzc2FnZXMgJiYgYWxlcnQubWVzc2FnZXMubGVuZ3RoID4gMFxcXCI+XFxuICA8dWw+XFxuICAgIDxsaSB2LWZvcj1cXFwibWVzc2FnZSBpbiBhbGVydC5tZXNzYWdlc1xcXCIgdHJhY2stYnk9XFxcIiRpbmRleFxcXCI+e3sgbWVzc2FnZSB9fTwvbGk+XFxuICA8L3VsPlxcbiAgPGEgaHJlZj1cXFwiI1xcXCIgY2xhc3M9XFxcImNsb3NlXFxcIiB2LWlmPVxcXCJjYW5DbG9zZVxcXCIgdi1vbjpjbGljaz1cXFwiY2xvc2UoKVxcXCI+PGljb24gbmFtZT1cXFwibXVsdGlwbHlcXFwiPjwvaWNvbj48L2E+XFxuPC9kaXY+XFxuXCI7XG5cbn0se31dLDU6W2Z1bmN0aW9uKHJlcXVpcmUsbW9kdWxlLGV4cG9ydHMpe1xuXG52YXIgaWNvbkNvbXBvbmVudCA9IHJlcXVpcmUoJy4vaWNvbkNvbXBvbmVudC5qcycpO1xuXG5WdWUuY29tcG9uZW50KCdpY29uJywgaWNvbkNvbXBvbmVudCk7XG5cbn0se1wiLi9pY29uQ29tcG9uZW50LmpzXCI6Nn1dLDY6W2Z1bmN0aW9uKHJlcXVpcmUsbW9kdWxlLGV4cG9ydHMpe1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgdGVtcGxhdGU6IHJlcXVpcmUoJy4vaWNvblRlbXBsYXRlLmh0bWwnKSxcbiAgcHJvcHM6IFsnbmFtZSddXG59O1xuXG59LHtcIi4vaWNvblRlbXBsYXRlLmh0bWxcIjo3fV0sNzpbZnVuY3Rpb24ocmVxdWlyZSxtb2R1bGUsZXhwb3J0cyl7XG5tb2R1bGUuZXhwb3J0cyA9IFwiXFxuPHN2ZyBjbGFzcz1cXFwiaWNvbi1pbWFnZSB7eyBuYW1lIH19XFxcIj5cXG4gIDx1c2UgeG1sbnM6eGxpbms9XFxcImh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmtcXFwiIHhsaW5rOmhyZWY9XFxcIiNpY29uLXt7IG5hbWUgfX1cXFwiPjwvdXNlPlxcbjwvc3ZnPlxcblwiO1xuXG59LHt9XSw4OltmdW5jdGlvbihyZXF1aXJlLG1vZHVsZSxleHBvcnRzKXtcblxudmFyIGxvYWRlckNvbXBvbmVudCA9IHJlcXVpcmUoJy4vbG9hZGVyQ29tcG9uZW50LmpzJyk7XG5cblZ1ZS5jb21wb25lbnQoJ2xvYWRlcicsIGxvYWRlckNvbXBvbmVudCk7XG5cbn0se1wiLi9sb2FkZXJDb21wb25lbnQuanNcIjo5fV0sOTpbZnVuY3Rpb24ocmVxdWlyZSxtb2R1bGUsZXhwb3J0cyl7XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICB0ZW1wbGF0ZTogcmVxdWlyZSgnLi9sb2FkZXJUZW1wbGF0ZS5odG1sJyksXG4gIGRhdGEoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGdyZWV0aW5nOiAnbG9hZGVyIGNvbXBvbmVudCcsXG4gICAgfTtcbiAgfSxcbiAgbWV0aG9kczoge1xuICAgIHNheUhpKCkge1xuICAgICAgY29uc29sZS5sb2coJ2hpIScpO1xuICAgIH1cbiAgfVxufTtcblxufSx7XCIuL2xvYWRlclRlbXBsYXRlLmh0bWxcIjoxMH1dLDEwOltmdW5jdGlvbihyZXF1aXJlLG1vZHVsZSxleHBvcnRzKXtcbm1vZHVsZS5leHBvcnRzID0gXCI8ZGl2IGNsYXNzPVxcXCJsb2FkZXJcXFwiPkxvYWRpbmcuLi48L2Rpdj5cXG5cIjtcblxufSx7fV0sMTE6W2Z1bmN0aW9uKHJlcXVpcmUsbW9kdWxlLGV4cG9ydHMpe1xuXG52YXIgbW9kYWxDb21wb25lbnQgPSByZXF1aXJlKCcuL21vZGFsQ29tcG9uZW50LmpzJyk7XG5cblZ1ZS5jb21wb25lbnQoJ21vZGFsJywgbW9kYWxDb21wb25lbnQpO1xuXG59LHtcIi4vbW9kYWxDb21wb25lbnQuanNcIjoxMn1dLDEyOltmdW5jdGlvbihyZXF1aXJlLG1vZHVsZSxleHBvcnRzKXtcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIHRlbXBsYXRlOiByZXF1aXJlKCcuL21vZGFsVGVtcGxhdGUuaHRtbCcpLFxuICBwcm9wczoge1xuICAgIHNob3c6IHtcbiAgICAgIHR5cGU6IEJvb2xlYW4sXG4gICAgICByZXF1aXJlZDogdHJ1ZSxcbiAgICAgIHR3b1dheTogdHJ1ZVxuICAgIH0sXG4gICAgbW9kYWxTaXplOiB7XG4gICAgICB0eXBlOiBTdHJpbmcsXG4gICAgICBkZWZhdWx0c1RvOiAnZnVsbCdcbiAgICB9XG4gIH0sXG4gIGNvbXB1dGVkOiB7XG4gICAgaXNNZW51KCkge1xuICAgICAgcmV0dXJuIHRoaXMubW9kYWxTaXplID09PSAnbWVudSc7XG4gICAgfVxuICB9XG59O1xuXG59LHtcIi4vbW9kYWxUZW1wbGF0ZS5odG1sXCI6MTN9XSwxMzpbZnVuY3Rpb24ocmVxdWlyZSxtb2R1bGUsZXhwb3J0cyl7XG5tb2R1bGUuZXhwb3J0cyA9IFwiXFxuPGRpdiBjbGFzcz1cXFwibW9kYWxcXFwiIHRyYW5zaXRpb249XFxcInpvb20taW5cXFwiIHYtc2hvdz1cXFwic2hvd1xcXCIgdi1vbjpjbGljay5wcmV2ZW50PVxcXCJzaG93ID0gZmFsc2VcXFwiPlxcbiAgPGRpdiBjbGFzcz1cXFwieyAnbW9kYWwtY29udGVudCc6IHRydWUsICdzbWFsbCc6IG1vZGFsU2l6ZSA9PT0gJ3NtYWxsJywgJ2Z1bGwnOiBtb2RhbFNpemUgPT09ICdmdWxsJyB9XFxcIj5cXG4gICAgPGRpdiBjbGFzcz1cXFwibW9kYWwtaGVhZGVyXFxcIj5cXG4gICAgICA8c2xvdCBuYW1lPVxcXCJoZWFkZXJcXFwiPjwvc2xvdD5cXG4gICAgPC9kaXY+XFxuICAgIDxzbG90IG5hbWU9XFxcImNvbnRlbnRcXFwiPjwvc2xvdD5cXG4gICAgPHNwYW4gdi1vbjpjbGljaz1cXFwic2hvdyA9IGZhbHNlXFxcIiBhcmlhLWxhYmVsPVxcXCJDbG9zZVxcXCI+JiMyMTU7PC9zcGFuPlxcbiAgPC9kaXY+XFxuPC9kaXY+XFxuXCI7XG5cbn0se31dLDE0OltmdW5jdGlvbihyZXF1aXJlLG1vZHVsZSxleHBvcnRzKXtcblxudmFyIHByb21wdENvbXBvbmVudCA9IHJlcXVpcmUoJy4vcHJvbXB0Q29tcG9uZW50Jyk7XG5cblZ1ZS5jb21wb25lbnQoJ3Byb21wdCcsIHByb21wdENvbXBvbmVudCk7XG5cbn0se1wiLi9wcm9tcHRDb21wb25lbnRcIjoxNX1dLDE1OltmdW5jdGlvbihyZXF1aXJlLG1vZHVsZSxleHBvcnRzKXtcblxudmFyIGRlZmF1bHRMYWJlbHMgPSB7XG4gIHF1ZXN0aW9uOiAnJyxcbiAgeWVzOiAnU3VibWl0JyxcbiAgbm86ICdDYW5jZWwnXG59O1xuXG5mdW5jdGlvbiBwcm9tcHQodm0sIG9wdGlvbnMsIHNob3dJbnB1dCkge1xuICB2YXIgdW53YXRjaDtcblxuICB2bS5xdWVzdGlvbkxhYmVsID0gb3B0aW9ucy5xdWVzdGlvbjtcbiAgdm0ueWVzTGFiZWwgPSBvcHRpb25zLnllc0xhYmVsIHx8IGRlZmF1bHRMYWJlbHMueWVzO1xuICB2bS5ub0xhYmVsID0gb3B0aW9ucy5ub0xhYmVsIHx8IGRlZmF1bHRMYWJlbHMubm87XG4gIHZtLmNvbmZpcm1lZCA9IHVuZGVmaW5lZDtcbiAgdm0uc2hvd0lucHV0ID0gc2hvd0lucHV0O1xuICB2bS5zaG93ID0gdHJ1ZTtcblxuICB1bndhdGNoID0gdm0uJHdhdGNoKCckZGF0YS5jb25maXJtZWQnLCBmdW5jdGlvbiAobmV3VmFsLCBvbGRWYWwpIHtcbiAgICBpZiAobmV3VmFsICYmIF8uaXNGdW5jdGlvbihvcHRpb25zLnllcykpIHtcbiAgICAgIG9wdGlvbnMueWVzKChzaG93SW5wdXQpID8gdm0ucHJvbXB0VmFsdWUgOiBudWxsKTtcbiAgICB9IGVsc2UgaWYgKCFuZXdWYWwgJiYgXy5pc0Z1bmN0aW9uIChvcHRpb25zLm5vKSkge1xuICAgICAgb3B0aW9ucy5ubygpO1xuICAgIH1cbiAgICB1bndhdGNoKCk7XG4gICAgdm0uc2hvdyA9IGZhbHNlO1xuICB9KTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIHRlbXBsYXRlOiByZXF1aXJlKCcuL3Byb21wdFRlbXBsYXRlLmh0bWwnKSxcbiAgZGF0YSgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgcHJvbXB0VmFsdWU6ICcnLFxuICAgICAgcXVlc3Rpb25MYWJlbDogZGVmYXVsdExhYmVscy5xdWVzdGlvbkxhYmVsLFxuICAgICAgeWVzTGFiZWw6IGRlZmF1bHRMYWJlbHMueWVzTGFiZWwsXG4gICAgICBub0xhYmVsOiBkZWZhdWx0TGFiZWxzLm5vTGFiZWwsXG4gICAgICBzaG93OiBmYWxzZSxcbiAgICAgIGNvbmZpcm1lZDogZmFsc2UsXG4gICAgICBzaG93SW5wdXQ6IGZhbHNlLFxuICAgICAgYXNrKG9wdGlvbnMpIHtcbiAgICAgICAgcHJvbXB0KHRoaXMsIG9wdGlvbnMsIHRydWUpO1xuICAgICAgfSxcbiAgICAgIGNvbmZpcm0ob3B0aW9ucykge1xuICAgICAgICBwcm9tcHQodGhpcywgb3B0aW9ucywgZmFsc2UpO1xuICAgICAgfVxuICAgIH07XG4gIH0sXG4gIHdhdGNoOiB7XG4gICAgc2hvdyh2YWwpIHtcbiAgICAgIGlmICh2YWwgPT09IHRydWUgJiYgdGhpcy4kY2hpbGRyZW4ubGVuZ3RoID4gMCkge1xuICAgICAgICB0aGlzLnByb21wdFZhbHVlID0gJyc7XG4gICAgICAgIHRoaXMuJGNoaWxkcmVuWzBdLiRjaGlsZHJlblswXS4kZWxzLmlucHV0LmZvY3VzKCk7XG4gICAgICB9XG4gICAgfVxuICB9LFxuICBtZXRob2RzOiB7XG4gICAgeWVzKCkge1xuICAgICAgdGhpcy5jb25maXJtZWQgPSB0cnVlO1xuICAgIH0sXG4gICAgbm8oKSB7XG4gICAgICB0aGlzLmNvbmZpcm1lZCA9IGZhbHNlO1xuICAgIH1cbiAgfVxufTtcblxufSx7XCIuL3Byb21wdFRlbXBsYXRlLmh0bWxcIjoxNn1dLDE2OltmdW5jdGlvbihyZXF1aXJlLG1vZHVsZSxleHBvcnRzKXtcbm1vZHVsZS5leHBvcnRzID0gXCJcXG5cXG48ZGl2IGNsYXNzPVxcXCJwcm9tcHQgcHJvbXB0LW1vZGFsXFxcIiB0cmFuc2l0aW9uPVxcXCJ6b29tLWluXFxcIiB2LXNob3c9XFxcInNob3dcXFwiPlxcbiAgPGRpdiBjbGFzcz1cXFwicHJvbXB0LW92ZXJsYXlcXFwiIHYtb246Y2xpY2s9XFxcIm5vKClcXFwiPjwvZGl2PlxcbiAgPGRpdiBjbGFzcz1cXFwicHJvbXB0LWNvbnRlbnRcXFwiPlxcbiAgICA8di1mb3JtIDpzdWJtaXQtY2FsbGJhY2s9XFxcInllc1xcXCIgOmFqYXg9XFxcInRydWVcXFwiPlxcbiAgICAgIDxwIGNsYXNzPVxcXCJ0ZXh0LWNlbnRlclxcXCI+e3sgcXVlc3Rpb25MYWJlbCB9fTwvcD5cXG4gICAgICA8di1pbnB1dCB0eXBlPVxcXCJ0ZXh0XFxcIiBsYWJlbD1cXFwiUmVzcG9uc2VcXFwiIG5hbWU9XFxcInByb21wdFJlc3BvbnNlXFxcIiA6dmFsdWUuc3luYz1cXFwicHJvbXB0VmFsdWVcXFwiIDpyZXF1aXJlZD1cXFwidHJ1ZVxcXCI+PC92LWlucHV0PlxcbiAgICAgIDxkaXYgY2xhc3M9XFxcImNvbnRyb2xzXFxcIj5cXG4gICAgICAgIDxidXR0b24gdHlwZT1cXFwiYnV0dG9uXFxcIiBjbGFzcz1cXFwidGlueVxcXCIgdHlwZT1cXFwiYnV0dG9uXFxcIiB2LW9uOmNsaWNrPVxcXCJubygpXFxcIj57eyBub0xhYmVsIH19PC9idXR0b24+XFxuICAgICAgICA8YnV0dG9uIHR5cGU9XFxcInN1Ym1pdFxcXCIgY2xhc3M9XFxcInRpbnlcXFwiIHR5cGU9XFxcInN1Ym1pdFxcXCI+e3sgeWVzTGFiZWwgfX08L2J1dHRvbj5cXG4gICAgICA8L2Rpdj5cXG4gICAgPC92LWZvcm0+XFxuICA8L2Rpdj5cXG48L2Rpdj5cXG5cIjtcblxufSx7fV0sMTc6W2Z1bmN0aW9uKHJlcXVpcmUsbW9kdWxlLGV4cG9ydHMpe1xuXG52YXIgdGFiQ29tcG9uZW50ID0gcmVxdWlyZSgnLi90YWJDb21wb25lbnQuanMnKTtcblxuVnVlLmNvbXBvbmVudCgndGFiJywgdGFiQ29tcG9uZW50KTtcblxufSx7XCIuL3RhYkNvbXBvbmVudC5qc1wiOjE4fV0sMTg6W2Z1bmN0aW9uKHJlcXVpcmUsbW9kdWxlLGV4cG9ydHMpe1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgdGVtcGxhdGU6IHJlcXVpcmUoJy4vdGFiVGVtcGxhdGUuaHRtbCcpLFxuICBwcm9wczoge1xuICAgIGhlYWRpbmc6IHtcbiAgICAgIHR5cGU6IFN0cmluZyxcbiAgICAgIHJlcXVpcmVkOiB0cnVlXG4gICAgfSxcbiAgICBkaXNhYmxlZDoge1xuICAgICAgdHlwZTogQm9vbGVhbixcbiAgICAgIGRlZmF1bHQ6IGZhbHNlXG4gICAgfSxcbiAgICBjbGlja0NhbGxiYWNrOiB7XG4gICAgICB0eXBlOiBGdW5jdGlvblxuICAgIH1cbiAgfSxcbiAgZGF0YSgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgaW5kZXg6IDAsXG4gICAgICBzaG93OiBmYWxzZVxuICAgIH07XG4gIH0sXG4gIGNvbXB1dGVkOiB7XG4gICAgc2hvdygpIHtcbiAgICAgIHJldHVybiAodGhpcy4kcGFyZW50LmFjdGl2ZSA9PSB0aGlzLmluZGV4KTtcbiAgICB9XG4gIH0sXG4gIHdhdGNoOiB7XG4gICAgaGVhZGluZygpIHtcbiAgICAgIHRoaXMuJHBhcmVudC50YWJzW3RoaXMuaW5kZXhdLmhlYWRpbmcgPSB0aGlzLmhlYWRpbmc7XG4gICAgfVxuICB9LFxuICBjcmVhdGVkKCkge1xuICAgIHRoaXMuJHBhcmVudC50YWJzLnB1c2goe1xuICAgICAgaGVhZGluZzogdGhpcy5oZWFkaW5nLFxuICAgICAgZGlzYWJsZWQ6IHRoaXMuZGlzYWJsZWQsXG4gICAgICBhY3RpdmU6IGZhbHNlXG4gICAgfSk7XG4gIH0sXG4gIHJlYWR5KCkge1xuICAgIGZvciAodmFyIGluZGV4IGluIHRoaXMuJHBhcmVudC4kY2hpbGRyZW4pIHtcbiAgICAgIGlmICh0aGlzLiRwYXJlbnQuJGNoaWxkcmVuW2luZGV4XS4kZWwgPT0gdGhpcy4kZWwpIHtcbiAgICAgICAgdGhpcy5pbmRleCA9IGluZGV4O1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9XG4gIH0sXG4gIGV2ZW50czoge1xuICAgIFRBQl9DT01QT05FTlRfVEFCX0NMSUNLRUQ6IGZ1bmN0aW9uIFRhYkNsaWNrZWQoKSB7XG4gICAgICBpZiAodHlwZW9mIHRoaXMuY2xpY2tDYWxsYmFjayA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICB0aGlzLmNsaWNrQ2FsbGJhY2soKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbn07XG5cbn0se1wiLi90YWJUZW1wbGF0ZS5odG1sXCI6MTl9XSwxOTpbZnVuY3Rpb24ocmVxdWlyZSxtb2R1bGUsZXhwb3J0cyl7XG5tb2R1bGUuZXhwb3J0cyA9IFwiPGRpdiBjbGFzcz1cXFwidGFiXFxcIiB2LXNob3c9XFxcInNob3dcXFwiPlxcbiAgPHNsb3Q+PC9zbG90PlxcbjwvZGl2PlxcblwiO1xuXG59LHt9XSwyMDpbZnVuY3Rpb24ocmVxdWlyZSxtb2R1bGUsZXhwb3J0cyl7XG5cbnZhciB0YWJzQ29tcG9uZW50ID0gcmVxdWlyZSgnLi90YWJzQ29tcG9uZW50LmpzJyk7XG5cbnJlcXVpcmUoJy4vdGFiL3RhYi5qcycpO1xuXG5WdWUuY29tcG9uZW50KCd0YWJzJywgdGFic0NvbXBvbmVudCk7XG5cbn0se1wiLi90YWIvdGFiLmpzXCI6MTcsXCIuL3RhYnNDb21wb25lbnQuanNcIjoyMX1dLDIxOltmdW5jdGlvbihyZXF1aXJlLG1vZHVsZSxleHBvcnRzKXtcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIHRlbXBsYXRlOiByZXF1aXJlKCcuL3RhYnNUZW1wbGF0ZS5odG1sJyksXG4gIHByb3BzOiB7XG4gICAgYWN0aXZlOiB7XG4gICAgICB0eXBlOiBOdW1iZXIsXG4gICAgICBkZWZhdWx0OiAwXG4gICAgfVxuICB9LFxuICBkYXRhKCkge1xuICAgIHJldHVybiB7XG4gICAgICB0YWJzOiBbXVxuICAgIH07XG4gIH0sXG4gIHJlYWR5KCkge1xuICAgIGlmICh0aGlzLnRhYnNbMF0pIHtcbiAgICAgIHRoaXMudGFic1swXS5hY3RpdmUgPSB0cnVlO1xuICAgIH1cbiAgfSxcbiAgbWV0aG9kczoge1xuICAgIGhhbmRsZVRhYkxpc3RDbGljayhpbmRleCwgZWwpIHtcbiAgICAgIGlmICghZWwuZGlzYWJsZWQpIHRoaXMuYWN0aXZlID0gaW5kZXg7XG5cbiAgICAgIGZvciAodmFyIGkgPSAwLCBqID0gdGhpcy50YWJzLmxlbmd0aDsgaSA8IGo7IGkrKykge1xuICAgICAgICB0aGlzLnRhYnNbaV0uYWN0aXZlID0gKGkgPT0gaW5kZXgpO1xuICAgICAgICBpZiAodGhpcy50YWJzW2ldLmFjdGl2ZSkge1xuICAgICAgICAgIHRoaXMuJGNoaWxkcmVuW2ldLiRlbWl0KCdUQUJfQ09NUE9ORU5UX1RBQl9DTElDS0VEJyk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cbn07XG5cbn0se1wiLi90YWJzVGVtcGxhdGUuaHRtbFwiOjIyfV0sMjI6W2Z1bmN0aW9uKHJlcXVpcmUsbW9kdWxlLGV4cG9ydHMpe1xubW9kdWxlLmV4cG9ydHMgPSBcIlxcblxcbjxkaXYgY2xhc3M9XFxcInRhYnNcXFwiPlxcbiAgICA8IS0tIFRhYnMgTmF2IC0tPlxcbiAgICA8dWwgY2xhc3M9XFxcInRhYi1uYXZcXFwiPlxcbiAgICAgICAgPGxpIHYtZm9yPVxcXCJ0YWIgaW4gdGFic1xcXCIgdi1iaW5kOmNsYXNzPVxcXCJ7ICdhY3RpdmUnOiB0YWIuYWN0aXZlIH1cXFwiIHYtb246Y2xpY2sucHJldmVudD1cXFwiaGFuZGxlVGFiTGlzdENsaWNrKCRpbmRleCwgdGFiKVxcXCIgOmRpc2FibGVkPVxcXCJ0YWIuZGlzYWJsZWRcXFwiPlxcbiAgICAgICAgICAgIDxhIGhyZWY9XFxcIiNcXFwiPnt7IHRhYi5oZWFkaW5nIH19PC9hPlxcbiAgICAgICAgPC9saT5cXG4gICAgPC91bD5cXG5cXG4gICAgPCEtLSBUYWIgUGFuZXMgLS0+XFxuICAgIDxkaXYgY2xhc3M9XFxcInRhYi1jb250ZW50XFxcIiB2LWVsOnRhYkNvbnRlbnQ+XFxuICAgICAgICA8c2xvdD48L3Nsb3Q+XFxuICAgIDwvZGl2PlxcbjwvZGl2PlxcblwiO1xuXG59LHt9XSwyMzpbZnVuY3Rpb24ocmVxdWlyZSxtb2R1bGUsZXhwb3J0cyl7XG5cbnZhciB2Q2hlY2tib3hDb21wb25lbnQgPSByZXF1aXJlKCcuL3ZDaGVja2JveENvbXBvbmVudC5qcycpO1xuXG5WdWUuY29tcG9uZW50KCd2Q2hlY2tib3gnLCB2Q2hlY2tib3hDb21wb25lbnQpO1xuXG59LHtcIi4vdkNoZWNrYm94Q29tcG9uZW50LmpzXCI6MjR9XSwyNDpbZnVuY3Rpb24ocmVxdWlyZSxtb2R1bGUsZXhwb3J0cyl7XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICB0ZW1wbGF0ZTogcmVxdWlyZSgnLi92Q2hlY2tib3hUZW1wbGF0ZS5odG1sJyksXG4gIGRhdGEoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGljb246ICd1bmNoZWNrZWQnLFxuICAgICAgaXNFcnJvcjogZmFsc2VcbiAgICB9O1xuICB9LFxuICBwcm9wczoge1xuICAgIGNoZWNrZWQ6IHtcbiAgICAgIHR5cGU6IEJvb2xlYW4sXG4gICAgICByZXF1aXJlZDogdHJ1ZSxcbiAgICAgIHR3b1dheTogdHJ1ZVxuICAgIH0sXG4gICAgbGFiZWw6IHtcbiAgICAgIHR5cGU6IFN0cmluZyxcbiAgICAgIHJlcXVpcmVkOiB0cnVlXG4gICAgfSxcbiAgICByZXF1aXJlZDoge1xuICAgICAgdHlwZTogQm9vbGVhbixcbiAgICAgIGRlZmF1bHRzVG86IGZhbHNlXG4gICAgfVxuICB9LFxuICB3YXRjaDoge1xuICAgIGNoZWNrZWQodmFsKSB7XG4gICAgICB0aGlzLmljb24gPSAodmFsID09PSB0cnVlKSA/ICdjaGVja2VkJyA6ICd1bmNoZWNrZWQnO1xuICAgIH1cbiAgfSxcbiAgcmVhZHkoKSB7XG4gICAgdGhpcy5pY29uID0gKHRoaXMuY2hlY2tlZCA9PT0gdHJ1ZSkgPyAnY2hlY2tlZCcgOiAndW5jaGVja2VkJztcbiAgfSxcbiAgbWV0aG9kczoge1xuICAgIHRvZ2dsZSgpIHtcbiAgICAgIHRoaXMuY2hlY2tlZCA9ICF0aGlzLmNoZWNrZWQ7XG4gICAgfSxcbiAgICBpc1ZhbGlkKCkge1xuICAgICAgdGhpcy5pc0Vycm9yID0gKHRoaXMucmVxdWlyZWQpID8gIXRoaXMuY2hlY2tlZCA6IGZhbHNlO1xuICAgICAgcmV0dXJuICF0aGlzLmlzRXJyb3I7XG4gICAgfVxuICB9XG59O1xuXG59LHtcIi4vdkNoZWNrYm94VGVtcGxhdGUuaHRtbFwiOjI1fV0sMjU6W2Z1bmN0aW9uKHJlcXVpcmUsbW9kdWxlLGV4cG9ydHMpe1xubW9kdWxlLmV4cG9ydHMgPSBcIlxcbjxkaXYgOmNsYXNzPVxcXCJ7ICdjaGVja2JveCc6IHRydWUsICdlcnJvcic6IGlzRXJyb3IgfVxcXCI+XFxuICA8aWNvbiB2LW9uOmNsaWNrPVxcXCJ0b2dnbGUoKVxcXCIgOm5hbWU9XFxcImljb25cXFwiPjwvaWNvbj5cXG4gIDxzcGFuIHYtb246Y2xpY2s9XFxcInRvZ2dsZSgpXFxcIj57eyBsYWJlbCB9fTwvc3Bhbj5cXG48L2Rpdj5cXG5cIjtcblxufSx7fV0sMjY6W2Z1bmN0aW9uKHJlcXVpcmUsbW9kdWxlLGV4cG9ydHMpe1xuXG52YXIgdkZvcm1Db21wb25lbnQgPSByZXF1aXJlKCcuL3ZGb3JtQ29tcG9uZW50LmpzJyk7XG5cblZ1ZS5jb21wb25lbnQoJ3ZGb3JtJywgdkZvcm1Db21wb25lbnQpO1xuXG59LHtcIi4vdkZvcm1Db21wb25lbnQuanNcIjoyN31dLDI3OltmdW5jdGlvbihyZXF1aXJlLG1vZHVsZSxleHBvcnRzKXtcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIHRlbXBsYXRlOiByZXF1aXJlKCcuL3ZGb3JtVGVtcGxhdGUuaHRtbCcpLFxuICBwcm9wczoge1xuICAgIG1ldGhvZDoge1xuICAgICAgdHlwZTogU3RyaW5nLFxuICAgICAgZGVmYXVsdHNUbzogJ1BPU1QnXG4gICAgfSxcbiAgICBhY3Rpb246IHtcbiAgICAgIHR5cGU6IFN0cmluZyxcbiAgICAgIGRlZmF1bHRzVG86ICcnXG4gICAgfSxcbiAgICBhamF4OiB7XG4gICAgICB0eXBlOiBCb29sZWFuLFxuICAgICAgZGVmYXVsdHNUbzogZmFsc2VcbiAgICB9LFxuICAgIHN1Ym1pdENhbGxiYWNrOiB7XG4gICAgICB0eXBlOiBGdW5jdGlvblxuICAgIH1cbiAgfSxcbiAgbWV0aG9kczoge1xuICAgIHN1Ym1pdEZvcm0oZXZlbnQpIHtcbiAgICAgIGlmICh0aGlzLmFqYXggfHwgIXRoaXMuaXNWYWxpZCgpKSB7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICB9XG5cbiAgICAgIGlmICh0aGlzLmFqYXggJiYgdGhpcy5pc1ZhbGlkKCkgJiYgdHlwZW9mIHRoaXMuc3VibWl0Q2FsbGJhY2sgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgdGhpcy5zdWJtaXRDYWxsYmFjaygpO1xuICAgICAgfVxuICAgIH0sXG4gICAgaXNWYWxpZCgpIHtcbiAgICAgIHZhciBzZWxmID0gdGhpcyxcbiAgICAgICAgZm9ybUlzVmFsaWQgPSB0cnVlO1xuXG4gICAgICBmb3IgKHZhciBpID0gMCwgaiA9IHNlbGYuJGNoaWxkcmVuLmxlbmd0aDsgaSA8IGo7IGkrKykge1xuICAgICAgICBpZiAoXy5pc0Z1bmN0aW9uKHNlbGYuJGNoaWxkcmVuW2ldLmlzVmFsaWQpKSB7IC8vIGhhcyBpbnB1dCB2YWxpZGF0aW9uIGF0dGFjaGVkXG4gICAgICAgICAgZm9ybUlzVmFsaWQgPSBmb3JtSXNWYWxpZCAmJiBzZWxmLiRjaGlsZHJlbltpXS5pc1ZhbGlkKCk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGZvcm1Jc1ZhbGlkO1xuICAgIH1cbiAgfVxufTtcblxufSx7XCIuL3ZGb3JtVGVtcGxhdGUuaHRtbFwiOjI4fV0sMjg6W2Z1bmN0aW9uKHJlcXVpcmUsbW9kdWxlLGV4cG9ydHMpe1xubW9kdWxlLmV4cG9ydHMgPSBcIlxcbjxmb3JtIHYtaWY9XFxcImFqYXhcXFwiIHYtZWw6Zm9ybSB2LW9uOnN1Ym1pdC5wcmV2ZW50PVxcXCJzdWJtaXRGb3JtXFxcIiA6bWV0aG9kPVxcXCJtZXRob2RcXFwiIDphY3Rpb249XFxcImFjdGlvblxcXCIgbm92YWxpZGF0ZT5cXG4gIDxzbG90Pjwvc2xvdD5cXG48L2Zvcm0+XFxuPGZvcm0gdi1lbHNlIHYtZWw6Zm9ybSB2LW9uOnN1Ym1pdD1cXFwic3VibWl0Rm9ybVxcXCIgOm1ldGhvZD1cXFwibWV0aG9kXFxcIiA6YWN0aW9uPVxcXCJhY3Rpb25cXFwiIG5vdmFsaWRhdGU+XFxuICA8c2xvdD48L3Nsb3Q+XFxuPC9mb3JtPlxcblwiO1xuXG59LHt9XSwyOTpbZnVuY3Rpb24ocmVxdWlyZSxtb2R1bGUsZXhwb3J0cyl7XG5cbnZhciB2SW5wdXRDb21wb25lbnQgPSByZXF1aXJlKCcuL3ZJbnB1dENvbXBvbmVudC5qcycpO1xuXG5WdWUuY29tcG9uZW50KCd2SW5wdXQnLCB2SW5wdXRDb21wb25lbnQpO1xuXG59LHtcIi4vdklucHV0Q29tcG9uZW50LmpzXCI6MzB9XSwzMDpbZnVuY3Rpb24ocmVxdWlyZSxtb2R1bGUsZXhwb3J0cyl7XG5cbnZhciB2YWxpZGF0aW9uUnVsZXMgPSByZXF1aXJlKCcuL3ZhbGlkYXRpb25SdWxlcy5qcycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgdGVtcGxhdGU6IHJlcXVpcmUoJy4vdklucHV0VGVtcGxhdGUuaHRtbCcpLFxuICBwcm9wczoge1xuICAgIGxhYmVsOiB7XG4gICAgICB0eXBlOiBTdHJpbmdcbiAgICB9LFxuICAgIG5hbWU6IHtcbiAgICAgIHR5cGU6IFN0cmluZ1xuICAgIH0sXG4gICAgdHlwZToge1xuICAgICAgdHlwZTogU3RyaW5nLFxuICAgICAgcmVxdWlyZWQ6IHRydWVcbiAgICB9LFxuICAgIHBsYWNlaG9sZGVyOiB7XG4gICAgICB0eXBlOiBTdHJpbmdcbiAgICB9LFxuICAgIGljb246IHtcbiAgICAgIHR5cGU6IFN0cmluZ1xuICAgIH0sXG4gICAgdmFsdWU6IHtcbiAgICAgIHR5cGU6IFN0cmluZyxcbiAgICAgIHJlcXVpcmVkOiB0cnVlLFxuICAgICAgdHdvV2F5OiB0cnVlXG4gICAgfSxcbiAgICByZXF1aXJlZDoge1xuICAgICAgdHlwZTogQm9vbGVhbixcbiAgICAgIGRlZmF1bHRzVG86IGZhbHNlXG4gICAgfSxcbiAgICBlcXVhbFRvOiB7XG4gICAgICB0eXBlOiBPYmplY3QsXG4gICAgICBkZWZhdWx0c1RvOiBudWxsXG4gICAgfSxcbiAgICBzaW1wbGU6IHtcbiAgICAgIHR5cGU6IEJvb2xlYW4sXG4gICAgICBkZWZhdWx0c1RvOiBmYWxzZVxuICAgIH1cbiAgfSxcbiAgZGF0YSgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgZXJyb3I6ICcnXG4gICAgfTtcbiAgfSxcbiAgZmlsdGVyczoge1xuICAgIGlzU2ltcGxlKHZhbCkge1xuICAgICAgcmV0dXJuICh0aGlzLnNpbXBsZSkgPyAnJyA6IHZhbDtcbiAgICB9XG4gIH0sXG4gIG1ldGhvZHM6IHtcbiAgICBpc1ZhbGlkKCkge1xuICAgICAgdGhpcy52YWxpZGF0ZSgpO1xuICAgICAgcmV0dXJuICh0aGlzLmVycm9yLmxlbmd0aCA9PT0gMCk7XG4gICAgfSxcbiAgICBkZWJvdW5jZVZhbGlkYXRlOiBfLmRlYm91bmNlKGZ1bmN0aW9uICgpIHtcbiAgICAgIHRoaXMudmFsaWRhdGUoKTtcbiAgICB9LCA1MDApLFxuICAgIHZhbGlkYXRlKCkge1xuICAgICAgdmFyIGxhYmVsID0gdGhpcy5sYWJlbCB8fCB0aGlzLm5hbWU7XG5cbiAgICAgIC8vIHJlcXVpcmVkIHZhbGlkYXRpb25cbiAgICAgIGlmICh0aGlzLnJlcXVpcmVkICYmIHRoaXMudmFsdWUubGVuZ3RoID09PSAwKSB7XG4gICAgICAgIHRoaXMuZXJyb3IgPSBsYWJlbCArICcgaXMgcmVxdWlyZWQnO1xuXG4gICAgICAvLyBodG1sNSBkYXRhIHR5cGUgdmFsaWRhdGlvblxuICAgICAgfSBlbHNlIGlmICh2YWxpZGF0aW9uUnVsZXMuaGFzT3duUHJvcGVydHkodGhpcy50eXBlKSAmJiAhdmFsaWRhdGlvblJ1bGVzW3RoaXMudHlwZV0ucmVnZXgudGVzdCh0aGlzLnZhbHVlKSkge1xuICAgICAgICB0aGlzLmVycm9yID0gdmFsaWRhdGlvblJ1bGVzW3RoaXMudHlwZV0uZGVmYXVsdEVycm9yO1xuXG4gICAgICAvLyBlcXVpdmFsZW5jeSB2YWxpZGF0aW9uXG4gICAgICB9IGVsc2UgaWYgKHRoaXMuZXF1YWxUbyAmJiB0aGlzLmVxdWFsVG8udmFsdWUgIT09IHRoaXMudmFsdWUpIHtcbiAgICAgICAgdGhpcy5lcnJvciA9ICdNdXN0IG1hdGNoICcgKyB0aGlzLmVxdWFsVG8ubGFiZWw7XG5cbiAgICAgIC8vIGlucHV0IGlzIHZhbGlkXG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLmVycm9yID0gJyc7XG4gICAgICB9XG4gICAgfVxuICB9XG59O1xuXG59LHtcIi4vdklucHV0VGVtcGxhdGUuaHRtbFwiOjMxLFwiLi92YWxpZGF0aW9uUnVsZXMuanNcIjozMn1dLDMxOltmdW5jdGlvbihyZXF1aXJlLG1vZHVsZSxleHBvcnRzKXtcbm1vZHVsZS5leHBvcnRzID0gXCJcXG48bGFiZWwgY2xhc3M9XFxcInYtaW5wdXRcXFwiPlxcbiAge3sgbGFiZWwgfCBpc1NpbXBsZSB9fSA8c3BhbiB2LWlmPVxcXCIhcmVxdWlyZWQgJiYgIXNpbXBsZVxcXCIgY2xhc3M9XFxcInJpZ2h0XFxcIj5vcHRpb25hbDwvc3Bhbj5cXG4gIDxkaXYgY2xhc3M9XFxcImlucHV0LXdyYXBcXFwiPlxcbiAgICA8aSBjbGFzcz1cXFwiZmEgZmEte3sgaWNvbiB9fVxcXCIgdi1pZj1cXFwiaWNvblxcXCI+PC9pPlxcbiAgICA8dGV4dGFyZWEgdi1pZj1cXFwidHlwZSA9PT0gJ3RleHRhcmVhJ1xcXCJcXG4gICAgICB2LWVsOmlucHV0XFxuICAgICAgOmNsYXNzPVxcXCJ7ICdlcnJvcic6IGVycm9yLmxlbmd0aCA+IDAgfVxcXCJcXG4gICAgICBuYW1lPVxcXCJ7eyBuYW1lIH19XFxcIlxcbiAgICAgIHBsYWNlaG9sZGVyPVxcXCJ7eyBwbGFjZWhvbGRlciB9fVxcXCJcXG4gICAgICB2LW1vZGVsPVxcXCJ2YWx1ZVxcXCJcXG4gICAgICB2LW9uOmJsdXI9XFxcInZhbGlkYXRlKClcXFwiPjwvdGV4dGFyZWE+XFxuICAgIDxpbnB1dCB2LWVsc2VcXG4gICAgICB2LWVsOmlucHV0XFxuICAgICAgOmNsYXNzPVxcXCJ7ICdlcnJvcic6IGVycm9yLmxlbmd0aCA+IDAgfVxcXCJcXG4gICAgICBuYW1lPVxcXCJ7eyBuYW1lIH19XFxcIlxcbiAgICAgIHR5cGU9XFxcInt7IHR5cGUgfX1cXFwiXFxuICAgICAgcGxhY2Vob2xkZXI9XFxcInt7IHBsYWNlaG9sZGVyIH19XFxcIlxcbiAgICAgIHYtbW9kZWw9XFxcInZhbHVlXFxcIlxcbiAgICAgIHYtb246Ymx1cj1cXFwidmFsaWRhdGUoKVxcXCIgLz5cXG4gICAgPHNtYWxsIHYtaWY9XFxcImVycm9yLmxlbmd0aCA+IDBcXFwiIHRyYW5zaXRpb249XFxcInNsaWRlLXVwLXgtc21hbGxcXFwiIGNsYXNzPVxcXCJlcnJvclxcXCI+e3sgZXJyb3IgfX08L3NtYWxsPlxcbiAgPC9kaXY+XFxuPC9sYWJlbD5cXG5cIjtcblxufSx7fV0sMzI6W2Z1bmN0aW9uKHJlcXVpcmUsbW9kdWxlLGV4cG9ydHMpe1xuXG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBlbWFpbDoge1xuICAgIHJlZ2V4OiAvXigoW148PigpXFxbXFxdXFxcXC4sOzpcXHNAXCJdKyhcXC5bXjw+KClcXFtcXF1cXFxcLiw7Olxcc0BcIl0rKSopfChcIi4rXCIpKUAoKFxcW1swLTldezEsM31cXC5bMC05XXsxLDN9XFwuWzAtOV17MSwzfVxcLlswLTldezEsM31dKXwoKFthLXpBLVpcXC0wLTldK1xcLikrW2EtekEtWl17Mix9KSkkLyxcbiAgICBkZWZhdWx0RXJyb3I6ICdQbGVhc2UgZW50ZXIgYSB2YWxpZCBlbWFpbCBhZGRyZXNzJ1xuICB9LFxuICB1cmw6IHtcbiAgICByZWdleDogL2h0dHBzPzpcXC9cXC8od3d3XFwuKT9bLWEtekEtWjAtOUA6JS5fXFwrfiM9XXsyLDI1Nn1cXC5bYS16XXsyLDR9XFxiKFstYS16QS1aMC05QDolX1xcKy5+Iz8mLy89XSopLyxcbiAgICBkZWZhdWx0RXJyb3I6ICdQbGVhc2UgZW50ZXIgYSB2YWxpZCBVUkwnXG4gIH0sXG4gIG51bWJlcjoge1xuICAgIHJlZ2V4OiAvWy0uMC05XSsvLFxuICAgIGRlZmF1bHRFcnJvcjogJ1BsZWFzZSBlbnRlciBhIHZhbGlkIG51bWJlcidcbiAgfVxufTtcblxufSx7fV0sMzM6W2Z1bmN0aW9uKHJlcXVpcmUsbW9kdWxlLGV4cG9ydHMpe1xuXG52YXIgdlNlbGVjdENvbXBvbmVudCA9IHJlcXVpcmUoJy4vdlNlbGVjdENvbXBvbmVudC5qcycpO1xuXG5WdWUuY29tcG9uZW50KCd2U2VsZWN0JywgdlNlbGVjdENvbXBvbmVudCk7XG5cbn0se1wiLi92U2VsZWN0Q29tcG9uZW50LmpzXCI6MzR9XSwzNDpbZnVuY3Rpb24ocmVxdWlyZSxtb2R1bGUsZXhwb3J0cyl7XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICB0ZW1wbGF0ZTogcmVxdWlyZSgnLi92U2VsZWN0VGVtcGxhdGUuaHRtbCcpLFxuICBwcm9wczoge1xuICAgIGxhYmVsOiB7XG4gICAgICB0eXBlOiBTdHJpbmcsXG4gICAgICBkZWZhdWx0c1RvOiAnJ1xuICAgIH0sXG4gICAgc2VsZWN0ZWQ6IHtcbiAgICAgIHR5cGU6IFN0cmluZyxcbiAgICAgIHJlcXVpcmVkOiB0cnVlLFxuICAgICAgdHdvV2F5OiB0cnVlXG4gICAgfSxcbiAgICBvcHRpb25zOiB7XG4gICAgICB0eXBlOiBBcnJheSxcbiAgICAgIHJlcXVpcmVkOiB0cnVlXG4gICAgfSxcbiAgICByZXF1aXJlZDoge1xuICAgICAgdHlwZTogQm9vbGVhbixcbiAgICAgIGRlZmF1bHRzVG86IGZhbHNlXG4gICAgfVxuICB9LFxuICBkYXRhKCkge1xuICAgIHJldHVybiB7XG4gICAgICBpc0Vycm9yOiBmYWxzZVxuICAgIH07XG4gIH0sXG4gIHJlYWR5KCkge1xuICAgIHZhciBzZWxmID0gdGhpcyxcbiAgICAgIHNlbGVjdGVkSW5kZXggPSBfLmZpbmRJbmRleChzZWxmLm9wdGlvbnMsIChvcHRpb24pID0+IG9wdGlvbi52YWx1ZSA9PT0gc2VsZi5zZWxlY3RlZCk7XG5cbiAgICBpZiAoc2VsZi5yZXF1aXJlZCAmJiBzZWxlY3RlZEluZGV4ID09PSAtMSkge1xuICAgICAgc2VsZi5zZWxlY3RlZCA9IHNlbGYub3B0aW9uc1swXS52YWx1ZTtcbiAgICB9XG4gIH0sXG4gIG1ldGhvZHM6IHtcbiAgICBpc1ZhbGlkKCkge1xuICAgICAgdGhpcy5pc0Vycm9yID0gIXRoaXMucmVxdWlyZWQgfHwgdGhpcy5zZWxlY3RlZC5sZW5ndGggPiAwO1xuICAgICAgcmV0dXJuIHRoaXMuaXNFcnJvcjtcbiAgICB9XG4gIH1cbn07XG5cbn0se1wiLi92U2VsZWN0VGVtcGxhdGUuaHRtbFwiOjM1fV0sMzU6W2Z1bmN0aW9uKHJlcXVpcmUsbW9kdWxlLGV4cG9ydHMpe1xubW9kdWxlLmV4cG9ydHMgPSBcIlxcbjxsYWJlbCBjbGFzcz1cXFwidi1zZWxlY3RcXFwiPlxcbiAge3sgbGFiZWwgfX1cXG4gIDxzZWxlY3Qgdi1tb2RlbD1cXFwic2VsZWN0ZWRcXFwiIDpjbGFzcz1cXFwieyAnZXJyb3InOiBpc0Vycm9yIH1cXFwiPlxcbiAgICA8b3B0aW9uIHYtaWY9XFxcIiFyZXF1aXJlZFxcXCIgdmFsdWU9XFxcIlxcXCI+PC9vcHRpb24+XFxuICAgIDxvcHRpb24gdi1mb3I9XFxcIm9wdGlvbiBpbiBvcHRpb25zXFxcIiA6dmFsdWU9XFxcIm9wdGlvbi52YWx1ZVxcXCI+e3sgb3B0aW9uLmxhYmVsIH19PC9vcHRpb24+XFxuICA8L3NlbGVjdD5cXG48L2xhYmVsPlxcblwiO1xuXG59LHt9XSwzNjpbZnVuY3Rpb24ocmVxdWlyZSxtb2R1bGUsZXhwb3J0cyl7XG5cbnJlcXVpcmUoJy4vY29tcG9uZW50cy9hbGVydC9hbGVydC5qcycpO1xucmVxdWlyZSgnLi9jb21wb25lbnRzL2ljb24vaWNvbi5qcycpO1xucmVxdWlyZSgnLi9jb21wb25lbnRzL21vZGFsL21vZGFsLmpzJyk7XG5yZXF1aXJlKCcuL2NvbXBvbmVudHMvcHJvbXB0L3Byb21wdC5qcycpO1xucmVxdWlyZSgnLi9jb21wb25lbnRzL2xvYWRlci9sb2FkZXIuanMnKTtcbnJlcXVpcmUoJy4vY29tcG9uZW50cy90YWJzL3RhYnMuanMnKTtcbnJlcXVpcmUoJy4vY29tcG9uZW50cy92Rm9ybS92Rm9ybS5qcycpO1xucmVxdWlyZSgnLi9jb21wb25lbnRzL3ZJbnB1dC92SW5wdXQuanMnKTtcbnJlcXVpcmUoJy4vY29tcG9uZW50cy92U2VsZWN0L3ZTZWxlY3QuanMnKTtcbnJlcXVpcmUoJy4vY29tcG9uZW50cy92Q2hlY2tib3gvdkNoZWNrYm94LmpzJyk7XG5cbn0se1wiLi9jb21wb25lbnRzL2FsZXJ0L2FsZXJ0LmpzXCI6MixcIi4vY29tcG9uZW50cy9pY29uL2ljb24uanNcIjo1LFwiLi9jb21wb25lbnRzL2xvYWRlci9sb2FkZXIuanNcIjo4LFwiLi9jb21wb25lbnRzL21vZGFsL21vZGFsLmpzXCI6MTEsXCIuL2NvbXBvbmVudHMvcHJvbXB0L3Byb21wdC5qc1wiOjE0LFwiLi9jb21wb25lbnRzL3RhYnMvdGFicy5qc1wiOjIwLFwiLi9jb21wb25lbnRzL3ZDaGVja2JveC92Q2hlY2tib3guanNcIjoyMyxcIi4vY29tcG9uZW50cy92Rm9ybS92Rm9ybS5qc1wiOjI2LFwiLi9jb21wb25lbnRzL3ZJbnB1dC92SW5wdXQuanNcIjoyOSxcIi4vY29tcG9uZW50cy92U2VsZWN0L3ZTZWxlY3QuanNcIjozM31dfSx7fSxbMzZdKSJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
