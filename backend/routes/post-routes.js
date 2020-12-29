const express = require('express');
const { check } = require('express-validator');

const fileUpload = require('../middleware/file-upload');
const postsController = require('../controllers/posts-controller');

const router = express.Router();

router.get('/', postsController.getPosts);
router.post(
  '/',
  fileUpload.single('image'),
  [check('title').not().isEmpty(), check('content').not().isEmpty()],
  postsController.createPost
);
router.patch(
  '/:pid',
  fileUpload.single('image'),
  [check('title').not().isEmpty(), check('content').not().isEmpty()],
  postsController.updatePost
);
router.delete('/:pid', postsController.deletePost);
router.get('/:pid', postsController.viewPost);

module.exports = router;
