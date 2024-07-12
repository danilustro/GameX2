const express = require('express');
const multer = require('multer');
const Post = require('../models/Post');
const router = express.Router();
const authMiddleware = require('../middleware/auth');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  },
});
const upload = multer({ storage });

// Creazione post
router.post('/', authMiddleware, upload.single('media'), async (req, res) => {
  const post = new Post({
    userId: req.user.id,
    description: req.body.description,
    mediaUrl: req.file.path,
  });
  await post.save();
  res.status(201).send('Post created');
});



module.exports = router;
