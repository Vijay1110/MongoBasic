const assert = require("assert");
const User = require("../src/user");

describe("Subdocuments", () => {
  it("can create a subdocument", done => {
    const joe = new User({ name: "joe", posts: [{ title: "PostTitle" }] });

    joe
      .save()
      .then(() => User.findOne({ name: "joe" }))
      .then(user => {
        assert(user.posts[0].title === "PostTitle");
        done();
      });
  });

  it("Can add subdocuments to an existing records", done => {
    const joe = new User({
      name: "joe",
      posts: []
    });
    joe
      .save()
      .then(() => User.findOne({ name: "joe" }))
      .then(user => {
        user.posts.push({ title: "New Posts" });
        return user.save();
      })
      .then(() => User.findOne({ name: "joe" }))
      .then(user => {
        assert(user.posts[0].title === "New Posts");
        done();
      });
  });

  it("Can remove an existing subdocument", done => {
    const joe = new User({
      name: "joe",
      posts: [{ title: "New Title" }]
    });

    joe
      .save()
      .then(() => User.findOne({ name: "joe" }))
      .then(user => {
        // user.posts[0].remove();
        const post = user.posts[0];
        post.remove();
        return user.save();
      })
      .then(() => User.findOne({ name: "joe" }))
      .then(user => {
        assert(user.posts.length === 0);
        done();
      });
  });
});
