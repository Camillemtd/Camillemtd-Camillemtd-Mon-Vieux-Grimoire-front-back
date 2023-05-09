const express = require('express')
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const bookRoutes = require('./routes/books.js')
const userRoutes = require('./routes/user.js')
const path = require('path');
const app = express()
const dotenv = require('dotenv')
const helmet = require('helmet')
const rateLimit = require('express-rate-limit')
dotenv.config();
const mongoDB = process.env.MONGODB_MP 



mongoose.connect(`mongodb+srv://${mongoDB}@cluster0.bj69l2o.mongodb.net/?retryWrites=true&w=majority`,
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

app.use(express.json())
app.use(helmet())

  

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

const authLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 50,
});

app.use('/api/books', bookRoutes)
app.use('/api/auth',authLimiter, userRoutes)
app.use('/images', express.static(path.join(__dirname,'images')))



module.exports = app