Quick demo of a simple CSS [transition](https://developer.mozilla.org/en-US/docs/Web/Guide/CSS/Using_CSS_transitions) and [transform](https://developer.mozilla.org/en-US/docs/Web/Guide/CSS/Using_CSS_transforms). See [Animating CSS Transitions](https://developer.apple.com/library/safari/documentation/InternetWeb/Conceptual/SafariVisualEffectsProgGuide/AnimatingCSSTransitions/AnimatingCSSTransitions.html) for an overview.

The container sets the animation's perspective and the inner pane is the element that actually flips, rotating 180 degrees around the Y-axis when the parent container is clicked.

Note that we're only using the `-webkit` vendor prefix, so this is only going to work in WebKit browsers.



