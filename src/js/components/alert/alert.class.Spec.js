
var Alert = require('./alert.class.js');

describe('The Alert class', function () {
  var alert;

  beforeEach(function () {
    alert = new Alert();
  });

  describe('constructor', function () {
    it('should set messages to an empty array', function () {
      expect(alert.messages).toEqual([]);
    });

    it('should set the type to an empty string', function () {
      expect(alert.type).toEqual('');
    });
  });

  describe('prototype function', function () {
    var mockMessages;

    beforeEach(function () {
      mockMessages = ['foo','bar'];
    });

    describe('#close', function () {
      it('should reset the alert messages', function () {
        alert.messages = _.clone(mockMessages);
        alert.close();
        expect(alert.messages).toEqual([]);
      });
    });

    describe('#setType', function () {
      beforeEach(function () {
        alert.messages = _.clone(mockMessages);
        alert.type = 'error';
      });

      it('should set the current type', function () {
        alert.setType('success');
        expect(alert.type).toEqual('success');
      });

      it('should clear the messages if the type is changing', function () {
        alert.setType('success');
        expect(alert.messages).toEqual([]);
      });

      it('should not clear the messages if the type is not changing', function () {
        alert.setType('error');
        expect(alert.messages).toEqual(mockMessages);
      });
    });

    describe('#addMessage', function () {
      it('should add the provided message to messages', function () {
        alert.addMessage('baz');
        expect(alert.messages).toEqual(['baz']);
      });

      it('should remove the message after a delay if fade is provided', function () {
        alert.addMessage('baz', true, 0, function () {
          expect(alert.messages).toEqual([]);
        });
      });
    });

    describe('shortcuts', function () {
      beforeEach(function () {
        spyOn(alert, 'setType').and.callThrough();
        spyOn(alert, 'addMessage').and.callThrough();
      });

      describe('#message', function () {
        beforeEach(function () {
          alert.message('foo');
        });

        it('should set alert type to an empty string', function () {
          expect(alert.setType).toHaveBeenCalledWith('');
        });

        it('should add the message to messages', function () {
          expect(alert.addMessage).toHaveBeenCalledWith('foo', undefined, undefined, undefined);
        });
      });

      describe('#error', function () {
        beforeEach(function () {
          alert.error('foo');
        });

        it('should set alert type to a alert', function () {
          expect(alert.setType).toHaveBeenCalledWith('alert');
        });

        it('should add the message to messages', function () {
          expect(alert.addMessage).toHaveBeenCalledWith('foo', undefined, undefined, undefined);
        });
      });

      describe('#info', function () {
        beforeEach(function () {
          alert.info('foo');
        });

        it('should set alert type to a alert', function () {
          expect(alert.setType).toHaveBeenCalledWith('info');
        });

        it('should add the message to messages', function () {
          expect(alert.addMessage).toHaveBeenCalledWith('foo', undefined, undefined, undefined);
        });
      });

      describe('#success', function () {
        beforeEach(function () {
          alert.success('foo');
        });

        it('should set alert type to a alert', function () {
          expect(alert.setType).toHaveBeenCalledWith('success');
        });

        it('should add the message to messages', function () {
          expect(alert.addMessage).toHaveBeenCalledWith('foo', undefined, undefined, undefined);
        });
      });

      describe('#warning', function () {
        beforeEach(function () {
          alert.warning('foo');
        });

        it('should set alert type to a alert', function () {
          expect(alert.setType).toHaveBeenCalledWith('warning');
        });

        it('should add the message to messages', function () {
          expect(alert.addMessage).toHaveBeenCalledWith('foo', undefined, undefined, undefined);
        });
      });
    });
  });
});
