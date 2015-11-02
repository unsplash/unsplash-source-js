/*! https://unsplash.com unsplash-source-js - v1.0.0 - 2015-11-02 

$$\   $$\                               $$\                     $$\       
$$ |  $$ |                              $$ |                    $$ |      
$$ |  $$ |$$$$$$$\   $$$$$$$\  $$$$$$\  $$ | $$$$$$\   $$$$$$$\ $$$$$$$\  
$$ |  $$ |$$  __$$\ $$  _____|$$  __$$\ $$ | \____$$\ $$  _____|$$  __$$\ 
$$ |  $$ |$$ |  $$ |\$$$$$$\  $$ /  $$ |$$ | $$$$$$$ |\$$$$$$\  $$ |  $$ |
$$ |  $$ |$$ |  $$ | \____$$\ $$ |  $$ |$$ |$$  __$$ | \____$$\ $$ |  $$ |
\$$$$$$  |$$ |  $$ |$$$$$$$  |$$$$$$$  |$$ |\$$$$$$$ |$$$$$$$  |$$ |  $$ |
 \______/ \__|  \__|\_______/ $$  ____/ \__| \_______|\_______/ \__|  \__|
                              $$ |                                        
                              $$ |                                        
                              \__|                                        
*/

if (!Array.isArray) {
  Array.isArray = function(arg) {
    return Object.prototype.toString.call(arg) === '[object Array]';
  };
}

if (!String.prototype.trim) {
  String.prototype.trim = function () {
    return this.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '');
  };
}

if (!Array.prototype.forEach) {

  Array.prototype.forEach = function(callback, thisArg) {

    var T, k;

    if (this == null) {
      throw new TypeError(' this is null or not defined');
    }

    // 1. Let O be the result of calling ToObject passing the |this| value as the argument.
    var O = Object(this);

    // 2. Let lenValue be the result of calling the Get internal method of O with the argument "length".
    // 3. Let len be ToUint32(lenValue).
    var len = O.length >>> 0;

    // 4. If IsCallable(callback) is false, throw a TypeError exception.
    // See: http://es5.github.com/#x9.11
    if (typeof callback !== "function") {
      throw new TypeError(callback + ' is not a function');
    }

    // 5. If thisArg was supplied, let T be thisArg; else let T be undefined.
    if (arguments.length > 1) {
      T = thisArg;
    }

    // 6. Let k be 0
    k = 0;

    // 7. Repeat, while k < len
    while (k < len) {

      var kValue;

      // a. Let Pk be ToString(k).
      //   This is implicit for LHS operands of the in operator
      // b. Let kPresent be the result of calling the HasProperty internal method of O with argument Pk.
      //   This step can be combined with c
      // c. If kPresent is true, then
      if (k in O) {

        // i. Let kValue be the result of calling the Get internal method of O with argument Pk.
        kValue = O[k];

        // ii. Call the Call internal method of callback with T as the this value and
        // argument list containing kValue, k, and O.
        callback.call(T, kValue, k, O);
      }
      // d. Increase k by 1.
      k++;
    }
    // 8. return undefined
  };
}

