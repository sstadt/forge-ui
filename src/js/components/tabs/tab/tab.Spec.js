
import tabComponent from './tabComponent.js';
import forgeUtil from '../../../forge-util.js';

Vue.config.silent = true;

describe('The tab component', function () {
  var component;

  beforeEach(function () {
    component = forgeUtil.clone(tabComponent);
  });

  it('to be an object', function () {
    expect(component).toEqual(jasmine.any(Object));
  });

  it('should have a template', function () {
    expect(component.template).toEqual(jasmine.any(String));
  });

  describe('data', function () {
    var data;

    beforeEach(function () {
      data = component.data();
    });

    it('should have an initial active value of false', function () {
      expect(data.active).toEqual(false);
    });
  });

  describe('props', function () {
    it('should be an object', function () {
      expect(component.props).toEqual(jasmine.any(Object));
    });

    describe('heading', function () {
      it('should be a string', function () {
        expect(component.props.heading.type).toEqual(String);
      });

      it('should be required', function () {
        expect(component.props.heading.required).toEqual(true);
      });
    });
  });

});
