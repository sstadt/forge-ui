
var tabsComponent = require('./tabsComponent.js');
var tabComponent = require('./tab/tabComponent.js');

Vue.config.silent = true;

describe('The tabs component', function () {
  var component, componentInstance, tab1, tab2;

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

    // describe('tabs', function () {
    //   it('should be an array', function () {
    //     expect(data.tabs).toEqual([]);
    //   });
    // });
  });

  describe('props', function () {
    // describe('active', function () {
    //   it('should exist', function () {
    //       expect(component.props.active).toEqual(jasmine.any(Object));
    //   });
    //
    //   it('should be a number', function () {
    //     expect(component.props.active.type).toEqual(Number);
    //   });
    //
    //   it('should default to 0', function () {
    //     expect(component.props.active.default).toEqual(0);
    //   });
    // });
  });

  describe('methods', function () {
    beforeEach(function () {
      componentInstance = new Vue(component);
    });

    // need to find a way to bootstrap this to test ready() and click handler
  });

});
