const auth = require('../middleware/auth');
const express = require('express');
const Joi = require('joi');
const router = express.Router();
const courses = [
    {
        id:1001,
        name:'Java'
    },
    {
        id:1002,
        name:'C'
    },
    {
        id:1003,
        name:'Dart'
    },
];
router.get('/:id', (req,res)=>{
    const course = courses.find(obj => obj.id === parseInt(req.params.id));
    if(!course) res.status(404).send( "Not found");
     res.send(course);
    res.end();
});
router.get('/',auth, (req,res)=>{
   
     res.send(courses);
    res.end();
});
router.post('/',auth, (req,res)=>{
    const schema = Joi.object({
        name: Joi.string().min(3).required()
    });
    const result = schema.validate(req.body);
    if(result.error) {
        res.status(400).send(result.error.details[0].message);
        return;
    }
    // if(!req.body.name || req.body.name.length<3) {
    //     res.status(400).send("Name is required and <3 chars");
    //     return;
    // }
   const course = {
       id: courses.length+1,
       name: req.body.name
   };
   courses.push(course);
    res.send(course);
   res.end();
});

module.exports = router;