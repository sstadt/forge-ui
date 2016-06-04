
Vue.config.debug = true;

new Vue({
  el: '#alert_demo',
  data: {
    alertMessage: ''
  },
  methods: {
    newMessage(type) {
      this.$refs.myAlert[type](this.alertMessage);
    }
  }
});

new Vue({
  el: '#modal_demo',
  data: {
    showModal: false
  }
});
