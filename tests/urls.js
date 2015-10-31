describe("SourcePhotos", function () {

  it("exists", function () {
    expect(SourcePhoto).toBeDefined();
  });

  describe("#find", function () {
    it("sets the ID", function () {
      var photo = new SourcePhoto();

      photo.find("uniqueString");

      expect(photo.id).toEqual("uniqueString");
    });
  });

  describe("#width", function () {
    it("sets the width", function () {
      var photo = new SourcePhoto();

      photo.width(200);

      expect(photo.dimensions.width).toEqual(200);
    });
  });

  describe("#height", function () {
    it("sets the height", function () {
      var photo = new SourcePhoto();

      photo.height(200);

      expect(photo.dimensions.height).toEqual(200);
    });
  });

  describe("#size", function () {
    it("sets both dimensions", function () {
      var photo = new SourcePhoto();

      photo.size(200);

      expect(photo.dimensions.width).toEqual(200);
      expect(photo.dimensions.height).toEqual(200);
    });

    it("sets the width and height", function () {
      var photo = new SourcePhoto();

      photo.size(200, 100);

      expect(photo.dimensions.width).toEqual(200);
      expect(photo.dimensions.height).toEqual(100);
    });
  });

  describe("#_hasDimensions", function () {
    it("returns true when dimensions are set", function () {
      var photo = new SourcePhoto();

      photo.width(200);
      photo.height(200);

      expect(photo._hasDimensions()).toBe(true);
    });
  });

  describe("#_appendDimensions", function () {
    it("adds the dimensions to the URL", function () {
      var photo = new SourcePhoto();

      photo.width(100);
      photo.height(200);

      expect(photo._appendDimensions()).toEqual("https://source.unsplash.com/100x200");
    });
  });

  describe("#build", function () {
    it("returns a specific photo", function () {
      var photo = new SourcePhoto();

      photo.find("6hxvm0NzYP8");

      expect(photo.build()).toEqual("https://source.unsplash.com/6hxvm0NzYP8");
    });

    it("returns a specific photo with dimensions", function () {
      var photo = new SourcePhoto();

      photo.find("6hxvm0NzYP8");
      photo.size(200, 100);

      expect(photo.build()).toEqual("https://source.unsplash.com/6hxvm0NzYP8/200x100");
    });

    it("returns a random photo from a user", function () {
      var photo = new SourcePhoto();

      photo.fromUser("crew");

      expect(photo.build()).toEqual("https://source.unsplash.com/user/crew/random");
    });

    it("returns a random photo from a user with dimensions", function () {
      var photo = new SourcePhoto();

      photo.fromUser("crew");
      photo.size(200, 100);

      expect(photo.build()).toEqual("https://source.unsplash.com/user/crew/200x100/random");
    });
  });

});
