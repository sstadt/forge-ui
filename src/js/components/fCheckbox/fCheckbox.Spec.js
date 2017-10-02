
import fCheckboxComponent from './fCheckboxComponent.js';

Vue.config.silent = true;

describe('The fCheckbox component', function () {
  var component;

  beforeEach(function () {
    component = _.clone(fCheckboxComponent);
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
      it('should return true and set isError to false if required is false and isChecked is false', function () {
        componentInstance.required = false;
        componentInstance.isChecked = false;
        expect(componentInstance.isValid()).toEqual(true);
        expect(componentInstance.isError).toEqual(false);
      });

      it('should return true and set isError to false if required is false and isChecked is true', function () {
        componentInstance.required = false;
        componentInstance.isChecked = true;
        expect(componentInstance.isValid()).toEqual(true);
        expect(componentInstance.isError).toEqual(false);
      });

      it('should return true and set isError to false if required is true and isChecked is true', function () {
        componentInstance.required = true;
        componentInstance.isChecked = true;
        expect(componentInstance.isValid()).toEqual(true);
        expect(componentInstance.isError).toEqual(false);
      });

      it('should return false and set isError to true if required is true and isChecked is false', function () {
        componentInstance.required = true;
        componentInstance.isChecked = false;
        expect(componentInstance.isValid()).toEqual(false);
        expect(componentInstance.isError).toEqual(true);
      });
    });
  });

});
