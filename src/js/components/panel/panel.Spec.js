
var panelComponent = require('./panelComponent.js');

describe('The panel component', function () {
  var component;

  beforeEach(function () {
    component = _.clone(panelComponent);
  });

  it('to be an object', function () {
    expect(component).toEqual(jasmine.any(Object));
  });

  it('should have a template', function () {
    expect(component.template).toEqual(jasmine.any(String));
  });

});
