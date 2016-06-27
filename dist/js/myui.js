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
      props: ['heading'],
      data: function data() {
        return {
          active: false
        };
      },
      ready: function ready() {
        this.$dispatch('TAB_COMPONENT_TAB_CREATED', this.heading);
      },
      events: {
        'test': function test(msg) {
          if (this.heading === msg) {
            this.active = true;
          } else {
            this.active = false;
          }
        }
      }
    };

    // module.exports = {
    //   template: require('./tabTemplate.html'),
    //   props: {
    //     heading: {
    //       type: String,
    //       required: true
    //     },
    //     clickCallback: {
    //       type: Function
    //     }
    //   },
    //   data() {
    //     return {
    //       index: 0,
    //       show: false
    //     };
    //   },
    //   computed: {
    //     show() {
    //       return (this.$parent.active == this.index);
    //     }
    //   },
    //   watch: {
    //     heading() {
    //       this.$parent.tabs[this.index].heading = this.heading;
    //     }
    //   },
    //   created() {
    //     this.$parent.tabs.push({
    //       heading: this.heading,
    //       active: false
    //     });
    //   },
    //   ready() {
    //     for (var index in this.$parent.$children) {
    //       if (this.$parent.$children[index].$el == this.$el) {
    //         this.index = index;
    //         break;
    //       }
    //     }
    //   },
    //   events: {
    //     TAB_COMPONENT_TAB_CLICKED() {
    //       if (typeof this.clickCallback === 'function') {
    //         this.clickCallback();
    //       }
    //     }
    //   }
    // };
  }, { "./tabTemplate.html": 18 }], 18: [function (require, module, exports) {
    module.exports = "\n<div class=\"tab\" v-show=\"active\">\n  <slot></slot>\n</div>\n\n<!-- <div class=\"tab\" v-show=\"show\">\n  <slot></slot>\n</div> -->\n";
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
          isactive: ''
        };
      },
      events: {
        TAB_COMPONENT_TAB_CREATED: function TAB_COMPONENT_TAB_CREATED(heading) {
          var self = this;

          this.tabs.push({
            message: heading,
            active: self.tabs.length === 1
          });
        }
      },
      methods: {
        notify: function notify(msg) {
          this.isactive = msg.message;
          this.$broadcast('test', msg.message);
        }
      }
    };

    // module.exports = {
    //   template: require('./tabsTemplate.html'),
    //   props: {
    //     active: {
    //       type: Number,
    //       default: 0
    //     }
    //   },
    //   data() {
    //     return {
    //       tabs: []
    //     };
    //   },
    //   ready() {
    //     if (this.tabs[0]) {
    //       this.tabs[0].active = true;
    //     }
    //   },
    //   methods: {
    //     handleTabListClick(index, el) {
    //       if (!el.disabled) this.active = index;
    //
    //       for (var i = 0, j = this.tabs.length; i < j; i++) {
    //         this.tabs[i].active = (i == index);
    //         if (this.tabs[i].active) {
    //           this.$children[i].$emit('TAB_COMPONENT_TAB_CLICKED');
    //         }
    //       }
    //     }
    //   }
    // };
  }, { "./tabsTemplate.html": 21 }], 21: [function (require, module, exports) {
    module.exports = "\n<div class=\"tabs\">\n  <ul class=\"tab-nav\">\n    <li v-for=\"tab in tabs\" v-bind:class=\"{ 'active': (isactive === tab.message) }\" v-on:click.prevent=\"notify(tab)\">\n      {{ tab.message }}\n    </li>\n  </ul>\n\n  <div class=\"tab-content\">\n      <slot></slot>\n  </div>\n</div>\n\n<!-- <div class=\"tabs\">\n  <ul class=\"tab-nav\">\n    <li v-for=\"tab in tabs\" v-bind:class=\"{ 'active': tab.active }\" v-on:click.prevent=\"handleTabListClick($index, tab)\" :disabled=\"tab.disabled\">\n      {{ tab.heading }}\n    </li>\n  </ul>\n\n  <div class=\"tab-content\" v-el:tabContent>\n      <slot></slot>\n  </div>\n</div> -->\n";
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
//# sourceMappingURL=data:application/json;base64,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d0IsT0FBeEIsRUFBZ0M7QUFDckUsV0FBTyxPQUFQLEdBQWlCLHlSQUFqQjtBQUVDLEdBSG1DLEVBR2xDLEVBSGtDLENBbm1CcVgsRUFzbUJuWixJQUFHLENBQUMsVUFBUyxPQUFULEVBQWlCLE1BQWpCLEVBQXdCLE9BQXhCLEVBQWdDOztBQUUxQyxZQUFRLDZCQUFSO0FBQ0EsWUFBUSwyQkFBUjtBQUNBLFlBQVEsNkJBQVI7QUFDQSxZQUFRLCtCQUFSO0FBQ0EsWUFBUSwrQkFBUjtBQUNBLFlBQVEsMkJBQVI7QUFDQSxZQUFRLDZCQUFSO0FBQ0EsWUFBUSwrQkFBUjtBQUNBLFlBQVEsaUNBQVI7QUFDQSxZQUFRLHFDQUFSO0FBRUMsR0FiUSxFQWFQLEVBQUMsK0JBQThCLENBQS9CLEVBQWlDLDZCQUE0QixDQUE3RCxFQUErRCxpQ0FBZ0MsQ0FBL0YsRUFBaUcsK0JBQThCLEVBQS9ILEVBQWtJLGlDQUFnQyxFQUFsSyxFQUFxSyw2QkFBNEIsRUFBak0sRUFBb00sdUNBQXNDLEVBQTFPLEVBQTZPLCtCQUE4QixFQUEzUSxFQUE4USxpQ0FBZ0MsRUFBOVMsRUFBaVQsbUNBQWtDLEVBQW5WLEVBYk8sQ0F0bUJnWixFQUF6WixFQW1uQjJWLEVBbm5CM1YsRUFtbkI4VixDQUFDLEVBQUQsQ0FubkI5ViIsImZpbGUiOiJteXVpLmpzIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt0aHJvdyBuZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpfXZhciBmPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChmLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGYsZi5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkoezE6W2Z1bmN0aW9uKHJlcXVpcmUsbW9kdWxlLGV4cG9ydHMpe1xuXG52YXIgYWxlcnRDb21wb25lbnQgPSByZXF1aXJlKCcuL2FsZXJ0Q29tcG9uZW50LmpzJyk7XG5cblZ1ZS5jb21wb25lbnQoJ2FsZXJ0JywgYWxlcnRDb21wb25lbnQpO1xuXG59LHtcIi4vYWxlcnRDb21wb25lbnQuanNcIjoyfV0sMjpbZnVuY3Rpb24ocmVxdWlyZSxtb2R1bGUsZXhwb3J0cyl7XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICB0ZW1wbGF0ZTogcmVxdWlyZSgnLi9hbGVydFRlbXBsYXRlLmh0bWwnKSxcbiAgcHJvcHM6IHtcbiAgICBjYW5DbG9zZToge1xuICAgICAgdHlwZTogQm9vbGVhbixcbiAgICAgIGRlZmF1bHQ6IGZhbHNlXG4gICAgfVxuICB9LFxuICBkYXRhKCkge1xuICAgIHJldHVybiB7XG4gICAgICBtZXNzYWdlczogW10sXG4gICAgICB0eXBlOiAnJ1xuICAgIH07XG4gIH0sXG4gIG1ldGhvZHM6IHtcbiAgICBjbG9zZSgpIHtcbiAgICAgIHRoaXMubWVzc2FnZXMgPSBbXTtcbiAgICB9LFxuICAgIGFkZE1lc3NhZ2UodHlwZSwgbWVzc2FnZSkge1xuICAgICAgaWYgKHRoaXMudHlwZSAhPT0gdHlwZSkge1xuICAgICAgICB0aGlzLnR5cGUgPSB0eXBlO1xuICAgICAgICB0aGlzLm1lc3NhZ2VzID0gW21lc3NhZ2VdO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5tZXNzYWdlcy5wdXNoKG1lc3NhZ2UpO1xuICAgICAgfVxuICAgIH0sXG4gICAgbWVzc2FnZShtZXNzYWdlKSB7XG4gICAgICB0aGlzLmFkZE1lc3NhZ2UoJycsIG1lc3NhZ2UpO1xuICAgIH0sXG4gICAgcHJpbWFyeShtZXNzYWdlKSB7XG4gICAgICB0aGlzLmFkZE1lc3NhZ2UoJ3ByaW1hcnknLCBtZXNzYWdlKTtcbiAgICB9LFxuICAgIHNlY29uZGFyeShtZXNzYWdlKSB7XG4gICAgICB0aGlzLmFkZE1lc3NhZ2UoJ3NlY29uZGFyeScsIG1lc3NhZ2UpO1xuICAgIH0sXG4gICAgc3VjY2VzcyhtZXNzYWdlKSB7XG4gICAgICB0aGlzLmFkZE1lc3NhZ2UoJ3N1Y2Nlc3MnLCBtZXNzYWdlKTtcbiAgICB9LFxuICAgIHdhcm5pbmcobWVzc2FnZSkge1xuICAgICAgdGhpcy5hZGRNZXNzYWdlKCd3YXJuaW5nJywgbWVzc2FnZSk7XG4gICAgfSxcbiAgICBhbGVydChtZXNzYWdlKSB7XG4gICAgICB0aGlzLmFkZE1lc3NhZ2UoJ2FsZXJ0JywgbWVzc2FnZSk7XG4gICAgfVxuICB9XG59O1xuXG59LHtcIi4vYWxlcnRUZW1wbGF0ZS5odG1sXCI6M31dLDM6W2Z1bmN0aW9uKHJlcXVpcmUsbW9kdWxlLGV4cG9ydHMpe1xubW9kdWxlLmV4cG9ydHMgPSBcIlxcbjxkaXYgY2xhc3M9XFxcImFsZXJ0LWJveFxcXCIgdi1iaW5kOmNsYXNzPVxcXCJ7XFxuICAgIGNhbGxvdXQ6IHRydWUsXFxuICAgIHByaW1hcnk6IHR5cGUgPT09ICdwcmltYXJ5JyxcXG4gICAgc2Vjb25kYXJ5OiB0eXBlID09PSAnc2Vjb25kYXJ5JyxcXG4gICAgc3VjY2VzczogdHlwZSA9PT0gJ3N1Y2Nlc3MnLFxcbiAgICB3YXJuaW5nOiB0eXBlID09PSAnd2FybmluZycsXFxuICAgIGFsZXJ0OiB0eXBlID09PSAnYWxlcnQnXFxuICB9XFxcIiB0cmFuc2l0aW9uPVxcXCJmYWRlXFxcIiB2LXNob3c9XFxcIm1lc3NhZ2VzLmxlbmd0aCA+IDBcXFwiPlxcbiAgPHVsPlxcbiAgICA8bGkgdi1mb3I9XFxcIm1lc3NhZ2UgaW4gbWVzc2FnZXNcXFwiIHRyYWNrLWJ5PVxcXCIkaW5kZXhcXFwiPnt7IG1lc3NhZ2UgfX08L2xpPlxcbiAgPC91bD5cXG4gIDxidXR0b24gY2xhc3M9XFxcImNsb3NlLWJ1dHRvblxcXCIgYXJpYS1sYWJlbD1cXFwiRGlzbWlzcyBhbGVydFxcXCIgdHlwZT1cXFwiYnV0dG9uXFxcIiB2LWlmPVxcXCJjYW5DbG9zZVxcXCIgdi1vbjpjbGljaz1cXFwiY2xvc2UoKVxcXCI+XFxuICAgIDxzcGFuIGFyaWEtaGlkZGVuPVxcXCJ0cnVlXFxcIj4mdGltZXM7PC9zcGFuPlxcbiAgPC9idXR0b24+XFxuPC9kaXY+XFxuXCI7XG5cbn0se31dLDQ6W2Z1bmN0aW9uKHJlcXVpcmUsbW9kdWxlLGV4cG9ydHMpe1xuXG52YXIgaWNvbkNvbXBvbmVudCA9IHJlcXVpcmUoJy4vaWNvbkNvbXBvbmVudC5qcycpO1xuXG5WdWUuY29tcG9uZW50KCdpY29uJywgaWNvbkNvbXBvbmVudCk7XG5cbn0se1wiLi9pY29uQ29tcG9uZW50LmpzXCI6NX1dLDU6W2Z1bmN0aW9uKHJlcXVpcmUsbW9kdWxlLGV4cG9ydHMpe1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgdGVtcGxhdGU6IHJlcXVpcmUoJy4vaWNvblRlbXBsYXRlLmh0bWwnKSxcbiAgcHJvcHM6IFsnbmFtZSddXG59O1xuXG59LHtcIi4vaWNvblRlbXBsYXRlLmh0bWxcIjo2fV0sNjpbZnVuY3Rpb24ocmVxdWlyZSxtb2R1bGUsZXhwb3J0cyl7XG5tb2R1bGUuZXhwb3J0cyA9IFwiXFxuPHN2ZyBjbGFzcz1cXFwiaWNvbi1pbWFnZSB7eyBuYW1lIH19XFxcIj5cXG4gIDx1c2UgeG1sbnM6eGxpbms9XFxcImh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmtcXFwiIHhsaW5rOmhyZWY9XFxcIiNpY29uLXt7IG5hbWUgfX1cXFwiPjwvdXNlPlxcbjwvc3ZnPlxcblwiO1xuXG59LHt9XSw3OltmdW5jdGlvbihyZXF1aXJlLG1vZHVsZSxleHBvcnRzKXtcblxudmFyIGxvYWRlckNvbXBvbmVudCA9IHJlcXVpcmUoJy4vbG9hZGVyQ29tcG9uZW50LmpzJyk7XG5cblZ1ZS5jb21wb25lbnQoJ2xvYWRlcicsIGxvYWRlckNvbXBvbmVudCk7XG5cbn0se1wiLi9sb2FkZXJDb21wb25lbnQuanNcIjo4fV0sODpbZnVuY3Rpb24ocmVxdWlyZSxtb2R1bGUsZXhwb3J0cyl7XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICB0ZW1wbGF0ZTogcmVxdWlyZSgnLi9sb2FkZXJUZW1wbGF0ZS5odG1sJyksXG4gIGRhdGEoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGdyZWV0aW5nOiAnbG9hZGVyIGNvbXBvbmVudCcsXG4gICAgfTtcbiAgfSxcbiAgbWV0aG9kczoge1xuICAgIHNheUhpKCkge1xuICAgICAgY29uc29sZS5sb2coJ2hpIScpO1xuICAgIH1cbiAgfVxufTtcblxufSx7XCIuL2xvYWRlclRlbXBsYXRlLmh0bWxcIjo5fV0sOTpbZnVuY3Rpb24ocmVxdWlyZSxtb2R1bGUsZXhwb3J0cyl7XG5tb2R1bGUuZXhwb3J0cyA9IFwiPGRpdiBjbGFzcz1cXFwibG9hZGVyXFxcIj5Mb2FkaW5nLi4uPC9kaXY+XFxuXCI7XG5cbn0se31dLDEwOltmdW5jdGlvbihyZXF1aXJlLG1vZHVsZSxleHBvcnRzKXtcblxudmFyIG1vZGFsQ29tcG9uZW50ID0gcmVxdWlyZSgnLi9tb2RhbENvbXBvbmVudC5qcycpO1xuXG5WdWUuY29tcG9uZW50KCdtb2RhbCcsIG1vZGFsQ29tcG9uZW50KTtcblxufSx7XCIuL21vZGFsQ29tcG9uZW50LmpzXCI6MTF9XSwxMTpbZnVuY3Rpb24ocmVxdWlyZSxtb2R1bGUsZXhwb3J0cyl7XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICB0ZW1wbGF0ZTogcmVxdWlyZSgnLi9tb2RhbFRlbXBsYXRlLmh0bWwnKSxcbiAgcHJvcHM6IHtcbiAgICBzaG93OiB7XG4gICAgICB0eXBlOiBCb29sZWFuLFxuICAgICAgcmVxdWlyZWQ6IHRydWUsXG4gICAgICB0d29XYXk6IHRydWVcbiAgICB9LFxuICAgIG1vZGFsU2l6ZToge1xuICAgICAgdHlwZTogU3RyaW5nLFxuICAgICAgZGVmYXVsdDogJ2Z1bGwnXG4gICAgfSxcbiAgICB0cmFuc2l0aW9uOiB7XG4gICAgICB0eXBlOiBTdHJpbmcsXG4gICAgICBkZWZhdWx0OiAnem9vbS1vdXQnXG4gICAgfVxuICB9XG59O1xuXG59LHtcIi4vbW9kYWxUZW1wbGF0ZS5odG1sXCI6MTJ9XSwxMjpbZnVuY3Rpb24ocmVxdWlyZSxtb2R1bGUsZXhwb3J0cyl7XG5tb2R1bGUuZXhwb3J0cyA9IFwiXFxuPGRpdiBjbGFzcz1cXFwibW9kYWxcXFwiIDp0cmFuc2l0aW9uPVxcXCJ0cmFuc2l0aW9uXFxcIiB2LXNob3c9XFxcInNob3dcXFwiPlxcbiAgPGRpdiB2LW9uOmNsaWNrLnByZXZlbnQgOmNsYXNzPVxcXCJ7ICdtb2RhbC1jb250ZW50JzogdHJ1ZSwgJ3NtYWxsJzogbW9kYWxTaXplID09PSAnc21hbGwnLCAnZnVsbCc6IG1vZGFsU2l6ZSA9PT0gJ2Z1bGwnIH1cXFwiPlxcbiAgICA8ZGl2IGNsYXNzPVxcXCJtb2RhbC1oZWFkZXJcXFwiPlxcbiAgICAgIDxzbG90IG5hbWU9XFxcImhlYWRlclxcXCI+PC9zbG90PlxcbiAgICA8L2Rpdj5cXG4gICAgPHNsb3QgbmFtZT1cXFwiY29udGVudFxcXCI+PC9zbG90PlxcbiAgICA8c3BhbiB2LW9uOmNsaWNrPVxcXCJzaG93ID0gZmFsc2VcXFwiIGFyaWEtbGFiZWw9XFxcIkNsb3NlXFxcIj4mIzIxNTs8L3NwYW4+XFxuICA8L2Rpdj5cXG48L2Rpdj5cXG5cIjtcblxufSx7fV0sMTM6W2Z1bmN0aW9uKHJlcXVpcmUsbW9kdWxlLGV4cG9ydHMpe1xuXG52YXIgcHJvbXB0Q29tcG9uZW50ID0gcmVxdWlyZSgnLi9wcm9tcHRDb21wb25lbnQnKTtcblxuVnVlLmNvbXBvbmVudCgncHJvbXB0JywgcHJvbXB0Q29tcG9uZW50KTtcblxufSx7XCIuL3Byb21wdENvbXBvbmVudFwiOjE0fV0sMTQ6W2Z1bmN0aW9uKHJlcXVpcmUsbW9kdWxlLGV4cG9ydHMpe1xuXG52YXIgZGVmYXVsdExhYmVscyA9IHtcbiAgcXVlc3Rpb246ICcnLFxuICB5ZXM6ICdTdWJtaXQnLFxuICBubzogJ0NhbmNlbCdcbn07XG5cbmZ1bmN0aW9uIHByb21wdCh2bSwgb3B0aW9ucywgc2hvd0lucHV0KSB7XG4gIHZhciB1bndhdGNoO1xuXG4gIHZtLnF1ZXN0aW9uTGFiZWwgPSBvcHRpb25zLnF1ZXN0aW9uO1xuICB2bS55ZXNMYWJlbCA9IG9wdGlvbnMueWVzTGFiZWwgfHwgZGVmYXVsdExhYmVscy55ZXM7XG4gIHZtLm5vTGFiZWwgPSBvcHRpb25zLm5vTGFiZWwgfHwgZGVmYXVsdExhYmVscy5ubztcbiAgdm0uY29uZmlybWVkID0gdW5kZWZpbmVkO1xuICB2bS5zaG93SW5wdXQgPSBzaG93SW5wdXQ7XG4gIHZtLnNob3cgPSB0cnVlO1xuXG4gIHVud2F0Y2ggPSB2bS4kd2F0Y2goJyRkYXRhLmNvbmZpcm1lZCcsIGZ1bmN0aW9uIChuZXdWYWwsIG9sZFZhbCkge1xuICAgIGlmIChuZXdWYWwgJiYgXy5pc0Z1bmN0aW9uKG9wdGlvbnMueWVzKSkge1xuICAgICAgb3B0aW9ucy55ZXMoKHNob3dJbnB1dCkgPyB2bS5wcm9tcHRWYWx1ZSA6IG51bGwpO1xuICAgIH0gZWxzZSBpZiAoIW5ld1ZhbCAmJiBfLmlzRnVuY3Rpb24gKG9wdGlvbnMubm8pKSB7XG4gICAgICBvcHRpb25zLm5vKCk7XG4gICAgfVxuICAgIHVud2F0Y2goKTtcbiAgICB2bS5zaG93ID0gZmFsc2U7XG4gIH0pO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgdGVtcGxhdGU6IHJlcXVpcmUoJy4vcHJvbXB0VGVtcGxhdGUuaHRtbCcpLFxuICBwcm9wczoge1xuICAgIHRyYW5zaXRpb246IHtcbiAgICAgIHR5cGU6IFN0cmluZyxcbiAgICAgIGRlZmF1bHQ6ICd6b29tLW91dCdcbiAgICB9XG4gIH0sXG4gIGRhdGEoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHByb21wdFZhbHVlOiAnJyxcbiAgICAgIHF1ZXN0aW9uTGFiZWw6IGRlZmF1bHRMYWJlbHMucXVlc3Rpb24sXG4gICAgICB5ZXNMYWJlbDogZGVmYXVsdExhYmVscy55ZXMsXG4gICAgICBub0xhYmVsOiBkZWZhdWx0TGFiZWxzLm5vLFxuICAgICAgc2hvdzogZmFsc2UsXG4gICAgICBjb25maXJtZWQ6IGZhbHNlLFxuICAgICAgc2hvd0lucHV0OiBmYWxzZSxcbiAgICAgIGFzayhvcHRpb25zKSB7XG4gICAgICAgIHByb21wdCh0aGlzLCBvcHRpb25zLCB0cnVlKTtcbiAgICAgIH0sXG4gICAgICBjb25maXJtKG9wdGlvbnMpIHtcbiAgICAgICAgcHJvbXB0KHRoaXMsIG9wdGlvbnMsIGZhbHNlKTtcbiAgICAgIH1cbiAgICB9O1xuICB9LFxuICB3YXRjaDoge1xuICAgIHNob3codmFsKSB7XG4gICAgICBpZiAodmFsID09PSB0cnVlICYmIHRoaXMuJGNoaWxkcmVuLmxlbmd0aCA+IDApIHtcbiAgICAgICAgdGhpcy5wcm9tcHRWYWx1ZSA9ICcnO1xuICAgICAgICB0aGlzLiRjaGlsZHJlblswXS4kY2hpbGRyZW5bMF0uJGVscy5pbnB1dC5mb2N1cygpO1xuICAgICAgfVxuICAgIH1cbiAgfSxcbiAgbWV0aG9kczoge1xuICAgIHllcygpIHtcbiAgICAgIHRoaXMuY29uZmlybWVkID0gdHJ1ZTtcbiAgICB9LFxuICAgIG5vKCkge1xuICAgICAgdGhpcy5jb25maXJtZWQgPSBmYWxzZTtcbiAgICB9XG4gIH1cbn07XG5cbn0se1wiLi9wcm9tcHRUZW1wbGF0ZS5odG1sXCI6MTV9XSwxNTpbZnVuY3Rpb24ocmVxdWlyZSxtb2R1bGUsZXhwb3J0cyl7XG5tb2R1bGUuZXhwb3J0cyA9IFwiXFxuXFxuPGRpdiBjbGFzcz1cXFwicHJvbXB0IHByb21wdC1tb2RhbFxcXCIgOnRyYW5zaXRpb249XFxcInRyYW5zaXRpb25cXFwiIHYtc2hvdz1cXFwic2hvd1xcXCI+XFxuICA8ZGl2IGNsYXNzPVxcXCJwcm9tcHQtb3ZlcmxheVxcXCIgdi1vbjpjbGljaz1cXFwibm8oKVxcXCI+PC9kaXY+XFxuICA8ZGl2IGNsYXNzPVxcXCJwcm9tcHQtY29udGVudFxcXCI+XFxuICAgIDx2LWZvcm0gdi1pZj1cXFwic2hvd0lucHV0XFxcIiA6c3VibWl0LWNhbGxiYWNrPVxcXCJ5ZXNcXFwiIDphamF4PVxcXCJ0cnVlXFxcIj5cXG4gICAgICA8cD57eyBxdWVzdGlvbkxhYmVsIH19PC9wPlxcbiAgICAgIDx2LWlucHV0IHR5cGU9XFxcInRleHRcXFwiIGxhYmVsPVxcXCJSZXNwb25zZVxcXCIgbmFtZT1cXFwicHJvbXB0UmVzcG9uc2VcXFwiIDp2YWx1ZS5zeW5jPVxcXCJwcm9tcHRWYWx1ZVxcXCIgOnJlcXVpcmVkPVxcXCJ0cnVlXFxcIj48L3YtaW5wdXQ+XFxuICAgICAgPGRpdiBjbGFzcz1cXFwiY29udHJvbHNcXFwiPlxcbiAgICAgICAgPGJ1dHRvbiB0eXBlPVxcXCJidXR0b25cXFwiIGNsYXNzPVxcXCJidXR0b24gc21hbGxcXFwiIHYtb246Y2xpY2s9XFxcIm5vKClcXFwiPnt7IG5vTGFiZWwgfX08L2J1dHRvbj5cXG4gICAgICAgIDxidXR0b24gdHlwZT1cXFwic3VibWl0XFxcIiBjbGFzcz1cXFwiYnV0dG9uIHNtYWxsXFxcIj57eyB5ZXNMYWJlbCB9fTwvYnV0dG9uPlxcbiAgICAgIDwvZGl2PlxcbiAgICA8L3YtZm9ybT5cXG4gICAgPGRpdiB2LWVsc2U+XFxuICAgICAgPHA+e3sgcXVlc3Rpb25MYWJlbCB9fTwvcD5cXG4gICAgICA8ZGl2IGNsYXNzPVxcXCJjb250cm9sc1xcXCI+XFxuICAgICAgICA8YnV0dG9uIHR5cGU9XFxcImJ1dHRvblxcXCIgY2xhc3M9XFxcImJ1dHRvbiBzbWFsbFxcXCIgdi1vbjpjbGljaz1cXFwibm8oKVxcXCI+e3sgbm9MYWJlbCB9fTwvYnV0dG9uPlxcbiAgICAgICAgPGJ1dHRvbiB0eXBlPVxcXCJzdWJtaXRcXFwiIGNsYXNzPVxcXCJidXR0b24gc21hbGxcXFwiIHYtb246Y2xpY2s9XFxcInllcygpXFxcIj57eyB5ZXNMYWJlbCB9fTwvYnV0dG9uPlxcbiAgICAgIDwvZGl2PlxcbiAgICA8L2Rpdj5cXG4gIDwvZGl2PlxcbjwvZGl2PlxcblwiO1xuXG59LHt9XSwxNjpbZnVuY3Rpb24ocmVxdWlyZSxtb2R1bGUsZXhwb3J0cyl7XG5cbnZhciB0YWJDb21wb25lbnQgPSByZXF1aXJlKCcuL3RhYkNvbXBvbmVudC5qcycpO1xuXG5WdWUuY29tcG9uZW50KCd0YWInLCB0YWJDb21wb25lbnQpO1xuXG59LHtcIi4vdGFiQ29tcG9uZW50LmpzXCI6MTd9XSwxNzpbZnVuY3Rpb24ocmVxdWlyZSxtb2R1bGUsZXhwb3J0cyl7XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICB0ZW1wbGF0ZTogcmVxdWlyZSgnLi90YWJUZW1wbGF0ZS5odG1sJyksXG4gIHByb3BzOiBbJ2hlYWRpbmcnXSxcbiAgZGF0YTogZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGFjdGl2ZTogZmFsc2VcbiAgICB9O1xuICB9LFxuICByZWFkeTogZnVuY3Rpb24oKSB7XG4gICAgdGhpcy4kZGlzcGF0Y2goJ1RBQl9DT01QT05FTlRfVEFCX0NSRUFURUQnLCB0aGlzLmhlYWRpbmcpO1xuICB9LFxuICBldmVudHM6IHtcbiAgICAndGVzdCc6IGZ1bmN0aW9uKG1zZykge1xuICAgICAgaWYgKHRoaXMuaGVhZGluZyA9PT0gbXNnKSB7XG4gICAgICAgIHRoaXMuYWN0aXZlID0gdHJ1ZTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuYWN0aXZlID0gZmFsc2U7XG4gICAgICB9XG4gICAgfVxuICB9XG59O1xuXG4vLyBtb2R1bGUuZXhwb3J0cyA9IHtcbi8vICAgdGVtcGxhdGU6IHJlcXVpcmUoJy4vdGFiVGVtcGxhdGUuaHRtbCcpLFxuLy8gICBwcm9wczoge1xuLy8gICAgIGhlYWRpbmc6IHtcbi8vICAgICAgIHR5cGU6IFN0cmluZyxcbi8vICAgICAgIHJlcXVpcmVkOiB0cnVlXG4vLyAgICAgfSxcbi8vICAgICBjbGlja0NhbGxiYWNrOiB7XG4vLyAgICAgICB0eXBlOiBGdW5jdGlvblxuLy8gICAgIH1cbi8vICAgfSxcbi8vICAgZGF0YSgpIHtcbi8vICAgICByZXR1cm4ge1xuLy8gICAgICAgaW5kZXg6IDAsXG4vLyAgICAgICBzaG93OiBmYWxzZVxuLy8gICAgIH07XG4vLyAgIH0sXG4vLyAgIGNvbXB1dGVkOiB7XG4vLyAgICAgc2hvdygpIHtcbi8vICAgICAgIHJldHVybiAodGhpcy4kcGFyZW50LmFjdGl2ZSA9PSB0aGlzLmluZGV4KTtcbi8vICAgICB9XG4vLyAgIH0sXG4vLyAgIHdhdGNoOiB7XG4vLyAgICAgaGVhZGluZygpIHtcbi8vICAgICAgIHRoaXMuJHBhcmVudC50YWJzW3RoaXMuaW5kZXhdLmhlYWRpbmcgPSB0aGlzLmhlYWRpbmc7XG4vLyAgICAgfVxuLy8gICB9LFxuLy8gICBjcmVhdGVkKCkge1xuLy8gICAgIHRoaXMuJHBhcmVudC50YWJzLnB1c2goe1xuLy8gICAgICAgaGVhZGluZzogdGhpcy5oZWFkaW5nLFxuLy8gICAgICAgYWN0aXZlOiBmYWxzZVxuLy8gICAgIH0pO1xuLy8gICB9LFxuLy8gICByZWFkeSgpIHtcbi8vICAgICBmb3IgKHZhciBpbmRleCBpbiB0aGlzLiRwYXJlbnQuJGNoaWxkcmVuKSB7XG4vLyAgICAgICBpZiAodGhpcy4kcGFyZW50LiRjaGlsZHJlbltpbmRleF0uJGVsID09IHRoaXMuJGVsKSB7XG4vLyAgICAgICAgIHRoaXMuaW5kZXggPSBpbmRleDtcbi8vICAgICAgICAgYnJlYWs7XG4vLyAgICAgICB9XG4vLyAgICAgfVxuLy8gICB9LFxuLy8gICBldmVudHM6IHtcbi8vICAgICBUQUJfQ09NUE9ORU5UX1RBQl9DTElDS0VEKCkge1xuLy8gICAgICAgaWYgKHR5cGVvZiB0aGlzLmNsaWNrQ2FsbGJhY2sgPT09ICdmdW5jdGlvbicpIHtcbi8vICAgICAgICAgdGhpcy5jbGlja0NhbGxiYWNrKCk7XG4vLyAgICAgICB9XG4vLyAgICAgfVxuLy8gICB9XG4vLyB9O1xuXG59LHtcIi4vdGFiVGVtcGxhdGUuaHRtbFwiOjE4fV0sMTg6W2Z1bmN0aW9uKHJlcXVpcmUsbW9kdWxlLGV4cG9ydHMpe1xubW9kdWxlLmV4cG9ydHMgPSBcIlxcbjxkaXYgY2xhc3M9XFxcInRhYlxcXCIgdi1zaG93PVxcXCJhY3RpdmVcXFwiPlxcbiAgPHNsb3Q+PC9zbG90PlxcbjwvZGl2PlxcblxcbjwhLS0gPGRpdiBjbGFzcz1cXFwidGFiXFxcIiB2LXNob3c9XFxcInNob3dcXFwiPlxcbiAgPHNsb3Q+PC9zbG90PlxcbjwvZGl2PiAtLT5cXG5cIjtcblxufSx7fV0sMTk6W2Z1bmN0aW9uKHJlcXVpcmUsbW9kdWxlLGV4cG9ydHMpe1xuXG52YXIgdGFic0NvbXBvbmVudCA9IHJlcXVpcmUoJy4vdGFic0NvbXBvbmVudC5qcycpO1xuXG5yZXF1aXJlKCcuL3RhYi90YWIuanMnKTtcblxuVnVlLmNvbXBvbmVudCgndGFicycsIHRhYnNDb21wb25lbnQpO1xuXG59LHtcIi4vdGFiL3RhYi5qc1wiOjE2LFwiLi90YWJzQ29tcG9uZW50LmpzXCI6MjB9XSwyMDpbZnVuY3Rpb24ocmVxdWlyZSxtb2R1bGUsZXhwb3J0cyl7XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICB0ZW1wbGF0ZTogcmVxdWlyZSgnLi90YWJzVGVtcGxhdGUuaHRtbCcpLFxuICBkYXRhOiBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4ge1xuICAgICAgdGFiczogW10sXG4gICAgICBpc2FjdGl2ZTogJydcbiAgICB9O1xuICB9LFxuICBldmVudHM6IHtcbiAgICBUQUJfQ09NUE9ORU5UX1RBQl9DUkVBVEVEKGhlYWRpbmcpIHtcbiAgICAgIHZhciBzZWxmID0gdGhpcztcblxuICAgICAgdGhpcy50YWJzLnB1c2goe1xuICAgICAgICBtZXNzYWdlOiBoZWFkaW5nLFxuICAgICAgICBhY3RpdmU6IHNlbGYudGFicy5sZW5ndGggPT09IDFcbiAgICAgIH0pO1xuICAgIH1cbiAgfSxcbiAgbWV0aG9kczoge1xuICAgIG5vdGlmeTogZnVuY3Rpb24obXNnKSB7XG4gICAgICB0aGlzLmlzYWN0aXZlID0gbXNnLm1lc3NhZ2U7XG4gICAgICB0aGlzLiRicm9hZGNhc3QoJ3Rlc3QnLCBtc2cubWVzc2FnZSk7XG4gICAgfVxuICB9XG59O1xuXG4vLyBtb2R1bGUuZXhwb3J0cyA9IHtcbi8vICAgdGVtcGxhdGU6IHJlcXVpcmUoJy4vdGFic1RlbXBsYXRlLmh0bWwnKSxcbi8vICAgcHJvcHM6IHtcbi8vICAgICBhY3RpdmU6IHtcbi8vICAgICAgIHR5cGU6IE51bWJlcixcbi8vICAgICAgIGRlZmF1bHQ6IDBcbi8vICAgICB9XG4vLyAgIH0sXG4vLyAgIGRhdGEoKSB7XG4vLyAgICAgcmV0dXJuIHtcbi8vICAgICAgIHRhYnM6IFtdXG4vLyAgICAgfTtcbi8vICAgfSxcbi8vICAgcmVhZHkoKSB7XG4vLyAgICAgaWYgKHRoaXMudGFic1swXSkge1xuLy8gICAgICAgdGhpcy50YWJzWzBdLmFjdGl2ZSA9IHRydWU7XG4vLyAgICAgfVxuLy8gICB9LFxuLy8gICBtZXRob2RzOiB7XG4vLyAgICAgaGFuZGxlVGFiTGlzdENsaWNrKGluZGV4LCBlbCkge1xuLy8gICAgICAgaWYgKCFlbC5kaXNhYmxlZCkgdGhpcy5hY3RpdmUgPSBpbmRleDtcbi8vXG4vLyAgICAgICBmb3IgKHZhciBpID0gMCwgaiA9IHRoaXMudGFicy5sZW5ndGg7IGkgPCBqOyBpKyspIHtcbi8vICAgICAgICAgdGhpcy50YWJzW2ldLmFjdGl2ZSA9IChpID09IGluZGV4KTtcbi8vICAgICAgICAgaWYgKHRoaXMudGFic1tpXS5hY3RpdmUpIHtcbi8vICAgICAgICAgICB0aGlzLiRjaGlsZHJlbltpXS4kZW1pdCgnVEFCX0NPTVBPTkVOVF9UQUJfQ0xJQ0tFRCcpO1xuLy8gICAgICAgICB9XG4vLyAgICAgICB9XG4vLyAgICAgfVxuLy8gICB9XG4vLyB9O1xuXG59LHtcIi4vdGFic1RlbXBsYXRlLmh0bWxcIjoyMX1dLDIxOltmdW5jdGlvbihyZXF1aXJlLG1vZHVsZSxleHBvcnRzKXtcbm1vZHVsZS5leHBvcnRzID0gXCJcXG48ZGl2IGNsYXNzPVxcXCJ0YWJzXFxcIj5cXG4gIDx1bCBjbGFzcz1cXFwidGFiLW5hdlxcXCI+XFxuICAgIDxsaSB2LWZvcj1cXFwidGFiIGluIHRhYnNcXFwiIHYtYmluZDpjbGFzcz1cXFwieyAnYWN0aXZlJzogKGlzYWN0aXZlID09PSB0YWIubWVzc2FnZSkgfVxcXCIgdi1vbjpjbGljay5wcmV2ZW50PVxcXCJub3RpZnkodGFiKVxcXCI+XFxuICAgICAge3sgdGFiLm1lc3NhZ2UgfX1cXG4gICAgPC9saT5cXG4gIDwvdWw+XFxuXFxuICA8ZGl2IGNsYXNzPVxcXCJ0YWItY29udGVudFxcXCI+XFxuICAgICAgPHNsb3Q+PC9zbG90PlxcbiAgPC9kaXY+XFxuPC9kaXY+XFxuXFxuPCEtLSA8ZGl2IGNsYXNzPVxcXCJ0YWJzXFxcIj5cXG4gIDx1bCBjbGFzcz1cXFwidGFiLW5hdlxcXCI+XFxuICAgIDxsaSB2LWZvcj1cXFwidGFiIGluIHRhYnNcXFwiIHYtYmluZDpjbGFzcz1cXFwieyAnYWN0aXZlJzogdGFiLmFjdGl2ZSB9XFxcIiB2LW9uOmNsaWNrLnByZXZlbnQ9XFxcImhhbmRsZVRhYkxpc3RDbGljaygkaW5kZXgsIHRhYilcXFwiIDpkaXNhYmxlZD1cXFwidGFiLmRpc2FibGVkXFxcIj5cXG4gICAgICB7eyB0YWIuaGVhZGluZyB9fVxcbiAgICA8L2xpPlxcbiAgPC91bD5cXG5cXG4gIDxkaXYgY2xhc3M9XFxcInRhYi1jb250ZW50XFxcIiB2LWVsOnRhYkNvbnRlbnQ+XFxuICAgICAgPHNsb3Q+PC9zbG90PlxcbiAgPC9kaXY+XFxuPC9kaXY+IC0tPlxcblwiO1xuXG59LHt9XSwyMjpbZnVuY3Rpb24ocmVxdWlyZSxtb2R1bGUsZXhwb3J0cyl7XG5cbnZhciB2Q2hlY2tib3hDb21wb25lbnQgPSByZXF1aXJlKCcuL3ZDaGVja2JveENvbXBvbmVudC5qcycpO1xuXG5WdWUuY29tcG9uZW50KCd2Q2hlY2tib3gnLCB2Q2hlY2tib3hDb21wb25lbnQpO1xuXG59LHtcIi4vdkNoZWNrYm94Q29tcG9uZW50LmpzXCI6MjN9XSwyMzpbZnVuY3Rpb24ocmVxdWlyZSxtb2R1bGUsZXhwb3J0cyl7XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICB0ZW1wbGF0ZTogcmVxdWlyZSgnLi92Q2hlY2tib3hUZW1wbGF0ZS5odG1sJyksXG4gIGRhdGEoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGljb246ICd1bmNoZWNrZWQnLFxuICAgICAgaXNFcnJvcjogZmFsc2VcbiAgICB9O1xuICB9LFxuICBwcm9wczoge1xuICAgIGNoZWNrZWQ6IHtcbiAgICAgIHR5cGU6IEJvb2xlYW4sXG4gICAgICByZXF1aXJlZDogdHJ1ZSxcbiAgICAgIHR3b1dheTogdHJ1ZVxuICAgIH0sXG4gICAgbGFiZWw6IHtcbiAgICAgIHR5cGU6IFN0cmluZyxcbiAgICAgIHJlcXVpcmVkOiB0cnVlXG4gICAgfSxcbiAgICByZXF1aXJlZDoge1xuICAgICAgdHlwZTogQm9vbGVhbixcbiAgICAgIGRlZmF1bHQ6IGZhbHNlXG4gICAgfVxuICB9LFxuICBtZXRob2RzOiB7XG4gICAgaXNWYWxpZCgpIHtcbiAgICAgIHRoaXMuaXNFcnJvciA9ICh0aGlzLnJlcXVpcmVkKSA/ICF0aGlzLmNoZWNrZWQgOiBmYWxzZTtcbiAgICAgIHJldHVybiAhdGhpcy5pc0Vycm9yO1xuICAgIH1cbiAgfVxufTtcblxufSx7XCIuL3ZDaGVja2JveFRlbXBsYXRlLmh0bWxcIjoyNH1dLDI0OltmdW5jdGlvbihyZXF1aXJlLG1vZHVsZSxleHBvcnRzKXtcbm1vZHVsZS5leHBvcnRzID0gXCJcXG48bGFiZWw+PGlucHV0IHR5cGU9XFxcImNoZWNrYm94XFxcIiB2LW1vZGVsPVxcXCJjaGVja2VkXFxcIiAvPiB7eyBsYWJlbCB9fTwvbGFiZWw+XFxuXCI7XG5cbn0se31dLDI1OltmdW5jdGlvbihyZXF1aXJlLG1vZHVsZSxleHBvcnRzKXtcblxudmFyIHZGb3JtQ29tcG9uZW50ID0gcmVxdWlyZSgnLi92Rm9ybUNvbXBvbmVudC5qcycpO1xuXG5WdWUuY29tcG9uZW50KCd2Rm9ybScsIHZGb3JtQ29tcG9uZW50KTtcblxufSx7XCIuL3ZGb3JtQ29tcG9uZW50LmpzXCI6MjZ9XSwyNjpbZnVuY3Rpb24ocmVxdWlyZSxtb2R1bGUsZXhwb3J0cyl7XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICB0ZW1wbGF0ZTogcmVxdWlyZSgnLi92Rm9ybVRlbXBsYXRlLmh0bWwnKSxcbiAgcHJvcHM6IHtcbiAgICBtZXRob2Q6IHtcbiAgICAgIHR5cGU6IFN0cmluZyxcbiAgICAgIGRlZmF1bHQ6ICdQT1NUJ1xuICAgIH0sXG4gICAgYWN0aW9uOiB7XG4gICAgICB0eXBlOiBTdHJpbmcsXG4gICAgICBkZWZhdWx0OiAnJ1xuICAgIH0sXG4gICAgYXN5bmM6IHtcbiAgICAgIHR5cGU6IEJvb2xlYW4sXG4gICAgICBkZWZhdWx0OiBmYWxzZVxuICAgIH0sXG4gICAgc3VibWl0Q2FsbGJhY2s6IHtcbiAgICAgIHR5cGU6IEZ1bmN0aW9uXG4gICAgfVxuICB9LFxuICBtZXRob2RzOiB7XG4gICAgc3VibWl0Rm9ybShldmVudCkge1xuICAgICAgaWYgKHRoaXMuYXN5bmMgfHwgIXRoaXMuaXNWYWxpZCgpKSB7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICB9XG5cbiAgICAgIGlmICh0aGlzLmFzeW5jICYmIHRoaXMuaXNWYWxpZCgpICYmIHR5cGVvZiB0aGlzLnN1Ym1pdENhbGxiYWNrID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIHRoaXMuc3VibWl0Q2FsbGJhY2soKTtcbiAgICAgIH1cbiAgICB9LFxuICAgIGlzVmFsaWQoKSB7XG4gICAgICB2YXIgc2VsZiA9IHRoaXMsXG4gICAgICAgIGZvcm1Jc1ZhbGlkID0gdHJ1ZTtcblxuICAgICAgZm9yICh2YXIgaSA9IDAsIGogPSBzZWxmLiRjaGlsZHJlbi5sZW5ndGg7IGkgPCBqOyBpKyspIHtcbiAgICAgICAgaWYgKF8uaXNGdW5jdGlvbihzZWxmLiRjaGlsZHJlbltpXS5pc1ZhbGlkKSkgeyAvLyBoYXMgaW5wdXQgdmFsaWRhdGlvbiBhdHRhY2hlZFxuICAgICAgICAgIGZvcm1Jc1ZhbGlkID0gZm9ybUlzVmFsaWQgJiYgc2VsZi4kY2hpbGRyZW5baV0uaXNWYWxpZCgpO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBmb3JtSXNWYWxpZDtcbiAgICB9XG4gIH1cbn07XG5cbn0se1wiLi92Rm9ybVRlbXBsYXRlLmh0bWxcIjoyN31dLDI3OltmdW5jdGlvbihyZXF1aXJlLG1vZHVsZSxleHBvcnRzKXtcbm1vZHVsZS5leHBvcnRzID0gXCJcXG48Zm9ybSB2LWlmPVxcXCJhc3luY1xcXCIgdi1lbDpmb3JtIHYtb246c3VibWl0LnByZXZlbnQ9XFxcInN1Ym1pdEZvcm1cXFwiIDptZXRob2Q9XFxcIm1ldGhvZFxcXCIgOmFjdGlvbj1cXFwiYWN0aW9uXFxcIiBub3ZhbGlkYXRlPlxcbiAgPHNsb3Q+PC9zbG90PlxcbjwvZm9ybT5cXG48Zm9ybSB2LWVsc2Ugdi1lbDpmb3JtIHYtb246c3VibWl0PVxcXCJzdWJtaXRGb3JtXFxcIiA6bWV0aG9kPVxcXCJtZXRob2RcXFwiIDphY3Rpb249XFxcImFjdGlvblxcXCIgbm92YWxpZGF0ZT5cXG4gIDxzbG90Pjwvc2xvdD5cXG48L2Zvcm0+XFxuXCI7XG5cbn0se31dLDI4OltmdW5jdGlvbihyZXF1aXJlLG1vZHVsZSxleHBvcnRzKXtcblxudmFyIHZJbnB1dENvbXBvbmVudCA9IHJlcXVpcmUoJy4vdklucHV0Q29tcG9uZW50LmpzJyk7XG5cblZ1ZS5jb21wb25lbnQoJ3ZJbnB1dCcsIHZJbnB1dENvbXBvbmVudCk7XG5cbn0se1wiLi92SW5wdXRDb21wb25lbnQuanNcIjoyOX1dLDI5OltmdW5jdGlvbihyZXF1aXJlLG1vZHVsZSxleHBvcnRzKXtcblxudmFyIHZhbGlkYXRpb25SdWxlcyA9IHJlcXVpcmUoJy4vdmFsaWRhdGlvblJ1bGVzLmpzJyk7XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICB0ZW1wbGF0ZTogcmVxdWlyZSgnLi92SW5wdXRUZW1wbGF0ZS5odG1sJyksXG4gIHByb3BzOiB7XG4gICAgbGFiZWw6IHtcbiAgICAgIHR5cGU6IFN0cmluZ1xuICAgIH0sXG4gICAgbmFtZToge1xuICAgICAgdHlwZTogU3RyaW5nXG4gICAgfSxcbiAgICB0eXBlOiB7XG4gICAgICB0eXBlOiBTdHJpbmcsXG4gICAgICByZXF1aXJlZDogdHJ1ZVxuICAgIH0sXG4gICAgcGxhY2Vob2xkZXI6IHtcbiAgICAgIHR5cGU6IFN0cmluZ1xuICAgIH0sXG4gICAgaWNvbjoge1xuICAgICAgdHlwZTogU3RyaW5nXG4gICAgfSxcbiAgICB2YWx1ZToge1xuICAgICAgdHlwZTogU3RyaW5nLFxuICAgICAgcmVxdWlyZWQ6IHRydWUsXG4gICAgICB0d29XYXk6IHRydWVcbiAgICB9LFxuICAgIHJlcXVpcmVkOiB7XG4gICAgICB0eXBlOiBCb29sZWFuLFxuICAgICAgZGVmYXVsdDogZmFsc2VcbiAgICB9LFxuICAgIGVxdWFsVG86IHtcbiAgICAgIHR5cGU6IE9iamVjdCxcbiAgICAgIGRlZmF1bHQ6IG51bGxcbiAgICB9XG4gIH0sXG4gIGRhdGEoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGVycm9yOiAnJ1xuICAgIH07XG4gIH0sXG4gIG1ldGhvZHM6IHtcbiAgICBpc1ZhbGlkKCkge1xuICAgICAgdGhpcy52YWxpZGF0ZSgpO1xuICAgICAgcmV0dXJuICh0aGlzLmVycm9yLmxlbmd0aCA9PT0gMCk7XG4gICAgfSxcbiAgICBkZWJvdW5jZVZhbGlkYXRlOiBfLmRlYm91bmNlKGZ1bmN0aW9uICgpIHtcbiAgICAgIHRoaXMudmFsaWRhdGUoKTtcbiAgICB9LCA1MDApLFxuICAgIHZhbGlkYXRlKCkge1xuICAgICAgdmFyIGxhYmVsID0gdGhpcy5sYWJlbCB8fCB0aGlzLm5hbWU7XG5cbiAgICAgIC8vIHJlcXVpcmVkIHZhbGlkYXRpb25cbiAgICAgIGlmICh0aGlzLnJlcXVpcmVkICYmIHRoaXMudmFsdWUubGVuZ3RoID09PSAwKSB7XG4gICAgICAgIHRoaXMuZXJyb3IgPSBsYWJlbCArICcgaXMgcmVxdWlyZWQnO1xuXG4gICAgICAvLyBodG1sNSBkYXRhIHR5cGUgdmFsaWRhdGlvblxuICAgICAgfSBlbHNlIGlmICh2YWxpZGF0aW9uUnVsZXMuaGFzT3duUHJvcGVydHkodGhpcy50eXBlKSAmJiAhdmFsaWRhdGlvblJ1bGVzW3RoaXMudHlwZV0ucmVnZXgudGVzdCh0aGlzLnZhbHVlKSkge1xuICAgICAgICB0aGlzLmVycm9yID0gdmFsaWRhdGlvblJ1bGVzW3RoaXMudHlwZV0uZGVmYXVsdEVycm9yO1xuXG4gICAgICAvLyBlcXVpdmFsZW5jeSB2YWxpZGF0aW9uXG4gICAgICB9IGVsc2UgaWYgKHRoaXMuZXF1YWxUbyAmJiB0aGlzLmVxdWFsVG8udmFsdWUgIT09IHRoaXMudmFsdWUpIHtcbiAgICAgICAgdGhpcy5lcnJvciA9ICdNdXN0IG1hdGNoICcgKyB0aGlzLmVxdWFsVG8ubGFiZWw7XG5cbiAgICAgIC8vIGlucHV0IGlzIHZhbGlkXG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLmVycm9yID0gJyc7XG4gICAgICB9XG4gICAgfVxuICB9XG59O1xuXG59LHtcIi4vdklucHV0VGVtcGxhdGUuaHRtbFwiOjMwLFwiLi92YWxpZGF0aW9uUnVsZXMuanNcIjozMX1dLDMwOltmdW5jdGlvbihyZXF1aXJlLG1vZHVsZSxleHBvcnRzKXtcbm1vZHVsZS5leHBvcnRzID0gXCJcXG48bGFiZWwgY2xhc3M9XFxcInYtaW5wdXRcXFwiPlxcbiAge3sgbGFiZWwgfX1cXG4gIDxkaXYgY2xhc3M9XFxcImlucHV0LXdyYXBcXFwiPlxcbiAgICA8aSBjbGFzcz1cXFwiZmEgZmEte3sgaWNvbiB9fVxcXCIgdi1pZj1cXFwiaWNvblxcXCI+PC9pPlxcbiAgICA8dGV4dGFyZWEgdi1pZj1cXFwidHlwZSA9PT0gJ3RleHRhcmVhJ1xcXCJcXG4gICAgICB2LWVsOmlucHV0XFxuICAgICAgOmNsYXNzPVxcXCJ7ICdlcnJvcic6IGVycm9yLmxlbmd0aCA+IDAgfVxcXCJcXG4gICAgICBuYW1lPVxcXCJ7eyBuYW1lIH19XFxcIlxcbiAgICAgIHBsYWNlaG9sZGVyPVxcXCJ7eyBwbGFjZWhvbGRlciB9fVxcXCJcXG4gICAgICB2LW1vZGVsPVxcXCJ2YWx1ZVxcXCJcXG4gICAgICB2LW9uOmJsdXI9XFxcInZhbGlkYXRlKClcXFwiPjwvdGV4dGFyZWE+XFxuICAgIDxpbnB1dCB2LWVsc2VcXG4gICAgICB2LWVsOmlucHV0XFxuICAgICAgOmNsYXNzPVxcXCJ7ICdlcnJvcic6IGVycm9yLmxlbmd0aCA+IDAgfVxcXCJcXG4gICAgICBuYW1lPVxcXCJ7eyBuYW1lIH19XFxcIlxcbiAgICAgIHR5cGU9XFxcInt7IHR5cGUgfX1cXFwiXFxuICAgICAgcGxhY2Vob2xkZXI9XFxcInt7IHBsYWNlaG9sZGVyIH19XFxcIlxcbiAgICAgIHYtbW9kZWw9XFxcInZhbHVlXFxcIlxcbiAgICAgIHYtb246Ymx1cj1cXFwidmFsaWRhdGUoKVxcXCIgLz5cXG4gICAgPHNtYWxsIHYtaWY9XFxcImVycm9yLmxlbmd0aCA+IDBcXFwiIHRyYW5zaXRpb249XFxcInNsaWRlLXVwLXgtc21hbGxcXFwiIGNsYXNzPVxcXCJlcnJvclxcXCI+e3sgZXJyb3IgfX08L3NtYWxsPlxcbiAgPC9kaXY+XFxuPC9sYWJlbD5cXG5cIjtcblxufSx7fV0sMzE6W2Z1bmN0aW9uKHJlcXVpcmUsbW9kdWxlLGV4cG9ydHMpe1xuXG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBlbWFpbDoge1xuICAgIHJlZ2V4OiAvXigoW148PigpXFxbXFxdXFxcXC4sOzpcXHNAXCJdKyhcXC5bXjw+KClcXFtcXF1cXFxcLiw7Olxcc0BcIl0rKSopfChcIi4rXCIpKUAoKFxcW1swLTldezEsM31cXC5bMC05XXsxLDN9XFwuWzAtOV17MSwzfVxcLlswLTldezEsM31dKXwoKFthLXpBLVpcXC0wLTldK1xcLikrW2EtekEtWl17Mix9KSkkLyxcbiAgICBkZWZhdWx0RXJyb3I6ICdQbGVhc2UgZW50ZXIgYSB2YWxpZCBlbWFpbCBhZGRyZXNzJ1xuICB9LFxuICB1cmw6IHtcbiAgICByZWdleDogL2h0dHBzPzpcXC9cXC8od3d3XFwuKT9bLWEtekEtWjAtOUA6JS5fXFwrfiM9XXsyLDI1Nn1cXC5bYS16XXsyLDR9XFxiKFstYS16QS1aMC05QDolX1xcKy5+Iz8mLy89XSopLyxcbiAgICBkZWZhdWx0RXJyb3I6ICdQbGVhc2UgZW50ZXIgYSB2YWxpZCBVUkwnXG4gIH0sXG4gIG51bWJlcjoge1xuICAgIHJlZ2V4OiAvWy0uMC05XSsvLFxuICAgIGRlZmF1bHRFcnJvcjogJ1BsZWFzZSBlbnRlciBhIHZhbGlkIG51bWJlcidcbiAgfVxufTtcblxufSx7fV0sMzI6W2Z1bmN0aW9uKHJlcXVpcmUsbW9kdWxlLGV4cG9ydHMpe1xuXG52YXIgdlNlbGVjdENvbXBvbmVudCA9IHJlcXVpcmUoJy4vdlNlbGVjdENvbXBvbmVudC5qcycpO1xuXG5WdWUuY29tcG9uZW50KCd2U2VsZWN0JywgdlNlbGVjdENvbXBvbmVudCk7XG5cbn0se1wiLi92U2VsZWN0Q29tcG9uZW50LmpzXCI6MzN9XSwzMzpbZnVuY3Rpb24ocmVxdWlyZSxtb2R1bGUsZXhwb3J0cyl7XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICB0ZW1wbGF0ZTogcmVxdWlyZSgnLi92U2VsZWN0VGVtcGxhdGUuaHRtbCcpLFxuICBwcm9wczoge1xuICAgIGxhYmVsOiB7XG4gICAgICB0eXBlOiBTdHJpbmcsXG4gICAgICBkZWZhdWx0OiAnJ1xuICAgIH0sXG4gICAgc2VsZWN0ZWQ6IHtcbiAgICAgIHR5cGU6IFN0cmluZyxcbiAgICAgIHJlcXVpcmVkOiB0cnVlLFxuICAgICAgdHdvV2F5OiB0cnVlXG4gICAgfSxcbiAgICBvcHRpb25zOiB7XG4gICAgICB0eXBlOiBBcnJheSxcbiAgICAgIHJlcXVpcmVkOiB0cnVlXG4gICAgfSxcbiAgICByZXF1aXJlZDoge1xuICAgICAgdHlwZTogQm9vbGVhbixcbiAgICAgIGRlZmF1bHQ6IGZhbHNlXG4gICAgfVxuICB9LFxuICBkYXRhKCkge1xuICAgIHJldHVybiB7XG4gICAgICBpc0Vycm9yOiBmYWxzZVxuICAgIH07XG4gIH0sXG4gIHJlYWR5KCkge1xuICAgIHZhciBzZWxmID0gdGhpcyxcbiAgICAgIHNlbGVjdGVkSW5kZXggPSBfLmZpbmRJbmRleChzZWxmLm9wdGlvbnMsIChvcHRpb24pID0+IG9wdGlvbi52YWx1ZSA9PT0gc2VsZi5zZWxlY3RlZCk7XG5cbiAgICBpZiAoc2VsZi5yZXF1aXJlZCAmJiBzZWxlY3RlZEluZGV4ID09PSAtMSkge1xuICAgICAgc2VsZi5zZWxlY3RlZCA9IHNlbGYub3B0aW9uc1swXS52YWx1ZTtcbiAgICB9XG4gIH0sXG4gIG1ldGhvZHM6IHtcbiAgICBpc1ZhbGlkKCkge1xuICAgICAgdGhpcy5pc0Vycm9yID0gIXRoaXMucmVxdWlyZWQgfHwgdGhpcy5zZWxlY3RlZC5sZW5ndGggPiAwO1xuICAgICAgcmV0dXJuIHRoaXMuaXNFcnJvcjtcbiAgICB9XG4gIH1cbn07XG5cbn0se1wiLi92U2VsZWN0VGVtcGxhdGUuaHRtbFwiOjM0fV0sMzQ6W2Z1bmN0aW9uKHJlcXVpcmUsbW9kdWxlLGV4cG9ydHMpe1xubW9kdWxlLmV4cG9ydHMgPSBcIlxcbjxsYWJlbCBjbGFzcz1cXFwidi1zZWxlY3RcXFwiPlxcbiAge3sgbGFiZWwgfX1cXG4gIDxzZWxlY3Qgdi1tb2RlbD1cXFwic2VsZWN0ZWRcXFwiIDpjbGFzcz1cXFwieyAnZXJyb3InOiBpc0Vycm9yIH1cXFwiPlxcbiAgICA8b3B0aW9uIHYtaWY9XFxcIiFyZXF1aXJlZFxcXCIgdmFsdWU9XFxcIlxcXCI+PC9vcHRpb24+XFxuICAgIDxvcHRpb24gdi1mb3I9XFxcIm9wdGlvbiBpbiBvcHRpb25zXFxcIiA6dmFsdWU9XFxcIm9wdGlvbi52YWx1ZVxcXCI+e3sgb3B0aW9uLmxhYmVsIH19PC9vcHRpb24+XFxuICA8L3NlbGVjdD5cXG48L2xhYmVsPlxcblwiO1xuXG59LHt9XSwzNTpbZnVuY3Rpb24ocmVxdWlyZSxtb2R1bGUsZXhwb3J0cyl7XG5cbnJlcXVpcmUoJy4vY29tcG9uZW50cy9hbGVydC9hbGVydC5qcycpO1xucmVxdWlyZSgnLi9jb21wb25lbnRzL2ljb24vaWNvbi5qcycpO1xucmVxdWlyZSgnLi9jb21wb25lbnRzL21vZGFsL21vZGFsLmpzJyk7XG5yZXF1aXJlKCcuL2NvbXBvbmVudHMvcHJvbXB0L3Byb21wdC5qcycpO1xucmVxdWlyZSgnLi9jb21wb25lbnRzL2xvYWRlci9sb2FkZXIuanMnKTtcbnJlcXVpcmUoJy4vY29tcG9uZW50cy90YWJzL3RhYnMuanMnKTtcbnJlcXVpcmUoJy4vY29tcG9uZW50cy92Rm9ybS92Rm9ybS5qcycpO1xucmVxdWlyZSgnLi9jb21wb25lbnRzL3ZJbnB1dC92SW5wdXQuanMnKTtcbnJlcXVpcmUoJy4vY29tcG9uZW50cy92U2VsZWN0L3ZTZWxlY3QuanMnKTtcbnJlcXVpcmUoJy4vY29tcG9uZW50cy92Q2hlY2tib3gvdkNoZWNrYm94LmpzJyk7XG5cbn0se1wiLi9jb21wb25lbnRzL2FsZXJ0L2FsZXJ0LmpzXCI6MSxcIi4vY29tcG9uZW50cy9pY29uL2ljb24uanNcIjo0LFwiLi9jb21wb25lbnRzL2xvYWRlci9sb2FkZXIuanNcIjo3LFwiLi9jb21wb25lbnRzL21vZGFsL21vZGFsLmpzXCI6MTAsXCIuL2NvbXBvbmVudHMvcHJvbXB0L3Byb21wdC5qc1wiOjEzLFwiLi9jb21wb25lbnRzL3RhYnMvdGFicy5qc1wiOjE5LFwiLi9jb21wb25lbnRzL3ZDaGVja2JveC92Q2hlY2tib3guanNcIjoyMixcIi4vY29tcG9uZW50cy92Rm9ybS92Rm9ybS5qc1wiOjI1LFwiLi9jb21wb25lbnRzL3ZJbnB1dC92SW5wdXQuanNcIjoyOCxcIi4vY29tcG9uZW50cy92U2VsZWN0L3ZTZWxlY3QuanNcIjozMn1dfSx7fSxbMzVdKSJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
