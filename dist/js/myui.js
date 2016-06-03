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
  }, { "./components/alert/alert.js": 3, "./components/icon/icon.js": 6, "./components/loader/loader.js": 9, "./components/modal/modal.js": 12, "./components/prompt/prompt.js": 15, "./components/tabs/tabs.js": 21, "./components/vCheckbox/vCheckbox.js": 24, "./components/vForm/vForm.js": 27, "./components/vInput/vInput.js": 30, "./components/vSelect/vSelect.js": 34 }], 2: [function (require, module, exports) {

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
  }, {}], 3: [function (require, module, exports) {

    var alertComponent = require('./alertComponent.js');

    Vue.component('alert', alertComponent);
  }, { "./alertComponent.js": 4 }], 4: [function (require, module, exports) {

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
  }, { "./alert.class.js": 2, "./alertTemplate.html": 5 }], 5: [function (require, module, exports) {
    module.exports = "\n<div class=\"alert-box\" v-bind:class=\"{\n    success: alert.type === 'success',\n    warning: alert.type === 'warning',\n    info: alert.type === 'info',\n    alert: alert.type === 'alert',\n    secondary: alert.type === 'secondary'\n  }\" transition=\"fade\" v-show=\"alert.messages && alert.messages.length > 0\">\n  <ul>\n    <li v-for=\"message in alert.messages\" track-by=\"$index\">{{ message }}</li>\n  </ul>\n  <a href=\"#\" class=\"close\" v-if=\"canClose\" v-on:click=\"close()\"><icon name=\"multiply\"></icon></a>\n</div>\n";
  }, {}], 6: [function (require, module, exports) {

    var iconComponent = require('./iconComponent.js');

    Vue.component('icon', iconComponent);
  }, { "./iconComponent.js": 7 }], 7: [function (require, module, exports) {

    module.exports = {
      template: require('./iconTemplate.html'),
      props: ['name']
    };
  }, { "./iconTemplate.html": 8 }], 8: [function (require, module, exports) {
    module.exports = "\n<svg class=\"icon-image {{ name }}\">\n  <use xmlns:xlink=\"http://www.w3.org/1999/xlink\" xlink:href=\"#icon-{{ name }}\"></use>\n</svg>\n";
  }, {}], 9: [function (require, module, exports) {

    var loaderComponent = require('./loaderComponent.js');

    Vue.component('loader', loaderComponent);
  }, { "./loaderComponent.js": 10 }], 10: [function (require, module, exports) {

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
  }, { "./loaderTemplate.html": 11 }], 11: [function (require, module, exports) {
    module.exports = "<div class=\"loader\">Loading...</div>\n";
  }, {}], 12: [function (require, module, exports) {

    var modalComponent = require('./modalComponent.js');

    Vue.component('modal', modalComponent);
  }, { "./modalComponent.js": 13 }], 13: [function (require, module, exports) {

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
  }, { "./modalTemplate.html": 14 }], 14: [function (require, module, exports) {
    module.exports = "\n<div class=\"modal\" transition=\"zoom-in\" v-show=\"show\" v-on:click.prevent=\"show = false\">\n  <div class=\"{ 'modal-content': true, 'small': modalSize === 'small', 'full': modalSize === 'full' }\">\n    <div class=\"modal-header\">\n      <slot name=\"header\"></slot>\n    </div>\n    <slot name=\"content\"></slot>\n    <span v-on:click=\"show = false\" aria-label=\"Close\">&#215;</span>\n  </div>\n</div>\n";
  }, {}], 15: [function (require, module, exports) {

    var promptComponent = require('./promptComponent');

    Vue.component('prompt', promptComponent);
  }, { "./promptComponent": 16 }], 16: [function (require, module, exports) {

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
  }, { "./promptTemplate.html": 17 }], 17: [function (require, module, exports) {
    module.exports = "\n\n<div class=\"prompt prompt-modal\" transition=\"zoom-in\" v-show=\"show\">\n  <div class=\"prompt-overlay\" v-on:click=\"no()\"></div>\n  <div class=\"prompt-content\">\n    <v-form :submit-callback=\"yes\" :ajax=\"true\">\n      <p class=\"text-center\">{{ questionLabel }}</p>\n      <v-input type=\"text\" label=\"Response\" name=\"promptResponse\" :value.sync=\"promptValue\" :required=\"true\"></v-input>\n      <div class=\"controls\">\n        <button type=\"button\" class=\"tiny\" type=\"button\" v-on:click=\"no()\">{{ noLabel }}</button>\n        <button type=\"submit\" class=\"tiny\" type=\"submit\">{{ yesLabel }}</button>\n      </div>\n    </v-form>\n  </div>\n</div>\n";
  }, {}], 18: [function (require, module, exports) {

    var tabComponent = require('./tabComponent.js');

    Vue.component('tab', tabComponent);
  }, { "./tabComponent.js": 19 }], 19: [function (require, module, exports) {

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
  }, { "./tabTemplate.html": 20 }], 20: [function (require, module, exports) {
    module.exports = "<div class=\"tab\" v-show=\"show\">\n  <slot></slot>\n</div>\n";
  }, {}], 21: [function (require, module, exports) {

    var tabsComponent = require('./tabsComponent.js');

    require('./tab/tab.js');

    Vue.component('tabs', tabsComponent);
  }, { "./tab/tab.js": 18, "./tabsComponent.js": 22 }], 22: [function (require, module, exports) {

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
  }, { "./tabsTemplate.html": 23 }], 23: [function (require, module, exports) {
    module.exports = "\n\n<div class=\"tabs\">\n    <!-- Tabs Nav -->\n    <ul class=\"tab-nav\">\n        <li v-for=\"tab in tabs\" v-bind:class=\"{ 'active': tab.active }\" v-on:click.prevent=\"handleTabListClick($index, tab)\" :disabled=\"tab.disabled\">\n            <a href=\"#\">{{ tab.heading }}</a>\n        </li>\n    </ul>\n\n    <!-- Tab Panes -->\n    <div class=\"tab-content\" v-el:tabContent>\n        <slot></slot>\n    </div>\n</div>\n";
  }, {}], 24: [function (require, module, exports) {

    var vCheckboxComponent = require('./vCheckboxComponent.js');

    Vue.component('vCheckbox', vCheckboxComponent);
  }, { "./vCheckboxComponent.js": 25 }], 25: [function (require, module, exports) {

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
  }, { "./vCheckboxTemplate.html": 26 }], 26: [function (require, module, exports) {
    module.exports = "\n<div :class=\"{ 'checkbox': true, 'error': isError }\">\n  <icon v-on:click=\"toggle()\" :name=\"icon\"></icon>\n  <span v-on:click=\"toggle()\">{{ label }}</span>\n</div>\n";
  }, {}], 27: [function (require, module, exports) {

    var vFormComponent = require('./vFormComponent.js');

    Vue.component('vForm', vFormComponent);
  }, { "./vFormComponent.js": 28 }], 28: [function (require, module, exports) {

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
  }, { "./vFormTemplate.html": 29 }], 29: [function (require, module, exports) {
    module.exports = "\n<form v-if=\"ajax\" v-el:form v-on:submit.prevent=\"submitForm\" :method=\"method\" :action=\"action\" novalidate>\n  <slot></slot>\n</form>\n<form v-else v-el:form v-on:submit=\"submitForm\" :method=\"method\" :action=\"action\" novalidate>\n  <slot></slot>\n</form>\n";
  }, {}], 30: [function (require, module, exports) {

    var vInputComponent = require('./vInputComponent.js');

    Vue.component('vInput', vInputComponent);
  }, { "./vInputComponent.js": 31 }], 31: [function (require, module, exports) {

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
  }, { "./vInputTemplate.html": 32, "./validationRules.js": 33 }], 32: [function (require, module, exports) {
    module.exports = "\n<label class=\"v-input\">\n  {{ label | isSimple }} <span v-if=\"!required && !simple\" class=\"right\">optional</span>\n  <div class=\"input-wrap\">\n    <i class=\"fa fa-{{ icon }}\" v-if=\"icon\"></i>\n    <textarea v-if=\"type === 'textarea'\"\n      v-el:input\n      :class=\"{ 'error': error.length > 0 }\"\n      name=\"{{ name }}\"\n      placeholder=\"{{ placeholder }}\"\n      v-model=\"value\"\n      v-on:blur=\"validate()\"></textarea>\n    <input v-else\n      v-el:input\n      :class=\"{ 'error': error.length > 0 }\"\n      name=\"{{ name }}\"\n      type=\"{{ type }}\"\n      placeholder=\"{{ placeholder }}\"\n      v-model=\"value\"\n      v-on:blur=\"validate()\" />\n    <small v-if=\"error.length > 0\" transition=\"slide-up-x-small\" class=\"error\">{{ error }}</small>\n  </div>\n</label>\n";
  }, {}], 33: [function (require, module, exports) {

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
  }, {}], 34: [function (require, module, exports) {

    var vSelectComponent = require('./vSelectComponent.js');

    Vue.component('vSelect', vSelectComponent);
  }, { "./vSelectComponent.js": 35 }], 35: [function (require, module, exports) {

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
  }, { "./vSelectTemplate.html": 36 }], 36: [function (require, module, exports) {
    module.exports = "\n<label class=\"v-select\">\n  {{ label }}\n  <select v-model=\"selected\" :class=\"{ 'error': isError }\">\n    <option v-if=\"!required\" value=\"\"></option>\n    <option v-for=\"option in options\" :value=\"option.value\">{{ option.label }}</option>\n  </select>\n</label>\n";
  }, {}], 37: [function (require, module, exports) {

    require('./components.js');

    new Vue({ el: 'body' });
  }, { "./components.js": 1 }] }, {}, [37]);