(function (root, undefined) {
  "use strict";

  var SourcePhoto = function () {
    this.version = "1.0.0";
    this.url = "https://source.unsplash.com";
    this.dimensions = {};
    this.randomizationInterval = null;

    return this;
  };

  /**
   * Finds a photo by its specific public ID
   * @param  {Int} id
   * @return {SourcePhoto}
   */
  SourcePhoto.prototype.find = function (id) {
    this.id = id;

    return this;
  };

  /**
   * Sets the width of the photo
   *
   * Note: crops if necessary to maintain the aspect ratio
   * 
   * @param  {Int} width
   * @return {SourcePhoto}
   */
  SourcePhoto.prototype.width = function (width) {
    this.dimensions.width = width;

    return this;
  };

  /**
   * Sets the height of the photo
   *
   * Note: crops if necessary to maintain the aspect ratio
   * 
   * @param  {Int} height
   * @return {SourcePhoto}
   */
  SourcePhoto.prototype.height = function (height) {
    this.dimensions.height = height;

    return this;
  };

  /**
   * Shorthand for setting the photo dimensions
   *
   * Note: crops if necessary to maintain the aspect ratio
   * 
   * @param  {Int} width
   * @param  {Int} height (optional)
   * @return {SourcePhoto}
   */
  SourcePhoto.prototype.size = function (width, height) {
    this.dimensions = {
      width: width,
      height: height || width
    };

    return this;
  };

  /**
   * Sets the randomization interval
   *
   * Note: only accepts three possible values (null, daily, or weekly)
   * @param  {String} interval
   * @return {SourcePhoto}
   */
  SourcePhoto.prototype.randomize = function (interval) {
    if (interval == "daily" || interval == "weekly") {
      this.randomizationInterval = interval;
    } else {
      this.randomizationInterval = null;
    }

    return this;
  };

  /**
   * Limits the photo to having tags or locations matching the keywords
   * @param  {[Array || String]} keywords
   * @return {SourcePhoto}
   */
  SourcePhoto.prototype.of = function (keywords) {
    var sanitizedKeywords = [];

    // Handle a string of comma-separated keywords
    if (!Array.isArray(keywords)) {
      keywords = keywords.split(",");
    }

    // Remove any leading or trailing whitespace from each keyword
    keywords.forEach(function (keyword) {
      sanitizedKeywords.push(keyword.trim());
    });

    this.keywords = sanitizedKeywords.join(",");
    this.keywords = encodeURI(this.keywords);

    return this;
  };

  /**
   * Limits the photos to a specific photographer
   * @param  {String} username 
   * @return {SourcePhoto}
   */
  SourcePhoto.prototype.fromUser = function (username) {
    this.username = username;

    return this;
  };

  /**
   * Limits the photos to a specific category
   * @param  {String} category
   * @return {SourcePhoto}
   */
  SourcePhoto.prototype.fromCategory = function (category) {
    this.category = category;

    return this;
  };

  /**
   * Returns true if the photo has dimensions set
   * @return {Boolean}
   */
  SourcePhoto.prototype._hasDimensions = function () {
    return !!this.dimensions.width && !!this.dimensions.height;
  };

  /**
   * Appends the photo dimensions to the URL
   * @return {String} the photo URL
   */
  SourcePhoto.prototype._appendDimensions = function () {
    if (this._hasDimensions()) {
      this.url += "/" + this.dimensions.width + "x" + this.dimensions.height;
    }

    return this.url;
  };

  /**
   * Appends the keywords to the URL
   * @return {String} the photo URL
   */
  SourcePhoto.prototype._appendKeywords = function () {
    if (this.keywords) {
      this.url += "?" + this.keywords;
    }

    return this.url;
  };

  /**
   * Appends the randomization interval to the URL
   * @return {[type]} [description]
   */
  SourcePhoto.prototype._appendRandomization = function () {
    this.url += "/random";

    if (this.randomizationInterval == "daily") {
      this.url += ",daily";
    } else if (this.randomizationInterval == "weekly") {
      this.url += ",weekly";
    }

    return this.url;
  };

  /**
   * Creates the URL based on the previous actions
   * @return {String} the photo URL
   */
  SourcePhoto.prototype.build = function () {
    if (!!this.id) {
      this.url += "/" + this.id;
      this._appendDimensions();
      return this.url;

    } else if (!!this.username) {
      this.url += "/user/" + this.username;
      this._appendDimensions();
      this._appendRandomization();
      this._appendKeywords();
      return this.url;

    } else if (!!this.category) {
      this.url += "/category/" + this.category;
      this._appendDimensions();
      this._appendRandomization();
      this._appendKeywords();
      return this.url;

    } else {
      this._appendDimensions();
      this._appendRandomization();
      this._appendKeywords();
      return this.url;

    }
  };

  root.SourcePhoto = SourcePhoto;

})(this);
