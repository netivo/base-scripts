# Netivo Base Scripts

Basic javascript and scss styles for building pages

## Installation

To install the script you just use:
```bash
npm install -y @netivo\base-scripts
```

## Basic Usage

To use it in javascript:

```javascript
import * as baseScripts from '@netivo/base-scripts';
```

or 

```javascript
import { methodNames } from '@netivo/base-scripts';
```

To use in SCSS:

```scss
import '~@netivo/base-scripts/sass/main';
```

## Advanced usage 

You could also include one of the modules singularly.

### Javascript

```javascript
import __module_name__ from '@netivo/base-scripts/javascript/__module_file__';
```

List of the modules and how to use them you can find [here](https://github.com/netivo/base-scripts/documentation/javascript.md "Documentation for javascript").

### SCSS

```scss
import '~@netivo/base-scripts/sass/__module_file__';
```

List of the modules and how to use them you can find [here](https://github.com/netivo/base-scripts/documentation/scss.md "Documentation for scss").