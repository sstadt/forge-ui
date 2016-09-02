
import Forge from './forge-ui.js';
import componentList from './componentList.js';

describe('Forge', function () {
  describe('method', function () {
    describe('#template', function () {
      var testTemplate = '<p>foo</p>';

      beforeEach(function () {
        Forge.template('alert', testTemplate);
        Forge.cast('alert');
      });

      it('should assign a template to the given component', function () {
        expect(Vue.options.components.alert.options.template).toEqual(testTemplate);
      });
    });

    describe('#cast', function () {
      beforeEach(function () {
        Forge.cast('alert');
      });

      it('should register the provided component to Vue', function () {
        expect(Vue.options.components.hasOwnProperty('alert')).toEqual(true);
      });
    });

    describe('#castAll', function () {
      beforeEach(function () {
        Forge.castAll();
      });

      it('should register all components in the component list to Vue', function () {
        for (var component in componentList) {
          expect(Vue.options.components.hasOwnProperty(component)).toEqual(true);
        }
      });
    });
  });
});
