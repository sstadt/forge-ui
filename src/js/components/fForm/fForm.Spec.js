
import fFormComponent from './fFormComponent.js';

Vue.config.silent = true;

describe('The fForm component', function () {
  var component;

  beforeEach(function () {
    component = _.clone(fFormComponent);
  });

  it('to be an object', function () {
    expect(component).toEqual(jasmine.any(Object));
  });

  it('should have a template', function () {
    expect(component.template).toEqual(jasmine.any(String));
  });

  describe('methods', function () {
    var componentInstance, mockEvent;

    beforeEach(function () {
      componentInstance = new Vue(component);
    });

    describe('#submitForm', function () {
      beforeEach(function () {
        mockEvent = {
          preventDefault: jasmine.createSpy()
        };
      });

      it('should prevent default if this is an ajax form', function () {
        componentInstance.ajax = true;
        componentInstance.submitForm(mockEvent);
        expect(mockEvent.preventDefault).toHaveBeenCalled();
      });

      it('should prevent default if the form is not valid', function () {
        spyOn(componentInstance, 'isValid').and.returnValue(false);
        componentInstance.ajax = false;
        componentInstance.submitForm(mockEvent);
        expect(mockEvent.preventDefault).toHaveBeenCalled();
      });

      it('should not prevent default if the form is not valid and this is not an ajax form', function () {
        spyOn(componentInstance, 'isValid').and.returnValue(true);
        componentInstance.ajax = false;
        componentInstance.submitForm(mockEvent);
        expect(mockEvent.preventDefault).not.toHaveBeenCalled();
      });

      it('should call the submitCallback if this is an ajax form, the form is valid, and the callback is a function', function () {
        spyOn(componentInstance, 'isValid').and.returnValue(true);
        componentInstance.submitCallback = jasmine.createSpy();
        componentInstance.ajax = true;
        componentInstance.submitForm(mockEvent);
        expect(componentInstance.submitCallback).toHaveBeenCalled();
      });
    });

    describe('#isValid', function () {
      beforeEach(function () {
        componentInstance.$children = [{ isValid: function () {} }];
      });

      it('should return false if a child has an isValid method that returns false', function () {
        spyOn(componentInstance.$children[0], 'isValid').and.returnValue(false);
        expect(componentInstance.isValid()).toEqual(false);
      });

      it('should return true if a child has an isValid method that returns true', function () {
        spyOn(componentInstance.$children[0], 'isValid').and.returnValue(true);
        expect(componentInstance.isValid()).toEqual(true);
      });
    });
  });

});
