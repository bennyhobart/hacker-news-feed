'use strict';
let express = require('express'),
    path = require('path'),
    mongoose = require('mongoose');

let app = express();
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.static(path.join(__dirname, 'public')));
app.get('/', (req, res) => res.render('index'));
app.delete('/post/:id', function(req, res) {
    res.send(req.params.id);
});

let port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server listening on ${port}`));
