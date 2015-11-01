# Unsplash Source JS

A javascript wrapper for the Unsplash Source API. Get random Unsplash photos by keyword, category, user, or ID.

[ ![Codeship Status for CrewLabs/unsplash-source-js](https://codeship.com/projects/668ef1e0-6255-0133-355b-1af77e49650b/status?branch=master)](https://codeship.com/projects/112623)

## Usage

Include `unsplash-source.js` or `unsplash-source.min.js` in your page:

```html
<script src="/js/unsplash-source.js"></script>
```

Then build the photo you want using any of the options.

## Examples

Get a random photo (the Unsplash Source API defaults to a width of 1080px):

```js
var photo = new SourcePhoto();

photo.build(); // => "https://source.unsplash.com/random"
```

Get a random photo from Unsplash Photographer `@erondu` cropped to 2048px x 1200px, that changes once a day:

```js
var photo = new SourcePhoto();

photo.fromUser("erondu")
     .width(2048)
     .height(1200)
     .randomize("daily")
     .build(); // => "https://source.unsplash.com/user/erondu/2048x1200/random,daily"
```

Get a random nature photo cropped to 1000px x 1200px:

```js
var photo = new SourcePhoto();

photo.fromCategory("nature")
     .size(1000, 1200)
     .build(); // => "https://source.unsplash.com/category/nature/1000x1200/random"
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
