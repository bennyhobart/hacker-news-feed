'use strict';
const express = require('express'),
    path = require('path'),
    debug = require('debug')('expressapp'),
    mongoose = require('mongoose'),
    posts = require('./posts');

//Configure Mongoose
const mongoURL = process.env.MONGO_URL || 'mongodb://localhost/hacker-news-feed';
mongoose.connect(mongoURL);
process.on('SIGINT', () => mongoose.connection.close(() => {
    debug('mongoose disconnected');
    process.exit(0);
}));


//Set refresh time
posts.refresh();
setInterval(posts.refresh, 60 * 60 * 1000);

//Configure App
const app = express();
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.static(path.join(__dirname, 'public')));
app.get('/', (req, res) => {
    posts.getLatestPosts()
        .then((posts) => {
            res.render('index', {posts: posts});
        });
});

app.delete('/post/:id', function(req, res) {
    posts.remove(req.params.id)
        .then(() => res.send(req.params.id));
});

app.get('/refresh', function(req, res) {
    posts.refresh();
    res.send('REFRESH');
});

const port = process.env.PORT || 3000;
app.listen(port, () => debug(`listening on port ${port}`));

