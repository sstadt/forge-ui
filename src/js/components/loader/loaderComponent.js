
import template from './loaderTemplate.html';

var component = {
  template,
  data() {
    return {
      greeting: 'loader component',
    };
  },
  methods: {
    sayHi() {
      console.log('hi!');
    }
  }
};

export default component;
