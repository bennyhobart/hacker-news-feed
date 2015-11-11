'use strict';
const express = require('express'),
    path = require('path'),
    mongoose = require('mongoose'),
    posts = require('./posts');

const mongoURL = process.env.MONGO_URL || 'mongodb://localhost/hacker-news-feed';
mongoose.connect(mongoURL);
process.on('SIGINT', () => mongoose.connection.close(() => {
    console.log('Mongoose disconnected');
    process.exit(0);
}));


//Refresh posts every 60 minutes
posts.refresh();
setInterval(posts.refresh, 60 * 60 * 1000);

const app = express();
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.static(path.join(__dirname, 'public')));
app.get('/', (req, res) => {
    posts.find().then((posts) => {
        res.render('index', {posts: posts});
    });
});
app.delete('/post/:id', function(req, res) {
    posts.remove(req.params.id);
    res.send(req.params.id);
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server listening on ${port}`));

