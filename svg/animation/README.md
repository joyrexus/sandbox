SVG Animation
=============

A number of browsers support the `<animate>` tag within an SVG element to enable animation effects.

This allows us to change numeric or stylistic attributes of our elements over time.  For example, we can animate the scaling, translation, and rotation of our elements. 


## Animating attributes

The following example animates the `cx` attribute of a circle. To do so, we add an `<animate>` element inside the `<circle>` element and specify the following:

* **attributeName** - name of the attribute to animate

* **from** - initial value of the attribute

* **to** - final value

* **dur** - duration ('5s' for 5 seconds)

---

EXAMPLE: animating a circle's `cx` attribute

<svg width="300px" height="50px"> <rect x="0" y="0" width="300" height="50" fill="#999" /> <circle cx="-20" cy="25" r="20" fill="aliceblue" stroke="#777" stroke-width="3"> <animate attributeName="cx" from="-20" to="320" dur="5s" repeatCount="indefinite" /> </circle> </svg>

    <svg width="300px" height="50px">
       <rect x="0" y="0" 
             width="300" 
             height="50" 
             fill="#999" />
       <circle cx="-20" cy="25" r="20" fill="aliceblue" stroke="#777" stroke-width="3">
            <animate attributeName="cx" from="-20" to="320" dur="5s" repeatCount="indefinite" />
       </circle>
     </svg>

---

## Animating transform attributes

The `<animateTransform>` element let you animate **transform** attributes.  Consider a rotation, which invovles specifying both the angle of rotation (θ) and the `x` and `y` coordinates for the axis of rotation: `rotation(θ, x, y)`.

In the example below, we animate the center of the rotation and the angle.