//# sourceMappingURL=data:application/json;base64,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SUFBRyxDQUFDLFVBQVMsT0FBVCxFQUFpQixNQUFqQixFQUF3QixPQUF4QixFQUFnQztBQUNyRSxXQUFPLE9BQVAsR0FBaUIseVJBQWpCO0FBRUMsR0FIbUMsRUFHbEMsRUFIa0MsQ0E5bkJxWCxFQWlvQm5aLElBQUcsQ0FBQyxVQUFTLE9BQVQsRUFBaUIsTUFBakIsRUFBd0IsT0FBeEIsRUFBZ0M7O0FBRTFDLFlBQVEsaUJBQVI7O0FBRUEsUUFBSSxHQUFKLENBQVEsRUFBRSxJQUFJLE1BQU4sRUFBUjtBQUVDLEdBTlEsRUFNUCxFQUFDLG1CQUFrQixDQUFuQixFQU5PLENBam9CZ1osRUFBelosRUF1b0IwQixFQXZvQjFCLEVBdW9CNkIsQ0FBQyxFQUFELENBdm9CN0IiLCJmaWxlIjoibXl1aS5qcyIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dGhyb3cgbmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKX12YXIgZj1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwoZi5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxmLGYuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pKHsxOltmdW5jdGlvbihyZXF1aXJlLG1vZHVsZSxleHBvcnRzKXtcblxucmVxdWlyZSgnLi9jb21wb25lbnRzL2FsZXJ0L2FsZXJ0LmpzJyk7XG5yZXF1aXJlKCcuL2NvbXBvbmVudHMvaWNvbi9pY29uLmpzJyk7XG5yZXF1aXJlKCcuL2NvbXBvbmVudHMvbW9kYWwvbW9kYWwuanMnKTtcbnJlcXVpcmUoJy4vY29tcG9uZW50cy9wcm9tcHQvcHJvbXB0LmpzJyk7XG5yZXF1aXJlKCcuL2NvbXBvbmVudHMvbG9hZGVyL2xvYWRlci5qcycpO1xucmVxdWlyZSgnLi9jb21wb25lbnRzL3RhYnMvdGFicy5qcycpO1xucmVxdWlyZSgnLi9jb21wb25lbnRzL3ZGb3JtL3ZGb3JtLmpzJyk7XG5yZXF1aXJlKCcuL2NvbXBvbmVudHMvdklucHV0L3ZJbnB1dC5qcycpO1xucmVxdWlyZSgnLi9jb21wb25lbnRzL3ZTZWxlY3QvdlNlbGVjdC5qcycpO1xucmVxdWlyZSgnLi9jb21wb25lbnRzL3ZDaGVja2JveC92Q2hlY2tib3guanMnKTtcblxufSx7XCIuL2NvbXBvbmVudHMvYWxlcnQvYWxlcnQuanNcIjozLFwiLi9jb21wb25lbnRzL2ljb24vaWNvbi5qc1wiOjYsXCIuL2NvbXBvbmVudHMvbG9hZGVyL2xvYWRlci5qc1wiOjksXCIuL2NvbXBvbmVudHMvbW9kYWwvbW9kYWwuanNcIjoxMixcIi4vY29tcG9uZW50cy9wcm9tcHQvcHJvbXB0LmpzXCI6MTUsXCIuL2NvbXBvbmVudHMvdGFicy90YWJzLmpzXCI6MjEsXCIuL2NvbXBvbmVudHMvdkNoZWNrYm94L3ZDaGVja2JveC5qc1wiOjI0LFwiLi9jb21wb25lbnRzL3ZGb3JtL3ZGb3JtLmpzXCI6MjcsXCIuL2NvbXBvbmVudHMvdklucHV0L3ZJbnB1dC5qc1wiOjMwLFwiLi9jb21wb25lbnRzL3ZTZWxlY3QvdlNlbGVjdC5qc1wiOjM0fV0sMjpbZnVuY3Rpb24ocmVxdWlyZSxtb2R1bGUsZXhwb3J0cyl7XG5cbmZ1bmN0aW9uIEFsZXJ0KCkge1xuICB0aGlzLm1lc3NhZ2VzID0gW107XG4gIHRoaXMudHlwZSA9ICcnO1xufVxuXG5BbGVydC5wcm90b3R5cGUuY2xvc2UgPSBmdW5jdGlvbiAoKSB7XG4gIHRoaXMubWVzc2FnZXMgPSBbXTtcbn07XG5cbkFsZXJ0LnByb3RvdHlwZS5zZXRUeXBlID0gZnVuY3Rpb24gKHR5cGUpIHtcbiAgaWYgKHRoaXMudHlwZSAhPT0gdHlwZSkge1xuICAgIHRoaXMubWVzc2FnZXMgPSBbXTtcbiAgfVxuICB0aGlzLnR5cGUgPSB0eXBlO1xufTtcblxuQWxlcnQucHJvdG90eXBlLmFkZE1lc3NhZ2UgPSBmdW5jdGlvbiAobWVzc2FnZSwgZmFkZSwgZmFkZUR1cmF0aW9uLCBvbkZhZGUpIHtcbiAgdmFyIHNlbGYgPSB0aGlzO1xuXG4gIGZhZGVEdXJhdGlvbiA9IGZhZGVEdXJhdGlvbiB8fCAxMDAwMDtcblxuICBzZWxmLm1lc3NhZ2VzLnB1c2gobWVzc2FnZSk7XG5cbiAgaWYgKGZhZGUpIHtcbiAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgIHNlbGYubWVzc2FnZXMuc3BsaWNlKF8uZmluZEluZGV4KHRoaXMubWVzc2FnZXMsIGZ1bmN0aW9uIChleGlzdGluZ01lc3NhZ2UpIHtcbiAgICAgICAgcmV0dXJuIGV4aXN0aW5nTWVzc2FnZSA9PT0gbWVzc2FnZTtcbiAgICAgIH0pLCAxKTtcbiAgICAgIGlmICh0eXBlb2Ygb25GYWRlID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIG9uRmFkZSgpO1xuICAgICAgfVxuICAgIH0sIGZhZGVEdXJhdGlvbik7XG4gIH1cbn07XG5cbkFsZXJ0LnByb3RvdHlwZS5tZXNzYWdlID0gZnVuY3Rpb24gKG1lc3NhZ2UsIGZhZGUsIGR1cmF0aW9uLCBvbkZhZGUpIHtcbiAgdGhpcy5zZXRUeXBlKCcnKTtcbiAgdGhpcy5hZGRNZXNzYWdlKG1lc3NhZ2UsIGZhZGUsIGR1cmF0aW9uLCBvbkZhZGUpO1xufTtcblxuQWxlcnQucHJvdG90eXBlLmluZm8gPSBmdW5jdGlvbiAobWVzc2FnZSwgZmFkZSwgZHVyYXRpb24sIG9uRmFkZSkge1xuICB0aGlzLnNldFR5cGUoJ2luZm8nKTtcbiAgdGhpcy5hZGRNZXNzYWdlKG1lc3NhZ2UsIGZhZGUsIGR1cmF0aW9uLCBvbkZhZGUpO1xufTtcblxuQWxlcnQucHJvdG90eXBlLnN1Y2Nlc3MgPSBmdW5jdGlvbiAobWVzc2FnZSwgZmFkZSwgZHVyYXRpb24sIG9uRmFkZSkge1xuICB0aGlzLnNldFR5cGUoJ3N1Y2Nlc3MnKTtcbiAgdGhpcy5hZGRNZXNzYWdlKG1lc3NhZ2UsIGZhZGUsIGR1cmF0aW9uLCBvbkZhZGUpO1xufTtcblxuQWxlcnQucHJvdG90eXBlLndhcm5pbmcgPSBmdW5jdGlvbiAobWVzc2FnZSwgZmFkZSwgZHVyYXRpb24sIG9uRmFkZSkge1xuICB0aGlzLnNldFR5cGUoJ3dhcm5pbmcnKTtcbiAgdGhpcy5hZGRNZXNzYWdlKG1lc3NhZ2UsIGZhZGUsIGR1cmF0aW9uLCBvbkZhZGUpO1xufTtcblxuQWxlcnQucHJvdG90eXBlLmVycm9yID0gZnVuY3Rpb24gKG1lc3NhZ2UsIGZhZGUsIGR1cmF0aW9uLCBvbkZhZGUpIHtcbiAgdGhpcy5zZXRUeXBlKCdhbGVydCcpO1xuICB0aGlzLmFkZE1lc3NhZ2UobWVzc2FnZSwgZmFkZSwgZHVyYXRpb24sIG9uRmFkZSk7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IEFsZXJ0O1xuXG59LHt9XSwzOltmdW5jdGlvbihyZXF1aXJlLG1vZHVsZSxleHBvcnRzKXtcblxudmFyIGFsZXJ0Q29tcG9uZW50ID0gcmVxdWlyZSgnLi9hbGVydENvbXBvbmVudC5qcycpO1xuXG5WdWUuY29tcG9uZW50KCdhbGVydCcsIGFsZXJ0Q29tcG9uZW50KTtcblxufSx7XCIuL2FsZXJ0Q29tcG9uZW50LmpzXCI6NH1dLDQ6W2Z1bmN0aW9uKHJlcXVpcmUsbW9kdWxlLGV4cG9ydHMpe1xuXG52YXIgQWxlcnQgPSByZXF1aXJlKCcuL2FsZXJ0LmNsYXNzLmpzJyk7XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICB0ZW1wbGF0ZTogcmVxdWlyZSgnLi9hbGVydFRlbXBsYXRlLmh0bWwnKSxcbiAgcHJvcHM6IHtcbiAgICBhbGVydDoge1xuICAgICAgdHlwZTogT2JqZWN0LFxuICAgICAgcmVxdWlyZWQ6IHRydWUsXG4gICAgICB0d29XYXk6IHRydWVcbiAgICB9LFxuICAgIGNhbkNsb3NlOiB7XG4gICAgICB0eXBlOiBCb29sZWFuLFxuICAgICAgZGVmYXVsdHNUbzogZmFsc2VcbiAgICB9XG4gIH0sXG4gIHJlYWR5KCkge1xuICAgIHRoaXMuYWxlcnQgPSBuZXcgQWxlcnQoKTtcbiAgfSxcbiAgbWV0aG9kczoge1xuICAgIGNsb3NlKCkge1xuICAgICAgdGhpcy5hbGVydC5jbG9zZSgpO1xuICAgIH1cbiAgfVxufTtcblxufSx7XCIuL2FsZXJ0LmNsYXNzLmpzXCI6MixcIi4vYWxlcnRUZW1wbGF0ZS5odG1sXCI6NX1dLDU6W2Z1bmN0aW9uKHJlcXVpcmUsbW9kdWxlLGV4cG9ydHMpe1xubW9kdWxlLmV4cG9ydHMgPSBcIlxcbjxkaXYgY2xhc3M9XFxcImFsZXJ0LWJveFxcXCIgdi1iaW5kOmNsYXNzPVxcXCJ7XFxuICAgIHN1Y2Nlc3M6IGFsZXJ0LnR5cGUgPT09ICdzdWNjZXNzJyxcXG4gICAgd2FybmluZzogYWxlcnQudHlwZSA9PT0gJ3dhcm5pbmcnLFxcbiAgICBpbmZvOiBhbGVydC50eXBlID09PSAnaW5mbycsXFxuICAgIGFsZXJ0OiBhbGVydC50eXBlID09PSAnYWxlcnQnLFxcbiAgICBzZWNvbmRhcnk6IGFsZXJ0LnR5cGUgPT09ICdzZWNvbmRhcnknXFxuICB9XFxcIiB0cmFuc2l0aW9uPVxcXCJmYWRlXFxcIiB2LXNob3c9XFxcImFsZXJ0Lm1lc3NhZ2VzICYmIGFsZXJ0Lm1lc3NhZ2VzLmxlbmd0aCA+IDBcXFwiPlxcbiAgPHVsPlxcbiAgICA8bGkgdi1mb3I9XFxcIm1lc3NhZ2UgaW4gYWxlcnQubWVzc2FnZXNcXFwiIHRyYWNrLWJ5PVxcXCIkaW5kZXhcXFwiPnt7IG1lc3NhZ2UgfX08L2xpPlxcbiAgPC91bD5cXG4gIDxhIGhyZWY9XFxcIiNcXFwiIGNsYXNzPVxcXCJjbG9zZVxcXCIgdi1pZj1cXFwiY2FuQ2xvc2VcXFwiIHYtb246Y2xpY2s9XFxcImNsb3NlKClcXFwiPjxpY29uIG5hbWU9XFxcIm11bHRpcGx5XFxcIj48L2ljb24+PC9hPlxcbjwvZGl2PlxcblwiO1xuXG59LHt9XSw2OltmdW5jdGlvbihyZXF1aXJlLG1vZHVsZSxleHBvcnRzKXtcblxudmFyIGljb25Db21wb25lbnQgPSByZXF1aXJlKCcuL2ljb25Db21wb25lbnQuanMnKTtcblxuVnVlLmNvbXBvbmVudCgnaWNvbicsIGljb25Db21wb25lbnQpO1xuXG59LHtcIi4vaWNvbkNvbXBvbmVudC5qc1wiOjd9XSw3OltmdW5jdGlvbihyZXF1aXJlLG1vZHVsZSxleHBvcnRzKXtcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIHRlbXBsYXRlOiByZXF1aXJlKCcuL2ljb25UZW1wbGF0ZS5odG1sJyksXG4gIHByb3BzOiBbJ25hbWUnXVxufTtcblxufSx7XCIuL2ljb25UZW1wbGF0ZS5odG1sXCI6OH1dLDg6W2Z1bmN0aW9uKHJlcXVpcmUsbW9kdWxlLGV4cG9ydHMpe1xubW9kdWxlLmV4cG9ydHMgPSBcIlxcbjxzdmcgY2xhc3M9XFxcImljb24taW1hZ2Uge3sgbmFtZSB9fVxcXCI+XFxuICA8dXNlIHhtbG5zOnhsaW5rPVxcXCJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rXFxcIiB4bGluazpocmVmPVxcXCIjaWNvbi17eyBuYW1lIH19XFxcIj48L3VzZT5cXG48L3N2Zz5cXG5cIjtcblxufSx7fV0sOTpbZnVuY3Rpb24ocmVxdWlyZSxtb2R1bGUsZXhwb3J0cyl7XG5cbnZhciBsb2FkZXJDb21wb25lbnQgPSByZXF1aXJlKCcuL2xvYWRlckNvbXBvbmVudC5qcycpO1xuXG5WdWUuY29tcG9uZW50KCdsb2FkZXInLCBsb2FkZXJDb21wb25lbnQpO1xuXG59LHtcIi4vbG9hZGVyQ29tcG9uZW50LmpzXCI6MTB9XSwxMDpbZnVuY3Rpb24ocmVxdWlyZSxtb2R1bGUsZXhwb3J0cyl7XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICB0ZW1wbGF0ZTogcmVxdWlyZSgnLi9sb2FkZXJUZW1wbGF0ZS5odG1sJyksXG4gIGRhdGEoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGdyZWV0aW5nOiAnbG9hZGVyIGNvbXBvbmVudCcsXG4gICAgfTtcbiAgfSxcbiAgbWV0aG9kczoge1xuICAgIHNheUhpKCkge1xuICAgICAgY29uc29sZS5sb2coJ2hpIScpO1xuICAgIH1cbiAgfVxufTtcblxufSx7XCIuL2xvYWRlclRlbXBsYXRlLmh0bWxcIjoxMX1dLDExOltmdW5jdGlvbihyZXF1aXJlLG1vZHVsZSxleHBvcnRzKXtcbm1vZHVsZS5leHBvcnRzID0gXCI8ZGl2IGNsYXNzPVxcXCJsb2FkZXJcXFwiPkxvYWRpbmcuLi48L2Rpdj5cXG5cIjtcblxufSx7fV0sMTI6W2Z1bmN0aW9uKHJlcXVpcmUsbW9kdWxlLGV4cG9ydHMpe1xuXG52YXIgbW9kYWxDb21wb25lbnQgPSByZXF1aXJlKCcuL21vZGFsQ29tcG9uZW50LmpzJyk7XG5cblZ1ZS5jb21wb25lbnQoJ21vZGFsJywgbW9kYWxDb21wb25lbnQpO1xuXG59LHtcIi4vbW9kYWxDb21wb25lbnQuanNcIjoxM31dLDEzOltmdW5jdGlvbihyZXF1aXJlLG1vZHVsZSxleHBvcnRzKXtcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIHRlbXBsYXRlOiByZXF1aXJlKCcuL21vZGFsVGVtcGxhdGUuaHRtbCcpLFxuICBwcm9wczoge1xuICAgIHNob3c6IHtcbiAgICAgIHR5cGU6IEJvb2xlYW4sXG4gICAgICByZXF1aXJlZDogdHJ1ZSxcbiAgICAgIHR3b1dheTogdHJ1ZVxuICAgIH0sXG4gICAgbW9kYWxTaXplOiB7XG4gICAgICB0eXBlOiBTdHJpbmcsXG4gICAgICBkZWZhdWx0c1RvOiAnZnVsbCdcbiAgICB9XG4gIH0sXG4gIGNvbXB1dGVkOiB7XG4gICAgaXNNZW51KCkge1xuICAgICAgcmV0dXJuIHRoaXMubW9kYWxTaXplID09PSAnbWVudSc7XG4gICAgfVxuICB9XG59O1xuXG59LHtcIi4vbW9kYWxUZW1wbGF0ZS5odG1sXCI6MTR9XSwxNDpbZnVuY3Rpb24ocmVxdWlyZSxtb2R1bGUsZXhwb3J0cyl7XG5tb2R1bGUuZXhwb3J0cyA9IFwiXFxuPGRpdiBjbGFzcz1cXFwibW9kYWxcXFwiIHRyYW5zaXRpb249XFxcInpvb20taW5cXFwiIHYtc2hvdz1cXFwic2hvd1xcXCIgdi1vbjpjbGljay5wcmV2ZW50PVxcXCJzaG93ID0gZmFsc2VcXFwiPlxcbiAgPGRpdiBjbGFzcz1cXFwieyAnbW9kYWwtY29udGVudCc6IHRydWUsICdzbWFsbCc6IG1vZGFsU2l6ZSA9PT0gJ3NtYWxsJywgJ2Z1bGwnOiBtb2RhbFNpemUgPT09ICdmdWxsJyB9XFxcIj5cXG4gICAgPGRpdiBjbGFzcz1cXFwibW9kYWwtaGVhZGVyXFxcIj5cXG4gICAgICA8c2xvdCBuYW1lPVxcXCJoZWFkZXJcXFwiPjwvc2xvdD5cXG4gICAgPC9kaXY+XFxuICAgIDxzbG90IG5hbWU9XFxcImNvbnRlbnRcXFwiPjwvc2xvdD5cXG4gICAgPHNwYW4gdi1vbjpjbGljaz1cXFwic2hvdyA9IGZhbHNlXFxcIiBhcmlhLWxhYmVsPVxcXCJDbG9zZVxcXCI+JiMyMTU7PC9zcGFuPlxcbiAgPC9kaXY+XFxuPC9kaXY+XFxuXCI7XG5cbn0se31dLDE1OltmdW5jdGlvbihyZXF1aXJlLG1vZHVsZSxleHBvcnRzKXtcblxudmFyIHByb21wdENvbXBvbmVudCA9IHJlcXVpcmUoJy4vcHJvbXB0Q29tcG9uZW50Jyk7XG5cblZ1ZS5jb21wb25lbnQoJ3Byb21wdCcsIHByb21wdENvbXBvbmVudCk7XG5cbn0se1wiLi9wcm9tcHRDb21wb25lbnRcIjoxNn1dLDE2OltmdW5jdGlvbihyZXF1aXJlLG1vZHVsZSxleHBvcnRzKXtcblxudmFyIGRlZmF1bHRMYWJlbHMgPSB7XG4gIHF1ZXN0aW9uOiAnJyxcbiAgeWVzOiAnU3VibWl0JyxcbiAgbm86ICdDYW5jZWwnXG59O1xuXG5mdW5jdGlvbiBwcm9tcHQodm0sIG9wdGlvbnMsIHNob3dJbnB1dCkge1xuICB2YXIgdW53YXRjaDtcblxuICB2bS5xdWVzdGlvbkxhYmVsID0gb3B0aW9ucy5xdWVzdGlvbjtcbiAgdm0ueWVzTGFiZWwgPSBvcHRpb25zLnllc0xhYmVsIHx8IGRlZmF1bHRMYWJlbHMueWVzO1xuICB2bS5ub0xhYmVsID0gb3B0aW9ucy5ub0xhYmVsIHx8IGRlZmF1bHRMYWJlbHMubm87XG4gIHZtLmNvbmZpcm1lZCA9IHVuZGVmaW5lZDtcbiAgdm0uc2hvd0lucHV0ID0gc2hvd0lucHV0O1xuICB2bS5zaG93ID0gdHJ1ZTtcblxuICB1bndhdGNoID0gdm0uJHdhdGNoKCckZGF0YS5jb25maXJtZWQnLCBmdW5jdGlvbiAobmV3VmFsLCBvbGRWYWwpIHtcbiAgICBpZiAobmV3VmFsICYmIF8uaXNGdW5jdGlvbihvcHRpb25zLnllcykpIHtcbiAgICAgIG9wdGlvbnMueWVzKChzaG93SW5wdXQpID8gdm0ucHJvbXB0VmFsdWUgOiBudWxsKTtcbiAgICB9IGVsc2UgaWYgKCFuZXdWYWwgJiYgXy5pc0Z1bmN0aW9uIChvcHRpb25zLm5vKSkge1xuICAgICAgb3B0aW9ucy5ubygpO1xuICAgIH1cbiAgICB1bndhdGNoKCk7XG4gICAgdm0uc2hvdyA9IGZhbHNlO1xuICB9KTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIHRlbXBsYXRlOiByZXF1aXJlKCcuL3Byb21wdFRlbXBsYXRlLmh0bWwnKSxcbiAgZGF0YSgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgcHJvbXB0VmFsdWU6ICcnLFxuICAgICAgcXVlc3Rpb25MYWJlbDogZGVmYXVsdExhYmVscy5xdWVzdGlvbkxhYmVsLFxuICAgICAgeWVzTGFiZWw6IGRlZmF1bHRMYWJlbHMueWVzTGFiZWwsXG4gICAgICBub0xhYmVsOiBkZWZhdWx0TGFiZWxzLm5vTGFiZWwsXG4gICAgICBzaG93OiBmYWxzZSxcbiAgICAgIGNvbmZpcm1lZDogZmFsc2UsXG4gICAgICBzaG93SW5wdXQ6IGZhbHNlLFxuICAgICAgYXNrKG9wdGlvbnMpIHtcbiAgICAgICAgcHJvbXB0KHRoaXMsIG9wdGlvbnMsIHRydWUpO1xuICAgICAgfSxcbiAgICAgIGNvbmZpcm0ob3B0aW9ucykge1xuICAgICAgICBwcm9tcHQodGhpcywgb3B0aW9ucywgZmFsc2UpO1xuICAgICAgfVxuICAgIH07XG4gIH0sXG4gIHdhdGNoOiB7XG4gICAgc2hvdyh2YWwpIHtcbiAgICAgIGlmICh2YWwgPT09IHRydWUgJiYgdGhpcy4kY2hpbGRyZW4ubGVuZ3RoID4gMCkge1xuICAgICAgICB0aGlzLnByb21wdFZhbHVlID0gJyc7XG4gICAgICAgIHRoaXMuJGNoaWxkcmVuWzBdLiRjaGlsZHJlblswXS4kZWxzLmlucHV0LmZvY3VzKCk7XG4gICAgICB9XG4gICAgfVxuICB9LFxuICBtZXRob2RzOiB7XG4gICAgeWVzKCkge1xuICAgICAgdGhpcy5jb25maXJtZWQgPSB0cnVlO1xuICAgIH0sXG4gICAgbm8oKSB7XG4gICAgICB0aGlzLmNvbmZpcm1lZCA9IGZhbHNlO1xuICAgIH1cbiAgfVxufTtcblxufSx7XCIuL3Byb21wdFRlbXBsYXRlLmh0bWxcIjoxN31dLDE3OltmdW5jdGlvbihyZXF1aXJlLG1vZHVsZSxleHBvcnRzKXtcbm1vZHVsZS5leHBvcnRzID0gXCJcXG5cXG48ZGl2IGNsYXNzPVxcXCJwcm9tcHQgcHJvbXB0LW1vZGFsXFxcIiB0cmFuc2l0aW9uPVxcXCJ6b29tLWluXFxcIiB2LXNob3c9XFxcInNob3dcXFwiPlxcbiAgPGRpdiBjbGFzcz1cXFwicHJvbXB0LW92ZXJsYXlcXFwiIHYtb246Y2xpY2s9XFxcIm5vKClcXFwiPjwvZGl2PlxcbiAgPGRpdiBjbGFzcz1cXFwicHJvbXB0LWNvbnRlbnRcXFwiPlxcbiAgICA8di1mb3JtIDpzdWJtaXQtY2FsbGJhY2s9XFxcInllc1xcXCIgOmFqYXg9XFxcInRydWVcXFwiPlxcbiAgICAgIDxwIGNsYXNzPVxcXCJ0ZXh0LWNlbnRlclxcXCI+e3sgcXVlc3Rpb25MYWJlbCB9fTwvcD5cXG4gICAgICA8di1pbnB1dCB0eXBlPVxcXCJ0ZXh0XFxcIiBsYWJlbD1cXFwiUmVzcG9uc2VcXFwiIG5hbWU9XFxcInByb21wdFJlc3BvbnNlXFxcIiA6dmFsdWUuc3luYz1cXFwicHJvbXB0VmFsdWVcXFwiIDpyZXF1aXJlZD1cXFwidHJ1ZVxcXCI+PC92LWlucHV0PlxcbiAgICAgIDxkaXYgY2xhc3M9XFxcImNvbnRyb2xzXFxcIj5cXG4gICAgICAgIDxidXR0b24gdHlwZT1cXFwiYnV0dG9uXFxcIiBjbGFzcz1cXFwidGlueVxcXCIgdHlwZT1cXFwiYnV0dG9uXFxcIiB2LW9uOmNsaWNrPVxcXCJubygpXFxcIj57eyBub0xhYmVsIH19PC9idXR0b24+XFxuICAgICAgICA8YnV0dG9uIHR5cGU9XFxcInN1Ym1pdFxcXCIgY2xhc3M9XFxcInRpbnlcXFwiIHR5cGU9XFxcInN1Ym1pdFxcXCI+e3sgeWVzTGFiZWwgfX08L2J1dHRvbj5cXG4gICAgICA8L2Rpdj5cXG4gICAgPC92LWZvcm0+XFxuICA8L2Rpdj5cXG48L2Rpdj5cXG5cIjtcblxufSx7fV0sMTg6W2Z1bmN0aW9uKHJlcXVpcmUsbW9kdWxlLGV4cG9ydHMpe1xuXG52YXIgdGFiQ29tcG9uZW50ID0gcmVxdWlyZSgnLi90YWJDb21wb25lbnQuanMnKTtcblxuVnVlLmNvbXBvbmVudCgndGFiJywgdGFiQ29tcG9uZW50KTtcblxufSx7XCIuL3RhYkNvbXBvbmVudC5qc1wiOjE5fV0sMTk6W2Z1bmN0aW9uKHJlcXVpcmUsbW9kdWxlLGV4cG9ydHMpe1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgdGVtcGxhdGU6IHJlcXVpcmUoJy4vdGFiVGVtcGxhdGUuaHRtbCcpLFxuICBwcm9wczoge1xuICAgIGhlYWRpbmc6IHtcbiAgICAgIHR5cGU6IFN0cmluZyxcbiAgICAgIHJlcXVpcmVkOiB0cnVlXG4gICAgfSxcbiAgICBkaXNhYmxlZDoge1xuICAgICAgdHlwZTogQm9vbGVhbixcbiAgICAgIGRlZmF1bHQ6IGZhbHNlXG4gICAgfSxcbiAgICBjbGlja0NhbGxiYWNrOiB7XG4gICAgICB0eXBlOiBGdW5jdGlvblxuICAgIH1cbiAgfSxcbiAgZGF0YSgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgaW5kZXg6IDAsXG4gICAgICBzaG93OiBmYWxzZVxuICAgIH07XG4gIH0sXG4gIGNvbXB1dGVkOiB7XG4gICAgc2hvdygpIHtcbiAgICAgIHJldHVybiAodGhpcy4kcGFyZW50LmFjdGl2ZSA9PSB0aGlzLmluZGV4KTtcbiAgICB9XG4gIH0sXG4gIHdhdGNoOiB7XG4gICAgaGVhZGluZygpIHtcbiAgICAgIHRoaXMuJHBhcmVudC50YWJzW3RoaXMuaW5kZXhdLmhlYWRpbmcgPSB0aGlzLmhlYWRpbmc7XG4gICAgfVxuICB9LFxuICBjcmVhdGVkKCkge1xuICAgIHRoaXMuJHBhcmVudC50YWJzLnB1c2goe1xuICAgICAgaGVhZGluZzogdGhpcy5oZWFkaW5nLFxuICAgICAgZGlzYWJsZWQ6IHRoaXMuZGlzYWJsZWQsXG4gICAgICBhY3RpdmU6IGZhbHNlXG4gICAgfSk7XG4gIH0sXG4gIHJlYWR5KCkge1xuICAgIGZvciAodmFyIGluZGV4IGluIHRoaXMuJHBhcmVudC4kY2hpbGRyZW4pIHtcbiAgICAgIGlmICh0aGlzLiRwYXJlbnQuJGNoaWxkcmVuW2luZGV4XS4kZWwgPT0gdGhpcy4kZWwpIHtcbiAgICAgICAgdGhpcy5pbmRleCA9IGluZGV4O1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9XG4gIH0sXG4gIGV2ZW50czoge1xuICAgIFRBQl9DT01QT05FTlRfVEFCX0NMSUNLRUQ6IGZ1bmN0aW9uIFRhYkNsaWNrZWQoKSB7XG4gICAgICBpZiAodHlwZW9mIHRoaXMuY2xpY2tDYWxsYmFjayA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICB0aGlzLmNsaWNrQ2FsbGJhY2soKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbn07XG5cbn0se1wiLi90YWJUZW1wbGF0ZS5odG1sXCI6MjB9XSwyMDpbZnVuY3Rpb24ocmVxdWlyZSxtb2R1bGUsZXhwb3J0cyl7XG5tb2R1bGUuZXhwb3J0cyA9IFwiPGRpdiBjbGFzcz1cXFwidGFiXFxcIiB2LXNob3c9XFxcInNob3dcXFwiPlxcbiAgPHNsb3Q+PC9zbG90PlxcbjwvZGl2PlxcblwiO1xuXG59LHt9XSwyMTpbZnVuY3Rpb24ocmVxdWlyZSxtb2R1bGUsZXhwb3J0cyl7XG5cbnZhciB0YWJzQ29tcG9uZW50ID0gcmVxdWlyZSgnLi90YWJzQ29tcG9uZW50LmpzJyk7XG5cbnJlcXVpcmUoJy4vdGFiL3RhYi5qcycpO1xuXG5WdWUuY29tcG9uZW50KCd0YWJzJywgdGFic0NvbXBvbmVudCk7XG5cbn0se1wiLi90YWIvdGFiLmpzXCI6MTgsXCIuL3RhYnNDb21wb25lbnQuanNcIjoyMn1dLDIyOltmdW5jdGlvbihyZXF1aXJlLG1vZHVsZSxleHBvcnRzKXtcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIHRlbXBsYXRlOiByZXF1aXJlKCcuL3RhYnNUZW1wbGF0ZS5odG1sJyksXG4gIHByb3BzOiB7XG4gICAgYWN0aXZlOiB7XG4gICAgICB0eXBlOiBOdW1iZXIsXG4gICAgICBkZWZhdWx0OiAwXG4gICAgfVxuICB9LFxuICBkYXRhKCkge1xuICAgIHJldHVybiB7XG4gICAgICB0YWJzOiBbXVxuICAgIH07XG4gIH0sXG4gIHJlYWR5KCkge1xuICAgIGlmICh0aGlzLnRhYnNbMF0pIHtcbiAgICAgIHRoaXMudGFic1swXS5hY3RpdmUgPSB0cnVlO1xuICAgIH1cbiAgfSxcbiAgbWV0aG9kczoge1xuICAgIGhhbmRsZVRhYkxpc3RDbGljayhpbmRleCwgZWwpIHtcbiAgICAgIGlmICghZWwuZGlzYWJsZWQpIHRoaXMuYWN0aXZlID0gaW5kZXg7XG5cbiAgICAgIGZvciAodmFyIGkgPSAwLCBqID0gdGhpcy50YWJzLmxlbmd0aDsgaSA8IGo7IGkrKykge1xuICAgICAgICB0aGlzLnRhYnNbaV0uYWN0aXZlID0gKGkgPT0gaW5kZXgpO1xuICAgICAgICBpZiAodGhpcy50YWJzW2ldLmFjdGl2ZSkge1xuICAgICAgICAgIHRoaXMuJGNoaWxkcmVuW2ldLiRlbWl0KCdUQUJfQ09NUE9ORU5UX1RBQl9DTElDS0VEJyk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cbn07XG5cbn0se1wiLi90YWJzVGVtcGxhdGUuaHRtbFwiOjIzfV0sMjM6W2Z1bmN0aW9uKHJlcXVpcmUsbW9kdWxlLGV4cG9ydHMpe1xubW9kdWxlLmV4cG9ydHMgPSBcIlxcblxcbjxkaXYgY2xhc3M9XFxcInRhYnNcXFwiPlxcbiAgICA8IS0tIFRhYnMgTmF2IC0tPlxcbiAgICA8dWwgY2xhc3M9XFxcInRhYi1uYXZcXFwiPlxcbiAgICAgICAgPGxpIHYtZm9yPVxcXCJ0YWIgaW4gdGFic1xcXCIgdi1iaW5kOmNsYXNzPVxcXCJ7ICdhY3RpdmUnOiB0YWIuYWN0aXZlIH1cXFwiIHYtb246Y2xpY2sucHJldmVudD1cXFwiaGFuZGxlVGFiTGlzdENsaWNrKCRpbmRleCwgdGFiKVxcXCIgOmRpc2FibGVkPVxcXCJ0YWIuZGlzYWJsZWRcXFwiPlxcbiAgICAgICAgICAgIDxhIGhyZWY9XFxcIiNcXFwiPnt7IHRhYi5oZWFkaW5nIH19PC9hPlxcbiAgICAgICAgPC9saT5cXG4gICAgPC91bD5cXG5cXG4gICAgPCEtLSBUYWIgUGFuZXMgLS0+XFxuICAgIDxkaXYgY2xhc3M9XFxcInRhYi1jb250ZW50XFxcIiB2LWVsOnRhYkNvbnRlbnQ+XFxuICAgICAgICA8c2xvdD48L3Nsb3Q+XFxuICAgIDwvZGl2PlxcbjwvZGl2PlxcblwiO1xuXG59LHt9XSwyNDpbZnVuY3Rpb24ocmVxdWlyZSxtb2R1bGUsZXhwb3J0cyl7XG5cbnZhciB2Q2hlY2tib3hDb21wb25lbnQgPSByZXF1aXJlKCcuL3ZDaGVja2JveENvbXBvbmVudC5qcycpO1xuXG5WdWUuY29tcG9uZW50KCd2Q2hlY2tib3gnLCB2Q2hlY2tib3hDb21wb25lbnQpO1xuXG59LHtcIi4vdkNoZWNrYm94Q29tcG9uZW50LmpzXCI6MjV9XSwyNTpbZnVuY3Rpb24ocmVxdWlyZSxtb2R1bGUsZXhwb3J0cyl7XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICB0ZW1wbGF0ZTogcmVxdWlyZSgnLi92Q2hlY2tib3hUZW1wbGF0ZS5odG1sJyksXG4gIGRhdGEoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGljb246ICd1bmNoZWNrZWQnLFxuICAgICAgaXNFcnJvcjogZmFsc2VcbiAgICB9O1xuICB9LFxuICBwcm9wczoge1xuICAgIGNoZWNrZWQ6IHtcbiAgICAgIHR5cGU6IEJvb2xlYW4sXG4gICAgICByZXF1aXJlZDogdHJ1ZSxcbiAgICAgIHR3b1dheTogdHJ1ZVxuICAgIH0sXG4gICAgbGFiZWw6IHtcbiAgICAgIHR5cGU6IFN0cmluZyxcbiAgICAgIHJlcXVpcmVkOiB0cnVlXG4gICAgfSxcbiAgICByZXF1aXJlZDoge1xuICAgICAgdHlwZTogQm9vbGVhbixcbiAgICAgIGRlZmF1bHRzVG86IGZhbHNlXG4gICAgfVxuICB9LFxuICB3YXRjaDoge1xuICAgIGNoZWNrZWQodmFsKSB7XG4gICAgICB0aGlzLmljb24gPSAodmFsID09PSB0cnVlKSA/ICdjaGVja2VkJyA6ICd1bmNoZWNrZWQnO1xuICAgIH1cbiAgfSxcbiAgcmVhZHkoKSB7XG4gICAgdGhpcy5pY29uID0gKHRoaXMuY2hlY2tlZCA9PT0gdHJ1ZSkgPyAnY2hlY2tlZCcgOiAndW5jaGVja2VkJztcbiAgfSxcbiAgbWV0aG9kczoge1xuICAgIHRvZ2dsZSgpIHtcbiAgICAgIHRoaXMuY2hlY2tlZCA9ICF0aGlzLmNoZWNrZWQ7XG4gICAgfSxcbiAgICBpc1ZhbGlkKCkge1xuICAgICAgdGhpcy5pc0Vycm9yID0gKHRoaXMucmVxdWlyZWQpID8gIXRoaXMuY2hlY2tlZCA6IGZhbHNlO1xuICAgICAgcmV0dXJuICF0aGlzLmlzRXJyb3I7XG4gICAgfVxuICB9XG59O1xuXG59LHtcIi4vdkNoZWNrYm94VGVtcGxhdGUuaHRtbFwiOjI2fV0sMjY6W2Z1bmN0aW9uKHJlcXVpcmUsbW9kdWxlLGV4cG9ydHMpe1xubW9kdWxlLmV4cG9ydHMgPSBcIlxcbjxkaXYgOmNsYXNzPVxcXCJ7ICdjaGVja2JveCc6IHRydWUsICdlcnJvcic6IGlzRXJyb3IgfVxcXCI+XFxuICA8aWNvbiB2LW9uOmNsaWNrPVxcXCJ0b2dnbGUoKVxcXCIgOm5hbWU9XFxcImljb25cXFwiPjwvaWNvbj5cXG4gIDxzcGFuIHYtb246Y2xpY2s9XFxcInRvZ2dsZSgpXFxcIj57eyBsYWJlbCB9fTwvc3Bhbj5cXG48L2Rpdj5cXG5cIjtcblxufSx7fV0sMjc6W2Z1bmN0aW9uKHJlcXVpcmUsbW9kdWxlLGV4cG9ydHMpe1xuXG52YXIgdkZvcm1Db21wb25lbnQgPSByZXF1aXJlKCcuL3ZGb3JtQ29tcG9uZW50LmpzJyk7XG5cblZ1ZS5jb21wb25lbnQoJ3ZGb3JtJywgdkZvcm1Db21wb25lbnQpO1xuXG59LHtcIi4vdkZvcm1Db21wb25lbnQuanNcIjoyOH1dLDI4OltmdW5jdGlvbihyZXF1aXJlLG1vZHVsZSxleHBvcnRzKXtcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIHRlbXBsYXRlOiByZXF1aXJlKCcuL3ZGb3JtVGVtcGxhdGUuaHRtbCcpLFxuICBwcm9wczoge1xuICAgIG1ldGhvZDoge1xuICAgICAgdHlwZTogU3RyaW5nLFxuICAgICAgZGVmYXVsdHNUbzogJ1BPU1QnXG4gICAgfSxcbiAgICBhY3Rpb246IHtcbiAgICAgIHR5cGU6IFN0cmluZyxcbiAgICAgIGRlZmF1bHRzVG86ICcnXG4gICAgfSxcbiAgICBhamF4OiB7XG4gICAgICB0eXBlOiBCb29sZWFuLFxuICAgICAgZGVmYXVsdHNUbzogZmFsc2VcbiAgICB9LFxuICAgIHN1Ym1pdENhbGxiYWNrOiB7XG4gICAgICB0eXBlOiBGdW5jdGlvblxuICAgIH1cbiAgfSxcbiAgbWV0aG9kczoge1xuICAgIHN1Ym1pdEZvcm0oZXZlbnQpIHtcbiAgICAgIGlmICh0aGlzLmFqYXggfHwgIXRoaXMuaXNWYWxpZCgpKSB7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICB9XG5cbiAgICAgIGlmICh0aGlzLmFqYXggJiYgdGhpcy5pc1ZhbGlkKCkgJiYgdHlwZW9mIHRoaXMuc3VibWl0Q2FsbGJhY2sgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgdGhpcy5zdWJtaXRDYWxsYmFjaygpO1xuICAgICAgfVxuICAgIH0sXG4gICAgaXNWYWxpZCgpIHtcbiAgICAgIHZhciBzZWxmID0gdGhpcyxcbiAgICAgICAgZm9ybUlzVmFsaWQgPSB0cnVlO1xuXG4gICAgICBmb3IgKHZhciBpID0gMCwgaiA9IHNlbGYuJGNoaWxkcmVuLmxlbmd0aDsgaSA8IGo7IGkrKykge1xuICAgICAgICBpZiAoXy5pc0Z1bmN0aW9uKHNlbGYuJGNoaWxkcmVuW2ldLmlzVmFsaWQpKSB7IC8vIGhhcyBpbnB1dCB2YWxpZGF0aW9uIGF0dGFjaGVkXG4gICAgICAgICAgZm9ybUlzVmFsaWQgPSBmb3JtSXNWYWxpZCAmJiBzZWxmLiRjaGlsZHJlbltpXS5pc1ZhbGlkKCk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGZvcm1Jc1ZhbGlkO1xuICAgIH1cbiAgfVxufTtcblxufSx7XCIuL3ZGb3JtVGVtcGxhdGUuaHRtbFwiOjI5fV0sMjk6W2Z1bmN0aW9uKHJlcXVpcmUsbW9kdWxlLGV4cG9ydHMpe1xubW9kdWxlLmV4cG9ydHMgPSBcIlxcbjxmb3JtIHYtaWY9XFxcImFqYXhcXFwiIHYtZWw6Zm9ybSB2LW9uOnN1Ym1pdC5wcmV2ZW50PVxcXCJzdWJtaXRGb3JtXFxcIiA6bWV0aG9kPVxcXCJtZXRob2RcXFwiIDphY3Rpb249XFxcImFjdGlvblxcXCIgbm92YWxpZGF0ZT5cXG4gIDxzbG90Pjwvc2xvdD5cXG48L2Zvcm0+XFxuPGZvcm0gdi1lbHNlIHYtZWw6Zm9ybSB2LW9uOnN1Ym1pdD1cXFwic3VibWl0Rm9ybVxcXCIgOm1ldGhvZD1cXFwibWV0aG9kXFxcIiA6YWN0aW9uPVxcXCJhY3Rpb25cXFwiIG5vdmFsaWRhdGU+XFxuICA8c2xvdD48L3Nsb3Q+XFxuPC9mb3JtPlxcblwiO1xuXG59LHt9XSwzMDpbZnVuY3Rpb24ocmVxdWlyZSxtb2R1bGUsZXhwb3J0cyl7XG5cbnZhciB2SW5wdXRDb21wb25lbnQgPSByZXF1aXJlKCcuL3ZJbnB1dENvbXBvbmVudC5qcycpO1xuXG5WdWUuY29tcG9uZW50KCd2SW5wdXQnLCB2SW5wdXRDb21wb25lbnQpO1xuXG59LHtcIi4vdklucHV0Q29tcG9uZW50LmpzXCI6MzF9XSwzMTpbZnVuY3Rpb24ocmVxdWlyZSxtb2R1bGUsZXhwb3J0cyl7XG5cbnZhciB2YWxpZGF0aW9uUnVsZXMgPSByZXF1aXJlKCcuL3ZhbGlkYXRpb25SdWxlcy5qcycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgdGVtcGxhdGU6IHJlcXVpcmUoJy4vdklucHV0VGVtcGxhdGUuaHRtbCcpLFxuICBwcm9wczoge1xuICAgIGxhYmVsOiB7XG4gICAgICB0eXBlOiBTdHJpbmdcbiAgICB9LFxuICAgIG5hbWU6IHtcbiAgICAgIHR5cGU6IFN0cmluZ1xuICAgIH0sXG4gICAgdHlwZToge1xuICAgICAgdHlwZTogU3RyaW5nLFxuICAgICAgcmVxdWlyZWQ6IHRydWVcbiAgICB9LFxuICAgIHBsYWNlaG9sZGVyOiB7XG4gICAgICB0eXBlOiBTdHJpbmdcbiAgICB9LFxuICAgIGljb246IHtcbiAgICAgIHR5cGU6IFN0cmluZ1xuICAgIH0sXG4gICAgdmFsdWU6IHtcbiAgICAgIHR5cGU6IFN0cmluZyxcbiAgICAgIHJlcXVpcmVkOiB0cnVlLFxuICAgICAgdHdvV2F5OiB0cnVlXG4gICAgfSxcbiAgICByZXF1aXJlZDoge1xuICAgICAgdHlwZTogQm9vbGVhbixcbiAgICAgIGRlZmF1bHRzVG86IGZhbHNlXG4gICAgfSxcbiAgICBlcXVhbFRvOiB7XG4gICAgICB0eXBlOiBPYmplY3QsXG4gICAgICBkZWZhdWx0c1RvOiBudWxsXG4gICAgfSxcbiAgICBzaW1wbGU6IHtcbiAgICAgIHR5cGU6IEJvb2xlYW4sXG4gICAgICBkZWZhdWx0c1RvOiBmYWxzZVxuICAgIH1cbiAgfSxcbiAgZGF0YSgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgZXJyb3I6ICcnXG4gICAgfTtcbiAgfSxcbiAgZmlsdGVyczoge1xuICAgIGlzU2ltcGxlKHZhbCkge1xuICAgICAgcmV0dXJuICh0aGlzLnNpbXBsZSkgPyAnJyA6IHZhbDtcbiAgICB9XG4gIH0sXG4gIG1ldGhvZHM6IHtcbiAgICBpc1ZhbGlkKCkge1xuICAgICAgdGhpcy52YWxpZGF0ZSgpO1xuICAgICAgcmV0dXJuICh0aGlzLmVycm9yLmxlbmd0aCA9PT0gMCk7XG4gICAgfSxcbiAgICBkZWJvdW5jZVZhbGlkYXRlOiBfLmRlYm91bmNlKGZ1bmN0aW9uICgpIHtcbiAgICAgIHRoaXMudmFsaWRhdGUoKTtcbiAgICB9LCA1MDApLFxuICAgIHZhbGlkYXRlKCkge1xuICAgICAgdmFyIGxhYmVsID0gdGhpcy5sYWJlbCB8fCB0aGlzLm5hbWU7XG5cbiAgICAgIC8vIHJlcXVpcmVkIHZhbGlkYXRpb25cbiAgICAgIGlmICh0aGlzLnJlcXVpcmVkICYmIHRoaXMudmFsdWUubGVuZ3RoID09PSAwKSB7XG4gICAgICAgIHRoaXMuZXJyb3IgPSBsYWJlbCArICcgaXMgcmVxdWlyZWQnO1xuXG4gICAgICAvLyBodG1sNSBkYXRhIHR5cGUgdmFsaWRhdGlvblxuICAgICAgfSBlbHNlIGlmICh2YWxpZGF0aW9uUnVsZXMuaGFzT3duUHJvcGVydHkodGhpcy50eXBlKSAmJiAhdmFsaWRhdGlvblJ1bGVzW3RoaXMudHlwZV0ucmVnZXgudGVzdCh0aGlzLnZhbHVlKSkge1xuICAgICAgICB0aGlzLmVycm9yID0gdmFsaWRhdGlvblJ1bGVzW3RoaXMudHlwZV0uZGVmYXVsdEVycm9yO1xuXG4gICAgICAvLyBlcXVpdmFsZW5jeSB2YWxpZGF0aW9uXG4gICAgICB9IGVsc2UgaWYgKHRoaXMuZXF1YWxUbyAmJiB0aGlzLmVxdWFsVG8udmFsdWUgIT09IHRoaXMudmFsdWUpIHtcbiAgICAgICAgdGhpcy5lcnJvciA9ICdNdXN0IG1hdGNoICcgKyB0aGlzLmVxdWFsVG8ubGFiZWw7XG5cbiAgICAgIC8vIGlucHV0IGlzIHZhbGlkXG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLmVycm9yID0gJyc7XG4gICAgICB9XG4gICAgfVxuICB9XG59O1xuXG59LHtcIi4vdklucHV0VGVtcGxhdGUuaHRtbFwiOjMyLFwiLi92YWxpZGF0aW9uUnVsZXMuanNcIjozM31dLDMyOltmdW5jdGlvbihyZXF1aXJlLG1vZHVsZSxleHBvcnRzKXtcbm1vZHVsZS5leHBvcnRzID0gXCJcXG48bGFiZWwgY2xhc3M9XFxcInYtaW5wdXRcXFwiPlxcbiAge3sgbGFiZWwgfCBpc1NpbXBsZSB9fSA8c3BhbiB2LWlmPVxcXCIhcmVxdWlyZWQgJiYgIXNpbXBsZVxcXCIgY2xhc3M9XFxcInJpZ2h0XFxcIj5vcHRpb25hbDwvc3Bhbj5cXG4gIDxkaXYgY2xhc3M9XFxcImlucHV0LXdyYXBcXFwiPlxcbiAgICA8aSBjbGFzcz1cXFwiZmEgZmEte3sgaWNvbiB9fVxcXCIgdi1pZj1cXFwiaWNvblxcXCI+PC9pPlxcbiAgICA8dGV4dGFyZWEgdi1pZj1cXFwidHlwZSA9PT0gJ3RleHRhcmVhJ1xcXCJcXG4gICAgICB2LWVsOmlucHV0XFxuICAgICAgOmNsYXNzPVxcXCJ7ICdlcnJvcic6IGVycm9yLmxlbmd0aCA+IDAgfVxcXCJcXG4gICAgICBuYW1lPVxcXCJ7eyBuYW1lIH19XFxcIlxcbiAgICAgIHBsYWNlaG9sZGVyPVxcXCJ7eyBwbGFjZWhvbGRlciB9fVxcXCJcXG4gICAgICB2LW1vZGVsPVxcXCJ2YWx1ZVxcXCJcXG4gICAgICB2LW9uOmJsdXI9XFxcInZhbGlkYXRlKClcXFwiPjwvdGV4dGFyZWE+XFxuICAgIDxpbnB1dCB2LWVsc2VcXG4gICAgICB2LWVsOmlucHV0XFxuICAgICAgOmNsYXNzPVxcXCJ7ICdlcnJvcic6IGVycm9yLmxlbmd0aCA+IDAgfVxcXCJcXG4gICAgICBuYW1lPVxcXCJ7eyBuYW1lIH19XFxcIlxcbiAgICAgIHR5cGU9XFxcInt7IHR5cGUgfX1cXFwiXFxuICAgICAgcGxhY2Vob2xkZXI9XFxcInt7IHBsYWNlaG9sZGVyIH19XFxcIlxcbiAgICAgIHYtbW9kZWw9XFxcInZhbHVlXFxcIlxcbiAgICAgIHYtb246Ymx1cj1cXFwidmFsaWRhdGUoKVxcXCIgLz5cXG4gICAgPHNtYWxsIHYtaWY9XFxcImVycm9yLmxlbmd0aCA+IDBcXFwiIHRyYW5zaXRpb249XFxcInNsaWRlLXVwLXgtc21hbGxcXFwiIGNsYXNzPVxcXCJlcnJvclxcXCI+e3sgZXJyb3IgfX08L3NtYWxsPlxcbiAgPC9kaXY+XFxuPC9sYWJlbD5cXG5cIjtcblxufSx7fV0sMzM6W2Z1bmN0aW9uKHJlcXVpcmUsbW9kdWxlLGV4cG9ydHMpe1xuXG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBlbWFpbDoge1xuICAgIHJlZ2V4OiAvXigoW148PigpXFxbXFxdXFxcXC4sOzpcXHNAXCJdKyhcXC5bXjw+KClcXFtcXF1cXFxcLiw7Olxcc0BcIl0rKSopfChcIi4rXCIpKUAoKFxcW1swLTldezEsM31cXC5bMC05XXsxLDN9XFwuWzAtOV17MSwzfVxcLlswLTldezEsM31dKXwoKFthLXpBLVpcXC0wLTldK1xcLikrW2EtekEtWl17Mix9KSkkLyxcbiAgICBkZWZhdWx0RXJyb3I6ICdQbGVhc2UgZW50ZXIgYSB2YWxpZCBlbWFpbCBhZGRyZXNzJ1xuICB9LFxuICB1cmw6IHtcbiAgICByZWdleDogL2h0dHBzPzpcXC9cXC8od3d3XFwuKT9bLWEtekEtWjAtOUA6JS5fXFwrfiM9XXsyLDI1Nn1cXC5bYS16XXsyLDR9XFxiKFstYS16QS1aMC05QDolX1xcKy5+Iz8mLy89XSopLyxcbiAgICBkZWZhdWx0RXJyb3I6ICdQbGVhc2UgZW50ZXIgYSB2YWxpZCBVUkwnXG4gIH0sXG4gIG51bWJlcjoge1xuICAgIHJlZ2V4OiAvWy0uMC05XSsvLFxuICAgIGRlZmF1bHRFcnJvcjogJ1BsZWFzZSBlbnRlciBhIHZhbGlkIG51bWJlcidcbiAgfVxufTtcblxufSx7fV0sMzQ6W2Z1bmN0aW9uKHJlcXVpcmUsbW9kdWxlLGV4cG9ydHMpe1xuXG52YXIgdlNlbGVjdENvbXBvbmVudCA9IHJlcXVpcmUoJy4vdlNlbGVjdENvbXBvbmVudC5qcycpO1xuXG5WdWUuY29tcG9uZW50KCd2U2VsZWN0JywgdlNlbGVjdENvbXBvbmVudCk7XG5cbn0se1wiLi92U2VsZWN0Q29tcG9uZW50LmpzXCI6MzV9XSwzNTpbZnVuY3Rpb24ocmVxdWlyZSxtb2R1bGUsZXhwb3J0cyl7XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICB0ZW1wbGF0ZTogcmVxdWlyZSgnLi92U2VsZWN0VGVtcGxhdGUuaHRtbCcpLFxuICBwcm9wczoge1xuICAgIGxhYmVsOiB7XG4gICAgICB0eXBlOiBTdHJpbmcsXG4gICAgICBkZWZhdWx0c1RvOiAnJ1xuICAgIH0sXG4gICAgc2VsZWN0ZWQ6IHtcbiAgICAgIHR5cGU6IFN0cmluZyxcbiAgICAgIHJlcXVpcmVkOiB0cnVlLFxuICAgICAgdHdvV2F5OiB0cnVlXG4gICAgfSxcbiAgICBvcHRpb25zOiB7XG4gICAgICB0eXBlOiBBcnJheSxcbiAgICAgIHJlcXVpcmVkOiB0cnVlXG4gICAgfSxcbiAgICByZXF1aXJlZDoge1xuICAgICAgdHlwZTogQm9vbGVhbixcbiAgICAgIGRlZmF1bHRzVG86IGZhbHNlXG4gICAgfVxuICB9LFxuICBkYXRhKCkge1xuICAgIHJldHVybiB7XG4gICAgICBpc0Vycm9yOiBmYWxzZVxuICAgIH07XG4gIH0sXG4gIHJlYWR5KCkge1xuICAgIHZhciBzZWxmID0gdGhpcyxcbiAgICAgIHNlbGVjdGVkSW5kZXggPSBfLmZpbmRJbmRleChzZWxmLm9wdGlvbnMsIChvcHRpb24pID0+IG9wdGlvbi52YWx1ZSA9PT0gc2VsZi5zZWxlY3RlZCk7XG5cbiAgICBpZiAoc2VsZi5yZXF1aXJlZCAmJiBzZWxlY3RlZEluZGV4ID09PSAtMSkge1xuICAgICAgc2VsZi5zZWxlY3RlZCA9IHNlbGYub3B0aW9uc1swXS52YWx1ZTtcbiAgICB9XG4gIH0sXG4gIG1ldGhvZHM6IHtcbiAgICBpc1ZhbGlkKCkge1xuICAgICAgdGhpcy5pc0Vycm9yID0gIXRoaXMucmVxdWlyZWQgfHwgdGhpcy5zZWxlY3RlZC5sZW5ndGggPiAwO1xuICAgICAgcmV0dXJuIHRoaXMuaXNFcnJvcjtcbiAgICB9XG4gIH1cbn07XG5cbn0se1wiLi92U2VsZWN0VGVtcGxhdGUuaHRtbFwiOjM2fV0sMzY6W2Z1bmN0aW9uKHJlcXVpcmUsbW9kdWxlLGV4cG9ydHMpe1xubW9kdWxlLmV4cG9ydHMgPSBcIlxcbjxsYWJlbCBjbGFzcz1cXFwidi1zZWxlY3RcXFwiPlxcbiAge3sgbGFiZWwgfX1cXG4gIDxzZWxlY3Qgdi1tb2RlbD1cXFwic2VsZWN0ZWRcXFwiIDpjbGFzcz1cXFwieyAnZXJyb3InOiBpc0Vycm9yIH1cXFwiPlxcbiAgICA8b3B0aW9uIHYtaWY9XFxcIiFyZXF1aXJlZFxcXCIgdmFsdWU9XFxcIlxcXCI+PC9vcHRpb24+XFxuICAgIDxvcHRpb24gdi1mb3I9XFxcIm9wdGlvbiBpbiBvcHRpb25zXFxcIiA6dmFsdWU9XFxcIm9wdGlvbi52YWx1ZVxcXCI+e3sgb3B0aW9uLmxhYmVsIH19PC9vcHRpb24+XFxuICA8L3NlbGVjdD5cXG48L2xhYmVsPlxcblwiO1xuXG59LHt9XSwzNzpbZnVuY3Rpb24ocmVxdWlyZSxtb2R1bGUsZXhwb3J0cyl7XG5cbnJlcXVpcmUoJy4vY29tcG9uZW50cy5qcycpO1xuXG5uZXcgVnVlKHsgZWw6ICdib2R5JyB9KTtcblxufSx7XCIuL2NvbXBvbmVudHMuanNcIjoxfV19LHt9LFszN10pIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
