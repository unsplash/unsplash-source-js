# Unsplash Source JS

A javascript wrapper for the Unsplash Source API. Get random Unsplash photos by keyword, category, user, or ID.

[ ![Codeship Status for CrewLabs/unsplash-source-js](https://codeship.com/projects/668ef1e0-6255-0133-355b-1af77e49650b/status?branch=master)](https://codeship.com/projects/112623)

## Usage

Include `unsplash-source.js` or `unsplash-source.min.js` in your page:

```html
<script src="/js/unsplash-source.js"></script>
```

Then create the photo you want using any of the chainable methods below, calling `build` as the last step to return the photo's URL.

Method | Arguments | Example | Description
-------|-----------|---------|------------
`find`|`"publicId"`|`photo.find("oMpAz-DN-9I")`|Finds a photo by its ID
`width`|`width`|`photo.width(2000)`|Sets the width in pixels
`height`|`height`|`photo.height(2000)`|Sets the height in pixels
`size`|`width, height`|`photo.size(1080,800)`|Shorthand for setting the width and height in pixels
`randomize`|`null || "daily" || "weekly"`|`photo.randomize("weekly")`|Sets the randomization interval
`fromUser`|`"username"`|`photo.fromUser("erondu")`|Limits to a specific photographer
`fromCategory`|`"category"`|`photo.fromCategory("nature")`|Limits to a specific category
`withKeywords`|`"keyword" || [arrayOfKeywords]`|`photo.withKeywords("dog")`|Limits to tags or locations matching the keywords
`build`||`photo.build()`|Returns the configured URL.

*Note*: Not all methods are compatible with each other. For example, trying to randomize a specific photo doesn't make sense. The wrapper will ignore incompatible methods and only construct URLs compatible with the Unsplash Source API.

## Examples

Get a random photo (the Unsplash Source API defaults to a width of 1080px):

```js
var photo = new SourcePhoto();

photo.build(); // => "https://source.unsplash.com/random"
```

Get a random photo from photographer [Jared Erondu](https://unsplash.com/erondu) cropped to `2048px` x `1200px`, that changes once a day:

```js
var photo = new SourcePhoto();

photo.fromUser("erondu")
     .width(2048)
     .height(1200)
     .randomize("daily")
     .build(); // => "https://source.unsplash.com/user/erondu/2048x1200/random,daily"
```

Get a random nature photo of trees and water, cropped to `1000px` x `1200px`:

```js
var photo = new SourcePhoto();

photo.fromCategory("nature")
     .size(1000, 1200)
     .keywords(["trees", "water"])
     .build(); // => "https://source.unsplash.com/category/nature/1000x1200/random?trees,water"
```

Get a specific photo (the photo ID matches the photo ID from unsplash.com):

```js
photo = new SourcePhoto();

photo.find("oMpAz-DN-9I")
     .build(); // => "https://source.unsplash.com/oMpAz-DN-9I"
```

## Development

To contribute, make sure Node and NPM are installed. Then:

```sh
// git clone

npm install
grunt test // => should all pass

// make your changes to the `/src` folder
// add tests to `/tests`

grunt test // => should all pass

grunt build // => creates a bundled version of the script

// git commit
```
