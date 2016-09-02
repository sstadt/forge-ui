

# ForgeUI

A collection of basic, reusable Vue.js components. Components are collected in Forge and initialized on demand.

demo: http://sstadt.github.io/forge-ui/

## Install

```
npm install forge-ui
```

Forge has Vue and Lodash as dependencies.

```html
<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/vue/1.0.26/vue.min.js"></script>
<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.15.0/lodash.min.js"></script>
<script type="text/javascript" src="path/to/forge-ui.js"></script>
```

## Usage

Forge includes a few methods that allow you to initialize it's components when you're ready. This allows you to swap in a template before initialization to help forge conform to the needs of your interface.

### Set a template

```
import myTemplate from './template.html';
Forge.template('modal', myTemplate);
```

### Register a component to Vue

```
Forge.cast('modal');
```

### Register all components to Vue

```
Forge.castAll();
```

### Current Component List

  - alert
  - modal
  - prompt
  - tabs
  - tab
  - vCheckbox
  - vForm
  - vInput
  - vSelect

### Foundation

Forge UI bundles Foundation 6 for sites in the dist version of the CSSS. If you would like to customize the styling through SASS, import `src/sass/forge-ui.sass` to your project's SASS build. There is a comprehensive settings file in the same directory that you can copy to your own project file and use to tweak individual settings to your liking.

Forge UI does not include all component styling for Foundation, however you can always call the appropriate mixin to populate the styles in your compiled stylesheet. Here is the list of Foundation components that are initialized in the dist build for Forge's CSS:

 - foundation-global-styles
 - foundation-grid
 - foundation-typography
 - foundation-forms
 - foundation-button
 - foundation-button-group
 - foundation-callout
 - foundation-close-button
 - foundation-menu
 - foundation-table
 - foundation-visibility-classes
 - foundation-float-classes

Foundation For Sites: http://foundation.zurb.com/sites/docs/

### Coverage

```
gulp test
```
