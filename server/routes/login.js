const express = require('express')
const app = express();
//to save data to mongo i have to export the model
const Usuario = require('../models/usuario');
// to incript password
const bcrypt = require('bcrypt');
const usuario = require('../models/usuario');
//jwt
const jwt = require('jsonwebtoken');


app.post('/login',(req,res)=>{
    let body=req.body;

    usuario.findOne({email:body.email},(err,usuariosDB)=>{

        if(err){
            return res.status(500).json({
                ok:false,
                err
            });
        }

        if(!usuariosDB){
            return res.status(400).json({
                ok:false,
                message:"usuario or password wrong"
            });
        }

       if(! bcrypt.compareSync(body.password,usuariosDB.password)){
        return res.status(400).json({
            ok:false,
            message:"usuario or password wrong"
        });
       }

       let token = jwt.sign({usuario:usuariosDB},process.env.SEED,{expiresIn:process.env.DATELIMIT});

       return res.json({
           ok:true,
           usuario:usuariosDB,
           token
       })




    });
   
   
});



module.exports=app;