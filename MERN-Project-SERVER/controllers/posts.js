// we r going to create all handlers for our routes
// sort of Abstract class
// here all logic will be written

import express from "express";
import mongoose from "mongoose";

import PostMessage from "../models/PostMessage.js";

const router = express.Router();

export const getPosts = async (req, res) => {
  //res.send("This Works!");
  const { page } = req.query;

  try {
    const LIMIT = 8;
    const startIndex = (Number(page) - 1) * LIMIT; // get the starting index of every page

    const total = await PostMessage.countDocuments({});
    const posts = await PostMessage.find()
      .sort({ _id: -1 })
      .limit(LIMIT)
      .skip(startIndex);

    res.json({
      data: posts,
      currentPage: Number(page),
      numberOfPages: Math.ceil(total / LIMIT),
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
// callback function () => will get executed once someone visits local host file 5000/
// PostMessage.find() takes time that means it is an asynchronous acton -->
//     so we add await in front of it and therefore we have to make this function async
// res.status(200); --> return ( true / every thing went ok)

// Query -> /posts?page=1 -> page = 1
// PARAMS -> /posts/:id (replace :id with our id -> /posts/123) -> id = 123
// usage:
// Query -> if we want ot query some data like search
// PARAMS -> if we want to get some specefic sesource like post/:id
export const getPostsBySearch = async (req, res) => {
  const { searchQuery, tags } = req.query;

  try {
    const title = new RegExp(searchQuery, "i");
    // i stands for ignore case ie test = Test = TEST

    const posts = await PostMessage.find({
      $or: [{ title }, { tags: { $in: tags.split(",") } }],
    });

    res.json({ data: posts });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getPost = async (req, res) => {
  const { id } = req.params;

  try {
    const post = await PostMessage.findById(id);

    res.status(200).json(post);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const createPost = async (req, res) => {
  //res.send("post creation");

  const post = req.body;

  const newPostMessage = new PostMessage({
    ...post,
    creator: req.userId,
    createdAt: new Date().toISOString(),
  });

  try {
    await newPostMessage.save();

    res.status(201).json(newPostMessage);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};
// general http status codes
//  1-- INFO  2-- SUCESS  3-- REDIRECTION 4-- CLIENT ERR  5-- SERVER ERRORS

export const updatePost = async (req, res) => {
  // extracting id
  const { id } = req.params;
  //  while using object destructuring we can rename rename our properties
  // - so thats why we rename id to _id

  const { title, message, creator, selectedFile, tags } = req.body;

  // check wether this _id is really a mongoose object id
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No post with id: ${id}`);

  // else if the id is valid we cna update our post
  // send post and id as well --> newly updated post = { ...post, _id }
  const updatedPost = { creator, title, message, tags, selectedFile, _id: id };

  await PostMessage.findByIdAndUpdate(id, updatedPost, { new: true });

  res.json(updatedPost);
};

export const deletePost = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No post with id: ${id}`);

  await PostMessage.findByIdAndRemove(id);

  res.json({ message: "Post deleted successfully." });
};

export const likePost = async (req, res) => {
  const { id } = req.params;

  if (!req.userId) {
    return res.json({ message: "Unauthenticated" });
  }

  // check wether we have post user wants to like
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No post with id: ${id}`);

  // then we get the actual post
  const post = await PostMessage.findById(id);

  // see if the user's id is already in the like section or not
  const index = post.likes.findIndex((id) => id === String(req.userId));

  // if id is  not present only then index will be equal to -1
  if (index === -1) {
    post.likes.push(req.userId);
  } else {
    post.likes = post.likes.filter((id) => id !== String(req.userId));
  }
  const updatedPost = await PostMessage.findByIdAndUpdate(id, post, {
    new: true,
  });
  res.status(200).json(updatedPost);
};

export const commentPost = async (req, res) => {
  const { id } = req.params;
  const { value } = req.body;

  // getting the post from the database
  const post = await PostMessage.findById(id);

  // adding the comments to that post
  post.comments.push(value);

  // updating the db so that the new post contains that new comment
  // finally - storing the value of that post in our updatedPost var
  const updatedPost = await PostMessage.findByIdAndUpdate(id, post, {
    new: true,
  });

  res.json(updatedPost);
};

export default router;
