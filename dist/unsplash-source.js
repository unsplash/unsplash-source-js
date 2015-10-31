/*! https://unsplash.com unsplash-source-js - v1.0.0 - 2015-10-31 

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

(function (root, undefined) {
  "use strict";

  var SourcePhoto = function () {
    this.version = "1.0.0";
    this.url = "https://source.unsplash.com";
    this.dimensions = {};

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
   * @param  {Int} width
   * @return {SourcePhoto}
   */
  SourcePhoto.prototype.width = function (width) {
    this.dimensions.width = width;

    return this;
  };

  /**
   * Sets the height of the photo
   * @param  {Int} height
   * @return {SourcePhoto}
   */
  SourcePhoto.prototype.height = function (height) {
    this.dimensions.height = height;

    return this;
  };

  /**
   * Shorthand for setting the image dimensions
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
   * Limits the photos to a specific photographer
   * @param  {String} username 
   * @return {SourcePhoto}
   */
  SourcePhoto.prototype.fromUser = function (username) {
    this.username = username;

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
      this.url += "/random";
      return this.url;

    }
  };

  root.SourcePhoto = SourcePhoto;

})(this);
