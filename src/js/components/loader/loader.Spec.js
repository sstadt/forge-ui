
import loaderComponent from './loaderComponent.js';
import forgeUtil from '../../forge-util.js';

describe('The loader component', function () {
  var component;

  beforeEach(function () {
    component = forgeUtil.clone(loaderComponent);
  });

  it('to be an object', function () {
    expect(component).toEqual(jasmine.any(Object));
  });

  it('should have a template', function () {
    expect(component.template).toEqual(jasmine.any(String));
  });

});
