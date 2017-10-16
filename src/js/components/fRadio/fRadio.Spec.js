
import fCheckboxComponent from './fRadioComponent.js';
import forgeUtil from '../../forge-util.js';

Vue.config.silent = true;

describe('The fRadio component', function () {
  var component;

  beforeEach(function () {
    component = forgeUtil.clone(fCheckboxComponent);
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
      it('should return true and set isError to false if required is false and there is no selected value', function () {
        componentInstance.required = false;
        componentInstance.selectedOption = '';
        expect(componentInstance.isValid()).toEqual(true);
        expect(componentInstance.isError).toEqual(false);
      });

      it('should return true and set isError to false if required is false and there is a selected value', function () {
        componentInstance.required = false;
        componentInstance.selectedOption = 'foo';
        expect(componentInstance.isValid()).toEqual(true);
        expect(componentInstance.isError).toEqual(false);
      });

      it('should return true and set isError to false if required is true and there is a selected value', function () {
        componentInstance.required = true;
        componentInstance.selectedOption = 'foo';
        expect(componentInstance.isValid()).toEqual(true);
        expect(componentInstance.isError).toEqual(false);
      });

      it('should return false and set isError to true if required is true and there is no selected value', function () {
        componentInstance.required = true;
        componentInstance.selectedOption = '';
        expect(componentInstance.isValid()).toEqual(false);
        expect(componentInstance.isError).toEqual(true);
      });
    });
  });

});
