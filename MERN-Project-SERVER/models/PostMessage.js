import mongoose from "mongoose";

// creating a mongoose schema
// with schema mongoose allows us to have a sort of uniformity to our documents
const postSchema = mongoose.Schema({
  title: String,
  message: String,
  name: String,
  creator: String,
  tags: [String],
  selectedFile: String,
  // likeCount: {
  //   type: Number,
  //   default: 0,
  // },
  likes: {
    type: [String],
    default: [],
  },
  comments: { type: [String], default: [] },
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

// converting schema into model

var PostMessage = mongoose.model("PostMessage", postSchema);

export default PostMessage;
// exporting mongoose model from the post message file
// on this model we can run commands such as find, create, delete and update
