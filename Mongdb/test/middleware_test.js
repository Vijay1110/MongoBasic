const mongoose = require("mongoose");
const assert = require("assert");
const User = require("../src/user");
const BlogPost = require("../src/blogpost");

describe("Middleware", () => {
  beforeEach(done => {
    joe = new User({ name: "joe" });
    blogPost = new BlogPost({
      title: "JS is Great",
      content: "Yep it really is"
    });

    joe.blogPosts.push(blogPost); //Has many relations

    Promise.all([joe.save(), blogPost.save()]).then(() => done());
  });

  it("users clean up dangling blogposts on remove", done => {
    joe.remove()
      .then(() => BlogPost.count())
      .then((count) => {

        assert(count === 0);
        done();
      });
  });
});
