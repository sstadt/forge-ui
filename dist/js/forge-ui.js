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
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _alertComponent = __webpack_require__(1);

	var _alertComponent2 = _interopRequireDefault(_alertComponent);

	var _iconComponent = __webpack_require__(3);

	var _iconComponent2 = _interopRequireDefault(_iconComponent);

	var _modalComponent = __webpack_require__(5);

	var _modalComponent2 = _interopRequireDefault(_modalComponent);

	var _promptComponent = __webpack_require__(7);

	var _promptComponent2 = _interopRequireDefault(_promptComponent);

	var _loaderComponent = __webpack_require__(9);

	var _loaderComponent2 = _interopRequireDefault(_loaderComponent);

	var _tabsComponent = __webpack_require__(11);

	var _tabsComponent2 = _interopRequireDefault(_tabsComponent);

	var _tabComponent = __webpack_require__(13);

	var _tabComponent2 = _interopRequireDefault(_tabComponent);

	var _vFormComponent = __webpack_require__(15);

	var _vFormComponent2 = _interopRequireDefault(_vFormComponent);

	var _vInputComponent = __webpack_require__(17);

	var _vInputComponent2 = _interopRequireDefault(_vInputComponent);

	var _vSelectComponent = __webpack_require__(20);

	var _vSelectComponent2 = _interopRequireDefault(_vSelectComponent);

	var _vCheckboxComponent = __webpack_require__(22);

	var _vCheckboxComponent2 = _interopRequireDefault(_vCheckboxComponent);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var componentList = {
	  alert: _alertComponent2.default,
	  icon: _iconComponent2.default,
	  modal: _modalComponent2.default,
	  prompt: _promptComponent2.default,
	  loader: _loaderComponent2.default,
	  tabs: _tabsComponent2.default,
	  tab: _tabComponent2.default,
	  vForm: _vFormComponent2.default,
	  vInput: _vInputComponent2.default,
	  vSelect: _vSelectComponent2.default,
	  vCheckbox: _vCheckboxComponent2.default
	};

	var Forge = {
	  template: function template(component, _template) {
	    if (componentList.hasOwnProperty(component)) {
	      componentList[component].template = _template;
	    }
	  },
	  init: function init(component) {
	    if (componentList.hasOwnProperty(component)) {
	      Vue.component(component, componentList[component]);
	    }
	  },
	  initAll: function initAll() {
	    _.forEach(componentList, function (component, name) {
	      return Forge.init(name);
	    });
	  }
	};

	if (window) {
	  window.Forge = Forge;
	}

	exports.default = Forge;

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _alertTemplate = __webpack_require__(2);

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

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = "\n<div class=\"alert-box\" v-bind:class=\"{\n    callout: true,\n    primary: type === 'primary',\n    secondary: type === 'secondary',\n    success: type === 'success',\n    warning: type === 'warning',\n    alert: type === 'alert'\n  }\" transition=\"fade\" v-show=\"messages.length > 0\">\n  <ul>\n    <li v-for=\"message in messages\" track-by=\"$index\">{{ message }}</li>\n  </ul>\n  <button class=\"close-button\" aria-label=\"Dismiss alert\" type=\"button\" v-if=\"canClose\" v-on:click=\"close()\">\n    <span aria-hidden=\"true\">&times;</span>\n  </button>\n</div>\n";

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _iconTemplate = __webpack_require__(4);

	var _iconTemplate2 = _interopRequireDefault(_iconTemplate);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var component = {
	  template: _iconTemplate2.default,
	  props: ['name']
	};

	exports.default = component;

