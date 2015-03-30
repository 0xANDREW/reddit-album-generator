Pretty late, but I've always wanted to do an automated implementation of this: <http://www.reddit.com/r/funny/comments/lplhn/every_band_ever_used_this>, so I did it in Meteor.js.

Available here: <http://reddit-album-generator.meteor.com>

##### Issues
* Haven't figured out how to make `Router.go` reload the current page if the URL is the same as the current location.
* The text generation is obviously lacking, but I wanted a quick prototype, so I used overlays instead of downloading and creating my own image. Outlines/shadows could be better.
* Finding the _right_ last 4-5 words from the quotes doesn't always work.
