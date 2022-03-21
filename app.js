// const Logger = require('./emmitters');

// const logger = new Logger();
// logger.on('messageLogged',(arg) => {
//   console.log('Listener',arg);
// });
// logger.emit('messageLogged', "First message");
// const http = require('http');
// const server = http.createServer((req,res) => {
//     res.write('Hello');
//     res.end();
// });
// server.on('connection', (stream) => {
//     console.log('someone connected!', stream);
//   });
// server.listen('3000')


//
const mongoose= require('mongoose');

mongoose.connect('mongodb://localhost/playground',{useNewUrlParser: true,  useUnifiedTopology: true}).then(()=>{
  console.log("DB Connected");
}).catch(err =>{
  console.log(err);
});

const courseSchema = mongoose.Schema({
 name: String,
 author: String,
 tags: [String],
 date: {type:Date, default: Date.now},
 isPublished: Boolean,
});

const Course = mongoose.model('Course', courseSchema);

async function createCourse() {
  const course = new Course({
    name: 'NodeJs',
    author: 'Author1',
    tags: ['Javascript', 'Server'],
    isPublished: true
   });
   const result = await course.save();
  return result;
}
async function getCourses(){
  const courses = await Course.find({isPublished:false});
  console.log(courses);
  return courses;
}

getCourses(); 
