
var tabsComponent = require('./tabsComponent.js');
var tabComponent = require('./tab/tabComponent.js');

Vue.config.silent = true;

describe('The tabs component', function () {
  var component, componentInstance;

  beforeEach(function () {
    component = _.extend(tabsComponent);
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

    describe('tabs', function () {
      it('tabs should be an array', function () {
        expect(data.tabs).toEqual([]);
      });

      it('activeTab should be an empty string', function () {
        expect(data.activeTab).toEqual('');
      });
    });
  });

  describe('events', function () {
    var componentInstance;

    beforeEach(function () {
      componentInstance = new Vue(component);
    });

    it('should be an object', function () {
      expect(component.events).toEqual(jasmine.any(Object));
    });

    describe('TAB_COMPONENT_TAB_CREATED', function () {
      beforeEach(function () {
        spyOn(componentInstance, 'activate');
        componentInstance.$emit('TAB_COMPONENT_TAB_CREATED', 'foo');
      });

      it('should add a new tab', function () {
        expect(componentInstance.tabs.length).toEqual(1);
      });

      it('when there are no tabs, should add a new active tab', function () {
        expect(componentInstance.tabs[0]).toEqual({ heading: 'foo', active: true });
      });

      it('when there are no tabs, should activate the added tab', function () {
        expect(componentInstance.activate).toHaveBeenCalledWith('foo');
      });

      it('when there are tabs, should add a new inactive tab', function () {
        componentInstance.$emit('TAB_COMPONENT_TAB_CREATED', 'bar');
        expect(componentInstance.tabs[1]).toEqual({ heading: 'bar', active: false });
      });
    });
  });

  describe('methods', function () {
    beforeEach(function () {
      componentInstance = new Vue(component);
      spyOn(componentInstance, '$broadcast');
    });

    describe('#activate', function () {
      beforeEach(function () {
        componentInstance.activate('foo');
      });

      it('should set the active tab to the passed parameter', function () {
        expect(componentInstance.activeTab).toEqual('foo');
      });

      it('should broadcast an event with the name of the active tab', function () {
        expect(componentInstance.$broadcast).toHaveBeenCalledWith('TAB_COMPONENT_TAB_CLICKED', 'foo');
      });
    });
  });

});
