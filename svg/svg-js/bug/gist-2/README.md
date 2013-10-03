Demo of the `bug.movesTo` method in our `svg.bug.js` extension.

The `movesTo` method allows one to specify a series of points for the bug to
move to. For example, starting from point *A* we can move to point *B*, then to *C*, then back to *A*:

    A = new Point 40, 20
    B = new Point 200, 300
    C = new Point 300, 150

    bug = draw.bug(A.x, A.y)
    bug.movesTo B, C, A
