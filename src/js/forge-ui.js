
import alertComponent from './components/alert/alertComponent.js';
import iconComponent from './components/icon/iconComponent.js';
import modalComponent from './components/modal/modalComponent.js';
import promptComponent from './components/prompt/promptComponent.js';
import loaderComponent from './components/loader/loaderComponent.js';
import tabsComponent from './components/tabs/tabsComponent.js';
import tabComponent from './components/tabs/tab/tabComponent.js';
import vFormComponent from './components/vForm/vFormComponent.js';
import vInputComponent from './components/vInput/vInputComponent.js';
import vSelectComponent from './components/vSelect/vSelectComponent.js';
import vCheckboxComponent from './components/vCheckbox/vCheckboxComponent.js';

var componentList = {
  alert: alertComponent,
  icon: iconComponent,
  modal: modalComponent,
  prompt: promptComponent,
  loader: loaderComponent,
  tabs: tabsComponent,
  tab: tabComponent,
  vForm: vFormComponent,
  vInput: vInputComponent,
  vSelect: vSelectComponent,
  vCheckbox: vCheckboxComponent,
};

var Forge = {
  template(component, template) {
    if (componentList.hasOwnProperty(component)) {
      componentList[component].template = template;
    }
  },
  init(component) {
    if (componentList.hasOwnProperty(component)) {
      Vue.component(component, componentList[component]);
    }
  },
  initAll() {
    _.forEach(componentList, (component, name) => Forge.init(name));
  }
};

if (window) {
  window.Forge = Forge;
}

export default Forge;
