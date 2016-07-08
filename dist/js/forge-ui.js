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
          default: false
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
          questionLabel: defaultLabels.question,
          yesLabel: defaultLabels.yes,
          noLabel: defaultLabels.no,
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
        }
      },
      data: function data() {
        return {
          active: false
        };
      },
      ready: function ready() {
        this.$dispatch('TAB_COMPONENT_TAB_CREATED', this.heading);
      },

      events: {
        TAB_COMPONENT_TAB_CLICKED: function TAB_COMPONENT_TAB_CLICKED(msg) {
          this.active = this.heading === msg;
        }
      }
    };
  }, { "./tabTemplate.html": 18 }], 18: [function (require, module, exports) {
    module.exports = "\n<div class=\"tab\" v-show=\"active\">\n  <slot></slot>\n</div>\n";
  }, {}], 19: [function (require, module, exports) {

    var tabsComponent = require('./tabsComponent.js');

    require('./tab/tab.js');

    Vue.component('tabs', tabsComponent);
  }, { "./tab/tab.js": 16, "./tabsComponent.js": 20 }], 20: [function (require, module, exports) {

    module.exports = {
      template: require('./tabsTemplate.html'),
      data: function data() {
        return {
          tabs: [],
          activeTab: ''
        };
      },

      events: {
        TAB_COMPONENT_TAB_CREATED: function TAB_COMPONENT_TAB_CREATED(heading) {
          var self = this,
              active = this.tabs.length === 0;

          this.tabs.push({ heading: heading, active: active });
          if (active) this.activate(heading);
        }
      },
      methods: {
        activate: function activate(heading) {
          this.activeTab = heading;
          this.$broadcast('TAB_COMPONENT_TAB_CLICKED', heading);
        }
      }
    };
  }, { "./tabsTemplate.html": 21 }], 21: [function (require, module, exports) {
    module.exports = "\n<div class=\"tabs\">\n  <ul class=\"tab-nav\">\n    <li v-for=\"tab in tabs\" v-bind:class=\"{ 'active': (activeTab === tab.heading) }\" v-on:click.prevent=\"activate(tab.heading)\">\n      {{ tab.heading }}\n    </li>\n  </ul>\n\n  <div class=\"tab-content\">\n      <slot></slot>\n  </div>\n</div>\n";
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
          default: false
        }
      },
      methods: {
        isValid: function isValid() {
          this.isError = this.required ? !this.checked : false;
          return !this.isError;
        }
      }
    };
  }, { "./vCheckboxTemplate.html": 24 }], 24: [function (require, module, exports) {
    module.exports = "\n<label><input type=\"checkbox\" v-model=\"checked\" /> {{ label }}</label>\n";
  }, {}], 25: [function (require, module, exports) {

    var vFormComponent = require('./vFormComponent.js');

    Vue.component('vForm', vFormComponent);
  }, { "./vFormComponent.js": 26 }], 26: [function (require, module, exports) {

    module.exports = {
      template: require('./vFormTemplate.html'),
      props: {
        method: {
          type: String,
          default: 'POST'
        },
        action: {
          type: String,
          default: ''
        },
        async: {
          type: Boolean,
          default: false
        },
        submitCallback: {
          type: Function
        }
      },
      methods: {
        submitForm: function submitForm(event) {
          if (this.async || !this.isValid()) {
            event.preventDefault();
          }

          if (this.async && this.isValid() && typeof this.submitCallback === 'function') {
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
    module.exports = "\n<form v-if=\"async\" v-el:form v-on:submit.prevent=\"submitForm\" :method=\"method\" :action=\"action\" novalidate>\n  <slot></slot>\n</form>\n<form v-else v-el:form v-on:submit=\"submitForm\" :method=\"method\" :action=\"action\" novalidate>\n  <slot></slot>\n</form>\n";
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
          default: false
        },
        equalTo: {
          type: Object,
          default: null
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
          default: ''
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
          default: false
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
//# sourceMappingURL=data:application/json;base64,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QnFYLEVBb2hCblosSUFBRyxDQUFDLFVBQVMsT0FBVCxFQUFpQixNQUFqQixFQUF3QixPQUF4QixFQUFnQzs7QUFFMUMsWUFBUSw2QkFBUjtBQUNBLFlBQVEsMkJBQVI7QUFDQSxZQUFRLDZCQUFSO0FBQ0EsWUFBUSwrQkFBUjtBQUNBLFlBQVEsK0JBQVI7QUFDQSxZQUFRLDJCQUFSO0FBQ0EsWUFBUSw2QkFBUjtBQUNBLFlBQVEsK0JBQVI7QUFDQSxZQUFRLGlDQUFSO0FBQ0EsWUFBUSxxQ0FBUjtBQUVDLEdBYlEsRUFhUCxFQUFDLCtCQUE4QixDQUEvQixFQUFpQyw2QkFBNEIsQ0FBN0QsRUFBK0QsaUNBQWdDLENBQS9GLEVBQWlHLCtCQUE4QixFQUEvSCxFQUFrSSxpQ0FBZ0MsRUFBbEssRUFBcUssNkJBQTRCLEVBQWpNLEVBQW9NLHVDQUFzQyxFQUExTyxFQUE2TywrQkFBOEIsRUFBM1EsRUFBOFEsaUNBQWdDLEVBQTlTLEVBQWlULG1DQUFrQyxFQUFuVixFQWJPLENBcGhCZ1osRUFBelosRUFpaUIyVixFQWppQjNWLEVBaWlCOFYsQ0FBQyxFQUFELENBamlCOVYiLCJmaWxlIjoiZm9yZ2UtdWkuanMiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3Rocm93IG5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIil9dmFyIGY9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGYuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sZixmLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSh7MTpbZnVuY3Rpb24ocmVxdWlyZSxtb2R1bGUsZXhwb3J0cyl7XG5cbnZhciBhbGVydENvbXBvbmVudCA9IHJlcXVpcmUoJy4vYWxlcnRDb21wb25lbnQuanMnKTtcblxuVnVlLmNvbXBvbmVudCgnYWxlcnQnLCBhbGVydENvbXBvbmVudCk7XG5cbn0se1wiLi9hbGVydENvbXBvbmVudC5qc1wiOjJ9XSwyOltmdW5jdGlvbihyZXF1aXJlLG1vZHVsZSxleHBvcnRzKXtcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIHRlbXBsYXRlOiByZXF1aXJlKCcuL2FsZXJ0VGVtcGxhdGUuaHRtbCcpLFxuICBwcm9wczoge1xuICAgIGNhbkNsb3NlOiB7XG4gICAgICB0eXBlOiBCb29sZWFuLFxuICAgICAgZGVmYXVsdDogZmFsc2VcbiAgICB9XG4gIH0sXG4gIGRhdGEoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIG1lc3NhZ2VzOiBbXSxcbiAgICAgIHR5cGU6ICcnXG4gICAgfTtcbiAgfSxcbiAgbWV0aG9kczoge1xuICAgIGNsb3NlKCkge1xuICAgICAgdGhpcy5tZXNzYWdlcyA9IFtdO1xuICAgIH0sXG4gICAgYWRkTWVzc2FnZSh0eXBlLCBtZXNzYWdlKSB7XG4gICAgICBpZiAodGhpcy50eXBlICE9PSB0eXBlKSB7XG4gICAgICAgIHRoaXMudHlwZSA9IHR5cGU7XG4gICAgICAgIHRoaXMubWVzc2FnZXMgPSBbbWVzc2FnZV07XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLm1lc3NhZ2VzLnB1c2gobWVzc2FnZSk7XG4gICAgICB9XG4gICAgfSxcbiAgICBtZXNzYWdlKG1lc3NhZ2UpIHtcbiAgICAgIHRoaXMuYWRkTWVzc2FnZSgnJywgbWVzc2FnZSk7XG4gICAgfSxcbiAgICBwcmltYXJ5KG1lc3NhZ2UpIHtcbiAgICAgIHRoaXMuYWRkTWVzc2FnZSgncHJpbWFyeScsIG1lc3NhZ2UpO1xuICAgIH0sXG4gICAgc2Vjb25kYXJ5KG1lc3NhZ2UpIHtcbiAgICAgIHRoaXMuYWRkTWVzc2FnZSgnc2Vjb25kYXJ5JywgbWVzc2FnZSk7XG4gICAgfSxcbiAgICBzdWNjZXNzKG1lc3NhZ2UpIHtcbiAgICAgIHRoaXMuYWRkTWVzc2FnZSgnc3VjY2VzcycsIG1lc3NhZ2UpO1xuICAgIH0sXG4gICAgd2FybmluZyhtZXNzYWdlKSB7XG4gICAgICB0aGlzLmFkZE1lc3NhZ2UoJ3dhcm5pbmcnLCBtZXNzYWdlKTtcbiAgICB9LFxuICAgIGFsZXJ0KG1lc3NhZ2UpIHtcbiAgICAgIHRoaXMuYWRkTWVzc2FnZSgnYWxlcnQnLCBtZXNzYWdlKTtcbiAgICB9XG4gIH1cbn07XG5cbn0se1wiLi9hbGVydFRlbXBsYXRlLmh0bWxcIjozfV0sMzpbZnVuY3Rpb24ocmVxdWlyZSxtb2R1bGUsZXhwb3J0cyl7XG5tb2R1bGUuZXhwb3J0cyA9IFwiXFxuPGRpdiBjbGFzcz1cXFwiYWxlcnQtYm94XFxcIiB2LWJpbmQ6Y2xhc3M9XFxcIntcXG4gICAgY2FsbG91dDogdHJ1ZSxcXG4gICAgcHJpbWFyeTogdHlwZSA9PT0gJ3ByaW1hcnknLFxcbiAgICBzZWNvbmRhcnk6IHR5cGUgPT09ICdzZWNvbmRhcnknLFxcbiAgICBzdWNjZXNzOiB0eXBlID09PSAnc3VjY2VzcycsXFxuICAgIHdhcm5pbmc6IHR5cGUgPT09ICd3YXJuaW5nJyxcXG4gICAgYWxlcnQ6IHR5cGUgPT09ICdhbGVydCdcXG4gIH1cXFwiIHRyYW5zaXRpb249XFxcImZhZGVcXFwiIHYtc2hvdz1cXFwibWVzc2FnZXMubGVuZ3RoID4gMFxcXCI+XFxuICA8dWw+XFxuICAgIDxsaSB2LWZvcj1cXFwibWVzc2FnZSBpbiBtZXNzYWdlc1xcXCIgdHJhY2stYnk9XFxcIiRpbmRleFxcXCI+e3sgbWVzc2FnZSB9fTwvbGk+XFxuICA8L3VsPlxcbiAgPGJ1dHRvbiBjbGFzcz1cXFwiY2xvc2UtYnV0dG9uXFxcIiBhcmlhLWxhYmVsPVxcXCJEaXNtaXNzIGFsZXJ0XFxcIiB0eXBlPVxcXCJidXR0b25cXFwiIHYtaWY9XFxcImNhbkNsb3NlXFxcIiB2LW9uOmNsaWNrPVxcXCJjbG9zZSgpXFxcIj5cXG4gICAgPHNwYW4gYXJpYS1oaWRkZW49XFxcInRydWVcXFwiPiZ0aW1lczs8L3NwYW4+XFxuICA8L2J1dHRvbj5cXG48L2Rpdj5cXG5cIjtcblxufSx7fV0sNDpbZnVuY3Rpb24ocmVxdWlyZSxtb2R1bGUsZXhwb3J0cyl7XG5cbnZhciBpY29uQ29tcG9uZW50ID0gcmVxdWlyZSgnLi9pY29uQ29tcG9uZW50LmpzJyk7XG5cblZ1ZS5jb21wb25lbnQoJ2ljb24nLCBpY29uQ29tcG9uZW50KTtcblxufSx7XCIuL2ljb25Db21wb25lbnQuanNcIjo1fV0sNTpbZnVuY3Rpb24ocmVxdWlyZSxtb2R1bGUsZXhwb3J0cyl7XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICB0ZW1wbGF0ZTogcmVxdWlyZSgnLi9pY29uVGVtcGxhdGUuaHRtbCcpLFxuICBwcm9wczogWyduYW1lJ11cbn07XG5cbn0se1wiLi9pY29uVGVtcGxhdGUuaHRtbFwiOjZ9XSw2OltmdW5jdGlvbihyZXF1aXJlLG1vZHVsZSxleHBvcnRzKXtcbm1vZHVsZS5leHBvcnRzID0gXCJcXG48c3ZnIGNsYXNzPVxcXCJpY29uLWltYWdlIHt7IG5hbWUgfX1cXFwiPlxcbiAgPHVzZSB4bWxuczp4bGluaz1cXFwiaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGlua1xcXCIgeGxpbms6aHJlZj1cXFwiI2ljb24te3sgbmFtZSB9fVxcXCI+PC91c2U+XFxuPC9zdmc+XFxuXCI7XG5cbn0se31dLDc6W2Z1bmN0aW9uKHJlcXVpcmUsbW9kdWxlLGV4cG9ydHMpe1xuXG52YXIgbG9hZGVyQ29tcG9uZW50ID0gcmVxdWlyZSgnLi9sb2FkZXJDb21wb25lbnQuanMnKTtcblxuVnVlLmNvbXBvbmVudCgnbG9hZGVyJywgbG9hZGVyQ29tcG9uZW50KTtcblxufSx7XCIuL2xvYWRlckNvbXBvbmVudC5qc1wiOjh9XSw4OltmdW5jdGlvbihyZXF1aXJlLG1vZHVsZSxleHBvcnRzKXtcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIHRlbXBsYXRlOiByZXF1aXJlKCcuL2xvYWRlclRlbXBsYXRlLmh0bWwnKSxcbiAgZGF0YSgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgZ3JlZXRpbmc6ICdsb2FkZXIgY29tcG9uZW50JyxcbiAgICB9O1xuICB9LFxuICBtZXRob2RzOiB7XG4gICAgc2F5SGkoKSB7XG4gICAgICBjb25zb2xlLmxvZygnaGkhJyk7XG4gICAgfVxuICB9XG59O1xuXG59LHtcIi4vbG9hZGVyVGVtcGxhdGUuaHRtbFwiOjl9XSw5OltmdW5jdGlvbihyZXF1aXJlLG1vZHVsZSxleHBvcnRzKXtcbm1vZHVsZS5leHBvcnRzID0gXCI8ZGl2IGNsYXNzPVxcXCJsb2FkZXJcXFwiPkxvYWRpbmcuLi48L2Rpdj5cXG5cIjtcblxufSx7fV0sMTA6W2Z1bmN0aW9uKHJlcXVpcmUsbW9kdWxlLGV4cG9ydHMpe1xuXG52YXIgbW9kYWxDb21wb25lbnQgPSByZXF1aXJlKCcuL21vZGFsQ29tcG9uZW50LmpzJyk7XG5cblZ1ZS5jb21wb25lbnQoJ21vZGFsJywgbW9kYWxDb21wb25lbnQpO1xuXG59LHtcIi4vbW9kYWxDb21wb25lbnQuanNcIjoxMX1dLDExOltmdW5jdGlvbihyZXF1aXJlLG1vZHVsZSxleHBvcnRzKXtcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIHRlbXBsYXRlOiByZXF1aXJlKCcuL21vZGFsVGVtcGxhdGUuaHRtbCcpLFxuICBwcm9wczoge1xuICAgIHNob3c6IHtcbiAgICAgIHR5cGU6IEJvb2xlYW4sXG4gICAgICByZXF1aXJlZDogdHJ1ZSxcbiAgICAgIHR3b1dheTogdHJ1ZVxuICAgIH0sXG4gICAgbW9kYWxTaXplOiB7XG4gICAgICB0eXBlOiBTdHJpbmcsXG4gICAgICBkZWZhdWx0OiAnZnVsbCdcbiAgICB9LFxuICAgIHRyYW5zaXRpb246IHtcbiAgICAgIHR5cGU6IFN0cmluZyxcbiAgICAgIGRlZmF1bHQ6ICd6b29tLW91dCdcbiAgICB9XG4gIH1cbn07XG5cbn0se1wiLi9tb2RhbFRlbXBsYXRlLmh0bWxcIjoxMn1dLDEyOltmdW5jdGlvbihyZXF1aXJlLG1vZHVsZSxleHBvcnRzKXtcbm1vZHVsZS5leHBvcnRzID0gXCJcXG48ZGl2IGNsYXNzPVxcXCJtb2RhbFxcXCIgOnRyYW5zaXRpb249XFxcInRyYW5zaXRpb25cXFwiIHYtc2hvdz1cXFwic2hvd1xcXCI+XFxuICA8ZGl2IHYtb246Y2xpY2sucHJldmVudCA6Y2xhc3M9XFxcInsgJ21vZGFsLWNvbnRlbnQnOiB0cnVlLCAnc21hbGwnOiBtb2RhbFNpemUgPT09ICdzbWFsbCcsICdmdWxsJzogbW9kYWxTaXplID09PSAnZnVsbCcgfVxcXCI+XFxuICAgIDxkaXYgY2xhc3M9XFxcIm1vZGFsLWhlYWRlclxcXCI+XFxuICAgICAgPHNsb3QgbmFtZT1cXFwiaGVhZGVyXFxcIj48L3Nsb3Q+XFxuICAgIDwvZGl2PlxcbiAgICA8c2xvdCBuYW1lPVxcXCJjb250ZW50XFxcIj48L3Nsb3Q+XFxuICAgIDxzcGFuIHYtb246Y2xpY2s9XFxcInNob3cgPSBmYWxzZVxcXCIgYXJpYS1sYWJlbD1cXFwiQ2xvc2VcXFwiPiYjMjE1Ozwvc3Bhbj5cXG4gIDwvZGl2PlxcbjwvZGl2PlxcblwiO1xuXG59LHt9XSwxMzpbZnVuY3Rpb24ocmVxdWlyZSxtb2R1bGUsZXhwb3J0cyl7XG5cbnZhciBwcm9tcHRDb21wb25lbnQgPSByZXF1aXJlKCcuL3Byb21wdENvbXBvbmVudCcpO1xuXG5WdWUuY29tcG9uZW50KCdwcm9tcHQnLCBwcm9tcHRDb21wb25lbnQpO1xuXG59LHtcIi4vcHJvbXB0Q29tcG9uZW50XCI6MTR9XSwxNDpbZnVuY3Rpb24ocmVxdWlyZSxtb2R1bGUsZXhwb3J0cyl7XG5cbnZhciBkZWZhdWx0TGFiZWxzID0ge1xuICBxdWVzdGlvbjogJycsXG4gIHllczogJ1N1Ym1pdCcsXG4gIG5vOiAnQ2FuY2VsJ1xufTtcblxuZnVuY3Rpb24gcHJvbXB0KHZtLCBvcHRpb25zLCBzaG93SW5wdXQpIHtcbiAgdmFyIHVud2F0Y2g7XG5cbiAgdm0ucXVlc3Rpb25MYWJlbCA9IG9wdGlvbnMucXVlc3Rpb247XG4gIHZtLnllc0xhYmVsID0gb3B0aW9ucy55ZXNMYWJlbCB8fCBkZWZhdWx0TGFiZWxzLnllcztcbiAgdm0ubm9MYWJlbCA9IG9wdGlvbnMubm9MYWJlbCB8fCBkZWZhdWx0TGFiZWxzLm5vO1xuICB2bS5jb25maXJtZWQgPSB1bmRlZmluZWQ7XG4gIHZtLnNob3dJbnB1dCA9IHNob3dJbnB1dDtcbiAgdm0uc2hvdyA9IHRydWU7XG5cbiAgdW53YXRjaCA9IHZtLiR3YXRjaCgnJGRhdGEuY29uZmlybWVkJywgZnVuY3Rpb24gKG5ld1ZhbCwgb2xkVmFsKSB7XG4gICAgaWYgKG5ld1ZhbCAmJiBfLmlzRnVuY3Rpb24ob3B0aW9ucy55ZXMpKSB7XG4gICAgICBvcHRpb25zLnllcygoc2hvd0lucHV0KSA/IHZtLnByb21wdFZhbHVlIDogbnVsbCk7XG4gICAgfSBlbHNlIGlmICghbmV3VmFsICYmIF8uaXNGdW5jdGlvbiAob3B0aW9ucy5ubykpIHtcbiAgICAgIG9wdGlvbnMubm8oKTtcbiAgICB9XG4gICAgdW53YXRjaCgpO1xuICAgIHZtLnNob3cgPSBmYWxzZTtcbiAgfSk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICB0ZW1wbGF0ZTogcmVxdWlyZSgnLi9wcm9tcHRUZW1wbGF0ZS5odG1sJyksXG4gIHByb3BzOiB7XG4gICAgdHJhbnNpdGlvbjoge1xuICAgICAgdHlwZTogU3RyaW5nLFxuICAgICAgZGVmYXVsdDogJ3pvb20tb3V0J1xuICAgIH1cbiAgfSxcbiAgZGF0YSgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgcHJvbXB0VmFsdWU6ICcnLFxuICAgICAgcXVlc3Rpb25MYWJlbDogZGVmYXVsdExhYmVscy5xdWVzdGlvbixcbiAgICAgIHllc0xhYmVsOiBkZWZhdWx0TGFiZWxzLnllcyxcbiAgICAgIG5vTGFiZWw6IGRlZmF1bHRMYWJlbHMubm8sXG4gICAgICBzaG93OiBmYWxzZSxcbiAgICAgIGNvbmZpcm1lZDogZmFsc2UsXG4gICAgICBzaG93SW5wdXQ6IGZhbHNlLFxuICAgICAgYXNrKG9wdGlvbnMpIHtcbiAgICAgICAgcHJvbXB0KHRoaXMsIG9wdGlvbnMsIHRydWUpO1xuICAgICAgfSxcbiAgICAgIGNvbmZpcm0ob3B0aW9ucykge1xuICAgICAgICBwcm9tcHQodGhpcywgb3B0aW9ucywgZmFsc2UpO1xuICAgICAgfVxuICAgIH07XG4gIH0sXG4gIHdhdGNoOiB7XG4gICAgc2hvdyh2YWwpIHtcbiAgICAgIGlmICh2YWwgPT09IHRydWUgJiYgdGhpcy4kY2hpbGRyZW4ubGVuZ3RoID4gMCkge1xuICAgICAgICB0aGlzLnByb21wdFZhbHVlID0gJyc7XG4gICAgICAgIHRoaXMuJGNoaWxkcmVuWzBdLiRjaGlsZHJlblswXS4kZWxzLmlucHV0LmZvY3VzKCk7XG4gICAgICB9XG4gICAgfVxuICB9LFxuICBtZXRob2RzOiB7XG4gICAgeWVzKCkge1xuICAgICAgdGhpcy5jb25maXJtZWQgPSB0cnVlO1xuICAgIH0sXG4gICAgbm8oKSB7XG4gICAgICB0aGlzLmNvbmZpcm1lZCA9IGZhbHNlO1xuICAgIH1cbiAgfVxufTtcblxufSx7XCIuL3Byb21wdFRlbXBsYXRlLmh0bWxcIjoxNX1dLDE1OltmdW5jdGlvbihyZXF1aXJlLG1vZHVsZSxleHBvcnRzKXtcbm1vZHVsZS5leHBvcnRzID0gXCJcXG5cXG48ZGl2IGNsYXNzPVxcXCJwcm9tcHQgcHJvbXB0LW1vZGFsXFxcIiA6dHJhbnNpdGlvbj1cXFwidHJhbnNpdGlvblxcXCIgdi1zaG93PVxcXCJzaG93XFxcIj5cXG4gIDxkaXYgY2xhc3M9XFxcInByb21wdC1vdmVybGF5XFxcIiB2LW9uOmNsaWNrPVxcXCJubygpXFxcIj48L2Rpdj5cXG4gIDxkaXYgY2xhc3M9XFxcInByb21wdC1jb250ZW50XFxcIj5cXG4gICAgPHYtZm9ybSB2LWlmPVxcXCJzaG93SW5wdXRcXFwiIDpzdWJtaXQtY2FsbGJhY2s9XFxcInllc1xcXCIgOmFqYXg9XFxcInRydWVcXFwiPlxcbiAgICAgIDxwPnt7IHF1ZXN0aW9uTGFiZWwgfX08L3A+XFxuICAgICAgPHYtaW5wdXQgdHlwZT1cXFwidGV4dFxcXCIgbGFiZWw9XFxcIlJlc3BvbnNlXFxcIiBuYW1lPVxcXCJwcm9tcHRSZXNwb25zZVxcXCIgOnZhbHVlLnN5bmM9XFxcInByb21wdFZhbHVlXFxcIiA6cmVxdWlyZWQ9XFxcInRydWVcXFwiPjwvdi1pbnB1dD5cXG4gICAgICA8ZGl2IGNsYXNzPVxcXCJjb250cm9sc1xcXCI+XFxuICAgICAgICA8YnV0dG9uIHR5cGU9XFxcImJ1dHRvblxcXCIgY2xhc3M9XFxcImJ1dHRvbiBzbWFsbFxcXCIgdi1vbjpjbGljaz1cXFwibm8oKVxcXCI+e3sgbm9MYWJlbCB9fTwvYnV0dG9uPlxcbiAgICAgICAgPGJ1dHRvbiB0eXBlPVxcXCJzdWJtaXRcXFwiIGNsYXNzPVxcXCJidXR0b24gc21hbGxcXFwiPnt7IHllc0xhYmVsIH19PC9idXR0b24+XFxuICAgICAgPC9kaXY+XFxuICAgIDwvdi1mb3JtPlxcbiAgICA8ZGl2IHYtZWxzZT5cXG4gICAgICA8cD57eyBxdWVzdGlvbkxhYmVsIH19PC9wPlxcbiAgICAgIDxkaXYgY2xhc3M9XFxcImNvbnRyb2xzXFxcIj5cXG4gICAgICAgIDxidXR0b24gdHlwZT1cXFwiYnV0dG9uXFxcIiBjbGFzcz1cXFwiYnV0dG9uIHNtYWxsXFxcIiB2LW9uOmNsaWNrPVxcXCJubygpXFxcIj57eyBub0xhYmVsIH19PC9idXR0b24+XFxuICAgICAgICA8YnV0dG9uIHR5cGU9XFxcInN1Ym1pdFxcXCIgY2xhc3M9XFxcImJ1dHRvbiBzbWFsbFxcXCIgdi1vbjpjbGljaz1cXFwieWVzKClcXFwiPnt7IHllc0xhYmVsIH19PC9idXR0b24+XFxuICAgICAgPC9kaXY+XFxuICAgIDwvZGl2PlxcbiAgPC9kaXY+XFxuPC9kaXY+XFxuXCI7XG5cbn0se31dLDE2OltmdW5jdGlvbihyZXF1aXJlLG1vZHVsZSxleHBvcnRzKXtcblxudmFyIHRhYkNvbXBvbmVudCA9IHJlcXVpcmUoJy4vdGFiQ29tcG9uZW50LmpzJyk7XG5cblZ1ZS5jb21wb25lbnQoJ3RhYicsIHRhYkNvbXBvbmVudCk7XG5cbn0se1wiLi90YWJDb21wb25lbnQuanNcIjoxN31dLDE3OltmdW5jdGlvbihyZXF1aXJlLG1vZHVsZSxleHBvcnRzKXtcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIHRlbXBsYXRlOiByZXF1aXJlKCcuL3RhYlRlbXBsYXRlLmh0bWwnKSxcbiAgcHJvcHM6IHtcbiAgICBoZWFkaW5nOiB7XG4gICAgICB0eXBlOiBTdHJpbmcsXG4gICAgICByZXF1aXJlZDogdHJ1ZVxuICAgIH1cbiAgfSxcbiAgZGF0YSgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgYWN0aXZlOiBmYWxzZVxuICAgIH07XG4gIH0sXG4gIHJlYWR5KCkge1xuICAgIHRoaXMuJGRpc3BhdGNoKCdUQUJfQ09NUE9ORU5UX1RBQl9DUkVBVEVEJywgdGhpcy5oZWFkaW5nKTtcbiAgfSxcbiAgZXZlbnRzOiB7XG4gICAgVEFCX0NPTVBPTkVOVF9UQUJfQ0xJQ0tFRChtc2cpIHtcbiAgICAgIHRoaXMuYWN0aXZlID0gdGhpcy5oZWFkaW5nID09PSBtc2c7XG4gICAgfVxuICB9XG59O1xuXG59LHtcIi4vdGFiVGVtcGxhdGUuaHRtbFwiOjE4fV0sMTg6W2Z1bmN0aW9uKHJlcXVpcmUsbW9kdWxlLGV4cG9ydHMpe1xubW9kdWxlLmV4cG9ydHMgPSBcIlxcbjxkaXYgY2xhc3M9XFxcInRhYlxcXCIgdi1zaG93PVxcXCJhY3RpdmVcXFwiPlxcbiAgPHNsb3Q+PC9zbG90PlxcbjwvZGl2PlxcblwiO1xuXG59LHt9XSwxOTpbZnVuY3Rpb24ocmVxdWlyZSxtb2R1bGUsZXhwb3J0cyl7XG5cbnZhciB0YWJzQ29tcG9uZW50ID0gcmVxdWlyZSgnLi90YWJzQ29tcG9uZW50LmpzJyk7XG5cbnJlcXVpcmUoJy4vdGFiL3RhYi5qcycpO1xuXG5WdWUuY29tcG9uZW50KCd0YWJzJywgdGFic0NvbXBvbmVudCk7XG5cbn0se1wiLi90YWIvdGFiLmpzXCI6MTYsXCIuL3RhYnNDb21wb25lbnQuanNcIjoyMH1dLDIwOltmdW5jdGlvbihyZXF1aXJlLG1vZHVsZSxleHBvcnRzKXtcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIHRlbXBsYXRlOiByZXF1aXJlKCcuL3RhYnNUZW1wbGF0ZS5odG1sJyksXG4gIGRhdGEoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHRhYnM6IFtdLFxuICAgICAgYWN0aXZlVGFiOiAnJ1xuICAgIH07XG4gIH0sXG4gIGV2ZW50czoge1xuICAgIFRBQl9DT01QT05FTlRfVEFCX0NSRUFURUQoaGVhZGluZykge1xuICAgICAgdmFyIHNlbGYgPSB0aGlzLFxuICAgICAgICBhY3RpdmUgPSB0aGlzLnRhYnMubGVuZ3RoID09PSAwO1xuXG4gICAgICB0aGlzLnRhYnMucHVzaCh7IGhlYWRpbmcsIGFjdGl2ZSB9KTtcbiAgICAgIGlmIChhY3RpdmUpIHRoaXMuYWN0aXZhdGUoaGVhZGluZyk7XG4gICAgfVxuICB9LFxuICBtZXRob2RzOiB7XG4gICAgYWN0aXZhdGUoaGVhZGluZykge1xuICAgICAgdGhpcy5hY3RpdmVUYWIgPSBoZWFkaW5nO1xuICAgICAgdGhpcy4kYnJvYWRjYXN0KCdUQUJfQ09NUE9ORU5UX1RBQl9DTElDS0VEJywgaGVhZGluZyk7XG4gICAgfVxuICB9XG59O1xuXG59LHtcIi4vdGFic1RlbXBsYXRlLmh0bWxcIjoyMX1dLDIxOltmdW5jdGlvbihyZXF1aXJlLG1vZHVsZSxleHBvcnRzKXtcbm1vZHVsZS5leHBvcnRzID0gXCJcXG48ZGl2IGNsYXNzPVxcXCJ0YWJzXFxcIj5cXG4gIDx1bCBjbGFzcz1cXFwidGFiLW5hdlxcXCI+XFxuICAgIDxsaSB2LWZvcj1cXFwidGFiIGluIHRhYnNcXFwiIHYtYmluZDpjbGFzcz1cXFwieyAnYWN0aXZlJzogKGFjdGl2ZVRhYiA9PT0gdGFiLmhlYWRpbmcpIH1cXFwiIHYtb246Y2xpY2sucHJldmVudD1cXFwiYWN0aXZhdGUodGFiLmhlYWRpbmcpXFxcIj5cXG4gICAgICB7eyB0YWIuaGVhZGluZyB9fVxcbiAgICA8L2xpPlxcbiAgPC91bD5cXG5cXG4gIDxkaXYgY2xhc3M9XFxcInRhYi1jb250ZW50XFxcIj5cXG4gICAgICA8c2xvdD48L3Nsb3Q+XFxuICA8L2Rpdj5cXG48L2Rpdj5cXG5cIjtcblxufSx7fV0sMjI6W2Z1bmN0aW9uKHJlcXVpcmUsbW9kdWxlLGV4cG9ydHMpe1xuXG52YXIgdkNoZWNrYm94Q29tcG9uZW50ID0gcmVxdWlyZSgnLi92Q2hlY2tib3hDb21wb25lbnQuanMnKTtcblxuVnVlLmNvbXBvbmVudCgndkNoZWNrYm94JywgdkNoZWNrYm94Q29tcG9uZW50KTtcblxufSx7XCIuL3ZDaGVja2JveENvbXBvbmVudC5qc1wiOjIzfV0sMjM6W2Z1bmN0aW9uKHJlcXVpcmUsbW9kdWxlLGV4cG9ydHMpe1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgdGVtcGxhdGU6IHJlcXVpcmUoJy4vdkNoZWNrYm94VGVtcGxhdGUuaHRtbCcpLFxuICBkYXRhKCkge1xuICAgIHJldHVybiB7XG4gICAgICBpY29uOiAndW5jaGVja2VkJyxcbiAgICAgIGlzRXJyb3I6IGZhbHNlXG4gICAgfTtcbiAgfSxcbiAgcHJvcHM6IHtcbiAgICBjaGVja2VkOiB7XG4gICAgICB0eXBlOiBCb29sZWFuLFxuICAgICAgcmVxdWlyZWQ6IHRydWUsXG4gICAgICB0d29XYXk6IHRydWVcbiAgICB9LFxuICAgIGxhYmVsOiB7XG4gICAgICB0eXBlOiBTdHJpbmcsXG4gICAgICByZXF1aXJlZDogdHJ1ZVxuICAgIH0sXG4gICAgcmVxdWlyZWQ6IHtcbiAgICAgIHR5cGU6IEJvb2xlYW4sXG4gICAgICBkZWZhdWx0OiBmYWxzZVxuICAgIH1cbiAgfSxcbiAgbWV0aG9kczoge1xuICAgIGlzVmFsaWQoKSB7XG4gICAgICB0aGlzLmlzRXJyb3IgPSAodGhpcy5yZXF1aXJlZCkgPyAhdGhpcy5jaGVja2VkIDogZmFsc2U7XG4gICAgICByZXR1cm4gIXRoaXMuaXNFcnJvcjtcbiAgICB9XG4gIH1cbn07XG5cbn0se1wiLi92Q2hlY2tib3hUZW1wbGF0ZS5odG1sXCI6MjR9XSwyNDpbZnVuY3Rpb24ocmVxdWlyZSxtb2R1bGUsZXhwb3J0cyl7XG5tb2R1bGUuZXhwb3J0cyA9IFwiXFxuPGxhYmVsPjxpbnB1dCB0eXBlPVxcXCJjaGVja2JveFxcXCIgdi1tb2RlbD1cXFwiY2hlY2tlZFxcXCIgLz4ge3sgbGFiZWwgfX08L2xhYmVsPlxcblwiO1xuXG59LHt9XSwyNTpbZnVuY3Rpb24ocmVxdWlyZSxtb2R1bGUsZXhwb3J0cyl7XG5cbnZhciB2Rm9ybUNvbXBvbmVudCA9IHJlcXVpcmUoJy4vdkZvcm1Db21wb25lbnQuanMnKTtcblxuVnVlLmNvbXBvbmVudCgndkZvcm0nLCB2Rm9ybUNvbXBvbmVudCk7XG5cbn0se1wiLi92Rm9ybUNvbXBvbmVudC5qc1wiOjI2fV0sMjY6W2Z1bmN0aW9uKHJlcXVpcmUsbW9kdWxlLGV4cG9ydHMpe1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgdGVtcGxhdGU6IHJlcXVpcmUoJy4vdkZvcm1UZW1wbGF0ZS5odG1sJyksXG4gIHByb3BzOiB7XG4gICAgbWV0aG9kOiB7XG4gICAgICB0eXBlOiBTdHJpbmcsXG4gICAgICBkZWZhdWx0OiAnUE9TVCdcbiAgICB9LFxuICAgIGFjdGlvbjoge1xuICAgICAgdHlwZTogU3RyaW5nLFxuICAgICAgZGVmYXVsdDogJydcbiAgICB9LFxuICAgIGFzeW5jOiB7XG4gICAgICB0eXBlOiBCb29sZWFuLFxuICAgICAgZGVmYXVsdDogZmFsc2VcbiAgICB9LFxuICAgIHN1Ym1pdENhbGxiYWNrOiB7XG4gICAgICB0eXBlOiBGdW5jdGlvblxuICAgIH1cbiAgfSxcbiAgbWV0aG9kczoge1xuICAgIHN1Ym1pdEZvcm0oZXZlbnQpIHtcbiAgICAgIGlmICh0aGlzLmFzeW5jIHx8ICF0aGlzLmlzVmFsaWQoKSkge1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgfVxuXG4gICAgICBpZiAodGhpcy5hc3luYyAmJiB0aGlzLmlzVmFsaWQoKSAmJiB0eXBlb2YgdGhpcy5zdWJtaXRDYWxsYmFjayA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICB0aGlzLnN1Ym1pdENhbGxiYWNrKCk7XG4gICAgICB9XG4gICAgfSxcbiAgICBpc1ZhbGlkKCkge1xuICAgICAgdmFyIHNlbGYgPSB0aGlzLFxuICAgICAgICBmb3JtSXNWYWxpZCA9IHRydWU7XG5cbiAgICAgIGZvciAodmFyIGkgPSAwLCBqID0gc2VsZi4kY2hpbGRyZW4ubGVuZ3RoOyBpIDwgajsgaSsrKSB7XG4gICAgICAgIGlmIChfLmlzRnVuY3Rpb24oc2VsZi4kY2hpbGRyZW5baV0uaXNWYWxpZCkpIHsgLy8gaGFzIGlucHV0IHZhbGlkYXRpb24gYXR0YWNoZWRcbiAgICAgICAgICBmb3JtSXNWYWxpZCA9IGZvcm1Jc1ZhbGlkICYmIHNlbGYuJGNoaWxkcmVuW2ldLmlzVmFsaWQoKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICByZXR1cm4gZm9ybUlzVmFsaWQ7XG4gICAgfVxuICB9XG59O1xuXG59LHtcIi4vdkZvcm1UZW1wbGF0ZS5odG1sXCI6Mjd9XSwyNzpbZnVuY3Rpb24ocmVxdWlyZSxtb2R1bGUsZXhwb3J0cyl7XG5tb2R1bGUuZXhwb3J0cyA9IFwiXFxuPGZvcm0gdi1pZj1cXFwiYXN5bmNcXFwiIHYtZWw6Zm9ybSB2LW9uOnN1Ym1pdC5wcmV2ZW50PVxcXCJzdWJtaXRGb3JtXFxcIiA6bWV0aG9kPVxcXCJtZXRob2RcXFwiIDphY3Rpb249XFxcImFjdGlvblxcXCIgbm92YWxpZGF0ZT5cXG4gIDxzbG90Pjwvc2xvdD5cXG48L2Zvcm0+XFxuPGZvcm0gdi1lbHNlIHYtZWw6Zm9ybSB2LW9uOnN1Ym1pdD1cXFwic3VibWl0Rm9ybVxcXCIgOm1ldGhvZD1cXFwibWV0aG9kXFxcIiA6YWN0aW9uPVxcXCJhY3Rpb25cXFwiIG5vdmFsaWRhdGU+XFxuICA8c2xvdD48L3Nsb3Q+XFxuPC9mb3JtPlxcblwiO1xuXG59LHt9XSwyODpbZnVuY3Rpb24ocmVxdWlyZSxtb2R1bGUsZXhwb3J0cyl7XG5cbnZhciB2SW5wdXRDb21wb25lbnQgPSByZXF1aXJlKCcuL3ZJbnB1dENvbXBvbmVudC5qcycpO1xuXG5WdWUuY29tcG9uZW50KCd2SW5wdXQnLCB2SW5wdXRDb21wb25lbnQpO1xuXG59LHtcIi4vdklucHV0Q29tcG9uZW50LmpzXCI6Mjl9XSwyOTpbZnVuY3Rpb24ocmVxdWlyZSxtb2R1bGUsZXhwb3J0cyl7XG5cbnZhciB2YWxpZGF0aW9uUnVsZXMgPSByZXF1aXJlKCcuL3ZhbGlkYXRpb25SdWxlcy5qcycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgdGVtcGxhdGU6IHJlcXVpcmUoJy4vdklucHV0VGVtcGxhdGUuaHRtbCcpLFxuICBwcm9wczoge1xuICAgIGxhYmVsOiB7XG4gICAgICB0eXBlOiBTdHJpbmdcbiAgICB9LFxuICAgIG5hbWU6IHtcbiAgICAgIHR5cGU6IFN0cmluZ1xuICAgIH0sXG4gICAgdHlwZToge1xuICAgICAgdHlwZTogU3RyaW5nLFxuICAgICAgcmVxdWlyZWQ6IHRydWVcbiAgICB9LFxuICAgIHBsYWNlaG9sZGVyOiB7XG4gICAgICB0eXBlOiBTdHJpbmdcbiAgICB9LFxuICAgIGljb246IHtcbiAgICAgIHR5cGU6IFN0cmluZ1xuICAgIH0sXG4gICAgdmFsdWU6IHtcbiAgICAgIHR5cGU6IFN0cmluZyxcbiAgICAgIHJlcXVpcmVkOiB0cnVlLFxuICAgICAgdHdvV2F5OiB0cnVlXG4gICAgfSxcbiAgICByZXF1aXJlZDoge1xuICAgICAgdHlwZTogQm9vbGVhbixcbiAgICAgIGRlZmF1bHQ6IGZhbHNlXG4gICAgfSxcbiAgICBlcXVhbFRvOiB7XG4gICAgICB0eXBlOiBPYmplY3QsXG4gICAgICBkZWZhdWx0OiBudWxsXG4gICAgfVxuICB9LFxuICBkYXRhKCkge1xuICAgIHJldHVybiB7XG4gICAgICBlcnJvcjogJydcbiAgICB9O1xuICB9LFxuICBtZXRob2RzOiB7XG4gICAgaXNWYWxpZCgpIHtcbiAgICAgIHRoaXMudmFsaWRhdGUoKTtcbiAgICAgIHJldHVybiAodGhpcy5lcnJvci5sZW5ndGggPT09IDApO1xuICAgIH0sXG4gICAgZGVib3VuY2VWYWxpZGF0ZTogXy5kZWJvdW5jZShmdW5jdGlvbiAoKSB7XG4gICAgICB0aGlzLnZhbGlkYXRlKCk7XG4gICAgfSwgNTAwKSxcbiAgICB2YWxpZGF0ZSgpIHtcbiAgICAgIHZhciBsYWJlbCA9IHRoaXMubGFiZWwgfHwgdGhpcy5uYW1lO1xuXG4gICAgICAvLyByZXF1aXJlZCB2YWxpZGF0aW9uXG4gICAgICBpZiAodGhpcy5yZXF1aXJlZCAmJiB0aGlzLnZhbHVlLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICB0aGlzLmVycm9yID0gbGFiZWwgKyAnIGlzIHJlcXVpcmVkJztcblxuICAgICAgLy8gaHRtbDUgZGF0YSB0eXBlIHZhbGlkYXRpb25cbiAgICAgIH0gZWxzZSBpZiAodmFsaWRhdGlvblJ1bGVzLmhhc093blByb3BlcnR5KHRoaXMudHlwZSkgJiYgIXZhbGlkYXRpb25SdWxlc1t0aGlzLnR5cGVdLnJlZ2V4LnRlc3QodGhpcy52YWx1ZSkpIHtcbiAgICAgICAgdGhpcy5lcnJvciA9IHZhbGlkYXRpb25SdWxlc1t0aGlzLnR5cGVdLmRlZmF1bHRFcnJvcjtcblxuICAgICAgLy8gZXF1aXZhbGVuY3kgdmFsaWRhdGlvblxuICAgICAgfSBlbHNlIGlmICh0aGlzLmVxdWFsVG8gJiYgdGhpcy5lcXVhbFRvLnZhbHVlICE9PSB0aGlzLnZhbHVlKSB7XG4gICAgICAgIHRoaXMuZXJyb3IgPSAnTXVzdCBtYXRjaCAnICsgdGhpcy5lcXVhbFRvLmxhYmVsO1xuXG4gICAgICAvLyBpbnB1dCBpcyB2YWxpZFxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5lcnJvciA9ICcnO1xuICAgICAgfVxuICAgIH1cbiAgfVxufTtcblxufSx7XCIuL3ZJbnB1dFRlbXBsYXRlLmh0bWxcIjozMCxcIi4vdmFsaWRhdGlvblJ1bGVzLmpzXCI6MzF9XSwzMDpbZnVuY3Rpb24ocmVxdWlyZSxtb2R1bGUsZXhwb3J0cyl7XG5tb2R1bGUuZXhwb3J0cyA9IFwiXFxuPGxhYmVsIGNsYXNzPVxcXCJ2LWlucHV0XFxcIj5cXG4gIHt7IGxhYmVsIH19XFxuICA8ZGl2IGNsYXNzPVxcXCJpbnB1dC13cmFwXFxcIj5cXG4gICAgPGkgY2xhc3M9XFxcImZhIGZhLXt7IGljb24gfX1cXFwiIHYtaWY9XFxcImljb25cXFwiPjwvaT5cXG4gICAgPHRleHRhcmVhIHYtaWY9XFxcInR5cGUgPT09ICd0ZXh0YXJlYSdcXFwiXFxuICAgICAgdi1lbDppbnB1dFxcbiAgICAgIDpjbGFzcz1cXFwieyAnZXJyb3InOiBlcnJvci5sZW5ndGggPiAwIH1cXFwiXFxuICAgICAgbmFtZT1cXFwie3sgbmFtZSB9fVxcXCJcXG4gICAgICBwbGFjZWhvbGRlcj1cXFwie3sgcGxhY2Vob2xkZXIgfX1cXFwiXFxuICAgICAgdi1tb2RlbD1cXFwidmFsdWVcXFwiXFxuICAgICAgdi1vbjpibHVyPVxcXCJ2YWxpZGF0ZSgpXFxcIj48L3RleHRhcmVhPlxcbiAgICA8aW5wdXQgdi1lbHNlXFxuICAgICAgdi1lbDppbnB1dFxcbiAgICAgIDpjbGFzcz1cXFwieyAnZXJyb3InOiBlcnJvci5sZW5ndGggPiAwIH1cXFwiXFxuICAgICAgbmFtZT1cXFwie3sgbmFtZSB9fVxcXCJcXG4gICAgICB0eXBlPVxcXCJ7eyB0eXBlIH19XFxcIlxcbiAgICAgIHBsYWNlaG9sZGVyPVxcXCJ7eyBwbGFjZWhvbGRlciB9fVxcXCJcXG4gICAgICB2LW1vZGVsPVxcXCJ2YWx1ZVxcXCJcXG4gICAgICB2LW9uOmJsdXI9XFxcInZhbGlkYXRlKClcXFwiIC8+XFxuICAgIDxzbWFsbCB2LWlmPVxcXCJlcnJvci5sZW5ndGggPiAwXFxcIiB0cmFuc2l0aW9uPVxcXCJzbGlkZS11cC14LXNtYWxsXFxcIiBjbGFzcz1cXFwiZXJyb3JcXFwiPnt7IGVycm9yIH19PC9zbWFsbD5cXG4gIDwvZGl2PlxcbjwvbGFiZWw+XFxuXCI7XG5cbn0se31dLDMxOltmdW5jdGlvbihyZXF1aXJlLG1vZHVsZSxleHBvcnRzKXtcblxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgZW1haWw6IHtcbiAgICByZWdleDogL14oKFtePD4oKVxcW1xcXVxcXFwuLDs6XFxzQFwiXSsoXFwuW148PigpXFxbXFxdXFxcXC4sOzpcXHNAXCJdKykqKXwoXCIuK1wiKSlAKChcXFtbMC05XXsxLDN9XFwuWzAtOV17MSwzfVxcLlswLTldezEsM31cXC5bMC05XXsxLDN9XSl8KChbYS16QS1aXFwtMC05XStcXC4pK1thLXpBLVpdezIsfSkpJC8sXG4gICAgZGVmYXVsdEVycm9yOiAnUGxlYXNlIGVudGVyIGEgdmFsaWQgZW1haWwgYWRkcmVzcydcbiAgfSxcbiAgdXJsOiB7XG4gICAgcmVnZXg6IC9odHRwcz86XFwvXFwvKHd3d1xcLik/Wy1hLXpBLVowLTlAOiUuX1xcK34jPV17MiwyNTZ9XFwuW2Etel17Miw0fVxcYihbLWEtekEtWjAtOUA6JV9cXCsufiM/Ji8vPV0qKS8sXG4gICAgZGVmYXVsdEVycm9yOiAnUGxlYXNlIGVudGVyIGEgdmFsaWQgVVJMJ1xuICB9LFxuICBudW1iZXI6IHtcbiAgICByZWdleDogL1stLjAtOV0rLyxcbiAgICBkZWZhdWx0RXJyb3I6ICdQbGVhc2UgZW50ZXIgYSB2YWxpZCBudW1iZXInXG4gIH1cbn07XG5cbn0se31dLDMyOltmdW5jdGlvbihyZXF1aXJlLG1vZHVsZSxleHBvcnRzKXtcblxudmFyIHZTZWxlY3RDb21wb25lbnQgPSByZXF1aXJlKCcuL3ZTZWxlY3RDb21wb25lbnQuanMnKTtcblxuVnVlLmNvbXBvbmVudCgndlNlbGVjdCcsIHZTZWxlY3RDb21wb25lbnQpO1xuXG59LHtcIi4vdlNlbGVjdENvbXBvbmVudC5qc1wiOjMzfV0sMzM6W2Z1bmN0aW9uKHJlcXVpcmUsbW9kdWxlLGV4cG9ydHMpe1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgdGVtcGxhdGU6IHJlcXVpcmUoJy4vdlNlbGVjdFRlbXBsYXRlLmh0bWwnKSxcbiAgcHJvcHM6IHtcbiAgICBsYWJlbDoge1xuICAgICAgdHlwZTogU3RyaW5nLFxuICAgICAgZGVmYXVsdDogJydcbiAgICB9LFxuICAgIHNlbGVjdGVkOiB7XG4gICAgICB0eXBlOiBTdHJpbmcsXG4gICAgICByZXF1aXJlZDogdHJ1ZSxcbiAgICAgIHR3b1dheTogdHJ1ZVxuICAgIH0sXG4gICAgb3B0aW9uczoge1xuICAgICAgdHlwZTogQXJyYXksXG4gICAgICByZXF1aXJlZDogdHJ1ZVxuICAgIH0sXG4gICAgcmVxdWlyZWQ6IHtcbiAgICAgIHR5cGU6IEJvb2xlYW4sXG4gICAgICBkZWZhdWx0OiBmYWxzZVxuICAgIH1cbiAgfSxcbiAgZGF0YSgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgaXNFcnJvcjogZmFsc2VcbiAgICB9O1xuICB9LFxuICByZWFkeSgpIHtcbiAgICB2YXIgc2VsZiA9IHRoaXMsXG4gICAgICBzZWxlY3RlZEluZGV4ID0gXy5maW5kSW5kZXgoc2VsZi5vcHRpb25zLCAob3B0aW9uKSA9PiBvcHRpb24udmFsdWUgPT09IHNlbGYuc2VsZWN0ZWQpO1xuXG4gICAgaWYgKHNlbGYucmVxdWlyZWQgJiYgc2VsZWN0ZWRJbmRleCA9PT0gLTEpIHtcbiAgICAgIHNlbGYuc2VsZWN0ZWQgPSBzZWxmLm9wdGlvbnNbMF0udmFsdWU7XG4gICAgfVxuICB9LFxuICBtZXRob2RzOiB7XG4gICAgaXNWYWxpZCgpIHtcbiAgICAgIHRoaXMuaXNFcnJvciA9ICF0aGlzLnJlcXVpcmVkIHx8IHRoaXMuc2VsZWN0ZWQubGVuZ3RoID4gMDtcbiAgICAgIHJldHVybiB0aGlzLmlzRXJyb3I7XG4gICAgfVxuICB9XG59O1xuXG59LHtcIi4vdlNlbGVjdFRlbXBsYXRlLmh0bWxcIjozNH1dLDM0OltmdW5jdGlvbihyZXF1aXJlLG1vZHVsZSxleHBvcnRzKXtcbm1vZHVsZS5leHBvcnRzID0gXCJcXG48bGFiZWwgY2xhc3M9XFxcInYtc2VsZWN0XFxcIj5cXG4gIHt7IGxhYmVsIH19XFxuICA8c2VsZWN0IHYtbW9kZWw9XFxcInNlbGVjdGVkXFxcIiA6Y2xhc3M9XFxcInsgJ2Vycm9yJzogaXNFcnJvciB9XFxcIj5cXG4gICAgPG9wdGlvbiB2LWlmPVxcXCIhcmVxdWlyZWRcXFwiIHZhbHVlPVxcXCJcXFwiPjwvb3B0aW9uPlxcbiAgICA8b3B0aW9uIHYtZm9yPVxcXCJvcHRpb24gaW4gb3B0aW9uc1xcXCIgOnZhbHVlPVxcXCJvcHRpb24udmFsdWVcXFwiPnt7IG9wdGlvbi5sYWJlbCB9fTwvb3B0aW9uPlxcbiAgPC9zZWxlY3Q+XFxuPC9sYWJlbD5cXG5cIjtcblxufSx7fV0sMzU6W2Z1bmN0aW9uKHJlcXVpcmUsbW9kdWxlLGV4cG9ydHMpe1xuXG5yZXF1aXJlKCcuL2NvbXBvbmVudHMvYWxlcnQvYWxlcnQuanMnKTtcbnJlcXVpcmUoJy4vY29tcG9uZW50cy9pY29uL2ljb24uanMnKTtcbnJlcXVpcmUoJy4vY29tcG9uZW50cy9tb2RhbC9tb2RhbC5qcycpO1xucmVxdWlyZSgnLi9jb21wb25lbnRzL3Byb21wdC9wcm9tcHQuanMnKTtcbnJlcXVpcmUoJy4vY29tcG9uZW50cy9sb2FkZXIvbG9hZGVyLmpzJyk7XG5yZXF1aXJlKCcuL2NvbXBvbmVudHMvdGFicy90YWJzLmpzJyk7XG5yZXF1aXJlKCcuL2NvbXBvbmVudHMvdkZvcm0vdkZvcm0uanMnKTtcbnJlcXVpcmUoJy4vY29tcG9uZW50cy92SW5wdXQvdklucHV0LmpzJyk7XG5yZXF1aXJlKCcuL2NvbXBvbmVudHMvdlNlbGVjdC92U2VsZWN0LmpzJyk7XG5yZXF1aXJlKCcuL2NvbXBvbmVudHMvdkNoZWNrYm94L3ZDaGVja2JveC5qcycpO1xuXG59LHtcIi4vY29tcG9uZW50cy9hbGVydC9hbGVydC5qc1wiOjEsXCIuL2NvbXBvbmVudHMvaWNvbi9pY29uLmpzXCI6NCxcIi4vY29tcG9uZW50cy9sb2FkZXIvbG9hZGVyLmpzXCI6NyxcIi4vY29tcG9uZW50cy9tb2RhbC9tb2RhbC5qc1wiOjEwLFwiLi9jb21wb25lbnRzL3Byb21wdC9wcm9tcHQuanNcIjoxMyxcIi4vY29tcG9uZW50cy90YWJzL3RhYnMuanNcIjoxOSxcIi4vY29tcG9uZW50cy92Q2hlY2tib3gvdkNoZWNrYm94LmpzXCI6MjIsXCIuL2NvbXBvbmVudHMvdkZvcm0vdkZvcm0uanNcIjoyNSxcIi4vY29tcG9uZW50cy92SW5wdXQvdklucHV0LmpzXCI6MjgsXCIuL2NvbXBvbmVudHMvdlNlbGVjdC92U2VsZWN0LmpzXCI6MzJ9XX0se30sWzM1XSkiXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
