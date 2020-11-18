const express = require('express')
const app = express();
//to save data to mongo i have to export the model
const Usuario = require('../models/usuario');
// to incript password
const bcrypt = require('bcrypt');
const usuario = require('../models/usuario');
//jwt
const jwt = require('jsonwebtoken');
const {OAuth2Client} = require('google-auth-library');
const client = new OAuth2Client(process.env.CLIENT_ID);

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

//google settings 
async function verify(token) {
    const ticket = await client.verifyIdToken({
        idToken: token,
        audience: process.env.CLIENT_ID,  // Specify the CLIENT_ID of the app that accesses the backend
        // Or, if multiple clients access the backend:
        //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
    });
    const payload = ticket.getPayload();
    return {
name:payload.name,
email:payload.email,
img:payload.picture,
google:true
    };
  
  }
  verify().catch(console.error);

app.post('/google', async (req,res)=>{
    let token=req.body.idtoken;
   let googleUser=await verify(token).catch(e=>{
       return res.status(403).json({
        ok:false,
        err:e
       });
   });

   usuario.findOne({email:googleUser.email},(err,usuarioDB)=>{

    if(err){
        return res.status(500).json({
            ok:false,
            err
        });
    }

    if(usuarioDB){
        if(usuarioDB.google===false){
            return res.status(400).json({
                ok:false,
                err:{
                    message:"you should use your normal authentication"
                }
            });
        }else{
            let token=jwt.sign({
                usuario:usuarioDB,

            },process.env.SEED,{expiresIn:process.env.DATELIMIT});

            return res.json({
                ok:true,
                usuario:usuarioDB,
                token,
            });
        }
    }else{
        let newUser=new usuario();
        newUser.name=googleUser.name;
        newUser.email=googleUser.email;
        newUser.img=googleUser.img;
        newUser.google=true;
        newUser.password=':)';
        newUser.save((err,usuarioDB)=>{

            if(err){

            
            return res.status(500).json({
                ok:false,
                err
            });
        }
        let token=jwt.sign({
            usuario:usuarioDB,

        },process.env.SEED,{expiresIn:process.env.DATELIMIT});

        return res.json({
            ok:true,
            usuario:usuarioDB,
            token,
        });
            


        });
    }

   })

//    res.json({
//        usuario:googleUser
//    })

})


module.exports=app;