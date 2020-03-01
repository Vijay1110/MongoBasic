const mongoose = require("mongoose");
const PostSchema = require("./post");
const Schema = mongoose.Schema;

//Creation of Schema (User Schema)
const UserSchema = new Schema({
  name: {
    type: String,
    validate: {
      validator: name => name.length > 2,
      message: "Name must be longer than 2 characters"
    },
    required: [true, "Name is required."]
  },
  posts: [PostSchema],
  likes: Number,
  blogPosts: [
    {
      type: Schema.Types.ObjectId,
      ref: "blogpost"
    }
  ]
});

UserSchema.virtual("postCount").get(function () {
  return this.posts.length;
});


//Pre middle have essue
UserSchema.pre('remove', function (next) {
  const BlogPost = mongoose.model("blogPost");
  // this === joe

  BlogPost.remove({ _id: { $in: this.blogPosts } }).then(() => next());
});

//Creation of User Model
const User = mongoose.model("user", UserSchema);

module.exports = User;
