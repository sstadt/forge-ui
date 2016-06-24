
var modalComponent = require('./modalComponent.js');

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

  describe('props', function () {
    describe('show', function () {
      it('should be a boolean', function () {
        expect(component.props.show.type).toEqual(Boolean);
      });

      it('should be required', function () {
        expect(component.props.show.required).toEqual(true);
      });

      it('should be a two way binding', function () {
        expect(component.props.show.twoWay).toEqual(true);
      });
    });

    describe('modalSize', function () {
      it('should be a string', function () {
        expect(component.props.modalSize.type).toEqual(String);
      });

      it('should default to full', function () {
        expect(component.props.modalSize.default).toEqual('full');
      });
    });
  });

});
