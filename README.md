

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
  - fCheckbox
  - fForm
  - fInput
  - fSelect
  - fRadio

### Coverage

```
gulp test
```

### TODO

 - add CSS variables to all documented CSS and Vue components
 - pull in notifications component from game table
