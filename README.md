# Unsplash Source JS

A javascript wrapper for the Unsplash Source API. Get Unsplash random photos by keyword, category, user, or ID.

## Usage

Include `unsplash-source.js` or `unsplash-source.min.js` in your page:

```html
<script src="/js/unsplash-source.js"></script>
```

```js
var photo = new SourcePhoto();

photo.fromUser("erondu");

photo.width(2048);
photo.height(1200);

photo.build(); // => "https://source.unsplash.com/user/erondu/2048x1200/random"
```

## Development

```
// git clone

npm install
grunt test // => should all pass

// make your changes to the `/src` folder
// add tests to `/tests`

grunt test // => should all pass

grunt build // => creates a bundled version of the script

// git commit
```
