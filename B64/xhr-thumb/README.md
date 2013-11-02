Quick demo showing how to get a [Base64](http://en.wikipedia.org/wiki/Base64)-encoded `thumbnail.png` file from a gist.

---

Thumbnails are very handy visual indicators of the content of a block on
[bl.ocks.org](http://bl.ocks.org), esp for rapidly surveying a user's collection. 

However, many block creators don't add thumbnails because of the [extra steps](http://www.d3noob.org/2012/12/loading-thumbnail-into-gist-for.html) involved in adding them to a gist. Since the gist API doesn't let you upload binaries you end up having to clone you're gist to add a thumbnail. Note: @mbostock's [gist to clone all gists](http://bl.ocks.org/mbostock/3883098) is useful here.

[It's been suggested](http://stackoverflow.com/questions/16425770/how-do-you-upload-images-to-a-gist) that the [gist-img](https://github.com/hecticjeff/gist-img) shell script enables you to upload thumbnail images. That's at least half true. It automates the base64 encoding of png images prior to upload with @defunkt's gist CLI tool, so you end up uploading the encoded text file. 

In fact, it's easy enough to encode and upload such png files yourself: `base64 < thumbnail.png | gist -u 3883098 -f thumbnail.png.B64 -`. 

Anyhoo ...  `bl.ocks.org` doesn't currently recognize Base64-encoded thumbnails. 

FWIW, I opened up [an issue](https://github.com/mbostock/bl.ocks.org/issues/42) for the `bl.ocks.org` repo to see if @mbostock might enable (in all his copious free time!) the decoding of such thumbnails when rendering a block. 
