
var vInputComponent = require('./vInputComponent.js');

Vue.config.silent = true;

describe('The vInput component', function () {
  var component;

  beforeEach(function () {
    component = _.clone(vInputComponent);
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
    });

    describe('name', function () {
      it('should be a string', function () {
        expect(component.props.name.type).toEqual(String);
      });
    });

    describe('type', function () {
      it('should be a string', function () {
        expect(component.props.type.type).toEqual(String);
      });

      it('should be required', function () {
        expect(component.props.type.required).toEqual(true);
      });
    });

    describe('placeholder', function () {
      it('should be a string', function () {
        expect(component.props.placeholder.type).toEqual(String);
      });
    });

    describe('icon', function () {
      it('should be a string', function () {
        expect(component.props.icon.type).toEqual(String);
      });
    });

    describe('value', function () {
      it('should be a string', function () {
        expect(component.props.value.type).toEqual(String);
      });

      it('should be required', function () {
        expect(component.props.value.required).toEqual(true);
      });

      it('should be a two way binding', function () {
        expect(component.props.value.twoWay).toEqual(true);
      });
    });

    describe('required', function () {
      it('should be a string', function () {
        expect(component.props.required.type).toEqual(Boolean);
      });

      it('should default to false', function () {
        expect(component.props.required.default).toEqual(false);
      });
    });

    describe('equalTo', function () {
      it('should be an object', function () {
        expect(component.props.equalTo.type).toEqual(Object);
      });

      it('should default to null', function () {
        expect(component.props.equalTo.default).toEqual(null);
      });
    });
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
