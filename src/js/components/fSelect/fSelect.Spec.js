
import fSelectComponent from './fSelectComponent.js';
import forgeUtil from '../../forge-util.js';

Vue.config.silent = true;

describe('The fSelect component', function () {
  var component;

  beforeEach(function () {
    component = forgeUtil.clone(fSelectComponent);
  });

  it('to be an object', function () {
    expect(component).toEqual(jasmine.any(Object));
  });

  it('should have a template', function () {
    expect(component.template).toEqual(jasmine.any(String));
  });

  describe('methods', function () {
    var componentInstance;

    beforeEach(function () {
      componentInstance = new Vue(component);
    });

    describe('#isValid', function () {
      it('should return true if required is false and selectedValue is empty', function () {
        componentInstance.required = false;
        componentInstance.selectedValue = '';
        expect(componentInstance.isValid()).toEqual(true);
        expect(componentInstance.isError).toEqual(true);
      });

      it('should return true if required is false and selectedValue is not empty', function () {
        componentInstance.required = false;
        componentInstance.selectedValue = 'foo';
        expect(componentInstance.isValid()).toEqual(true);
        expect(componentInstance.isError).toEqual(true);
      });

      it('should return false if required is true and selectedValue is empty', function () {
        componentInstance.required = true;
        componentInstance.selectedValue = '';
        expect(componentInstance.isValid()).toEqual(false);
        expect(componentInstance.isError).toEqual(false);
      });

      it('should return true if required is true and selectedValue is not empty', function () {
        componentInstance.required = true;
        componentInstance.selectedValue = 'foo';
        expect(componentInstance.isValid()).toEqual(true);
        expect(componentInstance.isError).toEqual(true);
      });
    });
  });

});
