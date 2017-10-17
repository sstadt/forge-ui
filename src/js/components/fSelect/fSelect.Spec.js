
import fSelectComponent from './fSelectComponent.js';
import forgeUtil from '../../forge-util.js';

Vue.config.silent = true;

describe('The fSelect component', function () {
  var component;

  beforeEach(function () {
    component = forgeUtil.clone(fSelectComponent);
  });

  it('to be an object', function () {
    expect(component).toEqual(jasmine.any(Object));
  });

  it('should have a template', function () {
    expect(component.template).toEqual(jasmine.any(String));
  });

});
