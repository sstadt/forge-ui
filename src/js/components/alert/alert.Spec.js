
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
  });

});
