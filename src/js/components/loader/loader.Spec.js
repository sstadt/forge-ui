
var loaderComponent = require('./loaderComponent.js');

describe('The loader component', function () {
  var component;

  beforeEach(function () {
    component = _.clone(loaderComponent);
  });

  it('to be an object', function () {
    expect(component).toEqual(jasmine.any(Object));
  });

  it('should have a template', function () {
    expect(component.template).toEqual(jasmine.any(String));
  });

});
