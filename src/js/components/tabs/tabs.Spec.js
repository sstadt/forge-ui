
import tabsComponent from './tabsComponent.js';
import forgeUtil from '../../forge-util.js';

Vue.config.silent = true;

describe('The tabs component', function () {
  var component, componentInstance;

  beforeEach(function () {
    component = forgeUtil.clone(tabsComponent);
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
    });
  });

  describe('methods', function () {
    beforeEach(function () {
      componentInstance = new Vue(component);
    });

    describe('#addTab', function () {
      beforeEach(function () {
        componentInstance.addTab({ active: false });
      });

      it('should set add the new tab to the tabs component', function () {
        expect(componentInstance.tabs).toEqual([{ active: false }]);
      });
    });

    describe('#activate', function () {
      beforeEach(function () {
        componentInstance.addTab({ active: false, heading: 'foo' });
        componentInstance.addTab({ active: false, heading: 'bar' });
        componentInstance.addTab({ active: false, heading: 'baz' });
        componentInstance.activate({ heading: 'bar' });
      });

      it('should activate the tab with the appropriate heading', function () {
        expect(componentInstance.tabs[0].active).toEqual(false);
        expect(componentInstance.tabs[1].active).toEqual(true);
        expect(componentInstance.tabs[2].active).toEqual(false);
      });
    });
  });

});
