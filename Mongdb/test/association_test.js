const assert = require("assert");
const User = require("../src/user");
const Comment = require("../src/comment");
const BlogPost = require("../src/blogpost");

describe("Assocations", () => {
  let joe, blogPost, comment;

  beforeEach(done => {
    joe = new User({ name: "joe" });
    blogPost = new BlogPost({
      title: "JS is Great",
      content: "Yep it really is"
    });
    comment = new Comment({ content: "Congrats on great post" });

    joe.blogPosts.push(blogPost); //Has many relations
    blogPost.comments.push(comment); //Has many relations
    comment.user = joe; //Has one relations

    Promise.all([joe.save(), blogPost.save(), comment.save()]).then(() =>
      done()
    );
  });

  it("saves a relation between a user and a blogpost", done => {
    User.findOne({ name: "joe" })
      .populate("blogPosts")
      .then(user => {
        console.log(user);
        assert(user.blogPosts[0].title === "JS is Great");
        done();
      });
  });

  it("saves a full relation graph", done => {
    User.findOne({ name: "joe" })
      .populate({
        path: "blogPosts",
        populate: {
          path: "comments",
          model: "comment",
          populate: {
            path: "user",
            model: "user"
          }
        }
      })
      .then(user => {
        console.log("full graph", user.blogPosts[0].comments[0]);
        assert(user.name === "joe");
        assert(user.blogPosts[0].title === "JS is Great");
        assert(
          user.blogPosts[0].comments[0].content === "Congrats on great post"
        );
        assert(user.blogPosts[0].comments[0].user.name === "joe");

        done();
      });
  });
});
