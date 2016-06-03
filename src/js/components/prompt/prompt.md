
# Prompt Component

The prompt component initializes itself with functions that are handy to access if you need to get simple data from a user. To access these methods, assign a ref to the prompt:

```html
<prompt v-ref:my-prompt></prompt>
```

### $prompt.ask

Use ask when you need to get a textual answer from the user.

```javascript
vm.$refs.myPrompt.ask({
  question: 'Judge me by my size, do you?',
  yes: function (answer) {
    // ...
  }
});
```

### $prompt.confirm

Use Confirm when you want to get a binary answer from the user

```javascript
vm.$refs.myPrompt.confirm({
  question: 'Join me, and together we can rule the galaxy!',
  yes: function () {
    // ...
  }
});
```

### Options

#### question

String; The prompt label

#### yesLabel

String; The yes button label

#### noLabel

String; The no button label

#### yes

Function; Runs when the user clicks the yes button, closes the prompt

#### no

Function; Runs when the user clicks the no button, closes the prompt
