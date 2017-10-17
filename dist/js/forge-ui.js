/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _componentList = __webpack_require__(1);

	var _componentList2 = _interopRequireDefault(_componentList);

	var _forgeUtil = __webpack_require__(9);

	var _forgeUtil2 = _interopRequireDefault(_forgeUtil);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var Forge = {

	  // bucket for registering components
	  components: {},

	  /**
	   * cast
	   *
	   * Register a component to Forge
	   *
	   * @param component string The name of the component
	   * @param template  string optional - The template to register to the component
	   * @param template  string optional - The name to register the component to Vue with
	   */
	  cast: function cast(componentName, template, customName) {
	    if (_componentList2.default.hasOwnProperty(componentName)) {
	      var name = customName || componentName;

	      if (!this.components.hasOwnProperty(name)) {
	        var component = _forgeUtil2.default.clone(_componentList2.default[componentName]);

	        if (_forgeUtil2.default.isString(template)) {
	          component.template = template;
	        }

	        this.components[name] = component;
	      }
	    } else {
	      console.error('ForgeUI does not currently include a component with name ' + componentName);
	    }
	  },


	  /**
	   * castAll
	   *
	   * Register all unregistered components to Forge with defualt templates
	   */
	  castAll: function castAll() {
	    for (var component in _componentList2.default) {
	      this.cast(component);
	    }
	  },


	  /**
	   * install
	   *
	   * Vue.js plugin installer
	   *
	   * @param Vue     object Vue.js instance
	   * @param options object Options object - currently unused
	   */
	  install: function install(Vue, options) {
	    // register to Forge anything that's left to register
	    this.castAll();

	    // register component list to Vue
	    for (var name in this.components) {
	      Vue.component(name, this.components[name]);
	    }
	  }
	};

	if (window) {
	  window.Forge = Forge;
	}

	exports.default = Forge;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _alertComponent = __webpack_require__(2);

	var _alertComponent2 = _interopRequireDefault(_alertComponent);

	var _iconComponent = __webpack_require__(4);

	var _iconComponent2 = _interopRequireDefault(_iconComponent);

	var _modalComponent = __webpack_require__(6);

	var _modalComponent2 = _interopRequireDefault(_modalComponent);

	var _promptComponent = __webpack_require__(8);

	var _promptComponent2 = _interopRequireDefault(_promptComponent);

	var _loaderComponent = __webpack_require__(11);

	var _loaderComponent2 = _interopRequireDefault(_loaderComponent);

	var _tabsComponent = __webpack_require__(13);

	var _tabsComponent2 = _interopRequireDefault(_tabsComponent);

	var _tabComponent = __webpack_require__(15);

	var _tabComponent2 = _interopRequireDefault(_tabComponent);

	var _fFormComponent = __webpack_require__(17);

	var _fFormComponent2 = _interopRequireDefault(_fFormComponent);

	var _fInputComponent = __webpack_require__(19);

	var _fInputComponent2 = _interopRequireDefault(_fInputComponent);

	var _fSelectComponent = __webpack_require__(22);

	var _fSelectComponent2 = _interopRequireDefault(_fSelectComponent);

	var _fCheckboxComponent = __webpack_require__(24);

	var _fCheckboxComponent2 = _interopRequireDefault(_fCheckboxComponent);

	var _fRadioComponent = __webpack_require__(26);

	var _fRadioComponent2 = _interopRequireDefault(_fRadioComponent);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var componentList = {
	  alert: _alertComponent2.default,
	  icon: _iconComponent2.default,
	  modal: _modalComponent2.default,
	  prompt: _promptComponent2.default,
	  loader: _loaderComponent2.default,
	  tabs: _tabsComponent2.default,
	  tab: _tabComponent2.default,
	  fForm: _fFormComponent2.default,
	  fInput: _fInputComponent2.default,
	  fSelect: _fSelectComponent2.default,
	  fCheckbox: _fCheckboxComponent2.default,
	  fRadio: _fRadioComponent2.default
	};

	exports.default = componentList;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _alertTemplate = __webpack_require__(3);

	var _alertTemplate2 = _interopRequireDefault(_alertTemplate);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var component = {
	  template: _alertTemplate2.default,
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

	exports.default = component;

/***/ }),
/* 3 */
/***/ (function(module, exports) {

	module.exports = "\n<div class=\"alert-box\" v-bind:class=\"{\n    primary: type === 'primary',\n    secondary: type === 'secondary',\n    success: type === 'success',\n    warning: type === 'warning',\n    alert: type === 'alert'\n  }\" transition=\"fade\" v-show=\"messages.length > 0\">\n  <ul>\n    <li v-for=\"message in messages\" track-by=\"$index\">{{ message }}</li>\n  </ul>\n  <button class=\"close-button\" aria-label=\"Dismiss alert\" type=\"button\" v-if=\"canClose\" v-on:click=\"close()\">\n    <span aria-hidden=\"true\">&times;</span>\n  </button>\n</div>\n";

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _iconTemplate = __webpack_require__(5);

	var _iconTemplate2 = _interopRequireDefault(_iconTemplate);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var component = {
	  template: _iconTemplate2.default,
	  props: ['name']
	};

	exports.default = component;

/***/ }),
/* 5 */
/***/ (function(module, exports) {

	module.exports = "\n<svg class=\"icon-image {{ name }}\">\n  <use xmlns:xlink=\"http://www.w3.org/1999/xlink\" xlink:href=\"#icon-{{ name }}\"></use>\n</svg>\n";

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _modalTemplate = __webpack_require__(7);

	var _modalTemplate2 = _interopRequireDefault(_modalTemplate);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var component = {
	  template: _modalTemplate2.default,
	  props: {
	    modalSize: {
	      type: String,
	      default: 'full'
	    },
	    transition: {
	      type: String,
	      default: 'zoom-out'
	    }
	  },
	  data: function data() {
	    return {
	      show: false
	    };
	  },

	  methods: {
	    open: function open() {
	      this.show = true;
	    },
	    close: function close() {
	      this.show = false;
	    }
	  }
	};

	exports.default = component;

/***/ }),
/* 7 */
/***/ (function(module, exports) {

	module.exports = "\n<transition :name=\"transition\">\n  <div class=\"modal\" v-show=\"show\">\n    <div class=\"modal-overlay\" @click=\"close()\"></div>\n    <div @click.prevent :class=\"{ 'modal-content': true, 'small': modalSize === 'small', 'full': modalSize === 'full' }\">\n      <div class=\"modal-header\">\n        <slot name=\"header\"></slot>\n      </div>\n      <slot name=\"content\"></slot>\n      <span @click=\"close()\" aria-label=\"Close\">&#215;</span>\n    </div>\n  </div>\n</transition>\n";

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _forgeUtil = __webpack_require__(9);

	var _forgeUtil2 = _interopRequireDefault(_forgeUtil);

	var _promptTemplate = __webpack_require__(10);

	var _promptTemplate2 = _interopRequireDefault(_promptTemplate);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
	    if (newVal && _forgeUtil2.default.isFunction(options.yes)) {
	      options.yes(showInput ? vm.promptValue : null);
	    } else if (!newVal && _forgeUtil2.default.isFunction(options.no)) {
	      options.no();
	    }
	    unwatch();
	    vm.show = false;
	  });
	}

	var component = {
	  template: _promptTemplate2.default,
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

	  methods: {
	    yes: function yes() {
	      this.confirmed = true;
	    },
	    no: function no() {
	      this.confirmed = false;
	    }
	  }
	};

	exports.default = component;

