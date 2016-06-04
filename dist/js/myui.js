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
          console.log(this.messages);
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
          defaultsTo: 'full'
        }
      },
      computed: {
        isMenu: function isMenu() {
          return this.modalSize === 'menu';
        }
      }
    };
  }, { "./modalTemplate.html": 12 }], 12: [function (require, module, exports) {
    module.exports = "\n<div class=\"modal\" transition=\"zoom-in\" v-show=\"show\" v-on:click.prevent=\"show = false\">\n  <div :class=\"{ 'modal-content': true, 'small': modalSize === 'small', 'full': modalSize === 'full' }\">\n    <div class=\"modal-header\">\n      <slot name=\"header\"></slot>\n    </div>\n    <slot name=\"content\"></slot>\n    <span v-on:click=\"show = false\" aria-label=\"Close\">&#215;</span>\n  </div>\n</div>\n";
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
    module.exports = "\n\n<div class=\"prompt prompt-modal\" transition=\"zoom-in\" v-show=\"show\">\n  <div class=\"prompt-overlay\" v-on:click=\"no()\"></div>\n  <div class=\"prompt-content\">\n    <v-form :submit-callback=\"yes\" :ajax=\"true\">\n      <p class=\"text-center\">{{ questionLabel }}</p>\n      <v-input type=\"text\" label=\"Response\" name=\"promptResponse\" :value.sync=\"promptValue\" :required=\"true\"></v-input>\n      <div class=\"controls\">\n        <button type=\"button\" class=\"tiny\" type=\"button\" v-on:click=\"no()\">{{ noLabel }}</button>\n        <button type=\"submit\" class=\"tiny\" type=\"submit\">{{ yesLabel }}</button>\n      </div>\n    </v-form>\n  </div>\n</div>\n";
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
    module.exports = "\n<label class=\"v-input\">\n  {{ label | isSimple }} <span v-if=\"!required && !simple\" class=\"right\">optional</span>\n  <div class=\"input-wrap\">\n    <i class=\"fa fa-{{ icon }}\" v-if=\"icon\"></i>\n    <textarea v-if=\"type === 'textarea'\"\n      v-el:input\n      :class=\"{ 'error': error.length > 0 }\"\n      name=\"{{ name }}\"\n      placeholder=\"{{ placeholder }}\"\n      v-model=\"value\"\n      v-on:blur=\"validate()\"></textarea>\n    <input v-else\n      v-el:input\n      :class=\"{ 'error': error.length > 0 }\"\n      name=\"{{ name }}\"\n      type=\"{{ type }}\"\n      placeholder=\"{{ placeholder }}\"\n      v-model=\"value\"\n      v-on:blur=\"validate()\" />\n    <small v-if=\"error.length > 0\" transition=\"slide-up-x-small\" class=\"error\">{{ error }}</small>\n  </div>\n</label>\n";
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
//# sourceMappingURL=data:application/json;base64,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O0FBa0NmLGVBQVM7QUFDUCxlQURPLHFCQUNHO0FBQ1IsZUFBSyxPQUFMLEdBQWUsQ0FBQyxLQUFLLFFBQU4sSUFBa0IsS0FBSyxRQUFMLENBQWMsTUFBZCxHQUF1QixDQUF4RDtBQUNBLGlCQUFPLEtBQUssT0FBWjtBQUNEO0FBSk07QUFsQ00sS0FBakI7QUEwQ0MsR0E1Q2tDLEVBNENqQyxFQUFDLDBCQUF5QixFQUExQixFQTVDaUMsQ0E1aEJzWCxFQXdrQnhYLElBQUcsQ0FBQyxVQUFTLE9BQVQsRUFBaUIsTUFBakIsRUFBd0IsT0FBeEIsRUFBZ0M7QUFDckUsV0FBTyxPQUFQLEdBQWlCLHlSQUFqQjtBQUVDLEdBSG1DLEVBR2xDLEVBSGtDLENBeGtCcVgsRUEya0JuWixJQUFHLENBQUMsVUFBUyxPQUFULEVBQWlCLE1BQWpCLEVBQXdCLE9BQXhCLEVBQWdDOztBQUUxQyxZQUFRLDZCQUFSO0FBQ0EsWUFBUSwyQkFBUjtBQUNBLFlBQVEsNkJBQVI7QUFDQSxZQUFRLCtCQUFSO0FBQ0EsWUFBUSwrQkFBUjtBQUNBLFlBQVEsMkJBQVI7QUFDQSxZQUFRLDZCQUFSO0FBQ0EsWUFBUSwrQkFBUjtBQUNBLFlBQVEsaUNBQVI7QUFDQSxZQUFRLHFDQUFSO0FBRUMsR0FiUSxFQWFQLEVBQUMsK0JBQThCLENBQS9CLEVBQWlDLDZCQUE0QixDQUE3RCxFQUErRCxpQ0FBZ0MsQ0FBL0YsRUFBaUcsK0JBQThCLEVBQS9ILEVBQWtJLGlDQUFnQyxFQUFsSyxFQUFxSyw2QkFBNEIsRUFBak0sRUFBb00sdUNBQXNDLEVBQTFPLEVBQTZPLCtCQUE4QixFQUEzUSxFQUE4USxpQ0FBZ0MsRUFBOVMsRUFBaVQsbUNBQWtDLEVBQW5WLEVBYk8sQ0Eza0JnWixFQUF6WixFQXdsQjJWLEVBeGxCM1YsRUF3bEI4VixDQUFDLEVBQUQsQ0F4bEI5ViIsImZpbGUiOiJteXVpLmpzIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt0aHJvdyBuZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpfXZhciBmPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChmLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGYsZi5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkoezE6W2Z1bmN0aW9uKHJlcXVpcmUsbW9kdWxlLGV4cG9ydHMpe1xuXG52YXIgYWxlcnRDb21wb25lbnQgPSByZXF1aXJlKCcuL2FsZXJ0Q29tcG9uZW50LmpzJyk7XG5cblZ1ZS5jb21wb25lbnQoJ2FsZXJ0JywgYWxlcnRDb21wb25lbnQpO1xuXG59LHtcIi4vYWxlcnRDb21wb25lbnQuanNcIjoyfV0sMjpbZnVuY3Rpb24ocmVxdWlyZSxtb2R1bGUsZXhwb3J0cyl7XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICB0ZW1wbGF0ZTogcmVxdWlyZSgnLi9hbGVydFRlbXBsYXRlLmh0bWwnKSxcbiAgcHJvcHM6IHtcbiAgICBjYW5DbG9zZToge1xuICAgICAgdHlwZTogQm9vbGVhbixcbiAgICAgIGRlZmF1bHRzVG86IGZhbHNlXG4gICAgfVxuICB9LFxuICBkYXRhKCkge1xuICAgIHJldHVybiB7XG4gICAgICBtZXNzYWdlczogW10sXG4gICAgICB0eXBlOiAnJ1xuICAgIH07XG4gIH0sXG4gIG1ldGhvZHM6IHtcbiAgICBjbG9zZSgpIHtcbiAgICAgIHRoaXMubWVzc2FnZXMgPSBbXTtcbiAgICB9LFxuICAgIGFkZE1lc3NhZ2UodHlwZSwgbWVzc2FnZSkge1xuICAgICAgaWYgKHRoaXMudHlwZSAhPT0gdHlwZSkge1xuICAgICAgICB0aGlzLnR5cGUgPSB0eXBlO1xuICAgICAgICB0aGlzLm1lc3NhZ2VzID0gW21lc3NhZ2VdO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5tZXNzYWdlcy5wdXNoKG1lc3NhZ2UpO1xuICAgICAgfVxuICAgICAgY29uc29sZS5sb2codGhpcy5tZXNzYWdlcyk7XG4gICAgfSxcbiAgICBtZXNzYWdlKG1lc3NhZ2UpIHtcbiAgICAgIHRoaXMuYWRkTWVzc2FnZSgnJywgbWVzc2FnZSk7XG4gICAgfSxcbiAgICBwcmltYXJ5KG1lc3NhZ2UpIHtcbiAgICAgIHRoaXMuYWRkTWVzc2FnZSgncHJpbWFyeScsIG1lc3NhZ2UpO1xuICAgIH0sXG4gICAgc2Vjb25kYXJ5KG1lc3NhZ2UpIHtcbiAgICAgIHRoaXMuYWRkTWVzc2FnZSgnc2Vjb25kYXJ5JywgbWVzc2FnZSk7XG4gICAgfSxcbiAgICBzdWNjZXNzKG1lc3NhZ2UpIHtcbiAgICAgIHRoaXMuYWRkTWVzc2FnZSgnc3VjY2VzcycsIG1lc3NhZ2UpO1xuICAgIH0sXG4gICAgd2FybmluZyhtZXNzYWdlKSB7XG4gICAgICB0aGlzLmFkZE1lc3NhZ2UoJ3dhcm5pbmcnLCBtZXNzYWdlKTtcbiAgICB9LFxuICAgIGFsZXJ0KG1lc3NhZ2UpIHtcbiAgICAgIHRoaXMuYWRkTWVzc2FnZSgnYWxlcnQnLCBtZXNzYWdlKTtcbiAgICB9XG4gIH1cbn07XG5cbn0se1wiLi9hbGVydFRlbXBsYXRlLmh0bWxcIjozfV0sMzpbZnVuY3Rpb24ocmVxdWlyZSxtb2R1bGUsZXhwb3J0cyl7XG5tb2R1bGUuZXhwb3J0cyA9IFwiXFxuPGRpdiBjbGFzcz1cXFwiYWxlcnQtYm94XFxcIiB2LWJpbmQ6Y2xhc3M9XFxcIntcXG4gICAgY2FsbG91dDogdHJ1ZSxcXG4gICAgcHJpbWFyeTogdHlwZSA9PT0gJ3ByaW1hcnknLFxcbiAgICBzZWNvbmRhcnk6IHR5cGUgPT09ICdzZWNvbmRhcnknLFxcbiAgICBzdWNjZXNzOiB0eXBlID09PSAnc3VjY2VzcycsXFxuICAgIHdhcm5pbmc6IHR5cGUgPT09ICd3YXJuaW5nJyxcXG4gICAgYWxlcnQ6IHR5cGUgPT09ICdhbGVydCdcXG4gIH1cXFwiIHRyYW5zaXRpb249XFxcImZhZGVcXFwiIHYtc2hvdz1cXFwibWVzc2FnZXMubGVuZ3RoID4gMFxcXCI+XFxuICA8dWw+XFxuICAgIDxsaSB2LWZvcj1cXFwibWVzc2FnZSBpbiBtZXNzYWdlc1xcXCIgdHJhY2stYnk9XFxcIiRpbmRleFxcXCI+e3sgbWVzc2FnZSB9fTwvbGk+XFxuICA8L3VsPlxcbiAgPGJ1dHRvbiBjbGFzcz1cXFwiY2xvc2UtYnV0dG9uXFxcIiBhcmlhLWxhYmVsPVxcXCJEaXNtaXNzIGFsZXJ0XFxcIiB0eXBlPVxcXCJidXR0b25cXFwiIHYtaWY9XFxcImNhbkNsb3NlXFxcIiB2LW9uOmNsaWNrPVxcXCJjbG9zZSgpXFxcIj5cXG4gICAgPHNwYW4gYXJpYS1oaWRkZW49XFxcInRydWVcXFwiPiZ0aW1lczs8L3NwYW4+XFxuICA8L2J1dHRvbj5cXG48L2Rpdj5cXG5cIjtcblxufSx7fV0sNDpbZnVuY3Rpb24ocmVxdWlyZSxtb2R1bGUsZXhwb3J0cyl7XG5cbnZhciBpY29uQ29tcG9uZW50ID0gcmVxdWlyZSgnLi9pY29uQ29tcG9uZW50LmpzJyk7XG5cblZ1ZS5jb21wb25lbnQoJ2ljb24nLCBpY29uQ29tcG9uZW50KTtcblxufSx7XCIuL2ljb25Db21wb25lbnQuanNcIjo1fV0sNTpbZnVuY3Rpb24ocmVxdWlyZSxtb2R1bGUsZXhwb3J0cyl7XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICB0ZW1wbGF0ZTogcmVxdWlyZSgnLi9pY29uVGVtcGxhdGUuaHRtbCcpLFxuICBwcm9wczogWyduYW1lJ11cbn07XG5cbn0se1wiLi9pY29uVGVtcGxhdGUuaHRtbFwiOjZ9XSw2OltmdW5jdGlvbihyZXF1aXJlLG1vZHVsZSxleHBvcnRzKXtcbm1vZHVsZS5leHBvcnRzID0gXCJcXG48c3ZnIGNsYXNzPVxcXCJpY29uLWltYWdlIHt7IG5hbWUgfX1cXFwiPlxcbiAgPHVzZSB4bWxuczp4bGluaz1cXFwiaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGlua1xcXCIgeGxpbms6aHJlZj1cXFwiI2ljb24te3sgbmFtZSB9fVxcXCI+PC91c2U+XFxuPC9zdmc+XFxuXCI7XG5cbn0se31dLDc6W2Z1bmN0aW9uKHJlcXVpcmUsbW9kdWxlLGV4cG9ydHMpe1xuXG52YXIgbG9hZGVyQ29tcG9uZW50ID0gcmVxdWlyZSgnLi9sb2FkZXJDb21wb25lbnQuanMnKTtcblxuVnVlLmNvbXBvbmVudCgnbG9hZGVyJywgbG9hZGVyQ29tcG9uZW50KTtcblxufSx7XCIuL2xvYWRlckNvbXBvbmVudC5qc1wiOjh9XSw4OltmdW5jdGlvbihyZXF1aXJlLG1vZHVsZSxleHBvcnRzKXtcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIHRlbXBsYXRlOiByZXF1aXJlKCcuL2xvYWRlclRlbXBsYXRlLmh0bWwnKSxcbiAgZGF0YSgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgZ3JlZXRpbmc6ICdsb2FkZXIgY29tcG9uZW50JyxcbiAgICB9O1xuICB9LFxuICBtZXRob2RzOiB7XG4gICAgc2F5SGkoKSB7XG4gICAgICBjb25zb2xlLmxvZygnaGkhJyk7XG4gICAgfVxuICB9XG59O1xuXG59LHtcIi4vbG9hZGVyVGVtcGxhdGUuaHRtbFwiOjl9XSw5OltmdW5jdGlvbihyZXF1aXJlLG1vZHVsZSxleHBvcnRzKXtcbm1vZHVsZS5leHBvcnRzID0gXCI8ZGl2IGNsYXNzPVxcXCJsb2FkZXJcXFwiPkxvYWRpbmcuLi48L2Rpdj5cXG5cIjtcblxufSx7fV0sMTA6W2Z1bmN0aW9uKHJlcXVpcmUsbW9kdWxlLGV4cG9ydHMpe1xuXG52YXIgbW9kYWxDb21wb25lbnQgPSByZXF1aXJlKCcuL21vZGFsQ29tcG9uZW50LmpzJyk7XG5cblZ1ZS5jb21wb25lbnQoJ21vZGFsJywgbW9kYWxDb21wb25lbnQpO1xuXG59LHtcIi4vbW9kYWxDb21wb25lbnQuanNcIjoxMX1dLDExOltmdW5jdGlvbihyZXF1aXJlLG1vZHVsZSxleHBvcnRzKXtcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIHRlbXBsYXRlOiByZXF1aXJlKCcuL21vZGFsVGVtcGxhdGUuaHRtbCcpLFxuICBwcm9wczoge1xuICAgIHNob3c6IHtcbiAgICAgIHR5cGU6IEJvb2xlYW4sXG4gICAgICByZXF1aXJlZDogdHJ1ZSxcbiAgICAgIHR3b1dheTogdHJ1ZVxuICAgIH0sXG4gICAgbW9kYWxTaXplOiB7XG4gICAgICB0eXBlOiBTdHJpbmcsXG4gICAgICBkZWZhdWx0c1RvOiAnZnVsbCdcbiAgICB9XG4gIH0sXG4gIGNvbXB1dGVkOiB7XG4gICAgaXNNZW51KCkge1xuICAgICAgcmV0dXJuIHRoaXMubW9kYWxTaXplID09PSAnbWVudSc7XG4gICAgfVxuICB9XG59O1xuXG59LHtcIi4vbW9kYWxUZW1wbGF0ZS5odG1sXCI6MTJ9XSwxMjpbZnVuY3Rpb24ocmVxdWlyZSxtb2R1bGUsZXhwb3J0cyl7XG5tb2R1bGUuZXhwb3J0cyA9IFwiXFxuPGRpdiBjbGFzcz1cXFwibW9kYWxcXFwiIHRyYW5zaXRpb249XFxcInpvb20taW5cXFwiIHYtc2hvdz1cXFwic2hvd1xcXCIgdi1vbjpjbGljay5wcmV2ZW50PVxcXCJzaG93ID0gZmFsc2VcXFwiPlxcbiAgPGRpdiA6Y2xhc3M9XFxcInsgJ21vZGFsLWNvbnRlbnQnOiB0cnVlLCAnc21hbGwnOiBtb2RhbFNpemUgPT09ICdzbWFsbCcsICdmdWxsJzogbW9kYWxTaXplID09PSAnZnVsbCcgfVxcXCI+XFxuICAgIDxkaXYgY2xhc3M9XFxcIm1vZGFsLWhlYWRlclxcXCI+XFxuICAgICAgPHNsb3QgbmFtZT1cXFwiaGVhZGVyXFxcIj48L3Nsb3Q+XFxuICAgIDwvZGl2PlxcbiAgICA8c2xvdCBuYW1lPVxcXCJjb250ZW50XFxcIj48L3Nsb3Q+XFxuICAgIDxzcGFuIHYtb246Y2xpY2s9XFxcInNob3cgPSBmYWxzZVxcXCIgYXJpYS1sYWJlbD1cXFwiQ2xvc2VcXFwiPiYjMjE1Ozwvc3Bhbj5cXG4gIDwvZGl2PlxcbjwvZGl2PlxcblwiO1xuXG59LHt9XSwxMzpbZnVuY3Rpb24ocmVxdWlyZSxtb2R1bGUsZXhwb3J0cyl7XG5cbnZhciBwcm9tcHRDb21wb25lbnQgPSByZXF1aXJlKCcuL3Byb21wdENvbXBvbmVudCcpO1xuXG5WdWUuY29tcG9uZW50KCdwcm9tcHQnLCBwcm9tcHRDb21wb25lbnQpO1xuXG59LHtcIi4vcHJvbXB0Q29tcG9uZW50XCI6MTR9XSwxNDpbZnVuY3Rpb24ocmVxdWlyZSxtb2R1bGUsZXhwb3J0cyl7XG5cbnZhciBkZWZhdWx0TGFiZWxzID0ge1xuICBxdWVzdGlvbjogJycsXG4gIHllczogJ1N1Ym1pdCcsXG4gIG5vOiAnQ2FuY2VsJ1xufTtcblxuZnVuY3Rpb24gcHJvbXB0KHZtLCBvcHRpb25zLCBzaG93SW5wdXQpIHtcbiAgdmFyIHVud2F0Y2g7XG5cbiAgdm0ucXVlc3Rpb25MYWJlbCA9IG9wdGlvbnMucXVlc3Rpb247XG4gIHZtLnllc0xhYmVsID0gb3B0aW9ucy55ZXNMYWJlbCB8fCBkZWZhdWx0TGFiZWxzLnllcztcbiAgdm0ubm9MYWJlbCA9IG9wdGlvbnMubm9MYWJlbCB8fCBkZWZhdWx0TGFiZWxzLm5vO1xuICB2bS5jb25maXJtZWQgPSB1bmRlZmluZWQ7XG4gIHZtLnNob3dJbnB1dCA9IHNob3dJbnB1dDtcbiAgdm0uc2hvdyA9IHRydWU7XG5cbiAgdW53YXRjaCA9IHZtLiR3YXRjaCgnJGRhdGEuY29uZmlybWVkJywgZnVuY3Rpb24gKG5ld1ZhbCwgb2xkVmFsKSB7XG4gICAgaWYgKG5ld1ZhbCAmJiBfLmlzRnVuY3Rpb24ob3B0aW9ucy55ZXMpKSB7XG4gICAgICBvcHRpb25zLnllcygoc2hvd0lucHV0KSA/IHZtLnByb21wdFZhbHVlIDogbnVsbCk7XG4gICAgfSBlbHNlIGlmICghbmV3VmFsICYmIF8uaXNGdW5jdGlvbiAob3B0aW9ucy5ubykpIHtcbiAgICAgIG9wdGlvbnMubm8oKTtcbiAgICB9XG4gICAgdW53YXRjaCgpO1xuICAgIHZtLnNob3cgPSBmYWxzZTtcbiAgfSk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICB0ZW1wbGF0ZTogcmVxdWlyZSgnLi9wcm9tcHRUZW1wbGF0ZS5odG1sJyksXG4gIGRhdGEoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHByb21wdFZhbHVlOiAnJyxcbiAgICAgIHF1ZXN0aW9uTGFiZWw6IGRlZmF1bHRMYWJlbHMucXVlc3Rpb25MYWJlbCxcbiAgICAgIHllc0xhYmVsOiBkZWZhdWx0TGFiZWxzLnllc0xhYmVsLFxuICAgICAgbm9MYWJlbDogZGVmYXVsdExhYmVscy5ub0xhYmVsLFxuICAgICAgc2hvdzogZmFsc2UsXG4gICAgICBjb25maXJtZWQ6IGZhbHNlLFxuICAgICAgc2hvd0lucHV0OiBmYWxzZSxcbiAgICAgIGFzayhvcHRpb25zKSB7XG4gICAgICAgIHByb21wdCh0aGlzLCBvcHRpb25zLCB0cnVlKTtcbiAgICAgIH0sXG4gICAgICBjb25maXJtKG9wdGlvbnMpIHtcbiAgICAgICAgcHJvbXB0KHRoaXMsIG9wdGlvbnMsIGZhbHNlKTtcbiAgICAgIH1cbiAgICB9O1xuICB9LFxuICB3YXRjaDoge1xuICAgIHNob3codmFsKSB7XG4gICAgICBpZiAodmFsID09PSB0cnVlICYmIHRoaXMuJGNoaWxkcmVuLmxlbmd0aCA+IDApIHtcbiAgICAgICAgdGhpcy5wcm9tcHRWYWx1ZSA9ICcnO1xuICAgICAgICB0aGlzLiRjaGlsZHJlblswXS4kY2hpbGRyZW5bMF0uJGVscy5pbnB1dC5mb2N1cygpO1xuICAgICAgfVxuICAgIH1cbiAgfSxcbiAgbWV0aG9kczoge1xuICAgIHllcygpIHtcbiAgICAgIHRoaXMuY29uZmlybWVkID0gdHJ1ZTtcbiAgICB9LFxuICAgIG5vKCkge1xuICAgICAgdGhpcy5jb25maXJtZWQgPSBmYWxzZTtcbiAgICB9XG4gIH1cbn07XG5cbn0se1wiLi9wcm9tcHRUZW1wbGF0ZS5odG1sXCI6MTV9XSwxNTpbZnVuY3Rpb24ocmVxdWlyZSxtb2R1bGUsZXhwb3J0cyl7XG5tb2R1bGUuZXhwb3J0cyA9IFwiXFxuXFxuPGRpdiBjbGFzcz1cXFwicHJvbXB0IHByb21wdC1tb2RhbFxcXCIgdHJhbnNpdGlvbj1cXFwiem9vbS1pblxcXCIgdi1zaG93PVxcXCJzaG93XFxcIj5cXG4gIDxkaXYgY2xhc3M9XFxcInByb21wdC1vdmVybGF5XFxcIiB2LW9uOmNsaWNrPVxcXCJubygpXFxcIj48L2Rpdj5cXG4gIDxkaXYgY2xhc3M9XFxcInByb21wdC1jb250ZW50XFxcIj5cXG4gICAgPHYtZm9ybSA6c3VibWl0LWNhbGxiYWNrPVxcXCJ5ZXNcXFwiIDphamF4PVxcXCJ0cnVlXFxcIj5cXG4gICAgICA8cCBjbGFzcz1cXFwidGV4dC1jZW50ZXJcXFwiPnt7IHF1ZXN0aW9uTGFiZWwgfX08L3A+XFxuICAgICAgPHYtaW5wdXQgdHlwZT1cXFwidGV4dFxcXCIgbGFiZWw9XFxcIlJlc3BvbnNlXFxcIiBuYW1lPVxcXCJwcm9tcHRSZXNwb25zZVxcXCIgOnZhbHVlLnN5bmM9XFxcInByb21wdFZhbHVlXFxcIiA6cmVxdWlyZWQ9XFxcInRydWVcXFwiPjwvdi1pbnB1dD5cXG4gICAgICA8ZGl2IGNsYXNzPVxcXCJjb250cm9sc1xcXCI+XFxuICAgICAgICA8YnV0dG9uIHR5cGU9XFxcImJ1dHRvblxcXCIgY2xhc3M9XFxcInRpbnlcXFwiIHR5cGU9XFxcImJ1dHRvblxcXCIgdi1vbjpjbGljaz1cXFwibm8oKVxcXCI+e3sgbm9MYWJlbCB9fTwvYnV0dG9uPlxcbiAgICAgICAgPGJ1dHRvbiB0eXBlPVxcXCJzdWJtaXRcXFwiIGNsYXNzPVxcXCJ0aW55XFxcIiB0eXBlPVxcXCJzdWJtaXRcXFwiPnt7IHllc0xhYmVsIH19PC9idXR0b24+XFxuICAgICAgPC9kaXY+XFxuICAgIDwvdi1mb3JtPlxcbiAgPC9kaXY+XFxuPC9kaXY+XFxuXCI7XG5cbn0se31dLDE2OltmdW5jdGlvbihyZXF1aXJlLG1vZHVsZSxleHBvcnRzKXtcblxudmFyIHRhYkNvbXBvbmVudCA9IHJlcXVpcmUoJy4vdGFiQ29tcG9uZW50LmpzJyk7XG5cblZ1ZS5jb21wb25lbnQoJ3RhYicsIHRhYkNvbXBvbmVudCk7XG5cbn0se1wiLi90YWJDb21wb25lbnQuanNcIjoxN31dLDE3OltmdW5jdGlvbihyZXF1aXJlLG1vZHVsZSxleHBvcnRzKXtcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIHRlbXBsYXRlOiByZXF1aXJlKCcuL3RhYlRlbXBsYXRlLmh0bWwnKSxcbiAgcHJvcHM6IHtcbiAgICBoZWFkaW5nOiB7XG4gICAgICB0eXBlOiBTdHJpbmcsXG4gICAgICByZXF1aXJlZDogdHJ1ZVxuICAgIH0sXG4gICAgZGlzYWJsZWQ6IHtcbiAgICAgIHR5cGU6IEJvb2xlYW4sXG4gICAgICBkZWZhdWx0OiBmYWxzZVxuICAgIH0sXG4gICAgY2xpY2tDYWxsYmFjazoge1xuICAgICAgdHlwZTogRnVuY3Rpb25cbiAgICB9XG4gIH0sXG4gIGRhdGEoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGluZGV4OiAwLFxuICAgICAgc2hvdzogZmFsc2VcbiAgICB9O1xuICB9LFxuICBjb21wdXRlZDoge1xuICAgIHNob3coKSB7XG4gICAgICByZXR1cm4gKHRoaXMuJHBhcmVudC5hY3RpdmUgPT0gdGhpcy5pbmRleCk7XG4gICAgfVxuICB9LFxuICB3YXRjaDoge1xuICAgIGhlYWRpbmcoKSB7XG4gICAgICB0aGlzLiRwYXJlbnQudGFic1t0aGlzLmluZGV4XS5oZWFkaW5nID0gdGhpcy5oZWFkaW5nO1xuICAgIH1cbiAgfSxcbiAgY3JlYXRlZCgpIHtcbiAgICB0aGlzLiRwYXJlbnQudGFicy5wdXNoKHtcbiAgICAgIGhlYWRpbmc6IHRoaXMuaGVhZGluZyxcbiAgICAgIGRpc2FibGVkOiB0aGlzLmRpc2FibGVkLFxuICAgICAgYWN0aXZlOiBmYWxzZVxuICAgIH0pO1xuICB9LFxuICByZWFkeSgpIHtcbiAgICBmb3IgKHZhciBpbmRleCBpbiB0aGlzLiRwYXJlbnQuJGNoaWxkcmVuKSB7XG4gICAgICBpZiAodGhpcy4kcGFyZW50LiRjaGlsZHJlbltpbmRleF0uJGVsID09IHRoaXMuJGVsKSB7XG4gICAgICAgIHRoaXMuaW5kZXggPSBpbmRleDtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfVxuICB9LFxuICBldmVudHM6IHtcbiAgICBUQUJfQ09NUE9ORU5UX1RBQl9DTElDS0VEOiBmdW5jdGlvbiBUYWJDbGlja2VkKCkge1xuICAgICAgaWYgKHR5cGVvZiB0aGlzLmNsaWNrQ2FsbGJhY2sgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgdGhpcy5jbGlja0NhbGxiYWNrKCk7XG4gICAgICB9XG4gICAgfVxuICB9XG59O1xuXG59LHtcIi4vdGFiVGVtcGxhdGUuaHRtbFwiOjE4fV0sMTg6W2Z1bmN0aW9uKHJlcXVpcmUsbW9kdWxlLGV4cG9ydHMpe1xubW9kdWxlLmV4cG9ydHMgPSBcIjxkaXYgY2xhc3M9XFxcInRhYlxcXCIgdi1zaG93PVxcXCJzaG93XFxcIj5cXG4gIDxzbG90Pjwvc2xvdD5cXG48L2Rpdj5cXG5cIjtcblxufSx7fV0sMTk6W2Z1bmN0aW9uKHJlcXVpcmUsbW9kdWxlLGV4cG9ydHMpe1xuXG52YXIgdGFic0NvbXBvbmVudCA9IHJlcXVpcmUoJy4vdGFic0NvbXBvbmVudC5qcycpO1xuXG5yZXF1aXJlKCcuL3RhYi90YWIuanMnKTtcblxuVnVlLmNvbXBvbmVudCgndGFicycsIHRhYnNDb21wb25lbnQpO1xuXG59LHtcIi4vdGFiL3RhYi5qc1wiOjE2LFwiLi90YWJzQ29tcG9uZW50LmpzXCI6MjB9XSwyMDpbZnVuY3Rpb24ocmVxdWlyZSxtb2R1bGUsZXhwb3J0cyl7XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICB0ZW1wbGF0ZTogcmVxdWlyZSgnLi90YWJzVGVtcGxhdGUuaHRtbCcpLFxuICBwcm9wczoge1xuICAgIGFjdGl2ZToge1xuICAgICAgdHlwZTogTnVtYmVyLFxuICAgICAgZGVmYXVsdDogMFxuICAgIH1cbiAgfSxcbiAgZGF0YSgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgdGFiczogW11cbiAgICB9O1xuICB9LFxuICByZWFkeSgpIHtcbiAgICBpZiAodGhpcy50YWJzWzBdKSB7XG4gICAgICB0aGlzLnRhYnNbMF0uYWN0aXZlID0gdHJ1ZTtcbiAgICB9XG4gIH0sXG4gIG1ldGhvZHM6IHtcbiAgICBoYW5kbGVUYWJMaXN0Q2xpY2soaW5kZXgsIGVsKSB7XG4gICAgICBpZiAoIWVsLmRpc2FibGVkKSB0aGlzLmFjdGl2ZSA9IGluZGV4O1xuXG4gICAgICBmb3IgKHZhciBpID0gMCwgaiA9IHRoaXMudGFicy5sZW5ndGg7IGkgPCBqOyBpKyspIHtcbiAgICAgICAgdGhpcy50YWJzW2ldLmFjdGl2ZSA9IChpID09IGluZGV4KTtcbiAgICAgICAgaWYgKHRoaXMudGFic1tpXS5hY3RpdmUpIHtcbiAgICAgICAgICB0aGlzLiRjaGlsZHJlbltpXS4kZW1pdCgnVEFCX0NPTVBPTkVOVF9UQUJfQ0xJQ0tFRCcpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG59O1xuXG59LHtcIi4vdGFic1RlbXBsYXRlLmh0bWxcIjoyMX1dLDIxOltmdW5jdGlvbihyZXF1aXJlLG1vZHVsZSxleHBvcnRzKXtcbm1vZHVsZS5leHBvcnRzID0gXCJcXG5cXG48ZGl2IGNsYXNzPVxcXCJ0YWJzXFxcIj5cXG4gIDwhLS0gVGFicyBOYXYgLS0+XFxuICA8dWwgY2xhc3M9XFxcInRhYi1uYXZcXFwiPlxcbiAgICA8bGkgdi1mb3I9XFxcInRhYiBpbiB0YWJzXFxcIiB2LWJpbmQ6Y2xhc3M9XFxcInsgJ2FjdGl2ZSc6IHRhYi5hY3RpdmUgfVxcXCIgdi1vbjpjbGljay5wcmV2ZW50PVxcXCJoYW5kbGVUYWJMaXN0Q2xpY2soJGluZGV4LCB0YWIpXFxcIiA6ZGlzYWJsZWQ9XFxcInRhYi5kaXNhYmxlZFxcXCI+XFxuICAgICAge3sgdGFiLmhlYWRpbmcgfX1cXG4gICAgPC9saT5cXG4gIDwvdWw+XFxuXFxuICA8IS0tIFRhYiBQYW5lcyAtLT5cXG4gIDxkaXYgY2xhc3M9XFxcInRhYi1jb250ZW50XFxcIiB2LWVsOnRhYkNvbnRlbnQ+XFxuICAgICAgPHNsb3Q+PC9zbG90PlxcbiAgPC9kaXY+XFxuPC9kaXY+XFxuXCI7XG5cbn0se31dLDIyOltmdW5jdGlvbihyZXF1aXJlLG1vZHVsZSxleHBvcnRzKXtcblxudmFyIHZDaGVja2JveENvbXBvbmVudCA9IHJlcXVpcmUoJy4vdkNoZWNrYm94Q29tcG9uZW50LmpzJyk7XG5cblZ1ZS5jb21wb25lbnQoJ3ZDaGVja2JveCcsIHZDaGVja2JveENvbXBvbmVudCk7XG5cbn0se1wiLi92Q2hlY2tib3hDb21wb25lbnQuanNcIjoyM31dLDIzOltmdW5jdGlvbihyZXF1aXJlLG1vZHVsZSxleHBvcnRzKXtcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIHRlbXBsYXRlOiByZXF1aXJlKCcuL3ZDaGVja2JveFRlbXBsYXRlLmh0bWwnKSxcbiAgZGF0YSgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgaWNvbjogJ3VuY2hlY2tlZCcsXG4gICAgICBpc0Vycm9yOiBmYWxzZVxuICAgIH07XG4gIH0sXG4gIHByb3BzOiB7XG4gICAgY2hlY2tlZDoge1xuICAgICAgdHlwZTogQm9vbGVhbixcbiAgICAgIHJlcXVpcmVkOiB0cnVlLFxuICAgICAgdHdvV2F5OiB0cnVlXG4gICAgfSxcbiAgICBsYWJlbDoge1xuICAgICAgdHlwZTogU3RyaW5nLFxuICAgICAgcmVxdWlyZWQ6IHRydWVcbiAgICB9LFxuICAgIHJlcXVpcmVkOiB7XG4gICAgICB0eXBlOiBCb29sZWFuLFxuICAgICAgZGVmYXVsdHNUbzogZmFsc2VcbiAgICB9XG4gIH0sXG4gIHdhdGNoOiB7XG4gICAgY2hlY2tlZCh2YWwpIHtcbiAgICAgIHRoaXMuaWNvbiA9ICh2YWwgPT09IHRydWUpID8gJ2NoZWNrZWQnIDogJ3VuY2hlY2tlZCc7XG4gICAgfVxuICB9LFxuICByZWFkeSgpIHtcbiAgICB0aGlzLmljb24gPSAodGhpcy5jaGVja2VkID09PSB0cnVlKSA/ICdjaGVja2VkJyA6ICd1bmNoZWNrZWQnO1xuICB9LFxuICBtZXRob2RzOiB7XG4gICAgdG9nZ2xlKCkge1xuICAgICAgdGhpcy5jaGVja2VkID0gIXRoaXMuY2hlY2tlZDtcbiAgICB9LFxuICAgIGlzVmFsaWQoKSB7XG4gICAgICB0aGlzLmlzRXJyb3IgPSAodGhpcy5yZXF1aXJlZCkgPyAhdGhpcy5jaGVja2VkIDogZmFsc2U7XG4gICAgICByZXR1cm4gIXRoaXMuaXNFcnJvcjtcbiAgICB9XG4gIH1cbn07XG5cbn0se1wiLi92Q2hlY2tib3hUZW1wbGF0ZS5odG1sXCI6MjR9XSwyNDpbZnVuY3Rpb24ocmVxdWlyZSxtb2R1bGUsZXhwb3J0cyl7XG5tb2R1bGUuZXhwb3J0cyA9IFwiXFxuPGRpdiA6Y2xhc3M9XFxcInsgJ2NoZWNrYm94JzogdHJ1ZSwgJ2Vycm9yJzogaXNFcnJvciB9XFxcIj5cXG4gIDxpY29uIHYtb246Y2xpY2s9XFxcInRvZ2dsZSgpXFxcIiA6bmFtZT1cXFwiaWNvblxcXCI+PC9pY29uPlxcbiAgPHNwYW4gdi1vbjpjbGljaz1cXFwidG9nZ2xlKClcXFwiPnt7IGxhYmVsIH19PC9zcGFuPlxcbjwvZGl2PlxcblwiO1xuXG59LHt9XSwyNTpbZnVuY3Rpb24ocmVxdWlyZSxtb2R1bGUsZXhwb3J0cyl7XG5cbnZhciB2Rm9ybUNvbXBvbmVudCA9IHJlcXVpcmUoJy4vdkZvcm1Db21wb25lbnQuanMnKTtcblxuVnVlLmNvbXBvbmVudCgndkZvcm0nLCB2Rm9ybUNvbXBvbmVudCk7XG5cbn0se1wiLi92Rm9ybUNvbXBvbmVudC5qc1wiOjI2fV0sMjY6W2Z1bmN0aW9uKHJlcXVpcmUsbW9kdWxlLGV4cG9ydHMpe1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgdGVtcGxhdGU6IHJlcXVpcmUoJy4vdkZvcm1UZW1wbGF0ZS5odG1sJyksXG4gIHByb3BzOiB7XG4gICAgbWV0aG9kOiB7XG4gICAgICB0eXBlOiBTdHJpbmcsXG4gICAgICBkZWZhdWx0c1RvOiAnUE9TVCdcbiAgICB9LFxuICAgIGFjdGlvbjoge1xuICAgICAgdHlwZTogU3RyaW5nLFxuICAgICAgZGVmYXVsdHNUbzogJydcbiAgICB9LFxuICAgIGFqYXg6IHtcbiAgICAgIHR5cGU6IEJvb2xlYW4sXG4gICAgICBkZWZhdWx0c1RvOiBmYWxzZVxuICAgIH0sXG4gICAgc3VibWl0Q2FsbGJhY2s6IHtcbiAgICAgIHR5cGU6IEZ1bmN0aW9uXG4gICAgfVxuICB9LFxuICBtZXRob2RzOiB7XG4gICAgc3VibWl0Rm9ybShldmVudCkge1xuICAgICAgaWYgKHRoaXMuYWpheCB8fCAhdGhpcy5pc1ZhbGlkKCkpIHtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgIH1cblxuICAgICAgaWYgKHRoaXMuYWpheCAmJiB0aGlzLmlzVmFsaWQoKSAmJiB0eXBlb2YgdGhpcy5zdWJtaXRDYWxsYmFjayA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICB0aGlzLnN1Ym1pdENhbGxiYWNrKCk7XG4gICAgICB9XG4gICAgfSxcbiAgICBpc1ZhbGlkKCkge1xuICAgICAgdmFyIHNlbGYgPSB0aGlzLFxuICAgICAgICBmb3JtSXNWYWxpZCA9IHRydWU7XG5cbiAgICAgIGZvciAodmFyIGkgPSAwLCBqID0gc2VsZi4kY2hpbGRyZW4ubGVuZ3RoOyBpIDwgajsgaSsrKSB7XG4gICAgICAgIGlmIChfLmlzRnVuY3Rpb24oc2VsZi4kY2hpbGRyZW5baV0uaXNWYWxpZCkpIHsgLy8gaGFzIGlucHV0IHZhbGlkYXRpb24gYXR0YWNoZWRcbiAgICAgICAgICBmb3JtSXNWYWxpZCA9IGZvcm1Jc1ZhbGlkICYmIHNlbGYuJGNoaWxkcmVuW2ldLmlzVmFsaWQoKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICByZXR1cm4gZm9ybUlzVmFsaWQ7XG4gICAgfVxuICB9XG59O1xuXG59LHtcIi4vdkZvcm1UZW1wbGF0ZS5odG1sXCI6Mjd9XSwyNzpbZnVuY3Rpb24ocmVxdWlyZSxtb2R1bGUsZXhwb3J0cyl7XG5tb2R1bGUuZXhwb3J0cyA9IFwiXFxuPGZvcm0gdi1pZj1cXFwiYWpheFxcXCIgdi1lbDpmb3JtIHYtb246c3VibWl0LnByZXZlbnQ9XFxcInN1Ym1pdEZvcm1cXFwiIDptZXRob2Q9XFxcIm1ldGhvZFxcXCIgOmFjdGlvbj1cXFwiYWN0aW9uXFxcIiBub3ZhbGlkYXRlPlxcbiAgPHNsb3Q+PC9zbG90PlxcbjwvZm9ybT5cXG48Zm9ybSB2LWVsc2Ugdi1lbDpmb3JtIHYtb246c3VibWl0PVxcXCJzdWJtaXRGb3JtXFxcIiA6bWV0aG9kPVxcXCJtZXRob2RcXFwiIDphY3Rpb249XFxcImFjdGlvblxcXCIgbm92YWxpZGF0ZT5cXG4gIDxzbG90Pjwvc2xvdD5cXG48L2Zvcm0+XFxuXCI7XG5cbn0se31dLDI4OltmdW5jdGlvbihyZXF1aXJlLG1vZHVsZSxleHBvcnRzKXtcblxudmFyIHZJbnB1dENvbXBvbmVudCA9IHJlcXVpcmUoJy4vdklucHV0Q29tcG9uZW50LmpzJyk7XG5cblZ1ZS5jb21wb25lbnQoJ3ZJbnB1dCcsIHZJbnB1dENvbXBvbmVudCk7XG5cbn0se1wiLi92SW5wdXRDb21wb25lbnQuanNcIjoyOX1dLDI5OltmdW5jdGlvbihyZXF1aXJlLG1vZHVsZSxleHBvcnRzKXtcblxudmFyIHZhbGlkYXRpb25SdWxlcyA9IHJlcXVpcmUoJy4vdmFsaWRhdGlvblJ1bGVzLmpzJyk7XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICB0ZW1wbGF0ZTogcmVxdWlyZSgnLi92SW5wdXRUZW1wbGF0ZS5odG1sJyksXG4gIHByb3BzOiB7XG4gICAgbGFiZWw6IHtcbiAgICAgIHR5cGU6IFN0cmluZ1xuICAgIH0sXG4gICAgbmFtZToge1xuICAgICAgdHlwZTogU3RyaW5nXG4gICAgfSxcbiAgICB0eXBlOiB7XG4gICAgICB0eXBlOiBTdHJpbmcsXG4gICAgICByZXF1aXJlZDogdHJ1ZVxuICAgIH0sXG4gICAgcGxhY2Vob2xkZXI6IHtcbiAgICAgIHR5cGU6IFN0cmluZ1xuICAgIH0sXG4gICAgaWNvbjoge1xuICAgICAgdHlwZTogU3RyaW5nXG4gICAgfSxcbiAgICB2YWx1ZToge1xuICAgICAgdHlwZTogU3RyaW5nLFxuICAgICAgcmVxdWlyZWQ6IHRydWUsXG4gICAgICB0d29XYXk6IHRydWVcbiAgICB9LFxuICAgIHJlcXVpcmVkOiB7XG4gICAgICB0eXBlOiBCb29sZWFuLFxuICAgICAgZGVmYXVsdHNUbzogZmFsc2VcbiAgICB9LFxuICAgIGVxdWFsVG86IHtcbiAgICAgIHR5cGU6IE9iamVjdCxcbiAgICAgIGRlZmF1bHRzVG86IG51bGxcbiAgICB9LFxuICAgIHNpbXBsZToge1xuICAgICAgdHlwZTogQm9vbGVhbixcbiAgICAgIGRlZmF1bHRzVG86IGZhbHNlXG4gICAgfVxuICB9LFxuICBkYXRhKCkge1xuICAgIHJldHVybiB7XG4gICAgICBlcnJvcjogJydcbiAgICB9O1xuICB9LFxuICBmaWx0ZXJzOiB7XG4gICAgaXNTaW1wbGUodmFsKSB7XG4gICAgICByZXR1cm4gKHRoaXMuc2ltcGxlKSA/ICcnIDogdmFsO1xuICAgIH1cbiAgfSxcbiAgbWV0aG9kczoge1xuICAgIGlzVmFsaWQoKSB7XG4gICAgICB0aGlzLnZhbGlkYXRlKCk7XG4gICAgICByZXR1cm4gKHRoaXMuZXJyb3IubGVuZ3RoID09PSAwKTtcbiAgICB9LFxuICAgIGRlYm91bmNlVmFsaWRhdGU6IF8uZGVib3VuY2UoZnVuY3Rpb24gKCkge1xuICAgICAgdGhpcy52YWxpZGF0ZSgpO1xuICAgIH0sIDUwMCksXG4gICAgdmFsaWRhdGUoKSB7XG4gICAgICB2YXIgbGFiZWwgPSB0aGlzLmxhYmVsIHx8IHRoaXMubmFtZTtcblxuICAgICAgLy8gcmVxdWlyZWQgdmFsaWRhdGlvblxuICAgICAgaWYgKHRoaXMucmVxdWlyZWQgJiYgdGhpcy52YWx1ZS5sZW5ndGggPT09IDApIHtcbiAgICAgICAgdGhpcy5lcnJvciA9IGxhYmVsICsgJyBpcyByZXF1aXJlZCc7XG5cbiAgICAgIC8vIGh0bWw1IGRhdGEgdHlwZSB2YWxpZGF0aW9uXG4gICAgICB9IGVsc2UgaWYgKHZhbGlkYXRpb25SdWxlcy5oYXNPd25Qcm9wZXJ0eSh0aGlzLnR5cGUpICYmICF2YWxpZGF0aW9uUnVsZXNbdGhpcy50eXBlXS5yZWdleC50ZXN0KHRoaXMudmFsdWUpKSB7XG4gICAgICAgIHRoaXMuZXJyb3IgPSB2YWxpZGF0aW9uUnVsZXNbdGhpcy50eXBlXS5kZWZhdWx0RXJyb3I7XG5cbiAgICAgIC8vIGVxdWl2YWxlbmN5IHZhbGlkYXRpb25cbiAgICAgIH0gZWxzZSBpZiAodGhpcy5lcXVhbFRvICYmIHRoaXMuZXF1YWxUby52YWx1ZSAhPT0gdGhpcy52YWx1ZSkge1xuICAgICAgICB0aGlzLmVycm9yID0gJ011c3QgbWF0Y2ggJyArIHRoaXMuZXF1YWxUby5sYWJlbDtcblxuICAgICAgLy8gaW5wdXQgaXMgdmFsaWRcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuZXJyb3IgPSAnJztcbiAgICAgIH1cbiAgICB9XG4gIH1cbn07XG5cbn0se1wiLi92SW5wdXRUZW1wbGF0ZS5odG1sXCI6MzAsXCIuL3ZhbGlkYXRpb25SdWxlcy5qc1wiOjMxfV0sMzA6W2Z1bmN0aW9uKHJlcXVpcmUsbW9kdWxlLGV4cG9ydHMpe1xubW9kdWxlLmV4cG9ydHMgPSBcIlxcbjxsYWJlbCBjbGFzcz1cXFwidi1pbnB1dFxcXCI+XFxuICB7eyBsYWJlbCB8IGlzU2ltcGxlIH19IDxzcGFuIHYtaWY9XFxcIiFyZXF1aXJlZCAmJiAhc2ltcGxlXFxcIiBjbGFzcz1cXFwicmlnaHRcXFwiPm9wdGlvbmFsPC9zcGFuPlxcbiAgPGRpdiBjbGFzcz1cXFwiaW5wdXQtd3JhcFxcXCI+XFxuICAgIDxpIGNsYXNzPVxcXCJmYSBmYS17eyBpY29uIH19XFxcIiB2LWlmPVxcXCJpY29uXFxcIj48L2k+XFxuICAgIDx0ZXh0YXJlYSB2LWlmPVxcXCJ0eXBlID09PSAndGV4dGFyZWEnXFxcIlxcbiAgICAgIHYtZWw6aW5wdXRcXG4gICAgICA6Y2xhc3M9XFxcInsgJ2Vycm9yJzogZXJyb3IubGVuZ3RoID4gMCB9XFxcIlxcbiAgICAgIG5hbWU9XFxcInt7IG5hbWUgfX1cXFwiXFxuICAgICAgcGxhY2Vob2xkZXI9XFxcInt7IHBsYWNlaG9sZGVyIH19XFxcIlxcbiAgICAgIHYtbW9kZWw9XFxcInZhbHVlXFxcIlxcbiAgICAgIHYtb246Ymx1cj1cXFwidmFsaWRhdGUoKVxcXCI+PC90ZXh0YXJlYT5cXG4gICAgPGlucHV0IHYtZWxzZVxcbiAgICAgIHYtZWw6aW5wdXRcXG4gICAgICA6Y2xhc3M9XFxcInsgJ2Vycm9yJzogZXJyb3IubGVuZ3RoID4gMCB9XFxcIlxcbiAgICAgIG5hbWU9XFxcInt7IG5hbWUgfX1cXFwiXFxuICAgICAgdHlwZT1cXFwie3sgdHlwZSB9fVxcXCJcXG4gICAgICBwbGFjZWhvbGRlcj1cXFwie3sgcGxhY2Vob2xkZXIgfX1cXFwiXFxuICAgICAgdi1tb2RlbD1cXFwidmFsdWVcXFwiXFxuICAgICAgdi1vbjpibHVyPVxcXCJ2YWxpZGF0ZSgpXFxcIiAvPlxcbiAgICA8c21hbGwgdi1pZj1cXFwiZXJyb3IubGVuZ3RoID4gMFxcXCIgdHJhbnNpdGlvbj1cXFwic2xpZGUtdXAteC1zbWFsbFxcXCIgY2xhc3M9XFxcImVycm9yXFxcIj57eyBlcnJvciB9fTwvc21hbGw+XFxuICA8L2Rpdj5cXG48L2xhYmVsPlxcblwiO1xuXG59LHt9XSwzMTpbZnVuY3Rpb24ocmVxdWlyZSxtb2R1bGUsZXhwb3J0cyl7XG5cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIGVtYWlsOiB7XG4gICAgcmVnZXg6IC9eKChbXjw+KClcXFtcXF1cXFxcLiw7Olxcc0BcIl0rKFxcLltePD4oKVxcW1xcXVxcXFwuLDs6XFxzQFwiXSspKil8KFwiLitcIikpQCgoXFxbWzAtOV17MSwzfVxcLlswLTldezEsM31cXC5bMC05XXsxLDN9XFwuWzAtOV17MSwzfV0pfCgoW2EtekEtWlxcLTAtOV0rXFwuKStbYS16QS1aXXsyLH0pKSQvLFxuICAgIGRlZmF1bHRFcnJvcjogJ1BsZWFzZSBlbnRlciBhIHZhbGlkIGVtYWlsIGFkZHJlc3MnXG4gIH0sXG4gIHVybDoge1xuICAgIHJlZ2V4OiAvaHR0cHM/OlxcL1xcLyh3d3dcXC4pP1stYS16QS1aMC05QDolLl9cXCt+Iz1dezIsMjU2fVxcLlthLXpdezIsNH1cXGIoWy1hLXpBLVowLTlAOiVfXFwrLn4jPyYvLz1dKikvLFxuICAgIGRlZmF1bHRFcnJvcjogJ1BsZWFzZSBlbnRlciBhIHZhbGlkIFVSTCdcbiAgfSxcbiAgbnVtYmVyOiB7XG4gICAgcmVnZXg6IC9bLS4wLTldKy8sXG4gICAgZGVmYXVsdEVycm9yOiAnUGxlYXNlIGVudGVyIGEgdmFsaWQgbnVtYmVyJ1xuICB9XG59O1xuXG59LHt9XSwzMjpbZnVuY3Rpb24ocmVxdWlyZSxtb2R1bGUsZXhwb3J0cyl7XG5cbnZhciB2U2VsZWN0Q29tcG9uZW50ID0gcmVxdWlyZSgnLi92U2VsZWN0Q29tcG9uZW50LmpzJyk7XG5cblZ1ZS5jb21wb25lbnQoJ3ZTZWxlY3QnLCB2U2VsZWN0Q29tcG9uZW50KTtcblxufSx7XCIuL3ZTZWxlY3RDb21wb25lbnQuanNcIjozM31dLDMzOltmdW5jdGlvbihyZXF1aXJlLG1vZHVsZSxleHBvcnRzKXtcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIHRlbXBsYXRlOiByZXF1aXJlKCcuL3ZTZWxlY3RUZW1wbGF0ZS5odG1sJyksXG4gIHByb3BzOiB7XG4gICAgbGFiZWw6IHtcbiAgICAgIHR5cGU6IFN0cmluZyxcbiAgICAgIGRlZmF1bHRzVG86ICcnXG4gICAgfSxcbiAgICBzZWxlY3RlZDoge1xuICAgICAgdHlwZTogU3RyaW5nLFxuICAgICAgcmVxdWlyZWQ6IHRydWUsXG4gICAgICB0d29XYXk6IHRydWVcbiAgICB9LFxuICAgIG9wdGlvbnM6IHtcbiAgICAgIHR5cGU6IEFycmF5LFxuICAgICAgcmVxdWlyZWQ6IHRydWVcbiAgICB9LFxuICAgIHJlcXVpcmVkOiB7XG4gICAgICB0eXBlOiBCb29sZWFuLFxuICAgICAgZGVmYXVsdHNUbzogZmFsc2VcbiAgICB9XG4gIH0sXG4gIGRhdGEoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGlzRXJyb3I6IGZhbHNlXG4gICAgfTtcbiAgfSxcbiAgcmVhZHkoKSB7XG4gICAgdmFyIHNlbGYgPSB0aGlzLFxuICAgICAgc2VsZWN0ZWRJbmRleCA9IF8uZmluZEluZGV4KHNlbGYub3B0aW9ucywgKG9wdGlvbikgPT4gb3B0aW9uLnZhbHVlID09PSBzZWxmLnNlbGVjdGVkKTtcblxuICAgIGlmIChzZWxmLnJlcXVpcmVkICYmIHNlbGVjdGVkSW5kZXggPT09IC0xKSB7XG4gICAgICBzZWxmLnNlbGVjdGVkID0gc2VsZi5vcHRpb25zWzBdLnZhbHVlO1xuICAgIH1cbiAgfSxcbiAgbWV0aG9kczoge1xuICAgIGlzVmFsaWQoKSB7XG4gICAgICB0aGlzLmlzRXJyb3IgPSAhdGhpcy5yZXF1aXJlZCB8fCB0aGlzLnNlbGVjdGVkLmxlbmd0aCA+IDA7XG4gICAgICByZXR1cm4gdGhpcy5pc0Vycm9yO1xuICAgIH1cbiAgfVxufTtcblxufSx7XCIuL3ZTZWxlY3RUZW1wbGF0ZS5odG1sXCI6MzR9XSwzNDpbZnVuY3Rpb24ocmVxdWlyZSxtb2R1bGUsZXhwb3J0cyl7XG5tb2R1bGUuZXhwb3J0cyA9IFwiXFxuPGxhYmVsIGNsYXNzPVxcXCJ2LXNlbGVjdFxcXCI+XFxuICB7eyBsYWJlbCB9fVxcbiAgPHNlbGVjdCB2LW1vZGVsPVxcXCJzZWxlY3RlZFxcXCIgOmNsYXNzPVxcXCJ7ICdlcnJvcic6IGlzRXJyb3IgfVxcXCI+XFxuICAgIDxvcHRpb24gdi1pZj1cXFwiIXJlcXVpcmVkXFxcIiB2YWx1ZT1cXFwiXFxcIj48L29wdGlvbj5cXG4gICAgPG9wdGlvbiB2LWZvcj1cXFwib3B0aW9uIGluIG9wdGlvbnNcXFwiIDp2YWx1ZT1cXFwib3B0aW9uLnZhbHVlXFxcIj57eyBvcHRpb24ubGFiZWwgfX08L29wdGlvbj5cXG4gIDwvc2VsZWN0PlxcbjwvbGFiZWw+XFxuXCI7XG5cbn0se31dLDM1OltmdW5jdGlvbihyZXF1aXJlLG1vZHVsZSxleHBvcnRzKXtcblxucmVxdWlyZSgnLi9jb21wb25lbnRzL2FsZXJ0L2FsZXJ0LmpzJyk7XG5yZXF1aXJlKCcuL2NvbXBvbmVudHMvaWNvbi9pY29uLmpzJyk7XG5yZXF1aXJlKCcuL2NvbXBvbmVudHMvbW9kYWwvbW9kYWwuanMnKTtcbnJlcXVpcmUoJy4vY29tcG9uZW50cy9wcm9tcHQvcHJvbXB0LmpzJyk7XG5yZXF1aXJlKCcuL2NvbXBvbmVudHMvbG9hZGVyL2xvYWRlci5qcycpO1xucmVxdWlyZSgnLi9jb21wb25lbnRzL3RhYnMvdGFicy5qcycpO1xucmVxdWlyZSgnLi9jb21wb25lbnRzL3ZGb3JtL3ZGb3JtLmpzJyk7XG5yZXF1aXJlKCcuL2NvbXBvbmVudHMvdklucHV0L3ZJbnB1dC5qcycpO1xucmVxdWlyZSgnLi9jb21wb25lbnRzL3ZTZWxlY3QvdlNlbGVjdC5qcycpO1xucmVxdWlyZSgnLi9jb21wb25lbnRzL3ZDaGVja2JveC92Q2hlY2tib3guanMnKTtcblxufSx7XCIuL2NvbXBvbmVudHMvYWxlcnQvYWxlcnQuanNcIjoxLFwiLi9jb21wb25lbnRzL2ljb24vaWNvbi5qc1wiOjQsXCIuL2NvbXBvbmVudHMvbG9hZGVyL2xvYWRlci5qc1wiOjcsXCIuL2NvbXBvbmVudHMvbW9kYWwvbW9kYWwuanNcIjoxMCxcIi4vY29tcG9uZW50cy9wcm9tcHQvcHJvbXB0LmpzXCI6MTMsXCIuL2NvbXBvbmVudHMvdGFicy90YWJzLmpzXCI6MTksXCIuL2NvbXBvbmVudHMvdkNoZWNrYm94L3ZDaGVja2JveC5qc1wiOjIyLFwiLi9jb21wb25lbnRzL3ZGb3JtL3ZGb3JtLmpzXCI6MjUsXCIuL2NvbXBvbmVudHMvdklucHV0L3ZJbnB1dC5qc1wiOjI4LFwiLi9jb21wb25lbnRzL3ZTZWxlY3QvdlNlbGVjdC5qc1wiOjMyfV19LHt9LFszNV0pIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
