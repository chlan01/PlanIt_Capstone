const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../../middleware/auth');
const checkObjectId = require('../../middleware/checkObjectId');

const Post = require('../../models/Post');
const User = require('../../models/User');

// #route   POST api/posts
// #desc    Create a post
// #access  Private
router.post(
    '/',
    auth,
    check('text', 'Text is required').not().isEmpty(),
    async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

        try {

        // We are logged in, we have the token which gives us the user id and puts it inside request.user.id
        // also we don't want to send the password back
        const user = await User.findById(req.user.id).select('-password');

        const newPost = new Post({
            text: req.body.text,
            name: user.name,
            avatar: user.avatar,
            user: req.user.id
          });

        const post = await newPost.save();
        //once we add the post we get it back in a response
        res.json(post);
            
        } catch(err) {
            console.error(err.message);
            res.status(500).send('Server Error'); 
        }
    }
);


// #route   GET api/posts
// #desc    Get all posts
// #access  Private
router.get('/', auth, async (req, res) => {
    try {
        // sorting by date to show the most recent post first ( oldest first, date: 1)
        const posts = await Post.find().sort({ date: -1 }); 
        res.json(posts);
    } catch(err) {
        console.error(err.message);
        res.status(500).send('Server Error'); 
    }
});

// #route   GET api/posts/:id
// #desc    Get post by ID
// #access  Private
router.get('/:id', auth, async (req, res) => {
    try {
        // request.params will allows to get the id from the URL 
        const post = await Post.findById(req.params.id); 
        
        // check if a same id post exists
        if(!post) { 
            return res.status(404).json({ msg: 'Post not found'});
        }

        res.json(post);
    } catch(err) {
        console.error(err.message);
        // if what is passed in as an id is not a valid objectid
        if(err.kind === 'ObjectId') { 
            return res.status(404).json({ msg: 'Post not found'});
        }
        // run this
        res.status(500).send('Server Error'); 
    }
});


// #route   DELETE api/posts/:id
// #desc    Delete a post
// #access  Private
router.delete('/:id', auth, async (req, res) => {
    try {
        // sorting by date to show the most recent post first ( oldest first, date: 1)
        const post = await Post.findById(req.params.id); 

        // if post doesn't exist throw 404 not found.
        if(!post) { 
            return res.status(404).json({ msg: 'Post not found'});
        }

        // the user that deletes the post is the one that created the post
        // post.user is object id not string - it will not match with user.id even if correct
        // if the user doesn't match the user that is logged in return 401 error code (not auth)
        if(post.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'User not authorized '});
        }

        await post.remove();

        res.json({ msg: 'Post removed'});
    } catch(err) {
        console.error(err.message);
        //if '/:id" isnt a valid object id, post error msg
        if(err.kind === 'ObjectId') { 
            return res.status(404).json({ msg: 'Post not found'});
        }
        res.status(500).send('Server Error'); 
    }
});


// #route   PUT api/posts/like/:id
// #desc    Like a post
// #access  Private
router.put('/like/:id', auth, async(req, res) => {
    try {
        const post = await Post.findById(req.params.id);

        // Check if the post has already been liked by the user (avoid infinite times)
        // compare the toString and if the length is >0 it means that it has already been liked
        if(post.likes.filter(like=> like.user.toString() === req.user.id).length > 0) {
            return res.status(400).json({ msg: 'Post already liked' });
        }

        // add it in the beginning (other wise .push)
        post.likes.unshift({ user: req.user.id });

        await post.save();

        res.json(post.likes);

    } catch(err) {
        console.error(err.message);
        res.status(500).send('Server Error')
    }
});


// #route   PUT api/posts/unlike/:id
// #desc    Like a post
// #access  Private
router.put('/unlike/:id', auth, async(req, res) => {
    try {
        const post = await Post.findById(req.params.id);

        // Check if the post has already been liked by the user (avoid infinite times)
        // compare the toString and if its equal to 0 we haven't liked it yet
        if(post.likes.filter(like=> like.user.toString() === req.user.id).length === 0) {
            return res.status(400).json({ msg: 'Post has not been liked' });
        }

        // get removed index
        const removeIndex = post.likes.map(like => like.user.toString().indexOf(req.user.id));

        post.likes.splice(removeIndex, 1);

        await post.save();

        res.json(post.likes);

    } catch(err) {
        console.error(err.message);
        res.status(500).send('Server Error')
    }
});


// #route   POST api/posts/comment/:id
// #desc    Comment on a post
// #access  Private
router.post(
    '/comment/:id',
    auth,
    check('text', 'Text is required').not().isEmpty(),
    async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

        try {

            // We are logged in, we have the token which gives us the user id and puts it inside request.user.id
            // also we don't want to send the password back
            const user = await User.findById(req.user.id).select('-password');

            const post = await Post.findById(req.params.id);

            const newComment = {
                text: req.body.text,
                name: user.name,
                avatar: user.avatar,
                user: req.user.id
            };

            post.comments.unshift(newComment);

            await post.save();
            
            //once we add the post we get it back in a response
            res.json(post.comments);
                
        } catch(err) {
            console.error(err.message);
            res.status(500).send('Server Error'); 
        }
    }
);

// #route   DELETE api/posts/comment/:id/:comment_id
// #desc    Delete comment
// #access  Private
router.delete('/comment/:id/:comment_id', auth, async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);

        // Get comment from the post
        const comment = post.comments.find(comment => comment.id === req.params.comment_id);

        // make sure comment exists
        if(!comment) {
            return res.status(404).json({ msg: 'Comment does not exist' });
        }
        
        //Check user
        // comment has the user property but its an object id
        if(comment.user.toString() != req.user.id) {
            return res.status(401).json({ msg: 'User not authorized' });
        }

        // get removed index
        const removeIndex = post.comments.map(comment => comment.user.toString().indexOf(req.user.id));

        post.comments.splice(removeIndex, 1);

        await post.save();

        res.json(post.comments);

    } catch(err) {
        console.error(err.message);
        res.status(500).send('Server Error');   
    }
});



module.exports = router;