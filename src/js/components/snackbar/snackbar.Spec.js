
import snackbarComponent from './snackbarComponent.js';
import forgeUtil from '../../forge-util.js';

Vue.config.silent = true;

describe('The snackbar component', function () {
  var component;

  beforeEach(function () {
    component = forgeUtil.clone(snackbarComponent);
  });

  it('to be an object', function () {
    expect(component).toEqual(jasmine.any(Object));
  });

  it('should have a template', function () {
    expect(component.template).toEqual(jasmine.any(String));
  });

  describe('data', function () {
    var data;

    beforeEach(function () {
      data = component.data();
    });

    it('should have an initial show value of false', function () {
      expect(data.show).toEqual(false);
    });

    it('should have an initial action value of an null', function () {
      expect(data.action).toEqual(null);
    });

    it('should have an initial message value of an empty string', function () {
      expect(data.message).toEqual('');
    });
  });

  describe('props', function () {
    it('should be an object', function () {
      expect(component.props).toEqual(jasmine.any(Object));
    });

    describe('timeout', function () {
      it('should be a number', function () {
        expect(component.props.timeout.type).toEqual(Number);
      });

      it('should default to 4000', function () {
        expect(component.props.timeout.default).toEqual(4000);
      });
    });

    describe('actionLabel', function () {
      it('should be a string', function () {
        expect(component.props.actionLabel.type).toEqual(String);
      });

      it('should default to Go', function () {
        expect(component.props.actionLabel.default).toEqual('Go');
      });
    });

    describe('transition', function () {
      it('should be a string', function () {
        expect(component.props.transition.type).toEqual(String);
      });

      it('should default to fade', function () {
        expect(component.props.transition.default).toEqual('fade');
      });
    });

    describe('position', function () {
      it('should be a string', function () {
        expect(component.props.position.type).toEqual(String);
      });

      it('should default to bottom left', function () {
        expect(component.props.position.default).toEqual('bottom left');
      });
    });
  });

  describe('computed', function () {
    var componentInstance;

    beforeEach(function () {
      componentInstance = new Vue(component);
    });

    describe('actionIsLink', function () {
      it('should default to false', function () {
        expect(componentInstance.actionIsLink).toEqual(false);
      });

      it('should be true if the action is a string', function () {
        componentInstance.action = 'www.google.com';
        expect(componentInstance.actionIsLink).toEqual(true);
      });
    });
  });

  describe('methods', function () {
    var componentInstance;

    beforeEach(function () {
      componentInstance = new Vue(component);
    });

    describe('#toast', function () {
      beforeEach(function () {
        componentInstance.toast('foo', () => 'bar');
      });

      it('should set the current action to the provided function', function () {
        expect(componentInstance.action()).toEqual('bar');
      });

      it('should set the current message', function () {
        expect(componentInstance.message).toEqual('foo');
      });

      it('should show the snackbar', function () {
        expect(componentInstance.show).toEqual(true);
      });
    });

    describe('#executeAction', function () {
      beforeEach(function () {
        spyOn(componentInstance, 'close');
        componentInstance.action = jasmine.createSpy('action');
        componentInstance.executeAction();
      });

      it('should call the provided action', function () {
        expect(componentInstance.action).toHaveBeenCalled();
      });

      it('should close the snackbar', function () {
        expect(componentInstance.close).toHaveBeenCalled();
      });
    });

    describe('#close', function () {
      beforeEach(function () {
        componentInstance.show = true;
        componentInstance.close();
      });

      it('should set show to false', function () {
        expect(componentInstance.show).toEqual(false);
      });
    });

    describe('#reset', function () {
      beforeEach(function () {
        this.action = 'foo';
        this.message = 'bar';
        componentInstance.reset();
      });

      it('should reset the action', function () {
        expect(componentInstance.action).toEqual(null);
      });

      it('should reset the message', function () {
        expect(componentInstance.message).toEqual('');
      });
    });
  });

});