/***/ }),
/* 9 */
/***/ (function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = {
	  clone: function clone(obj) {
	    var copy = obj.constructor();

	    for (var attr in obj) {
	      if (obj.hasOwnProperty(attr)) copy[attr] = obj[attr];
	    }

	    return copy;
	  },
	  isFunction: function isFunction(func) {
	    return func && {}.toString.call(func) === '[object Function]';
	  },
	  isString: function isString(str) {
	    return typeof str === 'string';
	  },
	  debounce: function debounce(func, wait, immediate) {
	    var timeout;

	    return function () {
	      var context = this,
	          args = arguments,
	          callNow = immediate && !timeout,
	          later = function later() {
	        timeout = null;
	        if (!immediate) func.apply(context, args);
	      };

	      clearTimeout(timeout);

	      timeout = setTimeout(later, wait);
	      if (callNow) func.apply(context, args);
	    };
	  }
	};

/***/ }),
/* 10 */
/***/ (function(module, exports) {

	module.exports = "\n<transition :name=\"transition\">\n  <div class=\"prompt prompt-modal\" v-show=\"show\">\n    <div class=\"prompt-overlay\" @click=\"no()\"></div>\n    <div class=\"prompt-content\">\n      <f-form v-if=\"showInput\" :submit-callback=\"yes\" :ajax=\"true\">\n        <p>{{ questionLabel }}</p>\n        <f-input type=\"text\" ref=\"response\" name=\"promptResponse\" v-model=\"promptValue\" :required=\"true\"></f-input>\n        <div class=\"controls\">\n          <button type=\"button\" class=\"button small\" @click=\"no()\">{{ noLabel }}</button>\n          <button type=\"submit\" class=\"button small\">{{ yesLabel }}</button>\n        </div>\n      </f-form>\n      <div v-else>\n        <p>{{ questionLabel }}</p>\n        <div class=\"controls\">\n          <button type=\"button\" class=\"button small\" @click=\"no()\">{{ noLabel }}</button>\n          <button type=\"submit\" class=\"button small\" @click=\"yes()\">{{ yesLabel }}</button>\n        </div>\n      </div>\n    </div>\n  </div>\n</transition>\n";

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _loaderTemplate = __webpack_require__(12);

	var _loaderTemplate2 = _interopRequireDefault(_loaderTemplate);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var component = {
	  template: _loaderTemplate2.default,
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

	exports.default = component;

/***/ }),
/* 12 */
/***/ (function(module, exports) {

	module.exports = "<div class=\"loader\">Loading...</div>\n";

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _tabsTemplate = __webpack_require__(14);

	var _tabsTemplate2 = _interopRequireDefault(_tabsTemplate);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var component = {
	  template: _tabsTemplate2.default,
	  data: function data() {
	    return {
	      tabs: []
	    };
	  },

	  methods: {
	    addTab: function addTab(newTab) {
	      this.tabs.push(newTab);
	    },
	    activate: function activate(selectedTab) {
	      this.tabs.forEach(function (tab) {
	        tab.active = selectedTab.heading === tab.heading;
	      });
	    }
	  }
	};

	exports.default = component;

/***/ }),
/* 14 */
/***/ (function(module, exports) {

	module.exports = "\n<div class=\"tabs\">\n  <ul class=\"tab-nav\">\n    <li v-for=\"tab in tabs\" :class=\"{ 'active': tab.active }\" @click=\"activate(tab)\">\n      {{ tab.heading }}\n    </li>\n  </ul>\n\n  <div class=\"tab-content\">\n      <slot></slot>\n  </div>\n</div>\n";

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _tabTemplate = __webpack_require__(16);

	var _tabTemplate2 = _interopRequireDefault(_tabTemplate);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var component = {
	  template: _tabTemplate2.default,
	  props: {
	    heading: {
	      type: String,
	      required: true
	    },
	    selected: {
	      default: false
	    }
	  },
	  data: function data() {
	    return {
	      active: false
	    };
	  },
	  mounted: function mounted() {
	    this.active = this.selected;
	    this.$parent.addTab(this);
	  }
	};

	exports.default = component;

/***/ }),
/* 16 */
/***/ (function(module, exports) {

	module.exports = "\n<div class=\"tab\" v-show=\"active\">\n  <slot></slot>\n</div>\n";

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _fFormTemplate = __webpack_require__(18);

	var _fFormTemplate2 = _interopRequireDefault(_fFormTemplate);

	var _forgeUtil = __webpack_require__(9);

	var _forgeUtil2 = _interopRequireDefault(_forgeUtil);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var component = {
	  template: _fFormTemplate2.default,
	  props: {
	    method: {
	      type: String,
	      default: 'POST'
	    },
	    action: {
	      type: String,
	      default: ''
	    },
	    ajax: {
	      type: Boolean,
	      default: false
	    }
	  },
	  methods: {
	    submitForm: function submitForm(event) {
	      if (this.ajax || !this.isValid()) {
	        event.preventDefault();
	      }

	      if (this.ajax && this.isValid()) {
	        this.$emit('submit');
	      }
	    },
	    isValid: function isValid() {
	      var self = this,
	          formIsValid = true;

	      for (var i = 0, j = self.$children.length; i < j; i++) {
	        if (_forgeUtil2.default.isFunction(self.$children[i].isValid)) {
	          // has input validation attached
	          var inputIsValid = self.$children[i].isValid();
	          formIsValid = formIsValid && inputIsValid;
	        }
	      }

	      return formIsValid;
	    }
	  }
	};

	exports.default = component;

/***/ }),
/* 18 */
/***/ (function(module, exports) {

	module.exports = "\n<form ref=\"form\" v-on:submit=\"submitForm\" :method=\"method\" :action=\"action\" novalidate>\n  <slot></slot>\n</form>\n";

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _forgeUtil = __webpack_require__(9);

	var _forgeUtil2 = _interopRequireDefault(_forgeUtil);

	var _fInputTemplate = __webpack_require__(20);

	var _fInputTemplate2 = _interopRequireDefault(_fInputTemplate);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var validationRules = __webpack_require__(21);

	var component = {
	  template: _fInputTemplate2.default,
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
	      required: true
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
	      error: '',
	      inputValue: this.value
	    };
	  },

	  watch: {
	    inputValue: function inputValue() {
	      this.$emit('input', this.inputValue);
	      this.debounceValidate();
	    }
	  },
	  methods: {
	    isValid: function isValid() {
	      this.validate();
	      return this.error.length === 0;
	    },

	    debounceValidate: _forgeUtil2.default.debounce(function () {
	      this.validate();
	    }, 500),
	    validate: function validate() {
	      var label = this.label || this.name;

	      // required validation
	      if (this.required && this.inputValue.length === 0) {
	        this.error = label + ' is required';

	        // html5 data type validation
	      } else if (validationRules.hasOwnProperty(this.type) && !validationRules[this.type].regex.test(this.inputValue)) {
	        this.error = validationRules[this.type].defaultError;

	        // equivalency validation
	      } else if (this.equalTo && this.equalTo.value !== this.inputValue) {
	        this.error = 'Must match ' + this.equalTo.label;

	        // input is valid
	      } else {
	        this.error = '';
	      }
	    }
	  }
	};

	exports.default = component;

/***/ }),
/* 20 */
/***/ (function(module, exports) {

	module.exports = "\n<label class=\"f-input\">\n  {{ label }}\n  <div class=\"input-wrap\">\n    <i :class=\"['fa', 'fa-' + icon]\" v-if=\"icon\"></i>\n    <textarea v-if=\"type === 'textarea'\"\n      ref=\"input\"\n      :class=\"{ 'error': error.length > 0 }\"\n      :name=\"name\"\n      :placeholder=\"placeholder\"\n      v-model=\"inputValue\"\n      @blur=\"validate\"></textarea>\n    <input v-else\n      ref=\"input\"\n      :class=\"{ 'error': error.length > 0 }\"\n      :name=\"name\"\n      :placeholder=\"placeholder\"\n      type=\"text\"\n      v-model=\"inputValue\"\n      @blur=\"validate\" />\n    <small v-if=\"error.length > 0\" transition=\"slide-up-x-small\" class=\"error\">{{ error }}</small>\n  </div>\n</label>\n";

/***/ }),
/* 21 */
/***/ (function(module, exports) {

	'use strict';

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
	  },
	  tel: {
	    regex: /^(?:(?:\+?1\s*(?:[.-]\s*)?)?(?:\(\s*([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9])\s*\)|([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9]))\s*(?:[.-]\s*)?)?([2-9]1[02-9]|[2-9][02-9]1|[2-9][02-9]{2})\s*(?:[.-]\s*)?([0-9]{4})(?:\s*(?:#|x\.?|ext\.?|extension)\s*(\d+))?$/,
	    defaultError: 'Please enter a valid phone number'
	  }
	};

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _fSelectTemplate = __webpack_require__(23);

	var _fSelectTemplate2 = _interopRequireDefault(_fSelectTemplate);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var component = {
	  template: _fSelectTemplate2.default,
	  props: {
	    label: {
	      type: String,
	      default: ''
	    },
	    value: {
	      type: String,
	      required: true
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
	      isError: false,
	      selectedValue: this.value
	    };
	  },

	  watch: {
	    selectedValue: function selectedValue() {
	      this.$emit('input', this.selectedValue);
	    }
	  },
	  mounted: function mounted() {
	    var self = this,
	        selectedIndex = self.options.findIndex(function (option) {
	      return option.value === self.selectedValue;
	    });

	    if (self.required && selectedIndex === -1) {
	      self.selectedValue = self.options[0].value;
	    }
	  }
	};

	exports.default = component;

/***/ }),
/* 23 */
/***/ (function(module, exports) {

	module.exports = "\n<div class=\"f-select\">\n  <label>\n    {{ label }}\n    <select v-model=\"selectedValue\">\n      <option v-if=\"!required\" value=\"\"></option>\n      <option v-for=\"option in options\" :value=\"option.value\">{{ option.label }}</option>\n    </select>\n  </label>\n</div>\n";

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _fCheckboxTemplate = __webpack_require__(25);

	var _fCheckboxTemplate2 = _interopRequireDefault(_fCheckboxTemplate);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var component = {
	  template: _fCheckboxTemplate2.default,
	  props: {
	    value: {
	      type: Boolean,
	      required: true
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
	  data: function data() {
	    return {
	      isError: false,
	      isChecked: this.value
	    };
	  },

	  watch: {
	    isChecked: function isChecked() {
	      this.$emit('input', this.isChecked);
	    }
	  },
	  methods: {
	    isValid: function isValid() {
	      this.isError = this.required ? !this.isChecked : false;
	      return !this.isError;
	    }
	  }
	};

	exports.default = component;

/***/ }),
/* 25 */
/***/ (function(module, exports) {

	module.exports = "\n<div :class=\"{ 'f-checkbox': true, 'error': isError }\">\n  <label><input type=\"checkbox\" v-model=\"isChecked\" /> {{ label }}</label>\n</div>\n";

/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _fRadioTemplate = __webpack_require__(27);

	var _fRadioTemplate2 = _interopRequireDefault(_fRadioTemplate);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var component = {
	  template: _fRadioTemplate2.default,
	  props: {
	    label: {
	      type: String,
	      default: ''
	    },
	    name: {
	      type: String,
	      required: true
	    },
	    options: {
	      type: Array,
	      required: true
	    },
	    value: {
	      type: String,
	      required: true
	    },
	    required: {
	      type: Boolean,
	      default: false
	    }
	  },
	  data: function data() {
	    return {
	      selectedOption: '',
	      isError: false
	    };
	  },

	  watch: {
	    selectedOption: function selectedOption() {
	      this.$emit('input', this.selectedOption);
	    }
	  },
	  methods: {
	    isValid: function isValid() {
	      this.isError = this.required ? this.selectedOption.length === 0 : false;
	      return !this.isError;
	    }
	  }
	};

	exports.default = component;

/***/ }),
/* 27 */
/***/ (function(module, exports) {

	module.exports = "\n<div :class=\"{ 'f-radio': true, 'error': isError }\">\n  <label v-if=\"label.length > 0\">{{ label }}</label>\n  <span class=\"f-radio__option\" v-for=\"option in options\">\n    <input type=\"radio\" :name=\"name\" :value=\"option.value\" :id=\"option.name\" v-model=\"selectedOption\">\n    <label :for=\"option.name\">{{ option.label }}</label>\n  </span>\n</div>\n";

/***/ })
/******/ ]);