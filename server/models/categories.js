const mongoose = require('mongoose');


let Schema=mongoose.Schema;

let categorieSchema= new Schema({
    description:{
        type:String,
        unique:true,
        required:[true,'description is necessary']
    },
    user:{type:Schema.Types.ObjectId,ref:'User'}
   

});

module.exports = mongoose.model('Categories', categorieSchema);
