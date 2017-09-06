
import fSelectComponent from './fSelectComponent.js';

Vue.config.silent = true;

describe('The fSelect component', function () {
  var component;

  beforeEach(function () {
    component = _.clone(fSelectComponent);
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

    describe('label', function () {
      it('should be a string', function () {
        expect(component.props.label.type).toEqual(String);
      });

      it('should default to an empty string', function () {
        expect(component.props.label.default).toEqual('');
      });
    });

    describe('selected', function () {
      it('should be a string', function () {
        expect(component.props.selected.type).toEqual(String);
      });

      it('should be required', function () {
        expect(component.props.selected.required).toEqual(true);
      });

      it('should be a twoWay binding', function () {
        expect(component.props.selected.twoWay).toEqual(true);
      });
    });

    describe('options', function () {
      it('should be an array', function () {
        expect(component.props.options.type).toEqual(Array);
      });

      it('should be required', function () {
        expect(component.props.options.required).toEqual(true);
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
      it('should return true if required is false and selected is empty', function () {
        componentInstance.required = false;
        componentInstance.selected = '';
        expect(componentInstance.isValid()).toEqual(true);
        expect(componentInstance.isError).toEqual(true);
      });

      it('should return true if required is false and selected is not empty', function () {
        componentInstance.required = false;
        componentInstance.selected = 'foo';
        expect(componentInstance.isValid()).toEqual(true);
        expect(componentInstance.isError).toEqual(true);
      });

      it('should return false if required is true and selected is empty', function () {
        componentInstance.required = true;
        componentInstance.selected = '';
        expect(componentInstance.isValid()).toEqual(false);
        expect(componentInstance.isError).toEqual(false);
      });

      it('should return true if required is true and selected is not empty', function () {
        componentInstance.required = true;
        componentInstance.selected = 'foo';
        expect(componentInstance.isValid()).toEqual(true);
        expect(componentInstance.isError).toEqual(true);
      });
    });
  });

});
