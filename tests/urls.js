describe("UnsplashPhoto", function () {

  it("exists", function () {
    expect(UnsplashPhoto).toBeDefined();
  });

  describe("#find", function () {
    it("sets the ID", function () {
      var photo = new UnsplashPhoto();

      photo.find("uniqueString");

      expect(photo.id).toEqual("uniqueString");
    });
  });

  describe("#width", function () {
    it("sets the width", function () {
      var photo = new UnsplashPhoto();

      photo.width(200);

      expect(photo.dimensions.width).toEqual(200);
    });
  });

  describe("#height", function () {
    it("sets the height", function () {
      var photo = new UnsplashPhoto();

      photo.height(200);

      expect(photo.dimensions.height).toEqual(200);
    });
  });

  describe("#size", function () {
    it("sets both dimensions", function () {
      var photo = new UnsplashPhoto();

      photo.size(200);

      expect(photo.dimensions.width).toEqual(200);
      expect(photo.dimensions.height).toEqual(200);
    });

    it("sets the width and height", function () {
      var photo = new UnsplashPhoto();

      photo.size(200, 100);

      expect(photo.dimensions.width).toEqual(200);
      expect(photo.dimensions.height).toEqual(100);
    });
  });

  describe("#all", function () {
    it("sets the scope to all", function () {
      var photo = new UnsplashPhoto();

      photo.all();

      expect(photo.scope).toEqual("all");
    });
  });

  describe("#of", function () {
    it("sets the keywords from an array", function () {
      var photo = new UnsplashPhoto();

      photo.of(["dog", "cat"]);

      expect(photo.keywords).toEqual("dog,cat");
    });

    it("sets the keywords from a comma-separated list", function () {
      var photo = new UnsplashPhoto();

      photo.of("dog, cat");

      expect(photo.keywords).toEqual("dog,cat");
    });
  });

  describe("#randomize", function () {
    it("defaults to having no interval", function () {
      var photo = new UnsplashPhoto();

      photo.randomize();

      expect(photo.randomizationInterval).toBeNull();
    });

    it("sets the interval to weekly", function () {
      var photo = new UnsplashPhoto();

      photo.randomize("weekly");

      expect(photo.randomizationInterval).toEqual("weekly");
    });

    it("sets the interval to daily", function () {
      var photo = new UnsplashPhoto();

      photo.randomize("daily");

      expect(photo.randomizationInterval).toEqual("daily");
    });

    it("doesn't set an interval if it is unsupported", function () {
      var photo = new UnsplashPhoto();

      photo.randomize("yearly");

      expect(photo.randomizationInterval).toBeNull();
    });
  });

  describe("#_hasDimensions", function () {
    it("returns true when dimensions are set", function () {
      var photo = new UnsplashPhoto();

      photo.width(200);
      photo.height(200);

      expect(photo._hasDimensions()).toBe(true);
    });
  });

  describe("#_appendDimensions", function () {
    it("adds the dimensions to the URL", function () {
      var photo = new UnsplashPhoto();

      photo.width(100);
      photo.height(200);

      expect(photo._appendDimensions()).toEqual("https://source.unsplash.com/100x200");
    });

    it("doesn't add the dimensions to the URL if they aren't set", function () {
      var photo = new UnsplashPhoto();

      expect(photo._appendDimensions()).toEqual("https://source.unsplash.com");
    });
  });

  describe("#_appendScope", function () {
    it("adds the scope to the URL", function () {
      var photo = new UnsplashPhoto();

      photo.all();

      expect(photo._appendScope()).toEqual("https://source.unsplash.com/all");
    });
  });

  describe("#_appendRandomization", function () {
    it("defaults to random", function () {
      var photo = new UnsplashPhoto();

      expect(photo._appendRandomization()).toEqual("https://source.unsplash.com/random");
    });
  });

  describe("#_appendKeywords", function () {
    it("adds keywords", function () {
      var photo = new UnsplashPhoto();

      photo.of("dog");

      expect(photo._appendKeywords()).toEqual("https://source.unsplash.com?dog");
    });

    it("doesn't add keywords if they aren't set", function () {
      var photo = new UnsplashPhoto();

      expect(photo._appendKeywords()).toEqual("https://source.unsplash.com");
    });
  });

  describe("#fetch", function () {

    describe("returns a specific photo", function () {
      var photo;

      beforeEach(function () {
        photo = new UnsplashPhoto();
        photo.find("6hxvm0NzYP8");
      });

      it("", function () {
        expect(photo.fetch()).toEqual("https://source.unsplash.com/6hxvm0NzYP8");
      });

      it("with dimensions", function () {
        photo.size(200, 100);

        expect(photo.fetch()).toEqual("https://source.unsplash.com/6hxvm0NzYP8/200x100");
      });
    });

    describe("returns a random photo from a user", function () {
      var photo;

      beforeEach(function () {
        photo = new UnsplashPhoto();
        photo.fromUser("crew");
      });

      it("", function () {
        expect(photo.fetch()).toEqual("https://source.unsplash.com/user/crew/random");
      });

      it("with dimensions", function () {
        photo.size(200, 100);

        expect(photo.fetch()).toEqual("https://source.unsplash.com/user/crew/200x100/random");
      });

      it("with interval", function () {
        photo.randomize("weekly");

        expect(photo.fetch()).toEqual("https://source.unsplash.com/user/crew/random,weekly");
      });

      it("with keywords", function () {
        photo.of("dog");

        expect(photo.fetch()).toEqual("https://source.unsplash.com/user/crew/random?dog");
      });


      it("with scope", function () {
        photo.all();

        expect(photo.fetch()).toEqual("https://source.unsplash.com/user/crew/all/random");
      });
    });

    describe("returns a random photo from a category", function () {
      var photo;

      beforeEach(function () {
        photo = new UnsplashPhoto();
        photo.fromCategory("buildings");
      });

      it("", function () {
        expect(photo.fetch()).toEqual("https://source.unsplash.com/category/buildings/random");
      });

      it("with dimensions", function () {
        photo.size(200, 100);

        expect(photo.fetch()).toEqual("https://source.unsplash.com/category/buildings/200x100/random");
      });

      it("with interval", function () {
        photo.randomize("daily");

        expect(photo.fetch()).toEqual("https://source.unsplash.com/category/buildings/random,daily");
      });

      it("with keywords", function () {
        photo.of("dog");

        expect(photo.fetch()).toEqual("https://source.unsplash.com/category/buildings/random?dog");
      });

      it("with scope", function () {
        photo.all();

        expect(photo.fetch()).toEqual("https://source.unsplash.com/category/buildings/all/random");
      });
    });

    describe("returns a random photo", function () {
      var photo;

      beforeEach(function () {
        photo = new UnsplashPhoto();
      });

      it("", function () {
        expect(photo.fetch()).toEqual("https://source.unsplash.com/random");
      });

      it("with dimensions", function () {
        photo.size(200,100);

        expect(photo.fetch()).toEqual("https://source.unsplash.com/200x100/random");
      });

      it("with interval", function () {
        photo.randomize();

        expect(photo.fetch()).toEqual("https://source.unsplash.com/random");
      });

      it("with keywords", function () {
        photo.of("dog");

        expect(photo.fetch()).toEqual("https://source.unsplash.com/random?dog");
      });

      it("with scope", function () {
        photo.all();

        expect(photo.fetch()).toEqual("https://source.unsplash.com/all/random");
      });
    });
  });
});
