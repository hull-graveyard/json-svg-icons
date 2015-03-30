# json-svg-icons

A set of SVG icons in JSON format. Very useful when building React apps, since this allows you to programatically update any part of the icon, tweak size, stroke, fill, animations etc...

Look in [`src/demo.jsx`](https://github.com/hull/json-svg-icons/blob/master/src/demo.jsx) for example usage

## Install

```
$ npm install --save json-svg-icons
```


## Usage

```js
var reactSvgIcons = require('json-svg-icons');
reactSvgIcons;
//=> {
//      facebook:...,
//      twitter:...,
//}
```

or individually: 
```js
var facebook = require('json-svg-icons/dist/facebook.json');
```

## License

MIT © [Romain Dardour](http://hull.io)
