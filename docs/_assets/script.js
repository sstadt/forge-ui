
Vue.use(Forge);

Vue.config.debug = true;

new Vue({
  el: '#icon_demo'
});

new Vue({
  el: '#icon_list'
});

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
    newMessage() {
      this.$refs.myAlert[this.selectedMessageType](this.alertMessage);
    }
  }
});

new Vue({
  el: '#modal_demo',
  methods: {
    openModal() {
      this.$refs.myModal.open();
    },
    closeModal() {
      this.$refs.myModal.close();
    }
  }
});

new Vue({
  el: '#prompt_demo',
  methods: {
    prompt(method) {
      this.$refs.myPrompt[method]({
        question: 'Judge me by my size, do you?',
        yes(answer) {
          // if method is 'ask',
          // the dialog input value will be passed as the first argument
        },
        no() {
          // the prompt will close itself,
          // but you can use this option to trigger side effects
        }
      });
    }
  }
});

new Vue({
  el: '#tabs_demo'
});

new Vue({
  el: '#form_demo',
  data: {
    message: ''
  },
  methods: {
    showMessage() {
      this.$refs.myAlert.success(this.message);
    }
  }
});

new Vue({
  el: '#snackbar_demo',
  data: {
    toast: '',
    currentPosition: 'bottom left',
    options: [
      { name: 'topOption', label: 'top', value: 'top' },
      { name: 'bottomOption', label: 'bottom', value: 'bottom' },
      { name: 'leftOption', label: 'left', value: 'left' },
      { name: 'rightOption', label: 'right', value: 'right' },
      { name: 'topLeftOption', label: 'top left', value: 'top left' },
      { name: 'topRightOption', label: 'top right', value: 'top right' },
      { name: 'bottomLeftOption', label: 'bottom left', value: 'bottom left' },
      { name: 'bottomRightOption', label: 'bottom right', value: 'bottom right' }
    ]
  },
  methods: {
    newToast() {
      if (this.toast !== '') {
        this.$refs.mySnackbar.toast(this.toast, () => alert('bar'));
      }
    }
  }
});

new Vue({
  el: '#input_demo',
  data: {
    email: ''
  }
});

new Vue({
  el: '#select_demo',
  data: {
    selectedOption: '',
    selectOptions: [
      { label: 'One Option', value: '1' },
      { label: 'Two Option', value: '2' },
      { label: 'Red Option', value: 'Red' },
      { label: 'Blue Option', value: 'Blue' }
    ]
  }
});

new Vue({
  el: '#checkbox_demo',
  data: {
    checked: false
  }
});

new Vue({
  el: '#radio_demo',
  data: {
    selectedOption: '',
    radioOptions: [
      { name: 'radioOptionOne', label: 'One Option', value: '1' },
      { name: 'radioOptionTwo', label: 'Two Option', value: '2' }
    ]
  }
});

new Vue({
  el: '#required-validation',
  data: {
    input: '',
    selectedOption: '',
    selectOptions: [
      { label: 'One Option', value: '1' },
      { label: 'Two Option', value: '2' },
      { label: 'Red Option', value: 'Red' },
      { label: 'Blue Option', value: 'Blue' }
    ],
    checked: false,
    selectedOption: '',
    radioOptions: [
      { name: 'radioOptionOne', label: 'One Option', value: '1' },
      { name: 'radioOptionTwo', label: 'Two Option', value: '2' },
    ]
  },
  methods: {
    submit() {
      alert('Form is valid!');
    }
  }
});

new Vue({
  el: '#type-validation',
  data: {
    emailInput: '',
    urlInput: '',
    numberInput: '',
    telInput: ''
  },
  methods: {
    submit() {
      alert('Form is valid!');
    }
  }
});

new Vue({
  el: '#match-validation',
  data: {
    passwordInput: '',
    confirmInput: ''
  },
  methods: {
    submit() {
      alert('Form is valid!');
    }
  }
});
