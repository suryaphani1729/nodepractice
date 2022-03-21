const jwt = require('jsonwebtoken');
const config = require('config');
// we can add this middleware after auth so that it will continue the authorization/validation
module.exports = function(req,res,next) {
    if(!req.user.isAdmin) return res.status(403).send('Acces denied');
    next();
    
}

