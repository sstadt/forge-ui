
import componentList from './componentList.js';

var Forge = {

  /**
   * template
   *
   * Register a template to a component
   *
   * @param component string The name of the component
   * @param template  string The template to register to the component
   */
  template(component, template) {
    if (componentList.hasOwnProperty(component)) {
      componentList[component].template = template;
    }
  },

  /**
   * cast
   *
   * Register a component to Vue
   *
   * @param component string The name of the component
   */
  cast(component) {
    if (componentList.hasOwnProperty(component)) {
      Vue.component(component, componentList[component]);
    }
  },

  /**
   * castAll
   *
   * Register all components to Vue
   */
  castAll() {
    _.forEach(componentList, (component, name) => Forge.cast(name));
  }

};

if (window) {
  window.Forge = Forge;
}

export default Forge;
