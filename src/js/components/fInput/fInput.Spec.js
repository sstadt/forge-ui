
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
          componentInstance.value = '';
          expect(componentInstance.isValid()).toEqual(false);
        });

        it('should return true when populated', function () {
          componentInstance.value = 'foo';
          expect(componentInstance.isValid()).toEqual(true);
        });
      });

      describe('when type is email', function () {
        beforeEach(function () {
          componentInstance.type = 'email';
        });

        it('should return false with an invalid email', function () {
          componentInstance.value = 'foo';
          expect(componentInstance.isValid()).toEqual(false);
        });

        it('should return true with a valid email', function () {
          componentInstance.value = 'foo@bar.com';
          expect(componentInstance.isValid()).toEqual(true);
        });
      });

      describe('when type is url', function () {
        beforeEach(function () {
          componentInstance.type = 'url';
        });

        it('should return false with an invalid url', function () {
          componentInstance.value = 'foo';
          expect(componentInstance.isValid()).toEqual(false);
        });

        it('should return true with a valid url', function () {
          componentInstance.value = 'http://www.foo.com';
          expect(componentInstance.isValid()).toEqual(true);
        });
      });

      describe('when equalTo is provided a value', function () {
        beforeEach(function () {
          componentInstance.equalTo = { label: 'test', value: 'foo' };
        });

        it('should return false if the value does not match', function () {
          componentInstance.value = 'bar';
          expect(componentInstance.isValid()).toEqual(false);
        });

        it('should return true if the value matches', function () {
          componentInstance.value = 'foo';
          expect(componentInstance.isValid()).toEqual(true);
        });
      });
    });
  });

});
