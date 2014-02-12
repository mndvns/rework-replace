
# rework-replace

  A simple plugin for finding and replacing declarations in [rework](https://github.com/reworkcss/rework).

## Installation

Install via npm:

```shell
$ npm install rework-replace
```

## Example

```javascript
var rw = require('rework');
var rwr = require('rework-replace');
var css = require('fs').readfileSync('style.css', 'utf8');

var matches = {
  'zoom': false,    // keys are parsed as regular expressions
  '-moz-: false,    // values are `false` or string
  '^__': false,     // a value of `false` will remove the declaration
  '^--': '-vendor'  // a string will replace the declaration key
}

rework(css)
  .use(plugin(matches))
  .toString();
```

## Todo

- more tests
- match on declaration values
- pass functions

## License

MIT
