
import Forge from './forge-ui.js';
import componentList from './componentList.js';

const TEST_TEMPLATE = '<p>foo</p>';

describe('Forge', function () {
  describe('method', function () {
    beforeEach(function () {
      Forge.components = {};
    });

    describe('#cast default', function () {
      beforeEach(function () {
        Forge.cast('alert');
      });

      it('should register the provided component to Forge', function () {
        expect(Forge.components.hasOwnProperty('alert')).toEqual(true);
      });

      it('should not overwrite a component that has already been registered', function () {
        Forge.cast('alert', TEST_TEMPLATE);
        expect(Forge.components.alert.template).not.toEqual(TEST_TEMPLATE);
      });
    });

    describe('#cast with template', function () {
      beforeEach(function () {
        Forge.cast('alert', TEST_TEMPLATE);
      });

      it('should register the provided component to Forge', function () {
        expect(Forge.components.hasOwnProperty('alert')).toEqual(true);
      });

      it('should assign the given template to the component', function () {
        expect(Forge.components.alert.template).toEqual(TEST_TEMPLATE);
      });
    });

    describe('#cast with name', function () {
      beforeEach(function () {
        Forge.cast('alert');
        Forge.cast('alert', null, 'foo');
      });

      it('should register the provided component to Forge', function () {
        expect(Forge.components.hasOwnProperty('foo')).toEqual(true);
      });

      it('should register an identical component with the same name', function () {
        expect(Forge.components.alert).toEqual(Forge.components.foo);
      });
    });

    describe('#castAll', function () {
      beforeEach(function () {
        Forge.castAll();
      });

      it('should register all components in the component list to Forge', function () {
        for (var component in componentList) {
          expect(Forge.components.hasOwnProperty(component)).toEqual(true);
        }
      });
    });
  });
});
