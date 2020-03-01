const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BlogPostsSchema = new Schema({
  title: String,
  content: String,
  comments: [{ type: Schema.Types.ObjectId, ref: "comment" }]
});

const BlogPost = mongoose.model("blogpost", BlogPostsSchema);

module.exports = BlogPost;
