require('./config/config')
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const mongoose = require('mongoose');
const path=require('path');

//settings body-parser
//esto son midelware funciones que se van disparar
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json())
//middlleware to hablidar publico la carpeta public
app.use(express.static(path.resolve(__dirname,'../public')));


let port=process.env.PORT;

//import routes global
app.use(require('./routes/router'));

//list the port
app.listen(port,()=>{
    console.log(`running in the port ${port}`);
})
//connection mongoose 
 mongoose.connect(process.env.URLenv, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
},(err,res)=>{
  if(err) throw err;

  console.log("Database online");

});