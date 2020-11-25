
const express = require('express')
const app = express()
//to save data to mongo i have to export the model
const Usuario = require('../models/usuario');
// to incript password
const bcrypt = require('bcrypt');
const usuario = require('../models/usuario');
//middleware
const { checkToken,CheckUserRole } = require('../middlewares/authentication');
//unsercort to make some validations
const _ = require('underscore');


// get is use tu recorery data
app.get('/usuario',[checkToken,CheckUserRole] , (req, res)=> {

    


    let since = req.query.since || 0;
    since = Number(since);
    let limit = req.query.limit || 0;
    limit = Number(limit);


    usuario.find({status:true}, 'name email status')
        .skip(since)//salto de 5
        .limit(limit)//limite
        .exec((err, usuarioBD) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }

            usuario.countDocuments({status:true}, (err, counter) => {
                return res.json({
                    ok: true,
                    usuario: usuarioBD,
                    records: counter
                })


            })







        });
    // res.json('get usuario')
})
// post is use to create 
app.post('/usuario' ,function (req, res) {
    let body = req.body;

    let usuario = new Usuario({
        name: body.name,
        email: body.email,
        password: bcrypt.hashSync(body.password, 10),
        img: body.img,
        role: body.role,

    });
    usuario.save((err, usuarioDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            })
        }

        return res.json({
            ok: true,
            usuario: usuarioDB
        })

    })





})
// put is use to update some record
app.put('/usuario/:id',[checkToken,CheckUserRole], function (req, res) {
    // to get this params
    let id = req.params.id;
    let body = _.pick(req.body, ['name', 'email', 'img', 'role', 'status']);

    usuario.findByIdAndUpdate(id, body, { new: true, runValidators: true }, (err, usuarioBD) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        return res.json({
            ok: true,
            usuario: usuarioBD

        })

    })


})
// detele is use to delete some record
app.delete('/usuario/:id',[checkToken,CheckUserRole], function (req, res) {
    let id = req.params.id;
    let cambiaStatus={status:false};
    usuario.findByIdAndUpdate(id,cambiaStatus,{new:true}, (err, usuarioBD) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err

            });
        }

        if (usuarioBD === null) {
            return res.status(400).json({
                ok: false,
                message: 'user not found'

            });
        }


        return res.json({
            ok: true,
            usuario: usuarioBD
        })

    
    })
})

module.exports = app;