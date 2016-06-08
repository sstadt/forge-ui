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
//# sourceMappingURL=data:application/json;base64,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a0IsS0FBSyxRQUFMLENBQWMsTUFBZCxHQUF1QixDQUF4RDtBQUNBLGlCQUFPLEtBQUssT0FBWjtBQUNEO0FBSk07QUFsQ00sS0FBakI7QUEwQ0MsR0E1Q2tDLEVBNENqQyxFQUFDLDBCQUF5QixFQUExQixFQTVDaUMsQ0ExaEJzWCxFQXNrQnhYLElBQUcsQ0FBQyxVQUFTLE9BQVQsRUFBaUIsTUFBakIsRUFBd0IsT0FBeEIsRUFBZ0M7QUFDckUsV0FBTyxPQUFQLEdBQWlCLHlSQUFqQjtBQUVDLEdBSG1DLEVBR2xDLEVBSGtDLENBdGtCcVgsRUF5a0JuWixJQUFHLENBQUMsVUFBUyxPQUFULEVBQWlCLE1BQWpCLEVBQXdCLE9BQXhCLEVBQWdDOztBQUUxQyxZQUFRLDZCQUFSO0FBQ0EsWUFBUSwyQkFBUjtBQUNBLFlBQVEsNkJBQVI7QUFDQSxZQUFRLCtCQUFSO0FBQ0EsWUFBUSwrQkFBUjtBQUNBLFlBQVEsMkJBQVI7QUFDQSxZQUFRLDZCQUFSO0FBQ0EsWUFBUSwrQkFBUjtBQUNBLFlBQVEsaUNBQVI7QUFDQSxZQUFRLHFDQUFSO0FBRUMsR0FiUSxFQWFQLEVBQUMsK0JBQThCLENBQS9CLEVBQWlDLDZCQUE0QixDQUE3RCxFQUErRCxpQ0FBZ0MsQ0FBL0YsRUFBaUcsK0JBQThCLEVBQS9ILEVBQWtJLGlDQUFnQyxFQUFsSyxFQUFxSyw2QkFBNEIsRUFBak0sRUFBb00sdUNBQXNDLEVBQTFPLEVBQTZPLCtCQUE4QixFQUEzUSxFQUE4USxpQ0FBZ0MsRUFBOVMsRUFBaVQsbUNBQWtDLEVBQW5WLEVBYk8sQ0F6a0JnWixFQUF6WixFQXNsQjJWLEVBdGxCM1YsRUFzbEI4VixDQUFDLEVBQUQsQ0F0bEI5ViIsImZpbGUiOiJteXVpLmpzIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt0aHJvdyBuZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpfXZhciBmPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChmLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGYsZi5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkoezE6W2Z1bmN0aW9uKHJlcXVpcmUsbW9kdWxlLGV4cG9ydHMpe1xuXG52YXIgYWxlcnRDb21wb25lbnQgPSByZXF1aXJlKCcuL2FsZXJ0Q29tcG9uZW50LmpzJyk7XG5cblZ1ZS5jb21wb25lbnQoJ2FsZXJ0JywgYWxlcnRDb21wb25lbnQpO1xuXG59LHtcIi4vYWxlcnRDb21wb25lbnQuanNcIjoyfV0sMjpbZnVuY3Rpb24ocmVxdWlyZSxtb2R1bGUsZXhwb3J0cyl7XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICB0ZW1wbGF0ZTogcmVxdWlyZSgnLi9hbGVydFRlbXBsYXRlLmh0bWwnKSxcbiAgcHJvcHM6IHtcbiAgICBjYW5DbG9zZToge1xuICAgICAgdHlwZTogQm9vbGVhbixcbiAgICAgIGRlZmF1bHRzVG86IGZhbHNlXG4gICAgfVxuICB9LFxuICBkYXRhKCkge1xuICAgIHJldHVybiB7XG4gICAgICBtZXNzYWdlczogW10sXG4gICAgICB0eXBlOiAnJ1xuICAgIH07XG4gIH0sXG4gIG1ldGhvZHM6IHtcbiAgICBjbG9zZSgpIHtcbiAgICAgIHRoaXMubWVzc2FnZXMgPSBbXTtcbiAgICB9LFxuICAgIGFkZE1lc3NhZ2UodHlwZSwgbWVzc2FnZSkge1xuICAgICAgaWYgKHRoaXMudHlwZSAhPT0gdHlwZSkge1xuICAgICAgICB0aGlzLnR5cGUgPSB0eXBlO1xuICAgICAgICB0aGlzLm1lc3NhZ2VzID0gW21lc3NhZ2VdO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5tZXNzYWdlcy5wdXNoKG1lc3NhZ2UpO1xuICAgICAgfVxuICAgIH0sXG4gICAgbWVzc2FnZShtZXNzYWdlKSB7XG4gICAgICB0aGlzLmFkZE1lc3NhZ2UoJycsIG1lc3NhZ2UpO1xuICAgIH0sXG4gICAgcHJpbWFyeShtZXNzYWdlKSB7XG4gICAgICB0aGlzLmFkZE1lc3NhZ2UoJ3ByaW1hcnknLCBtZXNzYWdlKTtcbiAgICB9LFxuICAgIHNlY29uZGFyeShtZXNzYWdlKSB7XG4gICAgICB0aGlzLmFkZE1lc3NhZ2UoJ3NlY29uZGFyeScsIG1lc3NhZ2UpO1xuICAgIH0sXG4gICAgc3VjY2VzcyhtZXNzYWdlKSB7XG4gICAgICB0aGlzLmFkZE1lc3NhZ2UoJ3N1Y2Nlc3MnLCBtZXNzYWdlKTtcbiAgICB9LFxuICAgIHdhcm5pbmcobWVzc2FnZSkge1xuICAgICAgdGhpcy5hZGRNZXNzYWdlKCd3YXJuaW5nJywgbWVzc2FnZSk7XG4gICAgfSxcbiAgICBhbGVydChtZXNzYWdlKSB7XG4gICAgICB0aGlzLmFkZE1lc3NhZ2UoJ2FsZXJ0JywgbWVzc2FnZSk7XG4gICAgfVxuICB9XG59O1xuXG59LHtcIi4vYWxlcnRUZW1wbGF0ZS5odG1sXCI6M31dLDM6W2Z1bmN0aW9uKHJlcXVpcmUsbW9kdWxlLGV4cG9ydHMpe1xubW9kdWxlLmV4cG9ydHMgPSBcIlxcbjxkaXYgY2xhc3M9XFxcImFsZXJ0LWJveFxcXCIgdi1iaW5kOmNsYXNzPVxcXCJ7XFxuICAgIGNhbGxvdXQ6IHRydWUsXFxuICAgIHByaW1hcnk6IHR5cGUgPT09ICdwcmltYXJ5JyxcXG4gICAgc2Vjb25kYXJ5OiB0eXBlID09PSAnc2Vjb25kYXJ5JyxcXG4gICAgc3VjY2VzczogdHlwZSA9PT0gJ3N1Y2Nlc3MnLFxcbiAgICB3YXJuaW5nOiB0eXBlID09PSAnd2FybmluZycsXFxuICAgIGFsZXJ0OiB0eXBlID09PSAnYWxlcnQnXFxuICB9XFxcIiB0cmFuc2l0aW9uPVxcXCJmYWRlXFxcIiB2LXNob3c9XFxcIm1lc3NhZ2VzLmxlbmd0aCA+IDBcXFwiPlxcbiAgPHVsPlxcbiAgICA8bGkgdi1mb3I9XFxcIm1lc3NhZ2UgaW4gbWVzc2FnZXNcXFwiIHRyYWNrLWJ5PVxcXCIkaW5kZXhcXFwiPnt7IG1lc3NhZ2UgfX08L2xpPlxcbiAgPC91bD5cXG4gIDxidXR0b24gY2xhc3M9XFxcImNsb3NlLWJ1dHRvblxcXCIgYXJpYS1sYWJlbD1cXFwiRGlzbWlzcyBhbGVydFxcXCIgdHlwZT1cXFwiYnV0dG9uXFxcIiB2LWlmPVxcXCJjYW5DbG9zZVxcXCIgdi1vbjpjbGljaz1cXFwiY2xvc2UoKVxcXCI+XFxuICAgIDxzcGFuIGFyaWEtaGlkZGVuPVxcXCJ0cnVlXFxcIj4mdGltZXM7PC9zcGFuPlxcbiAgPC9idXR0b24+XFxuPC9kaXY+XFxuXCI7XG5cbn0se31dLDQ6W2Z1bmN0aW9uKHJlcXVpcmUsbW9kdWxlLGV4cG9ydHMpe1xuXG52YXIgaWNvbkNvbXBvbmVudCA9IHJlcXVpcmUoJy4vaWNvbkNvbXBvbmVudC5qcycpO1xuXG5WdWUuY29tcG9uZW50KCdpY29uJywgaWNvbkNvbXBvbmVudCk7XG5cbn0se1wiLi9pY29uQ29tcG9uZW50LmpzXCI6NX1dLDU6W2Z1bmN0aW9uKHJlcXVpcmUsbW9kdWxlLGV4cG9ydHMpe1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgdGVtcGxhdGU6IHJlcXVpcmUoJy4vaWNvblRlbXBsYXRlLmh0bWwnKSxcbiAgcHJvcHM6IFsnbmFtZSddXG59O1xuXG59LHtcIi4vaWNvblRlbXBsYXRlLmh0bWxcIjo2fV0sNjpbZnVuY3Rpb24ocmVxdWlyZSxtb2R1bGUsZXhwb3J0cyl7XG5tb2R1bGUuZXhwb3J0cyA9IFwiXFxuPHN2ZyBjbGFzcz1cXFwiaWNvbi1pbWFnZSB7eyBuYW1lIH19XFxcIj5cXG4gIDx1c2UgeG1sbnM6eGxpbms9XFxcImh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmtcXFwiIHhsaW5rOmhyZWY9XFxcIiNpY29uLXt7IG5hbWUgfX1cXFwiPjwvdXNlPlxcbjwvc3ZnPlxcblwiO1xuXG59LHt9XSw3OltmdW5jdGlvbihyZXF1aXJlLG1vZHVsZSxleHBvcnRzKXtcblxudmFyIGxvYWRlckNvbXBvbmVudCA9IHJlcXVpcmUoJy4vbG9hZGVyQ29tcG9uZW50LmpzJyk7XG5cblZ1ZS5jb21wb25lbnQoJ2xvYWRlcicsIGxvYWRlckNvbXBvbmVudCk7XG5cbn0se1wiLi9sb2FkZXJDb21wb25lbnQuanNcIjo4fV0sODpbZnVuY3Rpb24ocmVxdWlyZSxtb2R1bGUsZXhwb3J0cyl7XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICB0ZW1wbGF0ZTogcmVxdWlyZSgnLi9sb2FkZXJUZW1wbGF0ZS5odG1sJyksXG4gIGRhdGEoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGdyZWV0aW5nOiAnbG9hZGVyIGNvbXBvbmVudCcsXG4gICAgfTtcbiAgfSxcbiAgbWV0aG9kczoge1xuICAgIHNheUhpKCkge1xuICAgICAgY29uc29sZS5sb2coJ2hpIScpO1xuICAgIH1cbiAgfVxufTtcblxufSx7XCIuL2xvYWRlclRlbXBsYXRlLmh0bWxcIjo5fV0sOTpbZnVuY3Rpb24ocmVxdWlyZSxtb2R1bGUsZXhwb3J0cyl7XG5tb2R1bGUuZXhwb3J0cyA9IFwiPGRpdiBjbGFzcz1cXFwibG9hZGVyXFxcIj5Mb2FkaW5nLi4uPC9kaXY+XFxuXCI7XG5cbn0se31dLDEwOltmdW5jdGlvbihyZXF1aXJlLG1vZHVsZSxleHBvcnRzKXtcblxudmFyIG1vZGFsQ29tcG9uZW50ID0gcmVxdWlyZSgnLi9tb2RhbENvbXBvbmVudC5qcycpO1xuXG5WdWUuY29tcG9uZW50KCdtb2RhbCcsIG1vZGFsQ29tcG9uZW50KTtcblxufSx7XCIuL21vZGFsQ29tcG9uZW50LmpzXCI6MTF9XSwxMTpbZnVuY3Rpb24ocmVxdWlyZSxtb2R1bGUsZXhwb3J0cyl7XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICB0ZW1wbGF0ZTogcmVxdWlyZSgnLi9tb2RhbFRlbXBsYXRlLmh0bWwnKSxcbiAgcHJvcHM6IHtcbiAgICBzaG93OiB7XG4gICAgICB0eXBlOiBCb29sZWFuLFxuICAgICAgcmVxdWlyZWQ6IHRydWUsXG4gICAgICB0d29XYXk6IHRydWVcbiAgICB9LFxuICAgIG1vZGFsU2l6ZToge1xuICAgICAgdHlwZTogU3RyaW5nLFxuICAgICAgZGVmYXVsdDogJ2Z1bGwnXG4gICAgfSxcbiAgICB0cmFuc2l0aW9uOiB7XG4gICAgICB0eXBlOiBTdHJpbmcsXG4gICAgICBkZWZhdWx0OiAnem9vbS1vdXQnXG4gICAgfVxuICB9XG59O1xuXG59LHtcIi4vbW9kYWxUZW1wbGF0ZS5odG1sXCI6MTJ9XSwxMjpbZnVuY3Rpb24ocmVxdWlyZSxtb2R1bGUsZXhwb3J0cyl7XG5tb2R1bGUuZXhwb3J0cyA9IFwiXFxuPGRpdiBjbGFzcz1cXFwibW9kYWxcXFwiIDp0cmFuc2l0aW9uPVxcXCJ0cmFuc2l0aW9uXFxcIiB2LXNob3c9XFxcInNob3dcXFwiPlxcbiAgPGRpdiB2LW9uOmNsaWNrLnByZXZlbnQgOmNsYXNzPVxcXCJ7ICdtb2RhbC1jb250ZW50JzogdHJ1ZSwgJ3NtYWxsJzogbW9kYWxTaXplID09PSAnc21hbGwnLCAnZnVsbCc6IG1vZGFsU2l6ZSA9PT0gJ2Z1bGwnIH1cXFwiPlxcbiAgICA8ZGl2IGNsYXNzPVxcXCJtb2RhbC1oZWFkZXJcXFwiPlxcbiAgICAgIDxzbG90IG5hbWU9XFxcImhlYWRlclxcXCI+PC9zbG90PlxcbiAgICA8L2Rpdj5cXG4gICAgPHNsb3QgbmFtZT1cXFwiY29udGVudFxcXCI+PC9zbG90PlxcbiAgICA8c3BhbiB2LW9uOmNsaWNrPVxcXCJzaG93ID0gZmFsc2VcXFwiIGFyaWEtbGFiZWw9XFxcIkNsb3NlXFxcIj4mIzIxNTs8L3NwYW4+XFxuICA8L2Rpdj5cXG48L2Rpdj5cXG5cIjtcblxufSx7fV0sMTM6W2Z1bmN0aW9uKHJlcXVpcmUsbW9kdWxlLGV4cG9ydHMpe1xuXG52YXIgcHJvbXB0Q29tcG9uZW50ID0gcmVxdWlyZSgnLi9wcm9tcHRDb21wb25lbnQnKTtcblxuVnVlLmNvbXBvbmVudCgncHJvbXB0JywgcHJvbXB0Q29tcG9uZW50KTtcblxufSx7XCIuL3Byb21wdENvbXBvbmVudFwiOjE0fV0sMTQ6W2Z1bmN0aW9uKHJlcXVpcmUsbW9kdWxlLGV4cG9ydHMpe1xuXG52YXIgZGVmYXVsdExhYmVscyA9IHtcbiAgcXVlc3Rpb246ICcnLFxuICB5ZXM6ICdTdWJtaXQnLFxuICBubzogJ0NhbmNlbCdcbn07XG5cbmZ1bmN0aW9uIHByb21wdCh2bSwgb3B0aW9ucywgc2hvd0lucHV0KSB7XG4gIHZhciB1bndhdGNoO1xuXG4gIHZtLnF1ZXN0aW9uTGFiZWwgPSBvcHRpb25zLnF1ZXN0aW9uO1xuICB2bS55ZXNMYWJlbCA9IG9wdGlvbnMueWVzTGFiZWwgfHwgZGVmYXVsdExhYmVscy55ZXM7XG4gIHZtLm5vTGFiZWwgPSBvcHRpb25zLm5vTGFiZWwgfHwgZGVmYXVsdExhYmVscy5ubztcbiAgdm0uY29uZmlybWVkID0gdW5kZWZpbmVkO1xuICB2bS5zaG93SW5wdXQgPSBzaG93SW5wdXQ7XG4gIHZtLnNob3cgPSB0cnVlO1xuXG4gIHVud2F0Y2ggPSB2bS4kd2F0Y2goJyRkYXRhLmNvbmZpcm1lZCcsIGZ1bmN0aW9uIChuZXdWYWwsIG9sZFZhbCkge1xuICAgIGlmIChuZXdWYWwgJiYgXy5pc0Z1bmN0aW9uKG9wdGlvbnMueWVzKSkge1xuICAgICAgb3B0aW9ucy55ZXMoKHNob3dJbnB1dCkgPyB2bS5wcm9tcHRWYWx1ZSA6IG51bGwpO1xuICAgIH0gZWxzZSBpZiAoIW5ld1ZhbCAmJiBfLmlzRnVuY3Rpb24gKG9wdGlvbnMubm8pKSB7XG4gICAgICBvcHRpb25zLm5vKCk7XG4gICAgfVxuICAgIHVud2F0Y2goKTtcbiAgICB2bS5zaG93ID0gZmFsc2U7XG4gIH0pO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgdGVtcGxhdGU6IHJlcXVpcmUoJy4vcHJvbXB0VGVtcGxhdGUuaHRtbCcpLFxuICBkYXRhKCkge1xuICAgIHJldHVybiB7XG4gICAgICBwcm9tcHRWYWx1ZTogJycsXG4gICAgICBxdWVzdGlvbkxhYmVsOiBkZWZhdWx0TGFiZWxzLnF1ZXN0aW9uTGFiZWwsXG4gICAgICB5ZXNMYWJlbDogZGVmYXVsdExhYmVscy55ZXNMYWJlbCxcbiAgICAgIG5vTGFiZWw6IGRlZmF1bHRMYWJlbHMubm9MYWJlbCxcbiAgICAgIHNob3c6IGZhbHNlLFxuICAgICAgY29uZmlybWVkOiBmYWxzZSxcbiAgICAgIHNob3dJbnB1dDogZmFsc2UsXG4gICAgICBhc2sob3B0aW9ucykge1xuICAgICAgICBwcm9tcHQodGhpcywgb3B0aW9ucywgdHJ1ZSk7XG4gICAgICB9LFxuICAgICAgY29uZmlybShvcHRpb25zKSB7XG4gICAgICAgIHByb21wdCh0aGlzLCBvcHRpb25zLCBmYWxzZSk7XG4gICAgICB9XG4gICAgfTtcbiAgfSxcbiAgd2F0Y2g6IHtcbiAgICBzaG93KHZhbCkge1xuICAgICAgaWYgKHZhbCA9PT0gdHJ1ZSAmJiB0aGlzLiRjaGlsZHJlbi5sZW5ndGggPiAwKSB7XG4gICAgICAgIHRoaXMucHJvbXB0VmFsdWUgPSAnJztcbiAgICAgICAgdGhpcy4kY2hpbGRyZW5bMF0uJGNoaWxkcmVuWzBdLiRlbHMuaW5wdXQuZm9jdXMoKTtcbiAgICAgIH1cbiAgICB9XG4gIH0sXG4gIG1ldGhvZHM6IHtcbiAgICB5ZXMoKSB7XG4gICAgICB0aGlzLmNvbmZpcm1lZCA9IHRydWU7XG4gICAgfSxcbiAgICBubygpIHtcbiAgICAgIHRoaXMuY29uZmlybWVkID0gZmFsc2U7XG4gICAgfVxuICB9XG59O1xuXG59LHtcIi4vcHJvbXB0VGVtcGxhdGUuaHRtbFwiOjE1fV0sMTU6W2Z1bmN0aW9uKHJlcXVpcmUsbW9kdWxlLGV4cG9ydHMpe1xubW9kdWxlLmV4cG9ydHMgPSBcIlxcblxcbjxkaXYgY2xhc3M9XFxcInByb21wdCBwcm9tcHQtbW9kYWxcXFwiIHRyYW5zaXRpb249XFxcInpvb20taW5cXFwiIHYtc2hvdz1cXFwic2hvd1xcXCI+XFxuICA8ZGl2IGNsYXNzPVxcXCJwcm9tcHQtb3ZlcmxheVxcXCIgdi1vbjpjbGljaz1cXFwibm8oKVxcXCI+PC9kaXY+XFxuICA8ZGl2IGNsYXNzPVxcXCJwcm9tcHQtY29udGVudFxcXCI+XFxuICAgIDx2LWZvcm0gOnN1Ym1pdC1jYWxsYmFjaz1cXFwieWVzXFxcIiA6YWpheD1cXFwidHJ1ZVxcXCI+XFxuICAgICAgPHAgY2xhc3M9XFxcInRleHQtY2VudGVyXFxcIj57eyBxdWVzdGlvbkxhYmVsIH19PC9wPlxcbiAgICAgIDx2LWlucHV0IHR5cGU9XFxcInRleHRcXFwiIGxhYmVsPVxcXCJSZXNwb25zZVxcXCIgbmFtZT1cXFwicHJvbXB0UmVzcG9uc2VcXFwiIDp2YWx1ZS5zeW5jPVxcXCJwcm9tcHRWYWx1ZVxcXCIgOnJlcXVpcmVkPVxcXCJ0cnVlXFxcIj48L3YtaW5wdXQ+XFxuICAgICAgPGRpdiBjbGFzcz1cXFwiY29udHJvbHNcXFwiPlxcbiAgICAgICAgPGJ1dHRvbiB0eXBlPVxcXCJidXR0b25cXFwiIGNsYXNzPVxcXCJ0aW55XFxcIiB0eXBlPVxcXCJidXR0b25cXFwiIHYtb246Y2xpY2s9XFxcIm5vKClcXFwiPnt7IG5vTGFiZWwgfX08L2J1dHRvbj5cXG4gICAgICAgIDxidXR0b24gdHlwZT1cXFwic3VibWl0XFxcIiBjbGFzcz1cXFwidGlueVxcXCIgdHlwZT1cXFwic3VibWl0XFxcIj57eyB5ZXNMYWJlbCB9fTwvYnV0dG9uPlxcbiAgICAgIDwvZGl2PlxcbiAgICA8L3YtZm9ybT5cXG4gIDwvZGl2PlxcbjwvZGl2PlxcblwiO1xuXG59LHt9XSwxNjpbZnVuY3Rpb24ocmVxdWlyZSxtb2R1bGUsZXhwb3J0cyl7XG5cbnZhciB0YWJDb21wb25lbnQgPSByZXF1aXJlKCcuL3RhYkNvbXBvbmVudC5qcycpO1xuXG5WdWUuY29tcG9uZW50KCd0YWInLCB0YWJDb21wb25lbnQpO1xuXG59LHtcIi4vdGFiQ29tcG9uZW50LmpzXCI6MTd9XSwxNzpbZnVuY3Rpb24ocmVxdWlyZSxtb2R1bGUsZXhwb3J0cyl7XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICB0ZW1wbGF0ZTogcmVxdWlyZSgnLi90YWJUZW1wbGF0ZS5odG1sJyksXG4gIHByb3BzOiB7XG4gICAgaGVhZGluZzoge1xuICAgICAgdHlwZTogU3RyaW5nLFxuICAgICAgcmVxdWlyZWQ6IHRydWVcbiAgICB9LFxuICAgIGRpc2FibGVkOiB7XG4gICAgICB0eXBlOiBCb29sZWFuLFxuICAgICAgZGVmYXVsdDogZmFsc2VcbiAgICB9LFxuICAgIGNsaWNrQ2FsbGJhY2s6IHtcbiAgICAgIHR5cGU6IEZ1bmN0aW9uXG4gICAgfVxuICB9LFxuICBkYXRhKCkge1xuICAgIHJldHVybiB7XG4gICAgICBpbmRleDogMCxcbiAgICAgIHNob3c6IGZhbHNlXG4gICAgfTtcbiAgfSxcbiAgY29tcHV0ZWQ6IHtcbiAgICBzaG93KCkge1xuICAgICAgcmV0dXJuICh0aGlzLiRwYXJlbnQuYWN0aXZlID09IHRoaXMuaW5kZXgpO1xuICAgIH1cbiAgfSxcbiAgd2F0Y2g6IHtcbiAgICBoZWFkaW5nKCkge1xuICAgICAgdGhpcy4kcGFyZW50LnRhYnNbdGhpcy5pbmRleF0uaGVhZGluZyA9IHRoaXMuaGVhZGluZztcbiAgICB9XG4gIH0sXG4gIGNyZWF0ZWQoKSB7XG4gICAgdGhpcy4kcGFyZW50LnRhYnMucHVzaCh7XG4gICAgICBoZWFkaW5nOiB0aGlzLmhlYWRpbmcsXG4gICAgICBkaXNhYmxlZDogdGhpcy5kaXNhYmxlZCxcbiAgICAgIGFjdGl2ZTogZmFsc2VcbiAgICB9KTtcbiAgfSxcbiAgcmVhZHkoKSB7XG4gICAgZm9yICh2YXIgaW5kZXggaW4gdGhpcy4kcGFyZW50LiRjaGlsZHJlbikge1xuICAgICAgaWYgKHRoaXMuJHBhcmVudC4kY2hpbGRyZW5baW5kZXhdLiRlbCA9PSB0aGlzLiRlbCkge1xuICAgICAgICB0aGlzLmluZGV4ID0gaW5kZXg7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH1cbiAgfSxcbiAgZXZlbnRzOiB7XG4gICAgVEFCX0NPTVBPTkVOVF9UQUJfQ0xJQ0tFRDogZnVuY3Rpb24gVGFiQ2xpY2tlZCgpIHtcbiAgICAgIGlmICh0eXBlb2YgdGhpcy5jbGlja0NhbGxiYWNrID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIHRoaXMuY2xpY2tDYWxsYmFjaygpO1xuICAgICAgfVxuICAgIH1cbiAgfVxufTtcblxufSx7XCIuL3RhYlRlbXBsYXRlLmh0bWxcIjoxOH1dLDE4OltmdW5jdGlvbihyZXF1aXJlLG1vZHVsZSxleHBvcnRzKXtcbm1vZHVsZS5leHBvcnRzID0gXCI8ZGl2IGNsYXNzPVxcXCJ0YWJcXFwiIHYtc2hvdz1cXFwic2hvd1xcXCI+XFxuICA8c2xvdD48L3Nsb3Q+XFxuPC9kaXY+XFxuXCI7XG5cbn0se31dLDE5OltmdW5jdGlvbihyZXF1aXJlLG1vZHVsZSxleHBvcnRzKXtcblxudmFyIHRhYnNDb21wb25lbnQgPSByZXF1aXJlKCcuL3RhYnNDb21wb25lbnQuanMnKTtcblxucmVxdWlyZSgnLi90YWIvdGFiLmpzJyk7XG5cblZ1ZS5jb21wb25lbnQoJ3RhYnMnLCB0YWJzQ29tcG9uZW50KTtcblxufSx7XCIuL3RhYi90YWIuanNcIjoxNixcIi4vdGFic0NvbXBvbmVudC5qc1wiOjIwfV0sMjA6W2Z1bmN0aW9uKHJlcXVpcmUsbW9kdWxlLGV4cG9ydHMpe1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgdGVtcGxhdGU6IHJlcXVpcmUoJy4vdGFic1RlbXBsYXRlLmh0bWwnKSxcbiAgcHJvcHM6IHtcbiAgICBhY3RpdmU6IHtcbiAgICAgIHR5cGU6IE51bWJlcixcbiAgICAgIGRlZmF1bHQ6IDBcbiAgICB9XG4gIH0sXG4gIGRhdGEoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHRhYnM6IFtdXG4gICAgfTtcbiAgfSxcbiAgcmVhZHkoKSB7XG4gICAgaWYgKHRoaXMudGFic1swXSkge1xuICAgICAgdGhpcy50YWJzWzBdLmFjdGl2ZSA9IHRydWU7XG4gICAgfVxuICB9LFxuICBtZXRob2RzOiB7XG4gICAgaGFuZGxlVGFiTGlzdENsaWNrKGluZGV4LCBlbCkge1xuICAgICAgaWYgKCFlbC5kaXNhYmxlZCkgdGhpcy5hY3RpdmUgPSBpbmRleDtcblxuICAgICAgZm9yICh2YXIgaSA9IDAsIGogPSB0aGlzLnRhYnMubGVuZ3RoOyBpIDwgajsgaSsrKSB7XG4gICAgICAgIHRoaXMudGFic1tpXS5hY3RpdmUgPSAoaSA9PSBpbmRleCk7XG4gICAgICAgIGlmICh0aGlzLnRhYnNbaV0uYWN0aXZlKSB7XG4gICAgICAgICAgdGhpcy4kY2hpbGRyZW5baV0uJGVtaXQoJ1RBQl9DT01QT05FTlRfVEFCX0NMSUNLRUQnKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxufTtcblxufSx7XCIuL3RhYnNUZW1wbGF0ZS5odG1sXCI6MjF9XSwyMTpbZnVuY3Rpb24ocmVxdWlyZSxtb2R1bGUsZXhwb3J0cyl7XG5tb2R1bGUuZXhwb3J0cyA9IFwiXFxuXFxuPGRpdiBjbGFzcz1cXFwidGFic1xcXCI+XFxuICA8IS0tIFRhYnMgTmF2IC0tPlxcbiAgPHVsIGNsYXNzPVxcXCJ0YWItbmF2XFxcIj5cXG4gICAgPGxpIHYtZm9yPVxcXCJ0YWIgaW4gdGFic1xcXCIgdi1iaW5kOmNsYXNzPVxcXCJ7ICdhY3RpdmUnOiB0YWIuYWN0aXZlIH1cXFwiIHYtb246Y2xpY2sucHJldmVudD1cXFwiaGFuZGxlVGFiTGlzdENsaWNrKCRpbmRleCwgdGFiKVxcXCIgOmRpc2FibGVkPVxcXCJ0YWIuZGlzYWJsZWRcXFwiPlxcbiAgICAgIHt7IHRhYi5oZWFkaW5nIH19XFxuICAgIDwvbGk+XFxuICA8L3VsPlxcblxcbiAgPCEtLSBUYWIgUGFuZXMgLS0+XFxuICA8ZGl2IGNsYXNzPVxcXCJ0YWItY29udGVudFxcXCIgdi1lbDp0YWJDb250ZW50PlxcbiAgICAgIDxzbG90Pjwvc2xvdD5cXG4gIDwvZGl2PlxcbjwvZGl2PlxcblwiO1xuXG59LHt9XSwyMjpbZnVuY3Rpb24ocmVxdWlyZSxtb2R1bGUsZXhwb3J0cyl7XG5cbnZhciB2Q2hlY2tib3hDb21wb25lbnQgPSByZXF1aXJlKCcuL3ZDaGVja2JveENvbXBvbmVudC5qcycpO1xuXG5WdWUuY29tcG9uZW50KCd2Q2hlY2tib3gnLCB2Q2hlY2tib3hDb21wb25lbnQpO1xuXG59LHtcIi4vdkNoZWNrYm94Q29tcG9uZW50LmpzXCI6MjN9XSwyMzpbZnVuY3Rpb24ocmVxdWlyZSxtb2R1bGUsZXhwb3J0cyl7XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICB0ZW1wbGF0ZTogcmVxdWlyZSgnLi92Q2hlY2tib3hUZW1wbGF0ZS5odG1sJyksXG4gIGRhdGEoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGljb246ICd1bmNoZWNrZWQnLFxuICAgICAgaXNFcnJvcjogZmFsc2VcbiAgICB9O1xuICB9LFxuICBwcm9wczoge1xuICAgIGNoZWNrZWQ6IHtcbiAgICAgIHR5cGU6IEJvb2xlYW4sXG4gICAgICByZXF1aXJlZDogdHJ1ZSxcbiAgICAgIHR3b1dheTogdHJ1ZVxuICAgIH0sXG4gICAgbGFiZWw6IHtcbiAgICAgIHR5cGU6IFN0cmluZyxcbiAgICAgIHJlcXVpcmVkOiB0cnVlXG4gICAgfSxcbiAgICByZXF1aXJlZDoge1xuICAgICAgdHlwZTogQm9vbGVhbixcbiAgICAgIGRlZmF1bHRzVG86IGZhbHNlXG4gICAgfVxuICB9LFxuICB3YXRjaDoge1xuICAgIGNoZWNrZWQodmFsKSB7XG4gICAgICB0aGlzLmljb24gPSAodmFsID09PSB0cnVlKSA/ICdjaGVja2VkJyA6ICd1bmNoZWNrZWQnO1xuICAgIH1cbiAgfSxcbiAgcmVhZHkoKSB7XG4gICAgdGhpcy5pY29uID0gKHRoaXMuY2hlY2tlZCA9PT0gdHJ1ZSkgPyAnY2hlY2tlZCcgOiAndW5jaGVja2VkJztcbiAgfSxcbiAgbWV0aG9kczoge1xuICAgIHRvZ2dsZSgpIHtcbiAgICAgIHRoaXMuY2hlY2tlZCA9ICF0aGlzLmNoZWNrZWQ7XG4gICAgfSxcbiAgICBpc1ZhbGlkKCkge1xuICAgICAgdGhpcy5pc0Vycm9yID0gKHRoaXMucmVxdWlyZWQpID8gIXRoaXMuY2hlY2tlZCA6IGZhbHNlO1xuICAgICAgcmV0dXJuICF0aGlzLmlzRXJyb3I7XG4gICAgfVxuICB9XG59O1xuXG59LHtcIi4vdkNoZWNrYm94VGVtcGxhdGUuaHRtbFwiOjI0fV0sMjQ6W2Z1bmN0aW9uKHJlcXVpcmUsbW9kdWxlLGV4cG9ydHMpe1xubW9kdWxlLmV4cG9ydHMgPSBcIlxcbjxkaXYgOmNsYXNzPVxcXCJ7ICdjaGVja2JveCc6IHRydWUsICdlcnJvcic6IGlzRXJyb3IgfVxcXCI+XFxuICA8aWNvbiB2LW9uOmNsaWNrPVxcXCJ0b2dnbGUoKVxcXCIgOm5hbWU9XFxcImljb25cXFwiPjwvaWNvbj5cXG4gIDxzcGFuIHYtb246Y2xpY2s9XFxcInRvZ2dsZSgpXFxcIj57eyBsYWJlbCB9fTwvc3Bhbj5cXG48L2Rpdj5cXG5cIjtcblxufSx7fV0sMjU6W2Z1bmN0aW9uKHJlcXVpcmUsbW9kdWxlLGV4cG9ydHMpe1xuXG52YXIgdkZvcm1Db21wb25lbnQgPSByZXF1aXJlKCcuL3ZGb3JtQ29tcG9uZW50LmpzJyk7XG5cblZ1ZS5jb21wb25lbnQoJ3ZGb3JtJywgdkZvcm1Db21wb25lbnQpO1xuXG59LHtcIi4vdkZvcm1Db21wb25lbnQuanNcIjoyNn1dLDI2OltmdW5jdGlvbihyZXF1aXJlLG1vZHVsZSxleHBvcnRzKXtcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIHRlbXBsYXRlOiByZXF1aXJlKCcuL3ZGb3JtVGVtcGxhdGUuaHRtbCcpLFxuICBwcm9wczoge1xuICAgIG1ldGhvZDoge1xuICAgICAgdHlwZTogU3RyaW5nLFxuICAgICAgZGVmYXVsdHNUbzogJ1BPU1QnXG4gICAgfSxcbiAgICBhY3Rpb246IHtcbiAgICAgIHR5cGU6IFN0cmluZyxcbiAgICAgIGRlZmF1bHRzVG86ICcnXG4gICAgfSxcbiAgICBhamF4OiB7XG4gICAgICB0eXBlOiBCb29sZWFuLFxuICAgICAgZGVmYXVsdHNUbzogZmFsc2VcbiAgICB9LFxuICAgIHN1Ym1pdENhbGxiYWNrOiB7XG4gICAgICB0eXBlOiBGdW5jdGlvblxuICAgIH1cbiAgfSxcbiAgbWV0aG9kczoge1xuICAgIHN1Ym1pdEZvcm0oZXZlbnQpIHtcbiAgICAgIGlmICh0aGlzLmFqYXggfHwgIXRoaXMuaXNWYWxpZCgpKSB7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICB9XG5cbiAgICAgIGlmICh0aGlzLmFqYXggJiYgdGhpcy5pc1ZhbGlkKCkgJiYgdHlwZW9mIHRoaXMuc3VibWl0Q2FsbGJhY2sgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgdGhpcy5zdWJtaXRDYWxsYmFjaygpO1xuICAgICAgfVxuICAgIH0sXG4gICAgaXNWYWxpZCgpIHtcbiAgICAgIHZhciBzZWxmID0gdGhpcyxcbiAgICAgICAgZm9ybUlzVmFsaWQgPSB0cnVlO1xuXG4gICAgICBmb3IgKHZhciBpID0gMCwgaiA9IHNlbGYuJGNoaWxkcmVuLmxlbmd0aDsgaSA8IGo7IGkrKykge1xuICAgICAgICBpZiAoXy5pc0Z1bmN0aW9uKHNlbGYuJGNoaWxkcmVuW2ldLmlzVmFsaWQpKSB7IC8vIGhhcyBpbnB1dCB2YWxpZGF0aW9uIGF0dGFjaGVkXG4gICAgICAgICAgZm9ybUlzVmFsaWQgPSBmb3JtSXNWYWxpZCAmJiBzZWxmLiRjaGlsZHJlbltpXS5pc1ZhbGlkKCk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGZvcm1Jc1ZhbGlkO1xuICAgIH1cbiAgfVxufTtcblxufSx7XCIuL3ZGb3JtVGVtcGxhdGUuaHRtbFwiOjI3fV0sMjc6W2Z1bmN0aW9uKHJlcXVpcmUsbW9kdWxlLGV4cG9ydHMpe1xubW9kdWxlLmV4cG9ydHMgPSBcIlxcbjxmb3JtIHYtaWY9XFxcImFqYXhcXFwiIHYtZWw6Zm9ybSB2LW9uOnN1Ym1pdC5wcmV2ZW50PVxcXCJzdWJtaXRGb3JtXFxcIiA6bWV0aG9kPVxcXCJtZXRob2RcXFwiIDphY3Rpb249XFxcImFjdGlvblxcXCIgbm92YWxpZGF0ZT5cXG4gIDxzbG90Pjwvc2xvdD5cXG48L2Zvcm0+XFxuPGZvcm0gdi1lbHNlIHYtZWw6Zm9ybSB2LW9uOnN1Ym1pdD1cXFwic3VibWl0Rm9ybVxcXCIgOm1ldGhvZD1cXFwibWV0aG9kXFxcIiA6YWN0aW9uPVxcXCJhY3Rpb25cXFwiIG5vdmFsaWRhdGU+XFxuICA8c2xvdD48L3Nsb3Q+XFxuPC9mb3JtPlxcblwiO1xuXG59LHt9XSwyODpbZnVuY3Rpb24ocmVxdWlyZSxtb2R1bGUsZXhwb3J0cyl7XG5cbnZhciB2SW5wdXRDb21wb25lbnQgPSByZXF1aXJlKCcuL3ZJbnB1dENvbXBvbmVudC5qcycpO1xuXG5WdWUuY29tcG9uZW50KCd2SW5wdXQnLCB2SW5wdXRDb21wb25lbnQpO1xuXG59LHtcIi4vdklucHV0Q29tcG9uZW50LmpzXCI6Mjl9XSwyOTpbZnVuY3Rpb24ocmVxdWlyZSxtb2R1bGUsZXhwb3J0cyl7XG5cbnZhciB2YWxpZGF0aW9uUnVsZXMgPSByZXF1aXJlKCcuL3ZhbGlkYXRpb25SdWxlcy5qcycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgdGVtcGxhdGU6IHJlcXVpcmUoJy4vdklucHV0VGVtcGxhdGUuaHRtbCcpLFxuICBwcm9wczoge1xuICAgIGxhYmVsOiB7XG4gICAgICB0eXBlOiBTdHJpbmdcbiAgICB9LFxuICAgIG5hbWU6IHtcbiAgICAgIHR5cGU6IFN0cmluZ1xuICAgIH0sXG4gICAgdHlwZToge1xuICAgICAgdHlwZTogU3RyaW5nLFxuICAgICAgcmVxdWlyZWQ6IHRydWVcbiAgICB9LFxuICAgIHBsYWNlaG9sZGVyOiB7XG4gICAgICB0eXBlOiBTdHJpbmdcbiAgICB9LFxuICAgIGljb246IHtcbiAgICAgIHR5cGU6IFN0cmluZ1xuICAgIH0sXG4gICAgdmFsdWU6IHtcbiAgICAgIHR5cGU6IFN0cmluZyxcbiAgICAgIHJlcXVpcmVkOiB0cnVlLFxuICAgICAgdHdvV2F5OiB0cnVlXG4gICAgfSxcbiAgICByZXF1aXJlZDoge1xuICAgICAgdHlwZTogQm9vbGVhbixcbiAgICAgIGRlZmF1bHRzVG86IGZhbHNlXG4gICAgfSxcbiAgICBlcXVhbFRvOiB7XG4gICAgICB0eXBlOiBPYmplY3QsXG4gICAgICBkZWZhdWx0c1RvOiBudWxsXG4gICAgfSxcbiAgICBzaW1wbGU6IHtcbiAgICAgIHR5cGU6IEJvb2xlYW4sXG4gICAgICBkZWZhdWx0c1RvOiBmYWxzZVxuICAgIH1cbiAgfSxcbiAgZGF0YSgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgZXJyb3I6ICcnXG4gICAgfTtcbiAgfSxcbiAgZmlsdGVyczoge1xuICAgIGlzU2ltcGxlKHZhbCkge1xuICAgICAgcmV0dXJuICh0aGlzLnNpbXBsZSkgPyAnJyA6IHZhbDtcbiAgICB9XG4gIH0sXG4gIG1ldGhvZHM6IHtcbiAgICBpc1ZhbGlkKCkge1xuICAgICAgdGhpcy52YWxpZGF0ZSgpO1xuICAgICAgcmV0dXJuICh0aGlzLmVycm9yLmxlbmd0aCA9PT0gMCk7XG4gICAgfSxcbiAgICBkZWJvdW5jZVZhbGlkYXRlOiBfLmRlYm91bmNlKGZ1bmN0aW9uICgpIHtcbiAgICAgIHRoaXMudmFsaWRhdGUoKTtcbiAgICB9LCA1MDApLFxuICAgIHZhbGlkYXRlKCkge1xuICAgICAgdmFyIGxhYmVsID0gdGhpcy5sYWJlbCB8fCB0aGlzLm5hbWU7XG5cbiAgICAgIC8vIHJlcXVpcmVkIHZhbGlkYXRpb25cbiAgICAgIGlmICh0aGlzLnJlcXVpcmVkICYmIHRoaXMudmFsdWUubGVuZ3RoID09PSAwKSB7XG4gICAgICAgIHRoaXMuZXJyb3IgPSBsYWJlbCArICcgaXMgcmVxdWlyZWQnO1xuXG4gICAgICAvLyBodG1sNSBkYXRhIHR5cGUgdmFsaWRhdGlvblxuICAgICAgfSBlbHNlIGlmICh2YWxpZGF0aW9uUnVsZXMuaGFzT3duUHJvcGVydHkodGhpcy50eXBlKSAmJiAhdmFsaWRhdGlvblJ1bGVzW3RoaXMudHlwZV0ucmVnZXgudGVzdCh0aGlzLnZhbHVlKSkge1xuICAgICAgICB0aGlzLmVycm9yID0gdmFsaWRhdGlvblJ1bGVzW3RoaXMudHlwZV0uZGVmYXVsdEVycm9yO1xuXG4gICAgICAvLyBlcXVpdmFsZW5jeSB2YWxpZGF0aW9uXG4gICAgICB9IGVsc2UgaWYgKHRoaXMuZXF1YWxUbyAmJiB0aGlzLmVxdWFsVG8udmFsdWUgIT09IHRoaXMudmFsdWUpIHtcbiAgICAgICAgdGhpcy5lcnJvciA9ICdNdXN0IG1hdGNoICcgKyB0aGlzLmVxdWFsVG8ubGFiZWw7XG5cbiAgICAgIC8vIGlucHV0IGlzIHZhbGlkXG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLmVycm9yID0gJyc7XG4gICAgICB9XG4gICAgfVxuICB9XG59O1xuXG59LHtcIi4vdklucHV0VGVtcGxhdGUuaHRtbFwiOjMwLFwiLi92YWxpZGF0aW9uUnVsZXMuanNcIjozMX1dLDMwOltmdW5jdGlvbihyZXF1aXJlLG1vZHVsZSxleHBvcnRzKXtcbm1vZHVsZS5leHBvcnRzID0gXCJcXG48bGFiZWwgY2xhc3M9XFxcInYtaW5wdXRcXFwiPlxcbiAge3sgbGFiZWwgfCBpc1NpbXBsZSB9fVxcbiAgPGRpdiBjbGFzcz1cXFwiaW5wdXQtd3JhcFxcXCI+XFxuICAgIDxpIGNsYXNzPVxcXCJmYSBmYS17eyBpY29uIH19XFxcIiB2LWlmPVxcXCJpY29uXFxcIj48L2k+XFxuICAgIDx0ZXh0YXJlYSB2LWlmPVxcXCJ0eXBlID09PSAndGV4dGFyZWEnXFxcIlxcbiAgICAgIHYtZWw6aW5wdXRcXG4gICAgICA6Y2xhc3M9XFxcInsgJ2Vycm9yJzogZXJyb3IubGVuZ3RoID4gMCB9XFxcIlxcbiAgICAgIG5hbWU9XFxcInt7IG5hbWUgfX1cXFwiXFxuICAgICAgcGxhY2Vob2xkZXI9XFxcInt7IHBsYWNlaG9sZGVyIH19XFxcIlxcbiAgICAgIHYtbW9kZWw9XFxcInZhbHVlXFxcIlxcbiAgICAgIHYtb246Ymx1cj1cXFwidmFsaWRhdGUoKVxcXCI+PC90ZXh0YXJlYT5cXG4gICAgPGlucHV0IHYtZWxzZVxcbiAgICAgIHYtZWw6aW5wdXRcXG4gICAgICA6Y2xhc3M9XFxcInsgJ2Vycm9yJzogZXJyb3IubGVuZ3RoID4gMCB9XFxcIlxcbiAgICAgIG5hbWU9XFxcInt7IG5hbWUgfX1cXFwiXFxuICAgICAgdHlwZT1cXFwie3sgdHlwZSB9fVxcXCJcXG4gICAgICBwbGFjZWhvbGRlcj1cXFwie3sgcGxhY2Vob2xkZXIgfX1cXFwiXFxuICAgICAgdi1tb2RlbD1cXFwidmFsdWVcXFwiXFxuICAgICAgdi1vbjpibHVyPVxcXCJ2YWxpZGF0ZSgpXFxcIiAvPlxcbiAgICA8c21hbGwgdi1pZj1cXFwiZXJyb3IubGVuZ3RoID4gMFxcXCIgdHJhbnNpdGlvbj1cXFwic2xpZGUtdXAteC1zbWFsbFxcXCIgY2xhc3M9XFxcImVycm9yXFxcIj57eyBlcnJvciB9fTwvc21hbGw+XFxuICA8L2Rpdj5cXG48L2xhYmVsPlxcblwiO1xuXG59LHt9XSwzMTpbZnVuY3Rpb24ocmVxdWlyZSxtb2R1bGUsZXhwb3J0cyl7XG5cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIGVtYWlsOiB7XG4gICAgcmVnZXg6IC9eKChbXjw+KClcXFtcXF1cXFxcLiw7Olxcc0BcIl0rKFxcLltePD4oKVxcW1xcXVxcXFwuLDs6XFxzQFwiXSspKil8KFwiLitcIikpQCgoXFxbWzAtOV17MSwzfVxcLlswLTldezEsM31cXC5bMC05XXsxLDN9XFwuWzAtOV17MSwzfV0pfCgoW2EtekEtWlxcLTAtOV0rXFwuKStbYS16QS1aXXsyLH0pKSQvLFxuICAgIGRlZmF1bHRFcnJvcjogJ1BsZWFzZSBlbnRlciBhIHZhbGlkIGVtYWlsIGFkZHJlc3MnXG4gIH0sXG4gIHVybDoge1xuICAgIHJlZ2V4OiAvaHR0cHM/OlxcL1xcLyh3d3dcXC4pP1stYS16QS1aMC05QDolLl9cXCt+Iz1dezIsMjU2fVxcLlthLXpdezIsNH1cXGIoWy1hLXpBLVowLTlAOiVfXFwrLn4jPyYvLz1dKikvLFxuICAgIGRlZmF1bHRFcnJvcjogJ1BsZWFzZSBlbnRlciBhIHZhbGlkIFVSTCdcbiAgfSxcbiAgbnVtYmVyOiB7XG4gICAgcmVnZXg6IC9bLS4wLTldKy8sXG4gICAgZGVmYXVsdEVycm9yOiAnUGxlYXNlIGVudGVyIGEgdmFsaWQgbnVtYmVyJ1xuICB9XG59O1xuXG59LHt9XSwzMjpbZnVuY3Rpb24ocmVxdWlyZSxtb2R1bGUsZXhwb3J0cyl7XG5cbnZhciB2U2VsZWN0Q29tcG9uZW50ID0gcmVxdWlyZSgnLi92U2VsZWN0Q29tcG9uZW50LmpzJyk7XG5cblZ1ZS5jb21wb25lbnQoJ3ZTZWxlY3QnLCB2U2VsZWN0Q29tcG9uZW50KTtcblxufSx7XCIuL3ZTZWxlY3RDb21wb25lbnQuanNcIjozM31dLDMzOltmdW5jdGlvbihyZXF1aXJlLG1vZHVsZSxleHBvcnRzKXtcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIHRlbXBsYXRlOiByZXF1aXJlKCcuL3ZTZWxlY3RUZW1wbGF0ZS5odG1sJyksXG4gIHByb3BzOiB7XG4gICAgbGFiZWw6IHtcbiAgICAgIHR5cGU6IFN0cmluZyxcbiAgICAgIGRlZmF1bHRzVG86ICcnXG4gICAgfSxcbiAgICBzZWxlY3RlZDoge1xuICAgICAgdHlwZTogU3RyaW5nLFxuICAgICAgcmVxdWlyZWQ6IHRydWUsXG4gICAgICB0d29XYXk6IHRydWVcbiAgICB9LFxuICAgIG9wdGlvbnM6IHtcbiAgICAgIHR5cGU6IEFycmF5LFxuICAgICAgcmVxdWlyZWQ6IHRydWVcbiAgICB9LFxuICAgIHJlcXVpcmVkOiB7XG4gICAgICB0eXBlOiBCb29sZWFuLFxuICAgICAgZGVmYXVsdHNUbzogZmFsc2VcbiAgICB9XG4gIH0sXG4gIGRhdGEoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGlzRXJyb3I6IGZhbHNlXG4gICAgfTtcbiAgfSxcbiAgcmVhZHkoKSB7XG4gICAgdmFyIHNlbGYgPSB0aGlzLFxuICAgICAgc2VsZWN0ZWRJbmRleCA9IF8uZmluZEluZGV4KHNlbGYub3B0aW9ucywgKG9wdGlvbikgPT4gb3B0aW9uLnZhbHVlID09PSBzZWxmLnNlbGVjdGVkKTtcblxuICAgIGlmIChzZWxmLnJlcXVpcmVkICYmIHNlbGVjdGVkSW5kZXggPT09IC0xKSB7XG4gICAgICBzZWxmLnNlbGVjdGVkID0gc2VsZi5vcHRpb25zWzBdLnZhbHVlO1xuICAgIH1cbiAgfSxcbiAgbWV0aG9kczoge1xuICAgIGlzVmFsaWQoKSB7XG4gICAgICB0aGlzLmlzRXJyb3IgPSAhdGhpcy5yZXF1aXJlZCB8fCB0aGlzLnNlbGVjdGVkLmxlbmd0aCA+IDA7XG4gICAgICByZXR1cm4gdGhpcy5pc0Vycm9yO1xuICAgIH1cbiAgfVxufTtcblxufSx7XCIuL3ZTZWxlY3RUZW1wbGF0ZS5odG1sXCI6MzR9XSwzNDpbZnVuY3Rpb24ocmVxdWlyZSxtb2R1bGUsZXhwb3J0cyl7XG5tb2R1bGUuZXhwb3J0cyA9IFwiXFxuPGxhYmVsIGNsYXNzPVxcXCJ2LXNlbGVjdFxcXCI+XFxuICB7eyBsYWJlbCB9fVxcbiAgPHNlbGVjdCB2LW1vZGVsPVxcXCJzZWxlY3RlZFxcXCIgOmNsYXNzPVxcXCJ7ICdlcnJvcic6IGlzRXJyb3IgfVxcXCI+XFxuICAgIDxvcHRpb24gdi1pZj1cXFwiIXJlcXVpcmVkXFxcIiB2YWx1ZT1cXFwiXFxcIj48L29wdGlvbj5cXG4gICAgPG9wdGlvbiB2LWZvcj1cXFwib3B0aW9uIGluIG9wdGlvbnNcXFwiIDp2YWx1ZT1cXFwib3B0aW9uLnZhbHVlXFxcIj57eyBvcHRpb24ubGFiZWwgfX08L29wdGlvbj5cXG4gIDwvc2VsZWN0PlxcbjwvbGFiZWw+XFxuXCI7XG5cbn0se31dLDM1OltmdW5jdGlvbihyZXF1aXJlLG1vZHVsZSxleHBvcnRzKXtcblxucmVxdWlyZSgnLi9jb21wb25lbnRzL2FsZXJ0L2FsZXJ0LmpzJyk7XG5yZXF1aXJlKCcuL2NvbXBvbmVudHMvaWNvbi9pY29uLmpzJyk7XG5yZXF1aXJlKCcuL2NvbXBvbmVudHMvbW9kYWwvbW9kYWwuanMnKTtcbnJlcXVpcmUoJy4vY29tcG9uZW50cy9wcm9tcHQvcHJvbXB0LmpzJyk7XG5yZXF1aXJlKCcuL2NvbXBvbmVudHMvbG9hZGVyL2xvYWRlci5qcycpO1xucmVxdWlyZSgnLi9jb21wb25lbnRzL3RhYnMvdGFicy5qcycpO1xucmVxdWlyZSgnLi9jb21wb25lbnRzL3ZGb3JtL3ZGb3JtLmpzJyk7XG5yZXF1aXJlKCcuL2NvbXBvbmVudHMvdklucHV0L3ZJbnB1dC5qcycpO1xucmVxdWlyZSgnLi9jb21wb25lbnRzL3ZTZWxlY3QvdlNlbGVjdC5qcycpO1xucmVxdWlyZSgnLi9jb21wb25lbnRzL3ZDaGVja2JveC92Q2hlY2tib3guanMnKTtcblxufSx7XCIuL2NvbXBvbmVudHMvYWxlcnQvYWxlcnQuanNcIjoxLFwiLi9jb21wb25lbnRzL2ljb24vaWNvbi5qc1wiOjQsXCIuL2NvbXBvbmVudHMvbG9hZGVyL2xvYWRlci5qc1wiOjcsXCIuL2NvbXBvbmVudHMvbW9kYWwvbW9kYWwuanNcIjoxMCxcIi4vY29tcG9uZW50cy9wcm9tcHQvcHJvbXB0LmpzXCI6MTMsXCIuL2NvbXBvbmVudHMvdGFicy90YWJzLmpzXCI6MTksXCIuL2NvbXBvbmVudHMvdkNoZWNrYm94L3ZDaGVja2JveC5qc1wiOjIyLFwiLi9jb21wb25lbnRzL3ZGb3JtL3ZGb3JtLmpzXCI6MjUsXCIuL2NvbXBvbmVudHMvdklucHV0L3ZJbnB1dC5qc1wiOjI4LFwiLi9jb21wb25lbnRzL3ZTZWxlY3QvdlNlbGVjdC5qc1wiOjMyfV19LHt9LFszNV0pIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
