const mongoose = require("mongoose");
const { validationResult } = require("express-validator");

const HttpError = require("../utils/httperror");
const Poweruser = require("../models/poweruser");
const Posts = require("../models/post");

exports.getPosts = async (req, res, next) => {
  let fetchedPosts;
  try {
    fetchedPosts = await Posts.find()
      .sort({ dateCreated: -1 })
      .populate("creator", "displayName");
  } catch (err) {
    return next(
      new HttpError(
        "Connection to the DB server has been timed out, please try again.",
        500
      )
    );
  }

  if (!fetchedPosts) {
    return res
      .json(404)
      .json({ success: false, message: "failed to find posts." });
  }

  res.status(200).json({
    success: true,
    posts: fetchedPosts.map((post) => post.toObject({ getters: true })),
  });
};

//Roll back creation of the file if there's a validation error - handled in app.js
exports.createPost = async (req, res, next) => {
  if (!req.isAuth) {
    return next(
      new HttpError("You have to be logged in to perform this action", 401)
    );
  }

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new HttpError(
      "Invalid input, please check that the title and content are not empty.",
      422
    );
    return next(error);
  }
  const { content, creatorId, title } = req.body;

  let newPost = new Posts({
    dateCreated: Date.now(),
    dateModified: undefined,
    title,
    content,
    creator: creatorId,
  });
  let Keri;
  try {
    Keri = await Poweruser.findById(creatorId);
  } catch (err) {
    return next(
      new HttpError(
        "Connection to the DB server has been timed out, please try again.",
        500
      )
    );
  }

  try {
    const session = await mongoose.startSession();
    session.startTransaction();
    await newPost.save({ session: session });
    Keri.posts.push(newPost);
    await Keri.save({ session: session });
    await session.commitTransaction();

    //need the creator info in the front end - will be removed with the help of userAuth
    const newPostId = newPost._id;
    newPost = await Posts.findById(newPostId).populate(
      "creator",
      "displayName"
    );
  } catch (err) {
    console.log(err);
    return next(new HttpError("Failed to add post, please try again.", 500));
  }
  res.status(201).json({
    post: await newPost.toObject({ getters: true }),
  });
};

exports.updatePost = async (req, res, next) => {
  if (!req.isAuth) {
    return next(
      new HttpError("You have to be logged in to perform this action", 401)
    );
  }
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new HttpError(
      "Invalid input, please check that the title and content are not empty.",
      422
    );
    return next(error);
  }

  const postId = req.params.pid;
  const { title, content } = req.body;

  let postToUpdate;
  try {
    postToUpdate = await Posts.findById(postId).populate(
      "creator",
      "displayName"
    );
  } catch (err) {
    return next(
      new HttpError(
        "Connection to the DB server has been timed out, please try again.",
        500
      )
    );
  }

  if (!postToUpdate) {
    return next(new HttpError("Could no find the post you wish to edit", 404));
  }

  postToUpdate.title = title;
  postToUpdate.content = content;
  postToUpdate.dateModified = Date.now();

  try {
    await postToUpdate.save();
  } catch (err) {
    return next(
      new HttpError(
        "Connection to the DB server has been timed out, please try again.",
        500
      )
    );
  }
  res.status(200).json({ post: postToUpdate.toObject({ getters: true }) });
};

exports.deletePost = async (req, res, next) => {
  if (!req.isAuth) {
    return next(
      new HttpError("You have to be logged in to perform this action", 401)
    );
  }
  const postId = req.params.pid;

  let postToDelete;
  try {
    postToDelete = await Posts.findById(postId).populate("creator");
  } catch (err) {
    return next(
      "Connection to the DB server has been timed out, please try again",
      500
    );
  }

  if (!postToDelete) {
    return next("Failed to find a post to delete", 404);
  }

  try {
    const session = await mongoose.startSession();
    session.startTransaction();
    postToDelete.creator.posts.pull(postId);
    await postToDelete.creator.save({ session: session });
    await postToDelete.remove({ session: session });
    await session.commitTransaction();
  } catch (err) {
    console.log(err);
    return next(
      new HttpError(
        "Connection to the DB server has been timed out, please try again later",
        500
      )
    );
  }

  res.status(200).json({ message: "Post deleted." });
};

exports.viewPost = async (req, res, next) => {
  const postId = req.params.pid;

  let postToView;
  try {
    postToView = await Posts.findById(postId);
  } catch (err) {
    return next(
      "Connection to the DB server has been timed out, please try again later",
      500
    );
  }

  if (!postToView) {
    return next("Failed to find a post", 404);
  }

  res
    .status(200)
    .json({ success: true, post: postToView.toObject({ getters: true }) });
};
