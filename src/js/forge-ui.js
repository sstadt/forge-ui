
import _ from 'lodash';

import componentList from './componentList.js';
import forgeUtil from './forge-util.js';

var Forge = {

  // bucket for registering components
  components: {},

  /**
   * cast
   *
   * Register a component to Forge
   *
   * @param component string The name of the component
   * @param template  string optional - The template to register to the component
   * @param template  string optional - The name to register the component to Vue with
   */
  cast(componentName, template, customName) {
    if (componentList.hasOwnProperty(componentName)) {
      let name = customName || componentName;

      if (!this.components.hasOwnProperty(name)) {
        let component = forgeUtil.clone(componentList[componentName]);

        if (forgeUtil.isString(template)) {
          component.template = template;
        }

        this.components[name] = component;
      }
    } else {
      console.error(`ForgeUI does not currently include a component with name ${componentName}`)
    }
  },

  /**
   * castAll
   *
   * Register all unregistered components to Forge with defualt templates
   */
  castAll() {
    for (let component in componentList) {
      this.cast(component);
    }
  },

  /**
   * install
   *
   * Vue.js plugin installer
   *
   * @param Vue     object Vue.js instance
   * @param options object Options object - currently unused
   */
  install(Vue, options) {
    // register to Forge anything that's left to register
    this.castAll();

    // register component list to Vue
    for (let name in this.components) {
      Vue.component(name, this.components[name]);
    }
  }

};

if (window) {
  window.Forge = Forge;
}

export default Forge;
