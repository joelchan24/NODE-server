const express=require('express');
const app=express();

const { checkToken } = require('../middlewares/authentication');
const products = require('../models/products');
//import the model
const Product=require('../models/products');
//get all products 
app.get('/product',checkToken,(req,res)=>{

    let from=req.params.from||0;
    products.find({available:true})
    .skip(from)
    .limit(5)
    .populate({path: 'user', model: 'User',select:'name email'})
    .populate({path:'categorie',model:'Categories',select:'description'})
    .exec((err,ProductDB)=>{

        if(err){
            return res.status(500).json({
                ok:false,
                error:err
            });
        }

        return res.json({
            ok:true,
            product:ProductDB
        });


    })



});

// get only get specific  product by ID
app.get('/product/:id',checkToken,(req,res)=>{

    let id =req.params.id;
    products.findById({_id:id})
    .exec((err,ProductDB)=>{

        if(err){
            return res.status(500).json({
                ok:false,
                error:err
            });
        }

        return res.json({
            ok:true,
            product:ProductDB
        });


    })



});

//create a new product
app.post('/product',checkToken,(req,res)=>{
    let body=req.body;
    let product=new Product({
        name: body.name,
        priceunit: body.priceunit,
        description: body.description,
        available: body.available,
        categorie: body.categorie,
        user: req.usuario._id
    });


    product.save((err,productDB)=>{
        if(err){
            return res.status(500).json({
                ok:false,
                error:err
            });
        }
        return res.json({
            ok:true,
            product:productDB
        });
    });


});


app.put('/product/:id',checkToken,(req,res)=>{
    let body=req.body;
    let id=req.params.id;

    products.findById(id,(err,productDB)=>{

        if(err){
            return res.status(500).json({
                ok:false,
                err
            });
        }


        if(!productDB){
            return res.status(400).json({
                ok:false,
                err:{
                    message:'product does not exist'
                }
            })
        }


        productDB.name=body.name;
        productDB.priceunit=body.priceunit;
        productDB.description=body.description;
        productDB.available=body.available;
        productDB.description=body.description;

        productDB.save((err,productDBSaved)=>{
            if(err){
                return res.status(500).json({
                    ok:false,
                    err
                });
            }

            res.json({
                ok:true,
                product:productDBSaved
            })
        });

    });


    

});

app.delete('/product/:id',checkToken,(req,res)=>{
    let body=req.body;
    let id=req.params.id;

    products.findById(id,(err,productDB)=>{

        if(err){
            return res.status(500).json({
                ok:false,
                err
            });
        }


        if(!productDB){
            return res.status(400).json({
                ok:false,
                err:{
                    message:'product does not exist'
                }
            })
        }


     
        productDB.available=false;
     

        productDB.save((err,productDBSaved)=>{
            if(err){
                return res.status(500).json({
                    ok:false,
                    err
                });
            }

            res.json({
                ok:true,
                product:productDBSaved
            })
        });

    });


    

});


app.get('/product/search/:finished',checkToken,(req,res)=>{

    let finished=req.params.finished;
    //here i will create a regex 

    let regex=new RegExp(finished,'i');
    
    products.find({name:regex})
    .populate({path:'Categories',model:'Categories'})
    .exec((err,productDB)=>{

        if(err){
            return res.status(500).json({
            ok:false,
            error:err
            });
        }

        return res.json({
            ok:true,
            product:productDB
        });

    });

});



module.exports=app;