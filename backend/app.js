const express = require('express');
const mongoose = require('mongoose');
// import pckge giving access to the path of our file system
const path = require('path');
const dotenv = require('dotenv').config();

const stuffRoutes = require("./routes/stuff");
const userRoutes = require("./routes/user");

const app = express();


// general middleware - no specific route 
// this middleware will be applied to all the requests sent to our server
// this will enable the app to access the API without problem
app.use((req, res, next) => {
    // everyone can access our API
    res.setHeader('Access-Control-Allow-Origin', '*');
    // we allow to use certain headers on the req object
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    // allow to use certain request verbs (get, post, etc.)
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

const MONGODB_URI = process.env.MONGODB_URI;
// connecting to MongoDB - without .env & dotenv pckge
// mongoose.connect('mongodb://localhost/Project_Back-End_Building_Node_MongoDB_API',
//     { useNewUrlParser: true,
//     useUnifiedTopology: true })
//   .then(() => console.log('Connexion à MongoDB réussie !'))
//   .catch((e) => console.log(e,'Connexion à MongoDB échouée !'));

// connecting to MongoDB - with .env & dotenv pckge
mongoose.connect(MONGODB_URI,
      { useNewUrlParser: true,
      useUnifiedTopology: true })
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch((e) => console.log(e,'Connexion à MongoDB échouée !'));




// intercepts all requests that have a body containing json & put it at disposal = gives access to the body of the request
// previously used with bodyparser // const bodyParser = require('body-parser');
app.use(express.json());

// for all requests sent to /images, the server serves the static folder called "images"
app.use("/images", express.static(path.join(__dirname, 'images')));

app.use("/api/stuff", stuffRoutes);
app.use("/api/auth", userRoutes);



module.exports = app;