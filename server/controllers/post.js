const Post = require('../models/post');
const slugify = require('slugify');
const { response } = require('express');

exports.create = (req, res) => {
  
    const { title, content, date, grade, user } = req.body;
    const slug = slugify(title);
    // Validate if empty
    switch (true) {
        case !title:
            return res.status(400).json({ error: 'Title is required' });
            break;
        case !content:
            return res.status(400).json({ error: 'Content is required' });
            break;
        case !date:
            return res.status(400).json({ error: 'Date is required' });
            break;
        case !grade:
            return res.status(400).json({ error: 'Grade is required' });
            break;
    }
    // Create post
    Post.create({ title, content, date, grade, slug, user }, (err, post) => {
        if (err) {
            console.log(err);
            res.status(400).json({ error: 'Duplicate post. Try another title' });
        }
        res.json(post);
    });
};

 // List all posts
 exports.list = (req, res) => {
    Post.find({})
    .limit(5)
    .sort({date: -1})
    .exec((err, post) => {
        if(err) console.log(err)
        res.json(post);
    })
}

// Get single post
exports.read = (req, res) => {
    const {slug} = req.params;
    Post.findOne({slug})
    .exec((err, post) => {
        if(err) console.log(err)
        res.json(post);
    })
}

// Update post
exports.update = (req, res) => {
    const { slug } = req.params;
    const { title, content, date, grade, user } = req.body;
    Post.findOneAndUpdate({ slug }, { title, content, date, grade, user }, { new: true }).exec((err, post) => {
        if (err) console.log(err);
        res.json(post);
    });
};

// Delete post
exports.remove = (req, res) => {
    // console.log(req.pramas.slug)
    const { slug } = req.params;
    Post.findOneAndRemove({ slug }).exec((err, post) => {
        if (err) console.log(err);
        res.json({
            message: 'Inlägget raderades'
        });
    });
};