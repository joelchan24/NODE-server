const { strict } = require('assert');
const express=require('express');
const fs=require('fs');
const path=require('path');
const{checkTokenImg}=require('../middlewares/authentication');

const app=express();


app.get('/image/:type/:img',checkTokenImg,(req,res)=>{

    let type=req.params.type;
    let img=req.params.img;

    let pathImg=`../../uploads/${type}/${img}`;
    pathImg=path.resolve(__dirname,pathImg);
    if(fs.existsSync(pathImg)){       

        res.sendFile(pathImg);
    }else{
        let patherror=path.resolve(__dirname,'../assets/no-image.jpg');
        res.sendFile(patherror);
    }

   
   // res.sendFile(pathImg);

});




module.exports=app;