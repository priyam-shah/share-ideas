// we will add all routes that has something to do with posts
import express from "express";

import {
  getPosts,
  getPostsBySearch,
  getPost,
  createPost,
  updatePost,
  likePost,
  commentPost,
  deletePost,
} from "../controllers/posts.js";

const router = express.Router();
import auth from "../middleware/auth.js";

router.get("/search", getPostsBySearch);
// since we are in the post.js all of the routes begin with post
// - so no need to write /post/search
router.get("/", getPosts);
router.get("/:id", getPost);

router.post("/", auth, createPost);

// patch is used to update existing documents
router.patch("/:id", auth, updatePost);
router.delete("/:id", auth, deletePost);
router.patch("/:id/likePost", auth, likePost);
router.post("/:id/commentPost", auth, commentPost);

export default router;
