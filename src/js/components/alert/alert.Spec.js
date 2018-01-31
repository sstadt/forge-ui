
import alertComponent from './alertComponent.js';
import forgeUtil from '../../forge-util.js';

Vue.config.silent = true;

describe('The alert component', function () {
  var component;

  beforeEach(function () {
    component = forgeUtil.clone(alertComponent);
  });

  it('to be an object', function () {
    expect(component).toEqual(jasmine.any(Object));
  });

  it('should have a template', function () {
    expect(component.template).toEqual(jasmine.any(String));
  });

  describe('props', function () {
    it('should be an object', function () {
      expect(component.props).toEqual(jasmine.any(Object));
    });

    describe('canClose', function () {
      it('should be a boolean', function () {
        expect(component.props.canClose.type).toEqual(Boolean);
      });

      it('should default to false', function () {
        expect(component.props.canClose.default).toEqual(false);
      });
    });
  });

  describe('data', function () {
    var data;

    beforeEach(function () {
      data = component.data();
    });

    it('should set messages to an empty array', function () {
      expect(data.messages).toEqual([]);
    });

    it('should set type to to an empty string', function () {
      expect(data.type).toEqual('');
    });
  });

  describe('methods', function () {
    var componentInstance;

    beforeEach(function () {
      componentInstance = new Vue(component);
      spyOn(componentInstance, 'addMessage').and.callThrough();
    });

    describe('#close', function () {
      beforeEach(function () {
        componentInstance.close();
      });

      it('should hide the alert', function () {
        expect(componentInstance.show).toEqual(false);
      });
    });

    describe('#reset', function () {
      beforeEach(function () {
        componentInstance.messages = ['test'];
        componentInstance.reset();
      });

      it('should clear the messages in the alert', function () {
        expect(componentInstance.messages).toEqual([]);
      });
    });

    describe('#addMessage', function () {
      beforeEach(function () {
        componentInstance.addMessage('foo', 'bar');
      });

      it('should show the alert', function () {
        expect(componentInstance.show).toEqual(true);
      });

      it('should set the message type', function () {
        expect(componentInstance.type).toEqual('foo');
      });

      it('should add an error message', function () {
        expect(componentInstance.messages).toEqual(['bar']);
      });
    });

    describe('#message', function () {
      it('should call the #addMessage method with no type', function () {
        componentInstance.message('bar');
        expect(componentInstance.addMessage).toHaveBeenCalledWith('', 'bar');
      });
    });

    describe('#primary', function () {
      it('should call the #addMessage method with no type', function () {
        componentInstance.primary('bar');
        expect(componentInstance.addMessage).toHaveBeenCalledWith('primary', 'bar');
      });
    });

    describe('#secondary', function () {
      it('should call the #addMessage method with no type', function () {
        componentInstance.secondary('bar');
        expect(componentInstance.addMessage).toHaveBeenCalledWith('secondary', 'bar');
      });
    });

    describe('#success', function () {
      it('should call the #addMessage method with no type', function () {
        componentInstance.success('bar');
        expect(componentInstance.addMessage).toHaveBeenCalledWith('success', 'bar');
      });
    });

    describe('#warning', function () {
      it('should call the #addMessage method with no type', function () {
        componentInstance.warning('bar');
        expect(componentInstance.addMessage).toHaveBeenCalledWith('warning', 'bar');
      });
    });

    describe('#alert', function () {
      it('should call the #addMessage method with no type', function () {
        componentInstance.alert('bar');
        expect(componentInstance.addMessage).toHaveBeenCalledWith('alert', 'bar');
      });
    });
  });

});
