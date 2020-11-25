const express= require('express');
//middleware
const { checkToken } = require('../middlewares/authentication');
const categories = require('../models/categories');

const app=express();

const Categorie=require('../models/categories');

const _=require('underscore');

//======================================
// this will bring all categories
//======================================
app.get('/categories',checkToken,(req,res)=>{


    categories.find({})
    .populate({path: 'user', model: 'User'})   
    .exec((err,categoriesDB)=>{

        if(err){
            return res.status(500).json({
                ok:false,
                err
            });
        }

        Categorie.countDocuments().exec( (errCoun,count)=>{
            return res.json({
                ok:true,
                categories:categoriesDB,
                TotCategories:count
            });
    
        
        
        })
        


    });

});

//======================================
// show one categorie by ID
//======================================
app.get('/categories/:id',checkToken,(req,res)=>{
    let id=req.params.id;

    Categorie.findById({_id:id}).exec((err,categorieDB)=>{
        if(err){
            return res.status(400).json({
                ok:false,
                error:err
            });
        }

        if(!categorieDB){
            return res.status(500).json({
                ok:false,
                err:{
                    message:'ID is wrong'
                }
            });
        }


        return res.json({
            ok:true,
            categorie:categorieDB
        });



    })




});


//======================================
// Create a categorie
//======================================
app.post('/categories',checkToken,(req,res)=>{

    let body=req.body;
  

    //create  model 
    let categorie=new categories({
        description:body.description,
        user:req.usuario._id
    });
    categorie.save((err,categorieDB)=>{

        if(err){
            return res.status(500).json({
                ok:false,
                err
            })
        }


        return res.json({
            ok:true,
            categorie:categorieDB
        });

    });


});

//======================================
// show one categorie by ID
//======================================
app.put('/categories/:id',checkToken,(req,res)=>{
    let id=req.params.id;
    let body=_.pick(req.body,['description']);
    


    Categorie.findByIdAndUpdate(id,body,{new:true},(err,categorieDB)=>{

        if(err){
            return res.status(400).json({
                ok:false,
                error:err
            });
        }


        res.json({
            ok:true,
            categorie:categorieDB
        });

    });



});


//======================================
// show one categorie by ID
//======================================
app.delete('/categories/:id',checkToken,(req,res)=>{
//only administrator

});



module.exports=app;