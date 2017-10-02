
import modalComponent from './modalComponent.js';

describe('The modal component', function () {
  var component;

  beforeEach(function () {
    component = _.clone(modalComponent);
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

    describe('#open', function () {
      beforeEach(function () {
        componentInstance.open();
      });

      it('should open the modal', function () {
        expect(componentInstance.show).toEqual(true);
      });
    });

    describe('#close', function () {
      beforeEach(function () {
        componentInstance.show = true;
        componentInstance.close();
      });

      it('should close the modal', function () {
        expect(componentInstance.show).toEqual(false);
      });
    });
  });

});
