
var tabComponent = require('./tabComponent.js');

Vue.config.silent = true;

describe('The tab component', function () {
  var component;

  beforeEach(function () {
    component = _.clone(tabComponent);
  });

  it('to be an object', function () {
    expect(component).toEqual(jasmine.any(Object));
  });

  it('should have a template', function () {
    expect(component.template).toEqual(jasmine.any(String));
  });

  describe('props', function () {
    describe('heading', function () {
      it('should exist', function () {
          expect(component.props.heading).toEqual(jasmine.any(Object));
      });

      it('should be a string', function () {
        expect(component.props.heading.type).toEqual(String);
      });
    });

    describe('disabled', function () {
      it('should exist', function () {
          expect(component.props.disabled).toEqual(jasmine.any(Object));
      });

      it('should be a boolean', function () {
        expect(component.props.disabled.type).toEqual(Boolean);
      });

      it('should default to false', function () {
        expect(component.props.disabled.default).toEqual(false);
      });
    });
  });

  describe('methods', function () {
    var componentInstance;

    beforeEach(function () {
      componentInstance = new Vue(component);
    });

    // need to find a way to compile this to test references to parent
  });

});
