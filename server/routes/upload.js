const express=require('express');
const app=express();
const fileUpload=require('express-fileupload');

const {checkToken}=require('../middlewares/authentication');
const usuario = require('../models/usuario');
const products = require('../models/products');
const path=require('path');
const fs=require('fs');


app.use(fileUpload({
    useTempFiles : true    
}));


app.put('/upload/:type/:id',(req,res)=>{

    let typefolder=req.params.type;
    let id=req.params.id;
    if(!req.files || Object.keys(req.files).length === 0) {
       return res.status(400).json({
        ok  :false,
        error:{
            message:'there are no files'
        }
       });
      };

     let img = req.files.img;
     let imgname=img.name;
      //checkType
      let typesAllows=['users','products'];

      if(typesAllows.indexOf(typefolder)<0){
        return res.status(400).json({
          ok  :false,
          error:{
              message:'types allowed are '+typesAllows.join(', ')
          }
         });
      }
     let extensions=['png','jpg','jpeg','gif'];
     let extsplit=imgname.split('.');
      let ext=extsplit[extsplit.length-1];



      if(extensions.indexOf(ext)<0){
        return res.status(400).json({
          ok  :false,
          error:{
              message:'extensions allowed are '+extensions.join(', ')
          }
         });
  
      };
    let nameFinally=`${id}-${new Date().getMilliseconds()}.${ext}`;
      img.mv(`uploads/${typefolder}/${nameFinally}`, function(err) {
        if (err) {
          return res.status(500).json({
            ok:false,
            err
          });
        };
         if(typefolder==='users'){
          imguser(id,res,nameFinally);
         }else{
          imgproduct(id,res,nameFinally);
         }
       
        
      });

});


function imguser(id,res,nameFinally){

  usuario.findById(id,(err,usuarioDB)=>{

    if( err){
      deleteimg(nameFinally,'users');
      return res.status(500).json({
        ok:false,
        err
      });
    }

    if(!usuarioDB){
      deleteimg(nameFinally,'users');
      return res.status(400).json({
        ok:false,
        message:'user doesnt exist'
      });
    }

   
deleteimg(usuarioDB.img,'users');
    usuarioDB.img=nameFinally;
    usuarioDB.save((err,usuarioSaved)=>{
        res.json({
          ok:true,
          user:usuarioSaved    
        });
    });









  });



}

function imgproduct(id,res,nameFinally){
  products.findById(id,(err,productsDB)=>{

    if( err){
      deleteimg(nameFinally,'products');
      return res.status(500).json({
        ok:false,
        err
      });
    }

    if(!productsDB){
      deleteimg(nameFinally,'products');
      return res.status(400).json({
        ok:false,
        message:'products doesnt exist'
      });
    }

   
deleteimg(productsDB.img,'products');
productsDB.img=nameFinally;
productsDB.save((err,productsDBSaved)=>{
        res.json({
          ok:true,
          user:productsDBSaved    
        });
    });









  });


};


function deleteimg(name,folder){

  let pathimg=path.resolve(__dirname,`../../uploads/${folder}/${name}`)

  if(fs.existsSync(pathimg)){
    fs.unlinkSync(pathimg);
  }
}

module.exports=app;