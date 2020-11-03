require('./config/config')
const express = require('express')
const app = express()
const bodyParser = require('body-parser')

//settings body-parser
//esto son midelware funciones que se van disparar
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json())


let port=process.env.PORT;

// get is use tu recorery data
app.get('/usuario', function (req, res) {
  res.json('get usuario')
})
// post is use to create 
app.post('/usuario', function (req, res) {
  let body=req.body;
  if(body.name===undefined){
    res.status(400).json({
      ok:false,
      message:"name is necesary"
    });
  }else{
    res.json({usuario:body});
  }
  
  
})
// put is use to update some record
app.put('/usuario/:id', function (req, res) {
  // to get this params
  let id=req.params.id;

  //return mi ID
  res.json({id})
})
// detele is use to delete some record
app.delete('/usuario', function (req, res) {
  res.json('delete usuario')
})


//list the port
app.listen(port,()=>{
    console.log(`running in the port ${port}`);
})