
module.exports = {
  template: require('./loaderTemplate.html'),
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
