const express = require('express');
const app = express();
const {projects} = require('./data.json')
const port = 3000;

//Set up your middleware
app.set('view engine', 'pug');
app.use('/static', express.static('public'));

//Set your routes
app.get('/', (req, res) => {
    console.log(projects);
    res.render('index',{projects});
});

app.get('/about', (req, res) => {
    res.render('about');
});

app.get('/projects/:id', (req,res) =>{
    let project = projects.find(function (project){
        return project.id == req.params.id
    }) 
    if (project) {
        res.render('project', {id:req.params.id, project})
    } else {
        const err = new Error();
        err.status = 404;
        err.message =  'The project you are looking for does not exist';
        throw err;
    }
});

// 404 Error Handler  
app.use((req,res, next)=>{
    const err = new Error();
    err.status = 404;
    err.message = 'Oops! Please check if you are using the correct URL!';
    console.log(err.message);
    next(err);
});

// Global Error Handler
app.use((err,req,res,next)=>{
    err.status = err.status||500;
    err.message = err.message|| "There was a server error!";
    res.status(err.status);
    res.send(`Error Code: ${err.status}: ${err.message}`);
    console.log(err)
});

// portListen

app.listen(port,()=>{
    console.log("The application is running on localhost:3000")
});

