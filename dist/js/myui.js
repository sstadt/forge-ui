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
          defaultsTo: 'POST'
        },
        action: {
          type: String,
          defaultsTo: ''
        },
        async: {
          type: Boolean,
          defaultsTo: false
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm15dWkuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxDQUFDLFNBQVMsQ0FBVCxDQUFXLENBQVgsRUFBYSxDQUFiLEVBQWUsQ0FBZixFQUFpQjtBQUFDLFdBQVMsQ0FBVCxDQUFXLENBQVgsRUFBYSxDQUFiLEVBQWU7QUFBQyxRQUFHLENBQUMsRUFBRSxDQUFGLENBQUosRUFBUztBQUFDLFVBQUcsQ0FBQyxFQUFFLENBQUYsQ0FBSixFQUFTO0FBQUMsWUFBSSxJQUFFLE9BQU8sT0FBUCxJQUFnQixVQUFoQixJQUE0QixPQUFsQyxDQUEwQyxJQUFHLENBQUMsQ0FBRCxJQUFJLENBQVAsRUFBUyxPQUFPLEVBQUUsQ0FBRixFQUFJLENBQUMsQ0FBTCxDQUFQLENBQWUsSUFBRyxDQUFILEVBQUssT0FBTyxFQUFFLENBQUYsRUFBSSxDQUFDLENBQUwsQ0FBUCxDQUFlLE1BQU0sSUFBSSxLQUFKLENBQVUseUJBQXVCLENBQXZCLEdBQXlCLEdBQW5DLENBQU47QUFBOEMsV0FBSSxJQUFFLEVBQUUsQ0FBRixJQUFLLEVBQUMsU0FBUSxFQUFULEVBQVgsQ0FBd0IsRUFBRSxDQUFGLEVBQUssQ0FBTCxFQUFRLElBQVIsQ0FBYSxFQUFFLE9BQWYsRUFBdUIsVUFBUyxDQUFULEVBQVc7QUFBQyxZQUFJLElBQUUsRUFBRSxDQUFGLEVBQUssQ0FBTCxFQUFRLENBQVIsQ0FBTixDQUFpQixPQUFPLEVBQUUsSUFBRSxDQUFGLEdBQUksQ0FBTixDQUFQO0FBQWdCLE9BQXBFLEVBQXFFLENBQXJFLEVBQXVFLEVBQUUsT0FBekUsRUFBaUYsQ0FBakYsRUFBbUYsQ0FBbkYsRUFBcUYsQ0FBckYsRUFBdUYsQ0FBdkY7QUFBMEYsWUFBTyxFQUFFLENBQUYsRUFBSyxPQUFaO0FBQW9CLE9BQUksSUFBRSxPQUFPLE9BQVAsSUFBZ0IsVUFBaEIsSUFBNEIsT0FBbEMsQ0FBMEMsS0FBSSxJQUFJLElBQUUsQ0FBVixFQUFZLElBQUUsRUFBRSxNQUFoQixFQUF1QixHQUF2QjtBQUEyQixNQUFFLEVBQUUsQ0FBRixDQUFGO0FBQTNCLEdBQW1DLE9BQU8sQ0FBUDtBQUFTLENBQXZaLEVBQXlaLEVBQUMsR0FBRSxDQUFDLFVBQVMsT0FBVCxFQUFpQixNQUFqQixFQUF3QixPQUF4QixFQUFnQzs7QUFFN2IsUUFBSSxpQkFBaUIsUUFBUSxxQkFBUixDQUFyQjs7QUFFQSxRQUFJLFNBQUosQ0FBYyxPQUFkLEVBQXVCLGNBQXZCO0FBRUMsR0FOMlosRUFNMVosRUFBQyx1QkFBc0IsQ0FBdkIsRUFOMFosQ0FBSCxFQU01WCxHQUFFLENBQUMsVUFBUyxPQUFULEVBQWlCLE1BQWpCLEVBQXdCLE9BQXhCLEVBQWdDOztBQUVoRSxXQUFPLE9BQVAsR0FBaUI7QUFDZixnQkFBVSxRQUFRLHNCQUFSLENBREs7QUFFZixhQUFPO0FBQ0wsa0JBQVU7QUFDUixnQkFBTSxPQURFO0FBRVIsc0JBQVk7QUFGSjtBQURMLE9BRlE7QUFRZixVQVJlLGtCQVFSO0FBQ0wsZUFBTztBQUNMLG9CQUFVLEVBREw7QUFFTCxnQkFBTTtBQUZELFNBQVA7QUFJRCxPQWJjOztBQWNmLGVBQVM7QUFDUCxhQURPLG1CQUNDO0FBQ04sZUFBSyxRQUFMLEdBQWdCLEVBQWhCO0FBQ0QsU0FITTtBQUlQLGtCQUpPLHNCQUlJLElBSkosRUFJVSxPQUpWLEVBSW1CO0FBQ3hCLGNBQUksS0FBSyxJQUFMLEtBQWMsSUFBbEIsRUFBd0I7QUFDdEIsaUJBQUssSUFBTCxHQUFZLElBQVo7QUFDQSxpQkFBSyxRQUFMLEdBQWdCLENBQUMsT0FBRCxDQUFoQjtBQUNELFdBSEQsTUFHTztBQUNMLGlCQUFLLFFBQUwsQ0FBYyxJQUFkLENBQW1CLE9BQW5CO0FBQ0Q7QUFDRixTQVhNO0FBWVAsZUFaTyxtQkFZQyxRQVpELEVBWVU7QUFDZixlQUFLLFVBQUwsQ0FBZ0IsRUFBaEIsRUFBb0IsUUFBcEI7QUFDRCxTQWRNO0FBZVAsZUFmTyxtQkFlQyxPQWZELEVBZVU7QUFDZixlQUFLLFVBQUwsQ0FBZ0IsU0FBaEIsRUFBMkIsT0FBM0I7QUFDRCxTQWpCTTtBQWtCUCxpQkFsQk8scUJBa0JHLE9BbEJILEVBa0JZO0FBQ2pCLGVBQUssVUFBTCxDQUFnQixXQUFoQixFQUE2QixPQUE3QjtBQUNELFNBcEJNO0FBcUJQLGVBckJPLG1CQXFCQyxPQXJCRCxFQXFCVTtBQUNmLGVBQUssVUFBTCxDQUFnQixTQUFoQixFQUEyQixPQUEzQjtBQUNELFNBdkJNO0FBd0JQLGVBeEJPLG1CQXdCQyxPQXhCRCxFQXdCVTtBQUNmLGVBQUssVUFBTCxDQUFnQixTQUFoQixFQUEyQixPQUEzQjtBQUNELFNBMUJNO0FBMkJQLGFBM0JPLGlCQTJCRCxPQTNCQyxFQTJCUTtBQUNiLGVBQUssVUFBTCxDQUFnQixPQUFoQixFQUF5QixPQUF6QjtBQUNEO0FBN0JNO0FBZE0sS0FBakI7QUErQ0MsR0FqRDhCLEVBaUQ3QixFQUFDLHdCQUF1QixDQUF4QixFQWpENkIsQ0FOMFgsRUF1RDNYLEdBQUUsQ0FBQyxVQUFTLE9BQVQsRUFBaUIsTUFBakIsRUFBd0IsT0FBeEIsRUFBZ0M7QUFDakUsV0FBTyxPQUFQLEdBQWlCLG1rQkFBakI7QUFFQyxHQUgrQixFQUc5QixFQUg4QixDQXZEeVgsRUEwRG5aLEdBQUUsQ0FBQyxVQUFTLE9BQVQsRUFBaUIsTUFBakIsRUFBd0IsT0FBeEIsRUFBZ0M7O0FBRXpDLFFBQUksZ0JBQWdCLFFBQVEsb0JBQVIsQ0FBcEI7O0FBRUEsUUFBSSxTQUFKLENBQWMsTUFBZCxFQUFzQixhQUF0QjtBQUVDLEdBTk8sRUFNTixFQUFDLHNCQUFxQixDQUF0QixFQU5NLENBMURpWixFQWdFN1gsR0FBRSxDQUFDLFVBQVMsT0FBVCxFQUFpQixNQUFqQixFQUF3QixPQUF4QixFQUFnQzs7QUFFL0QsV0FBTyxPQUFQLEdBQWlCO0FBQ2YsZ0JBQVUsUUFBUSxxQkFBUixDQURLO0FBRWYsYUFBTyxDQUFDLE1BQUQ7QUFGUSxLQUFqQjtBQUtDLEdBUDZCLEVBTzVCLEVBQUMsdUJBQXNCLENBQXZCLEVBUDRCLENBaEUyWCxFQXVFNVgsR0FBRSxDQUFDLFVBQVMsT0FBVCxFQUFpQixNQUFqQixFQUF3QixPQUF4QixFQUFnQztBQUNoRSxXQUFPLE9BQVAsR0FBaUIsK0lBQWpCO0FBRUMsR0FIOEIsRUFHN0IsRUFINkIsQ0F2RTBYLEVBMEVuWixHQUFFLENBQUMsVUFBUyxPQUFULEVBQWlCLE1BQWpCLEVBQXdCLE9BQXhCLEVBQWdDOztBQUV6QyxRQUFJLGtCQUFrQixRQUFRLHNCQUFSLENBQXRCOztBQUVBLFFBQUksU0FBSixDQUFjLFFBQWQsRUFBd0IsZUFBeEI7QUFFQyxHQU5PLEVBTU4sRUFBQyx3QkFBdUIsQ0FBeEIsRUFOTSxDQTFFaVosRUFnRjNYLEdBQUUsQ0FBQyxVQUFTLE9BQVQsRUFBaUIsTUFBakIsRUFBd0IsT0FBeEIsRUFBZ0M7O0FBRWpFLFdBQU8sT0FBUCxHQUFpQjtBQUNmLGdCQUFVLFFBQVEsdUJBQVIsQ0FESztBQUVmLFVBRmUsa0JBRVI7QUFDTCxlQUFPO0FBQ0wsb0JBQVU7QUFETCxTQUFQO0FBR0QsT0FOYzs7QUFPZixlQUFTO0FBQ1AsYUFETyxtQkFDQztBQUNOLGtCQUFRLEdBQVIsQ0FBWSxLQUFaO0FBQ0Q7QUFITTtBQVBNLEtBQWpCO0FBY0MsR0FoQitCLEVBZ0I5QixFQUFDLHlCQUF3QixDQUF6QixFQWhCOEIsQ0FoRnlYLEVBZ0cxWCxHQUFFLENBQUMsVUFBUyxPQUFULEVBQWlCLE1BQWpCLEVBQXdCLE9BQXhCLEVBQWdDO0FBQ2xFLFdBQU8sT0FBUCxHQUFpQiwwQ0FBakI7QUFFQyxHQUhnQyxFQUcvQixFQUgrQixDQWhHd1gsRUFtR25aLElBQUcsQ0FBQyxVQUFTLE9BQVQsRUFBaUIsTUFBakIsRUFBd0IsT0FBeEIsRUFBZ0M7O0FBRTFDLFFBQUksaUJBQWlCLFFBQVEscUJBQVIsQ0FBckI7O0FBRUEsUUFBSSxTQUFKLENBQWMsT0FBZCxFQUF1QixjQUF2QjtBQUVDLEdBTlEsRUFNUCxFQUFDLHVCQUFzQixFQUF2QixFQU5PLENBbkdnWixFQXlHM1gsSUFBRyxDQUFDLFVBQVMsT0FBVCxFQUFpQixNQUFqQixFQUF3QixPQUF4QixFQUFnQzs7QUFFbEUsV0FBTyxPQUFQLEdBQWlCO0FBQ2YsZ0JBQVUsUUFBUSxzQkFBUixDQURLO0FBRWYsYUFBTztBQUNMLGNBQU07QUFDSixnQkFBTSxPQURGO0FBRUosb0JBQVUsSUFGTjtBQUdKLGtCQUFRO0FBSEosU0FERDtBQU1MLG1CQUFXO0FBQ1QsZ0JBQU0sTUFERztBQUVULG1CQUFTO0FBRkEsU0FOTjtBQVVMLG9CQUFZO0FBQ1YsZ0JBQU0sTUFESTtBQUVWLG1CQUFTO0FBRkM7QUFWUDtBQUZRLEtBQWpCO0FBbUJDLEdBckJnQyxFQXFCL0IsRUFBQyx3QkFBdUIsRUFBeEIsRUFyQitCLENBekd3WCxFQThIMVgsSUFBRyxDQUFDLFVBQVMsT0FBVCxFQUFpQixNQUFqQixFQUF3QixPQUF4QixFQUFnQztBQUNuRSxXQUFPLE9BQVAsR0FBaUIsd1pBQWpCO0FBRUMsR0FIaUMsRUFHaEMsRUFIZ0MsQ0E5SHVYLEVBaUluWixJQUFHLENBQUMsVUFBUyxPQUFULEVBQWlCLE1BQWpCLEVBQXdCLE9BQXhCLEVBQWdDOztBQUUxQyxRQUFJLGtCQUFrQixRQUFRLG1CQUFSLENBQXRCOztBQUVBLFFBQUksU0FBSixDQUFjLFFBQWQsRUFBd0IsZUFBeEI7QUFFQyxHQU5RLEVBTVAsRUFBQyxxQkFBb0IsRUFBckIsRUFOTyxDQWpJZ1osRUF1STdYLElBQUcsQ0FBQyxVQUFTLE9BQVQsRUFBaUIsTUFBakIsRUFBd0IsT0FBeEIsRUFBZ0M7O0FBRWhFLFFBQUksZ0JBQWdCO0FBQ2xCLGdCQUFVLEVBRFE7QUFFbEIsV0FBSyxRQUZhO0FBR2xCLFVBQUk7QUFIYyxLQUFwQjs7QUFNQSxhQUFTLE1BQVQsQ0FBZ0IsRUFBaEIsRUFBb0IsT0FBcEIsRUFBNkIsU0FBN0IsRUFBd0M7QUFDdEMsVUFBSSxPQUFKOztBQUVBLFNBQUcsYUFBSCxHQUFtQixRQUFRLFFBQTNCO0FBQ0EsU0FBRyxRQUFILEdBQWMsUUFBUSxRQUFSLElBQW9CLGNBQWMsR0FBaEQ7QUFDQSxTQUFHLE9BQUgsR0FBYSxRQUFRLE9BQVIsSUFBbUIsY0FBYyxFQUE5QztBQUNBLFNBQUcsU0FBSCxHQUFlLFNBQWY7QUFDQSxTQUFHLFNBQUgsR0FBZSxTQUFmO0FBQ0EsU0FBRyxJQUFILEdBQVUsSUFBVjs7QUFFQSxnQkFBVSxHQUFHLE1BQUgsQ0FBVSxpQkFBVixFQUE2QixVQUFVLE1BQVYsRUFBa0IsTUFBbEIsRUFBMEI7QUFDL0QsWUFBSSxVQUFVLEVBQUUsVUFBRixDQUFhLFFBQVEsR0FBckIsQ0FBZCxFQUF5QztBQUN2QyxrQkFBUSxHQUFSLENBQWEsU0FBRCxHQUFjLEdBQUcsV0FBakIsR0FBK0IsSUFBM0M7QUFDRCxTQUZELE1BRU8sSUFBSSxDQUFDLE1BQUQsSUFBVyxFQUFFLFVBQUYsQ0FBYyxRQUFRLEVBQXRCLENBQWYsRUFBMEM7QUFDL0Msa0JBQVEsRUFBUjtBQUNEO0FBQ0Q7QUFDQSxXQUFHLElBQUgsR0FBVSxLQUFWO0FBQ0QsT0FSUyxDQUFWO0FBU0Q7O0FBRUQsV0FBTyxPQUFQLEdBQWlCO0FBQ2YsZ0JBQVUsUUFBUSx1QkFBUixDQURLO0FBRWYsYUFBTztBQUNMLG9CQUFZO0FBQ1YsZ0JBQU0sTUFESTtBQUVWLG1CQUFTO0FBRkM7QUFEUCxPQUZRO0FBUWYsVUFSZSxrQkFRUjtBQUNMLGVBQU87QUFDTCx1QkFBYSxFQURSO0FBRUwseUJBQWUsY0FBYyxhQUZ4QjtBQUdMLG9CQUFVLGNBQWMsUUFIbkI7QUFJTCxtQkFBUyxjQUFjLE9BSmxCO0FBS0wsZ0JBQU0sS0FMRDtBQU1MLHFCQUFXLEtBTk47QUFPTCxxQkFBVyxLQVBOO0FBUUwsYUFSSyxlQVFELE9BUkMsRUFRUTtBQUNYLG1CQUFPLElBQVAsRUFBYSxPQUFiLEVBQXNCLElBQXRCO0FBQ0QsV0FWSTtBQVdMLGlCQVhLLG1CQVdHLE9BWEgsRUFXWTtBQUNmLG1CQUFPLElBQVAsRUFBYSxPQUFiLEVBQXNCLEtBQXRCO0FBQ0Q7QUFiSSxTQUFQO0FBZUQsT0F4QmM7O0FBeUJmLGFBQU87QUFDTCxZQURLLGdCQUNBLEdBREEsRUFDSztBQUNSLGNBQUksUUFBUSxJQUFSLElBQWdCLEtBQUssU0FBTCxDQUFlLE1BQWYsR0FBd0IsQ0FBNUMsRUFBK0M7QUFDN0MsaUJBQUssV0FBTCxHQUFtQixFQUFuQjtBQUNBLGlCQUFLLFNBQUwsQ0FBZSxDQUFmLEVBQWtCLFNBQWxCLENBQTRCLENBQTVCLEVBQStCLElBQS9CLENBQW9DLEtBQXBDLENBQTBDLEtBQTFDO0FBQ0Q7QUFDRjtBQU5JLE9BekJRO0FBaUNmLGVBQVM7QUFDUCxXQURPLGlCQUNEO0FBQ0osZUFBSyxTQUFMLEdBQWlCLElBQWpCO0FBQ0QsU0FITTtBQUlQLFVBSk8sZ0JBSUY7QUFDSCxlQUFLLFNBQUwsR0FBaUIsS0FBakI7QUFDRDtBQU5NO0FBakNNLEtBQWpCO0FBMkNDLEdBeEU4QixFQXdFN0IsRUFBQyx5QkFBd0IsRUFBekIsRUF4RTZCLENBdkkwWCxFQStNelgsSUFBRyxDQUFDLFVBQVMsT0FBVCxFQUFpQixNQUFqQixFQUF3QixPQUF4QixFQUFnQztBQUNwRSxXQUFPLE9BQVAsR0FBaUIsMDlCQUFqQjtBQUVDLEdBSGtDLEVBR2pDLEVBSGlDLENBL01zWCxFQWtOblosSUFBRyxDQUFDLFVBQVMsT0FBVCxFQUFpQixNQUFqQixFQUF3QixPQUF4QixFQUFnQzs7QUFFMUMsUUFBSSxlQUFlLFFBQVEsbUJBQVIsQ0FBbkI7O0FBRUEsUUFBSSxTQUFKLENBQWMsS0FBZCxFQUFxQixZQUFyQjtBQUVDLEdBTlEsRUFNUCxFQUFDLHFCQUFvQixFQUFyQixFQU5PLENBbE5nWixFQXdON1gsSUFBRyxDQUFDLFVBQVMsT0FBVCxFQUFpQixNQUFqQixFQUF3QixPQUF4QixFQUFnQzs7QUFFaEUsV0FBTyxPQUFQLEdBQWlCO0FBQ2YsZ0JBQVUsUUFBUSxvQkFBUixDQURLO0FBRWYsYUFBTztBQUNMLGlCQUFTO0FBQ1AsZ0JBQU0sTUFEQztBQUVQLG9CQUFVO0FBRkgsU0FESjtBQUtMLHVCQUFlO0FBQ2IsZ0JBQU07QUFETztBQUxWLE9BRlE7QUFXZixVQVhlLGtCQVdSO0FBQ0wsZUFBTztBQUNMLGlCQUFPLENBREY7QUFFTCxnQkFBTTtBQUZELFNBQVA7QUFJRCxPQWhCYzs7QUFpQmYsZ0JBQVU7QUFDUixZQURRLGtCQUNEO0FBQ0wsaUJBQVEsS0FBSyxPQUFMLENBQWEsTUFBYixJQUF1QixLQUFLLEtBQXBDO0FBQ0Q7QUFITyxPQWpCSztBQXNCZixhQUFPO0FBQ0wsZUFESyxxQkFDSztBQUNSLGVBQUssT0FBTCxDQUFhLElBQWIsQ0FBa0IsS0FBSyxLQUF2QixFQUE4QixPQUE5QixHQUF3QyxLQUFLLE9BQTdDO0FBQ0Q7QUFISSxPQXRCUTtBQTJCZixhQTNCZSxxQkEyQkw7QUFDUixhQUFLLE9BQUwsQ0FBYSxJQUFiLENBQWtCLElBQWxCLENBQXVCO0FBQ3JCLG1CQUFTLEtBQUssT0FETztBQUVyQixrQkFBUTtBQUZhLFNBQXZCO0FBSUQsT0FoQ2M7QUFpQ2YsV0FqQ2UsbUJBaUNQO0FBQ04sYUFBSyxJQUFJLEtBQVQsSUFBa0IsS0FBSyxPQUFMLENBQWEsU0FBL0IsRUFBMEM7QUFDeEMsY0FBSSxLQUFLLE9BQUwsQ0FBYSxTQUFiLENBQXVCLEtBQXZCLEVBQThCLEdBQTlCLElBQXFDLEtBQUssR0FBOUMsRUFBbUQ7QUFDakQsaUJBQUssS0FBTCxHQUFhLEtBQWI7QUFDQTtBQUNEO0FBQ0Y7QUFDRixPQXhDYzs7QUF5Q2YsY0FBUTtBQUNOLG1DQUEyQixTQUFTLFVBQVQsR0FBc0I7QUFDL0MsY0FBSSxPQUFPLEtBQUssYUFBWixLQUE4QixVQUFsQyxFQUE4QztBQUM1QyxpQkFBSyxhQUFMO0FBQ0Q7QUFDRjtBQUxLO0FBekNPLEtBQWpCO0FBa0RDLEdBcEQ4QixFQW9EN0IsRUFBQyxzQkFBcUIsRUFBdEIsRUFwRDZCLENBeE4wWCxFQTRRNVgsSUFBRyxDQUFDLFVBQVMsT0FBVCxFQUFpQixNQUFqQixFQUF3QixPQUF4QixFQUFnQztBQUNqRSxXQUFPLE9BQVAsR0FBaUIsZ0VBQWpCO0FBRUMsR0FIK0IsRUFHOUIsRUFIOEIsQ0E1UXlYLEVBK1FuWixJQUFHLENBQUMsVUFBUyxPQUFULEVBQWlCLE1BQWpCLEVBQXdCLE9BQXhCLEVBQWdDOztBQUUxQyxRQUFJLGdCQUFnQixRQUFRLG9CQUFSLENBQXBCOztBQUVBLFlBQVEsY0FBUjs7QUFFQSxRQUFJLFNBQUosQ0FBYyxNQUFkLEVBQXNCLGFBQXRCO0FBRUMsR0FSUSxFQVFQLEVBQUMsZ0JBQWUsRUFBaEIsRUFBbUIsc0JBQXFCLEVBQXhDLEVBUk8sQ0EvUWdaLEVBdVIxVyxJQUFHLENBQUMsVUFBUyxPQUFULEVBQWlCLE1BQWpCLEVBQXdCLE9BQXhCLEVBQWdDOztBQUVuRixXQUFPLE9BQVAsR0FBaUI7QUFDZixnQkFBVSxRQUFRLHFCQUFSLENBREs7QUFFZixhQUFPO0FBQ0wsZ0JBQVE7QUFDTixnQkFBTSxNQURBO0FBRU4sbUJBQVM7QUFGSDtBQURILE9BRlE7QUFRZixVQVJlLGtCQVFSO0FBQ0wsZUFBTztBQUNMLGdCQUFNO0FBREQsU0FBUDtBQUdELE9BWmM7QUFhZixXQWJlLG1CQWFQO0FBQ04sWUFBSSxLQUFLLElBQUwsQ0FBVSxDQUFWLENBQUosRUFBa0I7QUFDaEIsZUFBSyxJQUFMLENBQVUsQ0FBVixFQUFhLE1BQWIsR0FBc0IsSUFBdEI7QUFDRDtBQUNGLE9BakJjOztBQWtCZixlQUFTO0FBQ1AsMEJBRE8sOEJBQ1ksS0FEWixFQUNtQixFQURuQixFQUN1QjtBQUM1QixjQUFJLENBQUMsR0FBRyxRQUFSLEVBQWtCLEtBQUssTUFBTCxHQUFjLEtBQWQ7O0FBRWxCLGVBQUssSUFBSSxJQUFJLENBQVIsRUFBVyxJQUFJLEtBQUssSUFBTCxDQUFVLE1BQTlCLEVBQXNDLElBQUksQ0FBMUMsRUFBNkMsR0FBN0MsRUFBa0Q7QUFDaEQsaUJBQUssSUFBTCxDQUFVLENBQVYsRUFBYSxNQUFiLEdBQXVCLEtBQUssS0FBNUI7QUFDQSxnQkFBSSxLQUFLLElBQUwsQ0FBVSxDQUFWLEVBQWEsTUFBakIsRUFBeUI7QUFDdkIsbUJBQUssU0FBTCxDQUFlLENBQWYsRUFBa0IsS0FBbEIsQ0FBd0IsMkJBQXhCO0FBQ0Q7QUFDRjtBQUNGO0FBVk07QUFsQk0sS0FBakI7QUFnQ0MsR0FsQ2lELEVBa0NoRCxFQUFDLHVCQUFzQixFQUF2QixFQWxDZ0QsQ0F2UnVXLEVBeVQzWCxJQUFHLENBQUMsVUFBUyxPQUFULEVBQWlCLE1BQWpCLEVBQXdCLE9BQXhCLEVBQWdDO0FBQ2xFLFdBQU8sT0FBUCxHQUFpQixrWUFBakI7QUFFQyxHQUhnQyxFQUcvQixFQUgrQixDQXpUd1gsRUE0VG5aLElBQUcsQ0FBQyxVQUFTLE9BQVQsRUFBaUIsTUFBakIsRUFBd0IsT0FBeEIsRUFBZ0M7O0FBRTFDLFFBQUkscUJBQXFCLFFBQVEseUJBQVIsQ0FBekI7O0FBRUEsUUFBSSxTQUFKLENBQWMsV0FBZCxFQUEyQixrQkFBM0I7QUFFQyxHQU5RLEVBTVAsRUFBQywyQkFBMEIsRUFBM0IsRUFOTyxDQTVUZ1osRUFrVXZYLElBQUcsQ0FBQyxVQUFTLE9BQVQsRUFBaUIsTUFBakIsRUFBd0IsT0FBeEIsRUFBZ0M7O0FBRXRFLFdBQU8sT0FBUCxHQUFpQjtBQUNmLGdCQUFVLFFBQVEsMEJBQVIsQ0FESztBQUVmLFVBRmUsa0JBRVI7QUFDTCxlQUFPO0FBQ0wsZ0JBQU0sV0FERDtBQUVMLG1CQUFTO0FBRkosU0FBUDtBQUlELE9BUGM7O0FBUWYsYUFBTztBQUNMLGlCQUFTO0FBQ1AsZ0JBQU0sT0FEQztBQUVQLG9CQUFVLElBRkg7QUFHUCxrQkFBUTtBQUhELFNBREo7QUFNTCxlQUFPO0FBQ0wsZ0JBQU0sTUFERDtBQUVMLG9CQUFVO0FBRkwsU0FORjtBQVVMLGtCQUFVO0FBQ1IsZ0JBQU0sT0FERTtBQUVSLHNCQUFZO0FBRko7QUFWTCxPQVJRO0FBdUJmLGVBQVM7QUFDUCxlQURPLHFCQUNHO0FBQ1IsZUFBSyxPQUFMLEdBQWdCLEtBQUssUUFBTixHQUFrQixDQUFDLEtBQUssT0FBeEIsR0FBa0MsS0FBakQ7QUFDQSxpQkFBTyxDQUFDLEtBQUssT0FBYjtBQUNEO0FBSk07QUF2Qk0sS0FBakI7QUErQkMsR0FqQ29DLEVBaUNuQyxFQUFDLDRCQUEyQixFQUE1QixFQWpDbUMsQ0FsVW9YLEVBbVd0WCxJQUFHLENBQUMsVUFBUyxPQUFULEVBQWlCLE1BQWpCLEVBQXdCLE9BQXhCLEVBQWdDO0FBQ3ZFLFdBQU8sT0FBUCxHQUFpQixnRkFBakI7QUFFQyxHQUhxQyxFQUdwQyxFQUhvQyxDQW5XbVgsRUFzV25aLElBQUcsQ0FBQyxVQUFTLE9BQVQsRUFBaUIsTUFBakIsRUFBd0IsT0FBeEIsRUFBZ0M7O0FBRTFDLFFBQUksaUJBQWlCLFFBQVEscUJBQVIsQ0FBckI7O0FBRUEsUUFBSSxTQUFKLENBQWMsT0FBZCxFQUF1QixjQUF2QjtBQUVDLEdBTlEsRUFNUCxFQUFDLHVCQUFzQixFQUF2QixFQU5PLENBdFdnWixFQTRXM1gsSUFBRyxDQUFDLFVBQVMsT0FBVCxFQUFpQixNQUFqQixFQUF3QixPQUF4QixFQUFnQzs7QUFFbEUsV0FBTyxPQUFQLEdBQWlCO0FBQ2YsZ0JBQVUsUUFBUSxzQkFBUixDQURLO0FBRWYsYUFBTztBQUNMLGdCQUFRO0FBQ04sZ0JBQU0sTUFEQTtBQUVOLHNCQUFZO0FBRk4sU0FESDtBQUtMLGdCQUFRO0FBQ04sZ0JBQU0sTUFEQTtBQUVOLHNCQUFZO0FBRk4sU0FMSDtBQVNMLGVBQU87QUFDTCxnQkFBTSxPQUREO0FBRUwsc0JBQVk7QUFGUCxTQVRGO0FBYUwsd0JBQWdCO0FBQ2QsZ0JBQU07QUFEUTtBQWJYLE9BRlE7QUFtQmYsZUFBUztBQUNQLGtCQURPLHNCQUNJLEtBREosRUFDVztBQUNoQixjQUFJLEtBQUssS0FBTCxJQUFjLENBQUMsS0FBSyxPQUFMLEVBQW5CLEVBQW1DO0FBQ2pDLGtCQUFNLGNBQU47QUFDRDs7QUFFRCxjQUFJLEtBQUssS0FBTCxJQUFjLEtBQUssT0FBTCxFQUFkLElBQWdDLE9BQU8sS0FBSyxjQUFaLEtBQStCLFVBQW5FLEVBQStFO0FBQzdFLGlCQUFLLGNBQUw7QUFDRDtBQUNGLFNBVE07QUFVUCxlQVZPLHFCQVVHO0FBQ1IsY0FBSSxPQUFPLElBQVg7Y0FDRSxjQUFjLElBRGhCOztBQUdBLGVBQUssSUFBSSxJQUFJLENBQVIsRUFBVyxJQUFJLEtBQUssU0FBTCxDQUFlLE1BQW5DLEVBQTJDLElBQUksQ0FBL0MsRUFBa0QsR0FBbEQsRUFBdUQ7QUFDckQsZ0JBQUksRUFBRSxVQUFGLENBQWEsS0FBSyxTQUFMLENBQWUsQ0FBZixFQUFrQixPQUEvQixDQUFKLEVBQTZDOztBQUMzQyw0QkFBYyxlQUFlLEtBQUssU0FBTCxDQUFlLENBQWYsRUFBa0IsT0FBbEIsRUFBN0I7QUFDRDtBQUNGOztBQUVELGlCQUFPLFdBQVA7QUFDRDtBQXJCTTtBQW5CTSxLQUFqQjtBQTRDQyxHQTlDZ0MsRUE4Qy9CLEVBQUMsd0JBQXVCLEVBQXhCLEVBOUMrQixDQTVXd1gsRUEwWjFYLElBQUcsQ0FBQyxVQUFTLE9BQVQsRUFBaUIsTUFBakIsRUFBd0IsT0FBeEIsRUFBZ0M7QUFDbkUsV0FBTyxPQUFQLEdBQWlCLGtSQUFqQjtBQUVDLEdBSGlDLEVBR2hDLEVBSGdDLENBMVp1WCxFQTZablosSUFBRyxDQUFDLFVBQVMsT0FBVCxFQUFpQixNQUFqQixFQUF3QixPQUF4QixFQUFnQzs7QUFFMUMsUUFBSSxrQkFBa0IsUUFBUSxzQkFBUixDQUF0Qjs7QUFFQSxRQUFJLFNBQUosQ0FBYyxRQUFkLEVBQXdCLGVBQXhCO0FBRUMsR0FOUSxFQU1QLEVBQUMsd0JBQXVCLEVBQXhCLEVBTk8sQ0E3WmdaLEVBbWExWCxJQUFHLENBQUMsVUFBUyxPQUFULEVBQWlCLE1BQWpCLEVBQXdCLE9BQXhCLEVBQWdDOztBQUVuRSxRQUFJLGtCQUFrQixRQUFRLHNCQUFSLENBQXRCOztBQUVBLFdBQU8sT0FBUCxHQUFpQjtBQUNmLGdCQUFVLFFBQVEsdUJBQVIsQ0FESztBQUVmLGFBQU87QUFDTCxlQUFPO0FBQ0wsZ0JBQU07QUFERCxTQURGO0FBSUwsY0FBTTtBQUNKLGdCQUFNO0FBREYsU0FKRDtBQU9MLGNBQU07QUFDSixnQkFBTSxNQURGO0FBRUosb0JBQVU7QUFGTixTQVBEO0FBV0wscUJBQWE7QUFDWCxnQkFBTTtBQURLLFNBWFI7QUFjTCxjQUFNO0FBQ0osZ0JBQU07QUFERixTQWREO0FBaUJMLGVBQU87QUFDTCxnQkFBTSxNQUREO0FBRUwsb0JBQVUsSUFGTDtBQUdMLGtCQUFRO0FBSEgsU0FqQkY7QUFzQkwsa0JBQVU7QUFDUixnQkFBTSxPQURFO0FBRVIsc0JBQVk7QUFGSixTQXRCTDtBQTBCTCxpQkFBUztBQUNQLGdCQUFNLE1BREM7QUFFUCxzQkFBWTtBQUZMO0FBMUJKLE9BRlE7QUFpQ2YsVUFqQ2Usa0JBaUNSO0FBQ0wsZUFBTztBQUNMLGlCQUFPO0FBREYsU0FBUDtBQUdELE9BckNjOztBQXNDZixlQUFTO0FBQ1AsZUFETyxxQkFDRztBQUNSLGVBQUssUUFBTDtBQUNBLGlCQUFRLEtBQUssS0FBTCxDQUFXLE1BQVgsS0FBc0IsQ0FBOUI7QUFDRCxTQUpNOztBQUtQLDBCQUFrQixFQUFFLFFBQUYsQ0FBVyxZQUFZO0FBQ3ZDLGVBQUssUUFBTDtBQUNELFNBRmlCLEVBRWYsR0FGZSxDQUxYO0FBUVAsZ0JBUk8sc0JBUUk7QUFDVCxjQUFJLFFBQVEsS0FBSyxLQUFMLElBQWMsS0FBSyxJQUEvQjs7O0FBR0EsY0FBSSxLQUFLLFFBQUwsSUFBaUIsS0FBSyxLQUFMLENBQVcsTUFBWCxLQUFzQixDQUEzQyxFQUE4QztBQUM1QyxpQkFBSyxLQUFMLEdBQWEsUUFBUSxjQUFyQjs7O0FBR0QsV0FKRCxNQUlPLElBQUksZ0JBQWdCLGNBQWhCLENBQStCLEtBQUssSUFBcEMsS0FBNkMsQ0FBQyxnQkFBZ0IsS0FBSyxJQUFyQixFQUEyQixLQUEzQixDQUFpQyxJQUFqQyxDQUFzQyxLQUFLLEtBQTNDLENBQWxELEVBQXFHO0FBQzFHLG1CQUFLLEtBQUwsR0FBYSxnQkFBZ0IsS0FBSyxJQUFyQixFQUEyQixZQUF4Qzs7O0FBR0QsYUFKTSxNQUlBLElBQUksS0FBSyxPQUFMLElBQWdCLEtBQUssT0FBTCxDQUFhLEtBQWIsS0FBdUIsS0FBSyxLQUFoRCxFQUF1RDtBQUM1RCxxQkFBSyxLQUFMLEdBQWEsZ0JBQWdCLEtBQUssT0FBTCxDQUFhLEtBQTFDOzs7QUFHRCxlQUpNLE1BSUE7QUFDTCx1QkFBSyxLQUFMLEdBQWEsRUFBYjtBQUNEO0FBQ0Y7QUEzQk07QUF0Q00sS0FBakI7QUFxRUMsR0F6RWlDLEVBeUVoQyxFQUFDLHlCQUF3QixFQUF6QixFQUE0Qix3QkFBdUIsRUFBbkQsRUF6RWdDLENBbmF1WCxFQTRlL1YsSUFBRyxDQUFDLFVBQVMsT0FBVCxFQUFpQixNQUFqQixFQUF3QixPQUF4QixFQUFnQztBQUM5RixXQUFPLE9BQVAsR0FBaUIsdXVCQUFqQjtBQUVDLEdBSDRELEVBRzNELEVBSDJELENBNWU0VixFQStlblosSUFBRyxDQUFDLFVBQVMsT0FBVCxFQUFpQixNQUFqQixFQUF3QixPQUF4QixFQUFnQzs7QUFHMUMsV0FBTyxPQUFQLEdBQWlCO0FBQ2YsYUFBTztBQUNMLGVBQU8sd0pBREY7QUFFTCxzQkFBYztBQUZULE9BRFE7QUFLZixXQUFLO0FBQ0gsZUFBTyw2RkFESjtBQUVILHNCQUFjO0FBRlgsT0FMVTtBQVNmLGNBQVE7QUFDTixlQUFPLFVBREQ7QUFFTixzQkFBYztBQUZSO0FBVE8sS0FBakI7QUFlQyxHQWxCUSxFQWtCUCxFQWxCTyxDQS9lZ1osRUFpZ0JuWixJQUFHLENBQUMsVUFBUyxPQUFULEVBQWlCLE1BQWpCLEVBQXdCLE9BQXhCLEVBQWdDOztBQUUxQyxRQUFJLG1CQUFtQixRQUFRLHVCQUFSLENBQXZCOztBQUVBLFFBQUksU0FBSixDQUFjLFNBQWQsRUFBeUIsZ0JBQXpCO0FBRUMsR0FOUSxFQU1QLEVBQUMseUJBQXdCLEVBQXpCLEVBTk8sQ0FqZ0JnWixFQXVnQnpYLElBQUcsQ0FBQyxVQUFTLE9BQVQsRUFBaUIsTUFBakIsRUFBd0IsT0FBeEIsRUFBZ0M7O0FBRXBFLFdBQU8sT0FBUCxHQUFpQjtBQUNmLGdCQUFVLFFBQVEsd0JBQVIsQ0FESztBQUVmLGFBQU87QUFDTCxlQUFPO0FBQ0wsZ0JBQU0sTUFERDtBQUVMLHNCQUFZO0FBRlAsU0FERjtBQUtMLGtCQUFVO0FBQ1IsZ0JBQU0sTUFERTtBQUVSLG9CQUFVLElBRkY7QUFHUixrQkFBUTtBQUhBLFNBTEw7QUFVTCxpQkFBUztBQUNQLGdCQUFNLEtBREM7QUFFUCxvQkFBVTtBQUZILFNBVko7QUFjTCxrQkFBVTtBQUNSLGdCQUFNLE9BREU7QUFFUixzQkFBWTtBQUZKO0FBZEwsT0FGUTtBQXFCZixVQXJCZSxrQkFxQlI7QUFDTCxlQUFPO0FBQ0wsbUJBQVM7QUFESixTQUFQO0FBR0QsT0F6QmM7QUEwQmYsV0ExQmUsbUJBMEJQO0FBQ04sWUFBSSxPQUFPLElBQVg7WUFDRSxnQkFBZ0IsRUFBRSxTQUFGLENBQVksS0FBSyxPQUFqQixFQUEwQixVQUFDLE1BQUQ7QUFBQSxpQkFBWSxPQUFPLEtBQVAsS0FBaUIsS0FBSyxRQUFsQztBQUFBLFNBQTFCLENBRGxCOztBQUdBLFlBQUksS0FBSyxRQUFMLElBQWlCLGtCQUFrQixDQUFDLENBQXhDLEVBQTJDO0FBQ3pDLGVBQUssUUFBTCxHQUFnQixLQUFLLE9BQUwsQ0FBYSxDQUFiLEVBQWdCLEtBQWhDO0FBQ0Q7QUFDRixPQWpDYzs7QUFrQ2YsZUFBUztBQUNQLGVBRE8scUJBQ0c7QUFDUixlQUFLLE9BQUwsR0FBZSxDQUFDLEtBQUssUUFBTixJQUFrQixLQUFLLFFBQUwsQ0FBYyxNQUFkLEdBQXVCLENBQXhEO0FBQ0EsaUJBQU8sS0FBSyxPQUFaO0FBQ0Q7QUFKTTtBQWxDTSxLQUFqQjtBQTBDQyxHQTVDa0MsRUE0Q2pDLEVBQUMsMEJBQXlCLEVBQTFCLEVBNUNpQyxDQXZnQnNYLEVBbWpCeFgsSUFBRyxDQUFDLFVBQVMsT0FBVCxFQUFpQixNQUFqQixFQUF3QixPQUF4QixFQUFnQztBQUNyRSxXQUFPLE9BQVAsR0FBaUIseVJBQWpCO0FBRUMsR0FIbUMsRUFHbEMsRUFIa0MsQ0FuakJxWCxFQXNqQm5aLElBQUcsQ0FBQyxVQUFTLE9BQVQsRUFBaUIsTUFBakIsRUFBd0IsT0FBeEIsRUFBZ0M7O0FBRTFDLFlBQVEsNkJBQVI7QUFDQSxZQUFRLDJCQUFSO0FBQ0EsWUFBUSw2QkFBUjtBQUNBLFlBQVEsK0JBQVI7QUFDQSxZQUFRLCtCQUFSO0FBQ0EsWUFBUSwyQkFBUjtBQUNBLFlBQVEsNkJBQVI7QUFDQSxZQUFRLCtCQUFSO0FBQ0EsWUFBUSxpQ0FBUjtBQUNBLFlBQVEscUNBQVI7QUFFQyxHQWJRLEVBYVAsRUFBQywrQkFBOEIsQ0FBL0IsRUFBaUMsNkJBQTRCLENBQTdELEVBQStELGlDQUFnQyxDQUEvRixFQUFpRywrQkFBOEIsRUFBL0gsRUFBa0ksaUNBQWdDLEVBQWxLLEVBQXFLLDZCQUE0QixFQUFqTSxFQUFvTSx1Q0FBc0MsRUFBMU8sRUFBNk8sK0JBQThCLEVBQTNRLEVBQThRLGlDQUFnQyxFQUE5UyxFQUFpVCxtQ0FBa0MsRUFBblYsRUFiTyxDQXRqQmdaLEVBQXpaLEVBbWtCMlYsRUFua0IzVixFQW1rQjhWLENBQUMsRUFBRCxDQW5rQjlWIiwiZmlsZSI6Im15dWkuanMiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3Rocm93IG5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIil9dmFyIGY9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGYuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sZixmLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSh7MTpbZnVuY3Rpb24ocmVxdWlyZSxtb2R1bGUsZXhwb3J0cyl7XG5cbnZhciBhbGVydENvbXBvbmVudCA9IHJlcXVpcmUoJy4vYWxlcnRDb21wb25lbnQuanMnKTtcblxuVnVlLmNvbXBvbmVudCgnYWxlcnQnLCBhbGVydENvbXBvbmVudCk7XG5cbn0se1wiLi9hbGVydENvbXBvbmVudC5qc1wiOjJ9XSwyOltmdW5jdGlvbihyZXF1aXJlLG1vZHVsZSxleHBvcnRzKXtcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIHRlbXBsYXRlOiByZXF1aXJlKCcuL2FsZXJ0VGVtcGxhdGUuaHRtbCcpLFxuICBwcm9wczoge1xuICAgIGNhbkNsb3NlOiB7XG4gICAgICB0eXBlOiBCb29sZWFuLFxuICAgICAgZGVmYXVsdHNUbzogZmFsc2VcbiAgICB9XG4gIH0sXG4gIGRhdGEoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIG1lc3NhZ2VzOiBbXSxcbiAgICAgIHR5cGU6ICcnXG4gICAgfTtcbiAgfSxcbiAgbWV0aG9kczoge1xuICAgIGNsb3NlKCkge1xuICAgICAgdGhpcy5tZXNzYWdlcyA9IFtdO1xuICAgIH0sXG4gICAgYWRkTWVzc2FnZSh0eXBlLCBtZXNzYWdlKSB7XG4gICAgICBpZiAodGhpcy50eXBlICE9PSB0eXBlKSB7XG4gICAgICAgIHRoaXMudHlwZSA9IHR5cGU7XG4gICAgICAgIHRoaXMubWVzc2FnZXMgPSBbbWVzc2FnZV07XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLm1lc3NhZ2VzLnB1c2gobWVzc2FnZSk7XG4gICAgICB9XG4gICAgfSxcbiAgICBtZXNzYWdlKG1lc3NhZ2UpIHtcbiAgICAgIHRoaXMuYWRkTWVzc2FnZSgnJywgbWVzc2FnZSk7XG4gICAgfSxcbiAgICBwcmltYXJ5KG1lc3NhZ2UpIHtcbiAgICAgIHRoaXMuYWRkTWVzc2FnZSgncHJpbWFyeScsIG1lc3NhZ2UpO1xuICAgIH0sXG4gICAgc2Vjb25kYXJ5KG1lc3NhZ2UpIHtcbiAgICAgIHRoaXMuYWRkTWVzc2FnZSgnc2Vjb25kYXJ5JywgbWVzc2FnZSk7XG4gICAgfSxcbiAgICBzdWNjZXNzKG1lc3NhZ2UpIHtcbiAgICAgIHRoaXMuYWRkTWVzc2FnZSgnc3VjY2VzcycsIG1lc3NhZ2UpO1xuICAgIH0sXG4gICAgd2FybmluZyhtZXNzYWdlKSB7XG4gICAgICB0aGlzLmFkZE1lc3NhZ2UoJ3dhcm5pbmcnLCBtZXNzYWdlKTtcbiAgICB9LFxuICAgIGFsZXJ0KG1lc3NhZ2UpIHtcbiAgICAgIHRoaXMuYWRkTWVzc2FnZSgnYWxlcnQnLCBtZXNzYWdlKTtcbiAgICB9XG4gIH1cbn07XG5cbn0se1wiLi9hbGVydFRlbXBsYXRlLmh0bWxcIjozfV0sMzpbZnVuY3Rpb24ocmVxdWlyZSxtb2R1bGUsZXhwb3J0cyl7XG5tb2R1bGUuZXhwb3J0cyA9IFwiXFxuPGRpdiBjbGFzcz1cXFwiYWxlcnQtYm94XFxcIiB2LWJpbmQ6Y2xhc3M9XFxcIntcXG4gICAgY2FsbG91dDogdHJ1ZSxcXG4gICAgcHJpbWFyeTogdHlwZSA9PT0gJ3ByaW1hcnknLFxcbiAgICBzZWNvbmRhcnk6IHR5cGUgPT09ICdzZWNvbmRhcnknLFxcbiAgICBzdWNjZXNzOiB0eXBlID09PSAnc3VjY2VzcycsXFxuICAgIHdhcm5pbmc6IHR5cGUgPT09ICd3YXJuaW5nJyxcXG4gICAgYWxlcnQ6IHR5cGUgPT09ICdhbGVydCdcXG4gIH1cXFwiIHRyYW5zaXRpb249XFxcImZhZGVcXFwiIHYtc2hvdz1cXFwibWVzc2FnZXMubGVuZ3RoID4gMFxcXCI+XFxuICA8dWw+XFxuICAgIDxsaSB2LWZvcj1cXFwibWVzc2FnZSBpbiBtZXNzYWdlc1xcXCIgdHJhY2stYnk9XFxcIiRpbmRleFxcXCI+e3sgbWVzc2FnZSB9fTwvbGk+XFxuICA8L3VsPlxcbiAgPGJ1dHRvbiBjbGFzcz1cXFwiY2xvc2UtYnV0dG9uXFxcIiBhcmlhLWxhYmVsPVxcXCJEaXNtaXNzIGFsZXJ0XFxcIiB0eXBlPVxcXCJidXR0b25cXFwiIHYtaWY9XFxcImNhbkNsb3NlXFxcIiB2LW9uOmNsaWNrPVxcXCJjbG9zZSgpXFxcIj5cXG4gICAgPHNwYW4gYXJpYS1oaWRkZW49XFxcInRydWVcXFwiPiZ0aW1lczs8L3NwYW4+XFxuICA8L2J1dHRvbj5cXG48L2Rpdj5cXG5cIjtcblxufSx7fV0sNDpbZnVuY3Rpb24ocmVxdWlyZSxtb2R1bGUsZXhwb3J0cyl7XG5cbnZhciBpY29uQ29tcG9uZW50ID0gcmVxdWlyZSgnLi9pY29uQ29tcG9uZW50LmpzJyk7XG5cblZ1ZS5jb21wb25lbnQoJ2ljb24nLCBpY29uQ29tcG9uZW50KTtcblxufSx7XCIuL2ljb25Db21wb25lbnQuanNcIjo1fV0sNTpbZnVuY3Rpb24ocmVxdWlyZSxtb2R1bGUsZXhwb3J0cyl7XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICB0ZW1wbGF0ZTogcmVxdWlyZSgnLi9pY29uVGVtcGxhdGUuaHRtbCcpLFxuICBwcm9wczogWyduYW1lJ11cbn07XG5cbn0se1wiLi9pY29uVGVtcGxhdGUuaHRtbFwiOjZ9XSw2OltmdW5jdGlvbihyZXF1aXJlLG1vZHVsZSxleHBvcnRzKXtcbm1vZHVsZS5leHBvcnRzID0gXCJcXG48c3ZnIGNsYXNzPVxcXCJpY29uLWltYWdlIHt7IG5hbWUgfX1cXFwiPlxcbiAgPHVzZSB4bWxuczp4bGluaz1cXFwiaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGlua1xcXCIgeGxpbms6aHJlZj1cXFwiI2ljb24te3sgbmFtZSB9fVxcXCI+PC91c2U+XFxuPC9zdmc+XFxuXCI7XG5cbn0se31dLDc6W2Z1bmN0aW9uKHJlcXVpcmUsbW9kdWxlLGV4cG9ydHMpe1xuXG52YXIgbG9hZGVyQ29tcG9uZW50ID0gcmVxdWlyZSgnLi9sb2FkZXJDb21wb25lbnQuanMnKTtcblxuVnVlLmNvbXBvbmVudCgnbG9hZGVyJywgbG9hZGVyQ29tcG9uZW50KTtcblxufSx7XCIuL2xvYWRlckNvbXBvbmVudC5qc1wiOjh9XSw4OltmdW5jdGlvbihyZXF1aXJlLG1vZHVsZSxleHBvcnRzKXtcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIHRlbXBsYXRlOiByZXF1aXJlKCcuL2xvYWRlclRlbXBsYXRlLmh0bWwnKSxcbiAgZGF0YSgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgZ3JlZXRpbmc6ICdsb2FkZXIgY29tcG9uZW50JyxcbiAgICB9O1xuICB9LFxuICBtZXRob2RzOiB7XG4gICAgc2F5SGkoKSB7XG4gICAgICBjb25zb2xlLmxvZygnaGkhJyk7XG4gICAgfVxuICB9XG59O1xuXG59LHtcIi4vbG9hZGVyVGVtcGxhdGUuaHRtbFwiOjl9XSw5OltmdW5jdGlvbihyZXF1aXJlLG1vZHVsZSxleHBvcnRzKXtcbm1vZHVsZS5leHBvcnRzID0gXCI8ZGl2IGNsYXNzPVxcXCJsb2FkZXJcXFwiPkxvYWRpbmcuLi48L2Rpdj5cXG5cIjtcblxufSx7fV0sMTA6W2Z1bmN0aW9uKHJlcXVpcmUsbW9kdWxlLGV4cG9ydHMpe1xuXG52YXIgbW9kYWxDb21wb25lbnQgPSByZXF1aXJlKCcuL21vZGFsQ29tcG9uZW50LmpzJyk7XG5cblZ1ZS5jb21wb25lbnQoJ21vZGFsJywgbW9kYWxDb21wb25lbnQpO1xuXG59LHtcIi4vbW9kYWxDb21wb25lbnQuanNcIjoxMX1dLDExOltmdW5jdGlvbihyZXF1aXJlLG1vZHVsZSxleHBvcnRzKXtcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIHRlbXBsYXRlOiByZXF1aXJlKCcuL21vZGFsVGVtcGxhdGUuaHRtbCcpLFxuICBwcm9wczoge1xuICAgIHNob3c6IHtcbiAgICAgIHR5cGU6IEJvb2xlYW4sXG4gICAgICByZXF1aXJlZDogdHJ1ZSxcbiAgICAgIHR3b1dheTogdHJ1ZVxuICAgIH0sXG4gICAgbW9kYWxTaXplOiB7XG4gICAgICB0eXBlOiBTdHJpbmcsXG4gICAgICBkZWZhdWx0OiAnZnVsbCdcbiAgICB9LFxuICAgIHRyYW5zaXRpb246IHtcbiAgICAgIHR5cGU6IFN0cmluZyxcbiAgICAgIGRlZmF1bHQ6ICd6b29tLW91dCdcbiAgICB9XG4gIH1cbn07XG5cbn0se1wiLi9tb2RhbFRlbXBsYXRlLmh0bWxcIjoxMn1dLDEyOltmdW5jdGlvbihyZXF1aXJlLG1vZHVsZSxleHBvcnRzKXtcbm1vZHVsZS5leHBvcnRzID0gXCJcXG48ZGl2IGNsYXNzPVxcXCJtb2RhbFxcXCIgOnRyYW5zaXRpb249XFxcInRyYW5zaXRpb25cXFwiIHYtc2hvdz1cXFwic2hvd1xcXCI+XFxuICA8ZGl2IHYtb246Y2xpY2sucHJldmVudCA6Y2xhc3M9XFxcInsgJ21vZGFsLWNvbnRlbnQnOiB0cnVlLCAnc21hbGwnOiBtb2RhbFNpemUgPT09ICdzbWFsbCcsICdmdWxsJzogbW9kYWxTaXplID09PSAnZnVsbCcgfVxcXCI+XFxuICAgIDxkaXYgY2xhc3M9XFxcIm1vZGFsLWhlYWRlclxcXCI+XFxuICAgICAgPHNsb3QgbmFtZT1cXFwiaGVhZGVyXFxcIj48L3Nsb3Q+XFxuICAgIDwvZGl2PlxcbiAgICA8c2xvdCBuYW1lPVxcXCJjb250ZW50XFxcIj48L3Nsb3Q+XFxuICAgIDxzcGFuIHYtb246Y2xpY2s9XFxcInNob3cgPSBmYWxzZVxcXCIgYXJpYS1sYWJlbD1cXFwiQ2xvc2VcXFwiPiYjMjE1Ozwvc3Bhbj5cXG4gIDwvZGl2PlxcbjwvZGl2PlxcblwiO1xuXG59LHt9XSwxMzpbZnVuY3Rpb24ocmVxdWlyZSxtb2R1bGUsZXhwb3J0cyl7XG5cbnZhciBwcm9tcHRDb21wb25lbnQgPSByZXF1aXJlKCcuL3Byb21wdENvbXBvbmVudCcpO1xuXG5WdWUuY29tcG9uZW50KCdwcm9tcHQnLCBwcm9tcHRDb21wb25lbnQpO1xuXG59LHtcIi4vcHJvbXB0Q29tcG9uZW50XCI6MTR9XSwxNDpbZnVuY3Rpb24ocmVxdWlyZSxtb2R1bGUsZXhwb3J0cyl7XG5cbnZhciBkZWZhdWx0TGFiZWxzID0ge1xuICBxdWVzdGlvbjogJycsXG4gIHllczogJ1N1Ym1pdCcsXG4gIG5vOiAnQ2FuY2VsJ1xufTtcblxuZnVuY3Rpb24gcHJvbXB0KHZtLCBvcHRpb25zLCBzaG93SW5wdXQpIHtcbiAgdmFyIHVud2F0Y2g7XG5cbiAgdm0ucXVlc3Rpb25MYWJlbCA9IG9wdGlvbnMucXVlc3Rpb247XG4gIHZtLnllc0xhYmVsID0gb3B0aW9ucy55ZXNMYWJlbCB8fCBkZWZhdWx0TGFiZWxzLnllcztcbiAgdm0ubm9MYWJlbCA9IG9wdGlvbnMubm9MYWJlbCB8fCBkZWZhdWx0TGFiZWxzLm5vO1xuICB2bS5jb25maXJtZWQgPSB1bmRlZmluZWQ7XG4gIHZtLnNob3dJbnB1dCA9IHNob3dJbnB1dDtcbiAgdm0uc2hvdyA9IHRydWU7XG5cbiAgdW53YXRjaCA9IHZtLiR3YXRjaCgnJGRhdGEuY29uZmlybWVkJywgZnVuY3Rpb24gKG5ld1ZhbCwgb2xkVmFsKSB7XG4gICAgaWYgKG5ld1ZhbCAmJiBfLmlzRnVuY3Rpb24ob3B0aW9ucy55ZXMpKSB7XG4gICAgICBvcHRpb25zLnllcygoc2hvd0lucHV0KSA/IHZtLnByb21wdFZhbHVlIDogbnVsbCk7XG4gICAgfSBlbHNlIGlmICghbmV3VmFsICYmIF8uaXNGdW5jdGlvbiAob3B0aW9ucy5ubykpIHtcbiAgICAgIG9wdGlvbnMubm8oKTtcbiAgICB9XG4gICAgdW53YXRjaCgpO1xuICAgIHZtLnNob3cgPSBmYWxzZTtcbiAgfSk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICB0ZW1wbGF0ZTogcmVxdWlyZSgnLi9wcm9tcHRUZW1wbGF0ZS5odG1sJyksXG4gIHByb3BzOiB7XG4gICAgdHJhbnNpdGlvbjoge1xuICAgICAgdHlwZTogU3RyaW5nLFxuICAgICAgZGVmYXVsdDogJ3pvb20tb3V0J1xuICAgIH1cbiAgfSxcbiAgZGF0YSgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgcHJvbXB0VmFsdWU6ICcnLFxuICAgICAgcXVlc3Rpb25MYWJlbDogZGVmYXVsdExhYmVscy5xdWVzdGlvbkxhYmVsLFxuICAgICAgeWVzTGFiZWw6IGRlZmF1bHRMYWJlbHMueWVzTGFiZWwsXG4gICAgICBub0xhYmVsOiBkZWZhdWx0TGFiZWxzLm5vTGFiZWwsXG4gICAgICBzaG93OiBmYWxzZSxcbiAgICAgIGNvbmZpcm1lZDogZmFsc2UsXG4gICAgICBzaG93SW5wdXQ6IGZhbHNlLFxuICAgICAgYXNrKG9wdGlvbnMpIHtcbiAgICAgICAgcHJvbXB0KHRoaXMsIG9wdGlvbnMsIHRydWUpO1xuICAgICAgfSxcbiAgICAgIGNvbmZpcm0ob3B0aW9ucykge1xuICAgICAgICBwcm9tcHQodGhpcywgb3B0aW9ucywgZmFsc2UpO1xuICAgICAgfVxuICAgIH07XG4gIH0sXG4gIHdhdGNoOiB7XG4gICAgc2hvdyh2YWwpIHtcbiAgICAgIGlmICh2YWwgPT09IHRydWUgJiYgdGhpcy4kY2hpbGRyZW4ubGVuZ3RoID4gMCkge1xuICAgICAgICB0aGlzLnByb21wdFZhbHVlID0gJyc7XG4gICAgICAgIHRoaXMuJGNoaWxkcmVuWzBdLiRjaGlsZHJlblswXS4kZWxzLmlucHV0LmZvY3VzKCk7XG4gICAgICB9XG4gICAgfVxuICB9LFxuICBtZXRob2RzOiB7XG4gICAgeWVzKCkge1xuICAgICAgdGhpcy5jb25maXJtZWQgPSB0cnVlO1xuICAgIH0sXG4gICAgbm8oKSB7XG4gICAgICB0aGlzLmNvbmZpcm1lZCA9IGZhbHNlO1xuICAgIH1cbiAgfVxufTtcblxufSx7XCIuL3Byb21wdFRlbXBsYXRlLmh0bWxcIjoxNX1dLDE1OltmdW5jdGlvbihyZXF1aXJlLG1vZHVsZSxleHBvcnRzKXtcbm1vZHVsZS5leHBvcnRzID0gXCJcXG5cXG48ZGl2IGNsYXNzPVxcXCJwcm9tcHQgcHJvbXB0LW1vZGFsXFxcIiA6dHJhbnNpdGlvbj1cXFwidHJhbnNpdGlvblxcXCIgdi1zaG93PVxcXCJzaG93XFxcIj5cXG4gIDxkaXYgY2xhc3M9XFxcInByb21wdC1vdmVybGF5XFxcIiB2LW9uOmNsaWNrPVxcXCJubygpXFxcIj48L2Rpdj5cXG4gIDxkaXYgY2xhc3M9XFxcInByb21wdC1jb250ZW50XFxcIj5cXG4gICAgPHYtZm9ybSB2LWlmPVxcXCJzaG93SW5wdXRcXFwiIDpzdWJtaXQtY2FsbGJhY2s9XFxcInllc1xcXCIgOmFqYXg9XFxcInRydWVcXFwiPlxcbiAgICAgIDxwPnt7IHF1ZXN0aW9uTGFiZWwgfX08L3A+XFxuICAgICAgPHYtaW5wdXQgdHlwZT1cXFwidGV4dFxcXCIgbGFiZWw9XFxcIlJlc3BvbnNlXFxcIiBuYW1lPVxcXCJwcm9tcHRSZXNwb25zZVxcXCIgOnZhbHVlLnN5bmM9XFxcInByb21wdFZhbHVlXFxcIiA6cmVxdWlyZWQ9XFxcInRydWVcXFwiPjwvdi1pbnB1dD5cXG4gICAgICA8ZGl2IGNsYXNzPVxcXCJjb250cm9sc1xcXCI+XFxuICAgICAgICA8YnV0dG9uIHR5cGU9XFxcImJ1dHRvblxcXCIgY2xhc3M9XFxcImJ1dHRvbiBzbWFsbFxcXCIgdi1vbjpjbGljaz1cXFwibm8oKVxcXCI+e3sgbm9MYWJlbCB9fTwvYnV0dG9uPlxcbiAgICAgICAgPGJ1dHRvbiB0eXBlPVxcXCJzdWJtaXRcXFwiIGNsYXNzPVxcXCJidXR0b24gc21hbGxcXFwiPnt7IHllc0xhYmVsIH19PC9idXR0b24+XFxuICAgICAgPC9kaXY+XFxuICAgIDwvdi1mb3JtPlxcbiAgICA8ZGl2IHYtZWxzZT5cXG4gICAgICA8cD57eyBxdWVzdGlvbkxhYmVsIH19PC9wPlxcbiAgICAgIDxkaXYgY2xhc3M9XFxcImNvbnRyb2xzXFxcIj5cXG4gICAgICAgIDxidXR0b24gdHlwZT1cXFwiYnV0dG9uXFxcIiBjbGFzcz1cXFwiYnV0dG9uIHNtYWxsXFxcIiB2LW9uOmNsaWNrPVxcXCJubygpXFxcIj57eyBub0xhYmVsIH19PC9idXR0b24+XFxuICAgICAgICA8YnV0dG9uIHR5cGU9XFxcInN1Ym1pdFxcXCIgY2xhc3M9XFxcImJ1dHRvbiBzbWFsbFxcXCIgdi1vbjpjbGljaz1cXFwieWVzKClcXFwiPnt7IHllc0xhYmVsIH19PC9idXR0b24+XFxuICAgICAgPC9kaXY+XFxuICAgIDwvZGl2PlxcbiAgPC9kaXY+XFxuPC9kaXY+XFxuXCI7XG5cbn0se31dLDE2OltmdW5jdGlvbihyZXF1aXJlLG1vZHVsZSxleHBvcnRzKXtcblxudmFyIHRhYkNvbXBvbmVudCA9IHJlcXVpcmUoJy4vdGFiQ29tcG9uZW50LmpzJyk7XG5cblZ1ZS5jb21wb25lbnQoJ3RhYicsIHRhYkNvbXBvbmVudCk7XG5cbn0se1wiLi90YWJDb21wb25lbnQuanNcIjoxN31dLDE3OltmdW5jdGlvbihyZXF1aXJlLG1vZHVsZSxleHBvcnRzKXtcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIHRlbXBsYXRlOiByZXF1aXJlKCcuL3RhYlRlbXBsYXRlLmh0bWwnKSxcbiAgcHJvcHM6IHtcbiAgICBoZWFkaW5nOiB7XG4gICAgICB0eXBlOiBTdHJpbmcsXG4gICAgICByZXF1aXJlZDogdHJ1ZVxuICAgIH0sXG4gICAgY2xpY2tDYWxsYmFjazoge1xuICAgICAgdHlwZTogRnVuY3Rpb25cbiAgICB9XG4gIH0sXG4gIGRhdGEoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGluZGV4OiAwLFxuICAgICAgc2hvdzogZmFsc2VcbiAgICB9O1xuICB9LFxuICBjb21wdXRlZDoge1xuICAgIHNob3coKSB7XG4gICAgICByZXR1cm4gKHRoaXMuJHBhcmVudC5hY3RpdmUgPT0gdGhpcy5pbmRleCk7XG4gICAgfVxuICB9LFxuICB3YXRjaDoge1xuICAgIGhlYWRpbmcoKSB7XG4gICAgICB0aGlzLiRwYXJlbnQudGFic1t0aGlzLmluZGV4XS5oZWFkaW5nID0gdGhpcy5oZWFkaW5nO1xuICAgIH1cbiAgfSxcbiAgY3JlYXRlZCgpIHtcbiAgICB0aGlzLiRwYXJlbnQudGFicy5wdXNoKHtcbiAgICAgIGhlYWRpbmc6IHRoaXMuaGVhZGluZyxcbiAgICAgIGFjdGl2ZTogZmFsc2VcbiAgICB9KTtcbiAgfSxcbiAgcmVhZHkoKSB7XG4gICAgZm9yICh2YXIgaW5kZXggaW4gdGhpcy4kcGFyZW50LiRjaGlsZHJlbikge1xuICAgICAgaWYgKHRoaXMuJHBhcmVudC4kY2hpbGRyZW5baW5kZXhdLiRlbCA9PSB0aGlzLiRlbCkge1xuICAgICAgICB0aGlzLmluZGV4ID0gaW5kZXg7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH1cbiAgfSxcbiAgZXZlbnRzOiB7XG4gICAgVEFCX0NPTVBPTkVOVF9UQUJfQ0xJQ0tFRDogZnVuY3Rpb24gVGFiQ2xpY2tlZCgpIHtcbiAgICAgIGlmICh0eXBlb2YgdGhpcy5jbGlja0NhbGxiYWNrID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIHRoaXMuY2xpY2tDYWxsYmFjaygpO1xuICAgICAgfVxuICAgIH1cbiAgfVxufTtcblxufSx7XCIuL3RhYlRlbXBsYXRlLmh0bWxcIjoxOH1dLDE4OltmdW5jdGlvbihyZXF1aXJlLG1vZHVsZSxleHBvcnRzKXtcbm1vZHVsZS5leHBvcnRzID0gXCI8ZGl2IGNsYXNzPVxcXCJ0YWJcXFwiIHYtc2hvdz1cXFwic2hvd1xcXCI+XFxuICA8c2xvdD48L3Nsb3Q+XFxuPC9kaXY+XFxuXCI7XG5cbn0se31dLDE5OltmdW5jdGlvbihyZXF1aXJlLG1vZHVsZSxleHBvcnRzKXtcblxudmFyIHRhYnNDb21wb25lbnQgPSByZXF1aXJlKCcuL3RhYnNDb21wb25lbnQuanMnKTtcblxucmVxdWlyZSgnLi90YWIvdGFiLmpzJyk7XG5cblZ1ZS5jb21wb25lbnQoJ3RhYnMnLCB0YWJzQ29tcG9uZW50KTtcblxufSx7XCIuL3RhYi90YWIuanNcIjoxNixcIi4vdGFic0NvbXBvbmVudC5qc1wiOjIwfV0sMjA6W2Z1bmN0aW9uKHJlcXVpcmUsbW9kdWxlLGV4cG9ydHMpe1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgdGVtcGxhdGU6IHJlcXVpcmUoJy4vdGFic1RlbXBsYXRlLmh0bWwnKSxcbiAgcHJvcHM6IHtcbiAgICBhY3RpdmU6IHtcbiAgICAgIHR5cGU6IE51bWJlcixcbiAgICAgIGRlZmF1bHQ6IDBcbiAgICB9XG4gIH0sXG4gIGRhdGEoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHRhYnM6IFtdXG4gICAgfTtcbiAgfSxcbiAgcmVhZHkoKSB7XG4gICAgaWYgKHRoaXMudGFic1swXSkge1xuICAgICAgdGhpcy50YWJzWzBdLmFjdGl2ZSA9IHRydWU7XG4gICAgfVxuICB9LFxuICBtZXRob2RzOiB7XG4gICAgaGFuZGxlVGFiTGlzdENsaWNrKGluZGV4LCBlbCkge1xuICAgICAgaWYgKCFlbC5kaXNhYmxlZCkgdGhpcy5hY3RpdmUgPSBpbmRleDtcblxuICAgICAgZm9yICh2YXIgaSA9IDAsIGogPSB0aGlzLnRhYnMubGVuZ3RoOyBpIDwgajsgaSsrKSB7XG4gICAgICAgIHRoaXMudGFic1tpXS5hY3RpdmUgPSAoaSA9PSBpbmRleCk7XG4gICAgICAgIGlmICh0aGlzLnRhYnNbaV0uYWN0aXZlKSB7XG4gICAgICAgICAgdGhpcy4kY2hpbGRyZW5baV0uJGVtaXQoJ1RBQl9DT01QT05FTlRfVEFCX0NMSUNLRUQnKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxufTtcblxufSx7XCIuL3RhYnNUZW1wbGF0ZS5odG1sXCI6MjF9XSwyMTpbZnVuY3Rpb24ocmVxdWlyZSxtb2R1bGUsZXhwb3J0cyl7XG5tb2R1bGUuZXhwb3J0cyA9IFwiXFxuXFxuPGRpdiBjbGFzcz1cXFwidGFic1xcXCI+XFxuICA8IS0tIFRhYnMgTmF2IC0tPlxcbiAgPHVsIGNsYXNzPVxcXCJ0YWItbmF2XFxcIj5cXG4gICAgPGxpIHYtZm9yPVxcXCJ0YWIgaW4gdGFic1xcXCIgdi1iaW5kOmNsYXNzPVxcXCJ7ICdhY3RpdmUnOiB0YWIuYWN0aXZlIH1cXFwiIHYtb246Y2xpY2sucHJldmVudD1cXFwiaGFuZGxlVGFiTGlzdENsaWNrKCRpbmRleCwgdGFiKVxcXCIgOmRpc2FibGVkPVxcXCJ0YWIuZGlzYWJsZWRcXFwiPlxcbiAgICAgIHt7IHRhYi5oZWFkaW5nIH19XFxuICAgIDwvbGk+XFxuICA8L3VsPlxcblxcbiAgPCEtLSBUYWIgUGFuZXMgLS0+XFxuICA8ZGl2IGNsYXNzPVxcXCJ0YWItY29udGVudFxcXCIgdi1lbDp0YWJDb250ZW50PlxcbiAgICAgIDxzbG90Pjwvc2xvdD5cXG4gIDwvZGl2PlxcbjwvZGl2PlxcblwiO1xuXG59LHt9XSwyMjpbZnVuY3Rpb24ocmVxdWlyZSxtb2R1bGUsZXhwb3J0cyl7XG5cbnZhciB2Q2hlY2tib3hDb21wb25lbnQgPSByZXF1aXJlKCcuL3ZDaGVja2JveENvbXBvbmVudC5qcycpO1xuXG5WdWUuY29tcG9uZW50KCd2Q2hlY2tib3gnLCB2Q2hlY2tib3hDb21wb25lbnQpO1xuXG59LHtcIi4vdkNoZWNrYm94Q29tcG9uZW50LmpzXCI6MjN9XSwyMzpbZnVuY3Rpb24ocmVxdWlyZSxtb2R1bGUsZXhwb3J0cyl7XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICB0ZW1wbGF0ZTogcmVxdWlyZSgnLi92Q2hlY2tib3hUZW1wbGF0ZS5odG1sJyksXG4gIGRhdGEoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGljb246ICd1bmNoZWNrZWQnLFxuICAgICAgaXNFcnJvcjogZmFsc2VcbiAgICB9O1xuICB9LFxuICBwcm9wczoge1xuICAgIGNoZWNrZWQ6IHtcbiAgICAgIHR5cGU6IEJvb2xlYW4sXG4gICAgICByZXF1aXJlZDogdHJ1ZSxcbiAgICAgIHR3b1dheTogdHJ1ZVxuICAgIH0sXG4gICAgbGFiZWw6IHtcbiAgICAgIHR5cGU6IFN0cmluZyxcbiAgICAgIHJlcXVpcmVkOiB0cnVlXG4gICAgfSxcbiAgICByZXF1aXJlZDoge1xuICAgICAgdHlwZTogQm9vbGVhbixcbiAgICAgIGRlZmF1bHRzVG86IGZhbHNlXG4gICAgfVxuICB9LFxuICBtZXRob2RzOiB7XG4gICAgaXNWYWxpZCgpIHtcbiAgICAgIHRoaXMuaXNFcnJvciA9ICh0aGlzLnJlcXVpcmVkKSA/ICF0aGlzLmNoZWNrZWQgOiBmYWxzZTtcbiAgICAgIHJldHVybiAhdGhpcy5pc0Vycm9yO1xuICAgIH1cbiAgfVxufTtcblxufSx7XCIuL3ZDaGVja2JveFRlbXBsYXRlLmh0bWxcIjoyNH1dLDI0OltmdW5jdGlvbihyZXF1aXJlLG1vZHVsZSxleHBvcnRzKXtcbm1vZHVsZS5leHBvcnRzID0gXCJcXG48bGFiZWw+PGlucHV0IHR5cGU9XFxcImNoZWNrYm94XFxcIiB2LW1vZGVsPVxcXCJjaGVja2VkXFxcIiAvPiB7eyBsYWJlbCB9fTwvbGFiZWw+XFxuXCI7XG5cbn0se31dLDI1OltmdW5jdGlvbihyZXF1aXJlLG1vZHVsZSxleHBvcnRzKXtcblxudmFyIHZGb3JtQ29tcG9uZW50ID0gcmVxdWlyZSgnLi92Rm9ybUNvbXBvbmVudC5qcycpO1xuXG5WdWUuY29tcG9uZW50KCd2Rm9ybScsIHZGb3JtQ29tcG9uZW50KTtcblxufSx7XCIuL3ZGb3JtQ29tcG9uZW50LmpzXCI6MjZ9XSwyNjpbZnVuY3Rpb24ocmVxdWlyZSxtb2R1bGUsZXhwb3J0cyl7XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICB0ZW1wbGF0ZTogcmVxdWlyZSgnLi92Rm9ybVRlbXBsYXRlLmh0bWwnKSxcbiAgcHJvcHM6IHtcbiAgICBtZXRob2Q6IHtcbiAgICAgIHR5cGU6IFN0cmluZyxcbiAgICAgIGRlZmF1bHRzVG86ICdQT1NUJ1xuICAgIH0sXG4gICAgYWN0aW9uOiB7XG4gICAgICB0eXBlOiBTdHJpbmcsXG4gICAgICBkZWZhdWx0c1RvOiAnJ1xuICAgIH0sXG4gICAgYXN5bmM6IHtcbiAgICAgIHR5cGU6IEJvb2xlYW4sXG4gICAgICBkZWZhdWx0c1RvOiBmYWxzZVxuICAgIH0sXG4gICAgc3VibWl0Q2FsbGJhY2s6IHtcbiAgICAgIHR5cGU6IEZ1bmN0aW9uXG4gICAgfVxuICB9LFxuICBtZXRob2RzOiB7XG4gICAgc3VibWl0Rm9ybShldmVudCkge1xuICAgICAgaWYgKHRoaXMuYXN5bmMgfHwgIXRoaXMuaXNWYWxpZCgpKSB7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICB9XG5cbiAgICAgIGlmICh0aGlzLmFzeW5jICYmIHRoaXMuaXNWYWxpZCgpICYmIHR5cGVvZiB0aGlzLnN1Ym1pdENhbGxiYWNrID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIHRoaXMuc3VibWl0Q2FsbGJhY2soKTtcbiAgICAgIH1cbiAgICB9LFxuICAgIGlzVmFsaWQoKSB7XG4gICAgICB2YXIgc2VsZiA9IHRoaXMsXG4gICAgICAgIGZvcm1Jc1ZhbGlkID0gdHJ1ZTtcblxuICAgICAgZm9yICh2YXIgaSA9IDAsIGogPSBzZWxmLiRjaGlsZHJlbi5sZW5ndGg7IGkgPCBqOyBpKyspIHtcbiAgICAgICAgaWYgKF8uaXNGdW5jdGlvbihzZWxmLiRjaGlsZHJlbltpXS5pc1ZhbGlkKSkgeyAvLyBoYXMgaW5wdXQgdmFsaWRhdGlvbiBhdHRhY2hlZFxuICAgICAgICAgIGZvcm1Jc1ZhbGlkID0gZm9ybUlzVmFsaWQgJiYgc2VsZi4kY2hpbGRyZW5baV0uaXNWYWxpZCgpO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBmb3JtSXNWYWxpZDtcbiAgICB9XG4gIH1cbn07XG5cbn0se1wiLi92Rm9ybVRlbXBsYXRlLmh0bWxcIjoyN31dLDI3OltmdW5jdGlvbihyZXF1aXJlLG1vZHVsZSxleHBvcnRzKXtcbm1vZHVsZS5leHBvcnRzID0gXCJcXG48Zm9ybSB2LWlmPVxcXCJhc3luY1xcXCIgdi1lbDpmb3JtIHYtb246c3VibWl0LnByZXZlbnQ9XFxcInN1Ym1pdEZvcm1cXFwiIDptZXRob2Q9XFxcIm1ldGhvZFxcXCIgOmFjdGlvbj1cXFwiYWN0aW9uXFxcIiBub3ZhbGlkYXRlPlxcbiAgPHNsb3Q+PC9zbG90PlxcbjwvZm9ybT5cXG48Zm9ybSB2LWVsc2Ugdi1lbDpmb3JtIHYtb246c3VibWl0PVxcXCJzdWJtaXRGb3JtXFxcIiA6bWV0aG9kPVxcXCJtZXRob2RcXFwiIDphY3Rpb249XFxcImFjdGlvblxcXCIgbm92YWxpZGF0ZT5cXG4gIDxzbG90Pjwvc2xvdD5cXG48L2Zvcm0+XFxuXCI7XG5cbn0se31dLDI4OltmdW5jdGlvbihyZXF1aXJlLG1vZHVsZSxleHBvcnRzKXtcblxudmFyIHZJbnB1dENvbXBvbmVudCA9IHJlcXVpcmUoJy4vdklucHV0Q29tcG9uZW50LmpzJyk7XG5cblZ1ZS5jb21wb25lbnQoJ3ZJbnB1dCcsIHZJbnB1dENvbXBvbmVudCk7XG5cbn0se1wiLi92SW5wdXRDb21wb25lbnQuanNcIjoyOX1dLDI5OltmdW5jdGlvbihyZXF1aXJlLG1vZHVsZSxleHBvcnRzKXtcblxudmFyIHZhbGlkYXRpb25SdWxlcyA9IHJlcXVpcmUoJy4vdmFsaWRhdGlvblJ1bGVzLmpzJyk7XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICB0ZW1wbGF0ZTogcmVxdWlyZSgnLi92SW5wdXRUZW1wbGF0ZS5odG1sJyksXG4gIHByb3BzOiB7XG4gICAgbGFiZWw6IHtcbiAgICAgIHR5cGU6IFN0cmluZ1xuICAgIH0sXG4gICAgbmFtZToge1xuICAgICAgdHlwZTogU3RyaW5nXG4gICAgfSxcbiAgICB0eXBlOiB7XG4gICAgICB0eXBlOiBTdHJpbmcsXG4gICAgICByZXF1aXJlZDogdHJ1ZVxuICAgIH0sXG4gICAgcGxhY2Vob2xkZXI6IHtcbiAgICAgIHR5cGU6IFN0cmluZ1xuICAgIH0sXG4gICAgaWNvbjoge1xuICAgICAgdHlwZTogU3RyaW5nXG4gICAgfSxcbiAgICB2YWx1ZToge1xuICAgICAgdHlwZTogU3RyaW5nLFxuICAgICAgcmVxdWlyZWQ6IHRydWUsXG4gICAgICB0d29XYXk6IHRydWVcbiAgICB9LFxuICAgIHJlcXVpcmVkOiB7XG4gICAgICB0eXBlOiBCb29sZWFuLFxuICAgICAgZGVmYXVsdHNUbzogZmFsc2VcbiAgICB9LFxuICAgIGVxdWFsVG86IHtcbiAgICAgIHR5cGU6IE9iamVjdCxcbiAgICAgIGRlZmF1bHRzVG86IG51bGxcbiAgICB9XG4gIH0sXG4gIGRhdGEoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGVycm9yOiAnJ1xuICAgIH07XG4gIH0sXG4gIG1ldGhvZHM6IHtcbiAgICBpc1ZhbGlkKCkge1xuICAgICAgdGhpcy52YWxpZGF0ZSgpO1xuICAgICAgcmV0dXJuICh0aGlzLmVycm9yLmxlbmd0aCA9PT0gMCk7XG4gICAgfSxcbiAgICBkZWJvdW5jZVZhbGlkYXRlOiBfLmRlYm91bmNlKGZ1bmN0aW9uICgpIHtcbiAgICAgIHRoaXMudmFsaWRhdGUoKTtcbiAgICB9LCA1MDApLFxuICAgIHZhbGlkYXRlKCkge1xuICAgICAgdmFyIGxhYmVsID0gdGhpcy5sYWJlbCB8fCB0aGlzLm5hbWU7XG5cbiAgICAgIC8vIHJlcXVpcmVkIHZhbGlkYXRpb25cbiAgICAgIGlmICh0aGlzLnJlcXVpcmVkICYmIHRoaXMudmFsdWUubGVuZ3RoID09PSAwKSB7XG4gICAgICAgIHRoaXMuZXJyb3IgPSBsYWJlbCArICcgaXMgcmVxdWlyZWQnO1xuXG4gICAgICAvLyBodG1sNSBkYXRhIHR5cGUgdmFsaWRhdGlvblxuICAgICAgfSBlbHNlIGlmICh2YWxpZGF0aW9uUnVsZXMuaGFzT3duUHJvcGVydHkodGhpcy50eXBlKSAmJiAhdmFsaWRhdGlvblJ1bGVzW3RoaXMudHlwZV0ucmVnZXgudGVzdCh0aGlzLnZhbHVlKSkge1xuICAgICAgICB0aGlzLmVycm9yID0gdmFsaWRhdGlvblJ1bGVzW3RoaXMudHlwZV0uZGVmYXVsdEVycm9yO1xuXG4gICAgICAvLyBlcXVpdmFsZW5jeSB2YWxpZGF0aW9uXG4gICAgICB9IGVsc2UgaWYgKHRoaXMuZXF1YWxUbyAmJiB0aGlzLmVxdWFsVG8udmFsdWUgIT09IHRoaXMudmFsdWUpIHtcbiAgICAgICAgdGhpcy5lcnJvciA9ICdNdXN0IG1hdGNoICcgKyB0aGlzLmVxdWFsVG8ubGFiZWw7XG5cbiAgICAgIC8vIGlucHV0IGlzIHZhbGlkXG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLmVycm9yID0gJyc7XG4gICAgICB9XG4gICAgfVxuICB9XG59O1xuXG59LHtcIi4vdklucHV0VGVtcGxhdGUuaHRtbFwiOjMwLFwiLi92YWxpZGF0aW9uUnVsZXMuanNcIjozMX1dLDMwOltmdW5jdGlvbihyZXF1aXJlLG1vZHVsZSxleHBvcnRzKXtcbm1vZHVsZS5leHBvcnRzID0gXCJcXG48bGFiZWwgY2xhc3M9XFxcInYtaW5wdXRcXFwiPlxcbiAge3sgbGFiZWwgfX1cXG4gIDxkaXYgY2xhc3M9XFxcImlucHV0LXdyYXBcXFwiPlxcbiAgICA8aSBjbGFzcz1cXFwiZmEgZmEte3sgaWNvbiB9fVxcXCIgdi1pZj1cXFwiaWNvblxcXCI+PC9pPlxcbiAgICA8dGV4dGFyZWEgdi1pZj1cXFwidHlwZSA9PT0gJ3RleHRhcmVhJ1xcXCJcXG4gICAgICB2LWVsOmlucHV0XFxuICAgICAgOmNsYXNzPVxcXCJ7ICdlcnJvcic6IGVycm9yLmxlbmd0aCA+IDAgfVxcXCJcXG4gICAgICBuYW1lPVxcXCJ7eyBuYW1lIH19XFxcIlxcbiAgICAgIHBsYWNlaG9sZGVyPVxcXCJ7eyBwbGFjZWhvbGRlciB9fVxcXCJcXG4gICAgICB2LW1vZGVsPVxcXCJ2YWx1ZVxcXCJcXG4gICAgICB2LW9uOmJsdXI9XFxcInZhbGlkYXRlKClcXFwiPjwvdGV4dGFyZWE+XFxuICAgIDxpbnB1dCB2LWVsc2VcXG4gICAgICB2LWVsOmlucHV0XFxuICAgICAgOmNsYXNzPVxcXCJ7ICdlcnJvcic6IGVycm9yLmxlbmd0aCA+IDAgfVxcXCJcXG4gICAgICBuYW1lPVxcXCJ7eyBuYW1lIH19XFxcIlxcbiAgICAgIHR5cGU9XFxcInt7IHR5cGUgfX1cXFwiXFxuICAgICAgcGxhY2Vob2xkZXI9XFxcInt7IHBsYWNlaG9sZGVyIH19XFxcIlxcbiAgICAgIHYtbW9kZWw9XFxcInZhbHVlXFxcIlxcbiAgICAgIHYtb246Ymx1cj1cXFwidmFsaWRhdGUoKVxcXCIgLz5cXG4gICAgPHNtYWxsIHYtaWY9XFxcImVycm9yLmxlbmd0aCA+IDBcXFwiIHRyYW5zaXRpb249XFxcInNsaWRlLXVwLXgtc21hbGxcXFwiIGNsYXNzPVxcXCJlcnJvclxcXCI+e3sgZXJyb3IgfX08L3NtYWxsPlxcbiAgPC9kaXY+XFxuPC9sYWJlbD5cXG5cIjtcblxufSx7fV0sMzE6W2Z1bmN0aW9uKHJlcXVpcmUsbW9kdWxlLGV4cG9ydHMpe1xuXG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBlbWFpbDoge1xuICAgIHJlZ2V4OiAvXigoW148PigpXFxbXFxdXFxcXC4sOzpcXHNAXCJdKyhcXC5bXjw+KClcXFtcXF1cXFxcLiw7Olxcc0BcIl0rKSopfChcIi4rXCIpKUAoKFxcW1swLTldezEsM31cXC5bMC05XXsxLDN9XFwuWzAtOV17MSwzfVxcLlswLTldezEsM31dKXwoKFthLXpBLVpcXC0wLTldK1xcLikrW2EtekEtWl17Mix9KSkkLyxcbiAgICBkZWZhdWx0RXJyb3I6ICdQbGVhc2UgZW50ZXIgYSB2YWxpZCBlbWFpbCBhZGRyZXNzJ1xuICB9LFxuICB1cmw6IHtcbiAgICByZWdleDogL2h0dHBzPzpcXC9cXC8od3d3XFwuKT9bLWEtekEtWjAtOUA6JS5fXFwrfiM9XXsyLDI1Nn1cXC5bYS16XXsyLDR9XFxiKFstYS16QS1aMC05QDolX1xcKy5+Iz8mLy89XSopLyxcbiAgICBkZWZhdWx0RXJyb3I6ICdQbGVhc2UgZW50ZXIgYSB2YWxpZCBVUkwnXG4gIH0sXG4gIG51bWJlcjoge1xuICAgIHJlZ2V4OiAvWy0uMC05XSsvLFxuICAgIGRlZmF1bHRFcnJvcjogJ1BsZWFzZSBlbnRlciBhIHZhbGlkIG51bWJlcidcbiAgfVxufTtcblxufSx7fV0sMzI6W2Z1bmN0aW9uKHJlcXVpcmUsbW9kdWxlLGV4cG9ydHMpe1xuXG52YXIgdlNlbGVjdENvbXBvbmVudCA9IHJlcXVpcmUoJy4vdlNlbGVjdENvbXBvbmVudC5qcycpO1xuXG5WdWUuY29tcG9uZW50KCd2U2VsZWN0JywgdlNlbGVjdENvbXBvbmVudCk7XG5cbn0se1wiLi92U2VsZWN0Q29tcG9uZW50LmpzXCI6MzN9XSwzMzpbZnVuY3Rpb24ocmVxdWlyZSxtb2R1bGUsZXhwb3J0cyl7XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICB0ZW1wbGF0ZTogcmVxdWlyZSgnLi92U2VsZWN0VGVtcGxhdGUuaHRtbCcpLFxuICBwcm9wczoge1xuICAgIGxhYmVsOiB7XG4gICAgICB0eXBlOiBTdHJpbmcsXG4gICAgICBkZWZhdWx0c1RvOiAnJ1xuICAgIH0sXG4gICAgc2VsZWN0ZWQ6IHtcbiAgICAgIHR5cGU6IFN0cmluZyxcbiAgICAgIHJlcXVpcmVkOiB0cnVlLFxuICAgICAgdHdvV2F5OiB0cnVlXG4gICAgfSxcbiAgICBvcHRpb25zOiB7XG4gICAgICB0eXBlOiBBcnJheSxcbiAgICAgIHJlcXVpcmVkOiB0cnVlXG4gICAgfSxcbiAgICByZXF1aXJlZDoge1xuICAgICAgdHlwZTogQm9vbGVhbixcbiAgICAgIGRlZmF1bHRzVG86IGZhbHNlXG4gICAgfVxuICB9LFxuICBkYXRhKCkge1xuICAgIHJldHVybiB7XG4gICAgICBpc0Vycm9yOiBmYWxzZVxuICAgIH07XG4gIH0sXG4gIHJlYWR5KCkge1xuICAgIHZhciBzZWxmID0gdGhpcyxcbiAgICAgIHNlbGVjdGVkSW5kZXggPSBfLmZpbmRJbmRleChzZWxmLm9wdGlvbnMsIChvcHRpb24pID0+IG9wdGlvbi52YWx1ZSA9PT0gc2VsZi5zZWxlY3RlZCk7XG5cbiAgICBpZiAoc2VsZi5yZXF1aXJlZCAmJiBzZWxlY3RlZEluZGV4ID09PSAtMSkge1xuICAgICAgc2VsZi5zZWxlY3RlZCA9IHNlbGYub3B0aW9uc1swXS52YWx1ZTtcbiAgICB9XG4gIH0sXG4gIG1ldGhvZHM6IHtcbiAgICBpc1ZhbGlkKCkge1xuICAgICAgdGhpcy5pc0Vycm9yID0gIXRoaXMucmVxdWlyZWQgfHwgdGhpcy5zZWxlY3RlZC5sZW5ndGggPiAwO1xuICAgICAgcmV0dXJuIHRoaXMuaXNFcnJvcjtcbiAgICB9XG4gIH1cbn07XG5cbn0se1wiLi92U2VsZWN0VGVtcGxhdGUuaHRtbFwiOjM0fV0sMzQ6W2Z1bmN0aW9uKHJlcXVpcmUsbW9kdWxlLGV4cG9ydHMpe1xubW9kdWxlLmV4cG9ydHMgPSBcIlxcbjxsYWJlbCBjbGFzcz1cXFwidi1zZWxlY3RcXFwiPlxcbiAge3sgbGFiZWwgfX1cXG4gIDxzZWxlY3Qgdi1tb2RlbD1cXFwic2VsZWN0ZWRcXFwiIDpjbGFzcz1cXFwieyAnZXJyb3InOiBpc0Vycm9yIH1cXFwiPlxcbiAgICA8b3B0aW9uIHYtaWY9XFxcIiFyZXF1aXJlZFxcXCIgdmFsdWU9XFxcIlxcXCI+PC9vcHRpb24+XFxuICAgIDxvcHRpb24gdi1mb3I9XFxcIm9wdGlvbiBpbiBvcHRpb25zXFxcIiA6dmFsdWU9XFxcIm9wdGlvbi52YWx1ZVxcXCI+e3sgb3B0aW9uLmxhYmVsIH19PC9vcHRpb24+XFxuICA8L3NlbGVjdD5cXG48L2xhYmVsPlxcblwiO1xuXG59LHt9XSwzNTpbZnVuY3Rpb24ocmVxdWlyZSxtb2R1bGUsZXhwb3J0cyl7XG5cbnJlcXVpcmUoJy4vY29tcG9uZW50cy9hbGVydC9hbGVydC5qcycpO1xucmVxdWlyZSgnLi9jb21wb25lbnRzL2ljb24vaWNvbi5qcycpO1xucmVxdWlyZSgnLi9jb21wb25lbnRzL21vZGFsL21vZGFsLmpzJyk7XG5yZXF1aXJlKCcuL2NvbXBvbmVudHMvcHJvbXB0L3Byb21wdC5qcycpO1xucmVxdWlyZSgnLi9jb21wb25lbnRzL2xvYWRlci9sb2FkZXIuanMnKTtcbnJlcXVpcmUoJy4vY29tcG9uZW50cy90YWJzL3RhYnMuanMnKTtcbnJlcXVpcmUoJy4vY29tcG9uZW50cy92Rm9ybS92Rm9ybS5qcycpO1xucmVxdWlyZSgnLi9jb21wb25lbnRzL3ZJbnB1dC92SW5wdXQuanMnKTtcbnJlcXVpcmUoJy4vY29tcG9uZW50cy92U2VsZWN0L3ZTZWxlY3QuanMnKTtcbnJlcXVpcmUoJy4vY29tcG9uZW50cy92Q2hlY2tib3gvdkNoZWNrYm94LmpzJyk7XG5cbn0se1wiLi9jb21wb25lbnRzL2FsZXJ0L2FsZXJ0LmpzXCI6MSxcIi4vY29tcG9uZW50cy9pY29uL2ljb24uanNcIjo0LFwiLi9jb21wb25lbnRzL2xvYWRlci9sb2FkZXIuanNcIjo3LFwiLi9jb21wb25lbnRzL21vZGFsL21vZGFsLmpzXCI6MTAsXCIuL2NvbXBvbmVudHMvcHJvbXB0L3Byb21wdC5qc1wiOjEzLFwiLi9jb21wb25lbnRzL3RhYnMvdGFicy5qc1wiOjE5LFwiLi9jb21wb25lbnRzL3ZDaGVja2JveC92Q2hlY2tib3guanNcIjoyMixcIi4vY29tcG9uZW50cy92Rm9ybS92Rm9ybS5qc1wiOjI1LFwiLi9jb21wb25lbnRzL3ZJbnB1dC92SW5wdXQuanNcIjoyOCxcIi4vY29tcG9uZW50cy92U2VsZWN0L3ZTZWxlY3QuanNcIjozMn1dfSx7fSxbMzVdKSJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
