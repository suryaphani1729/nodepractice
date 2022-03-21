const morgan = require('morgan');
const express = require('express');

const app = express();


app.set('view engine', 'pug');  // no need of required
app.set('views','./views');

if(app.get('env') === 'development') {
    app.use(morgan('tiny'));
}

require('./startup/validation')();
require('./startup/config')(app);
require('./startup/logging')();
require('./startup/db')();
require('./startup/routes')(app);

app.get('/', (req,res)=>{
    res.render('index',{title:'Title',message:'Message'});
    
});

const port = process.env.PORT || 3000;
app.listen(port, ()=>{
    console.log(`Listening: ${port} `);
});