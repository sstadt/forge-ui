
var tabComponent = require('./tabComponent.js');

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

    // it('should have an initial index value of 0', function () {
    //   expect(data.index).toEqual(0);
    // });
    //
    // it('should have an initial show value of false', function () {
    //   expect(data.show).toEqual(false);
    // });
  });

  describe('props', function () {
    // describe('heading', function () {
    //   it('should exist', function () {
    //     expect(component.props.heading).toEqual(jasmine.any(Object));
    //   });
    //
    //   it('should be a string', function () {
    //     expect(component.props.heading.type).toEqual(String);
    //   });
    // });
  });

  describe('methods', function () {
    var componentInstance;

    beforeEach(function () {
      componentInstance = new Vue(component);
    });

    // need to find a way to compile this to test references to parent
  });

});
