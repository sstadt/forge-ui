
function Alert() {
  this.messages = [];
  this.type = '';
}

Alert.prototype.close = function () {
  this.messages = [];
};

Alert.prototype.setType = function (type) {
  if (this.type !== type) {
    this.messages = [];
  }
  this.type = type;
};

Alert.prototype.addMessage = function (message, fade, fadeDuration, onFade) {
  var self = this;

  fadeDuration = fadeDuration || 10000;

  self.messages.push(message);

  if (fade) {
    setTimeout(function () {
      self.messages.splice(_.findIndex(this.messages, function (existingMessage) {
        return existingMessage === message;
      }), 1);
      if (typeof onFade === 'function') {
        onFade();
      }
    }, fadeDuration);
  }
};

Alert.prototype.message = function (message, fade, duration, onFade) {
  this.setType('');
  this.addMessage(message, fade, duration, onFade);
};

Alert.prototype.info = function (message, fade, duration, onFade) {
  this.setType('info');
  this.addMessage(message, fade, duration, onFade);
};

Alert.prototype.success = function (message, fade, duration, onFade) {
  this.setType('success');
  this.addMessage(message, fade, duration, onFade);
};

Alert.prototype.warning = function (message, fade, duration, onFade) {
  this.setType('warning');
  this.addMessage(message, fade, duration, onFade);
};

Alert.prototype.error = function (message, fade, duration, onFade) {
  this.setType('alert');
  this.addMessage(message, fade, duration, onFade);
};

module.exports = Alert;
