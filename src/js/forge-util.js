
export default {

  clone(obj) {
    let copy = obj.constructor();

    for (let attr in obj) {
        if (obj.hasOwnProperty(attr)) copy[attr] = obj[attr];
    }

    return copy;
  },

  isFunction(func) {
    return func && {}.toString.call(func) === '[object Function]';
  },

  isString(str) {
    return typeof str === 'string';
  },

  debounce(func) {
    var timeout;

  	return function() {
  		var context = this,
        args = arguments,
        callNow = immediate && !timeout,
    		later = function() {
    			timeout = null;
    			if (!immediate) func.apply(context, args);
    		};

  		clearTimeout(timeout);

  		timeout = setTimeout(later, wait);
  		if (callNow) func.apply(context, args);
  	};
  }

}
