const {User, validateLogin} = require('../models/user');
const auth = require('../middleware/auth');
const mongoose = require('mongoose');
const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();

router.post('/', async (req,res) => {

    const {error} = validateLogin(req.body);
    
    if(error) return res.status(400).send(error.details[0].message);
  
    let user = await User.findOne({email: req.body.email});
    if(!user) return res.status(400).send('Invalid Email or Password');

    const validPassword = bcrypt.compare(req.body.password, user.password);

    if(!validPassword) {
        return res.status(400).send('Invalid Email or Password');
    }
    const token =  user.generateAuthToken();
    res.send({token});
});

module.exports = router;