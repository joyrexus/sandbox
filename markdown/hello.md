<script src="js/d3.v3.min.js"></script>

<header>
  2014-12-18 / [Jason Voigt](jvoigt@uchicago.edu)
</header>


# Hello World!

Once upon a time, there were three little circles.

<svg width="720" height="120">
  <circle cx="40" cy="60" r="10"></circle>
  <circle cx="80" cy="60" r="10"></circle>
  <circle cx="120" cy="60" r="10"></circle>
</svg>

<aside style="margin-top:2em;">
We're using SVG (Scalable Vector Graphics) here, an HTML5 standard
</aside>

```html
<svg width="720" height="120">
  <circle cx="40" cy="60" r="10"></circle>
  <circle cx="80" cy="60" r="10"></circle>
  <circle cx="120" cy="60" r="10"></circle>
</svg>
```

This tutorial shows you how to manipulate them using selections.


## Selecting Elements

The [d3.selectAll](https://github.com/mbostock/d3/wiki/Selections#selectAll) method takes a [selector](http://www.w3.org/TR/CSS2/selector.html) string, such as `"circle"`, and returns a selection representing all elements that match the selector:

    var circle = d3.selectAll("circle");

The above code sets styles and attributes for all selected elements to the same values.

<svg width="720" height="120">
  <circle cx="40" cy="60" r="30" style="fill:steelblue;"></circle>
  <circle cx="80" cy="60" r="30" style="fill:steelblue;"></circle>
  <circle cx="120" cy="60" r="30" style="fill:steelblue;"></circle>
</svg>

```html
<svg width="720" height="120">
  <circle cx="40" cy="60" r="30" style="fill:steelblue;"></circle>
  <circle cx="80" cy="60" r="30" style="fill:steelblue;"></circle>
  <circle cx="120" cy="60" r="30" style="fill:steelblue;"></circle>
</svg>
```

<footer>
  2014-12-18 / [Jason Voigt](jvoigt@uchicago.edu)
</footer>

<script src="js/highlight.min.js"></script>
