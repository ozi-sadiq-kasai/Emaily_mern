const passport = require('passport')

module.exports = (app)=>{

   // When user visits google for the first time
  app.get('/auth/google',passport.authenticate('google',{
   scope:['profile','email']
  }))

  // When  google code is provided
  app.get('/auth/google/callback',passport.authenticate('google'))


  // When a user wants to logout
  app.get('/api/logout',(req,res)=>{
   req.logout()
   res.send(req.user)
  })

 // Checking authentication of current user
 app.get('/api/current_user', (req,res)=>{
  res.send(req.user)
 })
}

