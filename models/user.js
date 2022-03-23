const Joi = require('joi');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const config = require('config');



 mongoose.connect(config.get('db'),{useNewUrlParser: true,  useUnifiedTopology: true})
.then(function(){
  console.log("DB Connected");
}).catch(err =>{
  console.log(err);
});

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50,
    },
    email: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 1024,
    },
    isAdmin: Boolean

});

userSchema.methods.generateAuthToken = function(){

    return jwt.sign({_id: this._id, isAdmin: this.isAdmin},config.get('jwtPrivateKey'));
};
const User = mongoose.model('User', userSchema);

function validateUser(user) {
    const schema = Joi.object({
        name: Joi.string().min(5).max(50).required(),
        email: Joi.string().min(5).max(255).required().email(),
        password: Joi.string().min(5).max(255).required(),

    });
    return schema.validate(user);
}
function validateLogin(req) {
    const schema = Joi.object({
       
        email: Joi.string().min(5).max(255).required().email(),
        password: Joi.string().min(5).max(255).required(),

    });
    return schema.validate(req);
}
exports.User = User;
exports.validate = validateUser;
exports.validateLogin = validateLogin;