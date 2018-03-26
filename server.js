



const express = require('express');
const path = require('path');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;
var app = express();

// app.use((req, res) => {
//     res.render('maintenance.hbs');
// });

app.use(express.static(__dirname+'/public'));
app.use((req, res, next) => {
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`;

    fs.appendFile('server.log', log+'\n', (err) => {
        if(err)
            console.log('Unable to append to server.log');
    });
    next();
});



app.set('view engine', 'hbs');
hbs.registerPartials(path.join(__dirname,'/views/partials'));


hbs.registerHelper('getFullYear', () => {
    return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
});


app.get('/', (req, res) => {
   res.render('home.hbs', {
       pageTitle: 'Home Page',
       welcomeMessage: 'Welcome to my website.'
      
   });
});

app.get('/about', (req, res) => {
   res.render('about.hbs', {
       pageTitle: 'About Page',
       welcomeMessage: 'Welcome!'
   });

});


app.get('/bad', (req, res) => {
    res.send({
        errorMesage: 'Error 404 not found'
    });
});

app.get('/projects', (req, res) => {
    res.render('projects.hbs', {
        pageTitle: 'Projects page',
        welcomeMessage: 'Welcome to projects page!'
    });
});


app.listen(port, () => {
    console.log('Server running at port 3000');
});