const express = require('express')
const mongoose = require('mongoose')
const keys = require('./config/keys')
const cookieSession = require('cookie-session')
const passport = require('passport')
require ('./models/User')
require('./services/passport')


// Connect mongoose to mongo
mongoose.connect(keys.mongoURI)

const app = express()

// Cookie setup
app.use(cookieSession({
 maxAge: 30*24*60*60*1000,
 keys:[keys.cookieKey]
}))

// Make passport use cookies to handle auth
app.use(passport.initialize())
app.use(passport.session())


require('./routes/authRoutes')(app)

// Initialize a basic route 
// app.get('/',(req,res)=>{
//  res.send({message: 'hi from express'})
// })


const PORT = process.env.PORT || 5000

app.listen(PORT,()=>{console.log('server runing on port 5000')})