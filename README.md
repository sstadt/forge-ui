

# ForgeUI

A collection of basic, reusable Vue.js components. Components are collected in Forge and initialized on demand.

ForgeUI aims to provide all the basic UI functionality you need without the need for rebuilding common interface components or use overly elaborate and specific CSS selectors to reskin the interface to match your own designs and style guide. Components are deliberately kept simple, and stylesheets and templates are fully customizable _before_ you've added anything to the page.

Full Docs: http://sstadt.github.io/forge-ui/

## Quick Start

Install via npm

```
npm install forge-ui --save
```

Import ForgeUI components to Vue

```
import Vue from 'vue';
import forge from 'forge-ui';

// Register a component with a custom template (optional)
import myTemplate from './template.html';
Forge.cast('modal', myTemplate);

// Register a component with a custom name (optional)
Forge.cast('modal', null, 'my-modal'); // you can now use the modal component with <my-modal></my-modal>

// Register all Forge components to Vue
Vue.use(Forge);
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

 - add CSS variables to all documented Vue components
 - add documentation for mixins
 - add links to section headers in the kitchen sink menu
 - pull in notifications component from game table
