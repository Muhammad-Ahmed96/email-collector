const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const {MongoClient} = require('mongodb');
const path = require('path');
const User = require('./models/user');

mongoose.set('strictQuery', true);
const expressHbs = require('express-handlebars');

const express = require('express');

const MONGODB_URI = 'mongo db connection string'
const app = express();

// const client = new MongoClient(MONGODB_URI);

app.set('view engine', 'hbs');
app.set('views', 'views'); //optional

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.engine('hbs', expressHbs.engine({ layoutsDir: 'views/layouts/', defaultLayout: 'main', extname: 'hbs' }));
app.post('/post-form', (req, res, next) => {
  const user = new User({
    email: req.body.email,
    type: req.body.type,
  })
  user.save()
    .then(result => {
      console.log('User Created');
      res.redirect("/");
    }).catch(err => {
      console.log(err);
    })
})
app.get('/', (req, res, next) => {
  res.render("index")
})

mongoose.connect(MONGODB_URI)
  .then(result => {
    console.log('server running');
    app.listen(4000);
  }).catch(err => console.log(err));