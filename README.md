# Unsplash Source JS

A javascript wrapper for the Unsplash Source API. Get Unsplash random photos by keyword, category, user, or ID.

[ ![Codeship Status for CrewLabs/unsplash-source-js](https://codeship.com/projects/668ef1e0-6255-0133-355b-1af77e49650b/status?branch=master)](https://codeship.com/projects/112623)

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
