const express = require('express')
const app = express()


app.get('/',(req,res)=>{
 res.send({message: 'hi from express'})
})

const PORT = process.eventNames.PORT || 5000

app.listen(PORT)