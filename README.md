# buddy-minimal

A minimal test reporter for Buddy. For humans.


## Example

Write your tests:

```js
var spec = require('test-buddy')

spec('Thou', function(shall) { 
  shall('pass!', function() { })
})
```

Run the specs through the minimal reporter:

```js
spec.run(require('buddy-minimal')())
```

And get back a minimal output:

```bash
Success. 1/1 tests.
```


## Installing

Just grab it from NPM:

    $ npm install buddy-minimal
    

## Licence

MIT.
