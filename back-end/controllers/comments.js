var models = require('../models');
var Comment = models.Comment;
var TextPost = models.TextPost;
 
function create(req, res) {
   
   Comment.create(req.body, function(err, comment){
     if (err) res.end(err);
     else {
       TextPost.findById(req.params.post_id, function(err, post) {
         if (err) res.send(err);
         else {
           post.comments.push(comment);
           post.save();
           res.json(comment);
         }
       })
     }
   });
}
 
 function update(req, res) {
   Comment.findOneAndUpdate(req.params.comment_id, 
     {$set: req.body}, {"new": true}, function(comment_err, updatedComment){
     if (comment_err) res.send(comment_err);
     else {
 
       // Find TextPost that the updated Comment belongs to
       TextPost.findById(req.params.post_id, function(post_err, post) {
         if (post_err) res.send(post_err);
 
         // Update Comment in the TextPost's comments array as well
         var commentToUpdate = post.comments.id(req.params.comment_id);
         commentToUpdate.content = updatedComment.content
         commentToUpdate.votes = updatedComment.votes
 
         post.save(function() {
           res.json(updatedComment);
         });
       });
    }
  });
}

function destroy(req, res) {
	Comment.findByIdAndRemove(req.params.comment_id, function(comment_err){
    if (comment_err) res.send(comment_err);
    else {
  
       // Find TextPost that the deleted Comment belongs to
       // Delete Comment in the TextPost's comments array as well
       TextPost.findByIdAndUpdate(req.params.post_id, 
         { $pull: { comments: { _id: req.params.comment_id } } }, function(post_err) {
         if (post_err) res.send(post_err);
         res.send('comment deleted');
       });
     }
   });
}
 
module.exports.create = create;
module.exports.update = update;
module.exports.destroy = destroy;