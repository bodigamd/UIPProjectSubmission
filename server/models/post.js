const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  UserId: { type: String, required: true},
  PostId: { type: String, required: true},
  PostName: { type: String, required: true},
  PostDate: { type: String, required: true},
  description: { type: String, required: true}
});


const Post = mongoose.model("Post", postSchema);


async function newPost(UserId, PostId, PostName, PostDate, description) {

  const newPost = await Post.create({
    UserId: UserId,
    PostId: PostId,
    PostName: PostName,
    PostDate: PostDate,
    description: description
  });

  return newPost;
}


async function viewPost(pid) {
    const post = await Post.find({"UserId": pid});
    console.log("here");
    return post;
}


async function updatePost(pid, newdescription) {
  const post = await Post.updateOne({"_id": pid}, {$set: { description: newdescription}});
  return post;
}


async function deletePost(pid) {
  await Post.deleteOne({"_id": pid});
};


module.exports = { 
    newPost, viewPost, updatePost, deletePost 
};