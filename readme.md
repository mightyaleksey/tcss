tcss
====

Minimalistic test framework for css files


## Example

*test/case-xform/source.css*

```css
.src
{}
```

*test/case-xform/expected.css*

```css
.exp
{}
```

*test/xform.js*

```javascript
// xform :: string -> string -> string|promise
module.exports = function xform(srcfile, srcpath) {
  return srcfile.replace('src', 'exp');
}
```

```bash
$ tcss -x ./test/xform test/case-xform
TAP version 13
# test/case-xform
ok 1 should be equal

1..1
# tests 1
# pass  1

# ok
```


## Usage

You always need to have `source.css` and `expected.css` in your test case folders. In case you have to preprocess `source.css` file before comparison you should provide a `xform` function as in the example above.

Also if you want to change tape to something else you should provide a custom `test` function. See the example [lib/test.js](lib/test.js).


## Preloading modules

Additionally, it is possible to make tcss to load one or more modules before running any tests by using `-r` or `--require` flag. For example:

```bash
$ tcss -r ./my/local/module -x ./test/xform test/case-*
```


## Installation

With npm do

```bash
npm install tcss tape
```

By default tcss uses tape to perform tests. In case you want to use another test framework, provide a `test` function. Otherwise tape should also be installed.


## License

> The MIT License
