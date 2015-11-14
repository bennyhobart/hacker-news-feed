'use strict';
const mongoose = require('mongoose'),
    fetch = require('isomorphic-fetch'),
    debug = require('debug')('expressapp');

const Post = mongoose.model('Post', {
    created_at: mongoose.Schema.Types.Date,
    author: String,
    title: String,
    story_title: String,
    url: String,
    story_url: String,
    objectID: {
        type: String,
        unique: true
    },
    deleted: {
        type: Boolean,
        default: false
    }
});


/**
 * saves the given post to the database
 * @param  {object} post
 */
function savePost(post) {
    if(!post.story_title && !post.title) {
        debug(`did not add post ${post.objectID}`);
        return;
    }
    new Post(post).save();
    return;
}

/**
 * gets the latest posts from the API and saves them to the database
 */
function refresh() {
    debug('refreshing posts');
    return fetch(process.env.API_URL || 'http://hn.algolia.com/api/v1/search_by_date?query=nodejs')
        .then(res => res.json())
        .then(json => json.hits)
        .then(posts => posts.forEach(savePost));
}

/**
 * gets the latest posts from the database
 * @return {Promise} - resolves with a list of up to 20 posts, rejects with Mongoose error
 */
function getLatestPosts() {
    return Post.find({deleted: false})
        .sort({created_at: -1})
        .limit(20);
}

/**
 * removes post with give objectID as deleted in db
 * @param  {String} objectID
 * @return {Promise} - resolves when marked as deleted, rejects with Mongoose error
 */
function remove(objectID) {
    return Post.findOneAndUpdate({objectID}, {
        deleted: true
    }).then(() => debug(`marked deleted post: ${objectID}`));
}

module.exports = {
    refresh,
    getLatestPosts,
    remove
};
