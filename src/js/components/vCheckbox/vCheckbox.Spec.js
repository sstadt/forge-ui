
var vCheckboxComponent = require('./vCheckboxComponent.js');

Vue.config.silent = true;

describe('The vCheckbox component', function () {
  var component;

  beforeEach(function () {
    component = _.clone(vCheckboxComponent);
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

    describe('checked', function () {
      it('should be a boolean', function () {
        expect(component.props.checked.type).toEqual(Boolean);
      });

      it('should be required', function () {
        expect(component.props.checked.required).toEqual(true);
      });

      it('should be a two way binding', function () {
        expect(component.props.checked.twoWay).toEqual(true);
      });
    });

    describe('label', function () {
      it('should be a string', function () {
        expect(component.props.label.type).toEqual(String);
      });

      it('should be required', function () {
        expect(component.props.label.required).toEqual(true);
      });
    });

    describe('required', function () {
      it('should be a boolean', function () {
        expect(component.props.required.type).toEqual(Boolean);
      });

      it('should default to false', function () {
        expect(component.props.required.default).toEqual(false);
      });
    });
  });

  describe('methods', function () {
    var componentInstance;

    beforeEach(function () {
      componentInstance = new Vue(component);
    });

    describe('#isValid', function () {
      it('should return true and set isError to false if required is false and checked is false', function () {
        componentInstance.required = false;
        componentInstance.checked = false;
        expect(componentInstance.isValid()).toEqual(true);
        expect(componentInstance.isError).toEqual(false);
      });

      it('should return true and set isError to false if required is false and checked is true', function () {
        componentInstance.required = false;
        componentInstance.checked = true;
        expect(componentInstance.isValid()).toEqual(true);
        expect(componentInstance.isError).toEqual(false);
      });

      it('should return true and set isError to false if required is true and checked is true', function () {
        componentInstance.required = true;
        componentInstance.checked = true;
        expect(componentInstance.isValid()).toEqual(true);
        expect(componentInstance.isError).toEqual(false);
      });

      it('should return false and set isError to true if required is true and checked is false', function () {
        componentInstance.required = true;
        componentInstance.checked = false;
        expect(componentInstance.isValid()).toEqual(false);
        expect(componentInstance.isError).toEqual(true);
      });
    });
  });

});
