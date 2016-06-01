
module.exports = {
  template: require('./loaderTemplate.html'),
  data: function () {
    return {
      greeting: 'loader component',
    };
  },
  methods: {
    sayHi: function () {
      console.log('hi!');
    }
  }
};
