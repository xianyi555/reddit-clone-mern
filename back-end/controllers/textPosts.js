var models = require('../models');
var TextPost = models.TextPost;


function index(req, res) {
  TextPost.find({}, function(err, posts) {
    if (err) res.send(err);
    else res.json(posts);

  });
}

function create(req, res) {
  TextPost.create(req.body, function(err, post) {
    if (err) res.send(err);
    else res.json(post);
  });
}

function show(req, res) {
  // find one textpost by id and send it back as JSON
  TextPost.findById(req.params.post_id, function(err, post) {
    if (err) res.send(err);
    else res.json(post);
  });
}

function update(req, res) {
  TextPost.findByIdAndUpdate(req.params.post_id, 
     {$set: req.body}, {"new": true}, function(err, updatedPost){
     if (err) res.send(err);
     else res.json(updatedPost);
  });
}

function destroy(req, res) {
  TextPost.findByIdAndRemove(req.params.post_id, function(err, post){
    if (err) res.send(err);
    else res.send("post deleted");
  });

}

module.exports.index = index;
module.exports.create = create;
module.exports.show = show;
module.exports.update = update;
module.exports.destroy = destroy;