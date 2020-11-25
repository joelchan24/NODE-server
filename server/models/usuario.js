const mongoose = require('mongoose');
const moongoseValidator = require('mongoose-unique-validator');
//define the roles validations

let rolesValids = {
    values: ['USER_ROLE', 'ADMIN_ROLE'],
    message: '{VALUE} is not  valid'
}
let Schema=mongoose.Schema;

let usuarioSchema = new Schema({
    name: {
        type: String,
        required: [true, 'name is necessary']
    },
    email: {
        type: String,
        unique: true,
        required: [true, 'email is necessary']
    },
    password: {
        type: String,
        required: [true, 'password is mandatory']
    },
    img: {
        type: String,
        required: false,

    },
    role: {

        type: String,
        default: 'USER_ROLE',
        enum: rolesValids
    },
    status: {
        type: Boolean,
        default: true
    },
    google: {
        type: Boolean,
        default: false
    }

})

//quitar el password
usuarioSchema.methods.toJSON=function(){
    let user=this;
    let userObject=user.toObject();
    delete userObject.password;
    return userObject;
}
//here insert publig to schema to validate

usuarioSchema.plugin(moongoseValidator, {message:'{PATH} must be unique, this email already exist'})

module.exports = mongoose.model('User', usuarioSchema,'User');