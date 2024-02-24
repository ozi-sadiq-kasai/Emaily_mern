const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20').Strategy
const keys= require('../config/keys.js')
const mongoose = require('mongoose')


// Get access to user model class
const User = mongoose.model('users')

// Serializeuser
passport.serializeUser((user,done)=>{
 done(null,user.id)
})

// Deserializeuser
passport.deserializeUser((id, done) => {
  User.findById(id)
    .then(user => {
      done(null, user);
    })
    .catch(err => {
      done(err, null);
    });
});

// Initialize an instance of a google strategy using passport
passport.use(new GoogleStrategy({
 clientID: keys.googleClientID,
 clientSecret: keys.googleClientSecret,
 callbackURL: '/auth/google/callback'
},(accessToken,refreshToken,profile,done) =>{
 // console.log('accessToken',accessToken)
 // console.log('refreshToken',refreshToken)
 // console.log('profile',profile)

// Ensure user is unique
User.findOne({googleId: profile.id})
 .then((existingUser)=>{
  if(existingUser){
   // we already have a record with the given profile ID
   done(null,existingUser)
  } else{
   // we don't have an existing user make an new user
    new User({ googleId: profile.id}).save()
    .then(user=> done(null,user))
  }
 })

}
)
)