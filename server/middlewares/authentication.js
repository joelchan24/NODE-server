//jwt
const jwt = require('jsonwebtoken');
//===========
//verificar token
//===========


let checkToken = (req, res, next) => {

    let token = req.get('Authorization');
    let SEED=process.env.SEED;
    jwt.verify(token,SEED,(err,decoded)=>{

        if(err){
            return res.status(401).json({
                ok:false,
                err
            });
        }
        
        req.usuario=decoded.usuario;

        next();
    
    })

    // res.json({
    //     token
    // });
   

};

//here i would create a new miiddleware to check user Role

let CheckUserRole=(req,res,next)=>{

    let usuario=req.usuario;

    if(usuario.role==="ADMIN_ROLE"){
        next();
    }else{

    

    return res.json({
        ok:false,
        err:{
            message:"user doesn't administrador"
        }
    })
}

}

module.exports = {
    checkToken,
    CheckUserRole
};