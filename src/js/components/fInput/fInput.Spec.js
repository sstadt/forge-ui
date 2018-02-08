
import fInputComponent from './fInputComponent.js';
import forgeUtil from '../../forge-util.js';

Vue.config.silent = true;

describe('The fInput component', function () {
  var component;

  beforeEach(function () {
    component = forgeUtil.clone(fInputComponent);
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
      beforeEach(function () {
        spyOn(componentInstance, 'validate').and.callThrough();
      });

      describe('when required', function () {
        beforeEach(function () {
          componentInstance.required = true;
          componentInstance.type = 'text';
        });

        it('should return false when not populated', function () {
          componentInstance.inputValue = '';
          expect(componentInstance.isValid()).toEqual(false);
        });

        it('should return true when populated', function () {
          componentInstance.inputValue = 'foo';
          expect(componentInstance.isValid()).toEqual(true);
        });
      });

      describe('when type is email', function () {
        beforeEach(function () {
          componentInstance.type = 'email';
        });

        it('should return false with an invalid email', function () {
          componentInstance.inputValue = 'foo';
          expect(componentInstance.isValid()).toEqual(false);
        });

        it('should return true with a valid email', function () {
          componentInstance.inputValue = 'foo@bar.com';
          expect(componentInstance.isValid()).toEqual(true);
        });
      });

      describe('when type is url', function () {
        beforeEach(function () {
          componentInstance.type = 'url';
        });

        it('should return false with an invalid url', function () {
          componentInstance.inputValue = 'foo';
          expect(componentInstance.isValid()).toEqual(false);
        });

        it('should return true with a valid url', function () {
          componentInstance.inputValue = 'http://www.foo.com';
          expect(componentInstance.isValid()).toEqual(true);
        });
      });

      describe('when a custom validation pattern is provided', function () {
        beforeEach(function () {
          componentInstance.pattern = '[0-9]{3}-[0-9]{3}-[0-9]{4}';
        });

        it('should return false with an invalid value', function () {
          componentInstance.inputValue = '1234';
          expect(componentInstance.isValid()).toEqual(false);
        });

        it('should return true with a valid value', function () {
          componentInstance.inputValue = '555-555-5555';
          expect(componentInstance.isValid()).toEqual(true);
        });
      });

      describe('when equalTo is provided a value', function () {
        beforeEach(function () {
          componentInstance.equalTo = { label: 'Foo', value: 'foo' };
        });

        it('should return false if the value does not match', function () {
          componentInstance.inputValue = 'bar';
          expect(componentInstance.isValid()).toEqual(false);
        });

        it('should return true if the value matches', function () {
          componentInstance.inputValue = 'foo';
          expect(componentInstance.isValid()).toEqual(true);
        });
      });
    });
  });

});
