const express = require("express");
const path = require("path");
const session = require('express-session');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const ejs = require('ejs');

const app = express();
app.use(express.static('public'));
app.use(session({
secret: 'mysecretkey',
resave: false,
saveUninitialized: true,
cookie: { secure: false }
}));
app.use(bodyParser.urlencoded({ extended: false }));

// app.get("/", (req, res) => {
//     res.sendFile(path.join(__dirname + "/index.ejs"));
// })

app.get('/', (req, res) => {

    res.render('index.ejs', { message: '' });
    
    });
app.post('/login', (req, res) => {
    const { username, password } = req.body;
    if (username && password) {
   // Check if user exists
   if (username === 'poorva278' && password, 'Poorva@278') {
   req.session.loggedin = true;
   req.session.username = username;
   res.redirect('/dashboard');
   } else {
    res.render('index.ejs', { message: 'Invalid username or password' });
   }
    } else {
   res.render('index.ejs', { message: 'Please enter username and password' });
    }
  });
  app.get('/dashboard', (req, res) => {
    if (req.session.loggedin) {
    res.render('dashboard.ejs', { username: req.session.username });
    } else {
    res.redirect('/');
    }
    });
    app.get('/logout', (req, res) => {
        req.session.destroy();
        res.redirect('/');
        });
        
        
        app.set('views', __dirname + '/views');
        app.set('view engine', 'ejs');

// serving the index.html file 

const server = app.listen(5000);
const portNumber = server.address().port;
console.log(`port: ${portNumber}`);
// can see the port number in terminal - you can dictate the port number