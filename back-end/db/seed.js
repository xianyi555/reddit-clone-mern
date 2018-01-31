var models = require('../models');
var TextPost = models.TextPost;
var Comment = models.Comment;

let commentsList = [{
     content: 'Comment A',
     votes: 6
   }, {
     content: 'Comment B',
     votes: 3
   }, {
     content: 'Comment C',
     votes: 12
   }
];


//TextPosts LIST VARIABLE
var textPostsList = [{
     title: 'Title', 
     content: 'Content',
     thumbnail_image_url: 'http://www.readersdigest.ca/wp-content/uploads/2011/01/4-ways-cheer-up-depressed-cat.jpg',
     votes: 3,
     comments: [commentsList[0], commentsList[1]]
   }, {
     title: 'Another Title',
     content: 'Some more content',
     thumbnail_image_url: 'http://www.petmd.com/sites/default/files/sleepy-cat-125522297.jpg',
     votes: 8,
     comments: [commentsList[2]]
   }, {
     title: 'My Last Title',
     content: 'Yo some dope content',
     thumbnail_image_url: 'https://ichef.bbci.co.uk/news/1024/cpsprodpb/693C/production/_95804962_p0517py6.jpg',
     votes: 12,
     comments: []
   }
];




Comment.remove({}, function(err, res) {
   if (err) {
     console.log('Error removing comments: ', err);
     process.exit();
   }
   console.log('Removed all Comments');
 
   Comment.create(commentsList, function(err, comments) {
     if (err) {
       console.log('Error creating comments: ', err);
     }
     console.log('Created', comments.length, 'comments');
   })
 });


textPostsList.forEach(function(textPost) {
  textPost.comments = commentsList;
});


TextPost.remove({}, function(err, textPosts){
  // code in here runs after all textPosts are removed
  TextPost.create(textPostsList, function(err, textPosts){
    // code in here runs after all textPosts are created
    if (err) { return console.log('ERROR', err); }
    console.log("all textPosts:", textPosts);
    console.log("created", textPosts.length, "textPosts");
  }); // end remove function
});

  // Comment.create(commentsList);
