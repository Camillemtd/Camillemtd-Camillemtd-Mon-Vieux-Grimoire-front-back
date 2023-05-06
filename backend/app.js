const express = require('express')
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const bookRoutes = require('./routes/books.js')
const userRoutes = require('./routes/user.js')
const path = require('path');
const app = express()
const dotenv = require('dotenv')
dotenv.config();
const mongoDB = process.env.MONGODB_MP 

mongoose.connect(`mongodb+srv://${mongoDB}@cluster0.bj69l2o.mongodb.net/?retryWrites=true&w=majority`,
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

  app.use(express.json())
  

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

// Gestion des erreurs


app.use('/api/books', bookRoutes)
app.use('/api/auth', userRoutes)
app.use('/images', express.static(path.join(__dirname,'images')))



module.exports = app