/***/ },
/* 4 */
/***/ function(module, exports) {

	module.exports = "\n<svg class=\"icon-image {{ name }}\">\n  <use xmlns:xlink=\"http://www.w3.org/1999/xlink\" xlink:href=\"#icon-{{ name }}\"></use>\n</svg>\n";

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _modalTemplate = __webpack_require__(6);

	var _modalTemplate2 = _interopRequireDefault(_modalTemplate);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var component = {
	  template: _modalTemplate2.default,
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

	exports.default = component;

/***/ },
/* 6 */
/***/ function(module, exports) {

	module.exports = "\n<div class=\"modal\" :transition=\"transition\" v-show=\"show\">\n  <div v-on:click.prevent :class=\"{ 'modal-content': true, 'small': modalSize === 'small', 'full': modalSize === 'full' }\">\n    <div class=\"modal-header\">\n      <slot name=\"header\"></slot>\n    </div>\n    <slot name=\"content\"></slot>\n    <span v-on:click=\"show = false\" aria-label=\"Close\">&#215;</span>\n  </div>\n</div>\n";

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _promptTemplate = __webpack_require__(8);

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
	    if (newVal && _.isFunction(options.yes)) {
	      options.yes(showInput ? vm.promptValue : null);
	    } else if (!newVal && _.isFunction(options.no)) {
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

	exports.default = component;

/***/ },
/* 8 */
/***/ function(module, exports) {

	module.exports = "\n\n<div class=\"prompt prompt-modal\" :transition=\"transition\" v-show=\"show\">\n  <div class=\"prompt-overlay\" v-on:click=\"no()\"></div>\n  <div class=\"prompt-content\">\n    <v-form v-if=\"showInput\" :submit-callback=\"yes\" :ajax=\"true\">\n      <p>{{ questionLabel }}</p>\n      <v-input type=\"text\" label=\"Response\" name=\"promptResponse\" :value.sync=\"promptValue\" :required=\"true\"></v-input>\n      <div class=\"controls\">\n        <button type=\"button\" class=\"button small\" v-on:click=\"no()\">{{ noLabel }}</button>\n        <button type=\"submit\" class=\"button small\">{{ yesLabel }}</button>\n      </div>\n    </v-form>\n    <div v-else>\n      <p>{{ questionLabel }}</p>\n      <div class=\"controls\">\n        <button type=\"button\" class=\"button small\" v-on:click=\"no()\">{{ noLabel }}</button>\n        <button type=\"submit\" class=\"button small\" v-on:click=\"yes()\">{{ yesLabel }}</button>\n      </div>\n    </div>\n  </div>\n</div>\n";

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _loaderTemplate = __webpack_require__(10);

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

/***/ },
/* 10 */
/***/ function(module, exports) {

	module.exports = "<div class=\"loader\">Loading...</div>\n";

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _tabsTemplate = __webpack_require__(12);

	var _tabsTemplate2 = _interopRequireDefault(_tabsTemplate);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var component = {
	  template: _tabsTemplate2.default,
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

	exports.default = component;

/***/ },
/* 12 */
/***/ function(module, exports) {

	module.exports = "\n<div class=\"tabs\">\n  <ul class=\"tab-nav\">\n    <li v-for=\"tab in tabs\" v-bind:class=\"{ 'active': (activeTab === tab.heading) }\" v-on:click.prevent=\"activate(tab.heading)\">\n      {{ tab.heading }}\n    </li>\n  </ul>\n\n  <div class=\"tab-content\">\n      <slot></slot>\n  </div>\n</div>\n";

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _tabTemplate = __webpack_require__(14);

	var _tabTemplate2 = _interopRequireDefault(_tabTemplate);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	module.exports = {
	  template: _tabTemplate2.default,
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

/***/ },
/* 14 */
/***/ function(module, exports) {

	module.exports = "\n<div class=\"tab\" v-show=\"active\">\n  <slot></slot>\n</div>\n";

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _vFormTemplate = __webpack_require__(16);

	var _vFormTemplate2 = _interopRequireDefault(_vFormTemplate);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var component = {
	  template: _vFormTemplate2.default,
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

	exports.default = component;

/***/ },
/* 16 */
/***/ function(module, exports) {

	module.exports = "\n<form v-if=\"async\" v-el:form v-on:submit.prevent=\"submitForm\" :method=\"method\" :action=\"action\" novalidate>\n  <slot></slot>\n</form>\n<form v-else v-el:form v-on:submit=\"submitForm\" :method=\"method\" :action=\"action\" novalidate>\n  <slot></slot>\n</form>\n";

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _vInputTemplate = __webpack_require__(18);

	var _vInputTemplate2 = _interopRequireDefault(_vInputTemplate);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var validationRules = __webpack_require__(19);

	var component = {
	  template: _vInputTemplate2.default,
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

	exports.default = component;

/***/ },
/* 18 */
/***/ function(module, exports) {

	module.exports = "\n<label class=\"v-input\">\n  {{ label }}\n  <div class=\"input-wrap\">\n    <i class=\"fa fa-{{ icon }}\" v-if=\"icon\"></i>\n    <textarea v-if=\"type === 'textarea'\"\n      v-el:input\n      :class=\"{ 'error': error.length > 0 }\"\n      name=\"{{ name }}\"\n      placeholder=\"{{ placeholder }}\"\n      v-model=\"value\"\n      v-on:blur=\"validate()\"></textarea>\n    <input v-else\n      v-el:input\n      :class=\"{ 'error': error.length > 0 }\"\n      name=\"{{ name }}\"\n      type=\"{{ type }}\"\n      placeholder=\"{{ placeholder }}\"\n      v-model=\"value\"\n      v-on:blur=\"validate()\" />\n    <small v-if=\"error.length > 0\" transition=\"slide-up-x-small\" class=\"error\">{{ error }}</small>\n  </div>\n</label>\n";

/***/ },
/* 19 */
/***/ function(module, exports) {

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
	  }
	};

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _vSelectTemplate = __webpack_require__(21);

	var _vSelectTemplate2 = _interopRequireDefault(_vSelectTemplate);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var component = {
	  template: _vSelectTemplate2.default,
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

	exports.default = component;

/***/ },
/* 21 */
/***/ function(module, exports) {

	module.exports = "\n<label class=\"v-select\">\n  {{ label }}\n  <select v-model=\"selected\" :class=\"{ 'error': isError }\">\n    <option v-if=\"!required\" value=\"\"></option>\n    <option v-for=\"option in options\" :value=\"option.value\">{{ option.label }}</option>\n  </select>\n</label>\n";

/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _vCheckboxTemplate = __webpack_require__(23);

	var _vCheckboxTemplate2 = _interopRequireDefault(_vCheckboxTemplate);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var component = {
	  template: _vCheckboxTemplate2.default,
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

	exports.default = component;

/***/ },
/* 23 */
/***/ function(module, exports) {

	module.exports = "\n<label><input type=\"checkbox\" v-model=\"checked\" /> {{ label }}</label>\n";

/***/ }
/******/ ]);