brofist-minimal
===============

[![unstable](http://hughsk.github.io/stability-badges/dist/unstable.svg)](http://github.com/hughsk/stability-badges)
![Dependencies Status](https://david-dm.org/brofistjs/brofist-minimal.png)


A minimal test reporter for Brofist. For humans.


## Example

Write your tests:

```js
var spec = require('brofist')

spec('Thou', function(shall) { 
  shall('pass!', function() { })
})
```

Run the specs through the minimal reporter:

```js
spec.run(require('brofist-minimal')())
```

And get back a minimal output:

```bash
Success. 1/1 tests.
```


## Installing

Just grab it from NPM:

    $ npm install brofist-minimal
    

## Licence

MIT.
