const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();

const port = process.env.PORT || 3000;

//setting suport for partials ie footer and header
hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');


//----------LOGGER
//next tells you when yor middleware app is done
//logs all the requests made to server with the time
app.use((req, res, next) => {
  var now = new Date().toString();
  var log = `${now}:${req.method} ${req.url}`;
  console.log(log);
  //this has to be like this or you will receive a depreication error
  //this is futureproof
  fs.appendFile('server.log', log + '\n', (err) => {
    if (err){
      console.log('Unable to append to server.log');
    }
  });
  //me just testing what is in the request
  // console.log(`computer data: ${req.rawHeaders[2]}`);
  next();
});
//------------------------

//-----------MAINTENANCE PAGE MIDDLEWARE
//this function loads the website getting updated
// app.use((req, res, next) => {
//   res.render('maintenance');
// })
//------------------------


//example of middleware loading static files
app.use(express.static(__dirname + '/public'));


//example of a helper that templates can run
hbs.registerHelper('getCurrentYear',() => {
  return new Date().getFullYear();

});

//example of a helper
hbs.registerHelper('screenIt', (text) => {
  return text.toUpperCase();
});




//takes two arguments 1st URl 2nd function to run, what to send back
app.get('/', (req , res) => {
  // res.send('<h2>Hello Express!</h2>');
  res.render('home', {
    pageTitle: 'Home Page',
    welcomeMessage: 'Welcome to the worlds best NPM site'
  })
});

app.get('/about', (req, res) => {
  res.render('about', {
    pageTitle: 'About Page'
  });
});

app.get('/projects', (req , res) => {
  res.render('projects',{
    pageTitle: 'Projects Page'
  });
});

//bad requests
app.get('/bad', (req, res) => {
  res.send({
    errorMessage: 'Error Handling the request!'
  });
});

//bind application to a port
app.listen(port, () => {
  console.log(`Server is running, view at ${port}`);
});
