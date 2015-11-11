'use strict';
const mongoose = require('mongoose'),
    fetch = require('isomorphic-fetch');

const Post = mongoose.model('Post', {
    created_at: mongoose.Schema.Types.Date,
    title: String,
    author: String,
    story_title: String,
    comment_text: String,
    story_url: String,
    objectID: {
        type: String,
        index: {
            unique: true,
            dropDups: true
        }
    }
});

function refresh() {
    fetch('http://hn.algolia.com/api/v1/search_by_date?query=nodejs')
        .then(res => res.json())
        .then(json => json.hits)
        .then(posts => posts.forEach(post => new Post(post).save()));
}

function find() {
    return Post.find({}).sort({
        created_at: -1
    }).limit(20);
}

function remove(objectID) {
    console.log(objectID);
    Post.remove({
        objectID
    }, function () {
        console.log(arguments);
    });
}

module.exports = {
    refresh,
    find,
    remove
};
