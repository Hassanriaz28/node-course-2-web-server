const express=require('express');
const hbs = require ('hbs');
const fs= require('fs');
const port=process.env.PORT || 3000;

var app=express();

hbs.registerPartials(__dirname +'/views/partials');
app.set('view engine','hbs');

app.use((req,res,next)=>{
    var now = new Date().toString();
    var log=`${now}: ${req.method} ${req.url}`;
    console.log(log);
    fs.appendFile('server.log', log + '\n',(err)=>{
        if (err)
        {
            console.log('Unable to append to Server.log');
        }
    });
    next();
});

// app.use((req,res,next)=>
// {
//     res.render('maintenance.hbs');
// });

app.use(express.static(__dirname + '/public'));


hbs.registerHelper('getCurrentYear',()=>{
    return new Date().getFullYear()
});

hbs.registerHelper('screamIt',(text)=>
{
    return text.toUpperCase();
})

app.get ('/',(req,res)=>
{    res.render('home.hbs',{
         welcomeMessage:'Welcome to my Website',        
        pageTitle:'Home Page',
    });

});   
   // res.send('<h1>Hello Hassan</h1>');
       
   

 app.get('/about',(req,res)=>{
     res.render('about.hbs',{
        pageTitle:'About Page',
         welcomeMessage:'Welcome to my Website',        
        
     }); 
 });

 app.get('/projects',(req,res)=>{
     res.render('projects.hbs',{
        pageTitle:'Project Page',
         welcomeMessage:'Welcome to my Website',        
        
     }); 
 });

app.get('/bad',(req,res)=>
{
    res.send({
        errorMessage: 'Unable to handle request'
    });
})

app.listen(port,()=>
{
    console.log(`Server is up on port ${port}`);
});