const {User, validate} = require('../models/user');

const auth = require('../middleware/auth');
const jwt = require('jsonwebtoken');
const config = require('config');
const _ = require('lodash');
const mongoose = require('mongoose');
const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();

router.post('/', async (req,res) => {

    const {error} = validate(req.body);
    
    if(error) return res.status(400).send(error.details[0].message);
  
    let user = await User.findOne({email: req.body.email});
    if(user) return res.status(400).send('User already registered');
    user = new User(_.pick(req.body,['name','email','password']));

    //generate salt and encrypt
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);

    await user.save();

    const token = jwt.sign({_id: user._id},config.get('jwtPrivateKey'));

    res.header('x-auth-token',token).send(_.pick(user,['_id','name','email']));

   
});

router.get('/me',auth, async (req,res) => {
    const userId = req.user._id;
    
        const user = await User.findById(userId).select("-password");
        if(!user) return res.status(401).send("Something wrong");
    
        return res.send(user);   
});

module.exports = router;