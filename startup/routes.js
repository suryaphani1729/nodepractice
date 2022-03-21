const express = require('express');
const errorLog = require('../middleware/error'); 
const courses = require('../routes/courses');
const users = require('../routes/users');
const auth = require('../routes/auth');
const helmet = require('helmet');

module.exports = function(app) {
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(express.static('public'));
    app.use(helmet());
app.use('/api/courses',courses);
app.use('/api/users',users);

app.use('/api/auth',auth);
//error handler
app.use(errorLog);
}