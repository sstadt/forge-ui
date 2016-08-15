
import tabComponent from './tabComponent.js';

Vue.config.silent = true;

describe('The tab component', function () {
  var component;

  beforeEach(function () {
    component = _.clone(tabComponent);
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

  describe('ready lifecycle method', function () {
    var componentInstance;

    beforeEach(function () {
      componentInstance = new Vue(component);
      componentInstance.heading = 'foo';
      spyOn(componentInstance, '$dispatch');
      componentInstance.$mount('body');
    });

    it('should dispatch a TAB_COMPONENT_TAB_CREATED with the tab heading', function () {
      expect(componentInstance.$dispatch).toHaveBeenCalledWith('TAB_COMPONENT_TAB_CREATED', 'foo');
    });
  });

  describe('events', function () {
    var componentInstance;

    beforeEach(function () {
      componentInstance = new Vue(component);
      componentInstance.heading = 'foo';
    });

    it('should be an object', function () {
      expect(component.events).toEqual(jasmine.any(Object));
    });

    describe('TAB_COMPONENT_TAB_CLICKED', function () {
      it('should activate if passed the name of the heading', function () {
        componentInstance.$emit('TAB_COMPONENT_TAB_CLICKED', 'foo');
        expect(componentInstance.active).toEqual(true);
      });

      it('should deactivate if not passed the name of the heading', function () {
        componentInstance.active = true;
        componentInstance.$emit('TAB_COMPONENT_TAB_CLICKED', 'bar');
        expect(componentInstance.active).toEqual(false);
      });
    });
  });

});
