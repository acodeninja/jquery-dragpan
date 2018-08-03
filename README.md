# Dragpan [![Travis Build Status][build img]][build link]

[build img]: https://travis-ci.org/lgoldstien/jquery-dragpan.svg
[build link]: https://travis-ci.org/lgoldstien/jquery-dragpan

A jQuery plugin designed to allow click and drag panning of a scrollable element

## Getting Started
Download the [production version][min] or the [development version][max].

[min]: https://raw.github.com/lgoldstien/jquery-dragpan/master/dist/dragpan.min.js
[max]: https://raw.github.com/lgoldstien/jquery-dragpan/master/dist/dragpan.js

### Requirements

jQuery Dragpan has the following requirements:

* [jQuery](http://jquery.com/download/)
* [jQuery UI](http://jqueryui.com/download/)
  * Requires UI Core - Core and Widget

### Usage

```html
<div id="document">
    <div id="content">
    </div>
</div>
<script src="path/to/jquery.js"></script>
<script src="path/to/dragpan.js"></script>
<script>
    $(document).ready( function () {
      $("#document").dragpan();
    });
</script>
```

### Options

Options can be parsed when Dragpan is instatiated on an element or after.

#### Speed

You can adjust the speed of the drag using the speedX and speedY options.

```javascript
$("element").dragpan({ speedX: 20, speedY: 20 });
```

The default speeds are 10, this equates to a 1:1 relationship between mouse movement and scrolling.

#### Parent

You can set the parent element, this is useful if the viewport sized element is not the jquery object you are using.

```javascript
$("element").dragpan({ parent: $("element").parent() });
```

By default this will be the element you are using the dragpan method on.

#### On

You can tell dragpan to instantiate without enabling functionality using the following:

```javascript
$("element").dragpan({ on: false });
```

This will default to true meaning if you do not specify this then the dragpan functionality will be enabled.

### Methods

You can use methods the following non-private methods:

####On

You can turn on dragpan functionality using the following on an already instantiated dragpan instance.

```javascript
    $("element").dragpan('on');
```

#### Off

You can turn off the dragpan functionality using the following on an already instantiated dragpan instance.

```javascript
    $("element").dragpan('off');
```
