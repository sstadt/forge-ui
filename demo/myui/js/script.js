
Vue.config.debug = true;

new Vue({
  el: '#alert_demo',
  data: {
    alertMessage: '',
    selectedMessageType: 'message',
    messageTypes: [
      { value: 'message', label: 'vm.$refs.myAlert.message()' },
      { value: 'primary', label: 'vm.$refs.myAlert.primary()' },
      { value: 'secondary', label: 'vm.$refs.myAlert.secondary()' },
      { value: 'success', label: 'vm.$refs.myAlert.success()' },
      { value: 'warning', label: 'vm.$refs.myAlert.warning()' },
      { value: 'alert', label: 'vm.$refs.myAlert.alert()' },
    ]
  },
  methods: {
    newMessage(type) {
      this.$refs.myAlert[this.selectedMessageType](this.alertMessage);
    }
  }
});

new Vue({
  el: '#modal_demo',
  data: {
    showModal: false
  }
});
