const assert = require("assert");
const User = require("../src/user.js");

describe("Creating records", () => {
  it("saves as user", done => {
    const joe = new User({ name: "Joe" });

    joe.save().then(() => {
      // Has joe been saved successfully?
      assert(!joe.isNew);
      done();
    });
  });
});
