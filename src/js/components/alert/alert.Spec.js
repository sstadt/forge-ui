
var alertComponent = require('./alertComponent.js');

Vue.config.silent = true;

describe('The alert component', function () {
  var component;

  beforeEach(function () {
    component = _.clone(alertComponent);
  });

  it('to be an object', function () {
    expect(component).toEqual(jasmine.any(Object));
  });

  it('should have a template', function () {
    expect(component.template).toEqual(jasmine.any(String));
  });

  describe('props', function () {
    describe('canClose', function () {
      it('should be a boolean', function () {
        expect(component.props.canClose.type).toEqual(Boolean);
      });

      it('should default to false', function () {
        expect(component.props.canClose.default).toEqual(false);
      });
    });
  });

  describe('methods', function () {
    var componentInstance;

    beforeEach(function () {
      componentInstance = new Vue(component);
    });

    describe('#close', function () {
      it('should clear the messages in the alert', function () {
        componentInstance.messages = ['test'];
        componentInstance.close();

        expect(componentInstance.messages).toEqual([]);
      });
    });

    describe('#addMessage', function () {
      beforeEach(function () {
        componentInstance.addMessage('foo', 'bar');
      });

      it('should set the message type', function () {
        expect(componentInstance.type).toEqual('foo');
      });

      it('should add an error message', function () {
        expect(componentInstance.messages).toEqual(['bar']);
      });
    });

    describe('shortcut methods', function () {
      beforeEach(function () {
        spyOn(componentInstance, 'addMessage');
      });

      describe('#message', function () {
        // it('should call the #addMessage method with no type', function () {
        //   componentInstance.message('bar');
        //   expect(componentInstance.addMessage).toHaveBeenCalledWith('', 'bar');
        // });
      });
    });


    // addMessage(type, message)
    // message(message)
    // primary(message)
    // secondary(message)
    // success(message)
    // warning(message)
    // alert(message)
  });

});
