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

  describe("#_appendRandomization", function () {
    it("defaults to random", function () {
      var photo = new SourcePhoto();

      expect(photo._appendRandomization()).toEqual("https://source.unsplash.com/random");
    });
  });

  describe("#build", function () {

    describe("returns a specific photo", function () {
      var photo;

      beforeEach(function () {
        photo = new SourcePhoto();
        photo.find("6hxvm0NzYP8");
      });

      it("", function () {
        expect(photo.build()).toEqual("https://source.unsplash.com/6hxvm0NzYP8");
      });

      it("with dimensions", function () {
        photo.size(200, 100);

        expect(photo.build()).toEqual("https://source.unsplash.com/6hxvm0NzYP8/200x100");
      });
    });

    describe("returns a random photo from a user", function () {
      var photo;

      beforeEach(function () {
        photo = new SourcePhoto();
        photo.fromUser("crew");
      });

      it("", function () {
        expect(photo.build()).toEqual("https://source.unsplash.com/user/crew/random");
      });

      it("with dimensions", function () {
        photo.size(200, 100);

        expect(photo.build()).toEqual("https://source.unsplash.com/user/crew/200x100/random");
      });
    });

    describe("returns a random photo from a category", function () {
      var photo;

      beforeEach(function () {
        photo = new SourcePhoto();
        photo.fromCategory("buildings");
      });

      it("", function () {
        expect(photo.build()).toEqual("https://source.unsplash.com/category/buildings/random");
      });

      it("with dimensions", function () {
        photo.size(200, 100);

        expect(photo.build()).toEqual("https://source.unsplash.com/category/buildings/200x100/random");
      });
    });

    describe("returns a random photo", function () {
      var photo;

      beforeEach(function () {
        photo = new SourcePhoto();
      });

      it("", function () {
        expect(photo.build()).toEqual("https://source.unsplash.com/random");
      });

      it("with dimensions", function () {
        photo.size(200,100);

        expect(photo.build()).toEqual("https://source.unsplash.com/200x100/random");
      });
    });
  });
});
