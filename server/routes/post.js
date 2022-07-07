const express = require("express");
const Post = require('../models/post');
const router = express.Router();


router
  .post('/create', async (req, res) => {
    try {
      const post = await Post.newPost(req.body.UserId, req.body.PostId, req.body.PostName, req.body.PostDate, req.body.description);
      res.send({...post});
    } catch(error) {
      res.status(401).send({ message: error.message });
    }
  })

  .post('/viewpost', async (req, res) => {
    try {
      const post = await Post.viewPost(req.body.UserId);
      res.send({...post});
    } catch(error) {
      res.status(401).send({ message: error.message }); 
    }
  })

  .put('/update', async (req, res) => {
    try {
      const post = await Post.updatePost(req.body.pid, req.body.newdescription);
      res.send({...post});
    } catch(error) {
      res.status(401).send({ message: error.message });
    }
  })

  .delete('/delete', async (req, res) => {
    try {
      await Post.deletePost(req.body.pid);
      res.send({ success: "Post deleted" });
    } catch(error) {
      res.status(401).send({ message: error.message });
    }
  })


module.exports = router;